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

function getNewTopCrates(input: string) {
  const [startingStacksRawString, procedureRawString] = input.split(/\n\s*\n/);

  const stackLines = startingStacksRawString.split(/\n/);

  const labels = stackLines.pop()?.trim().split(/\s*/);
  if (labels === undefined) throw new Error("empty stackLines array");

  const startingStacks: Array<Array<string>> = new Array(labels.length)
    .fill(null)
    .map(() => []);

  const crateIndexToStackMap = createCrateIndexToStackMap(labels.length);

  for (let i = stackLines.length - 1; i >= 0; i--) {
    const crates = stackLines[i].match(/[A-Z]/g);

    if (crates) {
      for (let j = 0; j < crates.length; j++) {
        const crateIndex = stackLines[i].indexOf(crates[j]); // Fix that, indexOf gets the first matching char it finds

        if (crateIndex in crateIndexToStackMap) {
          startingStacks[crateIndexToStackMap[crateIndex]].push(crates[j]);
        } else {
          throw new Error(
            `Crate at index ${crateIndex} not found in crateIndexMap`
          );
        }
      }
    }
  }

  return startingStacks;
}
console.log(getNewTopCrates(input));
