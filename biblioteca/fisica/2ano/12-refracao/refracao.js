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
  id:212,

  /*
    SLUG
  */
  slug:
    "refracao-do-som",

  /*
    TÍTULO
  */
  titulo:
    "Refração do Som",

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
    p:"A refração do som ocorre quando:",

    a:[

      "O som desaparece",

      "A onda sonora muda de meio ou velocidade",

      "A luz é refletida",

      "O som congela"

    ],

    c:1
  },

  {
    p:"Na refração sonora ocorre mudança de:",

    a:[

      "Velocidade da onda",

      "Massa da onda",

      "Natureza da onda",

      "Gravidade"

    ],

    c:0
  },

  {
    p:"A fórmula fundamental das ondas é:",

    a:[

      "F = m·a",

      "Q = m·c·ΔT",

      "v = λ·f",

      "P = U·i"

    ],

    c:2
  },

  {
    p:"Durante a refração sonora, a frequência:",

    a:[

      "Aumenta sempre",

      "Diminui sempre",

      "Permanece constante",

      "Desaparece"

    ],

    c:2
  },

  {
    p:"A velocidade do som depende:",

    a:[

      "Do meio de propagação",

      "Da cor do ambiente",

      "Da gravidade",

      "Do brilho"

    ],

    c:0
  },

  {
    p:"O som se propaga mais rapidamente:",

    a:[

      "No vácuo",

      "Nos sólidos",

      "Nos gases",

      "Na ausência de matéria"

    ],

    c:1
  },

  {
    p:"A temperatura influencia:",

    a:[

      "A velocidade do som",

      "A massa do som",

      "A gravidade",

      "A cor da onda"

    ],

    c:0
  },

  {
    p:"Quanto maior a temperatura do ar:",

    a:[

      "Maior a velocidade do som",

      "Menor a velocidade do som",

      "Maior a massa do som",

      "Menor a frequência"

    ],

    c:0
  },

  {
    p:"Na refração do som pode ocorrer mudança de:",

    a:[

      "Direção da propagação",

      "Massa",

      "Carga elétrica",

      "Gravidade"

    ],

    c:0
  },

  {
    p:"A frequência do som é medida em:",

    a:[

      "Joule",

      "Pascal",

      "Hertz",

      "Newton"

    ],

    c:2
  },

  {
    p:"O comprimento de onda pode mudar durante a:",

    a:[

      "Refração",

      "Gravidade",

      "Magnetização",

      "Combustão"

    ],

    c:0
  },

  {
    p:"O som é uma onda:",

    a:[

      "Eletromagnética",

      "Mecânica",

      "Nuclear",

      "Luminosa"

    ],

    c:1
  },

  {
    p:"As ondas sonoras precisam de:",

    a:[

      "Vácuo",

      "Meio material",

      "Campo magnético",

      "Luz"

    ],

    c:1
  },

  {
    p:"A refração sonora pode ocorrer devido a diferenças de:",

    a:[

      "Temperatura",

      "Densidade",

      "Meio",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A velocidade média do som no ar é aproximadamente:",

    a:[

      "340 m/s",

      "30 m/s",

      "3000 m/s",

      "3 m/s"

    ],

    c:0
  },

  {
    p:"O sonar utiliza fenômenos relacionados ao:",

    a:[

      "Som",

      "Luz",

      "Gravidade",

      "Eletricidade"

    ],

    c:0
  },

  {
    p:"Na água, o som se propaga:",

    a:[

      "Mais rápido que no ar",

      "Mais devagar que no ar",

      "Com velocidade zero",

      "Sem frequência"

    ],

    c:0
  },

  {
    p:"A refração do som pode curvar as ondas sonoras na:",

    a:[

      "Atmosfera",

      "Luz",

      "Gravidade",

      "Eletricidade"

    ],

    c:0
  },

  {
    p:"A mudança de meio pode provocar:",

    a:[

      "Refração sonora",

      "Desaparecimento do som",

      "Congelamento",

      "Criação de matéria"

    ],

    c:0
  },

  {
    p:"O som não se propaga:",

    a:[

      "Na água",

      "Nos sólidos",

      "No vácuo",

      "No ar"

    ],

    c:2
  },

  {
    p:"A refração está relacionada à mudança de:",

    a:[

      "Velocidade",

      "Massa",

      "Cor",

      "Energia nuclear"

    ],

    c:0
  },

  {
    p:"A frequência da onda depende da:",

    a:[

      "Fonte sonora",

      "Temperatura do ambiente",

      "Gravidade",

      "Pressão atmosférica"

    ],

    c:0
  },

  {
    p:"Ondas sonoras podem sofrer:",

    a:[

      "Reflexão",

      "Refração",

      "Difração",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A refração sonora é estudada na:",

    a:[

      "Acústica",

      "Astronomia",

      "Biologia",

      "Química Orgânica"

    ],

    c:0
  },

  {
    p:"O som sofre desvio devido à mudança de:",

    a:[

      "Velocidade",

      "Massa",

      "Cor",

      "Energia"

    ],

    c:0
  },

  {
    p:"Regiões quentes do ar fazem o som:",

    a:[

      "Aumentar velocidade",

      "Parar",

      "Desaparecer",

      "Congelar"

    ],

    c:0
  },

  {
    p:"Na refração sonora, o período da onda:",

    a:[

      "Permanece constante",

      "Desaparece",

      "Dobra",

      "Zera"

    ],

    c:0
  },

  {
    p:"A propagação sonora depende das propriedades:",

    a:[

      "Do meio",

      "Da luz",

      "Do magnetismo",

      "Da gravidade"

    ],

    c:0
  },

  {
    p:"A refração sonora pode alterar:",

    a:[

      "O comprimento de onda",

      "A frequência da fonte",

      "A natureza da onda",

      "A existência do som"

    ],

    c:0
  },

  {
    p:"A Física que estuda fenômenos sonoros é chamada:",

    a:[

      "Acústica",

      "Óptica",

      "Termologia",

      "Astronomia"

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

function analisarRefracao(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    temperatura:{

      titulo:
        "🌡️ Temperatura",

      tipo:
        "Mudança na velocidade",

      texto:
        "O aumento da temperatura do ar aumenta a velocidade de propagação do som."

    },

    meios:{

      titulo:
        "🌊 Diferentes Meios",

      tipo:
        "Mudança de propagação",

      texto:
        "Ao atravessar meios diferentes, o som altera sua velocidade e seu comprimento de onda."

    },

    atmosfera:{

      titulo:
        "🌬️ Refração Atmosférica",

      tipo:
        "Curvatura sonora",

      texto:
        "Diferenças térmicas e ventos podem curvar as trajetórias das ondas sonoras na atmosfera."

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

window.analisarRefracao =
  analisarRefracao;