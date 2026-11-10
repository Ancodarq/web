# Revisión global de ANCODARQ | ESCUADRA

Fecha: 10 de noviembre de 2026. Revisión del checkout local, sin modificar el diseño ni corregir todavía los hallazgos.

## Dictamen

La base visual y las galerías actuales funcionan en las pruebas realizadas, pero hay asuntos que deben resolverse antes de considerar la web terminada: formularios sin envío, rutas antiguas de proyectos que fallan, contenidos legales pendientes, dependencia del CDN de Tailwind y un carrusel de portada pesado. También hay problemas medidos de contraste y carencias de metadatos.

No se ha demostrado una vulnerabilidad crítica explotable en el código revisado. Esto no certifica la seguridad del sitio publicado: no se ha confirmado su URL, servidor ni configuración de despliegue.

## Prioridades

| Prioridad | Hallazgo comprobado | Efecto | Archivo / referencia |
| --- | --- | --- | --- |
| P1 | Contacto y candidaturas cancelan el envío con `event.preventDefault()` y `action="#"`. | Los botones validan, pero no mandan mensajes ni CV. | `contacto/index.html:40`, `trabaja-con-nosotros/index.html:52` |
| P1 | Seis rutas antiguas muestran «Proyecto no encontrado». | Los enlaces guardados o indexados pueden llevar a una ficha vacía. | Seis plantillas bajo `proyectos/`; `js/projects.js:776` |
| P1 | Aviso legal y cookies contienen «Contenido legal pendiente de facilitar por ANCODARQ». | Dos destinos del pie siguen siendo borradores. | `aviso-legal/index.html:51`, `cookies/index.html:51` |
| P1 | Todas las páginas dependen del Play CDN de Tailwind. Al bloquearlo, la cabecera pierde su posición fija y aparece `ReferenceError: tailwind is not defined`. | Un fallo del tercero afecta al diseño general. | `<head>` de las 16 páginas; p. ej. `contacto/index.html:10` |
| P1 | La portada usa 23 PNG que suman 68.265.906 bytes, unos 65,1 MiB. El primero pesa 2.639.125 bytes. | El carrusel puede descargar una cantidad importante de datos si el usuario permanece en Inicio. | `js/main.js:303`, `js/main.js:342`, `assets/home/Portada/` |
| P2 | Seis proyectos tienen `category: ""`. | Aparecen en TODOS, pero quedan fuera de los filtros específicos. | `js/projects.js`, lista detallada abajo |
| P2 | Enlaces legales, enlace de vuelta y metadatos de proyecto usan gris `rgb(163,163,163)` sobre blanco: contraste nominal 2,52:1. | Dificulta la lectura, especialmente con tamaños de 9–11 px. | `js/main.js:267`, `proyectos/detalle.html:47`, `js/projects.js:799` |
| P2 | El carrusel se actualiza cada 2,5 segundos sin control visible de pausa y sin detenerse al salir de su zona. | Distracción, consumo de datos y limitación de accesibilidad. | `js/main.js:342` |
| P2 | Los datos de proyectos/servicios se interpolan sin escape en `innerHTML`. | Riesgo futuro si se conectan a un CMS o entradas externas; no se ha demostrado entrada atacante actual. | `js/projects.js:750`, `js/projects.js:792`, `js/main.js:387` |
| P2 | No hay configuración de cabeceras de seguridad en los archivos versionados revisados; abundan scripts y manejadores inline. | No puede darse por comprobada una CSP, protección contra framing u otras cabeceras del servidor. Una CSP estricta requiere adaptar primero el código inline. | HTML, `js/main.js`, `js/projects.js`; configuración del hosting no disponible |
| P2 | Sin JavaScript, Proyectos muestra solo la etiqueta: no hay cabecera compartida ni obras. | Fallo de recuperación ante scripts bloqueados o no ejecutados. | `proyectos/index.html`, `js/main.js:41`, `js/projects.js:725` |
| P2 | Inicio y Contacto no tienen `h1` ni siquiera tras ejecutar JavaScript. Ninguna de las 16 páginas tiene meta descripción o canonical. Todas las fichas dinámicas usan el título «Proyecto — ANCODARQ». | Jerarquía semántica y presentación en buscadores mejorables. | `index.html`, `contacto/index.html`, `proyectos/detalle.html:8` |
| P3 | El texto de aceptación de privacidad no contiene enlace; los campos no tienen `name`, y el CV no tiene límite de tamaño. | Integración de formularios incompleta. El selector PDF no sustituye la validación del futuro servidor. | `contacto/index.html:42`, `trabaja-con-nosotros/index.html:64` |
| P3 | Cabeceras/pies duplicados en páginas antiguas, junto a `main.js`, `projects.js` y `styles.css` obsoletos en la raíz. | Mantenimiento más difícil y futuras diferencias entre páginas. | Plantillas antiguas, archivos de la raíz; las páginas activas cargan `js/` y `css/` |
| P3 | Sin `srcset` para las fotografías; hay originales JPG/PNG de varios MB que no se usan en las galerías actuales. | Se puede reducir el peso de distribución y servir tamaños adecuados sin cambiar las fotos. | `assets/`, generadores de imágenes en JS |
| P3 | Persisten desequilibrios de espacio en Servicios a 768 px y Nosotros a 1024 px. | Mejora editorial pendiente, no rotura funcional. | Evidencias en `screenshots/responsive/` |

