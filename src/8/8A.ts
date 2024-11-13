import * as fs from "fs";
import * as path from "path";

const input = fs.readFileSync(path.resolve(__dirname, "data.txt"), "utf-8");

type Tree = { x: number; y: number; height: number };

function getCountOfVisibleTrees(input: string) {
  const rows = input.split(/\n/);

  const visibleTrees: Array<Tree> = [];

  let currentTree: Tree;
  let opposingRowTree: Tree;
  let opposingColumnTree: Tree;

  for (let i = 0; i < rows.length; i++) {
    let visibleInRow: {
      fromLeft: Tree | null;
      fromRight: Tree | null;
    } = { fromLeft: null, fromRight: null };

    for (let j = 0; j < rows[i].length; j++) {
      let visibleInColumn: {
        fromTop: Tree | null;
        fromBottom: Tree | null;
      } = { fromTop: null, fromBottom: null };

      currentTree = {
        x: j,
        y: i,
        height: parseInt(rows[i][j]),
      };
      opposingRowTree = {
        x: rows[i].length - 1 - j,
        y: i,
        height: parseInt(rows[i][rows[i].length - 1 - j]),
      };
      opposingColumnTree = {
        x: j,
        y: rows.length - 1 - i,
        height: parseInt(rows[rows.length - 1 - i][j]),
      };

      if (
        i === 0 ||
        i === rows.length - 1 ||
        j === 0 ||
        j === rows[i].length - 1
      ) {
        // Record de facto visible trees on the edge
        visibleTrees.push(currentTree);
      } else {
        // Record visible inner trees

        // In current row
        if (currentTree.x <= opposingRowTree.x) {
          // From the left
          if (
            visibleInRow.fromLeft === null ||
            visibleInRow.fromLeft.height < currentTree.height
          ) {
            visibleInRow.fromLeft = currentTree;
          }
          // From the right
          if (
            visibleInRow.fromRight === null ||
            visibleInRow.fromRight.height < opposingRowTree.height
          ) {
            visibleInRow.fromRight = opposingRowTree;
          }
        }

        // In current column
        // From the top
        if (currentTree.y <= opposingColumnTree.y) {
          if (
            visibleInColumn.fromTop === null ||
            visibleInColumn.fromTop.height < currentTree.height
          ) {
            visibleInColumn.fromTop = currentTree;
          }
          // From the bottom
          if (
            visibleInColumn.fromBottom === null ||
            visibleInColumn.fromBottom.height < opposingColumnTree.height
          ) {
            visibleInColumn.fromBottom = opposingColumnTree;
          }
        }
      }

      if (visibleInColumn.fromTop && visibleInColumn.fromBottom) {
        if (
          visibleInColumn.fromTop.x === visibleInColumn.fromBottom.x &&
          visibleInColumn.fromTop.y === visibleInColumn.fromBottom.y
        ) {
          const visibleFromTop = visibleInColumn.fromTop;
          if (
            !visibleTrees.find(
              (tree) =>
                tree.x === visibleFromTop.x && tree.y === visibleFromTop.y
            )
          ) {
            visibleTrees.push(visibleFromTop);
          }
        } else {
          visibleTrees.push(
            visibleInColumn.fromTop,
            visibleInColumn.fromBottom
          );
        }
      }
    }

    if (visibleInRow.fromLeft && visibleInRow.fromRight) {
      if (
        visibleInRow.fromLeft.x === visibleInRow.fromRight.x &&
        visibleInRow.fromLeft.y === visibleInRow.fromRight.y
      ) {
        visibleTrees.push(visibleInRow.fromLeft);
      } else {
        visibleTrees.push(visibleInRow.fromLeft, visibleInRow.fromRight);
      }
    }
  }

  return visibleTrees;
}

console.log(getCountOfVisibleTrees(input));
