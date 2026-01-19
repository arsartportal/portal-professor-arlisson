/* =====================================================
   FIREBASE.JS
   -----------------------------------------------------
   Responsável por:
   - Conectar o site ao Firebase
   - Evitar repetir configuração em vários arquivos
   - Servir como base para Auth e Firestore

   NÃO faz:
   - Login
   - Controle de permissões
===================================================== */

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

/* Configuração do projeto Firebase
   Esses dados identificam APENAS o projeto */
export const firebaseConfig = {
  apiKey: "AIzaSyBQ8EQ5ftRwCGWK3maT9Vj53fOI5PR-C2c",
  authDomain: "portal-professor-arlisson.firebaseapp.com",
  projectId: "portal-professor-arlisson"
};

/* Inicializa o Firebase
   Esse app será reutilizado nos outros arquivos */
export const app = initializeApp(firebaseConfig);
