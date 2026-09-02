import {
  calculateWeightedGPA,
  GRADE_POINTS
} from "./calculations.js";

const tbody = document.querySelector("#course-rows");
const error = document.querySelector("#error");
const result = document.querySelector("#result");

let rowId = 0;

function addCourseRow(
  courseName = "",
  units = "",
  grade = "A"
) {
  rowId++;

  const row = document.createElement("tr");
  row.dataset.id = rowId;

  const courseCell = document.createElement("td");
  const unitsCell = document.createElement("td");
  const gradeCell = document.createElement("td");
  const actionCell = document.createElement("td");

  const courseInput = document.createElement("input");
  courseInput.type = "text";
  courseInput.placeholder = "e.g. Mathematics";
  courseInput.value = courseName;
  courseInput.setAttribute(
    "aria-label",
    "Course name"
  );

  const unitsInput = document.createElement("input");
  unitsInput.type = "number";
  unitsInput.min = "0.1";
  unitsInput.step = "0.1";
  unitsInput.inputMode = "decimal";
  unitsInput.placeholder = "3";
  unitsInput.value = units;
  unitsInput.setAttribute(
    "aria-label",
    "Credit units"
  );

  const gradeSelect = document.createElement("select");
  gradeSelect.setAttribute(
    "aria-label",
    "Grade"
  );

  Object.keys(GRADE_POINTS).forEach(gradeName => {
    const option = document.createElement("option");

    option.value = gradeName;
    option.textContent =
      `${gradeName} (${GRADE_POINTS[gradeName]})`;

    if (gradeName === grade) {
      option.selected = true;
    }

    gradeSelect.appendChild(option);
  });

  const removeButton =
    document.createElement("button");

  removeButton.type = "button";
  removeButton.className =
    "button danger";

  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", () => {
    row.remove();
    clearMessages();
  });

  courseCell.appendChild(courseInput);
  unitsCell.appendChild(unitsInput);
  gradeCell.appendChild(gradeSelect);
  actionCell.appendChild(removeButton);

  row.append(
    courseCell,
    unitsCell,
    gradeCell,
    actionCell
  );

  tbody.appendChild(row);
}

function clearMessages() {
  error.hidden = true;
  error.textContent = "";

  result.hidden = true;
}

function resetCalculator() {
  tbody.replaceChildren();

  addCourseRow();
  addCourseRow();

  clearMessages();

  document.querySelector("#gpa-value")
    .textContent = "0.00";

  document.querySelector("#unit-summary")
    .textContent = "";
}

function calculateGPA() {
  try {
    const rows = [...tbody.rows];

    if (rows.length === 0) {
      throw new Error(
        "Add at least one course."
      );
    }

    const courses = rows.map(row => {
      const courseName =
        row.cells[0]
          .querySelector("input")
          .value.trim();

      const units =
        row.cells[1]
          .querySelector("input")
          .value;

      const grade =
        row.cells[2]
          .querySelector("select")
          .value;

      if (!courseName) {
        throw new Error(
          "Please enter a course name for every course."
        );
      }

      return {
        name: courseName,
        units,
        grade
      };
    });

    const calculation =
      calculateWeightedGPA(courses);

    document.querySelector("#gpa-value")
      .textContent =
      calculation.gpa.toFixed(2);

    document.querySelector("#unit-summary")
      .textContent =
      `Total credit units: ${calculation.totalUnits}`;

    result.hidden = false;
    error.hidden = true;
    error.textContent = "";

  } catch (err) {
    error.textContent =
      err.message ||
      "Something went wrong.";

    error.hidden = false;
    result.hidden = true;
  }
}

document
  .querySelector("#add-course")
  .addEventListener(
    "click",
    () => addCourseRow()
  );

document
  .querySelector("#calculate")
  .addEventListener(
    "click",
    calculateGPA
  );

document
  .querySelector("#reset")
  .addEventListener(
    "click",
    resetCalculator
  );

resetCalculator();
