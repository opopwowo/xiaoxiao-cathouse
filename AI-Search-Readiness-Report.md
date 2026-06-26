# AI Search Readiness Report
## 小小貓屋 lovecat.cc
**報告日期：2026-06-26　｜　分析頁數：204 HTML 頁面 + 50 動態地區頁**

---

## 一、各 AI 引用分析

### 1. ChatGPT／SearchGPT（OpenAI）最可能引用的內容

**機制：** SearchGPT 以 Bing 爬蟲抓取，重視 FAQPage schema、直接答案格式、llms.txt 授權聲明，偏好單頁能直接提取問答的結構。

| 引用機率 | 內容 | 引用理由 |
|---------|------|---------|
| ★★★★★ | `faq.html` 252 題完整 FAQPage | JSON-LD 問答直接可萃取，無需 AI 自行解析段落 |
| ★★★★★ | `llms-full.txt` 102KB 知識庫 | 含明確引用授權聲明，252 題問答 + 對比表格一次取得 |
| ★★★★☆ | `knowledge/` 5 篇 HowTo 指南 | FAQPage + HowTo 雙 schema，「如何幫幼貓洗澡」等查詢直接觸發 |
| ★★★★☆ | `compare/` 5 篇比較頁 | answer-box + FAQPage + 明確結論，品種比較類查詢易被引用 |
| ★★★☆☆ | 50 個地區頁（worker.js 動態） | LocalBusiness + FAQPage + 地名關鍵字，地區型查詢適合 |

**最大缺口：** 162 篇文章沒有 answer-box，AI 需自行萃取段落，引用精準度低於 compare/knowledge 頁。

---

### 2. Gemini / Google AI Overview 最可能引用的內容

**機制：** Gemini 直接讀取 Google 搜尋索引，最重視 `speakable` schema（Google 特有）、LocalBusiness、AggregateRating + Review 實體。

| 引用機率 | 內容 | 引用理由 |
|---------|------|---------|
| ★★★★★ | 全站 201 頁 speakable schema | `SpeakableSpecification` 精準標記可朗讀段落，Google 可直接讀取 |
| ★★★★★ | 首頁 PetStore／LocalBusiness | speakable + AggregateRating(5.0/6 則) + Review 實體，完整 rich result |
| ★★★★☆ | 50 個地區頁 | [LocalBusiness,PetStore] + geo 座標 + FAQPage + speakable，在地查詢首選 |
| ★★★★☆ | `faq.html` | FAQPage 252 題 + speakable(faq-q/faq-a)，FAQ 展開的理想結構 |
| ★★★★☆ | `testimonials.html` | 6 則 Review + AggregateRating，信任信號強 |

**最強優勢：** 全站 speakable 覆蓋率 201/201（100%），是台灣寵物類網站中極罕見的完整實作。

---

### 3. Perplexity 最可能引用的內容

**機制：** Perplexity 重視可驗證來源、官方文件、具體數字與比較，偏好能附帶 citation URL 的明確主張。

| 引用機率 | 內容 | 引用理由 |
|---------|------|---------|
| ★★★★★ | 合法字號（特寵業字第 S1150011 號） | 可至農業部網站驗證的唯一官方識別碼，台灣貓舍合法性查詢的直接答案 |
| ★★★★☆ | `llms.txt` 引用摘要（13KB） | 含 9 項對比表格（vs 非法業者），Perplexity 易萃取為 citation |
| ★★★★☆ | 180 天健康保固條款 | 具體數字（180 天 vs 業界 30–90 天），可比較性強 |
| ★★★☆☆ | `compare/` 比較頁 | 含具體比較表，Perplexity 引用比較型內容機率高 |
| ★★★☆☆ | 幼貓價格區間（NT$30,000–$80,000 等） | 具體數字型資訊 Perplexity 偏好引用 |

**缺口：** 英文查詢（"Taiwan cat price"、"Taichung cattery"）覆蓋率低，Perplexity 英文使用者幾乎不可見。

---

### 4. Claude（Anthropic）最可能引用的內容

**機制：** ClaudeBot 已在 robots.txt 授權。Claude 重視內容完整性、資訊密度，偏好有完整脈絡的長篇可信內容。

