# AI Search Readiness Report v2
## 小小貓屋 lovecat.cc — 完整稽核
**日期：2026-06-26（PR #2 合併後狀態）　｜　掃描範圍：205 個靜態 HTML + 50 動態地區頁 + 11 幼貓頁**

> **架構說明**：本專案為**純靜態 HTML 站**（Cloudflare Workers Static Assets），**無 TSX / React 元件**，故「所有 TSX / React 元件」一項不適用。動態頁（地區頁 `/area/*`、幼貓頁 `/kitten/*`、舊網域 301）由 `src/worker.js` 產生。
>
> 本報告所有數字均由 grep / python 實際統計，非估算；分數為依業界最佳實踐換算的相對評分。**評分不代表、也不保證實際排名或 AI 一定推薦本站。**

---

## 第一步：AI Search Readiness 評分（0–100）

| 維度 | 分數 | 一句話依據 |
|------|:---:|------|
| **SEO** | **90** | title/desc/canonical/favicon/lang/OG/Twitter 全 205 頁 100% 覆蓋，0 重複，H1 全部恰好 1 個 |
| **GEO** | **88** | speakable 202/205、llms.txt+llms-full.txt（含英文節）、answer-box 178 頁 |
| **AEO** | **85** | FAQPage 199 頁、HowTo 5、answer-box 強；ItemList 與表格尚少 |
| **E-E-A-T** | **86** | Person+sameAs+作者頁、VeterinaryCare 合作獸醫、可查驗字號、Review 一致 |
| **Schema 完整度** | **92** | 20+ 型別覆蓋；ImageObject、article 語意標籤偏少 |
| **Core Web Vitals** | **85** | 首頁 356KB 已優化、靜態資產+快取佳；3 個第三方腳本(GA/Clarity/Webpushr)為主要負擔（無實機 Lighthouse 場域數據） |
| **內容完整度** | **90** | 160/160 文章具日期/閱讀時間/作者/answer-box/FAQ/上下篇/相關文章；0 薄內容、0 孤兒頁 |
| **FAQ 完整度** | **95** | faq.html 252 題 32 分類 + 199 頁含 FAQPage |
| **Local SEO 完整度** | **85** | 50 動態地區頁 + geo 座標 + NAP 一致；但區名在靜態內容中偏稀 |
| **Topic Cluster 完整度** | **90** | breed/knowledge/健康 pillar/compare/color 群組完整；比較中心僅 5 頁 |
| **AI Snippet 完整度** | **86** | answer-box 178 + speakable 202 + FAQPage 199；表格/清單 schema 偏少 |
| **Internal Linking** | **90** | 0 孤兒頁、0 失效內鏈、related.js + 上下篇 + footer 群組 + pillar 雙向 |
| **AI 引用風險** | **低（≈18/100，越低越好）** | AggregateRating 已配真實 Review；無誇大、無 cloaking；殘留風險見下 |

### AI 各引擎引用率（預估，非保證）

| 引擎 | 分數 | 主要依據 / 限制 |
|------|:---:|------|
| **Google AI Overview** | **86** | speakable 202 頁 + LocalBusiness + FAQPage 三信號齊備 |
| **Gemini** | **86** | 同 Google 索引生態 + AggregateRating + Review |
| **Claude** | **85** | llms-full.txt 90KB 知識庫 + ClaudeBot 已授權，資訊密度高 |
| **ChatGPT Search** | **84** | llms.txt + FAQPage + HowTo；OAI-SearchBot 已授權 |
| **Perplexity** | **76** | 可驗證字號 + 具體數字強；英文覆蓋雖已補 llms 英文節，仍是相對弱項 |

---

## 第二步：缺失清單（依優先序）

### ★★★★★ 極高優先

**1. breed 21 品種頁缺 answer-box（AI 直取摘要）**
- **目前問題**：178/205 頁有 answer-box，但 21 個品種頁（高商業價值、最常被「○○貓哪裡買」查詢觸發）大多沒有。
- **原因**：先前 answer-box 批次以「文章」為主，品種頁模板不同被略過。
- **影響**：「布偶貓推薦」「英短哪裡買」這類核心轉換查詢，AI 引用品種頁時需自行萃取段落，精準度低。
- **建議修改**：每個品種頁 content 頂端加 `.answer-box`（H1 主題 + 一句話定義 + 價格/適合度），沿用既有 CSS。
- **預估**：SEO +2 / GEO +5 / AI 引用率 +6%
- **檔案**：`public/breed/*.html`（21 個）

