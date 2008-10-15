class Layer {
  f;
  At;
  ei;
  Vr;
  Jl;
  $l;
  Zl;
  Ql;
  _l;
  th;
  ih;
  eh;
  nh;
  oh;
  lh;
  hh;
  qf;
  ah;
  u1;
  Zm;
  Qu;
  Dt;
  constructor(t) {
    (GSet._i(this),
      (this.f = null),
      (this.Dt = new List()),
      (this.At = ""),
      (this.ei = 1),
      (this.Vr = false),
      (this.Jl = true),
      (this.$l = true),
      (this.Zl = true),
      (this.Ql = true),
      (this._l = true),
      (this.th = true),
      (this.ih = true),
      (this.eh = true),
      (this.nh = true),
      (this.oh = true),
      (this.lh = true),
      (this.hh = true),
      (this.qf = true),
      (this.ah = true),
      (this.u1 = true),
      (this.Zm = false),
      (this.Qu = []),
      t && Object.assign(this, t));
  }
  GR() {
    const t = this.Dt;
    for (let i = 0; i < t.length; i++) t.h[i].XM(null);
    (t.clear(), (this.Qu.length = 0));
  }
  Yo(t) {
    this.f = t;
  }
  toString(t) {
    t === void 0 && (t = 0);
    const i = 'Layer "' + this.name + '"';
    if (t <= 0) return i;
    let e = 0,
      s = 0,
      n = 0,
      o = 0,
      r = 0;
    const l = this.Dt.iterator;
    for (; l.next(); ) {
      const a = l.value;
      a instanceof Group ? n++ : a instanceof Node ? s++ : a instanceof Link ? o++ : a instanceof Adornment ? r++ : e++;
    }
    let h = "";
    if (
      (e > 0 && (h += e + " Parts "),
      s > 0 && (h += s + " Nodes "),
      n > 0 && (h += n + " Groups "),
      o > 0 && (h += o + " Links "),
      r > 0 && (h += r + " Adornments "),
      t > 1)
    ) {
      const a = this.Dt.iterator;
      for (; a.next(); ) {
        const f = a.value;
        h +=
          `
    ` + f.toString();
        const c = f.data;
        (c !== null && GSet.Ps(c) && (h += " #" + GSet.Ps(c)),
          f instanceof Node
            ? (h += " " + U.toString(c))
            : f instanceof Link && (h += " " + U.toString(f.fromNode) + " " + U.toString(f.toNode)));
      }
    }
    return i + " " + this.Dt.count + ": " + h;
  }
  findObjectAt(t, i, e) {
    if ((i === void 0 && (i = null), e === void 0 && (e = null), this.ah === false)) return null;
    Debug && !t.isReal() && U.n("findObjectAt: Point must have a real value, not: " + t.toString());
    let s = false;
    this.diagram !== null && this.diagram.viewportBounds.containsPoint(t) && (s = true);
    const n = Point.a(),
      o = this.Dt.h,
      r = o.length;
    for (let l = r; l--; ) {
      const h = o[l];
      if ((s === true && h.Gl() === false) || !h.isVisible()) continue;
      (n.c(t), n.Je(h._s));
      let a = h.qT(n, i, e);
      if (a !== null && (i !== null && (a = i(a)), a !== null && (e === null || e(a)))) return (Point.o(n), a);
    }
    return (Point.o(n), null);
  }
  findObjectsAt(t, i, e, s) {
    if (
      (i === void 0 && (i = null),
      e === void 0 && (e = null),
      !(s instanceof List) && !(s instanceof GSet) && (s = new GSet()),
      this.ah === false)
    )
      return s;
    Debug && !t.isReal() && U.n("findObjectsAt: Point must have a real value, not: " + t.toString());
    let n = false;
    this.diagram !== null && this.diagram.viewportBounds.containsPoint(t) && (n = true);
    const o = Point.a(),
      r = this.Dt.h,
      l = r.length;
    for (let h = l; h--; ) {
      const a = r[h];
      if ((n === true && a.Gl() === false) || !a.isVisible()) continue;
      (o.c(t), o.Je(a._s));
      let f = a;
      a.HT(o, i, e, s) && (i !== null && (f = i(f)), f !== null && (e === null || e(f)) && s.add(f));
    }
    return (Point.o(o), s);
  }
  findObjectsIn(t, i, e, s, n) {
    if (
      (i === void 0 && (i = null),
      e === void 0 && (e = null),
      s === void 0 && (s = false),
      !(n instanceof List) && !(n instanceof GSet) && (n = new GSet()),
      this.ah === false)
    )
      return n;
    Debug && !t.isReal() && U.n("findObjectsIn: Rect must have a real value, not: " + t.toString());
    let o = false;
    this.diagram !== null && this.diagram.viewportBounds.containsRect(t) && (o = true);
    const r = this.Dt.h,
      l = r.length;
    for (let h = l; h--; ) {
      const a = r[h];
      if ((o === true && a.Gl() === false) || !a.isVisible()) continue;
      let f = a;
      a.Qm(t, i, e, s, n) && (i !== null && (f = i(f)), f !== null && (e === null || e(f)) && n.add(f));
    }
    return n;
  }
  AP(t, i, e, s, n, o, r) {
    if (this.ah === false) return n;
    const l = this.Dt.h,
      h = l.length;
    for (let a = h; a--; ) {
      const f = l[a];
      if ((r === true && f.Gl() === false) || !o(f) || !f.isVisible()) continue;
      let c = f;
      f.Qm(t, i, e, s, n) && (i !== null && (c = i(c)), c !== null && (e === null || e(c)) && n.add(c));
    }
    return n;
  }
  findObjectsNear(t, i, e, s, n, o) {
    if (
      (e === void 0 && (e = null),
      s === void 0 && (s = null),
      n === void 0 && (n = true),
      n !== false && n !== true && ((n instanceof List || n instanceof GSet) && (o = n), (n = true)),
      !(o instanceof List) && !(o instanceof GSet) && (o = new GSet()),
      this.ah === false)
    )
      return o;
    Debug && !t.isReal() && U.n("findObjectsNear: Point must have a real value, not: " + t.toString());
    let r = false;
    this.diagram !== null && this.diagram.viewportBounds.containsPoint(t) && (r = true);
    const l = Point.a(),
      h = Point.a(),
      a = this.Dt.h,
      f = a.length;
    for (let c = f; c--; ) {
      const u = a[c];
      if ((r === true && u.Gl() === false) || !u.isVisible()) continue;
      (l.c(t), l.Je(u._s), h.e(t.x + i, t.y), h.Je(u._s));
      let d = u;
      u.vT(l, h, e, s, n, o) && (e !== null && (d = e(d)), d !== null && (s === null || s(d)) && o.add(d));
    }
    return (Point.o(l), Point.o(h), o);
  }
  YM() {
    return this.Dt.h;
  }
  fs(t, i) {
    if (!this.visible) return;
    const e = this.Dt.h,
      s = e.length;
    if (s === 0) return;
    const n = U.ht(),
      o = U.ht();
    for (let r = 0; r < s; r++) {
      const l = e[r];
      if (((l.KM = r), l instanceof Link)) {
        if (l.Ve === false) continue;
      } else if (l instanceof Adornment && l.adornedPart !== null) continue;
      const h = l.actualBounds;
      l.isVisible() && h.UA(i, 10)
        ? (l.fs(true), n.push(l))
        : (l.fs(false), l.adornments !== null && l.adornments.count > 0 && o.push(l));
    }
    for (let r = 0; r < n.length; r++) {
      const l = n[r];
      l.UM();
      const h = l.adornments;
      for (; h.next(); ) {
        const a = h.value;
        (a.gt(1 / 0, 1 / 0), a.Ut(), a.fs(true));
      }
    }
    for (let r = 0; r < o.length; r++) o[r].UM();
    (U.et(n), U.et(o));
  }
  _u(t) {
    let i = 1;
    return (this.ei !== 1 && ((i = t.globalAlpha), (t.globalAlpha = i * this.ei)), i);
  }
  WT(t, i) {
    for (let e = 0; e < i; e++) t[e].tc();
  }
  vi(t, i, e) {
    if (!this.visible || this.ei === 0 || (e === void 0 && (e = true), !e && this.isTemporary)) return;
    const s = this.Dt.h,
      n = s.length;
    if (n === 0) return;
    t.Vr && this.WT(s, n);
    const o = this._u(t),
      r = this.Qu;
    r.length = 0;
    const l = i.scale,
      h = Rect.a();
    for (let a = 0; a < n; a++) {
      const f = s[a];
      this._m(t, f, i, r, l, h, true);
    }
    (Rect.o(h), t.Vr && this.WT(s, n), (t.globalAlpha = o));
  }
  VV(t, i, e) {
    if (!this.visible || this.ei === 0) return;
    const s = this.Dt.h,
      n = s.length;
    if (n === 0) return;
    const o = this._u(t),
      r = this.Qu;
    r.length = 0;
    const l = i.scale,
      h = Rect.a();
    for (let a = 0; a < n; a++) {
      const f = s[a];
      e.has(f) || this._m(t, f, i, r, l, h, true);
    }
    (Rect.o(h), (t.globalAlpha = o));
  }
  qR(t, i, e, s) {
    if (!this.visible || this.ei === 0 || (!s && this.isTemporary)) return;
    const n = this.Dt.h,
      o = n.length;
    if (o === 0) return;
    const r = this._u(t),
      l = this.Qu;
    l.length = 0;
    const h = i.scale,
      a = Rect.a();
    for (let f = 0; f < o; f++) {
      const c = n[f];
      e.has(c) && this._m(t, c, i, l, h, a, false);
    }
    (Rect.o(a), (t.globalAlpha = r));
  }
  HR(t, i, e, s, n) {
    if (!this.visible || this.opacity === 0) return;
    const o = this.diagram.grid.part;
    if (!s && this.isTemporary) {
      if (n && o.layer === this) {
        const r = this._u(t);
        (o.vi(t, e), (t.globalAlpha = r));
      }
    } else {
      const r = this._u(t),
        l = e.scale,
        h = Rect.a(),
        a = this.Dt.h,
        f = a.length;
      for (let c = 0; c < f; c++) {
        const u = a[c];
        (!n && u === o) || this._m(t, u, e, null, l, h, false);
      }
      (Rect.o(h), (t.globalAlpha = r));
    }
  }
  BV(t, i, e) {
    if (!this.visible || this.ei === 0) return;
    const s = this._u(t),
      n = this.Qu;
    n.length = 0;
    const o = i.scale,
      r = Rect.a(),
      l = this.Dt.h,
      h = l.length,
      a = e.length;
    for (let f = 0; f < h; f++) {
      const c = l[f],
        u = c.ga(c.actualBounds);
      this.vR(u, e, a, o) && this._m(t, c, i, n, o, r, true);
    }
    (Rect.o(r), (t.globalAlpha = s));
  }
  _m(t, i, e, s, n, o, r) {
    if (r && !i.Gl()) {
      t.removePartFromView(i);
      return;
    }
    if (s !== null && i instanceof Link && (i.isOrthogonal && s.push(i), i.Ve === false)) {
      t.removePartFromView(i);
      return;
    }
    let l = false,
      h = i.containingGroup;
    for (; h !== null; )
      (l ? h.ui !== null && o.intersectRect(h.ui) : h.ui !== null && ((l = true), o.c(h.ui)), (h = h.containingGroup));
    const a = i.actualBounds;
    let f = false;
    if (l && i.isVisible()) {
      if (!o.intersectsRect(a)) {
        t.removePartFromView(i);
        return;
      }
      f = !o.containsRect(a);
    }
    (f &&
      (t.save(),
      t instanceof SVGContext
        ? (t.partClipRect = o.copy())
        : (t.beginPath(), t.rect(o.x, o.y, o.width, o.height), t.clip())),
      a.width * n > e.t0 || a.height * n > e.t0 ? i.vi(t, e) : this.WR(t, i, e),
      f && (t.restore(), t.clearContextCache(true)));
  }
  WR(t, i, e) {
    if (t instanceof SVGContext) {
      i.vi(t, e);
      return;
    }
    const s = i.actualBounds,
      n = i.naturalBounds;
    if (s.width === 0 || s.height === 0 || isNaN(s.x) || isNaN(s.y) || !i.isVisible()) return;
    const o = i.E;
    if (i.background === null) {
      (i.Cn(t, "rgba(0,0,0,0.3)", true, false, n, s), t.fillRect(s.x, s.y, s.width, s.height));
      return;
    }
    if (
      (t.transform(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy),
      i.Cn(t, i.background, true, false, n, s),
      t.fillRect(0, 0, n.width / 2, n.height / 2),
      !o.Vk())
    ) {
      const r = 1 / (o.m11 * o.m22 - o.m12 * o.m21);
      t.transform(
        o.m22 * r,
        -o.m12 * r,
        -o.m21 * r,
        o.m11 * r,
        r * (o.m21 * o.dy - o.m22 * o.dx),
        r * (o.m12 * o.dx - o.m11 * o.dy),
      );
    }
  }
  vR(t, i, e, s) {
    const n = 2 / s,
      o = 4 / s;
    for (let r = 0; r < e; r++) {
      const l = i[r];
      if (!(l.width === 0 || l.height === 0) && t.intersects(l.x - n, l.y - n, l.width + o, l.height + o)) return true;
    }
    return false;
  }
  t(t, i, e, s, n) {
    const o = this.diagram;
    o !== null && o.raiseChangedEvent(2, t, this, i, e, s, n);
  }
  ma(t, i, e) {
    const s = this.Dt;
    if ((i.XM(this), t >= s.count)) t = s.count;
    else if (s.elt(t) === i) return -1;
    (s.insertAt(t, i), i.i0(e));
    const n = this.diagram;
    return (n !== null && (e ? n.L() : n.ma(i)), this.d1(t, i), t);
  }
  ae(t, i, e) {
    if (!e && i.layer !== this && i.layer !== null) return i.layer.ae(t, i, e);
    const s = this.Dt;
    if (t < 0 || t >= s.length) {
      if (((t = s.indexOf(i)), t < 0)) return -1;
    } else if (s.elt(t) !== i && ((t = s.indexOf(i)), t < 0)) return -1;
    (i.e0(e), s.removeAt(t));
    const n = this.diagram;
    return (n !== null && (e ? n.L() : n.ae(i)), i.XM(null), t);
  }
  d1(t, i) {
    ((t = this.jR(t, i)), i instanceof Group && this.JR(t, i), i.svg !== null && i.svg.remove());
  }
  jR(t, i) {
    const e = i.zOrder;
    if (isNaN(e)) return t;
    const s = this.Dt,
      n = s.count;
    if (n <= 1) return t;
    if ((t < 0 && (t = s.indexOf(i)), t < 0)) return -1;
    let o = t - 1,
      r = NaN;
    for (; o >= 0 && ((r = s.elt(o).zOrder), !!isNaN(r)); ) o--;
    let l = t + 1,
      h = NaN;
    for (; l < n && ((h = s.elt(l).zOrder), !!isNaN(h)); ) l++;
    if (!isNaN(r) && r > e)
      for (;;) {
        if (o === -1 || r <= e) return (o++, o === t ? t : (s.removeAt(t), s.insertAt(o, i), o));
        for (r = NaN; --o >= 0 && ((r = s.elt(o).zOrder), !!isNaN(r)); );
      }
    else if (!isNaN(h) && h < e)
      for (;;) {
        if (l === n || h >= e) return (l--, l === t ? t : (s.removeAt(t), s.insertAt(l, i), l));
        for (h = NaN; ++l < n && ((h = s.elt(l).zOrder), !!isNaN(h)); );
      }
    return t;
  }
  JR(t, i) {
    if (i === null || !isNaN(i.zOrder)) return;
    this.$R(t, i);
    const e = i.containingGroup;
    e !== null && this.d1(-1, e);
  }
  $R(t, i) {
    if (i.memberParts.count === 0) return;
    let e = -1;
    const s = this.Dt.h,
      n = s.length;
    for (let o = 0; o < n; o++) {
      const r = s[o];
      if ((r === i && ((t = o), e >= 0)) || (e < 0 && r.containingGroup === i && ((e = o), t >= 0))) break;
    }
    if (!(e < 0) && e < t) {
      const o = this.Dt;
      (o.removeAt(t), o.insertAt(e, i));
    }
  }
  get parts() {
    return this.Dt.iterator;
  }
  get partsBackwards() {
    return this.Dt.iteratorBackwards;
  }
  get diagram() {
    return this.f;
  }
  get name() {
    return this.At;
  }
  set name(t) {
    U.i(t, "string", Layer, "name");
    const i = this.At;
    if (i !== t) {
      const e = this.diagram;
      if (e !== null) {
        i === "" && U.n("Cannot rename default Layer to: " + t);
        const n = e.layers;
        for (; n.next(); ) n.value.name === t && U.n("Layer.name is already present in this diagram: " + t);
      }
      ((this.At = t), this.t("name", i, t));
      const s = this.Dt.iterator;
      for (; s.next(); ) {
        const n = s.value;
        n.layerName = this.At;
      }
    }
  }
  get opacity() {
    return this.ei;
  }
  set opacity(t) {
    const i = this.ei;
    if (i !== t) {
      (U.i(t, "number", Layer, "opacity"),
        (t < 0 || t > 1) && U.G(t, "0 <= value <= 1", Layer, "opacity"),
        (this.ei = t));
      const e = this.diagram;
      (e !== null && e.L(), this.t("opacity", i, t));
    }
  }
  get isViewportAligned() {
    return this.Zm;
  }
  set isViewportAligned(t) {
    const i = this.Zm;
    i !== t &&
      ((this.Zm = t),
      this.diagram && (this.jT(), this.diagram.L()),
      this.t("isViewportAligned", i, t),
      t && (this.isInDocumentBounds = false));
  }
  jT() {
    if (!this.Zm) return;
    const t = this.diagram;
    if (t === null) return;
    const i = this.Dt.h,
      e = i.length,
      s = t.Pt,
      n = t.Mt;
    for (let o = 0; o < e; o++) {
      const r = i[o],
        l = r.naturalBounds.width,
        h = r.naturalBounds.height;
      let a = r.alignment;
      (a.isDefault() || !a.isSpot()) && (a = Spot.BottomRight);
      let f = r.alignmentFocus;
      f.isDefault() && (f = new Spot(a.x, a.y));
      const c = a.x * s + a.offsetX - (f.x * l + f.offsetX),
        u = a.y * n + a.offsetY - (f.y * h + f.offsetY),
        d = Point.U(c, u);
      (t.ZR(d), r.Gf(d.x, d.y, true), Point.o(d), (r.rt = 1 / t.scale));
    }
  }
  get isTemporary() {
    return this.Vr;
  }
  set isTemporary(t) {
    const i = this.Vr;
    i !== t && (U.i(t, "boolean", Layer, "isTemporary"), (this.Vr = t), this.t("isTemporary", i, t));
  }
  get visible() {
    return this.qf;
  }
  set visible(t) {
    const i = this.qf;
    if (i !== t) {
      (U.i(t, "boolean", Layer, "visible"), (this.qf = t));
      const e = this.Dt.iterator;
      for (; e.next(); ) e.value.Hi(t);
      const s = this.diagram;
      (s !== null && s.L(), this.t("visible", i, t));
    }
  }
  get pickable() {
    return this.ah;
  }
  set pickable(t) {
    const i = this.ah;
    i !== t && (U.i(t, "boolean", Layer, "pickable"), (this.ah = t), this.t("pickable", i, t));
  }
  get isInDocumentBounds() {
    return this.u1;
  }
  set isInDocumentBounds(t) {
    const i = this.u1;
    i !== t &&
      ((this.u1 = t),
      this.diagram !== null && this.diagram.invalidateDocumentBounds(),
      this.t("isInDocumentBounds", i, t));
  }
  get allowCopy() {
    return this.Jl;
  }
  set allowCopy(t) {
    const i = this.Jl;
    i !== t && (U.i(t, "boolean", Layer, "allowCopy"), (this.Jl = t), this.t("allowCopy", i, t));
  }
  get allowDelete() {
    return this.$l;
  }
  set allowDelete(t) {
    const i = this.$l;
    i !== t && (U.i(t, "boolean", Layer, "allowDelete"), (this.$l = t), this.t("allowDelete", i, t));
  }
  get allowTextEdit() {
    return this.Zl;
  }
  set allowTextEdit(t) {
    const i = this.Zl;
    i !== t && (U.i(t, "boolean", Layer, "allowTextEdit"), (this.Zl = t), this.t("allowTextEdit", i, t));
  }
  get allowGroup() {
    return this.Ql;
  }
  set allowGroup(t) {
    const i = this.Ql;
    i !== t && (U.i(t, "boolean", Layer, "allowGroup"), (this.Ql = t), this.t("allowGroup", i, t));
  }
  get allowUngroup() {
    return this._l;
  }
  set allowUngroup(t) {
    const i = this._l;
    i !== t && (U.i(t, "boolean", Layer, "allowUngroup"), (this._l = t), this.t("allowUngroup", i, t));
  }
  get allowLink() {
    return this.th;
  }
  set allowLink(t) {
    const i = this.th;
    i !== t && (U.i(t, "boolean", Layer, "allowLink"), (this.th = t), this.t("allowLink", i, t));
  }
  get allowRelink() {
    return this.ih;
  }
  set allowRelink(t) {
    const i = this.ih;
    i !== t && (U.i(t, "boolean", Layer, "allowRelink"), (this.ih = t), this.t("allowRelink", i, t));
  }
  get allowMove() {
    return this.eh;
  }
  set allowMove(t) {
    const i = this.eh;
    i !== t && (U.i(t, "boolean", Layer, "allowMove"), (this.eh = t), this.t("allowMove", i, t));
  }
  get allowReshape() {
    return this.nh;
  }
  set allowReshape(t) {
    const i = this.nh;
    i !== t && (U.i(t, "boolean", Layer, "allowReshape"), (this.nh = t), this.t("allowReshape", i, t));
  }
  get allowResize() {
    return this.oh;
  }
  set allowResize(t) {
    const i = this.oh;
    i !== t && (U.i(t, "boolean", Layer, "allowResize"), (this.oh = t), this.t("allowResize", i, t));
  }
  get allowRotate() {
    return this.lh;
  }
  set allowRotate(t) {
    const i = this.lh;
    i !== t && (U.i(t, "boolean", Layer, "allowRotate"), (this.lh = t), this.t("allowRotate", i, t));
  }
  get allowSelect() {
    return this.hh;
  }
  set allowSelect(t) {
    const i = this.hh;
    i !== t && (U.i(t, "boolean", Layer, "allowSelect"), (this.hh = t), this.t("allowSelect", i, t));
  }
}
var AutoScale = ((w) => (
    (w[(w.None = 1)] = "None"),
    (w[(w.Uniform = 2)] = "Uniform"),
    (w[(w.UniformToFill = 3)] = "UniformToFill"),
    w
  ))(AutoScale || {}),
  CycleMode = ((w) => (
    (w[(w.All = 1)] = "All"),
    (w[(w.NotDirected = 2)] = "NotDirected"),
    (w[(w.NotDirectedFast = 3)] = "NotDirectedFast"),
    (w[(w.NotUndirected = 4)] = "NotUndirected"),
    (w[(w.DestinationTree = 5)] = "DestinationTree"),
    (w[(w.SourceTree = 6)] = "SourceTree"),
    w
  ))(CycleMode || {}),
  ScrollMode = ((w) => ((w[(w.Document = 1)] = "Document"), (w[(w.Infinite = 2)] = "Infinite"), w))(ScrollMode || {}),
  CollapsePolicy = ((w) => (
    (w[(w.TreeParent = 1)] = "TreeParent"),
    (w[(w.AllParents = 2)] = "AllParents"),
    (w[(w.AnyParents = 3)] = "AnyParents"),
    w
  ))(CollapsePolicy || {});
