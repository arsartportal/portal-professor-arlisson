import { auth } from "../js/firebase.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { estado } from "./core/estado.js";

import {
  carregarProgresso,
  salvarProgresso
} from "./core/progresso.js";

import {
  atualizarPainelProgresso,
  carregarQuestoes
} from "./core/ui.js";

import {
  receberRecompensa
} from "./core/recompensas.js";

/* =====================================================
   INICIAR BIBLIOTECA
===================================================== */
export async function iniciarBiblioteca(config, questoes){

  estado.config = config;
  estado.questoes = questoes;

  const statusLogin = document.getElementById("statusLogin");

  onAuthStateChanged(auth, async (user) => {

    if(!user){

      statusLogin.textContent =
        "Aluno não autenticado. Faça login para salvar o progresso.";

      return;
    }

    estado.alunoUid = user.uid;

    await carregarProgresso();

    atualizarPainelProgresso();

    carregarQuestoes();

    statusLogin.textContent =
      "Progresso carregado com sucesso.";

    setTimeout(() => {
      statusLogin.style.display = "none";
    }, 1800);

  });

}

/* =====================================================
   FUNÇÕES GLOBAIS
===================================================== */

window.receberRecompensa = receberRecompensa;