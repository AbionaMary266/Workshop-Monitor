const CACHE_NAME = 'monitor-v1';
const ASSETS = ['./', './index.html', './manifest.json'];

// Install Service Worker and Cache Assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Fetch Assets from Cache when Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

// LISTEN FOR BACKGROUND PUSH NOTIFICATIONS
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : 'Workshop Critical Alert!';
  
  const options = {
    body: data,
    icon: 'https://cdn-icons-png.flaticon.com/512/559/559364.png',
    badge: 'https://cdn-icons-png.flaticon.com/512/559/559364.png',
    vibrate: [200, 100, 200, 100, 400],
    data: { dateOfArrival: Date.now() },
    actions: [
      { action: 'explore', title: 'Open Dashboard' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('System Failsafe Alert', options)
  );
});
