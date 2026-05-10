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
  id: 7,

  /*
    Slug da aula
  */
  slug: "trajetoria",

  /*
    Título exibido
  */
  titulo: "Trajetória",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 120

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"Trajetória é:",

    a:[

      "O caminho percorrido por um corpo",

      "A velocidade do corpo",

      "A massa do corpo",

      "O tempo do movimento"

    ],

    c:0
  },

  {
    p:"Uma trajetória em linha reta é chamada de:",

    a:[

      "Retilínea",

      "Circular",

      "Curvilínea",

      "Parabólica"

    ],

    c:0
  },

  {
    p:"A trajetória de um carro fazendo curva é:",

    a:[

      "Curvilínea",

      "Retilínea",

      "Estática",

      "Uniforme"

    ],

    c:0
  },

  {
    p:"A trajetória depende do:",

    a:[

      "Referencial",

      "Volume",

      "Peso",

      "Material"

    ],

    c:0
  },

  {
    p:"Um satélite ao redor da Terra possui trajetória:",

    a:[

      "Circular",

      "Retilínea",

      "Parada",

      "Vertical"

    ],

    c:0
  },

  {
    p:"A trajetória observada pode mudar conforme:",

    a:[

      "O observador",

      "A cor do objeto",

      "A massa do objeto",

      "A temperatura"

    ],

    c:0
  },

  {
    p:"Uma bola lançada para cima dentro de um ônibus pode ter trajetória:",

    a:[

      "Diferente para observadores distintos",

      "Sempre igual",

      "Sempre reta",

      "Sempre circular"

    ],

    c:0
  },

  {
    p:"Qual destes possui trajetória retilínea?",

    a:[

      "Carro em estrada reta",

      "Carro em rotatória",

      "Planeta orbitando",

      "Pião girando"

    ],

    c:0
  },

  {
    p:"Trajetória circular ocorre quando:",

    a:[

      "O corpo percorre uma circunferência",

      "O corpo fica parado",

      "O corpo acelera",

      "O corpo diminui massa"

    ],

    c:0
  },

  {
    p:"O estudo das trajetórias faz parte da:",

    a:[

      "Cinemática",

      "Óptica",

      "Termologia",

      "Eletricidade"

    ],

    c:0
  },

  {
    p:"A trajetória de um avião pode ser:",

    a:[

      "Curvilínea",

      "Somente reta",

      "Sempre circular",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"A forma da trajetória depende:",

    a:[

      "Do movimento realizado",

      "Da cor do veículo",

      "Do tamanho do corpo",

      "Da densidade"

    ],

    c:0
  },

  {
    p:"Uma volta em pista circular representa trajetória:",

    a:[

      "Circular",

      "Retilínea",

      "Estática",

      "Vertical"

    ],

    c:0
  },

  {
    p:"A trajetória de um projétil geralmente é:",

    a:[

      "Curva",

      "Reta",

      "Circular",

      "Parada"

    ],

    c:0
  },

  {
    p:"Em Física, trajetória representa:",

    a:[

      "O caminho do movimento",

      "A intensidade da força",

      "A massa total",

      "A aceleração máxima"

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

function analisarTrajetoria(tipo){

  const resultado =
    document.getElementById(
      "resultadoTrajetoria"
    );

  /*
    Dados
  */
  const dados = {

    reta:{

      titulo:
        "➖ Trajetória Retilínea",

      tipo:
        "Linha reta",

      texto:
        "O corpo percorre um caminho reto, como um carro em uma estrada perfeitamente reta."

    },

    curva:{

      titulo:
        "🌊 Trajetória Curvilínea",

      tipo:
        "Movimento em curva",

      texto:
        "O corpo realiza um movimento curvo, como um carro fazendo uma curva."

    },

    circular:{

      titulo:
        "🔄 Trajetória Circular",

      tipo:
        "Circunferência",

      texto:
        "O corpo percorre uma trajetória circular, como um satélite orbitando a Terra."

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

window.analisarTrajetoria =
  analisarTrajetoria;