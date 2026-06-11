const questions = [
  {
    q: "¿Qué vegetal es una buena fuente de vitamina A y favorece la salud visual?",
    a: ["Lechuga", "Zanahoria", "Pepino", "Aguacate"],
    correct: 1,
  },
  {
    q: "¿Cuál de estos es un alimento básico rico en carbohidratos?",
    a: ["Maíz", "Espinaca", "Tomate", "Cebolla"],
    correct: 0,
  },
  {
    q: "¿Qué vegetal es alto en agua y suele consumirse para hidratar?",
    a: ["Pepino", "Pimiento", "Papa", "Aguacate"],
    correct: 0,
  },
  {
    q: "¿Cuál es rico en grasas saludables?",
    a: ["Tomate", "Aguacate", "Zanahoria", "Maíz"],
    correct: 1,
  },
  {
    q: "¿Qué vegetal es conocido por su contenido en hierro y vitaminas A y C?",
    a: ["Espinaca", "Lechuga", "Pepino", "Papa"],
    correct: 0,
  },
  {
    q: "¿Cuál se usa frecuentemente para dar sabor y tiene compuestos sulfurados?",
    a: ["Cebolla", "Zanahoria", "Pepino", "Espinaca"],
    correct: 0,
  },
  {
    q: "¿Cuál es una excelente fuente de vitamina C entre estos?",
    a: ["Pimiento", "Papa", "Maíz", "Lechuga"],
    correct: 0,
  },
  {
    q: "¿Cuál de estos se consume en muchas formas: hervida, frita o en puré?",
    a: ["Papa", "Tomate", "Pepino", "Espinaca"],
    correct: 0,
  },
];
let index = 0,
  score = 0;
const qNum = document.getElementById("qnum");
const qBox = document.getElementById("question");
const ansBox = document.getElementById("answers");
const scoreP = document.getElementById("score");

function render() {
  const item = questions[index];
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
