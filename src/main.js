import "./stylesheets/style.css";
import Tetris from "./tetris";
import Hammer from "hammerjs";

import fullscreenImage from "./assets/fullscreen.svg";
import exitFullscreenImage from "./assets/exit-fullscreen.svg";

const root = document.getElementById("root");
const fullScreenButton = document.createElement("button");
const startButton = document.getElementById("start-button");
const canvas = document.getElementById("game-canvas");

const hammer = new Hammer(canvas);
const tetris = new Tetris();

const img = document.createElement('img');
img.src = fullscreenImage;

fullScreenButton.id = "fullscreen-button";
fullScreenButton.className = "fullscreen-button";
fullScreenButton.appendChild(img)

root.appendChild(fullScreenButton);

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  startButton.style.display = "none";
  tetris.start();
});

fullScreenButton.addEventListener('click', (event) => {
  event.preventDefault(); console.log(event.target)
  event.stopPropagation();
  if (!document.fullscreenElement) {
    root.requestFullscreen();
    img.src = exitFullscreenImage;
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
    img.src = fullscreenImage;
  }
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
