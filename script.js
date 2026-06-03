// =============================================
// ⚙️  CONFIGURACIÓN — EDITÁ AQUÍ
// =============================================

// 🔗 Tu link de Messenger (reemplazá con tu link real)
const MESSENGER_LINK = "https://m.me/TU_PAGINA_AQUI";

// ⏱️ Tiempo de rotación del carrusel en milisegundos (5000 = 5 segundos)
const CAROUSEL_AUTOPLAY_TIME = 5000;

// 🛍️  TUS PRODUCTOS — Agregá, editá o eliminá productos aquí
const productos = [
  {
    id: 1,
    nombre: "Blazer Oversize Negro",
    categoria: "Ropa",
    precio: "$35.000",
    descripcionCorta: "Corte oversize, tela premium. Ideal para cualquier ocasión.",
    descripcionLarga: "Blazer de corte oversize en tela de gabardina premium. Su diseño estructurado pero relajado lo hace versátil para salidas casuales o looks más formales. Bolsillos frontales funcionales. Interior semi-forrado.",
    imagen: "https://images.unsplash.com/photo-1594938298603-a8b74b42b0c6?w=600&q=80",
    detalles: { "Talla": "S / M / L / XL", "Material": "Gabardina", "Color": "Negro", "Condición": "Nuevo" },
    badge: "Destacado"
  },
  {
    id: 2,
    nombre: "Vestido Midi Floral",
    categoria: "Ropa",
    precio: "$28.000",
    descripcionCorta: "Escote en V, vuelo midi, estampado floral elegante.",
    descripcionLarga: "Vestido largo hasta la media pierna con estampado floral sobre fondo crema. Escote en V pronunciado, manga corta acampanada. Perfecto para eventos o salidas de día. Tela liviana y fresca.",
    imagen: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80",
    detalles: { "Talla": "S / M / L", "Material": "Viscosa", "Color": "Floral crema", "Condición": "Nuevo" },
    badge: ""
  },
  {
    id: 3,
    nombre: "Jogger Premium Gris",
    categoria: "Ropa",
    precio: "$18.500",
    descripcionCorta: "Pantalón jogger de felpa premium. Comodidad total.",
    descripcionLarga: "Pantalón jogger de felpa suave en color gris melange. Cintura elástica con cordón, puño en tobillo. Interior afelpado extra suave. Ideal para el día a día con mucho estilo.",
    imagen: "https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=600&q=80",
    detalles: { "Talla": "M / L / XL", "Material": "Felpa", "Color": "Gris melange", "Condición": "Nuevo" },
    badge: ""
  },
  {
    id: 4,
    nombre: "Cartera Bucket Marrón",
    categoria: "Bolsos",
    precio: "$22.000",
    descripcionCorta: "Cartera tipo bucket, cuero sintético premium. Con asa y correa.",
    descripcionLarga: "Cartera estilo bucket bag en cuero sintético de alta calidad. Incluye bolsillo interior con cierre, asa corta y bandolera regulable desmontable. Cierre de cordón. Tamaño mediano, muy cómoda.",
    imagen: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    detalles: { "Dimensiones": "28×28×18 cm", "Material": "Cuero sintético", "Color": "Marrón tostado", "Condición": "Nuevo" },
    badge: "Nuevo"
  },
  {
    id: 5,
    nombre: "Zapatillas Chunky Blancas",
    categoria: "Calzado",
    precio: "$42.000",
    descripcionCorta: "Suela track gruesa, cuero sintético. Urbanas y cómodas.",
    descripcionLarga: "Zapatillas de plataforma chunky en cuero sintético blanco. Suela track gruesa en goma. Interior acolchado para mayor comodidad. Cierre con cordones. Estilo urbano y contemporáneo.",
    imagen: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    detalles: { "Talla": "35 al 41", "Material": "Cuero sintético", "Color": "Blanco", "Condición": "Nuevo" },
    badge: ""
  },
  {
    id: 6,
    nombre: "Collar Minimalista Dorado",
    categoria: "Accesorios",
    precio: "$8.500",
    descripcionCorta: "Cadena fina bañada en oro 18k. Delicada y versátil.",
    descripcionLarga: "Collar de cadena fina estilo snake bañada en oro 18k. Largo 45cm regulable. Libre de níquel, apto para pieles sensibles. Se puede usar sola o layering con otras cadenas.",
    imagen: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    detalles: { "Largo": "45 cm", "Material": "Bañado oro 18k", "Color": "Dorado", "Condición": "Nuevo" },
    badge: ""
  },
];

// =============================================
// Lógica Global del Catálogo y Componentes
// =============================================

let categoriaActiva = "Todos";
let busquedaActiva = "";
let currentSlide = 0;
let carouselInterval;

