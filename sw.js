const CACHE = 'maanote-v0.9-stage7-bigtext-emerald1-20261003';
const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=0.9-stage7-bigtext-emerald1',
  './app.js?v=0.9-stage7-bigtext-emerald1',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './version.json',
  './admin.html',
  './admin.css?v=0.9-stage7-bigtext-emerald1',
  './admin.js?v=0.9-stage7-bigtext-emerald1',
  './common-seed.json'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put(url.pathname.endsWith('/admin.html') ? './admin.html' : './index.html', fresh.clone());
        return fresh;
      } catch (_) {
        if (url.pathname.endsWith('/admin.html')) return (await caches.match('./admin.html')) || (await caches.match('./index.html'));
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached;
    try {
      const fresh = await fetch(req);
      if (fresh && fresh.ok) {
        const cache = await caches.open(CACHE);
        cache.put(req, fresh.clone());
      }
      return fresh;
    } catch (_) {
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});
