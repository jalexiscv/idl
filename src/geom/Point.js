class Point {
  px;
  py;
  p;
  constructor(t, i) {
    (t === void 0
      ? ((this.px = 0), (this.py = 0))
      : typeof t == "number" && typeof i == "number"
        ? ((this.px = t), (this.py = i))
        : U.n("Invalid arguments to Point constructor: " + t + ", " + i),
      (this.p = false));
  }
  c(t) {
    return ((this.px = t.px), (this.py = t.py), this);
  }
  e(t, i) {
    return ((this.px = t), (this.py = i), this);
  }
  setTo(t, i) {
    return (
      Debug && (U.i(t, "number", Point, "setTo:x"), U.i(i, "number", Point, "setTo:y"), this._()),
      (this.px = t),
      (this.py = i),
      this
    );
  }
  set(t) {
    return (Debug && (U.s(t, Point, Point, "set:p"), this._()), (this.px = t.px), (this.py = t.py), this);
  }
  copy() {
    const t = new Point();
    return ((t.px = this.px), (t.py = this.py), t);
  }
  Ct() {
    return ((this.p = true), Object.freeze(this), this);
  }
  T() {
    return this.p || Object.isFrozen(this) ? this : this.copy().k();
  }
  k() {
    return (this.p || (this.p = true), this);
  }
  _(t) {
    if (Debug && this.p) {
      let i = "The Point is frozen, so its properties cannot be set: " + this.toString();
      (t !== void 0 && (i += "  to value: " + t), U.n(i));
    }
  }
  static parse(t) {
    if (typeof t == "string") {
      const i = t.split(" ");
      let e = 0,
        s = 0;
      for (; i[e] === ""; ) e++;
      let n = i[e++];
      n && (s = parseFloat(n));
      let o = 0;
      for (; i[e] === ""; ) e++;
      return ((n = i[e++]), n && (o = parseFloat(n)), new Point(s, o));
    } else return new Point();
  }
  static stringify(t) {
    return (Debug && U.s(t, Point), t.x.toString() + " " + t.y.toString());
  }
  static stringifyFixed(t) {
    return (U.i(t, "number", Point, "stringifyFixed:digits"), (i) => i.x.toFixed(t) + " " + i.y.toFixed(t));
  }
  toString() {
    return "Point(" + this.x + "," + this.y + ")";
  }
  equals(t) {
    return t instanceof Point ? this.px === t.x && this.py === t.y : false;
  }
  equalTo(t, i) {
    return this.px === t && this.py === i;
  }
  equalsApprox(t) {
    return G.u(this.px, t.x) && G.u(this.py, t.y);
  }
  add(t) {
    return (Debug && (U.s(t, Point, Point, "add:p"), this._()), (this.px += t.x), (this.py += t.y), this);
  }
  subtract(t) {
    return (Debug && (U.s(t, Point, Point, "subtract:p"), this._()), (this.px -= t.x), (this.py -= t.y), this);
  }
  offset(t, i) {
    return (
      Debug && (U.r(t, Point, "offset:dx"), U.r(i, Point, "offset:dy"), this._()),
      (this.px += t),
      (this.py += i),
      this
    );
  }
  rotate(t) {
    if ((Debug && (U.r(t, Point, "rotate:angle"), this._()), t === 0)) return this;
    const i = this.px,
      e = this.py;
    if (i === 0 && e === 0) return this;
    let s = 0,
      n = 0;
    if (((t = G.Yi(t)), t === 90)) ((s = 0), (n = 1));
    else if (t === 180) ((s = -1), (n = 0));
    else if (t === 270) ((s = 0), (n = -1));
    else {
      const o = (t * Math.PI) / 180;
      ((s = Math.cos(o)), (n = Math.sin(o)));
    }
    return ((this.px = s * i - n * e), (this.py = n * i + s * e), this);
  }
  scale(t, i) {
    return (
      Debug && (U.r(t, Point, "scale:sx"), U.r(i, Point, "scale:sy"), this._()),
      (this.px *= t),
      (this.py *= i),
      this
    );
  }
  distanceSquaredPoint(t) {
    Debug && U.s(t, Point, Point, "distanceSquaredPoint:p");
    const i = t.x - this.px,
      e = t.y - this.py;
    return i * i + e * e;
  }
  distanceSquared(t, i) {
    Debug && (U.r(t, Point, "distanceSquared:px"), U.r(i, Point, "distanceSquared:py"));
    const e = t - this.px,
      s = i - this.py;
    return e * e + s * s;
  }
  normalize() {
    Debug && this._();
    const t = this.px,
      i = this.py,
      e = Math.sqrt(t * t + i * i);
    return (e > 0 && ((this.px = t / e), (this.py = i / e)), this);
  }
  directionPoint(t) {
    return (Debug && U.s(t, Point, Point, "directionPoint:p"), this.OA(t.x - this.px, t.y - this.py));
  }
  direction(t, i) {
    return (Debug && (U.r(t, Point, "direction:px"), U.r(i, Point, "direction:py")), this.OA(t - this.px, i - this.py));
  }
  OA(t, i) {
    if (t === 0) return i > 0 ? 90 : i < 0 ? 270 : 0;
    if (i === 0) return t > 0 ? 0 : 180;
    {
      if (isNaN(t) || isNaN(i)) return 0;
      let e = (Math.atan(Math.abs(i / t)) * 180) / Math.PI;
      return (t < 0 ? (i < 0 ? (e += 180) : (e = 180 - e)) : i < 0 && (e = 360 - e), e);
    }
  }
  static compareWithLineSegment(t, i, e, s, n, o) {
    return (
      Debug &&
        (U.r(t, Point, "compareWithLineSegment:a1x"),
        U.r(i, Point, "compareWithLineSegment:a1y"),
        U.r(e, Point, "compareWithLineSegment:a2x"),
        U.r(s, Point, "compareWithLineSegment:a2y"),
        U.r(n, Point, "compareWithLineSegment:b1x"),
        U.r(o, Point, "compareWithLineSegment:b1y")),
      G.Cu(t, i, e, s, n, o)
    );
  }
  compareWithLineSegmentPoint(t, i) {
    return (
      Debug &&
        (U.s(t, Point, Point, "compareWithLineSegmentPoint:p"), U.s(i, Point, Point, "compareWithLineSegmentPoint:q")),
      G.Cu(t.x, t.y, i.x, i.y, this.x, this.y)
    );
  }
  static intersectingLineSegments(t, i, e, s, n, o, r, l) {
    return (
      Debug &&
        (U.r(t, Point, "intersectingLineSegments:a1x"),
        U.r(i, Point, "intersectingLineSegments:a1y"),
        U.r(e, Point, "intersectingLineSegments:a2x"),
        U.r(s, Point, "intersectingLineSegments:a2y"),
        U.r(n, Point, "intersectingLineSegments:b1x"),
        U.r(o, Point, "intersectingLineSegments:b1y"),
        U.r(r, Point, "intersectingLineSegments:b2x"),
        U.r(l, Point, "intersectingLineSegments:b2y")),
      G.Au(t, i, e, s, n, o, r, l)
    );
  }
  projectOntoLineSegment(t, i, e, s) {
    return (
      Debug &&
        (U.r(t, Point, "projectOntoLineSegment:px"),
        U.r(i, Point, "projectOntoLineSegment:py"),
        U.r(e, Point, "projectOntoLineSegment:qx"),
        U.r(s, Point, "projectOntoLineSegment:qy")),
      G.Fl(t, i, e, s, this.px, this.py, this),
      this
    );
  }
  projectOntoLineSegmentPoint(t, i) {
    return (
      Debug &&
        (U.s(t, Point, Point, "projectOntoLineSegmentPoint:p"), U.s(i, Point, Point, "projectOntoLineSegmentPoint:q")),
      G.Fl(t.x, t.y, i.x, i.y, this.px, this.py, this),
      this
    );
  }
  snapToGrid(t, i, e, s) {
    return (
      Debug &&
        (U.r(t, Point, "snapToGrid:originx"),
        U.r(i, Point, "snapToGrid:originy"),
        U.r(e, Point, "snapToGrid:cellwidth"),
        U.r(s, Point, "snapToGrid:cellheight")),
      G.nm(this.px, this.py, t, i, e, s, this),
      this
    );
  }
  snapToGridPoint(t, i) {
    return (
      Debug && (U.s(t, Point, Point, "snapToGridPoint:p"), U.s(i, Size, Point, "snapToGridPoint:q")),
      G.nm(this.px, this.py, t.x, t.y, i.width, i.height, this),
      this
    );
  }
  setRectSpot(t, i) {
    return (
      Debug && (U.s(t, Rect, Point, "setRectSpot:r"), U.s(i, Spot, Point, "setRectSpot:spot"), this._()),
      (this.px = t.x + i.x * t.width + i.offsetX),
      (this.py = t.y + i.y * t.height + i.offsetY),
      this
    );
  }
  setSpot(t, i, e, s, n) {
    return (
      Debug &&
        (U.r(t, Point, "setSpot:x"),
        U.r(i, Point, "setSpot:y"),
        U.r(e, Point, "setSpot:w"),
        U.r(s, Point, "setSpot:h"),
        (e < 0 || s < 0) && U.n("Point.setSpot:Width and height cannot be negative"),
        U.s(n, Spot, Point, "setSpot:spot"),
        this._()),
      (this.px = t + n.x * e + n.offsetX),
      (this.py = i + n.y * s + n.offsetY),
      this
    );
  }
  E(t) {
    return (t.St(this), this);
  }
  Je(t) {
    return (t.De(this), this);
  }
  static distanceLineSegmentSquared(t, i, e, s, n, o) {
    Debug &&
      (U.r(t, Point, "distanceLineSegmentSquared:px"),
      U.r(i, Point, "distanceLineSegmentSquared:py"),
      U.r(e, Point, "distanceLineSegmentSquared:ax"),
      U.r(s, Point, "distanceLineSegmentSquared:ay"),
      U.r(n, Point, "distanceLineSegmentSquared:bx"),
      U.r(o, Point, "distanceLineSegmentSquared:by"));
    let r = n - e,
      l = o - s;
    const h = r * r + l * l,
      a = e - t,
      f = s - i,
      c = -a * r - f * l;
    if (c <= 0 || c >= h) return ((r = n - t), (l = o - i), Math.min(a * a + f * f, r * r + l * l));
    {
      const u = r * f - l * a;
      return (u * u) / h;
    }
  }
  static distanceSquared(t, i, e, s) {
    Debug &&
      (U.r(t, Point, "distanceSquared:px"),
      U.r(i, Point, "distanceSquared:py"),
      U.r(e, Point, "distanceSquared:qx"),
      U.r(s, Point, "distanceSquared:qy"));
    const n = e - t,
      o = s - i;
    return n * n + o * o;
  }
  static direction(t, i, e, s) {
    Debug &&
      (U.r(t, Point, "direction:px"),
      U.r(i, Point, "direction:py"),
      U.r(e, Point, "direction:qx"),
      U.r(s, Point, "direction:qy"));
    const n = e - t,
      o = s - i;
    if (n === 0) return o > 0 ? 90 : o < 0 ? 270 : 0;
    if (o === 0) return n > 0 ? 0 : 180;
    {
      if (isNaN(n) || isNaN(o)) return 0;
      let r = (Math.atan(Math.abs(o / n)) * 180) / Math.PI;
      return (n < 0 ? (o < 0 ? (r += 180) : (r = 180 - r)) : o < 0 && (r = 360 - r), r);
    }
  }
  get x() {
    return this.px;
  }
  set x(t) {
    (Debug && (U.i(t, "number", Point, "x"), this._(t)), (this.px = t));
  }
  get y() {
    return this.py;
  }
  set y(t) {
    (Debug && (U.i(t, "number", Point, "y"), this._(t)), (this.py = t));
  }
  isReal() {
    return isFinite(this.x) && isFinite(this.y);
  }
  static wn = new Point(0, 0).Ct();
  static EA = new Point(-1 / 0, -1 / 0).Ct();
  static VA = new Point(1 / 0, 1 / 0).Ct();
  static BA = new Point(6, 6).Ct();
  static xn = new Point(NaN, NaN).Ct();
  static $w = [];
  static a() {
    const t = Point.$w.pop();
    return t === void 0 ? new Point() : t;
  }
  static Ms(t) {
    const i = Point.$w.pop();
    return i === void 0 ? t.copy() : i.c(t);
  }
  static U(t, i) {
    const e = Point.$w.pop();
    return e === void 0 ? new Point(t, i) : ((e.x = t), (e.y = i), e);
  }
  static o(t) {
    Point.$w.push(t);
  }
}
