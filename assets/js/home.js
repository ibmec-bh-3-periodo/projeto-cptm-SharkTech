let mostrando = false;

function toggleSaldo() {
  const valor = document.getElementById("valor-saldo");
  const icone = document.getElementById("icone-saldo");

  mostrando = !mostrando;

  if (mostrando) {
    valor.textContent = "R$ 30,00";
    icone.src = "assets/img/eye-open.png";
  } else {
    valor.textContent = "R$ ●●●●";
    icone.src = "assets/img/eye-closed.png";
  }
}


const estacoes = [
  "Luz", "Brás", "Palmeiras-Barra Funda", "Osasco", "Jundiaí",
  "Santo André", "Tamanduateí", "Franco da Rocha", "Ribeirão Pires",
  "Rio Grande da Serra", "Piqueri", "Vila Olímpia", "Pinheiros"
];

function mostrarSugestoes() {
  const input = document.getElementById("search").value.toLowerCase();
  const sugestoes = document.getElementById("sugestoes");

  sugestoes.innerHTML = "";

  if (input.length === 0) return;

  const filtradas = estacoes.filter(est =>
    est.toLowerCase().includes(input)
  );

  filtradas.forEach(est => {
    const li = document.createElement("li");
    li.textContent = est;
    li.onclick = () => {
      document.getElementById("search").value = est;
      sugestoes.innerHTML = "";
    };
    sugestoes.appendChild(li);
  });
}

let boasVindas = document.getElementsByClassName("boas-vindas")[0];
let nomeArmazenado = localStorage.getItem("nomePessoa")

boasVindas.innerText = `Para onde, ${nomeArmazenado}?`
