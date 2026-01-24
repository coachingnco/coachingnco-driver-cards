const CACHE_NAME = "driver-cards-v3"; // 여기 숫자 올리면 캐시 새로 잡힘
const ASSETS = [
  "./",
  "./index.html",
  "./app.js",
  "./cards.json",
  "./intro.png",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => (k !== CACHE_NAME ? caches.delete(k) : null)))
    )
  );
  self.clients.claim();
});

// 네트워크 우선(최신 반영) + 실패 시 캐시
self.addEventListener("fetch", (event) => {
  const req = event.request;
  event.respondWith(
    fetch(req).then(res => {
      const copy = res.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(req, copy));
      return res;
    }).catch(() => caches.match(req).then(cached => cached || caches.match("./")))
  );
});
