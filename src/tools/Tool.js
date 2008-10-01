/**
 * @fileoverview Clase base para todas las herramientas de interacción del diagrama.
 * Proporciona la estructura fundamental para herramientas como arrastre, selección,
 * creación de enlaces, redimensionamiento y edición de texto. Gestiona el ciclo de
 * vida de las herramientas: inicio, activación, desactivación y detención, así como
 * la interacción con el diagrama, transacciones y eventos de entrada.
 *
 * Las herramientas se asocian a un Diagrama y son gestionadas por ToolManager,
 * que las invoca según los eventos del ratón/teclado.
 */

/**
 * Clase base abstracta para todas las herramientas de interacción en IDL.
 * Define el ciclo de vida estándar de una herramienta y proporciona métodos
 * utilitarios para manejo de eventos, selección, zoom con pellizco y tooltips.
 *
 * El ciclo de vida típico de una herramienta es:
 * 1. {@link Tool#canStart} - verifica si la herramienta puede iniciar
 * 2. {@link Tool#doStart} - inicia la herramienta
 * 3. {@link Tool#doActivate} - activa la herramienta (establece isActive = true)
 * 4. Métodos de acción (doMouseDown, doMouseMove, doMouseUp, etc.)
 * 5. {@link Tool#doDeactivate} o {@link Tool#doStop} o {@link Tool#doCancel} - finaliza
 *
 * @class
 */
class Tool {
  /** @type {Diagram} Referencia al diagrama al que pertenece esta herramienta */
  f;
  /** @type {string} Nombre de la herramienta, usado para identificarla en ToolManager */
  At;
  /** @type {boolean} Indica si la herramienta está habilitada para ser usada */
  Gi;
  /** @type {boolean} Indica si la herramienta está actualmente activa (ejecutándose) */
  Wk;
  /** @type {?string} Resultado de la transacción al detener la herramienta */
  jk;
  /** @type {number} ID del temporizador para waitAfter; -1 si no hay temporizador activo */
  Vm;
  /** @type {InputEvent} Copia del evento de entrada usada en esperas diferidas */
  aT;

  /** Constructor de la clase base Tool. Inicializa los valores predeterminados. */
  constructor() {
    // Inicialización de propiedades con valores por defecto
    (GSet._i(this),
      (this.f = Diagram.Bm()),
      (this.At = ""),
      (this.Gi = !0),
      (this.Wk = !1),
      (this.jk = null),
      (this.aT = new InputEvent()),
      (this.Vm = -1));
  }

  /** @returns {Diagram} El diagrama al que pertenece esta herramienta */
  get diagram() {
    return this.f;
  }

  /** @param {Diagram} t El diagrama a asociar con esta herramienta */
  set diagram(t) {
    // Solo permite asignar si t es una instancia de Diagram
    t instanceof Diagram && (this.f = t);
  }

  /** @returns {string} Representación en cadena de la herramienta, ej. "Dragging Tool" */
  toString() {
    return this.name !== "" ? this.name + " Tool" : U.Jn(this.constructor);
  }

  /**
   * Actualiza los adornos asociados a una parte del diagrama.
   * Las subclases sobrescriben este método para refrescar adornos de selección,
   * redimensionamiento u otros indicadores visuales.
   * @param {Part} t La parte cuyos adornos deben actualizarse
   */
  updateAdornments(t) {}

  /**
   * Verifica si la herramienta puede iniciar su operación.
   * @returns {boolean} true si la herramienta está habilitada y puede iniciar
   */
  canStart() {
    return this.isEnabled;
  }

  /** Inicia la herramienta. Las subclases lo sobrescriben para lógica de inicio. */
  doStart() {}

  /** Activa la herramienta, estableciendo su estado como activo. */
  doActivate() {
    this.isActive = !0;
  }

  /** Desactiva la herramienta, estableciendo su estado como inactivo. */
  doDeactivate() {
    this.isActive = !1;
  }

  /** Detiene la herramienta normalmente. Las subclases lo sobrescriben. */
  doStop() {}

  /** Cancela la herramienta, anulando el resultado y deteniéndola. */
  doCancel() {
    ((this.transactionResult = null), this.stopTool());
  }

  /**
   * Detiene la herramienta: la desasigna como herramienta actual del diagrama
   * y restablece el cursor.
   */
  stopTool() {
    const t = this.diagram;
    // Solo se detiene si esta herramienta es la actual del diagrama
    t.currentTool === this && ((t.currentTool = null), (t.currentCursor = ""));
  }

