//const express = require('express');
import express, {Request, Response}  from 'express';

const server = express();

const WHATSAPP_NUMBER = "11) 99767-7030";

server.get("/fale-conosco", (req: Request, res: Response) => {
    const mensagem = encodeURIComponent("Olá! Gostaria de saber mais sobre os serviços.");
    const url = `https://wa.me/${0800 055 0121}?text=${mensagem}`;
    res.redirect(url);
});

server.listen(5001)