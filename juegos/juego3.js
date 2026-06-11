const questions = [
  {
    q: "¿Cuál es un árbol de madera dura conocido por sus flores amarillas vistosas?",
    a: ["Cedro", "Guayacán", "Caoba", "Laurel"],
    correct: 1,
  },
  {
    q: "¿Qué árbol es importante fijador de nitrógeno en el bosque?",
    a: ["Laurel", "Caoba", "Cedro", "Guayacán"],
    correct: 0,
  },
  {
    q: "¿Cuál es el árbol más majestuoso que domina el dosel de bosques primarios?",
    a: ["Cedro", "Caoba", "Guayacán", "Laurel"],
    correct: 1,
  },
  {
    q: "¿Qué palmera produce semillas duras parecidas al marfil?",
    a: ["Tagua", "Bromelía", "Helecho arborescente", "Orquídea"],
    correct: 0,
  },
  {
    q: "¿Cuál es un indicador de humedad típico de bosques nublados?",
    a: ["Helecho arborescente", "Tagua", "Bejuco", "Cedro"],
    correct: 0,
  },
  {
    q: "¿Qué epífita recolecta agua de lluvia en sus hojas modificadas?",
    a: ["Orquídea silvestre", "Bromelía", "Bejuco", "Árbol de lluvia"],
    correct: 1,
  },
  {
    q: "¿Cuál árbol captura humedad y regula el microclima del bosque?",
    a: ["Caoba", "Árbol de lluvia", "Cedro", "Tagua"],
    correct: 1,
  },
  {
    q: "¿Qué enredadera leñosa conecta estratos del bosque y alimenta a monos?",
    a: ["Orquídea", "Helecho", "Bejuco", "Bromelía"],
    correct: 2,
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
