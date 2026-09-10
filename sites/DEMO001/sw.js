/* 取付管ID デモアプリ ／ Service Worker
 *
 * 方針：ネットワーク優先、失敗したらキャッシュ。
 *   - オンラインなら常に最新が出るので、差し替え作業中に古い版が残らない
 *   - 一度開いたあとは機内モードでも動く
 *   - 動画とPDFはキャッシュしない（容量が大きいため）
 */

const CACHE = 'sewer-nfc-v1';

const ASSETS = [
  './',
  './nfc.html',
  './manifest.json',
  './history.json',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png',
  './apple-touch-icon.png',
];

// 大きいファイルはキャッシュ対象外
const SKIP = /\.(mp4|pdf|xlsx|zip)$/i;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(
        ASSETS.map((u) => c.add(u).catch((e) => console.warn('[sw] skip', u, e.message)))
      ))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  if (req.method !== 'GET') return;
  if (new URL(req.url).origin !== self.location.origin) return;
  if (SKIP.test(req.url)) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      })
      .catch(() => caches.match(req).then((hit) => hit || caches.match('./nfc.html')))
  );
});
