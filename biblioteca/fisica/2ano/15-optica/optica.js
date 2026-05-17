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
  id:215,

  /*
    SLUG
  */
  slug:
    "introducao-optica",

  /*
    TÍTULO
  */
  titulo:
    "Introdução à Óptica",

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
    p:"A Óptica é a área da Física que estuda:",

    a:[

      "A eletricidade",

      "A luz e os fenômenos luminosos",

      "O som",

      "O calor"

    ],

    c:1
  },

  {
    p:"A luz é uma onda:",

    a:[

      "Mecânica",

      "Eletromagnética",

      "Nuclear",

      "Sonora"

    ],

    c:1
  },

  {
    p:"A velocidade da luz no vácuo é aproximadamente:",

    a:[

      "340 m/s",

      "3 × 10⁸ m/s",

      "1500 m/s",

      "30 m/s"

    ],

    c:1
  },

  {
    p:"A luz consegue se propagar:",

    a:[

      "Apenas na água",

      "Apenas no ar",

      "No vácuo",

      "Somente em sólidos"

    ],

    c:2
  },

  {
    p:"A reflexão ocorre quando a luz:",

    a:[

      "Muda de meio",

      "Retorna ao meio de origem",

      "Desaparece",

      "Congela"

    ],

    c:1
  },

  {
    p:"A refração ocorre quando a luz:",

    a:[

      "Muda de velocidade ao trocar de meio",

      "Para de se propagar",

      "Vira som",

      "Desaparece"

    ],

    c:0
  },

  {
    p:"A dispersão da luz está relacionada:",

    a:[

      "À separação das cores",

      "Ao desaparecimento da luz",

      "Ao som",

      "À gravidade"

    ],

    c:0
  },

  {
    p:"Um exemplo de dispersão da luz é:",

    a:[

      "O eco",

      "O arco-íris",

      "O trovão",

      "O sonar"

    ],

    c:1
  },

  {
    p:"Os espelhos funcionam através da:",

    a:[

      "Refração",

      "Reflexão",

      "Difração",

      "Interferência"

    ],

    c:1
  },

  {
    p:"As lentes podem:",

    a:[

      "Formar imagens",

      "Parar a luz",

      "Produzir som",

      "Eliminar energia"

    ],

    c:0
  },

  {
    p:"Enxergamos os objetos porque:",

    a:[

      "Eles produzem gravidade",

      "A luz refletida chega aos olhos",

      "O som ilumina",

      "O ar muda de cor"

    ],

    c:1
  },

  {
    p:"A retina pertence ao:",

    a:[

      "Ouvido",

      "Olho",

      "Nariz",

      "Pulmão"

    ],

    c:1
  },

  {
    p:"A luz branca é formada por:",

    a:[

      "Uma única cor",

      "Várias cores",

      "Som",

      "Energia nuclear"

    ],

    c:1
  },

  {
    p:"A velocidade da luz é maior:",

    a:[

      "No vidro",

      "Na água",

      "No vácuo",

      "No ferro"

    ],

    c:2
  },

  {
    p:"A Óptica geométrica estuda:",

    a:[

      "Raios de luz",

      "Ondas sonoras",

      "Corrente elétrica",

      "Calor"

    ],

    c:0
  },

  {
    p:"Os óculos utilizam:",

    a:[

      "Espelhos",

      "Lentes",

      "Motores",

      "Ondas sonoras"

    ],

    c:1
  },

  {
    p:"A reflexão regular ocorre em superfícies:",

    a:[

      "Rugosas",

      "Polidas",

      "Moles",

      "Transparentes"

    ],

    c:1
  },

  {
    p:"A refração pode provocar:",

    a:[

      "Mudança de direção da luz",

      "Desaparecimento da luz",

      "Produção de som",

      "Gravidade"

    ],

    c:0
  },

  {
    p:"A luz solar é considerada:",

    a:[

      "Monocromática",

      "Policromática",

      "Sonora",

      "Nuclear"

    ],

    c:1
  },

  {
    p:"Os fenômenos ópticos estão relacionados à:",

    a:[

      "Luz",

      "Massa",

      "Gravidade",

      "Pressão"

    ],

    c:0
  },

  {
    p:"A luz se propaga em linha reta em meios:",

    a:[

      "Transparentes e homogêneos",

      "Metálicos",

      "Sonoros",

      "Magnéticos"

    ],

    c:0
  },

  {
    p:"A formação de sombras ocorre devido:",

    a:[

      "À propagação retilínea da luz",

      "Ao som",

      "À gravidade",

      "Ao magnetismo"

    ],

    c:0
  },

  {
    p:"A Lua é vista porque:",

    a:[

      "Produz luz própria",

      "Reflete a luz solar",

      "Produz som",

      "É transparente"

    ],

    c:1
  },

  {
    p:"Um corpo luminoso é aquele que:",

    a:[

      "Reflete luz",

      "Produz luz própria",

      "Produz som",

      "Não possui energia"

    ],

    c:1
  },

  {
    p:"Um corpo iluminado:",

    a:[

      "Reflete luz recebida",

      "Produz luz própria",

      "Não pode ser visto",

      "Produz gravidade"

    ],

    c:0
  },

  {
    p:"A cor percebida de um objeto depende:",

    a:[

      "Da luz refletida",

      "Do som",

      "Da massa",

      "Da gravidade"

    ],

    c:0
  },

  {
    p:"O arco-íris é formado pela:",

    a:[

      "Reflexão da luz",

      "Dispersão da luz",

      "Difração sonora",

      "Interferência magnética"

    ],

    c:1
  },

  {
    p:"A Física que estuda a luz é chamada:",

    a:[

      "Óptica",

      "Acústica",

      "Termologia",

      "Astronomia"

    ],

    c:0
  },

  {
    p:"A luz visível faz parte do:",

    a:[

      "Espectro eletromagnético",

      "Campo gravitacional",

      "Som mecânico",

      "Sistema solar"

    ],

    c:0
  },

  {
    p:"A Óptica possui aplicações em:",

    a:[

      "Medicina",

      "Astronomia",

      "Tecnologia",

      "Todas as anteriores"

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

function analisarOptica(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    reflexao:{

      titulo:
        "🪞 Reflexão",

      tipo:
        "Retorno da luz",

      texto:
        "A reflexão ocorre quando a luz retorna ao meio de origem após atingir uma superfície."

    },

    refracao:{

      titulo:
        "🌊 Refração",

      tipo:
        "Mudança de direção",

      texto:
        "A refração acontece quando a luz muda de velocidade ao passar de um meio para outro."

    },

    lentes:{

      titulo:
        "🔍 Lentes",

      tipo:
        "Formação de imagens",

      texto:
        "As lentes desviam os raios luminosos e podem ampliar, reduzir ou corrigir imagens."

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

window.analisarOptica =
  analisarOptica;