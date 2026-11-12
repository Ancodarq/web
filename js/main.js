// ======================================================
// ANCODARQ — ELEMENTOS GLOBALES
// Header + Footer compartidos por todas las páginas
// ======================================================

// Detecta automáticamente la raíz de la web.
// Funciona tanto en GitHub Pages /web/ como en ancodarq.com.
const SITE_ROOT = new URL("../", document.currentScript.src);

function siteUrl(path = "") {
  return new URL(path, SITE_ROOT).href;
}

function getActiveSection() {
  const path = window.location.pathname;

  if (path.includes("/nosotros")) return "nosotros";
  if (path.includes("/servicios")) return "servicios";
  if (path.includes("/proyectos")) return "proyectos";
  if (path.includes("/contacto")) return "contacto";

  return path === SITE_ROOT.pathname || path === new URL("index.html", SITE_ROOT).pathname ? "inicio" : null;
}


// ======================================================
// HEADER
// ======================================================

function renderHeader() {
  const container = document.getElementById("site-header");
  if (!container) return;

  const active = getActiveSection();

  const navClass = (section) =>
    `nav-link relative py-1 text-neutral-500 hover:text-black transition-colors ${
      active === section ? "is-active" : ""
    }`;

  container.innerHTML = `
    <header class="site-header w-full bg-white fixed top-0 left-0 z-50 border-b border-neutral-100">

      <div class="site-header-row site-container py-5 flex items-center justify-between">

        <!-- LOGOS -->
        <a href="${siteUrl("index.html")}" class="site-logos flex items-center gap-7">

          <img
            src="${siteUrl("assets/logos/ancodarq-square.png")}"
            alt="ANCODARQ"
            class="h-16 md:h-20 w-auto object-contain shrink-0"
          />

          <span class="w-px h-10 bg-neutral-200"></span>

          <img
            src="${siteUrl("assets/logos/escuadra-square.png")}"
            alt="ESCUADRA CONSTRUCCIONES"
            class="h-16 md:h-20 w-auto object-contain shrink-0"
          />

        </a>


        <!-- NAVEGACIÓN DESKTOP -->
        <nav class="site-nav hidden md:flex items-center gap-10 font-prompt font-light text-[12px] tracking-[0.2em] text-neutral-800">

          <a href="${siteUrl("index.html")}" class="${navClass("inicio")}">
            INICIO
          </a>

          <a href="${siteUrl("nosotros/")}" class="${navClass("nosotros")}">
            NOSOTROS
          </a>

          <a href="${siteUrl("servicios/")}" class="${navClass("servicios")}">
            SERVICIOS
          </a>

          <a href="${siteUrl("proyectos/")}" class="${navClass("proyectos")}">
            PROYECTOS
          </a>

          <a href="${siteUrl("contacto/")}" class="${navClass("contacto")}">
            CONTACTO
          </a>

        </nav>


        <!-- BOTÓN MÓVIL -->
        <button
          onclick="toggleMobileMenu()"
          class="site-menu-toggle md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 p-0"
          aria-label="Menú"
        >
          <span class="w-full h-px bg-black"></span>
          <span class="w-full h-px bg-black"></span>
          <span class="w-full h-px bg-black"></span>
        </button>

      </div>


      <!-- MENÚ MÓVIL -->
      <div
        id="mobile-menu"
        class="site-mobile-menu hidden md:hidden bg-white w-full border-b border-neutral-200 site-gutters py-8 flex flex-col gap-6 font-prompt font-light text-sm tracking-[0.2em]"
      >

        <a href="${siteUrl("index.html")}" class="text-neutral-500">INICIO</a>
        <a href="${siteUrl("nosotros/")}" class="text-neutral-500">NOSOTROS</a>
        <a href="${siteUrl("servicios/")}" class="text-neutral-500">SERVICIOS</a>
        <a href="${siteUrl("proyectos/")}" class="text-neutral-500">PROYECTOS</a>
        <a href="${siteUrl("contacto/")}" class="text-neutral-500">CONTACTO</a>

      </div>

    </header>
  `;
}


// ======================================================
// FOOTER
// ======================================================

