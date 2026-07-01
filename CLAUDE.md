# 小小貓屋 Little Cat House — 開發備忘

## 重要規則
- **全程使用繁體中文**回覆使用者，包含所有工具呼叫的 description 說明文字
- 網站部署平台：**Cloudflare Workers**（不是 Netlify，不是 Pages）
- 網站網址：`https://lovecat.cc/`（正式網域，2026/05 切換）
- 舊網址：`https://littlecathouse.opopwowo.workers.dev/`（保留做 301 轉址用）
- 上傳檔案到 GitHub 時**不要包含 `public/index.html`**，避免覆蓋已有的修改

## 專案說明
台中精品貓舍的內容型靜態網站，繁體中文。首頁為單頁式（`public/index.html`），
另有大量文章／品種／比較／地區等 SEO 頁面。特寵業字第 S1150011 號。
- 收件信箱：`opopwowo@gmail.com`
- LINE 預約連結：`https://lin.ee/Xq0CykG`

## 專案結構
```
xiaoxiao-cathouse/
├── CLAUDE.md                 ← 本檔
├── wrangler.toml             ← Cloudflare Workers 設定（Static Assets）
├── src/worker.js             ← 唯一的動態邏輯（見下方「動態路由」）
├── .github/workflows/deploy.yml  ← 推 master → 自動部署 + IndexNow
├── content/breeds/*.md       ← 品種內容「原稿」（Markdown，31 篇，**不會被部署**，供撰稿參考）
├── *.md（根目錄報告）        ← SEO/內容策略稽核報告（見下方「文件報告」，**不會被部署**）
└── public/                   ← ⭐ 網站根目錄，Cloudflare 直接從資產層服務此目錄
    ├── index.html            ← 首頁（含 kittens 幼貓陣列）
    ├── _headers              ← 全站 HTTP headers（Cache-Control、安全性、noindex）
    ├── robots.txt / sitemap.xml / feed.xml / manifest.json
    ├── llms.txt / llms-full.txt   ← 給 AI 爬蟲的網站摘要
    ├── privacy.html / terms.html / faq.html / testimonials.html / found-home.html
    ├── breeding.html / buying-center.html / area-guide.html
    ├── articles/  （164 檔）  ← 部落格文章 + articles/index.html 索引
    ├── breed/     （21 檔）   ← 品種介紹頁（20 品種 + index.html，⚠️ 單數 breed）
    ├── color/     （6 檔）    ← 毛色主題頁（藍/乳/雙色/虎斑/金銀漸層）
    ├── compare/   （6 檔）    ← 品種比較頁（5 組 + index.html）
    ├── knowledge/ （6 檔）    ← 新手照護／健康知識頁
    ├── images/               ← 所有圖片（幼貓照 kitten-kXX.jpg、cat01–19、品種圖等）
    ├── kittens-data.js       ← 幼貓共用資料（品種/比較/毛色頁取即時在售資訊用）
    ├── kitten-widget.js      ← 頁面嵌入「在售幼貓」浮動卡片
    ├── related.js            ← 文章相關推薦（依 slug 對應標籤）
    ├── share-buttons.js      ← 社群分享按鈕
    ├── webpushr-sw.js / webpushr-widget.js  ← Web Push 推播（見下方）
    └── 9d987292186a422895a6f7aa98de9039.txt ← IndexNow 金鑰驗證檔
```

## 自動部署架構
- **流程**：推送到 `master` → GitHub Actions（`.github/workflows/deploy.yml`）→
  `wrangler deploy` 部署到 Cloudflare Workers → 自動抓 `sitemap.xml` 全部網址推送 IndexNow 通知搜尋引擎
