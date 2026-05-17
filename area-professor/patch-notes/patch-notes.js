// ========================================
// BOTÃO VOLTAR
// ========================================

const btnVoltar =
document.getElementById("btnVoltar");

btnVoltar.addEventListener("click",()=>{

  history.back();

});

// ========================================
// ANIMAÇÃO DETAILS
// ========================================

const patchVersions =
document.querySelectorAll(".patch-version");

patchVersions.forEach((item)=>{

  item.addEventListener("toggle",()=>{

    if(item.open){

      item.style.borderColor =
      "#bfdbfe";

    }else{

      item.style.borderColor =
      "#e2e8f0";
    }

  });

});