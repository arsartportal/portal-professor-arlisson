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
  id:402,

  /*
    SLUG
  */
  slug:
    "eletrizacao",

  /*
    TÍTULO
  */
  titulo:
    "Eletrização",

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
    p:"Eletrização é o processo de:",

    a:[

      "Produção de calor",

      "Transferência de elétrons",

      "Produção de luz",

      "Movimento de massa"

    ],

    c:1
  },

  {
    p:"Um corpo fica eletrizado quando:",

    a:[

      "Perde ou ganha elétrons",

      "Produz som",

      "Aumenta a massa",

      "Diminui a temperatura"

    ],

    c:0
  },

  {
    p:"Na eletrização por atrito ocorre:",

    a:[

      "Troca de prótons",

      "Troca de elétrons",

      "Troca de calor",

      "Troca de nêutrons"

    ],

    c:1
  },

  {
    p:"Ao esfregar dois corpos ocorre:",

    a:[

      "Fusão nuclear",

      "Transferência de elétrons",

      "Refração",

      "Evaporação"

    ],

    c:1
  },

  {
    p:"Na eletrização por contato:",

    a:[

      "Os corpos precisam encostar",

      "Não há contato",

      "Há explosão",

      "Há reflexão"

    ],

    c:0
  },

  {
    p:"Na eletrização por indução:",

    a:[

      "Há contato obrigatório",

      "Não existe separação de cargas",

      "Não é necessário contato",

      "Os corpos derretem"

    ],

    c:2
  },

  {
    p:"O elétron possui carga:",

    a:[

      "Positiva",

      "Negativa",

      "Neutra",

      "Dupla"

    ],

    c:1
  },

  {
    p:"O próton possui carga:",

    a:[

      "Negativa",

      "Neutra",

      "Positiva",

      "Variável"

    ],

    c:2
  },

  {
    p:"Corpos com cargas iguais:",

    a:[

      "Se atraem",

      "Se repelem",

      "Se anulam",

      "Não interagem"

    ],

    c:1
  },

  {
    p:"Corpos com cargas opostas:",

    a:[

      "Se repelem",

      "Se afastam",

      "Se atraem",

      "Explodem"

    ],

    c:2
  },

  {
    p:"A unidade de carga elétrica é:",

    a:[

      "Newton",

      "Joule",

      "Coulomb",

      "Pascal"

    ],

    c:2
  },

  {
    p:"O símbolo da carga elétrica é:",

    a:[

      "Q",

      "F",

      "P",

      "T"

    ],

    c:0
  },

  {
    p:"A fórmula Q = n·e relaciona:",

    a:[

      "Força e aceleração",

      "Carga e elétrons",

      "Energia e calor",

      "Pressão e área"

    ],

    c:1
  },

  {
    p:"A carga elementar é representada por:",

    a:[

      "e",

      "m",

      "v",

      "p"

    ],

    c:0
  },

  {
    p:"Materiais condutores:",

    a:[

      "Impedem passagem de cargas",

      "Permitem movimentação de cargas",

      "Produzem calor",

      "Bloqueiam elétrons"

    ],

    c:1
  },

  {
    p:"Exemplo de material isolante:",

    a:[

      "Cobre",

      "Alumínio",

      "Prata",

      "Borracha"

    ],

    c:3
  },

  {
    p:"Exemplo de material condutor:",

    a:[

      "Vidro",

      "Madeira",

      "Cobre",

      "Plástico"

    ],

    c:2
  },

  {
    p:"O princípio da conservação das cargas afirma que:",

    a:[

      "As cargas desaparecem",

      "As cargas aumentam",

      "A carga total permanece constante",

      "As cargas diminuem"

    ],

    c:2
  },

  {
    p:"Um corpo neutro possui:",

    a:[

      "Mais elétrons",

      "Mais prótons",

      "Mesmo número de prótons e elétrons",

      "Ausência de partículas"

    ],

    c:2
  },

  {
    p:"Ao ganhar elétrons, um corpo fica:",

    a:[

      "Positivo",

      "Negativo",

      "Neutro",

      "Sem carga"

    ],

    c:1
  },

  {
    p:"Ao perder elétrons, um corpo fica:",

    a:[

      "Negativo",

      "Positivo",

      "Neutro",

      "Congelado"

    ],

    c:1
  },

  {
    p:"O eletroscópio serve para:",

    a:[

      "Produzir energia",

      "Detectar cargas elétricas",

      "Medir temperatura",

      "Produzir som"

    ],

    c:1
  },

  {
    p:"A eletrização por atrito normalmente gera:",

    a:[

      "Cargas opostas nos corpos",

      "Cargas iguais nos corpos",

      "Destruição dos corpos",

      "Ausência de cargas"

    ],

    c:0
  },

  {
    p:"Na indução elétrica ocorre:",

    a:[

      "Separação de cargas",

      "Produção de calor",

      "Refração",

      "Evaporação"

    ],

    c:0
  },

  {
    p:"A Eletrostática estuda:",

    a:[

      "Cargas em repouso",

      "Som",

      "Luz",

      "Calor"

    ],

    c:0
  },

  {
    p:"As interações elétricas acontecem devido às:",

    a:[

      "Massas",

      "Temperaturas",

      "Cargas elétricas",

      "Ondas"

    ],

    c:2
  },

  {
    p:"O atrito entre materiais pode causar:",

    a:[

      "Eletrização",

      "Fusão nuclear",

      "Reflexão",

      "Derretimento"

    ],

    c:0
  },

  {
    p:"O corpo eletrizado possui:",

    a:[

      "Desequilíbrio de cargas",

      "Ausência de elétrons",

      "Somente prótons",

      "Somente nêutrons"

    ],

    c:0
  },

  {
    p:"A carga elétrica é uma propriedade:",

    a:[

      "Química",

      "Biológica",

      "Física",

      "Geográfica"

    ],

    c:2
  },

  {
    p:"Os processos de eletrização envolvem:",

    a:[

      "Transferência de elétrons",

      "Transferência de massa",

      "Produção de ondas",

      "Mudança de temperatura"

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

function analisarEletrizacao(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    atrito:{

      titulo:
        "✋ Eletrização por Atrito",

      tipo:
        "Transferência de elétrons",

      texto:
        "Quando dois corpos são esfregados, elétrons podem passar de um corpo para outro, eletrizando ambos."

    },

    contato:{

      titulo:
        "🤝 Eletrização por Contato",

      tipo:
        "Contato entre corpos",

      texto:
        "Ao encostar um corpo eletrizado em outro, ocorre redistribuição de cargas elétricas."

    },

    inducao:{

      titulo:
        "⚡ Eletrização por Indução",

      tipo:
        "Sem contato direto",

      texto:
        "Um corpo eletrizado pode provocar separação de cargas em outro corpo sem encostar nele."

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

window.analisarEletrizacao =
  analisarEletrizacao;