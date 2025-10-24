const quizData = [
  {
    question: "Where are Māui dolphins found?",
    options: [
      "South Island of New Zealand",
      "East coast of New Zealand's North Island",
      "West coast of New Zealand's North Island",
      "Around the Chatham Islands"
    ],
    answer: 2
  },
  {
    question: "How many Māui dolphins are left?",
    options: ["About 100", "About 50", "Less than 60", "Over 200"],
    answer: 2
  },
  {
    question: "What is the biggest threat to Māui dolphins?",
    options: ["Sharks", "Fishing nets", "Tourism", "Pollution"],
    answer: 1
  },
  {
    question: "What makes Māui dolphins unique?",
    options: [
      "They are the largest dolphins",
      "They live only in New Zealand",
      "They are found worldwide",
      "They can fly"
    ],
    answer: 1
  },
  {
    question: "What can people do to help Māui dolphins?",
    options: [
      "Fish responsibly",
      "Support conservation efforts",
      "Spread awareness",
      "All of the above"
    ],
    answer: 3
  }
];

let currentQuestion = 0;
let score = 0;

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const startOverlay = document.getElementById("start-overlay");
const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

// Load question
function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";

  q.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.setAttribute("data-index", index);
    li.addEventListener("click", selectAnswer);
    optionsEl.appendChild(li);
  });

  nextBtn.style.display = "none";
}

// Handle answer selection
function selectAnswer(e) {
  const selected = e.target;
  const selectedIndex = parseInt(selected.getAttribute("data-index"));
  const correctIndex = quizData[currentQuestion].answer;

  // Disable further clicks
  Array.from(optionsEl.children).forEach(li => {
    li.style.pointerEvents = "none";
  });

  if (selectedIndex === correctIndex) {
    selected.classList.add("correct");
    questionEl.textContent = "Correct!";
    score++;
  } else {
    selected.classList.add("wrong");
    questionEl.innerHTML = `<span class="wrong-text">Wrong!</span> The correct answer is: ${quizData[currentQuestion].options[correctIndex]}`;
    optionsEl.children[correctIndex].classList.add("correct");
  }

  nextBtn.style.display = "inline-block";
}

// Next question button
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    // Quiz finished
    questionEl.textContent = `Quiz Complete! You got ${score} out of ${quizData.length} correct.`;
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

// Start button — hide overlay and start quiz
startBtn.addEventListener("click", () => {
  startOverlay.style.display = "none";
  currentQuestion = 0;
  score = 0;
  loadQuestion();
});

// Restart button — reset quiz and show start overlay
restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
  startOverlay.style.display = "flex";
});

// Prepare first question under overlay so quiz is ready when start is clicked
loadQuestion();
