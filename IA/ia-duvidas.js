import { baseConhecimento } from "./fisica-ia.js";

export function buscarResposta(pergunta){

const texto = pergunta.toLowerCase();

for(const item of baseConhecimento){

for(const tag of item.tags){

if(texto.includes(tag)){
return item.resposta;
}

}

}

return null;

}