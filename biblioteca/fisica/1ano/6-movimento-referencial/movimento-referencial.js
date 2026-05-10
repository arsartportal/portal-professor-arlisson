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
  id: 6,

  /*
    Slug da aula
  */
  slug: "movimento-referencial",

  /*
    Título exibido
  */
  titulo: "Movimento e Referencial",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 100

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"Um corpo está em movimento quando:",

    a:[

      "Sua posição muda em relação a um referencial",

      "Está ligado",

      "Possui massa",

      "Está acelerando"

    ],

    c:0
  },

  {
    p:"Referencial é:",

    a:[

      "O ponto usado para comparar posições",

      "A velocidade do objeto",

      "O tempo do movimento",

      "A massa do corpo"

    ],

    c:0
  },

  {
    p:"Um passageiro sentado em um ônibus em movimento pode estar:",

    a:[

      "Em repouso em relação ao ônibus",

      "Sempre em movimento",

      "Parado em relação à rua",

      "Sem velocidade"

    ],

    c:0
  },

  {
    p:"A Terra está:",

    a:[

      "Em movimento",

      "Sempre parada",

      "Sem rotação",

      "Sem translação"

    ],

    c:0
  },

  {
    p:"Movimento depende de:",

    a:[

      "Referencial",

      "Temperatura",

      "Cor do objeto",

      "Volume"

    ],

    c:0
  },

  {
    p:"Quando um objeto não muda de posição em relação ao referencial, ele está:",

    a:[

      "Em repouso",

      "Acelerado",

      "Em queda",

      "Em rotação"

    ],

    c:0
  },

  {
    p:"Um carro na estrada está em movimento em relação:",

    a:[

      "Ao solo",

      "Ao motorista",

      "Ao banco",

      "Ao volante"

    ],

    c:0
  },

  {
    p:"O estudo do movimento faz parte da:",

    a:[

      "Cinemática",

      "Termologia",

      "Óptica",

      "Eletrostática"

    ],

    c:0
  },

  {
    p:"A posição de um corpo pode mudar com:",

    a:[

      "O tempo",

      "A cor",

      "A densidade",

      "A massa"

    ],

    c:0
  },

  {
    p:"Um avião voando está em repouso em relação:",

    a:[

      "Ao passageiro sentado",

      "À pista",

      "À cidade",

      "À montanha"

    ],

    c:0
  },

  {
    p:"Movimento e repouso são conceitos:",

    a:[

      "Relativos",

      "Absolutos",

      "Fixos",

      "Idênticos"

    ],

    c:0
  },

  {
    p:"O referencial mais comum em problemas escolares é:",

    a:[

      "O solo",

      "A Lua",

      "O Sol",

      "O espaço"

    ],

    c:0
  }

];

/* =====================================================
   INICIAR SISTEMA DA BIBLIOTECA
===================================================== */

iniciarBiblioteca(
  CONFIG,
  QUESTOES
);

/* =====================================================
   SIMULADOR
===================================================== */

function analisarMovimento(tipo){

  const resultado =
    document.getElementById(
      "resultadoMovimento"
    );

  /*
    Dados
  */
  const dados = {

    carro:{

      titulo:
        "🚗 Carro na estrada",

      tipo:
        "Movimento",

      texto:
        "Em relação ao solo, o carro está em movimento porque sua posição muda com o tempo."

    },

    onibus:{

      titulo:
        "🚌 Passageiro no ônibus",

      tipo:
        "Repouso relativo",

      texto:
        "Em relação ao ônibus, o passageiro pode estar em repouso mesmo com o veículo em movimento."

    },

    terra:{

      titulo:
        "🌍 Movimento da Terra",

      tipo:
        "Movimento relativo",

      texto:
        "Mesmo aparentemente parados, estamos nos movendo junto com a Terra."

    }

  };

  /*
    Atualiza interface
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

window.analisarMovimento =
  analisarMovimento;