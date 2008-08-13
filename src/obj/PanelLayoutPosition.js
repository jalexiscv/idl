class PanelLayoutPosition extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    const l = s.length,
      h = t.tr();
    for (let a = 0; a < l; a++) {
      const f = s[a];
      if (!f.visible && f !== h) continue;
      const c = f.margin,
        u = c.right + c.left,
        d = c.top + c.bottom;
      f.gt(i, e, o, r);
      const m = f.measuredBounds,
        g = Math.max(m.width + u, 0),
        p = Math.max(m.height + d, 0);
      let y = f.position.x,
        x = f.position.y;
      if ((isFinite(y) || (y = 0), isFinite(x) || (x = 0), f instanceof Shape && f.isGeometryPositioned)) {
        const b = f.strokeWidth / 2;
        ((y -= b), (x -= b));
      }
      n.ai(y, x, g, p);
    }
  }
  arrange(t, i, e) {
    const s = i.length,
      n = t.padding,
      o = e.x - n.left,
      r = e.y - n.top;
    for (let l = 0; l < s; l++) {
      const h = i[l],
        a = h.measuredBounds,
        f = h.margin,
        c = h.position.x,
        u = h.position.y;
      let d = isNaN(c) ? -o : c - o,
        m = isNaN(u) ? -r : u - r;
      if (h instanceof Shape && h.isGeometryPositioned) {
        const g = h.strokeWidth / 2;
        ((d -= g), (m -= g));
      }
      h.visible && h.Ut(d + f.left, m + f.top, a.width, a.height);
    }
  }
}
PanelLayout.En("Position", new PanelLayoutPosition());
