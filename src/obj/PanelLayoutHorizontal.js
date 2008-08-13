class PanelLayoutHorizontal extends PanelLayout {
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
      if (d !== 0 && d !== 5) {
        h.push(u);
        continue;
      }
      u.gt(1 / 0, e, 0, r);
      const m = u.margin,
        g = u.measuredBounds,
        p = Math.max(g.width + m.right + m.left, 0),
        y = Math.max(g.height + m.top + m.bottom, 0);
      n.$n(n.width + p, Math.max(n.height, y));
    }
    const f = h.length;
    t.desiredSize.height
      ? (e = Math.min(t.desiredSize.height, t.maxSize.height))
      : n.height !== 0 && (e = Math.min(n.height, t.maxSize.height));
    for (let c = 0; c < f; c++) {
      const u = h[c];
      if (!u.visible && u !== a) continue;
      const d = u.margin,
        m = d.right + d.left,
        g = d.top + d.bottom;
      u.gt(1 / 0, e, 0, r);
      const p = u.measuredBounds,
        y = Math.max(p.width + m, 0),
        x = Math.max(p.height + g, 0);
      ((n.width += y), (n.height = Math.max(n.height, x)));
    }
    U.et(h);
  }
  arrange(t, i, e) {
    const s = i.length,
      n = t.padding,
      o = n.top,
      r = t.isOpposite;
    let l = r ? e.width : n.left;
    for (let h = 0; h < s; h++) {
      const a = o,
        f = i[h];
      if (!f.visible) continue;
      const c = f.measuredBounds,
        u = f.margin,
        d = u.top + u.bottom,
        m = o + n.bottom;
      let g = c.height;
      const p = f.sn(false);
      ((isNaN(f.desiredSize.height) && p === 2) || p === 4) && (g = Math.max(e.height - d - m, 0));
      const y = g + d + m;
      let x = f.alignment;
      (x.isDefault() && (x = t.defaultAlignment),
        x.isSpot() || (x = Spot.Center),
        r && (l -= c.width + u.left + u.right),
        f.Ut(l + x.offsetX + u.left, a + x.offsetY + u.top + (e.height * x.y - y * x.y), c.width, g),
        r || (l += c.width + u.left + u.right));
    }
  }
}
PanelLayout.En("Horizontal", new PanelLayoutHorizontal());
