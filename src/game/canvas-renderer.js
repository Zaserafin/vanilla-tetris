export default class CanvasRenderer {
  /**
   * Crea un lienzo y lo agrega a un elemento HTML específico (o al cuerpo del documento por defecto).
   * @param {HTMLElement} canvas - Elemento que corresponde al lienzo dodne se renderizara.
   * @param {number} width - Ancho del lienzo.
   * @param {number} height - Alto del lienzo.
   * @param {string} [backgroundColor = 'white'] - Color de fondo del lienzo (opcional).
   */
  constructor(canvas, width, height, backgroundColor = "white") {
    if (!canvas) {
      throw new Error("Cannot initialize renderer without a proper canvas");
    }

    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.resize({ width: width, height: height });
    this.setBackgroundColor(backgroundColor);
  }

  /**
   * Cambia el color de fondo del lienzo.
   * @param {string} backgroundColor - Color de fondo del lienzo.
   */
  setBackgroundColor(backgroundColor) {
    this.canvas.style.backgroundColor = backgroundColor;
  }

  /**
   * Borra el lienzo.
   */
  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Dibuja un cuadrado en el lienzo.
   * @param {number} x - Coordenada X del cuadrado.
   * @param {number} y - Coordenada Y del cuadrado.
   * @param {number} width - Ancho del cuadrado.
   * @param {number} height - Alto del cuadrado.
   * @param {string} color - Color del cuadrado.
   */
  drawRect(x, y, width, height, color) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, width, height);
  }

  /**
   * Dibuja texto en el lienzo.
   * @param {string} text - Texto a dibujar.
   * @param {number} x - Coordenada X del texto.
   * @param {number} y - Coordenada Y del texto.
   * @param {string} font - Fuente y tamaño del texto.
   * @param {string} color - Color del texto.
   */
  drawText(text, x, y, font, color) {
    this.context.fillStyle = color;
    this.context.font = font;
    this.context.fillText(text, x, y);
  }

  /**
   * Dibuja una imagen en el lienzo.
   * @param {HTMLImageElement} image - La imagen que se va a dibujar.
   * @param {number} x - Coordenada X de la posición de la imagen en el lienzo.
   * @param {number} y - Coordenada Y de la posición de la imagen en el lienzo.
   * @param {number} width - Ancho de la imagen.
   * @param {number} height - Alto de la imagen.
   */
  drawImage(image, x, y, width, height) {
    this.context.drawImage(image, x, y, width, height);
  }

  /**
   * Obtiene información sobre el lienzo.
   * @returns {object} - Objeto con información del lienzo.
   */
  getCanvasInfo() {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      backgroundColor: this.canvas.style.backgroundColor,
    };
  }

  /**
   * Cambia las dimensiones del lienzo.
   * @param {number} width - Ancho del lienzo.
   * @param {number} height - Alto del lienzo.
   */
  resize({ width = null, height = null }) {
    if (width) this.canvas.width = width;
    if (height) this.canvas.height = height;
  }
}
