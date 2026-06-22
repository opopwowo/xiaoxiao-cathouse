# 小小貓屋 Little Cat House — 開發備忘

## 重要規則
- **全程使用繁體中文**回覆使用者，包含所有工具呼叫的 description 說明文字
- 網站部署平台：**Cloudflare Workers**（不是 Netlify，不是 Pages）
- 網站網址：`https://lovecat.cc/`（正式網域，2026/05 切換）
- 舊網址：`https://littlecathouse.opopwowo.workers.dev/`（保留做 301 轉址用）

## 專案說明
單頁靜態網站（`public/index.html`），繁體中文，台中精品貓舍。
收件信箱：`opopwowo@gmail.com`

## 自動部署架構
- GitHub 推送 → GitHub Actions → Cloudflare Workers 自動更新
- Worker 名稱：`littlecathouse`
- Cloudflare Account ID：`765b53d58aff247a2f3d86b086f63450`
- 設定檔：`wrangler.toml`、`src/worker.js`
- 部署流程：`.github/workflows/deploy.yml`
- **架構（2026/06 已migrate）：Workers Static Assets**。所有靜態檔案（首頁、文章、品種頁、圖片、manifest、sw.js等）
  放在 `public/` 目錄下，由 Cloudflare 直接從資產層服務，**不會計入 Worker 程式包 3MiB 大小上限**。
  `src/worker.js` 只保留真正需要動態邏輯的部分：舊網域301轉址、推播API、地區頁(`/area/*`)與幼貓詳情頁(`/kitten/*`)的動態產生。
  其餘所有路徑（包含找不到的路徑）最後都會 fallthrough 到 `env.ASSETS.fetch(request)`，由 `public/` 裡的檔案處理。
  自訂 HTTP headers（Cache-Control、安全性headers、noindex等）統一寫在 `public/_headers`。
  ⚠️ **千萬別把大量內容檔案改回用 `import` 塞進 `src/worker.js`**，這正是之前造成部署連續失敗4天的原因。

## 新增貓咪方式（使用者直接說即可）
使用者只需傳送以下格式，Claude 直接更新 `public/index.html` 並推上 GitHub：

```
品種：（例：英短藍白、布偶貓、小步舞曲）
性別：弟弟 或 妹妹
生日：YYYY/MM/DD
價格：（選填，不填顯示「洽詢」）
描述：（選填）
照片：（附圖）
```

貓咪資料位置：`public/index.html` 的 `const kittens = [`
欄位：`id`、`breedEn`、`breedZh`、`gender`、`birth`、`price`、`tag`、`desc`、`breedCategory`、`genderCode`、`img`

**⚠️ img 欄位不要用 base64！**（2026/06 已將首頁從2.69MB base64內嵌圖片優化到400KB，
若新貓咪照片又用base64塞回index.html會讓首頁變慢、回到原本的效能問題）
新增貓咪照片的正確流程（2026/06 改用Static Assets後更簡單）：
1. 把照片存成 `public/images/kitten-kXX.jpg`（XX為新的貓咪編號）
2. `public/index.html` 的 kittens 陣列中，該貓咪的 `img` 欄位填 `'https://lovecat.cc/images/kitten-kXX.jpg'`（一般URL字串，不是base64）
3. 不需要再修改 `src/worker.js`，靜態資源層會自動依路徑服務該圖片

## 已完成功能
- 預約表單：FormSubmit.co（`https://formsubmit.co/ajax/opopwowo@gmail.com`）
- 路由：`privacy.html`、`terms.html`、`llms.txt`、`robots.txt`、`sitemap.xml`（皆位於 `public/`）
- IndexNow 金鑰：`9d987292186a422895a6f7aa98de9039`
- SEO：title、meta description、Open Graph、canonical 全部設好（已更新為 lovecat.cc）
- og:image：`https://lovecat.cc/og-image.jpg`（檔案位於 `public/og-image.jpg`）
- Google Search Console：需在 index.html 第 35 行填入真實驗證碼
- 301 轉址：worker.js 自動將舊網域（workers.dev）全部轉到 lovecat.cc
- **PWA + 推播通知**（2026/06 新增）：訪客可在首頁訂閱「新貓咪到院通知」（Web Push，免裝APP）。
  - 程式：`public/manifest.json`、`public/sw.js`、`src/webpush.js`（純WebCrypto實作VAPID+aes128gcm，無npm依賴）
  - 訂閱資料存於 Cloudflare KV（binding `PUSH_SUBS`），密鑰為 Worker secrets `VAPID_PRIVATE_KEY`、`PUSH_ADMIN_KEY`
  - 一次性設定步驟見 `PUSH-NOTIFICATIONS-SETUP.md`（需使用者自行於 Cloudflare 操作，Claude 無權限代為設定）
  - 使用者發送通知的隱藏後台：`/admin/notify-new-kitten`（不在站內導覽、`noindex`，僅靠管理金鑰保護，檔案位於`public/admin/notify-new-kitten.html`）
  - **Claude 無法自行觸發推播**：此沙盒環境的對外連線政策會封鎖 lovecat.cc（同 LINE 短連結問題），且管理金鑰只應由使用者保管，Claude不應索取

## 注意事項
- 上傳檔案到 GitHub 時**不要包含 `public/index.html`**，避免覆蓋已有的修改
- 文章在 `public/articles/`、品種頁在 `public/breed/`（注意是單數breed，不是breeds）、圖片在 `public/images/`
- 動態路由（地區頁`/area/*`、幼貓詳情頁`/kitten/*`、推播API、舊網域轉址）在 `src/worker.js` 管理；其餘純靜態頁面新增/修改檔案即可，不需要碰 `src/worker.js`
