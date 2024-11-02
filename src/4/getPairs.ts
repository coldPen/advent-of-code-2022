import { z } from "zod";

export const pairsSchema = z.array(z.array(z.tuple([z.number(), z.number()])));

export function getPairs(input: string) {
  return pairsSchema.parse(
    input
      .split(/\n/)
      .map((pair) =>
        pair
          .split(",")
          .map((range) => range.split("-").map((section) => parseInt(section)))
      )
  );
}
