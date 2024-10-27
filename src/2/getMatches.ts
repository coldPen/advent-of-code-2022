import { z } from "zod";

// --- Zod schemas, totally optional
const firstLetterSchema = z.union([
  z.literal("A"),
  z.literal("B"),
  z.literal("C"),
]);
const secondLetterSchema = z.union([
  z.literal("X"),
  z.literal("Y"),
  z.literal("Z"),
]);
const matchSchema = z.tuple([firstLetterSchema, secondLetterSchema]);
const matchesSchema = z.array(matchSchema);
// ---

export function getMatches(strategyGuide: string) {
  return matchesSchema.parse(
    strategyGuide.split(/\n/).map((match) => match.split(/\s/))
  );
}
