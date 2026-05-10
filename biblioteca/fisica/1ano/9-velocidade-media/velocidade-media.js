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
  id: 9,

  /*
    Slug da aula
  */
  slug: "velocidade-media",

  /*
    Título exibido
  */
  titulo: "Velocidade Média",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 200

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"Velocidade média representa:",

    a:[

      "A razão entre deslocamento e tempo",

      "A força do movimento",

      "A massa do corpo",

      "A energia do sistema"

    ],

    c:0
  },

  {
    p:"A fórmula da velocidade média é:",

    a:[

      "Vm = ΔS / Δt",

      "Vm = Δt / ΔS",

      "Vm = S × t",

      "Vm = S + t"

    ],

    c:0
  },

  {
    p:"ΔS representa:",

    a:[

      "Deslocamento",

      "Tempo",

      "Velocidade",

      "Aceleração"

    ],

    c:0
  },

  {
    p:"Δt representa:",

    a:[

      "Intervalo de tempo",

      "Deslocamento",

      "Massa",

      "Força"

    ],

    c:0
  },

  {
    p:"No Sistema Internacional, velocidade é medida em:",

    a:[

      "m/s",

      "kg",

      "N",

      "J"

    ],

    c:0
  },

  {
    p:"Um carro percorreu 100 km em 2 h. Sua velocidade média foi:",

    a:[

      "50 km/h",

      "100 km/h",

      "25 km/h",

      "200 km/h"

    ],

    c:0
  },

  {
    p:"Velocidade média depende:",

    a:[

      "Do deslocamento e do tempo",

      "Somente do tempo",

      "Somente da massa",

      "Somente da força"

    ],

    c:0
  },

  {
    p:"Se o tempo aumenta e a distância permanece igual, a velocidade média:",

    a:[

      "Diminui",

      "Aumenta",

      "Permanece igual",

      "Zera automaticamente"

    ],

    c:0
  },

  {
    p:"A velocidade média pode ser usada em:",

    a:[

      "Viagens",

      "Somente laboratórios",

      "Somente aviões",

      "Somente carros"

    ],

    c:0
  },

  {
    p:"Uma velocidade de 72 km/h corresponde aproximadamente a:",

    a:[

      "20 m/s",

      "10 m/s",

      "50 m/s",

      "100 m/s"

    ],

    c:0
  },

  {
    p:"Velocidade média é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar apenas",

      "Sem unidade",

      "Adimensional"

    ],

    c:0
  },

  {
    p:"Quando o deslocamento é zero, a velocidade média pode ser:",

    a:[

      "Zero",

      "Infinita",

      "Negativa sempre",

      "Maior que a luz"

    ],

    c:0
  },

  {
    p:"A velocidade média informa:",

    a:[

      "Quão rápido ocorre o movimento",

      "A massa do corpo",

      "A temperatura",

      "O peso"

    ],

    c:0
  },

  {
    p:"Se um ciclista percorre 30 km em 1 h, sua velocidade média é:",

    a:[

      "30 km/h",

      "60 km/h",

      "15 km/h",

      "90 km/h"

    ],

    c:0
  },

  {
    p:"A unidade km/h é muito usada em:",

    a:[

      "Estradas",

      "Microscópios",

      "Termômetros",

      "Circuitos"

    ],

    c:0
  },

  {
    p:"Velocidade média NÃO mostra:",

    a:[

      "As variações do movimento",

      "O deslocamento",

      "O tempo",

      "A unidade"

    ],

    c:0
  },

  {
    p:"Quanto maior a velocidade média:",

    a:[

      "Mais rápido ocorre o movimento",

      "Maior a massa",

      "Menor o tempo universal",

      "Maior a gravidade"

    ],

    c:0
  },

  {
    p:"A Cinemática estuda:",

    a:[

      "Os movimentos",

      "Somente calor",

      "Somente luz",

      "Somente eletricidade"

    ],

    c:0
  },

  {
    p:"Um avião percorreu 800 km em 2 h. Sua velocidade média foi:",

    a:[

      "400 km/h",

      "200 km/h",

      "1600 km/h",

      "100 km/h"

    ],

    c:0
  },

  {
    p:"Para calcular velocidade média é necessário:",

    a:[

      "Dividir deslocamento pelo tempo",

      "Somar massa e tempo",

      "Multiplicar força por distância",

      "Dividir aceleração pela massa"

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

function analisarVelocidade(tipo){

  const resultado =
    document.getElementById(
      "resultadoVelocidade"
    );

  /*
    DADOS
  */
  const dados = {

    carro:{

      titulo:
        "🚗 Velocidade do carro",

      tipo:
        "Movimento terrestre",

      texto:
        "Um carro percorreu 120 km em 2 horas. Sua velocidade média foi de 60 km/h."

    },

    ciclista:{

      titulo:
        "🚴 Velocidade do ciclista",

      tipo:
        "Movimento esportivo",

      texto:
        "Um ciclista percorreu 30 km em 1 hora. Sua velocidade média foi de 30 km/h."

    },

    aviao:{

      titulo:
        "✈️ Velocidade do avião",

      tipo:
        "Movimento aéreo",

      texto:
        "Um avião percorreu 800 km em 2 horas. Sua velocidade média foi de 400 km/h."

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

window.analisarVelocidade =
  analisarVelocidade;