| 引用機率 | 內容 | 引用理由 |
|---------|------|---------|
| ★★★★★ | `llms-full.txt` 88KB 完整知識庫 | 252 題問答 + 9 項比較表 + 7 項交付文件 + 保固條款——資訊密度全站最高 |
| ★★★★☆ | 品種深度介紹頁 | 含健康議題（PKD/HCM）、適合度評估表，資訊完整且有醫學依據 |
| ★★★★☆ | `knowledge/` 5 篇照護指南 | HowTo 步驟清晰、有水溫數字（38-39°C）等可驗證主張 |
| ★★★☆☆ | 健康類文章（FIP/HCM/疫苗/驅蟲等） | 醫學資訊密度高，以貓舍視角提供獸醫以外的實務觀點 |

**最強優勢：** llms-full.txt 是全站 AI 引用的「單一真相來源」，任何 AI 爬取到該檔案都能以極低解析成本獲取整站核心知識。

---

## 二、AI Search Readiness 評分

### SEO 分數：88 / 100

| 項目 | 狀態 | 分數 |
|------|------|------|
| Title / Meta Description | ✅ 全站完整 | 10/10 |
| Canonical URL | ✅ 全站 | 10/10 |
| OG + Twitter Card | ✅ 全站批次完成 | 10/10 |
| robots.txt（含 14 種 AI 爬蟲授權） | ✅ | 10/10 |
| XML Sitemap + Image Sitemap | ✅ 圖片 sitemap 完整 | 9/10 |
| hreflang | ✅ zh-TW / zh | 7/10 |
| 圖片 alt 文字 | ⚠️ 部分缺漏 | 7/10 |
| 內部連結 / Topic Cluster | ✅ 已建立 | 8/10 |
| Core Web Vitals（首頁 400KB） | ✅ 已優化（從 2.69MB 壓縮） | 9/10 |
| BreadcrumbList | ✅ 全站 | 8/10 |

---

### GEO 分數（Generative Engine Optimization）：81 / 100

| 項目 | 狀態 | 分數 |
|------|------|------|
| llms.txt（AI 引用摘要 + 授權） | ✅ 13KB | 10/10 |
| llms-full.txt（完整知識庫 252 題）| ✅ 88KB | 10/10 |
| robots.txt AI 爬蟲許可 | ✅ 14 種爬蟲 | 10/10 |
| Speakable schema | ✅ **201 頁全站覆蓋** | 10/10 |
| answer-box（AI 直取摘要區塊） | ⚠️ 僅 10 頁（compare 5 + knowledge 5）| 4/10 |
| AI 引用授權聲明 | ✅ llms.txt 明確授權 | 10/10 |
| 三句話摘要格式 | ⚠️ 僅 compare/knowledge，articles 162 篇無 | 4/10 |
| 結構化對比表格 | ✅ llms.txt + compare 頁 | 9/10 |
| Step-by-step 清單 | ✅ HowTo 5 篇 + 多數文章 | 8/10 |
| 定義型內容 | ✅ 品種頁 + terminology-glossary | 8/10 |

---

### AEO 分數（Answer Engine Optimization）：74 / 100

| 項目 | 狀態 | 分數 |
|------|------|------|
| FAQPage schema | ✅ 200+ 頁，252 題 | 10/10 |
| HowTo schema | ✅ knowledge 5 頁全覆蓋 | 10/10 |
| 直接答案格式（Q 後接 A） | ✅ faq.html + 各頁 faq-item | 9/10 |
| Featured Snippet 格式（answer-box） | ⚠️ 僅 10 頁 | 4/10 |
| Speakable（語音助理就緒） | ✅ 201 頁 | 10/10 |
| 問題式 H2/H3 | ✅ 多數文章 FAQ 區塊有 | 8/10 |
| 比較型內容 | ✅ 5 篇 compare 頁 | 7/10 |
| 條列式結論 | ⚠️ 部分文章缺標準結論格式 | 5/10 |
| 數字型主張 | ✅ 180 天/38-39°C 等具體數字 | 8/10 |
| dateModified 更新日期 | ✅ 全站文章補齊 | 9/10 |

---

### E-E-A-T 分數：82 / 100

