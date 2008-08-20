class PanelLayoutVertical extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    const l = s.length,
      h = U.ht(),
      a = t.tr();
    for (let c = 0; c < l; c++) {
      const u = s[c];
      if (!u.visible && u !== a) continue;
      const d = u.sn(false);
      if (d !== 0 && d !== 4) {
        h.push(u);
        continue;
      }
      u.gt(i, 1 / 0, o, 0);
      const m = u.margin,
        g = u.measuredBounds,
        p = Math.max(g.width + m.right + m.left, 0),
        y = Math.max(g.height + m.top + m.bottom, 0);
      n.$n(Math.max(n.width, p), n.height + y);
    }
    const f = h.length;
    t.desiredSize.width
      ? (i = Math.min(t.desiredSize.width, t.maxSize.width))
      : n.width !== 0 && (i = Math.min(n.width, t.maxSize.width));
    for (let c = 0; c < f; c++) {
      const u = h[c];
      if (!u.visible && u !== a) continue;
      const d = u.margin,
        m = d.right + d.left,
        g = d.top + d.bottom;
      u.gt(i, 1 / 0, o, 0);
      const p = u.measuredBounds,
        y = Math.max(p.width + m, 0),
        x = Math.max(p.height + g, 0);
      ((n.width = Math.max(n.width, y)), (n.height += x));
    }
    U.et(h);
  }
  arrange(t, i, e) {
    const s = i.length,
      n = t.padding,
      o = n.left,
      r = t.isOpposite;
    let l = r ? e.height : n.top;
    for (let h = 0; h < s; h++) {
      const a = o,
        f = i[h];
      if (!f.visible) continue;
      const c = f.measuredBounds,
        u = f.margin,
        d = u.left + u.right,
        m = o + n.right;
      let g = c.width;
      const p = f.sn(false);
      ((isNaN(f.desiredSize.width) && p === 2) || p === 5) && (g = Math.max(e.width - d - m, 0));
      const y = g + d + m;
      let x = f.alignment;
      (x.isDefault() && (x = t.defaultAlignment),
        x.isSpot() || (x = Spot.Center),
        r && (l -= c.height + u.bottom + u.top),
        f.Ut(a + x.offsetX + u.left + (e.width * x.x - y * x.x), l + x.offsetY + u.top, g, c.height),
        r || (l += c.height + u.bottom + u.top));
    }
  }
}
PanelLayout.En("Vertical", new PanelLayoutVertical());
