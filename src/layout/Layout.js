/** @fileoverview Clase base para todos los algoritmos de diseño (layout) de IDL.
 * Define la infraestructura común para posicionar nodos y enrutar enlaces
 * en un Diagram, Group o colección de Parts.
 * Proporciona gestión de red (network), origen de disposición, validación,
 * y soporte para transacciones y animaciones.
 */

class Layout {
  f;
  Ra;
  mg;
  Rr;
  pg;
  yg;
  Uo;
  Cl;
  wg;
  xg;
  No;
  /**
   * Constructor de Layout.
   * @param {Object} [t] - Objeto con propiedades de configuración inicial.
   */
  constructor(t) {
    // Inicialización de propiedades internas
    (GSet._i(this),
      (this.f = null),         // diagram: Diagrama asociado al layout
      (this.Ra = null),        // group: Grupo al que pertenece el layout
      (this.mg = true),           // isOngoing: Si el layout está en curso
      (this.Rr = true),           // isInitial: Si es el layout inicial
      (this.pg = false),           // isViewportSized: Si se dimensiona al viewport
      (this.yg = new Point(0, 0)), // arrangementOrigin: Origen de la disposición
      (this.Uo = true),           // isRouting: Si se enrutan los enlaces
      (this.Cl = null),         // isRealtime: Si el layout se ejecuta en tiempo real
      (this.wg = null),         // boundsComputation: Función de cálculo de límites
      (this.xg = false),           // isValidLayout: Si el layout es válido
      (this.No = null),         // network: Red de vértices y aristas
      t && Object.assign(this, t)); // Aplica configuración inicial si existe
  }
  /**
   * Clona las propiedades protegidas a otra instancia de Layout.
   * @param {Layout} t - Instancia de destino para copiar propiedades.
   */
  cloneProtected(t) {
    ((t.mg = this.mg),
      (t.Rr = this.Rr),
      (t.pg = this.pg),
      t.yg.c(this.yg),
      (t.Uo = this.Uo),
      (t.Cl = this.Cl),
      (t.wg = this.wg),
      (t.xg = true)); // Marca el layout clonado como válido
  }
  /**
   * Crea una copia profunda del layout.
   * @returns {Layout} Una nueva instancia con las mismas propiedades.
   */
  copy() {
    const t = new this.constructor();
    return (this.cloneProtected(t), t);
  }
  /**
   * Maneja propiedades genéricas pasadas como argumento numérico/enumerado.
   * @param {number} t - Valor de propiedad a interpretar.
   */
  gi(t) {
    U.wr(this, t);
  }
  /**
   * Representación en texto del layout para depuración.
   * @returns {string} Descripción textual del layout.
   */
  toString() {
    let t = U.Jn(this.constructor);
    return (
      (t += "("),
      this.group !== null && (t += " in " + this.group),
      this.diagram !== null && (t += " for " + this.diagram),
      (t += ")"),
      t
    );
  }
  /** @returns {Diagram} El diagrama asociado al layout. */
  get diagram() {
    return this.f;
  }
  /** @param {Diagram} t - Diagrama a asociar. */
  set diagram(t) {
    (Debug && t !== null && U.s(t, Diagram, Layout, "diagram"), (this.f = t));
  }
  /** @returns {Group} El grupo raíz del layout, si existe. */
  get group() {
    return this.Ra;
  }
  /** @param {Group} t - Grupo raíz a establecer. */
  set group(t) {
    this.Ra !== t &&
      (Debug && t !== null && U.s(t, Group, Layout, "group"), (this.Ra = t), t !== null && (this.f = t.diagram));
  }
  /** @returns {boolean} Si el layout se está ejecutando actualmente. */
  get isOngoing() {
    return this.mg;
  }
  /** @param {boolean} t - Estado en curso. */
  set isOngoing(t) {
    this.mg !== t && (U.i(t, "boolean", Layout, "isOngoing"), (this.mg = t));
  }
  /** @returns {boolean} Si es el layout inicial del diagrama. */
  get isInitial() {
    return this.Rr;
  }
  /** @param {boolean} t - Estado inicial. */
  set isInitial(t) {
    // Si no es inicial, marca el layout como válido
    (U.i(t, "boolean", Layout, "isInitial"), (this.Rr = t), t || (this.xg = true));
  }
  /** @returns {boolean} Si el layout se ajusta al tamaño del viewport. */
  get isViewportSized() {
    return this.pg;
  }
  /** @param {boolean} t - Estado viewport. */
  set isViewportSized(t) {
    this.pg !== t && (U.i(t, "boolean", Layout, "isViewportSized"), (this.pg = t), t && this.b());
  }
  /** @returns {boolean} Si se deben enrutar los enlaces. */
  get isRouting() {
    return this.Uo;
  }
  /** @param {boolean} t - Estado de enrutamiento. */
  set isRouting(t) {
    this.Uo !== t && (U.i(t, "boolean", Layout, "isRouting"), (this.Uo = t));
  }
  /** @returns {boolean|null} Si el layout se ejecuta en tiempo real. */
  get isRealtime() {
    return this.Cl;
  }
  /** @param {boolean|null} t - Estado de tiempo real. */
  set isRealtime(t) {
    this.Cl !== t && (t !== null && U.i(t, "boolean", Layout, "isRealtime"), (this.Cl = t));
  }
  /** @returns {boolean} Si el layout actual es válido. */
  get isValidLayout() {
    return this.xg;
  }
  /** @param {boolean} t - Estado de validez. */
  set isValidLayout(t) {
    if (this.xg !== t && (U.i(t, "boolean", Layout, "isValidLayout"), (this.xg = t), !t)) {
      const i = this.diagram;
      i !== null && (i.tl = true); // Marca el diagrama para actualización si el layout se invalida
    }
  }
  /**
   * Invalida el layout actual, solicitando una actualización del diagrama.
   * No hace nada si ya es inválido, no hay diagrama, o está deshaciendo/rehaciendo.
   */
  invalidateLayout() {
    if (!this.isValidLayout) return;
    const t = this.diagram;
    if (t === null || t.undoManager.isUndoingRedoing) return;
    const i = t.animationManager;
    // Si no está en ejecución de animación, detiene cualquier animación activa
    i.isTicking ||
      (i.defaultAnimation.isAnimating && i.stopAnimation(),
      // Invalida según el estado ongoing/initial del diagrama
      ((this.isOngoing && t.oa) || (this.isInitial && !t.oa)) && ((this.isValidLayout = false), t.requestUpdate()));
  }
  /** Método auxiliar para invalidar el layout. */
  b() {
    this.invalidateLayout();
  }
  /** @returns {LayoutNetwork} La red de vértices y aristas del layout. */
  get network() {
    return this.No;
  }
  /** @param {LayoutNetwork} t - Red a establecer. */
  set network(t) {
    this.No !== t &&
      (Debug && t !== null && U.s(t, LayoutNetwork, Layout, "network"), (this.No = t), t !== null && (t.layout = this));
  }
  /**
   * Crea una nueva red de layout. Las subclases deben sobrescribir este método.
   * @returns {LayoutNetwork} Una nueva red vacía.
   */
  createNetwork() {
    return new LayoutNetwork(this);
  }
  /**
   * Construye la red a partir de un Diagram, Group o colección de Parts.
   * @param {Diagram|Group|Iterable} t - Colección de entrada.
   * @returns {LayoutNetwork} Red construida con vértices y aristas.
   */
  makeNetwork(t) {
    const i = this.createNetwork();
    return (
      // Agrega nodos y enlaces según el tipo de colección
      t instanceof Diagram
        ? (i.addParts(t.nodes, true), i.addParts(t.links, true))
        : t instanceof Group
          ? i.addParts(t.memberParts)
          : i.addParts(t.iterator),
      i
    );
  }
  /**
   * Actualiza las partes del diagrama aplicando el resultado del layout.
   * Envuelve commitLayout en una transacción del diagrama.
   */
  updateParts() {
    this.isValidLayout = true;
    let t = this.diagram;
    // Si no hay diagrama directo, intenta obtenerlo del primer nodo de la red
    if (t === null && this.network !== null) {
      const i = this.network.vertexes.iterator;
      for (; i.next(); ) {
        const s = i.value.node;
        if (s !== null && ((t = s.diagram), t !== null)) break;
      }
    }
    try {
      (t !== null && t.startTransaction("Layout"), this.commitLayout());
    } finally {
      t !== null && t.commitTransaction("Layout");
    }
  }
  /**
   * Aplica las posiciones calculadas a los nodos y enlaces de la red.
   * Itera sobre todos los vértices y, si el enrutamiento está activo, las aristas.
   */
  commitLayout() {
    if (this.network === null) return;
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) t.value.commit(); // Aplica posición de cada vértice
    if (this.isRouting) {
      const i = this.network.edges.iterator;
      for (; i.next(); ) i.value.commit(); // Aplica ruta de cada arista
    }
  }
  /**
   * Ejecuta el algoritmo de layout sobre una colección.
   * Si hay network, delega en doMinimalNoNetworkLayout para un layout básico en cuadrícula.
   * @param {Diagram|Group|Iterable} t - Colección a disponer.
   */
  doLayout(t) {
    Debug &&
      t === null &&
      U.n("Layout.doLayout(collection) argument must not be null but a Diagram, a Group, or an Iterable of Parts");
    const i = new GSet();
    // Recolecta las partes según el tipo de entrada
    if (
      (t instanceof Diagram
        ? (this.Uh(i, t.nodes, true, this.Ia, true, false, true), this.Uh(i, t.parts, true, this.Ia, true, false, true))
        : t instanceof Group
          ? this.Uh(i, t.memberParts, false, this.Ia, true, false, true)
          : i.addAll(t.iterator),
      i.count > 0)
    ) {
      // Ejecuta el layout dentro de una transacción
      const s = this.diagram;
      (s !== null && s.startTransaction("Layout"),
        this.doMinimalNoNetworkLayout(i),
        s !== null && s.commitTransaction("Layout"));
    }
    this.isValidLayout = true;
  }
  /**
   * Disposición mínima sin red: organiza los nodos en una cuadrícula simple.
   * Calcula sqrt(count) para determinar columnas y dispone de izquierda a derecha,
   * de arriba hacia abajo.
   * @param {GSet} t - Conjunto de Parts a disponer.
   */
  doMinimalNoNetworkLayout(t) {
    const i = t.count,                           // Número total de elementos
      e = Math.ceil(Math.sqrt(i));               // Columnas: ceil(sqrt(n)) para disposición cuadrada
    this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin);
    const s = this.arrangementOrigin.x,
      n = this.arrangementOrigin.y;
    let o = s,                                    // Posición x actual
      r = n,                                    // Posición y actual
      l = 0,                                    // Contador de columna
      h = 0;                                    // Altura máxima de fila actual
    const a = t.iterator;
    for (; a.next(); ) {
      const f = a.value;
      f.ensureBounds();
      const c = f.measuredBounds,
        u = c.width,
        d = c.height;
      (f.moveTo(o, r),
        f instanceof Group && (f.Ia = false),
        (o += Math.max(u, 50) + 20),            // Avanza x con ancho o mínimo 50 + espaciado 20
        (h = Math.max(h, Math.max(d, 50))),      // Actualiza altura máxima de fila
        // Si se supera el número de columnas, salta a siguiente fila
        l >= e - 1 ? ((l = 0), (o = s), (r += h + 20), (h = 0)) : l++);
    }
  }
  /**
   * Determina si una parte debe ser reposicionada.
   * @param {Part} t - La parte a evaluar.
   * @returns {boolean} true si la parte no tiene ubicación real o es un Group sin ubicación.
   */
  Ia(t) {
    return !!((!t.location.isReal() && !t.position.isReal()) || (t instanceof Group && t.Ia));
  }
  /**
   * Recolecta partes de un iterador aplicando filtros.
   * @param {GSet} t - Conjunto de destino.
   * @param {Iterator} i - Iterador de partes de origen.
   * @param {boolean} e - Si solo partes de nivel superior.
   * @param {Function} s - Función de filtro opcional.
   * @param {boolean} n - Si se incluyen nodos.
   * @param {boolean} o - Si se incluyen enlaces.
   * @param {boolean} r - Si se incluyen otras partes.
   */
  Uh(t, i, e, s, n, o, r) {
    const l = i.iterator;
    for (; l.next(); ) {
      const h = l.value;
      // Filtra por nivel superior, función de filtro, y capacidad de layout
      if (!(e && !h.isTopLevel) && !(s !== null && !s(h)) && h.canLayout())
        if (n && h instanceof Node) {
          if (h.isLinkLabel) continue;          // Ignora etiquetas de enlace
          // Si es un Group sin layout propio, procesa recursivamente sus miembros
          h instanceof Group && h.layout === null
            ? this.Uh(t, h.memberParts, false, s, n, o, r)
            : (h.ensureBounds(), t.add(h));
        } else o && h instanceof Link ? t.add(h) : r && h.Oe() && !(h instanceof Node) && (h.ensureBounds(), t.add(h));
    }
  }
  /**
   * Obtiene los límites de layout para una parte, aplicando boundsComputation si existe.
   * @param {Part} t - La parte a evaluar.
   * @param {Rect} [i] - Rectángulo preexistente para reutilizar (opcional).
   * @returns {Rect} Los límites calculados.
   */
  getLayoutBounds(t, i) {
    const e = this.boundsComputation;
    return e !== null
      ? (i || (i = new Rect()), e(t, this, i))   // Usa función personalizada si existe
      : !i && t.margin.equalTo(0, 0, 0, 0)
        ? t.actualBounds                         // Sin margen: usa límites reales
        : (i || (i = new Rect()), i.set(t.actualBounds), i.addMargin(t.margin), i); // Aplica margen
  }
  /** @returns {Function} La función de cálculo de límites personalizada. */
  get boundsComputation() {
    return this.wg;
  }
  /** @param {Function} t - Función de cálculo de límites. */
  set boundsComputation(t) {
    this.wg !== t && (t !== null && U.C(t, Layout, "boundsComputation"), (this.wg = t), this.b());
  }
  /**
   * Recolecta todas las partes de una colección para el layout.
   * @param {Diagram|Group|Iterable} t - Colección de entrada.
   * @returns {GSet} Conjunto de partes recolectadas.
   */
  collectParts(t) {
    const i = new GSet();
    return (
      t instanceof Diagram
        ? (this.Uh(i, t.nodes, true, null, true, true, true),
          this.Uh(i, t.links, true, null, true, true, true),
          this.Uh(i, t.parts, true, null, true, true, true))
        : t instanceof Group
          ? this.Uh(i, t.memberParts, false, null, true, true, true)
          : this.Uh(i, t.iterator, false, null, true, true, true),
      i
    );
  }
  /** @returns {Point} El origen de la disposición. */
  get arrangementOrigin() {
    return this.yg;
  }
  /** @param {Point} t - Nuevo origen de disposición. */
  set arrangementOrigin(t) {
    (Debug && U.s(t, Point, Layout, "arrangementOrigin"), this.yg.equals(t) || (this.yg.c(t), this.b()));
  }
  /**
   * Calcula el origen inicial considerando placeholders de grupos.
   * Si el grupo tiene placeholder, usa su posición; si no, usa la posición del grupo.
   * @param {Point} t - Origen por defecto.
   * @returns {Point} El origen inicial calculado.
   */
  initialOrigin(t) {
    const i = this.group;
    if (i !== null)
      if (i.hasPlaceholder()) {
        // Grupo con placeholder: usa el punto TopLeft del placeholder
        const e = i.placeholder,
          s = e.getDocumentPoint(Spot.TopLeft);
        (isNaN(s.x) || isNaN(s.y)) && s.set(t);
        const n = e.padding;
        return ((s.x += n.left), (s.y += n.top), s);
      } else {
        // Grupo sin placeholder: usa la posición del grupo
        const e = i.position.copy();
        return ((isNaN(e.x) || isNaN(e.y)) && e.set(t), e);
      }
    return t;
  }
}
