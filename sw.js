// sw.js - Service Worker for caching

const CACHE_NAME = 'clinic-pwa-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './patient.html', /* Ensure you cache this file too */
  './style.css',
  './app.js',
  './database.js',
  './print.js',
  './manifest.json'
];

// Install event - caches files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

// Activate event - cleans up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event - serves from cache if offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found, else fetch from network
        return response || fetch(event.request);
      })
  );
});