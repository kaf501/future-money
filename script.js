const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const endScreen = document.getElementById("endScreen");

const categoryButtons = document.querySelectorAll(".category-btn");
const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");
const playAgainBtn = document.getElementById("playAgainBtn");
const changeCategoryBtn = document.getElementById("changeCategoryBtn");
const clearLeaderboardBtn = document.getElementById("clearLeaderboardBtn");

const playerNameInput = document.getElementById("playerName");
const questionCountSelect = document.getElementById("questionCount");
const timePerQuestionSelect = document.getElementById("timePerQuestion");

const currentCategoryEl = document.getElementById("currentCategory");
const scoreEl = document.getElementById("score");
const questionNumberEl = document.getElementById("questionNumber");
const questionTotalEl = document.getElementById("questionTotal");
const timerEl = document.getElementById("timer");
const streakEl = document.getElementById("streak");
const categoryBadge = document.getElementById("categoryBadge");
const progressFill = document.getElementById("progressFill");
const questionTextEl = document.getElementById("questionText");
const answersContainer = document.getElementById("answersContainer");

const feedbackBox = document.getElementById("feedbackBox");
const feedbackTitle = document.getElementById("feedbackTitle");
const feedbackText = document.getElementById("feedbackText");

const finalScoreEl = document.getElementById("finalScore");
const correctCountEl = document.getElementById("correctCount");
const wrongCountEl = document.getElementById("wrongCount");
const accuracyRateEl = document.getElementById("accuracyRate");
const bestStreakEl = document.getElementById("bestStreak");
const reviewTextEl = document.getElementById("reviewText");
const endMessageEl = document.getElementById("endMessage");
const leaderboardList = document.getElementById("leaderboardList");

let selectedCategory = null;
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer = 15;
let timerPerQuestion = 15;
let timerInterval = null;
let answered = false;
let playerName = "لاعب";
let correctCount = 0;
let wrongCount = 0;
let streak = 0;
let bestStreak = 0;
let lastQuestionReview = "-";
let gameQuestionCount = 10;

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    selectedCategory = btn.dataset.category;
  });
});

startBtn.addEventListener("click", () => {
  if (!selectedCategory) {
    alert("اختر الفئة أولاً");
    return;
  }

  playerName = playerNameInput.value.trim() || "لاعب";
  gameQuestionCount = Number(questionCountSelect.value);
  timerPerQuestion = Number(timePerQuestionSelect.value);

  const bank = selectedCategory === "عشوائي"
    ? getAllQuestionsMerged()
    : [...questionsData[selectedCategory]].map((q) => ({ ...q, sourceCategory: selectedCategory }));

  currentQuestions = shuffle(bank).slice(0, gameQuestionCount);

  currentQuestionIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  streak = 0;
  bestStreak = 0;
  lastQuestionReview = "-";

  scoreEl.textContent = score;
  streakEl.textContent = streak;
  currentCategoryEl.textContent = selectedCategory;
  categoryBadge.textContent = selectedCategory;
  questionTotalEl.textContent = currentQuestions.length;
  timerEl.textContent = timerPerQuestion;

  showScreen(quizScreen);
  loadQuestion();
});

function loadQuestion() {
  clearInterval(timerInterval);
  answered = false;
  timer = timerPerQuestion;
  timerEl.textContent = timer;
  nextBtn.classList.add("hidden");
  feedbackBox.classList.add("hidden");

  const currentQuestion = currentQuestions[currentQuestionIndex];
  questionNumberEl.textContent = currentQuestionIndex + 1;
  questionTextEl.textContent = currentQuestion.question;

  if (selectedCategory === "عشوائي" && currentQuestion.sourceCategory) {
    categoryBadge.textContent = currentQuestion.sourceCategory;
  } else {
    categoryBadge.textContent = selectedCategory;
  }

  answersContainer.innerHTML = "";

  const progress = ((currentQuestionIndex + 1) / currentQuestions.length) * 100;
  progressFill.style.width = `${progress}%`;

  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = answer;
    btn.addEventListener("click", () => {
      if (!answered) {
        selectAnswer(index, btn);
      }
    });
    answersContainer.appendChild(btn);
  });

  startTimer();
}

