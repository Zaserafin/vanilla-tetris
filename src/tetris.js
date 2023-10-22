import { Game, gameData, CanvasRenderer } from "./game";
import { checkCollisions, generateMatrix, getRandomElement, getTruncedVector } from "./utils";
import { settings, pieces, scores } from "./game/data";

export default class Tetris extends Game {
  constructor() {
    super(settings.tickRate, settings.frameRate);

    this.gameCanvas = document.getElementById(settings.mainCanvasId);
    this.pieceCanvas = document.getElementById(settings.pieceCanvasId);

    this.gameRenderer = new CanvasRenderer(
      this.gameCanvas,
      settings.canvasWidth,
      settings.canvasHeight,
      settings.backgroundColor,
      root
    );

    this.pieceRenderer = new CanvasRenderer(this.pieceCanvas, 0, 0, "transparent", root);

    this.squareCountX = this.gameRenderer.getCanvasInfo().width / settings.squareSize;
    this.squareCountY = this.gameRenderer.getCanvasInfo().height / settings.squareSize;

    this.board = generateMatrix(this.squareCountX, this.squareCountY + settings.boardOffset);

    gameData.highScore = window.localStorage.getItem("highscore") || 0;
    this.updateScores();
  }

  start() {
    this.currentPiece = getRandomElement(pieces);
    this.nextPiece = getRandomElement(pieces);
    this.renderNextPiece();

    super.start();
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
    let completedRows = 0;

    for (let y = 0; y < this.board.length; y++) {
      if (this.board[y].every((x) => x !== 0)) {
        completedRows++;
        this.board.splice(y, 1);
        this.board.unshift(Array(this.squareCountX).fill(0));
      }
    }

    if (completedRows >= 4) {
      gameData.previousTetris = true;
      gameData.playerScore += gameData.previousTetris ? scores.doubleTetris : scores.tetris;
      gameData.tetrisCount++;
    } else {
      gameData.previousTetris = false;
      gameData.playerScore += completedRows * scores.single;
    }

    this.updateScores();
  }

  updateScores() {
    document.getElementById("score").innerText = `Score: ${gameData.playerScore}`;
    document.getElementById("tetris").innerText = `Tetris: ${gameData.tetrisCount}`;
    document.getElementById("highscore").innerText = `Highscore: ${gameData.highScore}`;
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
      this.nextPiece = getRandomElement(pieces);

      this.clearCompleteRows();

      this.renderNextPiece();

      if (this.checkGameOver()) {
        gameData.gameOver = true;
        gameData.highScore = gameData.playerScore;
        window.localStorage.setItem("highscore", gameData.playerScore);
      }
    }
  }

  renderBackground() {
    for (let x = 0; x < this.squareCountX; x++) {
      this.gameRenderer.drawRect(
        settings.squareSize * x - settings.lineThickness,
        0,
        settings.lineThickness,
        this.gameRenderer.getCanvasInfo().height,
        settings.lineColor
      );
    }

    for (let y = 0; y < this.squareCountY; y++) {
      this.gameRenderer.drawRect(
        0,
        settings.squareSize * y - settings.lineThickness,
        this.gameRenderer.getCanvasInfo().width,
        settings.lineThickness,
        settings.lineColor
      );
    }
  }

  renderBoard() {
    for (let y = 0; y < this.board.length; y++) {
      const row = this.board[y];

      for (let x = 0; x < row.length; x++) {
        if (this.board[y][x] === 0) continue;
        this.gameRenderer.drawRect(
          x * settings.squareSize,
          y * settings.squareSize,
          settings.squareSize - settings.lineThickness,
          settings.squareSize - settings.lineThickness,
          settings.solidColor
        );
      }
    }
  }

  renderCurrentPiece() {
    for (let y = 0; y < this.currentPiece.template.length; y++) {
      for (let x = 0; x < this.currentPiece.template[y].length; x++) {
        if (this.currentPiece.template[y][x] === 0) continue;
        this.gameRenderer.drawRect(
          (this.currentPiece.x + x) * settings.squareSize,
          (this.currentPiece.y + y) * settings.squareSize,
          settings.squareSize - settings.lineThickness,
          settings.squareSize - settings.lineThickness,
          this.currentPiece.color
        );
      }
    }
  }

  renderNextPiece() {
    this.pieceRenderer.resize({
      width: this.nextPiece.template[0].length * settings.squareSize,
      height: settings.squareSize * 2,
    });

    for (let y = 0; y < this.nextPiece.template.length; y++) {
      for (let x = 0; x < this.nextPiece.template[y].length; x++) {
        if (this.nextPiece.template[y][x] === 0) continue;
        this.pieceRenderer.drawRect(
          x * settings.squareSize,
          y * settings.squareSize,
          settings.squareSize - settings.lineThickness,
          settings.squareSize - settings.lineThickness,
          this.nextPiece.color
        );
      }
    }
  }

  renderGameOver() {
    this.gameRenderer.setBackgroundColor("red");
  }

  render() {
    this.gameRenderer.clear();
    if (gameData.gameOver) {
      this.renderGameOver();
      return;
    }

    this.renderBackground();
    this.renderBoard();
    this.renderCurrentPiece();
  }
}
