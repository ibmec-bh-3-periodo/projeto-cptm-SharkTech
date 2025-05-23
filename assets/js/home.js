const valorSaldo = document.getElementById('valor-saldo');
const iconeOlho = document.getElementById('icone-olho');
const toggleBtn = document.getElementById('toggle-saldo');

let saldoVisivel = true;

toggleBtn.addEventListener('click', () => {
  saldoVisivel = !saldoVisivel;
  valorSaldo.textContent = saldoVisivel ? 'R$ 14,70' : '••••';
  iconeOlho.src = saldoVisivel ? '../assets/img/eye-off.svg' : '../assets/img/eye.svg';
});

let boasVindas = document.getElementsByClassName("boas-vindas")[0];
let nomeArmazenado = localStorage.getItem("nomePessoa")

boasVindas.innerText = `Para onde, ${nomeArmazenado}?`
