class Part extends Panel {
  P;
  sr;
  J;
  xl;
  bl;
  nr;
  mi;
  Sl;
  Vh;
  hn;
  or;
  _d;
  KM;
  YD;
  xy;
  Sy;
  constructor(t, i) {
    let e;
    (t === void 0 || t instanceof PanelLayout || typeof t == "string" ? (e = t) : t && (i = t),
      super(e),
      (this.P = 2408959),
      (this.sr = ""),
      (this.J = null),
      (this.xl = ""),
      (this.bl = null),
      (this.nr = null),
      (this.mi = ""),
      (this.Sl = null),
      (this.Vh = null),
      (this.hn = new Point(NaN, NaN).k()),
      (this.or = null),
      (this._d = NaN),
      (this.KM = -1),
      (this.YD = new Rect()),
      (this.xy = null),
      (this.Sy = NaN),
      i && Object.assign(this, i));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.P = (this.P & -4097) | 16384 | 32768),
      (t.sr = this.sr),
      this.J !== null && (this.J.wi ? (t.J = this.J) : (t.J = this.J.copy())),
      (t.xl = this.xl),
      (t.nr = null),
      (t.mi = this.mi),
      t.hn.c(this.hn),
      (t._d = this._d));
  }
  $o(t) {
    (super.$o(t), t.Lh(), (t.bl = null), (t.or = null), (t.xy = null));
  }
  toString() {
    let t = U.Jn(this.constructor) + "#" + GSet.Ps(this);
    return (this.data !== null && (t += "(" + U.toString(this.data) + ")"), t);
  }
  static LayoutNone = 0;
  static LayoutAdded = 1;
  static LayoutRemoved = 2;
  static LayoutShown = 4;
  static LayoutHidden = 8;
  static LayoutNodeSized = 16;
  static LayoutGroupLayout = 32;
  static LayoutNodeReplaced = 64;
  static LayoutStandard = 127;
  static LayoutAll = 16777215;
  se() {
    return (this.J === null ? (this.J = new PartTemplateSettings()) : this.J.wi && (this.J = this.J.copy()), this.J);
  }
  Ch() {
    (super.Ch(), this.J !== null && (this.J.wi = true));
  }
  xc(t, i, e, s, n, o, r) {
    const l = this.diagram;
    l !== null &&
      (t === 3 && i === "elements"
        ? n instanceof Panel
          ? n.Ln((h) => {
              l.partManager.F2(h, l);
            })
          : n instanceof Picture && l.z2(n)
        : t === 4 &&
          i === "elements" &&
          (n instanceof Panel ? n.Ln((h) => l.partManager.I2(h, l)) : n instanceof Picture && l.X2(n)),
      l.raiseChangedEvent(t, i, e, s, n, o, r));
  }
  updateTargetBindings(t) {
    if ((super.updateTargetBindings(t), this.data === null)) return;
    const i = this.O.h,
      e = i.length;
    for (let n = 0; n < e; n++) {
      const o = i[n];
      o instanceof Panel &&
        o.Ln((r) => {
          r.data !== null && r.i3(t);
        });
    }
    const s = this.adornments;
    for (; s.next(); ) s.value.updateTargetBindings(t);
  }
  Wo() {
    if ((super.Wo(), this.XN())) {
      const i = this.O.h,
        e = i.length;
      for (let s = 0; s < e; s++) {
        const n = i[s];
        n instanceof Panel && n.Ln((o) => o.Wo());
      }
    }
    const t = this.adornments;
    for (; t.next(); ) t.value.Wo();
  }
  updateRelationshipsFromData() {
    this.data !== null && this.diagram?.partManager.updateRelationshipsFromData(this);
  }
  get key() {
    const t = this.diagram;
    if (t !== null) return t.model.getKeyForNodeData(this.data);
  }
  get adornments() {
    return this.nr === null ? EmptyIterator.instance : this.nr.iteratorValues;
  }
  findAdornment(t) {
    Debug && U.i(t, "string", Part, "findAdornment:category");
    const i = this.nr;
    return i === null ? null : i.get(t);
  }
  addAdornment(t, i) {
    if (i === null) return;
    Debug && (U.i(t, "string", Part, "addAdornment:category"), U.s(i, Adornment, Part, "addAdornment:ad"));
    let e = null,
      s = this.nr;
    if ((s !== null && (e = s.get(t)), e !== i)) {
      if (e !== null) {
        const o = e.diagram;
        o !== null && o.remove(e);
      }
      (s === null && ((s = new GMap()), (this.nr = s)), i.sr !== t && (i.category = t), s.set(t, i));
      const n = this.diagram;
      if (n !== null) {
        n.add(i);
        const o = i.adornedObject;
        if (o !== null) {
          const r = o.findBindingPanel();
          r !== null && (i.data = r.data);
        }
      }
    }
  }
  removeAdornment(t) {
    Debug && U.i(t, "string", Part, "removeAdornment:category");
    const i = this.nr;
    if (i === null) return;
    const e = i.get(t);
    if (e !== null) {
      const s = e.diagram;
      s !== null && (s.remove(e), (e.data = null));
    }
    (i.delete(t), i.count === 0 && (this.nr = null));
  }
  clearAdornments() {
    const t = this.nr;
    if (t === null) return;
    const i = U.ht(),
      e = t.iterator;
    for (; e.next(); ) {
      const n = e.key;
      i.push(n);
    }
    const s = i.length;
    for (let n = 0; n < s; n++) this.removeAdornment(i[n]);
    U.et(i);
  }
  updateAdornments() {
    const t = this.diagram;
    if (t === null) return;
    (this.P3(t), this.M3(t));
    let i = this.adornments;
    for (; i.next(); ) {
      const e = i.value;
      (e.g(), e.hasPlaceholder() && e.placeholder.g());
    }
    for (i = this.adornments; i.next(); ) i.value.updateTargetBindings();
  }
  invalidateAdornments() {
    const t = this.diagram;
    t !== null && (t.sl(), this.KD() !== true && this.UD(true));
  }
  UM() {
    this.KD() !== false && (this.updateAdornments(), this.UD(false));
  }
  P3(t) {
    const i = "Selection";
    if (this.isSelected && this.selectionAdorned) {
      const e = this.selectionObject;
      if (
        e !== null &&
        this.actualBounds.isReal() &&
        this.isVisible() &&
        e.isVisibleObject() &&
        e.actualBounds.isReal()
      ) {
        let s = this.findAdornment(i);
        if (s === null) {
          let n = this.selectionAdornmentTemplate;
          (n === null &&
            (this.Ir()
              ? (n = t.linkSelectionAdornmentTemplate)
              : this instanceof Group
                ? (n = t.groupSelectionAdornmentTemplate)
                : (n = t.nodeSelectionAdornmentTemplate)),
            (s = n.copy()),
            s !== null &&
              (this.Ir() && this.selectionObject === this.path && (s.type = Panel.Link), (s.adornedObject = e)));
        }
        if (s !== null) {
          (s.type === Panel.Link && s.g(), this.addAdornment(i, s));
          return;
        }
      }
    }
    this.removeAdornment(i);
  }
  M3(t) {
    const i = this;
    (t.toolManager.mouseDownTools.each((e) => {
      e.isEnabled && e.updateAdornments(i);
    }),
      t.toolManager.updateAdornments(i));
  }
  XM(t) {
    ((this.Sl = t), t === null && this.bE());
  }
  get layer() {
    return this.Sl;
  }
  get diagram() {
    const t = this.Sl;
    return t == null ? null : t.diagram;
  }
  get layerName() {
    return this.xl;
  }
  set layerName(t) {
    const i = this.xl;
    if (i === t) return;
    Debug && U.i(t, "string", Part, "layerName");
    let e = this.diagram;
    if (e !== null && (e.findLayer(t) === null || e.partManager.addsToTemporaryLayer)) return;
    ((this.xl = t), e !== null && e.invalidateDocumentBounds(), this.t("layerName", i, t));
    const s = this.layer;
    if (s === null || s.name === t || ((e = s.diagram), e === null)) return;
    const n = e.findLayer(t);
    if (n === null || n === s) return;
    let o = s.ae(-1, this, true);
    (o >= 0 && e.raiseChangedEvent(4, "parts", s, this, null, o, true),
      (o = n.ma(99999999, this, true)),
      s.visible !== n.visible && this.Hi(n.visible),
      o >= 0 && e.raiseChangedEvent(3, "parts", n, null, this, true, o));
    const r = this.layerChanged;
    if (r === null) return;
    const l = e.H;
    ((e.H = true), r(this, s, n), (e.H = l));
  }
  get layerChanged() {
    return this.J !== null ? this.J.ky : null;
  }
  set layerChanged(t) {
    const i = this.layerChanged;
    i !== t && (t !== null && U.C(t, Part, "layerChanged"), (this.se().ky = t), this.t("layerChanged", i, t));
  }
  get zOrder() {
    return this._d;
  }
  set zOrder(t) {
    const i = this._d;
    if (i === t) return;
    (Debug && U.i(t, "number", Part, "zOrder"), (this._d = t));
    const e = this.layer;
    (e !== null && e.d1(-1, this), this.t("zOrder", i, t));
    const s = this.diagram;
    s !== null && s.L();
  }
  N3() {
    const t = this.layer;
    t !== null && t.d1(-1, this);
  }
  dS() {
    if (this.yh() !== false) return;
    (this.mC(true), this.kc());
    const t = this.diagram;
    t !== null && (t.A0(this), t.requestUpdate());
  }
  GD() {
    if (((this.P |= 2097152), this.yh() === false)) return;
    const t = this.position,
      i = this.location;
    (!i.isReal() || !t.isReal()) && this.qD(t, i);
    const e = this.Ei,
      s = Rect.a().c(e);
    (e.di(), (e.x = t.x), (e.y = t.y), e.k(), this.Ad(s, e), Rect.o(s), this.mC(false), this.kc());
  }
  fo(t, i, e, s) {
    const n = this.ue;
    (n.e(t, i, e, s), this.Ai === null && (this.Ai = new Transform()));
    const o = this.Ai;
    (o.Ki(), this.H0(o, t, i, e, s), (this.Ai = o), o.Vk() || o.lm(n));
  }
  H0(t, i, e, s, n) {
    if ((this.rt !== 1 && t.rt(this.rt), this.vt === 0)) return;
    let o = Spot.Center;
    this.locationSpot.isSpot() && (o = this.locationSpot);
    const r = Point.a();
    if (this.locationObject !== this) {
      const l = this.locationObject,
        h = l.naturalBounds;
      (r.setSpot(h.x, h.y, h.width, h.height, o),
        l.Ai !== null && l.Ai.St(r),
        r.offset(-l.measuredBounds.x, -l.measuredBounds.y));
      let a = l.panel;
      for (; a !== null && a !== this; )
        (a.Ai !== null && a.Ai.St(r), r.offset(-a.measuredBounds.x, -a.measuredBounds.y), (a = a.panel));
    } else r.setSpot(i, e, s, n, o);
    (t.Ns(this.vt, r.x, r.y), Point.o(r));
  }
  get locationObject() {
    if (this.or === null)
      if (this instanceof Adornment && this.type !== Panel.Link && this.hasPlaceholder()) this.or = this.placeholder;
      else {
        const t = this.locationObjectName;
        if (t !== "") {
          const i = this.findObject(t);
          i !== null ? (this.or = i) : (this.or = this);
        } else this.or = this;
      }
    return this.or?.visible ? this.or : this;
  }
  get minLocation() {
    return this.J !== null ? this.J.Py : Point.EA;
  }
  set minLocation(t) {
    const i = this.minLocation;
    i.equals(t) ||
      (Debug && U.s(t, Point, Part, "minLocation"), (t = t.T()), (this.se().Py = t), this.t("minLocation", i, t));
  }
  get maxLocation() {
    return this.J !== null ? this.J.My : Point.VA;
  }
  set maxLocation(t) {
    const i = this.maxLocation;
    i.equals(t) ||
      (Debug && U.s(t, Point, Part, "maxLocation"), (t = t.T()), (this.se().My = t), this.t("maxLocation", i, t));
  }
  get locationObjectName() {
    return this.J !== null ? this.J.Ny : "";
  }
  set locationObjectName(t) {
    const i = this.locationObjectName;
    i !== t &&
      (Debug && U.i(t, "string", Part, "locationObjectName"),
      (this.se().Ny = t),
      (this.or = null),
      this.g(),
      this.t("locationObjectName", i, t));
  }
  get locationSpot() {
    return this.J !== null ? this.J.Cy : Spot.TopLeft;
  }
  set locationSpot(t) {
    const i = this.locationSpot;
    i.equals(t) ||
      (Debug &&
        (U.s(t, Spot, Part, "locationSpot"),
        t.isSpot() || U.n("Part.locationSpot must be a specific Spot value, not: " + t)),
      (t = t.T()),
      (this.se().Cy = t),
      this.g(),
      this.t("locationSpot", i, t));
  }
  move(t, i) {
    i === true ? (this.location = t) : (this.position = t);
  }
  moveTo(t, i, e) {
    const s = Point.U(t, i);
    (this.move(s, e), Point.o(s));
  }
  isVisible() {
    if (!this.visible) return false;
    const t = this.layer;
    if (t !== null) {
      if (!t.visible) return false;
      const e = t.diagram;
      if (e !== null && e.animationManager._x(this)) return true;
    }
    const i = this.containingGroup;
    return !(i !== null && (!i.isSubGraphExpanded || !i.isVisible()));
  }
  Hi(t) {
    const i = this.diagram;
    (t
      ? (this.invalidateLayout(4), this.invalidateAdornments(), i !== null && i.A0(this))
      : (this.invalidateLayout(8), this.clearAdornments()),
      this.Lh(),
      i !== null && (i.invalidateDocumentBounds(), this instanceof Node && this.canAvoid() && i.yd(this), i.L()));
  }
  findObject(t) {
    if (this.name === t) return this;
    let i = this.xy;
    if ((i === null && (this.xy = i = new GMap()), i.get(t) !== null)) return i.get(t);
    const e = super.findObject(t);
    return e !== null ? (i.set(t, e), e) : (i.set(t, null), null);
  }
  np() {
    this.xy = null;
  }
  getRelativePoint(t, i, e) {
    e === void 0 && (e = new Point());
    const s = i.isNoSpot() ? Spot.Center : i,
      n = t.naturalBounds;
    if ((e.e(n.width * s.x + s.offsetX, n.height * s.y + s.offsetY), t === null || t === this)) return e;
    t.E.St(e);
    let o = t.panel;
    for (; o !== null && o !== this; ) (o.E.St(e), (o = o.panel));
    return (this.Ai !== null && this.Ai.St(e), e.offset(-this.ue.x, -this.ue.y), e);
  }
  getDocumentBounds(t) {
    return (t === void 0 && (t = new Rect()), t.c(this.actualBounds));
  }
  ensureBounds() {
    (this.gt(1 / 0, 1 / 0), this.Ut());
  }
  yD(t) {
    const i = this.locationSpot,
      e = this.locationObject;
    let s = e.naturalBounds;
    s.isReal() || (s = Rect.om);
    const n = e instanceof Shape ? e.strokeWidth : 0;
    if ((t.setSpot(0, 0, s.width + n, s.height + n, i), e !== this)) {
      (t.offset(-n / 2, -n / 2), e.E.St(t));
      let o = e.panel;
      for (; o !== null && o !== this; ) (o.E.St(t), (o = o.panel));
    }
    return (this.Ai !== null && this.Ai.St(t), t.offset(-this.ue.x, -this.ue.y), t);
  }
  ga(t, i) {
    const e = i === void 0 ? this.YD : i,
      s = this.C3(),
      n = s * 2;
    if (!this.isShadowed) return (e.e(t.x - 1 - s, t.y - 1 - s, t.width + 2 + n, t.height + 2 + n), e);
    let o = t.x,
      r = t.y,
      l = t.width,
      h = t.height;
    const a = this.shadowBlur,
      f = this.shadowOffset;
    return (
      (l += a),
      (h += a),
      (o -= a / 2),
      (r -= a / 2),
      f.x > 0 ? (l += f.x) : ((o += f.x), (l -= f.x)),
      f.y > 0 ? (h += f.y) : ((r += f.y), (h -= f.y)),
      e.e(o - 1, r - 1, l + 2, h + 2),
      e
    );
  }
  h3() {
    return this.type === Panel.Link &&
      this instanceof Adornment &&
      this.category === "Selection" &&
      this.adornedObject instanceof Shape &&
      this.adornedPart.findMainElement() === this.adornedObject
      ? this.adornedObject.strokeWidth
      : 0;
  }
  C3() {
    return (isNaN(this.Sy) && (this.Sy = this.MD()), this.Sy);
  }
  Ec() {
    this.Sy = NaN;
  }
  Ut() {
    if (this.us() === false) {
      this.GD();
      return;
    }
    this.co(false);
    const t = this.Ei,
      i = Rect.a();
    i.c(t);
    const e = this.Gl();
    this.Th(0, 0, this.ue.width, this.ue.height);
    const s = this.position;
    (this.qD(s, this.location),
      t.di(),
      (t.x = s.x),
      (t.y = s.y),
      t.k(),
      this.Ad(i, t),
      i.equals(t)
        ? this.fs(e)
        : this.Oe() &&
          (!G.u(i.width, t.width) || !G.u(i.height, t.height)) &&
          this.KM >= 0 &&
          this.invalidateLayout(16),
      Rect.o(i),
      this.mC(false));
  }
  Ad(t, i) {
    const e = this.diagram;
    if (e === null) return;
    let s = false;
    if (e.ba === false && t.isReal()) {
      const n = Rect.a();
      (n.c(e.documentBounds),
        n.subtractMargin(e.padding),
        t.x > n.x &&
          t.y > n.y &&
          t.right < n.right &&
          t.bottom < n.bottom &&
          i.x > n.x &&
          i.y > n.y &&
          i.right < n.right &&
          i.bottom < n.bottom &&
          (s = true),
        Rect.o(n));
    }
    ((this.A3() === true || !t.equals(i)) && this.wL(s, e),
      e.L(),
      !((!t.isReal() && !i.isReal()) || t.equalsApproxClose(i)) &&
        (this instanceof Node && !e.undoManager.isUndoingRedoing && this.invalidateConnectedLinks(), this.Lh()));
  }
  get location() {
    return this.hn;
  }
  set location(t) {
    Debug && U.s(t, Point, Part, "location");
    const i = t.x,
      e = t.y,
      s = this.hn;
    ((s.x !== i && (!isNaN(s.x) || !isNaN(i))) || (s.y !== e && (!isNaN(s.y) || !isNaN(e)))) &&
      ((t = t.copy()), this.T3(t, s) && this.t("location", s, t.copy()));
  }
  T3(t, i) {
    if (this.Ir()) return false;
    if (((this.hn = t), (this.P |= 2097152), this.us() === false)) {
      this.dS();
      const e = this.yt;
      if (e.isReal()) {
        const s = this.diagram;
        if (s === null || s.animationManager.isTicking || !s.undoManager.isUndoingRedoing) {
          const n = e.copy();
          (e.e(e.x + (t.x - i.x), e.y + (t.y - i.y)), this.HD(s, e, n.x, n.y), this.t("position", n, e.copy()));
        }
      }
    }
    return true;
  }
  VN(t, i, e) {
    if (this.Ir() || !t.isReal()) return false;
    const s = this.diagram;
    if (
      (s !== null && this.HD(s, t, i, e),
      (this.yt = t),
      (this.P &= -2097153),
      this.hn.isReal() && (s === null || s.animationManager.isTicking || !s.undoManager.isUndoingRedoing))
    ) {
      const n = this.hn;
      ((this.hn = new Point(n.x + (t.x - i), n.y + (t.y - e)).k()), this.t("location", n, this.hn.copy()));
    }
    return (this.yh() === false && this.us() === false && (this.dS(), this.GD()), true);
  }
  HD(t, i, e, s) {
    if (t === null || this instanceof Adornment) return;
    const n = t.animationManager;
    n.Ni && n.VT(this, new Point(e, s), i, false);
  }
  Gf(t, i, e) {
    const s = this.hn,
      n = this.yt;
    if (e) {
      if (s.x === t && s.y === i) return;
      (this.yh() || this.us() ? n.e(NaN, NaN) : n.e(n.x + t - s.x, n.y + i - s.y), s.e(t, i));
    } else {
      if (n.x === t && n.y === i) return;
      (s.e(s.x + t - n.x, s.y + i - n.y), n.e(t, i));
    }
    this.dS();
  }
  BN() {
    ((this.P &= -2097153), this.dS());
  }
  qD(t, i) {
    const e = this.yD(Point.a()),
      s = this.diagram,
      n = i.isReal(),
      o = t.isReal();
    (n && o
      ? (this.P & 2097152) !== 0
        ? this.vD(t, i, s, e)
        : this.WD(t, i, s, e)
      : n
        ? this.vD(t, i, s, e)
        : o && this.WD(t, i, s, e),
      (this.P |= 2097152),
      Point.o(e),
      this.kc());
  }
  vD(t, i, e, s) {
    const n = t.x,
      o = t.y;
    if ((t.e(i.x - s.x, i.y - s.y), e !== null)) {
      const r = e.animationManager,
        l = r.defaultAnimation.isAnimating;
      (!l && r.Ni && !(this instanceof Adornment) && r.VT(this, new Point(n, o), t, false),
        !l && !(t.x === n && t.y === o) && this.t("position", new Point(n, o), t.copy()));
    }
  }
  WD(t, i, e, s) {
    const n = i.copy();
    (i.e(t.x + s.x, t.y + s.y), !i.equals(n) && e !== null && this.t("location", n, i.copy()));
  }
  wL(t, i) {
    (this.FN(false), this instanceof Node && i.yd(this), !this.layer.isTemporary && !t && i.invalidateDocumentBounds());
    const e = this.Ei,
      s = i.viewportBounds;
    s.isReal()
      ? this.Gl()
        ? (e.UA(s, 10) || this.fs(false), this.updateAdornments())
        : this.isVisible() && e.intersectsRect(s)
          ? (this.fs(true), this.updateAdornments())
          : this.invalidateAdornments()
      : (i.lc = true);
  }
  nl() {
    return true;
  }
  Oe() {
    return true;
  }
  Ir() {
    return false;
  }
  nn() {
    return true;
  }
  hasPlaceholder() {
    return false;
  }
  get category() {
    return this.sr;
  }
  set category(t) {
    const i = this.sr;
    if (i === t) return;
    (this.svg !== null && (this.svg.remove(), this.is(true)), Debug && U.i(t, "string", Part, "category"));
    const e = this.diagram,
      s = this.data;
    let n = null;
    if (e !== null && s !== null && !(this instanceof Adornment)) {
      const o = e.model.undoManager;
      o.isEnabled && !o.isUndoingRedoing && ((n = this.clone()), n.O.addAll(this.O));
    }
    if (((this.sr = t), this.t("category", i, t), e !== null && s !== null && !(this instanceof Adornment))) {
      const o = e.model;
      if (o.undoManager.isUndoingRedoing) return;
      if (this.Ir()) {
        e.partManager.setLinkCategoryForData(s, t);
        const r = e.partManager.findLinkTemplateForCategory(t);
        if (r !== null) {
          r.Yt();
          const l = r.copy();
          l !== null && this.pC(l, i, t);
        }
      } else {
        o !== null && o.setCategoryForNodeData(s, t);
        const r = e.partManager.findTemplateForNodeData(s, t);
        if (r !== null) {
          r.Yt();
          const l = r.copy();
          if (l !== null && !(l instanceof Link)) {
            const h = this.location.copy();
            (this.pC(l, i, t), this.location.isReal() || (this.location = h));
          }
        }
      }
      if (n !== null) {
        const r = this.clone();
        (r.O.addAll(this.O), this.t("self", n, r));
      }
    } else if (this instanceof Adornment) {
      const o = this.adornedPart;
      if (o !== null) {
        const r = o.nr;
        (r !== null && r.delete(i), o.addAdornment(this.category, this));
      }
    }
  }
  get self() {
    return this;
  }
  set self(t) {
    this.pC(t, this.category, t.category);
  }
  static jD = false;
  pC(t, i, e) {
    (t.constructor !== this.constructor &&
      (Part.jD ||
        ((Part.jD = true),
        U.ot('Should not change the class of the Part when changing category from "' + i + '" to "' + e + '"'),
        U.ot(
          "  Old class: " +
            U.Jn(this.constructor) +
            ", new class: " +
            U.Jn(t.constructor) +
            ", part: " +
            this.toString(),
        ))),
      this.clearAdornments());
    const s = this.data,
      n = this.layerName,
      o = this.isSelected,
      r = this.isHighlighted;
    let l = true,
      h = true,
      a = false;
    (this instanceof Node && ((l = this.isTreeLeaf), (h = this.isTreeExpanded), (a = this.wasTreeExpanded)),
      this.uE(),
      t.$o(this),
      t._L(this),
      t.cloneProtected(this),
      (this.sr = e),
      this.svg !== null && (this.svg.remove(), this.tc(), this.is(true)),
      this.g(),
      this.L());
    const f = this.diagram;
    let c = true;
    (f !== null && ((c = f.skipsUndoManager), (f.skipsUndoManager = true)),
      (this.oi = s),
      (this.P = o ? this.P | 4096 : this.P & -4097),
      (this.P = r ? this.P | 524288 : this.P & -524289),
      this instanceof Node &&
        ((this.z = l ? this.z | 4 : this.z & -5),
        (this.z = h ? this.z | 1 : this.z & -2),
        (this.z = a ? this.z | 2 : this.z & -3)),
      s !== null && this.updateTargetBindings());
    const u = this.layerName;
    (u !== n && ((this.xl = n), (this.layerName = u)),
      f !== null && (f.skipsUndoManager = c),
      this.Oe() && this.invalidateLayout(64));
  }
  canCopy() {
    if (!this.copyable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowCopy) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowCopy;
  }
  canDelete() {
    if (!this.deletable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowDelete) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowDelete;
  }
  canEdit() {
    if (!this.textEditable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowTextEdit) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowTextEdit;
  }
  canGroup() {
    if (!this.groupable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowGroup) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowGroup;
  }
  canMove() {
    if (!this.movable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowMove) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowMove;
  }
  canReshape() {
    if (!this.reshapable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowReshape) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowReshape;
  }
  canResize() {
    if (!this.resizable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowResize) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowResize;
  }
  canRotate() {
    if (!this.rotatable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowRotate) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowRotate;
  }
  canSelect() {
    if (!this.selectable) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowSelect) return false;
    const i = t.diagram;
    return i === null ? true : !!i.allowSelect;
  }
  get copyable() {
    return (this.P & 1) !== 0;
  }
  set copyable(t) {
    const i = (this.P & 1) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Part, "copyable"), (this.P = this.P ^ 1), this.t("copyable", i, t));
  }
  get deletable() {
    return (this.P & 2) !== 0;
  }
  set deletable(t) {
    const i = (this.P & 2) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Part, "deletable"), (this.P = this.P ^ 2), this.t("deletable", i, t));
  }
  get textEditable() {
    return (this.P & 4) !== 0;
  }
  set textEditable(t) {
    const i = (this.P & 4) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "textEditable"),
      (this.P = this.P ^ 4),
      this.t("textEditable", i, t),
      this.invalidateAdornments());
  }
  get groupable() {
    return (this.P & 8) !== 0;
  }
  set groupable(t) {
    const i = (this.P & 8) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Part, "groupable"), (this.P = this.P ^ 8), this.t("groupable", i, t));
  }
  get movable() {
    return (this.P & 16) !== 0;
  }
  set movable(t) {
    const i = (this.P & 16) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Part, "movable"), (this.P = this.P ^ 16), this.t("movable", i, t));
  }
  get selectionAdorned() {
    return (this.P & 32) !== 0;
  }
  set selectionAdorned(t) {
    const i = (this.P & 32) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "selectionAdorned"),
      (this.P = this.P ^ 32),
      this.t("selectionAdorned", i, t),
      this.invalidateAdornments());
  }
  get isInDocumentBounds() {
    return (this.P & 64) !== 0;
  }
  set isInDocumentBounds(t) {
    const i = (this.P & 64) !== 0;
    if (i !== t) {
      (Debug && U.i(t, "boolean", Part, "isInDocumentBounds"), (this.P = this.P ^ 64));
      const e = this.diagram;
      (e !== null && e.invalidateDocumentBounds(), this.t("isInDocumentBounds", i, t));
    }
  }
  get isLayoutPositioned() {
    return (this.P & 128) !== 0;
  }
  set isLayoutPositioned(t) {
    const i = (this.P & 128) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "isLayoutPositioned"),
      (this.P = this.P ^ 128),
      this.t("isLayoutPositioned", i, t),
      this.invalidateLayout(t ? 4 : 8));
  }
  get selectable() {
    return (this.P & 256) !== 0;
  }
  set selectable(t) {
    const i = (this.P & 256) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "selectable"),
      (this.P = this.P ^ 256),
      this.t("selectable", i, t),
      this.invalidateAdornments());
  }
  get reshapable() {
    return (this.P & 512) !== 0;
  }
  set reshapable(t) {
    const i = (this.P & 512) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "reshapable"),
      (this.P = this.P ^ 512),
      this.t("reshapable", i, t),
      this.invalidateAdornments());
  }
  get resizable() {
    return (this.P & 1024) !== 0;
  }
  set resizable(t) {
    const i = (this.P & 1024) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "resizable"),
      (this.P = this.P ^ 1024),
      this.t("resizable", i, t),
      this.invalidateAdornments());
  }
  get rotatable() {
    return (this.P & 2048) !== 0;
  }
  set rotatable(t) {
    const i = (this.P & 2048) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "rotatable"),
      (this.P = this.P ^ 2048),
      this.t("rotatable", i, t),
      this.invalidateAdornments());
  }
  get isSelected() {
    return (this.P & 4096) !== 0;
  }
  set isSelected(t) {
    const i = (this.P & 4096) !== 0;
    if (i !== t) {
      Debug && U.i(t, "boolean", Part, "isSelected");
      const e = this.diagram;
      if (t) {
        if (!this.canSelect()) return;
        if (e !== null) {
          const o = e.maxSelectionCount;
          if (e.selection.count >= o) return;
        }
      }
      this.P = this.P ^ 4096;
      let s = false;
      if (e !== null) {
        ((s = e.skipsUndoManager), (e.skipsUndoManager = true));
        const o = e.selection;
        (o.di(), t ? o.add(this) : o.delete(this), o.k());
      }
      (this.t("isSelected", i, t), this.invalidateAdornments());
      const n = this.selectionChanged;
      (n !== null && n(this), e !== null && (e.requestUpdate(), (e.skipsUndoManager = s)));
    }
  }
  get isHighlighted() {
    return (this.P & 524288) !== 0;
  }
  set isHighlighted(t) {
    const i = (this.P & 524288) !== 0;
    if (i !== t) {
      (Debug && U.i(t, "boolean", Part, "isHighlighted"), (this.P = this.P ^ 524288));
      const e = this.diagram;
      if (e !== null) {
        const n = e.highlighteds;
        (n.di(), t ? n.add(this) : n.delete(this), n.k());
      }
      (this.t("isHighlighted", i, t), this.L());
      const s = this.highlightedChanged;
      s !== null && s(this);
    }
  }
  get isShadowed() {
    return (this.P & 8192) !== 0;
  }
  set isShadowed(t) {
    const i = (this.P & 8192) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Part, "isShadowed"),
      (this.P = this.P ^ 8192),
      this.is(true),
      this.t("isShadowed", i, t),
      this.L());
  }
  KD() {
    return (this.P & 16384) !== 0;
  }
  UD(t) {
    t ? (this.P |= 16384) : (this.P &= -16385);
  }
  yh() {
    return (this.P & 32768) !== 0;
  }
  mC(t) {
    t ? (this.P |= 32768) : (this.P &= -32769);
  }
  A3() {
    return (this.P & 65536) !== 0;
  }
  FN(t) {
    t ? (this.P |= 65536) : (this.P &= -65537);
  }
  Gl() {
    return (this.P & 131072) !== 0;
  }
  fs(t) {
    t ? (this.P |= 131072) : (this.P &= -131073);
  }
  JD() {
    return (this.P & 1048576) !== 0;
  }
  gS(t) {
    t ? (this.P |= 1048576) : (this.P &= -1048577);
  }
  get isAnimated() {
    return (this.P & 262144) !== 0;
  }
  set isAnimated(t) {
    const i = (this.P & 262144) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Part, "isAnimated"), (this.P = this.P ^ 262144), this.t("isAnimated", i, t));
  }
  get highlightedChanged() {
    return this.J !== null ? this.J.Ay : null;
  }
  set highlightedChanged(t) {
    const i = this.highlightedChanged;
    i !== t &&
      (t !== null && U.C(t, Part, "highlightedChanged"), (this.se().Ay = t), this.t("highlightedChanged", i, t));
  }
  get selectionObjectName() {
    return this.J !== null ? this.J.Ty : "";
  }
  set selectionObjectName(t) {
    const i = this.selectionObjectName;
    i !== t &&
      (Debug && U.i(t, "string", Part, "selectionObjectName"),
      (this.se().Ty = t),
      (this.bl = null),
      this.t("selectionObjectName", i, t));
  }
  get selectionAdornmentTemplate() {
    return this.J !== null ? this.J.Ly : null;
  }
  set selectionAdornmentTemplate(t) {
    const i = this.selectionAdornmentTemplate;
    i !== t &&
      (t !== null && (U.s(t, Adornment, Part, "selectionAdornmentTemplate"), t.Yt()),
      (this.se().Ly = t),
      this.t("selectionAdornmentTemplate", i, t));
  }
  get selectionObject() {
    if (this.bl === null) {
      const t = this.selectionObjectName;
      if (t !== null && t !== "") {
        const i = this.findObject(t);
        i !== null ? (this.bl = i) : (this.bl = this);
      } else if (this instanceof Link) {
        const i = this.path;
        i !== null ? (this.bl = i) : (this.bl = this);
      } else this.bl = this;
    }
    return this.bl;
  }
  get selectionChanged() {
    return this.J !== null ? this.J.Dy : null;
  }
  set selectionChanged(t) {
    const i = this.selectionChanged;
    i !== t && (t !== null && U.C(t, Part, "selectionChanged"), (this.se().Dy = t), this.t("selectionChanged", i, t));
  }
  get resizeAdornmentTemplate() {
    return this.J !== null ? this.J.Fy : null;
  }
  set resizeAdornmentTemplate(t) {
    const i = this.resizeAdornmentTemplate;
    i !== t &&
      (Debug && U.s(t, Adornment, Part, "resizeAdornmentTemplate"),
      (this.se().Fy = t !== null ? t.Yt() : null),
      this.t("resizeAdornmentTemplate", i, t));
  }
  get resizeObjectName() {
    return this.J !== null ? this.J.Iy : "";
  }
  set resizeObjectName(t) {
    const i = this.resizeObjectName;
    i !== t &&
      (Debug && U.i(t, "string", Part, "resizeObjectName"), (this.se().Iy = t), this.t("resizeObjectName", i, t));
  }
  get resizeObject() {
    const t = this.resizeObjectName;
    if (t !== "") {
      const i = this.findObject(t);
      if (i !== null) return i;
    }
    return this;
  }
  get resizeCellSize() {
    return this.J !== null ? this.J.Ry : Size.Qw;
  }
  set resizeCellSize(t) {
    const i = this.resizeCellSize;
    i.equals(t) ||
      (Debug && U.s(t, Size, Part, "resizeCellSize"), (t = t.T()), (this.se().Ry = t), this.t("resizeCellSize", i, t));
  }
  get rotateAdornmentTemplate() {
    return this.J !== null ? this.J.Oy : null;
  }
  set rotateAdornmentTemplate(t) {
    const i = this.rotateAdornmentTemplate;
    i !== t &&
      (Debug && U.s(t, Adornment, Part, "rotateAdornmentTemplate"),
      (this.se().Oy = t !== null ? t.Yt() : null),
      this.t("rotateAdornmentTemplate", i, t));
  }
  get rotateObjectName() {
    return this.J !== null ? this.J.Ey : "";
  }
  set rotateObjectName(t) {
    const i = this.rotateObjectName;
    i !== t &&
      (Debug && U.i(t, "string", Part, "rotateObjectName"), (this.se().Ey = t), this.t("rotateObjectName", i, t));
  }
  get rotateObject() {
    const t = this.rotateObjectName;
    if (t !== "") {
      const i = this.findObject(t);
      if (i !== null) return i;
    }
    return this;
  }
  get rotationSpot() {
    return this.J !== null ? this.J.Vy : Spot.Default;
  }
  set rotationSpot(t) {
    const i = this.rotationSpot;
    i.equals(t) ||
      (Debug &&
        (U.s(t, Spot, Part, "rotationSpot"),
        t !== Spot.Default &&
          !t.isSpot() &&
          U.n("Part.rotationSpot must be a specific Spot value or Spot.Default, not: " + t)),
      (t = t.T()),
      (this.se().Vy = t),
      this.t("rotationSpot", i, t));
  }
  get text() {
    return this.mi;
  }
  set text(t) {
    const i = this.mi;
    i !== t && (Debug && U.i(t, "string", Part, "text"), (this.mi = t), this.t("text", i, t));
  }
  get containingGroup() {
    return this.Vh;
  }
  set containingGroup(t) {
    if (this.Oe()) {
      const i = this.Vh;
      if (i !== t) {
        (Debug && t !== null && U.s(t, Group, Part, "containingGroup"),
          t !== null &&
            (this === t || t.isMemberOf(this)) &&
            (this === t && U.n("Cannot make a Group a member of itself: " + this.toString()),
            U.n(
              "Cannot make a Group indirectly contain itself: " + this.toString() + " already contains " + t.toString(),
            )),
          this.invalidateLayout(2));
        const e = this.diagram;
        if (
          (i !== null ? i.yC(this) : this instanceof Group && e !== null && e.il.delete(this),
          (this.Vh = t),
          t !== null ? t.wC(this) : this instanceof Group && e !== null && e.il.add(this),
          this.invalidateLayout(1),
          e !== null && e.H)
        ) {
          const n = this.data,
            o = e.model;
          if (n !== null && o.Sh()) {
            const r = t !== null ? t.data : null;
            o.setGroupForData(n, o.getKeyForNodeData(r));
          }
        }
        const s = this.containingGroupChanged;
        if (s !== null) {
          let n = true;
          (e !== null && ((n = e.H), (e.H = true)), s(this, i, t), e !== null && (e.H = n));
        }
        if (this instanceof Group) {
          const n = new GSet();
          Part.bh(n, this, true, 0, true);
          const o = n.iterator;
          for (; o.next(); ) {
            const r = o.value;
            if (r instanceof Node) {
              const l = r.linksConnected;
              for (; l.next(); ) l.value.tg();
            }
          }
        }
        if (this instanceof Node) {
          const n = this.linksConnected;
          for (; n.next(); ) n.value.tg();
          const o = this.labeledLink;
          o !== null && o.tg();
        }
        (this.t("containingGroup", i, t), t !== null && t.N3());
      }
    } else U.n("cannot set the Part.containingGroup of a Link or Adornment");
  }
  Lh() {
    const t = this.containingGroup;
    t !== null && (t.hasPlaceholder() && t.placeholder.g(), t.g(), t.invalidateConnectedLinks());
  }
  L() {
    const t = this.diagram;
    t !== null && !this.us() && !this.yh() && this.isVisible() && this.Ei.isReal() && t.L(this.ga(this.Ei));
  }
  g() {
    if (this.vo()) return;
    super.g();
    const t = this.diagram;
    t !== null &&
      (t.A0(this), this instanceof Node && this.labeledLink !== null && this.labeledLink.Ac(), t.requestUpdate(true));
  }
  Ac(t) {
    if (this.us()) return;
    const i = this.diagram;
    (i !== null && (i.A0(this), this instanceof Node && this.invalidateConnectedLinks(), i.requestUpdate()),
      this.co(true));
  }
  i0(t) {
    if (!t) {
      const i = this.Vh;
      i !== null && i.wC(this);
    }
  }
  e0(t) {
    if (!t) {
      const i = this.Vh;
      i !== null && i.yC(this);
    }
  }
  dc() {
    const t = this.data;
    if (t !== null) {
      const i = this.diagram;
      if (i !== null) {
        const e = i.model;
        e !== null && e.removeNodeData(t);
      }
    }
  }
  get containingGroupChanged() {
    return this.J !== null ? this.J.By : null;
  }
  set containingGroupChanged(t) {
    const i = this.containingGroupChanged;
    i !== t &&
      (t !== null && U.C(t, Part, "containingGroupChanged"),
      (this.se().By = t),
      this.t("containingGroupChanged", i, t));
  }
  findSubGraphLevel() {
    return this.xC(this);
  }
  xC(t) {
    const i = t.containingGroup;
    if (i !== null) return 1 + this.xC(i);
    if (t instanceof Node) {
      const e = t.labeledLink;
      if (e !== null) return this.xC(e);
    }
    return 0;
  }
  findTopLevelPart() {
    return this.bC(this);
  }
  bC(t) {
    const i = t.containingGroup;
    if (i !== null) return this.bC(i);
    if (t instanceof Node) {
      const e = t.labeledLink;
      if (e !== null) return this.bC(e);
    }
    return t;
  }
  get isTopLevel() {
    return !(this.containingGroup !== null || (this instanceof Node && this.labeledLink !== null));
  }
  isMemberOf(t) {
    return t instanceof Group ? this.SC(this, t) : false;
  }
  SC(t, i) {
    if (t === i || i === null) return false;
    const e = t.containingGroup;
    if (e !== null && (e === i || this.SC(e, i))) return true;
    if (t instanceof Node) {
      const s = t.labeledLink;
      if (s !== null) return this.SC(s, i);
    }
    return false;
  }
  findCommonContainingGroup(t) {
    if (t === null) return null;
    if ((Debug && U.s(t, Part, Part, "findCommonContainingGroup:other"), this === t)) return this.containingGroup;
    let i = this;
    for (; i !== null; ) {
      if ((i instanceof Group && i.gS(true), i instanceof Node)) {
        const s = i.labeledLink;
        s !== null && (i = s);
      }
      i = i.containingGroup;
    }
    let e = null;
    for (i = t; i !== null; ) {
      if (i.JD()) {
        e = i;
        break;
      }
      if (i instanceof Node) {
        const s = i.labeledLink;
        s !== null && (i = s);
      }
      i = i.containingGroup;
    }
    for (i = this; i !== null; ) {
      if ((i instanceof Group && i.gS(false), i instanceof Node)) {
        const s = i.labeledLink;
        s !== null && (i = s);
      }
      i = i.containingGroup;
    }
    return e;
  }
  get layoutConditions() {
    return this.J !== null ? this.J.zy : 127;
  }
  set layoutConditions(t) {
    const i = this.layoutConditions;
    i !== t &&
      (Debug && U.i(t, "number", Part, "layoutConditions"), (this.se().zy = t), this.t("layoutConditions", i, t));
  }
  canLayout() {
    if (!this.isLayoutPositioned || !this.isVisible()) return false;
    const t = this.layer;
    return !((t !== null && t.isTemporary) || (this instanceof Node && this.isLinkLabel));
  }
  L3(t) {
    if (!this.isLayoutPositioned || (t & this.layoutConditions) === 0) return false;
    const i = this.layer;
    if ((i !== null && i.isTemporary) || (this instanceof Node && this.isLinkLabel)) return false;
    const e = this.diagram;
    return !(e !== null && e.undoManager.isUndoingRedoing);
  }
  invalidateLayout(t) {
    if ((t === void 0 && (t = 16777215), !this.L3(t))) return;
    const i = this.Vh;
    if (i !== null) {
      const e = i.layout;
      e !== null ? e.b() : i.invalidateLayout(t);
    } else {
      const e = this.diagram;
      if (e !== null) {
        const s = e.layout;
        s !== null && s.b();
      }
    }
  }
  xL() {
    if (!this.isVisible()) return false;
    const t = this.layer;
    return !(t !== null && t.isTemporary);
  }
  static bh(t, i, e, s, n, o) {
    if ((o === void 0 && (o = null), !t.has(i) && !(o !== null && !o(i)) && !(i instanceof Adornment))) {
      if ((t.add(i), i instanceof Node)) {
        if (e && i instanceof Group) {
          const r = i.memberParts;
          for (; r.next(); ) {
            const l = r.value;
            Part.bh(t, l, e, s, n, o);
          }
        }
        if (n !== false) {
          const r = i.linksConnected;
          for (; r.next(); ) {
            const l = r.value;
            if (t.has(l)) continue;
            const h = l.fromNode,
              a = l.toNode,
              f = h === null || t.has(h),
              c = a === null || t.has(a);
            (n ? f && c : f || c) && Part.bh(t, l, e, s, n, o);
          }
        }
        if (s > 1) {
          const r = i.findTreeChildrenNodes();
          for (; r.next(); ) {
            const l = r.value;
            Part.bh(t, l, e, s - 1, n, o);
          }
        }
      } else if (i instanceof Link) {
        const r = i.labelNodes;
        for (; r.next(); ) {
          const l = r.value;
          Part.bh(t, l, e, s, n, o);
        }
      }
    }
  }
  get dragComputation() {
    return this.J !== null ? this.J.Xy : null;
  }
  set dragComputation(t) {
    const i = this.dragComputation;
    i !== t && (t !== null && U.C(t, Part, "dragComputation"), (this.se().Xy = t), this.t("dragComputation", i, t));
  }
  get shadowOffset() {
    return this.J !== null ? this.J.Yy : Point.BA;
  }
  set shadowOffset(t) {
    const i = this.shadowOffset;
    i.equals(t) ||
      (Debug && U.s(t, Point, Part, "shadowOffset"),
      (t = t.T()),
      (this.se().Yy = t),
      this.L(),
      this.t("shadowOffset", i, t));
  }
  get shadowColor() {
    return this.J !== null ? this.J.Ky : "gray";
  }
  set shadowColor(t) {
    const i = this.shadowColor;
    i !== t &&
      (Debug && U.i(t, "string", Part, "shadowColor"), (this.se().Ky = t), this.L(), this.t("shadowColor", i, t));
  }
  get shadowBlur() {
    return this.J !== null ? this.J.On : 4;
  }
  set shadowBlur(t) {
    const i = this.shadowBlur;
    i !== t &&
      (Debug && U.i(t, "number", Part, "shadowBlur"), (this.se().On = t), this.L(), this.t("shadowBlur", i, t));
  }
}