function renderFooter() {
  const container = document.getElementById("site-footer");
  if (!container) return;

  container.innerHTML = `
    <footer class="site-footer w-full bg-white border-t border-neutral-100 pt-9 pb-4 font-prompt">

      <div class="site-container">

        <!-- BLOQUE PRINCIPAL -->
        <div class="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] items-start gap-10 mb-8 md:mb-9">

          <!-- LOGOS RECTANGULARES -->
          <div class="flex flex-col gap-6 w-full max-w-[235px]">

            <img
              src="${siteUrl("assets/logos/ancodarq-horizontal.png")}"
              alt="ANCODARQ"
              class="w-full h-auto object-contain block self-start"
            />

            <img
              src="${siteUrl("assets/logos/escuadra-horizontal.png")}"
              alt="ESCUADRA CONSTRUCCIONES"
              class="w-full h-auto object-contain block self-start"
            />

          </div>


          <!-- EMPRESA FUNDADA EN 1995 -->
          <div class="flex items-center justify-center self-center w-full">
            <img
              src="${siteUrl("assets/logos/1995.png")}"
              alt="Empresa fundada en 1995"
              width="5905"
              height="781"
              class="w-full max-w-[300px] h-auto object-contain"
            />
          </div>

          <!-- CONTACTO -->
          <div class="flex flex-col md:items-end text-left md:text-right font-light text-[11px] tracking-[0.18em] leading-relaxed text-neutral-800 pt-1">

            <div>C. TEIDE, 4</div>

            <div>
              SAN SEBASTIÁN DE LOS REYES — 28703 MADRID
            </div>

            <a
              href="mailto:ancodarq@ancodarq.com"
              class="mt-3 text-neutral-900 font-normal hover:text-neutral-500 transition-colors"
            >
              ANCODARQ@ANCODARQ.COM
            </a>

            <div class="mt-1 flex flex-wrap md:justify-end gap-x-4">

              <a
                href="tel:+34916570819"
                class="hover:text-neutral-500 transition-colors"
              >
                +34 916 570 819
              </a>

              <a
                href="tel:+34618341133"
                class="hover:text-neutral-500 transition-colors"
              >
                +34 618 341 133
              </a>

            </div>


            <!-- REDES SOCIALES -->
            <div class="mt-4 flex items-center gap-5">

              <!-- LinkedIn ANCODARQ -->
              <a
                href="https://www.linkedin.com/company/ancodarq-sl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-neutral-900 hover:text-neutral-400 transition-colors"
                aria-label="LinkedIn ANCODARQ"
                title="LinkedIn ANCODARQ"
              >

                <svg
                  class="w-[18px] h-[18px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.96 11.24V10.13H10.17V18.5H12.96V13.57C12.96 12.8 13.58 12.17 14.35 12.17A1.4 1.4 0 0 1 15.75 13.57V18.5H18.5M6.46 8.76A1.45 1.45 0 1 0 6.46 5.86A1.45 1.45 0 0 0 6.46 8.76M7.85 18.5V10.13H5.07V18.5H7.85Z"/>
                </svg>

              </a>


              <!-- Instagram ANCODARQ -->
              <a
                href="https://www.instagram.com/ancodarq/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#B51817] hover:opacity-60 transition-opacity"
                aria-label="Instagram ANCODARQ"
                title="Instagram ANCODARQ"
              >

                <svg
                  class="w-[18px] h-[18px] fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M7 2C4.24 2 2 4.24 2 7V17C2 19.76 4.24 22 7 22H17C19.76 22 22 19.76 22 17V7C22 4.24 19.76 2 17 2H7M7 4H17C18.66 4 20 5.34 20 7V17C20 18.66 18.66 20 17 20H7C5.34 20 4 18.66 4 17V7C4 5.34 5.34 4 7 4M17.5 5.5A1.25 1.25 0 1 0 17.5 8A1.25 1.25 0 0 0 17.5 5.5M12 7A5 5 0 1 0 12 17A5 5 0 0 0 12 7M12 9A3 3 0 1 1 12 15A3 3 0 0 1 12 9Z"/>
                </svg>

              </a>

            </div>

          </div>

        </div>


        <!-- LÍNEA INFERIOR -->
        <div class="w-full flex flex-col md:flex-row justify-between items-center mt-4 text-[9px] font-light tracking-[0.12em] text-neutral-400">

          <div class="whitespace-nowrap">
            © ANCODARQ
          </div>

          <div class="mt-2 md:mt-0 whitespace-nowrap">

            <a
              href="${siteUrl("privacidad/")}"
              class="hover:text-neutral-800 transition-colors"
            >
              Política de privacidad
            </a>

            <span class="mx-2">·</span>

            <a
              href="${siteUrl("aviso-legal/")}"
              class="hover:text-neutral-800 transition-colors"
            >
              Aviso legal
            </a>

            <span class="mx-2">·</span>

            <a
              href="${siteUrl("cookies/")}"
              class="hover:text-neutral-800 transition-colors"
            >
              Cookies
            </a>

          </div>

                </div>

      </div>

    </footer>
  `;
}

