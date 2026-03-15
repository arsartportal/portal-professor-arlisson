export function initGlobalAlert(){

if(document.getElementById("alertaGlobal")) return

const container = document.createElement("div")
container.id = "alertaGlobal"

document.body.appendChild(container)

}

export function globalAlert(msg,tempo=5000){

const box = document.getElementById("alertaGlobal")
if(!box) return

const div = document.createElement("div")
div.className="alerta-item"

div.innerText = msg

box.appendChild(div)

setTimeout(()=>{
div.remove()
},tempo)

}