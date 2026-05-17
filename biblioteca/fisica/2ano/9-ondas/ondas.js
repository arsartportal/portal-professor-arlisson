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
  id:209,

  /*
    SLUG
  */
  slug:
    "ondas",

  /*
    TÍTULO
  */
  titulo:
    "Ondas",

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
    p:"Ondas são:",

    a:[

      "Formas de matéria",

      "Perturbações que transportam energia",

      "Somente partículas",

      "Tipos de força"

    ],

    c:1
  },

  {
    p:"As ondas transportam:",

    a:[

      "Matéria",

      "Somente massa",

      "Energia",

      "Gravidade"

    ],

    c:2
  },

  {
    p:"A fórmula fundamental das ondas é:",

    a:[

      "F = m·a",

      "v = λ·f",

      "Q = m·c·ΔT",

      "P = U·i"

    ],

    c:1
  },

  {
    p:"Na fórmula v = λ·f, λ representa:",

    a:[

      "Velocidade",

      "Frequência",

      "Comprimento de onda",

      "Amplitude"

    ],

    c:2
  },

  {
    p:"A frequência de uma onda indica:",

    a:[

      "Número de oscilações por segundo",

      "Sua massa",

      "Seu volume",

      "Sua cor"

    ],

    c:0
  },

  {
    p:"A unidade da frequência no SI é:",

    a:[

      "Joule",

      "Pascal",

      "Hertz",

      "Newton"

    ],

    c:2
  },

  {
    p:"Ondas mecânicas precisam de:",

    a:[

      "Vácuo",

      "Campo elétrico",

      "Meio material",

      "Luz"

    ],

    c:2
  },

  {
    p:"Exemplo de onda mecânica:",

    a:[

      "Luz",

      "Ondas sonoras",

      "Raio X",

      "Micro-ondas"

    ],

    c:1
  },

  {
    p:"Ondas eletromagnéticas podem se propagar:",

    a:[

      "Somente em líquidos",

      "Somente em sólidos",

      "No vácuo",

      "Somente no ar"

    ],

    c:2
  },

  {
    p:"A luz é uma onda:",

    a:[

      "Mecânica",

      "Longitudinal",

      "Eletromagnética",

      "Gravitacional"

    ],

    c:2
  },

  {
    p:"O som é uma onda:",

    a:[

      "Eletromagnética",

      "Mecânica",

      "Luminosa",

      "Nuclear"

    ],

    c:1
  },

  {
    p:"Ondas transversais vibram:",

    a:[

      "Na mesma direção da propagação",

      "Perpendicularmente à propagação",

      "Sem direção",

      "Em espiral"

    ],

    c:1
  },

  {
    p:"Ondas longitudinais vibram:",

    a:[

      "Perpendicularmente à propagação",

      "No vácuo",

      "Na mesma direção da propagação",

      "Sem frequência"

    ],

    c:2
  },

  {
    p:"A velocidade da onda depende:",

    a:[

      "Do meio de propagação",

      "Da massa da Terra",

      "Do formato da onda",

      "Do tempo"

    ],

    c:0
  },

  {
    p:"Reflexão ocorre quando a onda:",

    a:[

      "Muda de direção ao atingir obstáculo",

      "Desaparece",

      "Perde energia totalmente",

      "Para de vibrar"

    ],

    c:0
  },

  {
    p:"Refração ocorre quando a onda:",

    a:[

      "Muda de meio",

      "É destruída",

      "Para de existir",

      "Vira matéria"

    ],

    c:0
  },

  {
    p:"Interferência acontece quando:",

    a:[

      "Ondas se encontram",

      "O som desaparece",

      "Há gravidade",

      "Há magnetismo"

    ],

    c:0
  },

  {
    p:"A amplitude de uma onda está relacionada:",

    a:[

      "À energia transportada",

      "À velocidade da luz",

      "À gravidade",

      "À massa"

    ],

    c:0
  },

  {
    p:"Quanto maior a frequência:",

    a:[

      "Menor o período",

      "Maior o período",

      "Menor a velocidade",

      "Maior a massa"

    ],

    c:0
  },

  {
    p:"O período é:",

    a:[

      "O tempo de uma oscilação",

      "A velocidade da onda",

      "A altura da onda",

      "A energia da onda"

    ],

    c:0
  },

  {
    p:"A unidade do período no SI é:",

    a:[

      "Segundo",

      "Metro",

      "Hertz",

      "Joule"

    ],

    c:0
  },

  {
    p:"Ondas sonoras não se propagam:",

    a:[

      "Na água",

      "No ar",

      "No vácuo",

      "Nos sólidos"

    ],

    c:2
  },

  {
    p:"As ondas do mar são exemplos de ondas:",

    a:[

      "Mecânicas",

      "Nucleares",

      "Eletromagnéticas",

      "Atômicas"

    ],

    c:0
  },

  {
    p:"O eco é um exemplo de:",

    a:[

      "Refração",

      "Interferência",

      "Reflexão sonora",

      "Difração"

    ],

    c:2
  },

  {
    p:"A difração ocorre quando a onda:",

    a:[

      "Contorna obstáculos",

      "Desaparece",

      "Congela",

      "Aumenta de massa"

    ],

    c:0
  },

  {
    p:"Ondas podem ser classificadas quanto:",

    a:[

      "À natureza",

      "À direção da vibração",

      "À dimensionalidade",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A luz visível faz parte do:",

    a:[

      "Espectro eletromagnético",

      "Sistema solar",

      "Campo gravitacional",

      "Núcleo atômico"

    ],

    c:0
  },

  {
    p:"O comprimento de onda representa:",

    a:[

      "A distância entre duas cristas",

      "A massa da onda",

      "O volume da onda",

      "A força da onda"

    ],

    c:0
  },

  {
    p:"Quanto maior o comprimento de onda:",

    a:[

      "Menor a frequência",

      "Maior a frequência",

      "Maior a massa",

      "Menor a energia"

    ],

    c:0
  },

  {
    p:"A Ondulatória é a área da Física que estuda:",

    a:[

      "As ondas",

      "Os planetas",

      "As reações químicas",

      "A genética"

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

function analisarOndas(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    frequencia:{

      titulo:
        "🎵 Frequência",

      tipo:
        "Oscilações por segundo",

      texto:
        "A frequência indica quantas vibrações a onda realiza em cada segundo."

    },

    som:{

      titulo:
        "🔊 Ondas Sonoras",

      tipo:
        "Ondas mecânicas",

      texto:
        "O som necessita de um meio material para se propagar, como ar, água ou sólidos."

    },

    luz:{

      titulo:
        "💡 Ondas Eletromagnéticas",

      tipo:
        "Propagação no vácuo",

      texto:
        "A luz é uma onda eletromagnética capaz de se propagar até mesmo no vácuo."

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

window.analisarOndas =
  analisarOndas;