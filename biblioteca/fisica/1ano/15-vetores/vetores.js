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
    ID único da lista
  */
  id: 15,

  /*
    Slug da aula
  */
  slug: "vetores",

  /*
    Título exibido
  */
  titulo: "Vetores",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 550

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Um vetor possui:",

    a:[

      "Módulo, direção e sentido",

      "Somente módulo",

      "Somente direção",

      "Somente sentido"

    ],

    c:0
  },

  {
    p:"Uma grandeza vetorial possui:",

    a:[

      "Direção e sentido",

      "Somente valor numérico",

      "Somente unidade",

      "Somente massa"

    ],

    c:0
  },

  {
    p:"Exemplo de grandeza vetorial:",

    a:[

      "Velocidade",

      "Massa",

      "Temperatura",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Exemplo de grandeza escalar:",

    a:[

      "Massa",

      "Força",

      "Velocidade",

      "Aceleração"

    ],

    c:0
  },

  {
    p:"O módulo do vetor representa:",

    a:[

      "Seu tamanho",

      "Seu sentido",

      "Sua direção",

      "Seu nome"

    ],

    c:0
  },

  {
    p:"A direção do vetor indica:",

    a:[

      "A orientação da reta",

      "Seu comprimento",

      "Sua velocidade",

      "Sua massa"

    ],

    c:0
  },

  {
    p:"O sentido do vetor é indicado por:",

    a:[

      "A ponta da seta",

      "A cor",

      "A massa",

      "O tempo"

    ],

    c:0
  },

  {
    p:"Vetores são representados por:",

    a:[

      "Setas",

      "Círculos",

      "Quadrados",

      "Triângulos"

    ],

    c:0
  },

  {
    p:"A soma vetorial produz:",

    a:[

      "Um vetor resultante",

      "Uma massa",

      "Uma temperatura",

      "Uma velocidade escalar"

    ],

    c:0
  },

  {
    p:"A resultante representa:",

    a:[

      "O efeito combinado dos vetores",

      "Somente o maior vetor",

      "A massa total",

      "O tempo total"

    ],

    c:0
  },

  {
    p:"A soma ponta com cauda é usada para:",

    a:[

      "Somar vetores",

      "Subtrair números",

      "Calcular massa",

      "Calcular temperatura"

    ],

    c:0
  },

  {
    p:"Subtrair vetores equivale a:",

    a:[

      "Somar o vetor oposto",

      "Eliminar os vetores",

      "Multiplicar vetores",

      "Dividir vetores"

    ],

    c:0
  },

  {
    p:"O vetor oposto possui:",

    a:[

      "Mesmo módulo e sentido contrário",

      "Mesmo sentido",

      "Módulo zero",

      "Direção diferente"

    ],

    c:0
  },

  {
    p:"A decomposição vetorial divide um vetor em:",

    a:[

      "Componentes",

      "Massas",

      "Forças elétricas",

      "Temperaturas"

    ],

    c:0
  },

  {
    p:"A componente horizontal é calculada por:",

    a:[

      "Vx = V · cosθ",

      "Vx = V · senθ",

      "Vx = gt",

      "Vx = V²"

    ],

    c:0
  },

  {
    p:"A componente vertical é calculada por:",

    a:[

      "Vy = V · senθ",

      "Vy = V · cosθ",

      "Vy = gt²",

      "Vy = V/t"

    ],

    c:0
  },

  {
    p:"O seno está associado normalmente à componente:",

    a:[

      "Vertical",

      "Horizontal",

      "Circular",

      "Nula"

    ],

    c:0
  },

  {
    p:"O cosseno está associado normalmente à componente:",

    a:[

      "Horizontal",

      "Vertical",

      "Circular",

      "Nula"

    ],

    c:0
  },

  {
    p:"Quando dois vetores são perpendiculares usamos:",

    a:[

      "Pitágoras",

      "Bhaskara",

      "Logaritmo",

      "Média"

    ],

    c:0
  },

  {
    p:"A fórmula da resultante perpendicular é:",

    a:[

      "R = √(A² + B²)",

      "R = A + B²",

      "R = A/B",

      "R = A² - B²"

    ],

    c:0
  },

  {
    p:"Vetores são muito usados em:",

    a:[

      "Física",

      "Somente literatura",

      "Somente biologia",

      "Somente artes"

    ],

    c:0
  },

  {
    p:"A velocidade é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Numérica",

      "Abstrata"

    ],

    c:0
  },

  {
    p:"A força é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Constante",

      "Térmica"

    ],

    c:0
  },

  {
    p:"A temperatura é uma grandeza:",

    a:[

      "Escalar",

      "Vetorial",

      "Direcional",

      "Vetorial horizontal"

    ],

    c:0
  },

  {
    p:"Um vetor horizontal possui direção:",

    a:[

      "Horizontal",

      "Vertical",

      "Diagonal",

      "Circular"

    ],

    c:0
  },

  {
    p:"Um vetor vertical possui direção:",

    a:[

      "Vertical",

      "Horizontal",

      "Parabólica",

      "Circular"

    ],

    c:0
  },

  {
    p:"A aceleração é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Térmica",

      "Numérica"

    ],

    c:0
  },

  {
    p:"A representação gráfica do vetor facilita:",

    a:[

      "A interpretação do movimento",

      "A mudança da massa",

      "A eliminação da força",

      "A alteração da gravidade"

    ],

    c:0
  },

  {
    p:"Vetores podem representar:",

    a:[

      "Deslocamentos",

      "Somente massas",

      "Somente tempo",

      "Somente temperatura"

    ],

    c:0
  },

  {
    p:"A Física usa vetores principalmente para:",

    a:[

      "Representar grandezas direcionais",

      "Eliminar cálculos",

      "Criar gráficos aleatórios",

      "Reduzir unidades"

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

function analisarVetores(tipo){

  const resultado =
    document.getElementById(
      "resultadoVetores"
    );

  /*
    DADOS
  */
  const dados = {

    forca:{

      titulo:
        "🏋️ Força",

      tipo:
        "Grandeza vetorial",

      texto:
        "A força precisa de intensidade, direção e sentido para ser completamente definida."

    },

    vento:{

      titulo:
        "🌪️ Vento",

      tipo:
        "Velocidade vetorial",

      texto:
        "O vento possui intensidade e direção, sendo representado por vetores em mapas meteorológicos."

    },

    foguete:{

      titulo:
        "🚀 Foguete",

      tipo:
        "Movimento vetorial",

      texto:
        "Foguetes utilizam decomposição vetorial para controle de trajetória e navegação."

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

window.analisarVetores =
  analisarVetores;