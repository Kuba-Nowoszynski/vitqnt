const calculateVitaminIntake = require("./calculateVitaminIntake");

const vitaminNames = [
  "c",
  "b1",
  "b2",
  "b3",
  "b5",
  "b6",
  "b7",
  "b9",
  "b12",
  "a",
  "d",
  "e",
  "k",
];

function setVitaminIntake(sex, age) {
  return vitaminNames.map((vitamin) => ({
    name: vitamin,
    amount: calculateVitaminIntake(vitamin, sex, age),
  }));
}

module.exports = setVitaminIntake;
