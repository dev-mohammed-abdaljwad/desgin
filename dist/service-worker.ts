/// <reference lib="webworker" />

// Proper typing for service worker global scope
const sw = globalThis as any as ServiceWorkerGlobalScope;

// Cache version
const CACHE_NAME = 'eduplatform-v1';
const RUNTIME_CACHE = 'eduplatform-runtime-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache static assets
sw.addEventListener('install', (event: any) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching static assets');
      return cache.addAll(STATIC_ASSETS).then(() => {
        sw.skipWaiting();
        return undefined;
      });
    })
  );
});

// Activate event - clean up old caches
sw.addEventListener('activate', (event: any) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
          })
          .map((cacheName) => {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    }).then(() => {
      return sw.clients.claim();
    })
  );
});

// Fetch event - implement caching strategies
sw.addEventListener('fetch', (event: any) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests with network-first strategy
  if (url.pathname.startsWith('/api')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response.ok) {
            caches.open(RUNTIME_CACHE).then((c) => {
              c.put(request, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          // Return cached response if network fails
          return caches.match(request).then((response) => {
            if (response) {
              console.log('[Service Worker] Serving from cache:', request.url);
              return response;
            }
            // Return offline page if needed
            throw new Error('Network request failed and no cache available');
          });
        })
    );
    return;
  }

  // Handle HTML requests with network-first strategy
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((c) => {
              c.put(request, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          return caches.match(request).then((response) => {
            if (response) {
              return response;
            }
            return caches.match('/index.html').then((indexResponse) => {
              return indexResponse || new Response('Offline', { status: 503 });
            });
          });
        })
    );
    return;
  }

  // Handle all other requests with cache-first strategy
  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(request)
        .then((response) => {
          // Cache successful responses
          if (response.ok) {
            caches.open(RUNTIME_CACHE).then((c) => {
              c.put(request, response.clone());
            });
          }
          return response;
        })
        .catch(() => {
          // Return a placeholder for failed requests if needed
          console.error('[Service Worker] Fetch failed for:', request.url);
          throw new Error(`Failed to fetch ${request.url}`);
        });
    })
  );
});

// Handle messages from the client
sw.addEventListener('message', (event: any) => {
  console.log('[Service Worker] Message received:', event.data);

  if (event.data?.type === 'SKIP_WAITING') {
    sw.skipWaiting();
  }

  if (event.data?.type === 'CLEAR_CACHE') {
    caches.delete(RUNTIME_CACHE).then(() => {
      console.log('[Service Worker] Runtime cache cleared');
    });
  }

  if (event.data?.type === 'GET_CACHE_SIZE') {
    caches.open(RUNTIME_CACHE).then((cache) => {
      cache.keys().then((keys) => {
        event.ports?.[0]?.postMessage({
          type: 'CACHE_SIZE',
          size: keys.length,
        });
      });
    });
  }
});

// Background sync for offline actions (optional)
sw.addEventListener('sync', (event: any) => {
  if (event.tag === 'sync-forms') {
    event.waitUntil(
      // Handle offline form submissions here
      Promise.resolve()
    );
  }
});
