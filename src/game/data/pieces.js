import colors from "./colors";

const pieces = [
  {
    id: "i",
    x: 4,
    y: 0,
    color: colors.cyan,
    template: [[1, 1, 1, 1]],
  },
  {
    id: "j",
    x: 4,
    y: 0,
    color: colors.blue,
    template: [
      [1, 1, 1],
      [0, 0, 1],
    ],
  },
  {
    id: "l",
    x: 4,
    y: 0,
    color: colors.orange,
    template: [
      [1, 1, 1],
      [1, 0, 0],
    ],
  },
  {
    id: "o",
    x: 4,
    y: 0,
    color: colors.yellow,
    template: [
      [1, 1],
      [1, 1],
    ],
  },
  {
    id: "s",
    x: 4,
    y: 0,
    color: colors.lightgreen,
    template: [
      [0, 1, 1],
      [1, 1, 0],
    ],
  },
  {
    id: "t",
    x: 4,
    y: 0,
    color: colors.violet,
    template: [
      [0, 1, 0],
      [1, 1, 1],
    ],
  },
  {
    id: "z",
    x: 4,
    y: 0,
    color: colors.coral,
    template: [
      [1, 1, 0],
      [0, 1, 1],
    ],
  },
];

export default pieces;
