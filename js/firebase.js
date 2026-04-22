/* =====================================================
   FIREBASE.JS
===================================================== */

import { initializeApp } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";

import { getAuth } from
"https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

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

/* 🔐 AUTH */
export const auth = getAuth(app);

/* 🔥 FIRESTORE */
export const db = getFirestore(app);
