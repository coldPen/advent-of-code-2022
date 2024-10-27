import * as fs from "fs";
import * as path from "path";
import {} from "./1A";
import { getAllAmounts } from "./getAllAmounts";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

export function getTopThreeElvesAmount(list: string) {
  const amounts = getAllAmounts(list);

  const threeHighestAmounts: Array<number> = [];
  for (let i = 0; i < 3; i++) {
    const highestAmount = amounts.splice(
      amounts.indexOf(Math.max(...amounts)),
      1
    );
    threeHighestAmounts.push(...highestAmount);
  }

  let total = 0;
  threeHighestAmounts.forEach((amount) => {
    total += amount;
  });

  return total;
}
console.log(getTopThreeElvesAmount(input));
