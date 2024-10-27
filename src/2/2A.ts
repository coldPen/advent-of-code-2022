import * as fs from "fs";
import * as path from "path";
import { getMatches } from "./getMatches";
import {
  FIRST_LETTER,
  OUTCOME_VALUE,
  SECOND_LETTER_AS_SHAPE,
  SHAPE_DESCRIPTION,
} from "./constants";

const input = fs.readFileSync(
  path.resolve(__dirname, "../../data/2.txt"),
  "utf-8"
);

export function getTotalScoreWithTheWrongInstructions(strategyGuide: string) {
  const matches = getMatches(strategyGuide);

  let totalScore = 0;

  for (const [opponentPlay, myPlay] of matches) {
    const opponentShape = FIRST_LETTER[opponentPlay];
    const myShape = SECOND_LETTER_AS_SHAPE[myPlay];

    if (opponentShape === myShape) {
      totalScore += SHAPE_DESCRIPTION[myShape].VALUE + OUTCOME_VALUE.DRAW;
      continue;
    }

    if (SHAPE_DESCRIPTION[opponentShape].INFERIOR_SHAPE === myShape) {
      totalScore += SHAPE_DESCRIPTION[myShape].VALUE + OUTCOME_VALUE.LOSE;
      continue;
    }

    if (SHAPE_DESCRIPTION[myShape].INFERIOR_SHAPE === opponentShape) {
      totalScore += SHAPE_DESCRIPTION[myShape].VALUE + OUTCOME_VALUE.WIN;
      continue;
    }
  }

  return totalScore;
}

console.log(getTotalScoreWithTheWrongInstructions(input));
