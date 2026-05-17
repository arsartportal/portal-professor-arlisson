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
  id:403,

  /*
    SLUG
  */
  slug:
    "lei-coulomb",

  /*
    TÍTULO
  */
  titulo:
    "Lei de Coulomb",

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
    p:"A Lei de Coulomb estuda:",

    a:[

      "Ondas sonoras",

      "Forças elétricas",

      "Calor",

      "Movimento"

    ],

    c:1
  },

  {
    p:"A força elétrica ocorre entre:",

    a:[

      "Massas",

      "Temperaturas",

      "Cargas elétricas",

      "Ondas"

    ],

    c:2
  },

  {
    p:"Cargas de mesmo sinal:",

    a:[

      "Se atraem",

      "Se repelem",

      "Desaparecem",

      "Não interagem"

    ],

    c:1
  },

  {
    p:"Cargas de sinais opostos:",

    a:[

      "Se repelem",

      "Explodem",

      "Se atraem",

      "Somem"

    ],

    c:2
  },

  {
    p:"A unidade de carga elétrica é:",

    a:[

      "Newton",

      "Coulomb",

      "Joule",

      "Pascal"

    ],

    c:1
  },

  {
    p:"A unidade da força elétrica é:",

    a:[

      "Newton",

      "Volt",

      "Ampère",

      "Coulomb"

    ],

    c:0
  },

  {
    p:"Na fórmula da Lei de Coulomb, k representa:",

    a:[

      "Energia",

      "Potência",

      "Constante eletrostática",

      "Pressão"

    ],

    c:2
  },

  {
    p:"A força elétrica aumenta quando:",

    a:[

      "A distância aumenta",

      "As cargas aumentam",

      "A distância dobra",

      "O tempo passa"

    ],

    c:1
  },

  {
    p:"A força elétrica diminui quando:",

    a:[

      "As cargas aumentam",

      "A distância diminui",

      "A distância aumenta",

      "Os corpos aquecem"

    ],

    c:2
  },

  {
    p:"A fórmula da Lei de Coulomb é:",

    a:[

      "F = m·a",

      "P = U·i",

      "F = k·|q₁q₂|/d²",

      "Q = m·c·ΔT"

    ],

    c:2
  },

  {
    p:"A força elétrica depende:",

    a:[

      "Das cargas e da distância",

      "Somente da massa",

      "Somente do calor",

      "Somente do tempo"

    ],

    c:0
  },

  {
    p:"O símbolo da força elétrica é:",

    a:[

      "Q",

      "F",

      "E",

      "P"

    ],

    c:1
  },

  {
    p:"A constante eletrostática no vácuo vale aproximadamente:",

    a:[

      "9×10⁹",

      "3×10⁸",

      "1,6×10⁻¹⁹",

      "6,67×10⁻¹¹"

    ],

    c:0
  },

  {
    p:"A Lei de Coulomb faz parte da:",

    a:[

      "Óptica",

      "Acústica",

      "Eletrostática",

      "Termologia"

    ],

    c:2
  },

  {
    p:"Quanto menor a distância entre cargas:",

    a:[

      "Menor a força",

      "Maior a força",

      "A força desaparece",

      "Nada acontece"

    ],

    c:1
  },

  {
    p:"A força elétrica pode ser:",

    a:[

      "Somente atrativa",

      "Somente repulsiva",

      "Atrativa ou repulsiva",

      "Nula sempre"

    ],

    c:2
  },

  {
    p:"A força elétrica atua:",

    a:[

      "Somente com contato",

      "À distância",

      "Somente no vácuo",

      "Somente na água"

    ],

    c:1
  },

  {
    p:"As cargas elétricas são representadas por:",

    a:[

      "m",

      "v",

      "q",

      "t"

    ],

    c:2
  },

  {
    p:"A distância na fórmula é representada por:",

    a:[

      "F",

      "k",

      "q",

      "d"

    ],

    c:3
  },

  {
    p:"A força elétrica é maior quando as cargas:",

    a:[

      "São pequenas",

      "São maiores",

      "São neutras",

      "São frias"

    ],

    c:1
  },

  {
    p:"A interação entre cargas iguais produz:",

    a:[

      "Atração",

      "Repulsão",

      "Calor",

      "Luz"

    ],

    c:1
  },

  {
    p:"A interação entre cargas opostas produz:",

    a:[

      "Repulsão",

      "Reflexão",

      "Atração",

      "Difração"

    ],

    c:2
  },

  {
    p:"O Coulomb é unidade de:",

    a:[

      "Força",

      "Energia",

      "Carga elétrica",

      "Potência"

    ],

    c:2
  },

  {
    p:"A força elétrica é um exemplo de força:",

    a:[

      "De contato",

      "Nuclear",

      "De campo",

      "Térmica"

    ],

    c:2
  },

  {
    p:"A Lei de Coulomb pode ser comparada à:",

    a:[

      "Lei gravitacional",

      "Lei de Ohm",

      "Lei de Snell",

      "Lei de Newton da inércia"

    ],

    c:0
  },

  {
    p:"A força elétrica entre duas cargas depende do meio:",

    a:[

      "Sim",

      "Não",

      "Somente no ar",

      "Somente na água"

    ],

    c:0
  },

  {
    p:"No vácuo, a interação elétrica é:",

    a:[

      "Mais fraca",

      "Mais intensa",

      "Nula",

      "Impossível"

    ],

    c:1
  },

  {
    p:"A constante k é chamada de:",

    a:[

      "Constante térmica",

      "Constante gravitacional",

      "Constante eletrostática",

      "Constante sonora"

    ],

    c:2
  },

  {
    p:"A Lei de Coulomb foi desenvolvida por:",

    a:[

      "Isaac Newton",

      "Charles Coulomb",

      "Albert Einstein",

      "Galileu Galilei"

    ],

    c:1
  },

  {
    p:"A força elétrica pode explicar:",

    a:[

      "Fenômenos eletrostáticos",

      "Somente calor",

      "Somente luz",

      "Somente movimento"

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

function analisarCoulomb(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    atracao:{

      titulo:
        "❤️ Força de Atração",

      tipo:
        "Cargas opostas",

      texto:
        "Cargas elétricas com sinais opostos se atraem devido à força elétrica descrita pela Lei de Coulomb."

    },

    repulsao:{

      titulo:
        "↔️ Força de Repulsão",

      tipo:
        "Cargas iguais",

      texto:
        "Cargas elétricas com sinais iguais se repelem, gerando uma força elétrica de afastamento."

    },

    distancia:{

      titulo:
        "📏 Influência da Distância",

      tipo:
        "Variação da força",

      texto:
        "Quanto maior for a distância entre as cargas elétricas, menor será a intensidade da força elétrica."

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

window.analisarCoulomb =
  analisarCoulomb;