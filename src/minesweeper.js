class Game {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this._board = new Board(numberOfRows,numberOfColumns,numberOfBombs);
  }
  playMove(rowIndex,columnIndex) {
    this._board.flipTile(rowIndex,columnIndex);
    if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('Boom! The game is over.');
      this._board.print();
    } else if (!this._board.hasSafeTiles()) {
      console.log('Winner! Winner! Chicken dinner!');
      this._board.print();
    } else {
      console.log('Current board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows,numberOfColumns,numberOfBombs) {
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows,numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows,numberOfColumns,numberOfBombs);
  }

  get playerBoard() {
    return this._playerBoard;
  }

  // create function to flip a tile
   flipTile(rowIndex, columnIndex) {
      if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return;
      } else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
        this._playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex,columnIndex);
      }
      this._numberOfTiles--;
    }

  // function to calculate the number of bombs in the adjacent cells
  getNumberOfNeighborBombs(rowIndex,columnIndex) {
    // set an array of the offsets that correspond to adjacent cells in matrix
    const neighborOffsets = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];
    // record the number of rows in the matrix
    const numberOfRows = this._bombBoard.length;
    // record the number of columns in the matrix
    const numberOfColumns = this._bombBoard[0].length;
    // init. number of bombs found in neighbor cells
    let numberOfBombs = 0;

    // iterate through all the adjacent cells to find bombs
    neighborOffsets.forEach(offset => {
      // set an index for the row to be checked
      const neighborRowIndex = rowIndex + offset[0];
      // set an index for the column to be checked
      const neighborColumnIndex = columnIndex + offset[1];

      // if statement that adds a bomb to number of bombs if the current cell being checked contains a 'B'
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++; // add 1 to the number of bombs
        }
      }
    })
    return numberOfBombs;
  }

  hasSafeTiles() {
    return this._numberOfTiles !== this._numberOfBombs;
  }

  print() {
    console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  // set a variable to store the player's board
  static generatePlayerBoard (numberOfRows,numberOfColumns) {
    // set variable to store the board itself
    let board = [];
    // iterate through the number of rows that have been supplied to the function
    for (let i = 0; i < numberOfRows; i++) {
      // set variable to store a row
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        // create empty columns in the row
        row.push(' ');
      }
      // push the newly created row into the variable 'board'
      board.push(row);
    }
    return board;
  }

  // set a variable to store the bomb's board
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    // set variable to store the board itself
    let board = [];
    // iterate through the number of rows that have been supplied to the function
    for (let i = 0; i < numberOfRows; i++) {
      // set variable to store a row
      let row = [];
      for (let j = 0; j < numberOfColumns; j++) {
        // create empty columns in the row
        row.push(null);
      }
      // push the newly created row into the variable 'board'
      board.push(row);
    }

  // bomb counter
  let numberOfBombsPlaced = 0;
  // place bombs until # of bombs placed is equal to number of bombs input
  while (numberOfBombsPlaced < numberOfBombs) {
    // this while loop has the potential of placing bombs on top of already existing bombs.
    // this will be fixed when learning about control flow.

    // randomly select a row where bomb will be placed
    let randomRowIndex = Math.floor(Math.random() * numberOfRows);
    // randomly select a column where the bomb will be placed
    let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
    //if statement checking that there is no bomb on cell
    if (board[randomRowIndex][randomColumnIndex]!=='B') {
      // place bomb in randomly selected position
      board[randomRowIndex][randomColumnIndex] = 'B';
      // increase bomb count by 1
      numberOfBombsPlaced++;
    }
  }
  return board;
  }
}

const g = new Game(3,3,3);
g.playMove(0,0);