P1 significa prioridad alta antes de dar la web por terminada; no implica por sí sola una vulnerabilidad de seguridad grave. P2 es una corrección importante y P3 una mejora posterior.

## Detalle de los hallazgos y acciones recomendadas

### Formularios

Los dos formularios son intencionadamente estáticos, tal como documenta el README original. Se ha comprobado que los campos obligatorios invalidan un formulario vacío; no hay backend ni destino de envío. Los campos carecen de `name`, por lo que añadir únicamente un `action` tampoco bastaría.

Para completarlos: acordar un receptor, usar el método y codificación adecuados —incluido `multipart/form-data` si se recibe el CV—, definir los nombres de campos, gestionar confirmación/error y validar en servidor. Antes de aceptar archivos, fijar tipo real, tamaño y almacenamiento; aplicar controles contra abuso según la arquitectura del receptor. No son protecciones verificadas ni una vulnerabilidad de subida actual: hoy no existe esa subida. No se ha enviado ningún dato de prueba ni CV.

### Proyectos antiguos y clasificación

Rutas afectadas:

- `/proyectos/espacio-retail-serrano/`
- `/proyectos/reforma-duplex-chamberi/`
- `/proyectos/rehabilitacion-edificio-claudio-coello/`
- `/proyectos/sede-corporativa-castellana/`
- `/proyectos/vivienda-somontes/`
- `/proyectos/vivienda-unifamiliar-la-moraleja/`

Las plantillas asignan `document.body.dataset.projectSlug`, pero el generador actual solo lee `?slug=`. Además, sus seis identificadores no están en los datos activos. Por tanto, añadir el fallback al atributo del body no resuelve por sí solo el problema. Hace falta confirmar la correspondencia real antes de recuperar esas fichas o redirigirlas.

Proyectos sin categoría: Somosaguas, Skybar Bernabéu, Vinitus Gran Vía, Manero, Vinitus Alcalá e Isla del Sur. No se han asignado categorías por inferencia. Obras en ejecución permanece vacío por indicación del usuario y no se considera un fallo.

Las 29 fichas actuales sí muestran el nombre y el número de fotos esperados. La navegación anterior/siguiente recorre las 29 obras sin ciclos, desde Prado Largo hasta Clinique La Prairie.

### Dependencias externas, seguridad y privacidad técnica

