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
  id:28,

  /*
    SLUG
  */
  slug:
    "conservacao-energia",

  /*
    TÍTULO
  */
  titulo:
    "Conservação da Energia Mecânica",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1200

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A energia não pode ser:",

    a:[

      "Criada nem destruída",

      "Transformada",

      "Transferida",

      "Armazenada"

    ],

    c:0
  },

  {
    p:"A energia pode apenas:",

    a:[

      "Transformar-se",

      "Desaparecer",

      "Parar",

      "Congelar"

    ],

    c:0
  },

  {
    p:"A energia mecânica é dada por:",

    a:[

      "Em = Ec + Ep",

      "F = m·a",

      "P = τ/Δt",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"Ec representa:",

    a:[

      "Energia cinética",

      "Energia química",

      "Energia elétrica",

      "Energia calorífica"

    ],

    c:0
  },

  {
    p:"Ep representa:",

    a:[

      "Energia potencial",

      "Energia elétrica",

      "Energia térmica",

      "Energia nuclear"

    ],

    c:0
  },

  {
    p:"Durante a queda livre:",

    a:[

      "Ep diminui e Ec aumenta",

      "Ec diminui e Ep aumenta",

      "As duas diminuem",

      "As duas desaparecem"

    ],

    c:0
  },

  {
    p:"No topo da trajetória:",

    a:[

      "Ep é máxima",

      "Ec é máxima",

      "Ec é infinita",

      "Não existe energia"

    ],

    c:0
  },

  {
    p:"Próximo ao solo:",

    a:[

      "Ec é máxima",

      "Ep é máxima",

      "Não existe movimento",

      "A gravidade desaparece"

    ],

    c:0
  },

  {
    p:"Sem atrito, a energia mecânica:",

    a:[

      "Conserva-se",

      "Desaparece",

      "Aumenta infinitamente",

      "Diminui totalmente"

    ],

    c:0
  },

  {
    p:"O atrito transforma energia mecânica em:",

    a:[

      "Calor",

      "Massa",

      "Luz apenas",

      "Gravidade"

    ],

    c:0
  },

  {
    p:"A conservação da energia é um princípio da:",

    a:[

      "Física",

      "Biologia",

      "Geografia",

      "História"

    ],

    c:0
  },

  {
    p:"Quando Ep diminui:",

    a:[

      "Ec pode aumentar",

      "A massa aumenta",

      "A gravidade desaparece",

      "O tempo para"

    ],

    c:0
  },

  {
    p:"Energia mecânica é a soma das energias:",

    a:[

      "Cinética e potencial",

      "Elétrica e térmica",

      "Sonora e luminosa",

      "Química e nuclear"

    ],

    c:0
  },

  {
    p:"A unidade da energia é:",

    a:[

      "Joule",

      "Newton",

      "Pascal",

      "Watt"

    ],

    c:0
  },

  {
    p:"Montanhas-russas utilizam o princípio da:",

    a:[

      "Conservação da energia",

      "Dilatação térmica",

      "Óptica geométrica",

      "Ondulatória"

    ],

    c:0
  },

  {
    p:"Durante uma descida:",

    a:[

      "A velocidade aumenta",

      "A velocidade desaparece",

      "A gravidade diminui",

      "A massa muda"

    ],

    c:0
  },

  {
    p:"A energia cinética depende do:",

    a:[

      "Movimento",

      "Repouso",

      "Formato",

      "Tempo"

    ],

    c:0
  },

  {
    p:"A energia potencial gravitacional depende da:",

    a:[

      "Altura",

      "Temperatura",

      "Cor",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A energia pode mudar de forma:",

    a:[

      "Sem desaparecer",

      "Somente destruindo-se",

      "Somente aumentando",

      "Somente diminuindo"

    ],

    c:0
  },

  {
    p:"O atrito é considerado uma força:",

    a:[

      "Dissipativa",

      "Nuclear",

      "Magnética",

      "Circular"

    ],

    c:0
  },

  {
    p:"Com atrito, parte da energia vira:",

    a:[

      "Energia térmica",

      "Massa",

      "Tempo",

      "Gravidade"

    ],

    c:0
  },

  {
    p:"A energia mecânica é maior quando:",

    a:[

      "Ec e Ep somadas são grandes",

      "Não existe movimento",

      "A gravidade some",

      "A massa é zero"

    ],

    c:0
  },

  {
    p:"Uma bola caindo transforma:",

    a:[

      "Ep em Ec",

      "Ec em massa",

      "Massa em calor",

      "Tempo em energia"

    ],

    c:0
  },

  {
    p:"A conservação da energia ajuda a explicar:",

    a:[

      "Transformações energéticas",

      "Somente luz",

      "Somente calor",

      "Somente magnetismo"

    ],

    c:0
  },

  {
    p:"Corpos em movimento possuem:",

    a:[

      "Energia cinética",

      "Ausência de energia",

      "Somente potencial",

      "Somente química"

    ],

    c:0
  },

  {
    p:"Corpos elevados possuem:",

    a:[

      "Energia potencial",

      "Ausência de energia",

      "Somente térmica",

      "Somente elétrica"

    ],

    c:0
  },

  {
    p:"O estudo da conservação da energia pertence à:",

    a:[

      "Mecânica",

      "Óptica",

      "Ondulatória",

      "Termologia"

    ],

    c:0
  },

  {
    p:"Sem perdas, a energia total do sistema:",

    a:[

      "Permanece constante",

      "Desaparece",

      "Diminui sempre",

      "Aumenta infinitamente"

    ],

    c:0
  },

  {
    p:"A energia pode ser transferida entre:",

    a:[

      "Diferentes formas",

      "Somente calor",

      "Somente luz",

      "Somente massa"

    ],

    c:0
  },

  {
    p:"A conservação da energia é considerada:",

    a:[

      "Uma lei fundamental",

      "Uma hipótese sem uso",

      "Uma teoria ultrapassada",

      "Uma curiosidade"

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

function analisarEnergia(tipo){

  const resultado =
    document.getElementById(
      "resultadoEnergia"
    );

  /*
    DADOS
  */
  const dados = {

    topo:{

      titulo:
        "🏔️ Ponto Mais Alto",

      tipo:
        "Energia potencial máxima",

      texto:
        "No topo da trajetória, a altura é máxima e a velocidade tende a ser menor, aumentando a energia potencial."

    },

    queda:{

      titulo:
        "⬇️ Durante a Queda",

      tipo:
        "Transformação de energia",

      texto:
        "Durante a queda, a energia potencial transforma-se gradualmente em energia cinética."

    },

    solo:{

      titulo:
        "🏎️ Próximo ao Solo",

      tipo:
        "Energia cinética máxima",

      texto:
        "Próximo ao solo, a velocidade torna-se maior e a energia cinética atinge seu valor máximo."

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

window.analisarEnergia =
  analisarEnergia;