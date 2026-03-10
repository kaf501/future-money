<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>لعبة الأسئلة</title>
  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: linear-gradient(180deg, #0f172a, #1e293b);
      color: white;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

    .game-box {
      width: 100%;
      max-width: 420px;
      background: rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(8px);
    }

    .top-bar {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 15px;
      font-size: 15px;
    }

    .badge {
      background: rgba(255, 255, 255, 0.12);
      padding: 10px 14px;
      border-radius: 12px;
      flex: 1;
      text-align: center;
    }

    .progress-wrap {
      width: 100%;
      height: 10px;
      background: rgba(255, 255, 255, 0.12);
      border-radius: 999px;
      overflow: hidden;
      margin-bottom: 18px;
    }

    .progress-bar {
      height: 100%;
      width: 0%;
      background: #22c55e;
      transition: width 0.3s ease;
    }

    .question-box {
      background: rgba(255, 255, 255, 0.07);
      border-radius: 16px;
      padding: 18px;
      margin-bottom: 16px;
      min-height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-size: 22px;
      line-height: 1.7;
    }

    .answers {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
    }

    .answer-btn {
      border: none;
      border-radius: 14px;
      padding: 14px;
      font-size: 17px;
      cursor: pointer;
      transition: 0.2s ease;
      background: white;
      color: #111827;
      font-weight: bold;
    }

    .answer-btn:hover {
      transform: scale(1.02);
    }

    .answer-btn.correct {
      background: #22c55e;
      color: white;
    }

    .answer-btn.wrong {
      background: #ef4444;
      color: white;
    }

    .answer-btn:disabled {
      opacity: 0.9;
      cursor: not-allowed;
    }

    .message {
      text-align: center;
      margin-top: 14px;
      font-size: 18px;
      min-height: 28px;
      font-weight: bold;
    }

    .final-screen {
      text-align: center;
    }

    .final-screen h2 {
      margin-bottom: 10px;
      font-size: 30px;
    }

    .final-screen p {
      font-size: 20px;
      margin-bottom: 18px;
    }

    .restart-btn {
      background: #f59e0b;
      color: white;
      border: none;
      padding: 14px 20px;
      font-size: 18px;
      border-radius: 14px;
      cursor: pointer;
      font-weight: bold;
    }

    .small {
      font-size: 14px;
      opacity: 0.85;
      margin-top: 10px;
      text-align: center;
    }
  </style>
</head>
<body>

  <div class="game-box" id="gameBox">
    <div class="top-bar">
      <div class="badge" id="questionCount">السؤال 1 / 10</div>
      <div class="badge" id="score">النقاط: 0</div>
      <div class="badge" id="timer">الوقت: 10</div>
    </div>

    <div class="progress-wrap">
      <div class="progress-bar" id="progressBar"></div>
    </div>

    <div class="question-box" id="question">جاري تحميل السؤال...</div>

    <div class="answers">
      <button class="answer-btn" id="A" onclick="checkAnswer('A')"></button>
      <button class="answer-btn" id="B" onclick="checkAnswer('B')"></button>
      <button class="answer-btn" id="C" onclick="checkAnswer('C')"></button>
      <button class="answer-btn" id="D" onclick="checkAnswer('D')"></button>
    </div>

    <div class="message" id="message"></div>
    <div class="small">اختر الإجابة قبل انتهاء الوقت</div>
  </div>

  <script>
    const questions = [
      {
        q: "ما عاصمة الكويت؟",
        A: "الكويت",
        B: "الرياض",
        C: "الدوحة",
        D: "المنامة",
        correct: "A"
      },
      {
        q: "كم عدد أيام الأسبوع؟",
        A: "5",
        B: "6",
        C: "7",
        D: "8",
        correct: "C"
      },
      {
        q: "أكبر كوكب في المجموعة الشمسية؟",
        A: "الأرض",
        B: "المشتري",
        C: "زحل",
        D: "المريخ",
        correct: "B"
      },
      {
        q: "من نزل عليه القرآن الكريم؟",
        A: "موسى عليه السلام",
        B: "عيسى عليه السلام",
        C: "محمد ﷺ",
        D: "إبراهيم عليه السلام",
        correct: "C"
      },
      {
        q: "كم عدد أركان الإسلام؟",
        A: "4",
        B: "5",
        C: "6",
        D: "7",
        correct: "B"
      },
      {
        q: "أسرع حيوان بري؟",
        A: "الأسد",
        B: "الفهد",
        C: "الحصان",
        D: "الذئب",
        correct: "B"
      },
      {
        q: "كم عدد القارات في العالم؟",
        A: "5",
        B: "6",
        C: "7",
        D: "8",
        correct: "C"
      },
      {
        q: "ما هو لون الزمرد؟",
        A: "أحمر",
        B: "أزرق",
        C: "أصفر",
        D: "أخضر",
        correct: "D"
      },
      {
        q: "كم عدد الكواكب في المجموعة الشمسية؟",
        A: "7",
        B: "8",
        C: "9",
        D: "10",
        correct: "B"
      },
      {
        q: "ما البحر الذي تقع عليه الكويت؟",
        A: "البحر الأحمر",
        B: "الخليج العربي",
        C: "البحر المتوسط",
        D: "بحر قزوين",
        correct: "B"
      }
    ];

    let currentQuestion = 0;
    let score = 0;
    let timeLeft = 10;
    let timerInterval = null;
    let answered = false;

    const questionEl = document.getElementById("question");
    const scoreEl = document.getElementById("score");
    const timerEl = document.getElementById("timer");
    const questionCountEl = document.getElementById("questionCount");
    const messageEl = document.getElementById("message");
    const progressBar = document.getElementById("progressBar");
    const gameBox = document.getElementById("gameBox");

    const btnA = document.getElementById("A");
    const btnB = document.getElementById("B");
    const btnC = document.getElementById("C");
    const btnD = document.getElementById("D");

    function loadQuestion() {
      clearInterval(timerInterval);
      answered = false;
      timeLeft = 10;
      timerEl.textContent = "الوقت: " + timeLeft;
      messageEl.textContent = "";

      resetButtons();

      const q = questions[currentQuestion];
      questionEl.textContent = q.q;
      btnA.textContent = q.A;
      btnB.textContent = q.B;
      btnC.textContent = q.C;
      btnD.textContent = q.D;

      questionCountEl.textContent = "السؤال " + (currentQuestion + 1) + " / " + questions.length;
      scoreEl.textContent = "النقاط: " + score;

      const progress = ((currentQuestion) / questions.length) * 100;
      progressBar.style.width = progress + "%";

      startTimer();
    }

    function startTimer() {
      timerInterval = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "الوقت: " + timeLeft;

        if (timeLeft <= 0) {
          clearInterval(timerInterval);
          if (!answered) {
            answered = true;
            showCorrectAnswer();
            messageEl.textContent = "انتهى الوقت ⏰";
            setTimeout(nextQuestion, 1200);
          }
        }
      }, 1000);
    }

    function checkAnswer(selected) {
      if (answered) return;

      answered = true;
      clearInterval(timerInterval);

      const correct = questions[currentQuestion].correct;
      disableButtons();

      if (selected === correct) {
        score++;
        scoreEl.textContent = "النقاط: " + score;
        document.getElementById(selected).classList.add("correct");
        messageEl.textContent = "إجابة صحيحة ✅";
      } else {
        document.getElementById(selected).classList.add("wrong");
        document.getElementById(correct).classList.add("correct");
        messageEl.textContent = "إجابة خاطئة ❌";
      }

      setTimeout(nextQuestion, 1200);
    }

    function showCorrectAnswer() {
      const correct = questions[currentQuestion].correct;
      disableButtons();
      document.getElementById(correct).classList.add("correct");
    }

    function disableButtons() {
      const buttons = document.querySelectorAll(".answer-btn");
      buttons.forEach(btn => btn.disabled = true);
    }

    function resetButtons() {
      const buttons = document.querySelectorAll(".answer-btn");
      buttons.forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("correct", "wrong");
      });
    }

    function nextQuestion() {
      currentQuestion++;

      if (currentQuestion >= questions.length) {
        endGame();
        return;
      }

      loadQuestion();
    }

    function endGame() {
      clearInterval(timerInterval);
      progressBar.style.width = "100%";

      let resultText = "";

      if (score === questions.length) {
        resultText = "ما شاء الله، فل مارك 👏";
      } else if (score >= 7) {
        resultText = "ممتاز جدًا 🔥";
      } else if (score >= 5) {
        resultText = "زين، لكن تقدر أحسن 👌";
      } else {
        resultText = "حاول مرة ثانية 💪";
      }

      gameBox.innerHTML = `
        <div class="final-screen">
          <h2>انتهت اللعبة 🎉</h2>
          <p>نتيجتك: ${score} / ${questions.length}</p>
          <p>${resultText}</p>
          <button class="restart-btn" onclick="restartGame()">إعادة اللعب</button>
        </div>
      `;
    }

    function restartGame() {
      currentQuestion = 0;
      score = 0;

      gameBox.innerHTML = `
        <div class="top-bar">
          <div class="badge" id="questionCount">السؤال 1 / 10</div>
          <div class="badge" id="score">النقاط: 0</div>
          <div class="badge" id="timer">الوقت: 10</div>
        </div>

        <div class="progress-wrap">
          <div class="progress-bar" id="progressBar"></div>
        </div>

        <div class="question-box" id="question">جاري تحميل السؤال...</div>

        <div class="answers">
          <button class="answer-btn" id="A" onclick="checkAnswer('A')"></button>
          <button class="answer-btn" id="B" onclick="checkAnswer('B')"></button>
          <button class="answer-btn" id="C" onclick="checkAnswer('C')"></button>
          <button class="answer-btn" id="D" onclick="checkAnswer('D')"></button>
        </div>

        <div class="message" id="message"></div>
        <div class="small">اختر الإجابة قبل انتهاء الوقت</div>
      `;

      refreshElements();
      loadQuestion();
    }

    function refreshElements() {
      window.questionEl = document.getElementById("question");
      window.scoreEl = document.getElementById("score");
      window.timerEl = document.getElementById("timer");
      window.questionCountEl = document.getElementById("questionCount");
      window.messageEl = document.getElementById("message");
      window.progressBar = document.getElementById("progressBar");
    }

    loadQuestion();
  </script>
</body>
</html>
