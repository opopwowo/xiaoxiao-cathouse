import indexHtml from '../index.html';
import ogImage from '../og-image.jpg';
import privacyHtml from '../privacy.html';
import termsHtml from '../terms.html';
import llmsTxt from '../llms.txt';
import robotsTxt from '../robots.txt';
import sitemapXml from '../sitemap.xml';
import indexNowKey from '../9d987292186a422895a6f7aa98de9039.txt';

const BASE_URL = 'https://lovecat.cc';

// 舊網域（workers.dev），所有流量 301 轉到新網域
const OLD_HOST = 'littlecathouse.opopwowo.workers.dev';

const COMMON_HTML_HEADERS = {
  'content-type': 'text/html; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

const kittenMeta = {
  k1:  { breedZh: '美國短毛貓・銀虎斑',       gender: '弟弟', price: 35000 },
  k2:  { breedZh: '小步舞曲短腿貓・棕虎斑',   gender: '妹妹', price: 45000 },
  k3:  { breedZh: '美國短毛貓・銀虎斑',       gender: '妹妹', price: 35000 },
  k4:  { breedZh: '美短曼赤肯短腿貓・銀虎斑', gender: '妹妹', price: 45000 },
  k5:  { breedZh: '美國長毛貓・銀色',         gender: '妹妹', price: 35000 },
  k6:  { breedZh: '美國短毛起司貓・銀白加白', gender: '妹妹', price: 35000 },
  k7:  { breedZh: '美國短毛貓・銀白色',       gender: '妹妹', price: 35000 },
  k8:  { breedZh: '捲耳曼赤肯短腿貓・乳牛藍白', gender: '弟弟', price: 30000 },
  k9:  { breedZh: '英國長毛貓・奶油白',       gender: '弟弟', price: 19000 },
  k10: { breedZh: '英國長毛貓・銀白色',       gender: '弟弟', price: 30000 },
  k11: { breedZh: '布偶貓・藍雙淺色',         gender: '弟弟', price: 29000 },
  k12: { breedZh: '英國短毛貓・奶油白',       gender: '弟弟', price: 30000 },
  k13: { breedZh: '英國短毛貓・藍白正賓士',   gender: '妹妹', price: 35000 },
  k14: { breedZh: '英國短毛貓・藍白正賓士',   gender: '妹妹', price: 35000 },
  k15: { breedZh: '英國短毛貓・藍色白手套',   gender: '妹妹', price: 25000 },
};

// 目前 index.html 實際的 title / description / og tags
const ORIGINAL_TITLE = '<title>小小貓屋 Little Cat House|為您挑選一生的家人・全台親自接送</title>';
const ORIGINAL_DESC  = '<meta name="description" content="台中精品貓舍,專業繁育布偶貓、英國短毛貓、小步舞曲短腿貓。提供全台親自接送服務。特寵業字第S1150011號。健康保證・血統清楚・終身飼養諮詢。">';
const ORIGINAL_CANONICAL = '<link rel="canonical" href="https://lovecat.cc/">';
const ORIGINAL_OG_URL    = '<meta property="og:url" content="https://lovecat.cc/">';
const ORIGINAL_OG_TITLE  = '<meta property="og:title" content="小小貓屋 Little Cat House｜為您挑選一生的家人・全台親自接送">';
const ORIGINAL_OG_DESC   = '<meta property="og:description" content="台中精品貓舍 · 特寵業字第S1150011號 · 專營布偶貓、英國短毛貓、小步舞曲短腿貓 · 三層健康保證 · 全台親自接送">';

function buildKittenHtml(kittenId, meta) {
  const pageUrl = `${BASE_URL}/kitten/${kittenId}`;
  const priceStr = meta.price.toLocaleString('zh-TW');
  const title = `${meta.breedZh} ${meta.gender}｜小小貓屋 台中精品貓舍`;
  const desc = `台中小小貓屋待售幼貓・${meta.breedZh} ${meta.gender}，售價 NT$${priceStr}。三層健康保障、全台親自接送、超完整新手禮包。特寵業字第S1150011號。立即預約帶回命定毛孩。`;

  return indexHtml
    .replace(ORIGINAL_TITLE,     `<title>${title}</title>`)
    .replace(ORIGINAL_DESC,      `<meta name="description" content="${desc}">`)
    .replace(ORIGINAL_CANONICAL, `<link rel="canonical" href="${pageUrl}">`)
    .replace(ORIGINAL_OG_URL,    `<meta property="og:url" content="${pageUrl}">`)
    .replace(ORIGINAL_OG_TITLE,  `<meta property="og:title" content="${title}">`)
    .replace(ORIGINAL_OG_DESC,   `<meta property="og:description" content="${desc}">`);
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    // 301 舊網域全部轉址到 lovecat.cc
    if (host === OLD_HOST) {
      const newUrl = `${BASE_URL}${path}${url.search}`;
      return Response.redirect(newUrl, 301);
    }

    if (path === '/og-image.jpg') {
      return new Response(ogImage, {
        headers: {
          'content-type': 'image/jpeg',
          'Cache-Control': 'public, max-age=604800',
          'X-Content-Type-Options': 'nosniff',
        }
      });
    }

    if (path === '/privacy.html' || path === '/privacy') {
      return new Response(privacyHtml, { headers: { ...COMMON_HTML_HEADERS } });
    }
    if (path === '/terms.html' || path === '/terms') {
      return new Response(termsHtml, { headers: { ...COMMON_HTML_HEADERS } });
    }
    if (path === '/llms.txt') {
      return new Response(llmsTxt, { headers: { 'content-type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
    }
    if (path === '/robots.txt') {
      return new Response(robotsTxt, { headers: { 'content-type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
    }
    if (path === '/sitemap.xml') {
      return new Response(sitemapXml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    }
    if (path === '/9d987292186a422895a6f7aa98de9039.txt') {
      return new Response(indexNowKey, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }

    const kittenMatch = path.match(/^\/kitten\/(k\d+)$/);
    if (kittenMatch) {
      const kittenId = kittenMatch[1];
      const meta = kittenMeta[kittenId];
      const html = meta ? buildKittenHtml(kittenId, meta) : indexHtml;
      return new Response(html, { headers: COMMON_HTML_HEADERS });
    }

    return new Response(indexHtml, { headers: COMMON_HTML_HEADERS });
  },
};
