document.addEventListener('DOMContentLoaded', () => {

    /* ============================
       MENU MOBILE
    ============================ */
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.main-nav');
    const links = document.querySelectorAll('.main-nav .nav-link');

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            const isOpen = toggle.classList.toggle('open');
            nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        links.forEach(link => {
            link.addEventListener('click', () => {
                toggle.classList.remove('open');
                nav.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ============================
       WHATSAPP DINÂMICO
    ============================ */
    const btnWhatsApp = document.getElementById("btnWhatsApp");

    if (btnWhatsApp) {
        btnWhatsApp.addEventListener("click", (e) => {
            e.preventDefault();

            const numero = "5592999117211";

            // tenta localizar o nome em qualquer lugar da página
            let nome = "";

            const input1 = document.getElementById("nome");
            const input2 = document.querySelector("input[name='nome']");
            const input3 = document.querySelector("input[placeholder*='Nome'], input[placeholder*='nome']");

            if (input1 && input1.value.trim() !== "") nome = input1.value.trim();
            else if (input2 && input2.value.trim() !== "") nome = input2.value.trim();
            else if (input3 && input3.value.trim() !== "") nome = input3.value.trim();

            const texto = nome
                ? `Olá ${nome}! Gostaria de solicitar um orçamento sem compromisso.`
                : `Olá! Gostaria de solicitar um orçamento sem compromisso.`;

            const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;

            window.open(url, "_blank");
        });
    }

});
