
const CACHE_NAME = 'instavault-v2';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// Install SW
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
  self.skipWaiting();
});

// Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Listen for requests
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // 1. API Calls: Network Only (Never cache)
  if (requestUrl.pathname.includes('/api/') || requestUrl.hostname.includes('googleapis')) {
    // Exception: Cache Google Fonts (CSS and WOFF files)
    if (!requestUrl.hostname.includes('fonts.googleapis.com') && !requestUrl.hostname.includes('fonts.gstatic.com')) {
        return;
    }
  }

  // 2. HTML / Navigation: Network First, Fallback to Cache
  // This ensures the user gets the latest app version if online, but it still works offline.
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          return caches.match('./index.html') || caches.match('./');
        })
    );
    return;
  }

  // 3. Assets (JS, CSS, Images, Fonts): Stale-While-Revalidate or Cache First
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          // Optional: Update cache in background for next time (Stale-while-revalidate)
          // For immutable CDNs, simple return is fine.
          return response;
        }

        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          (response) => {
            // Check if valid
            if (!response || response.status !== 200 || response.type !== 'basic' && response.type !== 'cors') {
              return response;
            }

            // Clone response
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                // Cache dynamic assets (like CDN scripts, images)
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
  );
});
