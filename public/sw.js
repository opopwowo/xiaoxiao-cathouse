self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = { title: '小小貓屋', body: event.data ? event.data.text() : '有新消息！' };
  }

  const title = data.title || '小小貓屋 有新貓咪到院了！';
  const options = {
    body: data.body || '快來看看最新的毛孩子',
    icon: data.icon || '/images/icon-192.png',
    badge: '/images/icon-192.png',
    data: { url: data.url || '/' },
    tag: data.tag || 'new-kitten'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const targetUrl = (event.notification.data && event.notification.data.url) || '/';

  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      for (const client of clients) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(targetUrl);
          return client.focus();
        }
      }
      return self.clients.openWindow(targetUrl);
    })
  );
});
