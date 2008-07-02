class GeoStream {
  Di;
  pm;
  constructor() {
    ((this.pm = new Geometry()), (this.Di = null));
  }
  Ki(t) {
    (t !== null ? ((this.pm = t), t.figures.clear()) : (this.pm = new Geometry()), (this.Di = null));
  }
  Ru(t, i, e, s, n, o) {
    if (s !== void 0 && s === true) {
      const r = new PathSegment(1);
      ((r.endX = t), (r.endY = i), this.Di.segments.add(r));
    } else
      ((this.Di = new PathFigure()),
        (this.Di.startX = t),
        (this.Di.startY = i),
        (this.Di.isFilled = e),
        (this.Di.isEvenOdd = o || false),
        this.pm.figures.add(this.Di));
    n !== void 0 && (this.Di.isShadowed = n);
  }
  hR() {
    const t = this.Di.segments.length;
    t > 0 && this.Di.segments.elt(t - 1).close();
  }
  aR() {
    this.Di.segments.length > 0 && (this.Di.isFilled = true);
  }
  fR(t) {
    this.Di.isShadowed = t;
  }
  KV(t) {
    this.Di.isEvenOdd = t;
  }
  oR(t, i, e) {
    e === void 0 && (e = false);
    const s = new PathSegment(1);
    ((s.endX = t), (s.endY = i), e && s.close(), this.Di.segments.add(s));
  }
  js(t, i, e) {
    e === void 0 && (e = false);
    const s = new PathSegment(2);
    ((s.endX = t), (s.endY = i), e && s.close(), this.Di.segments.add(s));
  }
  Pr(t, i, e, s, n, o, r) {
    r === void 0 && (r = false);
    const l = new PathSegment(3);
    ((l.point1X = t),
      (l.point1Y = i),
      (l.point2X = e),
      (l.point2Y = s),
      (l.endX = n),
      (l.endY = o),
      r && l.close(),
      this.Di.segments.add(l));
  }
  Ou(t, i, e, s, n) {
    n === void 0 && (n = false);
    const o = new PathSegment(4);
    ((o.point1X = t), (o.point1Y = i), (o.endX = e), (o.endY = s), n && o.close(), this.Di.segments.add(o));
  }
  rR(t, i, e, s, n, o, r) {
    (o === void 0 && (o = 0), r === void 0 && (r = false));
    const l = new PathSegment(5);
    ((l.startAngle = t),
      (l.sweepAngle = i),
      (l.centerX = e),
      (l.centerY = s),
      (l.radiusX = n),
      o !== 0 ? (l.radiusY = o) : (l.radiusY = n),
      r && l.close(),
      this.Di.segments.add(l));
  }
  lR(t, i, e, s, n, o, r, l) {
    l === void 0 && (l = false);
    const h = new PathSegment(6, o, r, t, i, e, s, n);
    (l && h.close(), this.Di.segments.add(h));
  }
  static gC = null;
  static QA(t) {
    const i = GeoStream.gC;
    if (i !== null) return ((GeoStream.gC = null), i.Ki(t), i);
    {
      const e = new GeoStream();
      return (e.Ki(t), e);
    }
  }
  static _A(t) {
    GeoStream.gC = t;
  }
}
{
  const w = function (n, o) {
    const r = n.toLowerCase(),
      l = G.bn;
    ((l[n] = o), (l[r] = n));
  };
  (w("Rectangle", (n, o, r) => {
    const l = "r" + o + "," + r;
    let h = G.Sr[l];
    return (
      h !== void 0 || ((h = new Geometry(2)), (h.endX = o), (h.endY = r), G.kr < G.um && ((G.Sr[l] = h), G.kr++)),
      h
    );
  }),
    w("Square", (n, o, r) => {
      const l = "s" + o + "," + r;
      let h = G.Sr[l];
      return (
        h !== void 0 ||
          ((h = new Geometry(2)),
          (h.endX = o),
          (h.endY = r),
          (h.defaultStretch = 6),
          G.kr < G.um && ((G.Sr[l] = h), G.kr++)),
        h
      );
    }));
  const t = (n, o, r, l, h) => {
    ((isNaN(l) || l < 0) && (l = 5), isNaN(h) && (h = 15));
    const a = "rr" + o + "," + r + "," + l + "," + h;
    let f = G.Sr[a];
    if (f !== void 0) return f;
    let c = l;
    (h & 1) === 1
      ? ((c = Math.min(c, (h & 2) === 2 ? o / 3 : o)), (c = Math.min(c, (h & 8) === 8 ? r / 3 : r)))
      : (c = 0);
    const u = new PathFigure(c, 0, true);
    f = new Geometry().add(u);
    const d = Spot.TopLeft.copy(),
      m = Spot.BottomRight.copy();
    if ((h & 2) === 2) {
      let g = l;
      ((g = Math.min(g, (h & 1) === 1 ? o / 3 : o)), (g = Math.min(g, (h & 4) === 4 ? r / 3 : r)));
      const p = g * G.Zn;
      (u.add(new PathSegment(2, o - g, 0)).add(new PathSegment(3, o, g, o - p, 0, o, p)),
        (d.offsetY = p),
        (m.offsetX = -p));
    } else u.add(new PathSegment(2, o, 0));
    if ((h & 4) === 4) {
      let g = l;
      ((g = Math.min(g, (h & 8) === 8 ? o / 3 : o)), (g = Math.min(g, (h & 2) === 2 ? r / 3 : r)));
      const p = g * G.Zn;
      (u.add(new PathSegment(2, o, r - g)).add(new PathSegment(3, o - g, r, o, r - p, o - p, r)),
        (m.offsetX = -p),
        (m.offsetY = -p));
    } else u.add(new PathSegment(2, o, r));
    if ((h & 8) === 8) {
      let g = l;
      ((g = Math.min(g, (h & 4) === 4 ? o / 3 : o)), (g = Math.min(g, (h & 1) === 1 ? r / 3 : r)));
      const p = g * G.Zn;
      (u.add(new PathSegment(2, g, r)).add(new PathSegment(3, 0, r - g, p, r, 0, r - p)),
        (d.offsetX = p),
        (m.offsetY = -p));
    } else u.add(new PathSegment(2, 0, r));
    if ((h & 1) === 1) {
      const g = c * G.Zn;
      (u.add(new PathSegment(2, 0, c)).add(new PathSegment(3, c, 0, 0, g, g, 0).close()),
        (d.offsetX = g),
        (d.offsetY = g));
    } else u.add(new PathSegment(2, 0, 0).close());
    return ((f.spot1 = d), (f.spot2 = m), G.kr < G.um && ((G.Sr[a] = f), G.kr++), f);
  };
  (w("RoundedRectangle", (n, o, r) => {
    const l = n ? n.parameter1 : NaN,
      h = n ? n.parameter2 : NaN;
    return t(n, o, r, l, h);
  }),
    w("Border", "RoundedRectangle"),
    w("RoundedTopRectangle", (n, o, r) => {
      const l = n ? n.parameter1 : NaN;
      return t(n, o, r, l, 3);
    }),
    w("RoundedBottomRectangle", (n, o, r) => {
      const l = n ? n.parameter1 : NaN;
      return t(n, o, r, l, 12);
    }),
    w("RoundedLeftRectangle", (n, o, r) => {
      const l = n ? n.parameter1 : NaN;
      return t(n, o, r, l, 9);
    }),
    w("RoundedRightRectangle", (n, o, r) => {
      const l = n ? n.parameter1 : NaN;
      return t(n, o, r, l, 6);
    }),
    w("Ellipse", (n, o, r) => {
      const l = "e" + o + "," + r;
      let h = G.Sr[l];
      return (
        h !== void 0 ||
          ((h = new Geometry(3)),
          (h.endX = o),
          (h.endY = r),
          (h.spot1 = Spot.Ok),
          (h.spot2 = Spot.Ek),
          G.kr < G.um && ((G.Sr[l] = h), G.kr++)),
        h
      );
    }),
    w("Circle", (n, o, r) => {
      const l = "c" + o + "," + r;
      let h = G.Sr[l];
      return (
        h !== void 0 ||
          ((h = new Geometry(3)),
          (h.endX = o),
          (h.endY = r),
          (h.spot1 = Spot.Ok),
          (h.spot2 = Spot.Ek),
          (h.defaultStretch = 6),
          G.kr < G.um && ((G.Sr[l] = h), G.kr++)),
        h
      );
    }),
    w("TriangleRight", (n, o, r) =>
      new Geometry()
        .add(new PathFigure(0, 0).add(new PathSegment(2, o, 0.5 * r)).add(new PathSegment(2, 0, r).close()))
        .setSpots(0, 0.25, 0.5, 0.75),
    ),
    w("TriangleDown", (n, o, r) =>
      new Geometry()
        .add(new PathFigure(0, 0).add(new PathSegment(2, o, 0)).add(new PathSegment(2, 0.5 * o, r).close()))
        .setSpots(0.25, 0, 0.75, 0.5),
    ),
    w("TriangleLeft", (n, o, r) =>
      new Geometry()
        .add(new PathFigure(o, r).add(new PathSegment(2, 0, 0.5 * r)).add(new PathSegment(2, o, 0).close()))
        .setSpots(0.5, 0.25, 1, 0.75),
    ),
    w("TriangleUp", (n, o, r) =>
      new Geometry()
        .add(new PathFigure(o, r).add(new PathSegment(2, 0, r)).add(new PathSegment(2, 0.5 * o, 0).close()))
        .setSpots(0.25, 0.5, 0.75, 1),
    ),
    w("Triangle", "TriangleUp"),
    w("Diamond", (n, o, r) =>
      new Geometry()
        .add(
          new PathFigure(0.5 * o, 0)
            .add(new PathSegment(2, 0, 0.5 * r))
            .add(new PathSegment(2, 0.5 * o, r))
            .add(new PathSegment(2, o, 0.5 * r).close()),
        )
        .setSpots(0.25, 0.25, 0.75, 0.75),
    ),
    w("LineH", (n, o, r) => {
      const l = new Geometry(1);
      return ((l.startX = 0), (l.startY = r / 2), (l.endX = o), (l.endY = r / 2), l);
    }),
    w("LineV", (n, o, r) => {
      const l = new Geometry(1);
      return ((l.startX = o / 2), (l.startY = 0), (l.endX = o / 2), (l.endY = r), l);
    }),
    w("None", "Rectangle"),
    w("BarH", "Rectangle"),
    w("BarV", "Rectangle"),
    w("MinusLine", "LineH"),
    w("PlusLine", (n, o, r) =>
      new Geometry().add(
        new PathFigure(0, r / 2, false)
          .add(new PathSegment(2, o, r / 2))
          .add(new PathSegment(1, o / 2, 0))
          .add(new PathSegment(2, o / 2, r)),
      ),
    ),
    w("XLine", (n, o, r) =>
      new Geometry().add(
        new PathFigure(0, r, false)
          .add(new PathSegment(2, o, 0))
          .add(new PathSegment(1, 0, 0))
          .add(new PathSegment(2, o, r)),
      ),
    ),
    w("LineRight", (n, o, r) =>
      new Geometry().add(
        new PathFigure(0.25 * o, 0, false).add(new PathSegment(2, 0.75 * o, 0.5 * r)).add(new PathSegment(2, 0.25 * o, r)),
      ),
    ),
    w("LineDown", (n, o, r) =>
      new Geometry().add(
        new PathFigure(0, 0.25 * r, false).add(new PathSegment(2, 0.5 * o, 0.75 * r)).add(new PathSegment(2, o, 0.25 * r)),
      ),
    ),
    w("LineLeft", (n, o, r) =>
      new Geometry().add(
        new PathFigure(0.75 * o, 0, false).add(new PathSegment(2, 0.25 * o, 0.5 * r)).add(new PathSegment(2, 0.75 * o, r)),
      ),
    ),
    w("LineUp", (n, o, r) =>
      new Geometry().add(
        new PathFigure(0, 0.75 * r, false).add(new PathSegment(2, 0.5 * o, 0.25 * r)).add(new PathSegment(2, o, 0.75 * r)),
      ),
    ),
    w("Capsule", (n, o, r) => {
      const l = new Geometry();
      if (o < r) {
        const h = o / 2,
          a = new PathFigure(0, h, true);
        (l.add(a),
          a.add(new PathSegment(5, 180, 180, h, h, h, h)),
          a.add(new PathSegment(2, o, r - h)),
          a.add(new PathSegment(5, 0, 180, h, r - h, h, h)),
          a.add(new PathSegment(2, 0, h)));
        const f = isFinite(n.parameter1) ? n.parameter1 : o * 0.156;
        return (l.setSpots(0, 0, 1, 1, 0, f, 0, -f), l);
      } else if (o > r) {
        const h = r / 2,
          a = new PathFigure(h, 0, true);
        (l.add(a),
          a.add(new PathSegment(2, o - h, 0)),
          a.add(new PathSegment(5, 270, 180, o - h, h, h, h)),
          a.add(new PathSegment(2, h, r)),
          a.add(new PathSegment(5, 90, 180, h, h, h, h)));
        const f = isFinite(n.parameter1) ? n.parameter1 : r * 0.156;
        return (l.setSpots(0, 0, 1, 1, f, 0, -f, 0), l);
      } else return ((l.type = 3), (l.endX = o), (l.endY = r), (l.spot1 = Spot.Ok), (l.spot2 = Spot.Ek), l);
    }));
  const i = (n, o) => new PathFigure(n, o, false, false),
    e = (n, o, r) => n.add(new PathSegment(2, o, r)),
    s = (n, o, r) => n.add(new PathSegment(1, o, r));
  w("Borders", (n, o, r) => {
    let l = n ? n.parameter1 : NaN;
    isNaN(l) ? (l = 10) : (l = l & 15);
    const h = new Geometry();
    let a;
    return (
      l === 10
        ? ((a = i(o, 0)), e(a, o, r), s(a, 0, r), e(a, 0, 0))
        : l === 5
          ? ((a = i(0, 0)), e(a, o, 0), s(a, o, r), e(a, 0, r))
          : l === 1
            ? ((a = i(0, 0)), e(a, o, 0), s(a, o, r))
            : l === 2
              ? ((a = i(o, 0)), e(a, o, r))
              : l === 4
                ? ((a = i(o, r)), e(a, 0, r))
                : l === 8
                  ? ((a = i(0, r)), e(a, 0, 0), s(a, o, r))
                  : l === 3
                    ? ((a = i(0, 0)), e(a, o, 0), e(a, o, r))
                    : l === 6
                      ? ((a = i(o, 0)), e(a, o, r), e(a, 0, r))
                      : l === 12
                        ? ((a = i(o, r)), e(a, 0, r), e(a, 0, 0))
                        : l === 9
                          ? ((a = i(0, r)), e(a, 0, 0), e(a, o, 0))
                          : l === 7
                            ? ((a = i(0, 0)), e(a, o, 0), e(a, o, r), e(a, 0, r))
                            : l === 14
                              ? ((a = i(o, 0)), e(a, o, r), e(a, 0, r), e(a, 0, 0))
                              : l === 13
                                ? ((a = i(o, r)), e(a, 0, r), e(a, 0, 0), e(a, o, 0))
                                : l === 11
                                  ? ((a = i(0, r)), e(a, 0, 0), e(a, o, 0), e(a, o, r))
                                  : l === 15
                                    ? ((a = i(0, 0)),
                                      e(a, o, 0),
                                      e(a, o, r),
                                      e(a, 0, r),
                                      a.add(new PathSegment(2, 0, 0).close()))
                                    : ((a = i(0, 0)), s(a, o, r)),
      h.add(a),
      h
    );
  });
}
G.cm = {
  "": "",
  Standard: "F1 m 0,0 l 8,4 -8,4 2,-4 z",
  Backward: "F1 m 8,0 l -2,4 2,4 -8,-4 z",
  Triangle: "F1 m 0,0 l 8,4.62 -8,4.62 z",
  BackwardTriangle: "F1 m 8,4 l 0,4 -8,-4 8,-4 0,4 z",
  Boomerang: "F1 m 0,0 l 8,4 -8,4 4,-4 -4,-4 z",
  BackwardBoomerang: "F1 m 8,0 l -8,4 8,4 -4,-4 4,-4 z",
  SidewaysV: "m 0,0 l 8,4 -8,4 0,-1 6,-3 -6,-3 0,-1 z",
  BackwardV: "m 8,0 l -8,4 8,4 0,-1 -6,-3 6,-3 0,-1 z",
  OpenTriangle: "m 0,0 l 8,4 -8,4",
  BackwardOpenTriangle: "m 8,0 l -8,4 8,4",
  OpenTriangleLine: "m 0,0 l 8,4 -8,4 m 8.5,0 l 0,-8",
  BackwardOpenTriangleLine: "m 8,0 l  -8,4 8,4 m -8.5,0 l 0,-8",
  OpenTriangleTop: "m 0,0 l 8,4 m 0,4",
  BackwardOpenTriangleTop: "m 8,0 l -8,4 m 0,4",
  OpenTriangleBottom: "m 0,8 l 8,-4",
  BackwardOpenTriangleBottom: "m 0,4 l 8,4",
  HalfTriangleTop: "F1 m 0,0 l 0,4 8,0 z m 0,8",
  BackwardHalfTriangleTop: "F1 m 8,0 l 0,4 -8,0 z m 0,8",
  HalfTriangleBottom: "F1 m 0,4 l 0,4 8,-4 z",
  BackwardHalfTriangleBottom: "F1 m 8,4 l 0,4 -8,-4 z",
  ForwardSemiCircle: "m 4,0 b 270 180 0 4 4",
  BackwardSemiCircle: "m 4,8 b 90 180 0 -4 4",
  Feather: "m 0,0 l 3,4 -3,4",
  BackwardFeather: "m 3,0 l -3,4 3,4",
  DoubleFeathers: "m 0,0 l 3,4 -3,4 m 3,-8 l 3,4 -3,4",
  BackwardDoubleFeathers: "m 3,0 l -3,4 3,4 m 3,-8 l -3,4 3,4",
  TripleFeathers: "m 0,0 l 3,4 -3,4 m 3,-8 l 3,4 -3,4 m 3,-8 l 3,4 -3,4",
  BackwardTripleFeathers: "m 3,0 l -3,4 3,4 m 3,-8 l -3,4 3,4 m 3,-8 l -3,4 3,4",
  ForwardSlash: "m 0,8 l 5,-8",
  BackSlash: "m 0,0 l 5,8",
  DoubleForwardSlash: "m 0,8 l 4,-8 m -2,8 l 4,-8",
  DoubleBackSlash: "m 0,0 l 4,8 m -2,-8 l 4,8",
  TripleForwardSlash: "m 0,8 l 4,-8 m -2,8 l 4,-8 m -2,8 l 4,-8",
  TripleBackSlash: "m 0,0 l 4,8 m -2,-8 l 4,8 m -2,-8 l 4,8",
  Fork: "m 0,4 l 8,0 m -8,0 l 8,-4 m -8,4 l 8,4",
  BackwardFork: "m 8,4 l -8,0 m 8,0 l -8,-4 m 8,4 l -8,4",
  LineFork: "m 0,0 l 0,8 m 0,-4 l 8,0 m -8,0 l 8,-4 m -8,4 l 8,4",
  BackwardLineFork: "m 8,4 l -8,0 m 8,0 l -8,-4 m 8,4 l -8,4 m 8,-8 l 0,8",
  CircleFork: "F1 m 6,4 b 0 360 -3 0 3 z m 0,0 l 6,0 m -6,0 l 6,-4 m -6,4 l 6,4",
  BackwardCircleFork: "F1 m 0,4 l 6,0 m -6,-4 l 6,4 m -6,4 l 6,-4 m 6,0 b 0 360 -3 0 3",
  CircleLineFork: "F1 m 6,4 b 0 360 -3 0 3 z m 1,-4 l 0,8 m 0,-4 l 6,0 m -6,0 l 6,-4 m -6,4 l 6,4",
  BackwardCircleLineFork: "F1 m 0,4 l 6,0 m -6,-4 l 6,4 m -6,4 l 6,-4 m 0,-4 l 0,8 m 7,-4 b 0 360 -3 0 3",
  Circle: "F1 m 8,4 b 0 360 -4 0 4 z",
  Block: "F1 m 0,0 l 0,8 8,0 0,-8 z",
  StretchedDiamond: "F1 m 0,3 l 5,-3 5,3 -5,3 -5,-3 z",
  Diamond: "F1 m 0,4 l 4,-4 4,4 -4,4 -4,-4 z",
  Chevron: "F1 m 0,0 l 5,0 3,4 -3,4 -5,0 3,-4 -3,-4 z",
  StretchedChevron: "F1 m 0,0 l 8,0 3,4 -3,4 -8,0 3,-4 -3,-4 z",
  NormalArrow: "F1 m 0,2 l 4,0 0,-2 4,4 -4,4 0,-2 -4,0 z",
  X: "m 0,0 l 8,8 m 0,-8 l -8,8",
  TailedNormalArrow: "F1 m 0,0 l 2,0 1,2 3,0 0,-2 2,4 -2,4 0,-2 -3,0 -1,2 -2,0 1,-4 -1,-4 z",
  DoubleTriangle: "F1 m 0,0 l 4,4 -4,4 0,-8 z  m 4,0 l 4,4 -4,4 0,-8 z",
  BigEndArrow: "F1 m 0,0 l 5,2 0,-2 3,4 -3,4 0,-2 -5,2 0,-8 z",
  ConcaveTailArrow: "F1 m 0,2 h 4 v -2 l 4,4 -4,4 v -2 h -4 l 2,-2 -2,-2 z",
  RoundedTriangle: "F1 m 0,1 a 1,1 0 0 1 1,-1 l 7,3 a 0.5,1 0 0 1 0,2 l -7,3 a 1,1 0 0 1 -1,-1 l 0,-6 z",
  SimpleArrow: "F1 m 1,2 l -1,-2 2,0 1,2 -1,2 -2,0 1,-2 5,0 0,-2 2,2 -2,2 0,-2 z",
  AccelerationArrow: "F1 m 0,0 l 0,8 0.2,0 0,-8 -0.2,0 z m 2,0 l 0,8 1,0 0,-8 -1,0 z m 3,0 l 2,0 2,4 -2,4 -2,0 0,-8 z",
  BoxArrow: "F1 m 0,0 l 4,0 0,2 2,0 0,-2 2,4 -2,4 0,-2 -2,0 0,2 -4,0 0,-8 z",
  TriangleLine: "F1 m 8,4 l -8,-4 0,8 8,-4 z m 0.5,4 l 0,-8",
  CircleEndedArrow: "F1 m 10,4 l -2,-3 0,2 -2,0 0,2 2,0 0,2 2,-3 z m -4,0 b 0 360 -3 0 3 z",
  DynamicWidthArrow: "F1 m 0,3 l 2,0 2,-1 2,-2 2,4 -2,4 -2,-2 -2,-1 -2,0 0,-2 z",
  EquilibriumArrow: "m 0,3 l 8,0 -3,-3 m 3,5 l -8,0 3,3",
  FastForward: "F1 m 0,0 l 3.5,4 0,-4 3.5,4 0,-4 1,0 0,8 -1,0 0,-4 -3.5,4 0,-4 -3.5,4 0,-8 z",
  Kite: "F1 m 0,4 l 2,-4 6,4 -6,4 -2,-4 z",
  HalfArrowTop: "F1 m 0,0 l 4,4 4,0 -8,-4 z m 0,8",
  HalfArrowBottom: "F1 m 0,8 l 4,-4 4,0 -8,4 z",
  OpposingDirectionDoubleArrow: "F1 m 0,4 l 2,-4 0,2 4,0 0,-2 2,4 -2,4 0,-2 -4,0 0,2 -2,-4 z",
  PartialDoubleTriangle: "F1 m 0,0 4,3 0,-3 4,4 -4,4 0,-3 -4,3 0,-8 z",
  LineCircle: "F1 m 0,0 l 0,8 m 7 -4 b 0 360 -3 0 3 z",
  DoubleLineCircle: "F1 m 0,0 l 0,8 m 2,-8 l 0,8 m 7 -4 b 0 360 -3 0 3 z",
  TripleLineCircle: "F1 m 0,0 l 0,8 m 2,-8 l 0,8 m 2,-8 l 0,8 m 7 -4 b 0 360 -3 0 3 z",
  CircleLine: "F1 m 6 4 b 0 360 -3 0 3 z m 1,-4 l 0,8",
  DiamondCircle: "F1 m 8,4 l -4,4 -4,-4 4,-4 4,4 m 8,0 b 0 360 -4 0 4 z",
  PlusCircle: "F1 m 8,4 b 0 360 -4 0 4 l -8 0 z m -4 -4 l 0 8",
  OpenRightTriangleTop: "m 8,0 l 0,4 -8,0 m 0,4",
  OpenRightTriangleBottom: "m 8,8 l 0,-4 -8,0",
  Line: "m 0,0 l 0,8",
  DoubleLine: "m 0,0 l 0,8 m 2,0 l 0,-8",
  TripleLine: "m 0,0 l 0,8 m 2,0 l 0,-8 m 2,0 l 0,8",
  PentagonArrow: "F1 m 8,4 l -4,-4 -4,0 0,8 4,0 4,-4 z",
};
var LayoutConditions = ((w) => (
  (w[(w.None = 0)] = "None"),
  (w[(w.Added = 1)] = "Added"),
  (w[(w.Removed = 2)] = "Removed"),
  (w[(w.Shown = 4)] = "Shown"),
  (w[(w.Hidden = 8)] = "Hidden"),
  (w[(w.NodeSized = 16)] = "NodeSized"),
  (w[(w.GroupLayout = 32)] = "GroupLayout"),
  (w[(w.NodeReplaced = 64)] = "NodeReplaced"),
  (w[(w.Standard = 127)] = "Standard"),
  (w[(w.All = 16777215)] = "All"),
  w
))(LayoutConditions || {});
