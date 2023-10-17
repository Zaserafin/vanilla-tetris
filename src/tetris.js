import { Game, gameData, CanvasRenderer } from "./game";
import { checkCollisions, generateMatrix, getRandomElement, getTruncedVector } from "./utils";

export default class Tetris extends Game {
  constructor() {
    super(gameData.settings.tickRate, gameData.settings.frameRate);

    this.root = document.getElementById(gameData.settings.rootId);
    this.canvasRenderer = new CanvasRenderer(
      gameData.settings.canvasWidth,
      gameData.settings.canvasHeight,
      gameData.settings.backgroundColor,
      root
    );

    this.squareCountX = this.canvasRenderer.getCanvasInfo().width / gameData.settings.squareSize;
    this.squareCountY = this.canvasRenderer.getCanvasInfo().height / gameData.settings.squareSize;

    this.currentPiece = getRandomElement(gameData.piecesTemplates);
    this.nextPiece = getRandomElement(gameData.piecesTemplates);

    this.board = generateMatrix(this.squareCountX, this.squareCountY);
  }

  handleRotationMovement() {
    if (
      checkCollisions(
        this.board,
        this.currentPiece,
        this.squareCountX,
        this.squareCountY,
        "left"
      ) &&
      checkCollisions(this.board, this.currentPiece, this.squareCountX, this.squareCountY, "right")
    )
      this.currentPiece.template = this.currentPiece.template[0].map((val, index) =>
        this.currentPiece.template.map((row) => row[index]).reverse()
      );
  }

  handleLeftMovement() {
    if (
      checkCollisions(this.board, this.currentPiece, this.squareCountX, this.squareCountY, "left")
    )
      this.currentPiece.x--;
  }

  handleRightMovement() {
    if (
      checkCollisions(this.board, this.currentPiece, this.squareCountX, this.squareCountY, "right")
    )
      this.currentPiece.x++;
  }

  checkGameOver() {
    return this.board[0].some((x) => x !== 0);
  }

  clearCompleteRows() {
    for (let y = 0; y < this.board.length; y++) {
      if (this.board[y].every((x) => x !== 0)) {
        this.board.splice(y, 1);
        this.board.unshift(Array(this.squareCountX).fill(0));
      }
    }
  }

  update() {
    if (gameData.gameOver) return;
    if (checkCollisions(this.board, this.currentPiece, this.squareCountX, this.squareCountY)) {
      this.currentPiece.y++;
    } else {
      let truncedPosition = getTruncedVector({ x: this.currentPiece.x, y: this.currentPiece.y });
      for (let y = 0; y < this.currentPiece.template.length; y++) {
        for (let x = 0; x < this.currentPiece.template[y].length; x++) {
          if (this.currentPiece.template[y][x] === 0) continue;
          let realX = x + truncedPosition.x;
          let realY = y + truncedPosition.y;
          this.board[realY][realX] = 1;
        }
      }
      this.currentPiece.y = 0;
      this.currentPiece.x = Math.trunc(this.squareCountX / 2);
      this.currentPiece = this.nextPiece;
      this.nextPiece = getRandomElement(gameData.piecesTemplates);

      this.clearCompleteRows();

      if (this.checkGameOver()) {
        gameData.gameOver = true;
      }
    }
  }

  renderBackground() {
    for (let x = 0; x < this.squareCountX; x++) {
      const color = x % 2 === 0 ? gameData.settings.lineColor : gameData.settings.backgroundColor;
      this.canvasRenderer.drawRect(
        gameData.settings.squareSize * x - gameData.settings.lineThickness,
        0,
        gameData.settings.squareSize,
        this.canvasRenderer.getCanvasInfo().height,
        color
      );
    }
  }

  renderBoard() {
    for (let y = 0; y < this.board.length; y++) {
      const row = this.board[y];

      for (let x = 0; x < row.length; x++) {
        if (this.board[y][x] === 0) continue;
        this.canvasRenderer.drawRect(
          x * gameData.settings.squareSize,
          y * gameData.settings.squareSize,
          gameData.settings.squareSize - gameData.settings.lineThickness,
          gameData.settings.squareSize - gameData.settings.lineThickness,
          gameData.settings.solidColor
        );
      }
    }
  }

  renderCurrentPiece() {
    for (let y = 0; y < this.currentPiece.template.length; y++) {
      for (let x = 0; x < this.currentPiece.template[y].length; x++) {
        if (this.currentPiece.template[y][x] === 0) continue;
        this.canvasRenderer.drawRect(
          (this.currentPiece.x + x) * gameData.settings.squareSize,
          (this.currentPiece.y + y) * gameData.settings.squareSize,
          gameData.settings.squareSize - gameData.settings.lineThickness,
          gameData.settings.squareSize - gameData.settings.lineThickness,
          this.currentPiece.color
        );
      }
    }
  }

  renderGameOver() {
    this.canvasRenderer.setBackgroundColor("red");
  }

  render() {
    this.canvasRenderer.clear();
    if (gameData.gameOver) {
      this.renderGameOver();
      return;
    }

    this.renderBackground();
    this.renderBoard();
    this.renderCurrentPiece();
  }
}
