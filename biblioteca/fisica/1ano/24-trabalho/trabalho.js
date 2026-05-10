/* =====================================================
   IMPORTS
===================================================== */

import {

  iniciarBiblioteca

} from "../../../biblioteca.js";

/* =====================================================
   CONFIGURAÇÕES DA AULA
===================================================== */

const CONFIG = {

  /*
    ID ÚNICO
  */
  id:24,

  /*
    SLUG
  */
  slug:
    "trabalho",

  /*
    TÍTULO
  */
  titulo:
    "Trabalho de uma Força",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1000

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Em Física, trabalho representa:",

    a:[

      "Transferência de energia",

      "Somente esforço físico",

      "Ausência de movimento",

      "Apenas velocidade"

    ],

    c:0
  },

  {
    p:"Para existir trabalho mecânico é necessário:",

    a:[

      "Força e deslocamento",

      "Somente força",

      "Somente massa",

      "Somente velocidade"

    ],

    c:0
  },

  {
    p:"A fórmula do trabalho é:",

    a:[

      "τ = F · d · cos(θ)",

      "P = m · g",

      "V = d/t",

      "F = m · a"

    ],

    c:0
  },

  {
    p:"A letra τ representa:",

    a:[

      "Trabalho",

      "Tempo",

      "Temperatura",

      "Tração"

    ],

    c:0
  },

  {
    p:"A unidade do trabalho no SI é:",

    a:[

      "Joule",

      "Newton",

      "Metro",

      "Segundo"

    ],

    c:0
  },

  {
    p:"Quando força e deslocamento possuem o mesmo sentido:",

    a:[

      "O trabalho é positivo",

      "O trabalho é negativo",

      "O trabalho é nulo",

      "O trabalho desaparece"

    ],

    c:0
  },

  {
    p:"O trabalho é negativo quando:",

    a:[

      "A força se opõe ao movimento",

      "A força ajuda o movimento",

      "Não existe força",

      "Não existe massa"

    ],

    c:0
  },

  {
    p:"O atrito geralmente realiza trabalho:",

    a:[

      "Negativo",

      "Positivo",

      "Nulo",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"O trabalho é nulo quando:",

    a:[

      "A força é perpendicular ao movimento",

      "A força ajuda o movimento",

      "Há muita energia",

      "Existe velocidade"

    ],

    c:0
  },

  {
    p:"Se não houver deslocamento:",

    a:[

      "Não existe trabalho",

      "O trabalho aumenta",

      "O trabalho é positivo",

      "O trabalho é infinito"

    ],

    c:0
  },

  {
    p:"O trabalho depende do:",

    a:[

      "Ângulo entre força e movimento",

      "Somente da massa",

      "Somente da velocidade",

      "Somente do tempo"

    ],

    c:0
  },

  {
    p:"A função do cosseno na fórmula é:",

    a:[

      "Relacionar direção da força",

      "Calcular temperatura",

      "Calcular massa",

      "Eliminar forças"

    ],

    c:0
  },

  {
    p:"O trabalho modifica a:",

    a:[

      "Energia",

      "Massa",

      "Cor",

      "Luz"

    ],

    c:0
  },

  {
    p:"Ao empurrar uma caixa e movê-la:",

    a:[

      "Há trabalho mecânico",

      "Não existe força",

      "Não existe movimento",

      "Não existe energia"

    ],

    c:0
  },

  {
    p:"Quando a força ajuda o movimento:",

    a:[

      "A energia aumenta",

      "A energia desaparece",

      "O trabalho é nulo",

      "A massa diminui"

    ],

    c:0
  },

  {
    p:"Quando o atrito atua:",

    a:[

      "A energia mecânica diminui",

      "A massa aumenta",

      "O peso desaparece",

      "A velocidade é infinita"

    ],

    c:0
  },

  {
    p:"A energia transferida pelo trabalho pode virar:",

    a:[

      "Movimento",

      "Somente luz",

      "Somente calor",

      "Somente massa"

    ],

    c:0
  },

  {
    p:"A força aplicada perpendicularmente ao movimento realiza trabalho:",

    a:[

      "Nulo",

      "Positivo",

      "Negativo",

      "Infinito"

    ],

    c:0
  },

  {
    p:"A Física usa o conceito de trabalho para estudar:",

    a:[

      "Energia e movimento",

      "Somente calor",

      "Somente ondas",

      "Somente luz"

    ],

    c:0
  },

  {
    p:"A unidade Joule também mede:",

    a:[

      "Energia",

      "Velocidade",

      "Massa",

      "Tempo"

    ],

    c:0
  },

  {
    p:"O trabalho positivo aumenta:",

    a:[

      "A energia do corpo",

      "A massa",

      "A gravidade",

      "A temperatura solar"

    ],

    c:0
  },

  {
    p:"O trabalho negativo tende a:",

    a:[

      "Reduzir energia",

      "Aumentar massa",

      "Eliminar gravidade",

      "Criar luz"

    ],

    c:0
  },

  {
    p:"Empurrar uma parede sem movê-la produz:",

    a:[

      "Trabalho nulo",

      "Trabalho positivo",

      "Trabalho infinito",

      "Energia nuclear"

    ],

    c:0
  },

  {
    p:"No movimento circular uniforme, a força centrípeta realiza trabalho:",

    a:[

      "Nulo",

      "Positivo",

      "Negativo",

      "Variável"

    ],

    c:0
  },

  {
    p:"O deslocamento é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Térmica",

      "Abstrata"

    ],

    c:0
  },

  {
    p:"A força é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Numérica",

      "Térmica"

    ],

    c:0
  },

  {
    p:"O trabalho mecânico aparece em:",

    a:[

      "Máquinas e movimentos",

      "Somente laboratórios",

      "Somente planetas",

      "Somente foguetes"

    ],

    c:0
  },

  {
    p:"O trabalho está relacionado com:",

    a:[

      "Transformação de energia",

      "Ausência de força",

      "Ausência de movimento",

      "Ausência de massa"

    ],

    c:0
  },

  {
    p:"O estudo do trabalho pertence à:",

    a:[

      "Mecânica",

      "Óptica",

      "Ondulatória",

      "Termologia"

    ],

    c:0
  },

  {
    p:"Quando um corpo ganha velocidade devido a uma força:",

    a:[

      "O trabalho foi positivo",

      "O trabalho foi nulo",

      "Não existiu energia",

      "A gravidade desapareceu"

    ],

    c:0
  }

];

