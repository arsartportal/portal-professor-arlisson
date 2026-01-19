/* =====================================================
   MATEMATICA.JS
   -----------------------------------------------------
   Executado quando a página de Matemática é aberta.

   Responsabilidade:
   ✔ Registrar acesso à disciplina de Matemática
   ✔ Conceder XP ao aluno

   XP definido:
   +5 XP por acesso à Matemática
===================================================== */

import { adicionarXP } from "./xp.js";

// Concede XP por acessar Matemática
adicionarXP(5, "Acesso à Matemática");
