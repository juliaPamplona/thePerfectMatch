/* =========================================================
   THE PERFECT MATCH — lógica do jogo
   ========================================================= */

const $ = (sel) => document.querySelector(sel);

const POINTS_MATCH = 100;
const POINTS_QUIZ = 150;

const state = {
  first: null,
  lock: false,
  moves: 0,
  pairs: 0,
  score: 0,
  quizRight: 0,
  current: null // casal do quiz aberto
};

/* ---------------- céu estrelado ---------------- */
function makeStars() {
  const box = $(".stars");
  const n = window.innerWidth < 600 ? 28 : 46;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("span");
    const gold = Math.random() < 0.45;
    s.className = "star" + (gold ? "" : " sparkle");
    s.textContent = gold ? "★" : "✦";
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.fontSize = (gold ? 14 + Math.random() * 18 : 8 + Math.random() * 10) + "px";
    s.style.setProperty("--d", 2 + Math.random() * 3 + "s");
    s.style.setProperty("--delay", -Math.random() * 4 + "s");
    box.appendChild(s);
  }
}

/* ---------------- utilidades ---------------- */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  $(id).classList.add("active");
  window.scrollTo(0, 0);
}

function bump(el, value) {
  el.textContent = value;
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function updateHud() {
  bump($("#hud-pairs"), `${state.pairs}/${COUPLES.length}`);
  $("#hud-moves").textContent = state.moves;
  bump($("#hud-score"), state.score);
}

function heartBurst(x, y, count = 10) {
  for (let i = 0; i < count; i++) {
    const h = document.createElement("span");
    h.className = "float-heart";
    h.style.left = x - 11 + "px";
    h.style.top = y - 10 + "px";
    h.style.setProperty("--dx", (Math.random() - 0.5) * 160 + "px");
    h.style.setProperty("--rot", (Math.random() - 0.5) * 60 + "deg");
    h.style.animationDelay = Math.random() * 0.2 + "s";
    h.style.background = Math.random() < 0.35 ? "var(--lav-400)" : "var(--pink-400)";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 1600);
  }
}

let toastTimer;
function toast(text) {
  $("#toast-text").textContent = text;
  $("#toast").classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $("#toast").classList.remove("show"), 2200);
}

/* ---------------- tabuleiro ---------------- */
function buildBoard() {
  const board = $("#board");
  board.innerHTML = "";

  const cards = [];
  COUPLES.forEach((c) => c.people.forEach((p) => cards.push({ couple: c, person: p })));

  // costas: cada desenho aparece o mesmo número de vezes, em ordem aleatória
  let backs = [];
  while (backs.length < cards.length) backs = backs.concat(BACK_IMAGES);
  backs = shuffle(backs.slice(0, cards.length));

  shuffle(cards).forEach(({ couple, person }, i) => {
    const card = document.createElement("button");
    card.className = "card";
    card.dataset.couple = couple.id;
    card.style.setProperty("--i", i);
    card.setAttribute("aria-label", "Carta virada");

    card.innerHTML = `
      <div class="card-inner">
        <div class="face back"><i class="ph"></i></div>
        <div class="face front">
          <span class="name"></span>
        </div>
      </div>`;

    card.querySelector(".back").style.backgroundImage = `url("${encodeURI(backs[i])}")`;

    const front = card.querySelector(".front");
    front.style.backgroundImage = `url("${encodeURI(couple.img)}")`;
    front.style.backgroundSize = person.crop.size;
    front.style.backgroundPosition = person.crop.pos;
    front.querySelector(".name").textContent = person.name;
    card.dataset.name = person.name;

    card.addEventListener("click", () => flip(card));
    board.appendChild(card);
  });
}

function flip(card) {
  if (state.lock || card === state.first) return;
  if (card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.setAttribute("aria-label", card.dataset.name);

  if (!state.first) {
    state.first = card;
    return;
  }

  const a = state.first;
  const b = card;
  state.first = null;
  state.moves++;
  state.lock = true;
  updateHud();

  if (a.dataset.couple === b.dataset.couple) {
    setTimeout(() => onMatch(a, b), 550);
  } else {
    setTimeout(() => {
      a.classList.add("wrong");
      b.classList.add("wrong");
    }, 550);
    setTimeout(() => {
      [a, b].forEach((c) => {
        c.classList.remove("flipped", "wrong");
        c.setAttribute("aria-label", "Carta virada");
      });
      state.lock = false;
    }, 1300);
  }
}

function onMatch(a, b) {
  a.classList.add("matched");
  b.classList.add("matched");
  a.disabled = b.disabled = true;

  state.pairs++;
  state.score += POINTS_MATCH;
  updateHud();

  [a, b].forEach((c) => {
    const r = c.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top + r.height / 2, 8);
  });

  const couple = COUPLES.find((c) => c.id === a.dataset.couple);
  toast(`${couple.people[0].name} + ${couple.people[1].name} = match! +${POINTS_MATCH}`);

  setTimeout(() => openQuiz(couple), 900);
}

