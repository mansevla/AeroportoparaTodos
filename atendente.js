import { db, conectarFirebase } from "./firebase-config.js";

import {
  ref,
  onValue,
  update
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const area = document.getElementById("solicitacoes");

async function iniciar() {
  try {
    await conectarFirebase();

    onValue(ref(db, "solicitacoes"), (snapshot) => {
      area.innerHTML = "";

      if (!snapshot.exists()) {
        area.textContent = "Nenhuma solicitação no momento.";
        return;
      }

      snapshot.forEach((item) => {
        const dados = item.val();
        const id = item.key;

        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.padding = "12px";
        card.style.margin = "10px 0";
        card.style.borderRadius = "8px";

        const titulo = document.createElement("h3");
        titulo.textContent = "Solicitação de atendimento";

        const tipo = document.createElement("p");
        tipo.textContent = "Tipo: " + (dados.tipo || "Ajuda");

        const status = document.createElement("p");
        status.textContent = "Status: " + (dados.status || "Pendente");

        card.append(titulo, tipo, status);

        if (dados.status !== "Atendida") {
          const botao = document.createElement("button");
          botao.textContent = "Marcar como atendida";

          botao.onclick = async () => {
            try {
              await update(ref(db, "solicitacoes/" + id), {
                status: "Atendida"
              });

              alert("Solicitação marcada como atendida!");
            } catch (erro) {
              console.error(erro);
              alert("Não foi possível atualizar o pedido.");
            }
          };

          card.appendChild(botao);
        }

        area.appendChild(card);
      });
    });
  } catch (erro) {
    console.error(erro);
    area.textContent = "Não foi possível conectar ao Firebase.";
  }
}

iniciar();
window.abrirVideo = function () {
  window.open(
    "https://meet.jit.si/AssistantTastesActRight",
    "_blank"
  );
};