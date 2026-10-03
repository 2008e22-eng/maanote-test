const APP_VERSION = '0.9-rc2';
const APP_BUILD = '2026-10-03.5-github-pages-phone-test';
const CACHE_PREFIX = 'maanote-shell-';
const CACHE = `${CACHE_PREFIX}${APP_VERSION}-${APP_BUILD}`;

const APP_SHELL = [
  './',
  './index.html',
  './styles.css?v=0.9-rc2',
  './app.js?v=0.9-rc2',
  './manifest.webmanifest',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png',
  './common-seed.json',
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(APP_SHELL);
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys
      .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE)
      .map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', event => {
  const type = event.data?.type;
  if (type === 'SKIP_WAITING') self.skipWaiting();
  if (type === 'GET_VERSION' && event.ports?.[0]) {
    event.ports[0].postMessage({version:APP_VERSION, build:APP_BUILD, cache:CACHE});
  }
});

function navigationFallback(pathname) {
  return './index.html';
}

async function networkFirst(request, fallbackKey) {
  try {
    const fresh = await fetch(request, {cache:'no-store'});
    if (fresh && fresh.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(fallbackKey || request, fresh.clone());
    }
    return fresh;
  } catch (_) {
    return (await caches.match(fallbackKey || request)) || (await caches.match('./index.html')) || (await caches.match('./'));
  }
}

async function cacheFirst(request) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const fresh = await fetch(request);
    if (fresh && fresh.ok) {
      const cache = await caches.open(CACHE);
      await cache.put(request, fresh.clone());
    }
    return fresh;
  } catch (_) {
    return new Response('', {status:504, statusText:'Offline'});
  }
}

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, navigationFallback(url.pathname)));
    return;
  }

  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(fetch(request, {cache:'no-store'}).catch(() => new Response('', {status:504, statusText:'Offline'})));
    return;
  }

  if (url.pathname.endsWith('/common-seed.json')) {
    event.respondWith(networkFirst(request, './common-seed.json'));
    return;
  }

  event.respondWith(cacheFirst(request));
});
