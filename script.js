document.addEventListener('DOMContentLoaded', () => {

    /* ============================
       MENU MOBILE
    ============================ */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.main-nav .nav-link');

    if (toggle && nav) {

        // abre/fecha ao clicar no botão
        toggle.addEventListener('click', () => {
            const isOpen = toggle.classList.toggle('open');
            nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        // fecha o menu ao clicar em um link
        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ============================
       WHATSAPP — PUXAR O NOME AUTOMATICAMENTE
    ============================ */
    const btnWhatsApp = document.getElementById("btnWhatsApp");
    const inputNome = document.getElementById("nome"); // campo onde o cliente digita o nome

    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", function (e) {
            e.preventDefault(); // impede abrir antes de montar a mensagem

            const numero = "5592999117211";
            const nome = inputNome ? inputNome.value.trim() : "";

            const texto = nome
                ? `Olá ${nome}! Gostaria de solicitar um orçamento sem compromisso.`
                : `Olá! Gostaria de solicitar um orçamento sem compromisso.`;

            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });
    }

});
