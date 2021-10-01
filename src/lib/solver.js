export function sudoku2(grid) {
  let arrCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let arrRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  let matrix = [];

  const result = grid.some((element, index) => {
    let internalResult = element.some((item, i) => {
      // matrix
      const gridId = Math.trunc(i / 3) * 3 + Math.trunc(index / 3);
      if (!matrix[gridId]) {
        matrix[gridId] = [];
      }
      if (matrix[gridId].indexOf(item) !== -1 && item !== '') {
        return true;
      } else if (item !== '') {
        matrix[gridId].push(item);
      }

      // column
      if (arrCol.indexOf(grid[i][index]) === -1 && (grid[i][index] !== '')) {
        arrCol[Number(grid[i][index])] = grid[i][index];
      }
      else if (grid[i][index] !== '') {
        return true;
      }

      // row
      if (arrRow.indexOf(grid[index][i]) === -1 && (grid[index][i] !== '')) {
        arrRow[Number(grid[index][i])] = grid[index][i];

      } else if (grid[index][i] !== '') {
        return true;
      }
      if (i === 8) {
        arrRow = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        arrCol = [0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
    });

    // true means duplicate found in some method
    if (internalResult === true) {
      return internalResult;
    } else if (index === 8) {
      return false // false means no duplicate found
    }
  });
  return !result;
}

// ------------------------------ solve me function ------------------------------//
function randomAnswer(ans) {
  if (ans.length === 1) {
    return ans[0]
  }
  return ans[Math.floor(Math.random() * ans.length)]
}

function convertToMatrix(data) {
  let matrix = [[], [], [], [], [], [], [], [], []]

  data.some((element, x) => {
    element.forEach((el, y) => {
      const gridId = getGridId(x, y)
      matrix[gridId].push(el)
    })
  })
  return matrix
}

function getColvalue(data, y) {
  let col = []
  data.forEach((element) => {
    col.push(element[y])
  })

  return col
}

function getGridId(x, y) {
  return Math.trunc(y / 3) * 3 + Math.trunc(x / 3);
}


function getPossibleAnswer(grid, x, y) {
  const answer = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
  const mtrx = convertToMatrix(grid)[getGridId(x, y)]
  const column = getColvalue(grid, y)
  const result = []

  answer.forEach((a) => {
    if (column.indexOf(a) === -1 && grid[x].indexOf(a) === -1 && mtrx.indexOf(a) === -1) {
      result.push(a)
    }
  })

  return randomAnswer(result);
}

export function solveMe(grid) {
  let current = grid

  grid.forEach((row, x) => {
    row.forEach((col, y) => {
      if (current[x][y] === "") {
        return current[x][y] = getPossibleAnswer(current, x, y)
      } else {
        return current[x][y]
      }
    })
  });

  return current
}