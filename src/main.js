import "./stylesheets/style.css";

import Tetris from "./tetris";

const tetris = new Tetris();

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") tetris.handleLeftMovement();
  if (event.key === "ArrowRight") tetris.handleRightMovement();
  if (event.key === "ArrowUp") tetris.handleRotationMovement();
});

tetris.start();
