    let novoElemento = document.createElement("p");
    let nomeArmazenado = localStorage.getItem("nomePessoa")

    novoElemento.innerText = `Olá, ${nomeArmazenado}!`
    document.body.appendChild(novoElemento);