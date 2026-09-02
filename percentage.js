import {
  calculateBasicPercentage,
  calculatePercentageOfValue,
  calculatePercentageChange
} from "./calculations.js";

const error = document.querySelector("#error");
const result = document.querySelector("#result");
const resultValue = document.querySelector("#percentage-result");

function showResult(value, suffix = "") {
  resultValue.textContent =
    `${Number(value).toFixed(2)}${suffix}`;

  result.hidden = false;
  error.hidden = true;
  error.textContent = "";
}

function showError(message) {
  error.textContent = message;
  error.hidden = false;
  result.hidden = true;
}

function calculateBasic() {
  try {
    const value =
      document.querySelector("#basic-value").value;

    const total =
      document.querySelector("#basic-total").value;

    const percentage =
      calculateBasicPercentage(value, total);

    showResult(percentage, "%");

  } catch (err) {
    showError(
      err.message || "Please enter valid numbers."
    );
  }
}

function calculateOfValue() {
  try {
    const percentage =
      document.querySelector("#percentage").value;

    const value =
      document.querySelector("#percentage-value").value;

    const answer =
      calculatePercentageOfValue(
        percentage,
        value
      );

    showResult(answer);

  } catch (err) {
    showError(
      err.message || "Please enter valid numbers."
    );
  }
}

function calculateChange() {
  try {
    const oldValue =
      document.querySelector("#old-value").value;

    const newValue =
      document.querySelector("#new-value").value;

    const change =
      calculatePercentageChange(
        oldValue,
        newValue
      );

    const sign = change > 0 ? "+" : "";

    showResult(
      change,
      `% ${sign ? sign : ""}`
    );

  } catch (err) {
    showError(
      err.message || "Please enter valid numbers."
    );
  }
}

function resetCalculator() {
  document.querySelectorAll("input").forEach(input => {
    input.value = "";
  });

  resultValue.textContent = "0.00";

  result.hidden = true;
  error.hidden = true;
  error.textContent = "";
}

document
  .querySelector("#calculate-basic")
  .addEventListener(
    "click",
    calculateBasic
  );

document
  .querySelector("#calculate-of-value")
  .addEventListener(
    "click",
    calculateOfValue
  );

document
  .querySelector("#calculate-change")
  .addEventListener(
    "click",
    calculateChange
  );

document
  .querySelector("#reset")
  .addEventListener(
    "click",
    resetCalculator
  );
