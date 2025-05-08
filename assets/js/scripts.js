document.getElementById("nome-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const nome = document.getElementById("nome").value;
    document.getElementById("modal").style.display = "none";
    document.getElementById("conteudo").textContent = `Bem-vindo(a), ${nome}!`;
    document.getElementById("conteudo").classList.remove("hidden");
  });
  