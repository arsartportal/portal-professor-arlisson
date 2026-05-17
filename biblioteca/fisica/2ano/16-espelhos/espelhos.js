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
  id:216,

  /*
    SLUG
  */
  slug:
    "espelhos-planos",

  /*
    TÍTULO
  */
  titulo:
    "Espelhos Planos",

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
    p:"O espelho plano forma imagens:",

    a:[

      "Reais",

      "Virtuais",

      "Invertidas verticalmente",

      "Menores"

    ],

    c:1
  },

  {
    p:"A imagem em um espelho plano é:",

    a:[

      "Invertida verticalmente",

      "Direita",

      "Maior",

      "Real"

    ],

    c:1
  },

  {
    p:"O tamanho da imagem em um espelho plano é:",

    a:[

      "Maior que o objeto",

      "Menor que o objeto",

      "Igual ao objeto",

      "Variável"

    ],

    c:2
  },

  {
    p:"A lei da reflexão afirma que:",

    a:[

      "i = r",

      "i > r",

      "i < r",

      "i = 0"

    ],

    c:0
  },

  {
    p:"O ângulo de incidência é medido em relação:",

    a:[

      "Ao espelho",

      "À normal",

      "Ao objeto",

      "À imagem"

    ],

    c:1
  },

  {
    p:"A reflexão da luz em espelhos planos é:",

    a:[

      "Difusa",

      "Regular",

      "Nuclear",

      "Sonora"

    ],

    c:1
  },

  {
    p:"A distância da imagem ao espelho é:",

    a:[

      "Maior que a do objeto",

      "Menor que a do objeto",

      "Igual à do objeto",

      "Nula"

    ],

    c:2
  },

  {
    p:"A inversão produzida pelo espelho plano é:",

    a:[

      "Vertical",

      "Lateral",

      "Total",

      "Circular"

    ],

    c:1
  },

  {
    p:"O espelho plano produz imagens:",

    a:[

      "Virtuais e direitas",

      "Reais e invertidas",

      "Menores",

      "Nulas"

    ],

    c:0
  },

  {
    p:"A normal é uma reta:",

    a:[

      "Paralela ao espelho",

      "Perpendicular ao espelho",

      "Diagonal",

      "Horizontal"

    ],

    c:1
  },

  {
    p:"Os raios refletido, incidente e a normal pertencem:",

    a:[

      "Ao mesmo plano",

      "A planos diferentes",

      "Ao espaço vazio",

      "Ao vácuo"

    ],

    c:0
  },

  {
    p:"A imagem formada em espelho plano pode ser projetada em tela?",

    a:[

      "Sim",

      "Não",

      "Somente no escuro",

      "Somente com lentes"

    ],

    c:1
  },

  {
    p:"A associação de dois espelhos pode produzir:",

    a:[

      "Múltiplas imagens",

      "Somente uma imagem",

      "Ausência de imagens",

      "Som"

    ],

    c:0
  },

  {
    p:"Na fórmula N = 360°/θ -1, θ representa:",

    a:[

      "Temperatura",

      "Ângulo entre os espelhos",

      "Velocidade da luz",

      "Distância focal"

    ],

    c:1
  },

  {
    p:"Os espelhos planos são usados em:",

    a:[

      "Retrovisores",

      "Decoração",

      "Periscópios",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A imagem virtual é formada:",

    a:[

      "Na frente do espelho",

      "Atrás do espelho",

      "Sobre o espelho",

      "No objeto"

    ],

    c:1
  },

  {
    p:"O espelho plano altera:",

    a:[

      "A altura do objeto",

      "A posição lateral",

      "A massa",

      "A cor"

    ],

    c:1
  },

  {
    p:"Quando uma pessoa se aproxima do espelho:",

    a:[

      "A imagem se afasta",

      "A imagem também se aproxima",

      "A imagem desaparece",

      "Nada muda"

    ],

    c:1
  },

  {
    p:"A reflexão luminosa ocorre devido:",

    a:[

      "Ao retorno da luz",

      "À produção de som",

      "À gravidade",

      "Ao magnetismo"

    ],

    c:0
  },

  {
    p:"Os espelhos planos possuem superfície:",

    a:[

      "Rugosa",

      "Polida",

      "Flexível",

      "Gasosa"

    ],

    c:1
  },

  {
    p:"A distância objeto-imagem em espelho plano é:",

    a:[

      "d",

      "2d",

      "d/2",

      "0"

    ],

    c:1
  },

  {
    p:"O campo visual pode aumentar com:",

    a:[

      "Mais espelhos",

      "Menos luz",

      "Som",

      "Temperatura"

    ],

    c:0
  },

  {
    p:"A imagem em espelho plano possui:",

    a:[

      "Mesma altura",

      "Mesmo tamanho",

      "Mesma forma",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A luz refletida segue:",

    a:[

      "As leis da reflexão",

      "As leis da gravidade",

      "As leis do som",

      "As leis térmicas"

    ],

    c:0
  },

  {
    p:"A Física que estuda os espelhos faz parte da:",

    a:[

      "Acústica",

      "Óptica",

      "Termologia",

      "Mecânica"

    ],

    c:1
  },

  {
    p:"Os espelhos comuns são classificados como:",

    a:[

      "Planos",

      "Côncavos",

      "Convexos",

      "Esféricos"

    ],

    c:0
  },

  {
    p:"A imagem em espelho plano apresenta:",

    a:[

      "Simetria",

      "Distorção",

      "Ampliação",

      "Compressão"

    ],

    c:0
  },

  {
    p:"A reflexão regular ocorre em superfícies:",

    a:[

      "Polidas",

      "Rugosas",

      "Transparentes",

      "Porosas"

    ],

    c:0
  },

  {
    p:"O espelho plano pode formar imagens infinitas quando:",

    a:[

      "Há dois espelhos paralelos",

      "Não existe luz",

      "O objeto desaparece",

      "O espelho é pequeno"

    ],

    c:0
  },

  {
    p:"A imagem no espelho plano é observada porque:",

    a:[

      "A luz refletida chega aos olhos",

      "O espelho produz luz própria",

      "Existe som",

      "Há gravidade"

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

function analisarEspelho(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    reflexao:{

      titulo:
        "✨ Reflexão da Luz",

      tipo:
        "Lei da reflexão",

      texto:
        "Nos espelhos planos, o ângulo de incidência é igual ao ângulo de reflexão."

    },

    imagem:{

      titulo:
        "👤 Formação da Imagem",

      tipo:
        "Imagem virtual",

      texto:
        "A imagem formada em espelhos planos é virtual, direita e possui o mesmo tamanho do objeto."

    },

    espelhos:{

      titulo:
        "🪞 Associação de Espelhos",

      tipo:
        "Múltiplas imagens",

      texto:
        "Dois espelhos associados podem gerar várias imagens dependendo do ângulo entre eles."

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

window.analisarEspelho =
  analisarEspelho;