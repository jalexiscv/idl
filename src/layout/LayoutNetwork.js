/** @fileoverview Representación de red abstracta para algoritmos de layout de IDL.
 * LayoutNetwork modela un grafo de vértices (LayoutVertex) y aristas (LayoutEdge)
 * que abstrae los nodos y enlaces del diagrama. Proporciona métodos para construir,
 * modificar y dividir la red en sub-redes para layouts jerárquicos o desconectados.
 */

class LayoutNetwork {
  fe;
  Co;
  Kn;
  iw;
  ew;
  /**
   * Construye una nueva red de layout.
   * @param {Layout} t - El layout propietario de esta red (no puede ser null).
   */
  constructor(t) {
    (GSet._i(this),
      Debug && !t && U.n("LayoutNetwork constructor requires non-null Layout argument"),
      (this.fe = t),          // layout: Referencia al layout propietario
      (this.Co = new GSet()), // vertexes: Conjunto de vértices de la red
      (this.Kn = new GSet()), // edges: Conjunto de aristas de la red
      (this.iw = new GMap()), // Mapa Nodo -> LayoutVertex para búsqueda rápida
      (this.ew = new GMap()));// Mapa Link -> LayoutEdge para búsqueda rápida
  }
  /**
   * Limpia toda la red, eliminando vértices, aristas y mapas.
   */
  clear() {
    if (this.Co) {
      const t = this.Co.iterator;
      for (; t.next(); ) t.value.clear();
    }
    if (this.Kn) {
      const t = this.Kn.iterator;
      for (; t.next(); ) t.value.clear();
    }
    ((this.Co = new GSet()), (this.Kn = new GSet()), (this.iw = new GMap()), (this.ew = new GMap()));
  }
  /**
   * Representación textual de la red para depuración.
   * @param {number} [t=0] - Nivel de detalle (0=básico, 1=+resumen, 2=+vértices/aristas).
   * @returns {string} Descripción de la red.
   */
  toString(t) {
    t === void 0 && (t = 0);
    let i = "LayoutNetwork" + (this.layout !== null ? "(" + this.layout.toString() + ")" : "");
    if (t <= 0) return i;
    if (((i += " vertexes: " + this.Co.count + " edges: " + this.Kn.count), t > 1)) {
      const e = this.Co.iterator;
      for (; e.next(); ) {
        const n = e.value;
        i +=
          `
	    ` + n.toString(t - 1);
      }
      const s = this.Kn.iterator;
      for (; s.next(); ) {
        const n = s.value;
        i +=
          `
	    ` + n.toString(t - 1);
      }
    }
    return i;
  }
  /** @returns {Layout} El layout propietario de esta red. */
  get layout() {
    return this.fe;
  }
  /** @param {Layout} t - Layout propietario. */
  set layout(t) {
    t !== null && (this.fe = t);
  }
  /** @returns {GSet} Conjunto de vértices de la red. */
  get vertexes() {
    return this.Co;
  }
  /** @returns {GSet} Conjunto de aristas de la red. */
  get edges() {
    return this.Kn;
  }
  /**
   * Crea un nuevo vértice para esta red.
   * Las subclases deben sobrescribir para crear tipos especializados.
   * @returns {LayoutVertex} Un nuevo vértice.
   */
  createVertex() {
    return new LayoutVertex(this);
  }
  /**
   * Crea una nueva arista para esta red.
   * Las subclases deben sobrescribir para crear tipos especializados.
   * @returns {LayoutEdge} Una nueva arista.
   */
  createEdge() {
    return new LayoutEdge(this);
  }
  /**
   * Agrega nodos y enlaces de una colección a la red.
   * Primero procesa todos los nodos, luego todos los enlaces.
   * @param {Iterator} t - Colección de Parts a agregar.
   * @param {boolean} [i=false] - Si solo partes de nivel superior.
   * @param {Function} [e=null] - Función de filtro (por defecto excluye link labels y enlaces sin nodos).
   */
  addParts(t, i, e) {
    if (t === null) return;
    (i === void 0 && (i = false),
      U.i(i, "boolean", LayoutNetwork, "addParts:toplevelonly"),
      e === void 0 && (e = null),
      // Filtro por defecto: excluye link labels y enlaces sin nodos válidos
      e === null &&
        (e = (n) => {
          if (n instanceof Node) return !n.isLinkLabel;
          if (n instanceof Link) {
            const o = n.fromNode;
            if (o === null || o.isLinkLabel) return false;
            const r = n.toNode;
            return !(r === null || r.isLinkLabel);
          }
          return false;
        }));
    // Fase 1: Agregar nodos como vértices
    const s = t.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (n instanceof Node && !(i && !n.isTopLevel) && n.canLayout() && e(n))
        if (n instanceof Group && n.layout === null) this.addParts(n.memberParts, false); // Grupos sin layout: recursivo
        else {
          if (this.findVertex(n) !== null) continue; // Evita duplicados
          const o = this.createVertex();
          ((o.node = n), this.addVertex(o));
        }
    }
    // Fase 2: Agregar enlaces como aristas
    for (s.reset(); s.next(); ) {
      const n = s.value;
      if (!(n instanceof Link) || (i && !n.isTopLevel) || !n.canLayout() || !e(n) || this.findEdge(n) !== null)
        continue;
      const o = n.fromNode,
        r = n.toNode;
      if (o === null || r === null || o === r) continue; // Ignora enlaces sin nodos o auto-enlaces
      const l = this.findGroupVertex(o),   // Busca el vértice contenedor del nodo origen
        h = this.findGroupVertex(r);       // Busca el vértice contenedor del nodo destino
      this.linkVertexes(l, h, n);          // Crea arista entre los vértices
    }
  }
  /**
   * Encuentra el vértice que representa a un nodo, subiendo por la jerarquía de grupos.
   * @param {Node} t - El nodo a buscar.
   * @returns {LayoutVertex|null} El vértice encontrado o null.
   */
  findGroupVertex(t) {
    const i = t.findVisibleNode();
    if (i === null) return null;
    let e = this.findVertex(i);
    if (e !== null) return e;
    // Sube por la jerarquía de grupos contenedores
    let s = i.containingGroup;
    for (; s !== null; ) {
      if (((e = this.findVertex(s)), e !== null)) return e;
      s = s.containingGroup;
    }
    return null;
  }
  /**
   * Agrega un vértice a la red y lo registra en el mapa nodo->vértice.
   * @param {LayoutVertex} t - Vértice a agregar.
   */
  addVertex(t) {
    (Debug && U.s(t, LayoutVertex, LayoutNetwork, "addVertex:vertex"), this.Co.add(t));
    const i = t.node;
    (i !== null && this.iw.set(i, t), (t.network = this)); // Registra mapeo y asigna red
  }
  /**
   * Agrega un nodo del diagrama a la red, creando un vértice si no existe.
   * @param {Node} t - Nodo a agregar.
   * @returns {LayoutVertex} El vértice correspondiente (existente o nuevo).
   */
  addNode(t) {
    Debug && U.s(t, Node, LayoutNetwork, "addNode:node");
    let i = this.findVertex(t);
    return (i === null && ((i = this.createVertex()), (i.node = t), this.addVertex(i)), i);
  }
  /**
   * Elimina un vértice y todas sus aristas incidentes.
   * @param {LayoutVertex} t - Vértice a eliminar.
   */
  deleteVertex(t) {
    if ((Debug && U.s(t, LayoutVertex, LayoutNetwork, "deleteVertex:vertex"), this.TF(t))) {
      // Elimina aristas de origen (source edges) en orden inverso
      let i = t.hr;
      for (let e = i.count - 1; e >= 0; e--) {
        const s = i.elt(e);
        this.deleteEdge(s);
      }
      // Elimina aristas de destino (destination edges) en orden inverso
      i = t.ar;
      for (let e = i.count - 1; e >= 0; e--) {
        const s = i.elt(e);
        this.deleteEdge(s);
      }
    }
  }
  /**
   * Elimina un vértice del conjunto y del mapa nodo->vértice.
   * @param {LayoutVertex} t - Vértice a remover.
   * @returns {boolean} true si se eliminó correctamente.
   */
  TF(t) {
    const i = this.Co.delete(t);
    if (i) {
      const e = t.node;
      e !== null && this.iw.delete(e);
    }
    return i;
  }
  /**
   * Elimina el nodo del diagrama de la red.
   * @param {Node} t - Nodo a eliminar.
   */
  deleteNode(t) {
    Debug && U.s(t, Node, LayoutNetwork, "deleteNode:node");
    const i = this.findVertex(t);
    i !== null && this.deleteVertex(i);
  }
  /**
   * Busca el vértice correspondiente a un nodo.
   * @param {Node} t - Nodo a buscar.
   * @returns {LayoutVertex|undefined} El vértice encontrado.
   */
  findVertex(t) {
    return (Debug && U.s(t, Node, LayoutNetwork, "findVertex:node"), this.iw.get(t));
  }
  /**
   * Agrega una arista a la red y la registra en los vértices incidentes.
   * @param {LayoutEdge} t - Arista a agregar.
   */
  addEdge(t) {
    (Debug && U.s(t, LayoutEdge, LayoutNetwork, "addEdge:edge"), this.qC(t));
    const i = t.toVertex;
    i !== null && i.addSourceEdge(t);       // Registra como arista de origen para el destino
    const e = t.fromVertex;
    e !== null && e.addDestinationEdge(t);  // Registra como arista de destino para el origen
  }
  /**
   * Agrega una arista al conjunto y al mapa enlace->arista.
   * @param {LayoutEdge} t - Arista a agregar.
   */
  qC(t) {
    this.Kn.add(t);
    const i = t.link;
    (i !== null && this.findEdge(i) === null && this.ew.set(i, t), (t.network = this));
  }
  /**
   * Agrega un enlace del diagrama a la red, creando vértices y arista si es necesario.
   * @param {Link} t - Enlace a agregar.
   * @returns {LayoutEdge} La arista correspondiente (existente o nueva).
   */
  addLink(t) {
    Debug && U.s(t, Link, LayoutNetwork, "addLink:link");
    const i = t.fromNode,
      e = t.toNode;
    let s = this.findEdge(t);
    return (
      s === null
        ? (// Crea nueva arista con vértices origen/destino
          (s = this.createEdge()),
          (s.link = t),
          i !== null && (s.fromVertex = this.addNode(i)),
          e !== null && (s.toVertex = this.addNode(e)),
          this.addEdge(s))
        : (// Actualiza vértices de arista existente
          i !== null ? (s.fromVertex = this.addNode(i)) : (s.fromVertex = null),
          e !== null ? (s.toVertex = this.addNode(e)) : (s.toVertex = null)),
      s
    );
  }
  /**
   * Elimina una arista de la red y la desregistra de los vértices incidentes.
   * @param {LayoutEdge} t - Arista a eliminar.
   */
  deleteEdge(t) {
    Debug && U.s(t, LayoutEdge, LayoutNetwork, "deleteEdge:edge");
    const i = t.toVertex;
    i !== null && i.deleteSourceEdge(t);
    const e = t.fromVertex;
    (e !== null && e.deleteDestinationEdge(t), this.HC(t));
  }
  /**
   * Elimina una arista del conjunto y del mapa enlace->arista.
   * @param {LayoutEdge} t - Arista a remover.
   * @returns {boolean} true si se eliminó correctamente.
   */
  HC(t) {
    const i = this.Kn.delete(t);
    if (i) {
      const e = t.link;
      e !== null && this.ew.delete(e);
    }
    return i;
  }
  /**
   * Elimina un enlace del diagrama de la red.
   * @param {Link} t - Enlace a eliminar.
   */
  deleteLink(t) {
    Debug && U.s(t, Link, LayoutNetwork, "deleteLink:link");
    const i = this.findEdge(t);
    i !== null && this.deleteEdge(i);
  }
  /**
   * Busca la arista correspondiente a un enlace.
   * @param {Link} t - Enlace a buscar.
   * @returns {LayoutEdge|undefined} La arista encontrada.
   */
  findEdge(t) {
    return (Debug && U.s(t, Link, LayoutNetwork, "findEdge:link"), this.ew.get(t));
  }
  /**
   * Crea una arista entre dos vértices, opcionalmente asociada a un enlace.
   * @param {LayoutVertex} t - Vértice origen.
   * @param {LayoutVertex} i - Vértice destino.
   * @param {Link} [e=null] - Enlace asociado (opcional).
   * @returns {LayoutEdge|null} La arista creada, o null si los vértices no pertenecen a esta red.
   */
  linkVertexes(t, i, e) {
    if (t === null || i === null) return null;
    if (
      (Debug &&
        (U.s(t, LayoutVertex, LayoutNetwork, "linkVertexes:fromVertex"),
        U.s(i, LayoutVertex, LayoutNetwork, "linkVertexes:toVertex"),
        e !== null && U.s(e, Link, LayoutNetwork, "linkVertexes:link")),
      t.network === this && i.network === this) // Verifica que ambos vértices estén en esta red
    ) {
      const s = this.createEdge();
      return ((s.link = e), (s.fromVertex = t), (s.toVertex = i), this.addEdge(s), s);
    }
    return null;
  }
  /**
   * Invierte la dirección de una arista, actualizando los registros en los vértices.
   * @param {LayoutEdge} t - Arista a invertir.
   */
  reverseEdge(t) {
    Debug && U.s(t, LayoutEdge, LayoutNetwork, "reverseEdge:edge");
    const i = t.fromVertex,
      e = t.toVertex;
    i === null ||
      e === null ||
      // Intercambia registros de aristas en los vértices
      (i.deleteDestinationEdge(t), e.deleteSourceEdge(t), t.reverseEdge(), i.addSourceEdge(t), e.addDestinationEdge(t));
  }
  /**
   * Elimina todas las aristas que conectan un vértice consigo mismo (self-loops).
   */
  deleteSelfEdges() {
    const t = U.ht(),            // Array temporal para recolectar self-edges
      i = this.Kn.iterator;
    for (; i.next(); ) {
      const s = i.value;
      s.fromVertex === s.toVertex && t.push(s); // Detecta auto-aristas
    }
    const e = t.length;
    for (let s = 0; s < e; s++) this.deleteEdge(t[s]); // Elimina cada una
    U.et(t);                     // Libera array temporal
  }
  /**
   * Elimina todos los vértices artificiales (sin nodo ni datos) y sus aristas.
   */
  deleteArtificialVertexes() {
    const t = U.ht(),
      i = this.Co.iterator;
    for (; i.next(); ) {
      const o = i.value;
      o.node === null && o.data === null && t.push(o); // Vértices sin nodo ni datos
    }
    let e = t.length;
    for (let o = 0; o < e; o++) this.deleteVertex(t[o]);
    // También elimina aristas sin enlace ni datos
    const s = U.ht(),
      n = this.Kn.iterator;
    for (; n.next(); ) {
      const o = n.value;
      o.link === null && o.data === null && s.push(o);
    }
    e = s.length;
    for (let o = 0; o < e; o++) this.deleteEdge(s[o]);
    (U.et(t), U.et(s));
  }
  /**
   * Elimina aristas que no tienen vértice origen o destino (aristas inútiles).
   */
  deleteUselessEdges() {
    const t = U.ht(),
      i = this.Kn.iterator;
    for (; i.next(); ) {
      const s = i.value;
      (s.fromVertex === null || s.toVertex === null) && t.push(s);
    }
    const e = t.length;
    for (let s = 0; s < e; s++) this.deleteEdge(t[s]);
    U.et(t);
  }
  /**
   * Verifica si un vértice es aislado (sin aristas incidentes).
   * @param {LayoutVertex} t - Vértice a verificar.
   * @returns {boolean} true si no tiene aristas de origen ni destino.
   */
  isSingleton(t) {
    return !(t.hr.count > 0 || t.ar.count > 0);
  }
  /**
   * Divide la red en sub-redes por componentes conectados.
   * Primero limpia la red (elimina artificiales, inútiles, self-edges),
   * luego extrae cada componente conexo en una sub-red separada.
   * @param {boolean} [t=true] - Si se debe limpiar la red primero.
   * @returns {List} Lista de sub-redes ordenadas de mayor a menor por cantidad de vértices.
   */
  splitIntoSubNetworks(t) {
    (t === void 0 && (t = true),
      t && (this.deleteArtificialVertexes(), this.deleteUselessEdges(), this.deleteSelfEdges()));
    const i = new List();
    let e = true;
    // Extrae componentes conexos iterativamente
    for (; e; ) {
      e = false;
      const s = this.Co.iterator;
      for (; s.next(); ) {
        const n = s.value;
        if (this.isSingleton(n)) continue;   // Ignora vértices aislados
        const o = this.layout.createNetwork();
        (i.add(o), this.o4(o, n), (e = true)); // Inicia expansión BFS desde este vértice
        break;
      }
    }
    // Ordena sub-redes por cantidad de vértices (mayor primero)
    return (i.sort((s, n) => (s === null || n === null || s === n ? 0 : n.vertexes.count - s.vertexes.count)), i);
  }
  /**
   * Expande una sub-red desde un vértice inicial usando BFS.
   * Transfiere vértices y aristas conectados desde esta red a la sub-red.
   * @param {LayoutNetwork} t - Sub-red de destino.
   * @param {LayoutVertex} i - Vértice inicial para la expansión.
   */
  o4(t, i) {
    if (i === null) return;
    const e = new List();
    for (e.add(i); e.count > 0; ) {
      const s = e.first();                    // Toma el primer vértice de la cola BFS
      if ((e.removeAt(0), !s || s.network === t)) continue; // Ya procesado
      (this.TF(s), t.addVertex(s));          // Transfiere vértice a sub-red
      // Propaga por aristas de origen
      let n = s.sourceEdges;
      for (; n.next(); ) {
        const o = n.value;
        o.network !== t && (this.HC(o), t.qC(o), o.fromVertex && e.add(o.fromVertex));
      }
      // Propaga por aristas de destino
      for (n = s.destinationEdges; n.next(); ) {
        const o = n.value;
        o.network !== t && (this.HC(o), t.qC(o), o.toVertex && e.add(o.toVertex));
      }
    }
  }
  /**
   * Encuentra todas las Parts (nodos y enlaces) representadas en esta red.
   * @returns {GSet} Conjunto de Parts.
   */
  findAllParts() {
    const t = new GSet(),
      i = this.Co.iterator;
    for (; i.next(); ) {
      const s = i.value;
      s.node && t.add(s.node);
    }
    const e = this.Kn.iterator;
    for (; e.next(); ) {
      const s = e.value;
      s.link && t.add(s.link);
    }
    return t;
  }
}
