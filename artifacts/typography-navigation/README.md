# Tipografía y navegación por secciones

Referencia: NOSOTROS de la HOME. Comprobación con Chrome instalado en modo headless, mediante su protocolo de depuración, sin instalar dependencias.

## Sistema compartido

- Etiquetas principales: Urbanist, 12 px, peso 400, interletrado 0,24 em, interlineado 1,5, color existente #737373 y alineación izquierda.
- Titulares: Urbanist 400, `clamp(26px, 2vw, 32px)`, interletrado −0,035 em. Interlineado 1,12 en escritorio y 1,05 en pantallas menores.
- Etiqueta a titular: 8 px en escritorio; 16 px en tablet y móvil.
- Titular a contenido: 20 px en escritorio; el intervalo responsive existente de 24–32 px en pantallas menores.
- Texto descriptivo: 14–16 px e interlineado 1,6 en escritorio; 16 px e interlineado 1,8 en tablet y móvil. Se conservan colores y anchos de lectura propios de cada bloque.
- Inicio de contenido interior: 16 px bajo la cabecera en escritorio; 24 px con la cabecera compacta. Se mantiene la retícula horizontal existente.

Variables centralizadas en `css/styles.css`: `--corporate-title-size`, `--heading-line-height`, `--label-title-gap`, `--section-heading-gap`, `--page-heading-offset`, `--copy-size`, `--copy-leading`, `--paragraph-gap`, `--secondary-title-size`. Se reutiliza `--site-header-height`.

Clases compartidas: `corporate-page`, `corporate-title`, `section-label`, `services-label`, `projects-label`, `project-detail-title`. Se ofrecen los estilos reutilizables `corporate-copy`, `corporate-secondary-title` y `corporate-link`; las clases existentes de texto y servicios comparten sus valores. `home-page` limita el scroll snapping a la portada.

## Desplazamiento

La HOME utiliza `scroll-snap-type: y proximity` desde 1101 px, con puntos de alineación en la imagen inicial y las tres secciones principales. Las etiquetas se sitúan 16 px por debajo de la cabecera fija. Se combinan `scroll-padding-top` y `scroll-margin-top` sin duplicar la compensación de cabecera.

No se capturan eventos de rueda ni se imponen alturas de pantalla o desplazamientos internos. En tablet, móvil y con `prefers-reduced-motion: reduce` no hay snapping. Las páginas interiores conservan desplazamiento libre.

## Excepciones conservadas

- PROYECTOS mantiene su H1 pequeño como etiqueta, sin añadir un titular grande.
- Las fichas conservan «VOLVER A PROYECTOS» por encima del H1. El enlace ocupa la misma posición inicial que el encabezado de las otras páginas.
- CERTIFICACIONES conserva un rótulo auxiliar pequeño; no pertenece al nivel de etiquetas principales.
- Metadatos, formularios, filtros, títulos sobre fotografías, navegación y textos legales mantienen su función y estilos específicos. Los colores existentes de los titulares se conservan.
- La geometría compacta de NOSOTROS conserva su ajuste a la altura de escritorio; sus estilos se han trasladado del HTML al CSS común.

## Archivos de implementación modificados

- `css/styles.css`
- `index.html`
- `nosotros/index.html`
- `servicios/index.html`
- `proyectos/index.html`
- `contacto/index.html`
- `trabaja-con-nosotros/index.html`
- `proyectos/detalle.html`
- `proyectos/espacio-retail-serrano/index.html`
- `proyectos/reforma-duplex-chamberi/index.html`
- `proyectos/rehabilitacion-edificio-claudio-coello/index.html`
- `proyectos/sede-corporativa-castellana/index.html`
- `proyectos/vivienda-somontes/index.html`
- `proyectos/vivienda-unifamiliar-la-moraleja/index.html`

En estas seis plantillas antiguas únicamente se cambian la clase de página y el estilo del enlace de regreso.

No se modifica JavaScript en esta tarea. Los cambios que ya existían en `js/main.js` son anteriores a esta revisión.

## Comprobación

35 vistas: siete páginas en 1920×1080, 1440×900, 1366×768, 768×1024 y 390×844. La ficha probada es Reforma vivienda Salamanca.

- Sin desbordamientos horizontales ni errores JavaScript detectados.
- Etiquetas principales con idénticos valores calculados en las cinco resoluciones.
- Separación inicial uniforme de 16/24 px en las páginas interiores.
- Los tres destinos de sección de la HOME se alinean a 16 px bajo la cabecera en escritorio, con tolerancia de redondeo inferior a 1 px.
- Comprobado desplazamiento nativo mediante evento de rueda automatizado y desactivación de snapping con movimiento reducido.
- Filtro OBRA NUEVA operativo; visor avanza a `02 / 10` y cierra con Escape.
- Botones de ambos formularios siguen deshabilitados; no se modifica su marcado interno ni funcionamiento.

Datos medidos: [typography.json](typography.json). Las quince capturas PNG de esta carpeta son de la ventana visible, no de página completa: HOME, NOSOTROS y SERVICIOS en los cinco tamaños. Ejemplos: [NOSOTROS 1366](nosotros-1366.png), [NOSOTROS móvil](nosotros-390.png), [SERVICIOS 1440](servicios-1440.png).
