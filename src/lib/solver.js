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
      console.log('outer');
      return internalResult;
    } else if (index === 8) {
      return false // false means no duplicate found
    }
  });
  return !result;
}