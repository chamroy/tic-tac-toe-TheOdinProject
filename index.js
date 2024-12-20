//define the game core logic
const GameBoard = () => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const placeMarker = (index, player) => {
    if (board[index] === "") {
      board[index] = player.marker;
      return true;
    }
    return false;
  };
  const getBoard = () => {
    return board;
  };
  const isBoardFull = () => {
    return board.filter((cell) => cell === "").length === 0;
  };
  return { placeMarker, getBoard, isBoardFull };
};
//initialized variables and  players to set up game's state and participants

const cells = document.querySelectorAll(".cell");
const result = document.querySelector(".result");
const resetButton = document.querySelector(".resetButton");

const player1 = { name: "player 1", marker: "X" };
const player2 = { name: "player 2", marker: "O" };
let currentPlayer = player1;
let gameIsOver = false;
let board = GameBoard();

//adding utility function to handle updates to the UI and game state.

const displayResult = (message) => {
  result.textContent = message;
};
const updateTurnMessage = () => {
  displayResult(`${currentPlayer.name}'s turn [${currentPlayer.marker}]`);
};

//for  reset button
const resetGame = () => {
  board = GameBoard();
  board.getBoard().fill("");
  cells.forEach((cell) => (cell.textContent = ""));
  currentPlayer = player1;
  gameIsOver = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
    cell.classList.remove("winnerCell");
  });
  updateTurnMessage();
};

//checking the winner

const checkWinner = () => {
  const GameBoard = board.getBoard();
  const winnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  return winnerCombination.some((combination) => {
    if (
      combination.every((index) => GameBoard[index] === currentPlayer.marker)
    ) {
      combination.forEach((index) => {
        cells[index].classList.add("winnerCell");
      });
      return true;
    }
    return false;
  });
};

const handleClick = (event) => {
  if (gameIsOver) return;
  const index = event.target.getAttribute("data-index");
  if (board.placeMarker(index, currentPlayer)) {
    event.target.textContent = currentPlayer.marker;

    if (checkWinner()) {
      displayResult(`${currentPlayer.name} wins!`);
      gameIsOver = true;
      return;
    }
    if (board.isBoardFull()) {
      displayResult("it is a tie");
      gameIsOver = true;
      return;
    }
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    updateTurnMessage();
  } else {
    displayResult("cell is already occupied");
  }
};
resetButton.addEventListener("click", resetGame);
cells.forEach((cell) => cell.addEventListener("click", handleClick));
updateTurnMessage();