/**
 * Global mock dataset containing exactly 10 offline items with inline SVG data URIs.
 */
const GALLERY_DATA = [
  {
    id: "gallery-item-1",
    title: "Mountain Horizon",
    tags: ["Nature", "Landscape"],
    likes: 142,
    aspectRatio: "4/5",
    alt: "A tranquil mountain range during sunset",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%234a90e2'/><path d='M0 350 L120 200 L240 350 L320 280 L400 380 L400 500 L0 500 Z' fill='%232c3e50'/><circle cx='300' cy='120' r='40' fill='%23f1c40f'/></svg>"
  },
  {
    id: "gallery-item-2",
    title: "Urban Architecture",
    tags: ["Architecture", "Design"],
    likes: 89,
    aspectRatio: "3/4",
    alt: "Modern glass skyscraper geometric pattern",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%2334495e'/><path d='M50 0 L250 0 L250 400 L50 400 Z' fill='%237f8c8d'/><line x1='100' y1='0' x2='100' y2='400' stroke='%23ecf0f1' stroke-width='4'/><line x1='150' y1='0' x2='150' y2='400' stroke='%23ecf0f1' stroke-width='4'/><line x1='200' y1='0' x2='200' y2='400' stroke='%23ecf0f1' stroke-width='4'/></svg>"
  },
  {
    id: "gallery-item-3",
    title: "Minimalist Workspace",
    tags: ["Interior", "Minimal"],
    likes: 210,
    aspectRatio: "1/1",
    alt: "Clean wooden desk with notebook and plant",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23ecf0f1'/><rect x='50' y='250' width='300' height='150' fill='%23d35400'/><circle cx='200' cy='180' r='50' fill='%2327ae60'/></svg>"
  },
  {
    id: "gallery-item-4",
    title: "Abstract Gradient Splash",
    tags: ["Art", "Abstract"],
    likes: 315,
    aspectRatio: "9/16",
    alt: "Vibrant pink and purple gradient artwork",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='640' viewBox='0 0 360 640'><defs><linearGradient id='g4' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' stop-color='%238e44ad'/><stop offset='100%' stop-color='%23e74c3c'/></linearGradient></defs><rect width='100%' height='100%' fill='url(%23g4)'/></svg>"
  },
  {
    id: "gallery-item-5",
    title: "Cozy Coffee Corner",
    tags: ["Lifestyle", "Cozy"],
    likes: 178,
    aspectRatio: "4/3",
    alt: "Warm cup of coffee next to open book",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%23f39c12'/><circle cx='200' cy='150' r='70' fill='%23ffffff'/><circle cx='200' cy='150' r='55' fill='%236e2c00'/></svg>"
  },
  {
    id: "gallery-item-6",
    title: "Neon City Nights",
    tags: ["City", "Night"],
    likes: 420,
    aspectRatio: "16/9",
    alt: "Cyberpunk neon street reflections",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='640' height='360' viewBox='0 0 640 360'><rect width='100%' height='100%' fill='%23111111'/><path d='M0 300 L640 300' stroke='%2300ffff' stroke-width='6'/><circle cx='320' cy='180' r='80' fill='none' stroke='%23ff007f' stroke-width='8'/></svg>"
  },
  {
    id: "gallery-item-7",
    title: "Ocean Wave Surge",
    tags: ["Ocean", "Nature"],
    likes: 95,
    aspectRatio: "3/2",
    alt: "Deep blue ocean wave breaking near shore",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='450' height='300' viewBox='0 0 450 300'><rect width='100%' height='100%' fill='%232980b9'/><path d='M0 150 Q 112 80 225 150 T 450 150 L 450 300 L 0 300 Z' fill='%231abc9c'/></svg>"
  },
  {
    id: "gallery-item-8",
    title: "Forest Solitude",
    tags: ["Forest", "Trees"],
    likes: 230,
    aspectRatio: "4/5",
    alt: "Tall pine tree forest surrounded by mist",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='500' viewBox='0 0 400 500'><rect width='100%' height='100%' fill='%2316a085'/><polygon points='100,400 150,200 200,400' fill='%23117864'/><polygon points='200,450 260,150 320,450' fill='%230e6251'/></svg>"
  },
  {
    id: "gallery-item-9",
    title: "Golden Hour Dunes",
    tags: ["Desert", "Travel"],
    likes: 164,
    aspectRatio: "1/1",
    alt: "Soft rolling sand dunes during sunset",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'><rect width='100%' height='100%' fill='%23edbb99'/><path d='M0 250 Q 200 150 400 280 L 400 400 L 0 400 Z' fill='%23dc7633'/></svg>"
  },
  {
    id: "gallery-item-10",
    title: "Geometric Patterns",
    tags: ["Illustration", "3D"],
    likes: 310,
    aspectRatio: "3/4",
    alt: "3D pastel geometric cube isometric composition",
    imageUrl: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='400' viewBox='0 0 300 400'><rect width='100%' height='100%' fill='%23f5eeed'/><polygon points='150,100 230,150 150,200 70,150' fill='%23af7ac5'/><polygon points='70,150 150,200 150,300 70,250' fill='%2376d7c4'/><polygon points='150,200 230,150 230,250 150,300' fill='%23f7dc6f'/></svg>"
  }
];