// ======================================================
// HERO
// ======================================================

const HERO_IMAGES = [
  "assets/home/Portada/00_01.jpg",
  "assets/home/Portada/00_02.png",
  "assets/home/Portada/00_03.png",
  "assets/home/Portada/00_04.png",
  "assets/home/Portada/00_05.png",
  "assets/home/Portada/00_06.png",
  "assets/home/Portada/00_07.JPG",
  "assets/home/Portada/00_08.jpg",
  "assets/home/Portada/00_09.png",
  "assets/home/Portada/00_10.webp",
  "assets/home/Portada/00_11.jpeg",
  "assets/home/Portada/00_12.jpeg",
  "assets/home/Portada/00_13.JPG",
  "assets/home/Portada/00_14.jpg"
];

// Encuadres sobre la foto original: el resto permanece centrado.
const HERO_IMAGE_POSITIONS = {
  "00_05.png": "35% center",
  "00_04.png": "center 40%",
  "00_02.png": "center 40%",
  "00_01.jpg": "center 62%",
  "00_13.JPG": "center 45%",
  "00_10.webp": "center 40%"
};

function initHero() {
  let img = document.getElementById("hero-img");

  if (!img || HERO_IMAGES.length === 0) return;

  let currentHeroIdx = 0;

  function showHeroImage(index) {
    const path = HERO_IMAGES[index];
    const filename = path.split("/").pop();
    img.style.objectPosition = HERO_IMAGE_POSITIONS[filename] || "center center";
    img.src = siteUrl(path);
  }

  // Aplicar también el encuadre inicial cuando se prefiere movimiento reducido.
  showHeroImage(0);

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  let transitioning = false;

  setInterval(async () => {
    if (transitioning || document.hidden) return;
    transitioning = true;
    const nextIndex = (currentHeroIdx + 1) % HERO_IMAGES.length;
    const path = HERO_IMAGES[nextIndex];
    const next = img.cloneNode(false);
    next.removeAttribute("id");
    next.setAttribute("aria-hidden", "true");
    next.style.objectPosition = HERO_IMAGE_POSITIONS[path.split("/").pop()] || "center center";
    next.src = siteUrl(path);

    try {
      // No tocar la foto visible ni su encuadre mientras carga la siguiente.
      await next.decode();
      next.style.opacity = "0";
      img.parentElement.append(next);
      await next.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 400,
        easing: "ease-in-out",
        fill: "forwards"
      }).finished;
      next.style.opacity = "1";
      next.getAnimations().forEach(animation => animation.cancel());
      img.remove();
      next.id = "hero-img";
      next.removeAttribute("aria-hidden");
      img = next;
      currentHeroIdx = nextIndex;
    } catch {
      // Conservar la foto actual si la siguiente no se puede cargar.
      next.remove();
    } finally {
      transitioning = false;
    }
  }, 2500);
}


// ======================================================
// SERVICIOS
// ======================================================

const SERVICES_DATA = [
  {
    id: "01",
    title: "RESIDENCIAL",
    image: siteUrl("assets/proyectos/01_PRADO LARGO/01_05.webp"),
    imagePosition: "center 85%",
    description:
      "Construcción de viviendas, reformas integrales y rehabilitación de edificios. Coordinamos los trabajos y cuidamos la ejecución para adaptar cada espacio a las necesidades de quienes lo habitan."
  },

  {
    id: "02",
    title: "LOCALES Y OFICINAS",
    image: siteUrl("assets/proyectos/23_GRACE/23_00PORTADA.webp"),
    imagePosition: "center 85%",
    description:
      "Reforma y adecuación de espacios comerciales y oficinas. Hacemos propias las necesidades de cada actividad, resolviendo desde la arquitectura y las instalaciones hasta los acabados finales."
  },

  {
    id: "03",
    title: "OBRA PÚBLICA",
    image: siteUrl("assets/home/obra-publica-biblioteca-rioja.jpg"),
    description:
      "Rehabilitación y restauración de edificios y equipamientos públicos. Desarollamos intervenciones en estructuras, instalaciones, fachadas y espacios interiores."
  }
];


