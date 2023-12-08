import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day8/document.txt", "utf8");

function parseInput(input) {
  const [instructions, mapsArray] = input.split("\n\n");
  const maps = {};
  mapsArray.split("\n").forEach((map) => {
    const [key, value] = map.split(" = ");
    maps[key] = {
      L: value.split(", ")[0].slice(1),
      R: value.split(", ")[1].slice(0, 3),
    };
  });
  return {
    instructions: instructions.split(""),
    maps,
  };
}

const parsedInput = parseInput(input);

let stepsNumber = 0;

let currentPosition = "AAA";
let instructions = parsedInput.instructions.slice(0);

while (currentPosition !== "ZZZ") {
  stepsNumber++;
  if (instructions.length === 0) {
    instructions = parsedInput.instructions.slice(0);
  }
  const instruction = instructions.splice(0, 1)[0];
  currentPosition = parsedInput.maps[currentPosition][instruction];
}

console.log(stepsNumber);
