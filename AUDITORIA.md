# Auditoría y limpieza de la web de ANCODARQ

**24 de noviembre de 2026 · Rama `auditoria-migracion`.** El commit de limpieza `6624956` contiene los siete registros aprobados y la regla `*.log` en `.gitignore`. El informe está fuera de ese commit. El alcance de la auditoría es el código y los archivos locales de la web.

## Estructura y alcance comprobado

- Web estática multipágina. La entrada es `index.html`. Las páginas públicas están en `nosotros/`, `servicios/`, `contacto/`, `trabaja-con-nosotros/`, `aviso-legal/`, `privacidad/`, `cookies/` y `proyectos/`. Hay 16 documentos HTML en esas rutas, incluyendo seis plantillas antiguas.
- El catálogo de 47 proyectos, galería, filtros y visor están en `js/projects.js`. Los elementos compartidos están en `js/main.js` y `css/styles.css`. `assets/` contiene imágenes, logos y tres PDF. Los manifiestos de Recoletos y Gourmet La Pedrera usan Liquid para descubrir fotos adicionales. `scripts/responsive-audit.cjs` es una herramienta local de pruebas con Node y Chrome.
- Se inventariaron las carpetas y subcarpetas, incluidas `artifacts/` y `screenshots/`. Se cruzaron referencias literales y manifiestos con el nombre exacto de cada archivo, y se ejecutaron los siete filtros y las 47 fichas activas en una prueba del catálogo. Chrome comprobó diez rutas públicas en 320, 390, 768 y 1440 px, además de las seis fichas antiguas en la prueba inicial. Se inspeccionaron fuentes de texto y metadatos de archivos. Los binarios de perfiles, el contenido comprimido de los PDF y el historial de Git no se inspeccionaron en busca de secretos.

## 1. Archivos sobrantes o erróneos

**SEGURO** identifica material prescindible para la ejecución de la web. **REVISAR** identifica originales, evidencias, versiones antiguas, archivos con uso externo desconocido o elementos protegidos que requieren decisión expresa.

### SEGURO · Limpieza ya aprobada y registrada

1. `debug.log` — registro local de ejecución del navegador, sin uso en la web.
2. `artifacts/chrome-console.log` — salida histórica de una prueba local.
3. `artifacts/chrome-console-after.log` — salida histórica de una segunda prueba local.
4. `artifacts/chrome-review-errors.log` — registro de errores de una revisión de Chrome.
5. `artifacts/chrome-review-errors-2.log` — registro de errores de la repetición de esa revisión.
6. `screenshots/responsive/capture.log` — salida regenerable de la captura responsive.
7. `screenshots/responsive/capture-error.log` — salida de errores de la misma captura.

### SEGURO · Registros adicionales propuestos, pendientes de aprobación

1. `artifacts/form-preparation/check-error.log` — Salida de una prueba local de formularios, canal de errores. El sitio no lo carga.
2. `artifacts/form-preparation/check.log` — Salida de una prueba local de formularios. El sitio no lo carga.
3. `artifacts/global-review/audit-error.log` — Salida de la revisión automatizada, canal de errores. El sitio no lo carga.
4. `artifacts/global-review/audit.log` — Salida de la revisión automatizada. El sitio no lo carga.
5. `artifacts/legal-review/legal-final-error.log` — Salida de una comprobación de textos legales o tecnologías, canal de errores. El sitio no lo carga.
6. `artifacts/legal-review/legal-final.log` — Salida de una comprobación de textos legales o tecnologías. El sitio no lo carga.
7. `artifacts/legal-review/privacy-final-error.log` — Salida de una comprobación de textos legales o tecnologías, canal de errores. El sitio no lo carga.
8. `artifacts/legal-review/privacy-final.log` — Salida de una comprobación de textos legales o tecnologías. El sitio no lo carga.
9. `artifacts/legal-review/technologies-error.log` — Salida de una comprobación de textos legales o tecnologías, canal de errores. El sitio no lo carga.
10. `artifacts/legal-review/technologies.log` — Salida de una comprobación de textos legales o tecnologías. El sitio no lo carga.
11. `artifacts/responsive/audit-after-error.log` — Salida de una prueba de tamaños de pantalla, canal de errores. El sitio no lo carga.
12. `artifacts/responsive/audit-after.log` — Salida de una prueba de tamaños de pantalla. El sitio no lo carga.
13. `artifacts/responsive/audit-checks-error.log` — Salida de una prueba de tamaños de pantalla, canal de errores. El sitio no lo carga.
14. `artifacts/responsive/audit-checks.log` — Salida de una prueba de tamaños de pantalla. El sitio no lo carga.
15. `artifacts/responsive/audit-error.log` — Salida de una prueba de tamaños de pantalla, canal de errores. El sitio no lo carga.
16. `artifacts/responsive/audit.log` — Salida de una prueba de tamaños de pantalla. El sitio no lo carga.

