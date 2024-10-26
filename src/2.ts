import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

const input = fs.readFileSync(
  path.resolve(__dirname, "../data/2.txt"),
  "utf-8"
);

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

// -- Constants
const SHAPE_NAMES = {
  ROCK: "ROCK",
  PAPER: "ROCK",
  SCISSORS: "SCISSORS",
} as const;

const OPPONENT_SHAPES = {
  A: SHAPE_NAMES.ROCK,
  B: SHAPE_NAMES.PAPER,
  C: SHAPE_NAMES.SCISSORS,
} as const;

const MY_SHAPES = {
  X: SHAPE_NAMES.ROCK,
  Y: SHAPE_NAMES.PAPER,
  Z: SHAPE_NAMES.SCISSORS,
} as const;

const SHAPE_RULES = {
  ROCK: {
    VALUE: 1,
    INFERIOR_SHAPE: SHAPE_NAMES.SCISSORS,
  },
  PAPER: {
    VALUE: 2,
    INFERIOR_SHAPE: SHAPE_NAMES.ROCK,
  },
  SCISSORS: {
    VALUE: 3,
    INFERIOR_SHAPE: SHAPE_NAMES.PAPER,
  },
} as const;

const OUTCOMES = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
} as const;
// --

export function getTotalScore(strategyGuide: string) {
  const matches = matchesSchema.parse(
    strategyGuide.split(/\n/).map((match) => match.split(/\s/))
  );

  let totalScore = 0;

  for (const [opponentPlay, myPlay] of matches) {
    const opponentShape = OPPONENT_SHAPES[opponentPlay];
    const myShape = MY_SHAPES[myPlay];

    if (opponentShape === myShape) {
      totalScore += SHAPE_RULES[myShape].VALUE + OUTCOMES.DRAW;
      continue;
    }

    if (SHAPE_RULES[opponentShape].INFERIOR_SHAPE === myShape) {
      totalScore += SHAPE_RULES[myShape].VALUE + OUTCOMES.LOSE;
      continue;
    }

    if (SHAPE_RULES[myShape].INFERIOR_SHAPE === opponentShape) {
      totalScore += SHAPE_RULES[myShape].VALUE + OUTCOMES.WIN;
      continue;
    }
  }

  return totalScore;
}
console.log(getTotalScore(input));
