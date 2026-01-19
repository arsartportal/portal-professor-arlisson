document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("lista-materiais");
  const turmaLogada = localStorage.getItem("turma");

  if (!container || !turmaLogada) return;

  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTHO3J-42Q7CjGfTwqlcx2lEYvFymrVd1Gf3h-HkzsUGL_EG3FIs-JeoiR9NcHjAj_GYbqe2eAaLf0f/pub?output=csv";

  fetch(URL)
    .then(res => res.text())
    .then(texto => {

      const sep = texto.includes(";") ? ";" : ",";
      const linhas = texto.trim().split("\n").slice(1);

      let materiais = [];

      linhas.forEach(l => {
        const c = l.split(sep);
        if (c.length < 6) return;

        const disciplina = c[1].trim();
        const turma = c[2].trim();
        const bimestre = c[3].trim();
        const titulo = c[4].trim();
        const link = c[5].trim();

        if (turma === turmaLogada) {
          materiais.push({ disciplina, bimestre, titulo, link });
        }
      });

      if (materiais.length === 0) {
        container.innerHTML = "<p>📂 Nenhum material disponível.</p>";
        return;
      }

      // organiza por disciplina e bimestre
      const grupos = {};

      materiais.forEach(m => {
        const chave = `${m.disciplina}-${m.bimestre}`;
        if (!grupos[chave]) grupos[chave] = [];
        grupos[chave].push(m);
      });

      for (const chave in grupos) {
        const [disc, bim] = chave.split("-");

        const bloco = document.createElement("div");
        bloco.className = "card";

        bloco.innerHTML = `<h3>${disc} – ${bim}º bimestre</h3>`;

        grupos[chave].forEach(m => {
          const a = document.createElement("a");
          a.href = m.link;
          a.target = "_blank";
          a.innerText = `📄 ${m.titulo}`;
          a.style.display = "block";
          bloco.appendChild(a);
        });

        container.appendChild(bloco);
      }

    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>⚠️ Erro ao carregar materiais.</p>";
    });

});
