const CACHE = 'mikebudget-v5';
const ASSETS = ['./', './index.html', './manifest.json', './icon.svg',
  './neon-gaming-background.jpg', './illustration-rain-futuristic-city.jpg',
  './illustration-rain-futuristic-city-2.jpg',
  './Imgur Album  Spirited Away/1 - khROmt0.jpg',
  './Imgur Album  Spirited Away/2 - pY7pyLz.jpg',
  './Imgur Album  Spirited Away/10 - m92u4in.jpg',
  './Imgur Album  Spirited Away/11 - uoWPBmP.jpg',
  './Imgur Album  The Tale of Princess Kaguya/1 - NJH9WiC.jpg',
  './Imgur Album  The Tale of Princess Kaguya/2 - gJau9pB.jpg',
  './Imgur Album  The Tale of Princess Kaguya/10 - u0oUnL6.jpg',
  './Imgur Album  When Marnie Was There/1 - I6q4uIw.jpg',
  './Imgur Album  When Marnie Was There/2 - QbFFM8g.jpg',
  './Imgur Album  When Marnie Was There/10 - hblYpaZ.jpg',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS).catch(()=>{})));
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  if (e.request.url.includes('api.anthropic.com')) return;
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request)
      .then(res => { const c = res.clone(); caches.open(CACHE).then(ca => ca.put(e.request, c)); return res; })
      .catch(() => caches.match('./index.html'))
    )
  );
});