/* =====================================================
   INICIAR SISTEMA
===================================================== */

iniciarBiblioteca(
  CONFIG,
  QUESTOES
);

/* =====================================================
   SIMULADOR
===================================================== */

function analisarTrabalho(tipo){

  const resultado =
    document.getElementById(
      "resultadoTrabalho"
    );

  /*
    DADOS
  */
  const dados = {

    positivo:{

      titulo:
        "➕ Trabalho Positivo",

      tipo:
        "Força favorece o movimento",

      texto:
        "Quando a força atua no mesmo sentido do deslocamento, ela transfere energia ao corpo, aumentando sua velocidade."

    },

    negativo:{

      titulo:
        "➖ Trabalho Negativo",

      tipo:
        "Força contrária ao movimento",

      texto:
        "O atrito é um exemplo clássico de trabalho negativo, pois reduz a energia mecânica do corpo."

    },

    nulo:{

      titulo:
        "⚪ Trabalho Nulo",

      tipo:
        "Sem transferência de energia",

      texto:
        "Se não houver deslocamento ou se a força for perpendicular ao movimento, o trabalho realizado será nulo."

    }

  };

  /*
    ATUALIZA INTERFACE
  */
  resultado.innerHTML = `

    <div class="resultado-box">

      <h3>
        ${dados[tipo].titulo}
      </h3>

      <p>

        <strong>
          ${dados[tipo].tipo}
        </strong>

      </p>

      <p>
        ${dados[tipo].texto}
      </p>

    </div>

  `;

}

/* =====================================================
   DISPONIBILIZA GLOBALMENTE
===================================================== */

window.analisarTrabalho =
  analisarTrabalho;