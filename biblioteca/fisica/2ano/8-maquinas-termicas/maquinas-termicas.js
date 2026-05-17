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
  id:208,

  /*
    SLUG
  */
  slug:
    "maquinas-termicas",

  /*
    TÍTULO
  */
  titulo:
    "Máquinas Térmicas",

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
    p:"As máquinas térmicas transformam:",

    a:[

      "Energia elétrica em luz",

      "Calor em trabalho",

      "Som em energia",

      "Massa em calor"

    ],

    c:1
  },

  {
    p:"Uma máquina térmica funciona através:",

    a:[

      "Da troca de calor",

      "Da gravidade",

      "Do magnetismo",

      "Da reflexão"

    ],

    c:0
  },

  {
    p:"O rendimento de uma máquina térmica é:",

    a:[

      "Sempre 100%",

      "Maior que 100%",

      "Limitado",

      "Negativo"

    ],

    c:2
  },

  {
    p:"A fórmula do rendimento é:",

    a:[

      "η = τ/Q",

      "F = m·a",

      "Q = m·c·ΔT",

      "P = U·i"

    ],

    c:0
  },

  {
    p:"A letra η representa:",

    a:[

      "Temperatura",

      "Pressão",

      "Rendimento",

      "Entropia"

    ],

    c:2
  },

  {
    p:"Parte do calor recebido pela máquina:",

    a:[

      "É totalmente destruído",

      "É convertido em trabalho",

      "Desaparece",

      "Vira massa"

    ],

    c:1
  },

  {
    p:"Uma máquina térmica precisa de:",

    a:[

      "Fonte quente e fria",

      "Somente fonte fria",

      "Somente eletricidade",

      "Somente combustível"

    ],

    c:0
  },

  {
    p:"O calor rejeitado é enviado para:",

    a:[

      "Fonte fria",

      "Fonte quente",

      "O vácuo",

      "O motor"

    ],

    c:0
  },

  {
    p:"O trabalho realizado pela máquina é representado por:",

    a:[

      "Q",

      "τ",

      "η",

      "ΔT"

    ],

    c:1
  },

  {
    p:"A máquina térmica ideal foi proposta por:",

    a:[

      "Newton",

      "Tesla",

      "Carnot",

      "Galileu"

    ],

    c:2
  },

  {
    p:"A Máquina de Carnot possui:",

    a:[

      "Rendimento máximo teórico",

      "Rendimento infinito",

      "Rendimento nulo",

      "Energia ilimitada"

    ],

    c:0
  },

  {
    p:"Na fórmula da Máquina de Carnot, as temperaturas devem estar em:",

    a:[

      "Celsius",

      "Fahrenheit",

      "Kelvin",

      "Caloria"

    ],

    c:2
  },

  {
    p:"O calor naturalmente flui:",

    a:[

      "Do quente para o frio",

      "Do frio para o quente",

      "Sem direção",

      "Somente no vácuo"

    ],

    c:0
  },

  {
    p:"Motores de automóveis são exemplos de:",

    a:[

      "Máquinas térmicas",

      "Transformadores",

      "Capacitores",

      "Geradores solares"

    ],

    c:0
  },

  {
    p:"O rendimento nunca pode atingir 100% porque:",

    a:[

      "Sempre existe perda de calor",

      "O calor desaparece",

      "A energia é destruída",

      "O trabalho é infinito"

    ],

    c:0
  },

  {
    p:"As usinas termelétricas utilizam:",

    a:[

      "Máquinas térmicas",

      "Ímãs permanentes",

      "Refração",

      "Somente baterias"

    ],

    c:0
  },

  {
    p:"O trabalho produzido pela máquina vem da:",

    a:[

      "Transformação de energia térmica",

      "Destruição da energia",

      "Gravidade",

      "Reflexão"

    ],

    c:0
  },

  {
    p:"O rendimento é uma medida de:",

    a:[

      "Eficiência",

      "Velocidade",

      "Pressão",

      "Volume"

    ],

    c:0
  },

  {
    p:"A Segunda Lei da Termodinâmica limita:",

    a:[

      "O rendimento das máquinas",

      "A velocidade da luz",

      "A massa dos corpos",

      "A gravidade"

    ],

    c:0
  },

  {
    p:"Uma geladeira funciona retirando:",

    a:[

      "Calor do ambiente interno",

      "Energia elétrica do ar",

      "Massa térmica",

      "Entropia"

    ],

    c:0
  },

  {
    p:"As turbinas de avião utilizam:",

    a:[

      "Processos térmicos",

      "Somente magnetismo",

      "Somente ondas",

      "Somente óptica"

    ],

    c:0
  },

  {
    p:"A energia térmica está relacionada:",

    a:[

      "À agitação das partículas",

      "Somente à luz",

      "Somente à massa",

      "Somente ao som"

    ],

    c:0
  },

  {
    p:"Uma máquina térmica opera em:",

    a:[

      "Ciclos",

      "Linha reta",

      "Órbitas",

      "Campos elétricos"

    ],

    c:0
  },

  {
    p:"No ciclo térmico ocorre:",

    a:[

      "Troca de calor e realização de trabalho",

      "Desaparecimento da energia",

      "Criação de massa",

      "Ausência de temperatura"

    ],

    c:0
  },

  {
    p:"A unidade de trabalho no SI é:",

    a:[

      "Pascal",

      "Joule",

      "Kelvin",

      "Metro"

    ],

    c:1
  },

  {
    p:"O calor recebido pela máquina é chamado de:",

    a:[

      "Q quente",

      "Q frio",

      "Energia cinética",

      "Pressão"

    ],

    c:0
  },

  {
    p:"Toda máquina térmica possui:",

    a:[

      "Perdas de energia",

      "Rendimento infinito",

      "Energia ilimitada",

      "Temperatura zero"

    ],

    c:0
  },

  {
    p:"O rendimento real de uma máquina:",

    a:[

      "É menor que o ideal",

      "É infinito",

      "É sempre 100%",

      "É negativo"

    ],

    c:0
  },

  {
    p:"A Física que estuda máquinas térmicas é a:",

    a:[

      "Óptica",

      "Mecânica",

      "Termodinâmica",

      "Acústica"

    ],

    c:2
  },

  {
    p:"A função principal das máquinas térmicas é:",

    a:[

      "Converter calor em trabalho",

      "Criar energia",

      "Eliminar temperatura",

      "Produzir gravidade"

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

function analisarMaquina(tipo){

  const resultado =
    document.getElementById(
      "resultadoSimulador"
    );

  /*
    DADOS
  */
  const dados = {

    motor:{

      titulo:
        "🚗 Motor Térmico",

      tipo:
        "Conversão de calor em movimento",

      texto:
        "Motores térmicos utilizam combustível para gerar calor e transformar parte dessa energia em trabalho mecânico."

    },

    rendimento:{

      titulo:
        "📈 Rendimento",

      tipo:
        "Eficiência energética",

      texto:
        "O rendimento mede a eficiência da máquina térmica na transformação de calor em trabalho útil."

    },

    carnot:{

      titulo:
        "🔥 Máquina de Carnot",

      tipo:
        "Máquina ideal",

      texto:
        "A Máquina de Carnot representa o limite máximo teórico de rendimento para uma máquina térmica."

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

window.analisarMaquina =
  analisarMaquina;