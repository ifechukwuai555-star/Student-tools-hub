import {
  dateDifferenceDays,
  addDays
} from "./calculations.js";

const startDate = document.querySelector("#start-date");
const endDate = document.querySelector("#end-date");

const baseDate = document.querySelector("#base-date");
const daysInput = document.querySelector("#days");

const differenceResult = document.querySelector("#difference-result");
const differenceValue = document.querySelector("#difference-value");

const dateResult = document.querySelector("#date-result");
const newDate = document.querySelector("#new-date");

const error = document.querySelector("#error");

const differenceButton = document.querySelector("#calculate-difference");
const dateButton = document.querySelector("#calculate-date");
const resetButton = document.querySelector("#reset");

function showError(message) {
  error.textContent = message;
  error.hidden = false;
}

function clearError() {
  error.textContent = "";
  error.hidden = true;
}

function hideResults() {
  differenceResult.hidden = true;
  dateResult.hidden = true;
}

function calculateDifference() {
  clearError();

  try {
    if (!startDate.value || !endDate.value) {
      throw new Error("Please select both dates.");
    }

    const difference = dateDifferenceDays(
      startDate.value,
      endDate.value
    );

    differenceValue.textContent = `${Math.abs(difference)} days`;

    if (difference === 0) {
      differenceValue.textContent = "0 days";
    }

    differenceResult.hidden = false;
  } catch (err) {
    differenceResult.hidden = true;
    showError(err.message || "Unable to calculate the date difference.");
  }
}

function calculateNewDate() {
  clearError();

  try {
    if (!baseDate.value) {
      throw new Error("Please select a starting date.");
    }

    if (daysInput.value === "") {
      throw new Error("Please enter the number of days.");
    }

    const days = Number(daysInput.value);

    if (!Number.isInteger(days)) {
      throw new Error("The number of days must be a whole number.");
    }

    const calculatedDate = addDays(
      baseDate.value,
      days
    );

    const formattedDate = new Date(
      `${calculatedDate}T00:00:00Z`
    ).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    });

    newDate.textContent = formattedDate;
    dateResult.hidden = false;
  } catch (err) {
    dateResult.hidden = true;
    showError(err.message || "Unable to calculate the new date.");
  }
}

function resetCalculator() {
  startDate.value = "";
  endDate.value = "";
  baseDate.value = "";
  daysInput.value = "";

  hideResults();
  clearError();
}

differenceButton.addEventListener(
  "click",
  calculateDifference
);

dateButton.addEventListener(
  "click",
  calculateNewDate
);

resetButton.addEventListener(
  "click",
  resetCalculator
);