**2. Local SEO 區名在靜態內容中過稀**
- **目前問題**：西屯/北屯/南屯 僅 2 頁、烏日/大里/太平 僅 1 頁含該詞（多來自首頁 footer）。核心地區查詢主要靠 50 個動態地區頁支撐。
- **原因**：靜態文章內容未自然帶入台中各區地名。
- **影響**：「台中西屯貓舍」「北屯英短」等長尾在地查詢，AI 可引用的靜態內容少，過度集中於動態頁。
- **建議修改**：在首頁、testimonials、品種頁的在地段落自然帶入區名（不堆砌）；可新增一個「台中各區到府接送」靜態 hub 頁連到 50 個動態地區頁。
- **預估**：SEO +3 / GEO +4 / AI 引用率 +5%
- **檔案**：`public/index.html`、新增 `public/area-guide.html`（hub）、`src/worker.js`（地區頁互連）

---

### ★★★★ 高優先

**3. 文章「結論」段落標準化（僅 14/160 有明確結論標題）**
- **目前問題**：多數文章有收尾段，但僅 14 篇有 `<h2>結論</h2>` 這類明確標題與「3 句總結」。
- **影響**：AI 摘要時偏好擷取明確標示的結論段；缺標準結論降低被當成「答案」的機率。
- **建議修改**：批次為文章補 `<h2>結論</h2>` + 3 句重點（可由現有內容濃縮，不新增冗詞）。
- **預估**：AEO +4 / AI 引用率 +4%
- **檔案**：`public/articles/*.html`（約 146 篇）

**4. ItemList / Table schema 嚴重不足（全站僅 2 頁 ItemList）**
- **目前問題**：大量「比較表」「檢查清單」以可見 HTML 表格/清單存在，但缺對應 `ItemList` / `Table` schema。
- **影響**：AI 對清單/表格型內容引用機率高，但無 schema 時較難被結構化擷取。
- **建議修改**：為 compare 頁的比較表加 schema、為各「○○清單」文章加 `ItemList`（如已對 buying-guide 做的）。
- **預估**：AEO +3 / GEO +2 / AI 引用率 +3%
- **檔案**：`public/compare/*.html`、含清單的 `articles/*.html`

**5. 比較中心（Comparison Center）僅 5 頁**
- **目前問題**：compare/ 只有 5 組；多個高需求組合（如英短 vs 美短已有、但布偶 vs 英長、波斯 vs 金漸層等缺）。
- **注意**：曼赤肯 vs 小步舞曲、金 vs 銀漸層**已有對應 articles**，新增 compare 會造成關鍵字自我競爭——這些要避免重做，只補真正未覆蓋的組合。
- **影響**：比較型查詢是 AI 最愛引用的格式之一。
- **建議修改**：新增 3–5 組未重複的高需求比較頁，並設一個 compare/index.html 比較中心 hub。
- **預估**：GEO +3 / AI 引用率 +4%
- **檔案**：新增 `public/compare/*.html` + `public/compare/index.html`

---

### ★★★ 中優先

**6. ImageObject schema 僅 2 頁**
- **問題/影響**：幼貓照片、品種照片缺 `ImageObject`（含 caption、描述性資訊），降低 Google 圖片與 AI 多模態引用。
- **建議**：首頁幼貓卡片、品種頁主圖加 `ImageObject`（contentUrl + caption + description）。
- **預估**：SEO +2 / AI 引用率 +2%　**檔案**：`index.html`、`breed/*.html`

**7. 多數頁面無明確 robots meta（僅 3 頁）**
- **問題/影響**：雖預設 index,follow 可運作，但無明確 `max-image-preview:large` / `max-snippet:-1` 會限制 AI Overview 顯示完整摘要與大圖。
- **建議**：全站 `<head>` 補 `<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">`。
- **預估**：SEO +1 / AI 引用率 +2%　**檔案**：全站（批次）

**8. 無 RSS / Atom feed**
- **問題/影響**：部分 AI 與內容聚合器透過 feed 快速發現新文章；目前僅靠 sitemap。
- **建議**：產生 `/feed.xml`（articles 最新 N 篇），robots/llms.txt 標註。
- **預估**：GEO +1 / 索引速度提升　**檔案**：新增 `public/feed.xml`

---

### ★★ 低優先

