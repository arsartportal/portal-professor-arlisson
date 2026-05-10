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
  id:26,

  /*
    SLUG
  */
  slug:
    "energia-cinetica",

  /*
    TÍTULO
  */
  titulo:
    "Energia Cinética",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1100

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Energia cinética é a energia associada:",

    a:[

      "Ao movimento",

      "À temperatura",

      "À luz",

      "Ao magnetismo"

    ],

    c:0
  },

  {
    p:"Todo corpo em movimento possui:",

    a:[

      "Energia cinética",

      "Energia nuclear",

      "Energia elétrica",

      "Energia química"

    ],

    c:0
  },

  {
    p:"A fórmula da energia cinética é:",

    a:[

      "Ec = mv²/2",

      "P = m·g",

      "V = d/t",

      "F = k·x"

    ],

    c:0
  },

  {
    p:"Na fórmula da energia cinética, m representa:",

    a:[

      "Massa",

      "Movimento",

      "Momento",

      "Módulo"

    ],

    c:0
  },

  {
    p:"Na fórmula da energia cinética, v representa:",

    a:[

      "Velocidade",

      "Volume",

      "Vácuo",

      "Vetor"

    ],

    c:0
  },

  {
    p:"A unidade da energia cinética no SI é:",

    a:[

      "Joule",

      "Newton",

      "Watt",

      "Pascal"

    ],

    c:0
  },

  {
    p:"Quanto maior a velocidade:",

    a:[

      "Maior a energia cinética",

      "Menor a energia cinética",

      "Menor a massa",

      "Maior a gravidade"

    ],

    c:0
  },

  {
    p:"A velocidade aparece na fórmula:",

    a:[

      "Elevada ao quadrado",

      "Dividida por 2",

      "Em raiz quadrada",

      "Somando a massa"

    ],

    c:0
  },

  {
    p:"Se a velocidade dobra:",

    a:[

      "A energia quadruplica",

      "A energia dobra",

      "A energia diminui",

      "Nada muda"

    ],

    c:0
  },

  {
    p:"Quanto maior a massa:",

    a:[

      "Maior a energia cinética",

      "Menor a energia",

      "Menor a velocidade",

      "Maior a gravidade"

    ],

    c:0
  },

  {
    p:"A energia cinética depende da:",

    a:[

      "Massa e velocidade",

      "Temperatura e pressão",

      "Cor e formato",

      "Luz e calor"

    ],

    c:0
  },

  {
    p:"Um carro rápido possui:",

    a:[

      "Grande energia cinética",

      "Ausência de energia",

      "Menor massa",

      "Menor movimento"

    ],

    c:0
  },

  {
    p:"A energia cinética está relacionada ao:",

    a:[

      "Movimento",

      "Repouso absoluto",

      "Ausência de força",

      "Somente calor"

    ],

    c:0
  },

  {
    p:"Quando um corpo para:",

    a:[

      "Sua energia cinética fica nula",

      "Sua energia aumenta",

      "Sua massa desaparece",

      "Sua gravidade aumenta"

    ],

    c:0
  },

  {
    p:"A energia cinética é uma grandeza:",

    a:[

      "Escalar",

      "Vetorial",

      "Magnética",

      "Circular"

    ],

    c:0
  },

  {
    p:"O Teorema Trabalho-Energia afirma que:",

    a:[

      "τ = ΔEc",

      "F = m·a",

      "P = m·g",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"O trabalho pode alterar:",

    a:[

      "A energia cinética",

      "A gravidade",

      "A temperatura solar",

      "A massa da Terra"

    ],

    c:0
  },

  {
    p:"Impactos dependem da:",

    a:[

      "Energia cinética",

      "Cor do objeto",

      "Temperatura ambiente",

      "Pressão atmosférica"

    ],

    c:0
  },

  {
    p:"Veículos pesados em alta velocidade possuem:",

    a:[

      "Grande energia cinética",

      "Pouca energia",

      "Ausência de movimento",

      "Ausência de massa"

    ],

    c:0
  },

  {
    p:"A energia cinética aparece em:",

    a:[

      "Esportes e transportes",

      "Somente laboratórios",

      "Somente foguetes",

      "Somente satélites"

    ],

    c:0
  },

  {
    p:"Uma bola chutada possui:",

    a:[

      "Energia cinética",

      "Energia nuclear",

      "Energia química apenas",

      "Ausência de energia"

    ],

    c:0
  },

  {
    p:"A energia cinética pode transformar-se em:",

    a:[

      "Outras formas de energia",

      "Massa pura",

      "Gravidade",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Freios reduzem:",

    a:[

      "A energia cinética",

      "A massa do carro",

      "A gravidade",

      "A força peso"

    ],

    c:0
  },

  {
    p:"A energia cinética aumenta quando:",

    a:[

      "A velocidade aumenta",

      "O movimento para",

      "A massa desaparece",

      "A força some"

    ],

    c:0
  },

  {
    p:"Um avião em voo possui:",

    a:[

      "Energia cinética",

      "Ausência de energia",

      "Somente energia potencial",

      "Somente energia química"

    ],

    c:0
  },

  {
    p:"A Física utiliza energia cinética para estudar:",

    a:[

      "Movimentos e impactos",

      "Somente luz",

      "Somente ondas",

      "Somente temperatura"

    ],

    c:0
  },

  {
    p:"A velocidade influencia a energia cinética:",

    a:[

      "Muito fortemente",

      "Muito pouco",

      "De forma nula",

      "Sem relação"

    ],

    c:0
  },

  {
    p:"A energia cinética é máxima quando:",

    a:[

      "A velocidade é máxima",

      "O corpo está parado",

      "A força é nula",

      "A massa é zero"

    ],

    c:0
  },

  {
    p:"A energia cinética pertence ao estudo da:",

    a:[

      "Mecânica",

      "Óptica",

      "Termologia",

      "Ondulatória"

    ],

    c:0
  },

  {
    p:"Corpos rápidos tendem a produzir:",

    a:[

      "Impactos maiores",

      "Menor energia",

      "Menor movimento",

      "Ausência de força"

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

function analisarCinetica(tipo){

  const resultado =
    document.getElementById(
      "resultadoCinetica"
    );

  /*
    DADOS
  */
  const dados = {

    leve:{

      titulo:
        "🪶 Corpo Leve",

      tipo:
        "Menor massa",

      texto:
        "Corpos leves possuem menor energia cinética quando comparados a corpos mais pesados na mesma velocidade."

    },

    rapido:{

      titulo:
        "🏎️ Alta Velocidade",

      tipo:
        "Grande energia",

      texto:
        "A velocidade influencia muito a energia cinética, pois aparece elevada ao quadrado na fórmula."

    },

    pesado:{

      titulo:
        "🚚 Corpo Pesado",

      tipo:
        "Maior massa",

      texto:
        "Corpos muito massivos podem possuir enorme energia cinética, principalmente em altas velocidades."

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

window.analisarCinetica =
  analisarCinetica;