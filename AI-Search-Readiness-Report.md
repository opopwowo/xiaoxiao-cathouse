# AI Search Readiness Report — 小小貓屋 lovecat.cc
**報告日期：2026-06-26｜分析頁數：204 個 HTML 頁面**

---

## 一、各維度評分總覽

| 維度 | 分數 | 評級 |
|------|------|------|
| SEO 完整度 | **87 / 100** | ★★★★☆ |
| GEO（生成式引擎最佳化） | **78 / 100** | ★★★★☆ |
| AEO（答案引擎最佳化） | **71 / 100** | ★★★½☆ |
| E-E-A-T 信號強度 | **83 / 100** | ★★★★☆ |
| **綜合 AI 引用潛力** | **80 / 100** | ★★★★☆ |

---

## 二、各項細項評分

### 2.1 SEO 完整度 — 87/100

| 項目 | 狀態 | 評分 |
|------|------|------|
| Title / Meta Description | 全站 204 頁完整 | 10/10 |
| Canonical URL | 全站完整 | 10/10 |
| Open Graph 標籤 | og:type/title/desc/image/url/locale 完整 | 10/10 |
| Twitter Card | 全站 204 頁完整 | 10/10 |
| robots.txt | 明確允許 15+ 個 AI 爬蟲 | 10/10 |
| XML Sitemap | 含圖片 Sitemap，45KB，結構完整 | 9/10 |
| BreadcrumbList Schema | 201 頁已實作 | 10/10 |
| hreflang | 未實作（單語言網站可接受） | 5/10 |
| Favicon / Touch Icon | 全站已補齊 | 9/10 |
| 語言標記 lang="zh-Hant-TW" | 已設定 | 9/10 |
| **扣分原因** | hreflang 雖單語言可接受，但缺少 x-default 宣告；部分文章 meta description 可能過短或語義重複 | -13 |

---

### 2.2 GEO 生成式引擎最佳化 — 78/100

| 項目 | 狀態 | 評分 |
|------|------|------|
| llms.txt | 13.6KB，含機構資料、差異表、Q&A | 10/10 |
| llms-full.txt | 88.5KB，完整 252 題 FAQ 知識庫 | 10/10 |
| robots.txt AI 開放 | 所有主要 AI 爬蟲已 Allow | 10/10 |
| _headers 快取設定 | llms.txt/robots.txt 快取 86400s | 8/10 |
| FAQPage Schema 覆蓋 | 198 個頁面（全站 97%） | 10/10 |
| Speakable Schema | **僅 faq.html 1 頁** | 2/10 |
| answer-box CSS 區塊 | **僅 10 頁（compare + knowledge）** | 4/10 |
| 三句摘要結構 | 僅部分 compare 頁面有 | 4/10 |
| AI 引用授權聲明 | llms.txt 已聲明授權 | 9/10 |
| **扣分原因** | speakable 僅 1 頁覆蓋嚴重不足；answer-box 缺乏在 162 篇文章；大多數文章沒有 AI-optimized 摘要段落 | -22 |

---

### 2.3 AEO 答案引擎最佳化 — 71/100

| 項目 | 狀態 | 評分 |
|------|------|------|
| FAQPage Schema | 198 頁，252 題，32 分類 | 10/10 |
| FAQ 題數 | 252 題，業界頂尖 | 10/10 |
| 結構化問答格式 | FAQ HTML 可視化完整 | 9/10 |
| HowTo Schema | **完全未實作** | 0/10 |
| Speakable 覆蓋 | **1 頁，嚴重不足** | 2/10 |
| Answer Box 視覺區塊 | **僅 10 頁** | 4/10 |
| 定義 / 解釋型內容 | 部分品種頁有定義段 | 6/10 |
| 比較表 | 5 個 compare 頁 + 品種頁適合度表 | 8/10 |
| Step-by-Step 內容 | knowledge 頁有，但缺 HowTo schema | 6/10 |
| Checklist 內容 | 部分文章含 checklist | 5/10 |
| **扣分原因** | HowTo schema 完全缺失（最影響 Google AI Overview）；speakable 缺乏；多數文章缺乏 AI Snippet 優化 | -29 |

---