**9. `<article>` 語意標籤僅 1 頁使用**
- 文章正文多用 `<section>`/`<div>`，可將正文主體改 `<article>` 強化語意（不影響外觀）。預估 SEO +1。

**10. Speakable 未覆蓋的 3 頁 / answer-box CSS 一致性**
- 補齊剩餘 3 頁 speakable；確認所有 answer-box 樣式一致。預估 GEO +1。

---

### ★ 建議（未來）

**11. YouTube 短影片 + VideoObject** — 若拍攝幼貓/環境影片，VideoObject 可大幅提升 Google AI Overview 影片引用。
**12. 英文版核心頁（/en 或 /faq-en）** — 進一步補強 Perplexity 英文可見度。
**13. 第三方評論平台整合** — Google 商家評論以 sameAs 連結，強化 Trustworthiness。

---

## 第三步：逐項檢查清單結果

### 【SEO】
| 項目 | 狀態 |
|---|---|
| title 唯一 | ✅ 205/205，0 重複 |
| description 唯一 | ✅ 205/205，0 重複 |
| canonical | ✅ 205/205 |
| robots | ⚠️ robots.txt ✅（14 AI 爬蟲授權）；頁面 robots meta 僅 3 頁（建議 #7）|
| sitemap | ✅ 269 個 URL（含動態頁）+ image sitemap |
| favicon | ✅ 205/205 |
| language | ✅ 205/205 `lang` |
| hreflang | ⚠️ 1 頁（單語站，可接受）|
| Open Graph | ✅ 205/205 |
| Twitter Card | ✅ 205/205 |

### 【Schema】
| 型別 | 覆蓋 | 型別 | 覆蓋 |
|---|---|---|---|
| Organization | ✅ 200 頁 | BreadcrumbList | ✅ 202 頁 |
| LocalBusiness/PetStore | ✅ 首頁+50 地區頁 | Article | ✅ 196 頁 |
| WebSite + SearchAction | ✅ 首頁 | Person | ✅ 199 頁 |
| WebPage + speakable | ✅ 201 頁 | Review + AggregateRating | ✅ 2–3 頁（符合規範，配真實 Review）|
| FAQPage | ✅ 199 頁 | HowTo | ✅ 5 頁 |
| ImageObject | ⚠️ 2 頁（建議 #6）| VideoObject | ⛔ 無影片（正確不使用）|
| Product | ✅ 22 頁 | VeterinaryCare | ✅ 1（合作獸醫）|

### 【HTML】
| 項目 | 狀態 | 項目 | 狀態 |
|---|---|---|---|
| 一頁一個 H1 | ✅ 205/205 | main | ✅ 205 |
| H2/H3 正確 | ✅ | header / footer / nav | ✅ 204/205/203 |
| section | ✅ 56 頁 | article | ⚠️ 1 頁（建議 #9）|
| aside | — 無（此版面不需）| aria-label | ✅ 201 頁 |
| img alt | ✅ 14/14 | loading lazy | ✅ 14/14 |
| decoding async | ✅ 14/14 | width/height | ✅ 13/14（1 為動態 lightbox 無 src，正確略過）|

### 【首頁】12 項全部具備 ✅
品牌介紹/故事 ✅　合法字號 ✅　服務流程 ✅　健康保障 ✅　合作獸醫 ✅　常見問題 ✅　品種介紹 ✅　為什麼選我們 ✅　Google 評論連結 ✅　真實案例/見證 ✅　CTA ✅　AggregateRating ✅

### 【內容】文章完整度（160 篇）
| 更新日期 | 閱讀時間 | 作者 | 三句摘要(answer-box) | FAQ | 上一篇/下一篇 | 相關文章 | 結論 |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| 160 ✅ | 160 ✅ | 160 ✅ | 160 ✅ | 160 ✅ | 160 ✅ | 160 ✅ | ⚠️ 14（建議 #3）|

### 【AEO】每篇文章
- 可直接回答的第一段（answer-box）✅ 160/160
- Definition：多數有（answer-box 即定義型）✅
- Comparison / Table / Step-by-step：部分有，未全面（compare 頁與 HowTo 完整；一般文章不一）⚠️
- Checklist：少數有 ItemList schema（建議 #4）⚠️
- Quick Summary：✅ answer-box 即為摘要

