// Juego de memoria: emparejar cada vegetal (emoji) con su nombre.
const vegetales = [
  { emoji: "🥕", nombre: "Zanahoria" },
  { emoji: "🌽", nombre: "Maíz" },
  { emoji: "🥒", nombre: "Pepino" },
  { emoji: "🥑", nombre: "Aguacate" },
  { emoji: "🍅", nombre: "Tomate" },
  { emoji: "🥔", nombre: "Papa" },
];

const board = document.getElementById("board");
const movesEl = document.getElementById("moves");
const pairsEl = document.getElementById("pairs");
const timerEl = document.getElementById("timer");
const winMessage = document.getElementById("winMessage");
const winText = document.getElementById("winText");

let cards = [];
let flipped = [];
let moves = 0;
let matched = 0;
let lock = false;
let timer = null;
let seconds = 0;
let started = false;

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildDeck() {
  const deck = [];
  vegetales.forEach((v, i) => {
    deck.push({ pairId: i, type: "emoji", content: v.emoji });
    deck.push({ pairId: i, type: "text", content: v.nombre });
  });
  return shuffle(deck);
}

function startTimer() {
  if (started) return;
  started = true;
  timer = setInterval(() => {
    seconds++;
    timerEl.textContent = `${seconds}s`;
  }, 1000);
}

function render() {
  cards = buildDeck();
  board.innerHTML = cards
    .map(
      (c, i) => `
      <div class="card" data-index="${i}" data-pair="${c.pairId}">
        <div class="card-face card-front">?</div>
        <div class="card-face card-back${c.type === "text" ? " text" : ""}">${c.content}</div>
      </div>`
    )
    .join("");
  board.querySelectorAll(".card").forEach((el) =>
    el.addEventListener("click", onFlip)
  );
}

function onFlip(e) {
  if (lock) return;
  const card = e.currentTarget;
  if (card.classList.contains("flipped") || card.classList.contains("matched"))
    return;

  startTimer();
  card.classList.add("flipped");
  flipped.push(card);

  if (flipped.length === 2) {
    moves++;
    movesEl.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  lock = true;
  const [a, b] = flipped;
  const isMatch = a.dataset.pair === b.dataset.pair;

  if (isMatch) {
    setTimeout(() => {
      a.classList.add("matched");
      b.classList.add("matched");
      flipped = [];
      lock = false;
      matched++;
      pairsEl.textContent = `${matched} / ${vegetales.length}`;
      if (matched === vegetales.length) win();
    }, 400);
  } else {
    a.classList.add("wrong");
    b.classList.add("wrong");
    setTimeout(() => {
      a.classList.remove("flipped", "wrong");
      b.classList.remove("flipped", "wrong");
      flipped = [];
      lock = false;
    }, 800);
  }
}

function win() {
  clearInterval(timer);
  winText.textContent = `Completaste las ${vegetales.length} parejas en ${moves} movimientos y ${seconds} segundos.`;
  winMessage.classList.add("show");
}

function reset() {
  clearInterval(timer);
  moves = 0;
  matched = 0;
  seconds = 0;
  started = false;
  flipped = [];
  lock = false;
  movesEl.textContent = "0";
  pairsEl.textContent = `0 / ${vegetales.length}`;
  timerEl.textContent = "0s";
  winMessage.classList.remove("show");
  render();
}

document.getElementById("restartBtn").addEventListener("click", reset);

pairsEl.textContent = `0 / ${vegetales.length}`;
render();
