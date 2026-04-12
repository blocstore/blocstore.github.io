const CACHE_NAME = 'blocstore-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://cdn.tailwindcss.com'
];

// Installation du Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Distribution des fichiers depuis le cache pour la rapidité
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
