
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80"
];

const SERVICES_DATA = [
  {
    id: "01",
    title: "RESIDENCIAL",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80",
    description: "Proyectos de vivienda, rehabilitación y obra nueva desarrollados de forma integral, desde las primeras decisiones de proyecto hasta la ejecución y definición final de los espacios."
  },
  {
    id: "02",
    title: "OBRA PÚBLICA",
    image: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80",
    description: "Ejecución y rehabilitación de edificios públicos, culturales, educativos, sanitarios y administrativos, incluyendo estructura, instalaciones, envolventes y acabados."
  },
  {
    id: "03",
    title: "LOCALES Y OFICINAS",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    description: "Diseño, reforma y ejecución de espacios comerciales y profesionales adaptados a las necesidades funcionales, técnicas y de identidad de cada cliente."
  }
];

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  if (menu) menu.classList.toggle("hidden");
}

function renderServicesGrid(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = SERVICES_DATA.map(srv => `
    <article class="flex flex-col">
      <div class="w-full aspect-[4/3] bg-neutral-100 mb-8 overflow-hidden">
        <img src="${srv.image}" alt="${srv.title}" class="w-full h-full object-cover" />
      </div>
      <span class="font-urbanist font-light text-sm text-neutral-400 mb-2">${srv.id}</span>
      <h3 class="font-prompt text-[13px] tracking-[0.2em] font-medium text-black mb-4">${srv.title}</h3>
      <p class="font-prompt text-[13px] leading-relaxed text-neutral-600 font-light">${srv.description}</p>
    </article>
  `).join("");
}

function initHero() {
  const img = document.getElementById("hero-img");
  if (!img || !HERO_IMAGES.length) return;
  let currentHeroIdx = 0;
  setInterval(() => {
    currentHeroIdx = (currentHeroIdx + 1) % HERO_IMAGES.length;
    img.src = HERO_IMAGES[currentHeroIdx];
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  initHero();
  renderServicesGrid("home-services-grid");
  renderServicesGrid("full-services-grid");
});
