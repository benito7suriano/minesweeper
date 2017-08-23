'use strict';

// set a variable to store the player's board
var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
  // set variable to store the board itself
  var board = [];
  // iterate through the number of rows that have been supplied to the function
  for (var i = 0; i < numberOfRows; i++) {
    // set variable to store a row
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      // create empty columns in the row
      row.push(' ');
    }
    // push the newly created row into the variable 'board'
    board.push(row);
  }
  return board;
};

// set a variable to store the bomb's board
var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
  // set variable to store the board itself
  var board = [];
  // iterate through the number of rows that have been supplied to the function
  for (var i = 0; i < numberOfRows; i++) {
    // set variable to store a row
    var row = [];
    for (var j = 0; j < numberOfColumns; j++) {
      // create empty columns in the row
      row.push(null);
    }
    // push the newly created row into the variable 'board'
    board.push(row);
  }

  // bomb counter
  var numberOfBombsPlaced = 0;
  // place bombs until # of bombs placed is equal to number of bombs input
  while (numberOfBombsPlaced < numberOfBombs) {
    // this while loop has the potential of placing bombs on top of already existing bombs.
    // this will be fixed when learning about control flow.

    // randomly select a row where bomb will be placed
    var randomRowIndex = Math.floor(Math.random() * numberOfRows);
    // randomly select a column where the bomb will be placed
    var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //if statement checking that there is no bomb on cell
    if (board[randomRowIndex][randomColumnIndex] !== 'B') {
      // place bomb in randomly selected position
      board[randomRowIndex][randomColumnIndex] = 'B';
      // increase bomb count by 1
      numberOfBombsPlaced++;
    }
  }
  return board;
};

// function to calculate the number of bombs in the adjacent cells
var getNumberOfNeighborBombs = function getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex) {
  // set an array of the offsets that correspond to adjacent cells in matrix
  var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
  // record the number of rows in the matrix
  var numberOfRows = bombBoard.length;
  // record the number of columns in the matrix
  var numberOfColumns = bombBoard[0].length;
  // init. number of bombs found in neighbor cells
  var numberOfBombs = 0;

  // iterate through all the adjacent cells to find bombs
  neighborOffsets.forEach(function (offset) {
    // set an index for the row to be checked
    var neighborRowIndex = rowIndex + offset[0];
    // set an index for the column to be checked
    var neighborColumnIndex = columnIndex + offset[1];

    // if statement that adds a bomb to number of bombs if the current cell being checked contains a 'B'
    if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
      if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++; // add 1 to the number of bombs
      }
    }
  });
  return numberOfBombs;
};

var flipTile = function flipTile(playerBoard, bombBoard, rowIndex, columnIndex) {
  if (playerBoard[rowIndex][columnIndex] !== ' ') {
    console.log('This tile has already been flipped!');
    return;
  } else if (bombBoard[rowIndex][columnIndex] === 'B') {
    playerBoard[rowIndex][columnIndex] = 'B';
  } else {
    playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
  }
};

var printBoard = function printBoard(board) {
  console.log(board.map(function (row) {
    return row.join(' | ');
  }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 3);
var bombBoard = generateBombBoard(3, 3, 2);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 1, 1);

console.log('Updated Player Board:');
printBoard(playerBoard);