  /**
   * Maneja el evento mousedown. Si la herramienta no está activa y puede iniciar,
   * la activa automáticamente.
   */
  doMouseDown() {
    !this.isActive && this.canStart() && this.doActivate();
  }

  /** Maneja el evento mousemove. Las subclases lo sobrescriben. */
  doMouseMove() {}

  /** Maneja el evento mouseup. Por defecto, detiene la herramienta. */
  doMouseUp() {
    this.stopTool();
  }

  /** Maneja el evento mousewheel. Las subclases lo sobrescriben. */
  doMouseWheel() {}

  /**
   * Verifica si la herramienta puede iniciar con gestos multitáctiles.
   * @returns {boolean} true por defecto, las subclases pueden restringirlo
   */
  canStartMultiTouch() {
    return !0;
  }
  /**
   * Inicia el zoom por pellizco (gesto multitáctil estándar).
   * Calcula la distancia inicial entre los dos puntos táctiles y almacena
   * la escala actual del diagrama para calcular el factor de zoom.
   */
  standardPinchZoomStart() {
    const t = this.diagram,
      i = t.lastInput,
      e = i.getMultiTouchViewPoint(0, Point.U(NaN, NaN)),
      s = i.getMultiTouchViewPoint(1, Point.U(NaN, NaN));
    // Si alguno de los puntos táctiles no es válido, aborta
    if (!e.isReal() || !s.isReal()) {
      (Point.o(e), Point.o(s));
      return;
    }
    // Cancela cualquier herramienta activa antes de iniciar el zoom por pellizco
    if ((this.doCancel(), t.getInputOption("hasGestureZoom"))) {
      t.Jk = t.scale;
      const n = s.x - e.x,
        o = s.y - e.y,
        r = Math.sqrt(n * n + o * o); // distancia euclidiana entre los dos puntos táctiles
      ((t.$k = r), (i.bubbles = !1)); // $k = distancia inicial de referencia
    }
    (Point.o(e), Point.o(s));
  }

  /**
   * Mueve el zoom por pellizco (gesto multitáctil estándar).
   * Recalcula el factor de zoom basado en el cambio de distancia entre
   * los puntos táctiles respecto a la distancia inicial.
   */
  standardPinchZoomMove() {
    const t = this.diagram,
      i = t.lastInput,
      e = i.getMultiTouchViewPoint(0, Point.U(NaN, NaN)),
      s = i.getMultiTouchViewPoint(1, Point.U(NaN, NaN));
    // Si alguno de los puntos táctiles no es válido, aborta
    if (!e.isReal() || !s.isReal()) {
      (Point.o(e), Point.o(s));
      return;
    }
    if ((this.doCancel(), t.getInputOption("hasGestureZoom"))) {
      const n = s.x - e.x,
        o = s.y - e.y,
        l = Math.sqrt(n * n + o * o) / t.$k, // factor de escala relativo a la distancia inicial
        h = new Point((Math.min(s.x, e.x) + Math.max(s.x, e.x)) / 2, (Math.min(s.y, e.y) + Math.max(s.y, e.y)) / 2), // punto medio entre los dos dedos
        a = t.Jk * l, // nueva escala calculada
        f = t.commandHandler;
      // Solo aplica el zoom si la escala cambió y es válida
      if (a !== t.scale && f.canResetZoom(a)) {
        const c = t.zoomPoint;
        ((t.zoomPoint = h), f.resetZoom(a), (t.zoomPoint = c)); // guarda y restaura el punto de zoom original
      }
      i.bubbles = !1;
    }
    (Point.o(e), Point.o(s));
  }

  /**
   * Maneja el evento keydown. Por defecto, la tecla Escape cancela la herramienta.
   */
  doKeyDown() {
    // La tecla Escape siempre cancela la herramienta actual
    this.diagram.lastInput.code === "Escape" && this.doCancel();
  }

  /** Maneja el evento keyup. Las subclases lo sobrescriben. */
  doKeyUp() {}

  /**
   * Inicia una transacción en el UndoManager del diagrama.
   * @param {string=} t Nombre de la transacción; por defecto usa el nombre de la herramienta
   * @returns {boolean} true si la transacción fue iniciada exitosamente
   */
  startTransaction(t) {
    return (t === void 0 && (t = this.name), (this.transactionResult = null), this.diagram.startTransaction(t));
  }

