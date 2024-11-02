import * as fs from "fs";
import * as path from "path";
import { getPairs } from "./getPairs";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

function getNumberOfPairsWithOverlap(input: string) {
  const pairs = getPairs(input);

  let count = 0;

  for (const [[start1, end1], [start2, end2]] of pairs) {
    if (end1 >= start2 && start1 <= end2) {
      count += 1;
    }
  }

  return count;
}
console.log(getNumberOfPairsWithOverlap(input));
