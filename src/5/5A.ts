import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

const crateIndexMap: Record<number, number> = {
  1: 0,
  5: 1,
  9: 2,
  13: 3,
  17: 4,
  21: 5,
  25: 6,
  29: 7,
  33: 8,
};

function getNewTopCrates(input: string) {
  const [startingStacksRawString, procedureRawString] = input.split(/\n\s*\n/);

  const stackLines = startingStacksRawString.split(/\n/);

  const startingStacks = new Array(9);

  for (let i = 0; i < stackLines.length - 1; i++) {
    const crates = stackLines[i].match(/[A-Z]/g);
    if (crates) {
      for (const crate of crates) {
        const crateIndex = stackLines[i].indexOf(crate);
        if (crateIndex in crateIndexMap) {
          startingStacks[crateIndexMap[crateIndex]] = crate;
        } else {
          throw new Error(
            `Crate at index ${crateIndex} not found in crateIndexMap`
          );
        }
      }
    }
  }

  return stackLines;
}
console.log(getNewTopCrates(input));
