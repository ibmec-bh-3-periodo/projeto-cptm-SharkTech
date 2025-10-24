import express from "express";

const app = express();
app.use(express.json());

interface Login {
    id: number;
    nome: string;
    email: string;
    senha: string;
}

let usuarios: Login[] = [];

app.get("/proximoId", (req, res) => {
    // se o array estiver vazio, começa do 1
    if (usuarios.length === 0) {
      return res.json({ proximoId: 1 });
    }
  
    // pega o último elemento do array
    const ultimoUsuario = usuarios[usuarios.length - 1];
    const proximoId = ultimoUsuario.id + 1;
  
    return res.json({ proximoId });
  });

app.post("/usuarios", (req, res) => {
  const {nome, email, senha = [] } = req.body;

  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: "nome, email e senha são obrigatórios." });
  }
  const emailOk = typeof email === "string" && email.includes("@") && email.includes(".");
  if (!emailOk) {
    return res.status(400).json({ erro: "email inválido." });
  }
  if (String(senha).length < 6) {
    return res.status(400).json({ erro: "senha deve ter pelo menos 6 caracteres." });
  }

  const jaExiste = usuarios.some(u => u.email.toLowerCase() === email.toLowerCase());
  if (jaExiste) {
    return res.status(409).json({ erro: "email já cadastrado." });
  }

  const ultimoUsuario = usuarios[usuarios.length - 1];
  const proximoId = ultimoUsuario ? ultimoUsuario.id + 1 : 1;

  const novoUsuario = { id: proximoId, nome, email, senha };
  usuarios.push(novoUsuario);

  const { senha: _omit, ...usuarioSemSenha } = novoUsuario;
  return res.status(201).json(usuarioSemSenha);
});

  usuarios.push(novoUsuario);

  const { senha: _omit, ...usuarioSemSenha } = novoUsuario;

  return res.status(201).json(usuarioSemSenha);
});

app.listen(3000);
