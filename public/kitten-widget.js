(function () {
  'use strict';

  var ACTIVE_TAGS = ['等待命定', '預約洽談中', '血統珍稀', '即將啟程'];
  var LINE_URL = 'https://lin.ee/Xq0CykG';

  var style = document.createElement('style');
  style.textContent =
    '.bkw{padding:40px 0 56px;background:#FAF7F2}' +
    '.bkw-title{font-size:1.35rem;color:#2D2D2D;border-left:4px solid #C9A87C;padding-left:14px;margin:0 0 24px;font-family:"Noto Serif TC",Georgia,serif}' +
    '.bkw-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:18px}' +
    '.bkw-card{background:#fff;border:1px solid #E8E0D5;border-radius:12px;overflow:hidden;text-decoration:none;color:inherit;display:flex;flex-direction:column;transition:transform .15s,box-shadow .15s}' +
    '.bkw-card:hover{transform:translateY(-3px);box-shadow:0 8px 24px rgba(0,0,0,0.12);text-decoration:none}' +
    '.bkw-img-wrap{position:relative;aspect-ratio:1;background:#F5EFE6;overflow:hidden}' +
    '.bkw-img{width:100%;height:100%;object-fit:cover;display:block}' +
    '.bkw-badge{position:absolute;top:8px;left:8px;background:#C9A87C;color:#fff;font-size:11px;font-weight:700;padding:3px 8px;border-radius:999px;font-family:"Noto Serif TC",sans-serif}' +
    '.bkw-body{padding:14px 16px;flex:1;display:flex;flex-direction:column;gap:6px;font-family:"Noto Serif TC",Georgia,serif}' +
    '.bkw-name{font-size:.92rem;font-weight:700;color:#2D2D2D;line-height:1.4}' +
    '.bkw-meta{font-size:.82rem;color:#7A6E62;display:flex;gap:10px;flex-wrap:wrap}' +
    '.bkw-price{font-size:1rem;font-weight:700;color:#A07850;margin-top:auto;padding-top:6px}' +
    '.bkw-cta{display:inline-block;margin-top:8px;background:#C9A87C;color:#fff;font-size:.83rem;font-weight:700;padding:7px 14px;border-radius:6px;text-align:center;text-decoration:none}' +
    '.bkw-cta:hover{background:#A07850;text-decoration:none}' +
    '.bkw-empty{background:#fff;border:1px solid #E8E0D5;border-radius:12px;padding:28px 24px;text-align:center;color:#7A6E62;font-family:"Noto Serif TC",Georgia,serif;font-size:.93rem;line-height:1.8}' +
    '.bkw-empty strong{display:block;color:#2D2D2D;font-size:1rem;margin-bottom:8px}' +
    '.bkw-empty a{color:#A07850;font-weight:700}' +
    '@media(max-width:600px){.bkw-grid{grid-template-columns:repeat(2,1fr);gap:12px}.bkw-body{padding:10px 12px}}';
  document.head.appendChild(style);

  function calcAge(birthStr) {
    var birth = new Date(birthStr);
    var today = new Date();
    if (birth > today) return '預訂中';
    var months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
    var days = today.getDate() - birth.getDate();
    if (days < 0) { months -= 1; var pm = new Date(today.getFullYear(), today.getMonth(), 0); days += pm.getDate(); }
    if (months <= 0) return '出生 ' + days + ' 天';
    return months + ' 個月大';
  }

  function formatPrice(p) {
    return p ? 'NT$' + p.toLocaleString() : '洽詢';
  }

  function render() {
    var containers = document.querySelectorAll('.kitten-widget-container');
    if (!containers.length) return;
    var kittens = window.SITE_KITTENS || [];

    for (var i = 0; i < containers.length; i++) {
      var el = containers[i];
      var breed = el.getAttribute('data-breed') || '';
      var matched = kittens.filter(function (k) {
        var tag = k.tag || k.status || '';
        var active = ACTIVE_TAGS.indexOf(tag) !== -1;
        if (!active) return false;
        if (!breed) return true;
        var cats = breed.split(',').map(function (s) { return s.trim(); });
        return cats.indexOf(k.breedCategory) !== -1;
      });

      var html = '';
      if (matched.length === 0) {
        html = '<div class="bkw-empty"><strong>目前此品種暫無在售幼貓</strong>' +
          '新的毛孩隨時到來，歡迎加入 LINE 候位或詢問最新狀況<br>' +
          '<a href="' + LINE_URL + '" target="_blank" rel="noopener" style="display:inline-block;margin-top:12px;background:#C9A87C;color:#fff;padding:8px 20px;border-radius:6px;text-decoration:none;font-weight:700">加入 LINE 候補</a>' +
          '</div>';
      } else {
        html = '<div class="bkw-grid">';
        for (var j = 0; j < matched.length; j++) {
          var k = matched[j];
          var tag = k.tag || k.status || '等待命定';
          var age = calcAge(k.birth);
          var price = formatPrice(k.price);
          var detailUrl = '/kitten/' + k.id;
          html += '<a href="' + detailUrl + '" class="bkw-card">' +
            '<div class="bkw-img-wrap">' +
            '<img class="bkw-img" src="' + k.img + '" alt="' + k.breedZh + ' ' + k.gender + '" loading="lazy" decoding="async" width="400" height="400">' +
            '<span class="bkw-badge">' + tag + '</span>' +
            '</div>' +
            '<div class="bkw-body">' +
            '<div class="bkw-name">' + k.breedZh + '</div>' +
            '<div class="bkw-meta"><span>' + k.gender + '</span><span>' + age + '</span></div>' +
            '<div class="bkw-price">' + price + '</div>' +
            '<a href="' + LINE_URL + '" target="_blank" rel="noopener" class="bkw-cta" onclick="event.stopPropagation()">LINE 預約</a>' +
            '</div></a>';
        }
        html += '</div>';
      }
      el.innerHTML = html;
    }
  }

  if (window.SITE_KITTENS) {
    render();
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      if (window.SITE_KITTENS) render();
    });
  }
})();
