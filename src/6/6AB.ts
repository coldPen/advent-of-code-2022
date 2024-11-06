import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

const signalLengthMap = {
  packet: 4,
  message: 14,
} as const;

function getNumberOfCharactersBeforeMarker(
  input: string,
  target: "packet" | "message"
) {
  const signalLength = signalLengthMap[target];

  // --- About 3ms to run ---
  //   let distinctCharactersCount;
  //   for (let i = 0; i < input.length; i++) {
  //     if (new Set(input.slice(i, i + signalLength)).size === signalLength) {
  //       distinctCharactersCount = i + signalLength;
  //       break;
  //     }
  //   }
  //   return distinctCharactersCount;

  // --- 1.5ms! ---
  const characterCount: Record<string, number> = {};
  let distinctCharactersCount = 0;

  for (let i = 0; i < input.length; i++) {
    const character = input[i];

    characterCount[character] = (characterCount[character] || 0) + 1;
    if (characterCount[character] === 1) distinctCharactersCount++;

    if (i >= signalLength) {
      const removedCharacter = input[i - signalLength];
      characterCount[removedCharacter]--;
      if (characterCount[removedCharacter] === 0) distinctCharactersCount--;
    }

    if (distinctCharactersCount === signalLength) {
      return i + 1;
    }
  }

  return -1;
}

console.log(getNumberOfCharactersBeforeMarker(input, "packet"));

console.log(getNumberOfCharactersBeforeMarker(input, "message"));
