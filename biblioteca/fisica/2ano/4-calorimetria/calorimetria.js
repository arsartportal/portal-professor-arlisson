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
  id:204,

  /*
    SLUG
  */
  slug:
    "calorimetria",

  /*
    TÍTULO
  */
  titulo:
    "Calorimetria",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1400

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A calorimetria estuda:",

    a:[

      "Movimento dos corpos",

      "Trocas de calor",

      "Campos elétricos",

      "Ondas sonoras"

    ],

    c:1
  },

  {
    p:"O calor é:",

    a:[

      "Energia térmica em trânsito",

      "Temperatura",

      "Massa térmica",

      "Pressão"

    ],

    c:0
  },

  {
    p:"O calor flui naturalmente:",

    a:[

      "Do frio para o quente",

      "Do quente para o frio",

      "Somente no vácuo",

      "Sem direção"

    ],

    c:1
  },

  {
    p:"A fórmula do calor sensível é:",

    a:[

      "Q = m·L",

      "Q = m·c·ΔT",

      "F = m·a",

      "P = m·g"

    ],

    c:1
  },

  {
    p:"Na fórmula Q = m·c·ΔT, m representa:",

    a:[

      "Massa",

      "Temperatura",

      "Pressão",

      "Potência"

    ],

    c:0
  },

  {
    p:"O calor específico representa:",

    a:[

      "A quantidade de massa",

      "A força do corpo",

      "A capacidade térmica da substância",

      "A velocidade térmica"

    ],

    c:2
  },

  {
    p:"O calor latente provoca:",

    a:[

      "Mudança de estado físico",

      "Aumento da massa",

      "Mudança da gravidade",

      "Aceleração"

    ],

    c:0
  },

  {
    p:"Durante o calor latente a temperatura:",

    a:[

      "Aumenta",

      "Diminui",

      "Permanece constante",

      "Desaparece"

    ],

    c:2
  },

  {
    p:"A fórmula do calor latente é:",

    a:[

      "Q = m·L",

      "Q = m·c·ΔT",

      "E = mc²",

      "P = U·i"

    ],

    c:0
  },

  {
    p:"A unidade do calor no SI é:",

    a:[

      "Pascal",

      "Newton",

      "Joule",

      "Watt"

    ],

    c:2
  },

  {
    p:"O equilíbrio térmico ocorre quando:",

    a:[

      "As temperaturas se igualam",

      "O calor aumenta",

      "O corpo desaparece",

      "A massa dobra"

    ],

    c:0
  },

  {
    p:"Em um sistema isolado:",

    a:[

      "O calor desaparece",

      "A soma das trocas de calor é zero",

      "A temperatura sempre aumenta",

      "Não há energia"

    ],

    c:1
  },

  {
    p:"A água possui:",

    a:[

      "Baixo calor específico",

      "Calor específico elevado",

      "Sem calor específico",

      "Temperatura fixa"

    ],

    c:1
  },

  {
    p:"Quando ΔT é positivo:",

    a:[

      "O corpo aquece",

      "O corpo esfria",

      "O corpo congela",

      "Nada acontece"

    ],

    c:0
  },

  {
    p:"Quando ΔT é negativo:",

    a:[

      "O corpo aquece",

      "O corpo perde calor",

      "O corpo evapora",

      "A massa aumenta"

    ],

    c:1
  },

  {
    p:"O símbolo ΔT representa:",

    a:[

      "Velocidade",

      "Massa",

      "Variação de temperatura",

      "Volume"

    ],

    c:2
  },

  {
    p:"O calor específico é indicado pela letra:",

    a:[

      "m",

      "c",

      "Q",

      "L"

    ],

    c:1
  },

  {
    p:"A massa é indicada pela letra:",

    a:[

      "L",

      "Q",

      "ΔT",

      "m"

    ],

    c:3
  },

  {
    p:"A fusão corresponde:",

    a:[

      "Líquido para sólido",

      "Sólido para líquido",

      "Gás para líquido",

      "Gás para sólido"

    ],

    c:1
  },

  {
    p:"A vaporização corresponde:",

    a:[

      "Sólido para líquido",

      "Líquido para sólido",

      "Líquido para gás",

      "Gás para sólido"

    ],

    c:2
  },

  {
    p:"A solidificação corresponde:",

    a:[

      "Líquido para sólido",

      "Sólido para líquido",

      "Gás para líquido",

      "Líquido para gás"

    ],

    c:0
  },

  {
    p:"O calor cedido por um corpo é:",

    a:[

      "Positivo sempre",

      "Negativo no sistema",

      "Nulo",

      "Maior que infinito"

    ],

    c:1
  },

  {
    p:"O calor recebido por um corpo é:",

    a:[

      "Positivo",

      "Negativo",

      "Inexistente",

      "Constante"

    ],

    c:0
  },

  {
    p:"A quantidade de calor depende:",

    a:[

      "Da massa",

      "Do calor específico",

      "Da variação térmica",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"O calor sensível altera:",

    a:[

      "A temperatura",

      "O estado físico",

      "A massa",

      "A pressão"

    ],

    c:0
  },

  {
    p:"O calor latente altera:",

    a:[

      "A temperatura",

      "O estado físico",

      "A velocidade",

      "A gravidade"

    ],

    c:1
  },

  {
    p:"A Física que estuda calor e temperatura é:",

    a:[

      "Óptica",

      "Termologia",

      "Mecânica",

      "Astronomia"

    ],

    c:1
  },

  {
    p:"Quando dois corpos entram em contato:",

    a:[

      "O calor pode ser transferido",

      "A massa desaparece",

      "O tempo para",

      "Nada acontece"

    ],

    c:0
  },

  {
    p:"A unidade de temperatura mais usada no Brasil é:",

    a:[

      "Kelvin",

      "Fahrenheit",

      "Celsius",

      "Joule"

    ],

    c:2
  },

  {
    p:"A calorimetria possui aplicações em:",

    a:[

      "Engenharia",

      "Indústria",

      "Ciência",

      "Todas as anteriores"

    ],

    c:3
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

function analisarCalor(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    sensivel:{

      titulo:
        "🔥 Calor Sensível",

      tipo:
        "Variação de temperatura",

      texto:
        "O calor sensível altera a temperatura do corpo sem modificar seu estado físico."

    },

    latente:{

      titulo:
        "🧊 Calor Latente",

      tipo:
        "Mudança de estado físico",

      texto:
        "O calor latente provoca mudanças de estado físico mantendo a temperatura constante."

    },

    equilibrio:{

      titulo:
        "⚖️ Equilíbrio Térmico",

      tipo:
        "Trocas de calor",

      texto:
        "O equilíbrio térmico ocorre quando os corpos atingem a mesma temperatura."

    }

  };

  /*
    INTERFACE
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

window.analisarCalor =
  analisarCalor;