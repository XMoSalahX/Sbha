var cacheName = "sbhaCache"
var filesToCache = [

    'index.html',
    'css/all.min.css',
    'css/main.css',
    'images/path.png',
    'js/main.js',
    'sw.js'

]


self.addEventListener("install", function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName)
        .then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache)
        })
    )
})

self.addEventListener("activate", function(e) {
    e.waitUntil(
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== cacheName) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', function(event) {
    event.respondWith(
        // Try the network
        fetch(event.request)
        .then(function(res) {
            return caches.open(cacheName)
                .then(function(cache) {
                    // Put in cache if succeeds
                    cache.put(event.request.url, res.clone());
                    return res;
                })
        })
        .catch(function(err) {
            // Fallback to cache
            return caches.match(event.request)
                .then(function(res) {
                    if (res === undefined) {
                        // get and return the offline page
                        return caches.match(cacheName)
                    }
                    return res;
                })
        })
    );
});