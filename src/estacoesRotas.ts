import { Router, Request, Response } from 'express';
import { Estacao, RotaRequest } from './types';
import * as fs from 'fs';
import * as path from 'path';

const router = Router();

const estacoesPath = path.join(__dirname, 'data', 'estacoes.json');
const estacoes: Estacao[] = JSON.parse(fs.readFileSync(estacoesPath, 'utf8'));

// Rota para listar todas as estações
router.get('/estacoes', (req: Request, res: Response) => {
  res.json(estacoes);
});

// Rota para criar uma rota entre origem e destino
router.post('/rota', (req: Request, res: Response) => {
  const { origemId, destinoId }: RotaRequest = req.body;

  const origem = estacoes.find(e => e.id === origemId);
  const destino = estacoes.find(e => e.id === destinoId);

  if (!origem || !destino) {
    return res.status(400).json({ error: 'Estação de origem ou destino inválida' });
  }

  // Por enquanto, apenas linha direta entre as duas estações
  res.json({ origem, destino, trajeto: [origem, destino] });
});

export default router;