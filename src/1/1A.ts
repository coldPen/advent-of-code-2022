import * as fs from "fs";
import * as path from "path";
import { getAllAmounts } from "./getAllAmounts";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

export function getBiggestAmount(list: string) {
  const amounts = getAllAmounts(list);

  const highestAmount = Math.max(...amounts);
  return highestAmount;
}
console.log(getBiggestAmount(input));
