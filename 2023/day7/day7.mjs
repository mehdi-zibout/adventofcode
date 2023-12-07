import { promises as fs } from "fs";

const input = await fs.readFile("./2023/day7/document.txt", "utf8");

function handCards(hand) {
  const cards = {};
  for (let i = 0; i < hand.length; i++) {
    cards[hand[i]] = (cards?.[hand[i]] ?? 0) + 1;
  }
  return cards;
}

function parseInput(input) {
  return input.split("\n").map((line) => {
    const [hand, bid] = line.split(" ");
    return { hand, cards: handCards(hand.split("")), bid: Number(bid) };
  });
}

const parsedInput = parseInput(input);

function compareEqualSizeHands(x, y) {
  if (cardValue(x[0]) === cardValue(y[0]) && x.length > 0) {
    return compareEqualSizeHands(x.slice(1, x.length), y.slice(1, x.length));
  } else {
    return cardValue(x[0]) - cardValue(y[0]);
  }
}

function cardValue(card) {
  switch (card) {
    case "2":
      return 0;
    case "3":
      return 1;
    case "4":
      return 2;
    case "5":
      return 3;
    case "6":
      return 4;
    case "7":
      return 5;
    case "8":
      return 6;
    case "9":
      return 7;
    case "T":
      return 8;
    case "J":
      return -1;
    case "Q":
      return 10;
    case "K":
      return 11;
    case "A":
      return 12;
  }
}

const sorted = parsedInput.sort((x, y) => {
  const xDistinctCardsCount = Object.values(x.cards).sort((a, b) => b - a);
  const yDistinctCardsCount = Object.values(y.cards).sort((a, b) => b - a);
  const result = compareHands(xDistinctCardsCount, yDistinctCardsCount);
  return result === "equal" ? compareEqualSizeHands(x.hand, y.hand) : result;
});

let winnings = 0;
sorted.forEach((hand, index) => {
  winnings += hand.bid * (index + 1);
});

console.log(winnings);

function compareHands(x, y) {
  if (x.length === 0) {
    return "equal";
  }
  if (x[0] === y[0]) {
    return compareHands(x.slice(1, x.length), y.slice(1, y.length));
  }
  return x[0] - y[0];
}
