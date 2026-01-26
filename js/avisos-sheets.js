/* =====================================================
   AVISOS — GOOGLE SHEETS (CSV)
   Portal do Professor Arlisson
   -----------------------------------------------------
   Requisitos:
   - login2.js já executado
   - localStorage.turma definido
   - HTML com <div id="lista-avisos"></div>
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("lista-avisos");
  const turma = localStorage.getItem("turma");
  const turmaHeader = document.getElementById("turma");

  if (!lista) return;

  if (!turma) {
    lista.innerHTML = "<p>⚠️ Turma não identificada.</p>";
    return;
  }

  // Mostra a turma no topo (opcional, mas bonito)
  if (turmaHeader) {
    turmaHeader.textContent = `Turma: ${turma.toUpperCase()}`;
  }

  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5mAaIaCxCxFQTC6ryx3TnPNii-MAqKucwIuL5udgAul-vFf4kY1V8_Cr1tBztlBP5gV1jEjjffAnC/pub?output=csv";

  fetch(URL)
    .then(res => res.text())
    .then(csv => {

      const separador = csv.includes(";") ? ";" : ",";
      const linhas = csv.trim().split("\n").slice(1);

      const avisos = [];

      linhas.forEach(linha => {
        const colunas = linha.split(separador);
        if (colunas.length < 6) return;

        const turmaAviso = colunas[3].trim();
        if (turmaAviso !== turma) return;

        avisos.push({
          titulo: colunas[1].trim(),
          texto: colunas[2].trim(),
          data: colunas[4].trim(),
          importante: colunas[5].trim().toLowerCase() === "sim"
        });
      });

      if (avisos.length === 0) {
        lista.innerHTML = "<p>📢 Nenhum aviso no momento.</p>";
        return;
      }

      // Ordena por data (mais recente primeiro)
      avisos.sort((a, b) => new Date(b.data) - new Date(a.data));

      avisos.forEach(aviso => {
        lista.appendChild(criarAviso(aviso));
      });
    })
    .catch(err => {
      console.error("Erro ao carregar avisos:", err);
      lista.innerHTML = "<p>⚠️ Erro ao carregar avisos.</p>";
    });
});

/* =====================================================
   CRIA CARD DE AVISO (SEGURO)
===================================================== */
function criarAviso(aviso) {
  const div = document.createElement("div");
  div.classList.add("aviso");

  if (aviso.importante) {
    div.classList.add("aviso-importante");
  }

  const titulo = document.createElement("h3");
  titulo.textContent = aviso.titulo;

  const data = document.createElement("small");
  data.textContent = `📅 ${formatarData(aviso.data)}`;

  const texto = document.createElement("p");
  texto.textContent = aviso.texto;

  div.append(titulo, data, texto);
  return div;
}

/* =====================================================
   FORMATA DATA (YYYY-MM-DD → DD/MM/YYYY)
===================================================== */
function formatarData(dataISO) {
  if (!dataISO || !dataISO.includes("-")) return dataISO;
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}