  /**
   * Finaliza la transacción actual: si transactionResult es null hace rollback,
   * de lo contrario hace commit con el resultado especificado.
   * @returns {boolean} true si la transacción fue completada exitosamente
   */
  stopTransaction() {
    const t = this.diagram;
    // Si no hay transactionResult, revierte; si lo hay, confirma con ese resultado
    return this.transactionResult === null ? t.rollbackTransaction() : t.commitTransaction(this.transactionResult);
  }
  /**
   * Realiza la selección estándar con el ratón.
   * Comportamiento:
   * - Ctrl/Cmd + clic: alterna selección de la parte
   * - Shift + clic: añade a la selección
   * - Clic simple: selecciona solo esa parte
   * - Clic en fondo: deselecciona todo
   */
  standardMouseSelect() {
    const t = this.diagram;
    if (!t.allowSelect) return; // aborta si el diagrama no permite selección
    const i = t.lastInput,
      e = t.findPartAt(i.documentPoint, !1);
    if (e !== null) {
      // Ctrl/Cmd + clic: alternar selección de la parte
      if (U.yr ? i.meta : i.control) {
        t.F("ChangingSelection", t.selection);
        let s = e;
        // Sube en la jerarquía hasta encontrar una parte seleccionable
        for (; s !== null && !s.canSelect(); ) s = s.containingGroup;
        (s !== null && (s.isSelected = !s.isSelected), t.F("ChangedSelection", t.selection));
      } else if (i.shift) {
        // Shift + clic: añadir a la selección si no está ya seleccionada
        if (!e.isSelected) {
          t.F("ChangingSelection", t.selection);
          let s = e;
          for (; s !== null && !s.canSelect(); ) s = s.containingGroup;
          (s !== null && (s.isSelected = !0), t.F("ChangedSelection", t.selection));
        }
      } else if (!e.isSelected) {
        // Clic simple: seleccionar solo esta parte
        let s = e;
        for (; s !== null && !s.canSelect(); ) s = s.containingGroup;
        s !== null && t.select(s);
      }
      // Clic en fondo sin modificadores: deseleccionar todo
    } else i.left && !(U.yr ? i.meta : i.control) && !i.shift && t.clearSelection();
  }

  /**
   * Realiza el clic estándar del ratón, encontrando el objeto en la posición
   * del clic y generando los eventos de clic correspondientes.
   * @param {function(GraphObject):boolean=} t Función de filtro opcional para encontrar el objeto
   * @param {function(GraphObject):boolean=} i Función de filtro para objetos a distancia
   * @returns {boolean} true si el clic fue manejado por algún objeto
   */
  standardMouseClick(t, i) {
    (t === void 0 && (t = null), i === void 0 && (i = (o) => !o.layer?.isTemporary));
    const e = this.diagram,
      s = e.lastInput,
      n = e.findObjectAt(s.documentPoint, t, i); // encuentra el objeto en la posición del clic
    return ((s.targetObject = n), this.fT(n, s, e));
  }

