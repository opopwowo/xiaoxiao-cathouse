const BASE_URL = 'https://lovecat.cc';
const OLD_HOST = 'littlecathouse.opopwowo.workers.dev';

const COMMON_HTML_HEADERS = {
  'content-type': 'text/html; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
};

// 目前在售幼貓（已找到家的舊幼貓 k28–k38 已下架，/kitten/* 會轉址至 /found-home）
const kittenMeta = {
  k39: { breedZh: '英國短毛貓・奶白微賓士', gender: '弟弟', price: 19000 },
  k40: { breedZh: '美國短毛貓・銀白色',     gender: '妹妹', price: 19000 },
  k41: { breedZh: '英國短毛貓・黑白賓士',   gender: '弟弟', price: 25000 },
  k42: { breedZh: '英國短毛貓・藍虎斑紋',   gender: '弟弟', price: 30000 },
  k43: { breedZh: '英國長毛貓・棕虎斑賓士', gender: '弟弟', price: 25000 },
  k44: { breedZh: '英國短毛貓・藍色', gender: '妹妹', price: 19000 },
  k45: { breedZh: '英國短毛貓・金漸層11色', gender: '弟弟', price: 35000 },
  k46: { breedZh: '曼赤肯短腿貓・銀白', gender: '妹妹', price: 40000 },
  k47: { breedZh: '英國短毛貓・藍白賓士', gender: '妹妹', price: 25000 },
  k48: { breedZh: '美國短毛貓・銀白色', gender: '弟弟', price: 35000 },
  k49: { breedZh: '英國長毛貓・純白長毛', gender: '妹妹', price: 30000 },
  k50: { breedZh: '英國長毛貓・藍白賓士長毛', gender: '妹妹', price: 25000 },
  k51: { breedZh: '布偶貓・藍雙淺色', gender: '妹妹', price: 30000 },
};

const ORIGINAL_TITLE = '<title>台中合法貓舍・小小貓屋｜英短・英長・美短・曼赤肯・全台親送</title>';
const ORIGINAL_DESC  = '<meta name="description" content="台中合法品種貓舍，特寵業字第S1150011號。英國短毛貓、英國長毛貓、美國短毛貓、曼赤肯短腿貓。非籠飼家庭環境、180天健康保固、全台親自接送。歡迎 LINE 預約看貓。">';
const ORIGINAL_CANONICAL = '<link rel="canonical" href="https://lovecat.cc/">';
const ORIGINAL_OG_URL    = '<meta property="og:url" content="https://lovecat.cc/">';
const ORIGINAL_OG_TITLE  = '<meta property="og:title" content="小小貓屋 Little Cat House｜為您挑選一生的家人・全台親自接送">';
const ORIGINAL_OG_DESC   = '<meta property="og:description" content="台中精品貓舍 · 特寵業字第S1150011號 · 專營布偶貓、英國短毛貓、小步舞曲短腿貓 · 三層健康保證 · 全台親自接送">';

// 內容整併 301 轉址表（被合併／重複的舊文章 → 保留頁）
const MERGED_REDIRECTS = {
  '/articles/american-shorthair-guide':  '/articles/american-shorthair-buying-guide',
  '/articles/bengal-cat-buying-guide':   '/articles/bengal-cat-guide',
  '/articles/persian-cat-buying-guide':  '/articles/persian-cat-guide',
  '/articles/siamese-cat-buying-guide':  '/articles/siamese-cat-guide',
  '/articles/russian-blue-buying-guide': '/articles/russian-blue-complete-guide',
  '/articles/breed-encyclopedia-hub':    '/breed',
};