// 🎠 LÓGICA DEL CARRUSEL HERO
function initCarousel() {
  const slides = document.querySelectorAll(".carousel-slide");
  const dotsContainer = document.getElementById("carouselDots");
  
  if (slides.length === 0) return;

  // Crear puntos indicadores dinámicamente
  slides.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
  });

  // Iniciar reproducción automática
  startCarouselAutoplay();
}

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".carousel-dot");
  
  if (index >= slides.length) currentSlide = 0;
  else if (index < 0) currentSlide = slides.length - 1;
  else currentSlide = index;

  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentSlide);
  });
}

function moveSlide(step) {
  stopCarouselAutoplay();
  showSlide(currentSlide + step);
  startCarouselAutoplay();
}

function goToSlide(index) {
  stopCarouselAutoplay();
  showSlide(index);
  startCarouselAutoplay();
}

function startCarouselAutoplay() {
  carouselInterval = setInterval(() => {
    showSlide(currentSlide + 1);
  }, CAROUSEL_AUTOPLAY_TIME);
}

function stopCarouselAutoplay() {
  clearInterval(carouselInterval);
}


// 🛍️ LÓGICA DE LA GRILLA DE PRODUCTOS
function renderGrid() {
  const grid = document.getElementById("productGrid");
  const noResults = document.getElementById("noResults");
  grid.innerHTML = "";

  const filtrados = productos.filter(p => {
    const matchesCategory = (categoriaActiva === "Todos" || p.categoria === categoriaActiva);
    const matchesSearch = p.nombre.toLowerCase().includes(busquedaActiva.toLowerCase()) || 
                          p.descripcionCorta.toLowerCase().includes(busquedaActiva.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtrados.length === 0) {
    noResults.classList.add("show");
    return;
  }
  noResults.classList.remove("show");

  filtrados.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${index * 0.04}s`;
    card.onclick = () => openModal(p);
    card.innerHTML = `
      <div class="card-img-wrap">
        <img src="${p.imagen}" alt="${p.nombre}" class="card-img" loading="lazy">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      </div>
      <div class="card-body">
        <p class="card-cat">${p.categoria}</p>
        <p class="card-name">${p.nombre}</p>
        <p class="card-desc">${p.descripcionCorta}</p>
        <div class="card-footer">
          <span class="card-price">${p.precio}</span>
          <button class="card-btn">Ver más →</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Actualizar contadores numéricos en los filtros
function updateCounters() {
  const categorias = ["Todos", "Ropa", "Accesorios", "Calzado", "Bolsos"];
  categorias.forEach(cat => {
    const countEl = document.getElementById(`count-${cat}`);
    if (countEl) {
      const count = cat === "Todos" ? productos.length : productos.filter(p => p.categoria === cat).length;
      countEl.textContent = count;
    }
  });
}

// Cambiar de categoría activa
function filterCategory(cat, btn) {
  categoriaActiva = cat;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  
  if (btn) {
    btn.classList.add("active");
  } else {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach(b => {
      if(b.textContent.includes(cat)) b.classList.add("active");
    });
  }
  renderGrid();
}

// Escuchar entrada de texto en el buscador
function handleSearch() {
  busquedaActiva = document.getElementById("searchInput").value;
  renderGrid();
}

// 📦 MODAL INFO DETALLADA
function openModal(p) {
  document.getElementById("modalImg").src = p.imagen;
  document.getElementById("modalImg").alt = p.nombre;
  document.getElementById("modalCat").textContent = p.categoria;
  document.getElementById("modalName").textContent = p.nombre;
  document.getElementById("modalPrice").textContent = p.precio;
  document.getElementById("modalDesc").textContent = p.descripcionLarga;

  const detailsEl = document.getElementById("modalDetails");
  detailsEl.innerHTML = "";
  Object.entries(p.detalles).forEach(([k, v]) => {
    detailsEl.innerHTML += `
      <div class="detail-item">
        <p class="modal-label">${k}</p>
        <p class="detail-val">${v}</p>
      </div>
    `;
  });

  const msg = encodeURIComponent(`¡Hola! Vi esto en tu catálogo y me interesa: "${p.nombre}" (${p.precio}). ¿Sigue disponible?`);
  document.getElementById("messengerLink").href = `${MESSENGER_LINK}?text=${msg}`;

  document.getElementById("overlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal(e) {
  if (e.target === document.getElementById("overlay")) closeModalDirect();
}

function closeModalDirect() {
  document.getElementById("overlay").classList.remove("open");
  document.body.style.overflow = "";
}

// Botón "Volver Arriba" dinámico
window.addEventListener("scroll", () => {
  const btn = document.getElementById("scrollTopBtn");
  if (window.scrollY > 400) {
    btn.classList.add("show");
  } else {
    btn.classList.remove("show");
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Accesibilidad teclado (Cierre modal con Escape)
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModalDirect(); });

// Inicialización de funciones al cargar
initCarousel();
updateCounters();
renderGrid();