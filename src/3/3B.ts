import * as fs from "fs";
import * as path from "path";
import { getItemPriority } from "./getItemPriority";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

function getSumOfPrioritiesOfCommonItems(input: string) {
  const rucksacks = input.split(/\n/);

  const groups: Array<Array<string>> = [[]];

  for (const rucksack of rucksacks) {
    const lastGroup = groups[groups.length - 1];
    if (lastGroup.length < 3) {
      lastGroup.push(rucksack);
    } else {
      groups.push([rucksack]);
    }
  }

  const listOfCommonItems: Array<string> = [];

  for (const group of groups) {
    const commonItems = group
      .map((line) => new Set(line))
      .reduce(
        (accumulator, backpack) =>
          new Set([...accumulator].filter((item) => backpack.has(item)))
      );
    if (commonItems.size > 1)
      throw new Error("Too many common items between backpacks");

    const item = commonItems.values().next().value;
    if (item === undefined) throw new Error("No common item found");

    listOfCommonItems.push(item);
  }

  const sum = listOfCommonItems.reduce(
    (total, item) => total + getItemPriority(item),
    0
  );

  return sum;
}

console.log(getSumOfPrioritiesOfCommonItems(input));
