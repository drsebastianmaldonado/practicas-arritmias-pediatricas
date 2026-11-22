# Instrucciones para Claude: Prácticas en arritmias pediátricas

## Con quién trabajás
- El dueño es cardiólogo pediatra electrofisiólogo, no programador. Hablale siempre en español rioplatense (vos), simple y sin jerga técnica.
- Dale pasos concretos y cortos, del tipo "tocá tal cosa", "pegá esto en tal lugar".
- Trabaja desde una PC con Windows, con los archivos en Dropbox, y desde el celular (iPhone).
- Sitio publicado: https://drsebastianmaldonado.github.io/practicas-arritmias-pediatricas/

## Cómo está armada la app
- Es una PWA estática en un solo archivo: `index.html`, con JS sin frameworks y rutas por hash (`#f3c9`, `#semana`, `#recursos`…).
- Los datos están en archivos aparte:
  - `casos.js`: `window.CASOS = [...]`, en una sola línea.
  - `semana.js`: el caso de la semana actual.
  - `semana_archivo.js`: los casos de la semana anteriores.
  - `recursos.js`, `drogas.js`, `glosario.js`, `scores.js`, `patrones.js`, `registro.js`, etc.
- **`sw.js`**: subí `CACHE_VERSION` (v139 → v140…) en cada cambio publicado. Si no, los celulares siguen viendo la versión vieja.

### Preguntas de los casos
- Cada pregunta tiene esta forma: `{enun, ctx, multi, opc:[{l,t}], k:{r:[...], c}}`.
- Así se corrige cada tipo (`exCorrecta` en `index.html`):
  - `multi:false` con varias letras en `r`: vale cualquiera de ellas.
  - `multi:true`: es correcta si marcó el 50 % o más de las correctas y ninguna incorrecta.
  - `k.min:1`: alcanza con marcar una sola correcta (por ejemplo, F10C9 P5).
- Imágenes de un caso: `imgs:[{a, p}]`.
  - `p=0` muestra la imagen con la viñeta.
  - `p=k` la muestra antes de la pregunta k+1.
  - Si `a` tiene una `/`, la ruta se usa tal cual; si no, se busca en `imagenes_web/`.
- Caso de la semana:
  - Las imágenes de la viñeta van en `imgs:[...]`.
  - Las de cada pregunta van en `preguntas[i].img:[...]`.
  - Todas viven en `imagenes_web/`.

### Recursos
- Las entradas de `recursos.js` tienen esta forma: `{s, t, d, u, oculto?}`.
- `oculto:true` saca el recurso de la lista, pero el link directo sigue funcionando.
- Los grupos se definen en `GRUPOS_RECURSOS` y las etiquetas anidadas en `SUBETIQUETAS` (por ejemplo, "Síncope"), en `index.html`.
- Los recursos HTML y PDF van en `recursos/`.

## Muy importante: la PC del dueño también publica
La carpeta de la PC es la carpeta *Banco de casos* (en Dropbox, dentro de "Fascículos de arritmias en pediatría"). Desde ahí se usan estos scripts:
- **`actualizar.ps1`**:
  - Regenera `casos.js` a partir de los Word.
  - Borra y regenera `imagenes_web/`.
  - Después aplica `correcciones_online.json`.
- **`publicar_online.ps1`**:
  - Primero trae los archivos que son más nuevos online.
  - Después sube todo.
  - Espeja `imagenes_web`, `iconos`, `patrones_img`, `archivo_semana` y `recursos`.
- **`publicar_semana.ps1`**: publica el caso de la semana desde `caso_semana.txt`.

Consecuencias:
- **Todo cambio online en `casos.js` se pierde** la próxima vez que se use "Actualizar", salvo que también se cargue en `correcciones_online.json` en la PC.
  - Después de corregir casos online, dale al dueño un texto para pegar en Claude Code abierto en esa carpeta de la PC.
  - Ese texto tiene que listar las correcciones por caso (`FxCy`) y pregunta.
  - Esta sesión en la nube no tiene acceso a la PC.
- **Imágenes de casos editadas o marcadas**: guardalas en `imagenes_extra/` (la PC no espeja esa carpeta) y referencialas con la ruta completa (`imagenes_extra/archivo.jpg`).
- **No le pidas al Claude de la PC que toque `index.html` ni `sw.js`**: esos se mantienen online.

## Cómo publicar desde la nube
1. `git fetch origin main && git checkout -B <rama> origin/main`
2. Hacé los cambios y subí `CACHE_VERSION` en `sw.js`.
3. Probalo con Playwright:
   - Serví la carpeta con `python3 -m http.server`.
   - Simulá un usuario registrado con `localStorage.bc_registro = {"v":2,"ok":1}`.
   - Interceptá `script.google.com`.
   - `localStorage.bc_pasos='todas'` muestra todas las preguntas juntas.
4. Hacé el commit, push, crea el PR y mergealo vos mismo: el dueño quiere los cambios publicados.
5. Volvé a alinear la rama con `main`.

Si editás `casos.js` con node, comparalo contra `git show HEAD:casos.js` para confirmar que solo cambió lo pedido.

## Otros datos
- **Registros y estadísticas**:
  - Están en Google Sheets.
  - Se reciben con un Apps Script, cuya versión r5 deduplica por mail.
  - El conector de Google Drive funciona.
  - Desde la nube no se llega a `script.google.com`.
- **iOS**:
  - No uses regex con lookbehind (`(?<=…)`): rompe Safari < 16.4.
  - La app instalada en el iPhone no comparte datos con Safari.
- **Privacidad**: no pongas datos personales del dueño en archivos nuevos. Este repositorio es público.