  /**
   * Despacha eventos de clic al objeto destino y a sus paneles contenedores.
   * Genera eventos ObjectSingleClicked, ObjectDoubleClicked, ObjectContextClicked
   * o sus equivalentes Background* según corresponda.
   * @param {GraphObject} t El objeto sobre el que se hizo clic
   * @param {InputEvent} i El evento de entrada
   * @param {Diagram} e El diagrama
   * @returns {boolean} true si el clic fue manejado por algún manejador
   */
  fT(t, i, e) {
    if (((i.handled = !1), t !== null && !t.isEnabledObject())) return !1; // si el objeto no está habilitado, no procesa
    let s = 0; // tipo de clic: 1=simple, 2=doble, 3=contexto
    // Determina el tipo de clic según el botón y el contador de clics
    i.left
      ? i.clickCount === 1
        ? (s = 1)
        : i.clickCount === 2
          ? (s = 2)
          : (s = 1)
      : i.right && i.clickCount === 1 && (s = 3);
    let n = "ObjectSingleClicked";
    if (t !== null) {
      // Clic sobre un objeto: genera evento Object*
      switch (s) {
        case 1:
          n = "ObjectSingleClicked";
          break;
        case 2:
          n = "ObjectDoubleClicked";
          break;
        case 3:
          n = "ObjectContextClicked";
          break;
      }
      s !== 0 && e.F(n, t);
    } else {
      // Clic en el fondo: genera evento Background*
      switch (s) {
        case 1:
          n = "BackgroundSingleClicked";
          break;
        case 2:
          n = "BackgroundDoubleClicked";
          break;
        case 3:
          n = "BackgroundContextClicked";
          break;
      }
      s !== 0 && e.F(n);
    }
    if (t !== null)
      // Recorre la jerarquía de paneles del objeto buscando manejadores de clic
      for (; t !== null; ) {
        let o = null;
        switch (s) {
          case 1:
            o = t.click;
            break;
          case 2:
            o = t.doubleClick ? t.doubleClick : t.click; // si no hay doubleClick, usa click como fallback
            break;
          case 3:
            o = t.contextClick;
            break;
        }
        if (o !== null && (o(i, t), i.handled)) break; // si el manejador existe y marca handled, detiene la búsqueda
        t = t.panel; // sube al panel contenedor
      }
    else {
      // Clic en el fondo: usa los manejadores del diagrama
      let o = null;
      switch (s) {
        case 1:
          o = e.click;
          break;
        case 2:
          o = e.doubleClick ? e.doubleClick : e.click;
          break;
        case 3:
          o = e.contextClick;
          break;
      }
      o !== null && o(i);
    }
    return i.handled;
  }

  /**
   * Maneja el evento mouseOver estándar, rastreando el objeto bajo el cursor.
   * Gestiona las transiciones mouseEnter/mouseLeave entre objetos, actualiza
   * el cursor y dispara los eventos mouseOver correspondientes.
   */
  standardMouseOver() {
    const t = this.diagram,
      i = t.lastInput;
    // No procesa si las animaciones están en curso
    if (t.animationManager.Ni === !0) return;
    const e = t.skipsUndoManager;
    t.skipsUndoManager = !0;
    // Encuentra el objeto bajo el cursor, null si está fuera del viewport
    let s = t.viewportBounds.containsPoint(i.documentPoint) ? t.findObjectAt(i.documentPoint, null, null) : null;
    // Si el evento es pointercancel/pointerout, fuerza target a null (el cursor salió)
    (i.event && (i.event.type === "pointercancel" || i.event.type === "pointerout") && (s = null),
      (i.targetObject = s));
    let n = !1; // indica si se necesita repintar
    if (s !== t.Vf) {
      // El objeto bajo el cursor cambió: procesar mouseLeave de objetos que se abandonan
      let o = t.Vf;
      const r = o;
      for (t.Vf = s, this.cT(o, s), i.handled = !1; o !== null; ) {
        const l = o.mouseLeave;
        // Dispara mouseLeave si: es el mismo objeto, o el nuevo está contenido en este, o el manejador fue invocado
        if (l !== null && (s === o || (s !== null && s.isContainedBy(o)) || (l(i, o, s), (n = !0), i.handled))) break;
        o = o.panel;
      }
      // Procesa mouseEnter para los nuevos objetos bajo el cursor
      for (o = r, i.handled = !1; s !== null; ) {
        const l = s.mouseEnter;
        if (l !== null && (o === s || (o !== null && o.isContainedBy(s)) || (l(i, s, o), (n = !0), i.handled))) break;
        s = s.panel;
      }
      s = t.Vf;
    }
    if (s !== null) {
      // Hay un objeto bajo el cursor: actualiza el cursor y dispara mouseOver
      let o = s,
        r = "";
      // Sube en la jerarquía para encontrar el cursor definido
      for (; o !== null && ((r = o.cursor), r === ""); ) o = o.panel;
      for (t.currentCursor = r, i.handled = !1, o = s; o !== null; ) {
        const l = o.mouseOver;
        if (l !== null && (l(i, o), (n = !0), i.handled)) break;
        o = o.panel;
      }
    } else {
      // No hay objeto bajo el cursor: restablece el cursor y dispara mouseOver del diagrama
      this.doUpdateCursor(null);
      const o = t.mouseOver;
      o !== null && (o(i), (n = !0));
    }
    (n && t.requestUpdate(), (t.skipsUndoManager = e));
  }
  /**
   * Actualiza el cursor del diagrama. Las subclases pueden sobrescribir
   * para establecer cursores personalizados según el contexto.
   * @param {GraphObject} t El objeto bajo el cursor, o null
   */
  doUpdateCursor(t) {
    const i = this.diagram;
    i && (i.currentCursor = ""); // restablece el cursor al predeterminado
  }

