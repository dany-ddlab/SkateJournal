const CACHE_NAME = "skate-journal-v1";

const urlsToCache = [
    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./sessioni.html",
    "./sessioni.js",
    "./calendario.html",
    "./calendario.js",
    "./statistiche.html",
    "./statistiche.js",
    "./obiettivi.html",
    "./obiettivi.js",
    "./consigli.html",
    "./consigli.js",
    "./badge.html",
    "./badge.js",
    "./manifest.json",
    "./sfondo.jpeg",
    "./icons/icon-512.png"
];

self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});