const CACHE = 'moved-to-soap-pro-v2';
self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || req.url.includes('firebasedatabase')) return;
  e.respondWith(fetch(req).then(r => {
    const copy = r.clone();
    caches.open(CACHE).then(c => c.put(req, copy)).catch(() => {});
    return r;
  }).catch(() => caches.match(req).then(x => x || caches.match('./'))));
});
