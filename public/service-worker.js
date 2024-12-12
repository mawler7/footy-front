const CACHE_NAME = 'app-cache-v1';
const URLS_TO_CACHE = [
    '/mp5.mp4',  // dodaj tutaj ścieżkę do filmiku
    '/ssstik.io_@j_tekkz_1730165090721.mp4',  // dodaj tutaj ścieżkę do filmiku
    // inne zasoby, które chcesz cache'ować
];

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});