document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.main-nav .nav-link');

    if (!toggle || !nav) return;

    // abre/fecha ao clicar no botão
    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('open');
        nav.classList.toggle('open');
        toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // fecha o menu ao clicar em qualquer link
    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            nav.classList.remove('open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
});
