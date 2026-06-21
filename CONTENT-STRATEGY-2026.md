# 小小貓屋內容策略規劃（2026）

現況：163 篇文章、20 個品種頁、50 個地區頁，覆蓋率已經非常高（品種、健康、購買決策、新手照護幾乎都有對應文章）。以下是盤點後找出的真正缺口，依優先度排序。

## A. 品種介紹頁規劃（/breed/*）【已完成】

> 更新（2026-06-21）：複查 src/worker.js 後發現此表原始判斷有誤——布偶貓、波斯貓、孟加拉貓、暹羅貓、緬因貓的 /breed/ 頁**其實都已經存在**（並非只有文章），worker.js 中早已有對應的 import 與路由。唯一發現的真實缺口是暹羅貓頁 `/breed/siamese` 缺少 FAQPage schema 與對應可見FAQ內容（其餘19個品種頁都有），已補上3組Q&A並通過schema-內容一致性檢查。

| 品種 | 現況 |
|---|---|
| 小步舞曲貓 Minuet | 已有 /breed/minuet |
| 布偶貓 Ragdoll | 已有 /breed/ragdoll |
| 波斯貓 Persian | 已有 /breed/persian |
| 孟加拉貓 Bengal | 已有 /breed/bengal |
| 暹羅貓 Siamese | 已有 /breed/siamese（已補FAQ schema） |
| 緬因貓 Maine Coon | 已有 /breed/maine-coon |

（其餘如 devon-rex、egyptian-mau、exotic-shorthair、tonkinese、birman 屬於知識性長尾流量，非主力銷售品種，維持文章形式即可，不需要獨立品種頁。）

## B. 養貓知識文章規劃（新主題）【已完成】

5篇新文章已全數完成，含Article/FAQPage/BreadcrumbList schema與延伸閱讀區塊，並已接上 src/worker.js 路由、sitemap.xml、articles/index.html：

1. **老貓臨終照護與安寧指南** → `/articles/cat-end-of-life-hospice-guide`
2. **貓咪過世後的心理調適**（寵物悲傷輔導） → `/articles/pet-loss-grief-guide`
3. **貓咪坐車防暈車/外出焦慮** → `/articles/cat-car-travel-motion-sickness-guide`
4. **轉換飼料的漸進式換糧指南** → `/articles/cat-food-transition-guide`
5. **貓咪和新生兒同住注意事項** → `/articles/cat-newborn-baby-guide`

## C. FAQ 擴充規劃（faq.html）【已完成】

新增第32類「人生階段與特殊照護」，針對 B 段5篇新文章各補1題對應FAQ並連回文章，FAQPage schema與可見內容已驗證完全一致（共252題）。

## D. 內部連結規劃

1. **「延伸閱讀」自動化區塊**【已完成】：全站163篇文章（含B段5篇新文章）已100%套用延伸閱讀區塊。依 articles/index.html 既有4大分類（台中貓舍・購貓攻略、新手養貓指南、品種完整指南、飼養照護指南）為每篇文章自動配對3篇同分類相關文章，已驗證全站div配對正確、JSON-LD schema有效。
2. **faq.html → 文章**【已完成】：已針對B段5篇新文章補上對應FAQ題目與連結（見C段）。
3. **breed-encyclopedia-hub.html**：複查後決定**不執行**——該頁主題是品種比較與選購決策，B段5篇新文章（老貓安寧、寵物悲傷、坐車暈車、換糧、新生兒同住）屬於一般飼養照護範疇，硬塞進品種比較頁主題不合，容易讓使用者困惑。改為更精準的做法：在最相關的既有文章（cat-senior-guide、cat-food-guide、cat-safe-home-guide、multi-cat-guide、cat-travel-guide）的延伸閱讀區塊中補上反向連結，已完成。
4. **地區頁（/area/*，50頁）**：目前由 worker.js 動態生成，已有 BreadcrumbList/LocalBusiness/FAQPage schema；可在「目前待售品種」區塊外，額外加一段連到 buying-guide / legal-vs-illegal-cattery 的延伸閱讀（手法同faq.html的做法，尚未執行，優先度較低）。

## 執行建議順序

1. ~~先做 B 段5篇新文章~~ 【已完成 2026-06-21】
2. ~~補 A 段品種頁~~ 【已完成 2026-06-21，發現原判斷有誤，實際只需補1個FAQ缺口】
3. ~~延伸閱讀套用到剩餘文章~~ 【已完成 2026-06-21，全站163篇100%覆蓋】
4. ~~擴充 faq.html 分類與連結~~ 【已完成 2026-06-21】
5. 待辦（優先度較低）：地區頁延伸閱讀區塊