let previousActiveElement = null;

/**
 * Safely sets node text content (XSS prevention).
 */
function setElementText(element, text) {
  if (element) {
    element.textContent = text || "";
  }
}

/**
 * Creates card DOM element securely.
 */
function createCardElement(item) {
  const card = document.createElement("article");
  card.className = "gallery-card";
  card.setAttribute("tabindex", "0");
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", item.title || "Image item");
  card.dataset.id = item.id;

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "card-image-wrapper";
  if (item.aspectRatio) {
    imgWrapper.style.aspectRatio = item.aspectRatio;
  }

  const img = document.createElement("img");
  img.className = "card-img";
  img.src = item.imageUrl || "";
  img.alt = item.alt || item.title || "Gallery Image";
  img.setAttribute("loading", "lazy");
  
  img.onerror = () => {
    img.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='200'><rect width='100%' height='100%' fill='%23cccccc'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='%23666666'>Image Unavailable</text></svg>";
  };

  imgWrapper.appendChild(img);

  const info = document.createElement("div");
  info.className = "card-info";

  const title = document.createElement("h3");
  title.className = "card-title";
  setElementText(title, item.title || "Untitled");

  const tagsContainer = document.createElement("div");
  tagsContainer.className = "card-tags";
  const tags = (Array.isArray(item.tags) && item.tags.length > 0) ? item.tags : ["General"];
  tags.forEach(tagText => {
    const tag = document.createElement("span");
    tag.className = "tag-pill";
    setElementText(tag, tagText);
    tagsContainer.appendChild(tag);
  });

  const footer = document.createElement("div");
  footer.className = "card-footer";
  
  const likes = document.createElement("span");
  likes.className = "card-likes";
  setElementText(likes, `♥ ${item.likes || 0}`);
  footer.appendChild(likes);

  info.appendChild(title);
  info.appendChild(tagsContainer);
  info.appendChild(footer);

  card.appendChild(imgWrapper);
  card.appendChild(info);

  const triggerModal = () => openModal(item);
  card.addEventListener("click", triggerModal);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      triggerModal();
    }
  });

  return card;
}

function renderGallery(items, containerEl) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  items.forEach(item => {
    const cardEl = createCardElement(item);
    containerEl.appendChild(cardEl);
  });
}

function openModal(item) {
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalTitle = document.getElementById("modal-title");
  const modalTags = document.getElementById("modal-tags");
  const modalLikes = document.getElementById("modal-likes");

  if (!modal) return;

  previousActiveElement = document.activeElement;

  if (modalImg) {
    modalImg.src = item.imageUrl || "";
    modalImg.alt = item.alt || item.title || "";
  }

  setElementText(modalTitle, item.title || "Untitled");
  setElementText(modalLikes, String(item.likes || 0));

  if (modalTags) {
    modalTags.innerHTML = "";
    const tags = (Array.isArray(item.tags) && item.tags.length > 0) ? item.tags : ["General"];
    tags.forEach(tagText => {
      const tag = document.createElement("span");
      tag.className = "tag-pill";
      setElementText(tag, tagText);
      modalTags.appendChild(tag);
    });
  }

  modal.removeAttribute("aria-hidden");
  document.body.classList.add("modal-open");

  const modalContent = modal.querySelector(".modal-content");
  if (modalContent) {
    modalContent.focus();
  }
}

function closeModal() {
  const modal = document.getElementById("image-modal");
  if (!modal) return;

  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");

  if (previousActiveElement && typeof previousActiveElement.focus === "function") {
    previousActiveElement.focus();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const gridContainer = document.getElementById("gallery-grid");
  renderGallery(GALLERY_DATA, gridContainer);

  const modal = document.getElementById("image-modal");
  if (modal) {
    const closeBtn = modal.querySelector(".modal-close");
    const backdrop = modal.querySelector(".modal-backdrop");

    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    if (backdrop) backdrop.addEventListener("click", closeModal);

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.getAttribute("aria-hidden") !== "true") {
        closeModal();
      }
    });
  }
});