La regla ignora registros nuevos. Los registros que ya se encontraban versionados, incluidos los que forman parte de bases LevelDB de Chrome, siguen registrados hasta que se apruebe una acción específica.

### REVISAR · Copias, archivos antiguos y evidencias

| Ruta | Motivo |
| --- | --- |
| `main.js` | JavaScript de una portada anterior con imágenes externas. La fuente activa está en `js/main.js`. |
| `projects.js` | Catálogo de seis proyectos de una versión anterior. Las páginas activas usan `js/projects.js`. |
| `styles.css` | Hoja de estilos de raíz sin referencia de carga actual. Las páginas usan `css/styles.css`. Tiene contenido distinto, por lo que no se clasifica como duplicado exacto. |
| `scripts/responsive-audit.cjs:24,35,39,330` | Herramienta de pruebas que arranca Chrome y genera informes. Es útil como código de desarrollo y no es una dependencia del navegador. |
| `assets/proyectos/46_RESTAURANTE ANXOITA CLAUDIO COELLO/` y `assets/proyectos/47_REHABILITACIÓN EDIFICIO DE VIVIENDAS CHAMBERÍ/` | Carpetas marcadoras con `.gitkeep`, sin ficha activa con esas identidades. La coincidencia de palabras con otro proyecto no demuestra equivalencia. |
| `assets/proyectos/40_REFORMA PISO RECOLETOS/` y `assets/proyectos/43_REFORMA PISO RECOLETOS/` | Ambas aportan imágenes a la misma ficha. El anexo identifica los cuatro pares idénticos. Revisar por archivo antes de plantear una fusión. |
| `proyectos/*/index.html` de las seis fichas de la sección 3 | Páginas huérfanas del catálogo y del menú. La propuesta y el rastro documental constan por ficha. |
| `contacto/index.html:40–52` y `trabaja-con-nosotros/index.html:52–69` | Comentarios extensos sobre integración de formularios. Documentación de mantenimiento vigente, sin propuesta de retirada. |
| `.git/` | Metadatos y respaldo del repositorio. Se conserva. |

| Carpeta o archivo | Archivos | MiB | Motivo por el que queda en revisión |
| --- | ---: | ---: | --- |
| `artifacts/chrome-review` | 166 | 5,64 | Perfil de Chrome, parámetros, caché y bases locales |
| `artifacts/chrome-review-2` | 303 | 17,85 | Segundo perfil de Chrome con caché y almacenamiento |
| `artifacts/chrome-review-3` | 247 | 17,42 | Tercer perfil de Chrome con caché y almacenamiento |
| `artifacts/chrome-review-4` | 322 | 23,59 | Cuarto perfil de Chrome con caché y almacenamiento |
| `artifacts/form-preparation` | 24 | 1,51 | Capturas, informes y registros de la revisión de formularios |
| `artifacts/global-review` | 4 | 0,15 | Informe e inventario de una revisión anterior |
| `artifacts/go-live-after.html` | 1 | 0,03 | Captura HTML de un estado anterior de Inicio |
| `artifacts/go-live-dom.html` | 1 | 0,01 | Exportación del DOM de una revisión anterior |
| `artifacts/home-projects-fit` | 6 | 5,61 | Capturas de ajuste de proyectos en Inicio |
| `artifacts/legal-review` | 16 | 1,73 | Borradores y evidencias de comprobaciones legales |
| `artifacts/responsive` | 46 | 15,10 | Informes, capturas y registros de pruebas de tamaños |
| `artifacts/typography-navigation` | 17 | 12,18 | Capturas y notas de tipografía y navegación |
| `screenshots/responsive` | 37 | 42,80 | Capturas de comprobación a distintas resoluciones |