  /**
   * Llamado cuando el objeto bajo el cursor cambia de `t` a `i`.
   * ToolManager lo sobrescribe para gestionar tooltips.
   * @param {GraphObject} t El objeto anterior bajo el cursor
   * @param {GraphObject} i El nuevo objeto bajo el cursor
   */
  cT(t, i) {}

  /**
   * Maneja el evento mouseWheel estándar.
   * Según el comportamiento configurado (scroll o zoom) y las teclas modificadoras,
   * realiza zoom, scroll horizontal o scroll vertical.
   */
  standardMouseWheel() {
    const t = this.diagram,
      i = t.lastInput;
    let e = i.delta;
    // No procesa si el delta es cero o el documento no tiene tamaño real
    if (e === 0 || !t.documentBounds.isReal()) return;
    const s = t.commandHandler,
      n = t.toolManager.mouseWheelBehavior;
    // Modo zoom: WheelZoom=2 sin shift, o WheelScroll=1 con control
    if (s !== null && ((n === 2 && !i.shift) || (n === 1 && i.control))) {
      if (e > 0 ? s.canIncreaseZoom() : s.canDecreaseZoom()) {
        const o = t.zoomPoint;
        // Establece el punto de zoom temporalmente en la posición del cursor
        ((t.zoomPoint = i.viewPoint), e > 0 ? s.increaseZoom() : s.decreaseZoom(), (t.zoomPoint = o));
      }
      i.bubbles = !1;
    } else if ((n === 2 && i.shift) || (n === 1 && !i.control)) {
      // Modo scroll: calcula la dirección y cantidad de desplazamiento
      const o = t.position.copy(),
        r = i.event,
        l = r.deltaMode;
      let h = r.deltaX,
        a = r.deltaY,
        f = "pixel"; // modo de scroll: pixel, line o page
      if ((h !== 0 || a !== 0) && !i.shift) {
        // Scroll bidireccional (ambos ejes)
        switch (l) {
          case 0:
            f = "pixel";
            break;
          case 1:
            f = "line";
            break;
          case 2:
            f = "page";
            break;
        }
        // Scroll horizontal
        if (h !== 0 && t.allowHorizontalScroll) {
          const c = t.scrollHorizontalLineChange;
          ((h = h * (c / 16)), t.scroll(f, h > 0 ? "right" : "left", Math.abs(h)));
        }
        // Scroll vertical
        if (a !== 0 && t.allowVerticalScroll) {
          const c = t.scrollVerticalLineChange;
          ((a = a * (c / 16)), t.scroll(f, a > 0 ? "down" : "up", Math.abs(a)));
        }
      } else
        // Scroll unidireccional: sin shift = vertical, con shift = horizontal
        !i.shift && t.allowVerticalScroll
          ? ((e = e * 3 * t.scrollVerticalLineChange), t.scroll(f, e > 0 ? "up" : "down", Math.abs(e)))
          : i.shift &&
            t.allowHorizontalScroll &&
            ((e = e * 3 * t.scrollHorizontalLineChange), t.scroll(f, e > 0 ? "left" : "right", Math.abs(e)));
      this.doWheelChange(t, o, i);
    }
  }

  /**
   * Llamado después de que el scroll por rueda ha sido aplicado.
   * Las subclases pueden sobrescribir para reaccionar al cambio de posición.
   * @param {Diagram} t El diagrama
   * @param {Point} i La posición anterior del viewport
   * @param {InputEvent} e El evento de entrada
   */
  doWheelChange(t, i, e) {
    // Si la posición cambió o hubo scroll horizontal, evita que el evento se propague
    (!t.position.equals(i) || e.event.wheelDeltaX !== 0) && (e.bubbles = !1);
  }

  /**
   * Programa una espera diferida después de un retraso especificado.
   * Cancela cualquier espera previa y programa una nueva llamada a doWaitAfter.
   * @param {number} t Retraso en milisegundos
   * @param {InputEvent=} i Evento de entrada a pasar a doWaitAfter; por defecto el último input
   */
  standardWaitAfter(t, i) {
    (Debug && U.i(t, "number", Tool, "standardWaitAfter:delay"),
      i === void 0 && (i = this.diagram.lastInput),
      this.cancelWaitAfter()); // cancela cualquier temporizador previo
    const e = this,
      s = i.clone(this.aT); // clona el evento para usarlo en el callback diferido
    this.Vm = U.yn(() => e.doWaitAfter(s), t);
  }

