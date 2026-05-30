# 小小貓屋 Little Cat House — 開發備忘

## 重要規則
- **全程使用繁體中文**回覆使用者，包含所有工具呼叫的 description 說明文字
- 網站部署平台：**Cloudflare Pages**（不是 Netlify）

## 專案說明
單頁靜態網站（`index.html`，約 12,900 行），繁體中文，台中精品貓舍。

## 目前進行中的分支
`claude/todo-implementation-UTEsB`

## 已完成的工作
### 預約表單送出功能（取代原本的 alert 佔位符）
- **方案**：FormSubmit.co（零設定、無需 API Key，適用 Cloudflare）
- **表單送出端點**：`https://formsubmit.co/ajax/opopwowo@gmail.com`
- **收件信箱**：`opopwowo@gmail.com`
- 加入送出中狀態（按鈕停用 + 文字變「送出中⋯」）
- 加入頁面內成功訊息（取代 alert 彈窗）
- 加入錯誤提示橫幅

### GitHub Actions 自動部署設定（已推送，尚未完成啟用）
- 新增 `wrangler.toml`（Worker 名稱：`littlecathouse`）
- 新增 `.github/workflows/deploy.yml`
- Cloudflare Account ID：`765b53d58aff247a2f3d86b086f63450`
- **目前部署方式**：Cloudflare Worker（手動部署），網址：`https://littlecathouse.opopwowo.workers.dev/`

## 使用者待完成事項（下次繼續）
1. **建立 Cloudflare API Token**
   - 前往 `dash.cloudflare.com/profile/api-tokens`
   - 選「Edit Cloudflare Workers」範本 → 建立 → 複製 Token

2. **在 GitHub 加入兩筆 Secrets**（`github.com/opopwowo/xiaoxiao-cathouse` → Settings → Secrets → Actions）
   - `CLOUDFLARE_API_TOKEN` = 上面複製的 Token
   - `CLOUDFLARE_ACCOUNT_ID` = `765b53d58aff247a2f3d86b086f63450`

3. **完成後推一次 GitHub**，Actions 就會自動部署，之後每次推送都會自動更新網站

4. **網站上線後**，自己填一次表單，收到 FormSubmit.co 確認信點一下，表單功能就正式啟用
