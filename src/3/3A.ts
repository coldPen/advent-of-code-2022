import * as fs from "fs";
import * as path from "path";
import { getItemPriority } from "./getItemPriority";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

function getSumOfPrioritiesOfMisplacedItems(input: string) {
  const rucksacks = input.split(/\n/).map((rucksack) => {
    const amountOfItems = rucksack.length;

    if (amountOfItems % 2)
      throw new Error(
        "amountOfItems is odd and can't be divided by two compartments"
      );

    const firstCompartmentContent = rucksack.slice(0, amountOfItems / 2);

    const secondCompartmentContent = rucksack.slice(amountOfItems / 2);

    return [firstCompartmentContent, secondCompartmentContent];
  });

  let sum = 0;

  for (const [firstCompartment, secondCompartment] of rucksacks) {
    const misplacedItem = Array.from(firstCompartment).find((item) =>
      secondCompartment.includes(item)
    );

    if (misplacedItem === undefined) {
      throw new Error("No misplaced item found");
    }

    sum += getItemPriority(misplacedItem);
  }

  return sum;
}

console.log(getSumOfPrioritiesOfMisplacedItems(input));