  /** Cancela cualquier temporizador de espera diferida (waitAfter) activo. */
  cancelWaitAfter() {
    (this.Vm !== -1 && U.Mf(this.Vm), (this.Vm = -1));
  }

  /**
   * Llamado después de que expira el temporizador de espera.
   * Las subclases (ej. ToolManager) lo sobrescriben para mostrar tooltips.
   * @param {InputEvent} t El evento de entrada capturado al iniciar la espera
   */
  doWaitAfter(t) {}

  /**
   * Busca un mango de herramienta (tool handle) en una posición dada.
   * Los tool handles son adornos que permiten manipular partes del diagrama.
   * @param {Point} t Posición en coordenadas de documento
   * @param {string} i Categoría del adorno a buscar
   * @returns {?GraphObject} El mango encontrado, o null
   */
  findToolHandleAt(t, i) {
    const s = this.diagram.findObjectAt(t, (n) => {
      // Sube por la jerarquía hasta encontrar un Adornment
      for (; n !== null && !(n.panel instanceof Adornment); ) n = n.panel;
      return n;
    });
    return s === null ? null : s.part.category === i ? s : null;
  }

  /**
   * Determina si el cursor se ha movido más allá del umbral de arrastre.
   * Se usa para distinguir entre un clic y un inicio de arrastre.
   * @param {Point=} t Punto inicial; por defecto firstInput.viewPoint
   * @param {Point=} i Punto actual; por defecto lastInput.viewPoint
   * @returns {boolean} true si se superó el dragSize en X o Y
   */
  isBeyondDragSize(t, i) {
    const e = this.diagram;
    (t === void 0 && (t = e.firstInput.viewPoint), i === void 0 && (i = e.lastInput.viewPoint));
    const s = e.toolManager.dragSize;
    let n = s.width,
      o = s.height;
    // Tolerancia adicional para eventos táctiles (+6 píxeles) por la imprecisión del dedo
    return (e.firstInput.isTouchEvent && ((n += 6), (o += 6)), Math.abs(i.x - t.x) > n || Math.abs(i.y - t.y) > o);
  }

  /** @returns {string} El nombre de la herramienta */
  get name() {
    return this.At;
  }

  /** @param {string} t El nombre para la herramienta */
  set name(t) {
    (U.i(t, "string", Tool, "name"), (this.At = t));
  }

  /** @returns {boolean} true si la herramienta está habilitada */
  get isEnabled() {
    return this.Gi;
  }

  /** @param {boolean} t Establece si la herramienta está habilitada */
  set isEnabled(t) {
    (U.i(t, "boolean", Tool, "isEnabled"), (this.Gi = t));
  }

  /** @returns {boolean} true si la herramienta está actualmente activa */
  get isActive() {
    return this.Wk;
  }

  /** @param {boolean} t Establece el estado activo de la herramienta */
  set isActive(t) {
    (U.i(t, "boolean", Tool, "isActive"), (this.Wk = t));
  }

  /** @returns {?string} El resultado de la transacción actual, o null */
  get transactionResult() {
    return this.jk;
  }

  /** @param {?string} t El resultado a asignar a la transacción ("Committed", nombre del cambio, etc.) */
  set transactionResult(t) {
    (t !== null && U.i(t, "string", Tool, "transactionResult"), (this.jk = t));
  }
}
/**
 * Enumeración para el comportamiento de la rueda del ratón.
 * @enum {number}
 */
var WheelMode = ((w) => ((w[(w.Scroll = 1)] = "Scroll"), (w[(w.Zoom = 2)] = "Zoom"), (w[(w.None = 3)] = "None"), w))(
    WheelMode || {},
  ),
  /**
   * Enumeración para el comportamiento de gestos multitáctiles.
   * @enum {number}
   */
  GestureMode = ((w) => ((w[(w.Zoom = 1)] = "Zoom"), (w[(w.Cancel = 2)] = "Cancel"), (w[(w.None = 3)] = "None"), w))(
    GestureMode || {},
  );
