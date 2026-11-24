import {
  configured,
  configMessage,
  moderatorLogin,
  moderatorLogout,
  observeModeratorAuth,
  subscribeQuestions,
  saveAnswer
} from "./qa-api.js";

const EVENT_ID = "esteli-redes-sociales-2027";
const $ = selector => document.querySelector(selector);
const bell = $("#qaBell");
const badge = $("#qaBadge");
const overlay = $("#qaOverlay");
const loginBox = $("#qaLoginBox");
const loginForm = $("#qaLogin");
const inbox = $("#qaInbox");
const list = $("#qaQuestionList");
const connection = $("#qaConnection");
const status = $("#qaStatus");
const soundToggle = $("#qaSoundToggle");

let moderator = null;
let stopQuestions = null;
let questions = [];
let ready = false;
let audioContext = null;
let soundEnabled = true;
let toastTimer = null;
let ringTimer = null;

function setMessage(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
  status.classList.toggle("success", Boolean(message) && !isError);
}

async function unlockAudio() {
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    audioContext ||= new Audio();
    if (audioContext.state !== "running") await audioContext.resume();
  } catch {
    // El navegador puede mantener silenciada la pestaña hasta otra interacción.
  }
}

function playBell() {
  if (!soundEnabled || !audioContext || audioContext.state !== "running") return;
  const start = audioContext.currentTime;
  [880, 660].forEach((frequency, index) => {
    const offset = index * 0.16;
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, start + offset);
    gain.gain.setValueAtTime(0.001, start + offset);
    gain.gain.exponentialRampToValueAtTime(0.12, start + offset + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, start + offset + 0.19);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start(start + offset);
    oscillator.stop(start + offset + 0.2);
  });
  if (navigator.vibrate) navigator.vibrate([70, 45, 90]);
}

function showToast(count) {
  const toast = $("#toast");
  toast.textContent = count === 1 ? "Llegó una pregunta nueva" : `Llegaron ${count} preguntas nuevas`;
  toast.style.display = "block";
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.style.display = "none"; }, 3600);
  bell.classList.add("ring");
  clearTimeout(ringTimer);
  ringTimer = setTimeout(() => bell.classList.remove("ring"), 1400);
  playBell();
}

function pendingCount() {
  return questions.filter(question => question.status === "pendiente").length;
}

function updateCount() {
  const count = pendingCount();
  badge.textContent = count > 99 ? "99+" : String(count);
  badge.classList.toggle("is-empty", count === 0);
  bell.setAttribute("aria-label", `Abrir preguntas recibidas; ${count} pendientes`);
  $("#qaPendingCount").textContent = String(count);
}

function openPanel() {
  void unlockAudio();
  overlay.classList.add("active");
  overlay.setAttribute("aria-hidden", "false");
  if (!moderator && configured) setTimeout(() => $("#qaEmail").focus(), 30);
}

function closePanel() {
  overlay.classList.remove("active");
  overlay.setAttribute("aria-hidden", "true");
  bell.focus();
}

function renderQuestions() {
  list.replaceChildren();
  const pending = questions.filter(question => question.status === "pendiente");
  if (!pending.length) {
    const empty = document.createElement("div");
    empty.className = "qaEmpty";
    empty.textContent = questions.length
      ? "La bandeja está al día."
      : "Aún no llegan preguntas. La bandeja se actualizará automáticamente.";
    list.append(empty);
    return;
  }

  for (const question of pending) {
    const card = document.createElement("article");
    card.className = "qaQuestionCard";

    const head = document.createElement("div");
    head.className = "qaQuestionTop";
    const name = document.createElement("strong");
    name.className = "qaQuestionName";
    name.textContent = question.name || "Participante";
    const time = document.createElement("time");
    const created = question.createdAt?.toDate?.();
    time.textContent = created
      ? created.toLocaleTimeString("es-NI", { hour: "2-digit", minute: "2-digit" })
      : "Recibida";
    head.append(name, time);

    const body = document.createElement("p");
    body.className = "qaQuestionText";
    body.textContent = question.question || "";

    const actions = document.createElement("div");
    actions.className = "qaQuestionActions";
    const done = document.createElement("button");
    done.type = "button";
    done.className = "qaMark";
    done.textContent = "✓ Marcar respondida";
    done.addEventListener("click", async () => {
      done.disabled = true;
      try {
        await saveAnswer(question.id, "", moderator.uid);
        setMessage("Marcada como respondida.");
      } catch (error) {
        setMessage("No se pudo actualizar. Revisá la sesión y la conexión.", true);
        done.disabled = false;
        console.error(error);
      }
    });
    actions.append(done);
    card.append(head, body, actions);
    list.append(card);
  }
}

