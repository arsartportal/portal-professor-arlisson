/* =====================================================
   INVENTÁRIO E LOG DOS ALUNOS
   Portal do Professor
===================================================== */

import { db } from "./firebase.js"

import {
collection,
addDoc,
doc,
setDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js"



/* =====================================================
   REGISTRAR LOG DO ALUNO
===================================================== */

export async function registrarLogAluno(uid, dados){

if(!uid) throw new Error("UID do aluno não informado para registrar log.")

await addDoc(collection(db, "usuarios", uid, "logs"), {

acao: dados.acao || "acao_nao_definida",
origem: dados.origem || "sistema",

itemId: dados.itemId || null,
itemNome: dados.itemNome || null,

descricao: dados.descricao || "",

sciencePointsAntes: dados.sciencePointsAntes ?? null,
sciencePointsDepois: dados.sciencePointsDepois ?? null,

xpAntes: dados.xpAntes ?? null,
xpDepois: dados.xpDepois ?? null,

nivelAntes: dados.nivelAntes ?? null,
nivelDepois: dados.nivelDepois ?? null,

streakAntes: dados.streakAntes ?? null,
streakDepois: dados.streakDepois ?? null,

rankingAntes: dados.rankingAntes || null,
rankingDepois: dados.rankingDepois || null,

extras: dados.extras || {},

data: serverTimestamp()

})

}



/* =====================================================
   ADICIONAR ITEM AO INVENTÁRIO
   Usa addDoc para criar um item novo
===================================================== */

export async function adicionarAoInventario(uid, item){

if(!uid) throw new Error("UID do aluno não informado para adicionar ao inventário.")

await addDoc(collection(db, "usuarios", uid, "inventario"), {

tipo: item.tipo || "item",
itemId: item.itemId || null,
nome: item.nome || "Item sem nome",
origem: item.origem || "sistema",
status: item.status || "ativo",

descricao: item.descricao || "",

detalhes: item.detalhes || {},

adicionadoEm: serverTimestamp(),
atualizadoEm: serverTimestamp()

})

}



/* =====================================================
   SALVAR BENEFÍCIO FIXO NO INVENTÁRIO
   Usa setDoc com itemId fixo
   Ideal para ranking e benefícios únicos
===================================================== */

export async function salvarBeneficioInventario(uid, itemId, dados){

if(!uid) throw new Error("UID do aluno não informado para salvar benefício.")
if(!itemId) throw new Error("itemId não informado para salvar benefício no inventário.")

await setDoc(
doc(db, "usuarios", uid, "inventario", itemId),
{

tipo: dados.tipo || "beneficio",
itemId: itemId,
nome: dados.nome || "Benefício",
origem: dados.origem || "sistema",
status: dados.status || "ativo",

descricao: dados.descricao || "",

ativadoEm: dados.ativadoEm || serverTimestamp(),
expiraEm: dados.expiraEm || null,

detalhes: dados.detalhes || {},

atualizadoEm: serverTimestamp()

},
{ merge: true }
)

}



/* =====================================================
   LOG PADRÃO DE COMPRA DE XP
===================================================== */

export async function logCompraXP({
uid,
itemId,
itemNome,
sciencePointsAntes,
sciencePointsDepois,
xpAntes,
xpDepois,
nivelAntes,
nivelDepois
}){

await registrarLogAluno(uid, {
acao: "compra_xp",
origem: "loja",
itemId,
itemNome,
descricao: `Comprou ${itemNome} na loja.`,
sciencePointsAntes,
sciencePointsDepois,
xpAntes,
xpDepois,
nivelAntes,
nivelDepois
})

}



/* =====================================================
   LOG PADRÃO DE COMPRA DE RANKING
===================================================== */

export async function logCompraRanking({
uid,
itemId,
itemNome,
sciencePointsAntes,
sciencePointsDepois,
rankingAntes,
rankingDepois,
dias
}){

await registrarLogAluno(uid, {
acao: "compra_ranking",
origem: "loja",
itemId,
itemNome,
descricao: `Comprou acesso ao ranking por ${dias} dias.`,
sciencePointsAntes,
sciencePointsDepois,
rankingAntes,
rankingDepois,
extras: {
dias
}
})

}



/* =====================================================
   LOG PADRÃO DE ABERTURA DE CAIXA
===================================================== */

export async function logAberturaCaixa({
uid,
itemId,
itemNome,
xpAntes,
xpDepois,
nivelAntes,
nivelDepois,
premioXp
}){

await registrarLogAluno(uid, {
acao: "abertura_caixa",
origem: "loja",
itemId,
itemNome,
descricao: `Abriu ${itemNome} e recebeu +${premioXp} XP.`,
xpAntes,
xpDepois,
nivelAntes,
nivelDepois,
extras: {
premioXp
}
})

}



/* =====================================================
   LOG PADRÃO DE ROLETA
===================================================== */

export async function logRoleta({
uid,
itemId,
itemNome,
sciencePointsAntes,
sciencePointsDepois,
xpAntes,
xpDepois,
nivelAntes,
nivelDepois,
premioXp
}){

await registrarLogAluno(uid, {
acao: "roleta",
origem: "loja",
itemId,
itemNome,
descricao: `Girou a roleta e recebeu +${premioXp} XP.`,
sciencePointsAntes,
sciencePointsDepois,
xpAntes,
xpDepois,
nivelAntes,
nivelDepois,
extras: {
premioXp
}
})

}



/* =====================================================
   LOG PADRÃO DE PRÊMIO FÍSICO
===================================================== */

export async function logPremioFisico({
uid,
itemId,
itemNome,
sciencePointsAntes,
sciencePointsDepois
}){

await registrarLogAluno(uid, {
acao: "premio_fisico",
origem: "loja",
itemId,
itemNome,
descricao: `Resgatou o prêmio físico ${itemNome}.`,
sciencePointsAntes,
sciencePointsDepois
})

}