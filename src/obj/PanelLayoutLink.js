class PanelLayoutLink extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    const l = s.length;
    if (!(t instanceof Adornment || t instanceof Link)) return;
    let h = null,
      a = null;
    if (
      (t instanceof Link && (h = t),
      t instanceof Adornment && ((a = t), (h = a.adornedPart), t.Rc === null && (t.Rc = [])),
      !(h instanceof Link))
    )
      return;
    const f = h;
    if (l === 0) {
      (t.naturalBounds.$n(0, 0), t.measuredBounds.e(0, 0, 0, 0));
      return;
    }
    const c = t instanceof Adornment ? null : h.path,
      u = h.routeBounds,
      d = t.ir;
    d.e(0, 0, u.width, u.height);
    const m = f.points,
      g = h.pointsCount;
    a !== null ? a.Ed(false) : h !== null && h.Ed(false);
    const p = u.width,
      y = u.height,
      x = t.Rc;
    if (((x.length = 0), c !== null)) {
      this.measureLinkPath(t, p, y, c);
      const P = c.measuredBounds;
      (d.unionRect(P), x.push(P));
    }
    const b = Transform.a(),
      S = Point.a(),
      k = Point.a();
    for (let P = 0; P < l; P++) {
      const A = s[P];
      if (A === c) continue;
      let C = A.measuredBounds;
      if (A.isPanelMain && A instanceof Shape) {
        (this.measureLinkPath(t, p, y, A), (C = A.measuredBounds), d.unionRect(C), x.push(C));
        continue;
      }
      if (g < 2) {
        (A.gt(1 / 0, 1 / 0, 0, 0), (C = A.measuredBounds), d.unionRect(C), x.push(C));
        continue;
      }
      const M = A.segmentIndex,
        N = A.segmentFraction;
      let T = A.alignmentFocus;
      T.isNoSpot() && (T = Spot.Center);
      const L = A.segmentOrientation,
        D = A.segmentOffset;
      let F = 0,
        R = 0,
        I = 0,
        O = 0;
      if (isNaN(M)) {
        const B = f.xt,
          $ = U.ht();
        B.getPointAndAngleAlongPath(N, $);
        const J = Point.U($[0], $[1]);
        ((O = $[2]),
          L !== 0 && ((I = f.computeAngle(A, L, O)), (A.vt = I), A.ke(true), A.co(true)),
          (F = J.x),
          (R = J.y),
          Point.o(J),
          U.et($));
      } else if (M < -g || M >= g) {
        const B = Point.a();
        (f.ZN(B),
          (O = f.midAngle),
          L !== 0 && ((I = f.computeAngle(A, L, O)), (A.vt = I), A.ke(true), A.co(true)),
          (F = B.x - u.x),
          (R = B.y - u.y),
          Point.o(B));
      } else {
        let B,
          $,
          J = 0;
        if (
          (M >= 0
            ? ((B = m.elt(M)), ($ = M < g - 1 ? m.elt(M + 1) : B))
            : ((J = g + M), (B = m.elt(J)), ($ = J > 0 ? m.elt(J - 1) : B)),
          B.equalsApprox($))
        ) {
          let tt, q;
          M >= 0
            ? ((tt = M > 0 ? m.elt(M - 1) : B), (q = M < g - 2 ? m.elt(M + 2) : $))
            : ((tt = J < g - 1 ? m.elt(J + 1) : B), (q = J > 1 ? m.elt(J - 2) : $));
          const E = tt.distanceSquaredPoint(B),
            v = $.distanceSquaredPoint(q);
          E > v + 10
            ? (O = M >= 0 ? tt.directionPoint(B) : B.directionPoint(tt))
            : v > E + 10
              ? (O = M >= 0 ? $.directionPoint(q) : q.directionPoint($))
              : (O = M >= 0 ? tt.directionPoint(q) : q.directionPoint(tt));
        } else O = M >= 0 ? B.directionPoint($) : $.directionPoint(B);
        (L !== 0 && ((I = f.computeAngle(A, L, O)), (A.vt = I), A.ke(true), A.co(true)),
          (F = B.x + ($.x - B.x) * N - u.x),
          (R = B.y + ($.y - B.y) * N - u.y));
      }
      (A.gt(1 / 0, 1 / 0, 0, 0), (C = A.measuredBounds));
      const X = A.naturalBounds;
      let K = 0;
      A instanceof Shape && (K = A.strokeWidth);
      const V = X.width + K,
        Y = X.height + K;
      (b.Ki(),
        b.vs(-C.x, -C.y),
        b.rt(A.scale, A.scale),
        b.Ns(L === 0 ? A.angle : O, V / 2, Y / 2),
        (L === 22 || L === 26) && b.Ns(90, V / 2, Y / 2),
        (L === 23 || L === 27) && b.Ns(-90, V / 2, Y / 2),
        L === 28 && ((O > 45 && O < 135) || (O > 225 && O < 315)) && b.Ns(-O, V / 2, Y / 2));
      const z = new Rect(0, 0, V, Y);
      (S.setRectSpot(z, T), b.St(S));
      const H = -S.x + (K / 2) * A.scale,
        W = -S.y + (K / 2) * A.scale;
      k.c(D);
      const j = isNaN(D.x),
        Z = isNaN(D.y);
      if (j || Z) {
        const B = V / 2 + Link._b,
          $ = Y / 2 + Link._b,
          J = O >= 45 && O <= 135,
          tt = O >= 225 && O <= 315;
        L === 0 && (J || tt)
          ? ((k.x = Z ? B : D.y),
            (k.y = j ? $ : D.x),
            J
              ? M >= 0 || (isNaN(M) && N < 0.5) || (j && (k.y = -$))
              : tt && ((M >= 0 || (isNaN(M) && N < 0.5)) && j && (k.y = -$), Z && (k.x = -B)))
          : (j && (M >= 0 || (isNaN(M) && N < 0.5) ? (k.x = B) : (k.x = -B)), Z && (k.y = -$), k.rotate(O));
      } else k.rotate(O);
      ((F += k.x), (R += k.y), z.e(F + H, R + W, C.width, C.height), x.push(z), d.unionRect(z));
    }
    if (h !== null) {
      const P = h.labelNodes;
      for (; P.next(); ) P.value.gt(1 / 0, 1 / 0);
    }
    ((t.ir = d),
      t.position.e(u.x + d.x, u.y + d.y),
      n.$n(d.width || 0, d.height || 0),
      Transform.o(b),
      Point.o(S),
      Point.o(k));
  }
  arrange(t, i, e) {
    const s = i.length;
    if (!(t instanceof Adornment || t instanceof Link)) return;
    let n = t,
      o = null;
    t instanceof Adornment && ((o = t), (n = o.adornedPart));
    const r = t,
      l = t instanceof Adornment ? null : n.path,
      h = t.Rc;
    if (h.length !== 0) {
      let u = 0;
      if (l !== null && u < h.length) {
        const d = h[u];
        (u++, l.Ut(d.x - r.ir.x, d.y - r.ir.y, d.width, d.height));
      }
      for (let d = 0; d < s; d++) {
        const m = i[d];
        if (m !== l && u < h.length) {
          const g = h[u];
          (u++, m.Ut(g.x - r.ir.x, g.y - r.ir.y, g.width, g.height));
        }
      }
    }
    const a = n.points,
      f = a.count;
    if (f >= 2 && r instanceof Link) {
      const u = r.labelNodes;
      for (; u.next(); ) {
        const d = u.value;
        r.UE(d, f, a);
      }
    }
    o !== null ? o.Ed(false) : n.Ed(false);
    const c = t.yD(Point.a());
    (t.location.e(t.position.x + c.x, t.position.y + c.y), Point.o(c));
  }
  measureLinkPath(t, i, e, s) {
    if (s.vo() === false) return;
    let n = s.strokeWidth;
    if (
      (n === 0 &&
        t instanceof Adornment &&
        t.type === Panel.Link &&
        t.adornedObject instanceof Shape &&
        (n = t.adornedObject.strokeWidth),
      (n = n * s.rt),
      t instanceof Link && t.xt !== null)
    ) {
      const o = t.geometry.bounds;
      s.fo(o.x - n / 2, o.y - n / 2, o.width + n, o.height + n);
    } else if (t instanceof Adornment && t.adornedPart.xt !== null) {
      const o = t.adornedPart.xt.bounds;
      s.fo(o.x - n / 2, o.y - n / 2, o.width + n, o.height + n);
    } else s.fo(-(n / 2), -(n / 2), i + n, e + n);
    (s.GE(), s.ke(false));
  }
}
PanelLayout.En("Link", new PanelLayoutLink());
