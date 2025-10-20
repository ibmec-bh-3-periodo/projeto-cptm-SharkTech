import express from 'express';
import estacoesRotas from './estacoesRotas';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.json());

// Rotas da API do mapa
app.use('/mapa', estacoesRotas);

// Servir o mapa.html da raiz do projeto
app.use(express.static(path.join(__dirname, '..')));

app.listen(PORT, () => {
  console.log(`🗺️ Servidor do mapa rodando em http://localhost:${PORT}`);
});