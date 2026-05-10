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
    ID único da lista
  */
  id: 3,

  /*
    Slug da aula
  */
  slug: "sistema-internacional-unidades",

  /*
    Título exibido
  */
  titulo: "Sistema Internacional de Unidades",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 70

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"O SI significa:",

    a:[

      "Sistema Internacional de Unidades",

      "Sistema Integrado de Física",

      "Sistema Internacional de Fórmulas",

      "Sistema Industrial"

    ],

    c:0
  },

  {
    p:"A unidade padrão de comprimento no SI é:",

    a:[

      "Metro",

      "Quilograma",

      "Segundo",

      "Kelvin"

    ],

    c:0
  },

  {
    p:"A unidade padrão de massa é:",

    a:[

      "Quilograma",

      "Metro",

      "Ampère",

      "Segundo"

    ],

    c:0
  },

  {
    p:"O tempo no SI é medido em:",

    a:[

      "Segundo",

      "Metro",

      "Kelvin",

      "Newton"

    ],

    c:0
  },

  {
    p:"A unidade Kelvin mede:",

    a:[

      "Temperatura",

      "Comprimento",

      "Massa",

      "Energia"

    ],

    c:0
  },

  {
    p:"O símbolo do metro é:",

    a:[

      "m",

      "kg",

      "s",

      "K"

    ],

    c:0
  },

  {
    p:"A unidade ampère mede:",

    a:[

      "Corrente elétrica",

      "Temperatura",

      "Massa",

      "Tempo"

    ],

    c:0
  },

  {
    p:"Qual destas é uma unidade fundamental do SI?",

    a:[

      "Segundo",

      "Litro",

      "Hora",

      "Tonelada"

    ],

    c:0
  },

  {
    p:"O SI foi criado para:",

    a:[

      "Padronizar medições",

      "Criar fórmulas",

      "Eliminar cálculos",

      "Substituir a matemática"

    ],

    c:0
  },

  {
    p:"A unidade candela mede:",

    a:[

      "Intensidade luminosa",

      "Massa",

      "Velocidade",

      "Energia"

    ],

    c:0
  },

  {
    p:"O quilograma possui símbolo:",

    a:[

      "kg",

      "g",

      "m",

      "K"

    ],

    c:0
  },

  {
    p:"O SI é utilizado:",

    a:[

      "No mundo inteiro",

      "Somente no Brasil",

      "Somente em laboratórios",

      "Somente em escolas"

    ],

    c:0
  }

];

/* =====================================================
   INICIAR SISTEMA DA BIBLIOTECA
===================================================== */

iniciarBiblioteca(
  CONFIG,
  QUESTOES
);

/* =====================================================
   SIMULADOR
===================================================== */

function analisarSI(tipo){

  const resultado =
    document.getElementById(
      "resultadoSI"
    );

  /*
    Dados
  */
  const dados = {

    comprimento:{

      titulo:
        "📏 Comprimento",

      tipo:
        "Grandeza Fundamental",

      texto:
        "O comprimento é medido em metros (m), unidade padrão do Sistema Internacional."

    },

    massa:{

      titulo:
        "⚖️ Massa",

      tipo:
        "Grandeza Fundamental",

      texto:
        "A massa é medida em quilogramas (kg), unidade oficial do SI."

    },

    tempo:{

      titulo:
        "⏱️ Tempo",

      tipo:
        "Grandeza Fundamental",

      texto:
        "O tempo é medido em segundos (s), utilizados em todo o mundo."

    }

  };

  /*
    Atualiza interface
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

window.analisarSI =
  analisarSI;