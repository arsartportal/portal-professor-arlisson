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
  id: 12,

  /*
    Slug da aula
  */
  slug: "queda-livre",

  /*
    Título exibido
  */
  titulo: "Queda Livre",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 400

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Na queda livre atua principalmente:",

    a:[

      "A gravidade",

      "O atrito",

      "A força elétrica",

      "A força magnética"

    ],

    c:0
  },

  {
    p:"A aceleração da gravidade na Terra vale aproximadamente:",

    a:[

      "9,8 m/s²",

      "98 m/s²",

      "0,98 m/s²",

      "1 m/s²"

    ],

    c:0
  },

  {
    p:"Na queda livre desprezamos:",

    a:[

      "A resistência do ar",

      "A massa",

      "A velocidade",

      "A gravidade"

    ],

    c:0
  },

  {
    p:"A queda livre é um exemplo de:",

    a:[

      "MUV",

      "MU",

      "Repouso",

      "Movimento circular"

    ],

    c:0
  },

  {
    p:"Na queda livre a velocidade:",

    a:[

      "Aumenta continuamente",

      "Permanece constante",

      "Diminui",

      "Fica zero"

    ],

    c:0
  },

  {
    p:"A aceleração da gravidade aponta para:",

    a:[

      "O centro da Terra",

      "O espaço",

      "O norte",

      "O leste"

    ],

    c:0
  },

  {
    p:"A fórmula da velocidade na queda livre é:",

    a:[

      "V = V₀ + gt",

      "V = S/t",

      "V = gt²",

      "V = V₀ - S"

    ],

    c:0
  },

  {
    p:"A unidade da gravidade no SI é:",

    a:[

      "m/s²",

      "m/s",

      "N",

      "kg"

    ],

    c:0
  },

  {
    p:"Corpos de massas diferentes em queda livre:",

    a:[

      "Caem com mesma aceleração",

      "Caem com velocidades iguais sempre",

      "Não caem",

      "Possuem gravidades diferentes"

    ],

    c:0
  },

  {
    p:"Quando um corpo é lançado para cima:",

    a:[

      "A gravidade reduz sua velocidade",

      "A gravidade aumenta sua velocidade",

      "A gravidade desaparece",

      "O corpo fica sem aceleração"

    ],

    c:0
  },

  {
    p:"No ponto mais alto do lançamento vertical:",

    a:[

      "A velocidade é zero",

      "A gravidade é zero",

      "A aceleração é zero",

      "O tempo é zero"

    ],

    c:0
  },

  {
    p:"Após atingir o ponto mais alto:",

    a:[

      "O corpo entra em queda livre",

      "O corpo para permanentemente",

      "A gravidade desaparece",

      "A aceleração muda de direção"

    ],

    c:0
  },

  {
    p:"A função horária da posição na queda livre é:",

    a:[

      "S = S₀ + V₀t + gt²/2",

      "S = V/t",

      "S = gt",

      "S = V²"

    ],

    c:0
  },

  {
    p:"A equação de Torricelli para queda livre é:",

    a:[

      "V² = V₀² + 2gΔS",

      "V = gt",

      "S = Vt",

      "g = V/t"

    ],

    c:0
  },

  {
    p:"A gravidade é responsável por:",

    a:[

      "Acelerar os corpos",

      "Parar os corpos",

      "Eliminar a velocidade",

      "Diminuir o tempo"

    ],

    c:0
  },

  {
    p:"Na ausência de resistência do ar:",

    a:[

      "Todos os corpos caem igualmente",

      "Os mais pesados caem primeiro",

      "Os leves sobem",

      "A massa altera a gravidade"

    ],

    c:0
  },

  {
    p:"A velocidade na queda livre depende:",

    a:[

      "Do tempo",

      "Da massa",

      "Da temperatura",

      "Da cor do objeto"

    ],

    c:0
  },

  {
    p:"A trajetória da queda livre é geralmente:",

    a:[

      "Vertical",

      "Circular",

      "Helicoidal",

      "Parabólica"

    ],

    c:0
  },

  {
    p:"O movimento de um objeto abandonado é:",

    a:[

      "Acelerado",

      "Uniforme",

      "Retardado",

      "Circular"

    ],

    c:0
  },

  {
    p:"A aceleração da gravidade é considerada:",

    a:[

      "Constante",

      "Variável",

      "Nula",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"Um objeto abandonado do repouso possui velocidade inicial:",

    a:[

      "Zero",

      "10 m/s",

      "9,8 m/s",

      "100 m/s"

    ],

    c:0
  },

  {
    p:"O gráfico velocidade × tempo da queda livre é:",

    a:[

      "Uma reta inclinada",

      "Uma parábola",

      "Uma reta horizontal",

      "Um círculo"

    ],

    c:0
  },

  {
    p:"Na subida do lançamento vertical:",

    a:[

      "A velocidade diminui",

      "A velocidade aumenta",

      "A gravidade desaparece",

      "O movimento é uniforme"

    ],

    c:0
  },

  {
    p:"Na descida do lançamento vertical:",

    a:[

      "A velocidade aumenta",

      "A velocidade diminui",

      "A aceleração desaparece",

      "O corpo fica parado"

    ],

    c:0
  },

  {
    p:"A Física que estuda a queda livre é:",

    a:[

      "Cinemática",

      "Óptica",

      "Ondulatória",

      "Termologia"

    ],

    c:0
  },

  {
    p:"A gravidade é uma:",

    a:[

      "Aceleração",

      "Velocidade",

      "Força elétrica",

      "Temperatura"

    ],

    c:0
  },

  {
    p:"A área sob o gráfico velocidade × tempo representa:",

    a:[

      "Deslocamento",

      "Massa",

      "Temperatura",

      "Pressão"

    ],

    c:0
  },

  {
    p:"O lançamento vertical é um exemplo de:",

    a:[

      "MUV",

      "MU",

      "Repouso",

      "Movimento circular"

    ],

    c:0
  },

  {
    p:"A velocidade de um corpo em queda livre:",

    a:[

      "Aumenta a cada segundo",

      "Permanece fixa",

      "Diminui a cada segundo",

      "É sempre zero"

    ],

    c:0
  },

  {
    p:"Sem gravidade:",

    a:[

      "Não haveria queda livre",

      "Os corpos cairiam mais rápido",

      "A massa aumentaria",

      "O tempo diminuiria"

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

function analisarQueda(tipo){

  const resultado =
    document.getElementById(
      "resultadoQueda"
    );

  /*
    DADOS
  */
  const dados = {

    maca:{

      titulo:
        "🍎 Maçã caindo",

      tipo:
        "Queda Livre",

      texto:
        "A maçã acelera continuamente devido à ação da gravidade terrestre."

    },

    paraquedas:{

      titulo:
        "🪂 Paraquedas",

      tipo:
        "Resistência do ar",

      texto:
        "O paraquedas aumenta muito a resistência do ar, reduzindo a velocidade de queda."

    },

    meteoro:{

      titulo:
        "☄️ Meteoro",

      tipo:
        "Grande velocidade",

      texto:
        "Meteoros podem atingir velocidades enormes devido à ação gravitacional."

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

window.analisarQueda =
  analisarQueda;