const startDate = document.getElementById("start-date");
const endDate = document.getElementById("end-date");
const calculateDifference = document.getElementById("calculate-difference");
const differenceResult = document.getElementById("difference-result");
const differenceValue = document.getElementById("difference-value");

const baseDate = document.getElementById("base-date");
const daysInput = document.getElementById("days");
const calculateDate = document.getElementById("calculate-date");
const dateResult = document.getElementById("date-result");
const newDate = document.getElementById("new-date");

const errorBox = document.getElementById("error");
const resetButton = document.getElementById("reset");

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function clearError() {
  errorBox.textContent = "";
  errorBox.hidden = true;
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// Calculate difference between two dates
calculateDifference.addEventListener("click", () => {
  clearError();

  if (!startDate.value || !endDate.value) {
    showError("Please enter both the start date and end date.");
    differenceResult.hidden = true;
    return;
  }

  const start = parseDate(startDate.value);
  const end = parseDate(endDate.value);

  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const difference = Math.round(
    Math.abs(end - start) / millisecondsPerDay
  );

  differenceValue.textContent = difference;
  differenceResult.hidden = false;
});

// Add or subtract days
calculateDate.addEventListener("click", () => {
  clearError();

  if (!baseDate.value) {
    showError("Please enter a starting date.");
    dateResult.hidden = true;
    return;
  }

  if (daysInput.value.trim() === "") {
    showError("Please enter the number of days.");
    dateResult.hidden = true;
    return;
  }

  const days = Number(daysInput.value);

  if (!Number.isInteger(days)) {
    showError("Please enter a whole number of days.");
    dateResult.hidden = true;
    return;
  }

  const date = parseDate(baseDate.value);

  date.setDate(date.getDate() + days);

  newDate.textContent = formatDate(date);
  dateResult.hidden = false;
});

// Reset everything
resetButton.addEventListener("click", () => {
  startDate.value = "";
  endDate.value = "";
  baseDate.value = "";
  daysInput.value = "";

  differenceResult.hidden = true;
  dateResult.hidden = true;

  differenceValue.textContent = "0";
  newDate.textContent = "—";

  clearError();
});
