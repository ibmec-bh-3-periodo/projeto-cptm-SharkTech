
const valorSaldo = document.getElementById('valor-saldo');
const iconeOlho = document.getElementById('icone-olho');
const toggleBtn = document.getElementById('toggle-saldo');
const linkSaldo = document.getElementById('link-saldo');

let saldoVisivel = true;
const idUsuario = 1; // mesmo id usado na tela-saldo

async function carregarSaldo() {
  try {
    const resposta = await fetch(`http://localhost:3000/usuarios/${idUsuario}`);
    if (!resposta.ok) throw new Error('Erro ao buscar saldo');
    const usuario = await resposta.json();
    const saldo = usuario.saldo;

    valorSaldo.textContent = saldoVisivel
      ? saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
      : '••••';

    valorSaldo.dataset.valorReal = saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  } catch (erro) {
    console.error('Erro ao carregar saldo:', erro);
    valorSaldo.textContent = 'Erro';
  }
}

window.addEventListener('DOMContentLoaded', carregarSaldo);


toggleBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  saldoVisivel = !saldoVisivel;

  const saldoAtual = valorSaldo.dataset.valorReal || valorSaldo.textContent;

  valorSaldo.textContent = saldoVisivel
    ? saldoAtual
    : '••••';

  iconeOlho.src = saldoVisivel
    ? 'assets/img/eye-off.svg'
    : 'assets/img/eye.svg';
});

linkSaldo.addEventListener('click', () => {
  window.location.href = "tela-saldo.html";
});

let boasVindas = document.getElementsByClassName("boas-vindas")[0];
let nomeArmazenado = localStorage.getItem("nomePessoa");
boasVindas.innerText = `Para onde, ${nomeArmazenado}?`;

const mapa = document.getElementById("mapaHome");
const transicao = document.getElementById("mapa-transicao");

mapa.addEventListener("click", () => {
  transicao.style.opacity = "1";
  transicao.style.transform = "scale(1)";
  
  setTimeout(() => {
    window.location.href = "mapa.html";
  }, 850);
});


