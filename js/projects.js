
const PROJECTS_DATA = [
    {
    slug: "vip-teatro-apolo",
    name: "VIP Teatro Apolo",
    category: "COMERCIAL",
    location: "Madrid",
    year: "2025",
    coverImage: "assets/projects/28_VIP TEATRO APOLO/28_00 PORTADA.jpg",
    description: "",
    gallery: [
      "assets/projects/28_VIP TEATRO APOLO/28_01.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_02.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_03.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_04.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_05.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_06.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_07.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_08.jpg",
      "assets/projects/28_VIP TEATRO APOLO/28_09.jpg"
    ]
  },
  {
    slug: "vivienda-unifamiliar-la-moraleja",
    name: "Vivienda Unifamiliar La Moraleja",
    category: "OBRA NUEVA",
    location: "Madrid",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    description: "Desarrollo residencial integral priorizando la integración lumínica y la pureza volumétrica mediante hormigón visto y carpinterías continuas de suelo a techo.",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "rehabilitacion-edificio-claudio-coello",
    name: "Edificio Residencial Claudio Coello",
    category: "REFORMAS",
    location: "Madrid",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    description: "Rehabilitación estructural y energética de inmueble clásico en el Barrio de Salamanca conservando elementos ornamentales originales protegidos.",
    gallery: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "sede-corporativa-castellana",
    name: "Sede Corporativa Castellana",
    category: "OFICINAS",
    location: "Madrid",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    description: "Adecuación integral de 1.800 m² de superficie terciaria con sistemas de climatización invisible y zonificación modular acústica.",
    gallery: [
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "espacio-retail-serrano",
    name: "Espacio Comercial Serrano",
    category: "COMERCIAL",
    location: "Madrid",
    year: "2024",
    coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80",
    description: "Ejecución de flagship store con microcemento pulido continuo e iluminación lineal oculta integrada en foseados perimetrales.",
    gallery: [
      "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "vivienda-somontes",
    name: "Residencia Somontes",
    category: "OBRA NUEVA",
    location: "Pozuelo de Alarcón",
    year: "2022",
    coverImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    description: "Vivienda unifamiliar aislada articulada en torno a un patio interior de granito y lámina de agua estructural.",
    gallery: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=80"
    ]
  },
  {
    slug: "reforma-duplex-chamberi",
    name: "Ático Dúplex Chamberí",
    category: "REFORMAS",
    location: "Madrid",
    year: "2023",
    coverImage: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
    description: "Redistribución de espacios diáfanos conectando niveles mediante escalera volada de chapa de acero plegada.",
    gallery: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1600&q=80"
    ]
  }
];

function projectCard(project) {
  return `
    <a href="${siteUrl(`proyectos/detalle.html?slug=${project.slug}`)}" class="group block">
      <div class="w-full aspect-[4/3] bg-neutral-100 mb-4 overflow-hidden">
        <img
          src="${siteUrl(project.coverImage)}"
          alt="${project.name}"
          class="w-full h-full object-cover"
        />
      </div>

      <div class="flex justify-between items-baseline gap-4">
        <h3 class="text-[13px] font-normal text-neutral-900 group-hover:text-black transition-colors">
          ${project.name}
        </h3>

        <span class="text-[10px] tracking-[0.15em] font-light text-neutral-400 whitespace-nowrap">
          ${project.category}
        </span>
      </div>
    </a>
  `;
}

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
