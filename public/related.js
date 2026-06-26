(function () {
  'use strict';

  // 文章標籤映射（依 URL slug 對應品種/主題標籤）
  var TAG_MAP = {
    // 品種標籤
    'british-shorthair': ['英短', '品種'],
    'british-longhair': ['英長', '品種'],
    'american-shorthair': ['美短', '品種'],
    'ragdoll': ['布偶', '品種'],
    'munchkin': ['曼赤肯', '品種'],
    'scottish-fold': ['蘇格蘭摺', '品種'],
    'scottish-straight': ['蘇格蘭立', '品種'],
    'maine-coon': ['緬因', '品種'],
    'persian': ['波斯', '品種'],
    'exotic-shorthair': ['異短', '品種'],
    'bengal': ['孟加拉', '品種'],
    'russian-blue': ['俄藍', '品種'],
    'norwegian-forest': ['挪威森林', '品種'],
    'siamese': ['暹羅', '品種'],
    'sphynx': ['無毛', '品種'],
    'birman': ['伯曼', '品種'],
    'abyssinian': ['阿比西尼亞', '品種'],
    'himalayan': ['喜馬拉雅', '品種'],
    'burmese': ['緬甸', '品種'],
    'golden-chinchilla': ['金漸層', '英短', '品種'],
    'silver-chinchilla': ['銀漸層', '英短', '品種'],
    'minuet': ['小步舞曲', '品種'],
    'turkish-angora': ['土耳其安哥拉', '品種'],
    // 主題標籤
    'buying': ['選購', '幼貓'],
    'guide': ['養貓'],
    'health': ['健康'],
    'color': ['毛色'],
    'vaccination': ['健康', '幼貓'],
    'deworming': ['健康', '幼貓'],
    'grooming': ['照顧'],
    'nutrition': ['飲食'],
    'neutering': ['健康'],
    'apartment': ['選購'],
    'bathing': ['照顧', '幼貓'],
    'fip': ['健康'],
    'diabetes': ['健康'],
    'hairball': ['健康'],
    'diet': ['飲食'],
    'kitten': ['幼貓'],
    'first-time': ['選購', '幼貓'],
    'lifespan': ['健康', '品種'],
    'comparison': ['品種'],
    'vs': ['品種'],
    // 毛色頁標籤
    'silver-shaded': ['銀漸層', '英短', '毛色'],
    'golden-shaded': ['金漸層', '英短', '毛色'],
    'blue': ['英短', '俄藍', '毛色'],
    'bicolor': ['英短', '毛色'],
    'cream': ['英短', '毛色'],
    'tabby': ['英短', '美短', '毛色']
  };

  // 文章資料庫（主要文章清單，可持續新增）
  var ARTICLES = [
    { title: '英國短毛貓完整指南', url: '/articles/british-shorthair-guide', tags: ['英短', '品種', '養貓'] },
    { title: '英短選購避坑指南', url: '/articles/british-shorthair-buying-tips', tags: ['英短', '選購', '幼貓'] },
    { title: '英短毛色完整介紹', url: '/articles/british-shorthair-colors', tags: ['英短', '毛色', '品種'] },
    { title: '英短 vs 美短 差異比較', url: '/articles/british-vs-american-shorthair', tags: ['英短', '美短', '品種'] },
    { title: '英短 vs 英長 差異比較', url: '/articles/british-shorthair-vs-longhair', tags: ['英短', '英長', '品種'] },
    { title: '英短公貓 vs 母貓', url: '/articles/british-shorthair-male-vs-female', tags: ['英短', '品種'] },
    { title: '英國長毛貓完整指南', url: '/articles/british-longhair-guide', tags: ['英長', '品種', '養貓'] },
    { title: '美國短毛貓選購指南', url: '/articles/american-shorthair-buying-guide', tags: ['美短', '品種', '選購'] },
    { title: '布偶貓完整指南', url: '/articles/ragdoll-complete-guide', tags: ['布偶', '品種', '養貓'] },
    { title: '曼赤肯完整指南', url: '/articles/munchkin-complete-guide', tags: ['曼赤肯', '品種', '養貓'] },
    { title: '緬因貓完整指南', url: '/articles/maine-coon-guide', tags: ['緬因', '品種', '養貓'] },
    { title: '波斯貓完整指南', url: '/articles/persian-cat-guide', tags: ['波斯', '品種', '養貓'] },
    { title: '孟加拉貓完整指南', url: '/articles/bengal-cat-guide', tags: ['孟加拉', '品種', '養貓'] },
    { title: '俄羅斯藍貓完整指南', url: '/articles/russian-blue-complete-guide', tags: ['俄藍', '品種', '養貓'] },
    { title: '挪威森林貓完整指南', url: '/articles/norwegian-forest-cat-guide', tags: ['挪威森林', '品種', '養貓'] },
    { title: '蘇格蘭摺耳貓爭議解析', url: '/articles/scottish-fold-controversy', tags: ['蘇格蘭摺', '品種', '健康'] },
    { title: '阿比西尼亞貓完整指南', url: '/articles/abyssinian-cat-guide', tags: ['阿比西尼亞', '品種', '養貓'] },
    { title: '伯曼貓完整指南', url: '/articles/birman-cat-guide', tags: ['伯曼', '品種', '養貓'] },
    { title: '緬甸貓完整指南', url: '/articles/burmese-cat-guide', tags: ['緬甸', '品種', '養貓'] },
    { title: '品種壽命比較', url: '/articles/breed-lifespan-comparison', tags: ['品種', '健康'] },
    { title: '品種難易度比較', url: '/articles/breed-difficulty-scorecard', tags: ['品種', '選購'] },
    { title: '貓咪FIP貓傳腹完整指南', url: '/articles/cat-fip-guide', tags: ['健康'] },
    { title: '貓咪糖尿病指南', url: '/articles/cat-diabetes-guide', tags: ['健康', '飲食'] },
    { title: '貓咪毛球症指南', url: '/articles/cat-hairball-guide', tags: ['健康', '照顧'] },
    { title: '幼貓選購完整指南', url: '/articles/buying-guide', tags: ['選購', '幼貓'] },
    { title: '第一次養貓完整指南', url: '/articles/first-time-cat-owner', tags: ['選購', '幼貓', '養貓'] },
    { title: '公寓養貓指南', url: '/articles/apartment-cat-guide', tags: ['養貓', '選購'] },
    { title: '最佳購貓時機', url: '/articles/best-time-to-buy-kitten-guide', tags: ['選購', '幼貓'] },
    { title: '貓咪飲食指南', url: '/articles/cat-food-guide', tags: ['飲食', '健康'] },
    { title: '貓咪皮膚痘痘指南', url: '/articles/cat-acne-guide', tags: ['健康'] },
    { title: '銀漸層貓完整介紹', url: '/color/silver-shaded', tags: ['銀漸層', '英短', '毛色'] },
    { title: '金漸層貓完整介紹', url: '/color/golden-shaded', tags: ['金漸層', '英短', '毛色'] },
    { title: '藍貓完整介紹', url: '/color/blue', tags: ['英短', '俄藍', '毛色'] },
    { title: '英短 vs 美短 比較頁', url: '/compare/british-shorthair-vs-american-shorthair', tags: ['英短', '美短', '品種'] },
    { title: '英短 vs 布偶 比較頁', url: '/compare/british-shorthair-vs-ragdoll', tags: ['英短', '布偶', '品種'] },
    { title: '英短 vs 英長 比較頁', url: '/compare/british-shorthair-vs-british-longhair', tags: ['英短', '英長', '品種'] },
    { title: '幼貓洗澡指南', url: '/knowledge/kitten-bathing', tags: ['幼貓', '照顧'] },
    { title: '幼貓疫苗排程', url: '/knowledge/kitten-vaccination', tags: ['幼貓', '健康'] },
    { title: '幼貓驅蟲指南', url: '/knowledge/kitten-deworming', tags: ['幼貓', '健康'] },
    { title: '第一次養貓準備清單', url: '/knowledge/first-time-owner', tags: ['幼貓', '選購', '養貓'] },
    { title: '貓咪結紮完整指南', url: '/knowledge/cat-neutering', tags: ['健康'] },
    // 品種比較頁
    { title: '英短 vs 美短差異比較', url: '/compare/british-shorthair-vs-american-shorthair', tags: ['英短', '美短', '品種'] },
    { title: '英短 vs 布偶差異比較', url: '/compare/british-shorthair-vs-ragdoll', tags: ['英短', '布偶', '品種'] },
    { title: '英短 vs 英長差異比較', url: '/compare/british-shorthair-vs-british-longhair', tags: ['英短', '英長', '品種'] },
    { title: '布偶 vs 曼赤肯差異比較', url: '/compare/ragdoll-vs-munchkin', tags: ['布偶', '曼赤肯', '品種'] },
    { title: '蘇摺 vs 蘇立健康差異', url: '/compare/scottish-fold-vs-scottish-straight', tags: ['蘇格蘭摺', '蘇格蘭立', '品種', '健康'] },
    // 毛色專區
    { title: '銀漸層貓完整介紹', url: '/color/silver-shaded', tags: ['銀漸層', '英短', '毛色'] },
    { title: '金漸層貓完整介紹', url: '/color/golden-shaded', tags: ['金漸層', '英短', '毛色'] },
    { title: '藍貓完整介紹', url: '/color/blue', tags: ['英短', '俄藍', '毛色'] },
    { title: '乳牛賓士貓介紹', url: '/color/bicolor', tags: ['英短', '毛色'] },
    { title: '奶油色貓介紹', url: '/color/cream', tags: ['英短', '毛色'] },
    { title: '虎斑貓介紹', url: '/color/tabby', tags: ['英短', '美短', '毛色'] }
  ];

  function getPageTags() {
    var canonical = document.querySelector('link[rel="canonical"]');
    var url = canonical ? canonical.getAttribute('href') : window.location.href;
    var path = url.replace(/https?:\/\/[^/]+/, '');
    var tags = [];
    var slug = path.split('/').pop().replace('.html', '');
    var parts = slug.split('-');

    // 從 TAG_MAP 取得標籤
    if (TAG_MAP[slug]) tags = tags.concat(TAG_MAP[slug]);
    parts.forEach(function (p) {
      if (TAG_MAP[p]) tags = tags.concat(TAG_MAP[p]);
    });

    // 從頁面 H1 取得標籤提示
    var h1 = document.querySelector('h1');
    if (h1) {
      var text = h1.textContent;
      var breedKeywords = { '英短': '英短', '英長': '英長', '美短': '美短', '布偶': '布偶', '曼赤肯': '曼赤肯', '波斯': '波斯', '異短': '異短', '孟加拉': '孟加拉', '俄羅斯藍': '俄藍', '緬因': '緬因', '挪威森林': '挪威森林', '幼貓': '幼貓', '疫苗': '健康', '驅蟲': '健康', '結紮': '健康', '毛色': '毛色', '銀漸層': '銀漸層', '金漸層': '金漸層' };
      Object.keys(breedKeywords).forEach(function (k) { if (text.indexOf(k) !== -1) tags.push(breedKeywords[k]); });
    }
    return tags.filter(function (v, i, a) { return a.indexOf(v) === i; });
  }

  function scoreArticle(article, pageTags, currentUrl) {
    if (article.url === currentUrl) return -1;
    var score = 0;
    article.tags.forEach(function (t) { if (pageTags.indexOf(t) !== -1) score += 2; });
    return score;
  }

  function render() {
    var containers = document.querySelectorAll('.related-articles');
    if (!containers.length) return;

    var canonical = document.querySelector('link[rel="canonical"]');
    var pageUrl = canonical ? canonical.getAttribute('href').replace(/https?:\/\/[^/]+/, '') : window.location.pathname;
    var pageTags = getPageTags();

    var scored = ARTICLES.map(function (a) { return { a: a, s: scoreArticle(a, pageTags, pageUrl) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (x, y) { return y.s - x.s; })
      .slice(0, 6);

    var style = document.createElement('style');
    style.textContent =
      '.related-articles{border-top:1px solid #E8E0D5;padding-top:36px;margin-top:44px}' +
      '.related-articles h3{font-size:1.15rem;color:#2D2D2D;margin-bottom:16px;font-family:"Noto Serif TC",Georgia,serif}' +
      '.related-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;list-style:none;margin:0;padding:0}' +
      '.related-list li a{display:block;padding:12px 14px;background:#fff;border:1px solid #E8E0D5;border-radius:8px;color:#3A3028;font-size:.88rem;font-family:"Noto Serif TC",Georgia,serif;line-height:1.5;transition:border-color .15s,transform .15s;text-decoration:none}' +
      '.related-list li a:hover{border-color:#C9A87C;transform:translateY(-2px);text-decoration:none}';
    document.head.appendChild(style);

    for (var i = 0; i < containers.length; i++) {
      var el = containers[i];
      if (scored.length === 0) { el.style.display = 'none'; continue; }
      var html = '<h3>延伸閱讀</h3><ul class="related-list">';
      scored.forEach(function (x) {
        html += '<li><a href="' + x.a.url + '">' + x.a.title + '</a></li>';
      });
      html += '</ul>';
      el.innerHTML = html;
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
