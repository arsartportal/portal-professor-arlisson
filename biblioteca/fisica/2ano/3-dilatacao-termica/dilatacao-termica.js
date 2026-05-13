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
  id:203,

  /*
    SLUG
  */
  slug:
    "dilatacao-termica",

  /*
    TÍTULO
  */
  titulo:
    "Dilatação Térmica",

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
    p:"Dilatação térmica é:",

    a:[

      "A diminuição da massa",

      "O aumento das dimensões devido ao aquecimento",

      "A mudança de cor",

      "A perda de energia"

    ],

    c:1
  },

  {
    p:"A dilatação ocorre devido:",

    a:[

      "À diminuição da pressão",

      "Ao aumento da agitação molecular",

      "À força gravitacional",

      "Ao atrito"

    ],

    c:1
  },

  {
    p:"A dilatação linear ocorre principalmente em:",

    a:[

      "Barras e fios",

      "Líquidos",

      "Gases",

      "Cubos"

    ],

    c:0
  },

  {
    p:"Na fórmula ΔL = L₀·α·ΔT, α representa:",

    a:[

      "Temperatura",

      "Coeficiente de dilatação linear",

      "Área",

      "Volume"

    ],

    c:1
  },

  {
    p:"Quando a temperatura aumenta um corpo geralmente:",

    a:[

      "Se contrai",

      "Desaparece",

      "Se dilata",

      "Perde massa"

    ],

    c:2
  },

  {
    p:"A dilatação superficial está relacionada ao aumento da:",

    a:[

      "Massa",

      "Área",

      "Velocidade",

      "Pressão"

    ],

    c:1
  },

  {
    p:"A fórmula da dilatação superficial é:",

    a:[

      "ΔA = A₀·β·ΔT",

      "ΔV = V₀·γ·ΔT",

      "F = m·a",

      "Q = m·c·ΔT"

    ],

    c:0
  },

  {
    p:"A dilatação volumétrica corresponde ao aumento do:",

    a:[

      "Comprimento",

      "Peso",

      "Volume",

      "Tempo"

    ],

    c:2
  },

  {
    p:"Na fórmula ΔV = V₀·γ·ΔT, γ representa:",

    a:[

      "Coeficiente volumétrico",

      "Velocidade",

      "Área",

      "Massa"

    ],

    c:0
  },

  {
    p:"Os trilhos de trem possuem espaços entre eles porque:",

    a:[

      "Diminuem a massa",

      "Permitem dilatação térmica",

      "Melhoram a velocidade",

      "Decoram os trilhos"

    ],

    c:1
  },

  {
    p:"Pontes metálicas precisam de juntas de dilatação para:",

    a:[

      "Evitar deformações",

      "Aumentar o peso",

      "Diminuir a temperatura",

      "Reduzir a gravidade"

    ],

    c:0
  },

  {
    p:"A dilatação térmica depende principalmente:",

    a:[

      "Da temperatura",

      "Da cor",

      "Da velocidade da luz",

      "Da pressão sonora"

    ],

    c:0
  },

  {
    p:"Cada material possui:",

    a:[

      "Mesmo coeficiente",

      "Coeficiente de dilatação próprio",

      "Temperatura fixa",

      "Mesmo volume"

    ],

    c:1
  },

  {
    p:"Ao resfriar um corpo geralmente ocorre:",

    a:[

      "Dilatação",

      "Contração térmica",

      "Fusão",

      "Ebulição"

    ],

    c:1
  },

  {
    p:"A contração térmica corresponde:",

    a:[

      "Ao aumento das dimensões",

      "À diminuição das dimensões",

      "Ao aumento da massa",

      "Ao desaparecimento do corpo"

    ],

    c:1
  },

  {
    p:"Fios elétricos ficam mais esticados em dias frios porque:",

    a:[

      "Ocorre contração",

      "Ocorre fusão",

      "Ocorre evaporação",

      "Ocorre expansão nuclear"

    ],

    c:0
  },

  {
    p:"O coeficiente linear é indicado pela letra:",

    a:[

      "β",

      "γ",

      "α",

      "λ"

    ],

    c:2
  },

  {
    p:"A relação entre os coeficientes é:",

    a:[

      "α > β > γ",

      "α < β < γ",

      "α = β = γ",

      "γ < α"

    ],

    c:1
  },

  {
    p:"A dilatação térmica ocorre devido à:",

    a:[

      "Energia térmica",

      "Energia nuclear",

      "Energia elétrica apenas",

      "Energia sonora"

    ],

    c:0
  },

  {
    p:"A unidade da variação de temperatura pode ser:",

    a:[

      "°C",

      "m",

      "kg",

      "N"

    ],

    c:0
  },

  {
    p:"O comprimento inicial é representado por:",

    a:[

      "ΔL",

      "L₀",

      "T",

      "Q"

    ],

    c:1
  },

  {
    p:"A dilatação volumétrica ocorre em:",

    a:[

      "Três dimensões",

      "Uma dimensão",

      "Somente superfícies",

      "Somente fios"

    ],

    c:0
  },

  {
    p:"O aquecimento aumenta:",

    a:[

      "A agitação das partículas",

      "A gravidade",

      "A massa do corpo",

      "O tempo"

    ],

    c:0
  },

  {
    p:"Os líquidos também podem:",

    a:[

      "Dilatar",

      "Desaparecer",

      "Congelar sempre",

      "Perder massa"

    ],

    c:0
  },

  {
    p:"A dilatação dos gases geralmente é:",

    a:[

      "Muito pequena",

      "Maior que nos sólidos",

      "Inexistente",

      "Negativa"

    ],

    c:1
  },

  {
    p:"A unidade do comprimento pode ser:",

    a:[

      "m",

      "kg",

      "s",

      "N"

    ],

    c:0
  },

  {
    p:"A dilatação superficial envolve:",

    a:[

      "Duas dimensões",

      "Uma dimensão",

      "Três dimensões",

      "Nenhuma dimensão"

    ],

    c:0
  },

  {
    p:"Ao aquecer uma tampa metálica ela:",

    a:[

      "Pode dilatar e facilitar abertura",

      "Diminui",

      "Perde massa",

      "Congela"

    ],

    c:0
  },

  {
    p:"A Física que estuda calor e temperatura é:",

    a:[

      "Óptica",

      "Termologia",

      "Eletrostática",

      "Mecânica"

    ],

    c:1
  },

  {
    p:"A dilatação térmica possui aplicações em:",

    a:[

      "Engenharia",

      "Construção",

      "Tecnologia",

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

function analisarDilatacao(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    linear:{

      titulo:
        "📏 Dilatação Linear",

      tipo:
        "Uma dimensão",

      texto:
        "A dilatação linear ocorre principalmente em barras, trilhos e fios metálicos."

    },

    superficial:{

      titulo:
        "🧱 Dilatação Superficial",

      tipo:
        "Duas dimensões",

      texto:
        "A dilatação superficial provoca aumento da área de chapas e superfícies."

    },

    volumetrica:{

      titulo:
        "📦 Dilatação Volumétrica",

      tipo:
        "Três dimensões",

      texto:
        "A dilatação volumétrica corresponde ao aumento do volume total do corpo."

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

window.analisarDilatacao =
  analisarDilatacao;