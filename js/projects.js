
const PROJECTS_DATA = [
 {
  slug: "vip-teatro-apolo",
  name: "VIP Teatro Apolo",
  category: "COMERCIAL",
  location: "Madrid",
  year: "2025",
  coverImage: "assets/proyectos/28_TEATRO_APOLO_WEB/28_00 PORTADA.webp",
  description: "",
  gallery: [
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_01.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_02.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_03.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_04.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_05.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_06.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_07.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_08.webp",
    "assets/proyectos/28_TEATRO_APOLO_WEB/28_09.webp"
  ]
},
{
  slug: "vip-teatro-alcala",
  name: "VIP Teatro Alcalá",
  category: "COMERCIAL",
  location: "Madrid",
  year: "2025",

  coverImage: "assets/proyectos/29_VIP_TEATRO_ALCALA/29_00 PORTADA.webp",

  description: "",

  gallery: [
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_01.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_02.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_03.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_04.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_05.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_06.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_07.webp",
    "assets/proyectos/29_VIP_TEATRO_ALCALA/29_08.webp"
  ]
},
{
  slug: "cotos",
  name: "Cotos",
  category: "OBRA NUEVA",
  location: "Madrid",
  year: "",

  coverImage: "assets/proyectos/03_COTOS/03_00 PORTADA.webp",

  description: "",

  gallery: [
    "assets/proyectos/03_COTOS/03_01.webp",
    "assets/proyectos/03_COTOS/03_02.webp",
    "assets/proyectos/03_COTOS/03_03.webp"
  ]
},
{
  slug: "alamos-de-bularas",
  name: "Álamos de Bularas",
  category: "OBRA NUEVA",
  location: "Madrid",
  year: "",

  coverImage: "assets/proyectos/02_ALAMOS DE BULARAS/02_00 PORTADA.webp",

  description: "",

  gallery: [
    "assets/proyectos/02_ALAMOS DE BULARAS/02_01.webp",
    "assets/proyectos/02_ALAMOS DE BULARAS/02_03.webp",
    "assets/proyectos/02_ALAMOS DE BULARAS/02_04.webp",
    "assets/proyectos/02_ALAMOS DE BULARAS/02_05.webp"
  ]
},
{
  slug: "la-finca",
  name: "La Finca",
  category: "OBRA NUEVA",
  location: "Madrid",
  year: "",

  coverImage: "assets/proyectos/07_LA FINCA/07_00 PORTADA.webp",

  description: "",

  gallery: [
    "assets/proyectos/07_LA FINCA/07_01.webp"
  ]
},
{
  slug: "jj39",
  name: "JJ39",
  category: "REFORMAS",
  location: "Madrid",
  year: "",

  coverImage: "assets/proyectos/09_JJ39/09_00 PORTADA.webp",

  description: "",

  gallery: [
    "assets/proyectos/09_JJ39/09_01.webp",
    "assets/proyectos/09_JJ39/09_02.webp",
    "assets/proyectos/09_JJ39/09_03.webp",
    "assets/proyectos/09_JJ39/09_04.webp",
    "assets/proyectos/09_JJ39/09_05.webp",
    "assets/proyectos/09_JJ39/09_06.webp",
    "assets/proyectos/09_JJ39/09_07.webp",
    "assets/proyectos/09_JJ39/09_08.webp",
    "assets/proyectos/09_JJ39/09_09.webp"
  ]
},
{
  slug: "urb-la-moraleja",
  name: "Urb. La Moraleja",
  category: "OBRA NUEVA",
  location: "La Moraleja, Madrid",
  year: "",

  coverImage: "assets/proyectos/10_URB. LA MORALEJA/10_00 PORTADA.webp",

  description: "",

  gallery: [
    "assets/proyectos/10_URB. LA MORALEJA/10_01.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_02.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_03.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_04.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_05.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_06.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_07.webp",
    "assets/proyectos/10_URB. LA MORALEJA/10_08.webp"
  ]
},
function renderHomeProjects() {
  const container = document.getElementById("home-projects-preview");
  if (!container) return;
container.innerHTML = PROJECTS_DATA.slice(0, 6).map(p => projectCard(p)).join("");
}

let activeFilter = "TODOS";
function renderProjectsGallery() {
  const filterCont = document.getElementById("categories-filter");
  const gridCont = document.getElementById("proyectos-gallery-grid");
  if (!filterCont || !gridCont) return;

  const cats = ["TODOS", "OBRA NUEVA", "REFORMAS", "COMERCIAL", "OFICINAS"];
  filterCont.innerHTML = cats.map(c => `
    <button type="button" data-cat="${c}" class="project-filter py-1 relative transition-colors duration-150 ${activeFilter === c ? "text-black font-normal" : "text-neutral-400 hover:text-black"}">
      ${c}
      ${activeFilter === c ? '<span class="absolute bottom-0 left-0 w-full h-px bg-black"></span>' : ""}
    </button>
  `).join("");

  filterCont.querySelectorAll(".project-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      activeFilter = btn.dataset.cat;
      renderProjectsGallery();
    });
  });

  const filtered = activeFilter === "TODOS"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.category === activeFilter);

gridCont.innerHTML = filtered.map(p => projectCard(p)).join("");
}

function renderProjectDetail() {
  const container = document.getElementById("project-detail-content");
  if (!container) return;
 const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");
  const project = PROJECTS_DATA.find(p => p.slug === slug);
  if (!project) {
    container.innerHTML = '<p class="text-sm text-neutral-500">Proyecto no encontrado.</p>';
    return;
  }
  container.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20 items-start">
      <div class="md:col-span-7">
        <h1 class="text-2xl md:text-4xl font-urbanist font-light tracking-tight text-black mb-4">${project.name}</h1>
        <p class="text-sm md:text-base text-neutral-600 font-light max-w-xl leading-relaxed">${project.description}</p>
      </div>
      <div class="md:col-span-5 grid grid-cols-2 gap-6 text-[12px] font-light tracking-wider border-t md:border-t-0 md:border-l border-neutral-100 pt-6 md:pt-0 md:pl-10">
        <div><span class="text-neutral-400 block mb-1">CATEGORÍA</span><span class="text-black">${project.category}</span></div>
        <div><span class="text-neutral-400 block mb-1">AÑO</span><span class="text-black">${project.year}</span></div>
        <div><span class="text-neutral-400 block mb-1">UBICACIÓN</span><span class="text-black">${project.location}</span></div>
      </div>
    </div>
    <div class="flex flex-col gap-16">
      <div class="w-full bg-neutral-50 overflow-hidden">
      <img src="${siteUrl(project.coverImage)}" alt="${project.name}" class="w-full h-auto object-contain mx-auto" />
      </div>
      ${(project.gallery || []).map(img => `
        <div class="w-full bg-neutral-50 overflow-hidden">
          <img src="${siteUrl(img)}" alt="${project.name}" class="w-full h-auto object-contain mx-auto" />
        </div>
      `).join("")}
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  renderHomeProjects();
  renderProjectsGallery();
  renderProjectDetail();
});
