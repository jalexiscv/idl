/**
 * @fileoverview Define la clase InputEvent que envuelve eventos de entrada del
 * navegador (ratón, teclado, táctil) proporcionando una interfaz unificada para
 * que las herramientas del diagrama interactúen con las acciones del usuario.
 * Abstrae las diferencias entre eventos de puntero, ratón y táctiles.
 */

/**
 * Clase que encapsula un evento de entrada del usuario (ratón, teclado, toque).
 * Convierte coordenadas de vista a coordenadas de documento, normaliza los
 * modificadores de teclado, y proporciona acceso a propiedades como botón,
 * conteo de clics, delta de rueda, y teclas presionadas.
 */
class InputEvent {
  f;
  yx;
  wx;
  wm;
  xm;
  bm;
  Sm;
  km;
  Pm;
  Mm;
  Nm;
  Cm;
  Am;
  Tm;
  Bo;
  Lm;
  Dm;
  Cs;
  Re;
  constructor() {
    // Diagrama al que pertenece este evento
    (this.f = null),
      // Punto en coordenadas de vista (relativas al viewport)
      (this.yx = new Point(0, 0).k()),
      // Punto en coordenadas de documento (coordenadas del mundo del diagrama)
      (this.wx = new Point(0, 0).k()),
      // Máscara de bits de modificadores (Ctrl=1, Alt=2, Shift=4, Meta=8)
      (this.wm = 0),
      // Botón del ratón presionado (0=izquierdo, 1=medio, 2=derecho)
      (this.xm = 0),
      // Botones actualmente presionados como máscara de bits
      (this.bm = 1),
      // Tecla presionada (carácter de la tecla)
      (this.Sm = ""),
      // Código de la tecla física (independiente de la distribución de teclado)
      (this.km = ""),
      // Indica si es un evento de presionar (mouse/pointer down)
      (this.Pm = false),
      // Indica si es un evento de soltar (mouse/pointer up)
      (this.Mm = false),
      // Número de clics consecutivos (1 = simple, 2 = doble)
      (this.Nm = 0),
      // Delta de desplazamiento de la rueda del ratón
      (this.Cm = 0),
      // Indica si es un evento multitáctil
      (this.Am = false),
      // Indica si el evento ya fue manejado por alguna herramienta
      (this.Tm = false),
      // Indica si el evento debe propagarse (burbujear) hacia arriba
      (this.Bo = false),
      // Referencia al evento nativo del navegador
      (this.Lm = null),
      // Marca de tiempo del evento en milisegundos
      (this.Dm = 0),
      // Diagrama de destino para operaciones de arrastre entre diagramas
      (this.Cs = null),
      // Objeto gráfico de destino para el evento
      (this.Re = null);
  }
  /** Crea una copia superficial del evento de entrada. */
  copy() {
    const t = new InputEvent();
    return this.clone(t);
  }
  /**
   * Clona las propiedades de este evento en otro objeto InputEvent.
   * @param {InputEvent} t - Evento destino donde copiar las propiedades
   * @returns {InputEvent} El evento destino con las propiedades copiadas
   */
  clone(t) {
    return (
      (t.f = this.f),
      t.yx.c(this.viewPoint),
      t.wx.c(this.documentPoint),
      (t.wm = this.wm),
      (t.xm = this.xm),
      (t.bm = this.bm),
      (t.Sm = this.Sm),
      (t.km = this.km),
      (t.Pm = this.Pm),
      (t.Mm = this.Mm),
      (t.Nm = this.Nm),
      (t.Cm = this.Cm),
      (t.Am = this.Am),
      (t.Tm = this.Tm),
      (t.Bo = this.Bo),
      (t.Lm = this.Lm),
      (t.Dm = this.Dm),
      (t.Cs = this.Cs),
      (t.Re = this.Re),
      t
    );
  }
  /** Convierte el evento a una representación de cadena para depuración. */
  toString() {
    let t = "^";
    return (
      this.modifiers !== 0 && (t += "M:" + this.modifiers),
      this.button !== 0 && (t += "B:" + this.button),
      this.key !== "" && (t += "K:" + this.key),
      this.clickCount !== 0 && (t += "C:" + this.clickCount),
      this.delta !== 0 && (t += "D:" + this.delta),
      this.handled && (t += "h"),
      this.bubbles && (t += "b"),
      this.documentPoint !== null && (t += "@" + this.documentPoint.toString()),
      t
    );
  }
  /** @returns {Diagram} El diagrama asociado a este evento */
  get diagram() {
    return this.f;
  }
  set diagram(t) {
    this.f = t;
  }
  /** @returns {Point} El punto del evento en coordenadas de vista (viewport) */
  get viewPoint() {
    return this.yx;
  }
  set viewPoint(t) {
    (Debug && U.s(t, Point, InputEvent, "viewPoint"), this.yx.c(t));
  }
  /** @returns {Point} El punto del evento en coordenadas de documento (mundo) */
  get documentPoint() {
    return this.wx;
  }
  set documentPoint(t) {
    (Debug && U.s(t, Point, InputEvent, "documentPoint"), this.wx.c(t));
  }
  /**
   * Obtiene el punto de vista para un toque multitáctil específico.
   * @param {number} t - Índice del toque
   * @param {Point} i - Punto de salida donde almacenar las coordenadas
   * @returns {Point} El punto en coordenadas de vista
   */
  getMultiTouchViewPoint(t, i) {
    const e = this.diagram;
    return (e === null || e.nT(this.event, t, i), i);
  }
  /**
   * Obtiene el punto de documento para un toque multitáctil específico.
   * @param {number} t - Índice del toque
   * @param {Point} i - Punto de salida donde almacenar las coordenadas
   * @returns {Point} El punto en coordenadas de documento
   */
  getMultiTouchDocumentPoint(t, i) {
    const e = this.diagram;
    return (e === null || (e.nT(this.event, t, i), i.c(e.transformViewToDoc(i))), i);
  }
  /** @returns {number} Máscara de bits de teclas modificadoras */
  get modifiers() {
    return this.wm;
  }
  set modifiers(t) {
    this.wm = t;
  }
  /** @returns {number} Botón del ratón (0=izquierdo, 1=medio, 2=derecho) */
  get button() {
    return this.xm;
  }
  set button(t) {
    // Al asignar el botón, sincronizar automáticamente la propiedad buttons
    if (((this.xm = t), this.event === null))
      switch (t) {
        case 0:
          this.buttons = 1;
          return;
        case 1:
          this.buttons = 4;
          return;
        case 2:
          this.buttons = 2;
          return;
      }
  }
  /** @returns {number} Máscara de bits de botones actualmente presionados */
  get buttons() {
    return this.bm;
  }
  set buttons(t) {
    this.bm = t;
  }
  /** @returns {string} Carácter de la tecla presionada */
  get key() {
    return this.Sm;
  }
  set key(t) {
    this.Sm = t;
  }
  /** @returns {string} Código físico de la tecla (independiente de distribución) */
  get code() {
    return this.km;
  }
  set code(t) {
    this.km = t;
  }
  /** @returns {boolean} true si es un evento de presionar (down) */
  get down() {
    return this.Pm;
  }
  set down(t) {
    this.Pm = t;
  }
  /** @returns {boolean} true si es un evento de soltar (up) */
  get up() {
    return this.Mm;
  }
  set up(t) {
    this.Mm = t;
  }
  /** @returns {number} Número de clics consecutivos (1=simple, 2=doble) */
  get clickCount() {
    return this.Nm;
  }
  set clickCount(t) {
    this.Nm = t;
  }
  /** @returns {number} Delta de la rueda del ratón (positivo = alejar) */
  get delta() {
    return this.Cm;
  }
  set delta(t) {
    this.Cm = t;
  }
  /** @returns {boolean} true si el evento es multitoque */
  get isMultiTouch() {
    return this.Am;
  }
  set isMultiTouch(t) {
    this.Am = t;
  }
  /** @returns {boolean} true si el evento ya fue manejado (handled) */
  get handled() {
    return this.Tm;
  }
  set handled(t) {
    this.Tm = t;
  }
  /** @returns {boolean} true si el evento debe propagarse hacia arriba */
  get bubbles() {
    return this.Bo;
  }
  set bubbles(t) {
    this.Bo = t;
  }
  /** @returns {Event|null} Referencia al evento nativo del navegador */
  get event() {
    return this.Lm;
  }
  set event(t) {
    this.Lm = t;
  }
  /** @returns {boolean} true si el evento nativo es táctil o de lápiz */
  get isTouchEvent() {
    const t = this.event;
    return t === null ? false : t.pointerType === "touch" || t.pointerType === "pen";
  }
  /** @returns {number} Marca de tiempo del evento en milisegundos */
  get timestamp() {
    return this.Dm;
  }
  set timestamp(t) {
    this.Dm = t;
  }
  /** @returns {Diagram|null} Diagrama de destino para arrastre entre diagramas */
  get targetDiagram() {
    return this.Cs;
  }
  set targetDiagram(t) {
    this.Cs = t;
  }
  /** @returns {GraphObject|null} Objeto gráfico de destino del evento */
  get targetObject() {
    return this.Re;
  }
  set targetObject(t) {
    this.Re = t;
  }
  /** @returns {boolean} true si la tecla Control está presionada */
  get control() {
    return (this.modifiers & 1) !== 0;
  }
  set control(t) {
    this.modifiers = t ? this.modifiers | 1 : this.modifiers & -2;
  }
  /** @returns {boolean} true si la tecla Shift está presionada */
  get shift() {
    return (this.modifiers & 4) !== 0;
  }
  set shift(t) {
    this.modifiers = t ? this.modifiers | 4 : this.modifiers & -5;
  }
  /** @returns {boolean} true si la tecla Alt está presionada */
  get alt() {
    return (this.modifiers & 2) !== 0;
  }
  set alt(t) {
    this.modifiers = t ? this.modifiers | 2 : this.modifiers & -3;
  }
  /** @returns {boolean} true si la tecla Meta (Windows/Command) está presionada */
  get meta() {
    return (this.modifiers & 8) !== 0;
  }
  set meta(t) {
    this.modifiers = t ? this.modifiers | 8 : this.modifiers & -9;
  }
  /**
   * Determina si el botón izquierdo está presionado.
   * Para eventos mouseup/mousedown usa button, para otros usa buttons.
   * @returns {boolean} true si el botón izquierdo está activo
   */
  get left() {
    const t = this.event;
    return t !== null &&
      (t.type === "mousedown" || t.type === "mouseup" || t.type === "pointerdown" || t.type === "pointerup")
      ? this.button === 0
      : (this.buttons & 1) !== 0;
  }
  set left(t) {
    t ? (this.buttons |= 1) : (this.buttons &= -2);
  }
  /**
   * Determina si el botón derecho está presionado.
   * Para eventos mouseup/mousedown usa button, para otros usa buttons.
   * @returns {boolean} true si el botón derecho está activo
   */
  get right() {
    const t = this.event;
    return t !== null &&
      (t.type === "mousedown" || t.type === "mouseup" || t.type === "pointerdown" || t.type === "pointerup")
      ? this.button === 2
      : (this.buttons & 2) !== 0;
  }
  set right(t) {
    t ? (this.buttons |= 2) : (this.buttons &= -3);
  }
  /**
   * Determina si el botón medio está presionado.
   * Para eventos mouseup/mousedown usa button, para otros usa buttons.
   * @returns {boolean} true si el botón medio está activo
   */
  get middle() {
    const t = this.event;
    return t !== null &&
      (t.type === "mousedown" || t.type === "mouseup" || t.type === "pointerdown" || t.type === "pointerup")
      ? this.button === 1
      : (this.buttons & 4) !== 0;
  }
  set middle(t) {
    t ? (this.buttons |= 4) : (this.buttons &= -5);
  }
  /**
   * Obtiene la tecla de comando normalizada para atajos de teclado.
   * Mapea códigos de tecla físicos a valores de comando estándar (c, x, v, etc.)
   * @returns {string} Comando de teclado normalizado
   */
  get commandKey() {
    const t = this.code,
      i = this.key;
    // Si la tecla (key) ya es un comando estándar, usarla directamente
    return "cxvyzagCXVYZAG".includes(i)
      ? i.toLowerCase()
      : t === "KeyC"
        ? "c"
        : t === "KeyX"
          ? "x"
          : t === "KeyV"
            ? "v"
            : t === "KeyY"
              ? "y"
              : t === "KeyZ"
                ? "z"
                : t === "KeyA"
                  ? "a"
                  : t === "KeyG"
                    ? "g"
                    : t !== ""
                      ? t
                      : i;
  }
}
