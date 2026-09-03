const scoreInput = document.getElementById("score");
const calculateButton = document.getElementById("calculate-grade");

const resultBox = document.getElementById("grade-result");
const gradeValue = document.getElementById("grade-value");
const gradePoint = document.getElementById("grade-point");

const errorBox = document.getElementById("error");
const resetScaleButton = document.getElementById("reset-scale");

const scaleInputs = [
  ...document.querySelectorAll(".min-score")
];

const DEFAULT_SCALE = {
  A: 70,
  B: 60,
  C: 50,
  D: 45,
  E: 40,
  F: 0
};

const GRADE_POINTS = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0
};

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  resultBox.hidden = true;
}

function clearError() {
  errorBox.textContent = "";
  errorBox.hidden = true;
}

function getScale() {
  const scale = {};

  for (const input of scaleInputs) {
    const grade = input.dataset.grade;
    const value = input.value.trim();

    if (value === "") {
      throw new Error(
        `Please enter a minimum score for grade ${grade}.`
      );
    }

    const minimum = Number(value);

    if (
      !Number.isFinite(minimum) ||
      minimum < 0 ||
      minimum > 100
    ) {
      throw new Error(
        `The minimum score for grade ${grade} must be between 0 and 100.`
      );
    }

    scale[grade] = minimum;
  }

  const grades = Object.keys(scale);

  for (let i = 0; i < grades.length; i++) {
    for (let j = i + 1; j < grades.length; j++) {
      if (scale[grades[i]] === scale[grades[j]]) {
        throw new Error(
          `Grades ${grades[i]} and ${grades[j]} cannot have the same minimum score.`
        );
      }
    }
  }

  if (scale.F !== 0) {
    throw new Error(
      "Grade F must have a minimum score of 0."
    );
  }

  const orderedGrades = [...grades].sort(
    (a, b) => scale[b] - scale[a]
  );

  for (let i = 0; i < orderedGrades.length - 1; i++) {
    if (
      scale[orderedGrades[i]] <=
      scale[orderedGrades[i + 1]]
    ) {
      throw new Error(
        "Each higher grade must have a higher minimum score."
      );
    }
  }

  return scale;
}

function calculateGrade() {
  clearError();
  resultBox.hidden = true;

  if (scoreInput.value.trim() === "") {
    showError("Please enter your score.");
    return;
  }

  const score = Number(scoreInput.value);

  if (!Number.isFinite(score)) {
    showError("Please enter a valid number.");
    return;
  }

  if (score < 0 || score > 100) {
    showError("Score must be between 0 and 100.");
    return;
  }

  let scale;

  try {
    scale = getScale();
  } catch (error) {
    showError(error.message);
    return;
  }

  const orderedGrades = Object.keys(scale).sort(
    (a, b) => scale[b] - scale[a]
  );

  let earnedGrade = "F";

  for (const grade of orderedGrades) {
    if (score >= scale[grade]) {
      earnedGrade = grade;
      break;
    }
  }

  gradeValue.textContent = earnedGrade;

  gradePoint.textContent =
    `Grade point: ${GRADE_POINTS[earnedGrade]} • Score: ${score}%`;

  resultBox.hidden = false;
}

function resetScale() {
  for (const input of scaleInputs) {
    const grade = input.dataset.grade;

    input.value = DEFAULT_SCALE[grade];
  }

  clearError();
  resultBox.hidden = true;
  scoreInput.value = "";
  gradeValue.textContent = "—";
  gradePoint.textContent = "";
}

calculateButton.addEventListener(
  "click",
  calculateGrade
);

resetScaleButton.addEventListener(
  "click",
  resetScale
);

scoreInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    calculateGrade();
  }
});

resetScale();
