class Panel extends GraphObject {
  tt;
  O;
  si;
  Vd;
  io;
  ul;
  po;
  ir;
  _N;
  B;
  Bd;
  ft;
  Ci;
  oi;
  zd;
  Eh;
  on;
  constructor(t, i) {
    if ((super(), t === void 0)) this.tt = Panel.Position;
    else if (typeof t == "string") {
      const e = PanelLayout.ms.get(t);
      e !== null ? (this.tt = e) : U.n("PanelLayout not loaded: " + t);
    } else t instanceof PanelLayout ? (this.tt = t) : ((this.tt = Panel.Position), t && (i = t));
    ((this.l |= 4194304 | (this.tt === Panel.Grid ? 1048576 : 0)),
      (this.O = new List()),
      (this.si = Margin.rm),
      (this.Vd = Spot.Default),
      (this.io = 1),
      (this.ul = null),
      (this.po = ""),
      (this.ir = new Rect(NaN, NaN, NaN, NaN)),
      (this._N = null),
      (this.B = null),
      (this.Bd = 6),
      (this.Ci = null),
      (this.ft = null),
      (this.oi = null),
      (this.zd = NaN),
      (this.Eh = null),
      (this.on = null),
      i && Object.assign(this, i));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.tt = this.tt),
      (t.si = this.si.T()),
      (t.Vd = this.Vd.T()),
      (t.io = this.io),
      (t.po = this.po),
      t.ir.c(this.ir),
      this.B !== null && (t.B = this.B.copy(t)),
      (t.Bd = this.Bd),
      this.ft !== null && (t.ft = this.ft.copy()),
      this.Ci !== null && (t.Ci = this.Ci.copy()),
      (t.oi = this.oi),
      (t.zd = this.zd),
      (t.Eh = this.Eh));
  }
  $o(t) {
    (super.$o(t), (t.O = this.O));
    const i = t.O.h,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const n = i[s];
      n.en = t;
    }
    t.ul = null;
  }
  copy() {
    const t = super.copy(),
      i = this.O.h,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const o = i[s].copy();
      t.ZE(o);
    }
    return t;
  }
  toString() {
    return "Panel(" + this.type.name + ")#" + GSet.Ps(this);
  }
  get type() {
    return this.tt;
  }
  set type(t) {
    const i = this.tt;
    i !== t &&
      (Debug && U.s(t, PanelLayout, "PanelLayout"),
      (this.tt = t),
      (this.Oc = this.tt === Panel.Grid),
      this.g(),
      this.t("type", i, t));
  }
  get elements() {
    return this.O.iterator;
  }
  get naturalBounds() {
    return this.ji;
  }
  get padding() {
    return this.si;
  }
  set padding(t) {
    typeof t == "number"
      ? (t < 0 && U.G(t, ">= 0", Panel, "padding"), (t = new Margin(t)))
      : (U.s(t, Margin, Panel, "padding"),
        t.left < 0 && U.G(t.left, ">= 0", Panel, "padding:value.left"),
        t.right < 0 && U.G(t.right, ">= 0", Panel, "padding:value.right"),
        t.top < 0 && U.G(t.top, ">= 0", Panel, "padding:value.top"),
        t.bottom < 0 && U.G(t.bottom, ">= 0", Panel, "padding:value.bottom"));
    const i = this.si;
    i.equals(t) || ((t = t.T()), (this.si = t), this.g(), this.t("padding", i, t));
  }
  get defaultAlignment() {
    return this.Vd;
  }
  set defaultAlignment(t) {
    const i = this.Vd;
    i.equals(t) ||
      (Debug && U.s(t, Spot, Panel, "defaultAlignment"),
      (t = t.T()),
      (this.Vd = t),
      this.g(),
      this.t("defaultAlignment", i, t));
  }
  get defaultStretch() {
    return this.io;
  }
  set defaultStretch(t) {
    const i = this.io;
    i !== t && (Debug && U.W(t, Stretch, "Stretch"), (this.io = t), this.g(), this.t("defaultStretch", i, t));
  }
  get defaultSeparatorPadding() {
    return this.B !== null ? this.B.Ap : Margin.rm;
  }
  set defaultSeparatorPadding(t) {
    typeof t == "number" ? (t = new Margin(t)) : Debug && U.s(t, Margin, Panel, "defaultSeparatorPadding");
    const i = this.defaultSeparatorPadding;
    i.equals(t) ||
      ((t = t.T()),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Ap = t),
      this.g(),
      this.t("defaultSeparatorPadding", i, t));
  }
  get defaultRowSeparatorStroke() {
    return this.B !== null ? this.B.Tp : null;
  }
  set defaultRowSeparatorStroke(t) {
    const i = this.defaultRowSeparatorStroke;
    i !== t &&
      (t === null || typeof t == "string" || t instanceof Brush) &&
      (t instanceof Brush && t.k(),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Tp = t),
      this.L(),
      this.t("defaultRowSeparatorStroke", i, t));
  }
  get defaultRowSeparatorStrokeWidth() {
    return this.B !== null ? this.B.Lp : 1;
  }
  set defaultRowSeparatorStrokeWidth(t) {
    const i = this.defaultRowSeparatorStrokeWidth;
    i !== t &&
      isFinite(t) &&
      t >= 0 &&
      (this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Lp = t),
      this.g(),
      this.t("defaultRowSeparatorStrokeWidth", i, t));
  }
  get defaultRowSeparatorDashArray() {
    return this.B !== null ? this.B.Dp : null;
  }
  set defaultRowSeparatorDashArray(t) {
    const i = this.defaultRowSeparatorDashArray;
    if (i !== t) {
      if (
        (t !== null && !Array.isArray(t) && U.Li(t, "Array", Panel, "defaultRowSeparatorDashArray:value"), t !== null)
      ) {
        const e = t.length;
        let s = 0;
        for (let n = 0; n < e; n++) {
          const o = t[n];
          ((typeof o != "number" || !(o >= 0) || !isFinite(o)) &&
            U.n("defaultRowSeparatorDashArray value " + o + " at index " + n + " must be a positive number or zero."),
            (s += o));
        }
        if (s === 0) {
          if (i === null) return;
          t = null;
        }
      }
      (this.B === null && (this.B = new TablePanelSettings()),
        (this.B.Dp = t),
        this.L(),
        this.t("defaultRowSeparatorDashArray", i, t));
    }
  }
  get defaultColumnSeparatorStroke() {
    return this.B !== null ? this.B.Fp : null;
  }
  set defaultColumnSeparatorStroke(t) {
    const i = this.defaultColumnSeparatorStroke;
    i !== t &&
      (t === null || typeof t == "string" || t instanceof Brush) &&
      (t instanceof Brush && t.k(),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Fp = t),
      this.L(),
      this.t("defaultColumnSeparatorStroke", i, t));
  }
  get defaultColumnSeparatorStrokeWidth() {
    return this.B !== null ? this.B.Ip : 1;
  }
  set defaultColumnSeparatorStrokeWidth(t) {
    const i = this.defaultColumnSeparatorStrokeWidth;
    i !== t &&
      isFinite(t) &&
      t >= 0 &&
      (this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Ip = t),
      this.g(),
      this.t("defaultColumnSeparatorStrokeWidth", i, t));
  }
  get defaultColumnSeparatorDashArray() {
    return this.B !== null ? this.B.Rp : null;
  }
  set defaultColumnSeparatorDashArray(t) {
    const i = this.defaultColumnSeparatorDashArray;
    if (i !== t) {
      if (
        (t !== null && !Array.isArray(t) && U.Li(t, "Array", Panel, "defaultColumnSeparatorDashArray:value"),
        t !== null)
      ) {
        const e = t.length;
        let s = 0;
        for (let n = 0; n < e; n++) {
          const o = t[n];
          ((typeof o != "number" || !(o >= 0) || !isFinite(o)) &&
            U.n(
              "defaultColumnSeparatorDashArray value " + o + " at index " + n + " must be a positive number or zero.",
            ),
            (s += o));
        }
        if (s === 0) {
          if (i === null) return;
          t = null;
        }
      }
      (this.B === null && (this.B = new TablePanelSettings()),
        (this.B.Rp = t),
        this.L(),
        this.t("defaultColumnSeparatorDashArray", i, t));
    }
  }
  get Oh() {
    return this.B !== null ? this.B.Oh : null;
  }
  set Oh(t) {
    (this.B === null && (this.B = new TablePanelSettings()), (this.B.Oh = t));
  }
  get viewboxStretch() {
    return this.Bd;
  }
  set viewboxStretch(t) {
    const i = this.Bd;
    i !== t &&
      (Debug && U.W(t, ViewboxStretch, "ViewboxStretch"), (this.Bd = t), this.g(), this.t("viewboxStretch", i, t));
  }
  get gridCellSize() {
    return this.Ci !== null ? this.Ci.Xd : Size.XA;
  }
  set gridCellSize(t) {
    this.Ci === null && (this.Ci = new GridPanelSettings());
    const i = this.Ci.Xd;
    if (!i.equals(t)) {
      ((!t.isReal() || t.width === 0 || t.height === 0) && U.n("Invalid Panel.gridCellSize: " + t),
        (this.Ci.Xd = t.T()));
      const e = this.diagram;
      (e !== null && this === e.grid && e.md(), this.L(), this.t("gridCellSize", i, t));
    }
  }
  get gridOrigin() {
    return this.Ci !== null ? this.Ci.Yd : Point.wn;
  }
  set gridOrigin(t) {
    this.Ci === null && (this.Ci = new GridPanelSettings());
    const i = this.Ci.Yd;
    if (!i.equals(t)) {
      (t.isReal() || U.n("Invalid Panel.gridOrigin: " + t), (this.Ci.Yd = t.T()));
      const e = this.diagram;
      (e !== null && this === e.grid && e.md(), this.L(), this.t("gridOrigin", i, t));
    }
  }
  get graduatedMin() {
    return this.ft !== null ? this.ft.Op : 0;
  }
  set graduatedMin(t) {
    const i = this.graduatedMin;
    if (
      i !== t &&
      (Debug && U.r(t, Panel, "graduatedMin"),
      this.ft === null && (this.ft = new GradPanelSettings()),
      (this.ft.Op = t),
      this.g(),
      this.t("graduatedMin", i, t),
      this.bc())
    ) {
      const e = this.part;
      e !== null && this.Ka(e, "graduatedRange");
    }
  }
  get graduatedMax() {
    return this.ft !== null ? this.ft.Ep : 100;
  }
  set graduatedMax(t) {
    const i = this.graduatedMax;
    if (
      i !== t &&
      (Debug && U.r(t, Panel, "graduatedMax"),
      this.ft === null && (this.ft = new GradPanelSettings()),
      (this.ft.Ep = t),
      this.g(),
      this.t("graduatedMax", i, t),
      this.bc())
    ) {
      const e = this.part;
      e !== null && this.Ka(e, "graduatedRange");
    }
  }
  get graduatedRange() {
    return this.graduatedMax - this.graduatedMin;
  }
  get graduatedTickUnit() {
    return this.ft !== null ? this.ft.Vp : 10;
  }
  set graduatedTickUnit(t) {
    const i = this.graduatedTickUnit;
    i !== t &&
      t > 0 &&
      (Debug && U.r(t, Panel, "graduatedTickUnit"),
      this.ft === null && (this.ft = new GradPanelSettings()),
      (this.ft.Vp = t),
      this.g(),
      this.t("graduatedTickUnit", i, t));
  }
  get graduatedTickBase() {
    return this.ft !== null ? this.ft.Bp : 0;
  }
  set graduatedTickBase(t) {
    const i = this.graduatedTickBase;
    i !== t &&
      (Debug && U.r(t, Panel, "graduatedTickBase"),
      this.ft === null && (this.ft = new GradPanelSettings()),
      (this.ft.Bp = t),
      this.g(),
      this.t("graduatedTickBase", i, t));
  }
  get Es() {
    return this.ft !== null ? this.ft.Es : null;
  }
  set Es(t) {
    this.ft !== null ? (this.ft.Es = t) : t !== null && ((this.ft = new GradPanelSettings()), (this.ft.Es = t));
  }
  get ss() {
    return this.ft !== null ? this.ft.ss : null;
  }
  set ss(t) {
    this.ft !== null ? (this.ft.ss = t) : t !== null && ((this.ft = new GradPanelSettings()), (this.ft.ss = t));
  }
  get ys() {
    return this.ft !== null ? this.ft.ys : null;
  }
  set ys(t) {
    this.ft !== null ? (this.ft.ys = t) : t !== null && ((this.ft = new GradPanelSettings()), (this.ft.ys = t));
  }
  get Ee() {
    return this.ft !== null ? this.ft.Ee : null;
  }
  set Ee(t) {
    this.ft !== null ? (this.ft.Ee = t) : t !== null && ((this.ft = new GradPanelSettings()), (this.ft.Ee = t));
  }
  J0(t) {
    super.J0(t);
    const i = this.O.h,
      e = i.length;
    for (let s = 0; s < e; s++) i[s].J0(t);
  }
  Dh(t, i) {
    if (this.tt === Panel.Grid) {
      (t.commitTransform(), this.tt.vi(this, t, i));
      return;
    }
    if (this.tt === Panel.Graduated) {
      (t.commitTransform(), this.tt.vi(this, t, i));
      return;
    }
    if (this.tt === Panel.Table)
      if ((t.commitTransform(), t instanceof SVGContext)) {
        const r = t.currentElement;
        ((t.currentElement = t.newGroup2("idl-ts")), this.tC(t, i), t.endGroup(), (t.currentElement = r));
      } else this.tC(t, i);
    const e = this.isClipping && this.tt === Panel.Spot;
    e && t.save();
    const s = this.findMainElement(),
      n = this.O.h,
      o = n.length;
    for (let r = 0; r < o; r++) {
      const l = n[r];
      (e && l === s && (t.clipInsteadOfFill = true), l.vi(t, i), e && l === s && (t.clipInsteadOfFill = false));
    }
    e && (t.restore(), t.clearContextCache(true));
  }
  tC(t, i) {
    t.lineCap = "butt";
    const e = this.rowCount > 0 ? this.Xe : null,
      s = this.columnCount > 0 ? this.Ye : null;
    (e !== null && this.tS(t, i, true, e, true),
      s !== null && this.tS(t, i, false, s, true),
      e !== null && this.xD(t, true, e),
      s !== null && this.xD(t, false, s),
      e !== null && this.tS(t, i, true, e, false),
      s !== null && this.tS(t, i, false, s, false));
  }
  xD(t, i, e) {
    const s = e.length,
      n = this.actualBounds,
      o = this.naturalBounds;
    let r = true;
    for (let l = 0; l < s; l++) {
      const h = e[l];
      if (h === void 0 || h.actual === 0) continue;
      if (r) {
        r = false;
        continue;
      }
      if (i) {
        if (h.position > o.height) continue;
      } else if (h.position > o.width) continue;
      let a = h.separatorStrokeWidth;
      isNaN(a) && (a = i ? this.defaultRowSeparatorStrokeWidth : this.defaultColumnSeparatorStrokeWidth);
      let f = h.separatorStroke;
      if (
        (f === null && (f = i ? this.defaultRowSeparatorStroke : this.defaultColumnSeparatorStroke),
        a === 0 || f === null)
      )
        continue;
      this.Cn(t, f, false, false, o, n);
      let c = false,
        u = h.separatorDashArray;
      (u === null && (u = i ? this.defaultRowSeparatorDashArray : this.defaultColumnSeparatorDashArray),
        u !== null && ((c = true), t.enableDash(u, 0)),
        t.beginPath());
      const d = h.position + a;
      i ? d > o.height && (a -= d - o.height) : d > o.width && (a -= d - o.width);
      let m = h.position + a / 2;
      t.lineWidth = a;
      const g = this.si;
      if (i) {
        m += g.top;
        const p = g.left,
          y = o.width - g.right;
        (t.moveTo(p, m), t.lineTo(y, m));
      } else {
        m += g.left;
        const p = g.top,
          y = o.height - g.bottom;
        (t.moveTo(m, p), t.lineTo(m, y));
      }
      (t.stroke(), t.endPath(), c && t.disableDash());
    }
  }
  tS(t, i, e, s, n) {
    const o = s.length,
      r = this.actualBounds,
      l = this.naturalBounds,
      h = this.bD(true),
      a = this.bD(false);
    for (let f = 0; f < o; f++) {
      const c = s[f];
      if (c === void 0 || c.background === null || c.coversSeparators === n || c.actual === 0) continue;
      const u = e ? r.height : r.width;
      if (c.position > u) continue;
      let d = c.computeEffectiveSpacing(),
        m = c.separatorStrokeWidth;
      isNaN(m) && (m = e ? this.defaultRowSeparatorStrokeWidth : this.defaultColumnSeparatorStrokeWidth);
      let g = c.separatorStroke;
      (g === null && (g = e ? this.defaultRowSeparatorStroke : this.defaultColumnSeparatorStroke),
        (g === null || c.index === (e ? h : a)) && (m = 0),
        (d -= m));
      const p = c.position + m;
      let y = d + c.actual;
      if ((p + y > u && (y = u - p), y <= 0)) continue;
      const x = this.si;
      (this.Cn(t, c.background, true, false, l, r),
        e
          ? t.fillRect(x.left, p + x.top, r.width - (x.left + x.right), y)
          : t.fillRect(p + x.left, x.top, y, r.height - (x.top + x.bottom)));
    }
  }
  bD(t) {
    const i = t ? this.rowCount : this.columnCount;
    for (let e = 0; e < i; e++) {
      const s = t ? this.Xe[e] : this.Ye[e];
      if (s !== void 0) return s.index;
    }
    return 0;
  }
  Mc() {
    const t = this.O.h,
      i = t.length;
    for (let e = 0; e < i; e++) t[e].Mc();
    this.is(true);
  }
  Pc(t, i, e) {
    const s = this.svg;
    if (s === null) return false;
    if (this.type === Panel.Table) {
      const r = s.getElementsByClassName("idl-ts"),
        l = r.length !== 0 ? r[0] : null;
      (l !== null && (l.innerHTML = ""), (t.currentElement = l), this.tC(t, i), (t.currentElement = null));
    } else {
      if (this.tt === Panel.Grid) return ((s.innerHTML = ""), s.remove(), false);
      if (this.tt === Panel.Graduated) return ((s.innerHTML = ""), s.remove(), false);
      if (this.tt === Panel.Spot && this.isClipping)
        return ((s.innerHTML = ""), s.remove(), (this.Nh = null), this.Mc(), false);
    }
    if (!super.Pc(t, i, e)) return false;
    const n = this.O.h,
      o = n.length;
    for (let r = 0; r < o; r++) n[r].vi(t, i);
    return true;
  }
  Td(t) {
    return true;
  }
  Z0(t, i, e, s) {
    if (!this.isClipping) {
      if (this.nn() && t.partClipRect !== null) {
        const n = t.partClipRect,
          o = this.O.h;
        let r = 0,
          l = 0;
        for (let h = 0; h < o.length; h++) {
          if (!o[h].isVisibleObject()) continue;
          const a = o[h].actualBounds;
          ((r = h === 0 ? a.x : Math.min(a.x, r)), (l = h === 0 ? a.y : Math.min(a.y, l)));
        }
        s.setAttributeNS(
          null,
          "clip-path",
          `path('M ${n.x - e.x - r},${n.y - e.y - l} l ${n.width} 0 l 0 ${n.height} l -${n.width} 0 z')`,
        );
        return;
      }
      super.Z0(t, i, e, s);
    }
  }
  Sc(t, i, e, s, n) {
    const o = this.Fn(),
      r = this.E,
      l = 1 / (r.m11 * r.m22 - r.m12 * r.m21);
    let h = r.m22 * l,
      a = -r.m12 * l,
      f = -r.m21 * l,
      c = r.m11 * l,
      u = l * (r.m21 * r.dy - r.m22 * r.dx),
      d = l * (r.m12 * r.dx - r.m11 * r.dy);
    if (this.background !== null) {
      const m = t * h + i * f + u,
        g = t * a + i * c + d,
        p = e * h + s * f + u,
        y = e * a + s * c + d;
      n.e(0, 0);
      const x = this.naturalBounds,
        b = G.Il(0, 0, x.width, x.height, m, g, p, y, n);
      return (n.E(r), b);
    } else {
      o || ((h = 1), (a = 0), (f = 0), (c = 1), (u = 0), (d = 0));
      const m = t * h + i * f + u,
        g = t * a + i * c + d,
        p = e * h + s * f + u,
        y = e * a + s * c + d;
      n.e(p, y);
      let x = (p - m) ** 2 + (y - g) ** 2,
        b = false;
      const S = this.O.h,
        k = S.length,
        P = Point.a();
      let A = null,
        C = 1 / 0,
        M = null;
      const N = this.isClipping && this.tt === Panel.Spot;
      N &&
        ((M = Point.a()),
        (A = this.findMainElement()),
        (b = A.Sc(m, g, p, y, M)),
        b && (C = (m - M.x) ** 2 + (g - M.y) ** 2));
      for (let T = 0; T < k; T++) {
        const L = S[T];
        if (!L.visible || L === A || !L.Sc(m, g, p, y, P)) continue;
        b = true;
        const D = (m - P.x) ** 2 + (g - P.y) ** 2;
        D < x && ((x = D), n.set(P));
      }
      return (N && (C > x && n.set(M), Point.o(M)), Point.o(P), o && n.E(r), b);
    }
  }
  tc() {
    const t = this.O.h,
      i = t.length;
    for (let e = 0; e < i; e++) t[e].tc();
    super.tc();
  }
  g(t) {
    if (this.vo()) return;
    super.g(t);
    let i = null;
    (this.tt === Panel.Auto || this.tt === Panel.Link) && (i = this.findMainElement());
    const e = this.O.h,
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n];
      if (((o === i || o.isPanelMain) && o.g(true), o.desiredSize.isReal() || !o.visible)) continue;
      const r = o.sn(false);
      (!(o instanceof Placeholder) && !(o instanceof Panel) && !(o instanceof TextBlock) && r === 0) || o.g(true);
    }
  }
  Cc() {
    if (this.vo()) return;
    (this.ke(true), this.co(true));
    const t = this.O.h,
      i = t.length;
    for (let e = 0; e < i; e++) t[e].Cc();
  }
  kc() {
    if (this.Gb() === false) {
      (this.Ld(true), this.Fh(true));
      const t = this.O.h,
        i = t.length;
      for (let e = 0; e < i; e++) t[e].ON();
    }
  }
  ON() {
    this.Fh(true);
    const t = this.O.h,
      i = t.length;
    for (let e = 0; e < i; e++) t[e].ON();
  }
  Cd(t, i, e, s) {
    const n = this.ir;
    n.e(0, 0, 0, 0);
    const o = this.desiredSize,
      r = this.minSize;
    (e === void 0 && ((e = r.width), (s = r.height)), (e = Math.max(e, r.width)), (s = Math.max(s, r.height)));
    const l = this.maxSize;
    (isNaN(o.width) || (t = Math.min(o.width, l.width)),
      isNaN(o.height) || (i = Math.min(o.height, l.height)),
      (t = Math.max(e, t)),
      (i = Math.max(s, i)));
    const h = this.si;
    ((t = Math.max(t - h.left - h.right, 0)), (i = Math.max(i - h.top - h.bottom, 0)));
    const a = this.O.h;
    this.tt.measure(this, t, i, a, n, e, s);
    let f = n.width + h.left + h.right,
      c = n.height + h.top + h.bottom;
    (isFinite(o.width) && (f = o.width),
      isFinite(o.height) && (c = o.height),
      (f = Math.min(l.width, f)),
      (c = Math.min(l.height, c)),
      (f = Math.max(r.width, f)),
      (c = Math.max(r.height, c)),
      (f = Math.max(e, f)),
      (c = Math.max(s, c)),
      n.$n(f, c),
      this.naturalBounds.$n(f, c),
      this.fo(0, 0, f, c));
  }
  findMainElement() {
    if (this.ul === null) {
      const t = this.O.h,
        i = t.length;
      if (i === 0) return null;
      for (let e = 0; e < i; e++) {
        const s = t[e];
        if (s.isPanelMain === true) return ((this.ul = s), s);
      }
      this.ul = t[0];
    }
    return this.ul;
  }
  tr() {
    return this.part !== null ? this.part.locationObject : null;
  }
  get panelLayoutState() {
    return this._N;
  }
  set panelLayoutState(t) {
    this._N = t;
  }
  Th(t, i, e, s) {
    const n = this.O.h;
    if ((this.actualBounds.e(t, i, e, s), !this.desiredSize.isReal())) {
      let o = this.sn(true);
      const r = this.measuredBounds,
        l = r.width,
        h = r.height,
        a = this.hl,
        f = a.left + a.right,
        c = a.top + a.bottom;
      switch ((l === e && h === s && (o = 0), o)) {
        case 0:
          (l > e || h > s) && (this.g(), this.gt(l > e ? e : l, h > s ? s : h, 0, 0));
          break;
        case 2:
          (this.g(true), this.gt(e + f, s + c, 0, 0));
          break;
        case 5:
          (this.g(true), this.gt(e + f, h + c, 0, 0));
          break;
        case 4:
          (this.g(true), this.gt(l + f, s + c, 0, 0));
          break;
      }
    }
    this.tt.arrange(this, n, this.ir);
  }
  Ah(t) {
    const i = this.naturalBounds,
      e = this.tr();
    if (Rect.contains(0, 0, i.width, i.height, t.x, t.y)) {
      const s = this.O.h,
        n = s.length,
        o = Point.U(0, 0);
      for (let r = n; r--; ) {
        const l = s[r];
        if (!(!l.visible && l !== e) && (o.set(t).Je(l.E), l.containsPoint(o))) return (Point.o(o), true);
      }
      return (Point.o(o), this.Ft !== null);
    }
    return false;
  }
  q0(t) {
    if (this.ho === t) return this;
    const i = this.O.h,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const o = i[s].q0(t);
      if (o !== null) return o;
    }
    return null;
  }
  walkVisualTreeFrom(t, i) {
    if ((i(this, t), t instanceof Panel)) {
      const e = t.O.h,
        s = e.length;
      for (let n = 0; n < s; n++) this.walkVisualTreeFrom(e[n], i);
    }
  }
  Ln(t) {
    this.SD(this, t);
  }
  SD(t, i) {
    i(t);
    const e = t.O.h,
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n];
      o instanceof Panel && this.SD(o, i);
    }
  }
  QE(t) {
    this.kD(this, t);
  }
  kD(t, i) {
    if ((i(t), t instanceof Panel)) {
      const e = t.O.h,
        s = e.length;
      for (let n = 0; n < s; n++) this.kD(e[n], i);
    }
  }
  findInVisualTree(t) {
    return this.PD(this, t);
  }
  PD(t, i) {
    if (i(t)) return t;
    if (t instanceof Panel) {
      const e = t.O.h,
        s = e.length;
      for (let n = 0; n < s; n++) {
        const o = this.PD(e[n], i);
        if (o !== null) return o;
      }
    }
    return null;
  }
  findObject(t) {
    if (this.name === t) return this;
    const i = this.O.h;
    let e = i.length;
    this.Eh !== null && (e = this.zp());
    for (let s = 0; s < e; s++) {
      const n = i[s];
      if (n instanceof Panel) {
        const o = n.findObject(t);
        if (o !== null) return o;
      }
      if (n.name === t) return n;
    }
    return null;
  }
  MD() {
    const t = this.O.h,
      i = t.length;
    let e = 0;
    for (let s = 0; s < i; s++) {
      const n = t[s];
      n instanceof Panel ? (e = Math.max(e, n.MD())) : n instanceof Shape && (e = Math.max(e, n._E()));
    }
    return e;
  }
  Fn() {
    return !(this.type === Panel.TableRow || this.type === Panel.TableColumn);
  }
  fl() {
    return this.type === Panel.TableRow || this.type === Panel.TableColumn;
  }
  qT(t, i, e) {
    if (this.pickable === false || (i === void 0 && (i = null), e === void 0 && (e = null), this.us())) return null;
    const s = this.naturalBounds,
      n = 1 / this.getDocumentScale(),
      o = this.Fn(),
      r = o ? t : Point.U(t.x, t.y).Je(this.E),
      l = this.diagram;
    let h = 10,
      a = 5;
    if (
      (l !== null && ((h = l.getInputOption("extraTouchArea")), (a = h / 2)),
      Rect.contains(-(a * n), -(a * n), s.width + h * n, s.height + h * n, r.x, r.y))
    ) {
      if (!this.Oc) {
        const c = this.O.h,
          u = c.length,
          d = Point.a(),
          m = this.isClipping && this.tt === Panel.Spot,
          g = m ? this.findMainElement() : null;
        if (m && g && (g.Fn() ? d.set(t).Je(g.E) : d.set(t), !g.containsPoint(d)))
          return (Point.o(d), o || Point.o(r), null);
        const p = this.tr();
        for (let y = u; y--; ) {
          const x = c[y];
          if ((!x.visible && x !== p) || (x.Fn() ? d.set(t).Je(x.E) : d.set(t), m && x === g)) continue;
          let b = null;
          if (
            (x instanceof Panel ? (b = x.qT(d, i, e)) : x.pickable === true && x.containsPoint(d) && (b = x),
            b !== null && (i !== null && (b = i(b)), b !== null && (e === null || e(b))))
          )
            return (Point.o(d), o || Point.o(r), b);
        }
        Point.o(d);
      }
      if (this.background === null) return (o || Point.o(r), null);
      const f = Rect.contains(0, 0, s.width, s.height, r.x, r.y) ? this : null;
      return (o || Point.o(r), f);
    }
    return (o || Point.o(r), null);
  }
  HT(t, i, e, s) {
    if (this.pickable === false) return false;
    (i === void 0 && (i = null), e === void 0 && (e = null));
    const n = this.naturalBounds,
      o = this.Fn(),
      r = o ? t : Point.U(t.x, t.y).Je(this.E),
      l = this.fl(),
      h = Rect.contains(0, 0, n.width, n.height, r.x, r.y);
    if (l || h) {
      if (!this.Oc) {
        const a = this.O.h,
          f = a.length,
          c = Point.a(),
          u = this.tr();
        for (let d = f; d--; ) {
          const m = a[d];
          if (!m.visible && m !== u) continue;
          m.Fn() ? c.set(t).Je(m.E) : c.set(t);
          let g = m;
          const p = m instanceof Panel ? m : null;
          if (p !== null ? p.HT(c, i, e, s) : g.containsPoint(c)) {
            if (g.pickable === false) continue;
            (i !== null && (g = i(g)), g !== null && (e === null || e(g)) && s.add(g));
          }
        }
        Point.o(c);
      }
      return (o || Point.o(r), h && this.background !== null);
    }
    return (o || Point.o(r), false);
  }
  Qm(t, i, e, s, n, o) {
    if (this.pickable === false) return false;
    (i === void 0 && (i = null), e === void 0 && (e = null));
    let r = o;
    if ((r === void 0 && ((r = Transform.a()), r.Ki()), r.Cf(this.E), this.containedInRect(t, r)))
      return (this.iC(i, e, n), o === void 0 && Transform.o(r), true);
    if (this.intersectsRect(t, r)) {
      if (!this.Oc) {
        const l = this.tr(),
          h = this.O.h,
          a = h.length;
        for (let f = a; f--; ) {
          const c = h[f];
          if (!c.visible && c !== l) continue;
          const u = c.actualBounds,
            d = this.naturalBounds;
          if (u.x > d.width || u.y > d.height || u.x + u.width < 0 || u.y + u.height < 0) continue;
          let m = c;
          const g = c instanceof Panel ? c : null,
            p = Transform.a();
          (p.set(r),
            (g !== null ? g.Qm(t, i, e, s, n, p) : m.eD(t, s, p)) &&
              (i !== null && (m = i(m)), m !== null && (e === null || e(m)) && n.add(m)),
            Transform.o(p));
        }
      }
      return (o === void 0 && Transform.o(r), s);
    }
    return (o === void 0 && Transform.o(r), false);
  }
  iC(t, i, e) {
    const s = this.O.h,
      n = s.length;
    for (let o = n; o--; ) {
      const r = s[o];
      if (!r.visible) continue;
      const l = r.actualBounds,
        h = this.naturalBounds;
      if (l.x > h.width || l.y > h.height || l.x + l.width < 0 || l.y + l.height < 0) continue;
      r instanceof Panel && r.iC(t, i, e);
      let a = r;
      (t !== null && (a = t(a)), a !== null && (i === null || i(a)) && e.add(a));
    }
  }
  vT(t, i, e, s, n, o) {
    if (this.pickable === false) return false;
    (e === void 0 && (e = null), s === void 0 && (s = null));
    const r = this.naturalBounds,
      l = this.Fn(),
      h = l ? t : Point.U(t.x, t.y).Je(this.E),
      a = l ? i : Point.U(i.x, i.y).Je(this.E),
      f = h.distanceSquaredPoint(a),
      c =
        (h.x > 0 && h.x < r.width && h.y > 0 && h.y < r.height) ||
        Point.distanceLineSegmentSquared(h.x, h.y, 0, 0, 0, r.height) <= f ||
        Point.distanceLineSegmentSquared(h.x, h.y, 0, r.height, r.width, r.height) <= f ||
        Point.distanceLineSegmentSquared(h.x, h.y, r.width, r.height, r.width, 0) <= f ||
        Point.distanceLineSegmentSquared(h.x, h.y, r.width, 0, 0, 0) <= f,
      u =
        h.distanceSquared(0, 0) <= f &&
        h.distanceSquared(0, r.height) <= f &&
        h.distanceSquared(r.width, 0) <= f &&
        h.distanceSquared(r.width, r.height) <= f;
    if ((l || (Point.o(h), Point.o(a)), c)) {
      if (!this.Oc) {
        const d = Point.a(),
          m = Point.a(),
          g = this.tr(),
          p = this.O.h,
          y = p.length;
        for (let x = y; x--; ) {
          const b = p[x];
          if (!b.visible && b !== g) continue;
          const S = b.actualBounds,
            k = this.naturalBounds;
          if (l && (S.x > k.width || S.y > k.height || S.x + S.width < 0 || S.y + S.height < 0)) continue;
          if (b.Fn()) {
            const C = b.E;
            (d.set(t).Je(C), m.set(i).Je(C));
          } else (d.set(t), m.set(i));
          let P = b;
          const A = b instanceof Panel ? b : null;
          (A !== null ? A.vT(d, m, e, s, n, o) : P.sD(d, m, n)) &&
            (e !== null && (P = e(P)), P !== null && (s === null || s(P)) && o.add(P));
        }
        (Point.o(d), Point.o(m));
      }
      return n ? c : u;
    }
    return false;
  }
  jN(t) {
    let i = null;
    if (t instanceof Shape) {
      ((i = t.spot1), i === Spot.Default && (i = null));
      const e = t.geometry;
      e !== null && i === null && (i = e.spot1);
    }
    return (i === null && (i = Spot.TopLeft), i);
  }
  JN(t) {
    let i = null;
    if (t instanceof Shape) {
      ((i = t.spot2), i === Spot.Default && (i = null));
      const e = t.geometry;
      e !== null && i === null && (i = e.spot2);
    }
    return (i === null && (i = Spot.BottomRight), i);
  }
  add(...t) {
    for (let i = 0; i < t.length; i++) this.insertAt(this.O.count, t[i]);
    return this;
  }
  elt(t) {
    return this.O.elt(t);
  }
  insertAt(t, i) {
    (Debug && U.s(i, GraphObject, Panel, "insertAt"),
      i instanceof Part && U.n("Cannot add a Part to a Panel: " + i + "; use a Panel instead"),
      (this === i || this.isContainedBy(i)) &&
        (this === i && U.n("Cannot make a Panel contain itself: " + this.toString()),
        U.n(
          "Cannot make a Panel indirectly contain itself: " + this.toString() + " already contains " + i.toString(),
        )));
    const e = i.panel;
    if (
      (e !== null &&
        e !== this &&
        U.n(
          "Cannot add a GraphObject that already belongs to another Panel to this Panel: " +
            i.toString() +
            ", already contained by " +
            e.toString() +
            ", cannot be shared by this Panel: " +
            this.toString(),
        ),
      this.tt === Panel.Grid && !(i instanceof Shape) && U.n("Can only add Shapes to a Grid Panel, not: " + i),
      this.tt === Panel.Graduated &&
        !(i instanceof Shape || i instanceof TextBlock) &&
        U.n("Can only add Shapes or TextBlocks to a Graduated Panel, not: " + i),
      i.Ua(this),
      (i.al = null),
      this.itemArray !== null)
    ) {
      const r = i.data;
      U.it(r) && (this.on === null && (this.on = new GMap()), this.on.set(r, i));
    }
    const s = this.O;
    let n = -1;
    if (e === this) {
      let r = -1;
      const l = this.O.h,
        h = l.length;
      for (let a = 0; a < h; a++)
        if (l[a] === i) {
          r = a;
          break;
        }
      if (r !== -1) {
        if (r === t || (r + 1 >= s.count && t >= s.count)) return;
        (s.removeAt(r), (n = r));
      } else U.n("element " + i.toString() + " has panel " + e.toString() + " but is not contained by it.");
    }
    ((t < 0 || t > s.count) && (t = s.count),
      s.insertAt(t, i),
      (t === 0 || i.isPanelMain) && (this.ul = null),
      this.vo() || this.g(),
      i.g(false),
      i.portId !== null ? (this.Rn = true) : i instanceof Panel && i.Rn === true && (this.Rn = true),
      (this.ys = null),
      this.isEnabledObject() || this.iS(i, false));
    const o = this.part;
    if (o !== null) {
      (o.np(), o.Ec(), this.Rn && o instanceof Node && (o.Rn = true), o.Rn && o instanceof Node && (o.de = null));
      const r = this.diagram;
      if (r !== null && r.undoManager.isUndoingRedoing) return;
      (n !== -1 && o.raiseChangedEvent(4, "elements", this, i, null, n, null),
        o.raiseChangedEvent(3, "elements", this, null, i, null, t));
    }
  }
  get Rn() {
    return (this.l & 8388608) !== 0;
  }
  set Rn(t) {
    ((this.l & 8388608) !== 0) !== t && (this.l = this.l ^ 8388608);
  }
  DN() {
    return (this.l & 16777216) !== 0;
  }
  eC(t) {
    t ? (this.l |= 16777216) : (this.l &= -16777217);
  }
  ZE(t) {
    (t.Ua(this), (t.al = null));
    const i = this.O,
      e = i.count;
    i.insertAt(e, t);
    const s = this.part;
    if (s !== null) {
      (s.np(), t.portId !== null && s instanceof Node && (s.Rn = true));
      const n = this.diagram;
      if (n !== null && n.undoManager.isUndoingRedoing) return;
      s.raiseChangedEvent(3, "elements", this, null, t, null, e);
    }
  }
  wE(t) {
    const i = this.O.h,
      e = i.length;
    let s = -1;
    for (let n = 0; n < e; n++)
      if (i[n] === t) {
        s = n;
        break;
      }
    return s;
  }
  remove(t) {
    Debug && U.s(t, GraphObject, Panel, "remove:element");
    const i = this.O.h,
      e = i.length;
    let s = -1;
    for (let n = 0; n < e; n++)
      if (i[n] === t) {
        s = n;
        break;
      }
    s !== -1 && this.ae(s, true);
  }
  removeAt(t) {
    (Debug && U.r(t, Panel, "removeAt:idx"), t >= 0 && this.ae(t, true));
  }
  ae(t, i) {
    const e = this.O,
      s = e.elt(t);
    if (((s.al = null), s.Ua(null), this.on !== null)) {
      const o = s.data;
      U.it(o) && this.on.delete(o);
    }
    (e.removeAt(t), this.ke(false), this.g(), this.ul === s && (this.ul = null), (this.ys = null));
    const n = this.part;
    if (n !== null) {
      (n.np(),
        n.Ec(),
        n.invalidateAdornments(),
        n instanceof Node && (s instanceof Panel ? s.walkVisualTreeFrom(s, (r, l) => n.zN(l, i)) : n.zN(s, i)));
      const o = this.diagram;
      if (o !== null && o.undoManager.isUndoingRedoing) return;
      n.raiseChangedEvent(4, "elements", this, s, null, t, null);
    }
  }
  get Xe() {
    return (this.B === null && (this.B = new TablePanelSettings()), this.B.Xe);
  }
  get rowCount() {
    return this.B === null ? 0 : this.Xe.length;
  }
  getRowDefinition(t) {
    (Debug && U.r(t, Panel, "getRowDefinition:idx"),
      t < 0 && U.G(t, ">= 0", Panel, "getRowDefinition:idx"),
      (t = Math.round(t)));
    const i = this.Xe;
    if (i[t] === void 0) {
      const e = new RowColumnDefinition();
      (e.Ua(this),
        (e.isRow = true),
        (e.index = t),
        (i[t] = e),
        this.raiseChangedEvent(3, "rowdefs", this, null, e, null, t));
    }
    return i[t];
  }
  removeRowDefinition(t) {
    if (
      (Debug && U.r(t, Panel, "removeRowDefinition:idx"),
      t < 0 && U.G(t, ">= 0", Panel, "removeRowDefinition:idx"),
      this.rowCount === 0)
    )
      return;
    t = Math.round(t);
    const i = this.Xe,
      e = i[t];
    if (e) {
      i[t] = void 0;
      let s = i.length - 1;
      for (; s >= 0 && i[s--] === void 0; ) i.length--;
      (this.raiseChangedEvent(4, "rowdefs", this, e, null, t, null), this.g());
    }
  }
  ML(t, i) {
    const e = this.Xe;
    if (!(t < 0)) {
      if (((e[t] = i instanceof RowColumnDefinition ? i : void 0), !i)) {
        let s = e.length - 1;
        for (; s >= 0 && e[s--] === void 0; ) e.length--;
      }
      this.g();
    }
  }
  get Ye() {
    return (this.B === null && (this.B = new TablePanelSettings()), this.B.Ye);
  }
  get columnCount() {
    return this.B === null ? 0 : this.Ye.length;
  }
  getColumnDefinition(t) {
    (Debug && U.r(t, Panel, "getColumnDefinition:idx"),
      t < 0 && U.G(t, ">= 0", Panel, "getColumnDefinition:idx"),
      (t = Math.round(t)));
    const i = this.Ye;
    if (i[t] === void 0) {
      const e = new RowColumnDefinition();
      (e.Ua(this),
        (e.isRow = false),
        (e.index = t),
        (i[t] = e),
        this.raiseChangedEvent(3, "coldefs", this, null, e, null, t));
    }
    return i[t];
  }
  removeColumnDefinition(t) {
    if (
      (Debug && U.r(t, Panel, "removeColumnDefinition:idx"),
      t < 0 && U.G(t, ">= 0", Panel, "removeColumnDefinition:idx"),
      this.columnCount === 0)
    )
      return;
    t = Math.round(t);
    const i = this.Ye,
      e = i[t];
    if (e) {
      i[t] = void 0;
      let s = i.length - 1;
      for (; s >= 0 && i[s--] === void 0; ) i.length--;
      (this.raiseChangedEvent(4, "coldefs", this, e, null, t, null), this.g());
    }
  }
  NL(t, i) {
    const e = this.Ye;
    if (!(t < 0)) {
      if (((e[t] = i instanceof RowColumnDefinition ? i : void 0), !i)) {
        let s = e.length - 1;
        for (; s >= 0 && e[s--] === void 0; ) e.length--;
      }
      this.g();
    }
  }
  addRowColumnDefinition(t) {
    let i = null;
    return (
      t.isRow ? (i = this.getRowDefinition(t.index)) : t.isRow || (i = this.getColumnDefinition(t.index)),
      i && i.Hb(t),
      this
    );
  }
  addRowDefinition(t, i) {
    const e = this.getRowDefinition(t);
    return (e && e.Hb(new RowColumnDefinition(i)), this);
  }
  addColumnDefinition(t, i) {
    const e = this.getColumnDefinition(t);
    return (e && e.Hb(new RowColumnDefinition(i)), this);
  }
  get rowSizing() {
    return this.B !== null ? this.B.Xp : 3;
  }
  set rowSizing(t) {
    const i = this.rowSizing;
    i !== t &&
      (Debug && t !== 3 && t !== 2 && U.n("Panel.rowSizing must be ProportionalExtra or None, not: " + t),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Xp = t),
      this.g(),
      this.t("rowSizing", i, t));
  }
  get columnSizing() {
    return this.B !== null ? this.B.Yp : 3;
  }
  set columnSizing(t) {
    const i = this.columnSizing;
    i !== t &&
      (Debug && t !== 3 && t !== 2 && U.n("Panel.columnSizing must be ProportionalExtra or None, not: " + t),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Yp = t),
      this.g(),
      this.t("columnSizing", i, t));
  }
  get topIndex() {
    return this.B !== null ? this.B.Kp : 0;
  }
  set topIndex(t) {
    const i = this.topIndex;
    i !== t &&
      ((!isFinite(t) || t < 0) && U.n("Panel.topIndex must be greater than zero and a real number, not: " + t),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Kp = t),
      this.g(),
      this.t("topIndex", i, t));
  }
  get leftIndex() {
    return this.B !== null ? this.B.Up : 0;
  }
  set leftIndex(t) {
    const i = this.leftIndex;
    i !== t &&
      ((!isFinite(t) || t < 0) && U.n("Panel.leftIndex must be greater than zero and a real number, not: " + t),
      this.B === null && (this.B = new TablePanelSettings()),
      (this.B.Up = t),
      this.g(),
      this.t("leftIndex", i, t));
  }
  findRowForLocalY(t) {
    if (t < 0 || this.type !== Panel.Table || this.rowCount === 0) return -1;
    let i = 0;
    const e = this.Xe,
      s = e.length;
    let n = this.topIndex;
    for (; n < s; n++) {
      const o = e[n];
      if (o !== void 0 && ((i += o.total), t < i)) return n;
    }
    return n;
  }
  findColumnForLocalX(t) {
    if (t < 0 || this.type !== Panel.Table || this.columnCount === 0) return -1;
    let i = 0;
    const e = this.Ye,
      s = e.length;
    let n = this.leftIndex;
    for (; n < s; n++) {
      const o = e[n];
      if (o !== void 0 && ((i += o.total), t < i)) return n;
    }
    return n;
  }
  graduatedPointForValue(t, i) {
    if ((i === void 0 && (i = new Point(NaN, NaN)), this.type !== Panel.Graduated)) return (i.e(NaN, NaN), i);
    t = Math.min(Math.max(t, this.graduatedMin), this.graduatedMax);
    const e = this.findMainElement();
    return (e.geometry.getPointAlongPath((t - this.graduatedMin) / this.graduatedRange, i), e.E.St(i));
  }
  graduatedValueForPoint(t) {
    if (this.type !== Panel.Graduated) return NaN;
    const i = this.findMainElement();
    return (i.E.De(t), i.geometry.getFractionForPoint(t) * this.graduatedRange + this.graduatedMin);
  }
  get data() {
    return this.oi;
  }
  set data(t) {
    const i = this.oi;
    if (i !== t) {
      const e = this instanceof Part && !(this instanceof Adornment);
      (e && U.i(t, "object", Panel, "data"), this.Yt(), (this.oi = t));
      const s = this.diagram;
      if (s !== null)
        if (e) {
          s.partManager.t3(this, i, t);
          let n = this.adornments;
          for (; n.next(); ) {
            const o = n.value,
              r = o.adornedObject;
            if (r !== null) {
              const l = r.findBindingPanel();
              l !== null && (o.data = l.data);
            }
          }
        } else {
          const n = this.panel;
          n !== null && n.on !== null && (i !== null && n.on.delete(i), t !== null && n.on.set(t, this));
        }
      if ((this.t("data", i, t), s !== null && s.undoManager.isUndoingRedoing)) return;
      t !== null && this.updateTargetBindings();
    }
  }
  get itemIndex() {
    return this.zd;
  }
  set itemIndex(t) {
    const i = this.zd;
    i !== t && (Debug && U.i(t, "number", Panel, "itemIndex"), (this.zd = t), this.t("itemIndex", i, t));
  }
  get Os() {
    return this.S !== null ? this.S.Os : null;
  }
  set Os(t) {
    this.Vi !== t && (this.S === null && (this.S = new GraphObjectTemplateSettings()), (this.S.Os = t));
  }
  XN() {
    return this.Os !== null;
  }
  cD() {
    const t = this.Os;
    return t !== null && t.p;
  }
  freezeBindings() {
    return this.Yt();
  }
  Yt() {
    let t = this.Os;
    if (t === null)
      (this.data !== null && U.n("Template cannot have .data be non-null: " + this), (this.Os = t = new List()));
    else if (t.p) return this;
    const i = new List();
    (this.eC(false),
      this.walkVisualTreeFrom(this, (n, o) => {
        o.Ch();
        const r = o.Vi;
        if (r !== null) {
          o.EN(false);
          const l = r.iterator;
          for (; l.next(); ) {
            const h = l.value;
            h.mode === 2 && o.EN(true);
            const a = h.sourceName;
            if (h.isToObject) {
              a === "/" && n.eC(true);
              const f = h.iD(n, o);
              f !== null && (i.add(f), f.ao === null && (f.ao = new List()), f.ao.add(h));
            }
            t.add(h);
          }
        }
        if (o instanceof Panel && o.type === Panel.Table) {
          if (o.rowCount > 0) {
            const l = o.Xe,
              h = l.length;
            for (let a = 0; a < h; a++) {
              const f = l[a];
              if (f !== void 0 && f.Vs !== null) {
                const c = f.Vs.iterator;
                for (; c.next(); ) {
                  const u = c.value;
                  ((u.Re = f), (u.Kd = 2), (u.Vc = f.index), t.add(u));
                }
              }
            }
          }
          if (o.columnCount > 0) {
            const l = o.Ye,
              h = l.length;
            for (let a = 0; a < h; a++) {
              const f = l[a];
              if (f !== void 0 && f.Vs !== null) {
                const c = f.Vs.iterator;
                for (; c.next(); ) {
                  const u = c.value;
                  ((u.Re = f), (u.Kd = 1), (u.Vc = f.index), t.add(u));
                }
              }
            }
          }
        }
      }));
    const e = i.iterator;
    for (; e.next(); ) {
      const n = e.value;
      if (n.ao !== null) {
        n.EN(true);
        const o = n.ao.iterator;
        for (; o.next(); ) {
          const r = o.value;
          (n.Vi === null && (n.Vi = new List()), n.Vi.add(r));
        }
      }
      n.ao = null;
    }
    let s = t.iterator;
    for (; s.next(); ) {
      const n = s.value;
      let o = n.Re;
      if (o !== null) {
        n.Re = null;
        const r = n.targetProperty,
          l = r.indexOf(".");
        if (l > 0 && o instanceof Panel) {
          const h = r.substring(0, l),
            a = r.substring(l + 1),
            f = o.findObject(h);
          f !== null
            ? ((o = f), (n.targetProperty = a))
            : (U.ot('Warning: unable to find GraphObject named "' + h + '" for Binding: ' + n.toString()), (o = null));
        }
        if (o instanceof RowColumnDefinition) {
          const h = GSet.Ps(o.panel);
          ((n.targetId = h === void 0 ? -1 : h), (o.panel.ho = n.targetId));
        } else if (o instanceof GraphObject) {
          const h = GSet.Ps(o);
          ((n.targetId = h === void 0 ? -1 : h), (o.ho = n.targetId));
        } else U.n("Unknown type of binding target: " + o);
        n.check(o);
      }
    }
    return (
      t.k(),
      this instanceof Part &&
        (this.Oe() && this.ensureBounds(),
        Debug &&
          !Panel.ND &&
          this.walkVisualTreeFrom(this, (n, o) => {
            if (
              o instanceof Panel &&
              (o.type === Panel.Auto || o.type === Panel.Spot || o.type === Panel.Graduated) &&
              o.elements.count <= 1 &&
              !(o instanceof Part)
            ) {
              let r = false;
              if (o.elements.count === 1 && ((r = o.itemArray !== null), !r)) {
                for (s = t.iterator; s.next(); )
                  if (s.value.targetProperty === "itemArray") {
                    r = true;
                    break;
                  }
              }
              r ||
                (U.ot(
                  "Auto, Spot, or Graduated Panel should not have zero or one elements: " +
                    o.toString() +
                    " in " +
                    n.toString(),
                ),
                (Panel.ND = true));
            }
          })),
      this
    );
  }
  static ND = false;
  copyTemplate(t) {
    t === void 0 && (t = false);
    const i = this.copy();
    return (
      i.QE((e) => {
        e instanceof Panel && ((e.Os = null), (e.oi = null));
        const s = e.Vi;
        s !== null && ((e.Vi = null), s.each((o) => e.bind(o.copy())));
        const n = e.Rs;
        n !== null && ((e.Rs = null), n.each((o) => e.trigger(o.value.copy())));
      }),
      t && i.Yt(),
      i
    );
  }
  updateTargetBindings(t) {
    const i = this.Os;
    if (i === null) return;
    t === void 0 && (t = "");
    const e = this.diagram?.model,
      s = i.iterator;
    for (; s.next(); ) {
      const n = s.value,
        o = this.sC(n, t);
      if (o === null) continue;
      const { data: r, elt: l } = o;
      (n.isToTheme && this.diagram === null) || (l !== void 0 && n.updateTarget(l, r, void 0, e));
    }
  }
  i3(t) {
    if (t === "") {
      this.updateTargetBindings(t);
      return;
    }
    const i = this.Os;
    if (i === null) return;
    const e = this.diagram?.model,
      s = i.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (n.isToData && n.sourceProperty !== "") continue;
      const o = this.sC(n, "");
      if (o === null) continue;
      const { data: r, elt: l } = o;
      l !== void 0 && n.updateTarget(l, r, void 0, e);
    }
  }
  Wo() {
    if (this.diagram !== null)
      if (this.XN()) {
        const t = this.diagram.model,
          i = this.Os.iterator;
        for (; i.next(); ) {
          const e = i.value;
          if (!e.isToTheme) continue;
          const s = this.sC(e);
          if (s === null) continue;
          const { data: n, elt: o } = s;
          o !== void 0 && e.updateTarget(o, n, void 0, t);
        }
      } else {
        const t = this.O.h,
          i = t.length;
        for (let e = 0; e < i; e++) t[e].Wo();
      }
  }
  sC(t, i = "") {
    const e = t.sourceProperty;
    if (i !== "" && e !== "" && e !== i) return null;
    const s = t.targetProperty;
    if (t.converter === null && s === "") return null;
    let o = this.data;
    const r = t.sourceName;
    if (t.isToObject) {
      if (((o = this.tD(r)), o === null)) return null;
    } else if (t.isToModel) {
      const f = this.diagram;
      if (f === null) return null;
      o = f.model.modelData;
    }
    let l = this;
    const h = t.targetId;
    if (h !== -1) {
      if (((l = this.q0(h)), l === null)) return null;
    } else t.Re !== null && (l = t.Re);
    r === "/" ? (o = l.part) : r === "." ? (o = l) : r === ".." && (o = l.panel);
    const a = t.Kd;
    if (a !== 0) {
      if (!(l instanceof Panel)) return null;
      a === 1 ? (l = l.getColumnDefinition(t.Vc)) : a === 2 && (l = l.getRowDefinition(t.Vc));
    }
    return { data: o, elt: l };
  }
  get itemArray() {
    return this.Eh;
  }
  set itemArray(t) {
    Debug && t !== null && !Array.isArray(t) && U.n("Panel.itemArray must be an Array-like object or null, not: " + t);
    const i = this.Eh;
    if (i !== t || (t !== null && this.e3(t))) {
      const e = this.diagram;
      if (
        (i !== t &&
          (e !== null && i !== null && e.partManager.I2(this, e),
          (this.Eh = t),
          e !== null && t !== null && e.partManager.F2(this, e)),
        this.t("itemArray", i, t),
        e !== null && e.undoManager.isUndoingRedoing)
      )
        return;
      this.CD(i, t);
    }
  }
  findItemPanelForData(t) {
    return t == null || this.on === null ? null : (U.Ro(t, Panel, "findItemPanelForData"), this.on.get(t));
  }
  e3(t) {
    const i = this.O.h,
      e = i.length,
      s = t.length;
    let n = 0,
      o = null;
    for (; n < e && ((o = i[n]), !(o instanceof Panel) || o.data === null); ) (n++, (o = i[n]));
    if (e - n !== s) return true;
    if (o === null) return s > 0;
    let r = 0;
    for (; n < e && r < s; ) {
      if (((o = i[n]), !(o instanceof Panel) || o.data !== t[r])) return true;
      (n++, r++);
    }
    return false;
  }
  zp() {
    if (this.type === Panel.Spot || this.type === Panel.Auto) return Math.min(this.O.length, 1);
    if (this.type === Panel.Link) {
      const t = this.O,
        i = t.length;
      let e = 0;
      for (; e < i; e++) {
        const s = t.elt(e);
        if (!(s instanceof Shape) || !s.isPanelMain) return e;
      }
      return e;
    }
    if (this.type === Panel.Table && this.O.length > 0) {
      const i = this.O.elt(0);
      if (i.isPanelMain && i instanceof Panel && i.fl()) return 1;
    }
    return 0;
  }
  rebuildItemElements() {
    const t = this.zp();
    for (; this.O.length > t; ) this.ae(this.O.length - 1, false);
    this.CD(null, this.itemArray);
  }
  CD(t, i) {
    const e = this.zp(),
      s = i;
    if (s === null || s.length === 0) {
      for (; this.O.length > e; ) this.ae(this.O.length - 1, false);
      return;
    }
    if (this.O.length <= e) {
      const n = s.length;
      for (let o = 0; o < n; o++) this.eS(s[o], o, true);
    } else {
      let n = e;
      for (let r = 0; r < s.length; r++, n++) {
        const l = s[r],
          h = n < this.O.length ? this.O.elt(n) : null;
        if (h instanceof Panel) {
          if (h.data !== l) {
            const a = this.nC(h.data, r),
              f = this.nC(l, r);
            let c = f !== a;
            if (!c) {
              const u = this.oC(h.data, r, a);
              c = this.oC(l, r, f) !== u;
            }
            c ? (this.ae(n, false), this.eS(l, r, false)) : (h.data = l);
          }
        } else this.eS(l, r, false);
      }
      for (; n < this.O.length; ) this.ae(n, false);
      ((this.ul = null),
        this.rC(e, 0),
        this.vo() || this.g(),
        (this.ys = null),
        this.isEnabledObject() || this.iS(this, false));
      const o = this.part;
      o !== null &&
        (o.np(), o.Ec(), this.Rn && o instanceof Node && (o.Rn = true), o.Rn && o instanceof Node && (o.de = null));
    }
  }
  eS(t, i, e) {
    if (t == null || i < 0) return;
    const s = this.nC(t, i),
      n = this.oC(t, i, s);
    if (n !== null) {
      n.Yt();
      const o = n.copy();
      if (o.DN()) {
        const l = this.findBindingPanel();
        l !== null && l.eC(true);
      }
      U.it(t) && (this.on === null && (this.on = new GMap()), this.on.set(t, o));
      const r = i + this.zp();
      (this.insertAt(r, o), e && ((o.oi = t), this.rC(r, i), (o.oi = null)), (o.data = t));
    }
  }
  s3(t) {
    if (t < 0) return;
    const i = t + this.zp();
    (this.ae(i, true), this.rC(i, t));
  }
  rC(t, i) {
    const e = this.O;
    let s = t,
      n = i;
    for (; s < e.length; ) {
      const o = e.elt(s);
      (o instanceof Panel && o.o3(s, n), s++, n++);
    }
  }
  o3(t, i) {
    (this.type === Panel.TableRow ? (this.row = t) : this.type === Panel.TableColumn && (this.column = t),
      (this.itemIndex = i));
  }
  get itemTemplate() {
    const t = this.itemTemplateMap;
    if (t !== null) {
      const i = t.get("");
      if (i) return i;
    }
    return Panel.AD();
  }
  set itemTemplate(t) {
    const i = this.itemTemplate;
    if (i !== t) {
      (U.s(t, Panel, Panel, "itemTemplate"),
        (t instanceof Part || t.isPanelMain) &&
          U.n("Panel.itemTemplate must not be a Part or be Panel.isPanelMain: " + t),
        this.itemTemplateMap === null && (this.itemTemplateMap = new GMap()),
        this.itemTemplateMap.set("", t),
        this.t("itemTemplate", i, t));
      const e = this.diagram;
      if (e !== null && e.undoManager.isUndoingRedoing) return;
      this.rebuildItemElements();
    }
  }
  get itemTemplateMap() {
    return this.S !== null ? this.S.bp : null;
  }
  set itemTemplateMap(t) {
    const i = this.itemTemplateMap;
    if (i !== t) {
      U.s(t, GMap, Panel, "itemTemplateMap");
      const e = t.iterator;
      for (; e.next(); ) {
        const n = e.value;
        Debug &&
          (n instanceof Part || n.isPanelMain) &&
          U.n("Template in Panel.itemTemplateMap must not be a Part or be Panel.isPanelMain: " + n);
      }
      ((this.jt().bp = t), this.t("itemTemplateMap", i, t));
      const s = this.diagram;
      if (s !== null && s.undoManager.isUndoingRedoing) return;
      this.rebuildItemElements();
    }
  }
  get itemCategoryProperty() {
    return this.S !== null ? this.S.Sp : "category";
  }
  set itemCategoryProperty(t) {
    const i = this.itemCategoryProperty;
    i !== t &&
      (typeof t != "string" && !U.lt(t) && U.Li(t, "string or function", Panel, "itemCategoryProperty"),
      (this.jt().Sp = t),
      this.t("itemCategoryProperty", i, t));
  }
  nC(t, i) {
    if (t === null) return "";
    const e = this.itemCategoryProperty;
    let s = "";
    if (U.lt(e)) s = e(t);
    else if (typeof e == "string" && U.it(t)) {
      if (e === "") return "";
      const n = this.diagram,
        o = n !== null ? n.model : null;
      o ? (s = o.It(t, e)) : (s = Model.It(t, e));
    } else return "";
    if (s === void 0) return "";
    if (typeof s == "string") return s;
    U.n("Panel.getCategoryForItemData found a non-string category for " + t + ": " + s);
  }
  static TD = false;
  static lC;
  static AD() {
    return (
      Panel.lC || (Panel.lC = new Panel().add(new TextBlock().bind("text", "", U.toString).theme("stroke", "text"))),
      Panel.lC
    );
  }
  oC(t, i, e) {
    let s = null;
    const n = this.itemTemplateMap;
    return (
      n !== null && ((s = n.get(e)), s === null && (s = n.get(""))),
      s === null &&
        (Panel.TD ||
          ((Panel.TD = true),
          U.ot('No item template Panel found for category "' + e + '" on ' + this),
          U.ot("  Using default item template.")),
        (s = Panel.AD())),
      s
    );
  }
  get Oc() {
    return (this.l & 1048576) !== 0;
  }
  set Oc(t) {
    const i = (this.l & 1048576) !== 0;
    i !== t && (U.i(t, "boolean", Panel, "isAtomic"), (this.l = this.l ^ 1048576), this.t("isAtomic", i, t));
  }
  get isClipping() {
    return (this.l & 2097152) !== 0;
  }
  set isClipping(t) {
    const i = (this.l & 2097152) !== 0;
    i !== t &&
      (this.Mc(),
      Debug &&
        (U.i(t, "boolean", Panel, "isClipping"),
        t &&
          this.type !== Panel.Spot &&
          !(this instanceof Group) &&
          U.ot("Warning: Panel.isClipping set on non-Spot Panel: " + this.toString())),
      (this.l = this.l ^ 2097152),
      this instanceof Group && (this.ui = null),
      this.g(),
      this.t("isClipping", i, t));
  }
  get isOpposite() {
    return (this.l & 33554432) !== 0;
  }
  set isOpposite(t) {
    const i = (this.l & 33554432) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Panel, "isOpposite"),
      (this.l = this.l ^ 33554432),
      this.g(),
      this.t("isOpposite", i, t));
  }
  get isEnabled() {
    return (this.l & 4194304) !== 0;
  }
  set isEnabled(t) {
    const i = (this.l & 4194304) !== 0;
    if (i !== t) {
      Debug && U.i(t, "boolean", Panel, "isEnabled");
      const e = this.panel === null || this.panel.isEnabledObject();
      ((this.l = this.l ^ 4194304), this.t("isEnabled", i, t));
      const s = this.diagram;
      if (s !== null && s.undoManager.isUndoingRedoing) return;
      e && this.iS(this, t);
    }
  }
  iS(t, i) {
    const e = t.enabledChanged;
    if ((e !== null && e(t, i), t instanceof Panel)) {
      const s = t.O.h,
        n = s.length;
      for (let o = 0; o < n; o++) {
        const r = s[o];
        (i && r instanceof Panel && !r.isEnabled) || this.iS(r, i);
      }
    }
  }
  get alignmentFocusName() {
    return this.po;
  }
  set alignmentFocusName(t) {
    const i = this.po;
    i !== t &&
      (Debug && U.i(t, "string", Panel, "alignmentFocusName"),
      (this.po = t),
      this.g(),
      this.t("alignmentFocusName", i, t));
  }
  static definePanelLayout(t, i) {
    PanelLayout.En(t, i);
  }
  static isLayoutDefined(t) {
    return PanelLayout.ms.has(t);
  }
  static Position = PanelLayout.ms.get("Position");
  static Horizontal = PanelLayout.ms.get("Horizontal");
  static Vertical = PanelLayout.ms.get("Vertical");
  static Spot = PanelLayout.ms.get("Spot");
  static Auto = PanelLayout.ms.get("Auto");
  static Table = PanelLayout.ms.get("Table");
  static Viewbox = PanelLayout.ms.get("Viewbox");
  static TableRow = PanelLayout.ms.get("TableRow");
  static TableColumn = PanelLayout.ms.get("TableColumn");
  static Link = PanelLayout.ms.get("Link");
  static Grid = PanelLayout.ms.get("Grid");
  static Graduated = PanelLayout.ms.get("Graduated");
}
Panel.definePanelLayout = Panel.definePanelLayout;
