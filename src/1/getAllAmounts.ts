export function getAllAmounts(list: string) {
  const elves = list.split(/\n\s*\n/);

  const amounts = elves.map((elf) => {
    const amountsPerElf = elf.split("\n");
    return amountsPerElf.reduce((total, amount) => total + Number(amount), 0);
  });

  return amounts;
}
