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
  id:201,

  /*
    SLUG
  */
  slug:
    "temperatura-calor",

  /*
    TÍTULO
  */
  titulo:
    "Temperatura e Calor",

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
    p:"Temperatura mede:",

    a:[

      "A quantidade de matéria",

      "O grau de agitação das partículas",

      "A velocidade da luz",

      "A massa do corpo"

    ],

    c:1
  },

  {
    p:"Calor é:",

    a:[

      "Uma substância",

      "Energia térmica em trânsito",

      "Um tipo de massa",

      "Um gás"

    ],

    c:1
  },

  {
    p:"O calor flui naturalmente:",

    a:[

      "Do corpo frio para o quente",

      "Do corpo quente para o frio",

      "Em qualquer direção",

      "Somente no vácuo"

    ],

    c:1
  },

  {
    p:"A unidade de temperatura no SI é:",

    a:[

      "Celsius",

      "Fahrenheit",

      "Kelvin",

      "Caloria"

    ],

    c:2
  },

  {
    p:"Quando dois corpos possuem a mesma temperatura ocorre:",

    a:[

      "Dilatação",

      "Equilíbrio térmico",

      "Evaporação",

      "Irradiação"

    ],

    c:1
  },

  {
    p:"Na condução térmica o calor se propaga principalmente por:",

    a:[

      "Contato direto",

      "Ondas eletromagnéticas",

      "Movimento do ar",

      "Reflexão"

    ],

    c:0
  },

  {
    p:"A convecção ocorre principalmente em:",

    a:[

      "Sólidos",

      "Líquidos e gases",

      "Metais apenas",

      "Vidros"

    ],

    c:1
  },

  {
    p:"A irradiação térmica ocorre através de:",

    a:[

      "Contato físico",

      "Choques mecânicos",

      "Ondas eletromagnéticas",

      "Atrito"

    ],

    c:2
  },

  {
    p:"O Sol aquece a Terra principalmente por:",

    a:[

      "Convecção",

      "Condução",

      "Irradiação",

      "Dilatação"

    ],

    c:2
  },

  {
    p:"A fórmula da quantidade de calor é:",

    a:[

      "Q = m·c·ΔT",

      "F = m·a",

      "P = m·g",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"Na fórmula Q = m·c·ΔT, ΔT representa:",

    a:[

      "Velocidade",

      "Massa",

      "Variação de temperatura",

      "Pressão"

    ],

    c:2
  },

  {
    p:"O calor específico depende:",

    a:[

      "Do material",

      "Da gravidade",

      "Da velocidade da luz",

      "Da cor"

    ],

    c:0
  },

  {
    p:"Um corpo quente possui:",

    a:[

      "Maior agitação molecular",

      "Menor energia",

      "Menor massa",

      "Menor pressão"

    ],

    c:0
  },

  {
    p:"Quando um corpo perde calor sua temperatura tende a:",

    a:[

      "Aumentar",

      "Diminuir",

      "Duplicar",

      "Desaparecer"

    ],

    c:1
  },

  {
    p:"O termômetro é utilizado para medir:",

    a:[

      "Calor",

      "Pressão",

      "Temperatura",

      "Energia elétrica"

    ],

    c:2
  },

  {
    p:"A escala Kelvin é considerada:",

    a:[

      "Absoluta",

      "Relativa",

      "Linear negativa",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"No zero absoluto as partículas apresentam:",

    a:[

      "Agitação mínima",

      "Explosão térmica",

      "Velocidade infinita",

      "Maior calor"

    ],

    c:0
  },

  {
    p:"Os metais geralmente são bons:",

    a:[

      "Isolantes térmicos",

      "Condutores térmicos",

      "Geradores nucleares",

      "Refrigerantes"

    ],

    c:1
  },

  {
    p:"Um agasalho ajuda a manter o corpo aquecido porque:",

    a:[

      "Produz calor",

      "Impede trocas rápidas de calor",

      "Aumenta a temperatura externa",

      "Reduz a massa"

    ],

    c:1
  },

  {
    p:"O equilíbrio térmico acontece quando:",

    a:[

      "As temperaturas se igualam",

      "O calor aumenta",

      "A pressão diminui",

      "Os corpos desaparecem"

    ],

    c:0
  },

  {
    p:"A sensação térmica depende principalmente:",

    a:[

      "Da troca de calor com o ambiente",

      "Da massa do corpo",

      "Da distância ao Sol",

      "Da pressão atmosférica apenas"

    ],

    c:0
  },

  {
    p:"Calor e temperatura são:",

    a:[

      "A mesma coisa",

      "Grandezas diferentes",

      "Sempre iguais",

      "Tipos de massa"

    ],

    c:1
  },

  {
    p:"A condução térmica é mais eficiente em:",

    a:[

      "Metais",

      "Madeira",

      "Plástico",

      "Isopor"

    ],

    c:0
  },

  {
    p:"O isopor é usado como isolante porque:",

    a:[

      "Conduz muito calor",

      "Dificulta trocas térmicas",

      "Produz energia",

      "Aumenta a pressão"

    ],

    c:1
  },

  {
    p:"A convecção depende principalmente do:",

    a:[

      "Movimento do fluido",

      "Contato sólido",

      "Campo magnético",

      "Atrito"

    ],

    c:0
  },

  {
    p:"A temperatura corporal média humana é próxima de:",

    a:[

      "0°C",

      "37°C",

      "100°C",

      "273 K"

    ],

    c:1
  },

  {
    p:"O calor específico da água é:",

    a:[

      "Muito baixo",

      "Relativamente alto",

      "Igual ao do ferro",

      "Nulo"

    ],

    c:1
  },

  {
    p:"A garrafa térmica reduz:",

    a:[

      "Trocas de calor",

      "A massa do líquido",

      "A gravidade",

      "A pressão"

    ],

    c:0
  },

  {
    p:"A irradiação térmica pode ocorrer:",

    a:[

      "No vácuo",

      "Somente na água",

      "Somente em sólidos",

      "Somente em gases"

    ],

    c:0
  },

  {
    p:"O estudo do calor faz parte da:",

    a:[

      "Termologia",

      "Óptica",

      "Eletrostática",

      "Ondulatória"

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

function simularCalor(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    quente:{

      titulo:
        "🔥 Corpo Quente",

      tipo:
        "Transferência de calor",

      texto:
        "O corpo quente transfere energia térmica para corpos mais frios até atingir equilíbrio térmico."

    },

    frio:{

      titulo:
        "❄️ Corpo Frio",

      tipo:
        "Recebimento de calor",

      texto:
        "O corpo frio recebe calor do ambiente ou de corpos mais quentes."

    },

    equilibrio:{

      titulo:
        "⚖️ Equilíbrio Térmico",

      tipo:
        "Temperaturas iguais",

      texto:
        "No equilíbrio térmico não existe mais troca líquida de calor entre os corpos."

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

window.simularCalor =
  simularCalor;