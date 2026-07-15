// Juego de arrastrar y soltar: clasifica especies del bosque en su grupo.
const especies = [
  { nombre: "Guayacán", cat: "arbol" },
  { nombre: "Caoba", cat: "arbol" },
  { nombre: "Cedro", cat: "arbol" },
  { nombre: "Laurel", cat: "arbol" },
  { nombre: "Orquídea silvestre", cat: "epifita" },
  { nombre: "Bromelia", cat: "epifita" },
  { nombre: "Tagua (palmera)", cat: "otra" },
  { nombre: "Helecho arborescente", cat: "otra" },
  { nombre: "Bejuco", cat: "otra" },
];

const pool = document.getElementById("pool");
const scoreEl = document.getElementById("score");
const remainingEl = document.getElementById("remaining");
const winMessage = document.getElementById("winMessage");
const winText = document.getElementById("winText");

let score = 0;
let remaining = 0;
let selected = null; // para modo táctil (tap)

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function render() {
  const deck = shuffle([...especies]);
  pool.innerHTML = deck
    .map(
      (e) =>
        `<div class="chip" draggable="true" data-cat="${e.cat}">${e.nombre}</div>`
    )
    .join("");
  attachChipEvents();
}

function attachChipEvents() {
  pool.querySelectorAll(".chip").forEach((chip) => {
    chip.addEventListener("dragstart", (ev) => {
      chip.classList.add("dragging");
      ev.dataTransfer.setData("text/plain", chip.dataset.cat);
      dragCat = chip.dataset.cat;
      dragChip = chip;
    });
    chip.addEventListener("dragend", () => chip.classList.remove("dragging"));
    // modo táctil: seleccionar con tap
    chip.addEventListener("click", () => {
      if (selected) selected.classList.remove("dragging");
      selected = chip;
      chip.classList.add("dragging");
    });
  });
}

let dragCat = null;
let dragChip = null;

document.querySelectorAll(".bin-drop").forEach((drop) => {
  const bin = drop.closest(".bin");

  drop.addEventListener("dragover", (ev) => {
    ev.preventDefault();
    bin.classList.add("over");
  });
  drop.addEventListener("dragleave", () => bin.classList.remove("over"));
  drop.addEventListener("drop", (ev) => {
    ev.preventDefault();
    bin.classList.remove("over");
    if (dragChip) place(dragChip, bin.dataset.cat, drop);
  });

  // modo táctil: colocar el chip seleccionado
  bin.addEventListener("click", () => {
    if (selected) {
      const chip = selected;
      selected = null;
      place(chip, bin.dataset.cat, drop);
    }
  });
});

function place(chip, binCat, drop) {
  if (chip.classList.contains("correct")) return;
  chip.classList.remove("dragging");

  if (chip.dataset.cat === binCat) {
    chip.classList.add("correct");
    chip.setAttribute("draggable", "false");
    drop.appendChild(chip);
    score++;
    scoreEl.textContent = score;
    remaining--;
    remainingEl.textContent = remaining;
    if (remaining === 0) win();
  } else {
    chip.classList.add("wrong");
    setTimeout(() => chip.classList.remove("wrong"), 400);
  }
}

function win() {
  winText.textContent = `Clasificaste correctamente las ${especies.length} especies del bosque. ¡Bien hecho!`;
  winMessage.classList.add("show");
}

function reset() {
  score = 0;
  remaining = especies.length;
  selected = null;
  scoreEl.textContent = "0";
  remainingEl.textContent = remaining;
  winMessage.classList.remove("show");
  document.querySelectorAll(".bin-drop").forEach((d) => (d.innerHTML = ""));
  render();
}

document.getElementById("restartBtn").addEventListener("click", reset);

remaining = especies.length;
remainingEl.textContent = remaining;
render();
