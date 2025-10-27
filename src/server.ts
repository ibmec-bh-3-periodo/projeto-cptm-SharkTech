import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const server = express();
server.use(express.json());

// Caminho absoluto para o arquivo usuarios.json
const usuariosFilePath = path.join(__dirname, 'usuarios.json');

// Função auxiliar para ler os usuários do arquivo
function carregarUsuarios() {
  try {
    const data = fs.readFileSync(usuariosFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erro ao ler usuarios.json:', error);
    return [];
  }
}

// Função auxiliar para salvar os usuários de volta no arquivo
function salvarUsuarios(usuarios: any) {
  try {
    fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, 2));
  } catch (error) {
    console.error('Erro ao salvar usuarios.json:', error);
  }
}

/**
 * ROTA POST /login
 * Autentica o usuário com base no arquivo usuarios.json
 */
server.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Informe username e password.' });
  }

  const usuarios = carregarUsuarios();

  // Procura usuário com o username e senha informados
  const usuarioEncontrado = usuarios.find(
    (u: any) => u.username === username && u.password === password
  );

  if (usuarioEncontrado) {
    return res.status(200).json({
      message: 'Login realizado com sucesso!',
      usuario: {
        id: usuarioEncontrado.id,
        username: usuarioEncontrado.username,
        email: usuarioEncontrado.email,
        saldo: usuarioEncontrado.saldo,
      },
    });
  } else {
    return res.status(401).json({ message: 'Usuário ou senha incorretos.' });
  }
});

/**
 * ROTA PUT /tela-saldo
 * - Recebe o userId e o valor da passagem
 * - Subtrai do saldo atual
 * - Atualiza o arquivo usuarios.json
 * - Retorna o novo saldo
 */

// pra isso tudo funcionar, talvez tenhamos que adicionar um valor pra cada passagem, mas nao tenho certeza
server.put('/tela-saldo', (req: Request, res: Response) => {
  const { userId, valorPassagem } = req.body;

  if (!userId || !valorPassagem) {
    return res.status(400).json({ message: 'Informe userId e valorPassagem.' });
  }

  const usuarios = carregarUsuarios();
  const usuario = usuarios.find((u: any) => u.id === userId);

  if (!usuario) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  if (usuario.saldo < valorPassagem) {
    return res.status(400).json({ message: 'Saldo insuficiente para gerar bilhete.' });
  }

  // Subtrai o valor da passagem
  usuario.saldo -= valorPassagem;

  // Adiciona uma entrada no histórico
  usuario.historico.push({
    data: new Date().toISOString(),
    descricao: 'Compra de bilhete',
    valor: -valorPassagem,
  });

  // Salva de volta no arquivo
  salvarUsuarios(usuarios);

  return res.status(200).json({
    message: 'Bilhete gerado com sucesso!',
    novoSaldo: usuario.saldo,
  });
});

server.listen(3000, () => {
  console.log('🚀 Servidor rodando na porta 3000');
});
