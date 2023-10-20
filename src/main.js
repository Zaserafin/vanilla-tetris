import "./stylesheets/style.css";
import Tetris from "./tetris";

const startButton = document.getElementById("start-button");

const tetris = new Tetris();

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  startButton.style.display = "none";
  tetris.start();
});

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") tetris?.handleLeftMovement();
  if (event.key === "ArrowRight") tetris?.handleRightMovement();
  if (event.key === "ArrowUp") tetris?.handleRotationMovement();
});
