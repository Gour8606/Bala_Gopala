/**
 * Bala Gopala & Sandipani Gurukul - Service Worker (Offline Support)
 * Commercial-grade PWA caching for uninterrupted offline play
 */

const CACHE_NAME = 'bala-gopala-v4.3';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './favicon.svg',
  './styles.css',
  './audio.js',
  './vedic-assets.js',
  './games.js',
  './app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Return cached asset, fetch fresh copy in background
        fetch(event.request, { cache: 'no-cache' }).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, networkResponse));
          }
        }).catch(() => { /* Offline fallback is already returned */ });

        return cachedResponse;
      }

      return fetch(event.request, { cache: 'no-cache' }).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Offline fallback: ignoreSearch matches pre-cached unversioned assets
        return caches.match(event.request, { ignoreSearch: true }).then((fallback) => {
          if (fallback) return fallback;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      });
    })
  );
});