function selectAnswer(selectedIndex, selectedButton) {
  answered = true;
  clearInterval(timerInterval);

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".answer-btn");
  const isCorrect = selectedIndex === currentQuestion.correct;
  const correctText = currentQuestion.answers[currentQuestion.correct];

  buttons.forEach((btn, index) => {
    btn.classList.add("disabled");
    if (index === currentQuestion.correct) {
      btn.classList.add("correct");
    }
  });

  if (isCorrect) {
    selectedButton.classList.add("correct");
    score += 10;
    correctCount += 1;
    streak += 1;
    bestStreak = Math.max(bestStreak, streak);
    scoreEl.textContent = score;
    streakEl.textContent = streak;

    showFeedback("✅ إجابة صحيحة", currentQuestion.explanation || "أحسنت!");
    playCorrectSound();
  } else {
    selectedButton.classList.add("wrong");
    wrongCount += 1;
    streak = 0;
    streakEl.textContent = streak;

    showFeedback(
      "❌ إجابة غير صحيحة",
      `الإجابة الصحيحة هي: ${correctText}. ${currentQuestion.explanation || ""}`
    );
    playWrongSound();
  }

  lastQuestionReview = `السؤال: ${currentQuestion.question} | الإجابة الصحيحة: ${correctText}`;
  nextBtn.classList.remove("hidden");
}

function startTimer() {
  timerInterval = setInterval(() => {
    timer--;
    timerEl.textContent = timer;

    if (timer <= 5) {
      timerEl.parentElement.style.color = "#ffd76c";
    } else {
      timerEl.parentElement.style.color = "";
    }

    if (timer <= 0) {
      clearInterval(timerInterval);
      timeOutAnswer();
    }
  }, 1000);
}

function timeOutAnswer() {
  if (answered) return;

  answered = true;

  const currentQuestion = currentQuestions[currentQuestionIndex];
  const buttons = document.querySelectorAll(".answer-btn");
  const correctText = currentQuestion.answers[currentQuestion.correct];

  buttons.forEach((btn, index) => {
    btn.classList.add("disabled");
    if (index === currentQuestion.correct) {
      btn.classList.add("correct");
    }
  });

  wrongCount += 1;
  streak = 0;
  streakEl.textContent = streak;

  showFeedback(
    "⏰ انتهى الوقت",
    `الإجابة الصحيحة هي: ${correctText}. ${currentQuestion.explanation || ""}`
  );

  lastQuestionReview = `السؤال: ${currentQuestion.question} | الإجابة الصحيحة: ${correctText}`;
  playWrongSound();
  nextBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;

  if (currentQuestionIndex < currentQuestions.length) {
    loadQuestion();
  } else {
    finishGame();
  }
});

function finishGame() {
  finalScoreEl.textContent = score;
  correctCountEl.textContent = correctCount;
  wrongCountEl.textContent = wrongCount;
  bestStreakEl.textContent = bestStreak;

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0
    ? Math.round((correctCount / totalAnswered) * 100)
    : 0;

  accuracyRateEl.textContent = `${accuracy}%`;
  reviewTextEl.textContent = lastQuestionReview;
  endMessageEl.textContent = getEndMessage(score, currentQuestions.length, accuracy);

  saveLeaderboard(playerName, score, selectedCategory, accuracy);
  renderLeaderboard();
  showScreen(endScreen);
}

playAgainBtn.addEventListener("click", () => {
  const bank = selectedCategory === "عشوائي"
    ? getAllQuestionsMerged()
    : [...questionsData[selectedCategory]].map((q) => ({ ...q, sourceCategory: selectedCategory }));

  currentQuestions = shuffle(bank).slice(0, gameQuestionCount);

  currentQuestionIndex = 0;
  score = 0;
  correctCount = 0;
  wrongCount = 0;
  streak = 0;
  bestStreak = 0;
  lastQuestionReview = "-";

  scoreEl.textContent = score;
  streakEl.textContent = streak;
  questionTotalEl.textContent = currentQuestions.length;

  showScreen(quizScreen);
  loadQuestion();
});

