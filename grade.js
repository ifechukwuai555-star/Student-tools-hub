import {
  getGradeForScore
} from "./calculations.js";

const scoreInput =
  document.querySelector("#score");

const scaleRows =
  document.querySelector("#scale-rows");

const error =
  document.querySelector("#error");

const result =
  document.querySelector("#result");

const gradeResult =
  document.querySelector("#grade-result");

const scoreSummary =
  document.querySelector("#score-summary");

const DEFAULT_SCALE = [
  { label: "A", min: 70 },
  { label: "B", min: 60 },
  { label: "C", min: 50 },
  { label: "D", min: 45 },
  { label: "E", min: 40 },
  { label: "F", min: 0 }
];

function clearMessages() {
  error.hidden = true;
  error.textContent = "";

  result.hidden = true;
}

function addScaleRow(
  label = "",
  min = ""
) {
  const row =
    document.createElement("tr");

  const gradeCell =
    document.createElement("td");

  const minCell =
    document.createElement("td");

  const actionCell =
    document.createElement("td");

  const labelInput =
    document.createElement("input");

  labelInput.type = "text";
  labelInput.value = label;
  labelInput.placeholder = "A";
  labelInput.maxLength = 10;
  labelInput.setAttribute(
    "aria-label",
    "Grade label"
  );

  const minInput =
    document.createElement("input");

  minInput.type = "number";
  minInput.min = "0";
  minInput.max = "100";
  minInput.step = "any";
  minInput.inputMode = "decimal";
  minInput.value = min;
  minInput.placeholder = "70";
  minInput.setAttribute(
    "aria-label",
    "Minimum score"
  );

  const removeButton =
    document.createElement("button");

  removeButton.type = "button";
  removeButton.className =
    "button danger";

  removeButton.textContent =
    "Remove";

  removeButton.addEventListener(
    "click",
    () => {
      row.remove();
      clearMessages();
    }
  );

  gradeCell.appendChild(labelInput);
  minCell.appendChild(minInput);
  actionCell.appendChild(removeButton);

  row.append(
    gradeCell,
    minCell,
    actionCell
  );

  scaleRows.appendChild(row);
}

function loadDefaultScale() {
  scaleRows.replaceChildren();

  DEFAULT_SCALE.forEach(item => {
    addScaleRow(
      item.label,
      item.min
    );
  });

  clearMessages();
}

function readScale() {
  const rows =
    [...scaleRows.rows];

  return rows.map(row => ({
    label:
      row.cells[0]
        .querySelector("input")
        .value,

    min:
      row.cells[1]
        .querySelector("input")
        .value
  }));
}

function calculateGrade() {
  try {
    const score =
      scoreInput.value;

    if (score === "") {
      throw new Error(
        "Please enter a score."
      );
    }

    const scale =
      readScale();

    const grade =
      getGradeForScore(
        score,
        scale
      );

    gradeResult.textContent =
      grade;

    scoreSummary.textContent =
      `Score: ${Number(score).toFixed(2)} / 100`;

    result.hidden = false;

    error.hidden = true;
    error.textContent = "";

  } catch (err) {
    error.textContent =
      err.message ||
      "Unable to calculate the grade.";

    error.hidden = false;
    result.hidden = true;
  }
}

document
  .querySelector("#calculate")
  .addEventListener(
    "click",
    calculateGrade
  );

document
  .querySelector("#add-grade")
  .addEventListener(
    "click",
    () => {
      addScaleRow();
      clearMessages();
    }
  );

document
  .querySelector("#reset-scale")
  .addEventListener(
    "click",
    loadDefaultScale
  );

loadDefaultScale();
