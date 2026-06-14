import indexHtml from '../index.html';
import ogImage from '../og-image.jpg';
import privacyHtml from '../privacy.html';
import termsHtml from '../terms.html';
import llmsTxt from '../llms.txt';
import robotsTxt from '../robots.txt';
import sitemapXml from '../sitemap.xml';
import indexNowKey from '../9d987292186a422895a6f7aa98de9039.txt';
import faqHtml from '../faq.html';

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

// 品種頁
import breedBritishShorthair from '../breeds/british-shorthair.html';
import breedBritishLonghair from '../breeds/british-longhair.html';
import breedAmericanShorthair from '../breeds/american-shorthair.html';
import breedMunchkin from '../breeds/munchkin.html';
import breedMinuet from '../breeds/minuet.html';

// 地區頁
import areaNantun from '../area/nantun.html';
import areaBeitun from '../area/beitun.html';
import areaXitun from '../area/xitun.html';
import areaDali from '../area/dali.html';
import areaWuri from '../area/wuri.html';
import areaFengyuan from '../area/fengyuan.html';
import areaTaichungSouth from '../area/taichung-south.html';
import areaTaichungNorth from '../area/taichung-north.html';
import areaChanghua from '../area/changhua.html';
import areaNantou from '../area/nantou.html';

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
  '/breed/british-shorthair':  breedBritishShorthair,
  '/breed/british-longhair':   breedBritishLonghair,
  '/breed/american-shorthair': breedAmericanShorthair,
  '/breed/munchkin':           breedMunchkin,
  '/breed/minuet':             breedMinuet,
};

const areaRoutes = {
  '/area/nantun':          areaNantun,
  '/area/beitun':          areaBeitun,
  '/area/xitun':           areaXitun,
  '/area/dali':            areaDali,
  '/area/wuri':            areaWuri,
  '/area/fengyuan':        areaFengyuan,
  '/area/taichung-south':  areaTaichungSouth,
  '/area/taichung-north':  areaTaichungNorth,
  '/area/changhua':        areaChanghua,
  '/area/nantou':          areaNantou,
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

    if (path === '/llms.txt')   return new Response(llmsTxt,    { headers: { 'content-type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
    if (path === '/robots.txt') return new Response(robotsTxt,  { headers: { 'content-type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' } });
    if (path === '/sitemap.xml') return new Response(sitemapXml, { headers: { 'content-type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
    if (path === '/9d987292186a422895a6f7aa98de9039.txt') return new Response(indexNowKey, { headers: { 'content-type': 'text/plain; charset=utf-8' } });

    if (articleRoutes[path]) return new Response(articleRoutes[path], { headers: COMMON_HTML_HEADERS });
    if (breedRoutes[path])   return new Response(breedRoutes[path],   { headers: COMMON_HTML_HEADERS });
    if (areaRoutes[path])    return new Response(areaRoutes[path],    { headers: COMMON_HTML_HEADERS });

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
