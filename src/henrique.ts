import express, { Request, Response } from 'express';

const server = express();
server.use(express.json());

// "Banco de dados" só na memória (simulado)
let usuarios = [
  { username: 'Henrique', saldo: 100 }
];

// Rota PUT para adicionar saldo
server.put('/usuarios/:username/saldo', (req: Request, res: Response) => {
  const { username } = req.params;   // vem da URL
  const { valor } = req.body;        // vem do corpo da requisição

  // Verifica se o valor é um número
  if (typeof valor !== 'number' || isNaN(valor)) {
    return res.status(400).json({ error: 'Valor inválido!' });
  }

  // Procura o usuário no "banco"
  const usuario = usuarios.find(u => u.username === username);

  // Se não encontrar, retorna erro
  if (!usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado!' });
  }

  // Atualiza o saldo
  usuario.saldo += valor;

  // Responde com o novo saldo
  res.json({
    message: 'Saldo atualizado com sucesso!',
    saldoAtual: usuario.saldo
  });
});

// Inicia o servidor
server.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});