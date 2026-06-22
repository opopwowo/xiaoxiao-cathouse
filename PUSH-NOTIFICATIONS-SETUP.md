# 新貓咪到院推播通知 — 一次性設定步驟

這個功能讓網站訪客點擊左下角「🔔 開啟新貓咪到院通知」後，即使沒開網站，
有新貓咪上架時手機也會收到推播通知（PWA + Web Push，免裝APP）。

程式碼已經全部寫好並推送，**但需要您在 Cloudflare 做以下 3 個一次性設定**，
因為這些步驟需要您的 Cloudflare 帳號權限，Claude 無法代為操作。

## 步驟 1：登入 Cloudflare（用瀏覽器，不需貼任何密鑰）

```bash
npx wrangler login
```

## 步驟 2：建立 KV 命名空間（用來儲存訂閱清單）

```bash
npx wrangler kv namespace create PUSH_SUBS
```

執行後會印出類似這樣的結果：

```
🌀 Creating namespace with title "littlecathouse-PUSH_SUBS"
✨ Success!
Add the following to your configuration file:
[[kv_namespaces]]
binding = "PUSH_SUBS"
id = "abcd1234...這是真正的id..."
```

請把 `wrangler.toml` 最後面這一段：

```toml
[[kv_namespaces]]
binding = "PUSH_SUBS"
id = "REPLACE_WITH_YOUR_KV_NAMESPACE_ID"
```

的 `id` 改成剛剛印出的真正 id，存檔後 commit + push（或直接告訴 Claude 您拿到的 id，我幫您改）。

## 步驟 3：設定密鑰（VAPID 私鑰 + 後台管理金鑰）

```bash
npx wrangler secret put VAPID_PRIVATE_KEY
```
出現提示後貼上這個值（這是推播加密用的私鑰，不可外流、不會出現在程式碼或repo裡）：
```
fgcoe2IzdhgWjKP60FqNv_UJz2YYMqDcuJhIujRLNZw
```

```bash
npx wrangler secret put PUSH_ADMIN_KEY
```
出現提示後**自己想一個高強度密碼貼上**（例如用密碼產生器產生一串32位亂碼），
這個密碼之後要在「發送通知」的後台頁面輸入，請自己保管好，不要告訴任何人（包含Claude）。

## 完成後如何使用

設定完成、且這次的程式碼部署完畢後：

1. **訪客端**：網站首頁左下角會出現「🔔 開啟新貓咪到院通知」按鈕，訪客點擊並允許瀏覽器通知權限後，
   就會被記錄訂閱（資料存在 Cloudflare KV，不會有任何人看到訪客的個人資料，只有一段技術性的訂閱端點字串）。
2. **您要發送通知時**：到 `https://lovecat.cc/admin/notify-new-kitten` 這個隱藏後台頁面
   （不會出現在網站選單或搜尋引擎，只有知道網址的人能進入），輸入您剛設定的管理金鑰、填標題與內容，
   按「發送推播通知」，所有訂閱的訪客手機就會收到通知。

## 已知限制

- **iOS（iPhone）**：使用者必須先把網站「加入主畫面」（Safari → 分享 → 加入主畫面），
  且系統版本需 iOS 16.4 以上，才能收到推播。在一般 Safari 分頁直接瀏覽是收不到的，這是 Apple 的限制，非本網站問題。
- **Android / 桌面 Chrome**：不需要加入主畫面，直接在瀏覽器允許通知權限即可收到推播，使用體驗最完整。
- 訂閱資料目前沒有上限保護機制，但以貓舍規模（預期數百筆訂閱）完全不會有效能問題。
