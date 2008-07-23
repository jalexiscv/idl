class Rect {
  rx;
  ry;
  rw;
  rh;
  p;
  constructor(t, i, e, s) {
    if (t === void 0) ((this.rx = 0), (this.ry = 0), (this.rw = 0), (this.rh = 0));
    else if (
      typeof t == "number" &&
      typeof i == "number" &&
      typeof e == "number" &&
      (e >= 0 || isNaN(e)) &&
      typeof s == "number" &&
      (s >= 0 || isNaN(s))
    )
      ((this.rx = t), (this.ry = i), (this.rw = e), (this.rh = s));
    else if (t instanceof Point) {
      const n = t.x,
        o = t.y;
      if (i instanceof Point) {
        const r = i.x,
          l = i.y;
        ((this.rx = Math.min(n, r)),
          (this.ry = Math.min(o, l)),
          (this.rw = Math.abs(n - r)),
          (this.rh = Math.abs(o - l)));
      } else
        i instanceof Size
          ? ((this.rx = n), (this.ry = o), (this.rw = i.width), (this.rh = i.height))
          : U.n("Incorrect second argument supplied to Rect constructor " + i);
    } else U.n("Invalid arguments to Rect constructor: " + t + ", " + i + ", " + e + ", " + s);
    this.p = false;
  }
  c(t) {
    return ((this.rx = t.rx), (this.ry = t.ry), (this.rw = t.rw), (this.rh = t.rh), this);
  }
  e(t, i, e, s) {
    return ((this.rx = t), (this.ry = i), (this.rw = e), (this.rh = s), this);
  }
  $n(t, i) {
    return ((this.rw = t), (this.rh = i), this);
  }
  setTo(t, i, e, s) {
    return (
      Debug &&
        (U.i(t, "number", Rect, "setTo:x"),
        U.i(i, "number", Rect, "setTo:y"),
        U.i(e, "number", Rect, "setTo:w"),
        U.i(s, "number", Rect, "setTo:h"),
        e < 0 && U.G(e, ">= 0", Rect, "setTo:w"),
        s < 0 && U.G(s, ">= 0", Rect, "setTo:h"),
        this._()),
      (this.rx = t),
      (this.ry = i),
      (this.rw = e),
      (this.rh = s),
      this
    );
  }
  set(t) {
    return (
      Debug && (U.s(t, Rect, Rect, "set:r"), this._()),
      (this.rx = t.rx),
      (this.ry = t.ry),
      (this.rw = t.rw),
      (this.rh = t.rh),
      this
    );
  }
  setPoint(t) {
    return (Debug && (U.s(t, Point, Rect, "setPoint:p"), this._()), (this.rx = t.x), (this.ry = t.y), this);
  }
  setSize(t) {
    return (Debug && (U.s(t, Size, Rect, "setSize:s"), this._()), (this.rw = t.width), (this.rh = t.height), this);
  }
  copy() {
    const t = new Rect();
    return ((t.rx = this.rx), (t.ry = this.ry), (t.rw = this.rw), (t.rh = this.rh), t);
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
  di() {
    return (this.p && (Object.isFrozen(this) && U.n("cannot thaw constant: " + this), (this.p = false)), this);
  }
  _(t) {
    if (Debug && this.p) {
      let i = "The Rect is frozen, so its properties cannot be set: " + this.toString();
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
      ((n = i[e++]), n && (o = parseFloat(n)));
      let r = 0;
      for (; i[e] === ""; ) e++;
      ((n = i[e++]), n && (r = parseFloat(n)));
      let l = 0;
      for (; i[e] === ""; ) e++;
      return ((n = i[e++]), n && (l = parseFloat(n)), new Rect(s, o, r, l));
    } else return new Rect();
  }
  static stringify(t) {
    return (
      Debug && U.s(t, Rect),
      t.x.toString() + " " + t.y.toString() + " " + t.width.toString() + " " + t.height.toString()
    );
  }
  static stringifyFixed(t) {
    return (
      U.i(t, "number", Rect, "stringifyFixed:digits"),
      (i) => i.x.toFixed(t) + " " + i.y.toFixed(t) + " " + i.width.toFixed(t) + " " + i.height.toFixed(t)
    );
  }
  toString() {
    return "Rect(" + this.x + "," + this.y + "," + this.width + "," + this.height + ")";
  }
  equals(t) {
    return t instanceof Rect ? this.rx === t.x && this.ry === t.y && this.rw === t.width && this.rh === t.height : false;
  }
  equalTo(t, i, e, s) {
    return this.rx === t && this.ry === i && this.rw === e && this.rh === s;
  }
  equalsApprox(t) {
    return G.u(this.rx, t.x) && G.u(this.ry, t.y) && G.u(this.rw, t.width) && G.u(this.rh, t.height);
  }
  equalsApproxTo(t, i, e, s) {
    return G.u(this.rx, t) && G.u(this.ry, i) && G.u(this.rw, e) && G.u(this.rh, s);
  }
  equalsApproxClose(t) {
    return G.q(this.rx, t.x) && G.q(this.ry, t.y) && G.q(this.rw, t.width) && G.q(this.rh, t.height);
  }
  containsPoint(t) {
    return (
      Debug && U.s(t, Point, Rect, "containsPoint:p"),
      this.rx <= t.x && this.rx + this.rw >= t.x && this.ry <= t.y && this.ry + this.rh >= t.y
    );
  }
  containsRect(t) {
    return (
      Debug && U.s(t, Rect, Rect, "containsRect:r"),
      this.rx <= t.x && t.x + t.width <= this.rx + this.rw && this.ry <= t.y && t.y + t.height <= this.ry + this.rh
    );
  }
  contains(t, i, e, s) {
    return (
      Debug
        ? (U.r(t, Rect, "contains:x"),
          U.r(i, Rect, "contains:y"),
          e === void 0 ? (e = 0) : U.r(e, Rect, "contains:w"),
          s === void 0 ? (s = 0) : U.r(s, Rect, "contains:h"),
          (e < 0 || s < 0) && U.n("Rect.contains:Width and height cannot be negative"))
        : (e === void 0 && (e = 0), s === void 0 && (s = 0)),
      this.rx <= t && t + e <= this.rx + this.rw && this.ry <= i && i + s <= this.ry + this.rh
    );
  }
  offset(t, i) {
    return (
      Debug && (U.r(t, Rect, "offset:dx"), U.r(i, Rect, "offset:dy"), this._()),
      (this.rx += t),
      (this.ry += i),
      this
    );
  }
  inflate(t, i) {
    return (Debug && (U.r(t, Rect, "inflate:w"), U.r(i, Rect, "inflate:h")), this._w(i, t, i, t));
  }
  addMargin(t) {
    return (Debug && U.s(t, Margin, Rect, "addMargin:m"), this._w(t.top, t.right, t.bottom, t.left));
  }
  subtractMargin(t) {
    return (Debug && U.s(t, Margin, Rect, "subtractMargin:m"), this._w(-t.top, -t.right, -t.bottom, -t.left));
  }
  grow(t, i, e, s) {
    return (
      Debug && (U.r(t, Rect, "grow:t"), U.r(i, Rect, "grow:r"), U.r(e, Rect, "grow:b"), U.r(s, Rect, "grow:l")),
      this._w(t, i, e, s)
    );
  }
  _w(t, i, e, s) {
    Debug && this._();
    const n = this.rw;
    i + s <= -n ? ((this.rx += n / 2), (this.rw = 0)) : ((this.rx -= s), (this.rw += i + s));
    const o = this.rh;
    return (t + e <= -o ? ((this.ry += o / 2), (this.rh = 0)) : ((this.ry -= t), (this.rh += t + e)), this);
  }
  intersectRect(t) {
    return (Debug && U.s(t, Rect, Rect, "intersectRect:r"), this.KA(t.x, t.y, t.width, t.height));
  }
  intersect(t, i, e, s) {
    return (
      Debug &&
        (U.r(t, Rect, "intersect:x"),
        U.r(i, Rect, "intersect:y"),
        U.r(e, Rect, "intersect:w"),
        U.r(s, Rect, "intersect:h"),
        (e < 0 || s < 0) && U.n("Rect.intersect:Width and height cannot be negative")),
      this.KA(t, i, e, s)
    );
  }
  KA(t, i, e, s) {
    Debug && this._();
    const n = Math.max(this.rx, t),
      o = Math.max(this.ry, i),
      r = Math.min(this.rx + this.rw, t + e),
      l = Math.min(this.ry + this.rh, i + s);
    return ((this.rx = n), (this.ry = o), (this.rw = Math.max(0, r - n)), (this.rh = Math.max(0, l - o)), this);
  }
  intersectsRect(t) {
    return (Debug && U.s(t, Rect, Rect, "intersectsRect:r"), this.intersects(t.x, t.y, t.width, t.height));
  }
  intersects(t, i, e, s) {
    Debug &&
      (U.r(t, Rect, "intersects:x"),
      U.r(i, Rect, "intersects:y"),
      U.r(t, Rect, "intersects:w"),
      U.r(i, Rect, "intersects:h"),
      (e < 0 || s < 0) && U.n("Rect.intersects:Width and height cannot be negative"));
    let n = this.rw;
    const o = this.rx;
    if (n !== 1 / 0 && e !== 1 / 0 && ((n += o), (e += t), isNaN(e) || isNaN(n) || o > e || t > n)) return false;
    let r = this.rh;
    const l = this.ry;
    return !(r !== 1 / 0 && s !== 1 / 0 && ((r += l), (s += i), isNaN(s) || isNaN(r) || l > s || i > r));
  }
  UA(t, i) {
    let e = this.rw,
      s = t.width + i + i;
    const n = this.rx,
      o = t.x - i;
    if (((e += n), (s += o), n > s || o > e)) return false;
    let r = this.rh,
      l = t.height + i + i;
    const h = this.ry,
      a = t.y - i;
    return ((r += h), (l += a), !(h > l || a > r));
  }
  unionPoint(t) {
    return (Debug && U.s(t, Point, Rect, "unionPoint:p"), this.ai(t.x, t.y, 0, 0));
  }
  unionRect(t) {
    return (Debug && U.s(t, Rect, Rect, "unionRect:r"), this.ai(t.rx, t.ry, t.rw, t.rh));
  }
  union(t, i, e, s) {
    return (
      Debug
        ? (U.r(t, Rect, "union:x"),
          U.r(i, Rect, "union:y"),
          e === void 0 ? (e = 0) : U.r(e, Rect, "union:w"),
          s === void 0 ? (s = 0) : U.r(s, Rect, "union:h"),
          (e < 0 || s < 0) && U.n("Rect.union:Width and height cannot be negative"),
          this._())
        : (e === void 0 && (e = 0), s === void 0 && (s = 0)),
      this.ai(t, i, e, s)
    );
  }
  ai(t, i, e, s) {
    const n = Math.min(this.rx, t),
      o = Math.min(this.ry, i),
      r = Math.max(this.rx + this.rw, t + e),
      l = Math.max(this.ry + this.rh, i + s);
    return ((this.rx = n), (this.ry = o), (this.rw = r - n), (this.rh = l - o), this);
  }
  setSpot(t, i, e) {
    return (
      Debug && (U.r(t, Rect, "setSpot:x"), U.r(i, Rect, "setSpot:y"), U.s(e, Spot, Rect, "setSpot:spot"), this._()),
      (this.rx = t - e.offsetX - e.x * this.rw),
      (this.ry = i - e.offsetY - e.y * this.rh),
      this
    );
  }
  nearestSideDirection(t, i) {
    return (
      Debug && (U.r(t, Rect, "nearestSideDirection:x"), U.r(i, Rect, "nearestSideDirection:y")),
      G.tx(this, t, i, true)
    );
  }
  nearestSideDirectionPoint(t) {
    return (Debug && U.s(t, Point, Rect, "unionPoint:p"), G.tx(this, t.x, t.y, true));
  }
  static contains(t, i, e, s, n, o, r, l) {
    return (
      Debug
        ? (U.r(t, Rect, "contains:rx"),
          U.r(i, Rect, "contains:ry"),
          U.r(e, Rect, "contains:rw"),
          U.r(s, Rect, "contains:rh"),
          U.r(n, Rect, "contains:x"),
          U.r(o, Rect, "contains:y"),
          r === void 0 ? (r = 0) : U.r(r, Rect, "contains:w"),
          l === void 0 ? (l = 0) : U.r(l, Rect, "contains:h"),
          (e < 0 || s < 0 || r < 0 || l < 0) && U.n("Rect.contains:Width and height cannot be negative"))
        : (r === void 0 && (r = 0), l === void 0 && (l = 0)),
      t <= n && n + r <= t + e && i <= o && o + l <= i + s
    );
  }
  static intersects(t, i, e, s, n, o, r, l) {
    Debug &&
      (U.r(t, Rect, "intersects:rx"),
      U.r(i, Rect, "intersects:ry"),
      U.r(e, Rect, "intersects:rw"),
      U.r(s, Rect, "intersects:rh"),
      U.r(n, Rect, "intersects:x"),
      U.r(o, Rect, "intersects:y"),
      U.r(r, Rect, "intersects:w"),
      U.r(l, Rect, "intersects:h"),
      (e < 0 || s < 0 || r < 0 || l < 0) && U.n("Rect.intersects:Width and height cannot be negative"));
    let h = e,
      a = r;
    const f = t,
      c = n;
    if (((h += f), (a += c), f > a || c > h)) return false;
    let u = s,
      d = l;
    const m = i,
      g = o;
    return ((u += m), (d += g), !(m > d || g > u));
  }
  static intersectsLineSegment(t, i, e, s, n, o, r, l) {
    return (
      Debug &&
        (U.r(t, Rect, "intersectsLineSegment:x"),
        U.r(i, Rect, "intersectsLineSegment:y"),
        U.r(e, Rect, "intersectsLineSegment:w"),
        U.r(s, Rect, "intersectsLineSegment:h"),
        U.r(n, Rect, "intersectsLineSegment:p1x"),
        U.r(o, Rect, "intersectsLineSegment:p1y"),
        U.r(r, Rect, "intersectsLineSegment:p2x"),
        U.r(l, Rect, "intersectsLineSegment:p2y"),
        (e < 0 || s < 0) && U.n("Rect.intersectsLineSegment: width and height cannot be negative")),
      G.GA(t, i, e, s, n, o, r, l)
    );
  }
  get x() {
    return this.rx;
  }
  set x(t) {
    (Debug && (U.i(t, "number", Rect, "x"), this._(t)), (this.rx = t));
  }
  get y() {
    return this.ry;
  }
  set y(t) {
    (Debug && (U.i(t, "number", Rect, "y"), this._(t)), (this.ry = t));
  }
  get width() {
    return this.rw;
  }
  set width(t) {
    (Debug && (U.i(t, "number", Rect, "width"), this._(t)), t < 0 && U.G(t, ">= 0", Rect, "width"), (this.rw = t));
  }
  get height() {
    return this.rh;
  }
  set height(t) {
    (Debug && (U.i(t, "number", Rect, "height"), this._(t)), t < 0 && U.G(t, ">= 0", Rect, "height"), (this.rh = t));
  }
  get left() {
    return this.rx;
  }
  set left(t) {
    (Debug && (U.i(t, "number", Rect, "left"), this._(t)), (this.rx = t));
  }
  get top() {
    return this.ry;
  }
  set top(t) {
    (Debug && (U.i(t, "number", Rect, "top"), this._(t)), (this.ry = t));
  }
  get right() {
    return this.rx + this.rw;
  }
  set right(t) {
    (Debug && (U.r(t, Rect, "right"), this._(t)), (this.rx += t - (this.rx + this.rw)));
  }
  get bottom() {
    return this.ry + this.rh;
  }
  set bottom(t) {
    (Debug && (U.r(t, Rect, "top"), this._(t)), (this.ry += t - (this.ry + this.rh)));
  }
  get position() {
    return new Point(this.rx, this.ry);
  }
  set position(t) {
    (Debug && (U.s(t, Point, Rect, "position"), this._(t)), (this.rx = t.x), (this.ry = t.y));
  }
  get size() {
    return new Size(this.rw, this.rh);
  }
  set size(t) {
    (Debug && (U.s(t, Size, Rect, "size"), this._(t)), (this.rw = t.width), (this.rh = t.height));
  }
  get center() {
    return new Point(this.rx + this.rw / 2, this.ry + this.rh / 2);
  }
  set center(t) {
    (Debug && (U.s(t, Point, Rect, "center"), this._(t)), (this.rx = t.x - this.rw / 2), (this.ry = t.y - this.rh / 2));
  }
  get centerX() {
    return this.rx + this.rw / 2;
  }
  set centerX(t) {
    (Debug && (U.r(t, Rect, "centerX"), this._(t)), (this.rx = t - this.rw / 2));
  }
  get centerY() {
    return this.ry + this.rh / 2;
  }
  set centerY(t) {
    (Debug && (U.r(t, Rect, "centerY"), this._(t)), (this.ry = t - this.rh / 2));
  }
  isReal() {
    return isFinite(this.x) && isFinite(this.y) && isFinite(this.width) && isFinite(this.height);
  }
  isEmpty() {
    return this.width === 0 && this.height === 0;
  }
  static om = new Rect(0, 0, 0, 0).Ct();
  static ZI = new Rect(NaN, NaN, NaN, NaN).Ct();
  static ix = [];
  static a() {
    const t = Rect.ix.pop();
    return t === void 0 ? new Rect() : t;
  }
  static Ms(t) {
    const i = Rect.ix.pop();
    return i === void 0 ? t.copy() : i.c(t);
  }
  static U(t, i, e, s) {
    const n = Rect.ix.pop();
    return n === void 0 ? new Rect(t, i, e, s) : n.e(t, i, e, s);
  }
  static o(t) {
    Rect.ix.push(t);
  }
}
