class Spot {
  sx;
  sy;
  ox;
  oy;
  constructor(t, i, e, s) {
    t === void 0
      ? ((this.sx = 0), (this.sy = 0), (this.ox = 0), (this.oy = 0))
      : (i === void 0 && (i = 0),
        e === void 0 && (e = 0),
        s === void 0 && (s = 0),
        (this.sx = t),
        (this.sy = i),
        (this.ox = e),
        (this.oy = s));
  }
  setTo(t, i, e, s) {
    return (
      Debug &&
        (this.ex(t, "setTo:x"), this.ex(i, "setTo:y"), this.nx(e, "setTo:offx"), this.nx(s, "setTo:offy"), this._()),
      (this.sx = t),
      (this.sy = i),
      (this.ox = e),
      (this.oy = s),
      this
    );
  }
  set(t) {
    return (
      Debug && (U.s(t, Spot, Spot, "set:s"), this._()),
      (this.sx = t.sx),
      (this.sy = t.sy),
      (this.ox = t.ox),
      (this.oy = t.oy),
      this
    );
  }
  copy() {
    const t = new Spot();
    return ((t.sx = this.sx), (t.sy = this.sy), (t.ox = this.ox), (t.oy = this.oy), t);
  }
  Ct() {
    return (Object.freeze(this), this);
  }
  T() {
    return Object.isFrozen(this) ? this : this.copy().Ct();
  }
  _(t) {
    if (Debug && Object.isFrozen(this)) {
      let i = "The Spot is frozen, so its properties cannot be set: " + this.toString();
      (t !== void 0 && (i += "  to value: " + t), U.n(i));
    }
  }
  $e(t) {
    return ((this.sx = NaN), (this.sy = NaN), (this.ox = t), this.Ct());
  }
  ex(t, i) {
    (isNaN(t) || t > 1 || t < 0) && U.G(t, "0 <= " + i + " <= 1", Spot, i);
  }
  nx(t, i) {
    (isNaN(t) || t === 1 / 0 || t === -1 / 0) && U.G(t, "real number, not NaN or Infinity", Spot, i);
  }
  static parse(t) {
    if (typeof t == "string") {
      if (((t = t.trim()), t === "None")) return Spot.None;
      if (t === "TopLeft") return Spot.TopLeft;
      if (t === "Top" || t === "TopCenter" || t === "MiddleTop") return Spot.TopCenter;
      if (t === "TopRight") return Spot.TopRight;
      if (t === "Left" || t === "LeftCenter" || t === "MiddleLeft") return Spot.LeftCenter;
      if (t === "Center") return Spot.Center;
      if (t === "Right" || t === "RightCenter" || t === "MiddleRight") return Spot.RightCenter;
      if (t === "BottomLeft") return Spot.BottomLeft;
      if (t === "Bottom" || t === "BottomCenter" || t === "MiddleBottom") return Spot.BottomCenter;
      if (t === "BottomRight") return Spot.BottomRight;
      if (t === "TopSide") return Spot.TopSide;
      if (t === "LeftSide") return Spot.LeftSide;
      if (t === "RightSide") return Spot.RightSide;
      if (t === "BottomSide") return Spot.BottomSide;
      if (t === "TopBottomSides") return Spot.TopBottomSides;
      if (t === "LeftRightSides") return Spot.LeftRightSides;
      if (t === "TopLeftSides") return Spot.TopLeftSides;
      if (t === "TopRightSides") return Spot.TopRightSides;
      if (t === "BottomLeftSides") return Spot.BottomLeftSides;
      if (t === "BottomRightSides") return Spot.BottomRightSides;
      if (t === "NotTopSide") return Spot.NotTopSide;
      if (t === "NotLeftSide") return Spot.NotLeftSide;
      if (t === "NotRightSide") return Spot.NotRightSide;
      if (t === "NotBottomSide") return Spot.NotBottomSide;
      if (t === "AllSides") return Spot.AllSides;
      if (t === "Default") return Spot.Default;
      const i = t.split(" ");
      let e = 0,
        s = 0;
      for (; i[e] === ""; ) e++;
      let n = i[e++];
      n !== void 0 && n.length > 0 && (s = parseFloat(n));
      let o = 0;
      for (; i[e] === ""; ) e++;
      ((n = i[e++]), n !== void 0 && n.length > 0 && (o = parseFloat(n)));
      let r = 0;
      for (; i[e] === ""; ) e++;
      ((n = i[e++]), n !== void 0 && n.length > 0 && (r = parseFloat(n)));
      let l = 0;
      for (; i[e] === ""; ) e++;
      return ((n = i[e++]), n !== void 0 && n.length > 0 && (l = parseFloat(n)), new Spot(s, o, r, l));
    } else return new Spot();
  }
  static stringify(t) {
    return (
      Debug && U.s(t, Spot),
      t.isSpot()
        ? t.x.toString() + " " + t.y.toString() + " " + t.offsetX.toString() + " " + t.offsetY.toString()
        : t.toString()
    );
  }
  static stringifyFixed(t) {
    return (
      U.i(t, "number", Spot, "stringifyFixed:digits"),
      (i) => i.x.toFixed(t) + " " + i.y.toFixed(t) + " " + i.offsetX.toFixed(t) + " " + i.offsetY.toFixed(t)
    );
  }
  toString() {
    return this.isSpot()
      ? this.ox === 0 && this.oy === 0
        ? "Spot(" + this.x + "," + this.y + ")"
        : "Spot(" + this.x + "," + this.y + "," + this.offsetX + "," + this.offsetY + ")"
      : this.equals(Spot.None)
        ? "None"
        : this.equals(Spot.TopLeft)
          ? "TopLeft"
          : this.equals(Spot.TopCenter)
            ? "Top"
            : this.equals(Spot.TopRight)
              ? "TopRight"
              : this.equals(Spot.LeftCenter)
                ? "Left"
                : this.equals(Spot.Center)
                  ? "Center"
                  : this.equals(Spot.RightCenter)
                    ? "Right"
                    : this.equals(Spot.BottomLeft)
                      ? "BottomLeft"
                      : this.equals(Spot.BottomCenter)
                        ? "Bottom"
                        : this.equals(Spot.BottomRight)
                          ? "BottomRight"
                          : this.equals(Spot.TopSide)
                            ? "TopSide"
                            : this.equals(Spot.LeftSide)
                              ? "LeftSide"
                              : this.equals(Spot.RightSide)
                                ? "RightSide"
                                : this.equals(Spot.BottomSide)
                                  ? "BottomSide"
                                  : this.equals(Spot.TopBottomSides)
                                    ? "TopBottomSides"
                                    : this.equals(Spot.LeftRightSides)
                                      ? "LeftRightSides"
                                      : this.equals(Spot.TopLeftSides)
                                        ? "TopLeftSides"
                                        : this.equals(Spot.TopRightSides)
                                          ? "TopRightSides"
                                          : this.equals(Spot.BottomLeftSides)
                                            ? "BottomLeftSides"
                                            : this.equals(Spot.BottomRightSides)
                                              ? "BottomRightSides"
                                              : this.equals(Spot.NotTopSide)
                                                ? "NotTopSide"
                                                : this.equals(Spot.NotLeftSide)
                                                  ? "NotLeftSide"
                                                  : this.equals(Spot.NotRightSide)
                                                    ? "NotRightSide"
                                                    : this.equals(Spot.NotBottomSide)
                                                      ? "NotBottomSide"
                                                      : this.equals(Spot.AllSides)
                                                        ? "AllSides"
                                                        : this.equals(Spot.Default)
                                                          ? "Default"
                                                          : "None";
  }
  equals(t) {
    return t instanceof Spot
      ? (this.sx === t.x || (isNaN(this.sx) && isNaN(t.x))) &&
          (this.sy === t.y || (isNaN(this.sy) && isNaN(t.y))) &&
          this.ox === t.offsetX &&
          this.oy === t.offsetY
      : false;
  }
  opposite() {
    return new Spot(0.5 - (this.sx - 0.5), 0.5 - (this.sy - 0.5), -this.ox, -this.oy);
  }
  includesSide(t) {
    if (!this.isSide()) return false;
    if (!t.isSide())
      if (t.equals(Spot.Left)) t = Spot.LeftSide;
      else if (t.equals(Spot.Right)) t = Spot.RightSide;
      else if (t.equals(Spot.Top)) t = Spot.TopSide;
      else if (t.equals(Spot.Bottom)) t = Spot.BottomSide;
      else return false;
    const i = this.oy,
      e = t.offsetY;
    return (i & e) === e;
  }
  get x() {
    return this.sx;
  }
  set x(t) {
    (Debug && (this.ex(t, "x"), this._(t)), (this.sx = t));
  }
  get y() {
    return this.sy;
  }
  set y(t) {
    (Debug && (this.ex(t, "y"), this._(t)), (this.sy = t));
  }
  get offsetX() {
    return this.ox;
  }
  set offsetX(t) {
    (Debug && (this.nx(t, "offsetX"), this._(t)), (this.ox = t));
  }
  get offsetY() {
    return this.oy;
  }
  set offsetY(t) {
    (Debug && (this.nx(t, "offsetY"), this._(t)), (this.oy = t));
  }
  isSpot() {
    return !isNaN(this.x) && !isNaN(this.y);
  }
  isNoSpot() {
    return isNaN(this.x) || isNaN(this.y);
  }
  isSide() {
    return isNaN(this.x) && isNaN(this.y) && this.offsetX === 1 && this.offsetY !== 0;
  }
  isNone() {
    return isNaN(this.x) && isNaN(this.y) && this.offsetX === 0 && this.offsetY === 0;
  }
  isDefault() {
    return isNaN(this.x) && isNaN(this.y) && this.offsetX === -1 && this.offsetY === 0;
  }
  static None = new Spot(0, 0, 0, 0).$e(0);
  static Default = new Spot(0, 0, -1, 0).$e(-1);
  static TopLeft = new Spot(0, 0, 0, 0).Ct();
  static TopCenter = new Spot(0.5, 0, 0, 0).Ct();
  static TopRight = new Spot(1, 0, 0, 0).Ct();
  static LeftCenter = new Spot(0, 0.5, 0, 0).Ct();
  static Center = new Spot(0.5, 0.5, 0, 0).Ct();
  static RightCenter = new Spot(1, 0.5, 0, 0).Ct();
  static BottomLeft = new Spot(0, 1, 0, 0).Ct();
  static BottomCenter = new Spot(0.5, 1, 0, 0).Ct();
  static BottomRight = new Spot(1, 1, 0, 0).Ct();
  static MiddleTop = Spot.TopCenter;
  static MiddleLeft = Spot.LeftCenter;
  static MiddleRight = Spot.RightCenter;
  static MiddleBottom = Spot.BottomCenter;
  static Top = Spot.TopCenter;
  static Left = Spot.LeftCenter;
  static Right = Spot.RightCenter;
  static Bottom = Spot.BottomCenter;
  static TopSide = new Spot(0, 0, 1, 1).$e(1);
  static LeftSide = new Spot(0, 0, 1, 2).$e(1);
  static RightSide = new Spot(0, 0, 1, 4).$e(1);
  static BottomSide = new Spot(0, 0, 1, 8).$e(1);
  static TopBottomSides = new Spot(0, 0, 1, 9).$e(1);
  static LeftRightSides = new Spot(0, 0, 1, 6).$e(1);
  static TopLeftSides = new Spot(0, 0, 1, 3).$e(1);
  static TopRightSides = new Spot(0, 0, 1, 5).$e(1);
  static BottomLeftSides = new Spot(0, 0, 1, 10).$e(1);
  static BottomRightSides = new Spot(0, 0, 1, 12).$e(1);
  static NotTopSide = new Spot(0, 0, 1, 14).$e(1);
  static NotLeftSide = new Spot(0, 0, 1, 13).$e(1);
  static NotRightSide = new Spot(0, 0, 1, 11).$e(1);
  static NotBottomSide = new Spot(0, 0, 1, 7).$e(1);
  static AllSides = new Spot(0, 0, 1, 15).$e(1);
  static Ok = new Spot(0.156, 0.156).Ct();
  static Ek = new Spot(0.844, 0.844).Ct();
}
