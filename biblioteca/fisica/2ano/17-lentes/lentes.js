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
  id:217,

  /*
    SLUG
  */
  slug:
    "lentes-esfericas",

  /*
    TÍTULO
  */
  titulo:
    "Lentes Esféricas",

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
    p:"As lentes funcionam através da:",

    a:[

      "Reflexão",

      "Refração",

      "Difração",

      "Interferência"

    ],

    c:1
  },

  {
    p:"As lentes convergentes:",

    a:[

      "Espalham os raios luminosos",

      "Aproximam os raios luminosos",

      "Eliminam a luz",

      "Produzem som"

    ],

    c:1
  },

  {
    p:"As lentes divergentes:",

    a:[

      "Concentram os raios",

      "Espalham os raios luminosos",

      "Refletem toda a luz",

      "Não desviam luz"

    ],

    c:1
  },

  {
    p:"O ponto onde os raios convergem chama-se:",

    a:[

      "Centro óptico",

      "Normal",

      "Foco",

      "Retina"

    ],

    c:2
  },

  {
    p:"A distância focal é representada por:",

    a:[

      "p",

      "f",

      "i",

      "A"

    ],

    c:1
  },

  {
    p:"A equação das lentes é:",

    a:[

      "F = m·a",

      "v = λ·f",

      "1/f = 1/p + 1/p'",

      "Q = m·c·ΔT"

    ],

    c:2
  },

  {
    p:"As lentes podem formar imagens:",

    a:[

      "Reais",

      "Virtuais",

      "Ampliadas",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"As lentes convergentes possuem foco:",

    a:[

      "Positivo",

      "Negativo",

      "Nulo",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"As lentes divergentes possuem foco:",

    a:[

      "Positivo",

      "Negativo",

      "Nulo",

      "Duplo"

    ],

    c:1
  },

  {
    p:"O aumento linear relaciona:",

    a:[

      "Som e luz",

      "Imagem e objeto",

      "Massa e força",

      "Calor e temperatura"

    ],

    c:1
  },

  {
    p:"A fórmula do aumento linear é:",

    a:[

      "A = i/o",

      "F = m·a",

      "P = U·i",

      "v = λ·f"

    ],

    c:0
  },

  {
    p:"As lentes dos óculos servem para:",

    a:[

      "Produzir luz",

      "Corrigir problemas de visão",

      "Produzir som",

      "Refletir ondas"

    ],

    c:1
  },

  {
    p:"A miopia é corrigida com lentes:",

    a:[

      "Convergentes",

      "Divergentes",

      "Planas",

      "Esféricas metálicas"

    ],

    c:1
  },

  {
    p:"A hipermetropia é corrigida com lentes:",

    a:[

      "Divergentes",

      "Convergentes",

      "Opacas",

      "Refletoras"

    ],

    c:1
  },

  {
    p:"As lentes convergentes são usadas em:",

    a:[

      "Lupas",

      "Microscópios",

      "Câmeras",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"As lentes divergentes produzem imagens:",

    a:[

      "Virtuais e menores",

      "Reais e invertidas",

      "Maiores e reais",

      "Nulas"

    ],

    c:0
  },

  {
    p:"O centro óptico da lente é o ponto:",

    a:[

      "Onde não ocorre desvio significativo",

      "De maior reflexão",

      "De produção sonora",

      "De ausência de luz"

    ],

    c:0
  },

  {
    p:"As lentes são normalmente feitas de:",

    a:[

      "Vidro ou plástico",

      "Madeira",

      "Ferro",

      "Borracha"

    ],

    c:0
  },

  {
    p:"A refração ocorre porque a luz:",

    a:[

      "Muda de velocidade",

      "Produz gravidade",

      "Desaparece",

      "Congela"

    ],

    c:0
  },

  {
    p:"As lentes convergentes podem formar imagens reais:",

    a:[

      "Sim",

      "Não",

      "Somente no vácuo",

      "Somente na água"

    ],

    c:0
  },

  {
    p:"As lentes divergentes normalmente formam imagens:",

    a:[

      "Reais",

      "Virtuais",

      "Invertidas",

      "Gigantes"

    ],

    c:1
  },

  {
    p:"A luz atravessa as lentes porque elas são:",

    a:[

      "Transparentes",

      "Metálicas",

      "Sonoras",

      "Magnéticas"

    ],

    c:0
  },

  {
    p:"O microscópio utiliza:",

    a:[

      "Espelhos planos",

      "Lentes",

      "Motores",

      "Ondas sonoras"

    ],

    c:1
  },

  {
    p:"As câmeras fotográficas utilizam:",

    a:[

      "Lentes",

      "Som",

      "Magnetismo",

      "Calor"

    ],

    c:0
  },

  {
    p:"O olho humano funciona de forma semelhante a:",

    a:[

      "Uma câmera",

      "Um motor",

      "Um alto-falante",

      "Uma bateria"

    ],

    c:0
  },

  {
    p:"A lente do olho humano é chamada:",

    a:[

      "Retina",

      "Cristalino",

      "Íris",

      "Pupila"

    ],

    c:1
  },

  {
    p:"As lentes convergentes podem ampliar imagens:",

    a:[

      "Sim",

      "Não",

      "Somente no escuro",

      "Somente na água"

    ],

    c:0
  },

  {
    p:"A Física que estuda as lentes faz parte da:",

    a:[

      "Óptica",

      "Acústica",

      "Mecânica",

      "Termologia"

    ],

    c:0
  },

  {
    p:"As lentes desviam a luz devido à:",

    a:[

      "Refração",

      "Reflexão",

      "Difração",

      "Interferência"

    ],

    c:0
  },

  {
    p:"As lentes possuem aplicações em:",

    a:[

      "Medicina",

      "Astronomia",

      "Tecnologia",

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

function analisarLente(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    convergente:{

      titulo:
        "🔍 Lente Convergente",

      tipo:
        "Concentração dos raios",

      texto:
        "As lentes convergentes aproximam os raios luminosos para o foco e podem formar imagens reais ou virtuais."

    },

    divergente:{

      titulo:
        "↔️ Lente Divergente",

      tipo:
        "Espalhamento dos raios",

      texto:
        "As lentes divergentes afastam os raios luminosos e normalmente formam imagens virtuais e menores."

    },

    visao:{

      titulo:
        "👁️ Correção da Visão",

      tipo:
        "Aplicação das lentes",

      texto:
        "As lentes corrigem problemas visuais como miopia e hipermetropia através do desvio adequado da luz."

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

window.analisarLente =
  analisarLente;