self.addEventListener('install', function(event) {
    console.log('Service Worker: تم التثبيت');
});

self.addEventListener('fetch', function(event) {
    event.respondWith(fetch(event.request));
});