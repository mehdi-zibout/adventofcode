import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day2/document.txt", "utf8");

const MAX_RED = 12;
const MAX_GREEN = 13;
const MAX_BLUE = 14;

function parseInput(input) {
  return input.split("\n").map((line) =>
    line
      .split(":")[1]
      .split(";")
      .map((set) => {
        const colorsWithCount = set.split(",");
        let red = 0;
        let green = 0;
        let blue = 0;
        colorsWithCount.forEach((colorCount) => {
          if (colorCount.includes("red")) {
            red = Number(colorCount.slice(0, colorCount.indexOf("red")));
          }
          if (colorCount.includes("green")) {
            green = Number(colorCount.slice(0, colorCount.indexOf("green")));
          }
          if (colorCount.includes("blue")) {
            blue = Number(colorCount.slice(0, colorCount.indexOf("blue")));
          }
        });
        return { red, green, blue };
      })
  );
}

const parsedInput = parseInput(input);

/* --- PART 1 --- */

let possibleGamesIdsSum = 0;
parsedInput.forEach((game, index) => {
  let gameId = index + 1;
  game.forEach((set) => {
    if (set.red > MAX_RED || set.blue > MAX_BLUE || set.green > MAX_GREEN) {
      gameId = 0;
      return;
    }
  });
  possibleGamesIdsSum += gameId;
});

console.log(possibleGamesIdsSum);

/* --- PART 2 --- */

const answer = parsedInput
  .map((game) => {
    let minRed = 0;
    let minGreen = 0;
    let minBlue = 0;
    game.forEach((set) => {
      if (set.red > minRed) {
        minRed = set.red;
      }
      if (set.green > minGreen) {
        minGreen = set.green;
      }
      if (set.blue > minBlue) {
        minBlue = set.blue;
      }
    });
    return { minRed, minGreen, minBlue };
  })
  .map((game) => game.minRed * game.minGreen * game.minBlue)
  .reduce((p, c) => p + c, 0);

console.log(answer);