function startListening() {
  if (!moderator) return;
  stopQuestions?.();
  stopQuestions = null;
  ready = false;
  connection.textContent = "Conectando con las preguntas del taller…";
  stopQuestions = subscribeQuestions(snapshot => {
    const before = pendingCount();
    questions = snapshot.docs.map(item => ({ id: item.id, ...item.data() }));
    const after = pendingCount();
    updateCount();
    renderQuestions();
    connection.textContent = "Conectado · actualización en tiempo real";
    $("#qaArrivalStatus").textContent = after
      ? "Las más recientes aparecen primero."
      : "En espera de preguntas nuevas.";
    if (ready && after > before) showToast(after - before);
    ready = true;
  }, error => {
    connection.textContent = "No se pudo conectar con la bandeja.";
    setMessage(error.code === "permission-denied"
      ? "La cuenta inició sesión, pero no tiene permiso para consultar las preguntas."
      : "No fue posible recibir actualizaciones. Revisá la conexión.", true);
    console.error(error);
  }, EVENT_ID);
}

bell.addEventListener("click", openPanel);
$("#qaClose").addEventListener("click", closePanel);
overlay.addEventListener("click", event => {
  if (event.target === overlay) closePanel();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && overlay.classList.contains("active")) closePanel();
});

soundToggle.addEventListener("click", async () => {
  soundEnabled = !soundEnabled;
  soundToggle.textContent = soundEnabled ? "🔔 Sonido activado" : "🔕 Sonido silenciado";
  soundToggle.setAttribute("aria-pressed", String(soundEnabled));
  if (soundEnabled) {
    await unlockAudio();
    playBell();
  }
});

$("#qaLogout").addEventListener("click", async () => {
  stopQuestions?.();
  stopQuestions = null;
  moderator = null;
  questions = [];
  ready = false;
  updateCount();
  try { await moderatorLogout(); } catch (error) { console.error(error); }
});

loginForm.addEventListener("submit", async event => {
  event.preventDefault();
  if (!configured) return;
  const button = loginForm.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = "Verificando…";
  $("#qaLoginStatus").textContent = "";
  await unlockAudio();
  try {
    await moderatorLogin($("#qaEmail").value.trim(), $("#qaPassword").value);
    $("#qaPassword").value = "";
  } catch (error) {
    $("#qaLoginStatus").textContent = "No se pudo iniciar sesión. Usá la cuenta autorizada para la bandeja.";
    console.error(error);
  } finally {
    button.disabled = false;
    button.textContent = "Entrar y recibir preguntas";
  }
});

soundToggle.textContent = "🔔 Sonido activado";
soundToggle.setAttribute("aria-pressed", "true");
if (!configured) {
  $("#qaLoginStatus").textContent = configMessage;
  loginForm.querySelector("button[type='submit']").disabled = true;
} else {
  observeModeratorAuth(user => {
    moderator = user;
    if (user) {
      bell.classList.add("is-ready");
      loginBox.classList.add("hidden");
      inbox.classList.remove("hidden");
      $("#qaLogout").classList.remove("hidden");
      setMessage("");
      startListening();
    } else {
      stopQuestions?.();
      stopQuestions = null;
      questions = [];
      ready = false;
      updateCount();
      bell.classList.remove("is-ready");
      inbox.classList.add("hidden");
      loginBox.classList.remove("hidden");
      $("#qaLogout").classList.add("hidden");
      connection.textContent = "Iniciá sesión para recibir las preguntas privadas.";
    }
  }, error => {
    setMessage("No se pudo comprobar la sesión del moderador.", true);
    console.error(error);
  }).catch(error => {
    setMessage("Firebase Authentication no está disponible. Revisá la conexión.", true);
    console.error(error);
  });
}

