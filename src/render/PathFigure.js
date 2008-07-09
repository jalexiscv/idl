class PathFigure {
  l;
  Fe;
  Ie;
  Df;
  ym;
  Ze;
  constructor(t, i, e, s, n) {
    (e === void 0 && (e = true),
      s === void 0 && (s = true),
      n === void 0 && (n = false),
      (this.l = 2 | (e ? 4 : 0) | (s ? 8 : 0) | (n ? 16 : 0)),
      t !== void 0 ? (Debug && U.r(t, PathFigure, "sx"), (this.Fe = t)) : (this.Fe = 0),
      i !== void 0 ? (Debug && U.r(i, PathFigure, "sy"), (this.Ie = i)) : (this.Ie = 0),
      (this.Df = new List()),
      (this.ym = this.Df.ct),
      (this.Ze = null));
  }
  copy() {
    const t = new PathFigure();
    ((t.l = this.l & -2), (t.Fe = this.Fe), (t.Ie = this.Ie));
    const i = this.Df.h,
      e = i.length,
      s = t.Df;
    for (let n = 0; n < e; n++) {
      const r = i[n].copy();
      s.add(r);
    }
    return ((t.ym = this.ym), (t.Ze = this.Ze), t);
  }
  equalsApprox(t) {
    if (!(t instanceof PathFigure) || !G.u(this.startX, t.startX) || !G.u(this.startY, t.startY)) return false;
    const i = this.segments.h,
      e = t.segments.h,
      s = i.length;
    if (s !== e.length) return false;
    for (let n = 0; n < s; n++) {
      const o = i[n],
        r = e[n];
      if (!o.equalsApprox(r)) return false;
    }
    return true;
  }
  toString(t) {
    t === void 0 && (t = -1);
    let i = "";
    if (t < 0) i = "M" + this.startX.toString() + " " + this.startY.toString();
    else {
      const n = (o) => (o === 0 ? "0" : o.toFixed(t));
      i = "M" + n(this.startX) + " " + n(this.startY);
    }
    const e = this.segments.h,
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n];
      i += " " + o.toString(t);
    }
    return i;
  }
  get p() {
    return (this.l & 1) !== 0;
  }
  set p(t) {
    t ? (this.l |= 1) : (this.l &= -2);
  }
  get kt() {
    return (this.l & 2) !== 0;
  }
  set kt(t) {
    t ? (this.l |= 2) : (this.l &= -3);
  }
  k() {
    this.p = true;
    const t = this.segments;
    t.k();
    const i = t.h,
      e = t.length;
    for (let s = 0; s < e; s++) i[s].k();
    return this;
  }
  Yk() {
    if (this.kt) return true;
    const t = this.segments;
    if (this.ym !== t.ct) return true;
    for (const i of t) if (i.kt) return true;
    return false;
  }
  cR() {
    ((this.kt = false), (this.Ze = null));
    const t = this.segments;
    this.ym = t.ct;
    for (const i of t) ((i.kt = false), (i.Js = null));
  }
  get isFilled() {
    return (this.l & 4) !== 0;
  }
  set isFilled(t) {
    (Debug && U.i(t, "boolean", PathFigure, "isFilled"), this.p && U.D(this, t), t ? (this.l |= 4) : (this.l &= -5));
  }
  get isShadowed() {
    return (this.l & 8) !== 0;
  }
  set isShadowed(t) {
    (Debug && U.i(t, "boolean", PathFigure, "isShadowed"), this.p && U.D(this, t), t ? (this.l |= 8) : (this.l &= -9));
  }
  get isEvenOdd() {
    return (this.l & 16) !== 0;
  }
  set isEvenOdd(t) {
    (Debug && U.i(t, "boolean", PathFigure, "isEvenOdd"), this.p && U.D(this, t), t ? (this.l |= 16) : (this.l &= -17));
  }
  get startX() {
    return this.Fe;
  }
  set startX(t) {
    (Debug && U.r(t, PathFigure, "startX"), this.p && U.D(this, t), (this.Fe = t), (this.Ze = null), (this.kt = true));
  }
  get startY() {
    return this.Ie;
  }
  set startY(t) {
    (Debug && U.r(t, PathFigure, "startY"), this.p && U.D(this, t), (this.Ie = t), (this.Ze = null), (this.kt = true));
  }
  get segments() {
    return this.Df;
  }
  set segments(t) {
    (Debug && U.s(t, List, PathFigure, "segments"),
      this.p && U.D(this, t),
      (this.Df = t),
      (this.Ze = null),
      (this.kt = true));
  }
  add(t) {
    return (Debug && U.s(t, PathSegment, PathFigure, "add"), this.Df.add(t), (this.Ze = null), this);
  }
  Uk(t, i, e) {
    const s = this;
    let n = s.startX,
      o = s.startY,
      r = n,
      l = o;
    const h = s.segments.h,
      a = h.length;
    for (let f = 0; f < a; f++) {
      const c = h[f];
      switch (c.type) {
        case 1:
          ((r = c.endX), (l = c.endY), (n = c.endX), (o = c.endY));
          break;
        case 2:
          if (G.Ui(n, o, c.endX, c.endY, e, t, i)) return true;
          ((n = c.endX), (o = c.endY));
          break;
        case 3:
          if (G.fx(n, o, c.point1X, c.point1Y, c.point2X, c.point2Y, c.endX, c.endY, 0.5, t, i, e)) return true;
          ((n = c.endX), (o = c.endY));
          break;
        case 4:
          if (G.zk(n, o, c.point1X, c.point1Y, c.endX, c.endY, 0.5, t, i, e)) return true;
          ((n = c.endX), (o = c.endY));
          break;
        case 5:
        case 6:
          const u = c.type === 5 ? c.Vo(s) : c.na(s, n, o),
            d = u.length,
            m = c.type === 5 ? c.centerX : c.endX,
            g = c.type === 5 ? c.centerY : c.endY;
          if (d === 0) {
            if (G.Ui(n, o, m, g, e, t, i)) return true;
            ((n = m), (o = g));
            break;
          }
          let p = null;
          for (let y = 0; y < d; y++)
            if (
              ((p = u[y]),
              (y === 0 && G.Ui(n, o, p[0], p[1], e, t, i)) ||
                G.fx(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], 0.5, t, i, e))
            )
              return true;
          p !== null && ((n = p[6]), (o = p[7]));
          break;
        default:
          U.n("Unknown Segment type: " + c.type);
      }
      if (c.isClosed && (n !== r || o !== l) && G.Ui(n, o, r, l, e, t, i)) return true;
    }
    return false;
  }
}
var SegmentType = ((w) => (
  (w[(w.Move = 1)] = "Move"),
  (w[(w.Line = 2)] = "Line"),
  (w[(w.Bezier = 3)] = "Bezier"),
  (w[(w.QuadraticBezier = 4)] = "QuadraticBezier"),
  (w[(w.Arc = 5)] = "Arc"),
  (w[(w.SvgArc = 6)] = "SvgArc"),
  w
))(SegmentType || {});
