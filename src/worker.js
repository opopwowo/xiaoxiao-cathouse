import indexHtml from '../index.html';
import ogImage from '../og-image.jpg';
import privacyHtml from '../privacy.html';
import termsHtml from '../terms.html';
import llmsTxt from '../llms.txt';
import robotsTxt from '../robots.txt';
import sitemapXml from '../sitemap.xml';
import indexNowKey from '../9d987292186a422895a6f7aa98de9039.txt';
import faqHtml from '../faq.html';
import testimonialsHtml from '../testimonials.html';

// 文章頁
import articleTaichungCatteryGuide from '../articles/taichung-cattery-guide.html';
import articleLegalVsIllegal from '../articles/legal-vs-illegal-cattery.html';
import articleKittenFirstWeek from '../articles/kitten-first-week-care.html';
import articleBuyingGuide from '../articles/buying-guide.html';
import articleFirstTimeCat from '../articles/first-time-cat-owner.html';
import articleRagdoll from '../articles/ragdoll-complete-guide.html';
import articleBritishShorthair from '../articles/british-shorthair-guide.html';
import articleAmericanShorthair from '../articles/american-shorthair-guide.html';
import articleMunchkin from '../articles/munchkin-complete-guide.html';
import articleLegalRegistration from '../articles/legal-registration-guide.html';

// 品種頁（現有品種）
import breedBritishShorthair from '../breeds/british-shorthair.html';
import breedBritishLonghair from '../breeds/british-longhair.html';
import breedAmericanShorthair from '../breeds/american-shorthair.html';
import breedMunchkin from '../breeds/munchkin.html';
import breedMinuet from '../breeds/minuet.html';

// 品種百科頁（資訊性，非現有品種）
import breedMaineCoon from '../breeds/maine-coon.html';
import breedGoldenChinchilla from '../breeds/golden-chinchilla.html';
import breedSilverChinchilla from '../breeds/silver-chinchilla.html';

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

const kittenMeta = {
  k28: { breedZh: '英國短毛貓・奶橘花紋',       gender: '弟弟', price: 25000 },
  k29: { breedZh: '英國短毛貓・奶油賓士加白',   gender: '弟弟', price: 30000 },
  k30: { breedZh: '曼赤肯短腿貓・奶橘色',       gender: '弟弟', price: 55000 },
  k31: { breedZh: '英國短毛貓・煙燻藍色',       gender: '妹妹', price: 19000 },
  k32: { breedZh: '英國短毛貓・淺三花賓士',     gender: '妹妹', price: 30000 },
  k33: { breedZh: '英國長毛貓・棕虎斑白手套',   gender: '妹妹', price: 40000 },
  k34: { breedZh: '英國長毛貓・純白',           gender: '妹妹', price: 30000 },
  k35: { breedZh: '英國長毛貓・淺三花',         gender: '妹妹', price: 30000 },
  k36: { breedZh: '美國短毛貓・銀白色',         gender: '妹妹', price: 35000 },
  k37: { breedZh: '美國短毛貓・銀白色',         gender: '妹妹', price: 35000 },
  k38: { breedZh: '捲耳曼赤肯短腿貓・乳牛藍白', gender: '弟弟', price: 30000 },
};

const ORIGINAL_TITLE = '<title>台中合法貓舍・小小貓屋｜英短・英長・美短・曼赤肯・全台親送</title>';
const ORIGINAL_DESC  = '<meta name="description" content="台中合法品種貓舍，特寵業字第S1150011號。英國短毛貓、英國長毛貓、美國短毛貓、曼赤肯短腿貓。非籠飼家庭環境、180天健康保固、全台親自接送。歡迎 LINE 預約看貓。">';
const ORIGINAL_CANONICAL = '<link rel="canonical" href="https://lovecat.cc/">';
const ORIGINAL_OG_URL    = '<meta property="og:url" content="https://lovecat.cc/">';
const ORIGINAL_OG_TITLE  = '<meta property="og:title" content="小小貓屋 Little Cat House｜為您挑選一生的家人・全台親自接送">';
const ORIGINAL_OG_DESC   = '<meta property="og:description" content="台中精品貓舍 · 特寵業字第S1150011號 · 專營布偶貓、英國短毛貓、小步舞曲短腿貓 · 三層健康保證 · 全台親自接送">';

