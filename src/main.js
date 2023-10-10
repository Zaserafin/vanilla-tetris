import "./stylesheets/style.css";

class Piece {
  constructor(template) {
    this.template = template;
    this.x = squareCountX / 2;
    this.y = 0;
  }

  getTruncedPosition() {
    return { x: Math.trunc(this.x), y: Math.trunc(this.y) };
  }

  checkBottom() {
    for (let y = 0; y < this.template.length; y++) {
      for (let x = 0; x < this.template[y].length; x++) {
        if (this.template[y][x] === 0) continue;
        let realX = x + this.getTruncedPosition().x;
        let realY = y + this.getTruncedPosition().y;
        if (realY + 1 >= squareCountY) return false;
        if (board[realY + 1][realX] !== 0) return false;
      }
    }
    return true;
  }

  checkRight() {
    for (let y = 0; y < this.template.length; y++) {
      for (let x = 0; x < this.template[y].length; x++) {
        if (this.template[y][x] === 0) continue;
        let realX = x + this.getTruncedPosition().x;
        let realY = y + this.getTruncedPosition().y;
        if (realX + 1 >= squareCountX) return false;
        if (board[realY][realX + 1] !== 0) return false;
      }
    }
    return true;
  }

  checkLeft() {
    for (let y = 0; y < this.template.length; y++) {
      for (let x = 0; x < this.template[y].length; x++) {
        if (this.template[y][x] === 0) continue;
        let realX = x + this.getTruncedPosition().x;
        let realY = y + this.getTruncedPosition().y;
        if (realX - 1 < 0) return false;
        if (board[realY][realX - 1] !== 0) return false;
      }
    }
    return true;
  }

  changeRotation() {
    this.template = this.template[0].map((val, index) =>
      this.template.map((row) => row[index]).reverse()
    );
  }

  moveRight() {
    if (this.checkRight()) this.x++;
  }

  moveLeft() {
    if (this.checkLeft()) this.x--;
  }
}

const board = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 1, 1],
];

const size = 40;
const gameSpeed = 5;
const frameRate = 12;
const backgroundColor = "#4f4f4f";
const lineColor = "#f4f4f4";
const lineThickness = 2;

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("game-canvas");

/** @type {CanvasRenderingContext2D} */
const context = canvas.getContext("2d");

const squareCountX = canvas.width / size;
const squareCountY = canvas.height / size;

const pieces = [
  new Piece([
    [0, 1, 0],
    [1, 1, 1],
  ]),
  new Piece([
    [1, 1],
    [1, 1],
  ]),
  new Piece([
    [1, 0],
    [1, 0],
    [1, 1],
  ]),
  new Piece([
    [0, 1],
    [0, 1],
    [1, 1],
  ]),
  new Piece([[1, 1, 1, 1]]),
];

let gameOver = false;
let currentPiece = getRandomPiece();
let nextPiece = getRandomPiece();

function getRandomPiece() {
  return pieces[Math.floor(Math.random() * pieces.length)];
}

function setup() {
  setInterval(update, 1000 / gameSpeed);
  setInterval(draw, 1000 / frameRate);
}

function clearCompleteRows() {
  for (let y = 0; y < board.length; y++) {
    if (board[y].every((x) => x !== 0)) {
      board.splice(y, 1);
      board.unshift(Array(squareCountX).fill(0));
    }
  }
}

function update() {
  if (gameOver) return;
  if (currentPiece.checkBottom()) {
    currentPiece.y++;
  } else {
    for (let y = 0; y < currentPiece.template.length; y++) {
      for (let x = 0; x < currentPiece.template[y].length; x++) {
        if (currentPiece.template[y][x] === 0) continue;
        let realX = x + currentPiece.getTruncedPosition().x;
        let realY = y + currentPiece.getTruncedPosition().y;
        board[realY][realX] = 1;
      }
    }
    currentPiece.y = 0;
    currentPiece = nextPiece;
    nextPiece = getRandomPiece();
    clearCompleteRows();

    if (!currentPiece.checkBottom()) {
      gameOver = true;
    }
  }
}

function drawRect(x, y, width, height, color) {
  context.fillStyle = color;
  context.fillRect(x, y, width, height);
}

function drawGameOver() {
  drawRect(0, 0, canvas.width, canvas.height, "lightcoral");
}

function drawBackground() {
  drawRect(0, 0, canvas.width, canvas.height, backgroundColor);

  for (let x = 0; x < squareCountX; x++) {
    drawRect(
      size * x - lineThickness,
      0,
      lineThickness,
      canvas.height,
      lineColor
    );
  }

  for (let y = 0; y < squareCountY; y++) {
    drawRect(
      0,
      size * y - lineThickness,
      canvas.width,
      lineThickness,
      lineColor
    );
  }
}

function drawBoard() {
  for (let y = 0; y < board.length; y++) {
    const row = board[y];

    for (let x = 0; x < row.length; x++) {
      if (board[y][x] === 0) continue;
      drawRect(x * size, y * size, size, size, "green");
    }
  }
}

function drawCurrentPiece() {
  for (let y = 0; y < currentPiece.template.length; y++) {
    for (let x = 0; x < currentPiece.template[y].length; x++) {
      if (currentPiece.template[y][x] === 0) continue;
      drawRect(
        (currentPiece.x + x) * size,
        (currentPiece.y + y) * size,
        size,
        size,
        "violet"
      );
    }
  }
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (gameOver) {
    drawGameOver();
    return;
  }

  drawBackground();
  drawBoard();
  drawCurrentPiece();
}

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") currentPiece.moveLeft();
  if (event.key === "ArrowRight") currentPiece.moveRight();
  if (event.key === "ArrowUp") currentPiece.changeRotation();

  if (event.key === "b") console.table(board);
  if (event.key === "p") console.table(currentPiece);
});

setup();

