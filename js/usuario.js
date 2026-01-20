/* =====================================================
   USUARIO.JS (FIREBASE – TEMPO REAL)
===================================================== */

import {
  getFirestore,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-auth.js";

import { app } from "./firebase.js";

const db = getFirestore(app);
const auth = getAuth(app);

export function observarUsuario(callback) {

  onAuthStateChanged(auth, (user) => {

    if (!user) return;

    const ref = doc(db, "usuarios", user.uid);

    onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        callback(snap.data());
      }
    });

  });

}
