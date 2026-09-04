/* eslint-disable no-restricted-globals */

// Smart Service Worker for Hausa Clerking PWA
const CACHE_NAME = 'hausa-clerking-v2';

// Essential core URLs to pre-cache on installation
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/manifest.json',
    '/favicon.ico'
];

// Install: Pre-cache core files and activate immediately
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => cache.addAll(PRECACHE_URLS))
            .catch((err) => console.warn('Pre-cache error:', err))
    );
    self.skipWaiting();
});

// Activate: Automatically clean up obsolete caches from previous versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Clearing old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch: Smart Caching Strategy
self.addEventListener('fetch', (event) => {
    // Ignore non-http/https requests (e.g. chrome-extension://, moz-extension://)
    if (!event.request.url.startsWith('http')) {
        return;
    }

    // Only handle GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    const isNavigation = event.request.mode === 'navigate' || 
                         (event.request.headers.get('accept') && event.request.headers.get('accept').includes('text/html'));

    if (isNavigation) {
        // Strategy 1: Network-First for HTML/Navigation
        // Fetches freshest code when online; falls back to cache instantly when offline.
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                    }
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match(event.request).then((cachedResponse) => {
                        return cachedResponse || caches.match('/index.html');
                    });
                })
        );
    } else {
        // Strategy 2: Stale-While-Revalidate for Assets (JS, CSS, Images, JSON)
        // Serves cached version immediately for instant offline speed,
        // while fetching updated file in background to refresh cache for next time.
        event.respondWith(
            caches.match(event.request).then((cachedResponse) => {
                const fetchPromise = fetch(event.request)
                    .then((networkResponse) => {
                        if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                            const responseClone = networkResponse.clone();
                            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                        }
                        return networkResponse;
                    })
                    .catch(() => {
                        // Ignore network failures offline; cachedResponse will be served
                    });

                return cachedResponse || fetchPromise;
            })
        );
    }
});
