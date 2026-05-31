import indexHtml from '../index.html';
import privacyHtml from '../privacy.html';
import termsHtml from '../terms.html';
import llmsTxt from '../llms.txt';
import robotsTxt from '../robots.txt';
import sitemapXml from '../sitemap.xml';
import indexNowKey from '../9d987292186a422895a6f7aa98de9039.txt';

const BASE_URL = 'https://littlecathouse.opopwowo.workers.dev';

const kittenMeta = {
  k1:  { breedZh: '美國短毛貓・銀虎斑',       gender: '弟弟', price: 35000 },
  k2:  { breedZh: '小步舞曲短腿貓・棕虎斑',   gender: '妹妹', price: 45000 },
  k3:  { breedZh: '美國短毛貓・銀虎斑',       gender: '妹妹', price: 35000 },
  k4:  { breedZh: '美短曼赤肯短腿貓・銀虎斑', gender: '妹妹', price: 45000 },
  k5:  { breedZh: '美國長毛貓・銀色',         gender: '妹妹', price: 35000 },
  k6:  { breedZh: '美國短毛起司貓・銀白加白', gender: '妹妹', price: 35000 },
  k7:  { breedZh: '美國短毛貓・銀白色',       gender: '妹妹', price: 35000 },
  k8:  { breedZh: '捲耳曼赤肯短腿貓・乳牛藍白', gender: '弟弟', price: 30000 },
  k9:  { breedZh: '英國長毛貓・奶油白',       gender: '弟弟', price: 19000 },
  k10: { breedZh: '英國長毛貓・銀白色',       gender: '弟弟', price: 30000 },
  k11: { breedZh: '布偶貓・藍雙淺色',         gender: '弟弟', price: 29000 },
  k12: { breedZh: '英國短毛貓・奶油白',       gender: '弟弟', price: 30000 },
  k13: { breedZh: '英國短毛貓・藍白正賓士',   gender: '妹妹', price: 35000 },
  k14: { breedZh: '英國短毛貓・藍白正賓士',   gender: '妹妹', price: 35000 },
  k15: { breedZh: '英國短毛貓・藍色白手套',   gender: '妹妹', price: 25000 },
};

function buildKittenHtml(kittenId, meta) {
  const pageUrl = `${BASE_URL}/kitten/${kittenId}`;
  const priceStr = meta.price.toLocaleString('zh-TW');
  const title = `${meta.breedZh} ${meta.gender}｜小小貓屋 台中精品貓舍`;
  const desc = `台中小小貓屋待售幼貓・${meta.breedZh} ${meta.gender}，售價 NT$${priceStr}。三層健康保障、全台親自接送、超完整新手禮包。立即預約帶回命定毛孩。`;

  return indexHtml
    .replace(
      '<title>台中合法貓舍｜英短・布偶・曼赤肯幼貓｜小小貓屋</title>',
      `<title>${title}</title>`
    )
    .replace(
      '<meta name="description" content="台中合法精品貓舍・特寵業字第S1150011號。英國短毛貓、布偶貓、曼赤肯・小步舞曲幼貓待售。三層健康保障、全台親自接送、超完整新手禮包。立即預約帶回命定毛孩。">',
      `<meta name="description" content="${desc}">`
    )
    .replace(
      '<link rel="canonical" href="https://littlecathouse.opopwowo.workers.dev/">',
      `<link rel="canonical" href="${pageUrl}">`
    )
    .replace(
      '<meta property="og:url" content="https://littlecathouse.opopwowo.workers.dev/">',
      `<meta property="og:url" content="${pageUrl}">`
    )
    .replace(
      '<meta property="og:title" content="台中合法貓舍｜英短・布偶・曼赤肯幼貓｜小小貓屋">',
      `<meta property="og:title" content="${title}">`
    )
    .replace(
      '<meta property="og:description" content="台中合法精品貓舍・特寵業字第S1150011號。英國短毛貓、布偶貓、曼赤肯・小步舞曲幼貓待售。三層健康保障、全台親自接送、超完整新手禮包。立即預約帶回命定毛孩。">',
      `<meta property="og:description" content="${desc}">`
    );
}

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === '/privacy.html' || path === '/privacy') {
      return new Response(privacyHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    if (path === '/terms.html' || path === '/terms') {
      return new Response(termsHtml, { headers: { 'content-type': 'text/html; charset=utf-8' } });
    }
    if (path === '/llms.txt') {
      return new Response(llmsTxt, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (path === '/robots.txt') {
      return new Response(robotsTxt, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }
    if (path === '/sitemap.xml') {
      return new Response(sitemapXml, { headers: { 'content-type': 'application/xml; charset=utf-8' } });
    }
    if (path === '/9d987292186a422895a6f7aa98de9039.txt') {
      return new Response(indexNowKey, { headers: { 'content-type': 'text/plain; charset=utf-8' } });
    }

    const kittenMatch = path.match(/^\/kitten\/(k\d+)$/);
    if (kittenMatch) {
      const kittenId = kittenMatch[1];
      const meta = kittenMeta[kittenId];
      const html = meta ? buildKittenHtml(kittenId, meta) : indexHtml;
      return new Response(html, {
        headers: {
          'content-type': 'text/html; charset=utf-8',
          'Cache-Control': 'public, max-age=3600',
          'X-Content-Type-Options': 'nosniff',
        }
      });
    }

    return new Response(indexHtml, {
      headers: {
        'content-type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
        'X-Content-Type-Options': 'nosniff',
      }
    });
  },
};
