import "./stylesheets/style.css";
import Tetris from "./tetris";
import Hammer from "hammerjs";

const startButton = document.getElementById("start-button");
const canvas = document.getElementById("game-canvas");

const hammer = new Hammer(canvas);

const tetris = new Tetris();

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  startButton.style.display = "none";
  tetris.start();
});

hammer.on('swipe', (event) => {
  if (event.deltaX < 0) tetris?.handleLeftMovement();
  if (event.deltaX > 0) tetris?.handleRightMovement();
})

hammer.on("tap", (event) => {
  tetris?.handleRotationMovement();
})

window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") tetris?.handleLeftMovement();
  if (event.key === "ArrowRight") tetris?.handleRightMovement();
  if (event.key === "ArrowUp") tetris?.handleRotationMovement();
});
