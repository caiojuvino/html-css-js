self.addEventListener("install", (e) => {
  console.log("Install!");
  e.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "./",
        "./index.html",
        "./src/master.css",
        "./src/index.js",
        "./images/logo192.png",
        "./images/logo512.png",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
