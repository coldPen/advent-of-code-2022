import * as fs from "fs";
import * as path from "path";
import { getMatches } from "./getMatches";
import { FIRST_LETTER, OUTCOME_VALUE, SHAPE_DESCRIPTION } from "./constants";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

function getTotalScoreWithTheRightInstructions(strategyGuide: string) {
  const matches = getMatches(strategyGuide);

  let totalScore = 0;

  for (const [opponentPlay, targetOutcome] of matches) {
    const opponentShape = FIRST_LETTER[opponentPlay];

    switch (targetOutcome) {
      case "X":
        const { INFERIOR_SHAPE } = SHAPE_DESCRIPTION[opponentShape];
        totalScore +=
          SHAPE_DESCRIPTION[INFERIOR_SHAPE].VALUE + OUTCOME_VALUE.LOSE;
        break;
      case "Y":
        totalScore +=
          SHAPE_DESCRIPTION[opponentShape].VALUE + OUTCOME_VALUE.DRAW;
        break;
      case "Z":
        const { SUPERIOR_SHAPE } = SHAPE_DESCRIPTION[opponentShape];
        totalScore +=
          SHAPE_DESCRIPTION[SUPERIOR_SHAPE].VALUE + OUTCOME_VALUE.WIN;
        break;
    }
  }

  return totalScore;
}

console.log(getTotalScoreWithTheRightInstructions(input));