El navegador contacta con `cdn.tailwindcss.com`, `fonts.googleapis.com` y `fonts.gstatic.com`. El script externo no declara integridad SRI. Esto no prueba una intrusión, pero introduce una dependencia de disponibilidad y confianza de terceros. Tailwind indica que Play CDN es para desarrollo, no para producción: conviene generar CSS estático conservando la apariencia. [Documentación oficial de Tailwind v3](https://v3.tailwindcss.com/docs/installation/play-cdn).

Se revisaron 435 archivos versionados mediante un escaneo de patrones sobre sus archivos de texto. No aparecieron claves privadas, formatos de tokens de GitHub, claves AWS de acceso ni claves de API con los patrones utilizados. No es un análisis del historial completo, de todos los formatos de secretos ni de la configuración de cuentas externas.

El parámetro de proyecto se usa para buscar en una lista cerrada; no se inserta directamente como HTML. Una URL de prueba con marcado y un manejador de evento no creó una imagen ni ejecutó el marcador de JavaScript. El uso de `innerHTML` sigue requiriendo precaución al introducir datos externos: usar `textContent` y atributos DOM para texto y, cuando corresponda, escape contextual o sanitización. [MDN: innerHTML](https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML).

No se encontraron usos propios de `document.cookie`, `localStorage`, `sessionStorage`, llamadas de analítica, un service worker o endpoints de API en los scripts de la aplicación. La sesión limpia revisada tampoco mostró cookies ni claves de almacenamiento de la aplicación. Esto no certifica qué datos retienen los proveedores externos ni resuelve el contenido de las políticas.

Los enlaces visibles con `target="_blank"` revisados incluyen `noopener`; los destinos externos de correo, teléfono y redes no se han validado como servicios disponibles.

Sin una URL pública confirmada quedan pendientes HTTPS, certificado, redirecciones, HSTS, CSP, `frame-ancestors`, `X-Content-Type-Options`, `Referrer-Policy`, compresión, caché y cualquier exposición del despliegue. No se infiere la ausencia de estas cabeceras a partir del servidor local de pruebas. Tampoco se ha auditado un backend, autenticación, base de datos o subida de archivos inexistentes en este repositorio. [MDN: implementación de CSP](https://developer.mozilla.org/en-US/docs/Web/Security/Practical_implementation_guides/CSP).

Si el hosting publica la raíz del repositorio, revisar qué directorios de auditoría, capturas, originales y archivos obsoletos entran en el despliegue. La presencia local de esos archivos no demuestra que estén publicados ni que contengan secretos.

### Rendimiento y accesibilidad

Las galerías actuales usan carga diferida y sus imágenes referenciadas existen. Las 23 imágenes de portada no se descargan todas al inicio: el problema es el volumen potencial acumulado mientras sigue cambiando la imagen. Se recomienda conservar los originales y generar variantes optimizadas, usar `srcset` y pausar el carrusel cuando esté fuera de pantalla o la pestaña esté oculta. No se ha medido Core Web Vitals en tráfico real ni en una red móvil física.

El contraste nominal medido de 2,52:1 es inferior al 4,5:1 requerido para texto normal por el criterio AA de contraste; la medición no constituye una auditoría completa de conformidad. Oscurecer esos textos puede conservar la identidad. Los placeholders y los textos sobre fotografías requieren además una revisión específica. [W3C: contraste mínimo](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).

La preferencia de movimiento reducido ya detiene el carrusel al cargar y desactiva las transiciones. Sigue faltando una pausa visible para otros usuarios; tampoco se escucha un cambio de esa preferencia durante la sesión. [W3C: pausar, detener u ocultar](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide).

El foco de teclado, Escape, las flechas, los filtros, el contador, la recuperación del scroll y el gesto táctil simulado del visor ya cuentan con comprobaciones de navegador en la revisión responsive anterior. No se han ejecutado aquí lectores de pantalla, Safari/iOS o pruebas físicas de accesibilidad.

### Contenido, semántica y mantenimiento

Aviso legal y cookies son placeholders comprobados, no una valoración jurídica. El contenido definitivo debe aportarse y validarse con el responsable correspondiente. La política de privacidad existe, pero esta revisión técnica no certifica su adecuación.

La portada conserva cuatro párrafos definitivos de Nosotros y la página propia mantiene la versión resumida de tres párrafos acordada anteriormente. No se considera un error, pero conviene confirmar esa diferencia editorial al cerrar contenidos.

No se localizaron `robots.txt`, `sitemap.xml` ni una página propia `404.html` en el código versionado. No tener robots no bloquea por sí mismo el rastreo; un sitemap y URLs canónicas ayudan a documentar las rutas válidas. Las fichas por query comparten título y contenido generado en JS: conviene valorar títulos únicos y páginas pre-renderizadas, sin afirmar que los buscadores no puedan ejecutar JavaScript.

## Evidencias y comprobaciones realizadas

- Código HTML, CSS y JS activo; comparación con los archivos antiguos de la raíz y revisión de configuración versionada.
- Chrome automatizado: 16 páginas y 29 fichas actuales, más pruebas de parámetros no válidos, indisponibilidad del CDN y JavaScript desactivado.
- 327 recursos/enlaces locales comprobados por HTTP, sin respuestas de error. Un HTTP 200 no garantiza una ficha válida: por eso se verificó también el contenido y se detectaron las seis rutas antiguas.
- 260 rutas de recursos JS verificadas con coincidencia exacta de mayúsculas, sin inconsistencias; importante para desplegar en servidores sensibles a mayúsculas.
- Ningún desbordamiento horizontal en las páginas normales medidas a 390 px. Se reutilizan como evidencia separada las 160 vistas responsive anteriores y las 35 capturas completas de `screenshots/responsive/`.
- Los datos sin procesar están en `global.json`. Su error `tailwind is not defined` corresponde a la prueba deliberada de bloquear el CDN, no a una excepción detectada en las páginas normales.
- No se han enviado formularios, publicado cambios, modificado datos de proyectos ni ejecutado pruebas contra servicios externos.

## Orden de trabajo propuesto

1. Conectar y probar formularios; completar los dos textos legales pendientes.
2. Resolver las seis rutas antiguas y confirmar las seis categorías vacías.
3. Generar CSS local de Tailwind y optimizar las variantes de portada.
4. Corregir contraste, pausa del carrusel, encabezados y metadatos.
5. Preparar el despliegue y comprobar su URL real y sus cabeceras; reforzar la construcción del DOM para futuros datos externos.
6. Limpiar las fuentes obsoletas, concretar el conjunto de publicación y retocar los espacios editoriales pendientes.

La revisión deja únicamente el informe, los resultados y la ampliación del script de auditoría. No se han aplicado todavía estas correcciones al sitio.
