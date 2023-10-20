const gameData = {
  playerScore: 0,
  tetrisCount: 0,
  highScore: 0,
  gameOver: false,
  scores: {
    single: 100,
    double: 200,
    triple: 300,
    tetris: 800,
    doubleTetris: 1200,
  },
  settings: {
    mainCanvasId: "game-canvas",
    pieceCanvasId: "piece-canvas",
    soundEnabled: true,
    squareSize: 30,
    backgroundColor: "#4f4f4f",
    lineColor: "#ffffff09",
    lineThickness: 2,
    solidColor: "lightcoral",
    tickRate: 4,
    frameRate: 30,
    canvasHeight: 600,
    canvasWidth: 300,
  },
  piecesTemplates: [
    {
      id: "i",
      x: 4,
      y: 0,
      color: "cyan",
      template: [[1, 1, 1, 1]],
    },
    {
      id: "j",
      x: 4,
      y: 0,
      color: "blue",
      template: [
        [1, 1, 1],
        [0, 0, 1],
      ],
    },
    {
      id: "l",
      x: 4,
      y: 0,
      color: "orange",
      template: [
        [1, 1, 1],
        [1, 0, 0],
      ],
    },
    {
      id: "o",
      x: 4,
      y: 0,
      color: "yellow",
      template: [
        [1, 1],
        [1, 1],
      ],
    },
    {
      id: "s",
      x: 4,
      y: 0,
      color: "lightgreen",
      template: [
        [0, 1, 1],
        [1, 1, 0],
      ],
    },
    {
      id: "t",
      x: 4,
      y: 0,
      color: "violet",
      template: [
        [0, 1, 0],
        [1, 1, 1],
      ],
    },
    {
      id: "z",
      x: 4,
      y: 0,
      color: "coral",
      template: [
        [1, 1, 0],
        [0, 1, 1],
      ],
    },
  ],
};

export default gameData;
