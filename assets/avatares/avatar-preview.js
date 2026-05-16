/* =========================================
   LAYERS
========================================= */

const layers = {

    base:
    document.getElementById("base-layer"),

    inferior:
    document.getElementById("inferior-layer"),

    superior:
    document.getElementById("superior-layer"),

    cabelo:
    document.getElementById("cabelo-layer"),

    acessorio:
    document.getElementById("acessorio-layer")

};

/* =========================================
   CONFIG
========================================= */

const avatarConfig = {

    base: {
        x:0,
        y:20,
        scale:0.9,
        z:1
    },

    inferior: {
        x:0,
        y:55,
        scale:0.9,
        z:2
    },

    superior: {
        x:0,
        y:15,
        scale:0.9,
        z:3
    },

    cabelo: {
        x:0,
        y:-40,
        scale:0.75,
        z:4
    },

    acessorio: {
        x:0,
        y:-5,
        scale:0.3,
        z:5
    }

};

/* =========================================
   LOCKS
========================================= */

const lockedLayers = {

    base:false,
    inferior:false,
    superior:false,
    cabelo:false,
    acessorio:false

};

/* =========================================
   APPLY LAYER
========================================= */

function applyLayer(name){

    const layer =
    layers[name];

    const config =
    avatarConfig[name];

    layer.style.position = "absolute";

    layer.style.left = "50%";

    layer.style.top = "50%";

    layer.style.zIndex = config.z;

    layer.style.transform =
    `
    translate(
        calc(-50% + ${config.x}px),
        calc(-50% + ${config.y}px)
    )
    scale(${config.scale})
    `;

}

/* =========================================
   INIT
========================================= */

Object.keys(layers)
.forEach(applyLayer);

/* =========================================
   DRAG SYSTEM
========================================= */

let selectedLayer = null;

let draggingLayer = null;

let startMouseX = 0;
let startMouseY = 0;

let startX = 0;
let startY = 0;

/* =========================================
   SELECT LAYER
========================================= */

Object.entries(layers)
.forEach(([name, layer]) => {

    layer.addEventListener("mousedown", e => {

        if(lockedLayers[name]) return;

        e.preventDefault();

        selectedLayer = name;

        draggingLayer = name;

        startMouseX = e.clientX;
        startMouseY = e.clientY;

        startX =
        avatarConfig[name].x;

        startY =
        avatarConfig[name].y;

        document
        .querySelectorAll(".layer")
        .forEach(el => {

            el.classList.remove("active");

        });

        layer.classList.add("active");

    });

});

/* =========================================
   MOVE
========================================= */

document.addEventListener("mousemove", e => {

    if(!draggingLayer) return;

    const dx =
    e.clientX - startMouseX;

    const dy =
    e.clientY - startMouseY;

    avatarConfig[draggingLayer].x =
    startX + dx;

    avatarConfig[draggingLayer].y =
    startY + dy;

    applyLayer(draggingLayer);

});

/* =========================================
   STOP DRAG
========================================= */

document.addEventListener("mouseup", () => {

    draggingLayer = null;

});

/* =========================================
   SCALE
========================================= */

Object.entries(layers)
.forEach(([name, layer]) => {

    layer.addEventListener("wheel", e => {

        e.preventDefault();

        if(lockedLayers[name]) return;

        selectedLayer = name;

        document
        .querySelectorAll(".layer")
        .forEach(el => {

            el.classList.remove("active");

        });

        layer.classList.add("active");

        if(e.deltaY < 0){

            avatarConfig[name].scale += 0.01;

        } else {

            avatarConfig[name].scale -= 0.01;

        }

        /* LIMITES */

        if(
            avatarConfig[name].scale < 0.05
        ){
            avatarConfig[name].scale = 0.05;
        }

        if(
            avatarConfig[name].scale > 3
        ){
            avatarConfig[name].scale = 3;
        }

        applyLayer(name);

    });

});

/* =========================================
   LOCK BUTTONS
========================================= */

document
.querySelectorAll(".layer-controls button")

.forEach(button => {

    button.addEventListener("click", () => {

        const layer =
        button.dataset.layer;

        lockedLayers[layer] =
        !lockedLayers[layer];

        if(lockedLayers[layer]){

            button.classList.add("locked");

            button.innerHTML =
            "🔒 " + layer;

        } else {

            button.classList.remove("locked");

            button.innerHTML =
            "🔓 " + layer;

        }

    });

});

