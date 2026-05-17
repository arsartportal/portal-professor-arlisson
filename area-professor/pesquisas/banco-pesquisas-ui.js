// ========================================
// CONFIG
// ========================================

let serieAtual =
localStorage.getItem("seriePesquisa")
|| "todas";

const grid =
document.getElementById("grid");

const modal =
document.getElementById("modal");

const buscaInput =
document.getElementById("busca");

// ========================================
// INIT
// ========================================

iniciarSistema();

// ========================================
// SISTEMA
// ========================================

function iniciarSistema(){

  ativarFiltroInicial();

  render(
    serieAtual === "todas"
    ? pesquisas
    : pesquisas.filter(
        (p)=>p.serie===serieAtual
      )
  );

}

// ========================================
// RENDER
// ========================================

function render(lista){

  grid.innerHTML = "";

  if(lista.length === 0){

    grid.innerHTML = `

      <div class="sem-resultado">

        <h3>
          😕 Nenhuma pesquisa encontrada
        </h3>

        <p>
          Tente outro termo de busca.
        </p>

      </div>

    `;

    return;
  }

  lista.forEach((p,i)=>{

    const usado =
    localStorage.getItem("pesquisa_"+i);

    const perguntaSegura =
    p.pergunta.replace(/'/g,"\\'");

    grid.innerHTML += `

      <div class="card ${usado ? 'usado' : ''}">

        <div class="top-card">

          <div class="serie">
            ${p.serie.toUpperCase()}
          </div>

          ${
            usado
            ?
            `<div class="badge-usado">
              ⭐ Usado
            </div>`
            :
            ""
          }

        </div>

        <div class="pergunta">
          ${p.pergunta}
        </div>

        <div class="acoes">

          <button class="copiar"
                  onclick="copiar('${perguntaSegura}')">

            📋 Copiar

          </button>

          <button class="ver"
                  onclick="toggleResposta(${i})">

            👁 Resposta

          </button>

          <button class="xp"
                  onclick="marcarXP(${i})">

            ⭐ +XP

          </button>

        </div>

        <div class="resposta"
             id="resposta${i}">

          ${p.resposta}

        </div>

      </div>

    `;

  });

}

// ========================================
// RESPOSTA
// ========================================

function toggleResposta(id){

  const resposta =
  document.getElementById("resposta"+id);

  resposta.style.display =
  resposta.style.display === "block"
  ? "none"
  : "block";

}

// ========================================
// FILTRO
// ========================================

function filtrar(serie,btn){

  serieAtual = serie;

  localStorage.setItem(
    "seriePesquisa",
    serie
  );

  document
  .querySelectorAll(".filtro")
  .forEach((b)=>{

    b.classList.remove("ativo");

  });

  btn.classList.add("ativo");

  aplicarFiltros();

}

// ========================================
// APLICAR FILTROS
// ========================================

function aplicarFiltros(){

  const termo =
  buscaInput.value.toLowerCase();

  const lista =
  pesquisas.filter((p)=>{

    const bateBusca =
    p.pergunta
    .toLowerCase()
    .includes(termo);

    const bateSerie =
    serieAtual === "todas"
    ||
    p.serie === serieAtual;

    return bateBusca && bateSerie;

  });

  render(lista);

}

// ========================================
// FILTRO INICIAL
// ========================================

function ativarFiltroInicial(){

  document
  .querySelectorAll(".filtro")
  .forEach((btn)=>{

    btn.classList.remove("ativo");

    if(

      btn.textContent
      .toLowerCase()
      .includes(
        serieAtual.replace("ano","º ano")
      )

      ||

      (
        serieAtual==="todas"
        &&
        btn.textContent==="Todas"
      )

    ){

      btn.classList.add("ativo");

    }

  });

}

// ========================================
// BUSCA
// ========================================

buscaInput.addEventListener("input",()=>{

  aplicarFiltros();

});

// ========================================
// RANDOM
// ========================================

function pesquisaAleatoria(){

  const p =
  pesquisas[
    Math.floor(
      Math.random()*pesquisas.length
    )
  ];

  abrirModal(p);

}

// ========================================
// CURIOSIDADE
// ========================================

function curiosidadeAula(){

  const naoUsadas =
  pesquisas.filter((p,i)=>

    !localStorage.getItem("pesquisa_"+i)

  );

  if(naoUsadas.length===0){

    toast(
      "⚠ Todas as pesquisas já foram usadas!"
    );

    return;
  }

  const p =
  naoUsadas[
    Math.floor(
      Math.random()*naoUsadas.length
    )
  ];

  abrirModal(p);

}

// ========================================
// MODAL
// ========================================

function abrirModal(p){

  modal.style.display = "flex";

  document
  .getElementById("modalPergunta")
  .innerText = p.pergunta;

  document
  .getElementById("modalResposta")
  .innerText = p.resposta;

  document
  .getElementById("modalResposta")
  .style.display = "none";

}

function mostrarResposta(){

  document
  .getElementById("modalResposta")
  .style.display = "block";

}

function fecharModal(){

  modal.style.display = "none";

}

// ========================================
// FECHAR AO CLICAR FORA
// ========================================

modal.addEventListener("click",(e)=>{

  if(e.target === modal){

    fecharModal();

  }

});

// ========================================
// COPIAR
// ========================================

function copiar(texto){

  navigator.clipboard.writeText(texto);

  toast("📋 Pergunta copiada!");

}

// ========================================
// XP
// ========================================

function marcarXP(id){

  localStorage.setItem(
    "pesquisa_"+id,
    true
  );

  aplicarFiltros();

  toast("⭐ Pesquisa marcada!");

}

// ========================================
// TOAST
// ========================================

function toast(texto){

  const toast =
  document.createElement("div");

  toast.className = "toast";

  toast.innerText = texto;

  document.body.appendChild(toast);

  setTimeout(()=>{

    toast.classList.add("show");

  },50);

  setTimeout(()=>{

    toast.classList.remove("show");

    setTimeout(()=>{

      toast.remove();

    },300);

  },2200);

}

// ========================================
// BOTÃO VOLTAR
// ========================================

const btnVoltar =
document.querySelector(".btn-voltar");

if(btnVoltar){

  btnVoltar.addEventListener("click",()=>{

    history.back();

  });

}