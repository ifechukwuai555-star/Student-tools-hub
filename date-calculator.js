
const startDateInput = document.getElementById("start-date");
const endDateInput = document.getElementById("end-date");
const calculateDifferenceButton =
  document.getElementById("calculate-difference");

const differenceResult =
  document.getElementById("difference-result");
const differenceValue =
  document.getElementById("difference-value");

const baseDateInput =
  document.getElementById("base-date");
const daysInput =
  document.getElementById("days");
const calculateDateButton =
  document.getElementById("calculate-date");

const dateResult =
  document.getElementById("date-result");
const newDateElement =
  document.getElementById("new-date");

const errorBox =
  document.getElementById("error");

const resetButton =
  document.getElementById("reset");


function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}


function clearError() {
  errorBox.textContent = "";
  errorBox.hidden = true;
}


/*
  Parse a date as UTC.

  Using UTC avoids problems caused by daylight-saving
  time when calculating the number of days between dates.
*/
function parseDate(value) {

  const parts = value.split("-").map(Number);

  if (parts.length !== 3) {
    return null;
  }

  const [year, month, day] = parts;

  const date = new Date(
    Date.UTC(year, month - 1, day)
  );

  /*
    Make sure the date is actually valid.
    This prevents dates such as 2026-02-31 from
    being silently converted into another date.
  */
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return date;
}


function formatDate(date) {

  return new Intl.DateTimeFormat(
    undefined,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC"
    }
  ).format(date);

}


/* -------------------------------
   DIFFERENCE BETWEEN DATES
-------------------------------- */

calculateDifferenceButton.addEventListener(
  "click",
  () => {

    clearError();

    differenceResult.hidden = true;

    if (
      !startDateInput.value ||
      !endDateInput.value
    ) {
      showError(
        "Please enter both the start date and end date."
      );

      return;
    }

    const startDate =
      parseDate(startDateInput.value);

    const endDate =
      parseDate(endDateInput.value);

    if (!startDate || !endDate) {

      showError(
        "Please enter valid dates."
      );

      return;
    }

    const millisecondsPerDay =
      24 * 60 * 60 * 1000;

    const difference =
      Math.abs(
        endDate.getTime() -
        startDate.getTime()
      ) / millisecondsPerDay;

    differenceValue.textContent =
      Math.round(difference);

    differenceResult.hidden = false;

  }
);


/* -------------------------------
   ADD / SUBTRACT DAYS
-------------------------------- */

calculateDateButton.addEventListener(
  "click",
  () => {

    clearError();

    dateResult.hidden = true;

    if (!baseDateInput.value) {

      showError(
        "Please enter a starting date."
      );

      return;
    }

    if (daysInput.value.trim() === "") {

      showError(
        "Please enter the number of days."
      );

      return;
    }

    const days =
      Number(daysInput.value);

    if (!Number.isInteger(days)) {

      showError(
        "Please enter a whole number of days."
      );

      return;
    }

    const date =
      parseDate(baseDateInput.value);

    if (!date) {

      showError(
        "Please enter a valid starting date."
      );

      return;
    }

    /*
      Add or subtract days using UTC.
      This correctly handles:
      - Different month lengths
      - Leap years
      - Moving across years
    */
    date.setUTCDate(
      date.getUTCDate() + days
    );

    newDateElement.textContent =
      formatDate(date);

    dateResult.hidden = false;

  }
);


/* -------------------------------
   RESET
-------------------------------- */

resetButton.addEventListener(
  "click",
  () => {

    startDateInput.value = "";
    endDateInput.value = "";

    baseDateInput.value = "";
    daysInput.value = "";

    differenceValue.textContent = "0";
    newDateElement.textContent = "—";

    differenceResult.hidden = true;
    dateResult.hidden = true;

    clearError();

  }
);
