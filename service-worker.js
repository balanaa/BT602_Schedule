const CACHE_NAME = "schedule-pwa-v1";
const FILES_TO_CACHE = [
    "/BTBT602_Schedule/",
     "/BT602_Schedule/schedule.css",
     "/BT602_Schedule/clock.js",
     "/BT602_Schedule/bg.img",
     "/BT602_Schedule/favicon.png",
     "/BT602_Schedule/index.html",
     "/BT602_Schedule/tuesday.html",
     "/BT602_Schedule/wednesday.html",
     "/BT602_Schedule/thursday.html",
     "/BT602_Schedule/friday.html",
     "/BT602_Schedule/saturday.html",
     "/BT602_Schedule/class-icon-192x192.png",
     "/BT602_Schedule/class-icon-512x512.png"
 ];

// Install Service Worker and cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Serve files from cache when offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Remove old caches when updating
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});