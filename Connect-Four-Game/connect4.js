/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {                                         
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array    //use for loop to iterate over the entire board
  for (let y = 0; y < HEIGHT; y++) {                           //based off of x,y axis (y is height and x is width)
    board.push(Array.from({ length: WIDTH }));                 //Array.from lets you create Arrays from: array-like objects 
  }                                                            //objects with a length property and indexed elements
}                                                              //board.push to push the array of rows into the empty array
                                                              //logical board;behind the scenes; not visible to users


// Array.from({length:7}).fill(Array.from({length:6}))                           //This is another way to do the makeBoard function; needs more code to adjust in order to function

// (7) [Array(6), Array(6), Array(6), Array(6), Array(6), Array(6), Array(6)]    //This is the breakdown of the alternative function
// 0: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// 1: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// 2: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// 3: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// 4: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// 5: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// 6: (6) [undefined, undefined, undefined, undefined, undefined, undefined]
// length: 7



/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {                        //on screen board; visible to users
  // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
  const board = document.querySelector("#board"); //defining/getting the container/table aka board
  
  // TODO: add comment for this code
  const top = document.createElement("tr");     //creating  the top of an html table hovers above the board
  top.setAttribute("id", "column-top");         //giving the top of the column an id
  top.addEventListener("click", handleClick);   //adding a click event listener to react when a player clicks the top (connect the 2 boards)

  for (let x = 0; x < WIDTH; x++) {
    let headCell = document.createElement("td"); //creating the individual cells in the table
    headCell.setAttribute("id", x);             //giving each cell an id
    top.append(headCell);                      //appending the cells to the top of the table
  }
    board.append(top);                        //attaching the separate top to the board

  // TODO: add comment for this code
  
  for (let y = 0; y < HEIGHT; y++) {             //make main part of board; integrating makeBoard function
    const row = document.createElement("tr");    //creating the rows of the board
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td"); //creating the individual cells to hold the pieces
      cell.setAttribute("id", `${y}-${x}`);      //gives unique id to find the element; coordinates e.g.: (0,1)
      row.append(cell);                          //attaching the cells to the rows
    }
    board.append(row);                           //then attaching the rows to the main board
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 0
  for (let y = HEIGHT - 1; y >= 0; y--) {    //looping over the columns going reverse(downwards) starting from bottom up 
    if (!board[y][x]) {                      //if the board is not filled return y (allow more pieces to drop)
      return y;
    }
  }
  return null;        //if full return null; aka nothing
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
const piece = document.createElement("div");
piece.classList.add('piece');                  //adding piece class to the divs to make css work
piece.classList.add(`p${currPlayer}`);          //using string template literal and adding class to diferentiate players
// piece.style.top = -50 * (y + 2);                //This was carried over from old coding and was for styling, now it does nothing

const spot = document.getElementById(`${y}-${x}`);  //using unique id to find the element; coordinates e.g.: (0,1)
spot.append(piece);                                 //attaching the div to specific coordinates
}

/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(e) {
  // get x from ID of clicked cell
  let x = +e.target.id;                                  //The "+" symbol turns a string into a number; earlier the setAttribute set a string "id"

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  board[y][x] = currPlayer;                          //current player on board
  placeInTable(y, x);                               //callback to previous function

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  if (board.every(row => row.every(cell => cell))) {     //checking if every row/cell filled then end on a tie; check cell is not undefined
    return endGame('Tie!');                             //return true if everything has a value
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  currPlayer = currPlayer === 1 ? 2 : 1;  //condition ? exprIfTrue : exprIfFalse
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(              //starts at 0,0, is it on the board or off the board
      ([y, x]) =>                   //is it set to currplayer
        y >= 0 &&                  //loop continues so need to check if points are valid, might get negatives so need to skip
        y < HEIGHT &&               //If you don't put in limitations it won't know where to stop
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // TODO: read and understand this code. Add comments to help you.

  for (let y = 0; y < HEIGHT; y++) {   //iterating over the board all the x's for every y
    for (let x = 0; x < WIDTH; x++) {      
      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];  //arrays determine what is considered 4 in a row and how in their particular row
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];      //any initial spot it checks to see if all the other areas have the same colors as it
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {    //if a win occurs in any of the rows then return true
        return true;                                                      // "_win" is a personal choice by developer; means prviate code?  
      }                                                                   // In other words underscore means don't modify the code; use as is
    }
  }
}

makeBoard();            //invoking both the main board and top of the board
makeHtmlBoard();

