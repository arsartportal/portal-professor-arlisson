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
  id:214,

  /*
    SLUG
  */
  slug:
    "interferencia-do-som",

  /*
    TÍTULO
  */
  titulo:
    "Interferência do Som",

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
    p:"A interferência ocorre quando:",

    a:[

      "Ondas sonoras se encontram",

      "O som desaparece",

      "A luz congela",

      "A matéria se divide"

    ],

    c:0
  },

  {
    p:"Na interferência, as ondas:",

    a:[

      "Somem",

      "Combinam amplitudes",

      "Viram luz",

      "Param de vibrar"

    ],

    c:1
  },

  {
    p:"A interferência construtiva produz:",

    a:[

      "Cancelamento do som",

      "Reforço da amplitude",

      "Desaparecimento da onda",

      "Ausência de frequência"

    ],

    c:1
  },

  {
    p:"Na interferência construtiva as ondas estão:",

    a:[

      "Em oposição de fase",

      "Em fase",

      "Sem frequência",

      "Paradas"

    ],

    c:1
  },

  {
    p:"A interferência destrutiva provoca:",

    a:[

      "Reforço do som",

      "Cancelamento parcial ou total",

      "Aumento da gravidade",

      "Produção de luz"

    ],

    c:1
  },

  {
    p:"Na interferência destrutiva as ondas estão:",

    a:[

      "Em fase",

      "Em oposição de fase",

      "Sem amplitude",

      "Congeladas"

    ],

    c:1
  },

  {
    p:"Batimentos ocorrem quando:",

    a:[

      "As frequências são próximas",

      "O som desaparece",

      "As ondas são luminosas",

      "Existe vácuo"

    ],

    c:0
  },

  {
    p:"A frequência dos batimentos é dada por:",

    a:[

      "f = λ·v",

      "fb = |f1 - f2|",

      "F = m·a",

      "Q = m·c·ΔT"

    ],

    c:1
  },

  {
    p:"Batimentos produzem:",

    a:[

      "Variações periódicas da intensidade",

      "Desaparecimento do som",

      "Mudança de massa",

      "Energia nuclear"

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

      "Luz",

      "Campo elétrico"

    ],

    c:1
  },

  {
    p:"Na interferência construtiva a intensidade sonora:",

    a:[

      "Aumenta",

      "Diminui",

      "Desaparece",

      "Congela"

    ],

    c:0
  },

  {
    p:"Na interferência destrutiva a intensidade sonora:",

    a:[

      "Aumenta",

      "Pode diminuir",

      "Vira luz",

      "Fica infinita"

    ],

    c:1
  },

  {
    p:"Fones antirruído utilizam:",

    a:[

      "Interferência destrutiva",

      "Refração",

      "Difração",

      "Gravidade"

    ],

    c:0
  },

  {
    p:"A interferência sonora demonstra o caráter:",

    a:[

      "Ondulatório do som",

      "Nuclear do som",

      "Magnético do som",

      "Gravitacional do som"

    ],

    c:0
  },

  {
    p:"A amplitude resultante depende:",

    a:[

      "Da combinação das ondas",

      "Da cor do som",

      "Da gravidade",

      "Da luz"

    ],

    c:0
  },

  {
    p:"Músicos utilizam batimentos para:",

    a:[

      "Afinar instrumentos",

      "Parar o som",

      "Produzir luz",

      "Aumentar massa"

    ],

    c:0
  },

  {
    p:"Quando duas cristas coincidem ocorre:",

    a:[

      "Interferência construtiva",

      "Interferência destrutiva",

      "Difração",

      "Refração"

    ],

    c:0
  },

  {
    p:"Quando crista e vale coincidem ocorre:",

    a:[

      "Reforço máximo",

      "Cancelamento",

      "Refração",

      "Reflexão"

    ],

    c:1
  },

  {
    p:"A frequência é medida em:",

    a:[

      "Newton",

      "Pascal",

      "Hertz",

      "Joule"

    ],

    c:2
  },

  {
    p:"As ondas sonoras podem sofrer:",

    a:[

      "Interferência",

      "Reflexão",

      "Difração",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A interferência depende da:",

    a:[

      "Superposição das ondas",

      "Cor do ambiente",

      "Gravidade",

      "Luz solar"

    ],

    c:0
  },

  {
    p:"O cancelamento ativo de ruído funciona através de:",

    a:[

      "Ondas em oposição de fase",

      "Laser",

      "Vácuo",

      "Energia nuclear"

    ],

    c:0
  },

  {
    p:"A Física que estuda o som é chamada:",

    a:[

      "Acústica",

      "Astronomia",

      "Biologia",

      "Óptica"

    ],

    c:0
  },

  {
    p:"Ondas em fase possuem:",

    a:[

      "Crestas e vales alinhados",

      "Cancelamento total",

      "Ausência de amplitude",

      "Ausência de frequência"

    ],

    c:0
  },

  {
    p:"A superposição de ondas é princípio da:",

    a:[

      "Interferência",

      "Combustão",

      "Magnetização",

      "Dilatação"

    ],

    c:0
  },

  {
    p:"Batimentos são percebidos como:",

    a:[

      "Oscilações no volume do som",

      "Ausência de som",

      "Luz piscando",

      "Mudança de massa"

    ],

    c:0
  },

  {
    p:"A interferência pode ocorrer com:",

    a:[

      "Qualquer tipo de onda",

      "Somente luz",

      "Somente sólidos",

      "Somente partículas"

    ],

    c:0
  },

  {
    p:"A interferência sonora é importante em:",

    a:[

      "Acústica",

      "Engenharia de áudio",

      "Música",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A interferência do som ocorre devido ao caráter:",

    a:[

      "Ondulatório",

      "Nuclear",

      "Magnético",

      "Químico"

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

function analisarInterferencia(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    construtiva:{

      titulo:
        "➕ Interferência Construtiva",

      tipo:
        "Reforço sonoro",

      texto:
        "Quando ondas sonoras estão em fase, suas amplitudes se somam, aumentando a intensidade do som."

    },

    destrutiva:{

      titulo:
        "➖ Interferência Destrutiva",

      tipo:
        "Cancelamento sonoro",

      texto:
        "Ondas em oposição de fase podem reduzir ou cancelar parcialmente o som."

    },

    batimentos:{

      titulo:
        "🎵 Batimentos",

      tipo:
        "Oscilações de intensidade",

      texto:
        "Batimentos surgem da interferência entre ondas com frequências muito próximas."

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

window.analisarInterferencia =
  analisarInterferencia;