const questions = [
  {
    q: "¿Qué planta es conocida por su gel para cicatrización y cuidado de la piel?",
    a: ["Manzanilla", "Sábila", "Toronjil", "Hinojo"],
    correct: 1,
  },
  {
    q: "¿Cuál de estas plantas se usa frecuentemente para aliviar resfriados y en inhalaciones?",
    a: ["Boldo", "Sauco", "Eucalipto", "Romero"],
    correct: 2,
  },
  {
    q: "¿Qué planta tiene propiedades sedantes y se toma en infusión para dormir?",
    a: ["Manzanilla", "Menta", "Boldo", "Hinojo"],
    correct: 0,
  },
  {
    q: "¿Cuál se utiliza para favorecer la digestión y alivia gases?",
    a: ["Menta", "Toronjil", "Sábila", "Sauco"],
    correct: 0,
  },
  {
    q: "¿Qué planta es aromática, con olor cítrico, y ayuda a reducir ansiedad leve?",
    a: ["Hierba Luisa", "Boldo", "Menta", "Romero"],
    correct: 0,
  },
  {
    q: "¿Qué planta se utiliza en infusiones para problemas hepáticos y digestivos?",
    a: ["Boldo", "Manzanilla", "Hinojo", "Sauco"],
    correct: 0,
  },
  {
    q: "¿Qué planta aromática se usa como estimulante y mejora la circulación?",
    a: ["Romero", "Toronjil", "Menta", "Sábila"],
    correct: 0,
  },
  {
    q: "¿Cuál de estas plantas se utiliza en jarabes para aliviar gripes?",
    a: ["Manzanilla", "Sauco", "Hinojo", "Menta"],
    correct: 1,
  },
];
let index = 0,
  score = 0;
const qNum = document.getElementById("qnum");
const qBox = document.getElementById("question");
const ansBox = document.getElementById("answers");
const scoreP = document.getElementById("score");
const progressBar = document.getElementById("progressBar");

function updateProgress() {
  if (progressBar) {
    progressBar.style.width = `${((index + 1) / questions.length) * 100}%`;
  }
}

function render() {
  const item = questions[index];
  updateProgress();
  qNum.textContent = `Pregunta ${index + 1} de ${questions.length}`;
  qBox.textContent = item.q;
  ansBox.innerHTML = item.a
    .map((opt, i) => `<div class="answer" data-i="${i}">${opt}</div>`)
    .join("");
  document
    .querySelectorAll(".answer")
    .forEach((el) => el.addEventListener("click", onAnswer));
  scoreP.textContent = `Puntaje: ${score} / ${questions.length}`;
}

function onAnswer(e) {
  const chosen = Number(e.currentTarget.dataset.i);
  const correct = questions[index].correct;
  if (chosen === correct) {
    e.currentTarget.classList.add("correct");
    score++;
  } else {
    e.currentTarget.classList.add("wrong");
    document.querySelectorAll(".answer")[correct].classList.add("correct");
  }
  document
    .querySelectorAll(".answer")
    .forEach((a) => a.removeEventListener("click", onAnswer));
}

document.getElementById("nextBtn").addEventListener("click", () => {
  if (index < questions.length - 1) {
    index++;
    render();
  } else {
    scoreP.textContent = `✓ Terminado — Puntaje final: ${score} / ${questions.length}`;
  }
});
document.getElementById("restartBtn").addEventListener("click", () => {
  index = 0;
  score = 0;
  render();
});
render();