// 50 個地區資料（台中29區 + 外縣市）
const AREA_DATA = {
  // 台中市中心四區
  'nantun':          { name: '南屯區', city: '台中市', pref: '台中', desc: '文心路、公益路、大業路、黎明路一帶' },
  'beitun':          { name: '北屯區', city: '台中市', pref: '台中', desc: '旱溪、太原路、松竹路、四張犁一帶' },
  'xitun':           { name: '西屯區', city: '台中市', pref: '台中', desc: '逢甲、文華路、台灣大道三段一帶', landmarkFaq: { q: '逢甲商圈也能預約看貓嗎？', a: '可以，逢甲商圈屬於西屯區範圍，住在逢甲、文華路、台灣大道一帶的朋友都可以直接預約到貓舍參觀，或選擇親送到府服務，跟其他西屯區客戶完全一樣方便。' } },
  'taichung-south':  { name: '南區',   city: '台中市', pref: '台中', desc: '復興路、建國路、五權路、南門市場一帶' },
  'taichung-north':  { name: '北區',   city: '台中市', pref: '台中', desc: '雙十路、健行路、育才街、一中街一帶' },
  'taichung-center': { name: '中區',   city: '台中市', pref: '台中', desc: '中山路、三民路、台中火車站一帶' },
  'taichung-east':   { name: '東區',   city: '台中市', pref: '台中', desc: '旱溪老街、崇德路、東門路一帶' },
  'taichung-west':   { name: '西區',   city: '台中市', pref: '台中', desc: '中港路、美村路、五權西路、模範街一帶' },
  // 台中市東側
  'dali':            { name: '大里區', city: '台中市', pref: '台中', desc: '大里市區、內新街、中興路、國光路一帶' },
  'wufeng':          { name: '霧峰區', city: '台中市', pref: '台中', desc: '霧峰市區、中正路、民生路、霧峰林家一帶' },
  'taiping':         { name: '太平區', city: '台中市', pref: '台中', desc: '太平市區、中山路、中興路、新平路一帶' },
  // 台中市北側
  'tanzi':           { name: '潭子區', city: '台中市', pref: '台中', desc: '潭子市區、豐興路、勝利路一帶' },
  'daya':            { name: '大雅區', city: '台中市', pref: '台中', desc: '大雅市區、神清路、中清路、秀山路一帶' },
  'shengang':        { name: '神岡區', city: '台中市', pref: '台中', desc: '神岡市區、神清路、中山路一帶' },
  'houli':           { name: '后里區', city: '台中市', pref: '台中', desc: '后里市區、月眉糖廠、福興街一帶' },
  'fengyuan':        { name: '豐原區', city: '台中市', pref: '台中', desc: '豐原廟東、豐原大道、中正路、廟東夜市一帶' },
  'dongshr':         { name: '東勢區', city: '台中市', pref: '台中', desc: '東勢市區、東關路、中山路、石岡水壩周邊' },
  'shigang':         { name: '石岡區', city: '台中市', pref: '台中', desc: '石岡市區、東豐綠廊、豐勢路一帶' },
  'xinshe':          { name: '新社區', city: '台中市', pref: '台中', desc: '新社市區、中和路、花田一帶' },
  'heping':          { name: '和平區', city: '台中市', pref: '台中', desc: '和平市區、台8線、梨山、福壽山一帶' },
  // 台中市西側海線
  'qingshui':        { name: '清水區', city: '台中市', pref: '台中', desc: '清水市區、中山路、濱海路一帶' },
  'shalu':           { name: '沙鹿區', city: '台中市', pref: '台中', desc: '沙鹿市區、台中港路、中山路一帶' },
  'wuchi':           { name: '梧棲區', city: '台中市', pref: '台中', desc: '梧棲市區、台中港、中央路一帶' },
  'longjing':        { name: '龍井區', city: '台中市', pref: '台中', desc: '龍井市區、台中港路、中山路一帶' },
  'dadu':            { name: '大肚區', city: '台中市', pref: '台中', desc: '大肚市區、文昌路、中山路一帶' },
  'wuri':            { name: '烏日區', city: '台中市', pref: '台中', desc: '高鐵台中站、烏日市區、中山路一帶' },
  // 台中市北海線
  'dajia':           { name: '大甲區', city: '台中市', pref: '台中', desc: '大甲市區、鎮瀾宮、中山路一帶' },
  'waipu':           { name: '外埔區', city: '台中市', pref: '台中', desc: '外埔市區、外埔路、六順路一帶' },
  'daan':            { name: '大安區', city: '台中市', pref: '台中', desc: '大安市區、中山路、光明路、大安濱海一帶' },
  // 鄰近縣市
  'changhua':        { name: '彰化縣', city: '彰化縣', pref: '彰化', desc: '彰化市、員林、溪湖、鹿港、二林一帶' },
  'nantou':          { name: '南投縣', city: '南投縣', pref: '南投', desc: '南投市、草屯、埔里、集集一帶' },
  'miaoli':          { name: '苗栗縣', city: '苗栗縣', pref: '苗栗', desc: '苗栗市、頭份、竹南、通霄一帶' },
  'hsinchu':         { name: '新竹市', city: '新竹市', pref: '新竹', desc: '新竹市區、竹北、竹東一帶' },
  'hsinchu-county':  { name: '新竹縣', city: '新竹縣', pref: '新竹縣', desc: '竹北市、竹東鎮、關西、橫山一帶' },
  'taoyuan':         { name: '桃園市', city: '桃園市', pref: '桃園', desc: '桃園市區、中壢、平鎮、八德一帶' },
  'taipei':          { name: '台北市', city: '台北市', pref: '台北', desc: '信義、大安、中山、松山、萬華一帶' },
  'xinbei':          { name: '新北市', city: '新北市', pref: '新北', desc: '板橋、中和、新莊、三重、永和一帶' },
  'keelung':         { name: '基隆市', city: '基隆市', pref: '基隆', desc: '基隆市區、暖暖、七堵、中正區一帶' },
  'yunlin':          { name: '雲林縣', city: '雲林縣', pref: '雲林', desc: '斗六、虎尾、斗南、北港一帶' },
  'chiayi':          { name: '嘉義市', city: '嘉義市', pref: '嘉義', desc: '嘉義市區、民雄、水上、太保一帶' },
  'chiayi-county':   { name: '嘉義縣', city: '嘉義縣', pref: '嘉義縣', desc: '民雄、太保、朴子、布袋一帶' },
  'tainan':          { name: '台南市', city: '台南市', pref: '台南', desc: '台南市區、永康、善化、新市、仁德一帶' },
  'kaohsiung':       { name: '高雄市', city: '高雄市', pref: '高雄', desc: '高雄市區、三民、鳳山、岡山、楠梓一帶' },
  'pingtung':        { name: '屏東縣', city: '屏東縣', pref: '屏東', desc: '屏東市、潮州、東港、恆春一帶' },
  'yilan':           { name: '宜蘭縣', city: '宜蘭縣', pref: '宜蘭', desc: '宜蘭市、羅東、頭城、礁溪一帶' },
  'hualien':         { name: '花蓮縣', city: '花蓮縣', pref: '花蓮', desc: '花蓮市區、壽豐、吉安、光復一帶' },
  'taitung':         { name: '台東縣', city: '台東縣', pref: '台東', desc: '台東市區、成功、池上、關山一帶' },
  'penghu':          { name: '澎湖縣', city: '澎湖縣', pref: '澎湖', desc: '馬公市、湖西、白沙、西嶼一帶' },
  'kinmen':          { name: '金門縣', city: '金門縣', pref: '金門', desc: '金城、金湖、金沙、金寧一帶' },
  'matsu':           { name: '連江縣', city: '連江縣', pref: '馬祖', desc: '南竿、北竿、莒光、東引一帶' },
};

