export function getRandomElement(arr) {
  return Object.create(arr[Math.floor(Math.random() * arr.length)]);
}

export function drawRect(ctx, x, y, width, height, color = "white") {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

export function generateMatrix(xCount, yCount) {
  let temp = [];

  for (let y = 0; y < yCount; y++) {
    const row = [];

    for (let x = 0; x < xCount; x++) {
      row.push(0);
    }

    temp.push(row);
  }
  return temp;
}

export function checkCollisions(board, piece, squareCountX, squareCountY, direction = "down") {
  let truncedPosition = { x: Math.trunc(piece.x), y: Math.trunc(piece.y) };

  for (let y = 0; y < piece.template.length; y++) {
    for (let x = 0; x < piece.template[y].length; x++) {
      if (piece.template[y][x] === 0) continue;
      let realX = x + truncedPosition.x;
      let realY = y + truncedPosition.y;

      if (direction === "down" && (realY + 1 >= squareCountY || board[realY + 1][realX] !== 0))
        return false;

      if (direction === "right" && (realX + 1 >= squareCountX || board[realY][realX + 1] !== 0))
        return false;

      if (direction === "left" && (realX - 1 < 0 || board[realY][realX - 1] !== 0)) return false;
    }
  }

  return true;
}

export function getTruncedVector(vector) {
  return {
    x: Math.trunc(vector.x),
    y: Math.trunc(vector.y),
  };
}
