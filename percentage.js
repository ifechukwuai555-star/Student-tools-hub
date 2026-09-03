const valueInput = document.getElementById("value");
const totalInput = document.getElementById("total");
const calculatePercentageButton = document.getElementById("calculate-percentage");
const percentageResult = document.getElementById("percentage-result");
const percentageValue = document.getElementById("percentage-value");

const percentInput = document.getElementById("percent");
const numberInput = document.getElementById("number");
const calculateOfButton = document.getElementById("calculate-of");
const ofResult = document.getElementById("of-result");
const ofValue = document.getElementById("of-value");

const oldValueInput = document.getElementById("old-value");
const newValueInput = document.getElementById("new-value");
const calculateChangeButton = document.getElementById("calculate-change");
const changeResult = document.getElementById("change-result");
const changeValue = document.getElementById("change-value");

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

function validNumber(input) {
  return input.value.trim() !== "" && Number.isFinite(Number(input.value));
}

/* -------------------------------
   VALUE AS PERCENTAGE OF TOTAL
-------------------------------- */

calculatePercentageButton.addEventListener("click", () => {
  clearError();
  percentageResult.hidden = true;

  if (!validNumber(valueInput) || !validNumber(totalInput)) {
    showError("Please enter valid numbers for the value and total.");
    return;
  }

  const value = Number(valueInput.value);
  const total = Number(totalInput.value);

  if (total === 0) {
    showError("The total cannot be zero.");
    return;
  }

  const percentage = (value / total) * 100;

  percentageValue.textContent = `${percentage.toFixed(2)}%`;
  percentageResult.hidden = false;
});


/* -------------------------------
   PERCENTAGE OF A VALUE
-------------------------------- */

calculateOfButton.addEventListener("click", () => {
  clearError();
  ofResult.hidden = true;

  if (!validNumber(percentInput) || !validNumber(numberInput)) {
    showError("Please enter valid numbers for the percentage and value.");
    return;
  }

  const percent = Number(percentInput.value);
  const number = Number(numberInput.value);

  const result = (percent / 100) * number;

  ofValue.textContent = result.toFixed(2);
  ofResult.hidden = false;
});


/* -------------------------------
   PERCENTAGE CHANGE
-------------------------------- */

calculateChangeButton.addEventListener("click", () => {
  clearError();
  changeResult.hidden = true;

  if (!validNumber(oldValueInput) || !validNumber(newValueInput)) {
    showError("Please enter valid original and new values.");
    return;
  }

  const oldValue = Number(oldValueInput.value);
  const newValue = Number(newValueInput.value);

  if (oldValue === 0) {
    showError("The original value cannot be zero.");
    return;
  }

  const change =
    ((newValue - oldValue) / Math.abs(oldValue)) * 100;

  const direction =
    change > 0
      ? "increase"
      : change < 0
        ? "decrease"
        : "no change";

  changeValue.textContent =
    `${Math.abs(change).toFixed(2)}% ${direction}`;

  changeResult.hidden = false;
});


/* -------------------------------
   RESET
-------------------------------- */

resetButton.addEventListener("click", () => {
  valueInput.value = "";
  totalInput.value = "";

  percentInput.value = "";
  numberInput.value = "";

  oldValueInput.value = "";
  newValueInput.value = "";

  percentageValue.textContent = "0%";
  ofValue.textContent = "0";
  changeValue.textContent = "0%";

  percentageResult.hidden = true;
  ofResult.hidden = true;
  changeResult.hidden = true;

  clearError();
});
