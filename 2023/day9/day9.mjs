import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day9/document.txt", "utf8");

const sequences = input
  .split("\n")
  .map((sequence) => sequence.split(" ").map((x) => Number(x)));

/* --- PART 1 --- */

function generateNextLine(sequence) {
  const line = [];
  for (let i = 0; i < sequence.length - 1; i++) {
    line.push(sequence[i + 1] - sequence[i]);
  }
  return line;
}

function generateDifferences(sequence) {
  const differences = [sequence];
  let line = sequence;
  while (!isAllZeros(line)) {
    const nextLine = generateNextLine(line);
    differences.push(nextLine);
    line = nextLine;
  }
  addPlaceholders(differences);
  return differences;
}

function isAllZeros(line) {
  return line.every((number) => number === 0);
}

function addPlaceholders(differences) {
  for (let index = differences.length - 2; index >= 0; index--) {
    const line = differences[index];
    const nextLine = differences?.[index + 1] ?? [0];
    line.push(line[line.length - 1] + nextLine[nextLine.length - 1]);
  }
}

let sum = 0;
sequences.forEach((sequence) => {
  const differences = generateDifferences(sequence);
  sum += differences[0][differences[0].length - 1];
});

console.log(sum);
