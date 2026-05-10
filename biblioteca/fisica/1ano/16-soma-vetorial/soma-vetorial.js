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
  id: 16,

  /*
    Slug da aula
  */
  slug: "soma-vetorial",

  /*
    Título exibido
  */
  titulo: "Soma Vetorial",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 600

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

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
    p:"O vetor resultante representa:",

    a:[

      "O efeito combinado dos vetores",

      "Somente o maior vetor",

      "Apenas o vetor horizontal",

      "O tempo total"

    ],

    c:0
  },

  {
    p:"A soma vetorial considera:",

    a:[

      "Módulo, direção e sentido",

      "Somente módulo",

      "Somente direção",

      "Somente sentido"

    ],

    c:0
  },

  {
    p:"No método ponta com cauda:",

    a:[

      "A ponta de um vetor liga-se à cauda do outro",

      "Os vetores ficam separados",

      "Os vetores desaparecem",

      "Os vetores ficam paralelos"

    ],

    c:0
  },

  {
    p:"A resultante liga:",

    a:[

      "O início ao final do percurso",

      "Apenas as pontas",

      "Apenas as caudas",

      "Os módulos"

    ],

    c:0
  },

  {
    p:"Quando os vetores possuem mesma direção e sentido:",

    a:[

      "Os módulos são somados",

      "Os módulos são divididos",

      "Os vetores anulam",

      "Nada acontece"

    ],

    c:0
  },

  {
    p:"Quando possuem sentidos opostos:",

    a:[

      "Os módulos são subtraídos",

      "Os módulos são multiplicados",

      "Os módulos somem",

      "Os vetores giram"

    ],

    c:0
  },

  {
    p:"O maior vetor determina:",

    a:[

      "O sentido da resultante",

      "A massa",

      "O tempo",

      "A aceleração"

    ],

    c:0
  },

  {
    p:"Vetores perpendiculares formam ângulo de:",

    a:[

      "90°",

      "45°",

      "180°",

      "0°"

    ],

    c:0
  },

  {
    p:"Para vetores perpendiculares usamos:",

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

      "R = A² - B²",

      "R = A/B"

    ],

    c:0
  },

  {
    p:"O vetor resultante substitui:",

    a:[

      "Todos os vetores envolvidos",

      "Somente um vetor",

      "Apenas os vetores horizontais",

      "Somente os verticais"

    ],

    c:0
  },

  {
    p:"A soma vetorial pode ser:",

    a:[

      "Gráfica ou matemática",

      "Somente gráfica",

      "Somente matemática",

      "Somente geométrica"

    ],

    c:0
  },

  {
    p:"A componente horizontal é representada por:",

    a:[

      "Rx",

      "Ry",

      "Rz",

      "Rt"

    ],

    c:0
  },

  {
    p:"A componente vertical é representada por:",

    a:[

      "Ry",

      "Rx",

      "Rt",

      "Rp"

    ],

    c:0
  },

  {
    p:"Na soma por componentes:",

    a:[

      "Somamos separadamente horizontal e vertical",

      "Somamos apenas módulos",

      "Ignoramos os sentidos",

      "Eliminamos os vetores"

    ],

    c:0
  },

  {
    p:"Vetores são fundamentais em:",

    a:[

      "Física",

      "Somente literatura",

      "Somente artes",

      "Somente história"

    ],

    c:0
  },

  {
    p:"A velocidade é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Constante",

      "Numérica"

    ],

    c:0
  },

  {
    p:"A força é representada por:",

    a:[

      "Vetores",

      "Escalares",

      "Temperaturas",

      "Matrizes"

    ],

    c:0
  },

  {
    p:"O deslocamento pode ser:",

    a:[

      "Vetorial",

      "Somente escalar",

      "Somente térmico",

      "Somente numérico"

    ],

    c:0
  },

  {
    p:"A soma vetorial é muito usada em:",

    a:[

      "Movimentos",

      "Somente culinária",

      "Somente música",

      "Somente pintura"

    ],

    c:0
  },

  {
    p:"A resultante depende dos:",

    a:[

      "Ângulos entre vetores",

      "Nomes dos vetores",

      "Materiais usados",

      "Temperaturas"

    ],

    c:0
  },

  {
    p:"Dois vetores iguais e opostos possuem resultante:",

    a:[

      "Zero",

      "Máxima",

      "Negativa",

      "Positiva"

    ],

    c:0
  },

  {
    p:"A soma vetorial facilita:",

    a:[

      "A análise de movimentos",

      "A eliminação da Física",

      "A mudança da gravidade",

      "A remoção de forças"

    ],

    c:0
  },

  {
    p:"O método gráfico utiliza:",

    a:[

      "Setas",

      "Somente números",

      "Tabelas térmicas",

      "Escalas de massa"

    ],

    c:0
  },

  {
    p:"A resultante é também chamada de:",

    a:[

      "Vetor equivalente",

      "Escalar equivalente",

      "Massa equivalente",

      "Tempo equivalente"

    ],

    c:0
  },

  {
    p:"Na Física os vetores ajudam a representar:",

    a:[

      "Grandezas direcionais",

      "Somente temperaturas",

      "Somente massas",

      "Somente números"

    ],

    c:0
  },

  {
    p:"A soma vetorial é importante para:",

    a:[

      "Engenharia e Física",

      "Somente literatura",

      "Somente biologia",

      "Somente música"

    ],

    c:0
  },

  {
    p:"O módulo da resultante representa:",

    a:[

      "A intensidade total",

      "A temperatura total",

      "O tempo total",

      "A massa total"

    ],

    c:0
  },

  {
    p:"Vetores podem representar:",

    a:[

      "Velocidade e força",

      "Somente massa",

      "Somente temperatura",

      "Somente densidade"

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

function analisarSoma(tipo){

  const resultado =
    document.getElementById(
      "resultadoSoma"
    );

  /*
    DADOS
  */
  const dados = {

    carro:{

      titulo:
        "🚗 Movimento do Carro",

      tipo:
        "Soma de deslocamentos",

      texto:
        "O deslocamento total do carro pode ser calculado somando os vetores de cada trecho percorrido."

    },

    vento:{

      titulo:
        "🌪️ Ação do Vento",

      tipo:
        "Velocidade vetorial",

      texto:
        "A velocidade do vento pode alterar a direção e a intensidade do movimento de aviões e barcos."

    },

    barco:{

      titulo:
        "🚤 Barco no Rio",

      tipo:
        "Correnteza e movimento",

      texto:
        "O movimento do barco resulta da soma vetorial entre sua velocidade e a correnteza do rio."

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

window.analisarSoma =
  analisarSoma;