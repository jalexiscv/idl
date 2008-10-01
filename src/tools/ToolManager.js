/**
 * @fileoverview Gestor central de herramientas de interacción en IDL.
 * Herramienta especial que actúa como despachador y orquestador de todas las
 * herramientas del diagrama. Distribuye los eventos del ratón y teclado a las
 * herramientas apropiadas según su tipo (mouseDown, mouseMove, mouseUp) y
 * gestiona tooltips, comportamiento de gestos y rueda del ratón.
 */

/**
 * ToolManager es la herramienta principal del diagrama que coordina todas
 * las demás herramientas de interacción. Extiende Tool y actúa como un
 * despachador de eventos que delega en las herramientas registradas.
 *
 * Mantiene tres listas de herramientas:
 * - {@link ToolManager#mouseDownTools}: herramientas que responden a mouseDown
 * - {@link ToolManager#mouseMoveTools}: herramientas que responden a mouseMove
 * - {@link ToolManager#mouseUpTools}: herramientas que responden a mouseUp
 *
 * También gestiona tooltips, el comportamiento de gestos multitáctiles
 * y el comportamiento de la rueda del ratón (scroll vs zoom).
 *
 * @class
 * @extends Tool
 */
class ToolManager extends Tool {
  /** @type {List} Lista de herramientas que responden al evento mouseDown */
  uT;
  /** @type {List} Lista de herramientas que responden al evento mouseMove */
  dT;
  /** @type {List} Lista de herramientas que responden al evento mouseUp */
  gT;
  /** @type {number} Retraso en ms antes de mostrar el hover (por defecto 850ms) */
  Zk;
  /** @type {number} Retraso en ms antes de mostrar el hold (por defecto 850ms) */
  Qk;
  /** @type {Size} Distancia mínima de arrastre antes de considerar que es un drag */
  _k;
  /** @type {number} Duración en ms del tooltip (por defecto 5000ms) */
  tP;
  /** @type {WheelMode} Comportamiento de la rueda del ratón (Scroll=1, Zoom=2, None=3) */
  iP;
  /** @type {GestureMode} Comportamiento de gestos multitáctiles (Zoom=1, Cancel=2, None=3) */
  eP;
  /** @type {?Adornment|?HTMLInfo} El tooltip actualmente visible */
  sP;
  /** @type {?Part} La parte asociada al tooltip actual */
  zm;
  /** @type {number} ID del temporizador para extender el tooltip; -1 si no activo */
  ra;

  /**
   * @param {Object=} t Opciones de inicialización opcionales a asignar con Object.assign
   */
  constructor(t) {
    // Inicializa la clase base y configura los valores predeterminados
    (super(),
      (this.name = "ToolManager"),
      (this.uT = new List()),
      (this.dT = new List()),
      (this.gT = new List()),
      (this.Zk = 850),
      (this.Qk = 850),
      (this._k = new Size(2, 2).Ct()), // tamaño de arrastre predeterminado: 2x2 píxeles
      (this.tP = 5e3),
      (this.iP = 1),
      (this.eP = 1),
      (this.sP = null),
      (this.zm = null),
      (this.ra = -1),
      t && Object.assign(this, t)); // permite inicialización rápida con un objeto de opciones
  }

  /** @constant {number} Comportamiento: Scroll con la rueda del ratón */
  static WheelScroll = 1;
  /** @constant {number} Comportamiento: Zoom con la rueda del ratón */
  static WheelZoom = 2;
  /** @constant {number} Comportamiento: Ignorar la rueda del ratón */
  static WheelNone = 3;
  /** @constant {number} Gesto: Zoom por pellizco */
  static GestureZoom = 1;
  /** @constant {number} Gesto: Cancelar acción actual */
  static GestureCancel = 2;
  /** @constant {number} Gesto: Ignorar gestos */
  static GestureNone = 3;

  /** @returns {WheelMode} El comportamiento actual de la rueda del ratón */
  get mouseWheelBehavior() {
    return this.iP;
  }

  /** @param {WheelMode} t Nuevo comportamiento de la rueda del ratón */
  set mouseWheelBehavior(t) {
    (U.W(t, WheelMode, "WheelMode"), (this.iP = t));
  }

  /** @returns {GestureMode} El comportamiento actual de gestos multitáctiles */
  get gestureBehavior() {
    return this.eP;
  }

  /** @param {GestureMode} t Nuevo comportamiento de gestos multitáctiles */
  set gestureBehavior(t) {
    (U.W(t, GestureMode, "GestureMode"), (this.eP = t));
  }

  /**
   * Inicializa y registra las herramientas estándar del diagrama.
   * Las subclases lo sobrescriben para añadir herramientas personalizadas.
   * @returns {ToolManager} this para encadenamiento
   */
  initializeStandardTools() {
    return this;
  }

