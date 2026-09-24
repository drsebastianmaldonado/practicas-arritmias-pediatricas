// Service worker del banco: permite instalarlo como app y que lo ya visto se pueda abrir sin conexión.
// Solo funciona cuando el banco se sirve por HTTPS (o localhost); en un archivo abierto directamente (file://) no corre.
// Si cambiás casos.js, index.html u otro archivo del "esqueleto", subí CACHE_VERSION para que se actualice en todos.
const CACHE_VERSION = 'v3';
const CACHE_ESQUELETO = 'banco-esqueleto-' + CACHE_VERSION;
const CACHE_DATOS = 'banco-datos-' + CACHE_VERSION;   // imágenes y otros archivos grandes: se guardan a medida que se ven

const ESQUELETO = [
  './', './index.html', './manifest.json',
  './casos.js', './recursos.js', './valores.js', './scores.js', './parametros_z.js', './glosario.js',
  './registro.js', './diagnosticos.js', './patrones.js', './semana.js', './semana_archivo.js',
  './iconos/icon-192.png', './iconos/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_ESQUELETO).then(c => c.addAll(ESQUELETO)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_ESQUELETO && k !== CACHE_DATOS).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || !req.url.startsWith(self.location.origin)) return;
  // El esqueleto (HTML/JS del banco): primero la copia guardada, así abre al toque; se actualiza solo cuando cambia CACHE_VERSION.
  if (ESQUELETO.some(p => req.url.endsWith(p.replace('./', '/'))) || req.mode === 'navigate') {
    e.respondWith(caches.match(req).then(r => r || fetch(req).catch(() => caches.match('./index.html'))));
    return;
  }
  // El resto (imágenes de casos, etc.): se sirve de la red y se va guardando para la próxima vez que no haya conexión.
  e.respondWith(
    fetch(req).then(res => { if (res.ok) caches.open(CACHE_DATOS).then(c => c.put(req, res.clone())); return res; })
      .catch(() => caches.match(req))
  );
});
