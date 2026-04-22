import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore, collection, getDocs, query, where,
  doc, setDoc, updateDoc, onSnapshot, orderBy
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// 🔥 SUA CONFIG
const firebaseConfig = {
  // cole aqui
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ===============================
// 🧠 GERAR ID INTELIGENTE
// ===============================
function gerarIdGrupo(turma, nome) {
  return `${turma}_${nome.toLowerCase().replace(/\s+/g, "")}`;
}

// ===============================
// 👥 BUSCAR ALUNOS
// ===============================
async function buscarAlunos(turma) {
  const q = query(
    collection(db, "usuarios"),
    where("tipo", "==", "aluno"),
    where("turma", "==", turma)
  );

  const snapshot = await getDocs(q);

  let alunos = [];
  snapshot.forEach(docSnap => {
    alunos.push({ id: docSnap.id, ...docSnap.data() });
  });

  return alunos;
}

// ===============================
// 🔥 GERAR GRUPOS
// ===============================
window.gerarGrupos = async function () {
  const turma = document.getElementById("turma").value;
  const nomesInput = document.getElementById("nomesGrupos").value;

  if (!nomesInput) return alert("Digite os nomes dos grupos");

  const nomes = nomesInput.split(",").map(n => n.trim());

  let alunos = await buscarAlunos(turma);

  alunos.sort(() => Math.random() - 0.5);

  let index = 0;

  for (let nome of nomes) {
    const grupoId = gerarIdGrupo(turma, nome);

    await setDoc(doc(db, "grupos", grupoId), {
      nome,
      turma,
      xp: 0,
      ativo: true,
      createdAt: new Date()
    });

    // distribuir alunos
    for (let i = 0; i < 3 && index < alunos.length; i++) {
      await updateDoc(doc(db, "usuarios", alunos[index].id), {
        grupoId: grupoId
      });
      index++;
    }
  }

  alert("Grupos criados com sucesso!");
};

// ===============================
// 🔄 RESET
// ===============================
window.resetarTudo = async function () {
  const turma = document.getElementById("turma").value;

  const snapshot = await getDocs(
    query(collection(db, "usuarios"), where("turma", "==", turma))
  );

  snapshot.forEach(async (docSnap) => {
    await updateDoc(doc(db, "usuarios", docSnap.id), {
      grupoId: null
    });
  });

  alert("Grupos resetados!");
};

// ===============================
// 📊 ESCUTAR GRUPOS
// ===============================
function escutarGrupos() {
  onSnapshot(collection(db, "grupos"), async (snapshot) => {

    const lista = document.getElementById("listaGrupos");
    lista.innerHTML = "";

    for (const grupoDoc of snapshot.docs) {
      const grupo = grupoDoc.data();

      const alunosSnapshot = await getDocs(
        query(
          collection(db, "usuarios"),
          where("grupoId", "==", grupoDoc.id)
        )
      );

      let nomes = [];
      alunosSnapshot.forEach(a => nomes.push(a.data().nome));

      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${grupo.nome}</strong><br>
        ${nomes.join(" • ")}<br>
        🏆 ${grupo.xp} XP
      `;

      lista.appendChild(li);
    }
  });
}

// ===============================
// 🏆 RANKING
// ===============================
function escutarRanking() {
  const q = query(collection(db, "grupos"), orderBy("xp", "desc"));

  onSnapshot(q, (snapshot) => {
    const lista = document.getElementById("ranking");
    lista.innerHTML = "";

    snapshot.forEach(docSnap => {
      const g = docSnap.data();

      const li = document.createElement("li");
      li.innerHTML = `🏆 ${g.nome} — ${g.xp} XP`;

      lista.appendChild(li);
    });
  });
}

// ===============================
// 🚀 INIT
// ===============================
escutarGrupos();
escutarRanking();