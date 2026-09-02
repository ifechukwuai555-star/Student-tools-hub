import { countdownParts } from "./calculations.js";

const dateInput = document.querySelector("#exam-date");
const timeInput = document.querySelector("#exam-time");

const startButton = document.querySelector("#start-countdown");
const resetButton = document.querySelector("#reset");

const error = document.querySelector("#error");
const result = document.querySelector("#countdown-result");

const daysElement = document.querySelector("#days");
const hoursElement = document.querySelector("#hours");
const minutesElement = document.querySelector("#minutes");
const secondsElement = document.querySelector("#seconds");
const statusElement = document.querySelector("#countdown-status");

let timer = null;

function showError(message) {
  error.textContent = message;
  error.hidden = false;
  result.hidden = true;
}

function clearError() {
  error.textContent = "";
  error.hidden = true;
}

function updateCountdown(targetTime) {
  const parts = countdownParts(targetTime);

  daysElement.textContent = parts.days;
  hoursElement.textContent = String(parts.hours).padStart(2, "0");
  minutesElement.textContent = String(parts.minutes).padStart(2, "0");
  secondsElement.textContent = String(parts.seconds).padStart(2, "0");

  result.hidden = false;

  if (parts.past) {
    statusElement.textContent = "The exam time has arrived or has already passed.";

    if (timer) {
      clearInterval(timer);
      timer = null;
    }

    return;
  }

  statusElement.textContent = "Keep studying — your exam is getting closer!";
}

function startCountdown() {
  clearError();

  if (!dateInput.value) {
    showError("Please select an exam date.");
    return;
  }

  if (!timeInput.value) {
    showError("Please select an exam time.");
    return;
  }

  const target = new Date(
    `${dateInput.value}T${timeInput.value}`
  );

  if (Number.isNaN(target.getTime())) {
    showError("Please enter a valid exam date and time.");
    return;
  }

  const targetTime = target.getTime();

  if (timer) {
    clearInterval(timer);
  }

  updateCountdown(targetTime);

  timer = setInterval(() => {
    updateCountdown(targetTime);
  }, 1000);
}

function resetCountdown() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }

  dateInput.value = "";
  timeInput.value = "";

  daysElement.textContent = "0";
  hoursElement.textContent = "0";
  minutesElement.textContent = "0";
  secondsElement.textContent = "0";

  statusElement.textContent = "";

  result.hidden = true;
  clearError();
}

startButton.addEventListener("click", startCountdown);
resetButton.addEventListener("click", resetCountdown);
