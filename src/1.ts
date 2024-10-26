import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(
  path.resolve(__dirname, "../data/1.txt"),
  "utf-8"
);

function getAllAmounts(list: string) {
  const elves = list.split(/\n\s*\n/);

  const amounts = elves.map((elf) => {
    const amountsPerElf = elf.split("\n");
    return amountsPerElf.reduce((total, amount) => total + Number(amount), 0);
  });

  return amounts;
}

export function getBiggestAmount(list: string) {
  const amounts = getAllAmounts(list);

  const highestAmount = Math.max(...amounts);
  return highestAmount;
}
console.log(getBiggestAmount(input));

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
