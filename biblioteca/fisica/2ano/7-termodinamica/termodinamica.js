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
  id:207,

  /*
    SLUG
  */
  slug:
    "termodinamica",

  /*
    TÍTULO
  */
  titulo:
    "Termodinâmica",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1400

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A Termodinâmica estuda:",

    a:[

      "Somente eletricidade",

      "Calor, trabalho e energia",

      "Apenas magnetismo",

      "Somente movimento"

    ],

    c:1
  },

  {
    p:"A Primeira Lei da Termodinâmica representa:",

    a:[

      "A conservação da energia",

      "A destruição da matéria",

      "A gravidade universal",

      "A lei da inércia"

    ],

    c:0
  },

  {
    p:"Na fórmula Q = τ + ΔU, Q representa:",

    a:[

      "Trabalho",

      "Pressão",

      "Calor",

      "Volume"

    ],

    c:2
  },

  {
    p:"A letra τ representa:",

    a:[

      "Temperatura",

      "Trabalho",

      "Massa",

      "Potência"

    ],

    c:1
  },

  {
    p:"ΔU representa:",

    a:[

      "Energia elétrica",

      "Variação da energia interna",

      "Força",

      "Aceleração"

    ],

    c:1
  },

  {
    p:"O trabalho termodinâmico ocorre quando:",

    a:[

      "Há variação de volume",

      "Há emissão de luz",

      "Há aumento de massa",

      "Há gravidade"

    ],

    c:0
  },

  {
    p:"A fórmula do trabalho termodinâmico é:",

    a:[

      "τ = p·ΔV",

      "Q = m·c·ΔT",

      "E = mc²",

      "F = m·a"

    ],

    c:0
  },

  {
    p:"A Segunda Lei da Termodinâmica está relacionada:",

    a:[

      "À entropia",

      "À eletricidade",

      "À gravitação",

      "À óptica"

    ],

    c:0
  },

  {
    p:"A entropia mede:",

    a:[

      "A massa",

      "O volume",

      "A desordem do sistema",

      "A velocidade"

    ],

    c:2
  },

  {
    p:"Os sistemas físicos tendem:",

    a:[

      "À diminuição da entropia",

      "Ao aumento da entropia",

      "Ao desaparecimento",

      "À ausência de energia"

    ],

    c:1
  },

  {
    p:"As máquinas térmicas transformam:",

    a:[

      "Calor em trabalho",

      "Luz em massa",

      "Som em energia nuclear",

      "Pressão em gravidade"

    ],

    c:0
  },

  {
    p:"Um exemplo de máquina térmica é:",

    a:[

      "Motor de automóvel",

      "Espelho",

      "Lâmpada",

      "Bússola"

    ],

    c:0
  },

  {
    p:"O rendimento de uma máquina térmica é:",

    a:[

      "Sempre 100%",

      "Maior que 100%",

      "Limitado",

      "Inexistente"

    ],

    c:2
  },

  {
    p:"A fórmula do rendimento é:",

    a:[

      "η = τ/Q",

      "Q = m·L",

      "F = m·a",

      "P = U·i"

    ],

    c:0
  },

  {
    p:"A energia interna depende:",

    a:[

      "Da energia microscópica das partículas",

      "Somente da massa",

      "Somente da velocidade da luz",

      "Da gravidade"

    ],

    c:0
  },

  {
    p:"Quando um gás recebe calor:",

    a:[

      "Pode realizar trabalho",

      "Desaparece",

      "Perde temperatura sempre",

      "Congela"

    ],

    c:0
  },

  {
    p:"A unidade de calor no SI é:",

    a:[

      "Pascal",

      "Newton",

      "Joule",

      "Metro"

    ],

    c:2
  },

  {
    p:"O calor é uma forma de:",

    a:[

      "Energia",

      "Massa",

      "Força",

      "Velocidade"

    ],

    c:0
  },

  {
    p:"Na Termodinâmica o calor flui:",

    a:[

      "Do frio para o quente",

      "Do quente para o frio",

      "Sem direção",

      "Somente no vácuo"

    ],

    c:1
  },

  {
    p:"O equilíbrio térmico ocorre quando:",

    a:[

      "As temperaturas se igualam",

      "O calor desaparece",

      "A massa aumenta",

      "A pressão zera"

    ],

    c:0
  },

  {
    p:"O estudo da Termodinâmica possui aplicações em:",

    a:[

      "Motores",

      "Usinas",

      "Refrigeração",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A geladeira funciona baseada em:",

    a:[

      "Trocas térmicas",

      "Gravidade",

      "Reflexão",

      "Ondas sonoras"

    ],

    c:0
  },

  {
    p:"A pressão de um gás pode variar com:",

    a:[

      "Temperatura",

      "Volume",

      "Energia",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A Termodinâmica está ligada à:",

    a:[

      "Energia térmica",

      "Somente eletricidade",

      "Somente magnetismo",

      "Somente óptica"

    ],

    c:0
  },

  {
    p:"O calor recebido por um sistema pode:",

    a:[

      "Alterar sua energia interna",

      "Realizar trabalho",

      "Ambos",

      "Nenhum"

    ],

    c:2
  },

  {
    p:"A máquina térmica ideal foi estudada por:",

    a:[

      "Newton",

      "Carnot",

      "Galileu",

      "Tesla"

    ],

    c:1
  },

  {
    p:"O rendimento real de uma máquina térmica:",

    a:[

      "Nunca é 100%",

      "Sempre é infinito",

      "É negativo",

      "É nulo"

    ],

    c:0
  },

  {
    p:"A energia não pode ser:",

    a:[

      "Transformada",

      "Conservada",

      "Criada nem destruída",

      "Transferida"

    ],

    c:2
  },

  {
    p:"A Termodinâmica é uma área da:",

    a:[

      "Biologia",

      "Química Orgânica",

      "Física",

      "Astronomia"

    ],

    c:2
  },

  {
    p:"A Primeira Lei da Termodinâmica é uma aplicação do princípio da:",

    a:[

      "Conservação da energia",

      "Refração da luz",

      "Ação e reação",

      "Gravitação"

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

function analisarTermodinamica(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    energia:{

      titulo:
        "⚙️ Energia Interna",

      tipo:
        "Energia microscópica",

      texto:
        "A energia interna corresponde à soma das energias das partículas do sistema."

    },

    trabalho:{

      titulo:
        "🔧 Trabalho Termodinâmico",

      tipo:
        "Expansão e compressão",

      texto:
        "O trabalho termodinâmico ocorre quando o gás sofre variação de volume."

    },

    entropia:{

      titulo:
        "📈 Entropia",

      tipo:
        "Desordem do sistema",

      texto:
        "A entropia mede o grau de desorganização de um sistema físico."

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

window.analisarTermodinamica =
  analisarTermodinamica;