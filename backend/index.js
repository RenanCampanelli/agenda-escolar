const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;


// Middlewares
app.use(cors());
app.use(express.json());

// "Banco de dados" em memória (por enquanto)
let tarefas = [];
let proximoId = 1;

// Rota raiz (só pra testar)
app.get("/", (req, res) => {
  res.send("API da Agenda Escolar funcionando!");
});

// Listar tarefas
app.get("/tarefas", (req, res) => {
  res.json(tarefas);
});

// Adicionar tarefa
app.post("/tarefas", (req, res) => {
  const { titulo, data, tipo } = req.body;

  if (!titulo || !data || !tipo) {
    return res.status(400).json({ error: "Título, data e tipo são obrigatórios" });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo,
    data,
    tipo,
    status: "pendente",
  };

  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
});

// Marcar como concluída
app.patch("/tarefas/:id/concluir", (req, res) => {
  const id = parseInt(req.params.id);
  const tarefa = tarefas.find((t) => t.id === id);

  if (!tarefa) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tarefa.status = "concluida";
  res.json(tarefa);
});

// Excluir tarefa
app.delete("/tarefas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const indice = tarefas.findIndex((t) => t.id === id);

  if (indice === -1) {
    return res.status(404).json({ error: "Tarefa não encontrada" });
  }

  tarefas.splice(indice, 1);
  res.status(204).send();
});

app.get("/estatisticas", (req, res) => {
  const total = tarefas.length;
  const concluidas = tarefas.filter((t) => t.status === "concluida").length;
  const pendentes = total - concluidas;

  res.json({ total, concluidas, pendentes });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