/* ---------------- quiz ---------------- */
function openQuiz(couple) {
  state.current = couple;
  const q = couple.questions[Math.floor(Math.random() * couple.questions.length)];

  $("#quiz-img").src = couple.img;
  $("#quiz-img").alt = `${couple.people[0].name} e ${couple.people[1].name}`;
  $("#quiz-couple").textContent = `${couple.people[0].name} ♡ ${couple.people[1].name}`;
  $("#quiz-film").textContent = couple.film;
  $("#quiz-q").textContent = q.q;
  $("#quiz-feedback").textContent = "";
  $("#quiz-ok").hidden = true;

  const box = $("#quiz-options");
  box.innerHTML = "";

  // embaralha as alternativas, mantendo a resposta certa marcada
  const opts = shuffle(q.options.map((text, i) => ({ text, right: i === q.answer })));
  opts.forEach((o, i) => {
    const btn = document.createElement("button");
    btn.className = "opt";
    btn.innerHTML = `<span class="letter">${"ABCD"[i]}</span><span></span>`;
    btn.lastChild.textContent = o.text;
    btn.dataset.right = o.right;
    btn.addEventListener("click", () => answer(btn));
    box.appendChild(btn);
  });

  const ov = $("#quiz");
  ov.classList.add("open");
  ov.setAttribute("aria-hidden", "false");
  setTimeout(() => box.firstChild.focus(), 300);
}

function answer(btn) {
  const all = [...document.querySelectorAll(".opt")];
  all.forEach((b) => (b.disabled = true));

  const right = btn.dataset.right === "true";
  if (right) {
    btn.classList.add("correct");
    state.quizRight++;
    state.score += POINTS_QUIZ;
    updateHud();
    $("#quiz-feedback").textContent = `isso! você conhece esse casal ♡ +${POINTS_QUIZ}`;
    const r = btn.getBoundingClientRect();
    heartBurst(r.left + r.width / 2, r.top, 12);
  } else {
    btn.classList.add("incorrect");
    const correct = all.find((b) => b.dataset.right === "true");
    correct.classList.add("correct");
    $("#quiz-feedback").textContent = "quase! a certa está em verde ♡";
  }
  all.forEach((b) => {
    if (!b.classList.contains("correct") && !b.classList.contains("incorrect")) b.classList.add("dim");
  });

  const ok = $("#quiz-ok");
  ok.hidden = false;
  ok.focus();
}

function closeQuiz() {
  const ov = $("#quiz");
  ov.classList.remove("open");
  ov.setAttribute("aria-hidden", "true");
  state.lock = false;

  if (state.pairs === COUPLES.length) {
    setTimeout(endGame, 450);
  }
}

/* ---------------- fim ---------------- */
function endGame() {
  const total = COUPLES.length;
  const r = state.quizRight;

  let title, sub;
  if (r === total) {
    title = "Perfect Match!";
    sub = "você é a cupido oficial dos filmes! acertou todos os casais e todos os quizzes ♡";
  } else if (r >= total / 2) {
    title = "Quase cupido!";
    sub = "você juntou todos os casais! só faltaram alguns detalhes dos filmes ♡";
  } else {
    title = "Hora da maratona!";
    sub = "todos os casais estão juntos, mas que tal rever esses filmes? ♡";
  }

  $("#end-title").textContent = title;
  $("#end-sub").textContent = sub;
  $("#end-score").textContent = state.score;
  $("#end-quiz").textContent = `${r}/${total}`;
  $("#end-moves").textContent = state.moves;

  const hearts = $("#end-hearts");
  hearts.innerHTML = "";
  for (let i = 0; i < total; i++) {
    const h = document.createElement("i");
    h.className = "ph" + (i < r ? "" : " off");
    hearts.appendChild(h);
  }

  showScreen("#screen-end");
  setTimeout(() => {
    const t = document.querySelector("#screen-end .trophy").getBoundingClientRect();
    heartBurst(t.left + t.width / 2, t.top + t.height / 2, 18);
  }, 300);
}

/* ---------------- início ---------------- */
function startGame() {
  Object.assign(state, { first: null, lock: false, moves: 0, pairs: 0, score: 0, quizRight: 0, current: null });
  buildBoard();
  $("#hud-pairs").textContent = `0/${COUPLES.length}`;
  $("#hud-moves").textContent = "0";
  $("#hud-score").textContent = "0";
  showScreen("#screen-game");
}

// pré-carrega as fotos para as cartas virarem sem atraso
COUPLES.map((c) => c.img).concat(BACK_IMAGES).forEach((src) => { const im = new Image(); im.src = src; });

makeStars();
$("#btn-start").addEventListener("click", startGame);
$("#btn-again").addEventListener("click", startGame);
$("#quiz-ok").addEventListener("click", closeQuiz);
