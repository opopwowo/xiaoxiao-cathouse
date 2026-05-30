# 小小貓屋 Little Cat House — 開發備忘

## 重要規則
- **全程使用繁體中文**回覆使用者
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

### 待使用者完成（一次性）
部署後第一次有人送出表單，FormSubmit.co 會寄啟用確認信到 Gmail，點擊確認即完成啟用。
