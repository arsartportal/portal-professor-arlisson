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
  id:27,

  /*
    SLUG
  */
  slug:
    "energia-potencial",

  /*
    TÍTULO
  */
  titulo:
    "Energia Potencial",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1150

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Energia potencial é a energia:",

    a:[

      "Armazenada",

      "Somente luminosa",

      "Somente térmica",

      "Somente sonora"

    ],

    c:0
  },

  {
    p:"A energia potencial pode existir:",

    a:[

      "Mesmo com o corpo parado",

      "Somente em movimento",

      "Somente no espaço",

      "Somente em líquidos"

    ],

    c:0
  },

  {
    p:"A energia potencial gravitacional depende da:",

    a:[

      "Altura",

      "Temperatura",

      "Cor",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A fórmula da energia potencial gravitacional é:",

    a:[

      "Ep = m·g·h",

      "Ec = mv²/2",

      "F = m·a",

      "P = τ/Δt"

    ],

    c:0
  },

  {
    p:"Na fórmula Ep = m·g·h, h representa:",

    a:[

      "Altura",

      "Hora",

      "Hipotenusa",

      "Humidade"

    ],

    c:0
  },

  {
    p:"Na fórmula Ep = m·g·h, g representa:",

    a:[

      "Gravidade",

      "Ganho",

      "Geometria",

      "Gradiente"

    ],

    c:0
  },

  {
    p:"Quanto maior a altura:",

    a:[

      "Maior a energia potencial",

      "Menor a energia",

      "Menor a massa",

      "Maior a velocidade"

    ],

    c:0
  },

  {
    p:"Quanto maior a massa:",

    a:[

      "Maior a energia potencial",

      "Menor a energia",

      "Menor a gravidade",

      "Maior o tempo"

    ],

    c:0
  },

  {
    p:"A unidade da energia potencial é:",

    a:[

      "Joule",

      "Watt",

      "Newton",

      "Pascal"

    ],

    c:0
  },

  {
    p:"A energia potencial gravitacional está associada:",

    a:[

      "À posição",

      "À cor",

      "À temperatura",

      "À luz"

    ],

    c:0
  },

  {
    p:"A energia potencial elástica está relacionada:",

    a:[

      "À deformação",

      "À altura",

      "À temperatura",

      "À pressão"

    ],

    c:0
  },

  {
    p:"A fórmula da energia potencial elástica é:",

    a:[

      "Epel = kx²/2",

      "Ec = mv²/2",

      "F = m·a",

      "P = m·g"

    ],

    c:0
  },

  {
    p:"Na fórmula elástica, k representa:",

    a:[

      "Constante elástica",

      "Energia cinética",

      "Tempo",

      "Velocidade"

    ],

    c:0
  },

  {
    p:"Na fórmula elástica, x representa:",

    a:[

      "Deformação",

      "Velocidade",

      "Altura",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Molas armazenam:",

    a:[

      "Energia potencial elástica",

      "Energia nuclear",

      "Energia química",

      "Energia luminosa"

    ],

    c:0
  },

  {
    p:"Ao cair, a energia potencial transforma-se em:",

    a:[

      "Energia cinética",

      "Temperatura solar",

      "Massa",

      "Tempo"

    ],

    c:0
  },

  {
    p:"No topo de uma montanha, um corpo possui:",

    a:[

      "Grande energia potencial",

      "Energia nula",

      "Somente energia sonora",

      "Ausência de gravidade"

    ],

    c:0
  },

  {
    p:"Quando a altura diminui:",

    a:[

      "A energia potencial diminui",

      "A energia aumenta",

      "A gravidade desaparece",

      "A massa aumenta"

    ],

    c:0
  },

  {
    p:"A energia potencial pertence ao estudo da:",

    a:[

      "Mecânica",

      "Óptica",

      "Ondulatória",

      "Termologia"

    ],

    c:0
  },

  {
    p:"A energia mecânica é dada por:",

    a:[

      "Em = Ec + Ep",

      "F = m·a",

      "P = τ/Δt",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"Sem dissipação, a energia mecânica:",

    a:[

      "Conserva-se",

      "Desaparece",

      "Diminui sempre",

      "Aumenta infinitamente"

    ],

    c:0
  },

  {
    p:"A gravidade influencia diretamente:",

    a:[

      "A energia potencial gravitacional",

      "A energia nuclear",

      "A luz",

      "O magnetismo"

    ],

    c:0
  },

  {
    p:"A energia potencial pode transformar-se em:",

    a:[

      "Energia cinética",

      "Somente calor",

      "Somente massa",

      "Somente tempo"

    ],

    c:0
  },

  {
    p:"A energia potencial é uma grandeza:",

    a:[

      "Escalar",

      "Vetorial",

      "Circular",

      "Magnética"

    ],

    c:0
  },

  {
    p:"Corpos elevados possuem:",

    a:[

      "Energia armazenada",

      "Ausência de energia",

      "Ausência de gravidade",

      "Menor massa"

    ],

    c:0
  },

  {
    p:"Uma represa armazena energia:",

    a:[

      "Potencial gravitacional",

      "Nuclear",

      "Química",

      "Luminosa"

    ],

    c:0
  },

  {
    p:"O estudo da energia potencial ajuda a entender:",

    a:[

      "Transformações de energia",

      "Somente ondas",

      "Somente luz",

      "Somente temperatura"

    ],

    c:0
  },

  {
    p:"Ao comprimir uma mola:",

    a:[

      "A energia elástica aumenta",

      "A energia desaparece",

      "A gravidade aumenta",

      "A massa diminui"

    ],

    c:0
  },

  {
    p:"A energia potencial gravitacional depende de:",

    a:[

      "Massa, gravidade e altura",

      "Cor, luz e calor",

      "Tempo e pressão",

      "Somente velocidade"

    ],

    c:0
  },

  {
    p:"A conservação da energia é um princípio fundamental da:",

    a:[

      "Física",

      "Geografia",

      "Biologia",

      "Química orgânica"

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

function analisarPotencial(tipo){

  const resultado =
    document.getElementById(
      "resultadoPotencial"
    );

  /*
    DADOS
  */
  const dados = {

    altura:{

      titulo:
        "🏔️ Grande Altura",

      tipo:
        "Alta energia potencial gravitacional",

      texto:
        "Quanto maior a altura de um corpo em relação ao solo, maior será sua energia potencial gravitacional."

    },

    queda:{

      titulo:
        "⬇️ Transformação de Energia",

      tipo:
        "Ep → Ec",

      texto:
        "Durante a queda, a energia potencial diminui enquanto a energia cinética aumenta."

    },

    mola:{

      titulo:
        "🌀 Energia Elástica",

      tipo:
        "Energia armazenada pela deformação",

      texto:
        "Molas comprimidas ou esticadas armazenam energia potencial elástica que pode ser liberada posteriormente."

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

window.analisarPotencial =
  analisarPotencial;