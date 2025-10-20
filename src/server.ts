//const express = require('express');
import express, {Request, Response}  from 'express';

const server = express();

// rota post da tela de login
server.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.status(200).send('Login realizado com sucesso');
    } else {
        res.status(401).send('Usuario ou senha incorretos');
    }
});


// na tela de saldo, rota put para gerar bilhete para usuario


server.put('/tela-saldo', (req: Request, res: Response) => {
    const { userId, amount } = req.body;
    // Lógica para gerar bilhete (simulada aqui)
    const ticket = `Bilhete gerado para o usuário ${userId} com o valor de ${amount}`;
    res.status(200).send(ticket);
});

server.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});