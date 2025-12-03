// ===============================
// MENU MOBILE
// ===============================
const menuToggle = document.querySelector('.menu-toggle');
const mainNav    = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
    menuToggle.classList.toggle('open');

    const isOpen = menuToggle.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}



// ===============================
// CARREGAR COMENTÁRIOS DO JSON
// ===============================

const listaComentarios = document.querySelector('.comentarios-lista');

if (listaComentarios) {
  fetch('./comentarios.json')
    .then(res => res.json())
    .then(dados => {
      dados.forEach((comentario, index) => {
        const card = criarCardComentario(comentario, index);
        listaComentarios.appendChild(card);
      });
    })
    .catch(err => {
      console.error('Erro ao carregar comentários:', err);
      listaComentarios.innerHTML = '<p>Não foi possível carregar os comentários.</p>';
    });
}


// cria card visual do comentário
function criarCardComentario(c, i) {
  const article = document.createElement('article');
  article.classList.add('comment-card');
  article.style.animationDelay = (i * 0.1) + "s"; // delay elegante

  article.innerHTML = `
    <div class="comment-header">
        <span class="comment-name">${c.nome}</span>
        <span class="comment-stars">${gerarEstrelas(c.nota)}</span>
    </div>

    <p class="comment-text">${c.texto}</p>
    <span class="comment-date">${c.data}</span>
  `;

  return article;
}


// cria ícones de estrela conforme a nota
function gerarEstrelas(nota) {
  let html = "";
  const inteira = Math.floor(nota);
  const meia = nota - inteira >= 0.5;

  for (let i = 0; i < inteira; i++)
    html += `<i class="fa-solid fa-star"></i>`;

  if (meia)
    html += `<i class="fa-solid fa-star-half-stroke"></i>`;

  const usadas = meia ? inteira + 1 : inteira;

  for (let i = usadas; i < 5; i++)
    html += `<i class="fa-regular fa-star"></i>`;

  return html;
}



// ===============================
// ENVIAR COMENTÁRIO VIA WHATSAPP
// ===============================

// seu número com DDI + DDD + número (sem espaços, sem traços)
const numeroWhatsApp = "5592999117211"; // ex: 5592988887777

const inputNome     = document.getElementById("nome");
const inputMsg      = document.getElementById("mensagem");
const btnEnviar     = document.querySelector(".btn-enviar");
const ratingSpans   = document.querySelectorAll(".rating-options span");

let notaSelecionada = null;

// função para limpar o formulário (escopo global)
function limparFormularioComentario() {
  if (inputNome) inputNome.value = "";
  if (inputMsg) inputMsg.value = "";
  notaSelecionada = null;

  // remove seleção das estrelas
  ratingSpans.forEach(s => s.classList.remove("selected"));
}

// quando clicar em uma das notas
ratingSpans.forEach(span => {
  span.addEventListener("click", () => {
    ratingSpans.forEach(s => s.classList.remove("selected"));
    span.classList.add("selected");
    notaSelecionada = span.getAttribute("data-rating");
  });
});

if (btnEnviar && inputNome && inputMsg) {
  btnEnviar.addEventListener("click", () => {
    const nome = inputNome.value.trim();
    const mensagem = inputMsg.value.trim();

    if (!nome || !mensagem) {
      alert("Preencha pelo menos o nome e o comentário antes de enviar 😉");
      return;
    }

    const notaTexto = notaSelecionada ? `${notaSelecionada} estrelas` : "não informado";

    // texto que vai ser enviado pelo WhatsApp
    const texto = 
`Novo comentário para Oficina Marlon:

Nome: ${nome}
Nota: ${notaTexto}

Comentário:
${mensagem}

(enviado via site)`;

    const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;

    // abre o modal
    abrirModalConfirmacao();

    // abre o WhatsApp (app ou web)
    window.open(url, "_blank");
  });
}



// ===============================
// MODAL DE CONFIRMAÇÃO
// ===============================
const modalOverlay = document.getElementById("modal-confirmacao");
const modalClose   = document.querySelector(".modal-close");
const modalOk      = document.querySelector(".modal-ok");

function abrirModalConfirmacao() {
  if (!modalOverlay) return;
  modalOverlay.classList.add("show");

  // fecha ao clicar fora da caixa
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove("show");
    }
  }, { once: true });
}

if (modalClose) {
  modalClose.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
    limparFormularioComentario(); // também pode limpar ao fechar no X se quiser
  });
}

if (modalOk) {
  modalOk.addEventListener("click", () => {
    modalOverlay.classList.remove("show");
    limparFormularioComentario();  // 🔥 limpa os campos ao confirmar
  });
}
