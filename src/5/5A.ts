import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

function createCrateIndexToStackMap(length: number) {
  const map: Record<number, number> = {};
  for (let i = 0; i < length; i++) {
    map[1 + 4 * i] = i;
  }
  return map;
}

const crateIdRegEx = /[A-Z]/g;

function getNewTopCrates(input: string) {
  const [startingStacksRawString, procedureRawString] = input.split(/\n\s*\n/);

  const stackLines = startingStacksRawString.split(/\n/);

  const labels = stackLines.pop()?.trim().split(/\s*/);
  if (labels === undefined) throw new Error("Empty stackLines array");

  const startingStacks: Array<Array<string>> = new Array(labels.length)
    .fill(null)
    .map(() => []);

  const crateIndexToStackMap = createCrateIndexToStackMap(labels.length);

  for (let i = stackLines.length - 1; i >= 0; i--) {
    for (let j = 0; j < stackLines[i].length; j++) {
      if (crateIdRegEx.test(stackLines[i][j])) {
        if (j in crateIndexToStackMap) {
          startingStacks[crateIndexToStackMap[j]].push(stackLines[i][j]);
        } else {
          throw new Error(`Missing index "${j}" in crateIndexToStackMap`);
        }
      }
    }
  }

  return startingStacks;
}
console.log(getNewTopCrates(input));
