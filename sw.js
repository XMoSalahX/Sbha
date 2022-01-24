var cacheName = "sbhaCache"
var filesToCache = [

    '/css2?family=Almarai:wght@300;400;700;800&display=swap	',
    '/s/almarai/v5/tssoApxBaigK_hnnS-agtnqWo4z1oXk.woff2',
    '/s/almarai/v5/tsstApxBaigK_hnnQ1iFo1K0rqY.woff2',
    '/Sbha/',
    '/Sbha/css/all.min.css',
    '/Sbha/css/main.css',
    '/Sbha/images/img144.png',
    '/Sbha/images/path.png',
    '/Sbha/index.html',
    '/Sbha/js/main.js',
    '/Sbha/manifest.json',
    '/Sbha/sw.js'


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