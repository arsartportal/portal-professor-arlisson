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
  id:213,

  /*
    SLUG
  */
  slug:
    "difracao-do-som",

  /*
    TÍTULO
  */
  titulo:
    "Difração do Som",

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
    p:"A difração ocorre quando a onda:",

    a:[

      "Desaparece",

      "Contorna obstáculos",

      "Congela",

      "Vira luz"

    ],

    c:1
  },

  {
    p:"A difração do som permite:",

    a:[

      "Ouvir sons atrás de obstáculos",

      "Eliminar o som",

      "Transformar som em luz",

      "Parar a propagação"

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
    p:"Na fórmula v = λ·f, λ representa:",

    a:[

      "Velocidade",

      "Frequência",

      "Comprimento de onda",

      "Energia"

    ],

    c:2
  },

  {
    p:"A difração é mais intensa quando:",

    a:[

      "O obstáculo é comparável ao comprimento de onda",

      "Não existe obstáculo",

      "O som desaparece",

      "Há vácuo"

    ],

    c:0
  },

  {
    p:"Sons graves sofrem:",

    a:[

      "Maior difração",

      "Menor difração",

      "Nenhuma difração",

      "Congelamento"

    ],

    c:0
  },

  {
    p:"Sons graves possuem:",

    a:[

      "Maior comprimento de onda",

      "Menor comprimento de onda",

      "Maior velocidade",

      "Menor frequência e menor λ"

    ],

    c:0
  },

  {
    p:"A difração explica por que ouvimos pessoas:",

    a:[

      "Atrás de paredes",

      "No vácuo",

      "Sem ar",

      "Sem propagação"

    ],

    c:0
  },

  {
    p:"A frequência do som é medida em:",

    a:[

      "Pascal",

      "Newton",

      "Hertz",

      "Joule"

    ],

    c:2
  },

  {
    p:"Quanto maior o comprimento de onda:",

    a:[

      "Maior a difração",

      "Menor a difração",

      "Maior a gravidade",

      "Menor a velocidade"

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
    p:"A difração pode ocorrer em:",

    a:[

      "Portas",

      "Janelas",

      "Esquinas",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A difração sonora é um fenômeno:",

    a:[

      "Ondulatório",

      "Nuclear",

      "Químico",

      "Atômico"

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
    p:"Ondas de baixa frequência:",

    a:[

      "Difratam mais",

      "Difratam menos",

      "Não sofrem difração",

      "Desaparecem"

    ],

    c:0
  },

  {
    p:"A difração ocorre devido ao comportamento:",

    a:[

      "Ondulatório",

      "Gravitacional",

      "Nuclear",

      "Magnético"

    ],

    c:0
  },

  {
    p:"Uma abertura pequena pode:",

    a:[

      "Espalhar as ondas sonoras",

      "Eliminar o som",

      "Parar a frequência",

      "Congelar a onda"

    ],

    c:0
  },

  {
    p:"A difração sonora é importante em:",

    a:[

      "Acústica",

      "Projetos arquitetônicos",

      "Auditórios",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A propagação do som depende:",

    a:[

      "Do meio material",

      "Da luz",

      "Do magnetismo",

      "Da gravidade"

    ],

    c:0
  },

  {
    p:"O comprimento de onda depende da:",

    a:[

      "Velocidade e frequência",

      "Cor",

      "Gravidade",

      "Temperatura solar"

    ],

    c:0
  },

  {
    p:"Sons agudos possuem:",

    a:[

      "Menor comprimento de onda",

      "Maior comprimento de onda",

      "Maior difração",

      "Maior massa"

    ],

    c:0
  },

  {
    p:"A difração permite que o som:",

    a:[

      "Ultrapasse barreiras",

      "Vire luz",

      "Desapareça",

      "Pare de vibrar"

    ],

    c:0
  },

  {
    p:"As ondas sonoras são estudadas na:",

    a:[

      "Acústica",

      "Astronomia",

      "Química",

      "Biologia"

    ],

    c:0
  },

  {
    p:"A difração é mais perceptível para ondas:",

    a:[

      "Longas",

      "Curtas",

      "Luminosas",

      "Nucleares"

    ],

    c:0
  },

  {
    p:"A frequência sonora depende da:",

    a:[

      "Fonte emissora",

      "Cor do ambiente",

      "Gravidade",

      "Temperatura do Sol"

    ],

    c:0
  },

  {
    p:"A difração sonora ocorre porque o som é:",

    a:[

      "Uma onda",

      "Uma partícula sólida",

      "Luz pura",

      "Energia nuclear"

    ],

    c:0
  },

  {
    p:"A Física que estuda o som é chamada:",

    a:[

      "Acústica",

      "Óptica",

      "Mecânica Quântica",

      "Termologia"

    ],

    c:0
  },

  {
    p:"As ondas sonoras conseguem contornar obstáculos devido à:",

    a:[

      "Difração",

      "Reflexão",

      "Refração",

      "Combustão"

    ],

    c:0
  },

  {
    p:"A difração sonora demonstra o caráter:",

    a:[

      "Ondulatório do som",

      "Nuclear do som",

      "Magnético do som",

      "Gravitacional do som"

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

function analisarDifracao(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    graves:{

      titulo:
        "🎵 Sons Graves",

      tipo:
        "Maior difração",

      texto:
        "Sons graves possuem maior comprimento de onda e conseguem contornar obstáculos com mais facilidade."

    },

    obstaculos:{

      titulo:
        "🧱 Obstáculos",

      tipo:
        "Contorno das ondas",

      texto:
        "A difração permite que as ondas sonoras contornem paredes, portas e outros obstáculos."

    },

    aberturas:{

      titulo:
        "🚪 Aberturas",

      tipo:
        "Espalhamento sonoro",

      texto:
        "Quando passam por pequenas aberturas, as ondas sonoras se espalham pelo ambiente."

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

window.analisarDifracao =
  analisarDifracao;