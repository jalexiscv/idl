class Animation {
  i1;
  $m;
  Ri;
  ju;
  Xo;
  Fs;
  UT;
  Zf;
  be;
  e1;
  ci;
  so;
  Ju;
  Qf;
  s1;
  o1;
  jf;
  OM;
  l1;
  Ls;
  f;
  EM;
  VM;
  BM;
  constructor(t) {
    ((this.f = null),
      (this.Ls = null),
      (this.OM = null),
      (this.l1 = null),
      (this.EM = false),
      (this.Ri = false),
      (this.jf = false),
      (this.ci = 0),
      (this.so = 0),
      (this.i1 = Animation.EaseInOutQuad),
      (this.$m = Animation.EaseInOutQuad),
      (this.Ju = false),
      (this.Qf = false),
      (this.s1 = 1),
      (this.o1 = 0),
      (this.Xo = NaN),
      (this.Fs = NaN),
      (this.VM = 0),
      (this.ju = null),
      (this.UT = Point.wn),
      (this.be = new GMap()),
      (this.e1 = new GMap()),
      (this.Zf = new GSet()),
      (this.BM = 1),
      t && Object.assign(this, t));
  }
  suspend() {
    this.jf = true;
  }
  advanceTo(t, i) {
    (i && (this.jf = false),
      this.Ju && t >= this.Fs && ((this.Qf = true), (t = t - this.Fs)),
      (this.VM = t),
      this.BT(true),
      this.Ls.Hu(),
      this.f.Ar(),
      this.Ls.vu(),
      this.f.redraw());
  }
  Qx(t) {
    if (
      (this.e1.clear(),
      (this.Qf = false),
      (this.o1 = 0),
      (this.Fs = NaN),
      this.Zf.count > 0 && this.Zf.clear(),
      t !== null)
    ) {
      const i = t.links;
      for (; i.next(); ) i.value.Er = null;
    }
  }
  VR() {
    return this.be.count > 0;
  }
  start() {
    if (this.be.count === 0) return this;
    if (this.Ri) return this;
    let t = this.f;
    const i = this.be.iterator;
    for (; i.next(); ) {
      const s = i.key;
      t === null && (s instanceof Diagram ? (t = s) : s instanceof GraphObject && (t = s.diagram));
    }
    if (t !== null) ((this.f = t), (this.Ls = t.animationManager));
    else return this;
    const e = this.Ls;
    return e.isEnabled === false
      ? this
      : ((this.Fs = isNaN(this.Xo) ? e.duration : this.Xo),
        (this.$m = this.i1),
        e.vf &&
          e.Wf === 1 &&
          this === e.defaultAnimation &&
          ((this.$m = Animation.EaseOutExpo),
          (this.Fs = isNaN(this.Xo) ? (e.duration === 600 ? 900 : e.duration) : this.Xo)),
        (this.BM = t.scrollMode),
        this.isViewportUnconstrained && (t.da = 2),
        e.Hu(),
        this.Zf.each((s) => {
          ((s.data = null), t.add(s));
        }),
        e.vu(),
        (this.Ri = true),
        (this.ci = +new Date()),
        (this.so = this.ci + this.Fs),
        e.RR(this),
        this);
  }
  addTemporaryPart(t, i) {
    return t.Oe()
      ? (Debug &&
          (i === void 0 && U.n("addTemporaryPart: Required Diagram argument missing"),
          t.diagram === i && U.n("addTemporaryPart: Part already in Diagram, did you mean to pass in a copy?"),
          this.f !== null &&
            this.f !== i &&
            U.n(
              "addTemporaryPart: A different Diagram is already associated with this Animation: " + this.f.toString(),
            )),
        this.Zf.add(t),
        (this.f = i),
        this)
      : this;
  }
  add(t, i, e, s, n) {
    if (
      (this.f === null &&
        (t instanceof Diagram ? (this.f = t) : t instanceof GraphObject && t.diagram !== null && (this.f = t.diagram)),
      t instanceof Part)
    ) {
      if (!t.isAnimated) return this;
      i === "position" && (i = "position:part");
    }
    return (this.FM(t, i, e, s, n), this);
  }
  FM(t, i, e, s, n) {
    const o = this.be;
    let r, l, h;
    if (
      (t instanceof Diagram && i === "position" && (i = "position:diagram"),
      (i === "fill" || i === "stroke" || i === "background") &&
        (Brush.Ko(e),
        Brush.zM(),
        (e = [Brush.qi.n0, Brush.qi.n1, Brush.qi.n2, Brush.qi.n3]),
        Brush.Ko(s),
        Brush.zM(),
        (s = [Brush.qi.n0, Brush.qi.n1, Brush.qi.n2, Brush.qi.n3])),
      o.has(t))
    )
      ((r = o.get(t)), (l = r.ci), (h = r.Ds), l[i] === void 0 && (l[i] = this.$u(e)), (h[i] = this.$u(s)));
    else {
      if (i === "position" && e.equalsApprox(s)) return;
      ((l = {}), (h = {}), (l[i] = this.$u(e)), (h[i] = this.$u(s)), (r = new AnimationState(l, h, n)), o.set(t, r));
    }
    const a = l[i];
    (a instanceof Point && !a.isReal() && a.c(this.UT),
      n && i.indexOf("position:") === 0 && t instanceof Part
        ? (r.h1.location = this.$u(t.location))
        : n && (r.h1[i] = this.$u(e)));
  }
  $u(t) {
    return t instanceof Point || t instanceof Size ? t.copy() : t;
  }
  BR(t) {
    const i = this.be;
    if (i.has(t)) {
      const e = i.get(t);
      e.a1 = true;
    }
  }
  _x(t) {
    if (!this.Ri) return false;
    const i = this.be.get(t);
    return i !== null && i.a1;
  }
  DM(t) {
    if (!this.Ri) return false;
    const i = this.be.get(t);
    return i !== null && !!(i.ci.position || i.ci["position:part"] || i.ci.location);
  }
  OR() {
    if (this.Zf.count > 0) return true;
    const t = this.be.iterator;
    for (; t.next(); ) {
      const i = t.key;
      if ((i instanceof GraphObject && i.diagram !== null) || i instanceof Diagram) return true;
    }
    return false;
  }
  BT(t) {
    if (this.jf && !t) return;
    const i = this.Ls;
    if (this.Ri === false) return;
    const e = +new Date();
    let s = e > this.so ? this.Fs : e - this.ci;
    (t && ((s = this.VM), s < this.Fs ? ((this.ci = +new Date() - s), (this.so = this.ci + this.Fs)) : (s = this.Fs)),
      i.Hu(),
      this.ET(s),
      this.f.Ar(true),
      i.vu(),
      e > this.so &&
        (this.Ju && !this.Qf ? ((this.ci = +new Date()), (this.so = this.ci + this.Fs), (this.Qf = true)) : this.Wu(false)));
  }
  ET(t) {
    const i = this.Fs,
      e = this.be.iterator,
      s = this.Qf;
    for (; e.next(); ) {
      const n = e.key;
      if (n instanceof GraphObject && n.diagram === null) continue;
      const o = e.value,
        r = s ? o.Ds : o.ci,
        l = s ? o.ci : o.Ds,
        h = AnimationManager.t1;
      for (const a in l)
        (a === "position" && (l["position:placeholder"] || l["position:nodeCollapse"])) ||
          (h.get(a) !== null && h.get(a)(n, r[a], l[a], this.$m, t, i, this));
    }
  }
  stop() {
    return this.Ri ? (this.Wu(true), this) : this;
  }
  Wu(t) {
    if ((this.l1 !== null && this.l1.zR(this.OM), !this.Ri)) return;
    const i = this.f,
      e = this.Ls;
    ((e.vf = false), (this.Ri = false), (this.jf = false), e.Hu());
    const s = this.be,
      n = this.Zf.iterator;
    for (; n.next(); ) i.remove(n.value);
    const o = this.Ju,
      r = s.iterator,
      l = AnimationManager.t1;
    for (; r.next(); ) {
      const a = r.key,
        f = r.value,
        c = o ? f.Ds : f.ci,
        u = o ? f.ci : f.Ds,
        d = f.h1;
      for (const m in u)
        if (l.get(m) !== null) {
          let g = m;
          (f.f1 && (g === "position:nodeCollapse" || g === "position:placeholder") && (g = "position"),
            l.get(g)(a, c[m], d[m] !== void 0 ? d[m] : f.f1 ? c[m] : u[m], this.$m, this.Fs, this.Fs, this));
        }
      (f.f1 && d.location !== void 0 && a instanceof Part && (a.location = d.location),
        f.a1 && a instanceof Part && a.Hi(false));
    }
    this.o1++;
    const h = !t && this.s1 > this.o1;
    if (
      (!h && (this === e.Wm || this === e.defaultAnimation) && this.be.clear(),
      i.c1.clear(),
      i.bP(false),
      i.invalidateDocumentBounds(),
      i.L(),
      i.Ar(true),
      e.defaultAnimation === this)
    ) {
      const a = e.Jm.iterator;
      for (; a.next(); ) a.value.XR();
      e.Jm.clear();
    }
    if ((i.Ar(true), this.isViewportUnconstrained && (i.scrollMode = this.BM), e.vu(), h)) {
      ((this.Qf = false), this.start());
      return;
    }
    (this.Qx(null), i.GT(), e.Wu(this), this.ju && this.ju(this), i.requestUpdate());
  }
  Jf(t, i) {
    const e = i.actualBounds;
    let s = null;
    if ((i instanceof Group && (s = i.placeholder), s !== null && s.visible)) {
      const n = s.getDocumentPoint(Spot.TopLeft),
        o = s.padding;
      ((n.x += o.left), (n.y += o.top), this.add(t, "position", n, t.position, false));
    } else this.add(t, "position", new Point(e.x + e.width / 2, e.y + e.height / 2), t.position, false);
    (this.add(t, "scale", 0.01, t.scale, false), t instanceof Group && this.YR(t, i));
  }
  YR(t, i) {
    const e = t.memberParts;
    for (; e.next(); ) {
      const s = e.value;
      s instanceof Node && this.Jf(s, i);
    }
  }
  $f(t, i) {
    if (!t.isVisible()) return;
    let e = null;
    if ((i instanceof Group && (e = i.placeholder), e !== null && e.visible)) {
      const s = e.getDocumentPoint(Spot.TopLeft),
        n = e.padding;
      ((s.x += n.left), (s.y += n.top), this.add(t, "position:placeholder", t.position, s, true));
    } else this.add(t, "position:nodeCollapse", t.position, i, true);
    (this.add(t, "scale", t.scale, 0.01, true), this.BR(t), t instanceof Group && this.KR(t, i));
  }
  KR(t, i) {
    const e = t.memberParts;
    for (; e.next(); ) {
      const s = e.value;
      s instanceof Node && this.$f(s, i);
    }
  }
  get duration() {
    return this.Xo;
  }
  set duration(t) {
    (U.i(t, "number", Animation, "duration"), t < 1 && U.G(t, ">= 1", Animation, "duration"), (this.Xo = t));
  }
  get reversible() {
    return this.Ju;
  }
  set reversible(t) {
    this.Ju = t;
  }
  get runCount() {
    return this.s1;
  }
  set runCount(t) {
    t > 0 ? (this.s1 = t) : U.n("Animation.runCount value must be a positive integer.");
  }
  get finished() {
    return this.ju;
  }
  set finished(t) {
    this.ju !== t && (t !== null && U.C(t, Animation, "finished"), (this.ju = t));
  }
  get easing() {
    return this.i1;
  }
  set easing(t) {
    this.i1 = t;
  }
  get isViewportUnconstrained() {
    return this.EM;
  }
  set isViewportUnconstrained(t) {
    this.EM = t;
  }
  get isAnimating() {
    return this.Ri;
  }
  getTemporaryState(t) {
    let i = this.e1.get(t);
    return (i === null && ((i = {}), this.e1.set(t, i)), i);
  }
  static EaseLinear = (t, i, e, s) => (e * t) / s + i;
  static EaseInOutQuad = (t, i, e, s) => (
    (t /= s / 2),
    t < 1 ? (e / 2) * t * t + i : (-e / 2) * (--t * (t - 2) - 1) + i
  );
  static EaseInQuad = (t, i, e, s) => e * (t /= s) * t + i;
  static EaseOutQuad = (t, i, e, s) => -e * (t /= s) * (t - 2) + i;
  static EaseInExpo = (t, i, e, s) => (t === 0 ? i : e * Math.pow(2, 10 * (t / s - 1)) + i);
  static EaseOutExpo = (t, i, e, s) => (t === s ? i + e : e * (-Math.pow(2, (-10 * t) / s) + 1) + i);
}
