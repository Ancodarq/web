# ANCODARQ — versión estática multipágina

Esta versión parte del HTML generado anteriormente y lo reorganiza como una web estática con rutas reales por carpeta.

## Antes de publicar

Copia los archivos de logo reales dentro de `assets/logos/` con estos nombres:

- ancodarq-square.png
- escuadra-square.png
- ancodarq-horizontal.png
- escuadra-horizontal.png
- iso-certifications.png

## Fotos

Sustituye las URLs de Unsplash en:
- `js/main.js` para Hero y Servicios.
- `js/projects.js` para proyectos y galerías.

## Formularios

Los formularios están intencionadamente SIN backend. No muestran un falso mensaje de éxito.
El equipo informático deberá conectarlos al sistema de correo/servidor correspondiente.

## Rutas

- /
- /nosotros/
- /servicios/
- /proyectos/
- /contacto/
- /trabaja-con-nosotros/
- /privacidad/
- /aviso-legal/
- /cookies/
- /proyectos/<slug>/

## Nota para GitHub Pages

Si el repo se publica como `usuario.github.io/nombre-repo/`, las rutas absolutas no se usan; los enlaces son relativos.
Para producción en `ancodarq.com`, esta estructura funciona bien en hosting estático convencional.