function renderServicesGrid(containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = SERVICES_DATA.map(
    srv => `
      <article class="service-item">

        <div class="service-image">
          <img
            src="${srv.image}"
            alt="${srv.title}"
            loading="lazy"
            class="w-full h-full object-cover"
            style="object-position: ${srv.imagePosition || 'center'};"
          />
        </div>

        <div class="service-heading">
        <span class="service-number" aria-hidden="true">
          ${srv.id}
        </span>

        <h3 class="service-title">
          ${srv.title}
        </h3>
        </div>

        <p class="service-description">
          ${srv.description}
        </p>

      </article>
    `
  ).join("");
}


// ======================================================
// MENÚ MÓVIL
// ======================================================

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (!menu) return;
  setMobileMenuOpen(menu.classList.contains("hidden"));
}

function setMobileMenuOpen(open, restoreFocus = false) {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(".site-menu-toggle");
  if (!menu || !button) return;
  menu.classList.toggle("hidden", !open);
  button.setAttribute("aria-expanded", String(open));
  if (restoreFocus) button.focus();
}

function initNavigation() {
  const header = document.querySelector(".site-header");
  const menu = document.getElementById("mobile-menu");
  const button = header?.querySelector(".site-menu-toggle");
  if (!header || !menu || !button) return;
  button.setAttribute("aria-controls", "mobile-menu");
  button.setAttribute("aria-expanded", "false");
  const active = getActiveSection();
  header.querySelectorAll("nav a, #mobile-menu a").forEach(link => {
    const linkPath = new URL(link.href).pathname;
    const expected = active === "inicio" ? new URL("index.html", SITE_ROOT).pathname : active ? new URL(active + "/", SITE_ROOT).pathname : null;
    const isActive = linkPath === expected;
    link.classList.toggle("is-active", isActive);
    if (isActive) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  menu.addEventListener("click", event => {
    if (event.target.closest("a")) setMobileMenuOpen(false);
  });
  document.addEventListener("click", event => {
    if (!header.contains(event.target)) setMobileMenuOpen(false);
  });
  document.addEventListener("keydown", event => {
    if (menu.classList.contains("hidden")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      setMobileMenuOpen(false, true);
    } else if (event.key === "Tab") {
      const last = menu.querySelector("a:last-child");
      if (event.shiftKey && document.activeElement === button) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); button.focus();
      }
    }
  });
  window.matchMedia("(min-width: 1101px)").addEventListener("change", event => {
    if (event.matches) setMobileMenuOpen(false);
  });
}

// ======================================================
// INICIALIZACIÓN
// ======================================================

// Barreras de interfaz: una imagen pública sigue siendo recuperable desde el navegador.
// Delegación para incluir las fotos cargadas después por filtros y por el visor.
function initImageDownloadDeterrents() {
  const imageSurface = "img, .project-link, .project-gallery-item, .project-lightbox-main, .project-lightbox-thumb";
  const blockImageAction = event => {
    if (event.target instanceof Element && event.target.closest(imageSurface)) {
      event.preventDefault();
    }
  };
  document.addEventListener("contextmenu", blockImageAction);
  document.addEventListener("dragstart", blockImageAction);
}

document.addEventListener("DOMContentLoaded", () => {

  // Elementos globales
  renderHeader();
  renderFooter();
  initNavigation();
  initImageDownloadDeterrents();

  // Mantener el texto existente también como nombre accesible del campo.
  document.querySelectorAll("form input[placeholder], form textarea[placeholder]").forEach(field => {
    if (!field.labels?.length && !field.hasAttribute("aria-label")) {
      field.setAttribute("aria-label", field.getAttribute("placeholder"));
    }
  });
  document.querySelectorAll('form input[type="file"]').forEach((field, index) => {
    const label = field.parentElement.querySelector("label");
    if (label && !field.labels?.length) {
      field.id ||= `attachment-${index}`;
      label.htmlFor = field.id;
    }
  });

  // Home
  initHero();

  // Servicios Home / página Servicios
  renderServicesGrid("home-services-grid");
  renderServicesGrid("full-services-grid");

});
