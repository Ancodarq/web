# Resumen de cambios y propuestas de revisión

## Cambios aplicados

| Commit local | Cambio |
| --- | --- |
| `6624956` | Eliminación de los siete primeros registros aprobados y alta de `*.log` en `.gitignore`. |
| `5a19925` | Eliminación de los 16 registros adicionales de `artifacts/form-preparation/`, `artifacts/global-review/`, `artifacts/legal-review/` y `artifacts/responsive/`. Se conservaron los demás archivos de esas carpetas. |
| `8805644`, `95c01f9` | Retirada de los datos de los cuatro perfiles locales de Chrome y exclusión de sus rutas. Se restauraron 238 imágenes internas en sus rutas originales para respetar su conservación. Tres carpetas mantienen únicamente esos recursos. |
| `19c7759` | Eliminación de `main.js`, `projects.js` y `styles.css` de la raíz. La búsqueda en HTML, JS y CSS, incluido el HTML archivado, encontró referencias a `js/main.js`, `js/projects.js` y `css/styles.css`, sin referencias que resolvieran a las copias de raíz. |
| `de75b7b` | Títulos propios para las seis fichas antiguas y las 47 fichas dinámicas. Las dos fichas con el mismo nombre Salamanca se distinguen en la pestaña con «Ficha 1» y «Ficha 2». |
| `87a159c` | El encabezado de Nosotros en Inicio pasa de `h2` a `h1`, con sus selectores de estilo equivalentes. «Trabaja con nosotros» en Contacto pasa de `h4` a `h2`, con las mismas clases. |

Se resolvieron 235 referencias internas en los 16 HTML del sitio. Se ejecutó el renderizado de las 47 fichas activas con títulos únicos y se verificaron los siete filtros, con 47 proyectos únicos en TODOS.

## Vista previa de las seis fichas antiguas

Propuesta de página con cabecera, pie, márgenes y tipografía actuales. Dentro del contenedor, aparece el rótulo PROYECTOS, el encabezado «Este proyecto ya no está disponible» y debajo el enlace «← VOLVER A PROYECTOS». Cada ruta conserva su propio título de pestaña. La vista previa se generó en el navegador sin cambiar el cuerpo de las seis páginas.

## Meta descriptions propuestas

| Página | Descripción propuesta |
| --- | --- |
| Inicio | Construcción, rehabilitación y reformas de ANCODARQ y ESCUADRA. Conoce nuestros servicios y proyectos. |
| Nosotros | Conoce la trayectoria, el equipo y las certificaciones de ANCODARQ y ESCUADRA en el sector de la construcción. |
| Servicios | Servicios de construcción residencial, comercial, de oficinas y de obra pública de ANCODARQ y ESCUADRA. |
| Proyectos | Explora el portfolio de ANCODARQ y consulta proyectos de obra nueva, reformas, locales comerciales, oficinas y obras en ejecución. |
| Ficha dinámica | Consulta los datos y la galería fotográfica de este proyecto del portfolio de ANCODARQ. |
| Contacto | Consulta los datos de contacto de ANCODARQ y ESCUADRA y encuentra el acceso a la sección de candidaturas. |
| Trabaja con nosotros | Consulta la sección de candidaturas profesionales de ANCODARQ y la información sobre el formulario de empleo. |
| Aviso legal | Información sobre la entidad responsable, la titularidad del sitio y las condiciones de uso de la web de ANCODARQ y ESCUADRA. |
| Privacidad | Información sobre privacidad, datos personales y derechos de las personas usuarias de la web de ANCODARQ. |
| Cookies | Información sobre cookies, almacenamiento en el navegador y servicios externos utilizados en la web de ANCODARQ. |
| Espacio Comercial Serrano | La ficha de Espacio Comercial Serrano ya no está disponible. Consulta el catálogo actual de proyectos de ANCODARQ. |
| Ático Dúplex Chamberí | La ficha de Ático Dúplex Chamberí ya no está disponible. Consulta el catálogo actual de proyectos de ANCODARQ. |
| Edificio Residencial Claudio Coello | La ficha de Edificio Residencial Claudio Coello ya no está disponible. Consulta el catálogo actual de proyectos de ANCODARQ. |
| Sede Corporativa Castellana | La ficha de Sede Corporativa Castellana ya no está disponible. Consulta el catálogo actual de proyectos de ANCODARQ. |
| Residencia Somontes | La ficha de Residencia Somontes ya no está disponible. Consulta el catálogo actual de proyectos de ANCODARQ. |
| Vivienda Unifamiliar La Moraleja | La ficha de Vivienda Unifamiliar La Moraleja ya no está disponible. Consulta el catálogo actual de proyectos de ANCODARQ. |

## Pendiente de revisión

- Aprobar la vista previa antes de sustituir el cuerpo de las seis fichas antiguas.
- Revisar y aprobar los 16 textos antes de añadir las etiquetas de descripción.
- Repetir la comprobación de enlaces internos y filtros tras aplicar esas dos intervenciones.

## Para el IT externo

- Tailwind Play CDN sin versión fijada.
- Formularios sin destino de envío.
- 404 de `/favicon.ico` en Chrome.
- Dos manifiestos de descubrimiento de imágenes contienen Liquid.
