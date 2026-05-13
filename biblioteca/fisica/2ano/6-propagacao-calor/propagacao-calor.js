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
  id:206,

  /*
    SLUG
  */
  slug:
    "propagacao-calor",

  /*
    TÍTULO
  */
  titulo:
    "Propagação de Calor",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1400

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A propagação de calor corresponde:",

    a:[

      "À transferência de energia térmica",

      "À criação de matéria",

      "Ao aumento de massa",

      "À produção de luz"

    ],

    c:0
  },

  {
    p:"O calor se propaga naturalmente:",

    a:[

      "Do frio para o quente",

      "Do quente para o frio",

      "Sem direção definida",

      "Somente no vácuo"

    ],

    c:1
  },

  {
    p:"A condução térmica ocorre principalmente em:",

    a:[

      "Sólidos",

      "Vácuo",

      "Líquidos apenas",

      "Gases apenas"

    ],

    c:0
  },

  {
    p:"Na condução térmica ocorre:",

    a:[

      "Transporte de matéria",

      "Somente emissão de luz",

      "Transferência de energia entre partículas",

      "Explosão térmica"

    ],

    c:2
  },

  {
    p:"Um exemplo de condução térmica é:",

    a:[

      "O Sol aquecendo a Terra",

      "Água fervendo",

      "Colher metálica aquecendo",

      "Vento quente"

    ],

    c:2
  },

  {
    p:"A convecção térmica ocorre em:",

    a:[

      "Sólidos",

      "Vácuo",

      "Fluidos",

      "Somente metais"

    ],

    c:2
  },

  {
    p:"Na convecção ocorre:",

    a:[

      "Movimento das massas do fluido",

      "Ausência de partículas",

      "Somente radiação",

      "Nenhuma troca de energia"

    ],

    c:0
  },

  {
    p:"Um exemplo de convecção é:",

    a:[

      "Aquecimento de uma panela",

      "Circulação do ar quente",

      "Luz solar",

      "Reflexão térmica"

    ],

    c:1
  },

  {
    p:"A radiação térmica ocorre através:",

    a:[

      "De ondas eletromagnéticas",

      "De fios metálicos",

      "De líquidos",

      "Somente em sólidos"

    ],

    c:0
  },

  {
    p:"A radiação térmica não necessita:",

    a:[

      "Temperatura",

      "Energia",

      "Meio material",

      "Luz"

    ],

    c:2
  },

  {
    p:"O principal exemplo de radiação térmica é:",

    a:[

      "Uma colher quente",

      "Água fervendo",

      "O Sol",

      "Uma pedra"

    ],

    c:2
  },

  {
    p:"O calor sempre tende ao:",

    a:[

      "Desequilíbrio térmico",

      "Equilíbrio térmico",

      "Aumento de massa",

      "Resfriamento total"

    ],

    c:1
  },

  {
    p:"Materiais que dificultam a passagem de calor são:",

    a:[

      "Condutores",

      "Geradores",

      "Isolantes térmicos",

      "Condensadores"

    ],

    c:2
  },

  {
    p:"Exemplo de isolante térmico:",

    a:[

      "Cobre",

      "Ferro",

      "Alumínio",

      "Isopor"

    ],

    c:3
  },

  {
    p:"Os metais geralmente são:",

    a:[

      "Isolantes",

      "Bons condutores térmicos",

      "Transparentes",

      "Gasosos"

    ],

    c:1
  },

  {
    p:"Exemplo de bom condutor térmico:",

    a:[

      "Madeira",

      "Borracha",

      "Cobre",

      "Plástico"

    ],

    c:2
  },

  {
    p:"A propagação de calor depende:",

    a:[

      "Da diferença de temperatura",

      "Da cor apenas",

      "Da massa apenas",

      "Da velocidade"

    ],

    c:0
  },

  {
    p:"Quando dois corpos entram em contato:",

    a:[

      "Pode ocorrer troca de calor",

      "A gravidade desaparece",

      "O calor deixa de existir",

      "Nada acontece"

    ],

    c:0
  },

  {
    p:"A Física que estuda calor e temperatura é:",

    a:[

      "Óptica",

      "Termologia",

      "Mecânica",

      "Astronomia"

    ],

    c:1
  },

  {
    p:"O ar quente tende a:",

    a:[

      "Descer",

      "Subir",

      "Congelar",

      "Desaparecer"

    ],

    c:1
  },

  {
    p:"O ar frio tende a:",

    a:[

      "Subir",

      "Emitir luz",

      "Descer",

      "Evaporar"

    ],

    c:2
  },

  {
    p:"As correntes de convecção são causadas:",

    a:[

      "Pela diferença de densidade",

      "Pela luz",

      "Pela eletricidade",

      "Pela massa nuclear"

    ],

    c:0
  },

  {
    p:"A condução térmica é mais eficiente em:",

    a:[

      "Metais",

      "Madeira",

      "Isopor",

      "Ar"

    ],

    c:0
  },

  {
    p:"A radiação térmica pode ocorrer:",

    a:[

      "Somente em sólidos",

      "Somente em líquidos",

      "No vácuo",

      "Somente no ar"

    ],

    c:2
  },

  {
    p:"A sensação de calor do Sol ocorre por:",

    a:[

      "Convecção",

      "Condução",

      "Radiação",

      "Fusão"

    ],

    c:2
  },

  {
    p:"A panela aquece o alimento principalmente por:",

    a:[

      "Condução",

      "Fusão",

      "Reflexão",

      "Condensação"

    ],

    c:0
  },

  {
    p:"O vento marítimo envolve principalmente:",

    a:[

      "Condução",

      "Convecção",

      "Radiação",

      "Refração"

    ],

    c:1
  },

  {
    p:"A unidade de calor no SI é:",

    a:[

      "Pascal",

      "Newton",

      "Joule",

      "Metro"

    ],

    c:2
  },

  {
    p:"A propagação de calor possui aplicações em:",

    a:[

      "Engenharia",

      "Indústria",

      "Tecnologia",

      "Todas as anteriores"

    ],

    c:3
  },

  {
    p:"A propagação térmica está presente:",

    a:[

      "Somente em laboratórios",

      "Somente no espaço",

      "Apenas em máquinas",

      "No cotidiano"

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

function analisarPropagacao(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    conducao:{

      titulo:
        "🔩 Condução Térmica",

      tipo:
        "Contato entre partículas",

      texto:
        "A condução ocorre principalmente nos sólidos, através da transferência de energia entre partículas próximas."

    },

    conveccao:{

      titulo:
        "🌬️ Convecção Térmica",

      tipo:
        "Movimento de fluidos",

      texto:
        "A convecção ocorre em líquidos e gases por meio das correntes de convecção."

    },

    radiacao:{

      titulo:
        "☀️ Radiação Térmica",

      tipo:
        "Ondas eletromagnéticas",

      texto:
        "A radiação térmica pode ocorrer até mesmo no vácuo, sem necessidade de meio material."

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

window.analisarPropagacao =
  analisarPropagacao;