Se detectaron 110 grupos de archivos idénticos por SHA-256 en `artifacts/` y `screenshots/` después de la limpieza, con 868 archivos implicados. Entre ellos hay bases, archivos vacíos y componentes repetidos de perfiles de Chrome. La coincidencia de hash no justifica borrar componentes sueltos dentro de estos perfiles. El anexo lista por separado los duplicados del contenido de la web.

Se inventariaron 66 imágenes sin referencia activa. Los tres PDF de `assets/documentos/` sí tienen enlaces. Las fuentes Prompt y Urbanist se solicitan externamente y tienen usos en `css/styles.css` y las páginas. No se detectaron fuentes locales sin uso, manifiestos de dependencias, `node_modules`, temporales `.bak`, `.old`, `~`, `.DS_Store`, `Thumbs.db` o carpetas `tmp`. El script del catálogo se carga también en páginas que no tienen sus contenedores, por ejemplo `servicios/index.html:36` y `contacto/index.html:86`. Es una carga prescindible en esas páginas que requiere verificar todos sus consumidores antes de modificarla.

## 2. Errores y comprobaciones

### CRÍTICO

- **Credenciales y exposición.** No se detectaron coincidencias de claves privadas o tokens de patrones conocidos en los archivos de texto revisados. La prueba no descarta secretos con formatos distintos, en binarios o en el historial. No se confirmó exposición pública.

### ALTO

- **Seis fichas huérfanas responden HTTP 200 con «Proyecto no encontrado».** Cada plantilla establece un identificador en la línea 48. El renderizador activo busca `slug` en la URL y en el catálogo en `js/projects.js:1241–1247`. Ninguno de los seis identificadores pertenece al catálogo actual. Añadir solo el parámetro no resuelve el fallo. Ver sección 3.
- **Textos legales en borrador.** `aviso-legal/index.html:52`, `privacidad/index.html:62` y `cookies/index.html:52` los identifican como pendientes de aprobación. Los datos concretos están detallados en la sección 4.
- **Perfiles de navegador dentro del árbol.** `artifacts/chrome-review*/Default/` almacena caché, bases de navegador y ajustes de perfiles. Es material interno y queda en REVISAR. No se verificó si es accesible fuera del repositorio local.
- **Estado de formularios comprobado, fuera de las correcciones.** `contacto/index.html:53,74–76` y `trabaja-con-nosotros/index.html:70,94–95` muestran botones deshabilitados y ningún destino de envío. Es el comportamiento existente.

### MEDIO

