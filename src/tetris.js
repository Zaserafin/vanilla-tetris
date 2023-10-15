import { Game, gameData, CanvasRenderer } from "./game";
import { checkCollisions, generateMatrix, getRandomElement, getTruncedVector } from "./utils";

export default class Tetris extends Game {
  constructor() {
    super(3, 12);

    this.root = document.getElementById("root");
    this.canvasRenderer = new CanvasRenderer(400, 600, gameData.settings.backgroundColor, root);

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
      this.currentPiece = this.nextPiece;
      this.nextPiece = getRandomElement(gameData.piecesTemplates);

      this.clearCompleteRows();
    }
  }

  renderGrid() {
    for (let x = 0; x < this.squareCountX; x++) {
      this.canvasRenderer.drawRect(
        gameData.settings.squareSize * x - gameData.settings.lineThickness,
        0,
        gameData.settings.lineThickness,
        this.canvasRenderer.getCanvasInfo().height,
        gameData.settings.lineColor
      );
    }

    for (let y = 0; y < this.squareCountY; y++) {
      this.canvasRenderer.drawRect(
        0,
        gameData.settings.squareSize * y - gameData.settings.lineThickness,
        this.canvasRenderer.getCanvasInfo().width,
        gameData.settings.lineThickness,
        gameData.settings.lineColor
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
          "yellow"
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

  render() {
    this.canvasRenderer.clear();
    if (gameData.gameOver) return;

    this.renderGrid();
    this.renderBoard();
    this.renderCurrentPiece();
  }
}
