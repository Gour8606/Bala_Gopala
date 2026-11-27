/**
 * Bala Gopala & Sandipani Gurukul - Service Worker (Offline Support)
 *
 * Precaches the complete app shell so every game works with no connection.
 * Strategy: stale-while-revalidate for same-origin GETs — instant from cache,
 * refreshed in the background, so the next launch gets the new version.
 *
 * Bump CACHE_VERSION together with the ?v= query strings in index.html.
 */

const CACHE_VERSION = '5.0';
const CACHE_NAME = 'bala-gopala-v' + CACHE_VERSION;
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './styles.css?v=' + CACHE_VERSION,
  './audio.js?v=' + CACHE_VERSION,
  './vedic-assets.js?v=' + CACHE_VERSION,
  './games.js?v=' + CACHE_VERSION,
  './app.js?v=' + CACHE_VERSION,
  './fonts/fredoka-latin.woff2',
  './fonts/fredoka-latin-ext.woff2',
  './fonts/quicksand-latin.woff2',
  './fonts/quicksand-latin-ext.woff2',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 'reload' bypasses the HTTP cache so a new release never precaches stale files
      return cache.addAll(ASSETS_TO_CACHE.map((url) => new Request(url, { cache: 'reload' })));
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key.indexOf('bala-gopala-') === 0 && key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

function isCacheable(response) {
  return response && response.status === 200 && response.type === 'basic';
}

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  // Only same-origin requests are ours to cache; anything else goes straight to the network
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request, { cache: 'no-cache' }).then((networkResponse) => {
          if (isCacheable(networkResponse)) {
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        });

        if (cachedResponse) {
          // Serve instantly; keep the worker alive until the background refresh finishes
          event.waitUntil(networkFetch.catch(() => { /* offline: cached copy already served */ }));
          return cachedResponse;
        }

        return networkFetch.catch(() => {
          // Offline fallback: ignoreSearch matches assets cached under another ?v= string
          return cache.match(request, { ignoreSearch: true }).then((fallback) => {
            if (fallback) return fallback;
            if (request.mode === 'navigate') {
              return cache.match('./index.html');
            }
            return new Response('Offline', { status: 503, statusText: 'Offline', headers: { 'Content-Type': 'text/plain' } });
          });
        });
      });
    })
  );
});