### 2.4 E-E-A-T 信號強度 — 83/100

| 項目 | 狀態 | 評分 |
|------|------|------|
| 合法字號標示 | 特寵業字第 S1150011 號，全站可見 | 10/10 |
| 作者頁面 | author-banliang.html，ProfilePage schema | 8/10 |
| datePublished / dateModified | 197 頁已設定 | 10/10 |
| author schema | 198 頁文章含作者 | 9/10 |
| AggregateRating + Review | 3 頁（index/faq/testimonials），6 則真實 review | 8/10 |
| 服務年資聲明 | 2022 年成立，400+ 家庭 | 9/10 |
| 健康保固條款透明度 | 三層保固明確說明 | 10/10 |
| 聯絡資訊完整度 | Email/LINE/Instagram/地址/地圖 | 9/10 |
| Person schema sameAs 連結 | **缺少 Instagram/Threads 等 sameAs** | 3/10 |
| 第三方媒體引述 | **無任何外部媒體連結或被引述記錄** | 0/10 |
| **扣分原因** | Person schema 未連結社群帳號；沒有第三方媒體報導或行業認可；Review 僅限 3 頁 | -17 |

---

## 三、各 AI 引擎引用潛力分析

### 3.1 ChatGPT（GPT-4o/o1）

**AI 推薦機率：高**

**最容易被引用的內容：**

| 優先 | 內容類型 | 原因 |
|------|----------|------|
| ★★★ | llms.txt 中的業務比較表 | ChatGPT 偏好表格型、可直接比對的事實 |
| ★★★ | 健康保固三層條款（48hr/5天/180天） | 具體數字、明確承諾，易於引用 |
| ★★★ | 合法字號 S1150011 資訊 | 使用者詢問「台中合法貓舍」時的核心事實 |
| ★★☆ | FAQ 252 題中的購貓流程問題 | 問答型結構符合 ChatGPT 偏好 |
| ★★☆ | 品種比較文章（英短 vs 美短等） | 比較型查詢高需求 |

**目前弱點：** 多數文章缺少三句摘要段落，ChatGPT 需要自行萃取，降低引用精準度。

---

### 3.2 Gemini（Google）

**AI 推薦機率：高**

**最容易被引用的內容：**