- Worker 名稱：`littlecathouse`｜Cloudflare Account ID：`765b53d58aff247a2f3d86b086f63450`
- GitHub Secrets 需有：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`
- **架構（2026/06 已 migrate）：Workers Static Assets**。所有靜態檔案放在 `public/`，
  由 Cloudflare 直接從資產層服務，**不會計入 Worker 程式包 3MiB 大小上限**。
  `wrangler.toml` 以 `[assets] directory = "./public"`、`binding = "ASSETS"`、
  `run_worker_first = true`、`not_found_handling = "single-page-application"` 設定。
  ⚠️ **千萬別把大量內容檔案改回用 `import` 塞進 `src/worker.js`**，這正是之前造成部署連續失敗 4 天的原因。

## 動態路由（`src/worker.js`）
Worker 只保留真正需要動態邏輯的部分，其餘所有路徑（含找不到的）最後都 fallthrough 到
`env.ASSETS.fetch(request)`，由 `public/` 的檔案處理。目前處理的動態路由：
1. **舊網域 301**：`littlecathouse.opopwowo.workers.dev/*` → `lovecat.cc/*`
2. **`/reviews`** → 內部重寫供給 `/testimonials`（別名，無實體檔）
3. **`MERGED_REDIRECTS`**：內容整併後被合併的舊文章 301 導向保留頁（集中 SEO 權重）
4. **`/articles`** → 內部重寫供給 `/articles/`（省一次轉址）
5. **`/found-home`** → 302 回首頁（「找到家的孩子」暫時下線）
6. **`/kittens`**：沿用首頁 HTML 但客製 meta，讓待售列表可被索引/分享
7. **`/area/{slug}`**：50 個地區頁（台中 29 區 + 外縣市），由 `AREA_DATA` + `buildAreaHtml()` 動態產生
8. **`/kitten/{kXX}`**：在售幼貓（列在 `kittenMeta`）產生客製詳情頁；已售出/下架者 301 轉回 `/kittens`

> ⚠️ `src/worker.js` 內有一份 `kittenMeta`（在售幼貓 breedZh/gender/price）供 `/kitten/*` 詳情頁用。
> 幼貓上下架時，除了改 `public/index.html`，也要同步這份 `kittenMeta`，否則詳情頁資料會不一致。
> 純靜態頁面新增/修改檔案即可，**不需要碰 `src/worker.js`**。

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

**⚠️ img 欄位不要用 base64！**（2026/06 已將首頁從 2.69MB base64 內嵌圖片優化到 400KB，
若新貓咪照片又用 base64 塞回 index.html 會讓首頁變慢、回到原本的效能問題）
新增貓咪照片的正確流程：
1. 把照片存成 `public/images/kitten-kXX.jpg`（XX 為新的貓咪編號）
2. `public/index.html` 的 kittens 陣列中，該貓咪的 `img` 欄位填
   `'https://lovecat.cc/images/kitten-kXX.jpg'`（一般 URL 字串，不是 base64）
3. 靜態資源層會自動依路徑服務該圖片
4. 若該貓要有 `/kitten/kXX` 詳情頁，記得同步更新 `src/worker.js` 的 `kittenMeta`
5. 品種/比較/毛色頁若要顯示此貓，也同步 `public/kittens-data.js`

## 已完成功能
- 預約表單：FormSubmit.co（`https://formsubmit.co/ajax/opopwowo@gmail.com`）
- 靜態路由：`privacy.html`、`terms.html`、`llms.txt`、`robots.txt`、`sitemap.xml`（皆位於 `public/`）
- IndexNow 金鑰：`9d987292186a422895a6f7aa98de9039`（驗證檔在 `public/`，部署後自動推送）
- SEO：title、meta description、Open Graph、canonical 全部設好（已更新為 lovecat.cc）
- og:image：`https://lovecat.cc/og-image.jpg`（檔案位於 `public/og-image.jpg`）
- Google Search Console：需在 `index.html` 第 35 行填入真實驗證碼
- 301 轉址：worker.js 自動將舊網域（workers.dev）全部轉到 lovecat.cc
- **推播通知（2026/06 改用 Webpushr 第三方服務）**：訪客點右下角「🐱 新貓到店通知」浮動按鈕即可訂閱（Web Push，免裝 APP）。
  - 舊的自建推播系統（自家 VAPID、Cloudflare KV、`/admin/notify-new-kitten` 後台）已**完全移除**，改用 Webpushr SaaS。
  - 安裝位置：`public/webpushr-sw.js`（Service Worker）、`public/webpushr-widget.js`（浮動按鈕＋訂閱成功提示）。
    Tracking Code 已內嵌在全站每個 HTML 頁面的 `</head>` 前（含 `src/worker.js` 動態產生的地區頁 `/area/*`；
    幼貓詳情頁 `/kitten/*` 因沿用首頁 HTML 模板，會自動繼承 Tracking Code，不需額外處理）。
  - 發送通知、查看訂閱數、Site Key 等管理一律在 Webpushr 後台（https://www.webpushr.com）操作，Claude 無權限代為操作。
  - 新增/修改靜態頁面時，新檔案要包在既有 HTML 模板裡（複製自其他頁面），Tracking Code 才會自動帶到；
    若大量新增又漏掉，可重新執行批次插入腳本（在 `</head>` 前插入 Tracking Code + `<script src="/webpushr-widget.js" defer></script>`）。

## content/ 與根目錄報告（皆不部署）
- `content/breeds/*.md`：品種內容 Markdown **原稿**（含 SEO title/description、ALT、內文），
  供撰寫 `public/breed/*.html` 或文章時參考。**不在 `public/` 內，不會被 Cloudflare 服務。**
- 根目錄 `*.md` 報告（`AI-Search-Readiness-Report*.md`、`CONTENT-STRATEGY-2026.md`、
  `Content-Gap-Report.md`）：SEO／AI 搜尋就緒度／內容缺口稽核報告，屬規劃文件，不部署。

## 新增靜態頁面注意
- 文章在 `public/articles/`、品種頁在 `public/breed/`（單數，不是 breeds）、
  比較頁 `public/compare/`、毛色頁 `public/color/`、知識頁 `public/knowledge/`、圖片 `public/images/`
- 新頁面務必：① 複製既有頁面模板（含 Webpushr Tracking Code）② 更新 `public/sitemap.xml`
  ③ 需要時在 `related.js` 加標籤映射、在 `articles/index.html` 或對應 index 加連結
- 本機測試：`npx wrangler dev`（會同時載入 Static Assets 與 `src/worker.js`）

## Git / 部署提醒
- `master` 是部署分支，推上去即自動上線；請於指定的開發分支開發後再合併
- 開發分支僅提交必要變更，遵守上方「不要覆蓋 `public/index.html`」等規則
