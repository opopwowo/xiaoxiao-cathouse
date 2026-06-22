(function () {
  'use strict';
  if (document.getElementById('webpushrFab')) return;

  var style = document.createElement('style');
  style.textContent =
    '#webpushrFab{position:fixed;bottom:96px;right:24px;z-index:9998;display:flex;align-items:center;gap:8px;' +
      'background:#FFB680;color:#FFFFFF;border:none;border-radius:999px;padding:10px 18px;' +
      "font-family:'Noto Serif TC','PingFang TC',sans-serif;font-size:14px;font-weight:700;cursor:pointer;" +
      'box-shadow:0 4px 16px rgba(0,0,0,0.14);transition:transform .2s,box-shadow .2s,opacity .2s;}' +
    '#webpushrFab:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(0,0,0,0.18);}' +
    '#webpushrFab.wp-subscribed{background:#fff;color:#C8956C;border:1px solid #FFB680;}' +
    '#webpushrFab .wp-icon{font-size:16px;}' +
    '#webpushrToast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);' +
      'max-width:320px;background:#fff;border:1px solid #F4D9BE;border-radius:16px;padding:18px 22px;' +
      "box-shadow:0 12px 36px rgba(0,0,0,0.18);font-family:'Noto Serif TC','PingFang TC',sans-serif;" +
      'color:#2D2D2D;font-size:13.5px;line-height:1.7;text-align:center;z-index:9999;opacity:0;' +
      'transition:opacity .3s,transform .3s;pointer-events:none;}' +
    '#webpushrToast.show{opacity:1;transform:translateX(-50%) translateY(0);pointer-events:auto;}' +
    '#webpushrToast .wp-toast-title{font-weight:700;color:#C8956C;font-size:15px;margin-bottom:8px;}' +
    '@media(max-width:600px){#webpushrFab{bottom:84px;right:18px;padding:9px 16px;font-size:13px;}' +
      '#webpushrToast{width:86%;padding:16px 18px;}}' +
    '@media print{#webpushrFab,#webpushrToast{display:none;}}';
  document.head.appendChild(style);

  var fab = document.createElement('button');
  fab.id = 'webpushrFab';
  fab.type = 'button';
  fab.setAttribute('aria-label', '開啟新貓到店通知');
  fab.innerHTML = '<span class="wp-icon" aria-hidden="true">🐱</span><span class="wp-label">新貓到店通知</span>';
  document.body.appendChild(fab);

  var toast = document.createElement('div');
  toast.id = 'webpushrToast';
  toast.setAttribute('role', 'status');
  toast.innerHTML =
    '<div class="wp-toast-title">🐾 毛孩通知已開啟</div>' +
    '<div>💛 恭喜加入命定毛孩通知！<br>下一位讓您心動的小寶貝，<br>我們會第一時間告訴您 🏡✨</div>';
  document.body.appendChild(toast);

  var toastTimer;
  function showToast() {
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 6000);
  }

  function setSubscribedState() {
    fab.classList.add('wp-subscribed');
    fab.innerHTML = '<span class="wp-icon" aria-hidden="true">🐾</span><span class="wp-label">通知已開啟</span>';
  }

  if (window.Notification && Notification.permission === 'granted') {
    setSubscribedState();
  } else if (window.Notification && Notification.permission === 'denied') {
    fab.style.display = 'none';
  }

  fab.addEventListener('click', function () {
    if (fab.classList.contains('wp-subscribed')) {
      showToast();
      return;
    }
    if (typeof window.webpushr !== 'function') return;
    window.webpushr('subscribe', function () {
      setSubscribedState();
      showToast();
    }, function () {
      /* 使用者拒絕或訂閱失敗時，不顯示干擾訊息 */
    });
  });
})();
