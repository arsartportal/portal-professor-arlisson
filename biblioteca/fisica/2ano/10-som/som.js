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
  id:210,

  /*
    SLUG
  */
  slug:
    "som",

  /*
    TÍTULO
  */
  titulo:
    "Som",

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
    p:"O som é uma onda:",

    a:[

      "Eletromagnética",

      "Mecânica",

      "Nuclear",

      "Gravitacional"

    ],

    c:1
  },

  {
    p:"O som necessita de:",

    a:[

      "Vácuo",

      "Meio material",

      "Campo elétrico",

      "Luz"

    ],

    c:1
  },

  {
    p:"O som é produzido por:",

    a:[

      "Reflexão",

      "Vibração dos corpos",

      "Gravidade",

      "Magnetismo"

    ],

    c:1
  },

  {
    p:"A fórmula da velocidade da onda sonora é:",

    a:[

      "F = m·a",

      "Q = m·c·ΔT",

      "v = λ·f",

      "P = U·i"

    ],

    c:2
  },

  {
    p:"Na fórmula v = λ·f, f representa:",

    a:[

      "Frequência",

      "Força",

      "Energia",

      "Amplitude"

    ],

    c:0
  },

  {
    p:"A frequência do som determina:",

    a:[

      "A intensidade",

      "A altura",

      "A velocidade",

      "A energia"

    ],

    c:1
  },

  {
    p:"Sons agudos possuem:",

    a:[

      "Baixa frequência",

      "Alta frequência",

      "Baixa energia",

      "Baixa velocidade"

    ],

    c:1
  },

  {
    p:"Sons graves possuem:",

    a:[

      "Alta frequência",

      "Baixa frequência",

      "Alta intensidade",

      "Alta velocidade"

    ],

    c:1
  },

  {
    p:"A intensidade sonora está relacionada:",

    a:[

      "À energia da onda",

      "À cor da onda",

      "À massa do som",

      "À gravidade"

    ],

    c:0
  },

  {
    p:"A unidade do nível sonoro é:",

    a:[

      "Pascal",

      "Newton",

      "Decibel",

      "Joule"

    ],

    c:2
  },

  {
    p:"O timbre permite distinguir:",

    a:[

      "Diferentes fontes sonoras",

      "A velocidade da luz",

      "A massa dos objetos",

      "A gravidade"

    ],

    c:0
  },

  {
    p:"O som se propaga mais rápido:",

    a:[

      "No vácuo",

      "Nos gases",

      "Nos sólidos",

      "Na ausência de matéria"

    ],

    c:2
  },

  {
    p:"O eco é causado por:",

    a:[

      "Refração",

      "Reflexão do som",

      "Interferência",

      "Difração"

    ],

    c:1
  },

  {
    p:"O eco ocorre quando o som:",

    a:[

      "É absorvido",

      "Retorna ao ouvinte",

      "Desaparece",

      "Vira luz"

    ],

    c:1
  },

  {
    p:"O Efeito Doppler ocorre devido:",

    a:[

      "À mudança de temperatura",

      "Ao movimento relativo",

      "À gravidade",

      "À eletricidade"

    ],

    c:1
  },

  {
    p:"Quando uma ambulância se aproxima, o som parece:",

    a:[

      "Mais grave",

      "Mais agudo",

      "Mais lento",

      "Mais fraco"

    ],

    c:1
  },

  {
    p:"Ondas sonoras são:",

    a:[

      "Longitudinais",

      "Transversais",

      "Nucleares",

      "Eletrostáticas"

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
    p:"A velocidade média do som no ar é aproximadamente:",

    a:[

      "30 m/s",

      "340 m/s",

      "3000 m/s",

      "3 m/s"

    ],

    c:1
  },

  {
    p:"A amplitude da onda sonora influencia:",

    a:[

      "A intensidade",

      "A altura",

      "A frequência",

      "O timbre"

    ],

    c:0
  },

  {
    p:"Quanto maior a amplitude:",

    a:[

      "Mais fraco o som",

      "Mais intenso o som",

      "Mais lento o som",

      "Mais grave o som"

    ],

    c:1
  },

  {
    p:"A frequência é medida em:",

    a:[

      "Hertz",

      "Metro",

      "Segundo",

      "Newton"

    ],

    c:0
  },

  {
    p:"O ouvido humano percebe sons entre aproximadamente:",

    a:[

      "20 Hz e 20.000 Hz",

      "1 Hz e 10 Hz",

      "100.000 Hz e 200.000 Hz",

      "0 Hz e 5 Hz"

    ],

    c:0
  },

  {
    p:"Sons abaixo de 20 Hz são chamados de:",

    a:[

      "Ultrassons",

      "Infrassons",

      "Hiperssons",

      "Megassons"

    ],

    c:1
  },

  {
    p:"Sons acima de 20.000 Hz são chamados de:",

    a:[

      "Infrassons",

      "Ultrassons",

      "Megassons",

      "Subsons"

    ],

    c:1
  },

  {
    p:"O ultrassom possui aplicações em:",

    a:[

      "Medicina",

      "Indústria",

      "Exames de imagem",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A reverberação ocorre quando:",

    a:[

      "O som permanece refletindo no ambiente",

      "O som desaparece",

      "O som congela",

      "O som vira luz"

    ],

    c:0
  },

  {
    p:"O som é estudado na área da Física chamada:",

    a:[

      "Acústica",

      "Óptica",

      "Mecânica Quântica",

      "Astronomia"

    ],

    c:0
  },

  {
    p:"A altura do som depende da:",

    a:[

      "Frequência",

      "Amplitude",

      "Velocidade",

      "Energia"

    ],

    c:0
  },

  {
    p:"A intensidade sonora excessiva pode causar:",

    a:[

      "Danos auditivos",

      "Aumento da gravidade",

      "Refração",

      "Congelamento"

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

function analisarSom(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    frequencia:{

      titulo:
        "🎼 Frequência Sonora",

      tipo:
        "Altura do som",

      texto:
        "A frequência determina se o som será grave ou agudo. Frequências maiores produzem sons mais agudos."

    },

    eco:{

      titulo:
        "🪞 Eco",

      tipo:
        "Reflexão sonora",

      texto:
        "O eco ocorre quando a onda sonora é refletida e retorna ao ouvinte após atingir um obstáculo."

    },

    doppler:{

      titulo:
        "🚓 Efeito Doppler",

      tipo:
        "Movimento relativo",

      texto:
        "O Efeito Doppler altera a frequência percebida do som devido ao movimento da fonte ou do observador."

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

window.analisarSom =
  analisarSom;