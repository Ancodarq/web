# Tarea 01 — preparación de formularios

Cambios de aplicación limitados a `contacto/index.html` y `trabaja-con-nosotros/index.html`. No se han modificado CSS, JavaScript compartido, navegación, otras páginas ni servicios externos.

## Preparación realizada

- `id`, `name` y etiquetas asociadas en todos los campos de datos. Las nuevas etiquetas son accesibles y visualmente ocultas; se conservan placeholders y clases existentes.
- Campos obligatorios originales conservados. Email nativo y límites: nombres 100 caracteres, email 254, teléfono 40, empresa/perfil 160, asunto 200 y mensaje/carta 5000.
- Formularios con POST; candidaturas con `multipart/form-data`. Eliminados `action="#"` y el bloqueo inline de envío anterior. No hay una URL inventada ni configurada.
- Botones de envío nativamente deshabilitados. Se conservan los avisos de activación pendiente y el correo alternativo de Contacto, que ya era visible y enlazado.
- Aceptación obligatoria conservada y texto de privacidad enlazado a `../privacidad/`.
- CV seleccionable, con `accept` PDF y validación local de extensión, MIME si está disponible y tamaño máximo de **5.000.000 bytes**. Los errores usan la validación nativa, sin añadir bloques que alteren la composición. Seleccionar un archivo válido o restablecer el formulario elimina el error anterior.

## Integración pendiente para informática

Los comentarios técnicos de cada HTML contienen el contrato de campos y el procedimiento. Antes de habilitar los botones:

1. Configurar `action` con el endpoint HTTPS real y probarlo. No basta con quitar `disabled`: sin `action`, el navegador enviaría a la propia página. La desactivación del botón es un estado de interfaz, no una protección de seguridad del servidor.
2. Conservar POST y, en candidaturas, `multipart/form-data`. Procesar los nombres documentados en el HTML; una casilla marcada aporta `accepted`.
3. Repetir en servidor obligatoriedad, formato, longitudes y aceptación. Para CV, comprobar tamaño y contenido/tipo real del PDF, sin confiar en extensión, `accept` o MIME aportados por el cliente. La validación del navegador es orientativa y se puede eludir.
4. Implementar protección antispam, límites de frecuencia y cuerpo de petición y comprobaciones CSRF/origen adecuadas a la arquitectura. No almacenar claves en código cliente.
5. Almacenar CV fuera de la zona pública, con nombres internos, análisis de archivos, acceso restringido y política de conservación y borrado de datos personales.
6. Confirmar éxito únicamente tras la aceptación real del servidor. Usar respuestas/redirects controlados; ante errores, mostrar información accesible y permitir corrección o reintento. Si se añade envío asíncrono, diferenciar fallo HTTP, error de validación y fallo de red. El archivo puede necesitar seleccionarse otra vez tras una navegación.
7. Solo tras esas comprobaciones, retirar `disabled` y actualizar el aviso temporal. No hay backend, envío ni confirmación simulada en esta tarea.

## Comprobación en navegador

Chrome automatizado, en 375×812, 390×844, 768×1024, 1024×768 y 1440×900, para las dos páginas.

- Diez comparaciones antes/después: mismas posiciones, dimensiones y estilos calculados de todos los controles.
- Tres pares de capturas idénticos píxel a píxel; los otros siete presentan 40 píxeles diferentes en el rasterizado del texto de privacidad enlazado, sin cambios de geometría o estilos de los controles. No se afirma identidad binaria de todas las capturas.
- Email mal formado y formularios vacíos rechazados por las restricciones nativas; los once campos con `maxlength` respetan el límite con inserción de texto de navegador.
- Comprobado CV PDF de 5.000.000 bytes aceptado por la validación cliente, archivo de 5.000.001 rechazado, extensión distinta rechazada y MIME incompatible rechazado. MIME vacío con extensión PDF se permite, quedando la comprobación real para el servidor. Son archivos sintéticos de prueba, no PDFs analizados como seguros.
- Selección de CV operativa; validación recuperada al seleccionar otro archivo válido.
- Botones deshabilitados y **cero peticiones POST** al pulsarlos o usar Enter con los campos completados.
- Cero errores JavaScript durante las pruebas. Conservados todos los campos y atributos `required` originales.

`forms.json` contiene los resultados. Los PNG `*-before.png` y `*-after.png` permiten revisar las comparaciones. No se ha enviado ningún dato ni currículum. No se han instalado dependencias.
