import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

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

const estacoesPath = path.join(__dirname, "estacoes.json");
const estacoes: Estacao[] = JSON.parse(fs.readFileSync(estacoesPath, "utf-8"));

//Servir o frontend (index.html, CSS, JS)
app.use(express.static(path.join(__dirname, "."))); // raiz do projeto

// ---------------- ROTAS EXISTENTES ----------------
function normalizarTexto(texto: string): string {
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function buscarCaminho(origemId: string, destinoId: string): Estacao[] | null {
  const fila: string[][] = [[origemId]];
  const visitados = new Set<string>();

  while (fila.length > 0) {
    const caminho = fila.shift()!;
    const atual = caminho[caminho.length - 1];
    if (atual === destinoId) return caminho.map(id => estacoes.find(e => e.id === id)!);

    if (!visitados.has(atual)) {
      visitados.add(atual);
      const estacaoAtual = estacoes.find(e => e.id === atual);
      if (estacaoAtual) {
        for (const viz of estacaoAtual.vizinhos)
          if (!visitados.has(viz)) fila.push([...caminho, viz]);
      }
    }
  }
  return null;
}

app.get("/rota", (req: Request, res: Response) => {
  const origemNome = req.query.orig as string;
  const destinoNome = req.query.dest as string;

  if (!origemNome || !destinoNome)
    return res.status(400).json({ erro: "Parâmetros orig e dest são obrigatórios" });

  const origemEstacao = estacoes.find(
    e => normalizarTexto(e.nome) === normalizarTexto(origemNome) || e.id === origemNome
  );
  const destinoEstacao = estacoes.find(
    e => normalizarTexto(e.nome) === normalizarTexto(destinoNome) || e.id === destinoNome
  );

  if (!origemEstacao || !destinoEstacao)
    return res.status(404).json({ erro: "Estação de origem ou destino não encontrada" });

  const caminho = buscarCaminho(origemEstacao.id, destinoEstacao.id);
  if (!caminho) return res.status(404).json({ erro: "Nenhum trajeto encontrado" });

  res.json({
    origem: origemEstacao.nome,
    destino: destinoEstacao.nome,
    total_estacoes: caminho.length,
    trajeto: caminho
  });
});

//Garante que o index.html seja entregue no acesso raiz
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, ".." , "mapa.html"));
});

app.listen(5001, () => console.log("Servidor rodando na porta 5001"));