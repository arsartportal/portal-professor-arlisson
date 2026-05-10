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
  id: 11,

  /*
    Slug da aula
  */
  slug: "movimento-uniformemente-variado",

  /*
    Título exibido
  */
  titulo: "Movimento Uniformemente Variado",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 350

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"O Movimento Uniformemente Variado possui:",

    a:[

      "Aceleração constante",

      "Velocidade constante",

      "Aceleração nula",

      "Repouso"

    ],

    c:0
  },

  {
    p:"No MUV a velocidade:",

    a:[

      "Varia uniformemente",

      "É sempre constante",

      "É sempre zero",

      "Não depende do tempo"

    ],

    c:0
  },

  {
    p:"A aceleração representa:",

    a:[

      "A variação da velocidade",

      "A posição final",

      "A distância percorrida",

      "O deslocamento"

    ],

    c:0
  },

  {
    p:"A fórmula da aceleração média é:",

    a:[

      "a = ΔV / Δt",

      "a = V × t",

      "a = S / t",

      "a = V / S"

    ],

    c:0
  },

  {
    p:"A unidade da aceleração no SI é:",

    a:[

      "m/s²",

      "m/s",

      "km",

      "N"

    ],

    c:0
  },

  {
    p:"A função horária da velocidade é:",

    a:[

      "V = V₀ + at",

      "V = S/t",

      "V = at²",

      "V = S₀ + Vt"

    ],

    c:0
  },

  {
    p:"Na equação V = V₀ + at, V₀ representa:",

    a:[

      "Velocidade inicial",

      "Velocidade final",

      "Aceleração",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Se a aceleração é positiva:",

    a:[

      "A velocidade aumenta",

      "A velocidade diminui",

      "O corpo para",

      "O movimento deixa de existir"

    ],

    c:0
  },

  {
    p:"Se a aceleração é negativa:",

    a:[

      "A velocidade diminui",

      "A velocidade aumenta",

      "O corpo acelera infinitamente",

      "O tempo para"

    ],

    c:0
  },

  {
    p:"A função horária da posição no MUV é:",

    a:[

      "S = S₀ + V₀t + at²/2",

      "S = V/t",

      "S = at",

      "S = V²"

    ],

    c:0
  },

  {
    p:"A equação de Torricelli é:",

    a:[

      "V² = V₀² + 2aΔS",

      "V = V₀ + at",

      "S = S₀ + Vt",

      "a = V/t"

    ],

    c:0
  },

  {
    p:"A equação de Torricelli elimina qual variável?",

    a:[

      "Tempo",

      "Velocidade",

      "Posição",

      "Aceleração"

    ],

    c:0
  },

  {
    p:"No gráfico velocidade × tempo do MUV temos:",

    a:[

      "Uma reta inclinada",

      "Uma reta horizontal",

      "Uma parábola",

      "Um círculo"

    ],

    c:0
  },

  {
    p:"No gráfico posição × tempo do MUV temos:",

    a:[

      "Uma parábola",

      "Uma reta horizontal",

      "Uma linha reta",

      "Uma circunferência"

    ],

    c:0
  },

  {
    p:"Um carro aumenta sua velocidade em 2 m/s a cada segundo. Isso indica:",

    a:[

      "Aceleração constante",

      "Repouso",

      "Velocidade constante",

      "Movimento retrógrado"

    ],

    c:0
  },

  {
    p:"Se um corpo parte do repouso:",

    a:[

      "Sua velocidade inicial é zero",

      "Sua aceleração é zero",

      "Seu deslocamento é zero",

      "Sua posição final é zero"

    ],

    c:0
  },

  {
    p:"A Cinemática estuda:",

    a:[

      "Os movimentos",

      "Somente calor",

      "Somente eletricidade",

      "Somente óptica"

    ],

    c:0
  },

  {
    p:"No MUV existe:",

    a:[

      "Aceleração",

      "Velocidade constante obrigatória",

      "Ausência de movimento",

      "Repouso absoluto"

    ],

    c:0
  },

  {
    p:"Um móvel acelerado possui velocidade:",

    a:[

      "Crescente",

      "Constante",

      "Nula",

      "Negativa obrigatoriamente"

    ],

    c:0
  },

  {
    p:"A área do gráfico velocidade × tempo representa:",

    a:[

      "Deslocamento",

      "Aceleração",

      "Massa",

      "Temperatura"

    ],

    c:0
  },

  {
    p:"Quando o móvel freia, a aceleração é chamada de:",

    a:[

      "Retardamento",

      "Progressiva",

      "Uniforme",

      "Escalar"

    ],

    c:0
  },

  {
    p:"A velocidade no MUV depende:",

    a:[

      "Do tempo",

      "Somente da posição",

      "Somente da massa",

      "Somente da força peso"

    ],

    c:0
  },

  {
    p:"A trajetória mais comum nos exercícios de MUV é:",

    a:[

      "Retilínea",

      "Circular",

      "Helicoidal",

      "Aleatória"

    ],

    c:0
  },

  {
    p:"No MUV, a aceleração é considerada:",

    a:[

      "Constante",

      "Variável",

      "Nula",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"Um carro passa de 10 m/s para 30 m/s em 5 s. Sua aceleração é:",

    a:[

      "4 m/s²",

      "2 m/s²",

      "8 m/s²",

      "6 m/s²"

    ],

    c:0
  },

  {
    p:"O símbolo Δ significa:",

    a:[

      "Variação",

      "Multiplicação",

      "Velocidade",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Quando a velocidade diminui uniformemente temos:",

    a:[

      "Movimento retardado",

      "Movimento acelerado",

      "Repouso",

      "Movimento circular"

    ],

    c:0
  },

  {
    p:"A queda livre é um exemplo de:",

    a:[

      "MUV",

      "MU",

      "Repouso",

      "Movimento circular uniforme"

    ],

    c:0
  },

  {
    p:"No MUV o deslocamento cresce:",

    a:[

      "Cada vez mais rapidamente",

      "Sempre igual",

      "Mais lentamente",

      "De forma constante"

    ],

    c:0
  },

  {
    p:"A Física que estuda o MUV é:",

    a:[

      "Cinemática",

      "Óptica",

      "Ondulatória",

      "Termodinâmica"

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
   SIMULADOR MUV
===================================================== */

function analisarMUV(tipo){

  const resultado =
    document.getElementById(
      "resultadoMUV"
    );

  /*
    DADOS
  */
  const dados = {

    carro:{

      titulo:
        "🚗 Carro acelerando",

      tipo:
        "Aceleração positiva",

      texto:
        "O carro aumenta sua velocidade continuamente ao pressionar o acelerador. Isso caracteriza um Movimento Uniformemente Variado."

    },

    queda:{

      titulo:
        "🍎 Queda Livre",

      tipo:
        "Ação da gravidade",

      texto:
        "Na queda livre, a gravidade produz aceleração constante de aproximadamente 9,8 m/s²."

    },

    foguete:{

      titulo:
        "🚀 Foguete",

      tipo:
        "Grande aceleração",

      texto:
        "Durante a decolagem, o foguete aumenta rapidamente sua velocidade devido à enorme aceleração produzida pelos motores."

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

window.analisarMUV =
  analisarMUV;