const infograficos = [
    {
        titulo: "1ª Lei de Newton",
        descricao: "Princípio da Inércia",
        imagem: "Primeira Lei de Newton.png",
        link: "Primeira Lei de Newton.png"
    },
    {
        titulo: "2ª Lei de Newton",
        descricao: "Força Resultante",
        imagem: "Segunda Lei de Newton.png",
        link: "Segunda Lei de Newton.png"
    },
    {
        titulo: "3ª Lei de Newton",
        descricao: "Ação e Reação",
        imagem: "Terceira Lei de Newton.png",
        link: "Terceira Lei de Newton.png"
    },
    {
        titulo: "Introdução à Calorimetria",
        descricao: "Conceitos fundamentais de calor e temperatura",
        imagem: "Introdução à Calorimetria.png",
        link: "Introdução à Calorimetria.png"
    },
    {
        titulo: "Dilatação Térmica",
        descricao: "Variação das dimensões dos corpos com a temperatura",
        imagem: "Dilatação Térmica.png",
        link: "Dilatação Térmica.png"
    }
];

const lista = document.getElementById("listaInfograficos");

infograficos.forEach(item => {
    lista.innerHTML += `
        <div class="card">
            <img src="${item.imagem}" alt="${item.titulo}">
            <div class="card-body">
                <h2>${item.titulo}</h2>
                <p>${item.descricao}</p>
                <a href="${item.link}" class="botao">Abrir</a>
            </div>
        </div>
    `;
});