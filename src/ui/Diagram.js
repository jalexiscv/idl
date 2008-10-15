class Diagram {
  Ls;
  Qt;
  GM;
  g1;
  Br;
  td;
  m1;
  p1;
  w1;
  b1;
  S1;
  k1;
  pa;
  da;
  P1;
  M1;
  N1;
  fh;
  ic;
  zr;
  s0;
  C1;
  A1;
  ed;
  An;
  Xr;
  ya;
  Uo;
  o0;
  ec;
  r0;
  sc;
  sd;
  Yr;
  no;
  qM;
  HM;
  T1;
  L1;
  vM;
  D1;
  WM;
  jM;
  JM;
  F1;
  l0;
  Kr;
  Ur;
  Gr;
  qr;
  Hr;
  vr;
  I1;
  Wr;
  R1;
  jr;
  Jr;
  $r;
  Zr;
  O1;
  $M;
  Go;
  ZM;
  E1;
  V1;
  QM;
  Fi;
  _M;
  nc;
  t2;
  $s;
  qo;
  Gi;
  B1;
  Jl;
  $l;
  z1;
  X1;
  Zl;
  Ql;
  _l;
  Y1;
  th;
  ih;
  eh;
  nh;
  oh;
  lh;
  hh;
  K1;
  U1;
  i2;
  nd;
  od;
  G1;
  q1;
  H1;
  v1;
  h0;
  W1;
  j1;
  J1;
  si;
  JT;
  $1;
  $T;
  rd;
  Tn;
  oo;
  fe;
  ro;
  ZT;
  ch;
  e2;
  s2;
  a0;
  Z1;
  ld;
  f0;
  Q1;
  Qr;
  uh;
  wa;
  o2;
  l2;
  c0;
  _1;
  tb;
  cs;
  oc;
  u0;
  hd;
  Ho;
  rc;
  d0;
  _r;
  xa;
  h2;
  g0;
  $t;
  E;
  Qe;
  Or;
  Wi;
  Is;
  a2;
  dh;
  tl;
  zl;
  il;
  ba;
  lc;
  f2;
  ad;
  Sa;
  fd;
  Gt;
  gh;
  yt;
  rt;
  cd;
  Pt;
  Mt;
  ut;
  hc;
  Tx;
  ib;
  ka;
  ac;
  eb;
  sb;
  QR;
  _R;
  te;
  Yl;
  t0;
  p0;
  c2;
  u2;
  QT;
  y0;
  tO;
  iO;
  eO;
  nb;
  sO;
  nO;
  oO;
  Pa;
  _T;
  mh;
  Ma;
  Na;
  Ca;
  Aa;
  Ku;
  ca;
  _t;
  Lt;
  Jk;
  $k;
  Vf;
  ei;
  static ob = null;
  static tL = new GMap();
  static d2;
  static g2 = null;
  Yu;
  rb;
  lb;
  ud;
  hb;
  ab;
  w0;
  m2;
  x0;
  b0;
  S0;
  Zx;
  p2;
  w2;
  cc;
  k0;
  P0;
  constructor(t, i) {
    if (
      (GSet._i(this),
      Diagram.iL(this),
      (this.$t = true),
      (this.Lt = null),
      (this.Pt = 0),
      (this.Mt = 0),
      (this.ut = null),
      Diagram.isUsingDOM())
    ) {
      const s = this,
        n = () => {
          (s.Ii(root.document, "DOMContentLoaded", n, false), s.setRTL());
        };
      root.document.body !== null ? this.setRTL() : s.Kt(root.document, "DOMContentLoaded", n, false);
    }
    ((this.hc = null), Diagram.b2("Model", PartManager));
    const e = this;
    return (
      (this._M = (s) => e.partManager.doModelDataChanged(s)),
      (this.nc = (s) => e.partManager.doModelChanged(s)),
      (this.eb = null),
      (this.sb = null),
      this.eL(),
      (this.model = Model.S2()),
      (this.themeManager = new ThemeManager()),
      (this.Go = true),
      this.sL(),
      (this.layout = new Layout()),
      (this.Go = false),
      (this.tO = null),
      (this.iO = null),
      (this.eO = null),
      (this.nb = null),
      (this.sO = null),
      (this.nO = null),
      (this.oO = null),
      (this.Pa = null),
      (this._T = null),
      (this.mh = null),
      (this.Ma = null),
      (this.Na = null),
      (this.Ca = null),
      (this.Aa = null),
      (this.Ku = () => {}),
      (this.ca = null),
      (this.hd = false),
      t !== void 0 && (typeof t == "string" || (root.Element && t instanceof Element) ? this.k2(t) : (i = t)),
      i && this.setProperties(i),
      (this.$t = false),
      this.requestUpdate(),
      this
    );
  }
  pR() {
    return this.ut !== null;
  }
  get renderer() {
    return this.rc;
  }
  set renderer(t) {
    if (this instanceof Overview) return;
    t === "" && (t = "default");
    const i = t.toLowerCase(),
      e = this.rc;
    if (i === e) return;
    this.rc = i;
    let s = null;
    (i === "default" || i === "canvas"
      ? ((s = this.Ho.get("svg")),
        s !== null && s.Nt.remove(),
        this.ut && ((this._t = this.ut.ni), this._t.clearContextCache(true)))
      : i === "svg"
        ? (this.Ho.has("svg")
            ? (s = this.Ho.get("svg"))
            : ((s = new SVGSurface(this, root.document)), this.addRenderer("svg", s)),
          this.div !== null && ((s.Nt.role = "img"), this.div.appendChild(s.Nt)),
          this.ut &&
            ((this._t = s.ni),
            this.ut.ni.setTransform(this.te, 0, 0, this.te, 0, 0),
            this.ut.ni.clearRect(0, 0, this.Pt, this.Mt)))
        : i === "debug" &&
          (this.Ho.has("SVG") ||
            ((s = new SVGSurface(this, root.document)),
            this.addRenderer("SVG", s),
            (s.Nt.style.backgroundColor = "whitesmoke"),
            this.div !== null && this.div.after(s.Nt))),
      this.$t || this.redraw());
  }
  eL() {
    if (
      ((this.cc = new List()),
      this.setupRouters(),
      (this.Ls = new AnimationManager()),
      this.Ls.Yo(this),
      (this.Qt = 17),
      (this.GM = false),
      (this.cd = false),
      (this.g1 = "default"),
      (this.Gt = new List()),
      this.Ho)
    ) {
      const t = this.Ho.get("svg");
      (t !== null && t.Nt.remove(), this.ut && ((this._t = this.ut.ni), this._t.clearContextCache(true)));
    }
    ((this.Ho = new GMap()),
      (this.rc = "default"),
      this.resetRenderingHints(),
      this.rO(),
      (this.ei = 1),
      (this.yt = new Point(NaN, NaN).k()),
      (this.Zx = new Point(NaN, NaN)),
      (this.rt = 1),
      (this.g0 = 1),
      (this.m1 = new Point(NaN, NaN).k()),
      (this.p1 = NaN),
      (this.w1 = 1e-4),
      (this.b1 = 100),
      (this.E = new Transform()),
      (this.S1 = new Point(NaN, NaN).k()),
      (this.k1 = new Rect(NaN, NaN, NaN, NaN).k()),
      (this.pa = new Margin(0, 0, 0, 0).Ct()),
      (this.da = 1),
      (this.P1 = false),
      (this.M1 = null),
      (this.N1 = null),
      (this.fh = 1),
      (this.ic = Spot.Default),
      (this.zr = 1),
      (this.s0 = Spot.Default),
      (this.C1 = Spot.None),
      (this.A1 = Spot.None),
      (this.Qe = true),
      (this.ed = false),
      (this.An = new Set()),
      (this.Xr = new GSet()),
      (this.ya = new GSet()),
      (this.Uo = false),
      (this.gh = new GMap()),
      (this.ad = true),
      (this.o0 = 250),
      (this.ec = -1),
      (this.r0 = new Margin(16, 16, 16, 16).Ct()),
      (this.Or = false),
      (this.sc = false),
      (this.sd = true),
      (this.d0 = new InputEvent()),
      (this.d0.diagram = this),
      (this._r = new InputEvent()),
      (this._r.diagram = this),
      (this.xa = new InputEvent()),
      (this.xa.diagram = this),
      (this.Yr = null),
      (this.no = null),
      (this.Tx = false),
      this.lO(),
      (this.il = new GSet()),
      (this.T1 = true),
      (this.L1 = 1),
      (this.vM = false),
      (this.D1 = 1),
      (this.F1 = "auto"),
      (this.l0 = "auto"),
      (this.Kr = null),
      (this.Ur = null),
      (this.Gr = null),
      (this.qr = null),
      (this.Hr = null),
      (this.vr = null),
      (this.I1 = null),
      (this.Wr = null),
      (this.R1 = false),
      (this.jr = null),
      (this.Jr = null),
      (this.$r = null),
      (this.Zr = null),
      (this.O1 = false),
      (this.ib = {}),
      (this.ka = [null, null]),
      (this.Go = false),
      (this.ZM = false),
      (this.E1 = false),
      (this.V1 = false),
      (this.QM = true),
      (this.Is = false),
      (this.Sa = false),
      (this.t2 = true),
      (this.$s = -2),
      (this.dh = new GMap()),
      (this.fd = new List()),
      (this.qo = false),
      (this.Gi = true),
      (this.B1 = true),
      (this.Jl = true),
      (this.$l = true),
      (this.z1 = false),
      (this.X1 = true),
      (this.Zl = true),
      (this.Ql = true),
      (this._l = true),
      (this.Y1 = true),
      (this.th = true),
      (this.ih = true),
      (this.eh = true),
      (this.nh = true),
      (this.oh = true),
      (this.lh = true),
      (this.hh = true),
      (this.K1 = true),
      (this.U1 = true),
      (this.i2 = false),
      (this.ac = false),
      (this.nd = true),
      (this.od = true),
      (this.G1 = true),
      (this.q1 = true),
      (this.H1 = 16),
      (this.v1 = 16),
      (this.h0 = false),
      (this.W1 = false),
      (this.j1 = 0),
      (this.J1 = 0),
      (this.si = new Margin(5).Ct()),
      (this.JT = new GSet().k()),
      (this.$1 = 999999999),
      (this.$T = new GSet().k()),
      (this.ba = true),
      (this.rd = true),
      (this.lc = true),
      (this.Tn = false),
      (this.oo = false),
      (this.tl = true),
      (this.zl = false),
      (this.ro = false),
      (this.ZT = new GSet()),
      (this.f2 = new GSet()),
      (this.ch = null),
      (this.e2 = new Size(Link.nL, Link.oL)),
      (this.s2 = 999),
      (this.a0 = false),
      (this.Jk = 1),
      (this.$k = 0),
      (this.Wi = {
        scale: 1,
        position: new Point(),
        bounds: new Rect(),
        canvasSize: new Size(),
        newCanvasSize: new Size(),
        isScroll: false,
      }),
      (this.Wi.canvasSize = this.Wi.canvasSize),
      (this.Wi.newCanvasSize = this.Wi.newCanvasSize),
      (this.Wi.isScroll = false),
      (this.Z1 = new Rect(NaN, NaN, NaN, NaN).k()),
      (this.ld = new Size(NaN, NaN).k()),
      (this.f0 = new Rect(NaN, NaN, NaN, NaN).k()),
      (this.Q1 = false),
      (this.k0 = null),
      (this.P0 = null),
      this.hO(),
      (this.cs = null),
      (this.oc = false),
      (this.Vf = null),
      (this.partManager = new PartManager()),
      (this.toolManager = new ToolManager()),
      this.toolManager.initializeStandardTools(),
      (this.defaultTool = this.toolManager),
      (this.currentTool = this.defaultTool),
      (this.lb = null),
      (this.ud = new DraggingOptions()),
      (this.hb = null),
      (this.ab = null),
      (this.rb = false),
      (this.Yu = false),
      (this.commandHandler = new CommandHandler()),
      (this.b0 = null),
      (this.S0 = Point.xn),
      (this.p2 = false),
      (this.te = 1),
      (this.Yl = null),
      (this.t0 = 1),
      (this.w0 = 0),
      (this.m2 = [0, 0, 0, 0, 0]),
      (this.x0 = 0),
      (this.p0 = 1),
      (this.c2 = 0),
      (this.u2 = new Point()),
      (this.QT = 500),
      (this.u0 = new Point()),
      (this.y0 = false));
  }
  static rL = root.document !== void 0;
  static isUsingDOM() {
    return Diagram.rL;
  }
  static setDocument(t) {
    root.document = t;
  }
  static useDOM(t) {
    Diagram.rL = t ? root.document !== void 0 : false;
  }
  static _e = new WeakMap();
  clear() {
    (this.animationManager.stopAnimation(),
      this.model.clear(),
      Diagram.lL(),
      this.hL(false),
      this.fd.clear(),
      this.aL(),
      (this.ch = null),
      this.invalidateDocumentBounds(),
      this.ensureBounds(),
      this.L());
  }
  hL(t) {
    (this.animationManager.stopAnimation(true), this.clearSelection(), this.clearHighlighteds());
    const i = this.skipsUndoManager,
      e = this.Fi !== null && this.Fi !== void 0;
    e && (this.skipsUndoManager = true);
    let s = null;
    this.cs !== null && ((s = this.cs.part), s !== null && this.remove(s));
    const n = [],
      o = this.Gt.length;
    if (t) {
      for (let r = 0; r < o; r++) {
        const h = this.Gt.h[r].parts;
        for (; h.next(); ) {
          const a = h.value;
          a !== s && a.data === null && n.push(a);
        }
      }
      for (let r = 0; r < n.length; r++) {
        const l = n[r];
        this.remove(l);
      }
    }
    for (let r = 0; r < o; r++) this.Gt.h[r].GR();
    return (
      this.partManager.clear(),
      this.An.clear(),
      this.Xr.clear(),
      this.ya.clear(),
      this.gh.clear(),
      this.il.clear(),
      (this.Vf = null),
      this.fd.clear(),
      this.aL(),
      (U.Fk = []),
      s !== null && (this.add(s), this.partManager.parts.delete(s)),
      e && (this.skipsUndoManager = i),
      n
    );
  }
  static M0 = null;
  static fb = "";
  static lL() {
    ((Diagram.M0 = null), (Diagram.fb = ""));
  }
  static zV() {
    return null;
  }
  reset() {
    (this.clear(),
      (this.$t = true),
      this.eL(),
      (this.themeManager = new ThemeManager()),
      this.ph(),
      (this.Go = true),
      this.sL(),
      (this.layout = new Layout()),
      (this.Go = false),
      (this.model = Model.S2()),
      (this.model.undoManager = new UndoManager()),
      (this.hd = false),
      (this.$t = false),
      this.L());
  }
  hO() {
    ((this.Qr = new GMap()),
      (this.o2 = new Node().add(
        new TextBlock({ stroke: "black", font: "10pt sans-serif" })
          .bind("text", "", U.toString)
          .theme("stroke", "text")
          .theme("font", "normal"),
      )),
      this.Qr.set("", this.o2),
      this.Qr.set(
        "Comment",
        new Node().add(
          new TextBlock({ stroke: "brown", font: "10pt sans-serif" })
            .bind("text", "", U.toString)
            .theme("stroke", "comment")
            .theme("font", "normal"),
        ),
      ),
      this.Qr.set(
        "LinkLabel",
        new Node({ selectable: false, avoidable: false }).add(
          new Shape("Ellipse", { fill: "black", stroke: null, desiredSize: new Size(3, 3).Ct() }).theme("fill", "link"),
        ),
      ),
      (this.wa = new GMap()),
      (this.a2 = new Group(Panel.Vertical, { selectionObjectName: "GROUPPANEL" }).add(
        new TextBlock({ stroke: "black", font: "bold 12pt sans-serif" })
          .bind("text", "", U.toString)
          .theme("stroke", "text")
          .theme("font", "bold"),
        new Panel(Panel.Auto, { name: "GROUPPPANEL" }).add(
          new Shape({ fill: "rgba(128,128,128,0.2)", stroke: "black", strokeWidth: 1 })
            .theme("fill", "group")
            .theme("stroke", "outline")
            .theme("strokeWidth", "group"),
          new Placeholder({ padding: 5 }).theme("padding", "group"),
        ),
      )),
      this.wa.set("", this.a2),
      (this.uh = new GMap()),
      (this.l2 = new Link().add(
        new Shape({ isPanelMain: true, stroke: "black" }).theme("stroke", "link"),
        new Shape({ toArrow: "Standard", fill: "black", stroke: null, strokeWidth: 0 })
          .theme("toArrow")
          .theme("fill", "link"),
      )),
      this.uh.set("", this.l2),
      this.uh.set(
        "Comment",
        new Link().add(new Shape({ isPanelMain: true, stroke: "brown" }).theme("stroke", "comment")),
      ),
      (this.c0 = new Adornment(Panel.Auto)
        .add(
          new Shape({ fill: null, stroke: "dodgerblue", strokeWidth: 3 })
            .theme("stroke", "selection")
            .theme("strokeWidth", "selection"),
          new Placeholder({ margin: 1.5 }).theme("margin", "selection", "numbers", null, (t) =>
            t ? new Margin(t / 2) : 1.5,
          ),
        )
        .freezeBindings()),
      (this._1 = this.c0),
      (this.tb = new Adornment(Panel.Link)
        .add(
          new Shape({ isPanelMain: true, fill: null, stroke: "dodgerblue", strokeWidth: 3 })
            .theme("stroke", "selection")
            .theme("strokeWidth", "selection"),
        )
        .freezeBindings()));
  }
  setRTL(t) {
    let i = t === void 0 ? this.div : t;
    i === null && (i = root.document.body);
    const e = U.Le("div");
    ((e.dir = "rtl"),
      (e.style.cssText =
        "font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll;"),
      (e.textContent = "A"),
      i.appendChild(e));
    let s = "reverse";
    (e.scrollLeft > 0 ? (s = "default") : ((e.scrollLeft = 1), e.scrollLeft === 0 && (s = "negative")),
      i.removeChild(e),
      (this.g1 = s));
  }
  setScrollWidth(t) {
    let i = t === void 0 ? this.div : t;
    i === null && (i = root.document.body);
    let e = 0;
    if (Diagram.isUsingDOM()) {
      let s = Diagram.g2,
        n = Diagram.d2;
      (s === null &&
        ((Diagram.g2 = U.Le("p")),
        (s = Diagram.g2),
        (s.style.width = "100%"),
        (s.style.height = "200px"),
        (s.style.boxSizing = "content-box"),
        (Diagram.d2 = U.Le("div")),
        (n = Diagram.d2),
        (n.style.position = "absolute"),
        (n.style.visibility = "hidden"),
        (n.style.width = "200px"),
        (n.style.height = "150px"),
        (n.style.boxSizing = "content-box"),
        n.appendChild(s)),
        (n.style.overflow = "hidden"),
        i.appendChild(n));
      const o = s.offsetWidth;
      n.style.overflow = "scroll";
      let r = s.offsetWidth;
      (o === r && (r = n.clientWidth), i.removeChild(n), (e = o - r), e === 0 && !U.yr && (e = 11));
    }
    ((this.Qt = e), (this.GM = true));
  }
  gi(t) {
    t in AutoScale ? (this.autoScale = t) : U.wr(this, t);
  }
  toString(t) {
    t === void 0 && (t = 0);
    let i = "";
    this.div && this.div.id && (i = this.div.id);
    let e = 'Diagram "' + i + '"';
    if (t <= 0) return e;
    const s = this.Gt.iterator;
    for (; s.next(); ) {
      const n = s.value;
      e +=
        `
  ` + n.toString(t - 1);
    }
    return e;
  }
  static iL(t) {
    Diagram.ob = t;
  }
  static Bm() {
    return Diagram.ob;
  }
  static fromDiv(t) {
    let i = t;
    if ((typeof t == "string" && (i = root.document.getElementById(t)), i instanceof HTMLDivElement)) {
      const e = Diagram._e.get(i);
      if (e) return e;
    }
    return null;
  }
  get div() {
    return this.Lt;
  }
  set div(t) {
    if ((t !== null && U.s(t, HTMLDivElement, Diagram, "div"), this.Lt !== t)) {
      const i = this.Lt;
      if (i !== null) {
        if ((Diagram._e.delete(i), (i.idlDiagram = void 0), (i.idl = void 0), (i.innerHTML = ""), this.ut !== null)) {
          const s = this.ut.Nt;
          (this.Ii(s, "pointermove", this.Ma, false),
            this.Ii(s, "pointerdown", this.mh, false),
            this.Ii(s, "pointerup", this.Na, false),
            this.Ii(s, "pointerout", this.Ca, false),
            this.Ii(s, "pointercancel", this.Aa, false),
            this.ut.dispose());
        }
        this.hc && (this.hc.disconnect(), (this.hc = null));
        const e = this.toolManager;
        (e !== null &&
          (e.mouseDownTools.each((s) => s.cancelWaitAfter()),
          e.mouseMoveTools.each((s) => s.cancelWaitAfter()),
          e.mouseUpTools.each((s) => s.cancelWaitAfter())),
          e.cancelWaitAfter(),
          this.currentTool.doCancel(),
          (this.ut = null),
          this.Ii(root, "resize", this.nb, false),
          this.Ii(root, "wheel", this.Pa, true),
          Diagram.Bm() === this && Diagram.iL(null));
      } else this.mh === null && (this.ro = false);
      if (((this.Lt = null), t !== null)) {
        const e = Diagram._e.get(t);
        (e && (e.div = null), this.k2(t), this.Ku(), this.themeManager && this.themeManager.aO());
      } else this.themeManager && this.themeManager.fO();
    }
  }
  setupRouters() {
    this.cc.push(new AvoidsNodesRouter());
  }
  k2(t) {
    const i = this;
    if (!Diagram.isUsingDOM()) return;
    (t == null && U.n("Diagram setup requires an argument DIV."),
      i.Lt !== null && U.n("Diagram has already completed setup."),
      typeof t == "string"
        ? (i.Lt = root.document.getElementById(t))
        : t instanceof HTMLDivElement
          ? (i.Lt = t)
          : U.n("No DIV or DIV id supplied: " + t),
      i.Lt === null && U.n("Invalid DIV id; could not get element with id: " + t));
    const e = Diagram._e.get(i.Lt);
    if (
      (e && e !== this && U.n("Invalid div id; div already has a Diagram associated with it."),
      !i.hc && root.ResizeObserver)
    ) {
      const f = root.ResizeObserver,
        c = U.Dk(() => i.requestUpdate(), 250, false);
      ((i.hc = new f(() => c())), i.hc.observe(i.Lt));
    }
    root.getComputedStyle(i.Lt, null).position === "static" && (i.Lt.style.position = "relative");
    let s = 5;
    const n = "rgba(2" + s + "5, 255, 255, 0)";
    (s--,
      (i.Lt.style["-webkit-tap-highlight-color"] = n),
      (i.Lt.innerHTML = ""),
      Diagram._e.set(i.Lt, i),
      (i.Lt.idlDiagram = i),
      (i.Lt.idl = root.idl));
    const o = new CanvasSurface(i);
    (o.style !== void 0 &&
      ((o.style.position = "absolute"),
      (o.style.top = "0px"),
      (o.style.left = "0px"),
      root.getComputedStyle(i.Lt, null).getPropertyValue("direction") === "rtl" && (i.cd = true),
      (o.style.zIndex = "2"),
      (o.style.userSelect = "none"),
      (o.style.MozUserSelect = "none"),
      (o.style.touchAction = "none"),
      (o.style.letterSpacing = "normal !important"),
      (o.style.wordSpacing = "normal !important"),
      (o.style.lang = "unknown")),
      o.Nt.setAttribute("role", "application"),
      (i.ut = o),
      (i._t = o.ni));
    const r = i._t;
    ((i.te = i.computePixelRatio()),
      i.viewSize.isReal() || ((i.Pt = i.Lt.clientWidth || 1), (i.Mt = i.Lt.clientHeight || 1)),
      i.fL(i.Pt, i.Mt));
    const l = i;
    i.Lt.insertBefore(o.Nt, i.Lt.firstChild);
    const h = new CanvasSurface(null);
    if (((h.width = 1), (h.height = 1), (i.QR = h), (i._R = h.ni), Diagram.isUsingDOM())) {
      const f = U.Le("div"),
        c = U.Le("div");
      ((f.style.position = "absolute"),
        (f.style.overflow = "auto"),
        (f.style.width = i.Pt + "px"),
        (f.style.height = i.Mt + "px"),
        (f.style.zIndex = "1"),
        (c.style.position = "absolute"),
        (c.style.width = "1px"),
        (c.style.height = "1px"),
        i.Lt.appendChild(f),
        f.appendChild(c),
        (f.onscroll = Diagram.cO),
        f.addEventListener("pointerdown", Diagram.uO),
        (f.f = i),
        (f.dO = true),
        (f.gO = true),
        (i.eb = f),
        (i.sb = c));
    }
    const wm = U.Le("a");
    (wm.href = U.dh("72bc02a3f06c54cb44824b7b016b73b957ff63689ed94ab9551247b3")),
      (wm.target = "_blank"),
      (wm.rel = "noopener"),
      (wm.textContent = U.dh("5aa217bfe62e1297409d")),
      (wm.style.cssText =
        "position:absolute;bottom:4px;right:6px;z-index:10;" +
        "font-family:system-ui,sans-serif;font-size:10px;color:#999;" +
        "text-decoration:none;pointer-events:auto;"),
      i.Lt.appendChild(wm);
    ((i.Ku = U.Dk(
      () => {
        ((i.Yl = null), i.L());
      },
      300,
      false,
    )),
      (i.nb = U.Dk(
        () => {
          i.TM();
        },
        250,
        false,
      )),
      (i.ca = (f) => (f.preventDefault(), false)),
      (i.Pa = (f) => {
        if (!l.isEnabled) return;
        const c = l.uc(f, true);
        c.bubbles = true;
        let u = 0,
          d = 0;
        ((c.delta = 0),
          f.deltaX !== void 0
            ? (f.deltaX !== 0 && (u = f.deltaX > 0 ? 1 : -1),
              f.deltaY !== 0 && (d = f.deltaY > 0 ? 1 : -1),
              (c.delta = Math.abs(f.deltaX) > Math.abs(f.deltaY) ? -u : -d))
            : f.wheelDeltaX !== void 0
              ? (f.wheelDeltaX !== 0 && (u = f.wheelDeltaX > 0 ? -1 : 1),
                f.wheelDeltaY !== 0 && (d = f.wheelDeltaY > 0 ? -1 : 1),
                (c.delta = Math.abs(f.wheelDeltaX) > Math.abs(f.wheelDeltaY) ? -u : -d))
              : f.wheelDelta !== void 0 && f.wheelDelta !== 0 && (c.delta = f.wheelDelta > 0 ? 1 : -1),
          l.doMouseWheel(),
          l.Ta(c, f));
      }),
      (i._T = (f) => {
        if (!l.isEnabled) return;
        ((i.ac = false), l.uc(f, true));
        const c = l.currentTool;
        (c.cancelWaitAfter(), c.standardMouseOver());
      }),
      (i.mh = (f) => {
        if (!l.isEnabled) return;
        i.ac = true;
        const c = l.ib;
        c[f.pointerId] === void 0 && (c[f.pointerId] = f);
        const u = l.ka;
        let d = false;
        if (u[0] !== null && (u[0].pointerId === f.pointerId || u[0].pointerType !== f.pointerType)) u[0] = f;
        else if (u[1] !== null && u[1].pointerId === f.pointerId) ((u[1] = f), (d = true));
        else if (u[0] === null) u[0] = f;
        else if (u[1] === null) ((u[1] = f), (d = true));
        else {
          f.preventDefault();
          return;
        }
        const m = f.pointerType === "touch" || f.pointerType === "pen";
        m && ((l.Tx = false), (l.y0 = true));
        const g = l.mO(f, f, d),
          p = l.u2,
          y = m ? 25 : 10;
        if (
          (f.timeStamp - l.c2 < l.QT && !(Math.abs(p.x - f.screenX) > y || Math.abs(p.y - f.screenY) > y)
            ? l.p0++
            : (l.p0 = 1),
          (g.clickCount = l.p0),
          (l.c2 = f.timeStamp),
          l.u2.setTo(f.screenX, f.screenY),
          l.doMouseDown(),
          f.button === 1)
        ) {
          f.preventDefault();
          return;
        }
        l.Ta(g, f);
      }),
      (i.Ma = (f) => {
        if (!l.isEnabled) return;
        i.ac = true;
        const c = l.ka;
        if (c[0] !== null && (c[0].pointerId === f.pointerId || c[0].pointerType !== f.pointerType)) c[0] = f;
        else if (c[1] !== null && c[1].pointerId === f.pointerId) {
          c[1] = f;
          return;
        } else if (c[0] === null) c[0] = f;
        else return;
        if (c[0].pointerId !== f.pointerId) return;
        const u = l.pO(f, f, c[1] !== null);
        (l.doMouseMove(), l.Ta(u, f));
      }),
      (i.Na = (f) => {
        if (!l.isEnabled) return;
        i.ac = true;
        const c = f.pointerType === "touch" || f.pointerType === "pen",
          u = l.ib;
        if (c && l.Tx) {
          (delete u[f.pointerId], f.preventDefault());
          return;
        }
        const d = l.ka;
        if (d[0] !== null && (d[0].pointerId === f.pointerId || d[0].pointerType !== f.pointerType)) d[0] = null;
        else if (d[1] !== null && d[1].pointerId === f.pointerId) {
          d[1] = null;
          return;
        } else return;
        const m = l.P2(f, false, true, false, true, false);
        let g = root.document.elementFromPoint(f.clientX, f.clientY) || null;
        (g !== null && g.shadowRoot && (g = g.shadowRoot.elementFromPoint(f.clientX, f.clientY) || null),
          g !== null && g.f instanceof Diagram && g.f !== l && g.f.N0(f, m),
          g === null && (g = f.target),
          l.N0(f, m),
          (m.clickCount = l.p0),
          (m.targetDiagram = l.cb(f, g)),
          (m.targetObject = null),
          l.doMouseUp(),
          l.Ta(m, f),
          c && (l.y0 = false));
      }),
      (i.Ca = (f) => {
        if (!l.isEnabled) return;
        i.ac = false;
        const c = l.ib;
        c[f.pointerId] && delete c[f.pointerId];
        const u = l.ka;
        if (
          (u[0] !== null && u[0].pointerId === f.pointerId && (u[0] = null),
          u[1] !== null && u[1].pointerId === f.pointerId && (u[1] = null),
          f.pointerType === "touch" || f.pointerType === "pen")
        )
          return;
        const d = l.currentTool;
        (d.cancelWaitAfter(), d.standardMouseOver());
      }),
      (i.Aa = (f) => {
        const c = l.ka;
        c[0] !== null && c[0].pointerId === f.pointerId
          ? ((c[0] = null), (l.y0 = false))
          : c[1] !== null && c[1].pointerId === f.pointerId && (c[1] = null);
      }));
    if (
      (r.clearContextCache(true),
      i.yO(),
      this.rc === "svg")
    ) {
      const f = this.Ho.get("svg");
      (this.Lt && this.Lt.appendChild(f.Nt), (this._t = f.ni));
    }
  }
  addEventListener(t, i, e, s) {
    t.addEventListener(i, e, { capture: s, passive: false });
  }
  Kt(t, i, e, s) {
    t.addEventListener(i, e, { capture: s, passive: false });
  }
  removeEventListener(t, i, e, s) {
    t.removeEventListener(i, e, { capture: s });
  }
  Ii(t, i, e, s) {
    t.removeEventListener(i, e, { capture: s });
  }
  yO() {
    const t = this;
    let i = this.ut.Nt;
    (i instanceof HTMLCanvasElement || (i = t.div),
      this.Kt(i, "pointerdown", t.mh, false),
      this.Kt(i, "pointermove", t.Ma, false),
      this.Kt(i, "pointerup", t.Na, false),
      this.Kt(i, "pointerout", t.Ca, false),
      this.Kt(i, "pointercancel", t.Aa, false),
      this.Kt(i, "pointerenter", t.wO, false),
      this.Kt(i, "pointerleave", t.xO, false),
      this.Kt(i, "wheel", t.Pa, false),
      this.Kt(i, "keydown", t.bO, false),
      this.Kt(i, "keyup", t.SO, false),
      this.Kt(i, "blur", t.kO, false),
      this.Kt(i, "focus", t.PO, false),
      this.Kt(i, "selectstart", (e) => (e.preventDefault(), false), false),
      this.Kt(i, "contextmenu", (e) => (e.preventDefault(), false), false),
      this.Kt(root, "resize", t.nb, false));
  }
  Dx() {
    this.w0 > 30 && (this.Yl = 1);
  }
  bP(t) {
    this.Yl !== null &&
      ((this.Yl = null),
      t && this.Ku(),
      (Debug && Debug.drawFrames) || ((this.w0 = 0), (this.m2 = [0, 0, 0, 0, 0]), (this.x0 = 0)));
  }
  computePixelRatio() {
    return this.Yl !== null ? this.Yl : root.devicePixelRatio || 1;
  }
  get avgSpf() {
    return this.w0;
  }
  doMouseDown() {
    this.currentTool.doMouseDown();
  }
  doMouseMove() {
    this.currentTool.doMouseMove();
  }
  doMouseUp() {
    this.currentTool.doMouseUp();
  }
  doMouseWheel() {
    this.currentTool.doMouseWheel();
  }
  doKeyDown() {
    const t = this.commandHandler;
    if (!this.toggleKeyboardControl()) {
      if ((t.isFocusEnabled || t.isVirtualPointerEnabled) && t.doVirtualFocusKeyDown()) {
        const i = this.lastInput;
        i.bubbles = false;
        const e = i.event;
        e && (e.stopPropagation && e.stopPropagation(), e.cancelable !== false && e.preventDefault());
        return;
      }
      this.currentTool.doKeyDown();
    }
  }
  toggleKeyboardControl() {
    const t = this.lastInput,
      i = t.commandKey;
    if ((t.control || t.meta) && t.alt && (i === "Enter" || i === "NumpadEnter")) {
      const e = this.commandHandler,
        s = e.isFocusEnabled || e.isVirtualPointerEnabled;
      return (
        (e.isFocusEnabled = !s),
        (e.isVirtualPointerEnabled = !s),
        (e.focus = e.findFirstFocus()),
        this.F("FocusOrVirtualPointerEnabledChanged"),
        true
      );
    }
    return false;
  }
  doKeyUp() {
    const t = this.commandHandler;
    if ((t.isFocusEnabled || t.isVirtualPointerEnabled) && t.doVirtualFocusKeyUp()) {
      const i = this.lastInput;
      i.bubbles = false;
      const e = i.event;
      e && (e.stopPropagation && e.stopPropagation(), e.cancelable !== false && e.preventDefault());
      return;
    }
    this.currentTool.doKeyUp();
  }
  dd(t, i) {
    if (i) for (const e in i) e !== "sourceDiagram" && (t[e] = i[e]);
  }
  emitMouseDown(t, i, e, s) {
    if (typeof t != "number" || typeof i != "number")
      throw new Error("Robot.mouseDown first two args must be X,Y numbers");
    e === void 0 && (e = 0);
    let n = this;
    if ((s && s.sourceDiagram && (n = s.sourceDiagram), !n.isEnabled)) return this;
    const o = new InputEvent();
    return (
      (o.diagram = n),
      (o.documentPoint = new Point(t, i)),
      (o.viewPoint = n.transformDocToView(o.documentPoint)),
      (o.timestamp = e),
      (o.down = true),
      this.dd(o, s),
      (n.lastInput = o),
      (n.firstInput = o.copy()),
      n.doMouseDown(),
      this
    );
  }
  emitMouseMove(t, i, e, s) {
    if (typeof t != "number" || typeof i != "number")
      throw new Error("Robot.mouseMove first two args must be X,Y numbers");
    e === void 0 && (e = 0);
    let n = this;
    if ((s && s.sourceDiagram && (n = s.sourceDiagram), !n.isEnabled)) return this;
    const o = new InputEvent();
    return (
      (o.diagram = n),
      (o.documentPoint = new Point(t, i)),
      (o.viewPoint = n.transformDocToView(o.documentPoint)),
      (o.timestamp = e),
      this.dd(o, s),
      (n.lastInput = o),
      n.doMouseMove(),
      this
    );
  }
  emitMouseUp(t, i, e, s) {
    if (typeof t != "number" || typeof i != "number")
      throw new Error("Robot.mouseUp first two args must be X,Y numbers");
    e === void 0 && (e = 0);
    let n = this;
    if ((s && s.sourceDiagram && (n = s.sourceDiagram), !n.isEnabled)) return this;
    const o = new InputEvent();
    return (
      (o.diagram = n),
      (o.documentPoint = new Point(t, i)),
      (o.viewPoint = n.transformDocToView(o.documentPoint)),
      (o.timestamp = e),
      (o.up = true),
      n.firstInput.documentPoint.equals(o.documentPoint) && (o.clickCount = 1),
      this.dd(o, s),
      (n.lastInput = o),
      n.doMouseUp(),
      this
    );
  }
  emitMouseWheel(t, i, e) {
    if (typeof t != "number") throw new Error("Robot.mouseWheel first arg must be DELTA number");
    i === void 0 && (i = 0);
    const s = this;
    if (!s.isEnabled) return this;
    const n = new InputEvent();
    return (
      (n.diagram = s),
      (n.documentPoint = s.lastInput.documentPoint),
      (n.viewPoint = s.lastInput.viewPoint),
      (n.delta = t),
      (n.timestamp = i),
      this.dd(n, e),
      (s.lastInput = n),
      s.doMouseWheel(),
      this
    );
  }
  emitKeyDown(t, i, e) {
    if (typeof t != "string" && typeof t != "number")
      throw new Error("Robot.keyDown first arg must be a string or a number");
    i === void 0 && (i = 0);
    const s = this;
    if (!s.isEnabled) return this;
    const n = new InputEvent();
    return (
      (n.diagram = s),
      (n.documentPoint = s.lastInput.documentPoint),
      (n.viewPoint = s.lastInput.viewPoint),
      typeof t == "string" ? (n.key = t) : typeof t == "number" && (n.key = String.fromCharCode(t)),
      (n.timestamp = i),
      (n.down = true),
      this.dd(n, e),
      (s.lastInput = n),
      s.doKeyDown(),
      this
    );
  }
  emitKeyUp(t, i, e) {
    if (typeof t != "string" && typeof t != "number")
      throw new Error("Robot.keyUp first arg must be a string or a number");
    i === void 0 && (i = 0);
    const s = this;
    if (!s.isEnabled) return this;
    const n = new InputEvent();
    return (
      (n.diagram = s),
      (n.documentPoint = s.lastInput.documentPoint),
      (n.viewPoint = s.lastInput.viewPoint),
      typeof t == "string" ? (n.key = t) : typeof t == "number" && (n.key = String.fromCharCode(t)),
      (n.timestamp = i),
      (n.up = true),
      this.dd(n, e),
      (s.lastInput = n),
      s.doKeyUp(),
      this
    );
  }
  doFocus() {
    this.focus();
  }
  focus() {
    if (this.ut)
      if (this.scrollsPageOnFocus) this.ut.focus();
      else {
        const t = root.scrollX,
          i = root.scrollY;
        (this.ut.focus(), root.scrollTo(t, i));
      }
  }
  PO(t) {
    const i = Diagram._e.get(this);
    i && i.F("GainedFocus");
  }
  kO(t) {
    const i = Diagram._e.get(this);
    i && i.F("LostFocus");
  }
  TM() {
    if (this.ut === null) return;
    const i = this.Lt;
    if (i === null || i.clientWidth === 0 || i.clientHeight === 0) return;
    this.GM || this.setScrollWidth();
    const e = this.oo ? this.Qt : 0,
      s = this.Tn ? this.Qt : 0,
      n = this.te;
    if (
      ((this.te = this.computePixelRatio()),
      this.te !== n && ((this.ed = true), this.requestUpdate()),
      i.clientWidth !== this.Pt + e || i.clientHeight !== this.Mt + s)
    ) {
      (this.Da(), (this.Qe = true));
      const o = this.layout;
      (o !== null && o.isViewportSized && this.autoScale === 1 && ((this.sc = true), o.b()),
        this.Is || this.requestUpdate());
    }
  }
  sL() {
    let t = 0,
      i = new Layer();
    ((i.name = "Grid"),
      (i.allowSelect = false),
      (i.pickable = false),
      (i.isTemporary = true),
      (i.isInDocumentBounds = false),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = "ViewportBackground"),
      (i.isViewportAligned = true),
      (i.isTemporary = true),
      (i.isInDocumentBounds = false),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = "Background"),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = ""),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = "Foreground"),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = "ViewportForeground"),
      (i.isViewportAligned = true),
      (i.isTemporary = true),
      (i.isInDocumentBounds = false),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = "Adornment"),
      (i.isTemporary = true),
      (i.isInDocumentBounds = false),
      this.el(i, t++),
      (i = new Layer()),
      (i.name = "Tool"),
      (i.isTemporary = true),
      (i.isInDocumentBounds = true),
      this.el(i, t++));
  }
  cL() {
    const t = new Panel(Panel.Grid, { name: "GRID" }).add(
        new Shape("LineH", { stroke: "lightgray", strokeWidth: 0.5, interval: 1 }).theme("stroke", "gridMinor"),
        new Shape("LineV", { stroke: "lightgray", strokeWidth: 0.5, interval: 1 }).theme("stroke", "gridMinor"),
        new Shape("LineH", { stroke: "gray", strokeWidth: 0.5, interval: 5 }).theme("stroke", "gridMajor"),
        new Shape("LineV", { stroke: "gray", strokeWidth: 0.5, interval: 5 }).theme("stroke", "gridMajor"),
        new Shape("LineH", { stroke: "gray", strokeWidth: 1, interval: 10 }).theme("stroke", "gridMajor"),
        new Shape("LineV", { stroke: "gray", strokeWidth: 1, interval: 10 }).theme("stroke", "gridMajor"),
      ),
      i = new Part({
        layerName: "Grid",
        zOrder: 0,
        isInDocumentBounds: false,
        isAnimated: false,
        pickable: false,
        locationObjectName: "GRID",
      }).add(t);
    return (this.add(i), this.partManager.parts.delete(i), (t.visible = false), t);
  }
  static cO() {
    const t = Diagram._e.get(this.parentElement || this);
    if (t) {
      if (t.W1) {
        t.W1 = false;
        return;
      }
      if (!t.isEnabled) {
        t.uL();
        return;
      }
      t.diagramScroll(this);
    }
  }
  static uO(t) {
    if (!this.f.isEnabled) {
      this.f.updateScroll();
      return;
    }
    ((this.f.j1 = t.target.scrollTop), (this.f.J1 = t.target.scrollLeft));
  }
  diagramScroll(t) {
    if (this.ut === null) return;
    const i = this.eb,
      e = this.sb;
    this.h0 = true;
    let s = this.documentBounds,
      n = this.viewportBounds;
    const o = this.pa;
    let r = s.x - o.left,
      l = s.y - o.top;
    const h = s.width + o.left + o.right,
      a = s.height + o.top + o.bottom;
    let f = s.right + o.right,
      c = s.bottom + o.bottom,
      u = n.x,
      d = n.y;
    const m = n.width,
      g = n.height;
    let p = n.right,
      y = n.bottom;
    const x = this.scale;
    let b,
      S = t.scrollLeft;
    if (this.cd)
      switch (this.g1) {
        case "negative":
          S = S + t.scrollWidth - t.clientWidth;
          break;
        case "reverse":
          S = t.scrollWidth - S - t.clientWidth;
          break;
      }
    const k = S;
    if (m < h || g < a) {
      ((b = Point.U(this.position.x, this.position.y)),
        this.allowHorizontalScroll && this.J1 !== k && ((b.x = k / x + r), (this.J1 = k)),
        this.allowVerticalScroll && this.j1 !== t.scrollTop && ((b.y = t.scrollTop / x + l), (this.j1 = t.scrollTop)),
        (this.position = b),
        Point.o(b),
        (this.h0 = false),
        (this.rd = false));
      return;
    }
    if (
      ((b = Point.a()),
      t.dO && this.allowHorizontalScroll && (r < u && (this.position = b.e(k + r, this.position.y)), f > p))
    ) {
      const P = i.scrollWidth - this.Pt;
      this.position = b.e(-P + k - this.Pt / x + f, this.position.y);
    }
    if (t.gO && this.allowVerticalScroll && (l < d && (this.position = b.e(this.position.x, t.scrollTop + l)), c > y)) {
      const P = i.scrollHeight - this.Mt;
      this.position = b.e(this.position.x, -P + t.scrollTop - this.Mt / x + c);
    }
    (Point.o(b),
      this.sl(),
      (this.h0 = false),
      (this.rd = false),
      (s = this.documentBounds),
      (n = this.viewportBounds),
      (f = s.right),
      (p = n.right),
      (c = s.bottom),
      (y = n.bottom),
      (r = s.x),
      (u = n.x),
      (l = s.y),
      (d = n.y),
      m >= h && r >= u && f <= p && (e.style.width = "1px"),
      g >= a && l >= d && c <= y && (e.style.height = "1px"));
  }
  computeBounds(t) {
    return (t === void 0 && (t = new Rect()), this.Oi(), this.dL(t));
  }
  dL(t) {
    if (this.fixedBounds.isReal()) return (t.c(this.fixedBounds), t.addMargin(this.si), t);
    let i = true;
    const e = this.Gt.h,
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n];
      if (!o.visible || !o.isInDocumentBounds) continue;
      const r = o.Dt.h,
        l = r.length;
      for (let h = 0; h < l; h++) {
        const a = r[h];
        if (!a.isInDocumentBounds || !a.isVisible()) continue;
        const f = a.actualBounds;
        f.isReal() && (i ? ((i = false), t.c(f)) : t.unionRect(f));
      }
    }
    return (i && t.e(0, 0, 0, 0), t.addMargin(this.si), t);
  }
  computePartsBounds(t, i) {
    i === void 0 && (i = false);
    let e;
    if (Array.isArray(t))
      for (let s = 0; s < t.length; s++) {
        const n = t[s];
        (!i && n instanceof Link) ||
          (n.ensureBounds(), e === void 0 ? (e = n.actualBounds.copy()) : e.unionRect(n.actualBounds));
      }
    else {
      const s = t.iterator;
      for (; s.next(); ) {
        const n = s.value;
        (!i && n instanceof Link) ||
          (n.ensureBounds(), e === void 0 ? (e = n.actualBounds.copy()) : e.unionRect(n.actualBounds));
      }
    }
    return e === void 0 ? new Rect(NaN, NaN, 0, 0) : e;
  }
  tn(t) {
    if ((!t && !this.ro) || this.$t || this.ut === null || !this.documentBounds.isReal()) return;
    if (((this.$t = true), t)) {
      const c = this.initialPosition;
      if (c.isReal()) {
        ((this.$t = false), (this.position = c));
        return;
      }
      let u = this.initialDocumentSpot,
        d = this.initialViewportSpot;
      (u.isNoSpot() && (u = Spot.TopLeft), d.isNoSpot() && (d = Spot.TopLeft));
      const m = Point.a();
      m.setRectSpot(this.documentBounds, u);
      const g = this.viewportBounds,
        p = Rect.U(0, 0, g.width, g.height),
        y = Point.a();
      (y.setRectSpot(p, d), y.e(m.x - y.x, m.y - y.y), (this.$t = false), (this.position = y), Rect.o(p), Point.o(y));
    }
    let i = this.fh;
    t && this.zr !== 1 && (i = this.zr);
    const e = i !== 1 ? this.gd(i) : this.scale,
      s = this.yt.x,
      n = this.yt.y,
      o = this.Pt / e,
      r = this.Mt / e;
    let l = this.ic;
    const h = this.s0;
    if (t && !l.isSpot() && (h.isSpot() || h.isDefault())) {
      const c = this.initialDocumentSpot.isSpot() && this.initialViewportSpot.isSpot();
      l = h.isDefault() && !c ? Spot.Center : h;
    }
    this.M2(this.documentBounds, o, r, l, t);
    const a = this.scale;
    ((this.scale = e), (this.$t = false));
    const f = this.viewportBounds;
    f.equalsApproxTo(s, n, o, r) || this.onViewportBoundsChanged(new Rect(s, n, o, r), f, a, false);
  }
  gd(t) {
    const i = this.g0;
    if (this.ut === null) return i;
    if (t === 1) return this.scale;
    this.ensureBounds();
    const e = this.documentBounds;
    if (!e.isReal()) return i;
    const s = e.width,
      n = e.height,
      o = this.Pt + (this.oo ? this.Qt : 0),
      r = this.Mt + (this.Tn ? this.Qt : 0);
    let l = o / s,
      h = r / n;
    const a = this.pa,
      f = a.left + a.right !== 0,
      c = a.top + a.bottom !== 0;
    (f || c) &&
      (h === l
        ? ((h = (r - this.Qt) / n), (l = (o - this.Qt) / s))
        : h > l
          ? (h = (r - this.Qt) / n)
          : (l = (o - this.Qt) / s));
    let u = 0;
    return (
      t === 2 ? (u = Math.min(h, l)) : t === 3 && (h > l ? (u = (r - this.Qt) / n) : (u = (o - this.Qt) / s)),
      u > i && (u = i),
      u < this.minScale && (u = this.minScale),
      u > this.maxScale && (u = this.maxScale),
      u
    );
  }
  zoomToFit() {
    const t = this.da;
    ((this.da = 1),
      (this.scale = this.gd(2)),
      this.alignDocument(Spot.Center, Spot.Center),
      t !== 1 && (this.tn(false), this.M2(this.documentBounds, this.Pt / this.rt, this.Mt / this.rt, this.ic, false)),
      (this.da = t));
  }
  zoomToRect(t, i) {
    i === void 0 && (i = 2);
    const e = t.width,
      s = t.height;
    if (e === 0 || s === 0 || (isNaN(e) && isNaN(s))) return;
    let n = 1;
    if (i === 2 || i === 3)
      if (isNaN(e)) n = (this.viewportBounds.height * this.scale) / s;
      else if (isNaN(s)) n = (this.viewportBounds.width * this.scale) / e;
      else {
        const o = this.Pt,
          r = this.Mt;
        i === 3
          ? r / s > o / e
            ? (n = (r - (this.Tn ? this.Qt : 0)) / s)
            : (n = (o - (this.oo ? this.Qt : 0)) / e)
          : (n = Math.min(r / s, o / e));
      }
    ((this.scale = n), (this.position = new Point(t.x, t.y)));
  }
  get MO() {
    return this.$t;
  }
  set MO(t) {
    this.$t = t;
  }
  alignDocument(t, i) {
    this.ensureBounds();
    const e = this.documentBounds,
      s = this.viewportBounds;
    this.position = new Point(
      e.x + (t.x * e.width + t.offsetX) - (i.x * s.width - i.offsetX),
      e.y + (t.y * e.height + t.offsetY) - (i.y * s.height - i.offsetY),
    );
  }
  focusObject(t) {
    if (t instanceof GraphObject) {
      this.b0 = t;
      const i = Point.a();
      ((this.S0 = this.transformDocToView(t.getDocumentPoint(Spot.TopLeft, i))), Point.o(i));
    } else ((this.b0 = null), (this.S0 = Point.xn));
  }
  M2(t, i, e, s, n) {
    const o = Point.U(this.yt.x, this.yt.y);
    let r = o.x,
      l = o.y;
    if (this.b0 !== null) {
      let h = Point.a();
      ((h = this.b0.getDocumentPoint(Spot.TopLeft, h)),
        (r = h.x - this.S0.x / this.scale),
        (l = h.y - this.S0.y / this.scale),
        (s = Spot.None),
        Point.o(h));
    }
    if (n || this.scrollMode === 1) {
      s.isSpot() &&
        (i > t.width && (r = t.x + (s.x * t.width + s.offsetX) - (s.x * i - s.offsetX)),
        e > t.height && (l = t.y + (s.y * t.height + s.offsetY) - (s.y * e - s.offsetY)));
      const h = this.pa,
        a = i - t.width;
      if (i < t.width + h.left + h.right) {
        let c = r + i / 2;
        ((c = Math.min(c, t.right + Math.max(a, h.right) - i / 2)),
          (c = Math.max(c, t.left - Math.max(a, h.left) + i / 2)),
          (r = c - i / 2));
      } else r > t.left ? (r = t.left) : r < t.right - i && (r = t.right - i);
      const f = e - t.height;
      if (e < t.height + h.top + h.bottom) {
        let c = l + e / 2;
        ((c = Math.min(c, t.bottom + Math.max(f, h.bottom) - e / 2)),
          (c = Math.max(c, t.top - Math.max(f, h.top) + e / 2)),
          (l = c - e / 2));
      } else l > t.top ? (l = t.top) : l < t.bottom - e && (l = t.bottom - e);
    }
    if (
      ((o.x = isFinite(r) ? r : -this.si.left),
      (o.y = isFinite(l) ? l : -this.si.top),
      this.positionComputation !== null)
    ) {
      const h = this.positionComputation(this, o);
      ((o.x = h.x), (o.y = h.y));
    }
    (this.Ls.YT(this.yt, o), this.yt.e(o.x, o.y), this.C0(), this.ph(), this.N2(), Point.o(o));
  }
  findPartAt(t, i) {
    if ((i === void 0 && (i = true), i)) {
      const e = this.MP(
        t,
        (s) => s.part,
        (s) => s.canSelect(),
      );
      if (e instanceof Part) return e;
    } else {
      const e = this.MP(t, (s) => s.part);
      if (e instanceof Part) return e;
    }
    return null;
  }
  findObjectAt(t, i, e) {
    (i === void 0 && (i = null), e === void 0 && (e = null), this.Oi());
    const s = this.Gt.iteratorBackwards;
    for (; s.next(); ) {
      const n = s.value;
      if (!n.visible) continue;
      const o = n.findObjectAt(t, i, e);
      if (o !== null) return o;
    }
    return null;
  }
  MP(t, i, e) {
    (i === void 0 && (i = null), e === void 0 && (e = null), this.Oi());
    const s = this.Gt.iteratorBackwards;
    for (; s.next(); ) {
      const n = s.value;
      if (!n.visible || n.isTemporary) continue;
      const o = n.findObjectAt(t, i, e);
      if (o !== null) return o;
    }
    return null;
  }
  findPartsAt(t, i, e) {
    return (
      i === void 0 && (i = true),
      this.NO(t, (s) => s.part, i ? (s) => s instanceof Part && s.canSelect() : null, e)
    );
  }
  NO(t, i, e, s) {
    (i === void 0 && (i = null),
      e === void 0 && (e = null),
      !(s instanceof List) && !(s instanceof GSet) && (s = new GSet()),
      this.Oi());
    const n = this.Gt.iteratorBackwards;
    for (; n.next(); ) {
      const o = n.value;
      !o.visible || o.isTemporary || o.findObjectsAt(t, i, e, s);
    }
    return s;
  }
  findObjectsAt(t, i, e, s) {
    (i === void 0 && (i = null),
      e === void 0 && (e = null),
      !(s instanceof List) && !(s instanceof GSet) && (s = new GSet()),
      this.Oi());
    const n = this.Gt.iteratorBackwards;
    for (; n.next(); ) {
      const o = n.value;
      o.visible && o.findObjectsAt(t, i, e, s);
    }
    return s;
  }
  findPartsIn(t, i, e, s) {
    return (
      i === void 0 && (i = false),
      e === void 0 && (e = true),
      this.CO(t, null, (n) => n instanceof Part && (!e || n.canSelect()), i, s)
    );
  }
  findObjectsIn(t, i, e, s, n) {
    (i === void 0 && (i = null),
      e === void 0 && (e = null),
      s === void 0 && (s = false),
      !(n instanceof List) && !(n instanceof GSet) && (n = new GSet()),
      this.Oi());
    const o = this.Gt.iteratorBackwards;
    for (; o.next(); ) {
      const r = o.value;
      r.visible && r.findObjectsIn(t, i, e, s, n);
    }
    return n;
  }
  AP(t, i, e, s, n, o) {
    const r = new GSet();
    this.Oi();
    const l = this.Gt.iteratorBackwards;
    for (; l.next(); ) {
      const h = l.value;
      h.visible && h.AP(t, i, e, s, r, n, o);
    }
    return r;
  }
  CO(t, i, e, s, n) {
    (i === void 0 && (i = null),
      e === void 0 && (e = null),
      s === void 0 && (s = false),
      !(n instanceof List) && !(n instanceof GSet) && (n = new GSet()),
      this.Oi());
    const o = this.Gt.iteratorBackwards;
    for (; o.next(); ) {
      const r = o.value;
      !r.visible || r.isTemporary || r.findObjectsIn(t, i, e, s, n);
    }
    return n;
  }
  findPartsNear(t, i, e, s, n) {
    return (
      e === void 0 && (e = true),
      s === void 0 && (s = true),
      this.AO(t, i, null, (o) => o instanceof Part && (!s || o.canSelect()), e, n)
    );
  }
  findObjectsNear(t, i, e, s, n, o) {
    (e === void 0 && (e = null),
      s === void 0 && (s = null),
      n === void 0 && (n = true),
      n !== false && n !== true && ((n instanceof List || n instanceof GSet) && (o = n), (n = true)),
      !(o instanceof List) && !(o instanceof GSet) && (o = new GSet()),
      this.Oi());
    const r = this.Gt.iteratorBackwards;
    for (; r.next(); ) {
      const l = r.value;
      l.visible && l.findObjectsNear(t, i, e, s, n, o);
    }
    return o;
  }
  AO(t, i, e, s, n, o) {
    (e === void 0 && (e = null),
      s === void 0 && (s = null),
      n === void 0 && (n = true),
      n !== false && n !== true && ((n instanceof List || n instanceof GSet) && (o = n), (n = true)),
      !(o instanceof List) && !(o instanceof GSet) && (o = new GSet()),
      this.Oi());
    const r = this.Gt.iteratorBackwards;
    for (; r.next(); ) {
      const l = r.value;
      !l.visible || l.isTemporary || l.findObjectsNear(t, i, e, s, n, o);
    }
    return o;
  }
  acceptEvent(t) {
    return this.uc(t, t instanceof MouseEvent);
  }
  uc(t, i) {
    const e = this._r;
    ((this._r = this.xa),
      (this.xa = e),
      (e.diagram = this),
      (e.event = t),
      i ? this.N0(t, e) : ((e.viewPoint = this._r.viewPoint), (e.documentPoint = this._r.documentPoint)));
    let s = 0;
    const n = t;
    return (
      n.ctrlKey && (s += 1),
      n.altKey && (s += 2),
      n.shiftKey && (s += 4),
      n.metaKey && (s += 8),
      (e.modifiers = s),
      (e.button = n.button),
      n.buttons !== void 0 && (e.buttons = n.buttons),
      U.yr && n.button === 0 && n.ctrlKey && (e.button = 2),
      (e.down = false),
      (e.up = false),
      (e.clickCount = 1),
      (e.delta = 0),
      (e.handled = false),
      (e.bubbles = false),
      (e.timestamp = t.timeStamp),
      (e.isMultiTouch = false),
      (e.targetDiagram = this.cb(t, t.target)),
      (e.targetObject = null),
      e
    );
  }
  cb(t, i) {
    if (i === null) return null;
    const e = Diagram._e.get(i);
    if (e) return e;
    let s = t.path;
    if ((!s && U.lt(t.composedPath) && (s = t.composedPath()), s && s[0])) {
      const n = Diagram._e.get(s[0]);
      if (n) return n;
    }
    return null;
  }
  mO(t, i, e) {
    const s = this.P2(t, true, false, false, true, e);
    return (this.N0(i, s), (s.targetDiagram = this.cb(t, t.target)), (s.targetObject = null), e || s.clone(this.d0), s);
  }
  pO(t, i, e) {
    const s = this.P2(t, false, false, false, false, e);
    let n = root.document.elementFromPoint(i.clientX, i.clientY) || null;
    n !== null && n.shadowRoot && (n = n.shadowRoot.elementFromPoint(i.clientX, i.clientY) || null);
    let o = this,
      r = t;
    if (n) {
      const l = this.cb(t, n);
      l && ((r = i), (o = l));
    }
    return ((s.targetDiagram = o), this.N0(r, s), (s.targetObject = null), s);
  }
  P2(t, i, e, s, n, o) {
    const r = this._r;
    ((this._r = this.xa), (this.xa = r), (r.diagram = this), (r.clickCount = 1), (r.delta = 0));
    let l = 0;
    return (
      t.ctrlKey && (l += 1),
      t.altKey && (l += 2),
      t.shiftKey && (l += 4),
      t.metaKey && (l += 8),
      (r.modifiers = l),
      (r.event = t),
      (r.timestamp = t.timeStamp),
      (r.button = e ? this.firstInput.button : t.button),
      (r.buttons = t.buttons),
      U.yr && t.button === 0 && t.ctrlKey && (r.button = 2),
      (r.down = i),
      (r.up = e),
      (r.handled = s),
      (r.bubbles = n),
      (r.isMultiTouch = o),
      r
    );
  }
  Ta(t, i) {
    return t.bubbles
      ? (Debug && Debug.handleMessages && U.ot("NOT handled " + i.type + " " + t.toString()), true)
      : (Debug && Debug.handleMessages && U.ot("handled " + i.type + " " + this.currentTool.name + " " + t.toString()),
        i.stopPropagation !== void 0 && i.stopPropagation(),
        i.cancelable !== false && i.preventDefault(),
        (i.cancelBubble = true),
        false);
  }
  bO(t) {
    const i = Diagram._e.get(this);
    if (!i || !i.isEnabled) return false;
    const e = i.uc(t, false);
    return ((e.key = t.key), (e.code = t.code), (e.down = true), i.doKeyDown(), i.Ta(e, t));
  }
  SO(t) {
    const i = Diagram._e.get(this);
    if (!i || !i.isEnabled) return false;
    const e = i.uc(t, false);
    return ((e.key = t.key), (e.code = t.code), (e.up = true), i.doKeyUp(), i.Ta(e, t));
  }
  wO(t) {
    const i = Diagram._e.get(this);
    if (!i || !i.isEnabled) return false;
    const e = i.uc(t, true);
    return (i.mouseEnter !== null && i.mouseEnter(e), i.currentTool.standardMouseOver(), i.Ta(e, t));
  }
  xO(t) {
    const i = Diagram._e.get(this);
    if (!i || !i.isEnabled) return false;
    const e = i.uc(t, true);
    return (i.mouseLeave !== null && i.mouseLeave(e), i.Ta(e, t));
  }
  getMouse(t) {
    const i = this.ut;
    if (i === null) return new Point(0, 0);
    const e = i.getBoundingClientRect(),
      s = (t.clientX - e.left) * (this.Pt / e.width),
      n = (t.clientY - e.top) * (this.Mt / e.height);
    return new Point(s, n).Je(this.E);
  }
  N0(t, i) {
    const e = this.ut;
    let s = 0,
      n = 0;
    if (e !== null) {
      const r = e.getBoundingClientRect();
      ((s = (t.clientX - r.left) * (this.Pt / r.width)), (n = (t.clientY - r.top) * (this.Mt / r.height)));
    }
    i.viewPoint.e(s, n);
    const o = Point.U(s, n);
    (this.E.De(o), i.documentPoint.c(o), Point.o(o));
  }
  nT(t, i, e) {
    let s;
    if (this.ka[0] !== null) s = this.ka[i];
    else return;
    const n = this.ut;
    if (n !== null) {
      const o = n.getBoundingClientRect();
      e.e((s.clientX - o.left) * (this.Pt / o.width), (s.clientY - o.top) * (this.Mt / o.height));
    }
  }
  invalidateDocumentBounds() {
    this.ba || ((this.ba = true), this.requestUpdate(false));
  }
  TO() {
    (this.Is || this.Oi(), this.ensureBounds());
  }
  redraw() {
    this.$t || this.Is || (this.L(), this.maybeUpdate());
  }
  isUpdateRequested() {
    return this.Or;
  }
  delayInitialization(t) {
    t === void 0 && (t = null);
    const i = this.animationManager,
      e = i.isEnabled;
    (i.stopAnimation(),
      (i.isEnabled = false),
      this.Ar(),
      (this.ro = false),
      (this.Zx = new Point(NaN, NaN)),
      (i.isEnabled = e),
      (this.Is = true));
    const s = this;
    t !== null &&
      U.yn(() => {
        ((s.Is = false), i.jl("Model"), t(s));
      }, 1);
  }
  requestUpdate(t) {
    if ((t === void 0 && (t = false), this.Or === true || this.$t || (t === false && this.Is))) return;
    this.Or = true;
    const i = this;
    root.requestAnimationFrame(() => {
      i.Or && i.maybeUpdate();
    });
  }
  maybeUpdate() {
    (this.sd && !this.Or) || (this.sd && (this.sd = false), this.Ar());
  }
  C2(t, i) {
    !this.rd ||
      this.$t ||
      this.animationManager.defaultAnimation.isAnimating ||
      this.uL() ||
      (t && this.Oi(), i && this.tn(false));
  }
  Ar(t) {
    if (this.Is || ((this.Or = false), this.Lt === null && !this.ld.isReal())) return;
    this.Is = true;
    const i = this.animationManager,
      e = this.fd;
    if (!i.isAnimating && e.length !== 0) {
      const f = e.h,
        c = f.length;
      for (let u = 0; u < c; u++) {
        const d = f[u];
        (d.ke(false), d.g());
      }
      e.clear();
    }
    const s = this.f2;
    s.count > 0 && (s.each((f) => f.A2()), s.clear());
    let n = false,
      o = false;
    (i.defaultAnimation.isAnimating && ((o = true), (n = this.skipsUndoManager), (this.skipsUndoManager = true)),
      i.Ni || this.TM(),
      t || this.C2(false, true));
    const r = !this.undoManager.isUndoingRedoing && (this.zl || (this.cc.count !== 0 && this.Xr.size !== 0)),
      l = !this.ro || this.tl;
    this.Oi(true);
    let h = false;
    ((l || r) &&
      (this.ro
        ? this.T2(!this.sc, r)
        : (this.startTransaction("Initial Layout"), i.isEnabled === false && i.stopAnimation(), this.T2(false, r)),
      (h = l)),
      (this.sc = false),
      (this.zl = false),
      this.Oi(),
      this.E1 || this.TO(),
      t || this.C2(true, false));
    let a = false;
    if (h) {
      const f = Rect.a();
      (f.c(this.viewportBounds),
        this.ro ||
          ((this.ro = true),
          (a = true),
          this.skipsUndoManager || (this.undoManager.Cx = true),
          (this.undoManager.Ax = true),
          this.LO()),
        this.DO(),
        this.Oi(false),
        t || this.C2(true, true),
        Rect.o(f));
    } else if (i.vf && i.$x) {
      if (this.zr !== 1) this.scale = this.gd(this.zr);
      else if (this.fh !== 1) this.scale = this.gd(this.fh);
      else {
        const f = this.initialScale;
        isFinite(f) && f > 0 && (this.scale = f);
      }
      this.tn(true);
    }
    (h && a && this.commitTransaction("Initial Layout"),
      this.cs !== null &&
        (this.cs.visible && !this.oc && (this.L2(), (this.oc = true)), !this.cs.visible && this.oc && (this.oc = false)),
      t || this.vi(this._t),
      o && (this.skipsUndoManager = n),
      (this.Is = false));
  }
  get oa() {
    return this.ro;
  }
  LO() {
    if (this.zr !== 1) this.scale = this.gd(this.zr);
    else if (this.fh !== 1) this.scale = this.gd(this.fh);
    else {
      const i = this.initialScale;
      isFinite(i) && i > 0 && (this.scale = i);
    }
    this.tn(true);
    const t = this.Gt.h;
    (this.fs(t, t.length, this, this.viewportBounds), this.F("InitialLayoutCompleted"), this.Zx.c(this.yt), this.md());
  }
  DO() {
    this.F("LayoutCompleted");
  }
  A0(t) {
    this.An.add(t);
  }
  addInvalidRoute(t) {
    this.Uo ? this.ya.add(t) : this.Xr.add(t);
  }
  Oi(t) {
    if (this.An.size === 0 || (!this.Is && this.animationManager.isTicking)) return;
    this.Is || (this.zl = true);
    let i = false;
    for (const e of this.An) {
      const s = e.layer;
      if (s !== null && s.isViewportAligned) {
        i = true;
        break;
      }
    }
    if (t) {
      (this.gL(this.An), i && this.N2());
      return;
    }
    for (let e = 0; e < 23 && this.An.size !== 0; e++) {
      const s = new Set(this.An);
      (this.An.clear(), this.A2(s, this.An), Debug && e === 22 && U.ot("failure to validate parts"));
    }
    (this.nodes.each((e) => {
      e instanceof Group && e.mL(false);
    }),
      i && this.N2());
  }
  gL(t, i) {
    for (const e of t) !e.Oe() || e instanceof Group || (e.nl() ? (e.gt(1 / 0, 1 / 0), e.Ut()) : i && i.add(e));
    for (const e of t)
      if (e instanceof Group) {
        if (!e.isVisible()) continue;
        this.ub(e);
      }
  }
  A2(t, i) {
    this.gL(t, i);
    for (const e of t) {
      if (!(e instanceof Link)) continue;
      const s = e;
      s.isVisible() && (s.nl() ? (s.gt(1 / 0, 1 / 0), s.Ut()) : i.add(s));
    }
    for (const e of t) e instanceof Adornment && e.isVisible() && (e.nl() ? (e.gt(1 / 0, 1 / 0), e.Ut()) : i.add(e));
  }
  pd(t) {
    const i = t instanceof Diagram,
      e = i ? t.links : t.memberParts,
      s = this.An;
    if (i) this.Oi(true);
    else {
      for (; e.next(); ) {
        const n = e.value;
        s.has(n) && (!n.Oe() || n instanceof Group || (n.nl() && (n.gt(1 / 0, 1 / 0), n.Ut())));
      }
      for (e.reset(); e.next(); ) {
        const n = e.value;
        if (s.has(n) && n instanceof Group) {
          if (!n.isVisible()) continue;
          this.ub(n);
        }
      }
      e.reset();
    }
    for (; e.next(); ) {
      const n = e.value;
      n instanceof Link && s.has(n) && n.isVisible() && n.nl() && (n.gt(1 / 0, 1 / 0), n.Ut());
    }
  }
  ub(t) {
    const i = U.ht(),
      e = U.ht(),
      s = t.memberParts;
    for (; s.next(); ) {
      const o = s.value;
      o.isVisible() &&
        (o instanceof Group
          ? (o.vo() || o.us() || o.yh()) && this.ub(o)
          : o instanceof Link
            ? o.fromNode === t || o.toNode === t
              ? e.push(o)
              : i.push(o)
            : (o.gt(1 / 0, 1 / 0), o.Ut()));
    }
    let n = i.length;
    for (let o = 0; o < n; o++) {
      const r = i[o];
      (r.gt(1 / 0, 1 / 0), r.Ut());
    }
    (U.et(i), t.gt(1 / 0, 1 / 0), t.Ut(), (n = e.length));
    for (let o = 0; o < n; o++) {
      const r = e[o];
      (r.gt(1 / 0, 1 / 0), r.Ut());
    }
    U.et(e);
  }
  fs(t, i, e, s) {
    if (!(!this.lc && !this.animationManager.isAnimating)) {
      for (let n = 0; n < i; n++) t[n].fs(e, s);
      this.Oi();
    }
  }
  vi(t) {
    if (this.Lt === null) return;
    (this.ut === null && U.n("No canvas specified"), this.rc === "svg" ? this.FO(t) : this.IO(t));
  }
  IO(t) {
    const i = this.animationManager;
    if (i.Ni || (i.isAnimating && !i.isTicking)) return;
    const e = new Date();
    if ((this.T0(), this.Lt && this.Lt.style.opacity === "0")) return;
    const s = t !== this._t,
      n = this.Gt.h,
      o = n.length,
      r = this;
    if ((this.fs(n, o, r, r.viewportBounds), s)) (t.clearContextCache(true), this.sl());
    else if (!this.Qe && !i.isAnimating) return;
    const l = this.E,
      h = this.te;
    (t.setTransform(h, 0, 0, h, 0, 0),
      t.clearRect(0, 0, this.Pt, this.Mt),
      this.ei !== 1 && (t.globalAlpha = this.ei),
      this.D2(t));
    for (let m = 0; m < o; m++)
      (t.setTransform(h, 0, 0, h, 0, 0),
        t.transform(l.m11, l.m12, l.m21, l.m22, l.dx, l.dy),
        t.commitTransform(),
        n[m].vi(t, r));
    let a = false;
    (s ? (this._t.clearContextCache(true), this.sl()) : ((this.lc = false), (this.Qe = false)));
    const c = +new Date() - +e,
      u = Debug && Debug.drawFrames,
      d = this.m2;
    if (u || this.Yl === null) {
      ((d[this.x0] = c), (this.x0 = (this.x0 + 1) % d.length));
      let m = 0;
      for (let g = 0; g < d.length; g++) m += d[g];
      this.w0 = m / d.length;
    }
    if ((this.ei !== 1 && (t.globalAlpha = 1), u)) {
      t.setTransform(1, 0, 0, 1, 0, 0);
      for (let m = 0; m < d.length; m++) t.fillText(d[m].toString(), 20, 150 + +(m * 20));
    }
  }
  FO(t) {
    if (this.Lt === null) return;
    const i = this.animationManager;
    if (i.Ni || (i.isAnimating && !i.isTicking)) return;
    this.T0();
    const e = this.Pt,
      s = this.Mt;
    t.surface.resize(e, s, e, s);
    const o = this.Gt.h,
      r = o.length,
      l = this;
    if ((this.fs(o, r, l, l.viewportBounds), !this.Qe && !i.isAnimating)) return;
    const h = this.E;
    ((t.lastDrawnPart = null),
      t.setDiagramPosScale(h.m11, h.m12, h.m21, h.m22, h.dx, h.dy),
      this.ei !== 1 && (t.globalAlpha = this.ei),
      this.D2(t));
    const a = this.te,
      f = this.ut.ni;
    (f.setTransform(a, 0, 0, a, 0, 0), f.clearRect(0, 0, this.Pt, this.Mt));
    for (let u = 0; u < r; u++) o[u].vi(t, l);
    let c = false;
    ((this.lc = false),
      (this.Qe = false));
  }
  db(t, i, e, s, n, o, r, l, h) {
    (o === void 0 && (o = null),
      r === void 0 && (r = null),
      l === void 0 && (l = false),
      h === void 0 && (h = false),
      this.T0(),
      t.clearContextCache(true),
      this.sl(),
      (this.Sa = true));
    const a = this.rt;
    this.rt = s;
    const f = this,
      c = this.Gt.h,
      u = c.length;
    try {
      const d = new Rect(n.x, n.y, e.width / s, e.height / s),
        m = d.copy();
      (m.addMargin(i),
        this.L2(m),
        this.Oi(),
        this.fs(c, u, f, d),
        t.setTransform(1, 0, 0, 1, 0, 0),
        t.clearRect(0, 0, e.width, e.height),
        r !== null && r !== "" && ((t.fillStyle = r), t.fillBackground(0, 0, e.width, e.height)));
      const g = Transform.a();
      (g.Ki(),
        g.vs(i.left, i.top),
        g.rt(s),
        (n.x !== 0 || n.y !== 0) && g.vs(-n.x, -n.y),
        t.setTransform(g.m11, g.m12, g.m21, g.m22, g.dx, g.dy),
        t.commitTransform(),
        t instanceof SVGContext && t.setDiagramPosScale(g.m11, g.m12, g.m21, g.m22, g.dx, g.dy),
        Transform.o(g),
        this.D2(t),
        (t.globalAlpha = this.ei));
      const p = this.findLayer("Grid");
      if (o) {
        const y = new GSet(),
          x = o.iterator;
        for (x.reset(); x.next(); ) {
          const b = x.value;
          b instanceof Part && ((!h && b.layer === p) || (b.tc(), y.add(b)));
        }
        for (let b = 0; b < u; b++) c[b].qR(t, f, y, l);
        y.each((b) => b.tc());
      } else
        for (let y = 0; y < u; y++) {
          const x = c[y];
          x === p ? h && x.vi(t, f, true) : x.vi(t, f, l);
        }
      (this.Sa = false);
    } finally {
      ((this.rt = a),
        t.clearContextCache(true),
        this.sl(),
        this.fs(c, u, f, f.viewportBounds),
        this.md(),
        this._t instanceof SVGContext && (this._t.diagramGroup.replaceChildren(), this.redraw()));
    }
  }
  getRenderingHint(t) {
    return this.Br[t];
  }
  setRenderingHint(t, i) {
    (t === "minDrawingLength" && (this.t0 = i), (this.Br[t] = i), this.redraw());
  }
  resetRenderingHints() {
    ((this.Br = new PropertyCollection()),
      (this.Br.drawShadows = true),
      (this.Br.textGreeking = true),
      (this.Br.viewportOptimizations = !U.yr),
      (this.Br.temporaryPixelRatio = true),
      (this.Br.pictureRatioOptimization = true),
      (this.Br.minDrawingLength = 1),
      (this.t0 = 1));
  }
  D2(t) {
    const i = this.Br;
    if (i === null) return;
    if (i.imageSmoothingEnabled !== void 0) {
      const s = !!i.imageSmoothingEnabled;
      t.setImageSmoothingEnabled(s);
    }
    const e = i.defaultFont;
    e != null && (t.font = e);
  }
  getInputOption(t) {
    return this.td[t];
  }
  setInputOption(t, i) {
    this.td[t] = i;
  }
  rO() {
    ((this.td = new PropertyCollection()),
      (this.td.extraTouchArea = 10),
      (this.td.extraTouchThreshold = 10),
      (this.td.hasGestureZoom = true));
  }
  set(t) {
    if (!t) return this;
    if (Debug)
      for (const i in t)
        (i.startsWith("_") || i.indexOf(".") !== -1) &&
          U.n("Property with underscore or period passed to Diagram.set. Did you mean to use Diagram.assign?");
    return (Object.assign(this, t), this);
  }
  attach(t) {
    return this.setProperties(t);
  }
  setProperties(t) {
    return (Diagram.L0(this, t), this);
  }
  static L0(t, i) {
    if (!i) return;
    const e = t instanceof Panel,
      s = t instanceof Diagram;
    for (const n in i) {
      n === "" && U.n("Setting properties requires non-empty property names");
      let o = t,
        r = n;
      if (e || s) {
        const h = n.indexOf(".");
        if (h > 0) {
          const a = n.substring(0, h);
          (e ? (o = t.findObject(a)) : ((o = t[a]), o == null && (o = t.toolManager[a])),
            U.it(o)
              ? (r = n.substring(h + 1))
              : U.n(
                  "Unable to find object named: " + a + " in " + t.toString() + " when trying to set property: " + n,
                ));
        }
      }
      if (r[0] !== "_" && !U.Ww(o, r))
        if (s && r === "ModelChanged") {
          t.addModelChangedListener(i[r]);
          continue;
        } else if (s && r === "Changed") {
          t.addChangedListener(i[r]);
          continue;
        } else if (s && U.Ww(t.toolManager, r)) o = t.toolManager;
        else if (s && t.pL(r)) {
          t.addDiagramListener(r, i[r]);
          continue;
        } else if (t instanceof Model && r === "Changed") {
          t.addChangedListener(i[r]);
          continue;
        } else U.n('Trying to set undefined property "' + r + '" on object: ' + o.toString());
      const l = i[n];
      ((o[r] = l), r[0] === "_" && o instanceof GraphObject && o.addCopyProperty(r));
    }
  }
  GT() {
    if (this.gh.count !== 0 && !(this.undoManager.transactionLevel > 1)) {
      for (; this.gh.count > 0; ) {
        const t = this.gh;
        this.gh = new GMap();
        const i = t.iterator;
        for (; i.next(); ) {
          const e = i.key;
          (e.invalidateOtherJumpOvers(i.value), e.ce());
        }
      }
      this.L();
    }
  }
  L(t) {
    if (t === void 0) ((this.Qe = true), this.requestUpdate());
    else {
      const i = this.viewportBounds;
      t.isReal() && i.intersectsRect(t) && ((this.Qe = true), this.requestUpdate());
    }
    this.F("InvalidateDraw");
  }
  invalidateViewport(t, i) {
    if (this.Qe === true) return;
    if (((this.Qe = true), this.rc === "svg")) {
      this.maybeUpdate();
      return;
    }
    this.getRenderingHint("temporaryPixelRatio") === true
      ? (this.Dx(), this.maybeUpdate(), this.bP(true))
      : this.maybeUpdate();
  }
  Da() {
    this.rd = true;
  }
  sl() {
    this.lc = true;
  }
  T0() {
    this.ed !== false && ((this.ed = false), this.fL(this.Pt, this.Mt));
  }
  fL(t, i) {
    this.ph();
    const e = this.te,
      s = t * e,
      n = i * e;
    this.ut.resize(s, n, t, i) && ((this.Qe = true), this._t.clearContextCache(true));
  }
  uL() {
    const t = this.ut;
    if (t === null || this.ld.isReal()) return true;
    const i = this.Pt,
      e = this.Mt,
      s = this.Lt;
    let n = false,
      o = this.oo ? this.Qt : 0,
      r = this.Tn ? this.Qt : 0,
      l = s.clientWidth || i + o,
      h = s.clientHeight || e + r;
    const a = this.viewportBounds,
      f = a.x,
      c = a.y,
      u = a.width,
      d = a.height;
    if (
      ((l !== i + o || h !== e + r) &&
        ((this.oo = false),
        (this.Tn = false),
        (o = 0),
        (r = 0),
        (this.Pt = l),
        (this.Mt = h),
        (this.ed = true),
        (n = true),
        this.ph()),
      !this.ro || !this.viewportBounds.isReal())
    )
      return true;
    const m = this.eb,
      g = this.sb;
    if (((this.rd = false), !n && !this.oo && !this.Tn && !this.nd && !this.od)) return true;
    const p = this.documentBounds;
    let y = 0,
      x = 0,
      b = 0,
      S = 0;
    const k = a.width,
      P = a.height,
      A = this.pa;
    this.contentAlignment.isSpot()
      ? (p.width > k && ((y = A.left), (x = A.right)), p.height > P && ((b = A.top), (S = A.bottom)))
      : ((y = A.left), (x = A.right), (b = A.top), (S = A.bottom));
    const C = p.width + y + x,
      M = p.height + b + S,
      N = this.scale,
      T = N;
    let L = C > l / N,
      D = M > h / N;
    if (!n && !this.oo && !this.Tn && !L && !D) return true;
    const F = p.x - y,
      R = a.x,
      I = p.right + x;
    let O = a.right + o;
    const X = p.y - b,
      K = a.y,
      V = p.bottom + S;
    let Y = a.bottom + r,
      z = "1px",
      H = "1px";
    if (this.scrollMode === 1 && (L || D)) {
      if (L && this.hasHorizontalScrollbar && this.allowHorizontalScroll) {
        let B = 1;
        (F + 1 < R && (B = Math.max((R - F) * N + this.Pt, B)),
          I > O + 1 && (B = Math.max((I - O) * N + this.Pt, B)),
          k + o + 1 < C && (B = Math.max((C - k) * N + this.Pt, B)),
          (z = B.toString() + "px"));
      }
      if (D && this.hasVerticalScrollbar && this.allowVerticalScroll) {
        let B = 1;
        (X + 1 < K && (B = Math.max((K - X) * N + this.Mt, B)),
          V > Y + 1 && (B = Math.max((V - Y) * N + this.Mt, B)),
          P + r + 1 < M && (B = Math.max((M - P) * N + this.Mt, B)),
          (H = B.toString() + "px"));
      }
    }
    let W = z !== "1px",
      j = H !== "1px";
    if (!(W && j) && (W || j)) {
      if (
        ((L = !(C < k + o)),
        (D = !(M < P + r)),
        j && (O -= this.Qt),
        W && (Y -= this.Qt),
        L && this.hasHorizontalScrollbar && this.allowHorizontalScroll)
      ) {
        let $ = 1;
        (F + 1 < R && ($ = Math.max((R - F) * N + this.Pt, $)),
          I > O + 1 && ($ = Math.max((I - O) * N + this.Pt, $)),
          k + 1 < C && ($ = Math.max((C - k) * N + this.Pt, $)),
          (z = $.toString() + "px"));
      }
      W = z !== "1px";
      let B = this.Mt;
      if (
        (W !== this.Tn && (B = W ? this.Mt - this.Qt : this.Mt + this.Qt),
        D && this.hasVerticalScrollbar && this.allowVerticalScroll)
      ) {
        let $ = 1;
        (X + 1 < K && ($ = Math.max((K - X) * N + B, $)),
          V > Y + 1 && ($ = Math.max((V - Y) * N + B, $)),
          P + 1 < M && ($ = Math.max((M - P) * N + B, $)),
          (H = $.toString() + "px"));
      }
      j = H !== "1px";
    }
    if (this.h0 && !(W !== this.Tn || j !== this.oo))
      return ((i !== this.Pt || e !== this.Mt) && this.maybeUpdate(), false);
    if (
      (W !== this.Tn &&
        (z === "1px" ? (this.Mt = this.Mt + this.Qt) : (this.Mt = Math.max(this.Mt - this.Qt, 1)), (n = true)),
      (this.Tn = W),
      (g.style.width = z),
      j !== this.oo &&
        (H === "1px" ? (this.Pt = this.Pt + this.Qt) : (this.Pt = Math.max(this.Pt - this.Qt, 1)), (n = true), this.cd))
    ) {
      const B = Point.a();
      (j
        ? ((t.style.left = this.Qt + "px"), (this.position = B.e(this.yt.x + this.Qt / this.scale, this.yt.y)))
        : ((t.style.left = "0px"), (this.position = B.e(this.yt.x - this.Qt / this.scale, this.yt.y))),
        Point.o(B));
    }
    (n && this.ph(), (this.oo = j), (g.style.height = H), (this.W1 = true), n && (this.ed = true));
    let Z = m.scrollLeft;
    if (
      (this.hasHorizontalScrollbar &&
        this.allowHorizontalScroll &&
        (k + 1 < C
          ? (Z = (this.position.x - F) * N)
          : F + 1 < R
            ? (Z = m.scrollWidth - m.clientWidth)
            : I > O + 1 && (Z = this.position.x * N)),
      this.cd)
    )
      switch (this.g1) {
        case "negative":
          Z = -(m.scrollWidth - Z - m.clientWidth);
          break;
        case "reverse":
          Z = m.scrollWidth - Z - m.clientWidth;
          break;
      }
    if (
      ((m.scrollLeft = Z),
      this.hasVerticalScrollbar &&
        this.allowVerticalScroll &&
        (P + 1 < M
          ? (m.scrollTop = (this.position.y - X) * N)
          : X + 1 < K
            ? (m.scrollTop = m.scrollHeight - m.clientHeight)
            : V > Y + 1 && (m.scrollTop = this.position.y * N)),
      (l = this.Pt),
      (h = this.Mt),
      (m.style.width = l + (this.oo ? this.Qt : 0) + "px"),
      (m.style.height = h + (this.Tn ? this.Qt : 0) + "px"),
      i !== l || e !== h || this.animationManager.Ni)
    ) {
      const B = Rect.U(f, c, u, d);
      return (this.onViewportBoundsChanged(B, this.viewportBounds, T, n), Rect.o(B), false);
    }
    return true;
  }
  add(t) {
    U.s(t, Part, Diagram, "add:part");
    const i = t.diagram;
    if (i === this) return;
    i !== null &&
      U.n("Cannot add part " + t.toString() + " to " + this.toString() + ". It is already a part of " + i.toString());
    let e = this.findLayer(t.layerName);
    if (
      (e === null && (e = this.findLayer("")),
      e === null &&
        U.n('Cannot add a Part when unable find a Layer named "' + t.layerName + '" and there is no default Layer'),
      t.layer === e)
    )
      return;
    const s = e.ma(99999999, t, t.diagram === this);
    (s >= 0 && this.raiseChangedEvent(3, "parts", e, null, t, null, s),
      e.isTemporary || this.invalidateDocumentBounds(),
      t.invalidateLayout(1));
    const n = t.layerChanged;
    n !== null && n(t, null, e);
  }
  ma(t) {
    this.partManager.ma(t);
    const i = this;
    (Diagram.isUsingDOM() && t.Ln((s) => i.yL(s)),
      t.data || t.Wo(),
      t.hasPlaceholder() && t.g(),
      t.data !== null && t.Ln((s) => i.partManager.F2(s, null)),
      (t.us() === true || t.yh() === true) && this.A0(t),
      t.wL(true, this),
      t instanceof Node && t.canAvoid() && this.yd(t),
      t.xL()
        ? (t.actualBounds.isReal() && this.L(t.ga(t.actualBounds)), this.invalidateDocumentBounds())
        : t.isVisible() && t.actualBounds.isReal() && this.L(t.ga(t.actualBounds)),
      this.k0 !== null && this.k0(this, t),
      this.requestUpdate());
  }
  ae(t) {
    (t.clearAdornments(), this.partManager.ae(t));
    const i = this;
    (t.data !== null && t.Ln((s) => i.partManager.I2(s, i)),
      this.An.delete(t),
      t instanceof Link ? this.Xr.delete(t) : t instanceof Node && t.canAvoid() && this.yd(t),
      t.xL()
        ? (t.actualBounds.isReal() && this.L(t.ga(t.actualBounds)), this.invalidateDocumentBounds())
        : t.isVisible() && t.actualBounds.isReal() && this.L(t.ga(t.actualBounds)),
      this.P0 !== null && this.P0(this, t),
      this.requestUpdate());
  }
  remove(t) {
    (U.s(t, Part, Diagram, "remove:part"), this.R2(t, true));
  }
  R2(t, i) {
    const e = t.layer;
    if (e === null || e.diagram !== this) return;
    ((t.isSelected = false), (t.isHighlighted = false), t.invalidateLayout(2), i && t.dc());
    const s = e.ae(-1, t, false);
    s >= 0 && this.raiseChangedEvent(4, "parts", e, t, null, s, null);
    const n = t.layerChanged;
    n !== null && n(t, e, null);
  }
  removeParts(t, i) {
    if ((i === void 0 && (i = false), Array.isArray(t))) {
      const e = t.length;
      for (let s = 0; s < e; s++) {
        const n = t[s];
        (i && !n.canDelete()) || this.remove(n);
      }
    } else {
      const e = new GSet();
      e.addAll(t);
      const s = e.iterator;
      for (; s.next(); ) {
        const n = s.value;
        (i && !n.canDelete()) || this.remove(n);
      }
    }
  }
  copyParts(t, i, e) {
    return (e === void 0 && (e = false), this.partManager.copyParts(t, i, e));
  }
  moveParts(t, i, e, s) {
    if (
      (e === void 0 && (e = false),
      s === void 0 && (s = this.D0()),
      U.s(i, Point, Diagram, "moveParts:offset"),
      this.toolManager === null)
    )
      return;
    const o = new GMap();
    if (t !== null)
      if (Array.isArray(t)) for (let r = 0; r < t.length; r++) this.ol(o, t[r], e, s);
      else {
        const r = t.iterator;
        for (; r.next(); ) this.ol(o, r.value, e, s);
      }
    else {
      let r = this.parts;
      for (; r.next(); ) {
        const l = r.value;
        this.ol(o, l, e, s);
      }
      for (r = this.nodes; r.next(); ) {
        const l = r.value;
        this.ol(o, l, e, s);
      }
      for (r = this.links; r.next(); ) {
        const l = r.value;
        this.ol(o, l, e, s);
      }
    }
    this.Fx(o, i, s, e);
  }
  ol(t, i, e, s, n) {
    if (!t.has(i) && (n === void 0 && (n = false), !(e && !n && !i.canMove() && !i.canCopy())))
      if ((s === void 0 && (s = this.D0()), i instanceof Node)) {
        if ((t.set(i, this.Qs(s, i, i.location)), i instanceof Group && (i.hasPlaceholder() || s.dragsMembers))) {
          const r = i.memberParts;
          for (; r.next(); ) {
            const l = r.value;
            this.ol(t, l, e, s, s.groupsAlwaysMove);
          }
        }
        const o = i.linksConnected;
        for (; o.next(); ) {
          const r = o.value;
          if (t.has(r)) continue;
          const l = r.fromNode,
            h = r.toNode;
          l !== null && t.has(l) && h !== null && t.has(h) && this.ol(t, r, e, s);
        }
        if (s.dragsTree) {
          const r = i.findTreeChildrenNodes();
          for (; r.next(); ) {
            const l = r.value;
            this.ol(t, l, e, s);
          }
        }
      } else if (i instanceof Link) {
        t.set(i, this.Qs(s, i));
        const o = i.labelNodes;
        for (; o.next(); ) {
          const r = o.value;
          this.ol(t, r, e, s);
        }
      } else i instanceof Adornment || t.set(i, this.Qs(s, i, i.location));
  }
  Fx(t, i, e, s) {
    if (t === null || (U.s(t, GMap, Diagram, "moveParts:parts"), t.count === 0)) return;
    const n = Point.a(),
      o = Point.a();
    (o.c(i), isNaN(o.x) && (o.x = 0), isNaN(o.y) && (o.y = 0));
    const r = this.rb;
    r || this.yT(t);
    const l = U.ht(),
      h = U.ht(),
      a = t.iterator;
    let f = Point.a();
    for (; a.next(); ) {
      const g = a.key,
        p = a.value;
      if (g.Oe()) {
        const y = this.bL(g, t);
        if (y !== null) l.push(new DraggingNodeInfoPair(g, p, y));
        else if (!s || g.canMove()) {
          const x = p.point;
          (n.c(x),
            this.computeMove(g, n.add(o), e, f),
            (g.location = f),
            p.shifted === void 0 && (p.shifted = new Point()),
            p.shifted.c(f.subtract(x)));
        }
      } else a.key instanceof Link && h.push(new KeyValuePair(a.key, a.value));
    }
    Point.o(f);
    const c = l.length;
    for (let g = 0; g < c; g++) {
      const p = l[g],
        y = p.SL.point;
      (n.c(y), p.gb.shifted === void 0 && (p.gb.shifted = new Point()), (p.Be.location = n.add(p.gb.shifted)));
    }
    const u = Point.a(),
      d = Point.a(),
      m = h.length;
    for (let g = 0; g < m; g++) {
      const p = h[g],
        y = p.key;
      if (y instanceof Link) {
        if (y.suspendsRouting) {
          y.Er = null;
          const x = y.fromNode,
            b = y.toNode;
          if (this.draggedLink !== null && e.dragsLink) {
            const S = p.value.point;
            if (y.dragComputation === null) {
              t.set(y, this.Qs(e, y, o));
              const k = o.x - S.x,
                P = o.y - S.y;
              y.Cr(k, P);
            } else {
              const k = Point.U(0, 0),
                P = y.getPoint(0);
              (P && P.isReal() && k.c(P), (f = Point.a().c(k).add(o)));
              let A = f;
              (e.isGridSnapEnabled &&
                (e.isGridSnapRealtime || this.lastInput.up) &&
                ((A = Point.a()), this.cM(y, f, A, e)),
                f.c(y.dragComputation(y, f, A)).subtract(k),
                t.set(y, this.Qs(e, y, f)));
              const C = f.x - S.x,
                M = f.y - S.y;
              (y.Cr(C, M), Point.o(k), Point.o(f), A !== f && Point.o(A));
            }
          } else {
            if (x !== null) {
              u.c(x.location);
              const S = t.get(x);
              S !== null && u.subtract(S.point);
            }
            if (b !== null) {
              d.c(b.location);
              const S = t.get(b);
              S !== null && d.subtract(S.point);
            }
            if (x !== null && b !== null) {
              const S = p.value.point;
              if (u.equalsApprox(d) || y.computeAdjusting() !== 0) {
                const k = n;
                (k.c(u), k.subtract(S), t.set(y, this.Qs(e, y, u)), y.Cr(k.x, k.y));
              } else ((y.suspendsRouting = false), y.ii());
            } else {
              const S = p.value.point;
              let k;
              (x !== null ? (k = u) : b !== null ? (k = d) : (k = o), t.set(y, this.Qs(e, y, k)));
              const P = k.x - S.x,
                A = k.y - S.y;
              y.Cr(P, A);
            }
          }
        } else if (y.fromNode === null || y.toNode === null) {
          const x = p.value.point;
          t.set(y, this.Qs(e, y, o));
          const b = o.x - x.x,
            S = o.y - x.y;
          y.Cr(b, S);
        }
      }
    }
    (Point.o(n), Point.o(o), Point.o(u), Point.o(d), U.et(l), U.et(h), r || (this.Oi(), this.xP(t)));
  }
  computeMove(t, i, e, s) {
    if ((s === void 0 && (s = new Point()), s.c(i), t === null)) return s;
    let n = i;
    const o = e.isGridSnapEnabled;
    o && (e.isGridSnapRealtime || this.lastInput.up) && ((n = Point.a()), this.cM(t, i, n, e));
    const r = t.dragComputation !== null ? t.dragComputation(t, i, n) : n,
      l = t.minLocation;
    let h = l.x;
    isNaN(h) && (h = o ? Math.round(t.location.x * 1e3) / 1e3 : t.location.x);
    let a = l.y;
    isNaN(a) && (a = o ? Math.round(t.location.y * 1e3) / 1e3 : t.location.y);
    const f = t.maxLocation;
    let c = f.x;
    isNaN(c) && (c = o ? Math.round(t.location.x * 1e3) / 1e3 : t.location.x);
    let u = f.y;
    return (
      isNaN(u) && (u = o ? Math.round(t.location.y * 1e3) / 1e3 : t.location.y),
      s.e(Math.max(h, Math.min(r.x, c)), Math.max(a, Math.min(r.y, u))),
      n !== i && Point.o(n),
      s
    );
  }
  D0() {
    const t = this.toolManager.findTool("Dragging");
    return t instanceof DraggingTool ? t.dragOptions : this.ud;
  }
  cM(t, i, e, s) {
    if ((s === void 0 && (s = this.D0()), e.c(i), t === null)) return e;
    const n = this.grid,
      o = s.gridSnapCellSize;
    let r = o.width,
      l = o.height;
    const h = s.gridSnapOrigin;
    let a = h.x,
      f = h.y;
    const c = s.gridSnapCellSpot;
    if (n !== null) {
      const d = n.gridCellSize;
      (isNaN(r) && (r = d.width), isNaN(l) && (l = d.height));
      const m = n.gridOrigin;
      (isNaN(a) && (a = m.x), isNaN(f) && (f = m.y));
    }
    const u = Point.U(0, 0);
    return (u.setSpot(0, 0, r, l, c), G.nm(i.x, i.y, a + u.x, f + u.y, r, l, e), Point.o(u), e);
  }
  yT(t) {
    if (t === null) return;
    this.rb = true;
    const i = t.iterator;
    for (; i.next(); ) {
      const e = i.key;
      e instanceof Link && (e.suspendsRouting = true);
    }
  }
  xP(t) {
    if (t === null) return;
    const i = t.iterator;
    for (; i.next(); ) {
      const e = i.key;
      e instanceof Link && ((e.suspendsRouting = false), e.kL() && e.ii());
    }
    this.rb = false;
  }
  get draggedLink() {
    return this.lb;
  }
  set draggedLink(t) {
    this.lb !== t && ((this.lb = t), t !== null && ((this.hb = t.fromPort), (this.ab = t.toPort)));
  }
  get NP() {
    return this.hb;
  }
  set NP(t) {
    this.hb = t;
  }
  get CP() {
    return this.ab;
  }
  set CP(t) {
    this.ab = t;
  }
  bL(t, i) {
    const e = t.containingGroup;
    if (e !== null) {
      let s = this.bL(e, i);
      if (s !== null || ((s = i.get(e)), s !== null)) return s;
    }
    return null;
  }
  Qs(t, i, e) {
    if (e === void 0) return new DraggingInfo(Point.wn);
    let s = t.isGridSnapEnabled;
    return (
      !t.groupsSnapMembers && i.containingGroup !== null && (s = false),
      s
        ? new DraggingInfo(new Point(Math.round(e.x * 1e3) / 1e3, Math.round(e.y * 1e3) / 1e3))
        : new DraggingInfo(e.copy())
    );
  }
  O2(t, i) {
    if (
      (U.s(t, Layer, Diagram, "addLayer:layer"),
      t.diagram !== null &&
        t.diagram !== this &&
        U.n("Cannot share a Layer with another Diagram: " + t + " of " + t.diagram),
      i === null
        ? t.diagram !== null && U.n("Cannot add an existing Layer to this Diagram again: " + t)
        : (U.s(i, Layer, Diagram, "addLayer:existingLayer"),
          i.diagram !== this && U.n("Existing Layer must be in this Diagram: " + i + " not in " + i.diagram),
          t === i && U.n("Cannot move a Layer before or after itself: " + t)),
      t.diagram === this)
    )
      return;
    const e = t.name,
      s = this.Gt,
      n = s.count;
    for (let o = 0; o < n; o++)
      s.elt(o).name === e &&
        U.n(
          "Cannot add Layer with the name '" + e + "'; a Layer with the same name is already present in this Diagram.",
        );
  }
  addLayer(t) {
    (this.O2(t, null), t.Yo(this));
    const i = this.Gt;
    let e = i.count - 1;
    if (!t.isTemporary) for (; e >= 0 && i.elt(e).isTemporary; ) e--;
    return (
      i.insertAt(e + 1, t),
      this.Fi !== null && this.raiseChangedEvent(3, "layers", this, null, t, null, e + 1),
      this.L(),
      this.invalidateDocumentBounds(),
      this
    );
  }
  addLayerBefore(t, i) {
    (this.O2(t, i), t.Yo(this));
    const e = this.Gt,
      s = e.indexOf(t);
    s >= 0 && (e.delete(t), this.Fi !== null && this.raiseChangedEvent(4, "layers", this, t, null, s, null));
    const n = e.count;
    let o;
    for (o = 0; o < n; o++)
      if (e.elt(o) === i) {
        e.insertAt(o, t);
        break;
      }
    return (
      this.Fi !== null && this.raiseChangedEvent(3, "layers", this, null, t, null, o),
      this.L(),
      s < 0 && this.invalidateDocumentBounds(),
      this
    );
  }
  addLayerAfter(t, i) {
    (this.O2(t, i), t.Yo(this));
    const e = this.Gt,
      s = e.indexOf(t);
    s >= 0 && (e.delete(t), this.Fi !== null && this.raiseChangedEvent(4, "layers", this, t, null, s, null));
    const n = e.count;
    let o;
    for (o = 0; o < n; o++)
      if (e.elt(o) === i) {
        e.insertAt(o + 1, t);
        break;
      }
    return (
      this.Fi !== null && this.raiseChangedEvent(3, "layers", this, null, t, null, o + 1),
      this.L(),
      s < 0 && this.invalidateDocumentBounds(),
      this
    );
  }
  el(t, i) {
    (t.Yo(this), this.Gt.insertAt(i, t));
  }
  PL(t) {
    this.Gt.removeAt(t);
  }
  removeLayer(t) {
    if (
      (U.s(t, Layer, Diagram, "removeLayer:layer"),
      t.diagram !== this && U.n("Cannot remove a Layer from another Diagram: " + t + " of " + t.diagram),
      t.name === "")
    )
      return;
    const i = this.Gt,
      e = i.indexOf(t);
    if (i.delete(t)) {
      const n = t.Dt.copy().iterator;
      for (; n.next(); ) {
        const o = n.value,
          r = o.layerName;
        r !== t.name ? (o.layerName = r) : (o.layerName = "");
      }
      (this.Fi !== null && this.raiseChangedEvent(4, "layers", this, t, null, e, null),
        this.L(),
        this.invalidateDocumentBounds());
    }
  }
  findLayer(t) {
    const i = this.layers;
    for (; i.next(); ) {
      const e = i.value;
      if (e.name === t) return e;
    }
    return null;
  }
  findRouter(t) {
    for (const i of this.cc) if (i.name === t) return i;
    return null;
  }
  addModelChangedListener(t) {
    return (
      U.C(t, Diagram, "addModelChangedListener:listener"),
      this.no === null && (this.no = new List()),
      this.no.add(t),
      this.model && this.model.addChangedListener(t),
      this
    );
  }
  removeModelChangedListener(t) {
    (U.C(t, Diagram, "removeModelChangedListener:listener"),
      this.no !== null && (this.no.delete(t), this.no.count === 0 && (this.no = null)),
      this.model.removeChangedListener(t));
  }
  addChangedListener(t) {
    return (
      U.C(t, Diagram, "addChangedListener:listener"),
      this.Yr === null && (this.Yr = new List()),
      this.Yr.add(t),
      this
    );
  }
  removeChangedListener(t) {
    (U.C(t, Diagram, "removeChangedListener:listener"),
      this.Yr !== null && (this.Yr.delete(t), this.Yr.count === 0 && (this.Yr = null)));
  }
  E2(t) {
    if (
      (!this.skipsUndoManager && !this.model.skipsUndoManager && this.model.undoManager.handleChanged(t),
      t.change !== 1 && (this.isModified = true),
      this.Yr !== null)
    ) {
      const i = this.Yr,
        e = i.length;
      for (let s = 0; s < e; s++) i.elt(s)(t);
    }
  }
  raiseChangedEvent(t, i, e, s, n, o, r) {
    (o === void 0 && (o = null), r === void 0 && (r = null));
    const l = new ChangedEvent();
    ((l.diagram = this),
      (l.change = t),
      (l.propertyName = i),
      (l.object = e),
      (l.oldValue = s),
      (l.oldParam = o),
      (l.newValue = n),
      (l.newParam = r),
      this.E2(l));
  }
  raiseChanged(t, i, e, s, n) {
    this.raiseChangedEvent(2, t, this, i, e, s, n);
  }
  t(t, i, e, s, n) {
    this.raiseChangedEvent(2, t, this, i, e, s, n);
  }
  get partAdded() {
    return this.k0;
  }
  set partAdded(t) {
    this.partAdded !== t && (this.k0 = t);
  }
  get partRemoved() {
    return this.P0;
  }
  set partRemoved(t) {
    this.partRemoved !== t && (this.P0 = t);
  }
  get animationManager() {
    return this.Ls;
  }
  get undoManager() {
    return this.Fi.undoManager;
  }
  get skipsUndoManager() {
    return this.Go;
  }
  set skipsUndoManager(t) {
    (U.i(t, "boolean", Diagram, "skipsUndoManager"), (this.Go = t), (this.Fi.skipsUndoManager = t));
  }
  get delaysLayout() {
    return this.V1;
  }
  set delaysLayout(t) {
    this.V1 = t;
  }
  oT(t, i) {
    if (t === null || t.diagram !== this) return;
    const e = this.Se;
    try {
      this.Se = true;
      const s = t.change;
      if (s === 2) {
        const n = t.object,
          o = t.propertyName,
          r = t.getValue(i);
        if ((t.diagram.model.at(n, o, r), n instanceof GraphObject)) {
          const l = n.part;
          l !== null &&
            (l.invalidateAdornments(), l instanceof Link && (l.fromNode?.ie(l.fromPort), l.toNode?.ie(l.toPort)));
        }
        this.isModified = true;
      } else if (s === 3) {
        const n = t.object,
          o = t.newParam,
          r = t.newValue;
        if (n instanceof Panel)
          if (typeof o == "number" && r instanceof GraphObject) {
            i ? n.ae(o) : n.insertAt(o, r);
            const l = n.part;
            l !== null && l.invalidateAdornments();
          } else
            typeof o == "number" &&
              r instanceof RowColumnDefinition &&
              (r.isRow ? n.ML(o, i ? void 0 : r) : n.NL(o, i ? void 0 : r));
        else if (n instanceof Layer) {
          const l = t.oldParam === true;
          typeof o == "number" &&
            r instanceof Part &&
            (i
              ? (l || ((r.isSelected = false), (r.isHighlighted = false), r.invalidateAdornments()), n.ae(l ? o : -1, r, l))
              : n.ma(o, r, l));
        } else
          n instanceof Diagram
            ? typeof o == "number" && r instanceof Layer && (i ? this.PL(o) : this.el(r, o))
            : U.n("unknown ChangeType.Insert object: " + t.toString());
        this.isModified = true;
      } else if (s === 4) {
        const n = t.object,
          o = t.oldParam,
          r = t.oldValue;
        if (n instanceof Panel)
          typeof o == "number" && r instanceof GraphObject
            ? i
              ? n.insertAt(o, r)
              : n.ae(o)
            : typeof o == "number" &&
              r instanceof RowColumnDefinition &&
              (r.isRow ? n.ML(o, i ? r : void 0) : n.NL(o, i ? r : void 0));
        else if (n instanceof Layer) {
          const l = t.newParam === true;
          typeof o == "number" &&
            r instanceof Part &&
            (i
              ? n.Dt.indexOf(r) < 0 && n.ma(o, r, l)
              : (l || ((r.isSelected = false), (r.isHighlighted = false), r.invalidateAdornments()), n.ae(l ? o : -1, r, l)));
        } else
          n instanceof Diagram
            ? typeof o == "number" && r instanceof Layer && (i ? this.el(r, o) : this.PL(o))
            : U.n("unknown ChangeType.Remove object: " + t.toString());
        this.isModified = true;
      } else s === 1 || U.n("unknown ChangedEvent: " + t.toString());
    } finally {
      this.Se = e;
    }
  }
  startTransaction(t) {
    return this.undoManager.startTransaction(t);
  }
  commitTransaction(t) {
    return this.undoManager.commitTransaction(t);
  }
  rollbackTransaction() {
    return this.undoManager.rollbackTransaction();
  }
  commit(t, i) {
    let e = i;
    e === void 0 && (e = "");
    const s = this.skipsUndoManager;
    (e === null && ((this.skipsUndoManager = true), (e = "")), this.undoManager.startTransaction(e));
    let n = false;
    try {
      (t(this), (n = true));
    } finally {
      (n ? this.undoManager.commitTransaction(e) : this.undoManager.rollbackTransaction(), (this.skipsUndoManager = s));
    }
  }
  updateAllTargetBindings(t) {
    this.partManager.updateAllTargetBindings(t);
  }
  updateAllThemeBindings() {
    if ((this.partManager.updateAllThemeBindings(), this.cs !== null)) {
      const t = this.cs.part;
      t !== null && t.Wo();
    }
  }
  setDivBackground(t) {
    this.div && (this.div.style.backgroundColor = t);
  }
  updateAllRelationshipsFromData() {
    this.partManager.updateAllRelationshipsFromData();
  }
  C0() {
    const t = this.E,
      i = this.rt,
      e = this.yt;
    (t.Ki(), i !== 1 && t.rt(i), (e.x !== 0 || e.y !== 0) && t.vs(-e.x, -e.y));
  }
  CL(t, i) {
    const e = this.animationManager;
    if (this.$t || this.Is) {
      ((this.rt = i), this.ph(), this.L(), this.Da(), e.KT(t, this.rt), this.C0());
      return;
    }
    if (this.ut === null) {
      ((this.rt = i), this.C0());
      return;
    }
    this.$t = true;
    const n = this.viewportBounds.copy(),
      o = this.Pt,
      r = this.Mt;
    let l = this.zoomPoint.x,
      h = this.zoomPoint.y;
    const a = this.contentAlignment;
    (isNaN(l) &&
      (a.isSide()
        ? a.includesSide(Spot.LeftSide)
          ? (l = 0)
          : a.includesSide(Spot.RightSide) && (l = o - 1)
        : a.isSpot()
          ? (l = a.x * (o - 1))
          : (l = o / 2)),
      isNaN(h) &&
        (a.isSide()
          ? a.includesSide(Spot.TopSide)
            ? (h = 0)
            : a.includesSide(Spot.BottomSide) && (h = r - 1)
          : a.isSpot()
            ? (h = a.y * (r - 1))
            : (h = r / 2)),
      this.scaleComputation !== null &&
        !this.animationManager.defaultAnimation.isAnimating &&
        (i = this.scaleComputation(this, i)),
      i < this.minScale && (i = this.minScale),
      i > this.maxScale && (i = this.maxScale));
    const f = Point.U(this.yt.x + l / t - l / i, this.yt.y + h / t - h / i);
    ((this.position = f),
      Point.o(f),
      (this.rt = i),
      this.C0(),
      this.ph(),
      (this.$t = false),
      this.onViewportBoundsChanged(n, this.viewportBounds, t, false),
      this.tn(false),
      e.KT(t, this.rt),
      this.L());
  }
  N2() {
    const t = this.Gt.h;
    for (let i = 0; i < t.length; i++) t[i].jT();
  }
  onViewportBoundsChanged(t, i, e, s) {
    if (t.equals(i)) return;
    (s === void 0 && (s = false), s || this.Da(), this.sl());
    const n = this.layout;
    n !== null && n.isViewportSized && this.autoScale === 1 && (t.width !== i.width || t.height !== i.height) && n.b();
    const o = this.currentTool;
    (this.ac === true &&
      o instanceof ToolManager &&
      !this.animationManager.isTicking &&
      ((this.lastInput.documentPoint = this.transformViewToDoc(this.lastInput.viewPoint)), o.mT(this)),
      this.$t || this.invalidateViewport(t, i),
      this.md());
    const r = this.Gt.h;
    (this.fs(r, r.length, this, this.viewportBounds),
      (this.Wi.scale = e),
      (this.Wi.position.x = t.x),
      (this.Wi.position.y = t.y),
      this.Wi.bounds.c(t),
      (this.Wi.canvasSize.width = Math.round(t.width * e)),
      (this.Wi.canvasSize.height = Math.round(t.height * e)),
      (this.Wi.newCanvasSize.width = this.Pt),
      (this.Wi.newCanvasSize.height = this.Mt),
      (this.Wi.isScroll = s),
      this.F("ViewportBoundsChanged", this.Wi, t),
      this.isVirtualized &&
        this.links.each((l) => {
          l.isAvoiding && l.actualBounds.intersectsRect(i) && l.ii();
        }));
  }
  md() {
    ((this.oc = false), this.L());
  }
  L2(t) {
    const i = this.cs;
    if (i === null || !i.visible) return;
    const e = i.part;
    if (e === null || e.layer === null) return;
    const s = t !== void 0 ? t : this.Z1;
    if (!s.isReal()) return;
    const n = s.width,
      o = s.height;
    if (((i.scale = 1), (i.angle = 0), e.layer.isViewportAligned))
      ((i.width = n * this.scale), (i.height = o * this.scale), (e.alignment = Spot.TopLeft));
    else {
      i.Ci === null && (i.Ci = new GridPanelSettings());
      const r = i.Ci.gc;
      if (!r.isReal()) return;
      ((i.width = n + r.width * 2), (i.height = o + r.height * 2), this.sl());
      const l = Point.a();
      (G.nm(s.x, s.y, 0, 0, r.width, r.height, l), l.offset(-r.width, -r.height), (e.location = l), Point.o(l));
    }
  }
  clearSelection(t) {
    t === void 0 && (t = false);
    const i = this.selection;
    if (i.count === 0) return;
    t || this.F("ChangingSelection", i);
    const e = i.toArray(),
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n];
      o.isSelected = false;
    }
    (i.di(), i.clear(), i.k(), t || this.F("ChangedSelection", i));
  }
  select(t) {
    t !== null &&
      (U.s(t, Part, Diagram, "select:part"),
      t.diagram === this &&
        (!t.isSelected || this.selection.count > 1) &&
        (this.F("ChangingSelection", this.selection),
        this.clearSelection(true),
        (t.isSelected = true),
        this.F("ChangedSelection", this.selection)));
  }
  selectCollection(t) {
    if ((this.F("ChangingSelection", this.selection), this.clearSelection(true), Array.isArray(t))) {
      const i = t.length;
      for (let e = 0; e < i; e++) {
        const s = t[e];
        (s instanceof Part || U.n("Diagram.selectCollection given something that is not a Part: " + s),
          (s.isSelected = true));
      }
    } else {
      const i = t.iterator;
      for (; i.next(); ) {
        const e = i.value;
        (e instanceof Part || U.n("Diagram.selectCollection given something that is not a Part: " + e),
          (e.isSelected = true));
      }
    }
    this.F("ChangedSelection", this.selection);
  }
  clearHighlighteds() {
    const t = this.highlighteds;
    if (t.count > 0) {
      const i = t.toArray(),
        e = i.length;
      for (let s = 0; s < e; s++) {
        const n = i[s];
        n.isHighlighted = false;
      }
      (t.di(), t.clear(), t.k());
    }
  }
  highlight(t) {
    t !== null &&
      t.diagram === this &&
      (U.s(t, Part, Diagram, "highlight:part"),
      (!t.isHighlighted || this.highlighteds.count > 1) && (this.clearHighlighteds(), (t.isHighlighted = true)));
  }
  highlightCollection(t) {
    const i = new GSet().addAll(t),
      s = this.highlighteds.copy().removeAll(i).iterator;
    for (; s.next(); ) {
      const o = s.value;
      o.isHighlighted = false;
    }
    const n = i.iterator;
    for (; n.next(); ) {
      const o = n.value;
      (o instanceof Part || U.n("Diagram.highlightCollection given something that is not a Part: " + o),
        (o.isHighlighted = true));
    }
  }
  scroll(t, i, e) {
    e === void 0 && (e = 1);
    const s = i === "up" || i === "down";
    let n = 0;
    const o = Point.a();
    if (t === "pixel") n = e;
    else if (t === "line") n = e * (s ? this.scrollVerticalLineChange : this.scrollHorizontalLineChange);
    else if (t === "page") {
      let l = s ? this.viewportBounds.height : this.viewportBounds.width;
      if (((l *= this.scale), l !== 0)) {
        const h = Math.max(l - (s ? this.scrollVerticalLineChange : this.scrollHorizontalLineChange), 0);
        n = e * h;
      }
    } else if (t === "document") {
      const l = this.documentBounds,
        h = this.viewportBounds;
      (i === "up"
        ? (this.position = o.e(h.x, l.y))
        : i === "left"
          ? (this.position = o.e(l.x, h.y))
          : i === "down"
            ? (this.position = o.e(h.x, l.bottom - h.height))
            : i === "right" && (this.position = o.e(l.right - h.width, h.y)),
        Point.o(o));
      return;
    } else U.n("scrolling unit must be 'pixel', 'line', 'page', or 'document', not: " + t);
    n /= this.scale;
    const r = this.position;
    (i === "up"
      ? (this.position = o.e(r.x, r.y - n))
      : i === "down"
        ? (this.position = o.e(r.x, r.y + n))
        : i === "left"
          ? (this.position = o.e(r.x - n, r.y))
          : i === "right"
            ? (this.position = o.e(r.x + n, r.y))
            : U.n("scrolling direction must be 'up', 'down', 'left', or 'right', not: " + i),
      Point.o(o));
  }
  scrollToRect(t) {
    const i = this.viewportBounds;
    if (i.containsRect(t)) return;
    const e = t.center;
    ((e.x -= i.width / 2), (e.y -= i.height / 2), (this.position = e));
  }
  centerRect(t) {
    const i = this.viewportBounds,
      e = t.center;
    ((e.x -= i.width / 2), (e.y -= i.height / 2), (this.position = e));
  }
  transformDocToView(t) {
    return t.copy().E(this.E);
  }
  transformViewToDoc(t) {
    return t.copy().Je(this.E);
  }
  ZR(t) {
    return t.Je(this.E);
  }
  static None = 1;
  static Uniform = 2;
  static UniformToFill = 3;
  static CycleAll = 1;
  static CycleNotDirected = 2;
  static CycleNotDirectedFast = 3;
  static CycleNotUndirected = 4;
  static CycleDestinationTree = 5;
  static CycleSourceTree = 6;
  static DocumentScroll = 1;
  static InfiniteScroll = 2;
  static TreeParentCollapsed = 1;
  static AllParentsCollapsed = 2;
  static AnyParentsCollapsed = 3;
  get opacity() {
    return this.ei;
  }
  set opacity(t) {
    const i = this.ei;
    i !== t &&
      (U.i(t, "number", Diagram, "opacity"),
      (t < 0 || t > 1) && U.G(t, "0 <= value <= 1", Diagram, "opacity"),
      (this.ei = t),
      this.t("opacity", i, t),
      this.L());
  }
  get validCycle() {
    return this.D1;
  }
  set validCycle(t) {
    const i = this.D1;
    i !== t && (U.W(t, CycleMode, "CycleMode"), (this.D1 = t), this.t("validCycle", i, t));
  }
  get layers() {
    return this.Gt.iterator;
  }
  get isModelReadOnly() {
    const t = this.Fi;
    return t === null ? false : t.isReadOnly;
  }
  set isModelReadOnly(t) {
    const i = this.Fi;
    i !== null && (i.isReadOnly = t);
  }
  get isReadOnly() {
    return this.qo;
  }
  set isReadOnly(t) {
    const i = this.qo;
    i !== t && (U.i(t, "boolean", Diagram, "isReadOnly"), (this.qo = t), this.t("isReadOnly", i, t));
  }
  get isEnabled() {
    return this.Gi;
  }
  set isEnabled(t) {
    const i = this.Gi;
    i !== t && (U.i(t, "boolean", Diagram, "isEnabled"), (this.Gi = t), this.t("isEnabled", i, t));
  }
  get allowClipboard() {
    return this.B1;
  }
  set allowClipboard(t) {
    const i = this.B1;
    i !== t && (U.i(t, "boolean", Diagram, "allowClipboard"), (this.B1 = t), this.t("allowClipboard", i, t));
  }
  get allowCopy() {
    return this.Jl;
  }
  set allowCopy(t) {
    const i = this.Jl;
    i !== t && (U.i(t, "boolean", Diagram, "allowCopy"), (this.Jl = t), this.t("allowCopy", i, t));
  }
  get allowDelete() {
    return this.$l;
  }
  set allowDelete(t) {
    const i = this.$l;
    i !== t && (U.i(t, "boolean", Diagram, "allowDelete"), (this.$l = t), this.t("allowDelete", i, t));
  }
  get allowDragOut() {
    return this.z1;
  }
  set allowDragOut(t) {
    const i = this.z1;
    i !== t && (U.i(t, "boolean", Diagram, "allowDragOut"), (this.z1 = t), this.t("allowDragOut", i, t));
  }
  get allowDrop() {
    return this.X1;
  }
  set allowDrop(t) {
    const i = this.X1;
    i !== t && (U.i(t, "boolean", Diagram, "allowDrop"), (this.X1 = t), this.t("allowDrop", i, t));
  }
  get allowTextEdit() {
    return this.Zl;
  }
  set allowTextEdit(t) {
    const i = this.Zl;
    i !== t && (U.i(t, "boolean", Diagram, "allowTextEdit"), (this.Zl = t), this.t("allowTextEdit", i, t));
  }
  get allowGroup() {
    return this.Ql;
  }
  set allowGroup(t) {
    const i = this.Ql;
    i !== t && (U.i(t, "boolean", Diagram, "allowGroup"), (this.Ql = t), this.t("allowGroup", i, t));
  }
  get allowUngroup() {
    return this._l;
  }
  set allowUngroup(t) {
    const i = this._l;
    i !== t && (U.i(t, "boolean", Diagram, "allowUngroup"), (this._l = t), this.t("allowUngroup", i, t));
  }
  get allowInsert() {
    return this.Y1;
  }
  set allowInsert(t) {
    const i = this.Y1;
    i !== t && (U.i(t, "boolean", Diagram, "allowInsert"), (this.Y1 = t), this.t("allowInsert", i, t));
  }
  get allowLink() {
    return this.th;
  }
  set allowLink(t) {
    const i = this.th;
    i !== t && (U.i(t, "boolean", Diagram, "allowLink"), (this.th = t), this.t("allowLink", i, t));
  }
  get allowRelink() {
    return this.ih;
  }
  set allowRelink(t) {
    const i = this.ih;
    i !== t && (U.i(t, "boolean", Diagram, "allowRelink"), (this.ih = t), this.t("allowRelink", i, t));
  }
  get allowMove() {
    return this.eh;
  }
  set allowMove(t) {
    const i = this.eh;
    i !== t && (U.i(t, "boolean", Diagram, "allowMove"), (this.eh = t), this.t("allowMove", i, t));
  }
  get allowReshape() {
    return this.nh;
  }
  set allowReshape(t) {
    const i = this.nh;
    i !== t && (U.i(t, "boolean", Diagram, "allowReshape"), (this.nh = t), this.t("allowReshape", i, t));
  }
  get allowResize() {
    return this.oh;
  }
  set allowResize(t) {
    const i = this.oh;
    i !== t && (U.i(t, "boolean", Diagram, "allowResize"), (this.oh = t), this.t("allowResize", i, t));
  }
  get allowRotate() {
    return this.lh;
  }
  set allowRotate(t) {
    const i = this.lh;
    i !== t && (U.i(t, "boolean", Diagram, "allowRotate"), (this.lh = t), this.t("allowRotate", i, t));
  }
  get allowSelect() {
    return this.hh;
  }
  set allowSelect(t) {
    const i = this.hh;
    i !== t && (U.i(t, "boolean", Diagram, "allowSelect"), (this.hh = t), this.t("allowSelect", i, t));
  }
  get allowUndo() {
    return this.K1;
  }
  set allowUndo(t) {
    const i = this.K1;
    i !== t && (U.i(t, "boolean", Diagram, "allowUndo"), (this.K1 = t), this.t("allowUndo", i, t));
  }
  get allowZoom() {
    return this.U1;
  }
  set allowZoom(t) {
    const i = this.U1;
    i !== t && (U.i(t, "boolean", Diagram, "allowZoom"), (this.U1 = t), this.t("allowZoom", i, t));
  }
  get hasVerticalScrollbar() {
    return this.od;
  }
  set hasVerticalScrollbar(t) {
    const i = this.od;
    i !== t &&
      (U.i(t, "boolean", Diagram, "hasVerticalScrollbar"),
      (this.od = t),
      this.Da(),
      this.L(),
      this.t("hasVerticalScrollbar", i, t),
      this.tn(false));
  }
  get hasHorizontalScrollbar() {
    return this.nd;
  }
  set hasHorizontalScrollbar(t) {
    const i = this.nd;
    i !== t &&
      (U.i(t, "boolean", Diagram, "hasHorizontalScrollbar"),
      (this.nd = t),
      this.Da(),
      this.L(),
      this.t("hasHorizontalScrollbar", i, t),
      this.tn(false));
  }
  get allowHorizontalScroll() {
    return this.G1;
  }
  set allowHorizontalScroll(t) {
    const i = this.G1;
    i !== t &&
      (U.i(t, "boolean", Diagram, "allowHorizontalScroll"),
      (this.G1 = t),
      this.t("allowHorizontalScroll", i, t),
      this.tn(false));
  }
  get allowVerticalScroll() {
    return this.q1;
  }
  set allowVerticalScroll(t) {
    const i = this.q1;
    i !== t &&
      (U.i(t, "boolean", Diagram, "allowVerticalScroll"),
      (this.q1 = t),
      this.t("allowVerticalScroll", i, t),
      this.tn(false));
  }
  get scrollHorizontalLineChange() {
    return this.H1;
  }
  set scrollHorizontalLineChange(t) {
    const i = this.H1;
    i !== t &&
      (U.i(t, "number", Diagram, "scrollHorizontalLineChange"),
      t < 0 && U.G(t, ">= 0", Diagram, "scrollHorizontalLineChange"),
      (this.H1 = t),
      this.t("scrollHorizontalLineChange", i, t));
  }
  get scrollVerticalLineChange() {
    return this.v1;
  }
  set scrollVerticalLineChange(t) {
    const i = this.v1;
    i !== t &&
      (U.i(t, "number", Diagram, "scrollVerticalLineChange"),
      t < 0 && U.G(t, ">= 0", Diagram, "scrollVerticalLineChange"),
      (this.v1 = t),
      this.t("scrollVerticalLineChange", i, t));
  }
  get lastInput() {
    return this.xa;
  }
  set lastInput(t) {
    (Debug && U.s(t, InputEvent, Diagram, "lastInput"), (this.xa = t));
  }
  get previousInput() {
    return this._r;
  }
  set previousInput(t) {
    (Debug && U.s(t, InputEvent, Diagram, "previousInput"), (this._r = t));
  }
  get firstInput() {
    return this.d0;
  }
  set firstInput(t) {
    (Debug && U.s(t, InputEvent, Diagram, "firstInput"), (this.d0 = t));
  }
  get currentCursor() {
    return this.F1;
  }
  set currentCursor(t) {
    if ((t === "" && (t = this.l0), this.F1 !== t)) {
      U.i(t, "string", Diagram, "currentCursor");
      const e = this.ut,
        s = this.Lt;
      if (e === null || s === null) return;
      this.F1 = t;
      const n = e.style.cursor;
      ((e.style.cursor = t),
        (s.style.cursor = t),
        e.style.cursor === n &&
          ((e.style.cursor = "-webkit-" + t),
          (s.style.cursor = "-webkit-" + t),
          e.style.cursor === n &&
            ((e.style.cursor = "-moz-" + t),
            (s.style.cursor = "-moz-" + t),
            e.style.cursor === n && ((e.style.cursor = t), (s.style.cursor = t)))));
    }
  }
  get defaultCursor() {
    return this.l0;
  }
  set defaultCursor(t) {
    t === "" && (t = "auto");
    const i = this.l0;
    i !== t && (U.i(t, "string", Diagram, "defaultCursor"), (this.l0 = t), this.t("defaultCursor", i, t));
  }
  get click() {
    return this.Kr;
  }
  set click(t) {
    const i = this.Kr;
    i !== t && (t !== null && U.C(t, Diagram, "click"), (this.Kr = t), this.t("click", i, t));
  }
  get doubleClick() {
    return this.Ur;
  }
  set doubleClick(t) {
    const i = this.Ur;
    i !== t && (t !== null && U.C(t, Diagram, "doubleClick"), (this.Ur = t), this.t("doubleClick", i, t));
  }
  get contextClick() {
    return this.Gr;
  }
  set contextClick(t) {
    const i = this.Gr;
    i !== t && (t !== null && U.C(t, Diagram, "contextClick"), (this.Gr = t), this.t("contextClick", i, t));
  }
  get mouseOver() {
    return this.qr;
  }
  set mouseOver(t) {
    const i = this.qr;
    i !== t && (t !== null && U.C(t, Diagram, "mouseOver"), (this.qr = t), this.t("mouseOver", i, t));
  }
  get mouseHover() {
    return this.Hr;
  }
  set mouseHover(t) {
    const i = this.Hr;
    i !== t && (t !== null && U.C(t, Diagram, "mouseHover"), (this.Hr = t), this.t("mouseHover", i, t));
  }
  get mouseHold() {
    return this.vr;
  }
  set mouseHold(t) {
    const i = this.vr;
    i !== t && (t !== null && U.C(t, Diagram, "mouseHold"), (this.vr = t), this.t("mouseHold", i, t));
  }
  get mouseDragOver() {
    return this.I1;
  }
  set mouseDragOver(t) {
    const i = this.I1;
    i !== t && (t !== null && U.C(t, Diagram, "mouseDragOver"), (this.I1 = t), this.t("mouseDragOver", i, t));
  }
  get mouseDrop() {
    return this.Wr;
  }
  set mouseDrop(t) {
    const i = this.Wr;
    i !== t && (Debug && t !== null && U.C(t, Diagram, "mouseDrop"), (this.Wr = t), this.t("mouseDrop", i, t));
  }
  get handlesDragDropForTopLevelParts() {
    return this.R1;
  }
  set handlesDragDropForTopLevelParts(t) {
    const i = this.R1;
    i !== t &&
      (U.i(t, "boolean", Diagram, "handlesDragDropForTopLevelParts"),
      (this.R1 = t),
      this.t("handlesDragDropForTopLevelParts", i, t));
  }
  get mouseEnter() {
    return this.jr;
  }
  set mouseEnter(t) {
    const i = this.jr;
    i !== t && (t !== null && U.C(t, Diagram, "mouseEnter"), (this.jr = t), this.t("mouseEnter", i, t));
  }
  get mouseLeave() {
    return this.Jr;
  }
  set mouseLeave(t) {
    const i = this.Jr;
    i !== t && (t !== null && U.C(t, Diagram, "mouseLeave"), (this.Jr = t), this.t("mouseLeave", i, t));
  }
  get toolTip() {
    return this.$r;
  }
  set toolTip(t) {
    const i = this.$r;
    i !== t &&
      (Debug &&
        t !== null &&
        !(t instanceof Adornment || t instanceof HTMLInfo) &&
        U.n("Diagram.toolTip must be an Adornment or HTMLInfo."),
      (this.$r = t),
      this.t("toolTip", i, t));
  }
  get contextMenu() {
    return this.Zr;
  }
  set contextMenu(t) {
    const i = this.Zr;
    i !== t &&
      (Debug &&
        !(t instanceof Adornment || t instanceof HTMLInfo) &&
        U.n("Diagram.contextMenu must be an Adornment or HTMLInfo."),
      (this.Zr = t),
      this.t("contextMenu", i, t));
  }
  get commandHandler() {
    return this.$M;
  }
  set commandHandler(t) {
    const i = this.$M;
    i !== t &&
      (U.s(t, CommandHandler, Diagram, "commandHandler"), i && i.doStop(), (this.$M = t), t.Yo(this), t.doStart());
  }
  get toolManager() {
    return this.WM;
  }
  set toolManager(t) {
    this.WM !== t && (U.s(t, ToolManager, Diagram, "toolManager"), (this.WM = t), (t.diagram = this));
  }
  get defaultTool() {
    return this.jM;
  }
  set defaultTool(t) {
    const i = this.jM;
    i !== t &&
      (U.s(t, Tool, Diagram, "defaultTool"),
      (this.jM = t),
      (t.diagram = this),
      this.currentTool === i && (this.currentTool = t));
  }
  get currentTool() {
    return this.JM;
  }
  set currentTool(t) {
    const i = this.JM;
    (i && (i.isActive && i.doDeactivate(), i.cancelWaitAfter(), i.doStop()),
      t === null && (t = this.defaultTool),
      t !== null && (U.s(t, Tool, Diagram, "currentTool"), (this.JM = t), (t.diagram = this), t.doStart()));
  }
  get selection() {
    return this.JT;
  }
  get maxSelectionCount() {
    return this.$1;
  }
  set maxSelectionCount(t) {
    const i = this.$1;
    if (i !== t)
      if ((U.i(t, "number", Diagram, "maxSelectionCount"), t >= 0 && !isNaN(t))) {
        if (((this.$1 = t), this.t("maxSelectionCount", i, t), !this.undoManager.isUndoingRedoing)) {
          const e = this.selection.count - t;
          if (e > 0) {
            this.F("ChangingSelection", this.selection);
            const s = this.selection.toArray();
            for (let n = 0; n < e; n++) s[n].isSelected = false;
            this.F("ChangedSelection", this.selection);
          }
        }
      } else U.G(t, ">= 0", Diagram, "maxSelectionCount");
  }
  get nodeSelectionAdornmentTemplate() {
    return this.c0;
  }
  set nodeSelectionAdornmentTemplate(t) {
    const i = this.c0;
    i !== t &&
      (U.s(t, Adornment, Diagram, "nodeSelectionAdornmentTemplate"),
      (this.c0 = t.Yt()),
      this.t("nodeSelectionAdornmentTemplate", i, t));
  }
  get groupSelectionAdornmentTemplate() {
    return this._1;
  }
  set groupSelectionAdornmentTemplate(t) {
    const i = this._1;
    i !== t &&
      (U.s(t, Adornment, Diagram, "groupSelectionAdornmentTemplate"),
      (this._1 = t.Yt()),
      this.t("groupSelectionAdornmentTemplate", i, t));
  }
  get linkSelectionAdornmentTemplate() {
    return this.tb;
  }
  set linkSelectionAdornmentTemplate(t) {
    const i = this.tb;
    i !== t &&
      (U.s(t, Adornment, Diagram, "linkSelectionAdornmentTemplate"),
      (this.tb = t.Yt()),
      this.t("linkSelectionAdornmentTemplate", i, t));
  }
  get highlighteds() {
    return this.$T;
  }
  get isModified() {
    const t = this.undoManager;
    return t.isEnabled ? (t.currentTransaction !== null ? true : this.hd && this.$s !== t.historyIndex) : this.hd;
  }
  set isModified(t) {
    if (this.hd !== t) {
      (U.i(t, "boolean", Diagram, "isModified"), (this.hd = t));
      const e = this.undoManager;
      (!t && e.isEnabled && (this.$s = e.historyIndex), t || this.AL());
    }
  }
  AL() {
    const t = this.isModified;
    this.t2 !== t && ((this.t2 = t), this.F("Modified"));
  }
  get model() {
    return this.Fi;
  }
  set model(t) {
    const i = this.Fi;
    if (i !== t) {
      (U.s(t, Model, Diagram, "model"),
        this.currentTool.doCancel(),
        i &&
          i.undoManager !== t.undoManager &&
          i.undoManager.isInTransaction &&
          U.n("Do not replace a Diagram.model while a transaction is in progress."));
      const e = this.hL(true);
      ((this.ro = false), (this.sd = true), (this.$s = -2), (this.Or = false));
      const s = this.$t;
      ((this.$t = true),
        this.animationManager.jl("Model"),
        i && (this.no !== null && this.no.each((n) => i.removeChangedListener(n)), i.removeChangedListener(this.nc)),
        (this.Fi = t),
        (this.partManager = this.RO(this.Fi.type)),
        this.initializePartManager(this.partManager));
      for (let n = 0; n < e.length; n++) this.add(e[n]);
      (t.addChangedListener(this._M),
        this.partManager.V2(),
        t.removeChangedListener(this._M),
        t.addChangedListener(this.nc),
        this.no !== null && this.no.each((n) => t.addChangedListener(n)),
        (this.$t = s),
        this.invalidateDocumentBounds(),
        this.$t || this.L(),
        i && t.undoManager.copyProperties(i.undoManager));
    }
  }
  get themeManager() {
    return this.w2;
  }
  set themeManager(t) {
    const i = this.w2;
    i !== t &&
      (U.s(t, ThemeManager, Model, "themeManager"),
      i && i.removeDiagram(this),
      (this.w2 = t),
      t !== null && t.addDiagram(this));
  }
  initializePartManager(t) {}
  static b2(t, i) {
    Diagram.tL.set(t, i);
  }
  static get licenseKey() {
    return Diagram.B2.last();
  }
  static set licenseKey(t) {
    Diagram.B2.add(t.replace(/\s/g, ""));
  }
  static get version() {
    return Diagram.OO;
  }
  static B2 = new List();
  static OO = "3.1.10";
  RO(t) {
    const i = Diagram.tL.get(t);
    return i !== null ? new i() : new PartManager();
  }
  get H() {
    return this.QM;
  }
  set H(t) {
    this.QM = t;
  }
  get c1() {
    return this.ZT;
  }
  EO(t) {
    if (t.model !== this.model) return;
    const i = t.change,
      e = t.propertyName;
    if (i === 1 && e[0] === "S") {
      if (e === "StartingFirstTransaction") {
        const s = this,
          n = this.toolManager;
        (n.mouseDownTools.each((o) => (o.diagram = s)),
          n.mouseMoveTools.each((o) => (o.diagram = s)),
          n.mouseUpTools.each((o) => (o.diagram = s)),
          this.routers.each((o) => (o.diagram = s)),
          !this.Is && !this.ro && ((this.sc = true), this.sd && (this.Or = true)));
      } else if (e === "StartingUndo" || e === "StartingRedo") {
        const s = this.animationManager;
        (this.skipsUndoManager ||
          (s.defaultAnimation.isAnimating && s.stopAnimation(),
          s.getBundleAnimation().isAnimating && s.getBundleAnimation().stop()),
          this.F("ChangingSelection", this.selection));
      } else if (e === "StartedTransaction") {
        const s = this.animationManager;
        s.defaultAnimation.isAnimating && !this.skipsUndoManager && s.stopAnimation();
      }
      return;
    }
    if (this.H) {
      this.H = false;
      try {
        if (t.modelChange === "" && i === 1) {
          (e === "FinishedUndo" || e === "FinishedRedo") && (this.F("ChangedSelection", this.selection), this.Oi());
          const s = this.animationManager;
          (e === "RolledBackTransaction" && s.stopAnimation(),
            this.GT(),
            (this.sc = true),
            this.maybeUpdate(),
            (this.undoManager.transactionLevel === 0 || this.undoManager.transactionLevel === 1) && s.AM(),
            e === "CommittedTransaction" &&
              this.undoManager.isJustDiscarded &&
              (this.$s = Math.min(this.$s, this.undoManager.historyIndex - 1)),
            (e === "CommittedTransaction" || e === "RolledBackTransaction") &&
              this.undoManager.Ax &&
              U.yn(() => {
                this.isModified = false;
              }, 1));
          const n = t.isTransactionFinished;
          if (
            (n && (this.AL(), this.c1.clear(), this.animationManager.ER()),
            !this.O1 && n && this.lastInput.targetDiagram)
          ) {
            this.O1 = true;
            const o = this;
            U.yn(() => {
              (o.currentTool.standardMouseOver(), (o.O1 = false));
            }, 10);
          }
        }
      } finally {
        this.H = true;
      }
    }
  }
  get Se() {
    return this.ZM;
  }
  set Se(t) {
    this.ZM = t;
  }
  get Xu() {
    return this.E1;
  }
  set Xu(t) {
    this.E1 = t;
  }
  yL(t) {
    const i = t.O.h;
    for (const e of i) e instanceof Picture && this.z2(e);
  }
  z2(t) {
    const i = t.element;
    if (
      i === null ||
      !root.HTMLImageElement ||
      !(i instanceof HTMLImageElement) ||
      (i.ds instanceof GSet && i.ds.add(this), t.VO(), !i.F0)
    )
      return;
    const e = i.getAttribute("src") || "",
      s = this.dh.get(e);
    if (s === null) {
      Picture.TL(t, i);
      const n = [];
      (n.push(t), this.dh.set(e, n));
    } else {
      for (let n = 0; n < s.length; n++) if (s[n] === t) return;
      s.push(t);
    }
  }
  BO(t) {
    const i = t.O.h,
      e = i.length;
    for (let s = 0; s < e; s++) this.X2(i[s]);
  }
  X2(t) {
    if (!(t instanceof Picture)) return;
    const i = t.element;
    if (i === null || !root.HTMLImageElement || !(i instanceof HTMLImageElement) || !i.F0) return;
    const e = i.getAttribute("src") || "",
      s = this.dh.get(e);
    if (s !== null) {
      for (let n = 0; n < s.length; n++)
        if (s[n] === t) {
          (s.splice(n, 1),
            s.length === 0 && (this.dh.delete(e), Picture.zO(i), i.ds instanceof GSet && i.ds.delete(this)));
          return;
        }
    }
  }
  aL() {
    (Picture.clearCache(), this.dh.clear());
  }
  rebuildParts() {
    this.partManager.rebuildParts();
  }
  $f(t, i) {
    this.Ls.$f(t, i);
  }
  Jf(t, i) {
    this.Ls.Jf(t, i);
  }
  findPartForKey(t) {
    return this.partManager.findPartForKey(t);
  }
  findNodeForKey(t) {
    return this.partManager.findNodeForKey(t);
  }
  findLinkForKey(t) {
    return this.partManager.findLinkForKey(t);
  }
  findPartForData(t) {
    return this.partManager.findPartForData(t);
  }
  findNodeForData(t) {
    return this.partManager.findNodeForData(t);
  }
  findLinkForData(t) {
    return this.partManager.findLinkForData(t);
  }
  findNodesByExample(...t) {
    return this.partManager.findNodesByExample(...t);
  }
  findLinksByExample(...t) {
    return this.partManager.findLinksByExample(...t);
  }
  get nodeTemplate() {
    return this.Qr.get("");
  }
  set nodeTemplate(t) {
    const i = this.Qr.get("");
    i !== t &&
      (U.s(t, Part, Diagram, "nodeTemplate"),
      this.Qr.set("", t),
      this.t("nodeTemplate", i, t),
      this.undoManager.isUndoingRedoing || this.rebuildParts());
  }
  get nodeTemplateMap() {
    return this.Qr;
  }
  set nodeTemplateMap(t) {
    const i = this.Qr;
    i !== t &&
      (U.s(t, GMap, Diagram, "nodeTemplateMap"),
      (this.Qr = t),
      this.t("nodeTemplateMap", i, t),
      this.undoManager.isUndoingRedoing || this.rebuildParts());
  }
  get groupTemplate() {
    return this.wa.get("");
  }
  set groupTemplate(t) {
    const i = this.wa.get("");
    i !== t &&
      (U.s(t, Group, Diagram, "groupTemplate"),
      this.wa.set("", t),
      this.t("groupTemplate", i, t),
      this.undoManager.isUndoingRedoing || this.rebuildParts());
  }
  get groupTemplateMap() {
    return this.wa;
  }
  set groupTemplateMap(t) {
    const i = this.wa;
    i !== t &&
      (U.s(t, GMap, Diagram, "groupTemplateMap"),
      (this.wa = t),
      this.t("groupTemplateMap", i, t),
      this.undoManager.isUndoingRedoing || this.rebuildParts());
  }
  get linkTemplate() {
    return this.uh.get("");
  }
  set linkTemplate(t) {
    const i = this.uh.get("");
    i !== t &&
      (U.s(t, Link, Diagram, "linkTemplate"),
      this.uh.set("", t),
      this.t("linkTemplate", i, t),
      this.undoManager.isUndoingRedoing || this.rebuildParts());
  }
  get linkTemplateMap() {
    return this.uh;
  }
  set linkTemplateMap(t) {
    const i = this.uh;
    i !== t &&
      (U.s(t, GMap, Diagram, "linkTemplateMap"),
      (this.uh = t),
      this.t("linkTemplateMap", i, t),
      this.undoManager.isUndoingRedoing || this.rebuildParts());
  }
  get isMouseCaptured() {
    return this.i2;
  }
  set isMouseCaptured(t) {
    const i = this.ut;
    if (i === null) return;
    const e = i.Nt;
    e instanceof SVGElement ||
      (t
        ? ((this.lastInput.bubbles = false),
          this.Ii(e, "pointermove", this.Ma, false),
          this.Ii(e, "pointerdown", this.mh, false),
          this.Ii(e, "pointerup", this.Na, false),
          this.Ii(e, "pointerout", this.Ca, false),
          this.Ii(e, "pointercancel", this.Aa, false),
          this.Kt(root, "pointermove", this.Ma, true),
          this.Kt(root, "pointerdown", this.mh, true),
          this.Kt(root, "pointerup", this.Na, true),
          this.Kt(root, "pointerout", this.Ca, true),
          this.Kt(root, "pointercancel", this.Aa, true),
          this.Ii(e, "wheel", this.Pa, false),
          this.Kt(root, "wheel", this.Pa, true),
          this.Kt(root, "selectstart", this.ca, false))
        : (this.Ii(root, "pointermove", this.Ma, true),
          this.Ii(root, "pointerdown", this.mh, true),
          this.Ii(root, "pointerup", this.Na, true),
          this.Ii(root, "pointerout", this.Ca, true),
          this.Ii(root, "pointercancel", this.Aa, true),
          this.Kt(e, "pointermove", this.Ma, false),
          this.Kt(e, "pointerdown", this.mh, false),
          this.Kt(e, "pointerup", this.Na, false),
          this.Kt(e, "pointerout", this.Ca, false),
          this.Kt(e, "pointercancel", this.Aa, false),
          this.Ii(root, "wheel", this.Pa, true),
          this.Ii(root, "selectstart", this.ca, false),
          this.Kt(e, "wheel", this.Pa, false)),
      (this.i2 = t));
  }
  get position() {
    return this.yt;
  }
  set position(t) {
    if (this.yt.equals(t)) return;
    const i = Point.a().c(this.yt),
      e = this.viewportBounds.copy();
    if ((this.yt.c(t), this.animationManager.YT(i, this.yt), !this.$t && !(this.ut === null && !this.ld.isReal()))) {
      this.$t = true;
      const s = this.scale,
        n = this.Pt / s,
        o = this.Mt / s;
      (this.M2(this.f0, n, o, this.ic, false), (this.$t = false));
    } else (this.ph(), this.C0());
    if (!this.$t) {
      const s = this.viewportBounds;
      this.onViewportBoundsChanged(e, s, this.rt, false);
    }
    Point.o(i);
  }
  get initialPosition() {
    return this.m1;
  }
  set initialPosition(t) {
    this.m1.equals(t) || (U.s(t, Point, Diagram, "initialPosition"), (this.m1 = t.T()));
  }
  get initialScale() {
    return this.p1;
  }
  set initialScale(t) {
    this.p1 !== t && (U.i(t, "number", Diagram, "initialScale"), (this.p1 = t));
  }
  get grid() {
    return (this.cs === null && (this.cs = this.cL()), this.cs);
  }
  set grid(t) {
    let i = this.cs;
    if (i !== t) {
      (i === null && ((this.cs = this.cL()), (i = this.cs)),
        U.s(t, Panel, Diagram, "grid"),
        t.type !== Panel.Grid && U.n("Diagram.grid must be a Panel of type Panel.Grid"));
      const e = i.panel;
      (e !== null && e.remove(i),
        (this.cs = t),
        (t.name = "GRID"),
        e !== null && e.add(t),
        (this.oc = false),
        this.L(),
        this.t("grid", i, t));
    }
  }
  get viewportBounds() {
    return this.Z1;
  }
  ph() {
    const t = this.Z1,
      i = this.yt,
      e = this.rt;
    (t.e(i.x, i.y, Math.max(this.Pt, 0) / e, Math.max(this.Mt, 0) / e), this.sl());
  }
  get viewSize() {
    return this.ld;
  }
  set viewSize(t) {
    const i = this.viewSize;
    if (!i.equals(t)) {
      (U.s(t, Size, Diagram, "viewSize"), (t = t.T()), (this.ld = t));
      let e = 0,
        s = 0;
      (t.isReal()
        ? ((e = t.width), (s = t.height))
        : this.Lt !== null && ((e = this.Lt.clientWidth || 1), (s = this.Lt.clientHeight || 1)),
        (this.Pt = e),
        (this.Mt = s),
        this.ph(),
        this.invalidateDocumentBounds(),
        this.t("viewSize", i, t),
        this.L());
    }
  }
  get fixedBounds() {
    return this.k1;
  }
  set fixedBounds(t) {
    const i = this.k1;
    i.equals(t) ||
      (U.s(t, Rect, Diagram, "fixedBounds"),
      ((Debug && t.width === 1 / 0) || t.width === -1 / 0 || t.height === 1 / 0 || t.height === -1 / 0) &&
        U.n("fixedBounds width/height must not be Infinity"),
      (t = t.T()),
      (this.k1 = t),
      this.invalidateDocumentBounds(),
      this.t("fixedBounds", i, t));
  }
  get scrollMargin() {
    return this.pa;
  }
  set scrollMargin(t) {
    typeof t == "number" ? (t = new Margin(t)) : U.s(t, Margin, Diagram, "scrollMargin");
    const i = this.pa;
    i.equals(t) || ((t = t.T()), (this.pa = t), this.t("scrollMargin", i, t), this.Ku());
  }
  get scrollMode() {
    return this.da;
  }
  set scrollMode(t) {
    const i = this.da;
    i !== t &&
      (U.W(t, ScrollMode, "ScrollMode"),
      (this.da = t),
      t === 1 && this.tn(false),
      this.t("scrollMode", i, t),
      this.Da(),
      this.L());
  }
  get scrollsPageOnFocus() {
    return this.P1;
  }
  set scrollsPageOnFocus(t) {
    const i = this.P1;
    i !== t && (U.i(t, "boolean", Diagram, "scrollsPageOnFocus"), (this.P1 = t), this.t("scrollsPageOnFocus", i, t));
  }
  get positionComputation() {
    return this.M1;
  }
  set positionComputation(t) {
    const i = this.M1;
    i !== t &&
      (t !== null && U.C(t, Diagram, "positionComputation"),
      (this.M1 = t),
      this.tn(false),
      this.t("positionComputation", i, t));
  }
  get scaleComputation() {
    return this.N1;
  }
  set scaleComputation(t) {
    const i = this.N1;
    i !== t &&
      (t !== null && U.C(t, Diagram, "scaleComputation"),
      (this.N1 = t),
      this.CL(this.scale, this.scale),
      this.t("scaleComputation", i, t));
  }
  get documentBounds() {
    return this.f0;
  }
  LL(t) {
    this.ba = false;
    let i = this.f0;
    i.equals(t) ||
      ((i = i.copy()), this.f0.c(t), this.tn(false), this.F("DocumentBoundsChanged", void 0, i), this.Da(), this.L());
  }
  ensureBounds() {
    if (this.ba) {
      const t = Rect.a();
      (this.LL(this.computeBounds(t)), Rect.o(t));
    }
  }
  get isVirtualized() {
    return this.Q1;
  }
  set isVirtualized(t) {
    const i = this.Q1;
    i !== t && (U.i(t, "boolean", Diagram, "isVirtualized"), (this.Q1 = t), this.t("isVirtualized", i, t));
  }
  get scale() {
    return this.rt;
  }
  set scale(t) {
    const i = this.rt;
    (U.r(t, Diagram, "scale"), i !== t && this.CL(i, t));
  }
  get defaultScale() {
    return this.g0;
  }
  set defaultScale(t) {
    (Debug && U.r(t, Diagram, "defaultScale"),
      Debug && !(t > 0) && U.n("defaultScale must be larger than zero, not: " + t),
      (this.g0 = t));
  }
  get autoScale() {
    return this.fh;
  }
  set autoScale(t) {
    const i = this.fh;
    i !== t && (U.W(t, AutoScale, "AutoScale"), (this.fh = t), this.t("autoScale", i, t), t !== 1 && this.tn(false));
  }
  get initialAutoScale() {
    return this.zr;
  }
  set initialAutoScale(t) {
    const i = this.zr;
    i !== t && (U.W(t, AutoScale, "AutoScale"), (this.zr = t), this.t("initialAutoScale", i, t));
  }
  get initialViewportSpot() {
    return this.A1;
  }
  set initialViewportSpot(t) {
    const i = this.A1;
    i !== t &&
      (U.s(t, Spot, Diagram, "initialViewportSpot"),
      t.isSpot() || U.n("initialViewportSpot must be a specific Spot: " + t),
      (this.A1 = t),
      this.t("initialViewportSpot", i, t));
  }
  get initialDocumentSpot() {
    return this.C1;
  }
  set initialDocumentSpot(t) {
    const i = this.C1;
    i !== t &&
      (U.s(t, Spot, Diagram, "initialDocumentSpot"),
      t.isSpot() || U.n("initialViewportSpot must be a specific Spot: " + t),
      (this.C1 = t),
      this.t("initialDocumentSpot", i, t));
  }
  get minScale() {
    return this.w1;
  }
  set minScale(t) {
    U.r(t, Diagram, "minScale");
    const i = this.w1;
    i !== t &&
      (t > 0
        ? ((this.w1 = t), this.t("minScale", i, t), t > this.scale && (this.scale = t))
        : U.G(t, "> 0", Diagram, "minScale"));
  }
  get maxScale() {
    return this.b1;
  }
  set maxScale(t) {
    U.r(t, Diagram, "maxScale");
    const i = this.b1;
    i !== t &&
      (t > 0
        ? ((this.b1 = t), this.t("maxScale", i, t), t < this.scale && (this.scale = t))
        : U.G(t, "> 0", Diagram, "maxScale"));
  }
  get zoomPoint() {
    return this.S1;
  }
  set zoomPoint(t) {
    this.S1.equals(t) || (U.s(t, Point, Diagram, "zoomPoint"), (t = t.T()), (this.S1 = t));
  }
  get contentAlignment() {
    return this.ic;
  }
  set contentAlignment(t) {
    const i = this.ic;
    i.equals(t) ||
      (U.s(t, Spot, Diagram, "contentAlignment"),
      (t = t.T()),
      (this.ic = t),
      this.t("contentAlignment", i, t),
      this.tn(false));
  }
  get initialContentAlignment() {
    return this.s0;
  }
  set initialContentAlignment(t) {
    const i = this.s0;
    i.equals(t) ||
      (U.s(t, Spot, Diagram, "initialContentAlignment"),
      (t = t.T()),
      (this.s0 = t),
      this.t("initialContentAlignment", i, t));
  }
  get padding() {
    return this.si;
  }
  set padding(t) {
    typeof t == "number" ? (t = new Margin(t)) : U.s(t, Margin, Diagram, "padding");
    const i = this.si;
    i.equals(t) || ((t = t.T()), (this.si = t), this.invalidateDocumentBounds(), this.t("padding", i, t));
  }
  get partManager() {
    return this.h2;
  }
  set partManager(t) {
    const i = this.h2;
    i !== t &&
      (U.s(t, PartManager, Diagram, "partManager"),
      t.diagram !== null && U.n("Cannot share PartManagers between Diagrams: " + t.toString()),
      i && i.Yo(null),
      (this.h2 = t),
      t.Yo(this));
  }
  get nodes() {
    return this.partManager.nodes.iterator;
  }
  get links() {
    return this.partManager.links.iterator;
  }
  get parts() {
    return this.partManager.parts.iterator;
  }
  findTopLevelNodesAndLinks() {
    const t = new GSet(),
      i = this.nodes;
    for (; i.next(); ) {
      const s = i.value;
      s.isTopLevel && t.add(s);
    }
    const e = this.links;
    for (; e.next(); ) {
      const s = e.value;
      s.isTopLevel && t.add(s);
    }
    return t.iterator;
  }
  findTopLevelGroups() {
    return this.il.iterator;
  }
  get routers() {
    return this.cc;
  }
  doLinkRouting(t) {
    this.Uo = true;
    const i = this.cc.h;
    for (let e = 0; e < i.length; e++) i[e].canRoute(t) && i[e].routeLinks(this.Xr, t);
    this.Uo = false;
  }
  get layout() {
    return this.fe;
  }
  set layout(t) {
    const i = this.fe;
    i !== t &&
      (U.s(t, Layout, Diagram, "layout"),
      (this.fe = t),
      (t.diagram = this),
      (t.group = null),
      (this.tl = true),
      this.t("layout", i, t),
      this.requestUpdate());
  }
  layoutDiagram(t) {
    (this.Oi(),
      t && this.pb(true),
      this.Is ? this.T2(false, this.zl || (this.cc.count !== 0 && this.An.size !== 0)) : ((this.sc = true), this.Ar()));
  }
  pb(t) {
    const i = this.il.iterator;
    for (; i.next(); ) this.DL(i.value, t);
    this.layout && (t ? (this.layout.isValidLayout = false) : this.layout.b());
  }
  DL(t, i) {
    if (t === null) return;
    const e = t.Fa.iterator;
    for (; e.next(); ) {
      const s = e.value;
      this.DL(s, i);
    }
    t.layout !== null && (i ? (t.layout.isValidLayout = false) : t.layout.b());
  }
  T2(t, i) {
    if (this.V1) return;
    const e = this.H;
    this.H = true;
    const s = "Layout",
      n = this.undoManager.transactionLevel,
      o = this.layout,
      r = this.animationManager;
    try {
      (n === 0 && ((this.undoManager.Vl = true), this.startTransaction(s)),
        n <= 1 && !r.defaultAnimation.isAnimating && !r.Ni && (t || r.jl(s)),
        (this.tl = false));
      let l = this.il.iterator;
      for (; l.next(); ) (this.pd(l.value), this.FL(l.value, t, n, i));
      let h = false;
      if (
        (o.isValidLayout ||
          (!t || o.isRealtime || o.isRealtime === null || n === 0
            ? (o.doLayout(this), this.pd(this), (h = true), (o.isValidLayout = true))
            : (this.tl = true)),
        h || this.pd(this),
        this.doLinkRouting(this),
        this.Xr.clear(),
        this.ya.size !== 0)
      ) {
        for (let a = 0; a < 23 && this.ya.size !== 0; a++) {
          for (l = this.il.iterator; l.next(); ) this.IL(l.value);
          const f = this.Xr;
          ((this.Xr = this.ya), (this.ya = f), this.pd(this), this.doLinkRouting(this));
        }
        (this.Xr.clear(), this.ya.clear());
      }
    } finally {
      const l = this.undoManager.Vl;
      (n === 0 && (this.commitTransaction(s), (this.undoManager.Vl = false)),
        l && (n === 0 || n === 1) && r.AM(),
        this.tl && (this.tl = !o.isValidLayout),
        (this.H = e));
    }
  }
  FL(t, i, e, s) {
    const n = t.Fa.iterator;
    for (; n.next(); ) this.FL(n.value, i, e, s);
    const o = t.layout;
    o !== null && !o.isValidLayout
      ? !i || o.isRealtime || e === 0
        ? ((t.Ia = !t.location.isReal()),
          o.doLayout(t),
          t.invalidateLayout(32),
          this.ub(t),
          this.pd(t),
          this.doLinkRouting(t),
          (o.isValidLayout = true))
        : (this.doLinkRouting(t), (this.tl = true))
      : s && this.doLinkRouting(t);
  }
  IL(t) {
    const i = t.Fa.iterator;
    for (; i.next(); ) this.IL(i.value);
    (this.pd(t), this.doLinkRouting(t));
  }
  get isTreePathToChildren() {
    return this.T1;
  }
  set isTreePathToChildren(t) {
    const i = this.T1;
    if (
      i !== t &&
      (U.i(t, "boolean", Diagram, "isTreePathToChildren"),
      (this.T1 = t),
      this.t("isTreePathToChildren", i, t),
      !this.undoManager.isUndoingRedoing)
    ) {
      const e = this.nodes;
      for (; e.next(); ) e.value.I0();
    }
  }
  findTreeRoots() {
    const t = new List(),
      i = this.nodes;
    for (; i.next(); ) {
      const e = i.value;
      e.isTopLevel && e.findTreeParentLink() === null && t.add(e);
    }
    return t.iterator;
  }
  get treeCollapsePolicy() {
    return this.L1;
  }
  set treeCollapsePolicy(t) {
    const i = this.L1;
    i !== t &&
      (t !== 1 && t !== 2 && t !== 3 && U.n("Unknown Diagram.treeCollapsePolicy: " + t),
      (this.L1 = t),
      this.t("treeCollapsePolicy", i, t));
  }
  get isCollapsingExpanding() {
    return this.vM;
  }
  set isCollapsingExpanding(t) {
    this.vM = t;
  }
  lO() {
    const t = new GMap(),
      i = new GMap();
    function e(s) {
      const n = s.toLowerCase(),
        o = new List();
      (t.set(s, o), t.set(n, o), i.set(s, s), i.set(n, s));
    }
    (e("InitialAnimationStarting"),
      e("AnimationStarting"),
      e("AnimationFinished"),
      e("BackgroundSingleClicked"),
      e("BackgroundDoubleClicked"),
      e("BackgroundContextClicked"),
      e("ClipboardChanged"),
      e("ClipboardPasted"),
      e("DocumentBoundsChanged"),
      e("ExternalObjectsDropped"),
      e("FocusOrVirtualPointerEnabledChanged"),
      e("GainedFocus"),
      e("InitialLayoutCompleted"),
      e("LayoutCompleted"),
      e("LinkDrawn"),
      e("LinkRelinked"),
      e("LinkReshaped"),
      e("LostFocus"),
      e("Modified"),
      e("ObjectSingleClicked"),
      e("ObjectDoubleClicked"),
      e("ObjectContextClicked"),
      e("PartCreated"),
      e("PartResized"),
      e("PartRotated"),
      e("SelectionMoved"),
      e("SelectionCopied"),
      e("SelectionDeleting"),
      e("SelectionDeleted"),
      e("SelectionGrouped"),
      e("SelectionUngrouped"),
      e("ChangingSelection"),
      e("ChangedSelection"),
      e("SubGraphCollapsed"),
      e("SubGraphExpanded"),
      e("TextEdited"),
      e("ThemeChanged"),
      e("TreeCollapsed"),
      e("TreeExpanded"),
      e("ViewportBoundsChanged"),
      e("InvalidateDraw"),
      (this.qM = t),
      (this.HM = i));
  }
  pL(t) {
    const i = this.HM.get(t);
    return i !== null ? i : this.HM.get(t.toLowerCase());
  }
  Y2(t) {
    let i = this.qM.get(t);
    if (i !== null) return i;
    const e = t.toLowerCase();
    if (((i = this.qM.get(e)), i !== null)) return i;
    U.n("Unknown DiagramEvent name: " + t);
  }
  addDiagramListener(t, i) {
    (U.i(t, "string", Diagram, "addDiagramListener:name"), U.C(i, Diagram, "addDiagramListener:listener"));
    const e = this.Y2(t);
    return (e !== null && e.add(i), this);
  }
  removeDiagramListener(t, i) {
    (U.i(t, "string", Diagram, "removeDiagramListener:name"), U.C(i, Diagram, "addDiagramListener:listener"));
    const e = this.Y2(t);
    e !== null && e.delete(i);
  }
  raiseDiagramEvent(t, i, e) {
    this.F(t, i, e);
  }
  F(t, i, e) {
    Debug && U.i(t, "string", Diagram, "raiseDiagramEvent:name");
    const s = this.Y2(t),
      n = new DiagramEvent();
    n.diagram = this;
    const o = this.pL(t);
    (o !== null && (n.name = o), i !== void 0 && (n.subject = i), e !== void 0 && (n.parameter = e));
    const r = s.length;
    if (r === 1) s.elt(0)(n);
    else if (r !== 0) {
      const l = s.toArray();
      for (let h = 0; h < r; h++) {
        const a = l[h];
        a(n);
      }
    }
  }
  isUnoccupied(t, i) {
    return this.getPositions(false, null, i || null).isUnoccupied(t.x, t.y, t.width, t.height);
  }
  computeOccupiedArea(t) {
    return this.isVirtualized ? this.viewportBounds.copy() : this.ba ? this.dL(t) : t.c(this.documentBounds);
  }
  getPositions(t, i, e) {
    let s = this.ch;
    s === null && (this.ch = s = new PositionArray(this.avoidanceCellSize));
    let n = i;
    if (s.jo || s.Ra !== n || s.K2 !== e) {
      if (
        ((s.U2 = Math.max(s.mc + 1, Math.floor(this.avoidanceLimit / this.avoidanceCellSize.width))),
        (s.G2 = Math.max(s.mc + 1, Math.floor(this.avoidanceLimit / this.avoidanceCellSize.height))),
        n !== null && (n = this.RL(n)),
        n === null)
      ) {
        const o = Rect.a();
        (this.computeOccupiedArea(o), o.inflate(100, 100), s.yb(o));
        const r = this.nodes;
        for (; r.next(); ) {
          const l = r.value,
            h = l.layer;
          h === null || !h.visible || h.isTemporary || this.q2(l, e, o);
        }
        Rect.o(o);
      } else {
        if (n.memberParts.count > 0) {
          const l = this.computePartsBounds(n.memberParts, false);
          (l.inflate(20, 20), s.yb(l));
        }
        const o = Rect.a(),
          r = n.memberParts;
        for (; r.next(); ) {
          const l = r.value;
          l instanceof Node && this.q2(l, e, o);
        }
        Rect.o(o);
      }
      ((s.Ra = n), (s.K2 = e), (s.jo = false));
    } else t && s.OL();
    return s;
  }
  get avoidanceCellSize() {
    return this.e2;
  }
  set avoidanceCellSize(t) {
    ((this.ch = null), (this.e2 = new Size(Math.max(1, t.width), Math.max(1, t.height))));
  }
  get avoidanceLimit() {
    return this.s2;
  }
  set avoidanceLimit(t) {
    this.s2 = Math.max(1, t);
  }
  RL(t) {
    return t.canAvoid() ? t : t.containingGroup !== null ? this.RL(t.containingGroup) : null;
  }
  q2(t, i, e) {
    if (t === i || !t.isVisible()) return;
    const s = t.canAvoid();
    if (s) {
      const n = t.getAvoidableRect(e);
      this.ch.XO(n.x, n.y, n.width, n.height);
    }
    if (t instanceof Group && (!s || t.avoidableMembers)) {
      const n = t.memberParts;
      for (; n.next(); ) {
        const o = n.value;
        o instanceof Node && this.q2(o, i, e);
      }
    }
  }
  yd(t) {
    this.ch !== null && !this.ch.jo && (t === void 0 || t.canAvoid()) && (this.ch.jo = true);
  }
  get autoScrollInterval() {
    return this.o0;
  }
  set autoScrollInterval(t) {
    const i = this.o0;
    (U.r(t, Diagram, "autoScrollInterval"), i !== t && ((this.o0 = t), this.t("autoScrollInterval", i, t)));
  }
  get autoScrollRegion() {
    return this.r0;
  }
  set autoScrollRegion(t) {
    typeof t == "number" ? (t = new Margin(t)) : U.s(t, Margin, Diagram, "autoScrollRegion");
    const i = this.r0;
    i.equals(t) || ((t = t.T()), (this.r0 = t), this.invalidateDocumentBounds(), this.t("autoScrollRegion", i, t));
  }
  doAutoScroll(t) {
    this.u0.c(t);
    const i = Point.a();
    (this.computeAutoScrollPosition(this.u0, i).equalsApprox(this.position) ? this.stopAutoScroll() : this.EL(),
      Point.o(i));
  }
  EL() {
    if (this.ec !== -1) return;
    const t = this.o0,
      i = this;
    this.ec = U.yn(() => {
      if (i.ec === -1 || (i.stopAutoScroll(), i.lastInput.event === null)) return;
      const s = Point.a(),
        n = i.computeAutoScrollPosition(i.u0, s);
      if (!n.equalsApprox(i.position)) {
        ((i.position = n), (i.lastInput.documentPoint = i.transformViewToDoc(i.u0)), i.doMouseMove(), (i.ba = true));
        const o = Rect.a();
        (i.computeBounds(o), o.unionRect(i.documentBounds), i.LL(o), Rect.o(o), (i.Qe = true), i.maybeUpdate(), i.EL());
      }
      Point.o(s);
    }, t);
  }
  stopAutoScroll() {
    this.ec !== -1 && (U.Mf(this.ec), (this.ec = -1));
  }
  computeAutoScrollPosition(t, i) {
    let e = this.position;
    (i === void 0 && (i = new Point()), i.c(e));
    const s = this.r0;
    if (s.top <= 0 && s.left <= 0 && s.right <= 0 && s.bottom <= 0) return i;
    const n = this.viewportBounds,
      o = this.scale,
      r = Rect.U(0, 0, n.width * o, n.height * o),
      l = Point.U(0, 0);
    if (t.x >= r.x && t.x < r.x + s.left && this.allowHorizontalScroll) {
      let h = Math.max(this.scrollHorizontalLineChange, 1);
      ((h = h | 0), (l.x -= h), t.x < r.x + s.left / 2 && (l.x -= h), t.x < r.x + s.left / 4 && (l.x -= 4 * h));
    } else if (t.x <= r.x + r.width && t.x > r.x + r.width - s.right && this.allowHorizontalScroll) {
      let h = Math.max(this.scrollHorizontalLineChange, 1);
      ((h = h | 0),
        (l.x += h),
        t.x > r.x + r.width - s.right / 2 && (l.x += h),
        t.x > r.x + r.width - s.right / 4 && (l.x += 4 * h));
    }
    if (t.y >= r.y && t.y < r.y + s.top && this.allowVerticalScroll) {
      let h = Math.max(this.scrollVerticalLineChange, 1);
      ((h = h | 0), (l.y -= h), t.y < r.y + s.top / 2 && (l.y -= h), t.y < r.y + s.top / 4 && (l.y -= 4 * h));
    } else if (t.y <= r.y + r.height && t.y > r.y + r.height - s.bottom && this.allowVerticalScroll) {
      let h = Math.max(this.scrollVerticalLineChange, 1);
      ((h = h | 0),
        (l.y += h),
        t.y > r.y + r.height - s.bottom / 2 && (l.y += h),
        t.y > r.y + r.height - s.bottom / 4 && (l.y += 4 * h));
    }
    return (l.equalsApprox(Point.wn) || ((i.x = e.x + l.x / o), (i.y = e.y + l.y / o)), Rect.o(r), Point.o(l), i);
  }
  makeSvg(t) {
    this.Ho.has("SVG") || this.addRenderer("SVG", new SVGSurface(this, root.document));
    const i = new SVGSurface(this, root.document, true);
    t === void 0 && (t = {});
    const e = this;
    function s(n, o) {
      const r = e.VL(n, "SVG", i),
        l = r !== null ? r.svg : null,
        h = n.svgFinished;
      return (l && h && h(l), U.lt(o) ? (o(l), null) : l);
    }
    return this.BL(s, t);
  }
  makeSVG(t) {
    return this.makeSvg(t);
  }
  addRenderer(t, i) {
    this.Ho.set(t, i);
  }
  removeRenderer(t) {
    this.Ho.delete(t);
  }
  cacheGroupExternalLinks(t) {
    ((this.p2 = t),
      t ||
        this.nodes.each((i) => {
          i instanceof Group && (i.R0 = null);
        }));
  }
  BL(t, i) {
    const e = i.callback;
    let s = true;
    const o = this.dh.iterator;
    for (; o.next(); )
      if (!o.value[0].Dn) {
        s = false;
        break;
      }
    if (!U.lt(e) || s) return t(i, e, this);
    const r = this;
    function l() {
      const f = +new Date();
      for (s = true, o.reset(); o.next(); )
        if (!o.value[0].Dn) {
          s = false;
          break;
        }
      if (s || f - a > h) {
        t(i, e, r);
        return;
      }
      root.requestAnimationFrame(l);
    }
    const h = i.callbackTimeout || 300,
      a = +new Date();
    return (root.requestAnimationFrame(() => l()), null);
  }
  makeImage(t) {
    return Diagram.isUsingDOM() ? (t === void 0 && (t = {}), (t.returnType = "Image"), this.makeImageData(t)) : null;
  }
  makeImageData(t) {
    return (t === void 0 && (t = {}), this.BL(this.YO, t));
  }
  static img = "image";
  YO(t, i, e) {
    const s = e.VL(t, "canvas", null);
    if (s === null) return null;
    const n = s.V.canvas;
    let o = null;
    if (n !== null) {
      let r = t.returnType;
      switch ((r === void 0 ? (r = "string") : (r = r.toLowerCase()), r)) {
        case Diagram.img + "data":
          o = s.getImageData(0, 0, n.width, n.height);
          break;
        case Diagram.img:
          const h = (t.document || document).createElement("img");
          ((h.src = n.toDataURL(t.type, t.details)), (o = h));
          break;
        case "blob": {
          const a = n;
          return (
            U.lt(i) ||
              ((o = ""),
              U.n(
                'Error: Diagram.makeImageData called with "returnType: toBlob", but no required "callback" function property defined.',
              )),
            U.lt(a.toBlob) ? (a.toBlob(i, t.type, t.details), "toBlob") : (i(null), null)
          );
        }
        case "string":
        default:
          o = n.toDataURL(t.type, t.details);
      }
    }
    return U.lt(i) ? (i(o), null) : o;
  }
  static zL = false;
  VL(t, i, e) {
    (this.animationManager.stopAnimation(),
      this.maybeUpdate(),
      U.it(t) || U.n("properties argument must be an Object."));
    let s = false,
      n = t.size || null,
      o = t.scale || null;
    t.scale !== void 0 && isNaN(t.scale) && (o = "NaN");
    let r = t.maxSize;
    t.maxSize === void 0 && ((s = true), i === "SVG" ? (r = new Size(1 / 0, 1 / 0)) : (r = new Size(2e3, 2e3)));
    const l = t.position || null;
    let h = t.parts || null;
    Array.isArray(h) && (h = new List(h));
    let a = t.padding === void 0 ? 1 : t.padding;
    const f = t.background || null;
    let c = t.omitTemporary;
    c === void 0 && (c = true);
    const u = t.document || root.document,
      d = t.elementFinished || null;
    let m = t.showTemporary;
    m === void 0 && (m = !c);
    let g = t.showGrid;
    (g === void 0 && (g = m),
      n !== null && isNaN(n.width) && isNaN(n.height) && (n = null),
      typeof a == "number"
        ? (a = new Margin(a))
        : a instanceof Margin || U.n("MakeImage padding must be a Margin or a number."),
      (a.left = Math.max(a.left, 0)),
      (a.right = Math.max(a.right, 0)),
      (a.top = Math.max(a.top, 0)),
      (a.bottom = Math.max(a.bottom, 0)),
      this._t && this._t.clearContextCache(true));
    const p = new CanvasSurface(null, u, void 0, true),
      y = p.ni;
    if (!(n || o || h || l))
      return (
        (p.width = this.Pt + Math.ceil(a.left + a.right)),
        (p.height = this.Mt + Math.ceil(a.top + a.bottom)),
        i === "SVG"
          ? e === null
            ? null
            : (e.resize(p.width, p.height, p.width, p.height),
              (e.rl = u),
              (e.wd = d),
              this.db(e.ni, a, new Size(p.width, p.height), this.rt, this.yt, h, f, m, g),
              e.ni)
          : ((this.ad = false),
            this.db(y, a, new Size(p.width, p.height), this.rt, this.yt, h, f, m, g),
            (this.ad = true),
            p.ni)
      );
    const x = this.g0,
      b = this.documentBounds.copy();
    if ((b.subtractMargin(this.si), m)) {
      const T = this.Gt.h,
        L = T.length;
      for (let D = 0; D < L; D++) {
        const F = T[D];
        if (!F.visible || !F.isTemporary) continue;
        const R = F.Dt.h,
          I = R.length;
        for (let O = 0; O < I; O++) {
          const X = R[O];
          if (!X.isInDocumentBounds || !X.isVisible()) continue;
          const K = X.actualBounds;
          K.isReal() && b.unionRect(K);
        }
      }
    }
    let S = new Point(b.x, b.y);
    if (h !== null) {
      const T = new Rect(0, 0, 0, 0);
      let L = true;
      const D = h.iterator;
      for (D.reset(); D.next(); ) {
        const F = D.value;
        if (!(F instanceof Part)) continue;
        const R = F.layer;
        if ((R !== null && !R.visible) || (R !== null && !m && R.isTemporary) || !F.isVisible()) continue;
        const I = F.actualBounds;
        I.isReal() && (L ? ((L = false), T.c(I)) : T.unionRect(I));
      }
      ((b.width = T.width), (b.height = T.height), (S.x = T.x), (S.y = T.y));
    }
    l !== null && l.isReal() && ((S = l), o || (o = x));
    let k = 0,
      P = 0;
    a !== null && ((k = a.left + a.right), (P = a.top + a.bottom));
    let A = 0,
      C = 0;
    n !== null &&
      ((A = n.width), (C = n.height), isFinite(A) && (A = Math.max(0, A - k)), isFinite(C) && (C = Math.max(0, C - P)));
    let M = 0,
      N = 0;
    if (
      (n !== null && o !== null
        ? (o === "NaN" && (o = x),
          n.isReal() ? ((M = A), (N = C)) : isNaN(C) ? ((M = A), (N = b.height * o)) : ((M = b.width * o), (N = C)))
        : n !== null
          ? n.isReal()
            ? ((o = Math.min(A / b.width, C / b.height)), (M = A), (N = C))
            : isNaN(C)
              ? ((o = A / b.width), (M = A), (N = b.height * o))
              : ((o = C / b.height), (M = b.width * o), (N = C))
          : o !== null
            ? o === "NaN" && r.isReal()
              ? ((o = Math.min((r.width - k) / b.width, (r.height - P) / b.height)),
                o > x ? ((o = x), (M = b.width), (N = b.height)) : ((M = r.width), (N = r.height)))
              : ((M = b.width * o), (N = b.height * o))
            : ((o = x), (M = b.width), (N = b.height)),
      a !== null ? ((M += k), (N += P)) : (a = new Margin(0)),
      r !== null)
    ) {
      let T = r.width,
        L = r.height;
      (i !== "SVG" &&
        s &&
        !Diagram.zL &&
        Debug &&
        (M > T || N > L) &&
        (U.ot(
          "Diagram.makeImage(data): Diagram width or height is larger than the default max size. (" +
            Math.ceil(M) +
            "x" +
            Math.ceil(N) +
            " vs 2000x2000) Consider increasing the max size.",
        ),
        (Diagram.zL = true)),
        isNaN(T) && (T = 2e3),
        isNaN(L) && (L = 2e3),
        isFinite(T) && (M = Math.min(M, T)),
        isFinite(L) && (N = Math.min(N, L)));
    }
    return (
      (p.width = Math.ceil(M)),
      (p.height = Math.ceil(N)),
      i === "SVG"
        ? e === null
          ? null
          : (e.resize(p.width, p.height, p.width, p.height),
            (e.rl = u),
            (e.wd = d),
            this.db(e.ni, a, new Size(Math.ceil(M), Math.ceil(N)), o, S, h, f, m, g),
            e.ni)
        : ((this.ad = false), this.db(y, a, new Size(Math.ceil(M), Math.ceil(N)), o, S, h, f, m, g), (this.ad = true), p.ni)
    );
  }
}
