// ===============================
// MENU MOBILE
// ===============================
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open');

    const isOpen = menuToggle.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}



// ===============================
// LIGHTBOX DA GALERIA
// ===============================

const imagens = document.querySelectorAll('.galeria-grid img');
const lightbox = document.getElementById('lightbox');
const lightImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close');

if (imagens && lightbox && lightImg && closeBtn) {

  imagens.forEach(img => {
    img.addEventListener('click', () => {
      lightImg.src = img.src;
      lightbox.style.display = 'flex';
    });
  });

  closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = 'none';
    }
  });

}

// ===============================
// FILTRO DA GALERIA
// ===============================

const filtroBtns = document.querySelectorAll(".filtro-btn");
const fotos = document.querySelectorAll(".galeria-grid img");

filtroBtns.forEach(btn => {
    btn.addEventListener("click", () => {

        // Aplica classe active
        filtroBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const categoria = btn.getAttribute("data-filter");

        fotos.forEach(foto => {
            const fotoCat = foto.getAttribute("data-cat");

            if (categoria === "todos" || fotoCat === categoria) {
                foto.classList.remove("filtro-hide");
            } else {
                foto.classList.add("filtro-hide");
            }
        });

    });
});
