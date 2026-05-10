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
  id: 18,

  /*
    Slug da aula
  */
  slug: "leis-de-newton",

  /*
    Título exibido
  */
  titulo: "Leis de Newton",

  /*
    Disciplina
  */
  disciplina: "Física",

  /*
    XP da recompensa
  */
  xp: 700

};

/* =====================================================
   QUESTÕES
===================================================== */

const QUESTOES = [

  {
    p:"Isaac Newton foi um importante:",

    a:[

      "Físico e matemático",

      "Somente escritor",

      "Somente pintor",

      "Somente músico"

    ],

    c:0
  },

  {
    p:"A Primeira Lei de Newton é chamada de:",

    a:[

      "Lei da Inércia",

      "Lei da Gravidade",

      "Lei da Ação",

      "Lei da Energia"

    ],

    c:0
  },

  {
    p:"A inércia representa:",

    a:[

      "Resistência à mudança de movimento",

      "Aumento da velocidade",

      "Diminuição da massa",

      "Mudança de temperatura"

    ],

    c:0
  },

  {
    p:"Se a força resultante for zero:",

    a:[

      "O corpo mantém seu estado de movimento",

      "O corpo explode",

      "O corpo perde massa",

      "O corpo desaparece"

    ],

    c:0
  },

  {
    p:"A Segunda Lei de Newton relaciona:",

    a:[

      "Força, massa e aceleração",

      "Calor e temperatura",

      "Pressão e volume",

      "Velocidade e tempo"

    ],

    c:0
  },

  {
    p:"A fórmula da Segunda Lei é:",

    a:[

      "F = m · a",

      "V = d/t",

      "P = m · g",

      "E = mc²"

    ],

    c:0
  },

  {
    p:"A unidade de força no SI é:",

    a:[

      "Newton",

      "Joule",

      "Pascal",

      "Watt"

    ],

    c:0
  },

  {
    p:"Quanto maior a força aplicada:",

    a:[

      "Maior a aceleração",

      "Menor a massa",

      "Menor a velocidade",

      "Maior a temperatura"

    ],

    c:0
  },

  {
    p:"Quanto maior a massa:",

    a:[

      "Mais difícil acelerar",

      "Mais fácil acelerar",

      "Menor o peso",

      "Maior a gravidade"

    ],

    c:0
  },

  {
    p:"A Terceira Lei de Newton fala sobre:",

    a:[

      "Ação e reação",

      "Energia",

      "Temperatura",

      "Ondas"

    ],

    c:0
  },

  {
    p:"Toda ação produz:",

    a:[

      "Uma reação",

      "Uma massa",

      "Um calor",

      "Uma explosão"

    ],

    c:0
  },

  {
    p:"As forças de ação e reação possuem:",

    a:[

      "Mesmo módulo e sentidos opostos",

      "Sentidos iguais",

      "Módulos diferentes",

      "Direções diferentes"

    ],

    c:0
  },

  {
    p:"Ação e reação atuam:",

    a:[

      "Em corpos diferentes",

      "No mesmo corpo",

      "Somente no chão",

      "Somente no ar"

    ],

    c:0
  },

  {
    p:"O foguete sobe devido à:",

    a:[

      "Terceira Lei de Newton",

      "Primeira Lei",

      "Lei de Ohm",

      "Lei de Coulomb"

    ],

    c:0
  },

  {
    p:"A freada brusca de um carro é exemplo de:",

    a:[

      "Inércia",

      "Dilatação",

      "Refração",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A aceleração representa:",

    a:[

      "Variação da velocidade",

      "Variação da massa",

      "Variação do calor",

      "Variação do peso"

    ],

    c:0
  },

  {
    p:"A força resultante é:",

    a:[

      "A soma das forças",

      "A massa total",

      "A temperatura média",

      "O peso médio"

    ],

    c:0
  },

  {
    p:"O peso é uma força:",

    a:[

      "Gravitacional",

      "Elétrica",

      "Magnética",

      "Nuclear"

    ],

    c:0
  },

  {
    p:"A fórmula do peso é:",

    a:[

      "P = m · g",

      "V = d/t",

      "F = m/a",

      "Q = m · c"

    ],

    c:0
  },

  {
    p:"A gravidade na Terra vale aproximadamente:",

    a:[

      "9,8m/s²",

      "98m/s²",

      "0,98m/s²",

      "980m/s²"

    ],

    c:0
  },

  {
    p:"A unidade de massa no SI é:",

    a:[

      "Quilograma",

      "Newton",

      "Joule",

      "Metro"

    ],

    c:0
  },

  {
    p:"A unidade de aceleração é:",

    a:[

      "m/s²",

      "kg",

      "N",

      "J"

    ],

    c:0
  },

  {
    p:"Um corpo em repouso tende a:",

    a:[

      "Permanecer em repouso",

      "Acelerar sozinho",

      "Explodir",

      "Diminuir de massa"

    ],

    c:0
  },

  {
    p:"Um corpo em movimento tende a:",

    a:[

      "Continuar em movimento",

      "Parar instantaneamente",

      "Perder massa",

      "Sumir"

    ],

    c:0
  },

  {
    p:"As Leis de Newton pertencem à:",

    a:[

      "Dinâmica",

      "Óptica",

      "Termologia",

      "Ondulatória"

    ],

    c:0
  },

  {
    p:"A dinâmica estuda:",

    a:[

      "As causas do movimento",

      "Somente calor",

      "Somente luz",

      "Somente ondas"

    ],

    c:0
  },

  {
    p:"Empurrar uma parede gera:",

    a:[

      "Ação e reação",

      "Somente ação",

      "Somente reação",

      "Ausência de forças"

    ],

    c:0
  },

  {
    p:"O cinto de segurança ajuda devido à:",

    a:[

      "Inércia",

      "Refração",

      "Pressão",

      "Dilatação"

    ],

    c:0
  },

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
    p:"As Leis de Newton são fundamentais para:",

    a:[

      "Entender movimentos",

      "Eliminar a gravidade",

      "Criar massa",

      "Remover forças"

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

function analisarNewton(tipo){

  const resultado =
    document.getElementById(
      "resultadoNewton"
    );

  /*
    DADOS
  */
  const dados = {

    carro:{

      titulo:
        "🚗 Freada de Carro",

      tipo:
        "Primeira Lei de Newton",

      texto:
        "Quando o carro freia bruscamente, o corpo dos passageiros tende a continuar em movimento devido à inércia."

    },

    foguete:{

      titulo:
        "🚀 Lançamento de Foguete",

      tipo:
        "Terceira Lei de Newton",

      texto:
        "O foguete expulsa gases para baixo e recebe uma força de reação para cima."

    },

    patinador:{

      titulo:
        "⛸️ Patinador",

      tipo:
        "Segunda Lei de Newton",

      texto:
        "Quanto maior a força aplicada pelo patinador no gelo, maior sua aceleração."

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

window.analisarNewton =
  analisarNewton;