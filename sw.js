/**
 * Mediawegwijs Service Worker v2.4
 * Network-First voor altijd de laatste versie, met offline-fallback.
 */

const CACHE_NAME = 'mww-app-cache-v2.4';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './logo.png',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
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
  // Google Apps Script API calls altijd direct via het netwerk
  if (event.request.url.includes('script.google.com')) {
    return;
  }

  // Network-First voor HTML/bestanden: probeer eerst internet, val bij storing terug op cache
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => caches.match(event.request))
  );
});
