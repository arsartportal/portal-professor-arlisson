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
  id:23,

  /*
    SLUG
  */
  slug:
    "plano-inclinado",

  /*
    TÍTULO
  */
  titulo:
    "Plano Inclinado",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:950

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"O plano inclinado é uma:",

    a:[

      "Superfície inclinada",

      "Força gravitacional",

      "Fonte de energia",

      "Grandeza escalar"

    ],

    c:0
  },

  {
    p:"O plano inclinado facilita:",

    a:[

      "A elevação de objetos",

      "A gravidade",

      "A eliminação das forças",

      "A ausência de movimento"

    ],

    c:0
  },

  {
    p:"No plano inclinado atua a força:",

    a:[

      "Peso",

      "Somente elétrica",

      "Somente magnética",

      "Somente nuclear"

    ],

    c:0
  },

  {
    p:"A força normal é:",

    a:[

      "Perpendicular ao plano",

      "Paralela ao plano",

      "Horizontal",

      "Vertical"

    ],

    c:0
  },

  {
    p:"O peso pode ser:",

    a:[

      "Decomposto em componentes",

      "Eliminado",

      "Transformado em massa",

      "Ignorado"

    ],

    c:0
  },

  {
    p:"A componente Px do peso é:",

    a:[

      "Paralela ao plano",

      "Perpendicular ao plano",

      "Vertical",

      "Horizontal"

    ],

    c:0
  },

  {
    p:"A componente Py do peso é:",

    a:[

      "Perpendicular ao plano",

      "Paralela ao plano",

      "Horizontal",

      "Diagonal"

    ],

    c:0
  },

  {
    p:"A fórmula da componente paralela é:",

    a:[

      "Px = P · sen(θ)",

      "Py = P · cos(θ)",

      "F = m · a",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"A fórmula da componente perpendicular é:",

    a:[

      "Py = P · cos(θ)",

      "Px = P · sen(θ)",

      "P = m · g",

      "E = mc²"

    ],

    c:0
  },

  {
    p:"Quanto maior o ângulo:",

    a:[

      "Maior a componente paralela",

      "Menor a componente paralela",

      "Maior a massa",

      "Menor a gravidade"

    ],

    c:0
  },

  {
    p:"Quanto maior o ângulo:",

    a:[

      "Menor a normal",

      "Maior a normal",

      "Maior a massa",

      "Maior a gravidade"

    ],

    c:0
  },

  {
    p:"O atrito no plano inclinado:",

    a:[

      "Se opõe ao movimento",

      "Aumenta o peso",

      "Elimina forças",

      "Aumenta a massa"

    ],

    c:0
  },

  {
    p:"A componente paralela tende a:",

    a:[

      "Mover o corpo",

      "Parar o corpo",

      "Eliminar o peso",

      "Anular a gravidade"

    ],

    c:0
  },

  {
    p:"A força normal depende da:",

    a:[

      "Componente perpendicular",

      "Velocidade da luz",

      "Temperatura",

      "Cor do objeto"

    ],

    c:0
  },

  {
    p:"O plano inclinado é uma máquina:",

    a:[

      "Simples",

      "Complexa",

      "Digital",

      "Virtual"

    ],

    c:0
  },

  {
    p:"Rampas de acesso utilizam:",

    a:[

      "Plano inclinado",

      "Atrito estático",

      "Ondas",

      "Eletricidade"

    ],

    c:0
  },

  {
    p:"Acessibilidade urbana utiliza:",

    a:[

      "Rampas",

      "Molas",

      "Espelhos",

      "Ímãs"

    ],

    c:0
  },

  {
    p:"O plano inclinado reduz:",

    a:[

      "A força necessária",

      "A massa",

      "A gravidade",

      "O peso"

    ],

    c:0
  },

  {
    p:"O peso aponta:",

    a:[

      "Verticalmente para baixo",

      "Para cima",

      "Paralelo ao plano",

      "Sem direção"

    ],

    c:0
  },

  {
    p:"A força normal aponta:",

    a:[

      "Perpendicular ao plano",

      "Verticalmente",

      "Horizontalmente",

      "Paralela ao peso"

    ],

    c:0
  },

  {
    p:"A Física usa o plano inclinado para estudar:",

    a:[

      "Movimentos e forças",

      "Somente calor",

      "Somente luz",

      "Somente ondas"

    ],

    c:0
  },

  {
    p:"A decomposição vetorial facilita:",

    a:[

      "Os cálculos físicos",

      "A gravidade",

      "O aumento da massa",

      "A perda de energia"

    ],

    c:0
  },

  {
    p:"O seno do ângulo aparece na:",

    a:[

      "Componente paralela",

      "Componente perpendicular",

      "Massa",

      "Velocidade"

    ],

    c:0
  },

  {
    p:"O cosseno do ângulo aparece na:",

    a:[

      "Componente perpendicular",

      "Componente paralela",

      "Energia",

      "Aceleração"

    ],

    c:0
  },

  {
    p:"Uma rampa mais inclinada possui:",

    a:[

      "Maior tendência ao deslizamento",

      "Menor tendência ao movimento",

      "Menor componente paralela",

      "Maior massa"

    ],

    c:0
  },

  {
    p:"A unidade da força é:",

    a:[

      "Newton",

      "Metro",

      "Segundo",

      "Quilograma"

    ],

    c:0
  },

  {
    p:"A força peso é calculada por:",

    a:[

      "P = m · g",

      "V = d/t",

      "F = k · x",

      "Q = m · c"

    ],

    c:0
  },

  {
    p:"O plano inclinado aparece em:",

    a:[

      "Rampas e estradas",

      "Somente laboratórios",

      "Somente foguetes",

      "Somente satélites"

    ],

    c:0
  },

  {
    p:"As forças no plano inclinado são:",

    a:[

      "Vetoriais",

      "Escalares",

      "Térmicas",

      "Numéricas"

    ],

    c:0
  },

  {
    p:"O estudo do plano inclinado pertence à:",

    a:[

      "Dinâmica",

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

function analisarPlano(tipo){

  const resultado =
    document.getElementById(
      "resultadoPlano"
    );

  /*
    DADOS
  */
  const dados = {

    leve:{

      titulo:
        "📐 Pequeno Ângulo",

      tipo:
        "Baixa inclinação",

      texto:
        "Em rampas pouco inclinadas, a componente paralela do peso é menor, dificultando o deslizamento."

    },

    medio:{

      titulo:
        "⛰️ Inclinação Média",

      tipo:
        "Equilíbrio entre forças",

      texto:
        "Com inclinação intermediária, a tendência ao movimento aumenta e o atrito passa a ser mais importante."

    },

    grande:{

      titulo:
        "🧗 Grande Inclinação",

      tipo:
        "Maior tendência ao movimento",

      texto:
        "Quanto maior o ângulo da rampa, maior a componente paralela do peso e mais fácil o corpo desliza."

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

window.analisarPlano =
  analisarPlano;