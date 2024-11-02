import * as fs from "fs";
import * as path from "path";
import { getPairs } from "./getPairs";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

function getNumberOfPairsWithFullContainment(input: string) {
  const pairs = getPairs(input);

  let count = 0;

  for (const [[start1, end1], [start2, end2]] of pairs) {
    if (
      (start1 >= start2 && end1 <= end2) ||
      (start2 >= start1 && end2 <= end1)
    ) {
      count += 1;
    }
  }

  return count;
}
console.log(getNumberOfPairsWithFullContainment(input));
