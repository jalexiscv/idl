/** @fileoverview Clase CanvasSurface de la biblioteca IDL (Interactive Diagrams Library).
 * Superficie de renderizado basada en Canvas 2D HTML. Crea y administra un elemento
 * <canvas>, proporcionando acceso al contexto de dibujo 2D para renderizar gráficos.
 * Originalmente parte de GoJS, renombrada a IDL.
 */

/**
 * Representa una superficie de renderizado Canvas 2D.
 * Envuelve un elemento <canvas> HTML y su contexto de dibujo (CanvasSurfaceContext).
 * Proporciona métodos para redimensionar, consultar dimensiones y exportar a imagen.
 */
class CanvasSurface {
  /** @type {HTMLCanvasElement} El elemento canvas nativo del DOM. */
  Nt;
  /** @type {CanvasSurfaceContext} El contexto de dibujo 2D asociado a este canvas. */
  ni;
  /** @type {Document} Referencia al documento DOM donde se creó el canvas. */
  rl;
  /** @type {?Object} Datos de observador de redimensionamiento (ResizeObserver). */
  wd;

  /**
   * Crea una nueva superficie Canvas.
   * @param {Diagram} [t] - Diagrama padre opcional. Si se proporciona, se registra
   *   el canvas en Diagram._e para asociar el elemento con el diagrama.
   * @param {Document} [i] - Documento DOM donde crear el canvas.
   *   Por defecto usa root.document.
   * @param {Object} [e] - Opciones de contexto 2D (ej. { willReadFrequently: true }).
   * @param {boolean} [s] - Bandera para modo de depuración/validación.
   */
  constructor(t, i, e, s) {
    const n = i === void 0 ? root.document : i;
    ((this.rl = n), (this.wd = null)); // Inicializar documento y observador
    const o = n.createElement("canvas"); // Crear elemento <canvas>
    ((o.tabIndex = 0), // Permitir foco en el canvas
      (this.Nt = o),
      (this.ni = new CanvasSurfaceContext(o, e, s)), // Crear contexto de dibujo
      t && Diagram._e.set(o, t)); // Registrar asociación canvas-diagrama
  }

  /**
   * Redimensiona el canvas. Solo realiza cambios si las dimensiones son diferentes.
   * @param {number} t - Nuevo ancho en píxeles (resolución interna del canvas).
   * @param {number} i - Nuevo alto en píxeles (resolución interna del canvas).
   * @param {number} e - Nuevo ancho CSS en píxeles (tamaño de visualización).
   * @param {number} s - Nuevo alto CSS en píxeles (tamaño de visualización).
   * @returns {boolean} true si se realizó un cambio de tamaño, false si no.
   */
  resize(t, i, e, s) {
    return this.width !== t || this.height !== i
      ? ((this.width = t), (this.height = i), (this.style.width = e + "px"), (this.style.height = s + "px"), true)
      : false;
  }

  /**
   * Exporta el contenido del canvas como una URL de datos (data URL).
   * @param {string} [t] - Tipo MIME de imagen (ej. "image/png").
   * @param {number} [i] - Calidad de compresión (0-1) para formatos con pérdida.
   * @returns {string} URL de datos de la imagen.
   */
  toDataURL(t, i) {
    return this.Nt.toDataURL(t, i);
  }

  /**
   * Obtiene el rectángulo delimitador del elemento canvas en la ventana.
   * @returns {DOMRect} Rectángulo con posición y dimensiones.
   */
  getBoundingClientRect() {
    return this.Nt.getBoundingClientRect();
  }

  /** Enfoca el elemento canvas para recibir eventos de teclado. */
  focus() {
    this.Nt.focus();
  }

  /** @returns {number} Ancho interno del canvas en píxeles. */
  get width() {
    return this.Nt.width;
  }

  /** @param {number} t - Nuevo ancho interno del canvas en píxeles. */
  set width(t) {
    this.Nt.width = t;
  }

  /** @returns {number} Alto interno del canvas en píxeles. */
  get height() {
    return this.Nt.height;
  }

  /** @param {number} t - Nuevo alto interno del canvas en píxeles. */
  set height(t) {
    this.Nt.height = t;
  }

  /**
   * Libera los recursos asociados a esta superficie.
   * Elimina la asociación canvas-diagrama y limpia la referencia al documento.
   */
  dispose() {
    (Diagram._e.delete(this.Nt), (this.rl = null));
  }

  /** @returns {CSSStyleDeclaration} Objeto de estilo CSS del elemento canvas. */
  get style() {
    return this.Nt.style;
  }
}
