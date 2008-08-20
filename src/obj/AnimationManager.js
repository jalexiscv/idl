class AnimationManager {
  f;
  Ri;
  Gi;
  Rr;
  eo;
  Xo;
  NM;
  CM;
  vm;
  jx;
  Ni;
  vf;
  Nn;
  Wm;
  ua;
  Jx;
  jm;
  $x;
  Wf;
  Uu;
  Jm;
  constructor(t) {
    ((this.f = Diagram.Bm()),
      (this.Ri = false),
      (this.vm = false),
      (this.jx = false),
      (this.Ni = false),
      (this.vf = false),
      (this.$x = true),
      (this.Wf = 1),
      (this.Uu = false),
      (this.Gi = true),
      (this.Rr = true),
      (this.Xo = 600),
      (this.NM = false),
      (this.CM = false),
      (this.eo = new GSet()),
      (this.Nn = new Animation()),
      (this.Wm = new Animation()),
      (this.Nn.Ls = this),
      (this.ua = new GSet()),
      (this.Jx = new GSet()),
      (this.jm = new GSet()),
      (this.Jm = new GSet()),
      t && Object.assign(this, t));
  }
  Yo(t) {
    this.f = t;
  }
  EV() {
    return this.f;
  }
  canStart(t) {
    return true;
  }
  jl(t) {
    return !this.Gi || !this.canStart(t)
      ? false
      : (this.eo.add(t), this.defaultAnimation.isAnimating && this.stopAnimation(), this.f.Oi(), (this.Ni = true), true);
  }
  getBundleAnimation() {
    return this.Wm;
  }
  AM() {
    if (!this.Gi || (this.Wm.be.count > 0 && this.Wm.start(), !this.Ni)) return;
    const t = this.Nn,
      i = this.f,
      e = this.eo.has("Model");
    if (
      (e &&
        ((this.vf = true),
        this.Wf === 1
          ? ((t.isViewportUnconstrained = true),
            t.be.clear(),
            t.add(i, "position", i.position.copy().offset(0, -200), i.position),
            t.add(i, "opacity", 0, 1))
          : this.Wf === 3 && t.be.clear(),
        this.Wf === 2 && i.Zx.equals(i.yt) ? (this.$x = true) : (this.$x = false),
        i.F("InitialAnimationStarting", this)),
      (e && !this.Rr) || t.be.count === 0)
    ) {
      (this.eo.clear(), (this.Ni = false), t.be.clear(), t.Qx(i), (this.vf = false), i.L());
      return;
    }
    (this.eo.clear(), (i.Or = false));
    const s = t.be.get(i);
    i.autoScale !== 1 && s !== null && (delete s.ci.scale, delete s.Ds.scale);
    const n = this;
    root.requestAnimationFrame(() => {
      n.Ni === false ||
        t.Ri ||
        (i.getRenderingHint("temporaryPixelRatio") && i.Dx(),
        i.TM(),
        (n.Ni = false),
        t.start(),
        t.Ri && (n.Hu(), i.invalidateDocumentBounds(), t.ET(0), i.Ar(true), n.vu(), i.F("AnimationStarting", n)));
    });
  }
  LM() {
    return this.eo.has("Trigger") && this.eo.count === 1;
  }
  VT(t, i, e, s) {
    this.isTicking ||
      this.LM() ||
      (t instanceof Link && (t.fromNode !== null || t.toNode !== null)) ||
      this.Nn.add(t, "position", i, e, s);
  }
  _x(t) {
    return this.Nn._x(t);
  }
  DM(t) {
    return this.Nn.DM(t);
  }
  RR(t) {
    const i = this.ua,
      e = this;
    function s() {
      if ((e.jm.count > 0 && (i.addAll(e.jm), e.jm.clear(), (e.Ri = true)), e.Ri === false || i.count === 0)) {
        e.jx = false;
        return;
      }
      e.Jx.addAll(i);
      const n = e.Jx.iterator;
      for (; n.next(); ) {
        const o = n.value;
        o.Ri !== false && (o.OR() ? o.BT(false) : (o.jf = true));
      }
      if ((e.Jx.clear(), e.Ri === false)) {
        root.requestAnimationFrame(s);
        return;
      }
      (e.Hu(), e.f.Ar(), e.vu(), root.requestAnimationFrame(s));
    }
    this.Ri
      ? this.zT(t)
      : ((this.Ri = true), this.jx ? this.zT(t) : ((this.jx = true), i.add(t), root.requestAnimationFrame(() => s())));
  }
  zT(t) {
    this.jm.add(t);
  }
  ER() {
    const t = this.ua.iterator;
    for (; t.next(); ) t.value.jf = false;
  }
  Hu() {
    if (this.vm) return;
    const t = this.f;
    ((this.NM = t.skipsUndoManager), (this.CM = t.Se), (t.skipsUndoManager = true), (t.Se = true), (this.vm = true));
  }
  vu() {
    const t = this.f;
    ((t.skipsUndoManager = this.NM), (t.Se = this.CM), (this.vm = false));
  }
  stopAnimation(t) {
    const i = this.Nn;
    if (
      (this.Ni === true && ((this.Ni = false), (this.vf = false), this.eo.clear(), i.VR() && this.f.requestUpdate()), !this.Ri)
    ) {
      (i.be.clear(), i.Qx(this.f));
      return;
    }
    if ((i.Wu(true), i.Qx(null), t === true)) {
      const e = this.ua.toArray();
      for (let s = 0; s < e.length; s++) e[s].Wu(true);
    }
  }
  Wu(t) {
    (this.ua.delete(t),
      this.ua.count === 0 && ((this.Ri = false), this.f.requestUpdate()),
      t === this.defaultAnimation && this.f.F("AnimationFinished", this));
  }
  Jf(t, i) {
    this.Ni && ((!this.eo.has("Expand Tree") && !this.eo.has("Expand SubGraph")) || (this.Nn.Jf(t, i), this.XT(t)));
  }
  $f(t, i) {
    this.Ni &&
      ((!this.eo.has("Collapse Tree") && !this.eo.has("Collapse SubGraph")) ||
        (this.Nn.$f(t, i), this.Nn.FM(i, "position", i.position, i.position), this.XT(t)));
  }
  YT(t, i) {
    !this.Ni || t.equals(i) || this.LM() || (this.f.oa || (t = i.copy()), this.Nn.FM(this.f, "position", t, i));
  }
  KT(t, i) {
    this.Ni && (this.LM() || this.Nn.add(this.f, "scale", t, i));
  }
  IM(t, i) {
    t.Ve && ((t.Er = i), this.Jm.add(t));
  }
  XT(t) {
    const i = t.findLinksConnected();
    for (; i.next(); ) {
      const e = i.value;
      e.Ve && ((e.Er = e.points.copy()), this.Jm.add(e));
    }
  }
  get isEnabled() {
    return this.Gi;
  }
  set isEnabled(t) {
    (U.i(t, "boolean", AnimationManager, "isEnabled"),
      (this.Gi = t),
      t &&
        this.ua.each((i) => {
          !i.isAnimating && i.runCount === 1 / 0 && i.start();
        }));
  }
  get duration() {
    return this.Xo;
  }
  set duration(t) {
    (U.i(t, "number", AnimationManager, "duration"),
      t < 1 && U.G(t, ">= 1", AnimationManager, "duration"),
      (this.Xo = t));
  }
  get isAnimating() {
    return this.Ri;
  }
  get isTicking() {
    return this.vm;
  }
  get isInitial() {
    return this.Rr;
  }
  set isInitial(t) {
    (U.i(t, "boolean", AnimationManager, "isInitial"), (this.Rr = t));
  }
  get defaultAnimation() {
    return this.Nn;
  }
  get activeAnimations() {
    return this.ua;
  }
  get initialAnimationStyle() {
    return this.Wf;
  }
  set initialAnimationStyle(t) {
    (Debug && U.W(t, AnimationStyle, "AnimationStyle"), (this.Wf = t));
  }
  static t1 = new GMap();
  static defineAnimationEffect(t, i) {
    AnimationManager.t1.set(t, i);
  }
  static RM(t, i, e, s, n) {
    (t === null && (t = [0, 0, 0, 0]), i === null && (i = [0, 0, 0, 0]));
    let o = t[0],
      r = t[1];
    const l = t[2],
      h = t[3];
    let a = i[0],
      f = i[1];
    const c = i[2],
      u = i[3];
    (l === 0 || l === 100 ? ((o = a), (r = f)) : (c === 0 || c === 100) && ((a = o), (f = r)),
      Math.abs(a - o) > 180 && (a > o ? (o += 360) : (a += 360)));
    const d = n(e, o, a - o, s) % 360,
      m = n(e, r, f - r, s),
      g = n(e, l, c - l, s),
      p = n(e, h, u - h, s);
    return "hsla(" + d + ", " + m + "%, " + g + "%, " + p + ")";
  }
  static Default = 1;
  static AnimateLocations = 2;
  static None = 3;
}
{
  const w = AnimationManager.t1,
    t = (i, e, s, n, o, r) => {
      i.position = new Point(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r));
    };
  (w.set("position:diagram", t),
    w.set("position", t),
    w.set("position:part", (i, e, s, n, o, r) => {
      o < r
        ? i.Gf(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r), false)
        : (i.position = new Point(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r)));
    }),
    w.set("location", (i, e, s, n, o, r) => {
      o < r
        ? i.Gf(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r), true)
        : (i.location = new Point(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r)));
    }),
    w.set("position:placeholder", (i, e, s, n, o, r) => {
      o < r
        ? i.Gf(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r), false)
        : (i.position = new Point(n(o, e.x, s.x - e.x, r), n(o, e.y, s.y - e.y, r)));
    }),
    w.set("position:nodeCollapse", (i, e, s, n, o, r) => {
      const l = i.actualBounds,
        h = s.actualBounds,
        a = h.x + h.width / 2 - l.width / 2,
        f = h.y + h.height / 2 - l.height / 2;
      o < r
        ? i.Gf(n(o, e.x, a - e.x, r), n(o, e.y, f - e.y, r), false)
        : (i.position = new Point(n(o, e.x, a - e.x, r), n(o, e.y, f - e.y, r)));
    }),
    w.set("desiredSize", (i, e, s, n, o, r) => {
      i.desiredSize = new Size(n(o, e.width, s.width - e.width, r), n(o, e.height, s.height - e.height, r));
    }),
    w.set("width", (i, e, s, n, o, r) => {
      i.width = n(o, e, s - e, r);
    }),
    w.set("height", (i, e, s, n, o, r) => {
      i.height = n(o, e, s - e, r);
    }),
    w.set("fill", (i, e, s, n, o, r) => {
      i.fill = AnimationManager.RM(e, s, o, r, n);
    }),
    w.set("stroke", (i, e, s, n, o, r) => {
      i.stroke = AnimationManager.RM(e, s, o, r, n);
    }),
    w.set("strokeWidth", (i, e, s, n, o, r) => {
      i.strokeWidth = n(o, e, s - e, r);
    }),
    w.set("strokeDashOffset", (i, e, s, n, o, r) => {
      i.strokeDashOffset = n(o, e, s - e, r);
    }),
    w.set("background", (i, e, s, n, o, r) => {
      i.background = AnimationManager.RM(e, s, o, r, n);
    }),
    w.set("opacity", (i, e, s, n, o, r) => {
      i.opacity = n(o, e, s - e, r);
    }),
    w.set("scale", (i, e, s, n, o, r) => {
      i.scale = n(o, e, s - e, r);
    }),
    w.set("angle", (i, e, s, n, o, r) => {
      i.angle = n(o, e, s - e, r);
    }));
}
