/* ==========================================
ÁLBUM NOBEL DA FÍSICA
========================================== */

document.addEventListener(
"DOMContentLoaded",
() => {

 
    carregarAlbum();

    configurarTooltips();

}
 

);

/* ==========================================
DADOS DO ALUNO
========================================== */

/*
Futuramente virá do Firebase

Exemplo:

const albumAluno = [
"curie",
"einstein"
];
*/

const albumAluno = [

 
"curie",
"planck",
"einstein",
"bohr"
 

];

/* ==========================================
CIENTISTAS
========================================== */

const cientistas = [

 
"curie",
"planck",
"einstein",
"bohr"
 

];

/* ==========================================
CARREGAR ÁLBUM
========================================== */

function carregarAlbum(){

 
cientistas.forEach(

    cientista => {

        if(
            !albumAluno.includes(
                cientista
            )
        ){

            mostrarEspacoVazio(
                `slot-${cientista}`
            );

        }

    }

);

atualizarProgresso();
 

}

/* ==========================================
ESPAÇO VAZIO
========================================== */

function mostrarEspacoVazio(
slotId
){

 
const slot =
document.getElementById(
    slotId
);

if(!slot) return;

slot.classList.add(
    "vazio"
);

slot.innerHTML = `

    <span class="interrogacao">
        ?
    </span>

`;
 

}

/* ==========================================
PROGRESSO
========================================== */

function atualizarProgresso(){

 
const total =
cientistas.length;

const obtidas =
albumAluno.length;

const percentual =
Math.round(
    (obtidas / total) * 100
);

const totalEl =
document.querySelector(
    ".progresso-total"
);

const percentualEl =
document.querySelector(
    ".progresso-percentual"
);

if(totalEl){

    totalEl.textContent =
    `${obtidas}/${total}`;

}

if(percentualEl){

    percentualEl.textContent =
    `${percentual}%`;

}
 

}

/* ==========================================
TOOLTIP MOBILE
========================================== */

function configurarTooltips(){

 
const slots =
document.querySelectorAll(
    ".slot"
);

slots.forEach(

    slot => {

        slot.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();

                const ativo =
                slot.classList.contains(
                    "ativo"
                );

                document
                    .querySelectorAll(
                        ".slot"
                    )
                    .forEach(

                        item => {

                            item.classList.remove(
                                "ativo"
                            );

                        }

                    );

                if(!ativo){

                    slot.classList.add(
                        "ativo"
                    );

                }

            }

        );

    }

);
 

}

/* ==========================================
FECHAR TOOLTIP
========================================== */

document.addEventListener(
"click",
() => {

 
    document
        .querySelectorAll(
            ".slot"
        )
        .forEach(

            slot => {

                slot.classList.remove(
                    "ativo"
                );

            }

        );

}
 

);
