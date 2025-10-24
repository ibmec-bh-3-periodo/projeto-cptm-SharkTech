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
import path from "path";

const estacoesPath = path.join(__dirname, "estacoes.json");
const estacoes: Estacao[] = JSON.parse(fs.readFileSync(estacoesPath, "utf-8"));

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
// Função auxiliar para normalizar textos (remove acentos e deixa tudo minúsculo)
function normalizarTexto(texto: string): string {
    return texto
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  }
  
  // Rota principal
  app.get("/rota", (req: Request, res: Response) => {
    const origemNome = req.query.orig as string;
    const destinoNome = req.query.dest as string;
  
    if (!origemNome || !destinoNome) {
      return res.status(400).json({ erro: "Parâmetros orig e dest são obrigatórios" });
    }
  
    // Normaliza nomes (para aceitar "Brás", "bras", "BRÁS" etc.)
    const origemNormalizada = normalizarTexto(origemNome);
    const destinoNormalizada = normalizarTexto(destinoNome);
  
    // Encontra as estações correspondentes pelo nome
    const origemEstacao = estacoes.find(
      e => normalizarTexto(e.nome) === origemNormalizada || e.id === origemNormalizada
    );
    const destinoEstacao = estacoes.find(
      e => normalizarTexto(e.nome) === destinoNormalizada || e.id === destinoNormalizada
    );
  
    if (!origemEstacao || !destinoEstacao) {
      return res.status(404).json({ erro: "Estação de origem ou destino não encontrada" });
    }
  
    // Busca o caminho entre as estações
    const caminho = buscarCaminho(origemEstacao.id, destinoEstacao.id);
    if (!caminho) {
      return res.status(404).json({ erro: "Nenhum trajeto encontrado" });
    }
  
    // Retorna o trajeto
    res.json({
      origem: origemEstacao.nome,
      destino: destinoEstacao.nome,
      total_estacoes: caminho.length,
      trajeto: caminho
    });
  });

app.listen(5001, () => {
  console.log("Servidor rodando na porta 5001");
});

app.get('/', (req, res) => {
  res.send('Servidor está funcionando!');
});