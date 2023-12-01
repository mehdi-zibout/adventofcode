import { promises as fs } from "fs";

const calibrationDocument = await fs.readFile("./2023/document.txt", "utf8");

/* --- PART 1 --- */

function lineAnswer(line) {
  const numbers = [];
  line.split("").forEach((char) => {
    if (!isNaN(Number(char))) {
      numbers.push(Number(char));
    }
  });
  const number = numbers[0] * 10 + numbers[numbers.length - 1];
  return number;
}
function part1Answer(document) {
  return document
    .split("\n")
    .map((line) => lineAnswer(line))
    .reduce((p, c) => p + c, 0);
}

console.log(part1Answer(calibrationDocument));

/* --- PART 2 --- */
const digits = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function digitToNumber(digit) {
  switch (digit) {
    case "one":
      return "o1e";
    case "two":
      return "t2o";
    case "three":
      return "t3e";
    case "four":
      return "f4r";
    case "five":
      return "f5e";
    case "six":
      return "s6x";
    case "seven":
      return "s7n";
    case "eight":
      return "e8t";
    case "nine":
      return "n9e";
  }
}

function replaceLineDigitsByNumber(line) {
  let newLine = line;
  const indices = [];
  digits.forEach((digit) => {
    [...newLine.matchAll(digit)].forEach((a) => {
      indices.push({ index: a.index, digit });
    });
  });
  indices
    .filter((a) => a.index >= 0)
    .sort((a, b) => a.index - b.index)
    .forEach(({ digit }) => {
      newLine = newLine.replace(digit, digitToNumber(digit));
    });
  return newLine;
}

function replaceDigitsByNumber(document) {
  return document
    .split("\n")
    .map((line) => {
      return replaceLineDigitsByNumber(line);
    })
    .join("\n");
}

const newDocument = replaceDigitsByNumber(calibrationDocument);
console.log(part1Answer(newDocument));
