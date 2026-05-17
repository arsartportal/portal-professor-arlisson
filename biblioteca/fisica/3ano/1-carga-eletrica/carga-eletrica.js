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
  id:401,

  /*
    SLUG
  */
  slug:
    "carga-eletrica",

  /*
    TÍTULO
  */
  titulo:
    "Carga Elétrica",

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
    p:"A carga elétrica é uma propriedade:",

    a:[

      "Química",

      "Física",

      "Biológica",

      "Geológica"

    ],

    c:1
  },

  {
    p:"Existem quantos tipos de carga elétrica?",

    a:[

      "1",

      "2",

      "3",

      "4"

    ],

    c:1
  },

  {
    p:"As cargas elétricas podem ser:",

    a:[

      "Positivas e negativas",

      "Quentes e frias",

      "Fortes e fracas",

      "Grandes e pequenas"

    ],

    c:0
  },

  {
    p:"Cargas de mesmo sinal:",

    a:[

      "Se atraem",

      "Se anulam",

      "Se repelem",

      "Desaparecem"

    ],

    c:2
  },

  {
    p:"Cargas de sinais opostos:",

    a:[

      "Se repelem",

      "Se atraem",

      "Não interagem",

      "Explodem"

    ],

    c:1
  },

  {
    p:"A unidade de carga elétrica no SI é:",

    a:[

      "Volt",

      "Ampère",

      "Coulomb",

      "Ohm"

    ],

    c:2
  },

  {
    p:"O elétron possui carga:",

    a:[

      "Positiva",

      "Negativa",

      "Neutra",

      "Variável"

    ],

    c:1
  },

  {
    p:"O próton possui carga:",

    a:[

      "Negativa",

      "Neutra",

      "Positiva",

      "Nula"

    ],

    c:2
  },

  {
    p:"Um corpo neutro possui:",

    a:[

      "Mais prótons",

      "Mais elétrons",

      "Mesmo número de prótons e elétrons",

      "Ausência de partículas"

    ],

    c:2
  },

  {
    p:"A eletrização por atrito ocorre quando:",

    a:[

      "Os corpos são aquecidos",

      "Os corpos são esfregados",

      "Há explosão",

      "Há fusão"

    ],

    c:1
  },

  {
    p:"Na eletrização por contato:",

    a:[

      "Os corpos trocam calor",

      "Os corpos trocam elétrons",

      "Os corpos derretem",

      "Não ocorre interação"

    ],

    c:1
  },

  {
    p:"A eletrização por indução ocorre:",

    a:[

      "Sem contato direto",

      "Somente no vácuo",

      "Com fogo",

      "Com água fervendo"

    ],

    c:0
  },

  {
    p:"Os elétrons são partículas:",

    a:[

      "Positivas",

      "Negativas",

      "Neutras",

      "Luminosas"

    ],

    c:1
  },

  {
    p:"O próton está localizado:",

    a:[

      "Na eletrosfera",

      "No núcleo",

      "No fio",

      "Na luz"

    ],

    c:1
  },

  {
    p:"A eletrosfera contém:",

    a:[

      "Prótons",

      "Nêutrons",

      "Elétrons",

      "Luz"

    ],

    c:2
  },

  {
    p:"Materiais condutores permitem:",

    a:[

      "Movimento de cargas",

      "Movimento de calor apenas",

      "Produção de luz",

      "Produção sonora"

    ],

    c:0
  },

  {
    p:"Exemplo de material condutor:",

    a:[

      "Plástico",

      "Borracha",

      "Cobre",

      "Madeira"

    ],

    c:2
  },

  {
    p:"Exemplo de material isolante:",

    a:[

      "Alumínio",

      "Prata",

      "Cobre",

      "Borracha"

    ],

    c:3
  },

  {
    p:"O princípio da conservação das cargas afirma que:",

    a:[

      "As cargas desaparecem",

      "A soma das cargas permanece constante",

      "As cargas aumentam",

      "As cargas diminuem"

    ],

    c:1
  },

  {
    p:"A carga elementar é representada por:",

    a:[

      "Q",

      "e",

      "F",

      "P"

    ],

    c:1
  },

  {
    p:"A fórmula Q = n·e relaciona:",

    a:[

      "Carga e elétrons",

      "Força e massa",

      "Energia e calor",

      "Velocidade e tempo"

    ],

    c:0
  },

  {
    p:"O eletroscópio serve para:",

    a:[

      "Produzir energia",

      "Detectar cargas elétricas",

      "Produzir calor",

      "Medir massa"

    ],

    c:1
  },

  {
    p:"Corpos eletrizados possuem:",

    a:[

      "Desequilíbrio de cargas",

      "Somente prótons",

      "Ausência de elétrons",

      "Mais massa"

    ],

    c:0
  },

  {
    p:"A eletricidade está relacionada ao movimento de:",

    a:[

      "Nêutrons",

      "Prótons",

      "Elétrons",

      "Luz"

    ],

    c:2
  },

  {
    p:"A carga elétrica é medida em:",

    a:[

      "Joule",

      "Newton",

      "Coulomb",

      "Pascal"

    ],

    c:2
  },

  {
    p:"Os nêutrons possuem carga:",

    a:[

      "Positiva",

      "Negativa",

      "Neutra",

      "Dupla"

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

      "Neutro",

      "Positivo",

      "Congelado"

    ],

    c:2
  },

  {
    p:"A Física que estuda as cargas elétricas em repouso é:",

    a:[

      "Mecânica",

      "Termologia",

      "Eletrostática",

      "Óptica"

    ],

    c:2
  },

  {
    p:"As interações elétricas acontecem devido às:",

    a:[

      "Ondas sonoras",

      "Cargas elétricas",

      "Temperaturas",

      "Massas"

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

function analisarCarga(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    positiva:{

      titulo:
        "➕ Carga Positiva",

      tipo:
        "Perda de elétrons",

      texto:
        "Um corpo fica positivamente carregado quando perde elétrons, ficando com excesso de prótons."

    },

    negativa:{

      titulo:
        "➖ Carga Negativa",

      tipo:
        "Ganho de elétrons",

      texto:
        "Um corpo fica negativamente carregado quando ganha elétrons, ficando com excesso dessas partículas."

    },

    eletrizacao:{

      titulo:
        "⚡ Eletrização",

      tipo:
        "Transferência de cargas",

      texto:
        "Os corpos podem ser eletrizados por atrito, contato ou indução através da movimentação de elétrons."

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

window.analisarCarga =
  analisarCarga;