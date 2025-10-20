import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

interface Estacao {
  id: string;
  nome: string;
  lat: number;
  lng: number;
  vizinhos: string[];
}

// Carrega o arquivo JSON
const estacoes: Estacao[] = JSON.parse(fs.readFileSync("./estacoes.json", "utf-8"));

// Função BFS para achar caminho mais curto entre origem e destino
function buscarCaminho(origemId: string, destinoId: string): Estacao[] | null {
  const fila: string[][] = [[origemId]];
  const visitados = new Set<string>();

  while (fila.length > 0) {
    const caminho = fila.shift()!;
    const atual = caminho[caminho.length - 1];

    if (atual === destinoId) {
      return caminho.map(id => estacoes.find(e => e.id === id)!);
    }

    if (!visitados.has(atual)) {
      visitados.add(atual);
      const estacaoAtual = estacoes.find(e => e.id === atual);
      if (estacaoAtual) {
        for (const viz of estacaoAtual.vizinhos) {
          if (!visitados.has(viz)) {
            fila.push([...caminho, viz]);
          }
        }
      }
    }
  }
  return null;
}

// Rota principal
app.get("/rota", (req: Request, res: Response) => {
  const origem = (req.query.orig as string)?.toLowerCase();
  const destino = (req.query.dest as string)?.toLowerCase();

  if (!origem || !destino) {
    return res.status(400).json({ erro: "Parâmetros orig e dest são obrigatórios" });
  }

  const caminho = buscarCaminho(origem, destino);
  if (!caminho) {
    return res.status(404).json({ erro: "Nenhum trajeto encontrado" });
  }

  res.json({
    origem,
    destino,
    total_estacoes: caminho.length,
    trajeto: caminho
  });
});

app.listen(5001, () => {
  console.log("Servidor rodando na porta 5001");
});