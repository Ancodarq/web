# Tarea 02 — revisión y borradores legales

Fecha de trabajo y consulta: 10 de noviembre de 2026. Documentos locales sujetos a revisión jurídica; no publicados ni aprobados como definitivos.

## Información y propuesta presentadas antes de editar

Antes de sustituir los textos se presentaron en el chat los datos encontrados, las decisiones pendientes, la estructura propuesta y los problemas de la política anterior. Después, la empresa confirmó expresamente: «Sí, ANCODARQ, S.L. será la única responsable».

### Datos confirmados y procedencia

| Dato | Resultado | Fuente / límite |
| --- | --- | --- |
| Identidad pública nueva | ANCODARQ \| ESCUADRA | Encargo e identidad de la nueva web |
| Titular y responsable único | ANCODARQ, S.L. | Confirmación expresa de la empresa en esta conversación; no se deduce únicamente de la web anterior |
| Correo corporativo | ancodarq@ancodarq.com | Código actual y [web anterior](https://ancodarq.com/) |
| Dirección de contacto publicada | Calle Teide, 4, 28703 San Sebastián de los Reyes, Madrid | Código actual y web anterior; no se presume que sea el domicilio social inscrito |
| Detalle de la dirección anterior | Núcleo 2, planta baja, oficinas 1 y 2 | [Política anterior](https://ancodarq.com/privacidad); pendiente de confirmar su vigencia |
| Teléfonos publicados | 91 657 08 19 y 618 341 133 | Código actual y web anterior |
| Formularios | Contacto y candidaturas con CV PDF, hasta 5.000.000 bytes; botones deshabilitados y sin endpoint | HTML actual de ambos formularios |
| Tecnologías observadas | Google Fonts, Tailwind CDN y medios locales | Código y sesión nueva de Chrome de esta tarea |

No se localizaron NIF ni datos registrales en las dos páginas anteriores consultadas. No se han completado mediante suposiciones o fuentes empresariales no contrastadas. La confirmación del responsable no constituye una confirmación de esos datos ausentes.

### Información que debe facilitar o decidir la empresa

- NIF, datos registrales y domicilio social completo; comprobar el detalle de oficinas y si coincide con el contacto postal.
- Dominio y alojamiento definitivos, proveedores de correo y recepción, responsables de acceso al CV, subencargados o destinatarios y condiciones de los servicios.
- Base jurídica de cada finalidad: consultas generales, gestiones precontractuales, selección y, solo si se decide ofrecerla, conservación para futuras vacantes. La casilla informativa no decide automáticamente estas bases.
- Plazos o criterios de conservación de consultas, CV y registros técnicos; inicio del cómputo, eliminación y bloqueos aplicables. No se ha asignado ningún plazo ficticio.
- Existencia o necesidad de delegado de protección de datos y canal definitivo de atención de derechos.
- Transferencias internacionales, entidades proveedoras y garantías que resulten aplicables. No se afirma que el almacenamiento sea exclusivamente español o europeo.
- Condiciones de uso, titularidad/licencias de fotografías y otros contenidos, autorizaciones sectoriales si proceden y condiciones de resolución de controversias.
- Confirmar si habrá bolsa de candidatos, procesos de evaluación automatizada, analítica u otros servicios fuera del código actual. No se presume que existan.

### Propuesta aplicada como borrador

- **Aviso legal:** estado de borrador, titular confirmado, datos de identificación pendientes, contacto publicado, finalidad informativa, propuesta de condiciones de uso, revisión de derechos sobre contenidos, enlaces externos, referencias a privacidad/cookies y aprobación pendiente.
- **Privacidad:** responsable; estado inactivo de los formularios; información separada sobre consultas y CV; bases y conservación pendientes por finalidad; revisión de la casilla; proveedores y seguridad por definir; navegación externa; derechos; confirmación de procesos automatizados fuera de la web y revisión previa al lanzamiento.
- **Cookies:** alcance exclusivo de la nueva web; resultado técnico; fuentes, script CDN y archivos locales; separación entre cookies, almacenamiento y caché HTTP; conexiones externas; criterio provisional sobre banner y comprobaciones obligatorias del despliegue final.

## Cambios sobre los textos anteriores

Aviso legal y cookies dejaron de ser una sola línea de contenido pendiente y pasaron a borradores estructurados. En Privacidad se retiraron referencias genéricas a consentimiento como base única y a una conservación ligada indiscriminadamente a ese consentimiento. Se separaron contacto y selección, sin atribuirles bases o plazos aún no decididos.

También se sustituyó la exigencia general de copia del DNI, firma y documentación para ejercer derechos por una explicación que limita la identificación adicional a dudas razonables y mantiene la atención de derechos pendiente de procedimiento interno. No se reutilizaron ejemplos de comentarios públicos que no existen en la nueva web. [Referencia AEPD sobre identificación](https://www.aepd.es/preguntas-frecuentes/1-tus-derechos/3-identificacion-con-dni).

La política informa de que elegir un CV no lo envía. La validación del fichero en el navegador no sustituye la validación y almacenamiento privados del futuro servidor. No se han activado formularios ni modificado sus campos o casillas.

## Auditoría técnica de cookies y terceros

Auditoría local con perfil nuevo de Chrome, sin extensiones, recorriendo las 16 páginas HTML, incluida una ficha actual. No se han enviado formularios ni abierto los destinos de redes sociales. Se registraron peticiones de recursos y cabeceras de respuesta; se consultó el almacén de cookies del navegador y el almacenamiento accesible en las páginas.

| Tecnología / dominio | Uso observado | Almacenamiento o cookies observados | Pendiente |
| --- | --- | --- | --- |
| fonts.googleapis.com | Hoja de estilos de Google Fonts | Sin cookies observadas | Entidad, condiciones y evaluación de datos de conexión |
| fonts.gstatic.com | Archivos WOFF2 de Prompt y Urbanist | Sin cookies observadas | Igual; confirmar configuración final |
| cdn.tailwindcss.com/3.4.17 | Script que genera estilos | Sin cookies o claves locales observadas; búsqueda textual de tokens de almacenamiento sin coincidencias en la respuesta inspeccionada | Validar proveedor, condiciones y uso de CDN en producción |
| Medios propios | Fotos, logotipos y PDF desde el propio origen | No se atribuyen cookies | Cabeceras y política de caché del futuro servidor |
| Analítica, publicidad y embeds | No detectados en código ni navegación observada | No se inventaría ningún nombre o duración de cookie | Reauditar si se añaden herramientas |
| Enlaces a redes sociales | Enlaces ordinarios, sin iframe o widget integrado | No se abrieron los sitios de destino durante la prueba | Se aplicarán sus políticas cuando se visiten |

**Resultado:** cero cookies en el almacén del perfil, cero cabeceras `Set-Cookie` observadas, cero claves de localStorage y sessionStorage, cero bases IndexedDB, cero registros de service workers y cero entradas de Cache Storage. La ausencia de Cache Storage no significa ausencia de caché HTTP ordinaria. El comportamiento de HTTP cache no se clasifica automáticamente como una cookie de seguimiento.

Google Fonts y el CDN siguen recibiendo peticiones externas. No observar cookies no equivale a no comunicar dirección IP o datos técnicos. La recepción de IP al servir fuentes también está explicada por el proveedor: [Google Fonts, privacidad](https://fonts.googleblog.com/2022/11/your-privacy-and-google-fonts.html). No se ha supuesto una base jurídica o garantía internacional válida para esas conexiones.

No se ha añadido un banner ni se ha copiado la declaración genérica de cookies analíticas de la web anterior. La decisión se limita al código y la sesión auditados: deberá revisarse sobre el dominio definitivo, porque hosting, CDN, protecciones o un futuro receptor pueden incorporar otras tecnologías. La revisión de las conexiones a terceros es independiente de la necesidad de un banner. Como alternativa técnica futura puede valorarse servir fuentes y CSS localmente, sin implementarlo en esta tarea.

## Verificaciones y preservación visual

- Los 48 enlaces legales de los pies de las 16 páginas resolvieron correctamente por HTTP. El resultado se comprobó antes y después de preparar los borradores.
- Chrome no registró errores JavaScript en la revisión ordinaria.
- Las tres páginas contienen una indicación visible de borrador y marcadores de confirmación pendiente.
- Se conservaron exactamente los fragmentos HTML exteriores al contenido principal: cabeceras, pies, recursos, navegación y scripts. No se modificaron CSS ni JavaScript compartidos.
- Se conservaron las clases de títulos y contenedores, colores, fuentes y retícula. La cantidad de texto cambia la altura de las páginas. En Aviso legal y Cookies a 768 px aparece la barra vertical del navegador al crecer el contenido y reduce 15 px el ancho útil; no es un cambio de márgenes o CSS.
- Se compararon los estilos en 375, 390, 768, 1024 y 1440 px y se guardaron capturas completas a 390 y 1440 px. No se detectó desbordamiento horizontal.
- La declaración HTML de Privacidad ya contenía un carácter «&lt;» adicional al comenzar esta tarea. Se documenta como incidencia técnica preexistente y se conserva para no introducir un cambio ajeno al contenido que altere su modo de renderizado; requiere una corrección y comprobación separadas.

`technologies-before.json` conserva la auditoría inicial; `legal-final.json` contiene enlaces, tecnologías y comparaciones. `privacy-final.json` recoge la comprobación de Privacidad con el HTML exterior conservado. Los seis PNG `*-draft.png` muestran los borradores. Son pruebas locales, no una certificación del servidor de producción, de Safari/iOS o del cumplimiento jurídico final.

## Fuentes de referencia

- [Web corporativa anterior](https://ancodarq.com/) y [su política de privacidad](https://ancodarq.com/privacidad), para datos publicados y contraste, no como prueba de las tecnologías nuevas.
- [LSSI, artículos 10 y 22](https://www.boe.es/buscar/act.php?id=BOE-A-2002-13758), para las materias que deben verificarse en identificación e información sobre dispositivos de almacenamiento.
- [RGPD, texto oficial](https://www.boe.es/doue/2016/119/L00001-00088.pdf), especialmente información, derechos y principios aplicables. No se ha deducido de su texto qué base o conservación ha elegido la empresa.
- [AEPD: guía de cookies](https://www.aepd.es/guias/guia-cookies.pdf), versión disponible consultada, actualizada en mayo de 2024.
- [AEPD: protección de datos en relaciones laborales](https://www.aepd.es/guias/la-proteccion-de-datos-en-las-relaciones-laborales.pdf), como referencia para la revisión pendiente de selección y futuras vacantes.

## Archivos de la web modificados

1. `aviso-legal/index.html`.
2. `privacidad/index.html`.
3. `cookies/index.html`.

Además se ha guardado esta documentación y sus evidencias en `artifacts/legal-review/`. Los cambios de otras tareas que ya estaban en el workspace se mantienen. No se han publicado textos, realizado commits ni enviado cambios a GitHub.

Antes del lanzamiento: completar cada pendiente, validar con la empresa/asesoría los textos y los tratamientos, repetir la auditoría en el alojamiento real y aprobar una versión definitiva. La confirmación de ANCODARQ, S.L. como responsable no equivale a la aprobación de estas políticas.
