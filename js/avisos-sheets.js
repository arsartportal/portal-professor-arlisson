document.addEventListener("DOMContentLoaded", () => {

  const lista = document.getElementById("lista-avisos");
  const turma = localStorage.getItem("turma");

  if (!lista || !turma) return;

  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vT5mAaIaCxCxFQTC6ryx3TnPNii-MAqKucwIuL5udgAul-vFf4kY1V8_Cr1tBztlBP5gV1jEjjffAnC/pub?output=csv";

  fetch(URL)
    .then(res => res.text())
    .then(texto => {

      const separador = texto.includes(";") ? ";" : ",";
      const linhas = texto.trim().split("\n").slice(1);

      let avisos = [];

      linhas.forEach(linha => {
        const col = linha.split(separador);
        if (col.length < 6) return;

        const titulo = col[1].trim();
        const textoAviso = col[2].trim();
        const turmaAviso = col[3].trim();
        const data = col[4].trim();
        const importante = col[5].trim().toLowerCase();

        if (turmaAviso === turma) {
          avisos.push({
            titulo,
            texto: textoAviso,
            data,
            importante
          });
        }
      });

      if (avisos.length === 0) {
        lista.innerHTML = "<p>📢 Nenhum aviso no momento.</p>";
        return;
      }

      // 🔽 ORDENA POR DATA (mais recente primeiro)
      avisos.sort((a, b) => new Date(b.data) - new Date(a.data));

      avisos.forEach(a => {
        const div = document.createElement("div");
        div.className = "aviso";

        if (a.importante === "sim") {
          div.classList.add("aviso-importante");
        }

        div.innerHTML = `
          <h3>${a.titulo}</h3>
          <small>📅 ${formatarData(a.data)}</small>
          <p>${a.texto}</p>
        `;

        lista.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      lista.innerHTML = "<p>⚠️ Erro ao carregar avisos.</p>";
    });

});

/* ===== FUNÇÃO DE DATA ===== */
function formatarData(dataISO) {
  const [ano, mes, dia] = dataISO.split("-");
  return `${dia}/${mes}/${ano}`;
}