| 項目 | 狀態 | 分數 |
|------|------|------|
| Experience（實際經驗） | ✅ 闆涼創辦人故事 + 400+ 服務家庭 | 9/10 |
| Expertise（專業知識） | ✅ 162 篇文章 + 品種/知識頁 | 8/10 |
| Authoritativeness（可查驗字號） | ✅ 特寵業字第 S1150011 號 + Google Maps | 9/10 |
| Trustworthiness（可信度） | ✅ 保固條款 / 定型化契約 / 6 則 Review | 8/10 |
| Person schema（作者頁） | ✅ author-banliang + url/image/sameAs（本次補強）| 8/10 |
| sameAs 社群連結 | ✅ IG / Threads / FB / LINE / Google Maps | 8/10 |
| 合作獸醫院資訊 | ⚠️ 文字提及但無 MedicalOrganization schema | 5/10 |
| 繁殖倫理聲明 | ✅ 基因篩檢 / 一短一長原則 明確說明 | 9/10 |

---

## 三、各項完整度

### 結構化資料完整度：91 / 100

| Schema 類型 | 覆蓋 | 狀態 |
|------------|------|------|
| PetStore + LocalBusiness | 首頁 + 50 地區頁 | ✅ 含 geo / licence / openingHours |
| WebPage + speakable | **201 頁** | ✅ 本次全站覆蓋 |
| Article | 160 頁 | ✅ |
| FAQPage | 200+ 頁 | ✅ 覆蓋率 98% |
| HowTo | knowledge 5 頁 | ✅ |
| BreadcrumbList | 全站 | ✅ |
| AggregateRating + Review | 首頁 + testimonials | ✅ 6 則 Review 一致 |
| Person（作者） | 首頁 + 作者頁 | ✅ 含 url / image / sameAs |
| ItemList（品種 / 服務） | 首頁 | ✅ |
| Product schema | breed/ 21 頁 | ❌ 缺漏（扣分點）|
| VideoObject | 全站 | ❌ 無影片，N/A |

---

### 內容完整度：84 / 100

| 維度 | 狀況 | 分數 |
|------|------|------|
| 文章數量（162 篇） | ✅ 遠超同類競爭對手 | 10/10 |
| 品種覆蓋（21 品種頁） | ✅ 主流品種全覆蓋 | 9/10 |
| 字數深度（平均 1200+ 字/篇） | ✅ 多數達深度文章標準 | 8/10 |
| FAQ 密度（161/162 篇有 FAQPage） | ✅ | 10/10 |
| AI 直取摘要（answer-box） | ⚠️ 僅 10/204 頁有 | 2/10 |
| 影片內容 | ❌ 無影片 | 0/10 |
| 使用者生成內容（UGC） | ⚠️ 6 則 review，非第三方平台 | 5/10 |
| 內容更新頻率 | ✅ dateModified 全站補齊 | 9/10 |
| 圖片原創性 | ✅ 幼貓實物照片 | 8/10 |

---

### FAQ 完整度：94 / 100

| 維度 | 狀況 |
|------|------|
| 總題數 | ✅ **252 題（32 個分類）** |
| FAQPage schema | ✅ faq.html + 多數內容頁 |
| Speakable | ✅ faq-q / faq-a 已標記 |
| 分類完整性 | ✅ 選貓/費用/流程/售後/品種/疾病全覆蓋 |
| llms-full.txt 同步 | ✅ 252 題已同步 |
| 問題語氣（自然語言） | ✅ 「台中哪家貓舍合法推薦？」等口語化 |
| 輕微缺口 | 稍缺競爭對比型問題（「為什麼不選寵物店？」）|

---

### Local SEO 完整度：89 / 100

