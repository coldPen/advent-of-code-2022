export const SHAPE_NAMES = {
  ROCK: "ROCK",
  PAPER: "PAPER",
  SCISSORS: "SCISSORS",
} as const;

export const FIRST_LETTER = {
  A: SHAPE_NAMES.ROCK,
  B: SHAPE_NAMES.PAPER,
  C: SHAPE_NAMES.SCISSORS,
} as const;

export const SECOND_LETTER_AS_SHAPE = {
  X: SHAPE_NAMES.ROCK,
  Y: SHAPE_NAMES.PAPER,
  Z: SHAPE_NAMES.SCISSORS,
} as const;

export const SHAPE_DESCRIPTION = {
  [SHAPE_NAMES.ROCK]: {
    VALUE: 1,
    INFERIOR_SHAPE: SHAPE_NAMES.SCISSORS,
    SUPERIOR_SHAPE: SHAPE_NAMES.PAPER,
  },
  [SHAPE_NAMES.PAPER]: {
    VALUE: 2,
    INFERIOR_SHAPE: SHAPE_NAMES.ROCK,
    SUPERIOR_SHAPE: SHAPE_NAMES.SCISSORS,
  },
  [SHAPE_NAMES.SCISSORS]: {
    VALUE: 3,
    INFERIOR_SHAPE: SHAPE_NAMES.PAPER,
    SUPERIOR_SHAPE: SHAPE_NAMES.ROCK,
  },
} as const;

export const OUTCOME_VALUE = {
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
} as const;