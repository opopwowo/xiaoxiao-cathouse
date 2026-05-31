# 小小貓屋 Little Cat House — 開發備忘

## 重要規則
- **全程使用繁體中文**回覆使用者，包含所有工具呼叫的 description 說明文字
- 網站部署平台：**Cloudflare Workers**（不是 Netlify，不是 Pages）
- 網站網址：`https://lovecat.cc/`（正式網域，2026/05 切換）
- 舊網址：`https://littlecathouse.opopwowo.workers.dev/`（保留做 301 轉址用）

## 專案說明
單頁靜態網站（`index.html`），繁體中文，台中精品貓舍。
收件信箱：`opopwowo@gmail.com`

## 自動部署架構
- GitHub 推送 → GitHub Actions → Cloudflare Workers 自動更新
- Worker 名稱：`littlecathouse`
- Cloudflare Account ID：`765b53d58aff247a2f3d86b086f63450`
- 設定檔：`wrangler.toml`、`src/worker.js`
- 部署流程：`.github/workflows/deploy.yml`

## 新增貓咪方式（使用者直接說即可）
使用者只需傳送以下格式，Claude 直接更新 index.html 並推上 GitHub：

```
品種：（例：英短藍白、布偶貓、小步舞曲）
性別：弟弟 或 妹妹
生日：YYYY/MM/DD
價格：（選填，不填顯示「洽詢」）
描述：（選填）
照片：（附圖）
```

貓咪資料位置：`index.html` 第 11328 行 `const kittens = [`
欄位：`id`、`breedEn`、`breedZh`、`gender`、`birth`、`price`、`tag`、`desc`、`breedCategory`、`genderCode`、`img`（base64）

## 已完成功能
- 預約表單：FormSubmit.co（`https://formsubmit.co/ajax/opopwowo@gmail.com`）
- 路由：`privacy.html`、`terms.html`、`llms.txt`、`robots.txt`、`sitemap.xml`
- IndexNow 金鑰：`9d987292186a422895a6f7aa98de9039`
- SEO：title、meta description、Open Graph、canonical 全部設好（已更新為 lovecat.cc）
- og:image：`https://lovecat.cc/og-image.jpg`（需上傳 `og-image.jpg` 到 repo 根目錄）
- Google Search Console：需在 index.html 第 35 行填入真實驗證碼
- 301 轉址：worker.js 自動將舊網域（workers.dev）全部轉到 lovecat.cc

## 注意事項
- 上傳檔案到 GitHub 時**不要包含 index.html**，避免覆蓋已有的修改
- 所有頁面路由都在 `src/worker.js` 管理