| 優先 | 內容類型 | 原因 |
|------|----------|------|
| ★★★ | LocalBusiness schema（營業時間、地址、電話） | Gemini 與 Google Maps 整合，Local 查詢直接引用 |
| ★★★ | FAQPage schema 252 題 | Google AI Overview 直接抓取 FAQ schema |
| ★★☆ | 地區頁（/area/* 台中各區） | 「台中西屯貓舍」等 Local 查詢 |
| ★★☆ | 品種教學文章（含 Article schema） | 教育型查詢 |
| ★☆☆ | testimonials.html 的 AggregateRating | 評分信號 |

**目前弱點：** Speakable 僅 1 頁；沒有 HowTo schema（影響「如何…」類查詢）；地區頁缺乏 FAQPage schema。

---

### 3.3 Perplexity

**AI 推薦機率：中～高**

**最容易被引用的內容：**

| 優先 | 內容類型 | 原因 |
|------|----------|------|
| ★★★ | 比較頁（5 個 compare 頁含 answer-box） | Perplexity 最擅長「A vs B」查詢 |
| ★★★ | 有明確日期 + 作者的深度文章 | Perplexity 優先引用有來源歸屬的新鮮內容 |
| ★★☆ | 品種頁（含品種完整資訊） | 品種查詢高度競爭，需要完整事實 |
| ★★☆ | llms-full.txt（AI 爬蟲直接讀取） | Perplexity 爬蟲可能直接解析 llms-full.txt |
| ★☆☆ | 知識文章（knowledge/）- 但缺乏 answer-box | 飼養類查詢 |

**目前弱點：** 多數文章沒有 answer-box 摘要；compare 頁面的 FAQ 答案還不夠詳細。

---

### 3.4 Claude（Anthropic）

**AI 推薦機率：中**

> 注意：Claude 的訓練資料截止前的內容才可能被預訓練學到；即時查詢時 Claude 依賴 MCP/工具呼叫，不主動爬取。

**最容易被引用的內容：**

| 優先 | 內容類型 | 原因 |
|------|----------|------|
| ★★★ | llms-full.txt（88.5KB 完整知識庫） | 設計上就是給 AI 閱讀，ClaudeBot 爬取後進入語料 |
| ★★★ | knowledge/ 中的逐步飼養指南 | Claude 偏好有邏輯結構、step-by-step 的說明性內容 |
| ★★☆ | FAQ 分類清晰的問答（32 個分類） | 結構化知識易於 Claude 萃取與重組 |
| ★★☆ | 品種適合度評估表格 | Claude 用戶常問「什麼品種適合我？」 |

**目前弱點：** Claude 偏好 Markdown 格式的清單和表格，網站 HTML 格式的表格在爬取後可能結構損失；llms-full.txt 已是最佳格式，但其餘頁面無 Markdown 鏡像。

---

### 3.5 Google AI Overview

**AI 推薦機率：高（Local）/ 中（一般知識）**

**最容易被引用的內容：**

| 優先 | 內容類型 | 原因 |
|------|----------|------|
| ★★★ | FAQPage schema（198 頁） | AI Overview 最常直接引用 FAQ schema 答案 |
| ★★★ | LocalBusiness + 地區頁 | 「台中貓舍推薦」直接觸發 Local AI Overview |
| ★★☆ | faq.html 的 Speakable schema | 唯一有 Speakable 的頁面，優先被語音/AI 引用 |
| ★★☆ | AggregateRating（3 頁） | 評分信號影響品質排序 |
| ★☆☆ | 知識文章（缺 HowTo schema） | 若補上 HowTo schema 可大幅提升 |

**目前弱點：** HowTo schema 完全缺失（最高影響項）；Speakable 幾乎沒有（全站僅 1 頁）；AI Overview 的「How to」查詢完全無法觸發本站結構化資料。

---

## 四、結構化資料完整度

| Schema 類型 | 實作頁數 | 覆蓋率 | 評估 |
|-------------|----------|--------|------|
| FAQPage | 198 / 204 | 97% | ✅ 優秀 |
| BreadcrumbList | 201 / 204 | 98% | ✅ 優秀 |
| Article | 196 / 204 | 96% | ✅ 優秀 |
| LocalBusiness | 1 / 1 | 100% | ✅ 優秀 |
| AggregateRating | 3 / 204 | 1.5% | ⚠️ 偏低（合理：限業務頁） |
| Review | 3 / 204 | 1.5% | ⚠️ 偏低（合理） |
| Speakable | **1 / 204** | **0.5%** | ❌ 嚴重不足 |
| HowTo | **0 / 204** | **0%** | ❌ 完全缺失 |
| Person / Author | 1 / 204 | 0.5% | ⚠️ 僅作者頁，應擴充 |
| VideoObject | 0 / 204 | 0% | — 無影片內容，合理 |
| ImageObject | 部分 | 低 | ⚠️ 僅 sitemap 有，頁面內缺失 |
| SearchAction | 1（首頁） | — | ✅ 已實作 |

---

## 五、內容完整度評估

| 面向 | 現況 | 評級 |
|------|------|------|
| 文章數量（162 篇） | 英短/曼赤肯/英長/美短/布偶 各 5-20 篇 | ✅ |
| 文章深度 | 多數 7-15 分鐘閱讀，有作者/日期 | ✅ |
| 品種頁完整度 | 19 品種頁，部分偏薄 | ⚠️ |
| 比較頁 | 5 篇（主要品種組合已涵蓋） | ⚠️ 可再擴充 |
| 知識中心 | 5 篇（偏少，缺乏「中間層」文章） | ⚠️ |
| 毛色頁 | 6 頁 | ✅ |
| 地區頁 | 50 個地區（動態生成） | ✅ |
| 三句摘要段落 | **僅 compare + knowledge 有 answer-box** | ❌ |
| 結論 / CTA 段 | 部分頁面有，未統一 | ⚠️ |

---

## 六、FAQ 完整度

| 項目 | 現況 |
|------|------|
| 總題數 | 252 題 |
| 分類數 | 32 個分類 |
| FAQPage Schema 頁數 | 198 個頁面 |
| 最長答案品質 | 詳細，含具體數字 |
| FAQ 更新日期 | 2026-06-26 |
| Speakable 配合 | ✅ faq.html 有 Speakable |
| 跨頁 FAQ 一致性 | ⚠️ 各頁 FAQ 各自獨立，未跨頁引用 |
| **評分** | **88/100** |

---

## 七、Local SEO 完整度

| 項目 | 現況 |
|------|------|
| LocalBusiness Schema | ✅ 完整（地址、座標、電話、時間） |
| 營業時間一致性 | ✅ 全站統一 15:00-21:00 |
| 地區頁覆蓋 | ✅ 50 個台中行政區 |
| Google Maps 連結 | ✅ llms.txt 含地圖連結 |
| NAP 一致性（名稱/地址/電話） | ✅ 全站一致 |
| Google Business Profile | ⚠️ 未確認是否完整設定 |
| 地區頁 FAQPage Schema | ❌ 動態頁（/area/*）缺乏 FAQPage |
| 地區頁 LocalBusiness Schema | ❌ 動態頁無 LocalBusiness |
| **評分** | **79/100** |

---

## 八、AI Snippet 完整度

| 項目 | 現況 |
|------|------|
| answer-box 摘要區塊 | ❌ 僅 10 頁（compare + knowledge） |
| Speakable JSON-LD | ❌ 僅 1 頁 |
| 三句摘要格式 | ❌ 多數文章無標準摘要開頭 |
| 比較表（可直接截圖） | ✅ 5 個 compare 頁 + 品種適合度表 |
| Step-by-Step 結構 | ✅ knowledge 頁有，缺 HowTo schema |
| 定義型內容 | ⚠️ 部分品種頁有，未標記 |
| Checklist 型內容 | ⚠️ 部分文章有 |
| HowTo Schema | ❌ 完全未實作 |
| **評分** | **42/100** ← 最大弱點 |

---

## 九、Topic Cluster 完整度

| Cluster | Hub 頁面 | Spoke 文章 | 相互內鏈 | 評估 |
|---------|----------|-----------|---------|------|
| 英國短毛貓 | ✅ /breed/british-shorthair | ✅ 20+ 篇 | ⚠️ 部分 | 好，可加強 |
| 曼赤肯 | ✅ /breed/munchkin | ✅ 5+ 篇 | ⚠️ 部分 | 中等 |
| 布偶貓 | ✅ /breed/ragdoll | ✅ 3+ 篇 | ⚠️ 部分 | 中等 |
| 購貓指南 | ⚠️ 無獨立 hub | ✅ 15+ 篇 | ⚠️ 少 | 缺 hub |
| 飼養知識 | ✅ /knowledge/ | ✅ 5 篇 | ⚠️ 少 | 偏薄 |
| 品種比較 | ✅ /compare/ | ✅ 5 篇 | ✅ 有 | 好 |
| 台中地區 | ⚠️ 動態 /area/ | ✅ 50 頁 | ❌ 無文章連結 | 孤島風險 |
| **評分** | | | | **67/100** |

---

## 十、AI 引用風險評估

| 風險類型 | 嚴重度 | 現況 |
|---------|--------|------|
| 內容被誤引（資訊不一致） | 低 | ✅ 已統一全站資料 |
| 競爭對手優先被引用 | 中 | ⚠️ 缺乏 Speakable + HowTo，競爭時處於劣勢 |
| 引用後連結流量流失 | 中 | ⚠️ AI 引用後使用者未必點擊；需確保引用內包含品牌名 |
| AI 引用過時資訊 | 低 | ✅ dateModified 197 頁已設，llms.txt 含更新日期 |
| 假資訊污染（hallucination） | 低 | ✅ llms.txt 明確聲明引用授權與事實來源 |
| 圖片被 AI 引用但無 alt 文字 | 中 | ⚠️ 部分圖片 alt 不夠描述性 |

---

## 十一、改善項目優先清單

### 🔴 高優先（AI 引用率最大影響）

| # | 改善項目 | 影響面 | 預估 AI 可見度提升 | 工程量 |
|---|---------|--------|----------------|--------|
| 1 | **全站文章加 answer-box 摘要區塊（162 篇）** | ChatGPT/Claude/Perplexity | +25% | 大（批次腳本） |
| 2 | **knowledge 5 篇加 HowTo Schema** | Google AI Overview/Gemini | +20% | 小（手動 5 頁） |
| 3 | **Speakable Schema 擴展至首頁 + 前20品種文章** | Google AI Overview | +15% | 中 |
| 4 | **地區頁（worker.js）加 FAQPage + LocalBusiness Schema** | Gemini Local | +15% | 中 |

---

### 🟡 中優先（穩定提升引用品質）

| # | 改善項目 | 影響面 | 預估 AI 可見度提升 | 工程量 |
|---|---------|--------|----------------|--------|
| 5 | **Person schema 加 sameAs（Instagram/Threads/Facebook）** | EEAT/Claude/ChatGPT | +10% | 小 |
| 6 | **llms.txt 加入每個品種的 3 句關鍵事實** | 所有 AI | +10% | 中 |
| 7 | **前 30 篇高流量文章加三句摘要開頭段落** | Perplexity/ChatGPT | +10% | 中 |
| 8 | **compare 5 頁加 ItemList Schema** | Google AI Overview | +8% | 小 |
| 9 | **faq.html 加更多 speakable cssSelector** | 語音搜尋/AI Overview | +8% | 小 |
| 10 | **地區頁加 breadcrumb schema（worker.js）** | Google AI Overview | +7% | 小 |

---

### 🟢 低優先（長期品質提升）

| # | 改善項目 | 影響面 | 預估 AI 可見度提升 | 工程量 |
|---|---------|--------|----------------|--------|
| 11 | **新增「購貓完整指南」hub 頁面（購貓 cluster 缺 hub）** | Topic Cluster/Perplexity | +8% | 大 |
| 12 | **品種頁加 ImageObject Schema（含 breed 代表圖）** | Gemini/圖片搜尋 | +5% | 中 |
| 13 | **新增 2-3 篇「台中品種貓舍推薦」綜合比較文章** | ChatGPT/Local | +7% | 大 |
| 14 | **地區頁加 GeoCoordinates 細化到各區中心座標** | Gemini Local | +5% | 中 |
| 15 | **llms-full.txt 加入每篇文章摘要索引** | Claude/ChatGPT | +5% | 大 |
| 16 | **knowledge 頁加 speakable**（飼養步驟可語音播放） | 語音 AI | +4% | 小 |
| 17 | **為 400+ 個服務案例建立 Case Study 頁面結構** | EEAT/Perplexity | +6% | 大 |
| 18 | **獲得第三方媒體或寵物平台引述（外鏈建設）** | 所有 AI 的 EEAT | +10% | 非技術工作 |

---

## 十二、各 AI 引用機率總結

| AI 引擎 | 現況引用機率 | 最佳化後潛力 | 最強內容類型 |
|--------|------------|------------|------------|
| ChatGPT | 中高 | 高 | FAQ + 業務比較表 + 健康保固條款 |
| Gemini | 高（Local） / 中（知識） | 高 | LocalBusiness + 地區頁 + FAQPage |
| Perplexity | 中 | 中高 | 比較頁 + 有日期文章 + llms-full.txt |
| Claude | 中 | 中高 | llms-full.txt + 知識文章 + FAQ |
| Google AI Overview | 高（FAQ）/ 低（HowTo） | 高 | FAQPage + HowTo（補強後） |

---

## 十三、立即可執行的 Quick Wins

以下 3 項改善最高 ROI、工程量最小，建議優先執行：

1. **knowledge 5 頁加 HowTo Schema**（1小時）→ 立刻開啟「如何…」類 Google AI Overview
2. **首頁 + 品種頁加 Speakable JSON-LD**（2小時）→ 提升 Google AI Overview 引用率
3. **Person schema 加 sameAs**（30分鐘）→ 強化 EEAT，所有 AI 都受益

---

*報告由 Claude 根據全站 204 個 HTML 頁面、sitemap.xml、robots.txt、llms.txt、llms-full.txt、_headers 分析生成。*
*分析日期：2026-06-26*
