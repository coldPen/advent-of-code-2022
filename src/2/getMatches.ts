import { z } from "zod";

// --- Zod schemas, totally optional
const opponentShapeCodeSchema = z.union([
  z.literal("A"),
  z.literal("B"),
  z.literal("C"),
]);
const myShapeCodeSchema = z.union([
  z.literal("X"),
  z.literal("Y"),
  z.literal("Z"),
]);
const matchSchema = z.tuple([opponentShapeCodeSchema, myShapeCodeSchema]);
const matchesSchema = z.array(matchSchema);
// ---

export function getMatches(strategyGuide: string) {
  return matchesSchema.parse(
    strategyGuide.split(/\n/).map((match) => match.split(/\s/))
  );
}