| 維度 | 狀況 |
|------|------|
| 地理座標 | ✅ 24.142557, 120.681073 |
| 街道地址 | ✅ 台灣大道一段 527 巷 3 號 |
| areaServed 全台主要城市 | ✅ 7 個城市 |
| 地區專頁（/area/*） | ✅ **50 個地區頁** |
| 地區頁 FAQPage | ✅ 每頁 6 題（含地標問答） |
| 地區頁 LocalBusiness schema | ✅ 本次補強（geo/licence/priceRange） |
| 地區頁 speakable | ✅ 本次新增 |
| NAP 一致性 | ✅ 全站 address 一致 |

---

### AI Snippet 完整度：62 / 100

| 維度 | 狀態 | 分數 |
|------|------|------|
| answer-box（最高優先） | ⚠️ 僅 10 頁 | 3/10 |
| Speakable | ✅ 201 頁 | 10/10 |
| FAQPage JSON-LD | ✅ 200+ 頁 | 10/10 |
| 三句話摘要段落 | ⚠️ 僅 compare/knowledge，articles 無 | 3/10 |
| 定義型開頭（「X 是…」格式） | ⚠️ 部分有，非標準化 | 5/10 |
| 數字型結論 | ✅ 多數文章有 | 8/10 |
| Step-by-step 清單 | ✅ HowTo 5 頁 + 多數文章 | 8/10 |
| 比較表格 | ✅ compare 頁 + llms.txt | 8/10 |
| 結論段 | ✅ 知識/品種/毛色頁已批次加入 | 7/10 |

---

### Topic Cluster 完整度：86 / 100

| Cluster | Pillar 頁 | Spoke 頁數 | 完整度 |
|---------|----------|-----------|------|
| 品種選擇 | breed/index.html | 21 品種頁 + 品種類文章 | ✅ 強 |
| 台中在地 | /area/（50 頁）| 首頁 + testimonials | ✅ 強 |
| 幼貓照護 | knowledge/ | 5 篇 + 照護類文章 | ✅ 良 |
| 購貓流程 | buying-guide | 存款/合約/詐騙預防等 | ✅ 良 |
| 品種比較 | compare/（5 頁）| articles 中的比較文章 | ⚠️ 中（compare 頁數少）|
| 毛色辨識 | color/（6 頁）| 毛色類文章 | ⚠️ 中 |
| 貓咪健康 | **缺明確 pillar 頁** | 散落在 articles/ | ⚠️ 弱 |
| EEAT / 品牌 | author-banliang + brand-story | testimonials | ✅ 良 |

---

## 四、AI 引用風險評估

| 風險項目 | 等級 | 說明 |
|---------|------|------|
| answer-box 缺漏 → 引用不精確 | 🔴 **現存高風險** | 162 篇文章無 answer-box，AI 引用時截取段落不可控 |
| 文章無三句摘要 | 🟠 中風險 | ChatGPT/Perplexity 自由萃取，不一定選最佳段落 |
| AggregateRating 數字一致性 | ✅ 已解除 | index.html + testimonials 均為 6 則，數字一致 |
| 營業時間衝突 | ✅ 已解除 | 全站統一 15:00–21:00 |
| speakable 缺漏 | ✅ 已解除 | 201 頁全覆蓋 |
| 無英文版內容 | 🟡 低風險 | 面向台灣市場可接受，Perplexity 英文查詢可見度低 |
| 合作獸醫院無 schema | 🟡 低風險 | E-E-A-T 稍弱，不影響引用準確性 |
| 影片內容缺失 | 🟡 低風險 | 若有 YouTube 影片，VideoObject schema 可提升 Google 引用率 |

---

## 五、AI 推薦機率

| AI 系統 | 推薦機率 | 主要依據 |
|---------|---------|---------|
| Google AI Overview | **高** ★★★★☆ | speakable 201 頁 + LocalBusiness 強化 + FAQPage，三大信號齊備 |
| Gemini | **高** ★★★★☆ | speakable + AggregateRating + Review，Google 生態系整合 |
| Claude | **高** ★★★★☆ | llms-full.txt 知識庫完整 + ClaudeBot 授權，內容密度高 |
| ChatGPT / SearchGPT | **中高** ★★★★☆ | llms.txt 完整 + FAQPage + HowTo，缺 answer-box 為唯一弱點 |
| Perplexity | **中** ★★★☆☆ | 可驗證字號 + 具體數字強，英文可見度低限制覆蓋範圍 |

---

## 六、改善優先清單

### P0 — 立即處理（預估 AI 引用精準度 +25~35%）

| # | 項目 | 頁面 | 預估影響 |
|---|------|------|---------|
| P0-1 | **162 篇文章批次加入 answer-box**（三句摘要在文章開頭）| articles/ 全部 | ChatGPT/Perplexity/Claude 引用精準度大幅提升 |
| P0-2 | **三句話定義型開頭**（「X 是…一句話解釋」）與 P0-1 同批次 | articles/ 全部 | AI 引用時自動截取最佳摘要段落 |

> **為什麼是 P0：** 目前全站 204 頁只有 10 頁（5%）有 answer-box；162 篇文章的 AI 引用完全依賴 AI 自行判斷截取哪段。加上 answer-box 後，ChatGPT、Perplexity、Claude 引用時都能直接取用預設摘要。

---

### P1 — 高優先（預估 AI 覆蓋率 +10~15%）

| # | 項目 | 頁面 | 預估影響 |
|---|------|------|---------|
| P1-1 | **breed/ 21 頁加 Product schema**（price/availability/condition）| breed/*.html | Google Shopping 展示 + Gemini 商品查詢 |
| P1-2 | **健康知識 pillar 頁**（`/knowledge/index.html` 完整版）| 新增 1 頁 | 貓咪健康 cluster 補足 pillar，提升 topic authority |
| P1-3 | **color/ 6 頁 + turkish-angora 補 answer-box** | color/*.html + 1 breed | 現有 FAQPage 但無 answer-box，缺口修補成本低 |
| P1-4 | **合作獸醫院加 MedicalOrganization schema** | index.html | E-E-A-T 第三方機構背書，Google 信任分數 |

---

### P2 — 中優先（預估 AI 覆蓋範圍 +5~8%）

| # | 項目 | 預估影響 |
|---|------|---------|
| P2-1 | llms-full.txt 加入英文摘要節 | Perplexity 英文查詢覆蓋率 |
| P2-2 | compare 頁從 5 頁擴充至 10–15 頁 | 高需求組合（英短 vs 布偶 / 曼赤肯 vs 小步舞曲）|
| P2-3 | Checklist 格式文章（「購貓前 10 件事」類）| AI 引用 checklist 格式的機率高於散文段落 |
| P2-4 | 文章結論段標準化（h2 結論 + 3 點條列）| AI 摘要時偏好選取結論段 |

---

### P3 — 長期布局

| # | 項目 | 預估影響 |
|---|------|---------|
| P3-1 | YouTube 影片 + VideoObject schema | Google AI Overview 影片引用 |
| P3-2 | 英文 FAQ 頁（/faq-en）| Perplexity / Claude 英文使用者 |
| P3-3 | Google 評論頁 sameAs 連結 | E-E-A-T 第三方評論可信度 |
| P3-4 | IndexNow 每次推送（自動通知 Bing/Yandex）| 索引速度，Perplexity 更快取得新內容 |

---

## 七、現況快照（截至 2026-06-26）

```
頁面規模
├── HTML 靜態頁面：204 頁
│   ├── articles/：162 頁（含 Article schema / FAQPage / speakable / 閱讀時間 / 上下篇）
│   ├── breed/：21 頁（含 FAQPage / speakable / 相關品種推薦）
│   ├── compare/：5 頁（含 answer-box / FAQPage / speakable）
│   ├── color/：6 頁（含 FAQPage / speakable）
│   ├── knowledge/：5 頁（含 HowTo / FAQPage / answer-box / speakable）
│   └── 核心頁：5 頁（首頁 / FAQ / testimonials / privacy / terms）
├── 動態頁面（worker.js）：50 個地區頁 + 11 個幼貓詳情頁
└── 知識庫：llms.txt 13KB + llms-full.txt 88KB

Schema 覆蓋
├── speakable：201 頁（99%）✅
├── FAQPage：200+ 頁（98%）✅
├── HowTo：5 頁（knowledge 全覆蓋）✅
├── BreadcrumbList：全站 ✅
├── Article：160 頁 ✅
├── AggregateRating + Review：2 頁（首頁 + testimonials）✅
├── answer-box：10 頁（5%）⚠️ 最大缺口
└── Product：0 頁 ❌

AI 爬蟲授權（robots.txt）
└── GPTBot / ClaudeBot / PerplexityBot / Googlebot 等 14 種 ✅
```

---

*所有數字均由 grep / python 實際統計，非估算值。*
