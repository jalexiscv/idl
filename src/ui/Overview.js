class Overview extends Diagram {
  wb;
  xb;
  bb;
  Sb;
  O0;
  pc;
  Hl;
  J2;
  $2;
  kb;
  Z2;
  constructor(t, i) {
    let e;
    return (
      t === void 0 || typeof t == "string" || (root.Element && t instanceof Element) ? (e = t) : U.it(t) && (i = t),
      super(e),
      (this.animationManager.isEnabled = false),
      (this.$t = true),
      (this.wb = null),
      (this.nd = false),
      (this.od = false),
      (this.xb = true),
      (this.bb = true),
      (this.Sb = 0),
      (this.O0 = false),
      (this.pc = null),
      this.setRenderingHint("drawShadows", false),
      (this.Hl = new Part({
        selectable: true,
        selectionAdorned: false,
        selectionObjectName: "BOXSHAPE",
        locationObjectName: "BOXSHAPE",
        resizeObjectName: "BOXSHAPE",
        cursor: "move",
      })
        .add(
          new Shape({ name: "BOXSHAPE", fill: "transparent", stroke: "magenta", strokeWidth: 2 }).theme(
            "stroke",
            "overviewBox",
          ),
        )
        .Yt()),
      (this.allowCopy = false),
      (this.allowDelete = false),
      (this.allowDrop = false),
      (this.allowSelect = true),
      (this.autoScrollRegion = new Margin(0, 0, 0, 0)),
      this.yt.e(0, 0),
      this.toolManager.ti("Dragging", new OverviewDraggingTool(), this.toolManager.mouseMoveTools),
      (this.click = () => {
        const s = this.observed;
        if (s === null) return;
        const n = s.viewportBounds,
          o = this.lastInput.documentPoint;
        s.position = new Point(o.x - n.width / 2, o.y - n.height / 2);
      }),
      (this.J2 = (s) => {
        (this.invalidateDocumentBounds(), this.E0());
      }),
      (this.$2 = (s) => {
        this.observed !== null && (this.invalidateDocumentBounds(), this.L());
      }),
      (this.kb = (s) => {
        this.updateDelay < 1 ? this.L() : this.O0 || ((this.O0 = true), U.yn(() => this.redraw(), this.updateDelay));
      }),
      (this.Z2 = (s) => {
        this.observed !== null && this.E0();
      }),
      (this.autoScale = 2),
      (this.$t = false),
      i && this.setProperties(i),
      this
    );
  }
  setupRouters() {}
  computePixelRatio() {
    return 1;
  }
  redraw() {
    (this.O0 && this.updateDelay >= 1 && ((this.O0 = false), this.qO()), super.redraw());
  }
  vi() {
    if (
      (this.Lt === null && U.n("No div specified"),
      this.ut === null && U.n("No canvas specified"),
      this.ut instanceof SVGSurface || (this.box.UM(), !this.Qe))
    )
      return;
    const t = this.observed;
    if (t === null || t.animationManager.defaultAnimation.isAnimating || !t.oa) return;
    this.T0();
    const i = this.ut,
      e = this._t;
    if (
      (e.clearContextCache(true),
      e.setTransform(1, 0, 0, 1, 0, 0),
      e.clearRect(0, 0, i.width, i.height),
      this.updateDelay < 1)
    )
      this.GL();
    else if (this.pc !== null) {
      e.drawImage(this.pc.Nt, 0, 0);
      const o = this.E;
      (e.scale(this.te, this.te), e.transform(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy), e.commitTransform());
    }
    const s = this.Gt.h,
      n = s.length;
    for (let o = 0; o < n; o++) s[o].vi(e, this);
    ((this.lc = false), (this.Qe = false));
  }
  qO() {
    const t = this.ut,
      i = this._t;
    if (!(t === null || i === null)) {
      if ((this.T0(), this.pc === null)) {
        const e = new CanvasSurface(null);
        ((e.width = t.width), (e.height = t.height), (this.pc = e));
      }
      try {
        ((this.ut = this.pc),
          (this._t = this.ut.ni),
          this._t.clearContextCache(true),
          this._t.setTransform(1, 0, 0, 1, 0, 0),
          this._t.clearRect(0, 0, this.ut.width, this.ut.height),
          this.GL());
      } finally {
        ((this.ut = t), (this._t = i));
      }
    }
  }
  GL() {
    const t = this.observed;
    if (t === null) return;
    const i = this.drawsTemporaryLayers,
      e = this.drawsGrid && i,
      s = t.grid;
    if (e && s !== null && s.visible && !(isNaN(s.width) || isNaN(s.height))) {
      const f = Rect.a().c(this.viewportBounds).unionRect(t.viewportBounds);
      (t.L2(f), Rect.o(f), t.Oi());
    }
    const n = this.E,
      o = this._t;
    (o.scale(this.te, this.te), o.transform(n.m11, n.m12, n.m21, n.m22, n.dx, n.dy), o.commitTransform());
    const r = this.viewportBounds,
      l = t.Gt.h,
      h = l.length,
      a = this.Gt.h;
    this.fs(a, a.length, this, this.viewportBounds);
    for (let f = 0; f < h; f++) l[f].HR(o, r, this, i, e);
  }
  get observed() {
    return this.wb;
  }
  set observed(t) {
    const i = this.wb;
    if (
      (t !== null && U.s(t, Diagram, Overview, "observed"),
      t instanceof Overview && U.n("Overview.observed Diagram may not be an Overview itself: " + t),
      i !== t)
    ) {
      if (
        (i !== null && this.HO(i), (this.wb = t), t !== null && this.vO(t), this.invalidateDocumentBounds(), t === null)
      ) {
        this.pc = null;
        const e = this.ut,
          s = this._t;
        e && s && (s.setTransform(1, 0, 0, 1, 0, 0), s.clearRect(0, 0, e.width, e.height));
      } else (this.kb(null), this.E0(), this.L());
      this.t("observed", i, t);
    }
  }
  get box() {
    return this.Hl;
  }
  set box(t) {
    const i = this.Hl;
    i !== t &&
      (U.s(t, Part, Overview, "box"),
      t.Yt(),
      (this.Hl = t),
      this.remove(i),
      this.add(this.Hl),
      this.E0(),
      this.t("box", i, t));
  }
  get drawsTemporaryLayers() {
    return this.xb;
  }
  set drawsTemporaryLayers(t) {
    this.xb !== t && ((this.xb = t), this.redraw());
  }
  get drawsGrid() {
    return this.bb;
  }
  set drawsGrid(t) {
    this.bb !== t && ((this.bb = t), this.redraw());
  }
  get updateDelay() {
    return this.Sb;
  }
  set updateDelay(t) {
    (t < 0 && (t = 0), this.Sb !== t && (this.Sb = t));
  }
  vO(t) {
    t !== null &&
      (t.addDiagramListener("ViewportBoundsChanged", this.J2),
      t.addDiagramListener("DocumentBoundsChanged", this.$2),
      t.addDiagramListener("InvalidateDraw", this.kb),
      t.addDiagramListener("AnimationFinished", this.Z2),
      this.add(this.box));
  }
  HO(t) {
    t !== null &&
      (this.remove(this.box),
      t.removeDiagramListener("ViewportBoundsChanged", this.J2),
      t.removeDiagramListener("DocumentBoundsChanged", this.$2),
      t.removeDiagramListener("InvalidateDraw", this.kb),
      t.removeDiagramListener("AnimationFinished", this.Z2));
  }
  E0() {
    const t = this.box,
      i = this.observed;
    if (i === null) return;
    this.Qe = true;
    const e = i.viewportBounds,
      s = t.selectionObject,
      n = Size.a();
    (n.e(e.width, e.height), (s.desiredSize = n), Size.o(n));
    const o = 2 / this.scale;
    (s instanceof Shape && (s.strokeWidth = o),
      (t.location = new Point(e.x - o / 2, e.y - o / 2)),
      (t.isSelected = true));
  }
  computeBounds() {
    const t = this.observed;
    if (t === null) return Rect.om;
    const i = t.documentBounds.copy();
    return (i.unionRect(t.viewportBounds), i);
  }
  invalidateViewport(t, i) {
    this.Qe !== true && ((this.Qe = true), this.requestUpdate());
  }
  onViewportBoundsChanged(t, i, e, s) {
    this.$t ||
      (this.sl(),
      this.L(),
      this.Da(),
      this.invalidateDocumentBounds(),
      this.E0(),
      (this.Wi.scale = e),
      (this.Wi.position.x = t.x),
      (this.Wi.position.y = t.y),
      this.Wi.bounds.c(t),
      (this.Wi.isScroll = s),
      this.F("ViewportBoundsChanged", this.Wi, t));
  }
}
