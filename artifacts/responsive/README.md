# Revisión responsive — ANCODARQ | ESCUADRA

Fecha: 10 de noviembre de 2026.

## Alcance y correcciones

- Cabecera: hamburguesa hasta 1100 px, logotipos adaptados a móvil, botón de 44 px, estado activo y atributos accesibles. Cierre al seleccionar enlace, pulsar Escape, tocar fuera o pasar a escritorio. Menú desplazable en pantallas de poca altura.
- Retícula: margen de 16 px en móviles menores de 360 px, 20 px en el resto de móviles, 32 px en tablet y el 3 % existente en escritorio.
- Inicio: portada con encuadre horizontal en móvil/tablet, evitando el recorte vertical extremo. Vista previa de proyectos en una, dos o tres columnas. Nombres visibles también sin hover en dispositivos táctiles.
- Nosotros: una columna hasta 1023 px en la página propia, lectura más cómoda en móvil y enlace de certificaciones con área táctil mayor. Composición de escritorio conservada.
- Servicios: dos columnas en tablet vertical y una en móvil, manteniendo tres en escritorio.
- Proyectos: filtros desplazables horizontalmente en móvil y separación entre navegación de la página y cabecera fija.
- Contacto: una columna para información/formulario en tablet vertical. Campos de al menos 16 px en pantallas pequeñas, controles táctiles más cómodos y nombres accesibles sin cambiar los textos visibles.
- Pie: espaciados más compactos en móvil/tablet, enlaces legales que pueden ocupar varias líneas y áreas táctiles mayores.
- Visor: imagen completa, mejor aprovechamiento en horizontal, controles de 44 px y áreas seguras, bloqueo del fondo con recuperación de la posición al cerrar.
- Movimiento reducido: carrusel detenido, desplazamiento sin animación y transiciones de galerías desactivadas.

## Verificación realizada

Chrome sin ventana, con métricas de pantalla y emulación táctil. Se recorrieron las 16 páginas HTML en diez tamaños: 320×640, 375×812, 390×844, 430×932, 600×800, 768×1024, 844×390, 1024×768, 1280×800 y 1440×900.

Resultado de las 160 vistas: ningún desbordamiento horizontal, ningún solapamiento entre navegación y logotipos y ningún error JavaScript. A 1440 px se conservaron las alturas medidas de cabecera y contenido de todas las páginas respecto a la auditoría inicial.

Se comprobaron 93 recursos/enlaces locales por HTTP, sin respuestas de error. Funcionan los seis filtros y su selección, la apertura/cierre del menú, la validación de campos obligatorios, las flechas, Escape, el contador y el deslizamiento táctil simulado del visor. La posición de desplazamiento se recuperó al cerrar el visor. Con movimiento reducido, el carrusel permaneció estable y las transiciones midieron 0 s.

Las 36 capturas PNG de esta carpeta cubren seis páginas representativas en cinco anchos y el visor en seis tamaños. `before.json`, `after.json` y `checks.json` contienen las mediciones e interacciones. El script reutilizable está en `scripts/responsive-audit.cjs`; se ejecuta desde la raíz con Node 22 o superior y utiliza el Chrome instalado, sin paquetes adicionales.

## Archivos modificados en esta revisión

- `css/styles.css`, `js/main.js`, `js/projects.js`.
- `index.html`, `nosotros/index.html`, `contacto/index.html`.
- `aviso-legal/index.html`, `cookies/index.html`, `trabaja-con-nosotros/index.html`.
- Las seis plantillas antiguas `proyectos/{espacio-retail-serrano,reforma-duplex-chamberi,rehabilitacion-edificio-claudio-coello,sede-corporativa-castellana,vivienda-somontes,vivienda-unifamiliar-la-moraleja}/index.html`: únicamente clases reutilizables de cabecera/pie.
- Nuevo script de auditoría y esta carpeta de evidencias.

## Pendientes y límites

- Las seis rutas antiguas citadas no encuentran un proyecto en los datos actuales y muestran «Proyecto no encontrado». Es anterior a esta revisión; necesitan confirmar su correspondencia con las fichas actuales, sin inventar datos ni redirecciones.
- Contacto y candidaturas validan los campos, pero siguen pendientes de conexión a un sistema de envío. No se ha enviado ningún formulario.
- Obras en ejecución permanece vacío por indicación del usuario.
- Las pruebas son de navegador emulado: falta comprobar dispositivos físicos y Safari/iOS, incluidos teclado virtual, zonas seguras reales y gestos nativos. No se han verificado los destinos externos de correo, teléfono o redes sociales ni el rendimiento en una red móvil real.

Cambios locales, sin publicación ni envío a GitHub.
