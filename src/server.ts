//const express = require('express');
import express, {Request, Response}  from 'express';

const server = express();
server.use(express.json());

interface Login {
  id: number;
  nome: string;
  email: string;
  senha: string;
}

let usuarios: Login[] = [];

server.get("/proximoId", (req, res) => {
  if (usuarios.length === 0) {
    return res.json({ proximoId: 1 });
  }

  const ultimoUsuario = usuarios[usuarios.length - 1];
  const proximoId = ultimoUsuario.id + 1;

  return res.json({ proximoId });
});

server.post("/usuarios", (req, res) => {
  const { nome, email, senha } = req.body;

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

server.listen(3000);

server.listen(3000)