/* =====================================================
   FISICA.JS
   -----------------------------------------------------
   Executado quando a página de Física é aberta.

   Responsabilidade:
   ✔ Registrar acesso à disciplina de Física
   ✔ Conceder XP ao aluno de forma automática

   XP definido:
   +5 XP por acesso à Física
===================================================== */

import { adicionarXP } from "./xp.js";

/*
  Ao carregar este arquivo:
  - o usuário já está autenticado
  - o auth-guard já permitiu o acesso
  - podemos registrar a ação com segurança
*/

// Concede XP por acessar Física
adicionarXP(5, "Acesso à Física");
