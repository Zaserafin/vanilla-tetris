export default class Game {
  constructor(gameTickRate = 60, targetFPS = 60) {
    this.isRunning = false;
    this.gameTickRate = gameTickRate;
    this.lastGameTick = 0;
    this.lastRender = 0;
    this.targetFPS = targetFPS;
    this.frameDuration = 1000 / this.targetFPS; // Duración de un fotograma en milisegundos

    this.gameLoop = this.gameLoop.bind(this);
    this.renderLoop = this.renderLoop.bind(this);
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.gameLoop();
      this.renderLoop();
    }
  }

  stop() {
    this.isRunning = false;
  }

  update() {
    // Este método se debe implementar en las subclases para manejar la lógica específica del juego.
  }

  render() {
    // Este método se debe implementar en las subclases para manejar el renderizado específico del juego.
  }

  gameLoop() {
    if (this.isRunning) {
      const now = performance.now();
      const elapsed = now - this.lastGameTick;

      if (elapsed >= 1000 / this.gameTickRate) {
        this.update();
        this.lastGameTick = now;
      }
      requestAnimationFrame(this.gameLoop);
    }
  }

  renderLoop() {
    if (this.isRunning) {
      const now = performance.now();
      const elapsed = now - this.lastRender;

      if (elapsed >= this.frameDuration) {
        this.render();
        this.lastRender = now;
      }
      requestAnimationFrame(this.renderLoop);
    }
  }
}
