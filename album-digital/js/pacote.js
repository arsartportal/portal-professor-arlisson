/* ==========================================
   PACOTES DE FIGURINHAS
========================================== */

import { FIGURINHAS }
from "./figurinhas.js";

/* ==========================================
   GERAR PACOTE
========================================== */

export function gerarPacote(
    quantidade = 2
){

    const pacote = [];

    const disponiveis =
    [...FIGURINHAS];

    while(

        pacote.length < quantidade &&
        disponiveis.length > 0

    ){

        const indice =
        Math.floor(
            Math.random() *
            disponiveis.length
        );

        pacote.push(
            disponiveis[indice]
        );

        disponiveis.splice(
            indice,
            1
        );

    }

    return pacote;

}