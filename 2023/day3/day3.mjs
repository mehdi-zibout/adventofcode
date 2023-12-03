import { promises as fs } from "fs";
const input = await fs.readFile("./2023/day3/document.txt", "utf8");
const parsedInput = input
  .split("\n")
  .map((line) => line.split("").map((char) => char));

function isSymbol(char) {
  return char && isNaN(Number(char)) && char !== ".";
}

function isNumber(char) {
  return !isNaN(Number(char));
}

function isPartNumber(columnIndex, startIndex, endIndex) {
  for (let i = startIndex - 1; i < endIndex + 1; i++) {
    if (
      isSymbol(parsedInput?.[columnIndex]?.[i]) ||
      isSymbol(parsedInput?.[columnIndex + 1]?.[i]) ||
      isSymbol(parsedInput?.[columnIndex - 1]?.[i])
    ) {
      return true;
    }
  }
}

/** --- Part One --- **/

let sum = 0;
parsedInput.forEach((column, columnIndex) => {
  let numberStartIndex;
  let numberEndIndex;
  column.forEach((cell, index) => {
    if (isNumber(cell)) {
      if (numberStartIndex === undefined) {
        numberStartIndex = index;
      }
      if (index === column.length - 1) {
        numberEndIndex = column.length;
      }
    } else if (numberStartIndex !== undefined) {
      numberEndIndex = index;
    }

    if (numberEndIndex !== undefined) {
      if (isPartNumber(columnIndex, numberStartIndex, numberEndIndex)) {
        sum += Number(
          parsedInput[columnIndex]
            .slice(numberStartIndex, numberEndIndex)
            .join("")
        );
      }
      numberStartIndex = undefined;
      numberEndIndex = undefined;
    }
  });
});

console.log(sum);

/** --- Part Two --- **/

sum = 0;

function getNumber(i, j) {
  let rowIndex = j;
  let startIndex;
  let endIndex;
  while (rowIndex > 0) {
    rowIndex--;
    if (!isNumber(parsedInput[i][rowIndex])) {
      startIndex = rowIndex + 1;
      break;
    }
  }
  while (rowIndex < parsedInput[i].length) {
    rowIndex++;
    if (!isNumber(parsedInput[i][rowIndex])) {
      endIndex = rowIndex;
      break;
    }
  }
  if (endIndex === undefined) {
    endIndex = parsedInput[i].length - 1;
  }
  if (startIndex === undefined) {
    startIndex = 0;
  }

  return {
    number: Number(parsedInput[i].slice(startIndex, endIndex).join("")),
    name: `${i}:${startIndex}-${endIndex}`,
  };
}

function findAdjacentNumbers(columnIndex, rowIndex) {
  const numbers = {};
  for (let i = columnIndex - 1; i <= columnIndex + 1; i++) {
    for (let j = rowIndex - 1; j <= rowIndex + 1; j++) {
      if (isNumber(parsedInput[i][j])) {
        const { name, number } = getNumber(i, j);
        numbers[name] = number;
      }
    }
  }
  const values = Object.values(numbers);
  if (values.length === 2) {
    return [values[0], values[1]];
  } else {
    return [0, 0];
  }
}

parsedInput.forEach((column, columnIndex) => {
  column.forEach((cell, index) => {
    if (!isSymbol(cell)) {
      return;
    }
    const [n1, n2] = findAdjacentNumbers(columnIndex, index);
    sum += n1 * n2;
  });
});

console.log(sum);
