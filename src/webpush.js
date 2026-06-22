// Web Push（RFC 8291 aes128gcm 加密 + RFC 8292 VAPID）最小實作，純用 WebCrypto，
// 不依賴任何 npm 套件，可直接在 Cloudflare Workers 執行。

function b64urlToBytes(str) {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

function bytesToB64url(bytes) {
  let bin = '';
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function concatBytes(...arrs) {
  const total = arrs.reduce((sum, a) => sum + a.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const a of arrs) { out.set(a, offset); offset += a.length; }
  return out;
}

function strToBytes(str) {
  return new TextEncoder().encode(str);
}

async function importVapidPrivateKey(publicKeyB64url, privateKeyB64url) {
  const pubBytes = b64urlToBytes(publicKeyB64url); // 65 bytes：0x04 || x(32) || y(32)
  const x = pubBytes.slice(1, 33);
  const y = pubBytes.slice(33, 65);
  const d = b64urlToBytes(privateKeyB64url);
  const jwk = {
    kty: 'EC',
    crv: 'P-256',
    x: bytesToB64url(x),
    y: bytesToB64url(y),
    d: bytesToB64url(d),
    ext: true,
  };
  return crypto.subtle.importKey('jwk', jwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
}

async function createVapidAuthHeader(endpoint, subject, publicKeyB64url, privateKeyB64url) {
  const endpointUrl = new URL(endpoint);
  const aud = `${endpointUrl.protocol}//${endpointUrl.host}`;
  const header = { typ: 'JWT', alg: 'ES256' };
  const payload = { aud, exp: Math.floor(Date.now() / 1000) + 12 * 60 * 60, sub: subject };
  const headerB64 = bytesToB64url(strToBytes(JSON.stringify(header)));
  const payloadB64 = bytesToB64url(strToBytes(JSON.stringify(payload)));
  const unsigned = `${headerB64}.${payloadB64}`;
  const key = await importVapidPrivateKey(publicKeyB64url, privateKeyB64url);
  const sig = await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, key, strToBytes(unsigned));
  const jwt = `${unsigned}.${bytesToB64url(new Uint8Array(sig))}`;
  return `vapid t=${jwt}, k=${publicKeyB64url}`;
}

// RFC 8291：用訂閱者的 p256dh / auth 加密通知內容
async function encryptPayload(payloadObj, p256dhB64url, authB64url) {
  const receiverPublicBytes = b64urlToBytes(p256dhB64url);
  const authSecret = b64urlToBytes(authB64url);

  const receiverPublicKey = await crypto.subtle.importKey(
    'raw', receiverPublicBytes, { name: 'ECDH', namedCurve: 'P-256' }, false, []
  );

  const localKeyPair = await crypto.subtle.generateKey(
    { name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']
  );
  const localPublicRaw = new Uint8Array(await crypto.subtle.exportKey('raw', localKeyPair.publicKey));

  const sharedSecret = new Uint8Array(
    await crypto.subtle.deriveBits({ name: 'ECDH', public: receiverPublicKey }, localKeyPair.privateKey, 256)
  );

  const authInfo = concatBytes(strToBytes('WebPush: info\0'), receiverPublicBytes, localPublicRaw);
  const ikmKey = await crypto.subtle.importKey('raw', sharedSecret, 'HKDF', false, ['deriveBits']);
  const prk = new Uint8Array(
    await crypto.subtle.deriveBits({ name: 'HKDF', hash: 'SHA-256', salt: authSecret, info: authInfo }, ikmKey, 256)
  );

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const prkKey = await crypto.subtle.importKey('raw', prk, 'HKDF', false, ['deriveBits']);

  const cekBits = await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt, info: strToBytes('Content-Encoding: aes128gcm\0') }, prkKey, 128
  );
  const nonceBits = await crypto.subtle.deriveBits(
    { name: 'HKDF', hash: 'SHA-256', salt, info: strToBytes('Content-Encoding: nonce\0') }, prkKey, 96
  );

  const cekKey = await crypto.subtle.importKey('raw', cekBits, { name: 'AES-GCM' }, false, ['encrypt']);

  // 單一 record，結尾補 0x02 padding delimiter（RFC 8188）
  const padded = concatBytes(strToBytes(JSON.stringify(payloadObj)), new Uint8Array([2]));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: 'AES-GCM', iv: new Uint8Array(nonceBits) }, cekKey, padded)
  );

  const recordSize = new Uint8Array(4);
  new DataView(recordSize.buffer).setUint32(0, 4096, false);
  const idLen = new Uint8Array([localPublicRaw.length]);

  return concatBytes(salt, recordSize, idLen, localPublicRaw, ciphertext);
}

// 回傳 push 服務的 HTTP 回應，呼叫端可依狀態碼判斷訂閱是否失效（404/410）
export async function sendWebPush(subscription, payloadObj, vapidKeys) {
  const body = await encryptPayload(payloadObj, subscription.keys.p256dh, subscription.keys.auth);
  const authHeader = await createVapidAuthHeader(
    subscription.endpoint, vapidKeys.subject, vapidKeys.publicKey, vapidKeys.privateKey
  );

  return fetch(subscription.endpoint, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Encoding': 'aes128gcm',
      'Content-Type': 'application/octet-stream',
      TTL: '86400',
    },
    body,
  });
}

export async function sha256Hex(str) {
  const digest = await crypto.subtle.digest('SHA-256', strToBytes(str));
  return Array.from(new Uint8Array(digest)).map((b) => b.toString(16).padStart(2, '0')).join('');
}
