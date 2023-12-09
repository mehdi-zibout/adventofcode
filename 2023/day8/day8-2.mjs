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

let currentPositions = Object.keys(parsedInput.maps).filter(
  (map) => map[2] === "A"
);

let instructions = parsedInput.instructions.slice(0);

while (currentPositions.filter((position) => position[2] !== "Z").length > 0) {
  stepsNumber++;
  if (instructions.length === 0) {
    instructions = parsedInput.instructions.slice(0);
  }
  const instruction = instructions.splice(0, 1)[0];
  currentPositions = currentPositions.map(
    (currentPosition) => parsedInput.maps[currentPosition][instruction]
  );
}
console.log(stepsNumber);
