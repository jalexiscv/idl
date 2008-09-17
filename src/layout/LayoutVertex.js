/** @fileoverview Representación de un vértice en la red de layout de IDL.
 * LayoutVertex envuelve un Node del diagrama y almacena su posición,
 * límites (bounds), punto focal (focus) y listas de aristas incidentes
 * (sourceEdges y destinationEdges). Es la unidad básica sobre la que
 * operan los algoritmos de layout.
 */

class LayoutVertex {
  No;
  oi;
  Be;
  qe;
  os;
  hr;
  ar;
  /**
   * Construye un nuevo vértice de layout.
   * @param {LayoutNetwork} t - La red a la que pertenece este vértice.
   */
  constructor(t) {
    (GSet._i(this),
      Debug && !t && U.n("LayoutVertex constructor requires non-null LayoutNetwork argument"),
      (this.No = t),                          // network: Red propietaria
      (this.qe = new Rect(0, 0, 10, 10)),    // bounds: Límites del vértice (por defecto 10x10)
      (this.os = new Point(5, 5)),            // focus: Punto focal relativo (centro por defecto)
      (this.oi = null),                       // data: Datos asociados (para nodos virtuales)
      (this.Be = null),                       // node: Nodo del diagrama asociado
      (this.hr = new List()),                 // sourceEdges: Aristas donde este vértice es origen
      (this.ar = new List()));                // destinationEdges: Aristas donde este vértice es destino
  }
  /** Limpia las referencias del vértice. */
  clear() {
    ((this.oi = null), (this.Be = null), (this.hr = new List()), (this.ar = new List()));
  }
  /**
   * Representación textual del vértice para depuración.
   * @param {number} [t=0] - Nivel de detalle.
   * @returns {string} Descripción del vértice.
   */
  toString(t) {
    t === void 0 && (t = 0);
    let i = "LayoutVertex#" + GSet.Ps(this);
    if (t > 0 && ((i += this.node !== null ? "(" + this.node.toString() + ")" : ""), t > 1)) {
      let e = "",
        s = true,
        n = this.hr.iterator;
      for (; n.next(); ) {
        const r = n.value;
        (s ? (s = false) : (e += ","), (e += r.toString(0)));
      }
      let o = "";
      for (s = true, n = this.ar.iterator; n.next(); ) {
        const r = n.value;
        (s ? (s = false) : (o += ","), (o += r.toString(0)));
      }
      i += " sources: " + e + " destinations: " + o;
    }
    return i;
  }
  /** @returns {Iterator} Iterador sobre las aristas de origen. */
  get Ao() {
    return this.hr.RA;
  }
  /** @returns {Iterator} Iterador sobre las aristas de destino. */
  get fr() {
    return this.ar.RA;
  }
  /** @returns {Object} Datos asociados al vértice (para nodos virtuales/artificiales). */
  get data() {
    return this.oi;
  }
  /**
   * Establece los datos del vértice. Si los datos tienen bounds,
   * actualiza la posición y el foco del vértice.
   * @param {Object} t - Datos a asociar.
   */
  set data(t) {
    if (((this.oi = t), t !== null && t.bounds)) {
      const i = t.bounds,
        e = i.x,
        s = i.y,
        n = i.width,
        o = i.height;
      // El foco es el centro geométrico del rectángulo de datos
      (this.os.e(n / 2, o / 2), this.qe.e(e, s, n, o));
    }
  }
  /** @returns {Node} El nodo del diagrama asociado a este vértice. */
  get node() {
    return this.Be;
  }
  /**
   * Asocia un nodo del diagrama al vértice. Calcula los límites
   * usando getLayoutBounds del layout propietario y establece el foco
   * según la ubicación del nodo.
   * @param {Node} t - Nodo a asociar.
   */
  set node(t) {
    if (this.Be !== t) {
      if ((Debug && t !== null && U.s(t, Node, LayoutVertex, "node"), (this.Be = t), t === null)) return;
      t.ensureBounds();
      const i = this.network.layout,
        e = Rect.a(),                              // Rect temporal
        s = i.getLayoutBounds(t, e);              // Obtiene límites con margen
      let n = s.x,
        o = s.y;
      const r = s.width,
        l = s.height;
      if ((isNaN(n) && (n = 0), isNaN(o) && (o = 0), this.qe.e(n, o, r, l), Rect.o(e), !(t instanceof Group))) {
        // Para nodos no-grupo, calcula el foco desde el centro del objeto de ubicación
        const h = t.locationObject.getDocumentPoint(Spot.Center);
        if (h.isReal()) {
          this.os.e(h.x - n, h.y - o);             // Foco relativo al bounds
          return;
        }
      }
      this.os.e(r / 2, l / 2);                     // Por defecto, foco en el centro geométrico
    }
  }
  /** @returns {Rect} Los límites (bounds) del vértice. */
  get bounds() {
    return this.qe;
  }
  /** @param {Rect} t - Nuevos límites. */
  set bounds(t) {
    this.qe.equals(t) || (Debug && U.s(t, Rect, LayoutVertex, "bounds"), this.qe.c(t));
  }
  /** @returns {Point} El punto focal del vértice (relativo a bounds). */
  get focus() {
    return this.os;
  }
  /** @param {Point} t - Nuevo punto focal. */
  set focus(t) {
    this.os.equals(t) || (Debug && U.s(t, Point, LayoutVertex, "focus"), this.os.c(t));
  }
  /**
   * @returns {number} Coordenada X del centro del vértice (bounds.x + focus.x).
   */
  get centerX() {
    return this.qe.x + this.os.x;
  }
  /**
   * @param {number} t - Nueva coordenada X del centro.
   * Ajusta bounds.x para que bounds.x + focus.x = t.
   */
  set centerX(t) {
    const i = this.qe;
    i.x + this.os.x !== t && (Debug && U.r(t, LayoutVertex, "centerX"), (i.x = t - this.os.x));
  }
  /**
   * @returns {number} Coordenada Y del centro del vértice (bounds.y + focus.y).
   */
  get centerY() {
    return this.qe.y + this.os.y;
  }
  /**
   * @param {number} t - Nueva coordenada Y del centro.
   * Ajusta bounds.y para que bounds.y + focus.y = t.
   */
  set centerY(t) {
    const i = this.qe;
    i.y + this.os.y !== t && (Debug && U.r(t, LayoutVertex, "centerY"), (i.y = t - this.os.y));
  }
  /** @returns {number} Componente X del punto focal. */
  get focusX() {
    return this.os.x;
  }
  /** @param {number} t - Nuevo focusX. */
  set focusX(t) {
    const i = this.os;
    i.x !== t && (i.x = t);
  }
  /** @returns {number} Componente Y del punto focal. */
  get focusY() {
    return this.os.y;
  }
  /** @param {number} t - Nuevo focusY. */
  set focusY(t) {
    const i = this.os;
    i.y !== t && (i.y = t);
  }
  /** @returns {number} Coordenada X del bounds. */
  get x() {
    return this.qe.x;
  }
  /** @param {number} t - Nueva coordenada X del bounds. */
  set x(t) {
    const i = this.qe;
    i.x !== t && (i.x = t);
  }
  /** @returns {number} Coordenada Y del bounds. */
  get y() {
    return this.qe.y;
  }
  /** @param {number} t - Nueva coordenada Y del bounds. */
  set y(t) {
    const i = this.qe;
    i.y !== t && (i.y = t);
  }
  /** @returns {number} Ancho del bounds. */
  get width() {
    return this.qe.width;
  }
  /** @param {number} t - Nuevo ancho. */
  set width(t) {
    const i = this.qe;
    i.width !== t && (i.width = t);
  }
  /** @returns {number} Alto del bounds. */
  get height() {
    return this.qe.height;
  }
  /** @param {number} t - Nuevo alto. */
  set height(t) {
    const i = this.qe;
    i.height !== t && (i.height = t);
  }
  /**
   * Aplica la posición calculada al nodo del diagrama o a los datos.
   * Para nodos no-grupo, calcula la posición basada en el foco y el centro;
   * para grupos, simplemente mueve a la esquina del bounds.
   */
  commit() {
    const t = this.oi;
    // Si hay datos asociados (nodo virtual), actualiza sus bounds
    if (t !== null) {
      const e = this.bounds,
        s = t.bounds;
      U.it(s) ? ((s.x = e.x), (s.y = e.y), (s.width = e.width), (s.height = e.height)) : (t.bounds = e.copy());
      return;
    }
    const i = this.node;
    if (i !== null) {
      const e = this.bounds;
      if (!(i instanceof Group)) {
        // Para nodos normales: calcula desplazamiento basado en foco y centro
        const s = Rect.a();
        i.ensureBounds();
        const n = this.network.layout.getLayoutBounds(i, s),
          o = i.locationObject.getDocumentPoint(Spot.Center);
        if (n.isReal() && o.isReal()) {
          // Ajusta posición considerando el foco relativo al centro del layout bounds
          (i.moveTo(e.x + this.focusX - (o.x - n.x) + i.margin.left, e.y + this.focusY - (o.y - n.y + i.margin.top)),
            Rect.o(s));
          return;
        }
        Rect.o(s);
      }
      // Para grupos: simplemente mueve a la esquina del bounds más el margen
      i.moveTo(e.x + i.margin.left, e.y + i.margin.top);
    }
  }
  /**
   * Agrega una arista de origen (este vértice es el destino de la arista).
   * @param {LayoutEdge} t - Arista a agregar.
   */
  addSourceEdge(t) {
    t !== null && (Debug && U.s(t, LayoutEdge, LayoutVertex, "addSourceEdge:edge"), this.hr.has(t) || this.hr.add(t));
  }
  /**
   * Elimina una arista de origen.
   * @param {LayoutEdge} t - Arista a eliminar.
   */
  deleteSourceEdge(t) {
    t !== null && (Debug && U.s(t, LayoutEdge, LayoutVertex, "deleteSourceEdge:edge"), this.hr.delete(t));
  }
  /**
   * Agrega una arista de destino (este vértice es el origen de la arista).
   * @param {LayoutEdge} t - Arista a agregar.
   */
  addDestinationEdge(t) {
    t !== null &&
      (Debug && U.s(t, LayoutEdge, LayoutVertex, "addDestinationEdge:edge"), this.ar.has(t) || this.ar.add(t));
  }
  /**
   * Elimina una arista de destino.
   * @param {LayoutEdge} t - Arista a eliminar.
   */
  deleteDestinationEdge(t) {
    t !== null && (Debug && U.s(t, LayoutEdge, LayoutVertex, "deleteDestinationEdge:edge"), this.ar.delete(t));
  }
  /** @returns {LayoutNetwork} La red a la que pertenece este vértice. */
  get network() {
    return this.No;
  }
  /** @param {LayoutNetwork} t - Red propietaria. */
  set network(t) {
    (Debug && U.s(t, LayoutNetwork, LayoutVertex, "network"), (this.No = t));
  }
  /**
   * @returns {Iterator} Iterador sobre los vértices origen (conectados por sourceEdges).
   */
  get sourceVertexes() {
    const t = new GSet(),
      i = this.sourceEdges;
    for (; i.next(); ) {
      const e = i.value;
      e.fromVertex && t.add(e.fromVertex);
    }
    return t.iterator;
  }
  /**
   * @returns {Iterator} Iterador sobre los vértices destino (conectados por destinationEdges).
   */
  get destinationVertexes() {
    const t = new GSet(),
      i = this.destinationEdges;
    for (; i.next(); ) {
      const e = i.value;
      e.toVertex && t.add(e.toVertex);
    }
    return t.iterator;
  }
  /**
   * @returns {Iterator} Iterador sobre todos los vértices adyacentes (origen + destino).
   */
  get vertexes() {
    const t = new GSet();
    let i = this.sourceEdges;
    for (; i.next(); ) {
      const e = i.value;
      e.fromVertex && t.add(e.fromVertex);
    }
    for (i = this.destinationEdges; i.next(); ) {
      const e = i.value;
      e.toVertex && t.add(e.toVertex);
    }
    return t.iterator;
  }
  /** @returns {Iterator} Iterador sobre las aristas de origen. */
  get sourceEdges() {
    return this.hr.iterator;
  }
  /** @returns {Iterator} Iterador sobre las aristas de destino. */
  get destinationEdges() {
    return this.ar.iterator;
  }
  /**
   * @returns {Iterator} Iterador sobre todas las aristas incidentes (origen + destino).
   */
  get edges() {
    const t = new List();
    let i = this.sourceEdges;
    for (; i.next(); ) {
      const e = i.value;
      t.add(e);
    }
    for (i = this.destinationEdges; i.next(); ) {
      const e = i.value;
      t.add(e);
    }
    return t.iterator;
  }
  /** @returns {number} Cantidad total de aristas incidentes. */
  get edgesCount() {
    return this.hr.count + this.ar.count;
  }
  /**
   * Comparador estándar de vértices: ordena alfabéticamente por el texto del nodo.
   * @param {LayoutVertex} t - Primer vértice.
   * @param {LayoutVertex} i - Segundo vértice.
   * @returns {number} -1, 0, o 1 según orden alfabético.
   */
  static standardComparer(t, i) {
    (Debug && U.s(t, LayoutVertex, LayoutVertex, "standardComparer:m"),
      Debug && U.s(i, LayoutVertex, LayoutVertex, "standardComparer:n"));
    const e = t.Be,
      s = i.Be;
    if (e)
      if (s) {
        const n = e.text,
          o = s.text;
        return n < o ? -1 : n > o ? 1 : 0;
      } else return 1;
    else return s !== null ? -1 : 0;
  }
  /**
   * Comparador inteligente: ordena por texto con conciencia numérica
   * (ej: "item2" < "item10"). Divide el texto en partes alfabéticas y numéricas
   * y compara segmento por segmento.
   * @param {LayoutVertex} t - Primer vértice.
   * @param {LayoutVertex} i - Segundo vértice.
   * @returns {number} -1, 0, o 1.
   */
  static smartComparer(t, i) {
    if (
      (Debug && U.s(t, LayoutVertex, LayoutVertex, "smartComparer:m"),
      Debug && U.s(i, LayoutVertex, LayoutVertex, "smartComparer:n"),
      t !== null)
    )
      if (i !== null) {
        const e = t.Be,
          s = i.Be;
        if (e !== null)
          if (s !== null) {
            const n = e.text.toLocaleLowerCase(),
              o = s.text.toLocaleLowerCase(),
              // Divide texto en partes numéricas y no numéricas usando regex
              r = n.split(/([+-]?[.]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)/),
              l = o.split(/([+-]?[.]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)/);
            let h = 0;
            for (; h < r.length; h++)
              if (l[h] !== "" && l[h] !== void 0) {
                const a = parseFloat(r[h]),
                  f = parseFloat(l[h]);
                if (isNaN(a))
                  if (isNaN(f)) {
                    // Ambas partes son texto: comparación alfabética
                    if (r[h].localeCompare(l[h]) !== 0) return r[h].localeCompare(l[h]);
                    continue;
                  } else return 1;               // Texto vs número: texto es mayor
                else {
                  if (isNaN(f)) return -1;        // Número vs texto: número es menor
                  if (a - f !== 0) return a - f;  // Comparación numérica
                  continue;
                }
              } else {
                if (r[h] === "") continue;
                return 1;
              }
            return l[h] !== "" && l[h] !== void 0 ? -1 : 0;
          } else return 1;
        else return s !== null ? -1 : 0;
      } else return 1;
    else return i !== null ? -1 : 0;
  }
}
