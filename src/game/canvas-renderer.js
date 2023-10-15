export default class CanvasRenderer {
  /**
   * Crea un lienzo y lo agrega a un elemento HTML específico (o al cuerpo del documento por defecto).
   * @param {number} width - Ancho del lienzo.
   * @param {number} height - Alto del lienzo.
   * @param {string} [backgroundColor = 'white'] - Color de fondo del lienzo (opcional).
   * @param {HTMLElement} [parentElement] - Elemento HTML al que se agregará el lienzo (opcional).
   */
  constructor(
    width,
    height,
    backgroundColor = "white",
    parentElement = document.body
  ) {
    this.canvas = document.createElement("canvas");
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");

    this.setBackgroundColor(backgroundColor);

    if (parentElement instanceof HTMLElement) {
      parentElement.appendChild(this.canvas);
    } else {
      document.body.appendChild(this.canvas);
    }
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
   * Restaura el estado del contexto del lienzo al predeterminado.
   */
  restoreContextState() {
    this.context.restore();
  }

  /**
   * Guarda el estado actual del contexto del lienzo.
   */
  saveContextState() {
    this.context.save();
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
   * Dibuja una línea en el lienzo.
   * @param {number} x1 - Coordenada X del punto de inicio de la línea.
   * @param {number} y1 - Coordenada Y del punto de inicio de la línea.
   * @param {number} x2 - Coordenada X del punto final de la línea.
   * @param {number} y2 - Coordenada Y del punto final de la línea.
   * @param {string} color - Color de la línea.
   * @param {number} [lineWidth=1] - Grosor de la línea (opcional).
   */
  drawLine(x1, y1, x2, y2, color, lineWidth = 1) {
    this.context.strokeStyle = color;
    this.context.lineWidth = lineWidth;
    this.context.beginPath();
    this.context.moveTo(x1, y1);
    this.context.lineTo(x2, y2);
    this.context.stroke();
  }

  /**
   * Dibuja un círculo en el lienzo.
   * @param {number} x - Coordenada X del centro del círculo.
   * @param {number} y - Coordenada Y del centro del círculo.
   * @param {number} radius - Radio del círculo.
   * @param {string} color - Color del círculo.
   */
  drawCircle(x, y, radius, color) {
    this.context.fillStyle = color;
    this.context.beginPath();
    this.context.arc(x, y, radius, 0, Math.PI * 2);
    this.context.fill();
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
      // Agregar más propiedades según sea necesario
    };
  }

  /**
   * Obtiene el contexto 2D del lienzo.
   * @returns {CanvasRenderingContext2D} - Contexto 2D del lienzo.
   */
  getContext() {
    return this.context;
  }
}
