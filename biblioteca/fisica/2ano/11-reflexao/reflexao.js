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
  id:211,

  /*
    SLUG
  */
  slug:
    "reflexao-do-som",

  /*
    TÍTULO
  */
  titulo:
    "Reflexão do Som",

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
    p:"A reflexão do som ocorre quando:",

    a:[

      "O som desaparece",

      "A onda sonora retorna ao meio",

      "A luz é refletida",

      "O som vira calor"

    ],

    c:1
  },

  {
    p:"O eco é causado por:",

    a:[

      "Reflexão sonora",

      "Refração",

      "Difração",

      "Interferência"

    ],

    c:0
  },

  {
    p:"Para existir eco, o som refletido deve:",

    a:[

      "Chegar instantaneamente",

      "Retornar após um intervalo perceptível",

      "Desaparecer",

      "Virar luz"

    ],

    c:1
  },

  {
    p:"A fórmula usada no cálculo do eco é:",

    a:[

      "F = m·a",

      "Q = m·c·ΔT",

      "d = (v·t)/2",

      "P = U·i"

    ],

    c:2
  },

  {
    p:"Na fórmula do eco, v representa:",

    a:[

      "Volume",

      "Velocidade do som",

      "Vibração",

      "Viscosidade"

    ],

    c:1
  },

  {
    p:"A reverberação ocorre quando:",

    a:[

      "O som não reflete",

      "As reflexões chegam rapidamente",

      "O som congela",

      "O som desaparece"

    ],

    c:1
  },

  {
    p:"Ambientes vazios geralmente possuem:",

    a:[

      "Maior reverberação",

      "Menor reflexão",

      "Ausência de som",

      "Som congelado"

    ],

    c:0
  },

  {
    p:"Materiais macios tendem a:",

    a:[

      "Refletir mais som",

      "Absorver o som",

      "Produzir eco",

      "Aumentar a frequência"

    ],

    c:1
  },

  {
    p:"Cortinas e carpetes ajudam na:",

    a:[

      "Absorção sonora",

      "Refração da luz",

      "Produção de eco",

      "Gravidade"

    ],

    c:0
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
    p:"O eco pode ser observado em:",

    a:[

      "Montanhas",

      "Túneis",

      "Grandes salões",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A reflexão sonora depende da:",

    a:[

      "Superfície atingida",

      "Cor do ambiente",

      "Gravidade",

      "Temperatura solar"

    ],

    c:0
  },

  {
    p:"Superfícies rígidas geralmente:",

    a:[

      "Absorvem totalmente o som",

      "Refletem mais som",

      "Eliminam o eco",

      "Diminuem a velocidade"

    ],

    c:1
  },

  {
    p:"A acústica estuda:",

    a:[

      "Os fenômenos sonoros",

      "Os planetas",

      "A eletricidade",

      "A gravidade"

    ],

    c:0
  },

  {
    p:"A ecolocalização é utilizada por:",

    a:[

      "Morcegos",

      "Golfinhos",

      "Alguns animais",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A ecolocalização funciona através da:",

    a:[

      "Reflexão do som",

      "Refração da luz",

      "Gravidade",

      "Magnetização"

    ],

    c:0
  },

  {
    p:"Teatros utilizam estudos acústicos para:",

    a:[

      "Melhorar a qualidade sonora",

      "Aumentar a gravidade",

      "Produzir luz",

      "Diminuir o som"

    ],

    c:0
  },

  {
    p:"O excesso de reverberação pode:",

    a:[

      "Prejudicar a compreensão do som",

      "Aumentar a luz",

      "Eliminar o eco",

      "Parar as ondas"

    ],

    c:0
  },

  {
    p:"O ouvido humano percebe o eco quando o intervalo é superior a aproximadamente:",

    a:[

      "0,1 s",

      "10 s",

      "1 min",

      "5 s"

    ],

    c:0
  },

  {
    p:"O eco é um exemplo de:",

    a:[

      "Reflexão sonora",

      "Difração",

      "Refração",

      "Interferência luminosa"

    ],

    c:0
  },

  {
    p:"As ondas sonoras são:",

    a:[

      "Mecânicas",

      "Eletromagnéticas",

      "Nucleares",

      "Gravitacionais"

    ],

    c:0
  },

  {
    p:"As ondas sonoras precisam de:",

    a:[

      "Vácuo",

      "Meio material",

      "Luz",

      "Campo elétrico"

    ],

    c:1
  },

  {
    p:"A reflexão sonora ocorre devido ao choque da onda com:",

    a:[

      "Uma superfície",

      "O vácuo",

      "A luz",

      "O magnetismo"

    ],

    c:0
  },

  {
    p:"Auditórios modernos utilizam:",

    a:[

      "Tratamento acústico",

      "Campos magnéticos",

      "Laser nuclear",

      "Ausência de paredes"

    ],

    c:0
  },

  {
    p:"A absorção sonora reduz:",

    a:[

      "A reflexão",

      "A gravidade",

      "A massa",

      "A temperatura"

    ],

    c:0
  },

  {
    p:"O som refletido mantém:",

    a:[

      "A natureza sonora",

      "A forma sólida",

      "A gravidade",

      "A massa"

    ],

    c:0
  },

  {
    p:"A reverberação é comum em:",

    a:[

      "Igrejas e ginásios",

      "Campos abertos",

      "Vácuo",

      "Espaço sideral"

    ],

    c:0
  },

  {
    p:"A Física que estuda o som é chamada:",

    a:[

      "Acústica",

      "Óptica",

      "Astronomia",

      "Termologia"

    ],

    c:0
  },

  {
    p:"O eco depende da distância da superfície refletora porque:",

    a:[

      "O som precisa de tempo para voltar",

      "O som perde massa",

      "A luz interfere",

      "O ar desaparece"

    ],

    c:0
  },

  {
    p:"A reflexão do som é importante em:",

    a:[

      "Arquitetura acústica",

      "Teatros",

      "Sonar",

      "Todas as anteriores"

    ],

    c:3
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

function analisarReflexao(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    eco:{

      titulo:
        "🪞 Eco",

      tipo:
        "Reflexão perceptível",

      texto:
        "O eco ocorre quando a onda sonora refletida retorna ao ouvinte após um intervalo de tempo perceptível."

    },

    reverberacao:{

      titulo:
        "🎵 Reverberação",

      tipo:
        "Persistência sonora",

      texto:
        "A reverberação acontece quando múltiplas reflexões chegam rapidamente ao ouvido, prolongando o som."

    },

    absorcao:{

      titulo:
        "🧽 Absorção Sonora",

      tipo:
        "Redução da reflexão",

      texto:
        "Materiais macios absorvem parte das ondas sonoras, diminuindo ecos e reverberações."

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

window.analisarReflexao =
  analisarReflexao;