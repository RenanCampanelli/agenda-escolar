tarefas.forEach((tarefa) => {
  const li = document.createElement("li");
  li.classList.add("tarefa");
  if (tarefa.status === "concluida") {
    li.classList.add("concluida");
  }

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("tarefa-info");

  const tituloSpan = document.createElement("span");
  tituloSpan.classList.add("tarefa-titulo");
  tituloSpan.textContent = tarefa.titulo;

  const metaSpan = document.createElement("span");
  metaSpan.classList.add("tarefa-meta");
  metaSpan.textContent = `${tarefa.data} • ${tarefa.tipo}`;

  const statusSpan = document.createElement("span");
  statusSpan.classList.add(
    "badge-status",
    tarefa.status === "concluida" ? "badge-concluida" : "badge-pendente"
  );
  statusSpan.textContent =
    tarefa.status === "concluida" ? "Concluída" : "Pendente";

  metaSpan.appendChild(statusSpan);

  infoDiv.appendChild(tituloSpan);
  infoDiv.appendChild(metaSpan);

  const acoesDiv = document.createElement("div");
  acoesDiv.classList.add("tarefa-acoes");

  const btnConcluir = document.createElement("button");
  btnConcluir.textContent = "Concluir";
  btnConcluir.disabled = tarefa.status === "concluida";
  btnConcluir.addEventListener("click", () => concluirTarefa(tarefa.id));

  const btnExcluir = document.createElement("button");
  btnExcluir.textContent = "Excluir";
  btnExcluir.addEventListener("click", () => excluirTarefa(tarefa.id));

  acoesDiv.appendChild(btnConcluir);
  acoesDiv.appendChild(btnExcluir);

  li.appendChild(infoDiv);
  li.appendChild(acoesDiv);

  listaTarefas.appendChild(li);
});
