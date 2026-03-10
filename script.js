let currentQuestion = 0;
let score = 0;
let timeLeft = GAME_CONFIG.timePerQuestion;
let timer;
let selectedQuestions = [];

const app = document.getElementById("app");

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

function startGame() {
  currentQuestion = 0;
  score = 0;
  selectedQuestions = shuffleArray(QUESTIONS).slice(0, GAME_CONFIG.questionsPerGame);
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = GAME_CONFIG.timePerQuestion;

  const q = selectedQuestions[currentQuestion];

  app.innerHTML = `
    <div class="top-info">
      <p>السؤال ${currentQuestion + 1} من ${GAME_CONFIG.questionsPerGame}</p>
      <p>النقاط: ${score}</p>
      <p>الوقت: <span id="timer">${timeLeft}</span></p>
    </div>

    <div class="question-box">
      <h2>${q.q}</h2>
    </div>

    <div class="answers">
      <button onclick="checkAnswer('a')">${q.a}</button>
      <button onclick="checkAnswer('b')">${q.b}</button>
      <button onclick="checkAnswer('c')">${q.c}</button>
      <button onclick="checkAnswer('d')">${q.d}</button>
    </div>
  `;

  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(answer) {
  clearInterval(timer);

  if (answer === selectedQuestions[currentQuestion].correct) {
    score++;
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion < selectedQuestions.length) {
    showQuestion();
  } else {
    endGame();
  }
}

function endGame() {
  app.innerHTML = `
    <div class="result-box">
      <h2>انتهت اللعبة 🎉</h2>
      <p>نتيجتك: ${score} / ${selectedQuestions.length}</p>
      <button onclick="startGame()">إعادة اللعب</button>
    </div>
  `;
}

app.innerHTML = `
  <div class="start-box">
    <h2>جاهز للتحدي؟</h2>
    <p>عندك ${GAME_CONFIG.questionsPerGame} أسئلة، وكل سؤال عليه ${GAME_CONFIG.timePerQuestion} ثواني</p>
    <button onclick="startGame()">ابدأ اللعبة</button>
  </div>
`;
