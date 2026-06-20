# 小小貓屋內容策略規劃（2026）

現況：158 篇文章、20 個品種頁、50 個地區頁，覆蓋率已經非常高（品種、健康、購買決策、新手照護幾乎都有對應文章）。以下是盤點後找出的真正缺口，依優先度排序。

## A. 品種介紹頁規劃（/breed/*）

以下品種目前**只有文章、沒有獨立 /breed/ 頁**，但小小貓屋有實際銷售或常被搜尋，建議補上獨立品種頁（比照現有20頁的schema/breadcrumb/FAQ模板）：

| 品種 | 現況 | 建議 |
|---|---|---|
| 小步舞曲貓 Minuet | 已有/breed/minuet | — |
| 布偶貓 Ragdoll | 只有文章 ragdoll-complete-guide | **建議新增 /breed/ragdoll**，搜尋量大，且站內多篇文章已連回此slug |
| 波斯貓 Persian | 只有文章 persian-cat-guide | 建議新增 /breed/persian |
| 孟加拉貓 Bengal | 只有文章 bengal-cat-guide | 建議新增 /breed/bengal |
| 暹羅貓 Siamese | 只有文章 siamese-cat-guide | 建議新增 /breed/siamese |
| 緬因貓 Maine Coon | 只有文章 maine-coon-guide | 建議新增 /breed/maine-coon |

（其餘如 devon-rex、egyptian-mau、exotic-shorthair、tonkinese、birman 屬於知識性長尾流量，非主力銷售品種，維持文章形式即可，不需要獨立品種頁。）

## B. 養貓知識文章規劃（新主題，目前完全沒有覆蓋）

1. **老貓臨終照護與安寧指南**（senior cat 已有，但「臨終/安寧」是空白，搜尋量穩定且E-E-A-T價值高）
2. **貓咪過世後的心理調適**（寵物悲傷輔導，AI搜尋常見問答主題，目前完全沒有）
3. **貓咪坐車防暈車/外出焦慮**（cat-travel-guide有提到外出但無暈車專篇）
4. **轉換飼料的漸進式換糧指南**（cat-food-guide有提及但無獨立深度文章）
5. **貓咪和新生兒同住注意事項**（family-with-baby，目前cat-safe-home-guide未涵蓋此情境）

## C. FAQ 擴充規劃（faq.html）

目前 faq.html 分類完整（選擇貓舍／購貓前準備／疫苗健康／…），建議新增分類：
- **「售後與長期飼養」**：老貓照護、搬家、與其他寵物相處等問題彙整入此分類
- 針對 B 段新主題，各補 1-2 題對應FAQ，並連回新文章（延續本次已執行的「FAQ連回文章」做法）

## D. 內部連結規劃

1. **「延伸閱讀」自動化區塊**：本次已在10篇優先文章試點（taichung-cattery-guide、legal-vs-illegal-cattery、first-time-cat-owner、british/american-shorthair-guide、munchkin-complete-guide、minuet-guide、ragdoll-complete-guide、kitten-first-week-care、buying-guide）。確認效果後可套用到剩餘148篇，配對表可比照本次的品種/主題分群邏輯產生。
2. **faq.html → 文章**：本次已補5個連結，待B段新文章完成後可再擴充。
3. **breed-encyclopedia-hub.html**：建議在此總覽頁加入連到 B 段新文章的版位，作為新內容的主要導流入口。
4. **地區頁（/area/*，50頁）**：目前由 worker.js 動態生成，已有 BreadcrumbList/LocalBusiness/FAQPage schema；可在「目前待售品種」區塊外，額外加一段連到 buying-guide / legal-vs-illegal-cattery 的延伸閱讀（手法同本次faq.html的做法）。

## 執行建議順序

1. 先做 B 段5篇新文章（填補真正空白的搜尋意圖）
2. 補 A 段6個品種頁（轄區內已有文章內容可直接改寫成品種頁模板，成本低）
3. 確認10篇「延伸閱讀」試點效果後，套用到剩餘148篇文章
4. 最後擴充 faq.html 分類與連結
