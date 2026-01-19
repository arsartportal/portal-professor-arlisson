/* =====================================================
   GLOSSARIO.JS
   -----------------------------------------------------
   Executado quando a página de Glossário é aberta.

   Responsabilidade:
   ✔ Incentivar o uso do glossário
   ✔ Premiar a consulta de termos

   XP definido:
   +3 XP por acesso ao Glossário
===================================================== */

import { adicionarXP } from "./xp.js";

// Concede XP por acessar o Glossário
adicionarXP(3, "Consulta ao Glossário");
