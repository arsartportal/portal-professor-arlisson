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
  id:404,

  /*
    SLUG
  */
  slug:
    "campo-eletrico",

  /*
    TÍTULO
  */
  titulo:
    "Campo Elétrico",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1500

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Campo elétrico é:",

    a:[

      "Uma força mecânica",

      "Uma região de influência elétrica",

      "Uma onda sonora",

      "Um tipo de calor"

    ],

    c:1
  },

  {
    p:"O campo elétrico é representado pela letra:",

    a:[

      "F",

      "Q",

      "E",

      "P"

    ],

    c:2
  },

  {
    p:"A fórmula do campo elétrico é:",

    a:[

      "E = F/q",

      "F = m·a",

      "Q = n·e",

      "P = U·i"

    ],

    c:0
  },

  {
    p:"O campo elétrico depende da:",

    a:[

      "Força elétrica e carga",

      "Temperatura",

      "Velocidade",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A unidade do campo elétrico é:",

    a:[

      "N/C",

      "J",

      "W",

      "Pa"

    ],

    c:0
  },

  {
    p:"O campo elétrico de uma carga positiva:",

    a:[

      "Aponta para a carga",

      "Sai da carga",

      "Desaparece",

      "É nulo"

    ],

    c:1
  },

  {
    p:"O campo elétrico de uma carga negativa:",

    a:[

      "Sai da carga",

      "É circular",

      "Entra na carga",

      "Não existe"

    ],

    c:2
  },

  {
    p:"As linhas de campo elétrico representam:",

    a:[

      "Temperatura",

      "Movimento",

      "Direção e sentido do campo",

      "Pressão"

    ],

    c:2
  },

  {
    p:"As linhas de campo nunca:",

    a:[

      "Se cruzam",

      "Existem",

      "Mudam",

      "Aumentam"

    ],

    c:0
  },

  {
    p:"A intensidade do campo elétrico aumenta quando:",

    a:[

      "A distância aumenta",

      "A carga geradora aumenta",

      "O tempo passa",

      "A massa diminui"

    ],

    c:1
  },

  {
    p:"A intensidade do campo elétrico diminui quando:",

    a:[

      "A distância aumenta",

      "A carga aumenta",

      "As cargas se aproximam",

      "O campo cresce"

    ],

    c:0
  },

  {
    p:"O campo elétrico gerado por uma carga puntiforme é dado por:",

    a:[

      "E = k·|Q|/d²",

      "F = m·a",

      "P = U·i",

      "Q = n·e"

    ],

    c:0
  },

  {
    p:"A constante k é chamada de:",

    a:[

      "Constante sonora",

      "Constante térmica",

      "Constante eletrostática",

      "Constante gravitacional"

    ],

    c:2
  },

  {
    p:"Uma carga colocada em um campo elétrico sofre:",

    a:[

      "Calor",

      "Força elétrica",

      "Pressão",

      "Refração"

    ],

    c:1
  },

  {
    p:"A relação entre força e campo elétrico é:",

    a:[

      "F = q·E",

      "E = m·a",

      "Q = F·t",

      "P = U·i"

    ],

    c:0
  },

  {
    p:"O campo elétrico é uma grandeza:",

    a:[

      "Escalar",

      "Vetorial",

      "Linear",

      "Térmica"

    ],

    c:1
  },

  {
    p:"O sentido do campo elétrico é definido pelo movimento de uma:",

    a:[

      "Carga positiva de prova",

      "Carga negativa",

      "Massa",

      "Onda"

    ],

    c:0
  },

  {
    p:"Quanto mais próximas as linhas de campo:",

    a:[

      "Menor o campo",

      "Maior o campo",

      "Campo inexistente",

      "Campo neutro"

    ],

    c:1
  },

  {
    p:"As linhas de campo saem de cargas:",

    a:[

      "Negativas",

      "Neutras",

      "Positivas",

      "Metálicas"

    ],

    c:2
  },

  {
    p:"As linhas de campo entram em cargas:",

    a:[

      "Positivas",

      "Negativas",

      "Neutras",

      "Térmicas"

    ],

    c:1
  },

  {
    p:"O campo elétrico existe ao redor de:",

    a:[

      "Massas",

      "Temperaturas",

      "Cargas elétricas",

      "Espelhos"

    ],

    c:2
  },

  {
    p:"A unidade da força elétrica é:",

    a:[

      "Newton",

      "Joule",

      "Pascal",

      "Volt"

    ],

    c:0
  },

  {
    p:"Campo elétrico faz parte da:",

    a:[

      "Óptica",

      "Acústica",

      "Eletrostática",

      "Termologia"

    ],

    c:2
  },

  {
    p:"O campo elétrico pode ser representado por:",

    a:[

      "Linhas de campo",

      "Som",

      "Espelhos",

      "Lentes"

    ],

    c:0
  },

  {
    p:"Uma carga negativa colocada no campo elétrico tende a:",

    a:[

      "Mover-se no sentido do campo",

      "Mover-se no sentido contrário",

      "Ficar parada sempre",

      "Explodir"

    ],

    c:1
  },

  {
    p:"A intensidade do campo depende da distância:",

    a:[

      "Diretamente",

      "Inversamente",

      "Linearmente",

      "Igualmente"

    ],

    c:1
  },

  {
    p:"O campo elétrico pode existir no vácuo:",

    a:[

      "Sim",

      "Não",

      "Somente na água",

      "Somente no ar"

    ],

    c:0
  },

  {
    p:"As linhas de campo indicam:",

    a:[

      "Temperatura",

      "Direção da força elétrica",

      "Calor",

      "Massa"

    ],

    c:1
  },

  {
    p:"A carga geradora do campo é normalmente representada por:",

    a:[

      "Q",

      "m",

      "t",

      "v"

    ],

    c:0
  },

  {
    p:"O campo elétrico é mais intenso próximo da:",

    a:[

      "Distância máxima",

      "Carga elétrica",

      "Temperatura",

      "Pressão"

    ],

    c:1
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

function analisarCampo(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    positivo:{

      titulo:
        "➕ Campo Positivo",

      tipo:
        "Linhas saindo da carga",

      texto:
        "As linhas de campo elétrico de uma carga positiva saem da carga em todas as direções."

    },

    negativo:{

      titulo:
        "➖ Campo Negativo",

      tipo:
        "Linhas entrando na carga",

      texto:
        "As linhas de campo elétrico de uma carga negativa apontam em direção à carga."

    },

    linhas:{

      titulo:
        "🌐 Linhas de Campo",

      tipo:
        "Representação do campo",

      texto:
        "As linhas de campo mostram a direção e o sentido da força elétrica produzida pelas cargas."

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

window.analisarCampo =
  analisarCampo;