// Soal-soal Quiz
const questions = [
  { question: "Perubahan zat dari padat menjadi gas disebut?", optionA: "Mencair", optionB: "Membeku", optionC: "Menguap", optionD: " Menyublim", correctOption: "optionD" },
  { question: "Rumus kimia air adalah?", optionA: "CO₂", optionB: "O₂", optionC: "NaCl", optionD: "H₂O", correctOption: "optionD" },
  { question: "Proses perubahan dari padat ke cair disebut?", optionA: "Menguap", optionB: "Membeku", optionC: "Mencair", optionD: "Mengembun", correctOption: "optionC" },
  { question: "Planet dengan cincin paling terlihat?", optionA: "Mars", optionB: "Saturnus", optionC: "Jupiter", optionD: "Venus", correctOption: "optionB" },
  { question: "Bagian sel yang mengatur aktivitas sel?", optionA: "Sitoplasma", optionB: "Nukleus", optionC: "Ribosom", optionD: "Dinding sel", correctOption: "optionB" },
  { question: "Gas terbanyak di atmosfer bumi?", optionA: "Oksigen", optionB: "Nitrogen", optionC: "Karbon Dioksida", optionD: "Hidrogen", correctOption: "optionB" },
  { question: "Alat optik untuk melihat benda kecil?", optionA: "Mikroskop", optionB: "Teleskop", optionC: "Lensa", optionD: "Kamera", correctOption: "optionA" },
  { question: "Gaya yang menyebabkan benda jatuh?", optionA: "Gaya otot", optionB: "Gaya gravitasi", optionC: "Gaya gesek", optionD: "Gaya dorong", correctOption: "optionB" },
  { question: "Lapisan atmosfer tempat cuaca terjadi?", optionA: "Stratosfer", optionB: "Mesosfer", optionC: "Troposfer", optionD: "Termosfer", correctOption: "optionC" },
  { question: "Planet terbesar dalam tata surya?", optionA: "Mars", optionB: "Venus", optionC: "Saturnus", optionD: "Jupiter", correctOption: "optionD" },
  { question: "Organ pernapasan manusia?", optionA: "Jantung", optionB: "Paru-paru", optionC: "Lambung", optionD: "Hati", correctOption: "optionB" },
  { question: "Bunyi dapat merambat melalui?", optionA: "Cahaya", optionB: "Ruang hampa", optionC: "Medium", optionD: "Udara", correctOption: "optionC" },
  { question: "Membakar sampah termasuk perubahan?", optionA: "Fisika", optionB: "Kimia", optionC: "Mekanik", optionD: "Biologi", correctOption: "optionB" }, // fixed correctOption case
  { question: "Sumber energi dari angin disebut?", optionA: "Energi Surya", optionB: "Energi Angin", optionC: "Biomassa", optionD: "Panas Bumi", correctOption: "optionB" },
  { question: "Apa lambang unsur Oksigen?", optionA: "O", optionB: "Ox", optionC: "O₂", optionD: "Ox₂", correctOption: "optionA" },
  { question: "Satuan arus listrik adalah?", optionA: "Volt", optionB: "Ampere", optionC: "Ohm", optionD: "Watt", correctOption: "optionB" },
  { question: "Jenis energi untuk menyalakan TV?", optionA: "Energi Cahaya", optionB: "Energi Kimia", optionC: "Energi Listrik", optionD: "Energi Mekanik", correctOption: "optionC" },
  { question: "Apa ibu kota Indonesia?", optionA: "Bandung", optionB: "Surabaya", optionC: "Jakarta", optionD: "Medan", correctOption: "optionC" },
  { question: "Penemu lampu pijar?", optionA: "Isaac Newton", optionB: "Thomas Edison", optionC: "Albert Einstein", optionD: "Galileo", correctOption: "optionB" }
];

let shuffledQuestions = [];
let playerName = "";
let selectedQuestionCount = 10;
let questionNumber = 1;
let playerScore = 0; // sekarang dihitung poin total
let wrongAttempt = 0;
let indexNumber = 0;
let timerInterval;
let timerValue = 15;
let answered = false;
const scorePerQuestion = 10; // skor tiap soal benar

// Audio background music
const bgMusic = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
bgMusic.loop = true;

function startQuiz() {
  const nameInput = document.getElementById("player-name").value.trim();
  if (nameInput === "") {
    alert("Masukkan nama kamu dulu!");
    return;
  }
  playerName = nameInput;
  selectedQuestionCount = parseInt(document.getElementById("question-count").value);

  document.getElementById("start-page").style.display = "none";
  document.getElementById("quiz-container").style.display = "flex";
  document.getElementById("player-display").innerText = `Pemain: ${playerName}`;

  bgMusic.play();

  handleQuestions();
  NextQuestion(indexNumber);
}

function handleQuestions() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, selectedQuestionCount);
}

