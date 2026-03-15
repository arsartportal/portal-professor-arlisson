export function initGlobalAlert() {
  if (document.getElementById("alertaGlobal")) return;

  const container = document.createElement("div");
  container.id = "alertaGlobal";

  document.body.appendChild(container);
}

export function globalAlert(msg, tipo = "info", tempo = 5000) {
  const box = document.getElementById("alertaGlobal");
  if (!box) return;

  const div = document.createElement("div");
  div.className = `alerta-item alerta-${tipo}`;

  const icone = document.createElement("div");
  icone.className = "alerta-icone";
  icone.innerHTML = getAlertIcon(tipo);

  const conteudo = document.createElement("div");
  conteudo.className = "alerta-conteudo";

  const texto = document.createElement("div");
  texto.className = "alerta-texto";
  texto.innerText = msg;

  const barra = document.createElement("div");
  barra.className = "alerta-barra";

  const btnFechar = document.createElement("button");
  btnFechar.className = "alerta-fechar";
  btnFechar.innerHTML = "&times;";
  btnFechar.setAttribute("aria-label", "Fechar alerta");

  conteudo.appendChild(texto);
  conteudo.appendChild(barra);

  div.appendChild(icone);
  div.appendChild(conteudo);
  div.appendChild(btnFechar);

  box.appendChild(div);

  let timeoutId;
  let startTime = Date.now();
  let remaining = tempo;
  let paused = false;

  barra.style.animationDuration = `${tempo}ms`;

  const startTimer = () => {
    startTime = Date.now();
    barra.style.animationPlayState = "running";

    timeoutId = setTimeout(() => {
      fecharAlerta(div);
    }, remaining);
  };

  const pauseTimer = () => {
    if (paused) return;
    paused = true;

    clearTimeout(timeoutId);
    remaining -= Date.now() - startTime;
    barra.style.animationPlayState = "paused";
  };

  const resumeTimer = () => {
    if (!paused) return;
    paused = false;
    startTimer();
  };

  div.addEventListener("mouseenter", pauseTimer);
  div.addEventListener("mouseleave", resumeTimer);

  btnFechar.addEventListener("click", () => {
    clearTimeout(timeoutId);
    fecharAlerta(div);
  });

  startTimer();
}

function fecharAlerta(div) {
  if (!div || div.classList.contains("saindo")) return;

  div.classList.add("saindo");

  setTimeout(() => {
    div.remove();
  }, 350);
}

function getAlertIcon(tipo) {
  const icons = {
    sucesso: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    `,
    erro: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M15 9l-6 6"/>
        <path d="M9 9l6 6"/>
      </svg>
    `,
    aviso: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3L22 20H2L12 3z"/>
        <path d="M12 9v4"/>
        <path d="M12 17h.01"/>
      </svg>
    `,
    info: `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="9"/>
        <path d="M12 10v5"/>
        <path d="M12 7h.01"/>
      </svg>
    `
  };

  return icons[tipo] || icons.info;
}