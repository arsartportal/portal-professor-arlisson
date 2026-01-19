document.addEventListener("DOMContentLoaded", () => {

  const fisicaDiv = document.getElementById("glossario-fisica");
  const matematicaDiv = document.getElementById("glossario-matematica");

  if (!fisicaDiv && !matematicaDiv) return;

  const URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vS4qA6RlEaLj6oFeQh9GfrMATV8sAice_MCeaJ0qz4Xfu7Yn_IW8zqcoZJ18uurBjKTFwmrBGs2etk8/pub?output=csv";

  fetch(URL)
    .then(res => res.text())
    .then(texto => {

      const sep = texto.includes(";") ? ";" : ",";
      const linhas = texto.trim().split("\n").slice(1);

      let fisica = [];
      let matematica = [];

      linhas.forEach(l => {
        const c = l.split(sep);
        if (c.length < 4) return;

        const disciplina = c[1].trim();
        const termo = c[2].trim();
        const definicao = c[3].trim();

        if (disciplina === "Fisica") {
          fisica.push({ termo, definicao });
        }

        if (disciplina === "Matematica") {
          matematica.push({ termo, definicao });
        }
      });

      fisica.sort((a, b) => a.termo.localeCompare(b.termo));
      matematica.sort((a, b) => a.termo.localeCompare(b.termo));

      fisica.forEach(t => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${t.termo}</h3><p>${t.definicao}</p>`;
        fisicaDiv.appendChild(div);
      });

      matematica.forEach(t => {
        const div = document.createElement("div");
        div.className = "card";
        div.innerHTML = `<h3>${t.termo}</h3><p>${t.definicao}</p>`;
        matematicaDiv.appendChild(div);
      });

    })
    .catch(err => {
      console.error("Erro no glossário:", err);
      if (fisicaDiv) fisicaDiv.innerHTML = "<p>⚠️ Erro ao carregar.</p>";
      if (matematicaDiv) matematicaDiv.innerHTML = "<p>⚠️ Erro ao carregar.</p>";
    });
/* ================= BUSCA NO GLOSSÁRIO ================= */
const busca = document.getElementById("busca-glossario");

if (busca) {
  busca.addEventListener("input", () => {
    const termoBusca = busca.value.toLowerCase();

    document.querySelectorAll(
      "#glossario-fisica .card, #glossario-matematica .card"
    ).forEach(card => {

      const texto = card.innerText.toLowerCase();
      card.style.display = texto.includes(termoBusca)
        ? "block"
        : "none";
    });
  });
}

});
