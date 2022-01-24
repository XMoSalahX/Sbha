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
        caches.open(cacheName).then(function(cache) {
            return fetch(event.request).then(function(response) {
                cache.put(event.request, response.clone());
                return response || cache;
            });
        }),
    );
});


// self.addEventListener('fetch', function(event) {
//     event.respondWith(
//         caches.match(event.request).then(function(response) {
//             return fetch(event.request).then(function() {
//                 return fetch(event.request)
//             }).catch(function() {
//                 return response
//             })
//         }),
//     );
// });
// var x = 0

// self.addEventListener('fetch', (e) => {
//     e.respondWith((async() => {
//         if (x === 0) {
//             const r = await caches.match(e.request);
//             console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
//             if (r) {
//                 x++
//                 return r;
//             }
//         }
//         const m = await caches.match(e.request);
//         const response = await fetch(e.request);
//         const cache = await caches.open(cacheName)

//         console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
//         cache.put(e.request, response.clone());

//         return response || m;


//     })());
// });