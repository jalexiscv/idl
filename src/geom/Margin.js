class Margin {
  mt;
  mr;
  mb;
  ml;
  constructor(t, i, e, s) {
    t === void 0
      ? ((this.mt = 0), (this.mr = 0), (this.mb = 0), (this.ml = 0))
      : i === void 0
        ? ((i = t), (e = t), (s = t), (this.mt = t), (this.mr = i), (this.mb = e), (this.ml = s))
        : e === void 0
          ? ((e = t), (s = i), (this.mt = t), (this.mr = i), (this.mb = e), (this.ml = s))
          : s !== void 0
            ? ((this.mt = t), (this.mr = i), (this.mb = e), (this.ml = s))
            : U.n("Invalid arguments to Margin constructor: " + t + ", " + i + ", " + e + ", " + s);
  }
  setTo(t, i, e, s) {
    return (
      Debug &&
        (U.i(t, "number", Margin, "setTo:t"),
        U.i(i, "number", Margin, "setTo:r"),
        U.i(e, "number", Margin, "setTo:b"),
        U.i(s, "number", Margin, "setTo:l"),
        this._()),
      (this.mt = t),
      (this.mr = i),
      (this.mb = e),
      (this.ml = s),
      this
    );
  }
  set(t) {
    return (
      Debug && (U.s(t, Margin, Margin, "assign:m"), this._()),
      (this.mt = t.mt),
      (this.mr = t.mr),
      (this.mb = t.mb),
      (this.ml = t.ml),
      this
    );
  }
  copy() {
    const t = new Margin();
    return ((t.mt = this.mt), (t.mr = this.mr), (t.mb = this.mb), (t.ml = this.ml), t);
  }
  Ct() {
    return (Object.freeze(this), this);
  }
  T() {
    return Object.isFrozen(this) ? this : this.copy().Ct();
  }
  _(t) {
    if (Debug && Object.isFrozen(this)) {
      let i = "The Margin is frozen, so its properties cannot be set: " + this.toString();
      (t !== void 0 && (i += "  to value: " + t), U.n(i));
    }
  }
  static parse(t) {
    if (typeof t == "string") {
      const i = t.split(" ");
      let e = 0,
        s = NaN;
      for (; i[e] === ""; ) e++;
      let n = i[e++];
      if ((n && (s = parseFloat(n)), isNaN(s))) return new Margin();
      let o = NaN;
      for (; i[e] === ""; ) e++;
      if (((n = i[e++]), n && (o = parseFloat(n)), isNaN(o))) return new Margin(s);
      let r = NaN;
      for (; i[e] === ""; ) e++;
      if (((n = i[e++]), n && (r = parseFloat(n)), isNaN(r))) return new Margin(s, o);
      let l = NaN;
      for (; i[e] === ""; ) e++;
      return ((n = i[e++]), n && (l = parseFloat(n)), isNaN(l) ? new Margin(s, o) : new Margin(s, o, r, l));
    } else return new Margin();
  }
  static stringify(t) {
    return (
      Debug && U.s(t, Margin),
      t.top.toString() + " " + t.right.toString() + " " + t.bottom.toString() + " " + t.left.toString()
    );
  }
  static stringifyFixed(t) {
    return (
      U.i(t, "number", Margin, "stringifyFixed:digits"),
      (i) => i.top.toFixed(t) + " " + i.right.toFixed(t) + " " + i.bottom.toFixed(t) + " " + i.left.toFixed(t)
    );
  }
  toString() {
    return "Margin(" + this.top + "," + this.right + "," + this.bottom + "," + this.left + ")";
  }
  equals(t) {
    return t instanceof Margin
      ? this.mt === t.top && this.mr === t.right && this.mb === t.bottom && this.ml === t.left
      : false;
  }
  equalTo(t, i, e, s) {
    return this.mt === t && this.mr === i && this.mb === e && this.ml === s;
  }
  equalsApprox(t) {
    return G.u(this.mt, t.top) && G.u(this.mr, t.right) && G.u(this.mb, t.bottom) && G.u(this.ml, t.left);
  }
  get top() {
    return this.mt;
  }
  set top(t) {
    (Debug && (U.r(t, Margin, "top"), this._(t)), (this.mt = t));
  }
  get right() {
    return this.mr;
  }
  set right(t) {
    (Debug && (U.r(t, Margin, "right"), this._(t)), (this.mr = t));
  }
  get bottom() {
    return this.mb;
  }
  set bottom(t) {
    (Debug && (U.r(t, Margin, "bottom"), this._(t)), (this.mb = t));
  }
  get left() {
    return this.ml;
  }
  set left(t) {
    (Debug && (U.r(t, Margin, "left"), this._(t)), (this.ml = t));
  }
  isReal() {
    return isFinite(this.top) && isFinite(this.right) && isFinite(this.bottom) && isFinite(this.left);
  }
  static rm = new Margin(0, 0, 0, 0).Ct();
  static qA = new Margin(2, 2, 2, 2).Ct();
}
