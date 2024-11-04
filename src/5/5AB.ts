import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

const crateIdRegEx = /[A-Z]/;
const instructionRegEx = /move\s+(\d+)\s+from\s+(\d+)\s+to\s+(\d+)/;

function getNewTopCrates(input: string, crateMover: "9000" | "9001" = "9000") {
  const [stacksRawString, procedureRawString] = input.split(/\n\s*\n/);

  const stacks = parseStacks(stacksRawString);

  const procedure = parseProcedure(procedureRawString);

  for (const { amount, from, to } of procedure) {
    const cratesToMove = stacks[from - 1].splice(-amount);

    if (crateMover === "9000") {
      cratesToMove.reverse();
    }

    stacks[to - 1].push(...cratesToMove);
  }

  const topCrates = stacks.map((stack) => stack[stack.length - 1]).join("");

  return topCrates;
}
console.log(getNewTopCrates(input));

function parseStacks(input: string) {
  const stackLines = input.split(/\n/);

  const labels = stackLines.pop()?.trim().split(/\s*/);
  if (labels === undefined) throw new Error("Empty stackLines array");

  const startingStacks: Array<Array<string>> = new Array(labels.length)
    .fill(null)
    .map(() => []);

  const crateIndexToStackMap = getCratePositionMap(labels.length);

  for (let i = stackLines.length - 1; i >= 0; i--) {
    for (let j = 0; j < stackLines[i].length; j++) {
      if (crateIdRegEx.test(stackLines[i][j])) {
        if (crateIndexToStackMap[j] !== undefined) {
          startingStacks[crateIndexToStackMap[j]].push(stackLines[i][j]);
        } else {
          throw new Error(
            `Missing index "${j}" for crate "${stackLines[i][j]}" in crateIndexToStackMap`
          );
        }
      }
    }
  }

  return startingStacks;
}

function getCratePositionMap(length: number) {
  const map: Record<number, number> = {};
  for (let i = 0; i < length; i++) {
    map[1 + 4 * i] = i;
  }
  return map;
}

function parseProcedure(input: string) {
  const procedure = input.split(/\n/).map((line) => {
    const result = line.match(instructionRegEx);
    if (result === null)
      throw new Error(
        `"${line}" doesn't match the expected instruction format.`
      );
    const [, amount, from, to] = result;
    return {
      amount: parseInt(amount),
      from: parseInt(from),
      to: parseInt(to),
    };
  });
  return procedure;
}