/* =========================================
   INVENTORY DRAG
========================================= */

document
.querySelectorAll(".inventory-item")

.forEach(item => {

    item.addEventListener("dragstart", e => {

        e.dataTransfer.setData(
            "type",
            item.dataset.type
        );

        e.dataTransfer.setData(
            "src",
            item.dataset.src
        );

    });

});

/* =========================================
   DROP AREA
========================================= */

const avatarBox =
document.getElementById("avatar-box");

avatarBox.addEventListener("dragover", e => {

    e.preventDefault();

});

avatarBox.addEventListener("drop", e => {

    e.preventDefault();

    const type =
    e.dataTransfer.getData("type");

    const src =
    e.dataTransfer.getData("src");

    if(layers[type]){

        layers[type].src = src;

        selectedLayer = type;

        document
        .querySelectorAll(".layer")
        .forEach(el => {

            el.classList.remove("active");

        });

        layers[type]
        .classList.add("active");

    }

});

/* =========================================
   DELETE LAYER
========================================= */

const deleteBtn =
document.getElementById(
    "delete-layer-btn"
);

deleteBtn.addEventListener("click", () => {

    if(!selectedLayer){

        alert(
            "Selecione uma layer primeiro."
        );

        return;

    }

    if(selectedLayer === "base"){

        alert(
            "A base não pode ser removida."
        );

        return;

    }

    layers[selectedLayer].src = "";

});

/* =========================================
   RESET AVATAR
========================================= */

const resetBtn =
document.getElementById(
    "reset-avatar-btn"
);

resetBtn.addEventListener("click", () => {

    /* RESET IMAGENS */

    layers.base.src =
    "/assets/avatares/1-bases/masculino-1.png";

    layers.inferior.src =
    "/assets/avatares/4-inferior/inferior-1.png";

    layers.superior.src =
    "/assets/avatares/3-superior/superior-1.png";

    layers.cabelo.src =
    "/assets/avatares/2-cabelos/cabelo-1.png";

    layers.acessorio.src =
    "/assets/avatares/5-acessorios/oculos-1.png";

    /* RESET CONFIG */

    avatarConfig.base = {
        x:0,
        y:20,
        scale:0.9,
        z:1
    };

    avatarConfig.inferior = {
        x:0,
        y:55,
        scale:0.9,
        z:2
    };

    avatarConfig.superior = {
        x:0,
        y:15,
        scale:0.9,
        z:3
    };

    avatarConfig.cabelo = {
        x:0,
        y:-40,
        scale:0.75,
        z:4
    };

    avatarConfig.acessorio = {
        x:0,
        y:-5,
        scale:0.3,
        z:5
    };

    Object.keys(layers)
    .forEach(applyLayer);

});

/* =========================================
   SAVE AVATAR
========================================= */

const saveBtn =
document.getElementById(
    "save-avatar-btn"
);

saveBtn.addEventListener("click", () => {

    const avatarData = {

        imagens: {

            base:
            layers.base.src,

            inferior:
            layers.inferior.src,

            superior:
            layers.superior.src,

            cabelo:
            layers.cabelo.src,

            acessorio:
            layers.acessorio.src

        },

        config: avatarConfig

    };

    localStorage.setItem(

        "avatar-save",

        JSON.stringify(avatarData)

    );

    console.clear();

    console.log(
        "AVATAR SALVO:"
    );

    console.log(avatarData);

    alert(
        "✅ Avatar salvo com sucesso!"
    );

});

/* =========================================
   LOAD SAVE
========================================= */

const savedAvatar =

localStorage.getItem(
    "avatar-save"
);

if(savedAvatar){

    const data =
    JSON.parse(savedAvatar);

    /* IMAGENS */

    layers.base.src =
    data.imagens.base;

    layers.inferior.src =
    data.imagens.inferior;

    layers.superior.src =
    data.imagens.superior;

    layers.cabelo.src =
    data.imagens.cabelo;

    layers.acessorio.src =
    data.imagens.acessorio;

    /* CONFIG */

    Object.assign(
        avatarConfig,
        data.config
    );

    Object.keys(layers)
    .forEach(applyLayer);

}