### 【GEO】Hub 建置狀況
| Topic Cluster ✅ | Knowledge Hub ✅(/knowledge) | Comparison Center ⚠️(僅5頁) | FAQ Center ✅(/faq 252題) |
|---|---|---|---|
| **Breed Center ✅(/breed)** | **新手養貓中心 ⚠️(散落，無單一 hub)** | **健康中心 ✅(/knowledge/cat-health 新建)** | |

### 【圖片】
ALT ✅ 全數　Caption ⚠️（部分缺）　ImageObject ⚠️ 2 頁（建議 #6）　描述性檔名 ✅（kitten-kXX.jpg 等）

### 【Local SEO】
台中 ✅ 全站　西屯/北屯/南屯/烏日/大里/太平 ⚠️ 靜態內容稀（靠 50 動態地區頁，建議 #2）

### 【EEAT】
作者 ✅(闆涼+作者頁)　經驗 ✅(400+家庭/2022)　專業 ✅(162文章)　可信度 ✅(可查字號/合約/保固)　資料來源 ⚠️(文章少引用外部權威來源)　合作獸醫 ✅(VeterinaryCare)

---

## 第四步：內容健康掃描

| 檢查項 | 結果 |
|---|---|
| 重複內容 | ✅ 無（0 重複 title/desc）|
| 薄內容(<800字) | ✅ 0 篇 |
| Keyword Cannibalization | ⚠️ 潛在：曼赤肯vs小步舞曲、金vs銀漸層 已有 article，**勿再開 compare 頁**（建議 #5 已標註）|
| 孤兒頁 | ✅ 0 頁 |
| 失效內鏈 / 404 | ✅ 0（掃描到的 4 筆為 `/articles/` 目錄首頁誤判，實際存在）|
| 301 | ✅ 舊網域→lovecat.cc 由 worker.js 處理 |
| 重複 Title | ✅ 0 |
| 重複 Description | ✅ 0 |
| 缺 ALT | ✅ 0 |
| 缺 H1 | ✅ 0 |
| 缺 Schema | ⚠️ ImageObject/ItemList 偏少（非缺漏，是覆蓋不足）|

---

## 第五步：改善排程

### 🔴 立即修改（本次可做，純加法、不動 UI）
- #1 breed 21 頁加 answer-box
- #7 全站 robots meta（max-image-preview:large / max-snippet:-1）
- #10 補齊剩餘 3 頁 speakable

### 🟠 本週修改
- #3 文章結論段標準化（146 篇批次）
- #4 ItemList / Table schema 補強
- #6 ImageObject（首頁幼貓卡 + 品種頁主圖）

### 🟡 本月修改
- #2 Local SEO 區名 hub + 自然帶入
- #5 比較中心擴充（僅補未重複組合）+ compare hub
- #8 RSS feed
- 「新手養貓中心」單一 hub 頁

### ⚪ 未來建議
- #9 article 語意標籤、#11 影片+VideoObject、#12 英文版、#13 第三方評論

---

## 完成所有改善後的預估分數（非保證排名 / 非保證 AI 推薦）

| 維度 | 目前 | 完成後預估 | 評估依據 |
|------|:---:|:---:|------|
| Google SEO | 90 | **94** | 技術面已近滿分，剩 robots meta、ImageObject、語意標籤等邊際項 |
| Google AI（AI Overview/AI Mode）| 86 | **92** | breed answer-box + 區名 hub + ItemList 直接補在 AI Overview 最看重的訊號 |
| ChatGPT Search | 84 | **90** | answer-box 全覆蓋 + 結論標準化讓 GPTBot 擷取更精準 |
| Gemini | 86 | **92** | speakable 全覆蓋 + ImageObject + LocalBusiness 在 Google 生態加成 |
| Claude | 85 | **90** | llms-full.txt 已強；結論標準化與清單 schema 進一步提升密度 |
| Perplexity | 76 | **84** | 英文節已補；再加英文核心頁與外部來源引用後可再上修 |

**評估依據**：以上為依「結構化訊號覆蓋率 × 各引擎已知偏好權重」換算的相對就緒度，反映「內容被引擎正確解析、擷取、判定為可信答案」的容易度。
**重要聲明**：搜尋排名與 AI 是否推薦，取決於引擎演算法、競爭者、使用者意圖與即時索引狀態等本站無法控制的因素。本報告**不保證**任何排名位置，也**不保證** AI 一定引用或推薦本站；僅代表在可控的技術與內容面，本站已具備高度就緒度。

---

*所有統計由 grep / python 於 2026-06-26 PR #2 合併後實際掃描產生。*
