import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

type Filesystem = { [k: string]: number | Filesystem };

function getSumOfDeletableDirectories(terminalOutput: string) {
  const root = getFilesystem(terminalOutput);

  let sum = 0;
  for (let i = 0; i < Object.entries(root).length; i++) {}
}

console.log(getSumOfDeletableDirectories(input));

function getFilesystem(terminalOutput: string) {
  const lines = terminalOutput.split(/\n/);

  const root: Filesystem = {};
  let currentDirectoryPath: Array<string> = [];

  function getValueByPath(path: string[]) {
    if (path.length === 0) return root;

    let directory = root;
    for (let i = 0; i < path.length; i++) {
      const currentDirectory = directory[path[i]];
      if (typeof currentDirectory !== "number") directory = currentDirectory;
      if (directory === undefined) break;
    }
    return directory;
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line[0] === "$") {
      const command = line.slice(2, 4);

      switch (command) {
        case "cd": {
          const directoryName = line.slice(5);

          if (directoryName === "..") {
            currentDirectoryPath.pop();
            break;
          }

          if (directoryName === "/") {
            currentDirectoryPath.length = 0;
            break;
          }

          currentDirectoryPath.push(directoryName);

          let targetDirectory = getValueByPath(currentDirectoryPath);
          if (typeof targetDirectory === "number")
            throw new Error(`"${targetDirectory}" is a file, not a directory`);

          if (targetDirectory === undefined) targetDirectory = {};

          break;
        }

        case "ls": {
          let targetDirectory = getValueByPath(currentDirectoryPath);
          if (targetDirectory === undefined) {
            throw new Error("Can't ls from undefined directory");
          }
          if (typeof targetDirectory === "number") {
            throw new Error("Can't ls from file");
          }

          const remainingLines = lines.slice(i + 1);
          for (let j = 0; j < remainingLines.length; j++) {
            const postLSLine = remainingLines[j];

            if (postLSLine.startsWith("$ ")) break;

            const [value, key] = postLSLine.split(/\s/);

            if (value === "dir") {
              if (targetDirectory[key] === undefined) {
                targetDirectory[key] = {};
              }
            } else {
              targetDirectory[key] = parseInt(value);
            }
          }

          break;
        }

        default:
          throw new Error(`Unknown command: "${command}"`);
      }
    }
  }

  return root;
}
