const examDateInput = document.getElementById("exam-date");
const examTimeInput = document.getElementById("exam-time");

const startButton = document.getElementById("start-countdown");
const resetButton = document.getElementById("reset");

const resultBox = document.getElementById("countdown-result");
const errorBox = document.getElementById("error");
const statusText = document.getElementById("countdown-status");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

let countdownTimer = null;

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  resultBox.hidden = true;
}

function clearError() {
  errorBox.textContent = "";
  errorBox.hidden = true;
}

function getExamDate() {
  const date = examDateInput.value;
  const time = examTimeInput.value;

  if (!date) {
    throw new Error("Please select your exam date.");
  }

  if (!time) {
    throw new Error("Please select your exam time.");
  }

  const examDate = new Date(`${date}T${time}`);

  if (Number.isNaN(examDate.getTime())) {
    throw new Error("Please enter a valid date and time.");
  }

  return examDate;
}

function updateCountdown(examDate) {
  const now = new Date();

  const difference = examDate.getTime() - now.getTime();

  if (difference <= 0) {
    daysElement.textContent = "0";
    hoursElement.textContent = "0";
    minutesElement.textContent = "0";
    secondsElement.textContent = "0";

    statusText.textContent = "The exam date and time have passed.";

    stopCountdown();

    return;
  }

  const totalSeconds = Math.floor(difference / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor(
    (totalSeconds % 86400) / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds = totalSeconds % 60;

  daysElement.textContent = days;
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");

  statusText.textContent = "Time remaining";
}

function stopCountdown() {
  if (countdownTimer !== null) {
    clearInterval(countdownTimer);
    countdownTimer = null;
  }
}

function startCountdown() {
  clearError();
  stopCountdown();

  let examDate;

  try {
    examDate = getExamDate();
  } catch (error) {
    showError(error.message);
    return;
  }

  resultBox.hidden = false;

  updateCountdown(examDate);

  if (examDate.getTime() > Date.now()) {
    countdownTimer = setInterval(() => {
      updateCountdown(examDate);
    }, 1000);
  }
}

function resetCountdown() {
  stopCountdown();

  examDateInput.value = "";
  examTimeInput.value = "08:00";

  daysElement.textContent = "0";
  hoursElement.textContent = "0";
  minutesElement.textContent = "0";
  secondsElement.textContent = "0";

  statusText.textContent = "Time remaining";

  resultBox.hidden = true;

  clearError();
}

startButton.addEventListener(
  "click",
  startCountdown
);

resetButton.addEventListener(
  "click",
  resetCountdown
);

window.addEventListener("beforeunload", stopCountdown);