function NextQuestion(index) {
  resetTimer();
  startTimer();

  const currentQuestion = shuffledQuestions[index];
  document.getElementById("question-number").innerText = questionNumber;
  document.getElementById("player-score").innerText = playerScore;
  document.getElementById("display-question").innerText = currentQuestion.question;
  document.getElementById("option-one-label").innerText = currentQuestion.optionA;
  document.getElementById("option-two-label").innerText = currentQuestion.optionB;
  document.getElementById("option-three-label").innerText = currentQuestion.optionC;
  document.getElementById("option-four-label").innerText = currentQuestion.optionD;

  const progressWidth = ((questionNumber - 1) / selectedQuestionCount) * 100;
  document.getElementById("progress-bar").style.width = `${progressWidth}%`;
}

function selectOption(optionValue) {
  if (answered) return;
  checkForAnswer(optionValue);
}

function checkForAnswer(selectedOption) {
  clearInterval(timerInterval);

  const currentQuestion = shuffledQuestions[indexNumber];
  const correctAnswer = currentQuestion.correctOption;
  const options = document.getElementsByName("option");

  options.forEach((option) => {
    const label = option.labels[0];
    if (option.value === correctAnswer) {
      label.style.backgroundColor = "green";
    }
    if (option.checked && option.value !== correctAnswer) {
      label.style.backgroundColor = "red";
    }
  });

  if (selectedOption === correctAnswer) {
    playerScore += scorePerQuestion; // tambah poin per soal benar
  } else {
    wrongAttempt++;
  }

  answered = true;
  indexNumber++;
  questionNumber++;
}

function handleNextQuestion() {
  if (!answered) {
    // Waktu tetap jalan, tapi tidak lanjut soal kalau belum dijawab
    return;
  }

  resetOptions();
  answered = false;

  if (indexNumber < shuffledQuestions.length) {
    NextQuestion(indexNumber);
  } else {
    handleEndGame();
  }
}

function resetOptions() {
  const options = document.getElementsByName("option");
  options.forEach(option => {
    option.checked = false;
    option.labels[0].style.backgroundColor = "";
  });
}

function startTimer() {
  timerValue = 15;
  const timerElement = document.getElementById("timer");
  const timerBar = document.getElementById("timer-bar");
  timerElement.innerText = timerValue;
  timerElement.style.color = "#007bff";
  timerBar.style.width = "100%";

  timerInterval = setInterval(() => {
    timerValue--;
    timerElement.innerText = timerValue;
    timerBar.style.width = `${(timerValue / 15) * 100}%`;

    if (timerValue <= 5) {
      timerElement.style.color = "#dc3545";
      document.getElementById("beep-sound").play();
    }

    if (timerValue <= 0) {
      clearInterval(timerInterval);
      wrongAttempt++;
      indexNumber++;
      questionNumber++;
      resetOptions();
      answered = false;

      if (indexNumber < shuffledQuestions.length) {
        NextQuestion(indexNumber);
      } else {
        handleEndGame();
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").innerText = 15;
  document.getElementById("timer-bar").style.width = "100%";
}

function handleEndGame() {
  clearInterval(timerInterval);
  bgMusic.pause();
  bgMusic.currentTime = 0;

  // Hitung persentase dari total skor maksimal
  const maxScore = selectedQuestionCount * scorePerQuestion;
  const scorePercent = (playerScore / maxScore) * 100;

  let remarks = "";
  let remarkColor = "";

  if (scorePercent <= 40) {
    remarks = "Perlu Banyak Belajar 😟";
    remarkColor = "red";
  } else if (scorePercent <= 70) {
    remarks = "Cukup Bagus, Bisa Lebih Baik! 😊";
    remarkColor = "orange";
  } else {
    remarks = "Luar Biasa! 🎉";
    remarkColor = "green";
  }

  document.getElementById("display-name").innerText = playerName;
  document.getElementById("wrong-answers").innerText = wrongAttempt;
  document.getElementById("right-answers").innerText = playerScore / scorePerQuestion; // jumlah soal benar
  document.getElementById("grade-percentage").innerText = scorePercent.toFixed(2);
  document.getElementById("remarks").innerText = remarks;
  document.getElementById("remarks").style.color = remarkColor;

  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("score-modal").style.display = "flex";
}

function restartQuiz() {
  document.getElementById("score-modal").style.display = "none";
  document.getElementById("quiz-container").style.display = "flex";
  resetGame();
  bgMusic.play();
}

function goToMenu() {
  document.getElementById("score-modal").style.display = "none";
  document.getElementById("start-page").style.display = "flex";
  resetGame();
  bgMusic.pause();
  bgMusic.currentTime = 0;
}

function resetGame() {
  playerScore = 0;
  wrongAttempt = 0;
  indexNumber = 0;
  questionNumber = 1;
  answered = false;
  document.getElementById("progress-bar").style.width = "0%";
}
