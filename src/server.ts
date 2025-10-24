//const express = require('express');
import express, {Request, Response}  from 'express';

const server = express();

const WHATSAPP_NUMBER = "5511997677030";

server.get("/fale-conosco", (req: Request, res: Response) => {
    const mensagem = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços.");
    const url = `https://wa.me/${5511997677030}?text=${mensagem}`;
    res.redirect(url);
});

server.listen(5001, () => {
    console.log("Servidor rodando em http://localhost:5001");
  });