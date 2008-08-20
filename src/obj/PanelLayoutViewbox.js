class PanelLayoutViewbox extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    s.length !== 1 && U.n("Viewbox Panel must contain exactly one GraphObject.");
    const h = s[0];
    ((h.rt = 1), h.Cc(), h.gt(1 / 0, 1 / 0, o, r));
    let a = h.measuredBounds;
    const f = h.margin,
      c = f.right + f.left,
      u = f.top + f.bottom;
    if (isFinite(i) || isFinite(e)) {
      const d = h.scale,
        m = a.width,
        g = a.height,
        p = Math.max(i - c, 0),
        y = Math.max(e - u, 0);
      let x = 1;
      (t.viewboxStretch === 6
        ? (m !== 0 && g !== 0 && (x = Math.min(p / m, y / g)), x === 0 && (x = 1e-4), (h.rt *= x))
        : (m !== 0 && g !== 0 && (x = Math.max(p / m, y / g)), x === 0 && (x = 1e-4), (h.rt *= x)),
        d !== h.scale && (h.ke(true), h.gt(1 / 0, 1 / 0, o, r)));
    }
    ((a = h.measuredBounds),
      (n.width = isFinite(i) ? i : Math.max(a.width + c, 0)),
      (n.height = isFinite(e) ? e : Math.max(a.height + u, 0)));
  }
  arrange(t, i, e) {
    const s = i[0],
      n = s.measuredBounds,
      o = s.margin,
      r = o.right + o.left,
      l = o.top + o.bottom,
      h = Math.max(n.width + r, 0),
      a = Math.max(n.height + l, 0);
    let f = s.alignment;
    (f.isDefault() && (f = t.defaultAlignment),
      f.isSpot() || (f = Spot.Center),
      s.Ut(e.width * f.x - h * f.x + f.offsetX, e.height * f.y - a * f.y + f.offsetY, n.width, n.height));
  }
}
PanelLayout.En("Viewbox", new PanelLayoutViewbox());
