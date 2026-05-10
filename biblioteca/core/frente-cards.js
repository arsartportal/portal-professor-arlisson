/* =====================================================
   FRENTE CARDS
   Renderiza cards das aulas automaticamente
===================================================== */

import {

  doc,
  getDoc,
  updateDoc

}

from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {

  db

}

from "../../js/firebase.js";

import {

  AULAS_FISICA_1ANO,
  AULAS_MAT_1ANO,
  AULAS_QUIMICA_1ANO

} from "./aulas.js";

import {

  carregarProgressoAulas

} from "./progresso-aulas.js";

/* =====================================================
   RENDERIZAR CARDS
===================================================== */

export async function renderizarCards({

  containerId,
  aulas,
  extraCardHtml = null

}){

  const container =
    document.getElementById(
      containerId
    );

  /*
    Segurança
  */
  if(!container){
    return;
  }

  /*
    Busca progresso do Firestore
  */
  const progressoAulas =
    await carregarProgressoAulas();

  /*
    Debug temporário
  */
  console.log(
    "PROGRESSOS:",
    progressoAulas
  );

  let html = "";

  /*
    Percorre aulas
  */
  aulas.forEach((aula) => {

    /* =========================================
       BUSCAR PROGRESSO DA AULA
    ========================================= */

    const progresso =

      /*
        Novo padrão
      */
      progressoAulas[aula.slug] ||

      /*
        Compatibilidade
        com dados antigos
      */
      progressoAulas[aula.pasta] ||

      {};

    /* =========================================
       DADOS
    ========================================= */

    const porcentagem =

      progresso.progresso || 0;

    const respondidas =

      progresso.respondidas || 0;

    const acertos =

      progresso.acertos || 0;

    const erros =

  progresso.erros || 0;

const totalQuestoes =

  progresso.totalQuestoes ||
  aula.questoes ||
  0;

const status =

  progresso.status ||
  "nao-iniciada";

    

    /* =========================================
       STATUS
    ========================================= */

    let statusTexto =
      "Não iniciada";

    let statusClasse =
      "status-nao";

    /*
      Em andamento
    */
    if(status === "em-andamento"){

      statusTexto =
        "Em andamento";

      statusClasse =
        "status-andamento";

    }

    /*
      Concluída
    */
    if(status === "concluida"){

      statusTexto =
        "Concluída";

      statusClasse =
        "status-ok";

    }

    /* =========================================
       LINK FINAL
    ========================================= */

    const link =

      `./${aula.pasta}/${aula.arquivo}`;

    /* =========================================
   CARD
========================================= */

html += `

  <div class="card-wrapper">

    <a
      href="${link}"
      class="aula-card"
    >

      <!-- =================================
           TOPO
      ================================== -->

      <div class="aula-topo">

        <span class="aula-badge">

          ${aula.icone}
          ${aula.disciplina}

        </span>

        <h2>

          ${aula.titulo}

        </h2>

        <p>

          ${aula.descricao}

        </p>

      </div>

      <!-- =================================
           CORPO
      ================================== -->

      <div class="aula-body">

        <!-- =============================
             STATUS
        ============================== -->

        <div class="status-aula">

          <div
            class="
              status-pill
              ${statusClasse}
            "
          >

            ${statusTexto}

          </div>

          <strong>

            ${porcentagem}%

          </strong>

        </div>

        <!-- =============================
             BARRA
        ============================== -->

        <div class="barra-aula">

          <div
            class="barra-fill-aula"
            style="
              width:${porcentagem}%;
            "
          ></div>

        </div>

        <!-- =============================
             ESTATÍSTICAS
        ============================== -->

        <div class="stats-aula">

          <div class="stat-item">

            <span>
              Respondidas
            </span>

            <strong>

              ${respondidas}/${totalQuestoes}

            </strong>

          </div>

          <div class="stat-item">

            <span>
              Acertos
            </span>

            <strong>

              ${acertos}

            </strong>

          </div>

          <div class="stat-item">

            <span>
              Erros finais
            </span>

            <strong>

              ${erros}

            </strong>

          </div>

        </div>

        <!-- =============================
             INFOS
        ============================== -->

        <div class="aula-infos">

          <div class="info-box">

            <span>

              Questões

            </span>

            <strong>

              ${totalQuestoes}

            </strong>

          </div>

          <div class="info-box">

            <span>

              XP

            </span>

            <strong>

              ${aula.xp}

            </strong>

          </div>

        </div>

      </div>

    </a>

    ${extraCardHtml

      ? extraCardHtml(aula)

      : ""

    }

  </div>

`;

});

  /* =========================================
     RENDERIZA
  ========================================= */

  container.innerHTML = html;

}


/* =====================================================
   HELPERS
===================================================== */

export async function renderizarFisica1Ano(){

  /*
    CONTAINER
  */
  const container =

    document.getElementById(
      "listaAulas"
    );

  /*
    CONFIG FIRESTORE
  */
  const configRef =

    doc(

      db,

      "configuracoesbiblioteca",

      "fisica-1ano"

    );

  /*
    BUSCA CONFIGURAÇÕES
  */
  const configSnap =

    await getDoc(
      configRef
    );

  /*
    VISIBILIDADE
  */
  const visibilidade =

    configSnap.exists()

      ? configSnap.data()

      : {};

  /*
    USUÁRIO
  */
  const tipoUsuario =

  localStorage.getItem(
    "usuario"
  );

  /*
    PROFESSOR?
  */
  const ehProfessor =

  tipoUsuario ===
    "professor";
    
  /*
    FILTRA AULAS
  */
  const aulasFiltradas =

  ehProfessor

    ? AULAS_FISICA_1ANO

    : AULAS_FISICA_1ANO.filter(

        aula => {

          return visibilidade[
            aula.pasta
          ] !== false;

        }

      );

  /*
    RENDERIZA CARDS
  */
  await renderizarCards({

    containerId:
      "listaAulas",

    aulas:
      aulasFiltradas,

    extraCardHtml:

      ehProfessor

        ? (aula) => `

          <button
            class="btn-visibilidade"
            data-pasta="${aula.pasta}"
          >

            ${
              visibilidade[
                aula.pasta
              ] === false

                ? "👁️ Mostrar"

                : "🙈 Ocultar"
            }

          </button>

        `

        : null

  });

  /*
    BOTÕES
  */
  if(ehProfessor){

    const botoes =

      container.querySelectorAll(
        ".btn-visibilidade"
      );

    botoes.forEach(botao => {

      botao.addEventListener(

        "click",

        async () => {

          const pasta =

            botao.dataset.pasta;

          /*
            VALOR ATUAL
          */
          const ativo =

            visibilidade[
              pasta
            ] !== false;

          /*
            ATUALIZA FIRESTORE
          */
          await updateDoc(

            configRef,

            {

              [pasta]: !ativo

            }

          );

          /*
            RECARREGA
          */
          location.reload();

        }

      );

    });

  }

}

export async function renderizarMatematica1Ano(){

  await renderizarCards({

    containerId:
      "listaAulas",

    aulas:
      AULAS_MAT_1ANO

  });

}

export async function renderizarQuimica1Ano(){

  await renderizarCards({

    containerId:
      "listaAulas",

    aulas:
      AULAS_QUIMICA_1ANO

  });

}