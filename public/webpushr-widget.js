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
    '#webpushrOverlay{position:fixed;inset:0;background:rgba(45,45,45,0.45);z-index:10000;display:none;' +
      'align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s;}' +
    '#webpushrOverlay.show{display:flex;opacity:1;}' +
    '#webpushrModal{background:#fff;border-radius:20px;max-width:340px;width:100%;padding:28px 26px;' +
      'text-align:center;box-shadow:0 20px 60px rgba(0,0,0,0.25);' +
      "font-family:'Noto Serif TC','PingFang TC',sans-serif;position:relative;" +
      'transform:translateY(12px);transition:transform .25s;}' +
    '#webpushrOverlay.show #webpushrModal{transform:translateY(0);}' +
    '#webpushrModal .wp-modal-close{position:absolute;top:12px;right:14px;border:none;background:none;' +
      'font-size:18px;color:#B89A82;cursor:pointer;line-height:1;}' +
    '#webpushrModal .wp-modal-icon{font-size:34px;margin-bottom:10px;}' +
    '#webpushrModal .wp-modal-title{font-weight:700;color:#C8956C;font-size:17px;margin-bottom:10px;}' +
    '#webpushrModal .wp-modal-desc{color:#2D2D2D;font-size:13.5px;line-height:1.8;margin-bottom:22px;}' +
    '#webpushrModal .wp-modal-cta{display:block;width:100%;background:#FFB680;color:#FFFFFF;border:none;' +
      'border-radius:999px;padding:12px 0;font-size:14.5px;font-weight:700;cursor:pointer;margin-bottom:10px;' +
      'box-shadow:0 4px 14px rgba(255,182,128,0.45);transition:transform .2s,box-shadow .2s;}' +
    '#webpushrModal .wp-modal-cta:hover{transform:translateY(-1px);box-shadow:0 6px 18px rgba(255,182,128,0.55);}' +
    '#webpushrModal .wp-modal-later{display:block;width:100%;background:none;border:none;color:#B89A82;' +
      'font-size:13px;cursor:pointer;padding:6px 0;}' +
    '@media(max-width:600px){#webpushrFab{bottom:84px;right:18px;padding:9px 16px;font-size:13px;}' +
      '#webpushrToast{width:86%;padding:16px 18px;}#webpushrModal{padding:24px 20px;}}' +
    '@media print{#webpushrFab,#webpushrToast,#webpushrOverlay{display:none;}}';
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

  var overlay = document.createElement('div');
  overlay.id = 'webpushrOverlay';
  overlay.innerHTML =
    '<div id="webpushrModal" role="dialog" aria-modal="true" aria-labelledby="wpModalTitle">' +
      '<button type="button" class="wp-modal-close" aria-label="關閉">✕</button>' +
      '<div class="wp-modal-icon" aria-hidden="true">🐱</div>' +
      '<div class="wp-modal-title" id="wpModalTitle">想第一時間知道新貓咪到店嗎？</div>' +
      '<div class="wp-modal-desc">點擊「允許」，下一位讓您心動的小寶貝一到店，<br>我們就會立刻通知您 🏡✨</div>' +
      '<button type="button" class="wp-modal-cta">好的，立即開啟通知</button>' +
      '<button type="button" class="wp-modal-later">稍後再說</button>' +
    '</div>';
  document.body.appendChild(overlay);

  var modalClose = overlay.querySelector('.wp-modal-close');
  var modalCta = overlay.querySelector('.wp-modal-cta');
  var modalLater = overlay.querySelector('.wp-modal-later');
  var modalTitle = overlay.querySelector('.wp-modal-title');
  var modalDesc = overlay.querySelector('.wp-modal-desc');

  function openModal() {
    overlay.classList.add('show');
  }
  function closeModal() {
    overlay.classList.remove('show');
  }
  modalClose.addEventListener('click', closeModal);
  modalLater.addEventListener('click', closeModal);
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

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

  function requestSubscribe() {
    if (typeof window.webpushr !== 'function') return;
    window.webpushr('subscribe', function () {
      closeModal();
      setSubscribedState();
      showToast();
    }, function () {
      closeModal();
    });
  }

  modalCta.addEventListener('click', requestSubscribe);

  if (window.Notification && Notification.permission === 'granted') {
    setSubscribedState();
  }

  fab.addEventListener('click', function () {
    if (fab.classList.contains('wp-subscribed')) {
      showToast();
      return;
    }
    if (window.Notification && Notification.permission === 'denied') {
      modalTitle.textContent = '通知目前已被瀏覽器封鎖';
      modalDesc.innerHTML = '請點擊網址列左側的鎖頭／資訊圖示，<br>將「通知」權限改為允許後重新整理頁面 🙏';
      modalCta.style.display = 'none';
      modalLater.textContent = '我知道了';
    } else {
      modalTitle.textContent = '想第一時間知道新貓咪到店嗎？';
      modalDesc.innerHTML = '點擊「允許」，下一位讓您心動的小寶貝一到店，<br>我們就會立刻通知您 🏡✨';
      modalCta.style.display = 'block';
      modalLater.textContent = '稍後再說';
    }
    openModal();
  });
})();
