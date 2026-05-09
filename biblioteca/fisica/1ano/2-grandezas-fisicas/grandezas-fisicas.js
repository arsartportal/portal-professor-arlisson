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
  id: 2,

  /*
    Slug da aula
  */
  slug: "grandezas-fisicas",

  /*
    Título exibido
  */
  titulo: "Grandezas Físicas",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 60

};

/* =====================================================
   QUESTÕES DA LISTA
===================================================== */

const QUESTOES = [

  {
    p:"Grandezas físicas são:",

    a:[

      "Propriedades que podem ser medidas",

      "Somente fórmulas",

      "Somente objetos",

      "Somente gráficos"

    ],

    c:0
  },

  {
    p:"Qual destas é uma grandeza física?",

    a:[

      "Comprimento",

      "Cor",

      "Cheiro",

      "Nome"

    ],

    c:0
  },

  {
    p:"A unidade padrão de comprimento no SI é:",

    a:[

      "Metro",

      "Litro",

      "Segundo",

      "Quilograma"

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
    p:"O tempo no Sistema Internacional é medido em:",

    a:[

      "Segundo",

      "Metro",

      "Litro",

      "Newton"

    ],

    c:0
  },

  {
    p:"Velocidade é uma grandeza relacionada a:",

    a:[

      "Movimento",

      "Temperatura",

      "Som",

      "Luz"

    ],

    c:0
  },

  {
    p:"O símbolo da unidade metro é:",

    a:[

      "m",

      "kg",

      "s",

      "A"

    ],

    c:0
  },

  {
    p:"Temperatura é medida normalmente em:",

    a:[

      "Graus Celsius",

      "Metros",

      "Quilos",

      "Segundos"

    ],

    c:0
  },

  {
    p:"Qual destas unidades mede massa?",

    a:[

      "kg",

      "m",

      "s",

      "°C"

    ],

    c:0
  },

  {
    p:"O Sistema Internacional foi criado para:",

    a:[

      "Padronizar medidas",

      "Criar idiomas",

      "Substituir a matemática",

      "Eliminar cálculos"

    ],

    c:0
  },

  {
    p:"Comprimento é uma grandeza:",

    a:[

      "Fundamental",

      "Química",

      "Biológica",

      "Geográfica"

    ],

    c:0
  },

  {
    p:"A Física utiliza medidas para:",

    a:[

      "Descrever fenômenos",

      "Criar desenhos",

      "Fazer poemas",

      "Escrever histórias"

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

function analisarGrandeza(tipo){

  const resultado =
    document.getElementById(
      "resultadoGrandeza"
    );

  /*
    Dados das grandezas
  */
  const dados = {

    massa:{

      titulo:
        "⚖️ Massa",

      tipo:
        "Grandeza Física",

      texto:
        "A massa mede a quantidade de matéria de um corpo e sua unidade padrão é o quilograma (kg)."

    },

    tempo:{

      titulo:
        "⏱️ Tempo",

      tipo:
        "Grandeza Física",

      texto:
        "O tempo é utilizado para medir a duração dos fenômenos e sua unidade padrão é o segundo (s)."

    },

    velocidade:{

      titulo:
        "🚗 Velocidade",

      tipo:
        "Grandeza Física",

      texto:
        "A velocidade mede a rapidez do movimento e normalmente é expressa em m/s ou km/h."

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

window.analisarGrandeza =
  analisarGrandeza;