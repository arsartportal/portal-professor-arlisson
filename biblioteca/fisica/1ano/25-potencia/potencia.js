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
  id:25,

  /*
    SLUG
  */
  slug:
    "potencia",

  /*
    TÍTULO
  */
  titulo:
    "Potência Mecânica",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1050

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Potência representa:",

    a:[

      "Rapidez da realização do trabalho",

      "Quantidade de massa",

      "Ausência de energia",

      "Somente velocidade"

    ],

    c:0
  },

  {
    p:"A fórmula da potência média é:",

    a:[

      "P = τ/Δt",

      "P = m·g",

      "V = d/t",

      "F = m·a"

    ],

    c:0
  },

  {
    p:"A unidade da potência no SI é:",

    a:[

      "Watt",

      "Joule",

      "Newton",

      "Pascal"

    ],

    c:0
  },

  {
    p:"O símbolo da potência é:",

    a:[

      "P",

      "T",

      "V",

      "E"

    ],

    c:0
  },

  {
    p:"O símbolo do trabalho é:",

    a:[

      "τ",

      "m",

      "g",

      "x"

    ],

    c:0
  },

  {
    p:"Quanto menor o tempo para realizar um trabalho:",

    a:[

      "Maior a potência",

      "Menor a potência",

      "Maior a massa",

      "Menor a energia"

    ],

    c:0
  },

  {
    p:"Motores mais potentes:",

    a:[

      "Realizam trabalho mais rapidamente",

      "Possuem menos energia",

      "Eliminam forças",

      "Não usam combustível"

    ],

    c:0
  },

  {
    p:"A potência instantânea pode ser calculada por:",

    a:[

      "P = F·v",

      "P = m·g",

      "P = d/t",

      "P = v²"

    ],

    c:0
  },

  {
    p:"Na fórmula P = F·v, v representa:",

    a:[

      "Velocidade",

      "Volume",

      "Vetor",

      "Vácuo"

    ],

    c:0
  },

  {
    p:"Na fórmula P = F·v, F representa:",

    a:[

      "Força",

      "Frequência",

      "Fóton",

      "Fluxo"

    ],

    c:0
  },

  {
    p:"A potência está relacionada com:",

    a:[

      "Transferência de energia",

      "Temperatura do Sol",

      "Quantidade de luz",

      "Ausência de força"

    ],

    c:0
  },

  {
    p:"A unidade Watt equivale a:",

    a:[

      "Joule por segundo",

      "Newton por metro",

      "Metro por segundo",

      "Quilograma por segundo"

    ],

    c:0
  },

  {
    p:"Um equipamento de maior potência:",

    a:[

      "Transfere energia mais rapidamente",

      "Possui menos energia",

      "Tem menor velocidade",

      "Não realiza trabalho"

    ],

    c:0
  },

  {
    p:"A potência mecânica aparece em:",

    a:[

      "Motores e máquinas",

      "Somente laboratórios",

      "Somente foguetes",

      "Somente satélites"

    ],

    c:0
  },

  {
    p:"A potência depende do:",

    a:[

      "Tempo",

      "Somente da massa",

      "Somente da gravidade",

      "Somente da cor"

    ],

    c:0
  },

  {
    p:"Quanto maior o trabalho realizado no mesmo tempo:",

    a:[

      "Maior a potência",

      "Menor a potência",

      "Menor a energia",

      "Maior a massa"

    ],

    c:0
  },

  {
    p:"O Watt recebeu esse nome em homenagem a:",

    a:[

      "James Watt",

      "Isaac Newton",

      "Galileu Galilei",

      "Nikola Tesla"

    ],

    c:0
  },

  {
    p:"A potência elétrica também é medida em:",

    a:[

      "Watt",

      "Newton",

      "Pascal",

      "Metro"

    ],

    c:0
  },

  {
    p:"Um carro esportivo geralmente possui:",

    a:[

      "Maior potência",

      "Menor potência",

      "Menor energia",

      "Ausência de força"

    ],

    c:0
  },

  {
    p:"A potência influencia:",

    a:[

      "A rapidez das máquinas",

      "A massa dos corpos",

      "A gravidade da Terra",

      "A temperatura solar"

    ],

    c:0
  },

  {
    p:"A potência instantânea depende da:",

    a:[

      "Força e velocidade",

      "Temperatura e pressão",

      "Massa e volume",

      "Cor e luz"

    ],

    c:0
  },

  {
    p:"A Física utiliza potência para estudar:",

    a:[

      "Energia e desempenho",

      "Somente calor",

      "Somente ondas",

      "Somente óptica"

    ],

    c:0
  },

  {
    p:"A potência pode aumentar quando:",

    a:[

      "A velocidade aumenta",

      "A massa desaparece",

      "O trabalho diminui",

      "A força some"

    ],

    c:0
  },

  {
    p:"A potência é uma grandeza:",

    a:[

      "Escalar",

      "Vetorial",

      "Circular",

      "Magnética"

    ],

    c:0
  },

  {
    p:"A energia transferida rapidamente indica:",

    a:[

      "Alta potência",

      "Baixa potência",

      "Ausência de força",

      "Ausência de trabalho"

    ],

    c:0
  },

  {
    p:"Um foguete precisa de:",

    a:[

      "Alta potência",

      "Baixa potência",

      "Ausência de energia",

      "Ausência de velocidade"

    ],

    c:0
  },

  {
    p:"A potência está relacionada ao:",

    a:[

      "Desempenho",

      "Formato do objeto",

      "Tamanho da sala",

      "Tipo de cor"

    ],

    c:0
  },

  {
    p:"A potência média considera:",

    a:[

      "Intervalo de tempo",

      "Somente velocidade",

      "Somente massa",

      "Somente gravidade"

    ],

    c:0
  },

  {
    p:"Quanto maior a potência de um motor:",

    a:[

      "Mais rápido ele realiza trabalho",

      "Menor sua energia",

      "Menor sua força",

      "Maior sua massa"

    ],

    c:0
  },

  {
    p:"O estudo da potência pertence à:",

    a:[

      "Mecânica",

      "Óptica",

      "Termologia",

      "Ondulatória"

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

function analisarPotencia(tipo){

  const resultado =
    document.getElementById(
      "resultadoPotencia"
    );

  /*
    DADOS
  */
  const dados = {

    baixa:{

      titulo:
        "🐢 Baixa Potência",

      tipo:
        "Transferência lenta de energia",

      texto:
        "Máquinas com baixa potência realizam trabalho mais lentamente e possuem menor desempenho."

    },

    media:{

      titulo:
        "🚗 Potência Média",

      tipo:
        "Desempenho equilibrado",

      texto:
        "Motores médios conseguem realizar trabalho de forma eficiente em diversas situações do cotidiano."

    },

    alta:{

      titulo:
        "🚀 Alta Potência",

      tipo:
        "Grande rapidez de trabalho",

      texto:
        "Motores de alta potência transferem muita energia rapidamente, produzindo acelerações intensas."

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

window.analisarPotencia =
  analisarPotencia;