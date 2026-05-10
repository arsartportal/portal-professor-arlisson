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
  id: 10,

  /*
    Slug da aula
  */
  slug: "movimento-uniforme",

  /*
    Título exibido
  */
  titulo: "Movimento Uniforme",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 250

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"O Movimento Uniforme ocorre quando:",

    a:[

      "A velocidade permanece constante",

      "A aceleração aumenta",

      "O corpo fica parado",

      "A velocidade diminui"

    ],

    c:0
  },

  {
    p:"No MU, a aceleração é:",

    a:[

      "Zero",

      "Positiva",

      "Negativa",

      "Variável"

    ],

    c:0
  },

  {
    p:"A fórmula da velocidade no MU é:",

    a:[

      "V = ΔS / Δt",

      "V = S × t",

      "V = t / S",

      "V = a × t"

    ],

    c:0
  },

  {
    p:"No Movimento Uniforme, o corpo percorre:",

    a:[

      "Distâncias iguais em tempos iguais",

      "Distâncias diferentes em tempos iguais",

      "Somente trajetórias curvas",

      "Movimentos acelerados"

    ],

    c:0
  },

  {
    p:"A equação horária do MU é:",

    a:[

      "S = S₀ + Vt",

      "S = V/t",

      "S = at²",

      "S = V²"

    ],

    c:0
  },

  {
    p:"No gráfico posição × tempo do MU temos:",

    a:[

      "Uma reta",

      "Uma parábola",

      "Uma curva senoidal",

      "Um círculo"

    ],

    c:0
  },

  {
    p:"No gráfico velocidade × tempo do MU temos:",

    a:[

      "Uma linha horizontal",

      "Uma parábola",

      "Uma reta inclinada",

      "Uma curva"

    ],

    c:0
  },

  {
    p:"Um carro percorre 100 km em 2 horas. Sua velocidade é:",

    a:[

      "50 km/h",

      "100 km/h",

      "25 km/h",

      "200 km/h"

    ],

    c:0
  },

  {
    p:"Quando a velocidade é positiva, o movimento é:",

    a:[

      "Progressivo",

      "Retrógrado",

      "Parado",

      "Circular"

    ],

    c:0
  },

  {
    p:"Quando a velocidade é negativa, o movimento é:",

    a:[

      "Retrógrado",

      "Progressivo",

      "Nulo",

      "Vertical"

    ],

    c:0
  },

  {
    p:"No MU a velocidade:",

    a:[

      "Não varia com o tempo",

      "Aumenta constantemente",

      "Diminui constantemente",

      "Depende da massa"

    ],

    c:0
  },

  {
    p:"A unidade da velocidade no SI é:",

    a:[

      "m/s",

      "kg",

      "N",

      "J"

    ],

    c:0
  },

  {
    p:"Um trem em MU possui aceleração:",

    a:[

      "Nula",

      "Muito grande",

      "Negativa",

      "Variável"

    ],

    c:0
  },

  {
    p:"A posição inicial é representada por:",

    a:[

      "S₀",

      "V",

      "ΔS",

      "t"

    ],

    c:0
  },

  {
    p:"No MU, a trajetória mais comum nos exercícios é:",

    a:[

      "Retilínea",

      "Circular",

      "Parabólica",

      "Aleatória"

    ],

    c:0
  },

  {
    p:"A velocidade média no MU é:",

    a:[

      "Igual à velocidade do movimento",

      "Sempre zero",

      "Maior que a instantânea",

      "Negativa"

    ],

    c:0
  },

  {
    p:"Se a reta do gráfico S × t for mais inclinada:",

    a:[

      "Maior será a velocidade",

      "Menor será a velocidade",

      "A aceleração será negativa",

      "O movimento será parado"

    ],

    c:0
  },

  {
    p:"Um móvel em repouso possui velocidade:",

    a:[

      "Zero",

      "Positiva",

      "Negativa",

      "Constante diferente de zero"

    ],

    c:0
  },

  {
    p:"O MU é estudado na:",

    a:[

      "Cinemática",

      "Termologia",

      "Óptica",

      "Eletrostática"

    ],

    c:0
  },

  {
    p:"A equação horária serve para:",

    a:[

      "Determinar a posição em qualquer instante",

      "Calcular massa",

      "Medir temperatura",

      "Determinar força elétrica"

    ],

    c:0
  },

  {
    p:"No gráfico V × t do MU a área pode representar:",

    a:[

      "Deslocamento",

      "Massa",

      "Temperatura",

      "Densidade"

    ],

    c:0
  },

  {
    p:"Um veículo percorreu 180 km em 3 h. Sua velocidade foi:",

    a:[

      "60 km/h",

      "90 km/h",

      "30 km/h",

      "120 km/h"

    ],

    c:0
  },

  {
    p:"No MU, a aceleração instantânea é:",

    a:[

      "0 m/s²",

      "10 m/s²",

      "1 m/s²",

      "Variável"

    ],

    c:0
  },

  {
    p:"O gráfico S × t crescente indica:",

    a:[

      "Movimento progressivo",

      "Movimento retrógrado",

      "Repouso",

      "Queda livre"

    ],

    c:0
  },

  {
    p:"No Movimento Uniforme, o movimento é considerado:",

    a:[

      "Regular",

      "Acelerado",

      "Desordenado",

      "Oscilatório"

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
   SIMULADOR MU
===================================================== */

function analisarMU(tipo){

  const resultado =
    document.getElementById(
      "resultadoMU"
    );

  /*
    DADOS
  */
  const dados = {

    carro:{

      titulo:
        "🚗 Carro em Movimento Uniforme",

      tipo:
        "Velocidade constante",

      texto:
        "O carro percorre 80 km a cada hora mantendo sempre a mesma velocidade. Isso caracteriza um Movimento Uniforme."

    },

    trem:{

      titulo:
        "🚄 Trem em linha reta",

      tipo:
        "MU ferroviário",

      texto:
        "O trem mantém velocidade constante durante grande parte do trajeto, percorrendo distâncias iguais em tempos iguais."

    },

    moto:{

      titulo:
        "🏍️ Moto em estrada",

      tipo:
        "Movimento progressivo",

      texto:
        "A moto aumenta continuamente sua posição ao longo do tempo mantendo velocidade constante."

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

window.analisarMU =
  analisarMU;