/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('Phonebook-store').then(cache => cache.addAll(['./'])),
  );
});
/* eslint-disable-next-line no-restricted-globals */
self.addEventListener('fetch', e => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request)),
  );
});
