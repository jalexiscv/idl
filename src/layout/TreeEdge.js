class TreeEdge extends LayoutEdge {
  Ck;
  constructor(t) {
    (super(t), (this.Ck = new Point(0, 0)));
  }
  commit() {
    const t = this.link;
    if (t === null || t.isAvoiding) return;
    const i = this.network.layout;
    let e = null,
      s = null;
    switch (i.ks) {
      case 1:
        ((e = this.fromVertex), (s = this.toVertex));
        break;
      case 2:
        ((e = this.toVertex), (s = this.fromVertex));
        break;
      default:
        U.n("Unhandled path value " + i.ks.toString());
    }
    if (e === null || s === null) return;
    const n = this.Ck;
    if (n.x === 0 && n.y === 0) {
      this.TV(e, s);
      return;
    }
    const o = e.bounds,
      r = i.orthoAngle(e),
      l = i.computeLayerSpacing(e),
      h = e.rowSpacing;
    t.updateRoute();
    const a = t.curve === 9,
      f = t.isOrthogonal;
    let c = 0,
      u,
      d;
    if ((t.startRoute(), f || a)) {
      for (c = 2; t.pointsCount > 4; ) t.removePoint(2);
      ((u = t.getPoint(1)), (d = t.getPoint(2)));
    } else {
      for (c = 1; t.pointsCount > 3; ) t.removePoint(1);
      ((u = t.getPoint(0)), (d = t.getPoint(t.pointsCount - 1)));
    }
    const m = t.getPoint(t.pointsCount - 1);
    let g = 0;
    (r === 0
      ? (e.alignment === 23
          ? ((g = o.bottom + n.y),
            n.y === 0 && u.y > m.y + e.rowIndent && (g = Math.min(g, Math.max(u.y, g - i.computeNodeIndent(e)))))
          : e.alignment === 22
            ? ((g = o.top + n.y),
              n.y === 0 && u.y < m.y - e.rowIndent && (g = Math.max(g, Math.min(u.y, g + i.computeNodeIndent(e)))))
            : (g = o.y + o.height / 2 + n.y),
        a
          ? (t.insertPointAt(c, u.x, g),
            c++,
            t.insertPointAt(c, o.right + l, g),
            c++,
            t.insertPointAt(c, o.right + l + (n.x - h) / 3, g),
            c++,
            t.insertPointAt(c, o.right + l + ((n.x - h) * 2) / 3, g),
            c++,
            t.insertPointAt(c, o.right + l + (n.x - h), g),
            c++,
            t.insertPointAt(c, d.x, g),
            c++)
          : (f && (t.insertPointAt(c, o.right + l / 2, u.y), c++),
            t.insertPointAt(c, o.right + l / 2, g),
            c++,
            t.insertPointAt(c, o.right + l + n.x - (f ? h / 2 : h), g),
            c++,
            f && (t.insertPointAt(c, t.getPoint(c - 1).x, d.y), c++)))
      : r === 90
        ? (e.alignment === 23
            ? ((g = o.right + n.x),
              n.x === 0 && u.x > m.x + e.rowIndent && (g = Math.min(g, Math.max(u.x, g - i.computeNodeIndent(e)))))
            : e.alignment === 22
              ? ((g = o.left + n.x),
                n.x === 0 && u.x < m.x - e.rowIndent && (g = Math.max(g, Math.min(u.x, g + i.computeNodeIndent(e)))))
              : (g = o.x + o.width / 2 + n.x),
          a
            ? (t.insertPointAt(c, g, u.y),
              c++,
              t.insertPointAt(c, g, o.bottom + l),
              c++,
              t.insertPointAt(c, g, o.bottom + l + (n.y - h) / 3),
              c++,
              t.insertPointAt(c, g, o.bottom + l + ((n.y - h) * 2) / 3),
              c++,
              t.insertPointAt(c, g, o.bottom + l + (n.y - h)),
              c++,
              t.insertPointAt(c, g, d.y),
              c++)
            : (f && (t.insertPointAt(c, u.x, o.bottom + l / 2), c++),
              t.insertPointAt(c, g, o.bottom + l / 2),
              c++,
              t.insertPointAt(c, g, o.bottom + l + n.y - (f ? h / 2 : h)),
              c++,
              f && (t.insertPointAt(c, d.x, t.getPoint(c - 1).y), c++)))
        : r === 180
          ? (e.alignment === 23
              ? ((g = o.bottom + n.y),
                n.y === 0 && u.y > m.y + e.rowIndent && (g = Math.min(g, Math.max(u.y, g - i.computeNodeIndent(e)))))
              : e.alignment === 22
                ? ((g = o.top + n.y),
                  n.y === 0 && u.y < m.y - e.rowIndent && (g = Math.max(g, Math.min(u.y, g + i.computeNodeIndent(e)))))
                : (g = o.y + o.height / 2 + n.y),
            a
              ? (t.insertPointAt(c, u.x, g),
                c++,
                t.insertPointAt(c, o.left - l, g),
                c++,
                t.insertPointAt(c, o.left - l + (n.x + h) / 3, g),
                c++,
                t.insertPointAt(c, o.left - l + ((n.x + h) * 2) / 3, g),
                c++,
                t.insertPointAt(c, o.left - l + (n.x + h), g),
                c++,
                t.insertPointAt(c, d.x, g),
                c++)
              : (f && (t.insertPointAt(c, o.left - l / 2, u.y), c++),
                t.insertPointAt(c, o.left - l / 2, g),
                c++,
                t.insertPointAt(c, o.left - l + n.x + (f ? h / 2 : h), g),
                c++,
                f && (t.insertPointAt(c, t.getPoint(c - 1).x, d.y), c++)))
          : r === 270
            ? (e.alignment === 23
                ? ((g = o.right + n.x),
                  n.x === 0 && u.x > m.x + e.rowIndent && (g = Math.min(g, Math.max(u.x, g - i.computeNodeIndent(e)))))
                : e.alignment === 22
                  ? ((g = o.left + n.x),
                    n.x === 0 &&
                      u.x < m.x - e.rowIndent &&
                      (g = Math.max(g, Math.min(u.x, g + i.computeNodeIndent(e)))))
                  : (g = o.x + o.width / 2 + n.x),
              a
                ? (t.insertPointAt(c, g, u.y),
                  c++,
                  t.insertPointAt(c, g, o.top - l),
                  c++,
                  t.insertPointAt(c, g, o.top - l + (n.y + h) / 3),
                  c++,
                  t.insertPointAt(c, g, o.top - l + ((n.y + h) * 2) / 3),
                  c++,
                  t.insertPointAt(c, g, o.top - l + (n.y + h)),
                  c++,
                  t.insertPointAt(c, g, d.y),
                  c++)
                : (f && (t.insertPointAt(c, u.x, o.top - l / 2), c++),
                  t.insertPointAt(c, g, o.top - l / 2),
                  c++,
                  t.insertPointAt(c, g, o.top - l + n.y + (f ? h / 2 : h)),
                  c++,
                  f && (t.insertPointAt(c, d.x, t.getPoint(c - 1).y), c++)))
            : U.n("Invalid angle " + r),
      t.commitRoute());
  }
  TV(t, i) {
    (Debug && U.s(t, TreeVertex, TreeEdge, "adjustRouteForAngleChange:parent"),
      Debug && U.s(i, TreeVertex, TreeEdge, "adjustRouteForAngleChange:child"));
    const e = this.link;
    if (e === null) return;
    const s = this.network.layout,
      n = s.orthoAngle(t),
      o = s.orthoAngle(i);
    if (n === o) return;
    const r = s.computeLayerSpacing(t),
      l = t.bounds,
      h = i.bounds;
    if (
      (n === 0 && h.left - l.right < r + 1) ||
      (n === 90 && h.top - l.bottom < r + 1) ||
      (n === 180 && l.left - h.right < r + 1) ||
      (n === 270 && l.top - h.bottom < r + 1)
    )
      return;
    e.updateRoute();
    const a = e.curve === 9,
      f = e.isOrthogonal,
      c = this.fromVertex,
      u = s.isBusAlignment(c.alignment);
    if ((e.startRoute(), n === 0)) {
      const d = l.right + r / 2;
      if (a) {
        if (e.pointsCount === 4) {
          const m = e.getPoint(3).y;
          (e.setPointAt(1, d - 20, e.getPoint(1).y),
            e.insertPointAt(2, d - 20, m),
            e.insertPointAt(3, d, m),
            e.insertPointAt(4, d + 20, m),
            e.setPointAt(5, e.getPoint(5).x, m));
        }
      } else
        f
          ? u
            ? e.setPointAt(3, e.getPoint(2).x, e.getPoint(4).y)
            : e.pointsCount === 6 && (e.setPointAt(2, d, e.getPoint(2).y), e.setPointAt(3, d, e.getPoint(3).y))
          : e.pointsCount === 4
            ? e.insertPointAt(2, d, e.getPoint(2).y)
            : e.pointsCount === 3
              ? e.setPointAt(1, d, e.getPoint(2).y)
              : e.pointsCount === 2 && e.insertPointAt(1, d, e.getPoint(1).y);
    } else if (n === 90) {
      const d = l.bottom + r / 2;
      if (a) {
        if (e.pointsCount === 4) {
          const m = e.getPoint(3).x;
          (e.setPointAt(1, e.getPoint(1).x, d - 20),
            e.insertPointAt(2, m, d - 20),
            e.insertPointAt(3, m, d),
            e.insertPointAt(4, m, d + 20),
            e.setPointAt(5, m, e.getPoint(5).y));
        }
      } else
        f
          ? u
            ? e.setPointAt(3, e.getPoint(2).x, e.getPoint(4).y)
            : e.pointsCount === 6 && (e.setPointAt(2, e.getPoint(2).x, d), e.setPointAt(3, e.getPoint(3).x, d))
          : e.pointsCount === 4
            ? e.insertPointAt(2, e.getPoint(2).x, d)
            : e.pointsCount === 3
              ? e.setPointAt(1, e.getPoint(2).x, d)
              : e.pointsCount === 2 && e.insertPointAt(1, e.getPoint(1).x, d);
    } else if (n === 180) {
      const d = l.left - r / 2;
      if (a) {
        if (e.pointsCount === 4) {
          const m = e.getPoint(3).y;
          (e.setPointAt(1, d + 20, e.getPoint(1).y),
            e.insertPointAt(2, d + 20, m),
            e.insertPointAt(3, d, m),
            e.insertPointAt(4, d - 20, m),
            e.setPointAt(5, e.getPoint(5).x, m));
        }
      } else
        f
          ? u
            ? e.setPointAt(3, e.getPoint(2).x, e.getPoint(4).y)
            : e.pointsCount === 6 && (e.setPointAt(2, d, e.getPoint(2).y), e.setPointAt(3, d, e.getPoint(3).y))
          : e.pointsCount === 4
            ? e.insertPointAt(2, d, e.getPoint(2).y)
            : e.pointsCount === 3
              ? e.setPointAt(1, d, e.getPoint(2).y)
              : e.pointsCount === 2 && e.insertPointAt(1, d, e.getPoint(1).y);
    } else if (n === 270) {
      const d = l.top - r / 2;
      if (a) {
        if (e.pointsCount === 4) {
          const m = e.getPoint(3).x;
          (e.setPointAt(1, e.getPoint(1).x, d + 20),
            e.insertPointAt(2, m, d + 20),
            e.insertPointAt(3, m, d),
            e.insertPointAt(4, m, d - 20),
            e.setPointAt(5, m, e.getPoint(5).y));
        }
      } else
        f
          ? u
            ? e.setPointAt(3, e.getPoint(2).x, e.getPoint(4).y)
            : e.pointsCount === 6 && (e.setPointAt(2, e.getPoint(2).x, d), e.setPointAt(3, e.getPoint(3).x, d))
          : e.pointsCount === 4
            ? e.insertPointAt(2, e.getPoint(2).x, d)
            : e.pointsCount === 3
              ? e.setPointAt(1, e.getPoint(2).x, d)
              : e.pointsCount === 2 && e.insertPointAt(1, e.getPoint(1).x, d);
    }
    e.commitRoute();
  }
  get fromVertex() {
    return this.rs;
  }
  set fromVertex(t) {
    this.rs !== t && (Debug && t !== null && U.s(t, TreeVertex, TreeEdge, "fromVertex"), (this.rs = t));
  }
  get toVertex() {
    return this.ls;
  }
  set toVertex(t) {
    this.ls !== t && (Debug && t !== null && U.s(t, TreeVertex, TreeEdge, "toVertex"), (this.ls = t));
  }
  get relativePoint() {
    return this.Ck;
  }
  set relativePoint(t) {
    this.Ck.set(t);
  }
}
