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
    ID único
  */
  id:21,

  /*
    SLUG
  */
  slug:
    "forca-atrito",

  /*
    TÍTULO
  */
  titulo:
    "Força de Atrito",

  /*
    DISCIPLINA
  */
  disciplina:
    "Física",

  /*
    XP
  */
  xp:850

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"A força de atrito atua:",

    a:[

      "Contrária ao movimento",

      "A favor da gravidade",

      "Na direção da luz",

      "Sem direção"

    ],

    c:0
  },

  {
    p:"O atrito surge quando:",

    a:[

      "Há contato entre superfícies",

      "Há luz",

      "Há temperatura",

      "Há eletricidade"

    ],

    c:0
  },

  {
    p:"A fórmula da força de atrito é:",

    a:[

      "Fat = μ · N",

      "P = m · g",

      "F = m · a",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"O símbolo μ representa:",

    a:[

      "Coeficiente de atrito",

      "Velocidade",

      "Massa",

      "Peso"

    ],

    c:0
  },

  {
    p:"A letra N representa:",

    a:[

      "Força normal",

      "Newton",

      "Número",

      "Velocidade"

    ],

    c:0
  },

  {
    p:"Quanto maior a rugosidade:",

    a:[

      "Maior o atrito",

      "Menor o atrito",

      "Menor a massa",

      "Maior a gravidade"

    ],

    c:0
  },

  {
    p:"O atrito estático atua quando:",

    a:[

      "O corpo está parado",

      "O corpo está caindo",

      "O corpo está no espaço",

      "O corpo está aquecido"

    ],

    c:0
  },

  {
    p:"O atrito dinâmico atua quando:",

    a:[

      "O corpo está em movimento",

      "O corpo está parado",

      "O corpo está sem massa",

      "O corpo está sem peso"

    ],

    c:0
  },

  {
    p:"O atrito dinâmico geralmente é:",

    a:[

      "Menor que o estático",

      "Maior que o estático",

      "Igual ao peso",

      "Igual à massa"

    ],

    c:0
  },

  {
    p:"O atrito ajuda:",

    a:[

      "Na caminhada",

      "A eliminar gravidade",

      "A remover massa",

      "A apagar luz"

    ],

    c:0
  },

  {
    p:"Sem atrito seria difícil:",

    a:[

      "Caminhar",

      "Respirar",

      "Enxergar",

      "Ouvir"

    ],

    c:0
  },

  {
    p:"Os freios dos carros dependem do:",

    a:[

      "Atrito",

      "Empuxo",

      "Campo elétrico",

      "Magnetismo"

    ],

    c:0
  },

  {
    p:"O atrito pode produzir:",

    a:[

      "Calor",

      "Luz solar",

      "Gravidade",

      "Magnetismo"

    ],

    c:0
  },

  {
    p:"O atrito pode causar:",

    a:[

      "Desgaste",

      "Aumento da massa",

      "Ausência de movimento",

      "Ausência de calor"

    ],

    c:0
  },

  {
    p:"No gelo, o atrito é geralmente:",

    a:[

      "Menor",

      "Maior",

      "Igual ao asfalto",

      "Infinito"

    ],

    c:0
  },

  {
    p:"No asfalto rugoso, o atrito tende a ser:",

    a:[

      "Maior",

      "Menor",

      "Nulo",

      "Inexistente"

    ],

    c:0
  },

  {
    p:"A força de atrito é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Térmica",

      "Numérica"

    ],

    c:0
  },

  {
    p:"A unidade do atrito no SI é:",

    a:[

      "Newton",

      "Quilograma",

      "Metro",

      "Segundo"

    ],

    c:0
  },

  {
    p:"O atrito depende da:",

    a:[

      "Força normal",

      "Cor do objeto",

      "Quantidade de luz",

      "Temperatura ambiente"

    ],

    c:0
  },

  {
    p:"Superfícies lisas possuem:",

    a:[

      "Menor atrito",

      "Maior atrito",

      "Mesmo atrito",

      "Gravidade maior"

    ],

    c:0
  },

  {
    p:"O atrito atua em sentido:",

    a:[

      "Oposto ao movimento",

      "Igual ao movimento",

      "Vertical",

      "Circular"

    ],

    c:0
  },

  {
    p:"O atrito impede:",

    a:[

      "Deslizamentos fáceis",

      "A gravidade",

      "A temperatura",

      "A massa"

    ],

    c:0
  },

  {
    p:"Os pneus utilizam atrito para:",

    a:[

      "Ganhar aderência",

      "Diminuir peso",

      "Eliminar movimento",

      "Criar gravidade"

    ],

    c:0
  },

  {
    p:"A aderência dos pneus depende do:",

    a:[

      "Atrito",

      "Empuxo",

      "Campo magnético",

      "Peso molecular"

    ],

    c:0
  },

  {
    p:"O atrito é importante para:",

    a:[

      "Controlar movimentos",

      "Eliminar velocidade",

      "Apagar forças",

      "Anular gravidade"

    ],

    c:0
  },

  {
    p:"Lubrificantes servem para:",

    a:[

      "Reduzir atrito",

      "Aumentar gravidade",

      "Aumentar massa",

      "Criar velocidade"

    ],

    c:0
  },

  {
    p:"Rolamentos ajudam a:",

    a:[

      "Diminuir atrito",

      "Aumentar atrito",

      "Eliminar forças",

      "Criar gravidade"

    ],

    c:0
  },

  {
    p:"O atrito pode ser útil e também:",

    a:[

      "Prejudicial",

      "Inexistente",

      "Impossível",

      "Irrelevante"

    ],

    c:0
  },

  {
    p:"A Física utiliza o atrito para estudar:",

    a:[

      "Movimentos reais",

      "Somente ondas",

      "Somente luz",

      "Somente calor"

    ],

    c:0
  },

  {
    p:"A força de atrito aparece em:",

    a:[

      "Diversas situações do cotidiano",

      "Somente laboratórios",

      "Somente foguetes",

      "Somente planetas"

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

function analisarAtrito(tipo){

  const resultado =
    document.getElementById(
      "resultadoAtrito"
    );

  /*
    DADOS
  */
  const dados = {

    gelo:{

      titulo:
        "🧊 Superfície com Gelo",

      tipo:
        "Atrito reduzido",

      texto:
        "O gelo possui baixo coeficiente de atrito, dificultando caminhadas e frenagens."

    },

    asfalto:{

      titulo:
        "🛣️ Asfalto Rugoso",

      tipo:
        "Atrito elevado",

      texto:
        "O asfalto aumenta a aderência dos pneus, ajudando veículos a frearem e fazerem curvas."

    },

    freio:{

      titulo:
        "🚗 Sistema de Freios",

      tipo:
        "Aplicação do atrito",

      texto:
        "Os freios utilizam atrito para transformar energia cinética em calor e reduzir a velocidade."

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

window.analisarAtrito =
  analisarAtrito;