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

  return "inicio";
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
    <header class="w-full bg-white fixed top-0 left-0 z-50 border-b border-neutral-100">

      <div class="w-[90%] mx-auto py-5 flex items-center justify-between">

        <!-- LOGOS -->
        <a href="${siteUrl("index.html")}" class="flex items-center gap-7">

          <img
            src="${siteUrl("assets/logos/ancodarq-square.png")}"
            alt="ANCODARQ"
            class="h-16 md:h-20 w-auto object-contain shrink-0"
          />

          <span class="w-px h-10 bg-neutral-200"></span>

          <img
            src="${siteUrl("assets/logos/escuadra-square.png")}"
            alt="ESCUADRA CONSTRUCCIONES"
            class="h-16 md:h-20 w-auto object-contain shrink-0 scale-110"
          />

        </a>


        <!-- NAVEGACIÓN DESKTOP -->
        <nav class="hidden md:flex items-center gap-10 font-prompt font-light text-[12px] tracking-[0.2em] text-neutral-800">

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
          class="md:hidden flex flex-col justify-center gap-1.5 w-6 h-6 p-0 focus:outline-none"
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
        class="hidden md:hidden bg-white w-full border-b border-neutral-200 px-[5%] py-8 flex flex-col gap-6 font-prompt font-light text-sm tracking-[0.2em]"
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
    <footer class="w-full bg-white border-t border-neutral-100 pt-9 pb-4 font-prompt">

      <div class="w-[90%] mx-auto">

        <!-- BLOQUE PRINCIPAL -->
        <div class="flex flex-col md:flex-row justify-between items-start gap-10 mb-8 md:mb-9">

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


              <!-- Instagram ESCUADRA -->
              <a
                href="https://www.instagram.com/escuadra_construcciones/"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[#07758C] hover:opacity-60 transition-opacity"
                aria-label="Instagram ESCUADRA"
                title="Instagram ESCUADRA"
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
  "assets/home/Portada/00.webp",
  "assets/home/Portada/01.webp",
  "assets/home/Portada/02.webp",
  "assets/home/Portada/03.webp",
  "assets/home/Portada/04.webp",
  "assets/home/Portada/05.webp",
  "assets/home/Portada/06.webp",
  "assets/home/Portada/07.webp",
  "assets/home/Portada/08.webp",
  "assets/home/Portada/09.webp"
];

function initHero() {
  const img = document.getElementById("hero-img");

  if (!img || HERO_IMAGES.length === 0) return;

  let currentHeroIdx = 0;

  // Mostrar inmediatamente la primera imagen real
  img.src = siteUrl(HERO_IMAGES[0]);

  setInterval(() => {
    currentHeroIdx = (currentHeroIdx + 1) % HERO_IMAGES.length;
    img.src = siteUrl(HERO_IMAGES[currentHeroIdx]);
  }, 2500);
}


// ======================================================
// SERVICIOS
// ======================================================

const SERVICES_DATA = [
  {
    id: "01",
    title: "RESIDENCIAL",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    description:
      "Proyectos de vivienda, rehabilitación y obra nueva desarrollados de forma integral, desde las primeras decisiones de proyecto hasta la ejecución y definición final de los espacios."
  },

  {
    id: "02",
    title: "OBRA PÚBLICA",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    description:
      "Ejecución y rehabilitación de edificios públicos, culturales, educativos, sanitarios y administrativos, incluyendo estructura, instalaciones, envolventes y acabados."
  },

  {
    id: "03",
    title: "LOCALES Y OFICINAS",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description:
      "Diseño, reforma y ejecución de espacios comerciales y profesionales adaptados a las necesidades funcionales, técnicas y de identidad de cada cliente."
  }
];


function renderServicesGrid(containerId) {
  const container = document.getElementById(containerId);

  if (!container) return;

  container.innerHTML = SERVICES_DATA.map(
    srv => `
      <article class="flex flex-col">

        <div class="w-full aspect-[4/3] bg-neutral-100 mb-8 overflow-hidden">
          <img
            src="${srv.image}"
            alt="${srv.title}"
            class="w-full h-full object-cover"
          />
        </div>

        <span class="font-urbanist font-light text-sm text-neutral-400 mb-2">
          ${srv.id}
        </span>

        <h3 class="font-prompt text-[13px] tracking-[0.2em] font-medium text-black mb-4">
          ${srv.title}
        </h3>

        <p class="font-prompt text-[13px] leading-relaxed text-neutral-600 font-light">
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

  if (menu) {
    menu.classList.toggle("hidden");
  }
}


// ======================================================
// INICIALIZACIÓN
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

  // Elementos globales
  renderHeader();
  renderFooter();

  // Home
  initHero();

  // Servicios Home / página Servicios
  renderServicesGrid("home-services-grid");
  renderServicesGrid("full-services-grid");

});
