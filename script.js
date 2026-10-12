import { db, conectarFirebase } from "./firebase-config.js";
import {
  ref,
  push,
  set
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

async function enviarSolicitacao(tipo) {
  try {
    await conectarFirebase();

    const novaSolicitacao = push(ref(db, "solicitacoes"));
    const idSolicitacao = novaSolicitacao.key;
    const salaVideo = "AeroportoTodos-" + idSolicitacao;

    await set(novaSolicitacao, {
      tipo: tipo,
      status: "Pendente",
      criadaEm: Date.now(),
      salaVideo: salaVideo
    });

    alert("Solicitação enviada! Aguarde o atendimento.");

    return salaVideo;
  } catch (erro) {
    console.error("Erro:", erro);
    alert("Não foi possível enviar. Confira a conexão com o Firebase.");
    return null;
  }
}

async function atendimento() {
  const janela = window.open("about:blank", "_blank");

  const salaVideo = await enviarSolicitacao("Intérprete de Libras");

  if (!salaVideo) {
    if (janela) janela.close();
    return;
  }

  if (janela) {
    janela.location.href = "https://meet.jit.si/" + salaVideo;
  } else {
    alert("O navegador bloqueou a nova aba. Permita pop-ups para este site.");
  }
}


function voo() {
  alert("Informações de voo: funcionalidade demonstrativa.");
}

function ajuda() {
  enviarSolicitacao("Preciso de ajuda");
}

window.atendimento = atendimento;
window.voo = voo;
window.ajuda = ajuda;
window.abrirAtendimento = atendimento;
window.mostrarVoo = voo;
window.abrirAjuda = ajuda;
