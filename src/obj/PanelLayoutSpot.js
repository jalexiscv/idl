class PanelLayoutSpot extends PanelLayout {
  constructor() {
    super();
  }
  static pD = false;
  measure(t, i, e, s, n, o, r) {
    const l = s.length;
    if (l === 0) return;
    const h = t.findMainElement();
    let a = h.margin,
      f = 0,
      c = 0;
    const u = a.right + a.left,
      d = a.top + a.bottom;
    h.gt(i, e, o, r);
    let m = h.measuredBounds,
      g = m.width,
      p = m.height,
      y = Math.max(g + u, 0),
      x = Math.max(p + d, 0);
    const b = t.isClipping;
    b &&
      h.W0() !== 0 &&
      !PanelLayoutSpot.pD &&
      ((PanelLayoutSpot.pD = true),
      U.ot("Main Shape for Spot Panel with isClipping = true must have a zero strokeWidth: " + t.toString()));
    const S = Rect.U(-a.left, -a.top, y, x);
    let k = Rect.U(0, 0, g, p);
    (this.WN(h, k, true), (g = k.width), (p = k.height));
    let P = true;
    const A = t.tr();
    let C;
    for (let M = 0; M < l; M++) {
      const N = s[M];
      let T = i,
        L = e;
      if (N === h || (!N.visible && N !== A)) continue;
      a = N.margin;
      let D = a.left,
        F = a.top;
      switch (((f = a.right + a.left), (c = a.top + a.bottom), (C = N.sn(false)), C)) {
        case 2:
          ((T = g), (L = p), (f = 0), (c = 0), (D = 0), (F = 0));
          break;
        case 5:
          ((T = g), (f = 0), (D = 0));
          break;
        case 4:
          ((L = p), (c = 0), (F = 0));
          break;
      }
      (N.gt(T, L, 0, 0), (m = N.measuredBounds), (y = Math.max(m.width + f, 0)), (x = Math.max(m.height + c, 0)));
      let R = N.alignment;
      (R.isDefault() && (R = t.defaultAlignment), R.isSpot() || (R = Spot.Center));
      let I = N.alignmentFocus;
      I.isDefault() && (I = Spot.Center);
      let O = null;
      N instanceof Panel && N.po !== "" && ((O = N.findObject(N.po)), O === N && (O = null));
      let X = k.x - D,
        K = k.y - F;
      if (O !== null) {
        N.Ut(0, 0, m.width, m.height);
        const V = O.actualBounds,
          Y = Point.U(V.x + (I.x * V.width - I.offsetX), V.y + (I.y * V.height - I.offsetY));
        for (O = O.panel; O !== null && O !== N; ) (O.E.St(Y), (O = O.panel));
        ((X += R.x * g + R.offsetX - Y.x), (K += R.y * p + R.offsetY - Y.y), Point.o(Y));
      } else
        ((X += R.x * g + R.offsetX - (I.x * m.width + I.offsetX)),
          (K += R.y * p + R.offsetY - (I.y * m.height + I.offsetY)));
      P ? ((P = false), n.e(X, K, y, x)) : n.ai(X, K, y, x);
    }
    switch (
      (P ? n.c(S) : b ? n.intersect(k.x, k.y, k.width, k.height) : n.ai(S.x, S.y, S.width, S.height),
      Rect.o(S),
      Rect.o(k),
      (C = h.stretch),
      C === 1 && (C = h.sn(false)),
      C)
    ) {
      case 0:
        return;
      case 2:
        if (!isFinite(i) && !isFinite(e)) return;
        break;
      case 5:
        if (!isFinite(i)) return;
        break;
      case 4:
        if (!isFinite(e)) return;
        break;
    }
    ((m = h.measuredBounds),
      (g = m.width),
      (p = m.height),
      (y = Math.max(g + u, 0)),
      (x = Math.max(p + d, 0)),
      (a = h.margin),
      (k = Rect.U(-a.left, -a.top, y, x)),
      this.WN(h, k, true),
      (g = k.width),
      (p = k.height));
    for (let M = 0; M < l; M++) {
      const N = s[M];
      if (N === h || (!N.visible && N !== A)) continue;
      ((a = N.margin),
        (f = a.right + a.left),
        (c = a.top + a.bottom),
        (m = N.measuredBounds),
        (y = Math.max(m.width + f, 0)),
        (x = Math.max(m.height + c, 0)));
      let T = N.alignment;
      (T.isDefault() && (T = t.defaultAlignment), T.isSpot() || (T = Spot.Center));
      let L = N.alignmentFocus;
      (L.isDefault() && (L = Spot.Center),
        P
          ? ((P = false),
            n.e(
              T.x * g + T.offsetX - (L.x * m.width + L.offsetX) - a.left,
              T.y * p + T.offsetY - (L.y * m.height + L.offsetY) - a.top,
              y,
              x,
            ))
          : n.ai(
              T.x * g + T.offsetX - (L.x * m.width + L.offsetX) - a.left,
              T.y * p + T.offsetY - (L.y * m.height + L.offsetY) - a.top,
              y,
              x,
            ));
    }
    (P ? n.c(S) : b ? n.intersect(k.x, k.y, k.width, k.height) : n.ai(S.x, S.y, S.width, S.height), Rect.o(k));
  }
  arrange(t, i, e) {
    const s = i.length;
    if (s === 0) return;
    const n = t.findMainElement(),
      o = n.measuredBounds,
      r = o.width,
      l = o.height,
      h = t.padding,
      a = h.left,
      f = h.top;
    let c = a - e.x,
      u = f - e.y;
    n.Ut(c, u, r, l);
    const d = Rect.U(0, 0, r, l);
    this.WN(n, d, false);
    for (let m = 0; m < s; m++) {
      const g = i[m];
      if (g === n) continue;
      const p = g.measuredBounds,
        y = p.width,
        x = p.height;
      let b = g.alignment;
      (b.isDefault() && (b = t.defaultAlignment), b.isSpot() || (b = Spot.Center));
      let S = g.alignmentFocus;
      S.isDefault() && (S = Spot.Center);
      let k = null;
      if ((g instanceof Panel && g.po !== "" && ((k = g.findObject(g.po)), k === g && (k = null)), k !== null)) {
        const P = k.actualBounds,
          A = Point.U(P.x + (S.x * P.width - S.offsetX), P.y + (S.y * P.height - S.offsetY));
        for (k = k.panel; k !== null && k !== g; ) (k.E.St(A), (k = k.panel));
        ((c = b.x * d.width + b.offsetX - A.x), (u = b.y * d.height + b.offsetY - A.y), Point.o(A));
      } else
        ((c = b.x * d.width + b.offsetX - (S.x * y + S.offsetX)),
          (u = b.y * d.height + b.offsetY - (S.y * x + S.offsetY)));
      ((c += d.x - e.x), (u += d.y - e.y), g.visible && g.Ut(a + c, f + u, y, x));
    }
    Rect.o(d);
  }
  WN(t, i, e) {
    let s = null;
    if ((t instanceof Panel && t.po !== "" && ((s = t.findObject(t.po)), s === t && (s = null)), s !== null))
      for (e && t.Ut(0, 0, i.width, i.height), i.c(s.actualBounds), s = s.panel; s !== null && s !== t; )
        (s.E.lm(i), (s = s.panel));
  }
}
PanelLayout.En("Spot", new PanelLayoutSpot());
