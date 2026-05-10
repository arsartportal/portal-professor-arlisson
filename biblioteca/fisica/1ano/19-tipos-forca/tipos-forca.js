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
  id: 19,

  /*
    Slug da aula
  */
  slug: "tipos-forca",

  /*
    Título exibido
  */
  titulo: "Tipos de Força",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 750

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Força é uma grandeza:",

    a:[

      "Vetorial",

      "Escalar",

      "Abstrata",

      "Térmica"

    ],

    c:0
  },

  {
    p:"A força pode alterar:",

    a:[

      "O movimento do corpo",

      "A cor do corpo",

      "A composição química",

      "A densidade"

    ],

    c:0
  },

  {
    p:"A fórmula da Segunda Lei de Newton é:",

    a:[

      "F = m · a",

      "V = d/t",

      "P = m · g",

      "Q = m · c"

    ],

    c:0
  },

  {
    p:"A força peso é causada pela:",

    a:[

      "Gravidade",

      "Temperatura",

      "Eletricidade",

      "Luz"

    ],

    c:0
  },

  {
    p:"A fórmula da força peso é:",

    a:[

      "P = m · g",

      "F = m · a",

      "V = d/t",

      "E = mc²"

    ],

    c:0
  },

  {
    p:"A direção da força peso é:",

    a:[

      "Vertical",

      "Horizontal",

      "Diagonal",

      "Circular"

    ],

    c:0
  },

  {
    p:"O sentido da força peso é:",

    a:[

      "Para baixo",

      "Para cima",

      "Para direita",

      "Para esquerda"

    ],

    c:0
  },

  {
    p:"A força normal é:",

    a:[

      "Perpendicular à superfície",

      "Paralela à superfície",

      "Diagonal",

      "Circular"

    ],

    c:0
  },

  {
    p:"A força normal surge devido:",

    a:[

      "Ao contato entre superfícies",

      "À temperatura",

      "À eletricidade",

      "Ao magnetismo"

    ],

    c:0
  },

  {
    p:"A força de atrito:",

    a:[

      "Se opõe ao movimento",

      "Aumenta o movimento",

      "Elimina a massa",

      "Aumenta a gravidade"

    ],

    c:0
  },

  {
    p:"A fórmula do atrito é:",

    a:[

      "Fat = μ · N",

      "P = m · g",

      "F = m · a",

      "V = d/t"

    ],

    c:0
  },

  {
    p:"Quanto maior a rugosidade:",

    a:[

      "Maior o atrito",

      "Menor o atrito",

      "Menor a gravidade",

      "Maior a massa"

    ],

    c:0
  },

  {
    p:"O atrito é importante para:",

    a:[

      "Caminhar",

      "Eliminar forças",

      "Diminuir massa",

      "Remover gravidade"

    ],

    c:0
  },

  {
    p:"A tração aparece em:",

    a:[

      "Cordas e cabos",

      "Lâmpadas",

      "Espelhos",

      "Termômetros"

    ],

    c:0
  },

  {
    p:"A tração atua:",

    a:[

      "Puxando os corpos",

      "Empurrando verticalmente",

      "Apenas aquecendo",

      "Apenas iluminando"

    ],

    c:0
  },

  {
    p:"A força elástica aparece em:",

    a:[

      "Molas",

      "Espelhos",

      "Lâmpadas",

      "Bússolas"

    ],

    c:0
  },

  {
    p:"A Lei de Hooke relaciona:",

    a:[

      "Força elástica e deformação",

      "Calor e temperatura",

      "Pressão e volume",

      "Velocidade e tempo"

    ],

    c:0
  },

  {
    p:"A fórmula da força elástica é:",

    a:[

      "F = k · x",

      "P = m · g",

      "F = m · a",

      "Q = m · c"

    ],

    c:0
  },

  {
    p:"Quanto maior a deformação da mola:",

    a:[

      "Maior a força elástica",

      "Menor a força elástica",

      "Menor a gravidade",

      "Maior a temperatura"

    ],

    c:0
  },

  {
    p:"A força elástica tende a:",

    a:[

      "Restaurar o equilíbrio",

      "Aumentar a massa",

      "Eliminar forças",

      "Diminuir temperatura"

    ],

    c:0
  },

  {
    p:"O peso é medido em:",

    a:[

      "Newton",

      "Quilograma",

      "Metro",

      "Segundo"

    ],

    c:0
  },

  {
    p:"A massa é medida em:",

    a:[

      "Quilograma",

      "Newton",

      "Pascal",

      "Watt"

    ],

    c:0
  },

  {
    p:"A gravidade terrestre vale aproximadamente:",

    a:[

      "9,8m/s²",

      "98m/s²",

      "0,98m/s²",

      "980m/s²"

    ],

    c:0
  },

  {
    p:"A força de atrito depende da:",

    a:[

      "Força normal",

      "Temperatura",

      "Velocidade da luz",

      "Pressão atmosférica"

    ],

    c:0
  },

  {
    p:"A força normal geralmente equilibra:",

    a:[

      "O peso",

      "O atrito",

      "A velocidade",

      "O calor"

    ],

    c:0
  },

  {
    p:"Guindastes utilizam:",

    a:[

      "Tração",

      "Força elétrica",

      "Dilatação",

      "Refração"

    ],

    c:0
  },

  {
    p:"Freios de carros dependem de:",

    a:[

      "Atrito",

      "Tração",

      "Empuxo",

      "Molas"

    ],

    c:0
  },

  {
    p:"A força peso aponta:",

    a:[

      "Para o centro da Terra",

      "Para o céu",

      "Para direita",

      "Para esquerda"

    ],

    c:0
  },

  {
    p:"A força é representada por:",

    a:[

      "Vetores",

      "Escalares",

      "Números sem direção",

      "Temperaturas"

    ],

    c:0
  },

  {
    p:"As forças explicam:",

    a:[

      "Os movimentos dos corpos",

      "Somente calor",

      "Somente luz",

      "Somente ondas"

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

function analisarForca(tipo){

  const resultado =
    document.getElementById(
      "resultadoForca"
    );

  /*
    DADOS
  */
  const dados = {

    peso:{

      titulo:
        "🌍 Força Peso",

      tipo:
        "Força gravitacional",

      texto:
        "A Terra atrai todos os corpos para seu centro através da gravidade, gerando a força peso."

    },

    atrito:{

      titulo:
        "🛞 Força de Atrito",

      tipo:
        "Força de contato",

      texto:
        "O atrito dificulta o movimento entre superfícies e permite caminharmos e frearmos veículos."

    },

    mola:{

      titulo:
        "🌀 Força Elástica",

      tipo:
        "Lei de Hooke",

      texto:
        "Quando uma mola é deformada, surge uma força que tenta restaurar seu formato original."

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

window.analisarForca =
  analisarForca;