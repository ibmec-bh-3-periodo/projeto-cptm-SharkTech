const botao = document.getElementById("botao");

botao.addEventListener("click", function () {
    //event.preventDefault();
    let nome = document.getElementById('nome').value;
    localStorage.setItem('nomePessoa', nome);
    //window.location.href = 'home.html'


});


document.getElementById("nome-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value.trim();
    if (!nome) return;
    document.querySelector(".modal-content").classList.add("hidden");
    document.getElementById("loading").classList.remove("hidden");
    setTimeout(() => {
        window.location.href = "home.html"; 
      }, 2000);
    });