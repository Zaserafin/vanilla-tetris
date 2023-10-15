const gameData = {
  playerScore: 0,
  gameOver: false,
  settings: {
    soundEnabled: true,
    squareSize: 40,
    backgroundColor: "#4f4f4f",
    lineColor: "#ffffff09",
    lineThickness: 2,
  },
  piecesTemplates: [
    {
      id: "i",
      x: 4,
      y: 0,
      color: "red",
      template: [[1, 1, 1, 1]],
    },
    {
      id: "j",
      x: 4,
      y: 0,
      color: "white",
      template: [
        [1, 1, 1],
        [0, 0, 1],
      ],
    },
    {
      id: "l",
      x: 4,
      y: 0,
      color: "magenta",
      template: [
        [1, 1, 1],
        [1, 0, 0],
      ],
    },
    {
      id: "o",
      x: 4,
      y: 0,
      color: "blue",
      template: [
        [1, 1],
        [1, 1],
      ],
    },
    {
      id: "s",
      x: 4,
      y: 0,
      color: "green",
      template: [
        [0, 1, 1],
        [1, 1, 0],
      ],
    },
    {
      id: "t",
      x: 4,
      y: 0,
      color: "brown",
      template: [
        [0, 1, 0],
        [1, 1, 1],
      ],
    },
    {
      id: "z",
      x: 4,
      y: 0,
      color: "cyan",
      template: [
        [1, 1, 0],
        [0, 1, 1],
      ],
    },
  ],
};

export default gameData;
