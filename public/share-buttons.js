(function () {
  'use strict';

  var containers = document.querySelectorAll('.share-buttons');
  if (!containers.length) return;

  var style = document.createElement('style');
  style.textContent =
    '.share-buttons{display:inline-flex;align-items:center;flex-wrap:wrap;gap:8px;margin-top:14px;padding:10px 14px;' +
      "background:#FAF7F2;border-radius:999px;box-shadow:0 6px 18px rgba(0,0,0,0.12);font-family:'Noto Serif TC','PingFang TC',sans-serif;}" +
    '.share-buttons .sb-label{font-size:12.5px;color:#7A6E62;font-weight:700;margin-right:2px;white-space:nowrap;}' +
    '.share-buttons .sb-btn{display:inline-flex;align-items:center;gap:5px;border:1px solid #E8E0D5;border-radius:999px;' +
      'background:#fff;color:#2D2D2D;font-size:12.5px;font-weight:700;padding:6px 13px;cursor:pointer;' +
      'text-decoration:none;line-height:1.4;transition:transform .15s,box-shadow .15s;white-space:nowrap;}' +
    '.share-buttons .sb-btn:hover{transform:translateY(-1px);box-shadow:0 4px 10px rgba(0,0,0,0.14);text-decoration:none;}' +
    '.share-buttons .sb-copy{position:relative;}' +
    '.share-buttons .sb-toast{position:absolute;bottom:calc(100% + 8px);left:50%;transform:translateX(-50%);' +
      'background:#2D2D2D;color:#FAF7F2;font-size:11.5px;padding:5px 10px;border-radius:6px;white-space:nowrap;' +
      'opacity:0;pointer-events:none;transition:opacity .2s;}' +
    '.share-buttons .sb-toast.show{opacity:1;}' +
    '@media(max-width:480px){.share-buttons{padding:8px 10px;gap:6px;}.share-buttons .sb-label{width:100%;margin:0 0 2px;}}' +
    '@media print{.share-buttons{display:none;}}';
  document.head.appendChild(style);

  var canonicalEl = document.querySelector('link[rel="canonical"]');
  var pageUrl = canonicalEl ? canonicalEl.href : window.location.href;
  var pageTitle = document.title;
  var encodedUrl = encodeURIComponent(pageUrl);
  var encodedTitle = encodeURIComponent(pageTitle);

  var lineHref = 'https://social-plugins.line.me/lineit/share?url=' + encodedUrl;
  var fbHref = 'https://www.facebook.com/sharer/sharer.php?u=' + encodedUrl;
  var xHref = 'https://twitter.com/intent/tweet?url=' + encodedUrl + '&text=' + encodedTitle;

  function copyLink(toast) {
    function flash() {
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 1800);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(pageUrl).then(flash, flash);
      return;
    }
    var ta = document.createElement('textarea');
    ta.value = pageUrl;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) {}
    document.body.removeChild(ta);
    flash();
  }

  for (var i = 0; i < containers.length; i++) {
    var container = containers[i];
    container.innerHTML =
      '<span class="sb-label">分享這篇文章</span>' +
      '<a class="sb-btn" href="' + lineHref + '" target="_blank" rel="noopener" aria-label="分享到LINE">LINE</a>' +
      '<a class="sb-btn" href="' + fbHref + '" target="_blank" rel="noopener" aria-label="分享到Facebook">Facebook</a>' +
      '<a class="sb-btn" href="' + xHref + '" target="_blank" rel="noopener" aria-label="分享到X">X</a>' +
      '<button type="button" class="sb-btn sb-copy" aria-label="複製連結">🔗 複製連結<span class="sb-toast">已複製連結</span></button>';

    var copyBtn = container.querySelector('.sb-copy');
    var toastEl = container.querySelector('.sb-toast');
    copyBtn.addEventListener('click', function () {
      copyLink(this.querySelector('.sb-toast'));
    });
  }
})();
