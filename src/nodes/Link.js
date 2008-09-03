class Link extends Part {
  Tt;
  xo;
  bo;
  eg;
  So;
  ko;
  sg;
  Wc;
  ng;
  og;
  rg;
  tf;
  lg;
  an;
  Ti;
  Ue;
  Er;
  Ml;
  rr;
  MC;
  NC;
  wS;
  CC;
  AC;
  ef;
  xS;
  xt;
  lr;
  static sf = null;
  static nf = null;
  Rc;
  TC;
  LC;
  constructor(t) {
    (super(Panel.Link),
      (this.Tt = 8),
      (this.xo = null),
      (this.bo = ""),
      (this.eg = null),
      (this.So = null),
      (this.ko = ""),
      (this.sg = null),
      (this.Wc = 0),
      (this.ng = 0),
      (this.og = 0),
      (this.rg = NaN),
      (this.tf = 1),
      (this.lg = 0.5),
      (this.an = null),
      (this.Ti = new List().k()),
      (this.Ue = null),
      (this.Er = null),
      (this.Ml = new Rect()),
      (this.xt = new Geometry()),
      (this.rr = null),
      (this.lr = null),
      (this.MC = Point.xn),
      (this.NC = Point.xn),
      (this.TC = 0),
      (this.LC = 0),
      (this.wS = new Point()),
      (this.CC = null),
      (this.AC = null),
      (this.ef = null),
      (this.xS = NaN),
      (this.wt = null),
      (this.Rc = []),
      t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.Tt = this.Tt & -113),
      (t.bo = this.bo),
      (t.eg = this.eg),
      (t.ko = this.ko),
      (t.sg = this.sg),
      (t.Wc = this.Wc),
      (t.ng = this.ng),
      (t.og = this.og),
      (t.rg = this.rg),
      (t.tf = this.tf),
      (t.lg = this.lg),
      this.wt !== null && (t.wt = this.wt.copy()));
  }
  $o(t) {
    (super.$o(t), (this.bo = t.bo), (this.ko = t.ko), (t.Ue = null), t.ii(), (t.lr = this.lr));
    const i = t.fromPort;
    i !== null && t.fromNode.ie(i);
    const e = t.toPort;
    e !== null && t.toNode.ie(e);
  }
  gi(t) {
    t in Routing || t in Curve || t in LinkAdjusting
      ? Link.DC(t)
        ? (this.routing = t)
        : t === 9 || t === 10 || t === 11
          ? (this.curve = t)
          : t === 17 || t === 18 || t === 19
            ? (this.adjusting = t)
            : t === 1 || t === 0 || U.n("Unknown Link enum value for a Link property: " + t)
      : super.gi(t);
  }
  static Normal = 1;
  static Orthogonal = 2;
  static AvoidsNodes = 6;
  static AvoidsNodesStraight = 7;
  static None = 0;
  static Bezier = 9;
  static JumpGap = 10;
  static JumpOver = 11;
  static End = 17;
  static Scale = 18;
  static Stretch = 19;
  static OrientAlong = 21;
  static OrientPlus90 = 22;
  static OrientMinus90 = 23;
  static OrientOpposite = 24;
  static OrientUpright = 25;
  static OrientPlus90Upright = 26;
  static OrientMinus90Upright = 27;
  static OrientUpright45 = 28;
  static hF = 8;
  static aF = 16;
  static zh = 8;
  static _b = 3;
  static fF = 3;
  static cF = 1.333;
  static FC = 1;
  static IC = 0;
  static uF = 10;
  static jc = 9999;
  static dF = 30;
  static gF = 30;
  static RC = 10;
  static mF = 10;
  static pF = 14;
  static yF = 30;
  static wF = 14;
  static nL = 8;
  static oL = 8;
  static xF = 11;
  static setRoutingParameter(t, i) {
    switch (t) {
      case 1:
        Link.hF = i;
        break;
      case 2:
        Link.aF = i;
        break;
      case 3:
        Link.zh = i;
        break;
      case 4:
        Link._b = i;
        break;
      case 5:
        Link.fF = i;
        break;
      case 6:
        Link.cF = i;
        break;
      case 7:
        Link.FC = i;
        break;
      case 8:
        Link.IC = i;
        break;
      case 9:
        Link.uF = i;
        break;
      case 10:
        Link.jc = i;
        break;
      case 11:
        Link.dF = i;
        break;
      case 12:
        Link.gF = i;
        break;
      case 13:
        Link.RC = i;
        break;
      case 14:
        Link.mF = i;
        break;
      case 15:
        Link.pF = i;
        break;
      case 16:
        Link.yF = i;
        break;
      case 17:
        Link.wF = i;
        break;
      case 18:
        Link.nL = i;
        break;
      case 19:
        Link.oL = i;
        break;
      case 20:
        Link.xF = i;
        break;
    }
    t > 29 && t < 71 && (Link.KL = t + parseInt(i.toString().slice(0, -1)));
  }
  static KL;
  ts() {
    return (this.wt === null && (this.wt = new LinkSettings()), this.wt);
  }
  UE(t, i, e) {
    const s = t.segmentIndex,
      n = t.segmentFraction;
    let o = t.alignmentFocus;
    const r = t.segmentOrientation,
      l = t.segmentOffset;
    let h = 0,
      a = 0,
      f = 0,
      c = 0;
    if (isNaN(s)) {
      const C = this.xt,
        M = U.ht();
      C.getPointAndAngleAlongPath(n, M);
      const N = Point.U(M[0], M[1]);
      if (((c = M[2]), N.add(this.getPoint(0)), C.type === 1)) N.offset(-C.startX, -C.startY);
      else {
        const T = C.figures.first();
        N.offset(-T.startX, -T.startY);
      }
      (r !== 0 && ((f = this.computeAngle(t, r, c)), (t.angle = f)), (h = N.x), (a = N.y), Point.o(N), U.et(M));
    } else if (s < -i || s >= i) {
      const C = Point.a();
      (this.ZN(C),
        (c = this.midAngle),
        r !== 0 && ((f = this.computeAngle(t, r, c)), (t.angle = f)),
        (h = C.x),
        (a = C.y),
        Point.o(C));
    } else {
      let C,
        M,
        N = 0;
      if (
        (s >= 0
          ? ((C = e.h[s]), (M = s < i - 1 ? e.h[s + 1] : C))
          : ((N = i + s), (C = e.h[N]), (M = N > 0 ? e.h[N - 1] : C)),
        C.equalsApprox(M))
      ) {
        let T, L;
        s >= 0
          ? ((T = s > 0 ? e.h[s - 1] : C), (L = s < i - 2 ? e.h[s + 2] : M))
          : ((T = N < i - 1 ? e.h[N + 1] : C), (L = N > 1 ? e.h[N - 2] : M));
        const D = T.distanceSquaredPoint(C),
          F = M.distanceSquaredPoint(L);
        D > F + 10
          ? (c = s >= 0 ? T.directionPoint(C) : C.directionPoint(T))
          : F > D + 10
            ? (c = s >= 0 ? M.directionPoint(L) : L.directionPoint(M))
            : (c = s >= 0 ? T.directionPoint(L) : L.directionPoint(T));
      } else c = s >= 0 ? C.directionPoint(M) : M.directionPoint(C);
      (r !== 0 && ((f = this.computeAngle(t, r, c)), (t.angle = f)),
        (h = C.x + (M.x - C.x) * n),
        (a = C.y + (M.y - C.y) * n));
    }
    if (o.isNone()) {
      t.moveTo(h, a, true);
      return;
    } else o.isNoSpot() && (o = Spot.Center);
    const u = Transform.a();
    (u.Ki(), u.rt(t.scale, t.scale), u.Ns(t.angle, 0, 0));
    const d = t.naturalBounds,
      m = Rect.U(0, 0, d.width, d.height),
      g = Point.a();
    (g.setRectSpot(m, o), u.St(g));
    let p = -g.x,
      y = -g.y;
    const x = d.width,
      b = d.height,
      S = Point.Ms(l),
      k = isNaN(l.x),
      P = isNaN(l.y);
    if (k || P) {
      const C = x / 2 + Link._b,
        M = b / 2 + Link.fF,
        N = c >= 45 && c <= 135,
        T = c >= 225 && c <= 315;
      r === 0 && (N || T)
        ? ((S.x = P ? C : l.y),
          (S.y = k ? M : l.x),
          N
            ? s >= 0 || (isNaN(s) && n < 0.5) || (k && (S.y = -M))
            : T && ((s >= 0 || (isNaN(s) && n < 0.5)) && k && (S.y = -M), P && (S.x = -C)))
        : (k && (s >= 0 || (isNaN(s) && n < 0.5) ? (S.x = C) : (S.x = -C)), P && (S.y = -M), S.rotate(c));
    } else S.rotate(c);
    ((h += S.x), (a += S.y), u.lm(m), (p += m.x), (y += m.y));
    const A = Point.U(h + p, a + y);
    (t.move(A), Point.o(A), Point.o(S), Point.o(g), Rect.o(m), Transform.o(u));
  }
  nl() {
    let t = this.fromNode;
    if (t !== null) {
      const e = t.findVisibleNode();
      if ((e !== null && (t = e), t.us() || t.yh())) return false;
    }
    let i = this.toNode;
    if (i !== null) {
      const e = i.findVisibleNode();
      if ((e !== null && (i = e), i.us() || i.yh())) return false;
    }
    return true;
  }
  VN(t, i, e) {
    return false;
  }
  BN() {}
  Oe() {
    return false;
  }
  computeAngle(t, i, e) {
    return Link.computeAngle(i, e);
  }
  static computeAngle(t, i) {
    let e = 0;
    switch (t) {
      default:
      case 0:
        e = 0;
        break;
      case 21:
        e = i;
        break;
      case 22:
        e = i + 90;
        break;
      case 23:
        e = i - 90;
        break;
      case 24:
        e = i + 180;
        break;
      case 25:
        ((e = G.Yi(i)), e > 90 && e < 270 && (e -= 180));
        break;
      case 26:
        ((e = G.Yi(i + 90)), e > 90 && e < 270 && (e -= 180));
        break;
      case 27:
        ((e = G.Yi(i - 90)), e > 90 && e < 270 && (e -= 180));
        break;
      case 28:
        if (((e = G.Yi(i)), (e > 45 && e < 135) || (e > 225 && e < 315))) return 0;
        e > 90 && e < 270 && (e -= 180);
        break;
    }
    return G.Yi(e);
  }
  get fromNode() {
    return this.xo;
  }
  set fromNode(t) {
    const i = this.xo;
    if (i !== t) {
      Debug && t !== null && U.s(t, Node, Link, "fromNode");
      const e = this.fromPort;
      (i !== null && (this.So !== i && i.yS(this, e), this.Zy(), this.invalidateLayout(2)),
        (this.xo = t),
        t !== null && this.Hi(t.isVisible()),
        (this.rr = null),
        this.ii());
      const s = this.diagram;
      s !== null && s.H && s.partManager.setFromNodeForLink(this, t, i);
      const n = this.fromPort,
        o = this.fromPortChanged;
      if (o !== null) {
        let r = true;
        (s !== null && ((r = s.H), (s.H = true)), o(this, e, n), s !== null && (s.H = r));
      }
      (t !== null && (this.So !== t && t.pS(this, n), this.Qy(), this.invalidateLayout(1)),
        this.t("fromNode", i, t),
        this.tg());
    }
  }
  get fromPortId() {
    return this.bo;
  }
  set fromPortId(t) {
    const i = this.bo;
    if (i !== t) {
      Debug && U.i(t, "string", Link, "fromPortId");
      const e = this.fromPort;
      (e !== null && this.fromNode?.ie(e), this.Zy(), (this.bo = t));
      const s = this.fromPort;
      s !== null && this.fromNode?.ie(s);
      const n = this.diagram;
      if (n !== null) {
        const o = this.data,
          r = n.model;
        o !== null && r._a() && r.setFromPortIdForLinkData(o, t);
      }
      if (e !== s) {
        ((this.rr = null), this.ii());
        const o = this.fromPortChanged;
        if (o !== null) {
          let r = true;
          (n !== null && ((r = n.H), (n.H = true)), o(this, e, s), n !== null && (n.H = r));
        }
      }
      (this.Qy(), this.t("fromPortId", i, t));
    }
  }
  get fromPort() {
    const t = this.xo;
    if (t === null) return null;
    const i = this.bo;
    return t.findPort(i);
  }
  get fromPortChanged() {
    return this.eg;
  }
  set fromPortChanged(t) {
    const i = this.eg;
    i !== t && (t !== null && U.C(t, Link, "fromPortChanged"), (this.eg = t), this.t("fromPortChanged", i, t));
  }
  get toNode() {
    return this.So;
  }
  set toNode(t) {
    const i = this.So;
    if (i !== t) {
      Debug && t !== null && U.s(t, Node, Link, "toNode");
      const e = this.toPort;
      (i !== null && (this.xo !== i && i.yS(this, e), this.Zy(), this.invalidateLayout(2)),
        (this.So = t),
        t !== null && this.Hi(t.isVisible()),
        (this.rr = null),
        this.ii());
      const s = this.diagram;
      s !== null && s.H && s.partManager.setToNodeForLink(this, t, i);
      const n = this.toPort,
        o = this.toPortChanged;
      if (o !== null) {
        let r = true;
        (s !== null && ((r = s.H), (s.H = true)), o(this, e, n), s !== null && (s.H = r));
      }
      (t !== null && (this.xo !== t && t.pS(this, n), this.Qy(), this.invalidateLayout(1)),
        this.t("toNode", i, t),
        this.tg());
    }
  }
  get toPortId() {
    return this.ko;
  }
  set toPortId(t) {
    const i = this.ko;
    if (i !== t) {
      Debug && U.i(t, "string", Link, "toPortId");
      const e = this.toPort;
      (e !== null && this.toNode?.ie(e), this.Zy(), (this.ko = t));
      const s = this.toPort;
      s !== null && this.toNode?.ie(s);
      const n = this.diagram;
      if (n !== null) {
        const o = this.data,
          r = n.model;
        o !== null && r._a() && r.setToPortIdForLinkData(o, t);
      }
      if (e !== s) {
        ((this.rr = null), this.ii());
        const o = this.toPortChanged;
        if (o !== null) {
          let r = true;
          (n !== null && ((r = n.H), (n.H = true)), o(this, e, s), n !== null && (n.H = r));
        }
      }
      (this.Qy(), this.t("toPortId", i, t));
    }
  }
  get toPort() {
    const t = this.So;
    if (t === null) return null;
    const i = this.ko;
    return t.findPort(i);
  }
  get toPortChanged() {
    return this.sg;
  }
  set toPortChanged(t) {
    const i = this.sg;
    i !== t && (t !== null && U.C(t, Link, "toPortChanged"), (this.sg = t), this.t("toPortChanged", i, t));
  }
  get fromSpot() {
    return this.wt !== null ? this.wt.Ea : Spot.Default;
  }
  set fromSpot(t) {
    const i = this.fromSpot;
    if (!i.equals(t)) {
      if (
        (Debug && U.s(t, Spot, Link, "fromSpot"),
        (t = t.T()),
        (this.ts().Ea = t),
        this.t("fromSpot", i, t),
        i.isSide() || t.isSide())
      ) {
        const e = this.fromNode;
        e !== null && e.ie(this.fromPort);
      }
      this.ii();
    }
  }
  get fromEndSegmentLength() {
    return this.wt !== null ? this.wt.Ba : NaN;
  }
  set fromEndSegmentLength(t) {
    const i = this.fromEndSegmentLength;
    if (i !== t) {
      if (
        (Debug && U.i(t, "number", Link, "fromEndSegmentLength"),
        t < 0 && U.G(t, ">= 0", Link, "fromEndSegmentLength"),
        (this.ts().Ba = t),
        this.t("fromEndSegmentLength", i, t),
        this.computeSpot(true, this.fromPort).isSide())
      ) {
        const e = this.fromNode;
        e !== null && e.ie(this.fromPort);
      }
      this.ii();
    }
  }
  get fromShortLength() {
    return this.wt !== null ? this.wt.Xa : NaN;
  }
  set fromShortLength(t) {
    const i = this.fromShortLength;
    i !== t &&
      (Debug && U.i(t, "number", Link, "fromShortLength"),
      (this.ts().Xa = t),
      this.ce(),
      this.t("fromShortLength", i, t));
  }
  get toSpot() {
    return this.wt !== null ? this.wt.Va : Spot.Default;
  }
  set toSpot(t) {
    const i = this.toSpot;
    if (!i.equals(t)) {
      if (
        (Debug && U.s(t, Spot, Link, "toSpot"),
        (t = t.T()),
        (this.ts().Va = t),
        this.t("toSpot", i, t),
        i.isSide() || t.isSide())
      ) {
        const e = this.toNode;
        e !== null && e.ie(this.toPort);
      }
      this.ii();
    }
  }
  get toEndSegmentLength() {
    return this.wt !== null ? this.wt.za : NaN;
  }
  set toEndSegmentLength(t) {
    const i = this.toEndSegmentLength;
    if (i !== t) {
      if (
        (Debug && U.i(t, "number", Link, "toEndSegmentLength"),
        t < 0 && U.G(t, ">= 0", Link, "toEndSegmentLength"),
        (this.ts().za = t),
        this.t("toEndSegmentLength", i, t),
        this.computeSpot(false, this.toPort).isSide())
      ) {
        const e = this.toNode;
        e !== null && e.ie(this.toPort);
      }
      this.ii();
    }
  }
  get toShortLength() {
    return this.wt !== null ? this.wt.Ya : NaN;
  }
  set toShortLength(t) {
    const i = this.toShortLength;
    i !== t &&
      (Debug && U.i(t, "number", Link, "toShortLength"), (this.ts().Ya = t), this.ce(), this.t("toShortLength", i, t));
  }
  tg() {
    const t = this.fromNode,
      i = this.toNode;
    let e = null;
    if (
      (t !== null
        ? i !== null
          ? (e = t.findCommonContainingGroup(i))
          : (e = t.containingGroup)
        : i !== null
          ? (e = i.containingGroup)
          : (e = null),
      this.F3(e),
      this.isLabeledLink)
    ) {
      const s = this.labelNodes;
      for (; s.next(); ) {
        const n = s.value;
        n.containingGroup = e;
      }
    }
  }
  F3(t) {
    const i = this.Vh;
    if (i !== t) {
      (i !== null && i.yC(this), (this.Vh = t), t !== null && t.wC(this));
      const e = this.containingGroupChanged;
      if (e !== null) {
        let s = true;
        const n = this.diagram;
        (n !== null && ((s = n.H), (n.H = true)), e(this, i, t), n !== null && (n.H = s));
      }
      this.Ve && (this.CC === i || this.AC === i) && this.ii();
    }
  }
  Lh() {
    const t = this.containingGroup;
    t !== null && this.fromNode !== t && this.toNode !== t && t.computesBoundsIncludingLinks && super.Lh();
  }
  getOtherNode(t) {
    Debug && U.s(t, Node, Link, "getOtherNode:node");
    const i = this.fromNode;
    return t === i ? this.toNode : i;
  }
  getOtherPort(t) {
    Debug && U.s(t, GraphObject, Link, "getOtherPort:port");
    const i = this.fromPort;
    return t === i ? this.toPort : i;
  }
  get isLabeledLink() {
    return this.an === null ? false : this.an.count > 0;
  }
  get labelNodes() {
    return this.an === null ? EmptyIterator.instance : this.an.iterator;
  }
  eF(t) {
    (this.an === null && (this.an = new GSet()), this.an.add(t), this.g());
  }
  sF(t) {
    this.an !== null && (this.an.delete(t), this.g());
  }
  i0(t) {
    if ((super.i0(t), this.of() && this.invalidateOtherJumpOvers(this.actualBounds), !t)) {
      const i = this.xo;
      let e = null;
      i !== null && ((e = this.fromPort), i.pS(this, e));
      const s = this.So;
      let n = null;
      (s !== null && ((n = this.toPort), (s !== i || n !== e) && s.pS(this, n)), this.Qy());
    }
  }
  e0(t) {
    if ((super.e0(t), this.of() && this.invalidateOtherJumpOvers(this.actualBounds), !t)) {
      const i = this.xo;
      let e = null;
      i !== null && ((e = this.fromPort), i.yS(this, e));
      const s = this.So;
      let n = null;
      (s !== null && ((n = this.toPort), (s !== i || n !== e) && s.yS(this, n)), this.Zy());
    }
  }
  dc() {
    if (((this.Ve = true), this.an !== null)) {
      const i = this.diagram;
      if (i !== null) {
        const s = this.an.copy().iterator;
        for (; s.next(); ) {
          const n = s.value;
          i.remove(n);
        }
      }
    }
    if (this.data !== null) {
      const i = this.diagram;
      i !== null && i.partManager.OC(this);
    }
  }
  updateRelationshipsFromData() {
    if (this.data === null) return;
    const i = this.diagram;
    i !== null && i.partManager.updateRelationshipsFromData(this);
  }
  move(t, i) {
    const e = i ? this.location : this.position;
    let s = e.x;
    isNaN(s) && (s = 0);
    let n = e.y;
    isNaN(n) && (n = 0);
    const o = t.x - s,
      r = t.y - n;
    if (i === true) super.move(t, false);
    else {
      const h = Point.U(e.x + o, e.y + r);
      (super.move(h, false), Point.o(h));
    }
    this.Cr(o, r);
    const l = this.labelNodes;
    for (; l.next(); ) {
      const h = l.value,
        a = h.position;
      h.moveTo(a.x + o, a.y + r);
    }
  }
  get relinkableFrom() {
    return (this.Tt & 1) !== 0;
  }
  set relinkableFrom(t) {
    const i = (this.Tt & 1) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Link, "relinkableFrom"),
      (this.Tt = this.Tt ^ 1),
      this.t("relinkableFrom", i, t),
      this.invalidateAdornments());
  }
  get relinkableTo() {
    return (this.Tt & 2) !== 0;
  }
  set relinkableTo(t) {
    const i = (this.Tt & 2) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Link, "relinkableTo"),
      (this.Tt = this.Tt ^ 2),
      this.t("relinkableTo", i, t),
      this.invalidateAdornments());
  }
  canRelinkFrom() {
    if (!this.relinkableFrom) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowRelink) return false;
    const i = t.diagram;
    return !(i !== null && !i.allowRelink);
  }
  canRelinkTo() {
    if (!this.relinkableTo) return false;
    const t = this.layer;
    if (t === null) return true;
    if (!t.allowRelink) return false;
    const i = t.diagram;
    return !(i !== null && !i.allowRelink);
  }
  get resegmentable() {
    return (this.Tt & 4) !== 0;
  }
  set resegmentable(t) {
    const i = (this.Tt & 4) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Link, "resegmentable"),
      (this.Tt = this.Tt ^ 4),
      this.t("resegmentable", i, t),
      this.invalidateAdornments());
  }
  get isTreeLink() {
    return (this.Tt & 8) !== 0;
  }
  set isTreeLink(t) {
    const i = (this.Tt & 8) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Link, "isTreeLink"),
      (this.Tt = this.Tt ^ 8),
      this.t("isTreeLink", i, t),
      this.fromNode !== null && this.fromNode.I0(),
      this.toNode !== null && this.toNode.I0());
  }
  get path() {
    const t = this.findMainElement();
    return t instanceof Shape ? t : null;
  }
  get routeBounds() {
    return (this.updateRoute(), this.Ml);
  }
  EC(t) {
    let i = 1 / 0,
      e = 1 / 0;
    const s = this.pointsCount;
    if (s === 0) return (t.e(NaN, NaN, 0, 0), t);
    if (s === 1) {
      const n = this.getPoint(0);
      ((i = Math.min(n.x, i)), (e = Math.min(n.y, e)), t.e(n.x, n.y, 0, 0));
    } else if (s === 2) {
      const n = this.getPoint(0),
        o = this.getPoint(1);
      ((i = Math.min(n.x, o.x)), (e = Math.min(n.y, o.y)), t.e(n.x, n.y, 0, 0), t.unionPoint(o));
    } else if (this.computeCurve() === 9 && s >= 3 && !this.isOrthogonal) {
      let n = this.getPoint(0);
      if (((i = n.x), (e = n.y), t.e(i, e, 0, 0), s === 3)) {
        const o = this.getPoint(1);
        ((i = Math.min(o.x, i)), (e = Math.min(o.y, e)));
        const r = this.getPoint(2);
        ((i = Math.min(r.x, i)), (e = Math.min(r.y, e)), G.Du(n.x, n.y, o.x, o.y, o.x, o.y, r.x, r.y, 0.5, t));
      } else
        for (let o = 3; o < s; o += 3) {
          const r = this.getPoint(o - 2);
          o + 3 >= s && (o = s - 1);
          const l = this.getPoint(o - 1),
            h = this.getPoint(o);
          (G.Du(n.x, n.y, r.x, r.y, l.x, l.y, h.x, h.y, 0.5, t),
            (i = Math.min(h.x, i)),
            (e = Math.min(h.y, e)),
            (n = h));
        }
    } else {
      const n = this.getPoint(0),
        o = this.getPoint(1);
      ((i = Math.min(n.x, o.x)), (e = Math.min(n.y, o.y)), t.e(n.x, n.y, 0, 0), t.unionPoint(o));
      for (let r = 2; r < s; r++) {
        const l = this.getPoint(r);
        ((i = Math.min(l.x, i)), (e = Math.min(l.y, e)), t.unionPoint(l));
      }
    }
    return (this.wS.e(i - t.x, e - t.y), t);
  }
  get midPoint() {
    return this.ZN(new Point());
  }
  ZN(t) {
    return (this.updateRoute(), this.computeMidPoint(t));
  }
  computeMidPoint(t) {
    const i = this.pointsCount;
    if (i === 0) return (t.c(Point.xn), t);
    if (i === 1) return (t.c(this.getPoint(0)), t);
    if (i === 2) {
      const a = this.getPoint(0),
        f = this.getPoint(1);
      return (t.e((a.x + f.x) / 2, (a.y + f.y) / 2), t);
    }
    if (this.isOrthogonal && (this.computeCorner() >= 15 || this.computeCurve() === 9)) {
      (this.xt.getPointAlongPath(0.5, t), t.add(this.getPoint(0)));
      const a = this.xt.figures.first();
      return (t.offset(-a.startX, -a.startY), t);
    }
    if (this.computeCurve() === 9) {
      if (i === 3) {
        const c = this.getPoint(0),
          u = this.getPoint(1),
          d = this.getPoint(2);
        return (G.jA(c.x, c.y, u.x, u.y, u.x, u.y, d.x, d.y, t), t);
      }
      const a = ((i - 1) / 3) | 0,
        f = ((a / 2) | 0) * 3;
      if (a % 2 === 1) {
        const c = this.getPoint(f),
          u = this.getPoint(f + 1),
          d = this.getPoint(f + 2),
          m = this.getPoint(f + 3);
        return (G.jA(c.x, c.y, u.x, u.y, d.x, d.y, m.x, m.y, t), t);
      } else return (t.c(this.getPoint(f)), t);
    }
    const e = this.flattenedLengths,
      s = this.flattenedTotalLength;
    let n = 0,
      o = 0,
      r = 0;
    for (; n < s / 2 && o < i && ((r = e[o]), !(n + r > s / 2)); ) ((n += r), o++);
    const l = this.getPoint(o),
      h = this.getPoint(o + 1);
    if (Math.abs(l.x - h.x) < 1) l.y > h.y ? t.e(l.x, l.y - (s / 2 - n)) : t.e(l.x, l.y + (s / 2 - n));
    else if (Math.abs(l.y - h.y) < 1) l.x > h.x ? t.e(l.x - (s / 2 - n), l.y) : t.e(l.x + (s / 2 - n), l.y);
    else {
      const a = (s / 2 - n) / r,
        f = a * (h.x - l.x),
        c = a * (h.y - l.y);
      t.e(l.x + f, l.y + c);
    }
    return t;
  }
  get midAngle() {
    return (this.updateRoute(), this.computeMidAngle());
  }
  computeMidAngle() {
    const t = this.pointsCount;
    if (t < 2) return NaN;
    if (t === 2) {
      const h = this.getPoint(0),
        a = this.getPoint(1);
      return h.directionPoint(a);
    }
    if (this.isOrthogonal && (this.computeCorner() >= 15 || this.computeCurve() === 9))
      return this.xt.getAngleAlongPath(0.5);
    if (this.computeCurve() === 9 && t >= 4) {
      const h = ((t - 1) / 3) | 0;
      let a = ((h / 2) | 0) * 3;
      if (h % 2 === 1) {
        a = Math.floor(a);
        const f = this.getPoint(a),
          c = this.getPoint(a + 1),
          u = this.getPoint(a + 2),
          d = this.getPoint(a + 3);
        return G.tR(f.x, f.y, c.x, c.y, u.x, u.y, d.x, d.y);
      } else if (a > 0 && a + 1 < t) {
        const f = this.getPoint(a - 1),
          c = this.getPoint(a + 1);
        return f.directionPoint(c);
      }
    }
    const i = this.flattenedLengths,
      e = this.flattenedTotalLength;
    let s = 0,
      n = 0,
      o = 0;
    for (; s < e / 2 && n < t && ((o = i[n]), !(s + o > e / 2)); ) ((s += o), n++);
    const r = this.getPoint(n),
      l = this.getPoint(n + 1);
    if (Math.abs(r.x - l.x) < 0.5 && Math.abs(r.y - l.y) < Link.FC) {
      if (n > 0 && n < t - 2) {
        const h = this.getPoint(n - 1),
          a = this.getPoint(n + 2);
        return h.x < a.x ? 0 : h.x > a.x ? 180 : h.y < a.y ? 90 : 270;
      }
    } else if (Math.abs(r.y - l.y) < 0.5 && Math.abs(r.x - l.x) < Link.FC && n > 0 && n < t - 2) {
      const h = this.getPoint(n - 1),
        a = this.getPoint(n + 2);
      return h.y < a.y ? 90 : h.y > a.y ? 270 : h.x < a.x ? 0 : 180;
    }
    return r.directionPoint(l);
  }
  get flattenedLengths() {
    return this.ef !== null ? this.ef : (this.Ve || this.bS(), this.I3());
  }
  get flattenedTotalLength() {
    let t = this.xS;
    if (isNaN(t)) {
      const i = this.flattenedLengths,
        e = i.length;
      t = 0;
      for (let s = 0; s < e; s++) t += i[s];
      this.xS = t;
    }
    return t;
  }
  I3() {
    this.ef === null ? (this.ef = []) : (this.ef.length = 0);
    const t = this.ef,
      i = this.pointsCount;
    for (let e = 0; e < i - 1; e++) {
      let s = 0;
      const n = this.getPoint(e),
        o = this.getPoint(e + 1);
      G.q(n.x, o.x)
        ? ((s = o.y - n.y), s < 0 && (s = -s), t.push(s))
        : G.q(n.y, o.y)
          ? ((s = o.x - n.x), s < 0 && (s = -s), t.push(s))
          : ((s = Math.sqrt(n.distanceSquaredPoint(o))), t.push(s));
    }
    return t;
  }
  get points() {
    return this.Ti;
  }
  set points(t) {
    const i = this.Ti;
    if (i === t) return;
    let e = null;
    if (Array.isArray(t)) e = this.convertPointsArrayToList(t);
    else if (t instanceof List) {
      e = t.copy();
      const n = e.iterator;
      for (; n.next(); ) n.value.k();
    } else U.n("Link.points value is not an instance of List or Array: " + t);
    if (e === null) return;
    (e.k(), (this.Ti = e), this.ce(), this.bS());
    const s = this.diagram;
    (s !== null &&
      (!s.oa && !s.undoManager.isUndoingRedoing && s.c1.add(this),
      s.animationManager.Ni && s.animationManager.IM(this, e)),
      this.t("points", i, e));
  }
  convertPointsArrayToList(t) {
    let i = null,
      e = t.length % 2 === 0;
    if (e) {
      for (let s = 0; s < t.length; s++)
        if (typeof t[s] != "number" || isNaN(t[s])) {
          e = false;
          break;
        }
    }
    if (e) {
      i = new List();
      for (let s = 0; s < t.length / 2; s++) i.add(new Point(t[s * 2], t[s * 2 + 1]).k());
    } else {
      let s = true;
      for (let n = 0; n < t.length; n++) {
        const o = t[n];
        if (!U.it(o) || typeof o.x != "number" || isNaN(o.x) || typeof o.y != "number" || isNaN(o.y)) {
          s = false;
          break;
        }
      }
      if (s) {
        i = new List();
        for (let n = 0; n < t.length; n++) {
          const o = t[n];
          i.add(new Point(o.x, o.y).k());
        }
      } else
        Debug &&
          U.n(
            "Link.points array must contain only an even number of numbers or objects with x and y properties, not: " +
              t,
          );
    }
    return i;
  }
  get pointsCount() {
    return this.Ti.count;
  }
  getPoint(t) {
    return this.Ti.h[t];
  }
  setPoint(t, i) {
    (Debug &&
      (U.s(i, Point, Link, "setPoint"),
      i.isReal() || U.n("Link.setPoint called with a Point that does not have real numbers: " + i.toString())),
      Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.setElt(t, i));
  }
  setPointAt(t, i, e) {
    (Debug && (U.r(i, Link, "setPointAt:x"), U.r(e, Link, "setPointAt:y")),
      Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.setElt(t, new Point(i, e)));
  }
  insertPoint(t, i) {
    (Debug &&
      (U.s(i, Point, Link, "insertPoint"),
      i.isReal() || U.n("Link.insertPoint called with a Point that does not have real numbers: " + i.toString())),
      Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.insertAt(t, i));
  }
  insertPointAt(t, i, e) {
    (Debug && (U.r(i, Link, "insertPointAt:x"), U.r(e, Link, "insertPointAt:y")),
      Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.insertAt(t, new Point(i, e)));
  }
  addPoint(t) {
    (Debug &&
      (U.s(t, Point, Link, "addPoint"),
      t.isReal() || U.n("Link.addPoint called with a Point that does not have real numbers: " + t.toString())),
      Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.add(t));
  }
  addPointAt(t, i) {
    (Debug && (U.r(t, Link, "insertPointAt:x"), U.r(i, Link, "insertPointAt:y")),
      Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.add(new Point(t, i)));
  }
  removePoint(t) {
    (Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.removeAt(t));
  }
  clearPoints() {
    (Debug && this.Ue === null && U.n("Call Link.startRoute before modifying the points of the route."),
      this.Ti.clear());
  }
  Cr(t, i) {
    if (t === 0 && i === 0) return;
    if (this.pointsCount === 0) {
      (this.defaultFromPoint.isReal() && this.defaultFromPoint.offset(t, i),
        this.defaultToPoint.isReal() && this.defaultToPoint.offset(t, i));
      return;
    }
    const e = this.Ve,
      s = new List(),
      n = this.Ti.iterator;
    for (; n.next(); ) {
      const l = n.value;
      s.add(new Point(l.x + t, l.y + i).k());
    }
    s.k();
    const o = this.Ti;
    this.Ti = s;
    const r = this.diagram;
    (isNaN(t) || isNaN(i) || (r !== null && r.animationManager.Ni)
      ? this.g()
      : (this.hn.e(this.hn.x + t, this.hn.y + i), this.yt.e(this.yt.x + t, this.yt.y + i), this.Ac()),
      e
        ? this.bS()
        : (this.defaultFromPoint.isReal() && (this.defaultFromPoint = this.getPoint(0)),
          this.defaultToPoint.isReal() && (this.defaultToPoint = this.getPoint(this.pointsCount - 1))),
      r !== null && r.animationManager.Ni && r.animationManager.IM(this, s),
      this.t("points", o, s));
  }
  startRoute() {
    this.Ue === null && ((this.Ue = this.Ti), (this.Ti = this.Ti.copy()));
  }
  commitRoute() {
    if (this.Ue === null) return;
    const t = this.Ue,
      i = this.Ti;
    this.Ue = null;
    const e = this.diagram;
    (e !== null && e.animationManager.Ni && e.animationManager.IM(this, i),
      this.ce(),
      this.bS(),
      this.t("points", t, i));
  }
  rollbackRoute() {
    this.Ue !== null && ((this.Ti = this.Ue), (this.Ue = null), this.EC(this.Ml));
  }
  XR() {
    this.Er !== null && ((this.points = this.Er), (this.Er = null));
  }
  bS() {
    if (this.Ti.count === 0) {
      this.Ve = false;
      return;
    }
    ((this.Ve = true),
      this.EC(this.Ml),
      (this.ef = null),
      (this.xS = NaN),
      (this.defaultFromPoint = this.getPoint(0)),
      (this.defaultToPoint = this.getPoint(this.pointsCount - 1)),
      this.SS(false));
  }
  invalidateRoute() {
    this.ii();
  }
  ii() {
    if (this.suspendsRouting) return;
    const t = this.path;
    if (t === null) return;
    const i = this.diagram;
    if (i) {
      if (i.c1.has(this) || i.undoManager.isUndoingRedoing) return;
      const e = i.animationManager;
      if (e.isTicking && !e.isAnimating) return;
      this.Er !== null && !e.isTicking && (this.Er = null);
    }
    ((this.Ve = false), this.g(), t.g());
  }
  get Ve() {
    return (this.Tt & 16) !== 0;
  }
  set Ve(t) {
    ((this.Tt & 16) !== 0) !== t && (this.Tt = this.Tt ^ 16);
  }
  get suspendsRouting() {
    return (this.Tt & 32) !== 0;
  }
  set suspendsRouting(t) {
    ((this.Tt & 32) !== 0) !== t && (this.Tt = this.Tt ^ 32);
  }
  get _y() {
    return (this.Tt & 64) !== 0;
  }
  set _y(t) {
    ((this.Tt & 64) !== 0) !== t && (this.Tt = this.Tt ^ 64);
  }
  get VC() {
    return (this.Tt & 512) !== 0;
  }
  set VC(t) {
    ((this.Tt & 512) !== 0) !== t && (this.Tt = this.Tt ^ 512);
  }
  get defaultFromPoint() {
    return this.MC;
  }
  set defaultFromPoint(t) {
    this.MC = t && t.isReal() ? t.copy() : Point.xn;
  }
  get defaultToPoint() {
    return this.NC;
  }
  set defaultToPoint(t) {
    this.NC = t && t.isReal() ? t.copy() : Point.xn;
  }
  updateRoute() {
    if (this.Ve || this._y) return;
    let t = true;
    try {
      ((this._y = true), this.startRoute(), (t = this.computePoints()));
    } catch {
      ((this._y = false), this.rollbackRoute());
    } finally {
      ((this._y = false), t ? this.commitRoute() : this.rollbackRoute());
    }
  }
  computePoints() {
    const t = this.diagram;
    if (t === null) return false;
    let i = this.fromNode,
      e = null;
    if (
      (i === null
        ? (Link.sf || ((Link.sf = new Node()), (Link.sf.desiredSize = Size.sa), Link.sf.ensureBounds()),
          this.defaultFromPoint.isReal() &&
            ((Link.sf.location = this.defaultFromPoint), Link.sf.ensureBounds(), (i = Link.sf), (e = Link.sf)))
        : (e = this.fromPort),
      e !== null && !i.isVisible())
    ) {
      const m = i.findVisibleNode();
      m !== null && m !== i ? ((i = m), (e = m.port)) : (i = m);
    }
    if (((this.CC = i), i === null || !i.location.isReal() || e === null || ((e = i.findVisiblePort(e)), e === null)))
      return false;
    let s = this.toNode,
      n = null;
    if (
      (s === null
        ? (Link.nf || ((Link.nf = new Node()), (Link.nf.desiredSize = Size.sa), Link.nf.ensureBounds()),
          this.defaultToPoint.isReal() &&
            ((Link.nf.location = this.defaultToPoint), Link.nf.ensureBounds(), (s = Link.nf), (n = Link.nf)))
        : (n = this.toPort),
      n !== null && !s.isVisible())
    ) {
      const m = s.findVisibleNode();
      m !== null && m !== s ? ((s = m), (n = m.port)) : (s = m);
    }
    if (((this.AC = s), s === null || !s.location.isReal() || n === null || ((n = s.findVisiblePort(n)), n === null)))
      return false;
    const o = this.pointsCount,
      r = this.computeSpot(true, e),
      l = this.computeSpot(false, n),
      h = this.Nl(r),
      a = this.Nl(l),
      f = e === n && e !== null,
      c = this.isOrthogonal;
    let u = this.curve === 9;
    f && !c ? ((u = true), (this.rr = true)) : (this.rr = false);
    const d = this.computeAdjusting() === 0 || f;
    if (!c && !f && h && a) {
      let m = false;
      if (!d && o >= 3) {
        let g = this.getLinkPoint(i, e, r, true, false, s, n),
          p = this.getLinkPoint(s, n, l, false, false, i, e);
        ((m = this.adjustPoints(0, g, o - 1, p)),
          m &&
            ((g = this.getLinkPoint(i, e, r, true, false, s, n)),
            (p = this.getLinkPoint(s, n, l, false, false, i, e)),
            this.adjustPoints(0, g, o - 1, p)));
      }
      m || (this.clearPoints(), u ? this.R3(i, e, r, s, n, l) : this.O3(i, e, r, s, n, l));
    } else {
      const m = f ? this.computeCurviness() : 0;
      d && ((c && this.isAvoiding) || f) && this.clearPoints();
      const g = this.getLinkPoint(i, e, r, true, c, s, n),
        p = this.getLinkPoint(s, n, l, false, c, i, e);
      let y = 0,
        x = 0,
        b = 0;
      if (c || !h || f) {
        b = this.getLinkDirection(i, e, g, r, true, c, s, n);
        let M = this.kS(i, e, r, true, b);
        if (
          (f &&
            (h || r.equals(l) || (!c && r.x + l.x === 1 && r.y + l.y === 1)) &&
            ((b -= c ? 90 : Link.dF), m < 0 && (b -= 180)),
          (b = G.Yi(b)),
          f && (M += Math.abs(m) * (c ? 1 : 2)),
          b === 0
            ? (y = M)
            : b === 90
              ? (x = M)
              : b === 180
                ? (y = -M)
                : b === 270
                  ? (x = -M)
                  : ((y = M * Math.cos((b * Math.PI) / 180)), (x = M * Math.sin((b * Math.PI) / 180))),
          r.isNoSpot() && f)
        ) {
          const N = e.getDocumentPoint(Spot.Center, Point.a()),
            T = Point.U(N.x + y * Link.jc, N.y + x * Link.jc);
          (this.getLinkPointFromPoint(i, e, N, T, true, g), Point.o(N), Point.o(T));
        }
      }
      let S = 0,
        k = 0,
        P = 0;
      if (c || !a || f) {
        P = this.getLinkDirection(s, n, p, l, false, c, i, e);
        let M = this.kS(s, n, l, false, P);
        if (
          (f &&
            (a || r.equals(l) || (!c && r.x + l.x === 1 && r.y + l.y === 1)) &&
            ((P += c ? 0 : Link.gF), m < 0 && (P += 180)),
          (P = G.Yi(P)),
          f && (M += Math.abs(m) * (c ? 1 : 2)),
          P === 0
            ? (S = M)
            : P === 90
              ? (k = M)
              : P === 180
                ? (S = -M)
                : P === 270
                  ? (k = -M)
                  : ((S = M * Math.cos((P * Math.PI) / 180)), (k = M * Math.sin((P * Math.PI) / 180))),
          l.isNoSpot() && f)
        ) {
          const N = n.getDocumentPoint(Spot.Center, Point.a()),
            T = Point.U(N.x + S * Link.jc, N.y + k * Link.jc);
          (this.getLinkPointFromPoint(s, n, N, T, false, p), Point.o(N), Point.o(T));
        }
      }
      let A = g;
      (c || !h || f) && (A = new Point(g.x + y, g.y + x));
      let C = p;
      ((c || !a || f) && (C = new Point(p.x + S, p.y + k)),
        !d && !c && h && o > 3 && this.adjustPoints(0, g, o - 2, C)
          ? this.setPoint(o - 1, p)
          : !d && !c && a && o > 3 && this.adjustPoints(1, A, o - 1, p)
            ? this.setPoint(0, g)
            : !d && (c ? o >= 6 : o > 4) && this.adjustPoints(1, A, o - 2, C)
              ? (this.setPoint(0, g), this.setPoint(o - 1, p))
              : (this.clearPoints(),
                this.addPoint(g),
                (c || !h || f) && this.addPoint(A),
                c && this.addOrthoPoints(A, b, C, P, i, s),
                (c || !a || f) && this.addPoint(C),
                this.addPoint(p)));
    }
    return (t.addInvalidRoute(this), true);
  }
  BC(t, i) {
    return (
      Math.abs(i.x - t.x) > Math.abs(i.y - t.y)
        ? (i.x >= t.x ? (i.x = t.x + 9e9) : (i.x = t.x - 9e9), (i.y = t.y))
        : (i.y >= t.y ? (i.y = t.y + 9e9) : (i.y = t.y - 9e9), (i.x = t.x)),
      i
    );
  }
  getLinkPointFromPoint(t, i, e, s, n, o) {
    if ((o === void 0 && (o = new Point()), t === null || i === null)) return (o.c(e), o);
    if (!t.isVisible()) {
      const u = t.findVisibleNode();
      u !== null && u !== t && ((t = u), (i = t.port));
    }
    let r = 0,
      l = 0,
      h = 0,
      a = 0,
      f = null,
      c = i.panel;
    if ((c !== null && !c.Fn() && (c = c.panel), c === null)) ((r = s.x), (l = s.y), (h = e.x), (a = e.y));
    else {
      f = c._s;
      const u = 1 / (f.m11 * f.m22 - f.m12 * f.m21),
        d = f.m22 * u,
        m = -f.m12 * u,
        g = -f.m21 * u,
        p = f.m11 * u,
        y = u * (f.m21 * f.dy - f.m22 * f.dx),
        x = u * (f.m12 * f.dx - f.m11 * f.dy);
      ((r = s.x * d + s.y * g + y),
        (l = s.x * m + s.y * p + x),
        (h = e.x * d + e.y * g + y),
        (a = e.x * m + e.y * p + x));
    }
    return (i.Sc(r, l, h, a, o), f !== null && o.E(f), o);
  }
  E3(t, i) {
    const e = t.Pd;
    return e !== null ? e.bF(i) : null;
  }
  PS(t) {
    if (t === null) return null;
    let i = t.Pd;
    return (i === null && ((i = new Knot(t.part, t)), (t.Pd = i)), i.bF(this));
  }
  getLinkPoint(t, i, e, s, n, o, r, l) {
    if ((l === void 0 && (l = new Point()), e.isSpot() && !this.Nl(e))) return (i.getDocumentPoint(e, l), l);
    if (e.isSide()) {
      const f = this.PS(i);
      if (f !== null) {
        const c = f.rf;
        if ((l.c(c), n && this.routing === 7)) {
          const u = this.PS(r);
          if (u !== null && f.Jc < u.Jc) {
            const d = Point.a(),
              m = Point.a(),
              g = Rect.a();
            (i.getDocumentPoint(Spot.TopLeft, d), i.getDocumentPoint(Spot.BottomRight, m));
            const p = d.x,
              y = d.y,
              x = m.x,
              b = m.y;
            ((g.x = Math.min(p, x)), (g.y = Math.min(y, b)), (g.width = Math.abs(p - x)), (g.height = Math.abs(y - b)));
            const S = this.computeSpot(!s, r),
              k = this.getLinkPoint(o, r, S, !s, n, t, i, m);
            ((e.includesSide(Spot.LeftSide) || e.includesSide(Spot.RightSide)) && k.y >= g.y && k.y <= g.y + g.height
              ? (l.y = k.y)
              : (e.includesSide(Spot.TopSide) || e.includesSide(Spot.BottomSide)) &&
                k.x >= g.x &&
                k.x <= g.x + g.width &&
                (l.x = k.x),
              Rect.o(g),
              Point.o(d),
              Point.o(m));
          }
        }
        return l;
      }
    }
    const h = i.getDocumentPoint(this.hg(e, s), Point.a()),
      a = Point.a();
    if (this.pointsCount > (n ? 6 : 2))
      (a.c(s ? this.getPoint(1) : this.getPoint(this.pointsCount - 2)), n && this.BC(h, a));
    else if (t?.isMemberOf(o) || o?.isMemberOf(t)) {
      const f = i.getDocumentBounds(Rect.a()),
        c = r.getDocumentBounds(Rect.a());
      (f.isReal() && c.isReal()
        ? c.containsRect(f)
          ? (a.c(h), this.zC(c, h.x, h.y, 0, this.computeSpot(r === this.toPort, r), a))
          : f.containsRect(c)
            ? (r.getDocumentPoint(Spot.Center, a), this.zC(f, a.x, a.y, 0, this.computeSpot(i === this.toPort, i), a))
            : this.XC(r, h, s, n, a)
        : this.XC(r, h, s, n, a),
        Rect.o(f),
        Rect.o(c));
    } else this.XC(r, h, s, n, a);
    return (this.getLinkPointFromPoint(t, i, h, a, s, l), Point.o(a), Point.o(h), l);
  }
  XC(t, i, e, s, n) {
    const o = this.computeSpot(!e, t);
    (t.getDocumentPoint(this.hg(o, !e), n), s && this.BC(i, n));
  }
  getLinkDirection(t, i, e, s, n, o, r, l) {
    let h = this.V3(t, i, e, s, n, o, r, l);
    if (t && r) {
      const f = Rect.a(),
        c = Rect.a();
      if (s.isNone() && t.isMemberOf(r) && i && l) {
        if ((i.getDocumentBounds(f), l.getDocumentBounds(c), f.isReal() && c.isReal() && c.containsRect(f))) {
          const u = this.computeSpot(l === this.toPort, l);
          u.equals(Spot.Left) || u.equals(Spot.LeftSide)
            ? (h = 180)
            : u.equals(Spot.Right) || u.equals(Spot.RightSide)
              ? (h = 0)
              : u.equals(Spot.Top) || u.equals(Spot.TopSide)
                ? (h = 270)
                : u.equals(Spot.Bottom) || u.equals(Spot.BottomSide)
                  ? (h = 90)
                  : (h = G.Yi(h + 180));
        }
      } else
        r?.isMemberOf(t) &&
          i &&
          l &&
          (i.getDocumentBounds(f),
          l.getDocumentBounds(c),
          f.isReal() && c.isReal() && f.containsRect(c) && (h = G.Yi(h + 180)));
      (Rect.o(f), Rect.o(c));
    }
    if (this.Nl(s) || i === null) return h;
    const a = i.getDocumentAngle();
    return a === 0
      ? h
      : (45 <= a && a < 135 ? (h += 90) : 135 <= a && a < 225 ? (h += 180) : 225 <= a && a < 315 && (h += 270),
        G.Yi(h));
  }
  V3(t, i, e, s, n, o, r, l) {
    if (s.isSpot()) return G.tx(null, s.x, s.y);
    if (s.isSide()) {
      const c = this.PS(i);
      if (c !== null)
        switch (c.ge) {
          case 1:
            return 270;
          case 8:
            return 90;
          case 2:
            return 180;
          default:
            return 0;
        }
      else
        return s.includesSide(Spot.TopSide)
          ? 270
          : s.includesSide(Spot.BottomSide)
            ? 90
            : s.includesSide(Spot.LeftSide)
              ? 180
              : 0;
    }
    if (i === null || l === null) return 0;
    const h = i.getDocumentPoint(Spot.Center, Point.a()),
      a = Point.a();
    this.pointsCount > (o ? 6 : 2)
      ? o
        ? (a.c(n ? this.getPoint(1) : this.getPoint(this.pointsCount - 2)), this.BC(h, a))
        : a.c(e)
      : l.getDocumentPoint(Spot.Center, a);
    let f = 0;
    return (
      Math.abs(a.x - h.x) > Math.abs(a.y - h.y)
        ? a.x >= h.x
          ? (f = 0)
          : (f = 180)
        : a.y >= h.y
          ? (f = 90)
          : (f = 270),
      Point.o(a),
      Point.o(h),
      f
    );
  }
  computeEndSegmentLength(t, i, e, s) {
    return this.kS(t, i, e, s, NaN);
  }
  kS(t, i, e, s, n) {
    if (i !== null && e.isSide()) {
      const r = this.PS(i);
      if (r !== null) return r.MS;
    }
    let o = NaN;
    if ((s ? (o = this.fromEndSegmentLength) : (o = this.toEndSegmentLength), i !== null && isNaN(o)))
      if ((n === void 0 && (n = NaN), Link.IC > 0 && this.computeCurve() === 9 && !isNaN(n) && e.isSpot())) {
        const r = this.getOtherPort(i);
        if (r) {
          const l = Point.a(),
            h = Point.a(),
            a = i.getDocumentPoint(e, l),
            f = r.getDocumentPoint(e.opposite(), h),
            c = n >= 315 || n <= 45 || (n >= 135 && n <= 225);
          let u = Math.abs(c ? a.x - f.x : a.y - f.y) / Link.IC;
          return ((u = Math.max(u, Link.RC)), Point.o(l), Point.o(h), u);
        }
      } else s ? (o = i.fromEndSegmentLength) : (o = i.toEndSegmentLength);
    return (isNaN(o) && (o = Link.RC), o);
  }
  computeSpot(t, i) {
    return (i === void 0 && (i = null), t ? this.B3(i || this.fromPort) : this.z3(i || this.toPort));
  }
  B3(t) {
    if (t === null) return Spot.Center;
    let i = this.fromSpot;
    return (i.isDefault() && (i = t.fromSpot), i === Spot.Default ? Spot.None : i);
  }
  z3(t) {
    if (t === null) return Spot.Center;
    let i = this.toSpot;
    return (i.isDefault() && (i = t.toSpot), i === Spot.Default ? Spot.None : i);
  }
  Nl(t) {
    return t === Spot.None || (t.x === 0.5 && t.y === 0.5);
  }
  hg(t, i) {
    return t.x === 0.5 && t.y === 0.5 ? t : Spot.Center;
  }
  computeOtherPoint(t, i) {
    if (this.computeAdjusting() !== 0 && this.pointsCount > 4) return this.getPoint(Math.floor(this.pointsCount / 2));
    {
      const e = this.E3(i, this);
      if (e !== null) return e.rf;
      if (t instanceof Group) {
        let s = this.fromNode,
          n = this.fromPort;
        n === i && ((s = this.toNode), (n = this.toPort));
        const o = Rect.a(),
          r = Rect.a();
        if (n && s?.isMemberOf(t)) {
          const l = this.computeSpot(n === i, i);
          if ((i.getDocumentBounds(o), n.getDocumentBounds(r), o.isReal() && r.isReal() && o.containsRect(r))) {
            const h = n.getDocumentPoint(Spot.Center);
            return (this.zC(o, h.x, h.y, 0, l, h), Rect.o(o), Rect.o(r), h);
          }
        }
        (Rect.o(o), Rect.o(r));
      }
      return i.getDocumentPoint(Spot.Center);
    }
  }
  computeShortLength(t) {
    if (t) {
      let i = this.fromShortLength;
      if (isNaN(i)) {
        const e = this.fromPort;
        e !== null && (i = e.fromShortLength);
      }
      return isNaN(i) ? 0 : i;
    } else {
      let i = this.toShortLength;
      if (isNaN(i)) {
        const e = this.toPort;
        e !== null && (i = e.toShortLength);
      }
      return isNaN(i) ? 0 : i;
    }
  }
  Qm(t, i, e, s, n, o) {
    if (this.pickable === false) return false;
    (i === void 0 && (i = null), e === void 0 && (e = null));
    let r;
    if ((o === void 0 ? ((r = Transform.a()), r.Ki()) : (r = o), r.Cf(this.E), this.containedInRect(t, r)))
      return (this.iC(i, e, n), o === void 0 && Transform.o(r), true);
    if (this.intersectsRect(t, r)) {
      let l = false;
      if (!this.Oc) {
        const h = this.O.h,
          a = h.length;
        for (let f = a; f--; ) {
          const c = h[f];
          if (!c.visible && c !== this.locationObject) continue;
          const u = c.actualBounds,
            d = this.naturalBounds;
          if (u.x > d.width || u.y > d.height || u.x + u.width < 0 || u.y + u.height < 0) continue;
          const m = c,
            g = Transform.a();
          if (
            (g.set(r),
            m instanceof Panel
              ? (l = m.Qm(t, i, e, s, n, g))
              : this.path === m
                ? m instanceof Shape && (l = m.c3(t, s, g))
                : (l = m.eD(t, s, g)),
            l)
          ) {
            let p = m;
            (i !== null && (p = i(m)), p && (e === null || e(p)) && n.add(p));
          }
          Transform.o(g);
        }
      }
      return (o === void 0 && Transform.o(r), l || this.background !== null);
    }
    return (o === void 0 && Transform.o(r), false);
  }
  get isOrthogonal() {
    return (this.tf & 2) === 2;
  }
  static DC(t) {
    return (t & 2) === 2;
  }
  get isAvoiding() {
    return (this.tf & 4) === 4;
  }
  computeCurve() {
    if (this.rr === null) {
      const t = this.fromPort,
        i = t !== null && t === this.toPort,
        e = this.isOrthogonal;
      this.rr = i && !e;
    }
    return this.rr ? 9 : this.curve;
  }
  computeCorner() {
    if (this.curve === 9) return 0;
    let t = this.corner;
    return ((isNaN(t) || t < 0) && (t = Link.mF), t);
  }
  findMidLabel() {
    const t = this.path,
      i = this.O.h,
      e = i.length;
    for (let n = 0; n < e; n++) {
      const o = i[n];
      if (!(o === t || o.isPanelMain) && (o.segmentIndex === -1 / 0 || isNaN(o.segmentIndex))) return o;
    }
    const s = this.labelNodes;
    for (; s.next(); ) {
      const n = s.value;
      if (n.segmentIndex === -1 / 0 || isNaN(n.segmentIndex)) return n;
    }
    return null;
  }
  computeSpacing() {
    if (!this.isVisible()) return 0;
    let t = Link.pF;
    t = Math.max(t, this.computeThickness());
    const i = this.fromPort,
      e = this.toPort;
    if (i !== null && e !== null) {
      const s = this.findMidLabel();
      if (s !== null) {
        const n = s.naturalBounds,
          o = s.margin,
          r = isNaN(n.width) ? Link.yF : n.width * s.scale + o.left + o.right,
          l = isNaN(n.height) ? Link.wF : n.height * s.scale + o.top + o.bottom,
          h = s.segmentOrientation;
        if (h === 21 || h === 25 || h === 24) t = Math.max(t, l);
        else if (h === 23 || h === 27 || h === 22 || h === 26) t = Math.max(t, r);
        else {
          const f = (i.getDocumentPoint(Spot.Center).directionPoint(e.getDocumentPoint(Spot.Center)) / 180) * Math.PI;
          t = Math.max(t, Math.abs(Math.sin(f) * r) + Math.abs(Math.cos(f) * l) + 1);
        }
        this.curve === 9 && (t *= Link.cF);
      }
    }
    return t;
  }
  arrangeBundledLinks(t, i) {
    if (i)
      for (let e = 0; e < t.length; e++) {
        const s = t[e];
        s.computeAdjusting() === 0 && s.ii();
      }
  }
  computeCurviness() {
    let t = this.curviness;
    if (isNaN(t)) {
      t = Link.aF;
      const i = this.lr;
      if (i !== null) {
        const e = U.ht();
        let s = 0;
        const n = i.fn;
        for (let r = 0; r < n.length; r++) {
          const h = n[r].computeSpacing();
          (e.push(h), (s += h));
        }
        let o = -s / 2;
        for (let r = 0; r < n.length; r++) {
          if (n[r] === this) {
            t = o + e[r] / 2;
            break;
          }
          o += e[r];
        }
        (i.Uy === this.fromNode && (t = -t), U.et(e));
      }
    }
    return t;
  }
  computeThickness() {
    if (!this.isVisible()) return 0;
    const t = this.path;
    return t !== null ? Math.max(t.strokeWidth, 1) : 1;
  }
  hasCurviness() {
    return !isNaN(this.curviness) || this.lr !== null;
  }
  O3(t, i, e, s, n, o) {
    let r = this.getLinkPoint(t, i, e, true, false, s, n),
      l = this.getLinkPoint(s, n, o, false, false, t, i);
    if ((this.SF(t, i, e, r, s, n, o, l), this.addPoint(r), this.addPoint(l), this.hasCurviness())) {
      const h = l.x - r.x,
        a = l.y - r.y,
        f = this.computeCurviness(),
        c = f,
        u = r.x + h / 2,
        d = r.y + a / 2;
      let m = u,
        g = d;
      if (G.u(a, 0)) h > 0 ? (g -= c) : (g += c);
      else {
        const p = -h / a;
        let y = Math.sqrt((c * c) / (p * p + 1));
        (f < 0 && (y = -y), (m = (a < 0 ? -1 : 1) * y + u), (g = p * (m - u) + d));
      }
      this.insertPointAt(1, m, g);
    }
  }
  SF(t, i, e, s, n, o, r, l) {
    const h = o.getDocumentBounds(Rect.a()),
      a = i.getDocumentBounds(Rect.a());
    if (a.intersectsRect(h)) {
      const f = Point.a();
      if (h.containsRect(a)) {
        if (o.containsPoint(o.getLocalPoint(s, f))) {
          const c = Point.a();
          (i.getDocumentPoint(this.hg(e, true), c),
            l.c(c),
            this.YC(h, c.x, c.y, Link.jc, l),
            this.getLinkPointFromPoint(n, o, h.containsPoint(c) ? c : s, l, false, l),
            this.getLinkPointFromPoint(t, i, c, l, true, s),
            Point.o(c));
        }
      } else if (a.containsRect(h)) {
        if (i.containsPoint(i.getLocalPoint(l, f))) {
          const c = Point.a();
          (o.getDocumentPoint(this.hg(r, false), c),
            s.c(c),
            this.YC(a, c.x, c.y, Link.jc, s),
            this.getLinkPointFromPoint(t, i, a.containsPoint(c) ? c : l, s, true, s),
            this.getLinkPointFromPoint(n, o, c, s, false, l),
            Point.o(c));
        }
      } else {
        const c = Point.a();
        i.getDocumentPoint(this.hg(e, true), c);
        const u = Point.a();
        o.getDocumentPoint(this.hg(r, false), u);
        const d = o.containsPoint(o.getLocalPoint(c, f)),
          m = i.containsPoint(i.getLocalPoint(u, f));
        if (d || m) (s.c(c), l.c(u));
        else if (o.containsPoint(o.getLocalPoint(s, f)) || i.containsPoint(i.getLocalPoint(l, f))) {
          const g = s.x,
            p = s.y;
          ((s.x = l.x), (s.y = l.y), (l.x = g), (l.y = p));
        }
        (Point.o(c), Point.o(u));
      }
      Point.o(f);
    }
    (Rect.o(h), Rect.o(a));
  }
  zC(t, i, e, s, n, o) {
    let r = -1;
    return (
      n.equals(Spot.Left) || n.equals(Spot.LeftSide)
        ? (r = 180)
        : n.equals(Spot.Right) || n.equals(Spot.RightSide)
          ? (r = 0)
          : n.equals(Spot.Top) || n.equals(Spot.TopSide)
            ? (r = 270)
            : (n.equals(Spot.Bottom) || n.equals(Spot.BottomSide)) && (r = 90),
      r === -1 ? this.YC(t, i, e, 0, o) : this.kF(t, i, e, 0, r, o)
    );
  }
  YC(t, i, e, s, n) {
    const o = G.tx(t, i, e);
    return this.kF(t, i, e, s, o, n);
  }
  kF(t, i, e, s, n, o) {
    return (
      n === 0
        ? (o.x = t.right + s)
        : n === 90
          ? (o.y = t.bottom + s)
          : n === 180
            ? (o.x = t.x - s)
            : n === 270
              ? (o.y = t.y - s)
              : n === 45
                ? ((o.x = t.right + s), (o.y = t.bottom + s))
                : n === 135
                  ? ((o.x = t.x - s), (o.y = t.bottom + s))
                  : n === 225
                    ? ((o.x = t.x - s), (o.y = t.y - s))
                    : n === 315 && ((o.x = t.right + s), (o.y = t.y - s)),
      o
    );
  }
  R3(t, i, e, s, n, o) {
    let r = this.getLinkPoint(t, i, e, true, false, s, n),
      l = this.getLinkPoint(s, n, o, false, false, t, i);
    (this.SF(t, i, e, r, s, n, o, l), this.addPoint(r), this.addPoint(l));
    const h = l.x - r.x,
      a = l.y - r.y,
      f = this.computeCurviness();
    let c = 0,
      u = 0,
      d = r.x + h / 3,
      m = r.y + a / 3,
      g = d,
      p = m;
    (G.u(a, 0)
      ? h > 0
        ? (p -= f)
        : (p += f)
      : ((c = -h / a),
        (u = Math.sqrt((f * f) / (c * c + 1))),
        f < 0 && (u = -u),
        (g = (a < 0 ? -1 : 1) * u + d),
        (p = c * (g - d) + m)),
      (d = r.x + (2 * h) / 3),
      (m = r.y + (2 * a) / 3));
    let y = d,
      x = m;
    (G.u(a, 0) ? (h > 0 ? (x -= f) : (x += f)) : ((y = (a < 0 ? -1 : 1) * u + d), (x = c * (y - d) + m)),
      this.insertPointAt(1, g, p),
      this.insertPointAt(2, y, x),
      this.setPoint(0, this.getLinkPoint(t, i, e, true, false, s, n)),
      this.setPoint(3, this.getLinkPoint(s, n, o, false, false, t, i)));
  }
  adjustPoints(t, i, e, s) {
    let n = this.computeAdjusting();
    if (this.isOrthogonal) {
      if (n === 18) return false;
      n === 19 && (n = 17);
    }
    switch (n) {
      case 18:
        return this.X3(t, i, e, s);
      case 19:
        return this.Y3(t, i, e, s);
      case 17:
        return this.K3(t, i, e, s);
      default:
        return false;
    }
  }
  X3(t, i, e, s) {
    const n = this.getPoint(t),
      o = this.getPoint(e);
    if (n.equalsApprox(i) && o.equalsApprox(s)) return true;
    const r = n.x,
      l = n.y,
      h = o.x,
      a = o.y;
    let f = h - r,
      c = a - l;
    const u = Math.sqrt(f * f + c * c);
    if (G.q(u, 0)) return true;
    let d = 0;
    G.q(f, 0)
      ? c < 0
        ? (d = -Math.PI / 2)
        : (d = Math.PI / 2)
      : ((d = Math.atan(c / Math.abs(f))), f < 0 && (d = Math.PI - d));
    const m = i.x,
      g = i.y,
      p = s.x,
      y = s.y,
      x = p - m,
      b = y - g,
      S = Math.sqrt(x * x + b * b);
    let k = 0;
    G.q(x, 0)
      ? b < 0
        ? (k = -Math.PI / 2)
        : (k = Math.PI / 2)
      : ((k = Math.atan(b / Math.abs(x))), x < 0 && (k = Math.PI - k));
    const P = S / u,
      A = k - d;
    this.setPoint(t, i);
    for (let C = t + 1; C < e; C++) {
      const M = this.getPoint(C);
      ((f = M.x - r), (c = M.y - l));
      const N = Math.sqrt(f * f + c * c);
      if (G.q(N, 0)) continue;
      let T = 0;
      G.q(f, 0)
        ? c < 0
          ? (T = -Math.PI / 2)
          : (T = Math.PI / 2)
        : ((T = Math.atan(c / Math.abs(f))), f < 0 && (T = Math.PI - T));
      const L = T + A,
        D = N * P,
        F = m + D * Math.cos(L),
        R = g + D * Math.sin(L);
      this.setPointAt(C, F, R);
    }
    return (this.setPoint(e, s), true);
  }
  Y3(t, i, e, s) {
    const n = this.getPoint(t),
      o = this.getPoint(e);
    if (n.equalsApprox(i) && o.equalsApprox(s)) return true;
    const r = n.x,
      l = n.y,
      h = o.x,
      a = o.y,
      f = (h - r) ** 2 + (a - l) ** 2,
      c = i.x,
      u = i.y,
      d = s.x,
      m = s.y;
    let g = 0,
      p = 1;
    (d - c !== 0 ? ((g = (m - u) / (d - c)), (p = Math.sqrt(1 + 1 / (g * g)))) : (g = 9e9), this.setPoint(t, i));
    for (let y = t + 1; y < e; y++) {
      const x = this.getPoint(y),
        b = x.x,
        S = x.y;
      let k = 0.5;
      f !== 0 && (k = ((r - b) * (r - h) + (l - S) * (l - a)) / f);
      const P = r + k * (h - r),
        A = l + k * (a - l);
      let C = Math.sqrt((b - P) ** 2 + (S - A) ** 2);
      (S < g * (b - P) + A && (C = -C), g > 0 && (C = -C));
      const M = c + k * (d - c),
        N = u + k * (m - u);
      if (g !== 0) {
        const T = M + C / p,
          L = N - (T - M) / g;
        this.setPointAt(y, T, L);
      } else this.setPointAt(y, M, N + C);
    }
    return (this.setPoint(e, s), true);
  }
  K3(t, i, e, s) {
    if (this.isOrthogonal) {
      let n = this.getPoint(t),
        o = this.getPoint(t + 1),
        r = this.getPoint(t + 2),
        l = o.x,
        h = o.y;
      const a = l,
        f = h;
      (G.u(n.y, o.y)
        ? G.u(o.x, r.x)
          ? (h = i.y)
          : G.u(o.y, r.y) && (l = i.x)
        : G.u(n.x, o.x) && (G.u(o.y, r.y) ? (l = i.x) : G.u(o.x, r.x) && (h = i.y)),
        this.setPointAt(t + 1, l, h),
        (n = this.getPoint(e)),
        (o = this.getPoint(e - 1)),
        (r = this.getPoint(e - 2)));
      let c = o.x,
        u = o.y;
      const d = c,
        m = u;
      if (
        (G.u(n.y, o.y)
          ? G.u(o.x, r.x)
            ? (u = s.y)
            : G.u(o.y, r.y) && (c = s.x)
          : G.u(n.x, o.x) && (G.u(o.y, r.y) ? (c = s.x) : G.u(o.x, r.x) && (u = s.y)),
        this.setPointAt(e - 1, c, u),
        this.kL())
      )
        return (this.setPointAt(t + 1, a, f), this.setPointAt(e - 1, d, m), false);
    }
    return (this.setPoint(t, i), this.setPoint(e, s), true);
  }
  addOrthoPoints(t, i, e, s, n, o) {
    ((i = G.Yi(i)), (s = G.Yi(s)));
    const f = s;
    (i >= 315 || i < 45 ? (i = 0) : 45 <= i && i < 135 ? (i = 90) : 135 <= i && i < 225 ? (i = 180) : (i = 270),
      s >= 315 || s < 45 ? (s = 0) : 45 <= s && s < 135 ? (s = 90) : 135 <= s && s < 225 ? (s = 180) : (s = 270));
    const c = t,
      u = e,
      d = Rect.Ms(n.actualBounds),
      m = Rect.Ms(o.actualBounds);
    (d.inflate(Link.zh, Link.zh), m.inflate(Link.zh, Link.zh), d.unionPoint(t), m.unionPoint(e));
    const g = Point.a(),
      p = Point.a(),
      y = m.containsPoint(c) || d.containsPoint(u);
    (i === 0
      ? u.x > c.x || (s === 270 && u.y < c.y && m.right > c.x) || (s === 90 && u.y > c.y && m.right > c.x)
        ? (g.e(u.x, c.y),
          p.e(u.x, (c.y + u.y) / 2),
          s === 180
            ? ((g.x = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, false)), (p.x = g.x), (p.y = u.y))
            : (s === 270 && u.y < c.y) || (s === 90 && u.y > c.y)
              ? (c.x < m.left
                  ? (g.x = this.computeMidOrthoPosition(c.x, c.y, m.left, u.y, false))
                  : c.x < m.right && ((s === 270 && c.y < m.top) || (s === 90 && c.y > m.bottom))
                    ? (g.x = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, false))
                    : (g.x = m.right),
                (p.x = g.x),
                (p.y = u.y))
              : s === 0 &&
                c.x < m.left &&
                c.y > m.top &&
                c.y < m.bottom &&
                ((g.x = c.x), c.y < u.y ? (g.y = Math.min(u.y, m.top)) : (g.y = Math.max(u.y, m.bottom)), (p.y = g.y)))
        : (g.e(c.x, u.y),
          p.e((c.x + u.x) / 2, u.y),
          (s === 180 || (s === 90 && u.y < d.top) || (s === 270 && u.y > d.bottom)) &&
            (s === 180 && y
              ? (g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, true))
              : u.y < c.y && (s === 180 || s === 90)
                ? (g.y = this.computeMidOrthoPosition(c.x, d.top, u.x, (y ? Math.min : Math.max)(u.y, m.bottom), true))
                : u.y > c.y &&
                  (s === 180 || s === 270) &&
                  (g.y = this.computeMidOrthoPosition(c.x, d.bottom, u.x, (y ? Math.max : Math.min)(u.y, m.top), true)),
            (p.x = u.x),
            (p.y = g.y)),
          g.y > d.top &&
            g.y < d.bottom &&
            ((u.x >= d.left && u.x <= c.x) || (c.x <= m.right && c.x >= u.x)
              ? (s === 90 || s === 270) && (g.e(Math.max((c.x + u.x) / 2, c.x), c.y), p.e(g.x, u.y))
              : (s === 270 || ((s === 0 || s === 180) && u.y < c.y)
                  ? (g.y = Math.min(u.y, s === 0 ? d.top : Math.min(d.top, m.top)))
                  : (g.y = Math.max(u.y, s === 0 ? d.bottom : Math.max(d.bottom, m.bottom))),
                (p.x = u.x),
                (p.y = g.y))))
      : i === 180
        ? u.x < c.x || (s === 270 && u.y < c.y && m.left < c.x) || (s === 90 && u.y > c.y && m.left < c.x)
          ? (g.e(u.x, c.y),
            p.e(u.x, (c.y + u.y) / 2),
            s === 0
              ? ((g.x = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, false)), (p.x = g.x), (p.y = u.y))
              : (s === 270 && u.y < c.y) || (s === 90 && u.y > c.y)
                ? (c.x > m.right
                    ? (g.x = this.computeMidOrthoPosition(c.x, c.y, m.right, u.y, false))
                    : c.x > m.left && ((s === 270 && c.y < m.top) || (s === 90 && c.y > m.bottom))
                      ? (g.x = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, false))
                      : (g.x = m.left),
                  (p.x = g.x),
                  (p.y = u.y))
                : s === 180 &&
                  c.x > m.right &&
                  c.y > m.top &&
                  c.y < m.bottom &&
                  ((g.x = c.x),
                  c.y < u.y ? (g.y = Math.min(u.y, m.top)) : (g.y = Math.max(u.y, m.bottom)),
                  (p.y = g.y)))
          : (g.e(c.x, u.y),
            p.e((c.x + u.x) / 2, u.y),
            (s === 0 || (s === 90 && u.y < d.top) || (s === 270 && u.y > d.bottom)) &&
              (s === 0 && y
                ? (g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, true))
                : u.y < c.y && (s === 0 || s === 90)
                  ? (g.y = this.computeMidOrthoPosition(c.x, d.top, u.x, (y ? Math.min : Math.max)(u.y, m.bottom), true))
                  : u.y > c.y &&
                    (s === 0 || s === 270) &&
                    (g.y = this.computeMidOrthoPosition(c.x, d.bottom, u.x, (y ? Math.max : Math.min)(u.y, m.top), true)),
              (p.x = u.x),
              (p.y = g.y)),
            g.y > d.top &&
              g.y < d.bottom &&
              ((u.x <= d.right && u.x >= c.x) || (c.x >= m.left && c.x <= u.x)
                ? (s === 90 || s === 270) && (g.e(Math.min((c.x + u.x) / 2, c.x), c.y), p.e(g.x, u.y))
                : (s === 270 || ((s === 0 || s === 180) && u.y < c.y)
                    ? (g.y = Math.min(u.y, s === 180 ? d.top : Math.min(d.top, m.top)))
                    : (g.y = Math.max(u.y, s === 180 ? d.bottom : Math.max(d.bottom, m.bottom))),
                  (p.x = u.x),
                  (p.y = g.y))))
        : i === 90
          ? u.y > c.y || (s === 180 && u.x < c.x && m.bottom > c.y) || (s === 0 && u.x > c.x && m.bottom > c.y)
            ? (g.e(c.x, u.y),
              p.e((c.x + u.x) / 2, u.y),
              s === 270
                ? ((g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, true)), (p.x = u.x), (p.y = g.y))
                : (s === 180 && u.x < c.x) || (s === 0 && u.x > c.x)
                  ? (c.y < m.top
                      ? (g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, m.top, true))
                      : c.y < m.bottom && ((s === 180 && c.x < m.left) || (s === 0 && c.x > m.right))
                        ? (g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, true))
                        : (g.y = m.bottom),
                    (p.x = u.x),
                    (p.y = g.y))
                  : s === 90 &&
                    c.y < m.top &&
                    c.x > m.left &&
                    c.x < m.right &&
                    (c.x < u.x ? (g.x = Math.min(u.x, m.left)) : (g.x = Math.max(u.x, m.right)),
                    (g.y = c.y),
                    (p.x = g.x)))
            : (g.e(u.x, c.y),
              p.e(u.x, (c.y + u.y) / 2),
              (s === 270 || (s === 0 && u.x < d.left) || (s === 180 && u.x > d.right)) &&
                (s === 270 && y
                  ? (g.x = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, false))
                  : u.x < c.x && (s === 270 || s === 0)
                    ? (g.x = this.computeMidOrthoPosition(
                        d.left,
                        c.y,
                        (y ? Math.min : Math.max)(u.x, m.right),
                        u.y,
                        false,
                      ))
                    : u.x > c.x &&
                      (s === 270 || s === 180) &&
                      (g.x = this.computeMidOrthoPosition(
                        d.right,
                        c.y,
                        (y ? Math.max : Math.min)(u.x, m.left),
                        u.y,
                        false,
                      )),
                (p.x = g.x),
                (p.y = u.y)),
              g.x > d.left &&
                g.x < d.right &&
                ((u.y >= d.top && u.y <= c.y) || (c.y <= m.bottom && c.y >= u.y)
                  ? (s === 0 || s === 180) && (g.e(c.x, Math.max((c.y + u.y) / 2, c.y)), p.e(u.x, g.y))
                  : (s === 180 || ((s === 90 || s === 270) && u.x < c.x)
                      ? (g.x = Math.min(u.x, s === 90 ? d.left : Math.min(d.left, m.left)))
                      : (g.x = Math.max(u.x, s === 90 ? d.right : Math.max(d.right, m.right))),
                    (p.x = g.x),
                    (p.y = u.y))))
          : u.y < c.y || (s === 180 && u.x < c.x && m.top < c.y) || (s === 0 && u.x > c.x && m.top < c.y)
            ? (g.e(c.x, u.y),
              p.e((c.x + u.x) / 2, u.y),
              s === 90
                ? ((g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, true)), (p.x = u.x), (p.y = g.y))
                : (s === 180 && u.x < c.x) || (s === 0 && u.x >= c.x)
                  ? (c.y > m.bottom
                      ? (g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, m.bottom, true))
                      : c.y > m.top && ((s === 180 && c.x < m.left) || (s === 0 && c.x > m.right))
                        ? (g.y = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, true))
                        : (g.y = m.top),
                    (p.x = u.x),
                    (p.y = g.y))
                  : s === 270 &&
                    c.y > m.bottom &&
                    c.x > m.left &&
                    c.x < m.right &&
                    (c.x < u.x ? (g.x = Math.min(u.x, m.left)) : (g.x = Math.max(u.x, m.right)),
                    (g.y = c.y),
                    (p.x = g.x)))
            : (g.e(u.x, c.y),
              p.e(u.x, (c.y + u.y) / 2),
              (s === 90 || (s === 0 && u.x < d.left) || (s === 180 && u.x > d.right)) &&
                (s === 90 && y
                  ? (g.x = this.computeMidOrthoPosition(c.x, c.y, u.x, u.y, false))
                  : u.x < c.x && (s === 90 || s === 0)
                    ? (g.x = this.computeMidOrthoPosition(
                        d.left,
                        c.y,
                        (y ? Math.min : Math.max)(u.x, m.right),
                        u.y,
                        false,
                      ))
                    : u.x > c.x &&
                      (s === 90 || s === 180) &&
                      (g.x = this.computeMidOrthoPosition(
                        d.right,
                        c.y,
                        (y ? Math.max : Math.min)(u.x, m.left),
                        u.y,
                        false,
                      )),
                (p.x = g.x),
                (p.y = u.y)),
              g.x > d.left &&
                g.x < d.right &&
                ((u.y <= d.bottom && u.y >= c.y) || (c.y >= m.top && c.y <= u.y)
                  ? (s === 0 || s === 180) && (g.e(c.x, Math.min((c.y + u.y) / 2, c.y)), p.e(u.x, g.y))
                  : (s === 180 || ((s === 90 || s === 270) && u.x < c.x)
                      ? (g.x = Math.min(u.x, s === 270 ? d.left : Math.min(d.left, m.left)))
                      : (g.x = Math.max(u.x, s === 270 ? d.right : Math.max(d.right, m.right))),
                    (p.x = g.x),
                    (p.y = u.y)))),
      (this.VC = s !== f),
      (this.TC = i),
      (this.LC = s),
      this.addPoint(g.copy()),
      this.addPoint(p.copy()),
      Point.o(g),
      Point.o(p),
      Rect.o(d),
      Rect.o(m));
  }
  computeMidOrthoPosition(t, i, e, s, n) {
    let o = 0;
    return (
      this.hasCurviness() &&
        !this.computeSpot(true, this.fromPort).isSide() &&
        !this.computeSpot(false, this.toPort).isSide() &&
        (o = this.computeCurviness()),
      n ? (i + s) / 2 + o : (t + e) / 2 + o
    );
  }
  kL() {
    if (this.diagram === null || !this.isAvoiding || this.diagram.animationManager.isTicking) return false;
    const t = this.points.h,
      i = t.length;
    if (i < 4) return false;
    const e = this.diagram.getPositions(false, this.containingGroup, null);
    for (let s = 1; s < i - 2; s++) {
      const n = t[s],
        o = t[s + 1];
      if (!e.isUnoccupied(Math.min(n.x, o.x), Math.min(n.y, o.y), Math.abs(n.x - o.x), Math.abs(n.y - o.y))) return true;
    }
    return false;
  }
  findClosestSegment(t) {
    Debug && U.s(t, Point, Link, "findClosestSegment:p");
    const i = t.x,
      e = t.y;
    let s = this.getPoint(0),
      n = this.getPoint(1),
      o = Point.distanceLineSegmentSquared(i, e, s.x, s.y, n.x, n.y),
      r = 0;
    for (let l = 1; l < this.pointsCount - 1; l++) {
      s = this.getPoint(l + 1);
      const h = Point.distanceLineSegmentSquared(i, e, n.x, n.y, s.x, s.y);
      ((n = s), h < o && ((r = l), (o = h)));
    }
    return r;
  }
  invalidateGeometry() {
    this.ce();
  }
  ce() {
    this.Xh && ((this.Xh = false), this.g());
  }
  get Xh() {
    return (this.Tt & 128) !== 0;
  }
  set Xh(t) {
    ((this.Tt & 128) !== 0) !== t && (this.Tt = this.Tt ^ 128);
  }
  get geometry() {
    if (!this.Xh) {
      if ((this.updateRoute(), this.pointsCount < 2)) return ((this.Xh = true), this.xt);
      ((this.xt = this.makeGeometry()), (this.Xh = true));
    }
    return this.xt;
  }
  Ed(t) {
    if (!t) {
      if (this.Ve === false) return;
      const n = this.findMainElement();
      if (this.Xh && (n === null || n.geometry !== null)) return;
    }
    (this.pointsCount >= 2 && (this.xt = this.makeGeometry()), (this.Xh = true));
    const i = this.path;
    if (i === null) return;
    i.xt = this.xt;
    const e = this.O.h,
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n];
      o !== i && o.isPanelMain && o instanceof Shape && (o.xt = this.xt);
    }
  }
  U3(t) {
    return (
      this.of() &&
      t.gh.has(this) &&
      (this.Ml.width !== 0 || this.Ml.height !== 0) &&
      (t.animationManager.isAnimating || t.currentTool !== t.toolManager)
    );
  }
  makeGeometry() {
    const t = this.xt,
      i = this.pointsCount;
    let e = false;
    const s = this.diagram;
    s !== null && this.U3(s) && (e = true);
    let n = 0,
      o = 0,
      r = Point.Ms(this.getPoint(0));
    const l = Point.Ms(r),
      h = this.Ti.h,
      a = this.computeCurve();
    if (a === 9 && i >= 3 && !G.q(this.smoothness, 0))
      if (i === 3) {
        let f = this.getPoint(1);
        ((n = Math.min(r.x, f.x)),
          (o = Math.min(r.y, f.y)),
          (f = this.getPoint(2)),
          (n = Math.min(n, f.x)),
          (o = Math.min(o, f.y)));
      } else if (this.isOrthogonal) {
        for (let f = 0; f < i; f++) {
          const c = h[f];
          ((l.x = Math.min(c.x, l.x)), (l.y = Math.min(c.y, l.y)));
        }
        ((n = l.x), (o = l.y));
      } else {
        for (let f = 3; f < i; f += 3) {
          f + 3 >= i && (f = i - 1);
          const c = this.getPoint(f);
          ((l.x = Math.min(c.x, l.x)), (l.y = Math.min(c.y, l.y)));
        }
        ((n = l.x), (o = l.y));
      }
    else {
      for (let f = 0; f < i; f++) {
        const c = h[f];
        ((l.x = Math.min(c.x, l.x)), (l.y = Math.min(c.y, l.y)));
      }
      ((n = l.x), (o = l.y));
    }
    if (
      ((n -= this.wS.x),
      (o -= this.wS.y),
      (r.x -= n),
      (r.y -= o),
      this.computeShortLength(true) !== 0 && (r = this.lf(r, true, l)),
      i === 2 && !this.of())
    ) {
      let f = Point.Ms(this.getPoint(1));
      return (
        (f.x -= n),
        (f.y -= o),
        this.computeShortLength(false) !== 0 && (f = this.lf(f, false, l)),
        (t.type = 1),
        (t.startX = r.x),
        (t.startY = r.y),
        (t.endX = f.x),
        (t.endY = f.y),
        Point.o(f),
        Point.o(r),
        Point.o(l),
        t
      );
    } else {
      t.type = 4;
      const f = GeoStream.QA(t);
      if ((f.Ru(r.x, r.y, false, false), a === 9 && i >= 3 && !G.q(this.smoothness, 0)))
        if (i === 3) {
          const c = this.getPoint(1),
            u = c.x - n,
            d = c.y - o,
            m = Point.Ms(this.getPoint(2));
          ((m.x -= n),
            (m.y -= o),
            this.computeShortLength(false) !== 0 && this.lf(m, false, l),
            f.Pr(u, d, u, d, m.x, m.y),
            Point.o(m));
        } else if (this.isOrthogonal) {
          const c = Point.U(n, o),
            u = Point.Ms(this.getPoint(1)),
            d = Point.U(n, o),
            m = Point.U(n, o);
          let g = this.getPoint(0),
            p;
          const y = this.smoothness / 3;
          for (let k = 1; k < this.pointsCount - 1; k++) {
            p = this.getPoint(k);
            const P = g,
              A = p,
              C = this.getPoint(this.KC(p, k, false));
            (G.q(P.x, A.x) && G.q(A.x, C.x)) ||
              (G.q(P.y, A.y) && G.q(A.y, C.y)) ||
              (this.G3(P, A, C, y, d, m),
              (k === 1 || (k === 2 && G.q(g.x, this.getPoint(0).x) && G.q(g.y, this.getPoint(0).y))) &&
                ((u.x = (g.x + p.x) * 0.5), (u.y = (g.y + p.y) * 0.5)),
              f.Pr(u.x - n, u.y - o, d.x - n, d.y - o, p.x - n, p.y - o),
              c.c(d),
              u.c(m),
              (g = p));
          }
          let x = g.x,
            b = g.y;
          const S = Point.Ms(this.getPoint(this.pointsCount - 1));
          (this.computeShortLength(false) !== 0 && this.lf(S, false, Point.wn),
            (x = 0.5 * (x + S.x)),
            (b = 0.5 * (b + S.y)),
            f.Pr(m.x - n, m.y - o, x - n, b - o, S.x - n, S.y - o),
            Point.o(S),
            Point.o(c),
            Point.o(u),
            Point.o(d),
            Point.o(m));
        } else
          for (let c = 3; c < i; c += 3) {
            const u = this.getPoint(c - 2);
            c + 3 >= i && (c = i - 1);
            const d = this.getPoint(c - 1),
              m = Point.Ms(this.getPoint(c));
            (c === i - 1 && this.computeShortLength(false) !== 0 && this.lf(m, false, Point.wn),
              f.Pr(u.x - n, u.y - o, d.x - n, d.y - o, m.x - n, m.y - o),
              Point.o(m));
          }
      else if (this.isOrthogonal || i === 2) {
        const c = Point.Ms(this.getPoint(0)),
          u = Point.a(),
          d = Point.Ms(c),
          m = this.computeCorner();
        let g = 1,
          p = 0;
        for (; g < i; ) {
          if (((g = this.KC(c, g, g > 1)), u.c(this.getPoint(g)), g >= i - 1)) {
            if (!c.equals(u))
              (this.computeShortLength(false) !== 0 && this.lf(u, false, Point.wn), this.Yn(f, -n, -o, c, u, e));
            else if (p === 0)
              for (g = 1; g < i; ) (d.c(c), u.c(this.getPoint(g++)), this.Yn(f, -n, -o, c, u, e), c.c(u));
            break;
          }
          p = this.KC(u, g + 1, g < i - 3);
          const y = this.getPoint(p);
          (this.q3(f, -n, -o, c, u, y, c, d, m, e), d.c(u), (g = p));
        }
        (Point.o(c), Point.o(u), Point.o(d));
      } else {
        const c = this.computeCorner();
        if (i > 2 && c >= 0.5) {
          const u = Point.Ms(h[i - 1]);
          (this.computeShortLength(false) !== 0 && this.lf(u, false, Point.wn), (r.x += n), (r.y += o));
          for (let d = 1; d < i; d++) {
            const m = d === 1 ? r : h[d - 1],
              g = d === i - 1 ? u : h[d],
              p = Math.sqrt(m.distanceSquaredPoint(g)),
              y = c / p;
            if (y < 0.5) {
              if (d > 1) {
                const x = m.x + (g.x - m.x) * y,
                  b = m.y + (g.y - m.y) * y;
                f.Ou(m.x - n, m.y - o, x - n, b - o);
              }
              f.js(g.x + (m.x - g.x) * y - n, g.y + (m.y - g.y) * y - o);
            } else d > 1 && f.Ou(m.x - n, m.y - o, (m.x + g.x) / 2 - n, (m.y + g.y) / 2 - o);
            d === i - 1 && f.js(u.x - n, u.y - o);
          }
          Point.o(u);
        } else if (i >= 2) {
          const u = Point.Ms(h[i - 1]);
          this.computeShortLength(false) !== 0 && this.lf(u, false, Point.wn);
          for (let d = 1; d < i - 1; d++) f.js(h[d].x - n, h[d].y - o);
          (f.js(u.x - n, u.y - o), Point.o(u));
        }
      }
      return (GeoStream._A(f), Point.o(r), Point.o(l), t);
    }
  }
  NS(t, i, e, s) {
    let n = e - t;
    if (isNaN(n) || n === 1 / 0 || n === -1 / 0) return NaN;
    n < 0 && (n = -n);
    let o = s - i;
    return isNaN(o) || o === 1 / 0 || o === -1 / 0
      ? NaN
      : (o < 0 && (o = -o), G.q(n, 0) ? o : G.q(o, 0) ? n : Math.sqrt(n * n + o * o));
  }
  G3(t, i, e, s, n, o) {
    isNaN(s) && (s = this.smoothness / 3);
    const r = t.x,
      l = t.y,
      h = i.x,
      a = i.y,
      f = e.x,
      c = e.y,
      u = s * this.NS(r, l, h, a),
      d = s * this.NS(h, a, f, c);
    if (
      (G.q(l, a) &&
        G.q(h, f) &&
        (h > r
          ? c > a
            ? ((n.x = h - u), (n.y = a - u), (o.x = h + d), (o.y = a + d))
            : ((n.x = h - u), (n.y = a + u), (o.x = h + d), (o.y = a - d))
          : c > a
            ? ((n.x = h + u), (n.y = a - u), (o.x = h - d), (o.y = a + d))
            : ((n.x = h + u), (n.y = a + u), (o.x = h - d), (o.y = a - d))),
      G.q(r, h) &&
        G.q(a, c) &&
        (a > l
          ? f > h
            ? ((n.x = h - u), (n.y = a - u), (o.x = h + d), (o.y = a + d))
            : ((n.x = h + u), (n.y = a - u), (o.x = h - d), (o.y = a + d))
          : f > h
            ? ((n.x = h - u), (n.y = a + u), (o.x = h + d), (o.y = a - d))
            : ((n.x = h + u), (n.y = a + u), (o.x = h - d), (o.y = a - d))),
      (G.q(r, h) && G.q(h, f)) || (G.q(l, a) && G.q(a, c)))
    ) {
      const m = 0.5 * (r + f),
        g = 0.5 * (l + c);
      ((n.x = m), (n.y = g), (o.x = m), (o.y = g));
    }
  }
  lf(t, i, e) {
    const s = this.pointsCount;
    if (s < 2) return t;
    if (i) {
      const n = this.getPoint(1),
        o = n.x - e.x,
        r = n.y - e.y,
        l = this.NS(t.x, t.y, o, r);
      if (l === 0) return t;
      const h = s === 2 ? l * 0.5 : l;
      let a = this.computeShortLength(true);
      a > h && (a = h);
      const f = (a * (o - t.x)) / l,
        c = (a * (r - t.y)) / l;
      ((t.x += f), (t.y += c));
    } else {
      const n = this.getPoint(s - 2),
        o = n.x - e.x,
        r = n.y - e.y,
        l = this.NS(t.x, t.y, o, r);
      if (l === 0) return t;
      const h = s === 2 ? l * 0.5 : l;
      let a = this.computeShortLength(false);
      a > h && (a = h);
      const f = (a * (t.x - o)) / l,
        c = (a * (t.y - r)) / l;
      ((t.x -= f), (t.y -= c));
    }
    return t;
  }
  KC(t, i, e) {
    const s = this.pointsCount;
    let n = t;
    for (; G.q(t.x, n.x) && G.q(t.y, n.y); ) {
      if (i >= s) return s - 1;
      n = this.getPoint(i++);
    }
    if (!G.q(t.x, n.x) && !G.q(t.y, n.y)) return i - 1;
    let o = n;
    for (
      ;
      (G.q(t.x, n.x) && G.q(n.x, o.x) && (!e || (t.y >= n.y ? n.y >= o.y : n.y <= o.y))) ||
      (G.q(t.y, n.y) && G.q(n.y, o.y) && (!e || (t.x >= n.x ? n.x >= o.x : n.x <= o.x)));
    ) {
      if (i >= s) return s - 1;
      o = this.getPoint(i++);
    }
    return i - 2;
  }
  q3(t, i, e, s, n, o, r, l, h, a) {
    if (G.u(s.y, n.y) && G.u(n.x, o.x)) {
      let f = Math.min(h, Math.abs(n.x - l.x) / 2);
      const c = Math.min(f, Math.abs(o.y - n.y) / 2);
      if (((f = c), G.u(f, 0))) {
        (this.Yn(t, i, e, s, n, a), r.c(n));
        return;
      }
      let u = n.x;
      const d = n.y,
        m = u;
      let g = d;
      n.x > s.x
        ? ((u = n.x - f), o.y > n.y ? (g = n.y + c) : (g = n.y - c))
        : ((u = n.x + f), o.y > n.y ? (g = n.y + c) : (g = n.y - c));
      const p = Point.U(u, d);
      (this.Yn(t, i, e, s, p, a), Point.o(p), t.Ou(n.x + i, n.y + e, m + i, g + e), r.e(m, g));
    } else if (G.u(s.x, n.x) && G.u(n.y, o.y)) {
      let f = Math.min(h, Math.abs(n.y - l.y) / 2);
      const c = Math.min(f, Math.abs(o.x - n.x) / 2);
      if (((f = c), G.u(c, 0))) {
        (this.Yn(t, i, e, s, n, a), r.c(n));
        return;
      }
      const u = n.x;
      let d = n.y,
        m = u;
      const g = d;
      n.y > s.y
        ? ((d = n.y - f), o.x > n.x ? (m = n.x + c) : (m = n.x - c))
        : ((d = n.y + f), o.x > n.x ? (m = n.x + c) : (m = n.x - c));
      const p = Point.U(u, d);
      (this.Yn(t, i, e, s, p, a), Point.o(p), t.Ou(n.x + i, n.y + e, m + i, g + e), r.e(m, g));
    } else (this.Yn(t, i, e, s, n, a), r.c(n));
  }
  Yn(t, i, e, s, n, o) {
    if (o || !this.of()) t.js(n.x + i, n.y + e);
    else {
      const r = Link.uF,
        l = r / 2,
        h = [];
      let a = 0;
      this.isVisible() && (a = this.H3(s, n, h));
      let f = s.x,
        c = s.y;
      if (a > 0) {
        if (G.u(s.y, n.y))
          if (s.x < n.x) {
            let u = 0;
            for (; u < a; ) {
              const d = Math.max(s.x, Math.min(h[u++] - l, n.x - r));
              (t.js(d + i, n.y + e), (f = d + i), (c = n.y + e));
              let m = Math.min(d + r, n.x);
              for (; u < a; ) {
                const x = h[u];
                if (x < m + r) (u++, (m = Math.min(x + l, n.x)));
                else break;
              }
              const g = n.y - r + e,
                p = m + i,
                y = n.y + e;
              (this.curve === 10 ? t.Ru(p, y, false, false) : t.Pr(f, g, p, g, p, y), (f = p), (c = y));
            }
          } else {
            let u = a - 1;
            for (; u >= 0; ) {
              const d = Math.min(s.x, Math.max(h[u--] + l, n.x + r));
              (t.js(d + i, n.y + e), (f = d + i), (c = n.y + e));
              let m = Math.max(d - r, n.x);
              for (; u >= 0; ) {
                const x = h[u];
                if (x > m - r) (u--, (m = Math.max(x - l, n.x)));
                else break;
              }
              const g = n.y - r + e,
                p = m + i,
                y = n.y + e;
              (this.curve === 10 ? t.Ru(p, y, false, false) : t.Pr(f, g, p, g, p, y), (f = p), (c = y));
            }
          }
        else if (G.u(s.x, n.x))
          if (s.y < n.y) {
            let u = 0;
            for (; u < a; ) {
              const d = Math.max(s.y, Math.min(h[u++] - l, n.y - r));
              (t.js(n.x + i, d + e), (f = n.x + i), (c = d + e));
              let m = Math.min(d + r, n.y);
              for (; u < a; ) {
                const x = h[u];
                if (x < m + r) (u++, (m = Math.min(x + l, n.y)));
                else break;
              }
              const g = n.x - r + i,
                p = n.x + i,
                y = m + e;
              (this.curve === 10 ? t.Ru(p, y, false, false) : t.Pr(g, c, g, y, p, y), (f = p), (c = y));
            }
          } else {
            let u = a - 1;
            for (; u >= 0; ) {
              const d = Math.min(s.y, Math.max(h[u--] + l, n.y + r));
              (t.js(n.x + i, d + e), (f = n.x + i), (c = d + e));
              let m = Math.max(d - r, n.y);
              for (; u >= 0; ) {
                const x = h[u];
                if (x > m - r) (u--, (m = Math.max(x - l, n.y)));
                else break;
              }
              const g = n.x - r + i,
                p = n.x + i,
                y = m + e;
              (this.curve === 10 ? t.Ru(p, y, false, false) : t.Pr(g, c, g, y, p, y), (f = p), (c = y));
            }
          }
      }
      t.js(n.x + i, n.y + e);
    }
  }
  H3(t, i, e) {
    const s = this.diagram;
    if (s === null || t.equals(i)) return 0;
    const n = s.layers;
    for (; n.next(); ) {
      const o = n.value;
      if (o !== null && o.visible) {
        const r = o.YM(),
          l = r.length;
        for (let h = 0; h < l; h++) {
          const a = r[h];
          if (!(a instanceof Link)) continue;
          if (a === this) return (e.length > 0 && e.sort((u, d) => u - d), e.length);
          if (!a.isVisible() || !a.of()) continue;
          const f = a.routeBounds;
          if (!f.isReal() || !this.routeBounds.intersectsRect(f) || this.usesSamePort(a)) continue;
          const c = a.path;
          c !== null && c.isVisibleObject() && this.v3(t, i, e, a);
        }
      }
    }
    return (e.length > 0 && e.sort((o, r) => o - r), e.length);
  }
  v3(t, i, e, s) {
    const n = G.u(t.y, i.y),
      o = s.pointsCount;
    let r = s.getPoint(0);
    const l = Point.a();
    for (let h = 1; h < o; h++) {
      const a = s.getPoint(h);
      if (h < o - 1) {
        const f = s.getPoint(h + 1);
        if (r.y === a.y && a.y === f.y) {
          if ((a.x > r.x && f.x >= a.x) || (a.x < r.x && f.x <= a.x)) continue;
        } else if (r.x === a.x && a.x === f.x && ((a.y > r.y && f.y >= a.y) || (a.y < r.y && f.y <= a.y))) continue;
      }
      (this.W3(t, i, r, a, l) && (n ? e.push(l.x) : e.push(l.y)), (r = a));
    }
    Point.o(l);
  }
  W3(t, i, e, s, n) {
    const o = t.x,
      r = t.y,
      l = i.x,
      h = i.y,
      a = e.x,
      f = e.y,
      c = s.x,
      u = s.y;
    if (G.u(o, l)) {
      if (
        !G.u(r, h) &&
        G.u(f, u) &&
        Math.min(r, h) < f &&
        Math.max(r, h) > f &&
        Math.min(a, c) < o &&
        Math.max(a, c) > o &&
        !G.u(a, c)
      )
        return ((n.x = o), (n.y = f), true);
    } else if (
      G.u(r, h) &&
      G.u(a, c) &&
      Math.min(o, l) < a &&
      Math.max(o, l) > a &&
      Math.min(f, u) < r &&
      Math.max(f, u) > r &&
      !G.u(f, u)
    )
      return ((n.x = a), (n.y = r), true);
    return ((n.x = 0), (n.y = 0), false);
  }
  get firstPickIndex() {
    return this.pointsCount <= 2 ? 0 : this.isOrthogonal || !this.Nl(this.computeSpot(true)) ? 1 : 0;
  }
  get lastPickIndex() {
    const t = this.pointsCount;
    return t === 0 ? 0 : t <= 2 ? t - 1 : this.isOrthogonal || !this.Nl(this.computeSpot(false)) ? t - 2 : t - 1;
  }
  of() {
    const t = this.curve;
    return t === 11 || t === 10;
  }
  SS(t) {
    if (t || this.of()) {
      const i = this.diagram;
      i !== null &&
        !i.animationManager.isTicking &&
        !i.gh.has(this) &&
        (this.Ml.width !== 0 || this.Ml.height !== 0) &&
        i.gh.set(this, this.Ml.copy());
    }
  }
  invalidateOtherJumpOvers(t) {
    const i = this.layer;
    if (i === null || !i.visible || i.isTemporary) return;
    const e = i.diagram;
    if (e === null || e.animationManager.isTicking) return;
    let s = false;
    const n = e.layers;
    for (; n.next(); ) {
      const o = n.value;
      if (o.visible) {
        if (o === i) {
          s = true;
          let r = false;
          const l = o.YM(),
            h = l.length;
          for (let a = 0; a < h; a++) {
            const f = l[a];
            f instanceof Link && (f === this ? (r = true) : r && this.PF(f, t));
          }
        } else if (s) {
          const r = o.YM(),
            l = r.length;
          for (let h = 0; h < l; h++) {
            const a = r[h];
            a instanceof Link && this.PF(a, t);
          }
        }
      }
    }
  }
  PF(t, i) {
    if (t === null || !t.Xh || !t.Ve || !t.of()) return;
    const e = t.routeBounds;
    e.isReal() && ((!this.routeBounds.intersectsRect(e) && !i.intersectsRect(e)) || this.usesSamePort(t) || t.ce());
  }
  usesSamePort(t) {
    const i = this.pointsCount,
      e = t.pointsCount;
    if (i > 0 && e > 0) {
      const s = this.getPoint(0),
        n = t.getPoint(0);
      if (s.equalsApprox(n)) return true;
      const o = this.getPoint(i - 1),
        r = t.getPoint(e - 1);
      if (o.equalsApprox(r) || s.equalsApprox(r) || o.equalsApprox(n)) return true;
    } else if (
      this.fromNode === t.fromNode ||
      this.toNode === t.toNode ||
      this.fromNode === t.toNode ||
      this.toNode === t.fromNode
    )
      return true;
    return false;
  }
  isVisible() {
    if (!super.isVisible()) return false;
    const t = this.containingGroup;
    let i = true;
    const e = this.diagram;
    e !== null && (i = e.isTreePathToChildren);
    const s = this.fromNode;
    if (s !== null) {
      if (this.isTreeLink && i && !s.isTreeExpanded) return false;
      if (s === t) return true;
      let o = s;
      for (; o !== null; ) {
        if (o.labeledLink === this) return true;
        o = o.containingGroup;
      }
      const r = s.findVisibleNode();
      if (r === null || r === t) return false;
    }
    const n = this.toNode;
    if (n !== null) {
      if (this.isTreeLink && !i && !n.isTreeExpanded) return false;
      if (n === t) return true;
      let o = n;
      for (; o !== null; ) {
        if (o.labeledLink === this) return true;
        o = o.containingGroup;
      }
      const r = n.findVisibleNode();
      if (r === null || r === t) return false;
    }
    return true;
  }
  Hi(t) {
    if ((super.Hi(t), t && this.SS(false), this.lr !== null && this.lr.ig(), this.an !== null)) {
      const e = this.an.iterator;
      for (; e.next(); ) e.value.Hi(t);
    }
  }
  get adjusting() {
    return this.Wc;
  }
  set adjusting(t) {
    const i = this.Wc;
    i !== t &&
      (Debug &&
        t !== 0 &&
        t !== 17 &&
        t !== 18 &&
        t !== 19 &&
        U.n("Link.adjusting can only be set to None, End, Scale, or Stretch, not: " + t),
      (this.Wc = t),
      this.t("adjusting", i, t));
  }
  computeAdjusting() {
    return this.isAvoiding && this.diagram !== null && this.diagram.animationManager.defaultAnimation.isAnimating
      ? 17
      : this.Wc;
  }
  get corner() {
    return this.ng;
  }
  set corner(t) {
    const i = this.ng;
    i !== t && (Debug && U.i(t, "number", Link, "corner"), (this.ng = t), this.ce(), this.t("corner", i, t));
  }
  get curve() {
    return this.og;
  }
  set curve(t) {
    const i = this.og;
    i !== t &&
      (Debug &&
        t !== 0 &&
        t !== 9 &&
        t !== 10 &&
        t !== 11 &&
        U.n("Link.curve can only be set to None, Bezier, JumpGap, or JumpOver, not: " + t),
      (this.og = t),
      (i === 9 || t === 9) && this.EC(this.Ml),
      this.ii(),
      this.ce(),
      this.SS(i === 10 || i === 11 || t === 10 || t === 11),
      this.t("curve", i, t));
  }
  get curviness() {
    return this.rg;
  }
  set curviness(t) {
    const i = this.rg;
    i !== t &&
      (Debug && U.i(t, "number", Link, "curviness"), (this.rg = t), this.ii(), this.ce(), this.t("curviness", i, t));
  }
  get routing() {
    return this.tf;
  }
  set routing(t) {
    const i = this.tf;
    i !== t &&
      (Debug &&
        t !== 1 &&
        t !== 2 &&
        t !== 6 &&
        t !== 7 &&
        U.n("Link.routing can only be set to Normal, Orthogonal, AvoidsNodes, not: " + t),
      (this.tf = t),
      this.isAvoiding && this.diagram !== null && (this.diagram.a0 = true),
      (this.rr = null),
      this.ii(),
      this.SS(Link.DC(i) || Link.DC(t)),
      this.t("routing", i, t));
  }
  get smoothness() {
    return this.lg;
  }
  set smoothness(t) {
    const i = this.lg;
    i !== t && (Debug && U.i(t, "number", Link, "smoothness"), (this.lg = t), this.ce(), this.t("smoothness", i, t));
  }
  Qy() {
    const t = this.xo;
    if (t === null) return;
    const i = this.So;
    if (i === null || !isNaN(this.curviness)) return;
    const e = this.bo,
      s = this.ko;
    let n = null,
      o = null;
    const r = t.ri.h,
      l = r.length;
    for (let h = 0; h < l; h++) {
      const a = r[h];
      (!(a.xo === t && a.bo === e && a.So === i && a.ko === s) &&
        !(a.xo === i && a.bo === s && a.So === t && a.ko === e)) ||
        (o === null ? (o = a) : (n === null && ((n = []), n.push(o)), n.push(a)));
    }
    if (n !== null) {
      let h = t.QD(i, e, s);
      (h === null && ((h = new LinkBundle(t, e, i, s)), t.$D(h), i.$D(h)), (h.fn = n));
      for (let a = 0; a < n.length; a++) {
        const f = n[a];
        f.lr = h;
      }
      h.ig();
    }
  }
  Zy() {
    const t = this.lr;
    if (t !== null) {
      if (!isNaN(this.curviness)) return;
      this.lr = null;
      const i = t.fn.indexOf(this);
      i >= 0 && (t.fn.splice(i, 1), t.ig());
    }
  }
  Ir() {
    return true;
  }
  get key() {
    const t = this.diagram;
    if (!(t === null || !t.model._a())) return t.model.getKeyForLinkData(this.data);
  }
}