- **Metadatos.** Los 16 documentos tienen `title`, pero carecen de `meta description` en la cabecera. El título `Proyecto — ANCODARQ` se repite en las seis fichas antiguas (línea 6) y en `proyectos/detalle.html:8`, que tampoco lo individualiza para los 47 proyectos renderizados por `js/projects.js:1236`. La tabla del anexo señala la línea de título para cada cabecera.
- **Tailwind Play CDN.** `index.html:18` y la línea 10–18 del resto de HTML cargan un script externo sin versión fijada ni verificación de integridad. Se cargó en Chrome. La versión 3.4.17 consta como observada en una revisión anterior en `cookies/index.html:59`, no como versión fijada hoy. El proveedor describe Play CDN como herramienta de desarrollo. Su página de seguridad no mostraba avisos publicados al consultarla. Eso no equivale a un escaneo completo de dependencias. Cualquier sustitución requiere acuerdo y comparación visual. [Tailwind Play CDN](https://v3.tailwindcss.com/docs/installation/play-cdn) · [Avisos del proveedor](https://github.com/tailwindlabs/tailwindcss/security/advisories)
- **Contraste de texto.** Los metadatos y descripciones de fichas en `js/projects.js:1311,1317` usan gris `#a3a3a3`. Se confirmó el color en Chrome. Sobre blanco equivale aproximadamente a 2,5:1, por debajo de 4,5:1 para texto normal. Cualquier cambio de color queda pendiente de aprobación.
- **Imágenes pesadas.** El anexo lista 61 imágenes superiores a 2 MiB. La mayor referenciada es `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_9018-2.JPG`, de 7,25 MiB. Si se aprueba la optimización, generar derivados WebP/AVIF y medidas adaptadas, conservando originales.
- **Manifiestos de imágenes.** `js/projects.js:1019–1029` lee los `imagenes.json` de Recoletos y Gourmet La Pedrera. En un visor estático sin compilación, las plantillas Liquid no entregan JSON parseable y se usan las imágenes explícitas. Las dos fichas sí disponen de referencias directas.

### BAJO

- **Encabezados.** Inicio carece de `h1` y usa `h2` en `index.html:65,115,136`. Contacto salta de `h1` a `h4` en `contacto/index.html:23,34`.
- **404 de favicon.** Chrome pidió `/favicon.ico` y recibió 404. No hay una etiqueta de favicon en las cabeceras ni un favicon público localizado. Los archivos de favicon dentro de perfiles locales se conservan.
- **Enlaces internos, HTML/CSS/JS y responsive.** No se detectaron referencias literales internas rotas, anclas sin destino, IDs duplicados, imágenes sin `alt` ni desbordamiento horizontal en las 40 comprobaciones de rutas y tamaños. No se observaron errores de ejecución de JS y sus scripts e inline pasaron el parseo. La revisión de HTML y CSS fue estructural y con navegador. No se ejecutó un validador formal de conformidad. La presencia del atributo `alt` no valida por sí sola su calidad.
- **Contenido mixto y enlaces externos.** No se detectaron recursos HTTP externos activos en el código público. Se localizaron el sitio de la AEPD (`privacidad/index.html:88`) y LinkedIn (`js/main.js:210`, `aviso-legal/index.html:95`). La comprobación externa de ambos perfiles de Instagram (`aviso-legal/index.html:96–97`) y la URL CSS de Google Fonts (`aviso-legal/index.html:9)) no concluyó. No hay un 404 confirmado para estos destinos. [AEPD](https://www.aepd.es/) · [LinkedIn de ANCODARQ](https://www.linkedin.com/company/ancodarq-sl)

## 3. Las seis fichas antiguas

La búsqueda revisó HTML, CSS, JS y rutas generadas por el catálogo. En los seis casos se detectaron menciones en informes históricos, sin enlaces entrantes desde la navegación ni el contenido activo del repositorio. No se puede verificar qué enlaces externos, marcadores o índices aún apuntan a ellas. Las líneas de evidencias citadas abajo son registros de auditoría, no enlaces entrantes activos.

| Ruta directa y archivo | Dónde aparece | Propuesta individual |
| --- | --- | --- |
| `/proyectos/espacio-retail-serrano/` · `proyectos/espacio-retail-serrano/index.html:48` | `artifacts/global-review/REVISION-GLOBAL.md:46`, `artifacts/global-review/global.json:1348`, `projects.js:41` | Confirmar si «Espacio Comercial Serrano» corresponde a un local comercial del catálogo. Hasta identificarlo, conservar la ruta y proponer una página de proyecto no disponible con acceso a Proyectos. |
| `/proyectos/reforma-duplex-chamberi/` · `proyectos/reforma-duplex-chamberi/index.html:48` | `artifacts/global-review/REVISION-GLOBAL.md:47`, `artifacts/global-review/global.json:2015`, `projects.js:65` | Confirmar la ficha del ático dúplex. La reforma de edificio de Chamberí es un registro distinto por su título y no se ha demostrado correspondencia. Si el dúplex se mantiene retirado, mostrar el estado y un enlace a Proyectos. |
| `/proyectos/rehabilitacion-edificio-claudio-coello/` · `proyectos/rehabilitacion-edificio-claudio-coello/index.html:48` | `artifacts/global-review/REVISION-GLOBAL.md:48`, `artifacts/global-review/global.json:2224`, `projects.js:17` | Pedir confirmación del proyecto residencial y sus materiales antes de recuperar la ficha. Mantener separada la carpeta de restaurante de Claudio Coello. Si se confirma la retirada, ofrecer el índice de Proyectos desde esta URL. |
| `/proyectos/sede-corporativa-castellana/` · `proyectos/sede-corporativa-castellana/index.html:48` | `artifacts/global-review/REVISION-GLOBAL.md:49`, `artifacts/global-review/global.json:2433`, `projects.js:29` | Verificar la identidad de la sede corporativa. Castellana 42 documenta trabajos de fachada y no hay evidencia para usarla como sustituto. Si se confirma la retirada, ofrecer el índice de Proyectos. |
| `/proyectos/vivienda-somontes/` · `proyectos/vivienda-somontes/index.html:48` | `artifacts/global-review/REVISION-GLOBAL.md:50`, `artifacts/global-review/global.json:2642`, `projects.js:53` | Confirmar si Somontes debe recuperarse con datos y fotos aprobados. Si no se incorpora, mostrar el estado de la ficha con acceso a Proyectos. |
| `/proyectos/vivienda-unifamiliar-la-moraleja/` · `proyectos/vivienda-unifamiliar-la-moraleja/index.html:48` | `artifacts/global-review/REVISION-GLOBAL.md:51`, `artifacts/global-review/global.json:2851`, `projects.js:4` | Existe material en `assets/proyectos/10_URB. LA MORALEJA/`. Confirmar primero su correspondencia con esta vivienda y distinguirla de Soto de la Moraleja. Recuperar solo con esa validación. |

Las seis figuran también en `artifacts/typography-navigation/README.md:42–47` y `artifacts/responsive/README.md:33`, además de los registros de pruebas correspondientes. Ninguna propuesta está aplicada.

## 4. Datos legales pendientes de validación

La tabla recoge lo que cada documento deja pendiente. Los textos se conservan tal como están.

| Archivo | Línea | Dato, decisión o revisión pendiente |
| --- | --- | --- |
| `aviso-legal/index.html` | 52, 55–58 | Aprobación del borrador, NIF, inscripción registral y domicilio social completo. Confirmar el detalle de la dirección y si coincide con el domicilio social. |
| `aviso-legal/index.html` | 61–62 | Dominio definitivo que figura como marcador en el texto y autorizaciones administrativas o datos profesionales, si proceden. |
| `aviso-legal/index.html` | 66, 68, 74 | Condiciones de uso, titularidad y licencias de fotos, marcas y contenidos. Validar legislación aplicable y resolución de controversias. |
| `privacidad/index.html` | 62, 65–66, 68 | Aprobación, NIF y domicilio, detalle de la dirección, y procedencia y contacto del delegado de protección de datos. |
| `privacidad/index.html` | 73–74 | Bases jurídicas por finalidad para consultas o actuación precontractual. Plazos, inicio del cómputo, bloqueo y eliminación. |
| `privacidad/index.html` | 78–79 | Base jurídica de selección, posible uso del CV para futuras vacantes, plazos, accesos y eliminación. |
| `privacidad/index.html` | 81, 83 | Redacción de las casillas, información resumida y obligatoriedad de campos. Proveedores y receptores, almacenamiento, comunicaciones, accesos y acuerdos. |
| `privacidad/index.html` | 86, 88, 90–91 | Finalidades, bases, proveedores y posibles transferencias. Registros técnicos y conservación. Procedimiento interno de derechos, procesos externos de selección y aprobación final. |
| `cookies/index.html` | 52, 54 | Aprobación, NIF y domicilio social. |
| `cookies/index.html` | 63, 66, 68, 70 | Identificación de proveedores, condiciones y posibles transferencias. Servicios y receptores pendientes, inventario de tecnologías y revisión de controles si se añaden herramientas que requieran consentimiento. Aprobación del texto final. |

## Anexos de inventario

### Cabeceras sin descripción

| HTML | Línea del título | Título |
| --- | ---: | --- |
| `aviso-legal/index.html` | 6 | Aviso legal — ANCODARQ |
| `contacto/index.html` | 6 | Contacto — ANCODARQ |
| `cookies/index.html` | 6 | Política de cookies — ANCODARQ |
| `index.html` | 8 | ANCODARQ — Arquitectura y Construcción |
| `nosotros/index.html` | 8 | Nosotros — ANCODARQ |
| `privacidad/index.html` | 8 | Política de privacidad — ANCODARQ |
| `proyectos/detalle.html` | 8 | Proyecto — ANCODARQ |
| `proyectos/espacio-retail-serrano/index.html` | 6 | Proyecto — ANCODARQ |
| `proyectos/index.html` | 6 | Proyectos — ANCODARQ |
| `proyectos/reforma-duplex-chamberi/index.html` | 6 | Proyecto — ANCODARQ |
| `proyectos/rehabilitacion-edificio-claudio-coello/index.html` | 6 | Proyecto — ANCODARQ |
| `proyectos/sede-corporativa-castellana/index.html` | 6 | Proyecto — ANCODARQ |
| `proyectos/vivienda-somontes/index.html` | 6 | Proyecto — ANCODARQ |
| `proyectos/vivienda-unifamiliar-la-moraleja/index.html` | 6 | Proyecto — ANCODARQ |
| `servicios/index.html` | 6 | Servicios — ANCODARQ |
| `trabaja-con-nosotros/index.html` | 6 | Trabaja con nosotros — ANCODARQ |

### Duplicados por SHA-256, todos REVISAR

- `assets/home/Portada/00_08.webp` = `assets/proyectos/24_RESTAURANTE VINITUS GRAN VÍA/25_02.webp`
- `assets/home/Portada/00_14.webp` = `assets/proyectos/12_VIVIENDA UNIFAMILIAR LOS ÁLAMOS DE BULARAS/02_03.webp`
- `assets/home/Portada/00_15.webp` = `assets/proyectos/30_TEATRO LA LATINA/20_00PORTADA.webp`
- `assets/home/Portada/00_16.jpg` = `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2176.jpg`
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_00PORTADA.jpg` = `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2193.jpg`
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_08.jpg` = `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2151.jpg`
- `assets/proyectos/40_REFORMA PISO RECOLETOS/DSC_2550.jpg` = `assets/proyectos/43_REFORMA PISO RECOLETOS/43_PORTADA.jpg`
- `assets/proyectos/40_REFORMA PISO RECOLETOS/DSC_2571.jpg` = `assets/proyectos/43_REFORMA PISO RECOLETOS/43_02.jpg`
- `assets/proyectos/40_REFORMA PISO RECOLETOS/DSC_2579.jpg` = `assets/proyectos/43_REFORMA PISO RECOLETOS/43_03.jpg`
- `assets/proyectos/40_REFORMA PISO RECOLETOS/DSC_2597.jpg` = `assets/proyectos/43_REFORMA PISO RECOLETOS/43_04.jpg`
- `assets/proyectos/43_REFORMA EDIFICIO CHAMARTÍN/.gitkeep` = `assets/proyectos/46_RESTAURANTE ANXOITA CLAUDIO COELLO/.gitkeep` = `assets/proyectos/47_REHABILITACIÓN EDIFICIO DE VIVIENDAS CHAMBERÍ/.gitkeep`

### Archivos de imagen sin referencia activa localizada, todos REVISAR

- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_00PORTADA.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_01.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_02.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_03.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_04.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_05.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_06.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_07.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_08.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_09.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_10.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_11.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_12.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2146.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2151.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2160.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2166.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2176.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2178.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2188.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2193.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2201.jpg` — Original o toma alternativa sin referencia.
- `assets/proyectos/10_URB. LA MORALEJA/10_00 PORTADA.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_01.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_02.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_03.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_04.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_05.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_06.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_07.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/10_URB. LA MORALEJA/10_08.webp` — Material de una obra sin ficha activa.
- `assets/proyectos/21_OFICINAS OESÍA SEVILLA/33_01.webp` — Variante WebP sin referencia; la ficha usa los JPG.
- `assets/proyectos/21_OFICINAS OESÍA SEVILLA/33_02.webp` — Variante WebP sin referencia; la ficha usa los JPG.
- `assets/proyectos/21_OFICINAS OESÍA SEVILLA/33_03.webp` — Variante WebP sin referencia; la ficha usa los JPG.
- `assets/proyectos/21_OFICINAS OESÍA SEVILLA/33_04.webp` — Variante WebP sin referencia; la ficha usa los JPG.
- `assets/proyectos/21_OFICINAS OESÍA SEVILLA/33_05.webp` — Variante WebP sin referencia; la ficha usa los JPG.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_00PORTADA.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_01.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_02.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_03.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_04.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_05.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_06.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_07.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_08.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_09.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_20.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/31_REFORMA VIVIENDA EL VISO/00_01.webp` — Variante original sin referencia; se sirven las versiones corregidas.
- `assets/proyectos/31_REFORMA VIVIENDA EL VISO/00_PORTADA.webp` — Variante original sin referencia; se sirven las versiones corregidas.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_00PORTADA.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_01.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_02.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_03.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_04.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_05.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_06.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_07.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_08.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_09.JPG` — Original JPG sin referencia; se sirve WebP.
- `assets/proyectos/35_REFORMA VIVIENDA CHAMARTÍN/WhatsApp Image 2026-10-13 at 18.12.51 (1).webp` — Toma de WhatsApp sin referencia.
- `assets/proyectos/35_REFORMA VIVIENDA CHAMARTÍN/WhatsApp Image 2026-10-13 at 18.12.51 (3).webp` — Toma de WhatsApp sin referencia.
- `assets/proyectos/35_REFORMA VIVIENDA CHAMARTÍN/WhatsApp Image 2026-10-13 at 18.12.51.webp` — Toma de WhatsApp sin referencia.
- `assets/proyectos/43_REFORMA PISO RECOLETOS/43_02.jpg` — Duplicado exacto de una imagen referenciada en la carpeta 40.
- `assets/proyectos/43_REFORMA PISO RECOLETOS/43_03.jpg` — Duplicado exacto de una imagen referenciada en la carpeta 40.
- `assets/proyectos/43_REFORMA PISO RECOLETOS/43_04.jpg` — Duplicado exacto de una imagen referenciada en la carpeta 40.
- `assets/proyectos/43_REFORMA PISO RECOLETOS/43_PORTADA.jpg` — Duplicado exacto de una imagen referenciada en la carpeta 40.

### Imágenes por encima de 2 MiB

| Archivo | MiB | Referencia activa localizada |
| --- | ---: | --- |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_9018-2.JPG` | 7,25 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8913.JPG` | 5,58 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8950.JPG` | 4,83 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_9027.JPG` | 4,71 | Sí |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_03.JPG` | 4,30 | No |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_20.JPG` | 4,30 | No |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_01.JPG` | 4,30 | No |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_00PORTADA.JPG` | 4,27 | No |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8909-2.JPG` | 4,15 | Sí |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_04.JPG` | 3,95 | No |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_08.JPG` | 3,90 | No |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8925-2.JPG` | 3,80 | Sí |
| `assets/proyectos/43_REFORMA PISO RECOLETOS/43_08.jpg` | 3,77 | Sí |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_09.JPG` | 3,76 | No |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_9009-2.JPG` | 3,73 | Sí |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_07.JPG` | 3,71 | No |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 2 - ANCODARQ.jpg` | 3,61 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8974-2.JPG` | 3,56 | Sí |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_02.JPG` | 3,56 | No |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_06.JPG` | 3,48 | No |
| `assets/proyectos/22_REHABILITACIÓN TEATRO NUEVO APOLO/19_05.JPG` | 3,47 | No |
| `assets/proyectos/29_OFICINAS OESÍA ZARAGOZA/45_0 PORTADA.png` | 3,45 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_10.jpg` | 3,32 | No |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 1 - ANCODARQ.jpg` | 3,31 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8967-2.JPG` | 3,28 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_01.jpg` | 3,26 | No |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 7 - ANCODARQ.JPG` | 3,22 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_09.jpg` | 3,17 | No |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8946.JPG` | 3,17 | Sí |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 4 - ANCODARQ.jpg` | 3,15 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8929-2.JPG` | 3,05 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8978-2.JPG` | 2,95 | Sí |
| `assets/proyectos/MUSEO CERRALBO/MUSEO CERRALBO - 1 - ANCODARQ.JPG` | 2,95 | Sí |
| `assets/proyectos/REHABILITACIÓN RESIDENCIA CHAMARTÍN/DSC_8977-2.JPG` | 2,94 | Sí |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 5 - ANCODARQ.JPG` | 2,88 | Sí |
| `assets/proyectos/MUSEO CERRALBO/MUSEO CERRALBO - 4 - ANCODARQ.JPG` | 2,86 | Sí |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 6 - ANCODARQ.JPG` | 2,80 | Sí |
| `assets/home/Portada/00_01.png` | 2,79 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_12.jpg` | 2,65 | No |
| `assets/proyectos/43_REFORMA PISO RECOLETOS/43_07.jpg` | 2,64 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2160.jpg` | 2,58 | No |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2188.jpg` | 2,55 | No |
| `assets/home/Portada/00_17.png` | 2,54 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_02.jpg` | 2,51 | No |
| `assets/proyectos/40_REFORMA PISO RECOLETOS/DSC_2579.jpg` | 2,51 | Sí |
| `assets/proyectos/43_REFORMA PISO RECOLETOS/43_03.jpg` | 2,51 | No |
| `assets/proyectos/43_REFORMA EDIFICIO CHAMARTÍN/53_PORTADA.png` | 2,51 | Sí |
| `assets/proyectos/MUSEO AMÉRICA/MUSEO AMÉRICA - 3 - ANCODARQ.JPG` | 2,50 | Sí |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_05.jpg` | 2,50 | No |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2146.jpg` | 2,38 | No |
| `assets/proyectos/32_CENTRO MÉDICO CLINIQUE LA PRAIRIE/22_05.JPG` | 2,33 | No |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/23_00PORTADA.jpg` | 2,30 | No |
| `assets/proyectos/07_RESTAURANTE - ESPECTÁCULO GRACE/DSC_2193.jpg` | 2,30 | No |
| `assets/proyectos/37_PRÍNCIPE DE VERGARA/60_03.jpg` | 2,28 | Sí |
| `assets/proyectos/43_REFORMA PISO RECOLETOS/43_06.jpg` | 2,26 | Sí |
| `assets/proyectos/31_REFORMA VIVIENDA EL VISO/interior-papel-botanico.png` | 2,22 | Sí |
| `assets/proyectos/MUSEO CERRALBO/MUSEO CERRALBO - 5 - ANCODARQ.JPG` | 2,21 | Sí |
| `assets/home/Portada/00_19.png` | 2,15 | Sí |
| `assets/proyectos/35_REFORMA VIVIENDA CHAMARTÍN/sala-ventanal-madera.png` | 2,10 | Sí |
| `assets/proyectos/35_REFORMA VIVIENDA CHAMARTÍN/interior-madera-suelo-espiga.png` | 2,08 | Sí |
| `assets/proyectos/31_REFORMA VIVIENDA EL VISO/00_01_corregida.png` | 2,02 | Sí |

## Próxima decisión

Pendiente de aprobar los registros adicionales por número y acordar qué propuestas de las seis fichas antiguas o qué hallazgos de gravedad alta se corrigen. Los textos legales requieren valores validados. Tras esa aprobación se documentarán las intervenciones en `RESUMEN_CAMBIOS.md` y se repetirá la comprobación de enlaces internos.
