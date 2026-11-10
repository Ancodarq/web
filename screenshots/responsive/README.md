# Capturas responsive — ANCODARQ | ESCUADRA

Capturas PNG reales generadas con Chrome automatizado el 10 de noviembre de 2026, mediante un servidor HTTP local. No se ha modificado el diseño durante esta comprobación.

Las cinco resoluciones corresponden al tamaño de la ventana. Las páginas se capturaron completas mediante Chrome DevTools Protocol (`captureBeyondViewport: true` y un recorte igual a toda la altura del documento), equivalente a `fullPage: true`. Por eso los PNG tienen más altura que la ventana. El visor abierto ocupa la ventana completa y su PNG conserva esa altura.

Antes de capturar se recorrió cada página para activar la carga diferida y se esperó a las fuentes y a la decodificación de imágenes. Los dispositivos táctiles se simularon en Chrome; no son pruebas de Safari/iOS ni de dispositivos físicos.

| Página | 375 × 812 | 390 × 844 | 768 × 1024 | 1024 × 768 | 1440 × 900 |
| --- | --- | --- | --- | --- | --- |
| inicio | [375 × 5244](inicio-mobile-375.png) | [390 × 5328](inicio-mobile-390.png) | [768 × 4045](inicio-tablet-768.png) | [1024 × 2923](inicio-tablet-1024.png) | [1440 × 3484](inicio-desktop-1440.png) |
| nosotros | [375 × 1991](nosotros-mobile-375.png) | [390 × 2003](nosotros-mobile-390.png) | [768 × 1607](nosotros-tablet-768.png) | [1024 × 1472](nosotros-tablet-1024.png) | [1440 × 1426](nosotros-desktop-1440.png) |
| servicios | [375 × 2258](servicios-mobile-375.png) | [390 × 2291](servicios-mobile-390.png) | [768 × 1573](servicios-tablet-768.png) | [1024 × 1039](servicios-tablet-1024.png) | [1440 × 1188](servicios-desktop-1440.png) |
| proyectos | [375 × 7135](proyectos-mobile-375.png) | [390 × 7407](proyectos-mobile-390.png) | [768 × 3871](proyectos-tablet-768.png) | [1024 × 2529](proyectos-tablet-1024.png) | [1440 × 3351](proyectos-desktop-1440.png) |
| contacto | [375 × 1974](contacto-mobile-375.png) | [390 × 1974](contacto-mobile-390.png) | [768 × 1484](contacto-tablet-768.png) | [1024 × 1077](contacto-tablet-1024.png) | [1440 × 1026](contacto-desktop-1440.png) |
| ficha-salamanca | [375 × 3658](ficha-salamanca-mobile-375.png) | [390 × 3771](ficha-salamanca-mobile-390.png) | [768 × 2115](ficha-salamanca-tablet-768.png) | [1024 × 2577](ficha-salamanca-tablet-1024.png) | [1440 × 2151](ficha-salamanca-desktop-1440.png) |
| visor | [375 × 812](visor-mobile-375.png) | [390 × 844](visor-mobile-390.png) | [768 × 1024](visor-tablet-768.png) | [1024 × 768](visor-tablet-1024.png) | [1440 × 900](visor-desktop-1440.png) |

## Resultado de la revisión

- 35 PNG generados y sus dimensiones comprobadas: 30 páginas completas y 5 visores.
- Ningún desbordamiento horizontal en las 30 páginas medidas. Todas las imágenes renderizadas terminaron de cargar. Sin errores JavaScript durante la captura.
- No se aprecian fotografías deformadas ni títulos cortados en las capturas inspeccionadas. El comprobador registra algunos titulares cuya tinta sobresale de su caja de línea; esa medición aislada no implica texto oculto y no se aprecia un corte en las imágenes revisadas.
- En tablet vertical (768 px), Servicios deja un espacio blanco amplio a la derecha de la tercera categoría al usar dos columnas.
- En Nosotros a 1024 px, la columna de texto es estrecha y más alta que la fotografía, dejando espacio blanco debajo de esta. A 1440 px ocurre lo contrario: queda espacio bajo el texto.
- En Contacto móvil sigue habiendo un margen vertical generoso antes del pie. Los textos secundarios de certificaciones y pie son pequeños y conviene valorarlos a escala real.
- Los filtros móviles se desplazan horizontalmente: el recorte de filtros fuera de la tira es intencional y no desborda la página.
- En el visor móvil, la imagen se ve completa y sin deformación; las miniaturas continúan mediante desplazamiento horizontal.

Estas observaciones quedan documentadas sin aplicar correcciones, según lo solicitado. `screenshots.json` conserva las medidas y la lista de imágenes comprobadas; `capture.log` contiene el registro de generación.

Para repetir la captura: ejecutar `node scripts/responsive-audit.cjs screenshots` desde la raíz, con Node 22 o superior y Chrome instalado en la ruta configurada en el script. No requiere paquetes adicionales.