/* =====================================================
   FRENTE DA AULA
   Sistema global de hero/status das aulas
===================================================== */

import { estado }
from "./estado.js";

/* =====================================================
   RENDERIZAR FRENTE
===================================================== */

export function renderizarFrenteAula(){

  const container =
    document.getElementById(
      "frenteAula"
    );

  /*
    Segurança
  */
  if(!container){
    return;
  }

  /*
    Configuração
  */
  const config =
    estado.config || {};

  /*
    Progresso
  */
  const progresso =
    estado.progressoAtual || {};

  /*
    Dados básicos
  */
  const titulo =
    config.titulo || "Aula";

  const disciplina =
    config.disciplina || "Disciplina";

  const serie =
    config.serie || "";

  const descricao =
    config.descricao ||

    "Conteúdo da aula.";

  const icone =
    config.icone || "📘";

  const xp =
    config.xp || 0;

  /*
    Dados do progresso
  */
  const porcentagem =
    progresso.progresso || 0;

  const respondidas =
    progresso.respondidas || 0;

  const total =
    progresso.totalQuestoes || 0;

  /*
    Status
  */
  let statusTexto =
    "Não iniciada";

  let statusClasse =
    "nao-iniciada";

  if(
    progresso.status ===
    "em-andamento"
  ){

    statusTexto =
      "Em andamento";

    statusClasse =
      "andamento";

  }

  if(
    progresso.status ===
    "concluida"
  ){

    statusTexto =
      "Concluída";

    statusClasse =
      "concluida";

  }

  /* =====================================================
     HTML
  ===================================================== */

  container.innerHTML = `

    <section class="frente-aula">

      <!-- =========================================
           COLUNA ESQUERDA
      ========================================== -->

      <div class="frente-esquerda">

        <span class="badge-disciplina">

          ${icone}
          ${disciplina}
          ${serie ? `• ${serie}` : ""}

        </span>

        <h1>

          ${titulo}

        </h1>

        <p>

          ${descricao}

        </p>

        <!-- =====================================
             INFORMAÇÕES
        ====================================== -->

        <div class="frente-infos">

          <div class="info-pill">

            📝
            ${total} questões

          </div>

          <div class="info-pill">

            ⭐
            ${xp} XP

          </div>

          <div class="info-pill">

            📚
            ${respondidas}/${total}
            respondidas

          </div>

        </div>

      </div>

      <!-- =========================================
           COLUNA DIREITA
      ========================================== -->

      <div class="frente-direita">

        <div class="status-card ${statusClasse}">

          <span class="status-label">

            Status da Aula

          </span>

          <h2>

            ${statusTexto}

          </h2>

          <!-- =================================
               BARRA
          ================================== -->

          <div class="status-barra">

            <div
              class="status-fill"
              style="
                width:${porcentagem}%;
              "
            ></div>

          </div>

          <p class="status-progresso">

            Progresso:
            ${porcentagem}%

          </p>

        </div>

      </div>

    </section>

  `;

}