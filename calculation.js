export const GRADE_POINTS = Object.freeze({
  A: 5,
  B: 4,
  C: 3,
  D: 2,
  E: 1,
  F: 0
});

export function calculateWeightedGPA(courses) {
  if (!Array.isArray(courses) || courses.length === 0) {
    throw new Error("Add at least one course.");
  }

  let totalUnits = 0;
  let totalPoints = 0;

  for (const course of courses) {
    const units = Number(course.units);
    const grade = String(course.grade || "").toUpperCase();

    if (!Number.isFinite(units) || units <= 0) {
      throw new Error("Credit units must be greater than 0.");
    }

    if (!(grade in GRADE_POINTS)) {
      throw new Error("Select a valid grade.");
    }

    totalUnits += units;
    totalPoints += units * GRADE_POINTS[grade];
  }

  if (totalUnits <= 0) {
    throw new Error("Total credit units must be greater than 0.");
  }

  return {
    gpa: totalPoints / totalUnits,
    totalUnits,
    totalPoints
  };
}

export function calculateBasicPercentage(value, total) {
  value = Number(value);
  total = Number(total);

  if (
    !Number.isFinite(value) ||
    !Number.isFinite(total) ||
    total === 0
  ) {
    throw new Error(
      "Enter valid numbers and make sure the total is not zero."
    );
  }

  return (value / total) * 100;
}

export function calculatePercentageOfValue(percent, value) {
  percent = Number(percent);
  value = Number(value);

  if (!Number.isFinite(percent) || !Number.isFinite(value)) {
    throw new Error("Enter valid numbers.");
  }

  return (percent / 100) * value;
}

export function calculatePercentageChange(oldValue, newValue) {
  oldValue = Number(oldValue);
  newValue = Number(newValue);

  if (
    !Number.isFinite(oldValue) ||
    !Number.isFinite(newValue) ||
    oldValue === 0
  ) {
    throw new Error(
      "The original value must be a valid non-zero number."
    );
  }

  return (
    ((newValue - oldValue) / Math.abs(oldValue)) *
    100
  );
}

export function validateGradingScale(scale) {
  if (!Array.isArray(scale) || scale.length === 0) {
    throw new Error("Add at least one grade.");
  }

  const labels = new Set();
  const thresholds = [];

  for (const item of scale) {
    const label = String(item.label || "").trim();
    const min = Number(item.min);

    if (!label || labels.has(label)) {
      throw new Error(
        "Grade labels must be unique and non-empty."
      );
    }

    if (!Number.isFinite(min) || min < 0 || min > 100) {
      throw new Error(
        "Minimum scores must be between 0 and 100."
      );
    }

    labels.add(label);
    thresholds.push({
      label,
      min
    });
  }

  thresholds.sort((a, b) => b.min - a.min);

  for (let i = 1; i < thresholds.length; i++) {
    if (thresholds[i].min === thresholds[i - 1].min) {
      throw new Error(
        "Two grades cannot have the same minimum score."
      );
    }
  }

  return thresholds;
}

export function getGradeForScore(score, scale) {
  score = Number(score);

  if (
    !Number.isFinite(score) ||
    score < 0 ||
    score > 100
  ) {
    throw new Error(
      "Score must be between 0 and 100."
    );
  }

  const thresholds = validateGradingScale(scale);

  const match = thresholds.find(
    item => score >= item.min
  );

  if (!match) {
    throw new Error(
      "No grade covers this score. Add a grade with a minimum of 0."
    );
  }

  return match.label;
}

function utcDateOnly(value) {
  const date = new Date(`${value}T00:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    throw new Error("Enter a valid date.");
  }

  return date;
}

export function dateDifferenceDays(start, end) {
  const first = utcDateOnly(start);
  const second = utcDateOnly(end);

  return Math.round(
    (second - first) / 86400000
  );
}

export function addDays(dateString, days) {
  const date = utcDateOnly(dateString);
  const numberOfDays = Number(days);

  if (!Number.isInteger(numberOfDays)) {
    throw new Error("Days must be a whole number.");
  }

  date.setUTCDate(
    date.getUTCDate() + numberOfDays
  );

  return date.toISOString().slice(0, 10);
}

export function countdownParts(
  targetMs,
  nowMs = Date.now()
) {
  const difference = Math.max(
    0,
    Number(targetMs) - Number(nowMs)
  );

  const totalSeconds = Math.floor(
    difference / 1000
  );

  return {
    totalMs: difference,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor(
      (totalSeconds % 86400) / 3600
    ),
    minutes: Math.floor(
      (totalSeconds % 3600) / 60
    ),
    seconds: totalSeconds % 60,
    past: Number(targetMs) <= Number(nowMs)
  };
}
