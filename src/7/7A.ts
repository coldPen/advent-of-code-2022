import * as fs from "fs";
import * as path from "path";
import { z } from "zod";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

type Directories = Array<{
  path: string;
  size: number;
}>;

const pathArraySchema = z.tuple([z.literal("/")]).rest(z.string());
type PathArray = z.infer<typeof pathArraySchema>;

const totalDiskSpace = 70_000_000;
const requiredFreeSpace = 30_000_000;

const directories = getDirectories(input);
function getSumOfDeletableDirectories(directories: Directories) {
  let sum = 0;
  for (const { size } of directories) {
    if (size <= 100000) {
      sum += size;
    }
  }

  return sum;
}
console.log(getSumOfDeletableDirectories(directories));

function getSizeOfSmallestDeletableDirectory(directories: Directories) {
  const rootDirectory = directories.find(({ path }) => path === "/");
  if (rootDirectory === undefined) throw new Error("No root directory found");

  const freeSpace = totalDiskSpace - rootDirectory.size;

  if (freeSpace >= requiredFreeSpace) return null;

  const neededAdditionalFreeSpace = requiredFreeSpace - freeSpace;

  let sizeOfSmallestDeletableDirectory = Infinity;
  for (const { size } of directories) {
    if (
      size >= neededAdditionalFreeSpace &&
      size < sizeOfSmallestDeletableDirectory
    ) {
      sizeOfSmallestDeletableDirectory = size;
    }
  }

  if (sizeOfSmallestDeletableDirectory === Infinity) return null;

  return sizeOfSmallestDeletableDirectory;
}
console.log(getSizeOfSmallestDeletableDirectory(directories));

function getDirectories(terminalOutput: string) {
  const lines = terminalOutput.split(/\n/);

  const directories: Directories = [];
  let currentDirectoryPathArray: PathArray = ["/"];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line[0] === "$") {
      const command = line.slice(2, 4);

      switch (command) {
        case "cd": {
          const directoryName = line.slice(5);

          if (directoryName === "..") {
            currentDirectoryPathArray.pop();
            break;
          }

          const currentDirectoryPath = getStringPath(currentDirectoryPathArray);

          const currentDirectory = directories.find(
            (directory) => directory.path === currentDirectoryPath
          );

          if (currentDirectory === undefined) {
            directories.push({
              path: currentDirectoryPath,
              size: 0,
            });
          }

          if (directoryName === "/") {
            currentDirectoryPathArray.length = 1; // ["/"]
            break;
          }

          currentDirectoryPathArray.push(directoryName);

          break;
        }

        case "ls": {
          const remainingLines = lines.slice(i + 1);
          for (let j = 0; j < remainingLines.length; j++) {
            const postLSLine = remainingLines[j];

            if (postLSLine.startsWith("$ ")) break;

            const [value, name] = postLSLine.split(/\s/);

            if (value === "dir") {
              const path = getStringPath(
                pathArraySchema.parse([...currentDirectoryPathArray, name])
              );
              if (!directories.find((directory) => directory.path === path)) {
                directories.push({ path, size: 0 });
              }
            } else {
              for (let i = 0; i < currentDirectoryPathArray.length; i++) {
                const targetPath = getStringPath(
                  pathArraySchema.parse(
                    currentDirectoryPathArray.slice(0, i + 1)
                  )
                );

                const targetDirectory = directories.find(
                  (directory) => directory.path === targetPath
                );

                if (targetDirectory === undefined) {
                  throw new Error(`Can't find directory "${targetPath}"`);
                }

                targetDirectory.size += parseInt(value);
              }
            }
          }

          break;
        }

        default:
          throw new Error(`Unknown command: "${command}"`);
      }
    }
  }

  return directories;
}
function getStringPath(pathArray: PathArray): string {
  return pathArray[0] + pathArray.slice(1).join("/");
}
