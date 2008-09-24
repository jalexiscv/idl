class LayeredDigraphVertex extends LayoutVertex {
  Sl;
  Ph;
  Et;
  lk;
  hk;
  Qh;
  re;
  Su;
  so;
  sk;
  tk;
  ik;
  kf;
  Wn;
  RI;
  ia;
  as;
  ku;
  we;
  jn;
  Tw = null;
  Lw = null;
  Dw = null;
  Fw = null;
  constructor(t) {
    (super(t),
      (this.Sl = -1),
      (this.Ph = -1),
      (this.Et = -1),
      (this.lk = NaN),
      (this.hk = null),
      (this.Qh = true),
      (this.re = false),
      (this.Su = NaN),
      (this.so = NaN),
      (this.sk = 0),
      (this.tk = null),
      (this.ik = null));
  }
  static VI(t, i) {
    return t.index - i.index;
  }
  getProperSourceEdges() {
    if (!this.Dw) {
      const t = [];
      for (const i of this.Ao) {
        const e = i;
        e.valid && t.push(e);
      }
      this.Dw = t;
    }
    return this.Dw;
  }
  getProperDestinationEdges() {
    if (!this.Fw) {
      const t = [];
      for (const i of this.fr) {
        const e = i;
        e.valid && t.push(e);
      }
      this.Fw = t;
    }
    return this.Fw;
  }
  getDestinationEdge(t) {
    const i = this.getProperDestinationEdges();
    for (const e of i) if (e.toVertex === t) return e;
    U.n("Unable to find destination edge to given vertex");
  }
  getProperSourceVertexes() {
    if (!this.Tw) {
      const t = [];
      for (const i of this.Ao) {
        const e = i;
        !e.valid || e.fromVertex.layer <= e.toVertex.layer || t.push(e.fromVertex);
      }
      (t.sort(LayeredDigraphVertex.VI), (this.Tw = t));
    }
    return this.Tw;
  }
  getProperDestinationVertexes() {
    if (!this.Lw) {
      const t = [];
      for (const i of this.fr) {
        const e = i;
        !e.valid || e.fromVertex.layer <= e.toVertex.layer || t.push(e.toVertex);
      }
      (t.sort(LayeredDigraphVertex.VI), (this.Lw = t));
    }
    return this.Lw;
  }
  addSourceEdge(t) {
    (super.addSourceEdge(t), (this.Tw = null), (this.Dw = null));
  }
  deleteSourceEdge(t) {
    (super.deleteSourceEdge(t), (this.Tw = null), (this.Dw = null));
  }
  addDestinationEdge(t) {
    (super.addDestinationEdge(t), (this.Lw = null), (this.Fw = null));
  }
  deleteDestinationEdge(t) {
    (super.deleteDestinationEdge(t), (this.Lw = null), (this.Fw = null));
  }
  commit() {
    if (this.centered) super.commit();
    else {
      const t = this.node;
      if (t !== null) {
        const i = this.network.layout;
        if (!i) return;
        i.direction === 180 || i.direction === 270
          ? t.moveTo(this.bounds.right - t.actualBounds.width, this.bounds.bottom - t.actualBounds.height)
          : t.moveTo(this.bounds.x, this.bounds.y);
      }
    }
  }
  get layer() {
    return this.Sl;
  }
  set layer(t) {
    this.Sl = t;
  }
  get column() {
    return this.Ph;
  }
  set column(t) {
    this.Ph = t;
  }
  get index() {
    return this.Et;
  }
  set index(t) {
    this.Et = t;
  }
  get component() {
    return this.lk;
  }
  set component(t) {
    this.lk !== t && (U.i(t, "number", LayeredDigraphVertex, "component"), (this.lk = t));
  }
  get near() {
    return this.hk;
  }
  set near(t) {
    this.hk !== t && (Debug && t !== null && U.s(t, LayeredDigraphVertex, LayeredDigraphVertex, "near"), (this.hk = t));
  }
  get centered() {
    return this.Qh;
  }
  set centered(t) {
    this.Qh = t;
  }
}
