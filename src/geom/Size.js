class Size {
  sw;
  sh;
  p;
  constructor(t, i) {
    (t === void 0
      ? ((this.sw = 0), (this.sh = 0))
      : typeof t == "number" && (t >= 0 || isNaN(t)) && typeof i == "number" && (i >= 0 || isNaN(i))
        ? ((this.sw = t), (this.sh = i))
        : U.n("Invalid arguments to Size constructor: " + t + ", " + i),
      (this.p = false));
  }
  c(t) {
    return ((this.sw = t.sw), (this.sh = t.sh), this);
  }
  e(t, i) {
    return ((this.sw = t), (this.sh = i), this);
  }
  setTo(t, i) {
    return (
      Debug &&
        (U.i(t, "number", Size, "setTo:w"),
        U.i(i, "number", Size, "setTo:h"),
        t < 0 && U.G(t, ">= 0", Size, "setTo:w"),
        i < 0 && U.G(i, ">= 0", Size, "setTo:h"),
        this._()),
      (this.sw = t),
      (this.sh = i),
      this
    );
  }
  set(t) {
    return (Debug && (U.s(t, Size, Size, "set:s"), this._()), (this.sw = t.sw), (this.sh = t.sh), this);
  }
  copy() {
    const t = new Size();
    return ((t.sw = this.sw), (t.sh = this.sh), t);
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
      let i = "The Size is frozen, so its properties cannot be set: " + this.toString();
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
      return ((n = i[e++]), n && (o = parseFloat(n)), new Size(s, o));
    } else return new Size();
  }
  static stringify(t) {
    return (Debug && U.s(t, Size), t.width.toString() + " " + t.height.toString());
  }
  static stringifyFixed(t) {
    return (U.i(t, "number", Size, "stringifyFixed:digits"), (i) => i.width.toFixed(t) + " " + i.height.toFixed(t));
  }
  toString() {
    return "Size(" + this.width + "," + this.height + ")";
  }
  equals(t) {
    return t instanceof Size ? this.sw === t.width && this.sh === t.height : false;
  }
  equalTo(t, i) {
    return this.sw === t && this.sh === i;
  }
  equalsApprox(t) {
    return G.u(this.sw, t.width) && G.u(this.sh, t.height);
  }
  inflate(t, i) {
    Debug && (U.r(t, Size, "inflate:w"), U.r(i, Size, "inflate:h"));
    const e = this.width + t;
    this.sw = e >= 0 ? e : 0;
    const s = this.height + i;
    return ((this.sh = s >= 0 ? s : 0), this);
  }
  get width() {
    return this.sw;
  }
  set width(t) {
    (Debug && (U.i(t, "number", Size, "width"), this._(t)), t < 0 && U.G(t, ">= 0", Size, "width"), (this.sw = t));
  }
  get height() {
    return this.sh;
  }
  set height(t) {
    (Debug && (U.i(t, "number", Size, "height"), this._(t)), t < 0 && U.G(t, ">= 0", Size, "height"), (this.sh = t));
  }
  isReal() {
    return isFinite(this.width) && isFinite(this.height);
  }
  static sa = new Size(0, 0).Ct();
  static Rk = new Size(1, 1).Ct();
  static zA = new Size(6, 6).Ct();
  static Tu = new Size(8, 8).Ct();
  static XA = new Size(10, 10).Ct();
  static Zw = new Size(1 / 0, 1 / 0).Ct();
  static Qw = new Size(NaN, NaN).Ct();
  static YA = [];
  static a() {
    const t = Size.YA.pop();
    return t === void 0 ? new Size() : t;
  }
  static o(t) {
    Size.YA.push(t);
  }
}
