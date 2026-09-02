import assert from "node:assert/strict";

import {
  calculateWeightedGPA,
  calculateBasicPercentage,
  calculatePercentageOfValue,
  calculatePercentageChange,
  getGradeForScore,
  dateDifferenceDays,
  addDays,
  countdownParts
} from "../js/calculations.js";


// CGPA / GPA
const gpa = calculateWeightedGPA([
  { units: 3, grade: "A" },
  { units: 2, grade: "B" },
  { units: 1, grade: "C" }
]);

assert.equal(gpa.totalUnits, 6);
assert.equal(gpa.totalPoints, 25);
assert.equal(Number(gpa.gpa.toFixed(4)), 4.1667);


// Percentage
assert.equal(
  calculateBasicPercentage(45, 60),
  75
);

assert.equal(
  calculatePercentageOfValue(20, 500),
  100
);

assert.equal(
  calculatePercentageChange(100, 120),
  20
);

assert.equal(
  calculatePercentageChange(100, 80),
  -20
);


// Grade
const scale = [
  { label: "A", min: 70 },
  { label: "B", min: 60 },
  { label: "C", min: 50 },
  { label: "D", min: 45 },
  { label: "E", min: 40 },
  { label: "F", min: 0 }
];

assert.equal(
  getGradeForScore(85, scale),
  "A"
);

assert.equal(
  getGradeForScore(62, scale),
  "B"
);

assert.equal(
  getGradeForScore(39, scale),
  "F"
);


// Date difference
assert.equal(
  dateDifferenceDays("2026-01-01", "2026-01-31"),
  30
);

assert.equal(
  dateDifferenceDays("2024-02-28", "2024-03-01"),
  2
);


// Add / subtract days
assert.equal(
  addDays("2026-01-01", 30),
  "2026-01-31"
);

assert.equal(
  addDays("2026-01-31", 1),
  "2026-02-01"
);

assert.equal(
  addDays("2026-03-01", -1),
  "2026-02-28"
);

assert.equal(
  addDays("2024-03-01", -1),
  "2024-02-29"
);


// Countdown
const countdown = countdownParts(
  100000,
  0
);

assert.equal(countdown.days, 1);
assert.equal(countdown.hours, 3);
assert.equal(countdown.minutes, 46);
assert.equal(countdown.seconds, 40);
assert.equal(countdown.past, false);

const pastCountdown = countdownParts(
  0,
  1000
);

assert.equal(pastCountdown.past, true);
assert.equal(pastCountdown.totalMs, 0);


console.log("✅ All Student Tools Hub calculation tests passed!");
