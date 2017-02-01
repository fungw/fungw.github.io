var TRACKER, _, backtrack, blankCanvas, checkCol, checkRow, checkSector, generateSudoku, sudokuFill;

_ = require('underscore');

TRACKER = [1, 2, 3, 4, 5, 6, 7, 8, 9];

generateSudoku = function() {
  var sudokuGrid;
  sudokuGrid = blankCanvas();
  sudokuFill(sudokuGrid);
  return sudokuGrid;
};

blankCanvas = function() {
  var i, x;
  x = new Array(9);
  i = 0;
  while (i < 9) {
    x[i] = new Array(9);
    i++;
  }
  return x;
};

sudokuFill = function(grid) {
  var col, row, sudokuValue, valid;
  sudokuValue = _.random(0, 9);
  row = _.random(0, 8);
  col = _.random(0, 8);
  grid[row][col] = sudokuValue;
  return valid = backtrack(grid, row, col);
};

backtrack = function(grid, row, col) {
  return checkSector(grid, row, col) & checkRow(grid, row) & checkCol(grid, col);
};

checkSector = function(grid, row, col) {
  console.log(row, row / 3);
  console.log(col, col / 3);
  return true;
};

checkRow = function(grid, row) {
  var i, j, value;
  i = 0;
  j = 0;
  while (i < 9) {
    value = TRACKER[i];
    while (j < 9) {
      if (grid[row][j] === value) {
        return false;
      } else {
        j++;
      }
    }
    i++;
  }
  return true;
};

checkCol = function(grid, col) {
  var i, j, value;
  i = 0;
  j = 0;
  while (j < 9) {
    value = TRACKER[j];
    while (i < 9) {
      if (grid[i][col] === value) {
        return false;
      } else {
        i++;
      }
    }
    j++;
  }
  return true;
};

module.exports = {
  generateSudoku: generateSudoku
};
