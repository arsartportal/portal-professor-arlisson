async function carregarComponente(seletor, caminho) {
  const el = document.querySelector(seletor);
  if (!el) return;

  try {
    const res = await fetch(caminho);

    if (!res.ok) {
      console.error("Erro ao carregar:", caminho);
      return;
    }

    const html = await res.text();
    el.innerHTML = html;

  } catch (erro) {
    console.error("Erro:", erro);
  }
}

export async function iniciarComponentes() {
  await carregarComponente("#header", "/components/superheader.html");
  await carregarComponente("#footer", "/components/superfooter.html");
}