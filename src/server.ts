import express from "express";
import cors from "cors";
import henriqueRoutes from "./henrique";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/", henriqueRoutes);

app.listen(3000, () => {
  console.log("Servidor CPTM rodando na porta 3000 🚆");
});