// 50 個地區資料（台中29區 + 外縣市）
const AREA_DATA = {
  // 台中市中心四區
  'nantun':          { name: '南屯區', city: '台中市', pref: '台中', desc: '文心路、公益路、大業路、黎明路一帶' },
  'beitun':          { name: '北屯區', city: '台中市', pref: '台中', desc: '旱溪、太原路、松竹路、四張犁一帶' },
  'xitun':           { name: '西屯區', city: '台中市', pref: '台中', desc: '逢甲、文華路、台灣大道三段一帶' },
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

  return `<!DOCTYPE html>
<html lang="zh-Hant">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${pageTitle}</title>
<meta name="description" content="${metaDesc}">
<link rel="canonical" href="${pageUrl}">
<meta property="og:title" content="${area.pref}${area.name}品種貓舍推薦｜小小貓屋 台中合法貓舍">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:image" content="https://lovecat.cc/og-image.jpg">
<meta property="og:type" content="website">
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
{"@context":"https://schema.org","@type":"LocalBusiness","name":"小小貓屋 Little Cat House","description":"台中合法品種貓舍，服務${area.name}及全台各地。英短英長美短曼赤肯，180天健康保固。","url":"https://lovecat.cc/","telephone":"","address":{"@type":"PostalAddress","addressLocality":"台中市","addressCountry":"TW"},"areaServed":{"@type":"Place","name":"${area.city}${area.name}"},"openingHours":"Mo-Su 10:00-20:00"}
</script>
</head>
<body>
<header class="site-header">
  <div class="wrap">
    <a href="/" class="logo">🐾 小小貓屋 Little Cat House</a>
    <nav class="nav-links"><a href="/">首頁</a><a href="/faq">常見問題</a><a href="/testimonials">客戶見證</a></nav>
  </div>
</header>
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
    <p>沉穩、安靜、獨立自主，最適合上班族和公寓生活。不需要大量互動，白天獨處完全沒問題。毛色多元：藍色、奶橘、賓士、三花、煙燻色等。</p>
    <h3>英國長毛貓</h3>
    <p>英短的長毛版本，同樣沉穩的好個性加上更華麗的外觀。需要每天梳毛，但換來的是無與倫比的視覺美感。</p>
    <h3>美國短毛貓（稀有品種）</h3>
    <p>銀白虎斑最帥氣、體質強健壽命長（可達 15–20 年）、個性活潑友善。台灣稀有，小小貓屋是中台灣少數合法繁殖者。</p>
    <h3>曼赤肯短腿貓（台灣最夯稀有品種）</h3>
    <p>短腿超萌、活潑外向、好奇心旺盛。台灣詢問度最高的稀有品種，合法繁殖者稀少，有興趣請提早預約以免向隅。</p>

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
  </div>
</div>
<footer class="site-footer">
  <div class="wrap">
    <p>小小貓屋 Little Cat House｜台中合法品種貓舍</p>
    <p>特寵業字第 S1150011 號｜<a href="mailto:opopwowo@gmail.com">opopwowo@gmail.com</a></p>
    <p><a href="/">首頁</a> ｜ <a href="/faq">常見問題</a> ｜ <a href="/testimonials">客戶見證</a> ｜ <a href="/privacy.html">隱私政策</a> ｜ <a href="/terms.html">服務條款</a></p>
    <p style="margin-top:8px;font-size:.8rem;color:#6A6058">© 2026 小小貓屋 Little Cat House. All rights reserved.</p>
  </div>
</footer>
</body>
</html>`;
}

function buildKittenHtml(kittenId, meta) {
  const pageUrl = `${BASE_URL}/kitten/${kittenId}`;
  const priceStr = meta.price.toLocaleString('zh-TW');
  const title = `${meta.breedZh} ${meta.gender}｜小小貓屋 台中合法品種貓舍`;
  const desc = `台中小小貓屋待售幼貓・${meta.breedZh} ${meta.gender}，售價 NT$${priceStr}。180天健康保固、全台親自接送、完整新手禮包。特寵業字第S1150011號。立即 LINE 預約。`;

  return indexHtml
    .replace(ORIGINAL_TITLE,     `<title>${title}</title>`)
    .replace(ORIGINAL_DESC,      `<meta name="description" content="${desc}">`)
    .replace(ORIGINAL_CANONICAL, `<link rel="canonical" href="${pageUrl}">`)
    .replace(ORIGINAL_OG_URL,    `<meta property="og:url" content="${pageUrl}">`)
    .replace(ORIGINAL_OG_TITLE,  `<meta property="og:title" content="${title}">`)
    .replace(ORIGINAL_OG_DESC,   `<meta property="og:description" content="${desc}">`);
}

