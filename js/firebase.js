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

import { getFirestore } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

/* Configuração do projeto Firebase */
export const firebaseConfig = {
  apiKey: "AIzaSyBQ8EQ5ftRwCGWK3maT9Vj53fOI5PR-C2c",
  authDomain: "portal-professor-arlisson.firebaseapp.com",
  projectId: "portal-professor-arlisson"
};

/* Inicializa o Firebase */
export const app = initializeApp(firebaseConfig);

/* 🔥 EXPORTA O FIRESTORE */
export const db = getFirestore(app);
