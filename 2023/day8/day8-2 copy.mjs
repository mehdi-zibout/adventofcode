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

const keysAfterCycle = {};
Object.keys(parsedInput.maps).forEach((key) => {
  let newKey = key;
  for (let i = 0; i < parsedInput.instructions.length; i++) {
    newKey = parsedInput.maps[newKey][parsedInput.instructions[i]];
  }
  keysAfterCycle[key] = newKey;
});

console.log(keysAfterCycle);
