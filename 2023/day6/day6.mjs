import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day6/document.txt", "utf8");

function parseInput(input) {
  const arr = input.split("\n").map((line) =>
    line
      .split(":")[1]
      .trim()
      .split(/\s+/)
      .map((number) => Number(number))
  );
  return arr[0].map((time, index) => ({ time, record: arr[1][index] }));
}

const parsedInput = parseInput(input);

console.log("--- Part 1 ---");

const waysToWinRace = parsedInput.map(() => 0);

parsedInput.forEach((race, index) => {
  for (let speed = 0; speed < race.time; speed++) {
    const distance = speed * (race.time - speed);
    if (distance > race.record) {
      waysToWinRace[index] += 1;
    }
  }
});

console.log(waysToWinRace.reduce((p, c) => p * c, 1));

console.log("--- Part 2 ---");

const duration = 46807866;
const record = 214117714021024;
let waysToWin = 0;
for (let speed = 0; speed < duration; speed++) {
  const distance = speed * (duration - speed);
  if (distance > record) {
    waysToWin += 1;
  }
}

console.log(waysToWin);
