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
  id:31,

  /*
    SLUG
  */
  slug:
    "satelites",

  /*
    TÍTULO
  */
  titulo:
    "Satélites Artificiais",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1350

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Satélites artificiais são:",

    a:[

      "Objetos construídos pelo ser humano",

      "Planetas naturais",

      "Estrelas pequenas",

      "Meteoros"

    ],

    c:0
  },

  {
    p:"Os satélites permanecem em órbita devido à:",

    a:[

      "Gravidade",

      "Temperatura",

      "Luz solar",

      "Pressão atmosférica"

    ],

    c:0
  },

  {
    p:"A gravidade atua como força:",

    a:[

      "Centrípeta",

      "Elétrica",

      "Magnética",

      "Térmica"

    ],

    c:0
  },

  {
    p:"Sem gravidade, o satélite:",

    a:[

      "Seguiria em linha reta",

      "Pararia imediatamente",

      "Cairia sem movimento",

      "Explodiria"

    ],

    c:0
  },

  {
    p:"A velocidade do satélite é:",

    a:[

      "Tangencial à órbita",

      "Vertical apenas",

      "Nula",

      "Sempre constante em direção"

    ],

    c:0
  },

  {
    p:"Satélites geoestacionários parecem:",

    a:[

      "Parados em relação à Terra",

      "Mover-se muito rápido",

      "Parar no espaço",

      "Desaparecer"

    ],

    c:0
  },

  {
    p:"Satélites geoestacionários são usados principalmente em:",

    a:[

      "Telecomunicações",

      "Produção de calor",

      "Construção civil",

      "Mineração"

    ],

    c:0
  },

  {
    p:"A fórmula da velocidade orbital é:",

    a:[

      "v = √(GM/r)",

      "F = m·a",

      "P = m·g",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"Quanto mais próximo da Terra:",

    a:[

      "Maior deve ser a velocidade orbital",

      "Menor a velocidade",

      "Maior o tempo orbital",

      "Menor a gravidade"

    ],

    c:0
  },

  {
    p:"Satélites meteorológicos ajudam na:",

    a:[

      "Previsão do tempo",

      "Produção de energia nuclear",

      "Construção de carros",

      "Perfuração submarina"

    ],

    c:0
  },

  {
    p:"Satélites GPS permitem:",

    a:[

      "Localização e navegação",

      "Produção de chuva",

      "Aumento da gravidade",

      "Controle climático"

    ],

    c:0
  },

  {
    p:"A órbita é resultado do equilíbrio entre:",

    a:[

      "Velocidade e gravidade",

      "Calor e pressão",

      "Massa e luz",

      "Som e temperatura"

    ],

    c:0
  },

  {
    p:"A Terra atrai o satélite pela força:",

    a:[

      "Gravitacional",

      "Elétrica",

      "Magnética",

      "Nuclear"

    ],

    c:0
  },

  {
    p:"Satélites artificiais podem orbitar:",

    a:[

      "Outros corpos celestes",

      "Somente a Terra",

      "Somente o Sol",

      "Somente a Lua"

    ],

    c:0
  },

  {
    p:"Satélites de comunicação transmitem:",

    a:[

      "Sinais de informação",

      "Somente calor",

      "Somente eletricidade",

      "Somente luz"

    ],

    c:0
  },

  {
    p:"O movimento orbital é:",

    a:[

      "Contínuo",

      "Interrompido constantemente",

      "Sempre parado",

      "Aleatório"

    ],

    c:0
  },

  {
    p:"A gravidade diminui com o aumento da:",

    a:[

      "Distância",

      "Temperatura",

      "Velocidade",

      "Pressão"

    ],

    c:0
  },

  {
    p:"Satélites artificiais são importantes para:",

    a:[

      "Comunicação e pesquisa",

      "Somente agricultura",

      "Somente mineração",

      "Somente navegação marítima"

    ],

    c:0
  },

  {
    p:"A órbita geoestacionária acompanha:",

    a:[

      "A rotação da Terra",

      "A órbita da Lua",

      "O movimento do Sol",

      "O campo magnético"

    ],

    c:0
  },

  {
    p:"A força centrípeta aponta para:",

    a:[

      "O centro da órbita",

      "Fora da órbita",

      "Direção aleatória",

      "O espaço profundo"

    ],

    c:0
  },

  {
    p:"Satélites artificiais fazem parte do estudo da:",

    a:[

      "Mecânica orbital",

      "Somente óptica",

      "Somente acústica",

      "Somente termologia"

    ],

    c:0
  },

  {
    p:"A velocidade orbital depende da:",

    a:[

      "Distância ao planeta",

      "Cor do satélite",

      "Temperatura do espaço",

      "Pressão atmosférica"

    ],

    c:0
  },

  {
    p:"Satélites científicos são usados para:",

    a:[

      "Pesquisas espaciais",

      "Produção de petróleo",

      "Construção de estradas",

      "Geração de chuva"

    ],

    c:0
  },

  {
    p:"A órbita de um satélite pode ser:",

    a:[

      "Circular ou elíptica",

      "Somente quadrada",

      "Somente triangular",

      "Somente reta"

    ],

    c:0
  },

  {
    p:"O lançamento de satélites utiliza:",

    a:[

      "Foguetes",

      "Automóveis",

      "Aviões comuns",

      "Barcos"

    ],

    c:0
  },

  {
    p:"Sem velocidade tangencial adequada:",

    a:[

      "O satélite cairia",

      "A gravidade desapareceria",

      "A Terra perderia massa",

      "A órbita aumentaria infinitamente"

    ],

    c:0
  },

  {
    p:"A comunicação global depende fortemente de:",

    a:[

      "Satélites artificiais",

      "Somente rádio local",

      "Somente cabos submarinos",

      "Somente antenas terrestres"

    ],

    c:0
  },

  {
    p:"Satélites podem fotografar:",

    a:[

      "A superfície terrestre",

      "Somente estrelas",

      "Somente oceanos",

      "Somente nuvens"

    ],

    c:0
  },

  {
    p:"A exploração espacial moderna utiliza:",

    a:[

      "Satélites artificiais",

      "Somente telescópios antigos",

      "Somente aviões",

      "Somente submarinos"

    ],

    c:0
  },

  {
    p:"Satélites artificiais revolucionaram:",

    a:[

      "Comunicação e navegação",

      "Somente agricultura",

      "Somente química",

      "Somente mineração"

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

function analisarSatelite(tipo){

  const resultado =
    document.getElementById(
      "resultadoSatelite"
    );

  /*
    DADOS
  */
  const dados = {

    baixa:{

      titulo:
        "🌍 Órbita Baixa",

      tipo:
        "Alta velocidade orbital",

      texto:
        "Satélites em órbitas baixas precisam de velocidades maiores para permanecerem em movimento ao redor da Terra."

    },

    geo:{

      titulo:
        "🛰️ Satélite Geoestacionário",

      tipo:
        "Órbita sincronizada",

      texto:
        "Satélites geoestacionários acompanham a rotação da Terra e parecem permanecer fixos no céu."

    },

    distante:{

      titulo:
        "🌌 Órbita Distante",

      tipo:
        "Menor velocidade orbital",

      texto:
        "Quanto maior a distância em relação à Terra, menor tende a ser a velocidade orbital do satélite."

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

window.analisarSatelite =
  analisarSatelite;