function buildAreaHtml(slug, area) {
  const isTaichung = area.city === '台中市';
  const pageUrl = `${BASE_URL}/area/${slug}`;
  const pageTitle = `${area.pref}${area.name}品種貓舍推薦 2026｜英短・英長・曼赤肯・全台親送｜小小貓屋`;
  const metaDesc = `${area.pref}${area.name}附近買品種貓推薦小小貓屋。英國短毛貓、英國長毛貓、美國短毛貓、曼赤肯短腿貓，特寵業字第S1150011號，180天健康保固，全台親自接送。`;
  const h1Main = isTaichung
    ? `台中${area.name}品種貓舍推薦`
    : `${area.pref}${area.name}品種貓推薦`;
  const introPara = isTaichung
    ? `住在台中${area.name}，想找合法品種貓舍？小小貓屋持有特寵業字第 S1150011 號，是台中少數同時繁殖英短、英長、美短、曼赤肯短腿貓的合法精品貓舍。${area.name}客戶可預約親自到貓舍參觀，或選擇全台親自送貓到府服務，完全不需要舟車勞頓。`
    : `住在${area.pref}${area.name}，想買台灣合法品種貓？小小貓屋位於台中，持有特寵業字第 S1150011 號，提供全台親自接送服務。${area.name}的客戶不需要千里迢迢來台中，我們直接開車送貓到您家，讓幼貓安全舒適地抵達新家。`;
  const infoBox = isTaichung
    ? `<strong>${area.name}服務範圍：</strong>${area.desc}的客戶均可預約親送到府或到貓舍參觀。`
    : `<strong>${area.name}親送服務：</strong>透過 LINE 看照片影片 → 確認喜歡 → 簽訂保固合約 → 親自開車送貓到${area.desc}。全程一對一服務。`;
  const landmarkFaqJson = area.landmarkFaq
    ? `,{"@type":"Question","name":"${area.landmarkFaq.q}","acceptedAnswer":{"@type":"Answer","text":"${area.landmarkFaq.a}"}}`
    : '';
  const landmarkFaqHtml = area.landmarkFaq
    ? `<div class="faq-item"><div class="faq-q">Q：${area.landmarkFaq.q}</div><div class="faq-a">${area.landmarkFaq.a}</div></div>`
    : '';

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<title>${pageTitle}</title>
<meta name="description" content="${metaDesc}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:title" content="${area.pref}${area.name}品種貓舍推薦｜小小貓屋 台中合法貓舍">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="https://lovecat.cc/og-image.jpg">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${area.pref}${area.name}品種貓舍推薦｜小小貓屋">
<meta name="twitter:description" content="${metaDesc}">
<meta name="twitter:image" content="https://lovecat.cc/og-image.jpg">
<link rel="icon" href="/images/icon-192.png">
<link rel="apple-touch-icon" href="/images/icon-192.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&display=swap" rel="stylesheet">
<style>
:root{--c:#C9A87C;--cd:#A07850;--cr:#FAF7F2;--i:#3A3028;--im:#A89E94}
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Noto Serif TC',Georgia,serif;background:var(--cr);color:var(--i);line-height:1.8;font-size:17px}
a{color:var(--cd);text-decoration:none}a:hover{text-decoration:underline}
.wrap{max-width:800px;margin:0 auto;padding:0 20px}
.site-header{background:#2D2D2D;padding:14px 0}
.site-header .wrap{display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px}
.logo{color:#FAF7F2;font-size:1.1rem;font-weight:700;letter-spacing:.05em}
.nav-links a{color:#C9A87C;margin-left:18px;font-size:.88rem}
.hero{background:linear-gradient(135deg,#2D2D2D 60%,#4A3F34);color:#FAF7F2;padding:48px 0 36px}
.hero h1{font-size:2rem;line-height:1.4;margin-bottom:10px}
.hero .sub{color:#C9A87C;font-size:.95rem}
.breadcrumb{font-size:.82rem;color:var(--im);margin:0 0 28px}
.breadcrumb a{color:var(--im)}
.content{padding:40px 0 64px}
h2{font-size:1.4rem;color:#2D2D2D;border-left:4px solid #C9A87C;padding-left:14px;margin:44px 0 16px}
h3{font-size:1.1rem;color:#3A3028;margin:24px 0 8px;font-weight:700}
p{margin-bottom:16px}
ul{margin:0 0 16px 24px}li{margin-bottom:8px}
.cta{background:linear-gradient(135deg,#2D2D2D,#4A3F34);color:#FAF7F2;padding:32px 28px;border-radius:12px;margin:44px 0;text-align:center}
.cta h3{color:#C9A87C;margin:0 0 10px;font-size:1.2rem;border:none;padding:0}
.cta-btn{display:inline-block;background:#C9A87C;color:#2D2D2D;font-weight:700;padding:12px 28px;border-radius:6px;margin-top:14px;font-size:.95rem}
.info{background:#F5EFE6;border:1px solid #E8E0D5;border-radius:8px;padding:16px 20px;margin:24px 0;font-size:.92rem}
.info strong{color:#A07850}
.faq-item{border-bottom:1px solid #E8E0D5;padding:20px 0}
.faq-q{font-weight:700;color:#2D2D2D;margin-bottom:8px}
.faq-a{color:#5A4E44;line-height:1.75}
.badges{display:flex;flex-wrap:wrap;gap:10px;margin:20px 0}
.badge{background:#2D2D2D;color:#C9A87C;padding:6px 14px;border-radius:20px;font-size:.85rem;font-weight:700}
.site-footer{background:#2D2D2D;color:#A89E94;padding:32px 0;text-align:center;font-size:.85rem;line-height:2}
.site-footer a{color:#C9A87C}
@media(max-width:600px){.hero h1{font-size:1.5rem}.nav-links{display:none}.wrap{padding:0 16px}}
</style>
<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
{"@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"首頁","item":"https://lovecat.cc"},{"@type":"ListItem","position":2,"name":"地區服務","item":"https://lovecat.cc/area"},{"@type":"ListItem","position":3,"name":"${area.city}${area.name}","item":"${pageUrl}"}]},
{"@type":["LocalBusiness","PetStore"],"@id":"https://lovecat.cc/#organization","name":"小小貓屋 Little Cat House","description":"台中合法品種貓舍，服務${area.name}及全台各地。英短英長美短曼赤肯，180天健康保固。","url":"https://lovecat.cc/","image":"https://lovecat.cc/og-image.jpg","priceRange":"$$","sameAs":["https://lin.ee/Xq0CykG","https://www.instagram.com/opoo.ooqo/","https://www.threads.com/@opoo.ooqo","https://www.facebook.com/ooo.cat.ooo.cat/","https://maps.app.goo.gl/EQVh88S4bRcGkSxc8"],"address":{"@type":"PostalAddress","streetAddress":"台灣大道一段527巷3號","addressLocality":"中區","addressRegion":"台中市","addressCountry":"TW","postalCode":"400"},"geo":{"@type":"GeoCoordinates","latitude":"24.142557","longitude":"120.681073"},"hasMap":"https://maps.app.goo.gl/EQVh88S4bRcGkSxc8","areaServed":{"@type":"Place","name":"${area.city}${area.name}"},"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],"opens":"15:00","closes":"21:00"}],"identifier":[{"@type":"PropertyValue","name":"特定寵物業字號","value":"特寵業字第 S1150011 號"}]},
{"@type":"WebPage","@id":"${pageUrl}","url":"${pageUrl}","name":"${area.city}${area.name}品種貓舍推薦｜小小貓屋","inLanguage":"zh-Hant","speakable":{"@type":"SpeakableSpecification","cssSelector":["h1",".faq-q",".faq-a"]}},
{"@type":"FAQPage","mainEntity":[
{"@type":"Question","name":"住${area.name}可以怎麼看貓？","acceptedAnswer":{"@type":"Answer","text":"有三種方式：①LINE 看照片和影片（最方便）②親自到台中貓舍參觀（需提前預約）③確認購買後選擇親送到府。歡迎透過首頁 LINE 聯絡，我們會引導您選擇最適合的方式。"}},
{"@type":"Question","name":"送貓到${area.name}，幼貓會不舒服嗎？","acceptedAnswer":{"@type":"Answer","text":"小小貓屋採親自開車接送，不走宅配或黑貓。幼貓乘坐專用貓包，車內有熟悉氣味的毯子陪伴，全程監控狀況。抵達後協助安置，讓幼貓在您的陪伴下適應新家。"}},
{"@type":"Question","name":"如何確認小小貓屋是合法貓舍？","acceptedAnswer":{"@type":"Answer","text":"可至農業部動物保護資訊網，搜尋「特寵業字第 S1150011 號」，即可查驗小小貓屋的合法繁殖執照。合法貓舍都有此登記，非法業者無法偽造。"}},
{"@type":"Question","name":"180 天健康保固是什麼意思？","acceptedAnswer":{"@type":"Answer","text":"幼貓領回後 180 天內，若發生傳染性疾病（如貓瘟、皰疹）或遺傳性問題，小小貓屋負責後續處理。這是業界最長的保固期，遠超一般 30–90 天的標準。詳細條款可於購買前確認。"}},
{"@type":"Question","name":"購買前需要準備什麼？","acceptedAnswer":{"@type":"Answer","text":"建議提前準備：貓砂盆（加上貓砂）、食碗水碗、貓跳台或磨爪板、安全的獨立空間（如一個房間），幼貓回家後先在小空間適應 3–7 天。其他用品（貓糧、玩具等）小小貓屋的新手禮包都有附。"}}${landmarkFaqJson}
]}
]}
</script>
<!-- start webpushr tracking code -->
<script>(function(w,d, s, id) {if(typeof(w.webpushr)!=='undefined') return;w.webpushr=w.webpushr||function(){(w.webpushr.q=w.webpushr.q||[]).push(arguments)};var js, fjs = d.getElementsByTagName(s)[0];js = d.createElement(s); js.id = id;js.async=1;js.src = "https://cdn.webpushr.com/app.min.js";
fjs.parentNode.appendChild(js);}(window,document, 'script', 'webpushr-jssdk'));
webpushr('setup',{'key':'BMqxex9eGLzEp2yfiFe54f0_Rea85WfxGJfjuiwyDf2kPGThqMb4BWEze8DJl_KL-5OOsr5DP9gcBM9nianjdyk' });</script>
<!-- end webpushr tracking code -->
<script src="/webpushr-widget.js" defer></script>
</head>
<body>
<header class="site-header">
  <div class="wrap">
    <a href="/" class="logo">🐾 小小貓屋 Little Cat House</a>
    <nav class="nav-links"><a href="/">首頁</a><a href="/faq">常見問題</a><a href="/testimonials">客戶見證</a></nav>
  </div>
</header>
<main>
<div class="hero">
  <div class="wrap">
    <div class="breadcrumb"><a href="/">首頁</a> › 地區服務 › ${area.city}${area.name}</div>
    <h1>${h1Main}<br>英短・英長・美短・曼赤肯</h1>
    <p class="sub">小小貓屋 ‧ 特寵業字第 S1150011 號 ‧ 全台親自接送</p>
  </div>
</div>
<div class="content">
  <div class="wrap">
    <p>${introPara}</p>
    <div class="badges">
      <span class="badge">✓ 特寵業字第 S1150011 號</span>
      <span class="badge">✓ 180 天健康保固</span>
      <span class="badge">✓ 全台親自接送</span>
      <span class="badge">✓ 非籠飼家庭環境</span>
    </div>
    <div class="info">${infoBox}</div>

    <h2>為什麼選擇小小貓屋</h2>
    <ul>
      <li><strong>合法認證可查驗</strong>：特寵業字第 S1150011 號，可至農業部動物保護資訊網查驗，不怕買到黑市幼貓</li>
      <li><strong>非籠飼家庭環境</strong>：所有種貓和幼貓在家庭空間自由生活，社會化好、不怕人、個性穩定</li>
      <li><strong>180 天健康保固</strong>：業界最長，傳染病、遺傳問題均在保固範圍，讓您安心領養</li>
      <li><strong>全台親自接送</strong>：不走宅配或黑貓，親自開車送貓，讓幼貓安全舒適抵達新家</li>
      <li><strong>完整新手禮包</strong>：幼貓糧、貓砂、習慣毯子、玩具、飼養手冊，開箱即用</li>
      <li><strong>LINE 售後終身支援</strong>：購貓後任何問題隨時 LINE 詢問，不是買了就不管</li>
    </ul>

    <h2>目前待售品種</h2>
    <h3>英國短毛貓（最推薦・多色可選）</h3>
    <p>沉穩、安靜、獨立自主，最適合上班族和公寓生活。不需要大量互動，白天獨處完全沒問題。毛色多元：藍色、奶橘、賓士、三花、煙燻色等。<a href="/breed/british-shorthair">查看英國短毛貓完整介紹 →</a></p>
    <h3>英國長毛貓</h3>
    <p>英短的長毛版本，同樣沉穩的好個性加上更華麗的外觀。需要每天梳毛，但換來的是無與倫比的視覺美感。<a href="/breed/british-longhair">查看英國長毛貓完整介紹 →</a></p>
    <h3>美國短毛貓（稀有品種）</h3>
    <p>銀白虎斑最帥氣、體質強健壽命長（可達 15–20 年）、個性活潑友善。台灣稀有，小小貓屋是中台灣少數合法繁殖者。<a href="/breed/american-shorthair">查看美國短毛貓完整介紹 →</a></p>
    <h3>曼赤肯短腿貓（台灣最夯稀有品種）</h3>
    <p>短腿超萌、活潑外向、好奇心旺盛。台灣詢問度最高的稀有品種，合法繁殖者稀少，有興趣請提早預約以免向隅。<a href="/breed/munchkin">查看曼赤肯短腿貓完整介紹 →</a></p>

    <div class="cta">
      <h3>${isTaichung ? area.name + '客戶預約看貓' : area.name + '親送服務詢問'}</h3>
      <p>歡迎 LINE 聯絡，看照片・看影片・預約參觀，三種方式自由選擇<br>180 天健康保固 ‧ 全台親自接送 ‧ 完整新手禮包</p>
      <a href="/" class="cta-btn">查看所有待售幼貓</a>
    </div>

    <h2>常見問題</h2>
    <div class="faq-item">
      <div class="faq-q">Q：住${area.name}可以怎麼看貓？</div>
      <div class="faq-a">有三種方式：①LINE 看照片和影片（最方便）②親自到台中貓舍參觀（需提前預約）③確認購買後選擇親送到府。歡迎透過首頁 LINE 聯絡，我們會引導您選擇最適合的方式。</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Q：送貓到${area.name}，幼貓會不舒服嗎？</div>
      <div class="faq-a">小小貓屋採親自開車接送，不走宅配或黑貓。幼貓乘坐專用貓包，車內有熟悉氣味的毯子陪伴，全程監控狀況。抵達後協助安置，讓幼貓在您的陪伴下適應新家。</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Q：如何確認小小貓屋是合法貓舍？</div>
      <div class="faq-a">可至農業部動物保護資訊網，搜尋「特寵業字第 S1150011 號」，即可查驗小小貓屋的合法繁殖執照。合法貓舍都有此登記，非法業者無法偽造。</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Q：180 天健康保固是什麼意思？</div>
      <div class="faq-a">幼貓領回後 180 天內，若發生傳染性疾病（如貓瘟、皰疹）或遺傳性問題，小小貓屋負責後續處理。這是業界最長的保固期，遠超一般 30–90 天的標準。詳細條款可於購買前確認。</div>
    </div>
    <div class="faq-item">
      <div class="faq-q">Q：購買前需要準備什麼？</div>
      <div class="faq-a">建議提前準備：貓砂盆（加上貓砂）、食碗水碗、貓跳台或磨爪板、安全的獨立空間（如一個房間），幼貓回家後先在小空間適應 3–7 天。其他用品（貓糧、玩具等）小小貓屋的新手禮包都有附。</div>
    </div>
    ${landmarkFaqHtml}
    <div style="max-width:800px;margin:32px auto 0;padding:24px 28px;background:#F5EFE6;border:1px solid #E8E0D5;border-radius:12px"><h3 style="margin:0 0 12px;color:#2D2D2D;font-size:1.05rem;font-weight:700">延伸閱讀</h3><ul style="margin:0;padding-left:20px;line-height:1.9"><li><a href="/articles/legal-vs-illegal-cattery">合法貓舍和私人繁殖場差在哪？7個關鍵差異</a></li>
<li><a href="/articles/buying-guide">如何挑選合法品種貓舍：避免買到問題貓</a></li>
<li><a href="/articles/first-time-cat-owner">第一次養貓推薦什麼品種？新手完整指南</a></li></ul></div>
  </div>
</div>
</main>
<footer class="site-footer">
  <div class="wrap">
    <p>小小貓屋 Little Cat House｜台中合法品種貓舍</p>
    <p>特寵業字第 S1150011 號｜<a href="mailto:opopwowo@gmail.com">opopwowo@gmail.com</a></p>
    <p><a href="/">首頁</a> ｜ <a href="/faq">常見問題</a> ｜ <a href="/testimonials">客戶見證</a> ｜ <a href="/privacy">隱私政策</a> ｜ <a href="/terms">服務條款</a></p>
    <p style="margin-top:8px;font-size:.8rem;color:#6A6058">© 2026 小小貓屋 Little Cat House. All rights reserved.</p>
  </div>
</footer>
</body>
</html>`;
}

function buildKittenHtml(kittenId, meta, baseHtml) {
  const pageUrl = `${BASE_URL}/kitten/${kittenId}`;
  const priceStr = meta.price.toLocaleString('zh-TW');
  const title = `${meta.breedZh} ${meta.gender}｜小小貓屋 台中合法品種貓舍`;
  const desc = `台中小小貓屋待售幼貓・${meta.breedZh} ${meta.gender}，售價 NT$${priceStr}。180天健康保固、全台親自接送、完整新手禮包。特寵業字第S1150011號。立即 LINE 預約。`;
  const productJson = `<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${meta.breedZh} ${meta.gender}`,
    description: desc,
    image: `${BASE_URL}/images/kitten-${kittenId}.jpg`,
    sku: kittenId,
    brand: { '@type': 'Organization', name: '小小貓屋 Little Cat House' },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'TWD',
      price: String(meta.price),
      availability: 'https://schema.org/InStock',
      url: pageUrl,
      seller: { '@type': 'Organization', name: '小小貓屋 Little Cat House', url: BASE_URL },
    },
  })}</script>\n</head>`;

  return baseHtml
    .replace(ORIGINAL_TITLE,     `<title>${title}</title>`)
    .replace(ORIGINAL_DESC,      `<meta name="description" content="${desc}">`)
    .replace(ORIGINAL_CANONICAL, `<link rel="canonical" href="${pageUrl}">`)
    .replace(ORIGINAL_OG_URL,    `<meta property="og:url" content="${pageUrl}">`)
    .replace(ORIGINAL_OG_TITLE,  `<meta property="og:title" content="${title}">`)
    .replace(ORIGINAL_OG_DESC,   `<meta property="og:description" content="${desc}">`)
    .replace('</head>', productJson);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    if (host === OLD_HOST) {
      return Response.redirect(`${BASE_URL}${path}${url.search}`, 301);
    }

    // /reviews 是 /testimonials 的別名（沿用舊網址，無對應靜態檔）
    if (path === '/reviews') {
      return env.ASSETS.fetch(new Request(new URL('/testimonials', request.url), request));
    }

    // 內容整併後的 301 永久轉址：將被合併／重複的舊文章導向保留頁，集中 SEO 權重、消除關鍵字競爭
    if (MERGED_REDIRECTS[path]) {
      return Response.redirect(`${BASE_URL}${MERGED_REDIRECTS[path]}`, 301);
    }

    // 不帶斜線的文章索引頁，直接回傳 articles/index.html 內容（避免多一次轉址）
    if (path === '/articles') {
      return env.ASSETS.fetch(new Request(new URL('/articles/', request.url), request));
    }

    // 待領養幼貓列表頁（獨立網址，沿用首頁HTML但客製化meta，讓/kittens可被索引與分享）
    if (path === '/kittens') {
      const baseResp = await env.ASSETS.fetch(new Request(new URL('/', request.url), request));
      const baseHtml = await baseResp.text();
      const pageUrl = `${BASE_URL}/kittens`;
      const title = '目前待領養幼貓｜英短・英長・美短・曼赤肯｜小小貓屋 台中合法品種貓舍';
      const desc = '小小貓屋目前待領養幼貓即時更新：英國短毛貓、英國長毛貓、美國短毛貓、曼赤肯短腿貓。特寵業字第S1150011號，180天健康保固，全台親自接送，立即LINE預約看貓。';
      const kittensHtml = baseHtml
        .replace(ORIGINAL_TITLE,     `<title>${title}</title>`)
        .replace(ORIGINAL_DESC,      `<meta name="description" content="${desc}">`)
        .replace(ORIGINAL_CANONICAL, `<link rel="canonical" href="${pageUrl}">`)
        .replace(ORIGINAL_OG_URL,    `<meta property="og:url" content="${pageUrl}">`)
        .replace(ORIGINAL_OG_TITLE,  `<meta property="og:title" content="${title}">`)
        .replace(ORIGINAL_OG_DESC,   `<meta property="og:description" content="${desc}">`);
      return new Response(kittensHtml, { headers: COMMON_HTML_HEADERS });
    }

    // 動態地區頁（50 個地區）
    const areaMatch = path.match(/^\/area\/([^/]+)$/);
    if (areaMatch) {
      const areaData = AREA_DATA[areaMatch[1]];
      if (areaData) {
        return new Response(buildAreaHtml(areaMatch[1], areaData), { headers: COMMON_HTML_HEADERS });
      }
    }

    // 幼貓詳情頁：在售幼貓產生客製化詳情頁；已找到家（不在 kittenMeta）的舊幼貓 301 轉址至 /found-home
    const kittenMatch = path.match(/^\/kitten\/(k\d+)$/);
    if (kittenMatch) {
      const meta = kittenMeta[kittenMatch[1]];
      if (meta) {
        const baseResp = await env.ASSETS.fetch(new Request(new URL('/', request.url), request));
        const baseHtml = await baseResp.text();
        return new Response(buildKittenHtml(kittenMatch[1], meta, baseHtml), { headers: COMMON_HTML_HEADERS });
      }
      return Response.redirect(`${BASE_URL}/found-home`, 301);
    }

    // 其餘所有路徑（首頁、文章、品種頁、圖片、manifest、sw.js 等）一律交給靜態資源層處理
    // 找不到對應檔案時，wrangler.toml 的 not_found_handling 設定會自動回退到首頁
    return env.ASSETS.fetch(request);
  },
};
