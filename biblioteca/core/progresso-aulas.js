/* =====================================================
   PROGRESSO DAS AULAS
===================================================== */

import { auth } from "../../js/firebase.js";

import {

  collection,
  getDocs

} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

import { db } from "../../js/firebase.js";

/* =====================================================
   CARREGAR TODOS OS PROGRESSOS
===================================================== */

export async function carregarProgressoAulas(){

  /*
    Usuário não autenticado
  */
  if(!auth.currentUser){

    return {};

  }

  /*
    Referência da coleção
  */
  const ref = collection(

    db,

    "usuarios",
    auth.currentUser.uid,

    "progresso_listas"

  );

  /*
    Busca documentos
  */
  const snap =
    await getDocs(ref);

  /*
    Objeto final
  */
  const dados = {};

  /*
    Percorre documentos
  */
  snap.forEach((doc) => {

    const data =
      doc.data();

    /*
      Usa o slug como chave
    */
    dados[
      data.listaSlug
    ] = data;

  });

  /*
    Retorno final
  */
  return dados;

}