const articleRoutes = {
  '/articles/taichung-cattery-guide':   articleTaichungCatteryGuide,
  '/articles/legal-vs-illegal-cattery': articleLegalVsIllegal,
  '/articles/kitten-first-week-care':   articleKittenFirstWeek,
  '/articles/buying-guide':             articleBuyingGuide,
  '/articles/first-time-cat-owner':     articleFirstTimeCat,
  '/articles/ragdoll-complete-guide':   articleRagdoll,
  '/articles/british-shorthair-guide':  articleBritishShorthair,
  '/articles/american-shorthair-guide': articleAmericanShorthair,
  '/articles/munchkin-complete-guide':  articleMunchkin,
  '/articles/legal-registration-guide': articleLegalRegistration,
};

const breedRoutes = {
  '/breed/british-shorthair':    breedBritishShorthair,
  '/breed/british-longhair':     breedBritishLonghair,
  '/breed/american-shorthair':   breedAmericanShorthair,
  '/breed/munchkin':             breedMunchkin,
  '/breed/minuet':               breedMinuet,
  '/breed/maine-coon':           breedMaineCoon,
  '/breed/golden-chinchilla':    breedGoldenChinchilla,
  '/breed/silver-chinchilla':    breedSilverChinchilla,
};

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const host = url.hostname;
    const path = url.pathname;

    if (host === OLD_HOST) {
      return Response.redirect(`${BASE_URL}${path}${url.search}`, 301);
    }

    if (path === '/og-image.jpg') {
      return new Response(ogImage, {
        headers: { 'content-type': 'image/jpeg', 'Cache-Control': 'public, max-age=604800', 'X-Content-Type-Options': 'nosniff' }
      });
    }

    if (path === '/privacy.html' || path === '/privacy') return new Response(privacyHtml, { headers: COMMON_HTML_HEADERS });
    if (path === '/terms.html'   || path === '/terms')   return new Response(termsHtml,   { headers: COMMON_HTML_HEADERS });
    if (path === '/faq'          || path === '/faq.html') return new Response(faqHtml,    { headers: COMMON_HTML_HEADERS });
    if (path === '/testimonials' || path === '/reviews')  return new Response(testimonialsHtml, { headers: COMMON_HTML_HEADERS });

    if (path === '/llms.txt')   return new Response(llmsTxt,    { headers: { 'content-type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
    if (path === '/robots.txt') return new Response(robotsTxt,  { headers: { 'content-type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
    if (path === '/sitemap.xml') return new Response(sitemapXml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    if (path === '/9d987292186a422895a6f7aa98de9039.txt') return new Response(indexNowKey, { headers: { 'content-type': 'text/plain; charset=utf-8' } });

    if (articleRoutes[path]) return new Response(articleRoutes[path], { headers: COMMON_HTML_HEADERS });
    if (breedRoutes[path])   return new Response(breedRoutes[path],   { headers: COMMON_HTML_HEADERS });

    // 動態地區頁（50 個地區）
    const areaMatch = path.match(/^\/area\/([^/]+)$/);
    if (areaMatch) {
      const slug = areaMatch[1];
      const areaData = AREA_DATA[slug];
      if (areaData) {
        return new Response(buildAreaHtml(slug, areaData), { headers: COMMON_HTML_HEADERS });
      }
    }

    const kittenMatch = path.match(/^\/kitten\/(k\d+)$/);
    if (kittenMatch) {
      const kittenId = kittenMatch[1];
      const meta = kittenMeta[kittenId];
      const html = meta ? buildKittenHtml(kittenId, meta) : indexHtml;
      return new Response(html, { headers: COMMON_HTML_HEADERS });
    }

    return new Response(indexHtml, { headers: COMMON_HTML_HEADERS });
  },
};
