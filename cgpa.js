const courseList = document.getElementById("course-list");
const addCourseButton = document.getElementById("add-course");
const calculateButton = document.getElementById("calculate");
const resetButton = document.getElementById("reset");

const errorBox = document.getElementById("error");
const resultBox = document.getElementById("result");
const cgpaValue = document.getElementById("cgpa-value");
const unitSummary = document.getElementById("unit-summary");

const GRADE_POINTS = {
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0
};

let courseNumber = 0;

function createCourse() {
  courseNumber++;

  const course = document.createElement("div");
  course.className = "course-row";

  course.innerHTML = `
    <div class="form-group">
      <label>Course</label>
      <input
        type="text"
        class="course-name"
        placeholder="e.g. Mathematics"
      >
    </div>

    <div class="form-group">
      <label>Credit Units</label>
      <input
        type="number"
        class="course-units"
        min="1"
        step="1"
        inputmode="numeric"
        placeholder="3"
      >
    </div>

    <div class="form-group">
      <label>Grade</label>
      <select class="course-grade">
        <option value="A">A — 5</option>
        <option value="B">B — 4</option>
        <option value="C">C — 3</option>
        <option value="D">D — 2</option>
        <option value="E">E — 1</option>
        <option value="F">F — 0</option>
      </select>
    </div>

    <button
      type="button"
      class="button danger remove-course"
      aria-label="Remove course"
    >
      Remove
    </button>
  `;

  course.querySelector(".remove-course").addEventListener("click", () => {
    course.remove();
    clearResult();
  });

  courseList.appendChild(course);
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
  resultBox.hidden = true;
}

function clearResult() {
  errorBox.hidden = true;
  errorBox.textContent = "";
  resultBox.hidden = true;
}

function calculateCGPA() {
  clearResult();

  const courses = [...document.querySelectorAll(".course-row")];

  if (courses.length === 0) {
    showError("Please add at least one course.");
    return;
  }

  let totalUnits = 0;
  let totalQualityPoints = 0;

  for (let i = 0; i < courses.length; i++) {
    const name = courses[i]
      .querySelector(".course-name")
      .value
      .trim();

    const unitsValue = courses[i]
      .querySelector(".course-units")
      .value;

    const grade = courses[i]
      .querySelector(".course-grade")
      .value;

    if (!name) {
      showError(`Please enter the name for course ${i + 1}.`);
      return;
    }

    if (unitsValue === "") {
      showError(`Please enter the credit units for course ${i + 1}.`);
      return;
    }

    const units = Number(unitsValue);

    if (!Number.isFinite(units) || units <= 0) {
      showError(`Credit units for course ${i + 1} must be greater than 0.`);
      return;
    }

    if (!Number.isInteger(units)) {
      showError(`Credit units for course ${i + 1} must be a whole number.`);
      return;
    }

    totalUnits += units;
    totalQualityPoints += units * GRADE_POINTS[grade];
  }

  if (totalUnits <= 0) {
    showError("Total credit units must be greater than zero.");
    return;
  }

  const cgpa = totalQualityPoints / totalUnits;

  cgpaValue.textContent = cgpa.toFixed(2);
  unitSummary.textContent =
    `Total credit units: ${totalUnits} • Quality points: ${totalQualityPoints}`;

  resultBox.hidden = false;
}

function resetCalculator() {
  courseList.replaceChildren();

  courseNumber = 0;

  createCourse();
  createCourse();

  clearResult();

  cgpaValue.textContent = "0.00";
  unitSummary.textContent = "";
}

addCourseButton.addEventListener("click", createCourse);
calculateButton.addEventListener("click", calculateCGPA);
resetButton.addEventListener("click", resetCalculator);

resetCalculator();
