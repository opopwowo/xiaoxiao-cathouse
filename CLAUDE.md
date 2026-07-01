# 小小貓屋 Little Cat House — 開發備忘

## 重要規則
- **全程使用繁體中文**回覆使用者，包含所有工具呼叫的 description 說明文字
- 網站部署平台：**Cloudflare Workers**（不是 Netlify，不是 Pages）
- 網站網址：`https://lovecat.cc/`（正式網域，2026/05 切換）
- 舊網址：`https://littlecathouse.opopwowo.workers.dev/`（保留做 301 轉址用）
- 收件信箱 / 使用者信箱：`opopwowo@gmail.com`

## 專案說明
繁體中文靜態網站，台中精品貓舍（英短、英長、美短、曼赤肯短腿貓等）。
首頁為 `public/index.html`（單頁式，內含幼貓總覽），其餘為大量 SEO 內容頁與品種／文章頁。
特寵業字號：**特寵業字第 S1150011 號**（180 天健康保固、全台親自接送）。

## 目錄結構
```
public/                     ← Workers Static Assets 服務的根目錄（所有靜態檔案）
├── index.html              ← 首頁（含 const kittens 幼貓陣列，約 400KB）
├── articles/               ← SEO 部落格文章（164 篇 .html）
├── breed/                  ← 品種介紹頁（21 頁，注意是「單數 breed」）
├── color/                  ← 毛色主題頁（6 頁）
├── compare/                ← 品種比較頁（6 頁）
├── knowledge/              ← 養貓知識頁（6 頁）
├── images/                 ← 圖片（幼貓 kitten-kXX.jpg、cat01–19、breeds/ 等）
├── kittens-data.js         ← 幼貓共用資料檔（品種/比較/毛色頁讀取即時在售資訊）
├── kitten-widget.js        ← 品種頁等載入「在售幼貓」小工具
├── related.js              ← 文章相關連結（依 slug 對應標籤）
├── share-buttons.js        ← 社群分享按鈕
├── webpushr-sw.js / webpushr-widget.js  ← 推播（見下方）
├── faq.html / testimonials.html / found-home.html
├── breeding.html / buying-center.html / area-guide.html
├── llms.txt / llms-full.txt ← 給 AI 搜尋引擎的內容摘要
├── sitemap.xml / feed.xml / robots.txt / manifest.json
├── privacy.html / terms.html
├── _headers                ← 自訂 HTTP headers（Cache-Control、安全性、noindex）
├── og-image.jpg
└── 9d987292186a422895a6f7aa98de9039.txt  ← IndexNow 金鑰驗證檔
src/worker.js               ← 只處理動態路由（見下方）
wrangler.toml               ← Cloudflare Workers 設定（Static Assets 綁定）
.github/workflows/deploy.yml ← 自動部署 + IndexNow 推送
content/breeds/             ← 品種內容原始 markdown（31 篇，內容撰寫素材，非直接部署）
images/breeds/images.md     ← 品種圖片素材備忘
*.md（根目錄）              ← 內容策略／稽核報告（見下方），非網站內容
```

根目錄報告文件（供內容規劃參考，不會部署）：`AI-Search-Readiness-Report.md`、
`AI-Search-Readiness-Report-v2.md`、`CONTENT-STRATEGY-2026.md`、`Content-Gap-Report.md`。

## 自動部署架構
- **推送到 `master` 分支** → GitHub Actions → 自動部署到 Cloudflare Workers
- Worker 名稱：`littlecathouse`
- Cloudflare Account ID：`765b53d58aff247a2f3d86b086f63450`
- 設定檔：`wrangler.toml`、`src/worker.js`；部署流程：`.github/workflows/deploy.yml`
- 部署後 workflow 會自動從 `sitemap.xml` 撈網址並推送 **IndexNow**（通知搜尋引擎）
- **架構（2026/06 已 migrate）：Workers Static Assets**。所有靜態檔案放在 `public/`，
  由 Cloudflare 直接從資產層服務，**不會計入 Worker 程式包 3MiB 大小上限**。
  ⚠️ **千萬別把大量內容檔案改回用 `import` 塞進 `src/worker.js`**，這正是之前造成部署連續失敗 4 天的原因。