  /**
   * Actualiza los adornos para una parte dada.
   * Si el tooltip actual corresponde a esta parte, lo muestra; si no, lo oculta.
   * @param {Part} t La parte cuyos adornos deben actualizarse
   */
  updateAdornments(t) {
    const i = this.currentToolTip;
    if (i instanceof Adornment && this.zm === t) {
      const e = i.adornedObject;
      // Si la parte coincide con el objeto adornado del tooltip, muéstralo; si no, ocúltalo
      (t !== null ? e !== null && e.part === t : e === null) ? this.showToolTip(i, e) : this.hideToolTip();
    }
  }
  doMouseDown() {
    const t = this.diagram,
      i = t.lastInput;
    if ((i.isTouchEvent && this.gestureBehavior === 2 && (i.bubbles = !1), i.isMultiTouch)) {
      if ((this.cancelWaitAfter(), this.gestureBehavior === 3)) {
        i.bubbles = !0;
        return;
      }
      if (this.gestureBehavior === 2) return;
      if (t.currentTool.canStartMultiTouch()) {
        t.currentTool.standardPinchZoomStart();
        return;
      }
    }
    const e = t.undoManager;
    Debug &&
      e.checksTransactionLevel &&
      e.transactionLevel !== 0 &&
      U.ot("WARNING: In ToolManager.doMouseDown: UndoManager.transactionLevel is not zero");
    const s = this.mouseDownTools.length;
    for (let n = 0; n < s; n++) {
      const o = this.mouseDownTools.elt(n);
      if (((o.diagram = this.diagram), o.canStart())) {
        (t.doFocus(), (t.currentTool = o), t.currentTool === o && (o.isActive || o.doActivate(), o.doMouseDown()));
        return;
      }
    }
    (t.lastInput.button === 1 &&
      (this.mouseWheelBehavior === 1
        ? (this.mouseWheelBehavior = 2)
        : this.mouseWheelBehavior === 2 && (this.mouseWheelBehavior = 1)),
      this.doActivate(),
      this.standardWaitAfter(this.holdDelay, i));
  }
  doMouseMove() {
    const t = this.diagram,
      i = t.lastInput;
    if (i.isMultiTouch) {
      if (this.gestureBehavior === 3) {
        i.bubbles = !0;
        return;
      }
      if (this.gestureBehavior === 2) return;
      if (t.currentTool.canStartMultiTouch()) {
        t.currentTool.standardPinchZoomMove();
        return;
      }
    }
    if (this.isActive) {
      const s = this.mouseMoveTools.length;
      for (let n = 0; n < s; n++) {
        const o = this.mouseMoveTools.elt(n);
        if (((o.diagram = this.diagram), o.canStart())) {
          (t.doFocus(), (t.currentTool = o), t.currentTool === o && (o.isActive || o.doActivate(), o.doMouseMove()));
          return;
        }
      }
    }
    this.mT(t);
    const e = i.event;
    e !== null && (e.type === "pointermove" || !e.cancelable) && (i.bubbles = !0);
  }
  mT(t) {
    (this.standardMouseOver(),
      this.isBeyondDragSize() && this.standardWaitAfter(this.isActive ? this.holdDelay : this.hoverDelay, t.lastInput));
  }
  cT(t, i) {
    const e = this.currentToolTip;
    e !== null && ((i !== null && e instanceof Adornment && (i === e || i.isContainedBy(e))) || this.hideToolTip());
  }
  doWaitAfter(t) {
    const i = this.diagram;
    if (!i.pR()) return;
    const e = i.lastInput;
    if (
      ((i.lastInput = t),
      this.doMouseHover(),
      this.isActive || this.doToolTip(),
      t.isTouchEvent && !i.lastInput.handled)
    ) {
      const s = t.copy();
      ((s.button = 2), (i.lastInput = s), (i.Tx = !0), i.doMouseUp());
    }
    i.lastInput = e;
  }
  doMouseHover() {
    const t = this.diagram,
      i = t.lastInput;
    i.targetObject === null && (i.targetObject = t.findObjectAt(i.documentPoint, null, null));
    let e = i.targetObject;
    if (e !== null)
      for (i.handled = !1; e !== null; ) {
        const s = this.isActive ? e.mouseHold : e.mouseHover;
        if (s !== null && (s(i, e), i.handled)) break;
        e = e.panel;
      }
    else {
      const s = this.isActive ? t.mouseHold : t.mouseHover;
      s !== null && s(i);
    }
  }
  doToolTip() {
    const t = this.diagram,
      i = t.lastInput;
    i.targetObject === null && (i.targetObject = t.findObjectAt(i.documentPoint, null, null));
    let e = i.targetObject;
    if (e !== null) {
      const s = this.currentToolTip;
      if (s instanceof Adornment && (e === s || e.isContainedBy(s))) return;
      for (; e !== null; ) {
        const n = e.toolTip;
        if (n !== null) {
          this.showToolTip(n, e);
          return;
        }
        e = e.panel;
      }
      this.hideToolTip();
    } else {
      const s = t.toolTip;
      s !== null ? this.showToolTip(s, null) : this.hideToolTip();
    }
  }
  showToolTip(t, i) {
    (Debug &&
      !(t instanceof Adornment || t instanceof HTMLInfo) &&
      U.n("showToolTip:tooltip must be an Adornment or HTMLInfo."),
      i !== null && U.s(i, GraphObject, ToolManager, "showToolTip:obj"));
    const e = this.diagram;
    if ((t !== this.currentToolTip && this.hideToolTip(), t instanceof Adornment)) {
      ((t.layerName = "Tool"),
        (t.selectable = !1),
        (t.scale = 1 / e.scale),
        (t.category = "ToolTip"),
        t.hasPlaceholder() && (t.placeholder.scale = e.scale));
      const s = t.diagram;
      (s !== null && s !== e && s.remove(t),
        e.add(t),
        i !== null ? (t.adornedObject = i) : (t.data = e.model),
        t.ensureBounds(),
        this.positionToolTip(t, i));
    } else t instanceof HTMLInfo && t !== this.currentToolTip && t.show !== null && t.show(i, e, this);
    ((this.currentToolTip = t), this.extendToolTip(this.toolTipDuration));
  }
  positionToolTip(t, i) {
    if (t.hasPlaceholder()) return;
    const e = t,
      s = this.diagram,
      n = s.lastInput.documentPoint.copy(),
      o = e.measuredBounds,
      r = s.viewportBounds;
    (s.lastInput.isTouchEvent && (n.x -= o.width),
      n.x + o.width > r.right && (n.x -= o.width + 5 / s.scale),
      n.x < r.x && (n.x = r.x),
      n.y + 20 / s.scale + o.height > r.bottom ? (n.y -= o.height + 5 / s.scale) : (n.y += 20 / s.scale),
      n.y < r.y && (n.y = r.y),
      (e.position = n));
  }
  extendToolTip(t) {
    (t === void 0 && (t = 3e3),
      this.currentToolTip !== null &&
        (this.ra !== -1 && (U.Mf(this.ra), (this.ra = -1)),
        t > 0 && t !== 1 / 0 && (this.ra = U.yn(() => this.hideToolTip(), t))));
  }
  hideToolTip() {
    this.ra !== -1 && (U.Mf(this.ra), (this.ra = -1));
    const t = this.diagram,
      i = this.currentToolTip;
    i !== null &&
      (i instanceof Adornment
        ? (t.remove(i),
          this.zm !== null && this.zm.removeAdornment(i.category),
          (i.data = null),
          (i.adornedObject = null))
        : i instanceof HTMLInfo && i.hide !== null && i.hide(t, this),
      (this.currentToolTip = null));
  }
  get currentToolTip() {
    return this.sP;
  }
  set currentToolTip(t) {
    (Debug &&
      t !== null &&
      !(t instanceof Adornment || t instanceof HTMLInfo) &&
      U.n("ToolManager.currentToolTip must be an Adornment or HTMLInfo."),
      (this.sP = t),
      (this.zm = t !== null && t instanceof Adornment ? t.adornedPart : null));
  }
  doMouseUp() {
    this.cancelWaitAfter();
    const t = this.diagram;
    if (this.isActive) {
      const i = this.mouseUpTools.length;
      for (let e = 0; e < i; e++) {
        const s = this.mouseUpTools.elt(e);
        if (((s.diagram = this.diagram), s.canStart())) {
          (t.doFocus(), (t.currentTool = s), t.currentTool === s && (s.isActive || s.doActivate(), s.doMouseUp()));
          return;
        }
      }
    }
    (t.doFocus(), this.doDeactivate());
  }
  doMouseWheel() {
    this.standardMouseWheel();
  }
  doKeyDown() {
    const t = this.diagram;
    t.commandHandler !== null && t.commandHandler.doKeyDown();
  }
  doKeyUp() {
    const t = this.diagram;
    t.commandHandler !== null && t.commandHandler.doKeyUp();
  }
  findTool(t) {
    U.i(t, "string", ToolManager, "findTool:name");
    let i = this.mouseDownTools.length;
    for (let e = 0; e < i; e++) {
      const s = this.mouseDownTools.elt(e);
      if (s.name === t) return s;
    }
    i = this.mouseMoveTools.length;
    for (let e = 0; e < i; e++) {
      const s = this.mouseMoveTools.elt(e);
      if (s.name === t) return s;
    }
    i = this.mouseUpTools.length;
    for (let e = 0; e < i; e++) {
      const s = this.mouseUpTools.elt(e);
      if (s.name === t) return s;
    }
    return null;
  }
  replaceTool(t, i) {
    (U.i(t, "string", ToolManager, "replaceTool:name"),
      i !== null && (U.s(i, Tool, ToolManager, "replaceTool:newtool"), (i.diagram = this.diagram)));
    let e = this.mouseDownTools.length;
    for (let s = 0; s < e; s++) {
      const n = this.mouseDownTools.elt(s);
      if (n.name === t) return (i !== null ? this.mouseDownTools.setElt(s, i) : this.mouseDownTools.removeAt(s), n);
    }
    e = this.mouseMoveTools.length;
    for (let s = 0; s < e; s++) {
      const n = this.mouseMoveTools.elt(s);
      if (n.name === t) return (i !== null ? this.mouseMoveTools.setElt(s, i) : this.mouseMoveTools.removeAt(s), n);
    }
    e = this.mouseUpTools.length;
    for (let s = 0; s < e; s++) {
      const n = this.mouseUpTools.elt(s);
      if (n.name === t) return (i !== null ? this.mouseUpTools.setElt(s, i) : this.mouseUpTools.removeAt(s), n);
    }
    return null;
  }
  replaceStandardTool(t, i, e) {
    this.ti(t, i, e);
  }
  ti(t, i, e) {
    (U.i(t, "string", ToolManager, "replaceStandardTool:name"),
      U.s(e, List, ToolManager, "replaceStandardTool:list"),
      i !== null &&
        (U.s(i, Tool, ToolManager, "replaceStandardTool:newtool"), (i.name = t), (i.diagram = this.diagram)),
      this.findTool(t) ? this.replaceTool(t, i) : i !== null && e.add(i));
  }
  get mouseDownTools() {
    return this.uT;
  }
  get mouseMoveTools() {
    return this.dT;
  }
  get mouseUpTools() {
    return this.gT;
  }
  get hoverDelay() {
    return this.Zk;
  }
  set hoverDelay(t) {
    (U.i(t, "number", ToolManager, "hoverDelay"), (this.Zk = t));
  }
  get holdDelay() {
    return this.Qk;
  }
  set holdDelay(t) {
    (U.i(t, "number", ToolManager, "holdDelay"), (this.Qk = t));
  }
  get dragSize() {
    return this._k;
  }
  set dragSize(t) {
    (U.s(t, Size, ToolManager, "dragSize"), (this._k = t.T()));
  }
  get toolTipDuration() {
    return this.tP;
  }
  set toolTipDuration(t) {
    (U.i(t, "number", ToolManager, "toolTipDuration"), (this.tP = t));
  }
  get actionTool() {
    return this.findTool("Action");
  }
  set actionTool(t) {
    this.ti("Action", t, this.mouseDownTools);
  }
  get relinkingTool() {
    return this.findTool("Relinking");
  }
  set relinkingTool(t) {
    this.ti("Relinking", t, this.mouseDownTools);
  }
  get linkReshapingTool() {
    return this.findTool("LinkReshaping");
  }
  set linkReshapingTool(t) {
    this.ti("LinkReshaping", t, this.mouseDownTools);
  }
  get resizingTool() {
    return this.findTool("Resizing");
  }
  set resizingTool(t) {
    this.ti("Resizing", t, this.mouseDownTools);
  }
  get rotatingTool() {
    return this.findTool("Rotating");
  }
  set rotatingTool(t) {
    this.ti("Rotating", t, this.mouseDownTools);
  }
  get linkingTool() {
    return this.findTool("Linking");
  }
  set linkingTool(t) {
    this.ti("Linking", t, this.mouseMoveTools);
  }
  get draggingTool() {
    return this.findTool("Dragging");
  }
  set draggingTool(t) {
    this.ti("Dragging", t, this.mouseMoveTools);
  }
  get dragSelectingTool() {
    return this.findTool("DragSelecting");
  }
  set dragSelectingTool(t) {
    this.ti("DragSelecting", t, this.mouseMoveTools);
  }
  get panningTool() {
    return this.findTool("Panning");
  }
  set panningTool(t) {
    this.ti("Panning", t, this.mouseMoveTools);
  }
  get contextMenuTool() {
    return this.findTool("ContextMenu");
  }
  set contextMenuTool(t) {
    this.ti("ContextMenu", t, this.mouseUpTools);
  }
  get textEditingTool() {
    return this.findTool("TextEditing");
  }
  set textEditingTool(t) {
    this.ti("TextEditing", t, this.mouseUpTools);
  }
  get clickCreatingTool() {
    return this.findTool("ClickCreating");
  }
  set clickCreatingTool(t) {
    this.ti("ClickCreating", t, this.mouseUpTools);
  }
  get clickSelectingTool() {
    return this.findTool("ClickSelecting");
  }
  set clickSelectingTool(t) {
    this.ti("ClickSelecting", t, this.mouseUpTools);
  }
}
