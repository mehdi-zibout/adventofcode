import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day4/document.txt", "utf8");

function parseInput(input) {
  return input.split("\n").map((game) => {
    const [winning, mine] = game.split("|");
    return {
      winningNumbers: winning
        .split(":")[1]
        .trim()
        .split(/\s+/)
        .map((x) => Number(x)),
      myNumbers: mine
        .trim()
        .split(/\s+/)
        .map((x) => Number(x)),
    };
  });
}

const parsedInput = parseInput(input);

/* --- PART 1 --- */

let sum = 0;
parsedInput.forEach((game) => {
  let winningNumbersNumber = 0;
  game.myNumbers.forEach((number) => {
    if (game.winningNumbers.includes(number)) {
      winningNumbersNumber++;
    }
  });
  sum += Math.floor(Math.pow(2, winningNumbersNumber - 1));
});

console.log(sum);

/* --- PART 2 --- */

let instancesCount = parsedInput.map(() => 1);
parsedInput.forEach((game, i) => {
  let winningNumbersNumber = 0;
  game.myNumbers.forEach((number) => {
    if (game.winningNumbers.includes(number)) {
      winningNumbersNumber++;
    }
  });
  while (winningNumbersNumber > 0) {
    instancesCount[i + winningNumbersNumber] += instancesCount[i];
    winningNumbersNumber--;
  }
});

console.log(instancesCount.reduce((a, c) => a + c, 0));