### `src/worker.js` 動態路由（其餘一律 fallthrough 給 Static Assets）
`wrangler.toml` 設 `run_worker_first = true`，所有請求先進 worker，處理完動態邏輯後
`return env.ASSETS.fetch(request)` 交給 `public/`。worker 只保留這些動態部分：
- 舊網域（`littlecathouse.opopwowo.workers.dev`）→ `lovecat.cc` **301 轉址**
- `MERGED_REDIRECTS`：被合併／重複的舊文章 → 保留頁 **301**（集中 SEO 權重）
- `/reviews` → 服務 `/testimonials`；`/articles` → `/articles/`
- `/found-home` → 首頁 **302**
- `/kittens`：沿用首頁 HTML、客製 meta 的待售列表獨立頁
- `/area/*`：依 `AREA_DATA`（約 50 個地區）動態產生地區 SEO 頁（`buildAreaHtml`）
- `/kitten/kXX`：依 `kittenMeta`（目前在售清單）動態產生幼貓詳情頁；
  已售出／下架（不在 `kittenMeta`）→ 301 轉址回 `/kittens`
- 自訂 HTTP headers 統一寫在 `public/_headers`（不要寫死在 worker）

## 新增／下架貓咪方式（使用者直接說即可）
使用者傳送以下格式，Claude 直接更新並推上 GitHub：
```
品種：（例：英短藍白、布偶貓、小步舞曲）
性別：弟弟 或 妹妹
生日：YYYY/MM/DD
價格：（選填，不填顯示「洽詢」）
描述：（選填）
照片：（附圖）
```

**需同步維護的三處**（漏掉會造成資料不一致）：
1. `public/index.html` 的 `const kittens = [`（首頁展示；目前約 24 筆）
   欄位：`id`、`breedEn`、`breedZh`、`gender`、`birth`、`price`、`tag`、`desc`、`breedCategory`、`genderCode`、`img`
2. `public/kittens-data.js`（品種頁／比較頁／毛色頁的在售小工具讀取來源）
3. `src/worker.js` 的 `kittenMeta`（決定 `/kitten/kXX` 詳情頁是否產生；下架就從這裡移除，
   讓該網址自動 301 回 `/kittens`）

### 照片流程（改用 Static Assets 後）
1. 照片存成 `public/images/kitten-kXX.jpg`（XX 為新貓咪編號）
2. `img` 欄位填一般 URL 字串 `'https://lovecat.cc/images/kitten-kXX.jpg'`
3. 不需修改 `src/worker.js` 服務圖片，資產層自動依路徑提供
- **⚠️ img 欄位絕不用 base64！** 2026/06 已把首頁從 2.69MB base64 內嵌優化到約 400KB，
  用 base64 塞回去會讓首頁變慢、回到原本效能問題。

## 已完成功能
- 預約表單：FormSubmit.co（`https://formsubmit.co/ajax/opopwowo@gmail.com`）
- 靜態路由：`privacy.html`、`terms.html`、`llms.txt`、`llms-full.txt`、`robots.txt`、`sitemap.xml`、`feed.xml`（皆位於 `public/`）
- IndexNow 金鑰：`9d987292186a422895a6f7aa98de9039`（驗證檔同名 .txt）
- SEO：title、meta description、Open Graph、canonical 全部設好（已更新為 lovecat.cc）
- og:image：`https://lovecat.cc/og-image.jpg`
- Google Search Console：需在 `index.html` 約第 35 行填入真實驗證碼
- **推播通知（2026/06 改用 Webpushr 第三方 SaaS）**：全站右下角「🐱 新貓到店通知」浮動按鈕即可訂閱（Web Push，免裝 App）。
  - 舊自建推播（自家 VAPID、Cloudflare KV、`/admin/notify-new-kitten` 後台）已**完全移除**。
  - 檔案：`public/webpushr-sw.js`（Service Worker）、`public/webpushr-widget.js`（浮動按鈕＋成功提示）。
    Tracking Code 內嵌在全站每個 HTML 頁面的 `</head>` 前（含 worker 動態產生的 `/area/*`；
    `/kitten/*` 沿用首頁模板自動繼承，不需額外處理）。
  - 發送通知、看訂閱數、Site Key 等一律在 Webpushr 後台（https://www.webpushr.com）操作，Claude 無權限代操作。

## 注意事項
- 上傳檔案到 GitHub 時**不要包含 `public/index.html`**（除非本次任務就是改它），避免覆蓋已有的修改
- 品種頁目錄是**單數 `breed/`**，不是 `breeds/`
- 新增／修改靜態頁面時，新檔案要包在既有 HTML 模板裡（複製自其他頁面），
  Webpushr Tracking Code + `<script src="/webpushr-widget.js" defer></script>` 才會自動帶到。
  大量新增又漏掉時，可重跑當初的批次插入腳本（在 `</head>` 前插入）。
- 純靜態頁面新增/修改檔案即可，**不需要碰 `src/worker.js`**；只有動態路由（`/area/*`、`/kitten/*`、轉址）才需改 worker。
- 新增頁面記得同步更新 `public/sitemap.xml`（部署後 IndexNow 會依它推送）。
