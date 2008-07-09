class PathSegment {
  tt;
  l;
  le;
  he;
  Sn;
  Rl;
  Ol;
  Mr;
  Js;
  constructor(t, i, e, s, n, o, r, l) {
    if (
      (GSet._i(this),
      t === void 0 ? (t = 2) : Debug && U.W(t, SegmentType, "SegmentType"),
      (this.tt = t),
      (this.l = 2),
      i !== void 0 ? (Debug && U.r(i, PathSegment, "ex"), (this.le = i)) : (this.le = 0),
      e !== void 0 ? (Debug && U.r(e, PathSegment, "ey"), (this.he = e)) : (this.he = 0),
      s === void 0 && (s = 0),
      n === void 0 && (n = 0),
      o === void 0 && (o = 0),
      r === void 0 && (r = 0),
      t === 6)
    ) {
      let h = o;
      ((h = h % 360),
        h < 0 && (h += 360),
        (this.Sn = h),
        (this.Rl = 0),
        Debug && U.r(s, PathSegment, "x1"),
        (this.Ol = Math.max(s, 0)),
        Debug && U.r(n, PathSegment, "y1"),
        (this.Mr = Math.max(n, 0)),
        typeof r == "boolean" ? r && (this.isLargeArc = true) : typeof r == "number" && r && (this.isLargeArc = true),
        l && (this.isClockwiseArc = true));
    } else
      (Debug && U.r(s, PathSegment, "x1"),
        (this.Sn = s),
        Debug && U.r(n, PathSegment, "y1"),
        (this.Rl = n),
        Debug && U.r(o, PathSegment, "x2"),
        t === 5 && (o = Math.max(o, 0)),
        (this.Ol = o),
        typeof r == "number" ? (t === 5 && (r = Math.max(r, 0)), (this.Mr = r)) : (this.Mr = 0));
    this.Js = null;
  }
  copy() {
    const t = new PathSegment();
    return (
      (t.tt = this.tt),
      (t.l = this.l & -2),
      (t.le = this.le),
      (t.he = this.he),
      (t.Sn = this.Sn),
      (t.Rl = this.Rl),
      (t.Ol = this.Ol),
      (t.Mr = this.Mr),
      t
    );
  }
  equalsApprox(t) {
    if (!(t instanceof PathSegment) || this.type !== t.type || this.isClosed !== t.isClosed) return false;
    switch (this.type) {
      case 1:
      case 2:
        return G.u(this.endX, t.endX) && G.u(this.endY, t.endY);
      case 3:
        return (
          G.u(this.endX, t.endX) &&
          G.u(this.endY, t.endY) &&
          G.u(this.point1X, t.point1X) &&
          G.u(this.point1Y, t.point1Y) &&
          G.u(this.point2X, t.point2X) &&
          G.u(this.point2Y, t.point2Y)
        );
      case 4:
        return (
          G.u(this.endX, t.endX) &&
          G.u(this.endY, t.endY) &&
          G.u(this.point1X, t.point1X) &&
          G.u(this.point1Y, t.point1Y)
        );
      case 5:
        return (
          G.u(this.startAngle, t.startAngle) &&
          G.u(this.sweepAngle, t.sweepAngle) &&
          G.u(this.centerX, t.centerX) &&
          G.u(this.centerY, t.centerY) &&
          G.u(this.radiusX, t.radiusX) &&
          G.u(this.radiusY, t.radiusY)
        );
      case 6:
        return (
          this.isClockwiseArc === t.isClockwiseArc &&
          this.isLargeArc === t.isLargeArc &&
          G.u(this.xAxisRotation, t.xAxisRotation) &&
          G.u(this.endX, t.endX) &&
          G.u(this.endY, t.endY) &&
          G.u(this.radiusX, t.radiusX) &&
          G.u(this.radiusY, t.radiusY)
        );
      default:
        return false;
    }
  }
  gi(t) {
    t in SegmentType ? (this.type = t) : U.wr(this, t);
  }
  toString(t) {
    t === void 0 && (t = -1);
    const i = (s) => (s === 0 ? "0" : s.toFixed(t));
    let e = "";
    switch (this.type) {
      case 1:
        t < 0
          ? (e = "M" + this.endX.toString() + " " + this.endY.toString())
          : (e = "M" + i(this.endX) + " " + i(this.endY));
        break;
      case 2:
        t < 0
          ? (e = "L" + this.endX.toString() + " " + this.endY.toString())
          : (e = "L" + i(this.endX) + " " + i(this.endY));
        break;
      case 3:
        t < 0
          ? (e =
              "C" +
              this.point1X.toString() +
              " " +
              this.point1Y.toString() +
              " " +
              this.point2X.toString() +
              " " +
              this.point2Y.toString() +
              " " +
              this.endX.toString() +
              " " +
              this.endY.toString())
          : (e =
              "C" +
              i(this.point1X) +
              " " +
              i(this.point1Y) +
              " " +
              i(this.point2X) +
              " " +
              i(this.point2Y) +
              " " +
              i(this.endX) +
              " " +
              i(this.endY));
        break;
      case 4:
        t < 0
          ? (e =
              "Q" +
              this.point1X.toString() +
              " " +
              this.point1Y.toString() +
              " " +
              this.endX.toString() +
              " " +
              this.endY.toString())
          : (e = "Q" + i(this.point1X) + " " + i(this.point1Y) + " " + i(this.endX) + " " + i(this.endY));
        break;
      case 5:
        t < 0
          ? (e =
              "B" +
              this.startAngle.toString() +
              " " +
              this.sweepAngle.toString() +
              " " +
              this.centerX.toString() +
              " " +
              this.centerY.toString() +
              " " +
              this.radiusX.toString() +
              " " +
              this.radiusY.toString())
          : (e =
              "B" +
              i(this.startAngle) +
              " " +
              i(this.sweepAngle) +
              " " +
              i(this.centerX) +
              " " +
              i(this.centerY) +
              " " +
              i(this.radiusX) +
              " " +
              i(this.radiusY));
        break;
      case 6:
        t < 0
          ? (e =
              "A" +
              this.radiusX.toString() +
              " " +
              this.radiusY.toString() +
              " " +
              this.xAxisRotation.toString() +
              " " +
              (this.isLargeArc ? 1 : 0) +
              " " +
              (this.isClockwiseArc ? 1 : 0) +
              " " +
              this.endX.toString() +
              " " +
              this.endY.toString())
          : (e =
              "A" +
              i(this.radiusX) +
              " " +
              i(this.radiusY) +
              " " +
              i(this.xAxisRotation) +
              " " +
              (this.isLargeArc ? 1 : 0) +
              " " +
              (this.isClockwiseArc ? 1 : 0) +
              " " +
              i(this.endX) +
              " " +
              i(this.endY));
        break;
      default:
        e = SegmentType[this.type];
    }
    return e + (this.isClosed ? "z" : "");
  }
  static Move = 1;
  static Line = 2;
  static Bezier = 3;
  static QuadraticBezier = 4;
  static Arc = 5;
  static SvgArc = 6;
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
    return ((this.p = true), this);
  }
  close() {
    return ((this.isClosed = true), this);
  }
  Vo(t) {
    if (this.Js !== null && t.kt === false) return this.Js;
    const i = this.radiusX;
    let e = this.radiusY;
    if ((e === void 0 && (e = i), i === 0 || e === 0)) return ((this.Js = []), this.Js);
    const s = this.Sn,
      n = this.Rl,
      o = G.JA(0, 0, i < e ? i : e, this.startAngle, this.startAngle + this.sweepAngle, false);
    if (i !== e) {
      const l = Transform.a();
      (l.Ki(), i < e ? l.rt(1, e / i) : l.rt(i / e, 1), Geometry.tT(o, l), Transform.o(l));
    }
    const r = o.length;
    for (let l = 0; l < r; l++) {
      const h = o[l];
      ((h[0] += s), (h[1] += n), (h[2] += s), (h[3] += n), (h[4] += s), (h[5] += n), (h[6] += s), (h[7] += n));
    }
    return ((this.Js = o), this.Js);
  }
  na(t, i, e) {
    if (this.Js !== null && t.kt === false) return this.Js;
    if (this.radiusX === 0 || this.radiusY === 0) return ((this.Js = []), this.Js);
    const s = i,
      n = e;
    let o = this.Ol,
      r = this.Mr;
    (o === 0 && (o = 1e-4), r === 0 && (r = 1e-4));
    const l = this.Sn * (Math.PI / 180),
      h = this.isLargeArc,
      a = this.isClockwiseArc,
      f = this.le,
      c = this.he,
      u = Math.cos(l),
      d = Math.sin(l),
      m = (u * (s - f)) / 2 + (d * (n - c)) / 2,
      g = (-d * (s - f)) / 2 + (u * (n - c)) / 2,
      p = (m * m) / (o * o) + (g * g) / (r * r);
    p > 1 && ((o *= Math.sqrt(p)), (r *= Math.sqrt(p)));
    let y =
      (h === a ? -1 : 1) * Math.sqrt((o * o * r * r - o * o * g * g - r * r * m * m) / (o * o * g * g + r * r * m * m));
    isNaN(y) && (y = 0);
    let x = (y * o * g) / r,
      b = (y * -r * m) / o;
    (isNaN(x) && (x = 0), isNaN(b) && (b = 0));
    const S = (s + f) / 2 + u * x - d * b,
      k = (n + c) / 2 + d * x + u * b,
      P = (Y, z) => Math.sqrt(Y * Y + z * z),
      A = (Y, z, H, W) => (Y * H + z * W) / (P(Y, z) * P(H, W)),
      C = (Y, z, H, W) => (Y * W < z * H ? -1 : 1) * Math.acos(A(Y, z, H, W)),
      M = C(1, 0, (m - x) / o, (g - b) / r),
      N = (m - x) / o,
      T = (g - b) / r,
      L = (-m - x) / o,
      D = (-g - b) / r;
    let F = C(N, T, L, D);
    const R = A(N, T, L, D);
    (R <= -1 ? (F = Math.PI) : R >= 1 && (F = 0),
      !a && F > 0 && (F = F - 2 * Math.PI),
      a && F < 0 && (F = F + 2 * Math.PI));
    const I = o > r ? o : r,
      O = o > r ? 1 : o / r,
      X = o > r ? r / o : 1,
      K = G.JA(0, 0, I, M, M + F, true),
      V = Transform.a();
    return (
      V.Ki(),
      V.vs(S, k),
      V.Ns(this.Sn, 0, 0),
      V.rt(O, X),
      Geometry.tT(K, V),
      Transform.o(V),
      (this.Js = K),
      this.Js
    );
  }
  get isClosed() {
    return (this.l & 8) !== 0;
  }
  set isClosed(t) {
    this.isClosed !== t && (t ? (this.l |= 8) : (this.l &= -9), (this.kt = true));
  }
  get type() {
    return this.tt;
  }
  set type(t) {
    (Debug && U.W(t, SegmentType, "SegmentType"), this.p && U.D(this, t), (this.tt = t), (this.kt = true));
  }
  get endX() {
    return this.le;
  }
  set endX(t) {
    (Debug && U.r(t, PathSegment, "endX"), this.p && U.D(this, t), (this.le = t), (this.kt = true));
  }
  get endY() {
    return this.he;
  }
  set endY(t) {
    (Debug && U.r(t, PathSegment, "endY"), this.p && U.D(this, t), (this.he = t), (this.kt = true));
  }
  get point1X() {
    return this.Sn;
  }
  set point1X(t) {
    (Debug && U.r(t, PathSegment, "point1X"), this.p && U.D(this, t), (this.Sn = t), (this.kt = true));
  }
  get point1Y() {
    return this.Rl;
  }
  set point1Y(t) {
    (Debug && U.r(t, PathSegment, "point1Y"), this.p && U.D(this, t), (this.Rl = t), (this.kt = true));
  }
  get point2X() {
    return this.Ol;
  }
  set point2X(t) {
    (Debug && U.r(t, PathSegment, "point2X"), this.p && U.D(this, t), (this.Ol = t), (this.kt = true));
  }
  get point2Y() {
    return this.Mr;
  }
  set point2Y(t) {
    (Debug && U.r(t, PathSegment, "point2Y"), this.p && U.D(this, t), (this.Mr = t), (this.kt = true));
  }
  get centerX() {
    return this.Sn;
  }
  set centerX(t) {
    (Debug && U.r(t, PathSegment, "centerX"), this.p && U.D(this, t), (this.Sn = t), (this.kt = true));
  }
  get centerY() {
    return this.Rl;
  }
  set centerY(t) {
    (Debug && U.r(t, PathSegment, "centerY"), this.p && U.D(this, t), (this.Rl = t), (this.kt = true));
  }
  get radiusX() {
    return this.Ol;
  }
  set radiusX(t) {
    (Debug && U.r(t, PathSegment, "radiusX"),
      t < 0 && U.G(t, ">= zero", PathSegment, "radiusX"),
      this.p && U.D(this, t),
      (this.Ol = t),
      (this.kt = true));
  }
  get radiusY() {
    return this.Mr;
  }
  set radiusY(t) {
    (Debug && U.r(t, PathSegment, "radiusY"),
      t < 0 && U.G(t, ">= zero", PathSegment, "radiusY"),
      this.p && U.D(this, t),
      (this.Mr = t),
      (this.kt = true));
  }
  get startAngle() {
    return this.le;
  }
  set startAngle(t) {
    (Debug && U.r(t, PathSegment, "startAngle"),
      this.p && U.D(this, t),
      (t = t % 360),
      t < 0 && (t += 360),
      (this.le = t),
      (this.kt = true));
  }
  get sweepAngle() {
    return this.he;
  }
  set sweepAngle(t) {
    (Debug && U.r(t, PathSegment, "sweepAngle"),
      this.p && U.D(this, t),
      t > 360 && (t = 360),
      t < -360 && (t = -360),
      (this.he = t),
      (this.kt = true));
  }
  get isClockwiseArc() {
    return (this.l & 4) !== 0;
  }
  set isClockwiseArc(t) {
    (this.p && U.D(this, t), t ? (this.l |= 4) : (this.l &= -5), (this.kt = true));
  }
  get isLargeArc() {
    return (this.l & 16) !== 0;
  }
  set isLargeArc(t) {
    (this.p && U.D(this, t), t ? (this.l |= 16) : (this.l &= -17), (this.kt = true));
  }
  get xAxisRotation() {
    return this.Sn;
  }
  set xAxisRotation(t) {
    (Debug && U.r(t, PathSegment, "xAxisRotation"),
      this.p && U.D(this, t),
      (t = t % 360),
      t < 0 && (t += 360),
      (this.Sn = t),
      (this.kt = true));
  }
}
