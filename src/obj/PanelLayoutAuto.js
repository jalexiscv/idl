class PanelLayoutAuto extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    const l = s.length;
    if (l === 0) return;
    const h = t.findMainElement();
    let a = h.margin,
      f = i,
      c = e;
    const u = a.right + a.left,
      d = a.top + a.bottom;
    h.gt(i, e, o, r);
    let m = h.measuredBounds,
      g = 0,
      p = null;
    h instanceof Shape && ((p = h), (g = p.strokeWidth * p.scale));
    let y = Math.max(m.width + u, 0),
      x = Math.max(m.height + d, 0),
      b = t.jN(h);
    const S = b.x * y + b.offsetX,
      k = b.y * x + b.offsetY;
    let P = t.JN(h);
    const A = P.x * y + P.offsetX,
      C = P.y * x + P.offsetY;
    (isFinite(i) && (f = Math.max(Math.abs(S - A) - g, 0)), isFinite(e) && (c = Math.max(Math.abs(k - C) - g, 0)));
    let M = 0,
      N = 0;
    (o > 0 && (M = Math.max(Math.abs(b.x * o + b.offsetX - (P.x * o + P.offsetX)) - g, 0)),
      r > 0 && (N = Math.max(Math.abs(b.y * r + b.offsetY - (P.y * r + P.offsetY)) - g, 0)));
    const T = Size.a();
    T.e(0, 0);
    const L = t.tr();
    for (let I = 0; I < l; I++) {
      const O = s[I];
      if (O === h || (!O.visible && O !== L)) continue;
      a = O.margin;
      const X = a.right + a.left,
        K = a.top + a.bottom;
      (O.gt(f, c, M, N),
        (m = O.measuredBounds),
        (y = Math.max(m.width + X, 0)),
        (x = Math.max(m.height + K, 0)),
        T.e(Math.max(y, T.width), Math.max(x, T.height)));
    }
    if (l === 1) {
      ((m = h.measuredBounds), (n.width = y), (n.height = x), Size.o(T));
      return;
    }
    ((b = t.jN(h)), (P = t.JN(h)));
    let D = 0,
      F = 0;
    (P.x !== b.x && P.y !== b.y && ((D = T.width / Math.abs(P.x - b.x)), (F = T.height / Math.abs(P.y - b.y))),
      Size.o(T),
      (g = 0),
      p !== null && ((g = p.strokeWidth * p.scale), p.sM() === 6 && (D = F = Math.max(D, F))),
      (D += Math.abs(b.offsetX) + Math.abs(P.offsetX) + g),
      (F += Math.abs(b.offsetY) + Math.abs(P.offsetY) + g));
    let R = h.stretch;
    switch ((R === 1 && (R = h.sn(false)), R)) {
      case 0:
        ((o = 0), (r = 0));
        break;
      case 2:
        (isFinite(i) && (D = i), isFinite(e) && (F = e));
        break;
      case 5:
        (isFinite(i) && (D = i), (r = 0));
        break;
      case 4:
        ((o = 0), isFinite(e) && (F = e));
        break;
    }
    (h.Cc(), h.gt(D, F, o, r), (n.width = h.measuredBounds.width + u), (n.height = h.measuredBounds.height + d));
  }
  arrange(t, i, e) {
    const s = i.length;
    if (s === 0) return;
    const n = t.findMainElement(),
      o = n.measuredBounds,
      r = Rect.a();
    r.e(0, 0, 1, 1);
    let l = n.margin;
    const h = l.left,
      a = l.top,
      f = t.padding,
      c = f.left,
      u = f.top;
    let d = h,
      m = a,
      g = o.width,
      p = o.height;
    n.Ut(c + d, u + m, g, p);
    const y = t.jN(n),
      x = t.JN(n),
      b = 0 + y.x * o.width + y.offsetX,
      S = 0 + y.y * o.height + y.offsetY,
      k = 0 + x.x * o.width + x.offsetX,
      P = 0 + x.y * o.height + x.offsetY;
    ((r.x = b), (r.y = S), r.ai(k, P, 0, 0), (r.x += h + c), (r.y += a + u));
    for (let A = 0; A < s; A++) {
      const C = i[A];
      if (C === n) continue;
      const M = C.measuredBounds;
      l = C.margin;
      const N = Math.max(M.width + l.right + l.left, 0),
        T = Math.max(M.height + l.top + l.bottom, 0);
      let L = C.alignment;
      (L.isDefault() && (L = t.defaultAlignment),
        L.isSpot() || (L = Spot.Center),
        (d = r.width * L.x + L.offsetX - N * L.x + l.left + r.x),
        (m = r.height * L.y + L.offsetY - T * L.y + l.top + r.y),
        (g = r.width),
        (p = r.height),
        C.visible &&
          (Rect.contains(r.x, r.y, r.width, r.height, d, m, M.width, M.height)
            ? C.Ut(d, m, M.width, M.height)
            : C.Ut(d, m, M.width, M.height, new Rect(r.x, r.y, r.width, r.height))));
    }
    Rect.o(r);
  }
}
PanelLayout.En("Auto", new PanelLayoutAuto());