changeCategoryBtn.addEventListener("click", resetToStart);

function saveLeaderboard(name, scoreValue, category, accuracy) {
  const data = JSON.parse(localStorage.getItem("quizLeaderboardMax")) || [];

  data.push({
    name,
    score: scoreValue,
    category,
    accuracy
  });

  data.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return b.accuracy - a.accuracy;
  });

  localStorage.setItem("quizLeaderboardMax", JSON.stringify(data.slice(0, 15)));
}

function renderLeaderboard() {
  const data = JSON.parse(localStorage.getItem("quizLeaderboardMax")) || [];
  leaderboardList.innerHTML = "";

  if (data.length === 0) {
    leaderboardList.innerHTML = `
      <div class="leader-item">
        <div class="rank-box">-</div>
        <div class="leader-main">
          <div class="leader-name">لا يوجد ترتيب بعد</div>
          <div class="leader-category">ابدأ أول جولة ليظهر الترتيب</div>
        </div>
        <div class="leader-score">0</div>
      </div>
    `;
    return;
  }

  data.forEach((player, index) => {
    const item = document.createElement("div");
    item.className = "leader-item";
    item.innerHTML = `
      <div class="rank-box">#${index + 1}</div>
      <div class="leader-main">
        <div class="leader-name">${escapeHtml(player.name)}</div>
        <div class="leader-category">${escapeHtml(player.category)} • ${player.accuracy}%</div>
      </div>
      <div class="leader-score">${player.score}</div>
    `;
    leaderboardList.appendChild(item);
  });
}

clearLeaderboardBtn.addEventListener("click", () => {
  localStorage.removeItem("quizLeaderboardMax");
  renderLeaderboard();
});

function getEndMessage(scoreValue, totalQuestions, accuracy) {
  const maxScore = totalQuestions * 10;
  const percentScore = Math.round((scoreValue / maxScore) * 100);

  if (percentScore >= 90 && accuracy >= 90) return "مستوى أسطوري! واضح إنك محترف جداً 🔥";
  if (percentScore >= 75) return "أداء قوي جداً 👏";
  if (percentScore >= 55) return "أداء جميل وقريب من القمة 💪";
  return "بداية ممتازة، والإعادة بتخليك أقوى 🚀";
}

function showFeedback(title, text) {
  feedbackTitle.textContent = title;
  feedbackText.textContent = text;
  feedbackBox.classList.remove("hidden");
}

function showScreen(screen) {
  [startScreen, quizScreen, endScreen].forEach((s) => s.classList.remove("active"));
  screen.classList.add("active");
}

function resetToStart() {
  clearInterval(timerInterval);

  selectedCategory = null;
  currentQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  timer = 15;
  streak = 0;
  bestStreak = 0;
  correctCount = 0;
  wrongCount = 0;
  answered = false;

  categoryButtons.forEach((btn) => btn.classList.remove("active"));

  currentCategoryEl.textContent = "-";
  scoreEl.textContent = "0";
  questionNumberEl.textContent = "0";
  questionTotalEl.textContent = "0";
  timerEl.textContent = "15";
  streakEl.textContent = "0";
  progressFill.style.width = "0%";
  feedbackBox.classList.add("hidden");
  nextBtn.classList.add("hidden");

  showScreen(startScreen);
}

function shuffle(arr) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function playCorrectSound() {
  playBeep(680, 0.08, "sine", 0.05);
  setTimeout(() => playBeep(860, 0.1, "sine", 0.05), 90);
}

function playWrongSound() {
  playBeep(240, 0.12, "sawtooth", 0.05);
  setTimeout(() => playBeep(170, 0.15, "sawtooth", 0.05), 120);
}

function playBeep(frequency, duration, type = "sine", volume = 0.05) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return;

  const audioCtx = new AudioContextClass();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;
  gainNode.gain.value = volume;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
  oscillator.stop(audioCtx.currentTime + duration);
}

renderLeaderboard();
