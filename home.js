    let boasVindas = document.getElementsByClassName("boas-vindas") [0];
    let nomeArmazenado = localStorage.getItem("nomePessoa")

    novoElemento.innerText = `Para onde, ${nomeArmazenado}?`
    //document.body.appendChild(novoElemento);