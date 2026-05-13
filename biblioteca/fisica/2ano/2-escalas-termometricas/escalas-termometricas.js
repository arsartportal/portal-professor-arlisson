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
  id:202,

  /*
    SLUG
  */
  slug:
    "escalas-termometricas",

  /*
    TÍTULO
  */
  titulo:
    "Escalas Termométricas",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:1300

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"As escalas termométricas servem para:",

    a:[

      "Medir massa",

      "Medir temperatura",

      "Medir velocidade",

      "Medir força"

    ],

    c:1
  },

  {
    p:"A escala Celsius possui como ponto de congelamento da água:",

    a:[

      "100°C",

      "32°C",

      "0°C",

      "273°C"

    ],

    c:2
  },

  {
    p:"Na escala Celsius a ebulição da água ocorre em:",

    a:[

      "50°C",

      "0°C",

      "273°C",

      "100°C"

    ],

    c:3
  },

  {
    p:"A unidade de temperatura do SI é:",

    a:[

      "Celsius",

      "Kelvin",

      "Fahrenheit",

      "Caloria"

    ],

    c:1
  },

  {
    p:"O zero absoluto corresponde aproximadamente a:",

    a:[

      "0°C",

      "-273°C",

      "100°C",

      "32°F"

    ],

    c:1
  },

  {
    p:"A conversão correta entre Celsius e Kelvin é:",

    a:[

      "K = C - 273",

      "K = C + 273",

      "K = C × 2",

      "K = C ÷ 2"

    ],

    c:1
  },

  {
    p:"A escala Fahrenheit é muito utilizada:",

    a:[

      "No Brasil",

      "Na China",

      "Nos Estados Unidos",

      "Na Lua"

    ],

    c:2
  },

  {
    p:"Na escala Fahrenheit a água congela em:",

    a:[

      "0°F",

      "32°F",

      "100°F",

      "273°F"

    ],

    c:1
  },

  {
    p:"Na escala Fahrenheit a água entra em ebulição em:",

    a:[

      "100°F",

      "180°F",

      "212°F",

      "32°F"

    ],

    c:2
  },

  {
    p:"A relação entre Celsius e Fahrenheit é:",

    a:[

      "F = (9/5)C + 32",

      "F = C + 273",

      "F = 2C",

      "F = C - 32"

    ],

    c:0
  },

  {
    p:"A escala Kelvin não utiliza:",

    a:[

      "Números",

      "Graus",

      "Temperatura",

      "Conversão"

    ],

    c:1
  },

  {
    p:"0 Kelvin representa:",

    a:[

      "Ebulição",

      "Congelamento",

      "Zero absoluto",

      "Temperatura ambiente"

    ],

    c:2
  },

  {
    p:"A temperatura corporal média humana é aproximadamente:",

    a:[

      "0°C",

      "20°C",

      "37°C",

      "100°C"

    ],

    c:2
  },

  {
    p:"Uma variação de 1°C corresponde a:",

    a:[

      "1 K",

      "2 K",

      "10 K",

      "100 K"

    ],

    c:0
  },

  {
    p:"As escalas termométricas são baseadas em:",

    a:[

      "Pontos fixos",

      "Velocidade",

      "Massa",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A temperatura é relacionada à:",

    a:[

      "Agitação molecular",

      "Cor do objeto",

      "Quantidade de luz",

      "Altura"

    ],

    c:0
  },

  {
    p:"A menor temperatura teoricamente possível é:",

    a:[

      "100°C",

      "0°C",

      "-273°C",

      "32°F"

    ],

    c:2
  },

  {
    p:"A escala Kelvin é chamada de:",

    a:[

      "Escala relativa",

      "Escala decimal",

      "Escala absoluta",

      "Escala negativa"

    ],

    c:2
  },

  {
    p:"O símbolo da escala Celsius é:",

    a:[

      "K",

      "°C",

      "°F",

      "C°K"

    ],

    c:1
  },

  {
    p:"O símbolo da escala Fahrenheit é:",

    a:[

      "°K",

      "°C",

      "°F",

      "KF"

    ],

    c:2
  },

  {
    p:"A escala Kelvin é muito usada em:",

    a:[

      "Ciência",

      "Esportes",

      "Música",

      "Arquitetura"

    ],

    c:0
  },

  {
    p:"A fórmula K = C + 273 permite:",

    a:[

      "Converter Celsius em Kelvin",

      "Calcular velocidade",

      "Medir pressão",

      "Calcular força"

    ],

    c:0
  },

  {
    p:"As escalas termométricas medem:",

    a:[

      "Energia elétrica",

      "Temperatura",

      "Força gravitacional",

      "Pressão"

    ],

    c:1
  },

  {
    p:"Uma temperatura de 273 K corresponde a:",

    a:[

      "273°C",

      "100°C",

      "0°C",

      "-100°C"

    ],

    c:2
  },

  {
    p:"A água ferve em Kelvin aproximadamente em:",

    a:[

      "100 K",

      "373 K",

      "273 K",

      "32 K"

    ],

    c:1
  },

  {
    p:"A temperatura ambiente costuma ser próxima de:",

    a:[

      "25°C",

      "100°C",

      "-50°C",

      "273°C"

    ],

    c:0
  },

  {
    p:"O termômetro é o instrumento utilizado para:",

    a:[

      "Medir pressão",

      "Medir temperatura",

      "Medir velocidade",

      "Medir energia"

    ],

    c:1
  },

  {
    p:"Escalas termométricas são importantes para:",

    a:[

      "Meteorologia e ciência",

      "Somente matemática",

      "Somente química",

      "Somente esportes"

    ],

    c:0
  },

  {
    p:"O Fahrenheit possui divisões diferentes da escala:",

    a:[

      "Kelvin",

      "Celsius",

      "Ambas",

      "Nenhuma"

    ],

    c:2
  },

  {
    p:"A relação geral entre escalas permite:",

    a:[

      "Converter temperaturas",

      "Calcular massa",

      "Medir energia elétrica",

      "Calcular gravidade"

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

function converterEscala(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    celsius:{

      titulo:
        "🌡️ Escala Celsius",

      tipo:
        "Escala cotidiana",

      texto:
        "A escala Celsius utiliza 0°C para congelamento da água e 100°C para ebulição."

    },

    kelvin:{

      titulo:
        "❄️ Escala Kelvin",

      tipo:
        "Escala absoluta",

      texto:
        "A escala Kelvin é usada no Sistema Internacional e começa no zero absoluto."

    },

    fahrenheit:{

      titulo:
        "🔥 Escala Fahrenheit",

      tipo:
        "Escala americana",

      texto:
        "A escala Fahrenheit é muito utilizada nos Estados Unidos."

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

window.converterEscala =
  converterEscala;