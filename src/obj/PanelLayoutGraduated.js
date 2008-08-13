class PanelLayoutGraduated extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    const l = t.findMainElement();
    if (!(l instanceof Shape)) return;
    t.ss = [];
    const h = l.margin,
      a = h.right + h.left,
      f = h.top + h.bottom;
    l.gt(i, e, o, r);
    const c = l.measuredBounds,
      u = c.width,
      d = c.height,
      m = Math.max(u + a, 0),
      g = Math.max(d + f, 0),
      p = new Rect(-h.left, -h.top, m, g);
    (t.ss.push(p), n.c(p), this.determineGraduatedMarks(t, l));
    const y = t.Es;
    if (y === null) return;
    const x = s.length;
    for (let b = 0; b < x; b++) {
      const S = s[b],
        k = y[b];
      !S.visible ||
        S === l ||
        k.length === 0 ||
        (S instanceof Shape
          ? this.measureGraduatedTicks(t, S, k, n)
          : S instanceof TextBlock && this.measureGraduatedLabels(t, S, k, n),
        S.ke(false));
    }
  }
  arrange(t, i, e) {
    if (t.ss === null) return;
    const s = t.findMainElement(),
      n = t.Es;
    if (n === null) return;
    const o = t.ss;
    let r = 0,
      l = o[r];
    (r++, s !== null && s.Ut(l.x - e.x, l.y - e.y, l.width, l.height));
    const h = i.length;
    for (let a = 0; a < h; a++) {
      const f = i[a],
        c = n[a];
      !f.visible || f === s || c.length === 0 || ((l = o[r]), r++, f.Ut(l.x - e.x, l.y - e.y, l.width, l.height));
    }
    t.ss = null;
  }
  measureGraduatedTicks(t, i, e, s) {
    let n = i.alignmentFocus;
    n.isNoSpot() && (n = Spot.TopCenter);
    const o = i.angle;
    ((i.vt = 0), i.gt(1 / 0, 1 / 0, 0, 0), (i.vt = o));
    const r = i.measuredBounds,
      l = r.width,
      h = r.height,
      a = Rect.U(0, 0, l, h),
      f = Point.a();
    (f.setRectSpot(a, n), Rect.o(a));
    const c = -f.x,
      u = -f.y,
      d = new Rect(),
      m = e.length;
    for (let g = 0; g < m; g++) {
      const p = e[g],
        y = p.pt.x,
        x = p.pt.y,
        b = p.angle;
      for (let S = 0; S < 4; S++) {
        switch (S) {
          case 0:
            f.e(c, u);
            break;
          case 1:
            f.e(c + l, u);
            break;
          case 2:
            f.e(c, u + h);
            break;
          case 3:
            f.e(c + l, u + h);
            break;
        }
        (f.rotate(b + i.angle),
          f.offset(y, x),
          g === 0 && S === 0 ? d.e(f.x, f.y, 0, 0) : d.unionPoint(f),
          f.offset(-y, -x),
          f.rotate(-b - i.angle));
      }
    }
    (Point.o(f), t.ss !== null && t.ss.push(d), s.ai(d.x, d.y, d.width, d.height));
  }
  measureGraduatedLabels(t, i, e, s) {
    t.Ee === null && (t.Ee = new TextBlock());
    const n = t.Ee;
    this.wD(i, n);
    let o = i.alignmentFocus;
    o.isNoSpot() && (o = Spot.TopCenter);
    const r = i.segmentOrientation,
      l = i.segmentOffset,
      h = new Rect();
    let a = 0,
      f = 0,
      c = 0,
      u = 0,
      d = 0;
    const m = e.length;
    for (let g = 0; g < m; g++) {
      const p = e[g];
      ((a = p.pt.x),
        (f = p.pt.y),
        (c = p.angle),
        (u = i.angle),
        (d = i.angle),
        r !== 0 && (r === 21 || r === 25 ? (d = c + i.angle) : (d = c), (u = Link.computeAngle(r, d))),
        (n.vt = u),
        (n.text = p.text || ""),
        n.gt(1 / 0, 1 / 0, 0, 0));
      const y = n.measuredBounds,
        x = n.naturalBounds,
        b = x.width,
        S = x.height,
        k = Transform.a();
      (k.Ki(),
        k.vs(-y.x, -y.y),
        k.rt(n.scale, n.scale),
        k.Ns(d, b / 2, S / 2),
        (r === 22 || r === 26) && k.Ns(90, b / 2, S / 2),
        (r === 23 || r === 27) && k.Ns(-90, b / 2, S / 2),
        r === 28 && ((c > 45 && c < 135) || (c > 225 && c < 315)) && k.Ns(-c, b / 2, S / 2));
      const P = Rect.U(0, 0, b, S),
        A = Point.a();
      (A.setRectSpot(P, o), k.St(A));
      const C = -A.x,
        M = -A.y,
        N = Point.a();
      (N.c(l),
        isNaN(N.x) && (N.x = b / 2 + 3),
        isNaN(N.y) && (N.y = -(S / 2 + 3)),
        N.rotate(c),
        (a += N.x + C),
        (f += N.y + M));
      const T = new Rect(a, f, y.width, y.height),
        L = new Rect(y.x, y.y, y.width, y.height),
        D = new Rect(x.x, x.y, x.width, x.height);
      ((p.labelAngle = u),
        (p.lineCount = n.lineCount),
        (p.lines = n.getMetrics()),
        (p.actualBounds = T),
        (p.measuredBounds = L),
        (p.naturalBounds = D),
        g === 0 ? h.c(T) : h.unionRect(T),
        Point.o(N),
        Point.o(A),
        Rect.o(P),
        Transform.o(k));
    }
    (t.ss !== null && t.ss.push(h), s.ai(h.x, h.y, h.width, h.height));
  }
  determineGraduatedMarks(t, i) {
    const e = i.geometry,
      s = i.strokeWidth,
      n = e.flattenedSegments,
      o = e.flattenedLengths,
      r = e.flattenedTotalLength,
      l = n.length;
    let h = 0,
      a = 0;
    const f = U.ht();
    for (let x = 0; x < l; x++) {
      const b = n[x],
        S = [];
      ((h = 0), (a = 0));
      const k = b.length;
      for (let P = 0; P < k; P += 2) {
        const A = b[P],
          C = b[P + 1];
        if (P === 0) {
          ((h = A), (a = C));
          continue;
        }
        let M = (Math.atan2(C - a, A - h) * 180) / Math.PI;
        (M < 0 && (M += 360), S.push(M), (h = A), (a = C));
      }
      f.push(S);
    }
    const c = this.qE(t),
      u = t.O.h,
      d = u.length;
    let m = 0,
      g = 0,
      p = r;
    t.Es = [];
    let y;
    for (let x = 0; x < d; x++) {
      const b = u[x];
      if (((y = []), !b.visible || b === i)) {
        t.Es.push(y);
        continue;
      }
      const S = Math.abs(b.interval),
        k = t.graduatedTickUnit;
      if ((k * S * r) / t.graduatedRange < 2 && b.graduatedSkip === null) {
        t.Es.push(y);
        continue;
      }
      let P = o[0][0],
        A = 0,
        C = 0;
      ((g = r * b.graduatedStart - 1e-4), (p = r * b.graduatedEnd + 1e-4));
      const M = k * S;
      let N = t.graduatedTickBase;
      if (N < t.graduatedMin) {
        let F = (t.graduatedMin - N) / M;
        ((F = F % 1 === 0 ? F : Math.floor(F + 1)), (N += F * M));
      } else if (N > t.graduatedMin + M) {
        const F = Math.floor((N - t.graduatedMin) / M);
        N -= F * M;
      }
      const T = c[x],
        L = N,
        D = t.graduatedMax * 1e-6;
      for (let F = 1; N <= t.graduatedMax + D; F++) {
        if (
          this.HE(t, N - t.graduatedTickBase, T) &&
          (N > t.graduatedMax && (N = t.graduatedMax),
          (b.graduatedSkip === null ||
            (b instanceof TextBlock && !b.graduatedSkip(N, b)) ||
            (b instanceof Shape && !b.graduatedSkip(N, b))) &&
            ((m = ((N - t.graduatedMin) * r) / t.graduatedRange), m > r && (m = r), g <= m && m <= p))
        ) {
          let R = f[A][C],
            I = o[A][C];
          for (; A < o.length; ) {
            for (; m > P && C < o[A].length - 1; ) (C++, (R = f[A][C]), (I = o[A][C]), (P += I));
            if (m <= P) break;
            (A++, (C = 0), (R = f[A][C]), (I = o[A][C]), (P += I));
          }
          const O = n[A],
            X = O[C * 2],
            K = O[C * 2 + 1],
            V = O[C * 2 + 2],
            Y = O[C * 2 + 3],
            z = (m - (P - I)) / I,
            H = new Point(X + (V - X) * z + s / 2 - e.bounds.x, K + (Y - K) * z + s / 2 - e.bounds.y);
          if ((H.scale(i.scale, i.scale), (R = this.vE(R, z, O, f[A], C)), b instanceof TextBlock)) {
            let W = "";
            (b.graduatedFunction !== null
              ? ((W = b.graduatedFunction(N, b)), (W = W != null ? W.toString() : ""))
              : (W = (+N.toFixed(2)).toString()),
              W !== "" && y.push({ pt: H, angle: R, text: W }));
          } else y.push({ pt: H, angle: R });
        }
        N = L + F * M;
      }
      t.Es.push(y);
    }
    U.et(f);
  }
  vE(t, i, e, s, n) {
    if (i < 0.5005 && i > 0.4995) return t;
    let o = t;
    if (
      (i < 0.5
        ? n > 0
          ? (o = s[n - 1])
          : G.q(e[0], e[e.length - 2]) && G.q(e[1], e[e.length - 1]) && (o = s[s.length - 1])
        : i > 0.5 &&
          (n + 1 < s.length ? (o = s[n + 1]) : G.q(e[0], e[e.length - 2]) && G.q(e[1], e[e.length - 1]) && (o = s[0])),
      t !== o)
    ) {
      let r = Math.abs(t - o);
      if ((r > 180 && (t < o ? (t += 360) : (o += 360), (r = Math.abs(t - o))), i < 5e-4 || i > 0.9995))
        return ((t + o) / 2) % 360;
      if (r < 10) {
        const l = 1 - Math.abs(0.5 - i);
        return (t * l + o * (1 - l)) % 360;
      }
    }
    return t;
  }
  qE(t) {
    if (t.ys === null) {
      const i = [],
        e = t.O.h,
        s = e.length;
      for (let n = 0; n < s; n++) {
        const o = e[n],
          r = [];
        if ((i.push(r), !o.visible)) continue;
        const l = o.interval;
        if (!(l < 0))
          for (let h = 0; h < s; h++) {
            if (h === n) continue;
            const a = e[h];
            if (!a.visible || o.constructor !== a.constructor) continue;
            const f = a.interval;
            f > l && r.push(f);
          }
      }
      t.ys = i;
    }
    return t.ys;
  }
  HE(t, i, e) {
    const s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n] * t.graduatedTickUnit,
        r = i % o,
        l = t.graduatedTickUnit * 1e-6;
      if (r < l && r > -l) return false;
    }
    return true;
  }
  vi(t, i, e) {
    const s = e.Sa;
    e.Sa = true;
    const n = t.naturalBounds,
      o = n.width,
      r = n.height,
      l = i instanceof SVGContext;
    (i.save(), i.beginPath(), i.rect(-1, -1, o + 1, r + 1), i.clip(), i.endPath());
    const h = t.findMainElement();
    h.vi(i, e);
    let a = t.getDocumentScale() * e.scale;
    a <= 0 && (a = 1);
    const f = h.actualBounds,
      c = t.O.h,
      u = t.Es,
      d = c.length;
    for (let m = 0; m < d; m++) {
      const g = c[m],
        p = u[m],
        y = p.length;
      if (!(!g.visible || g === h || p.length === 0)) {
        if (g instanceof Shape) {
          if (
            ((t.graduatedTickUnit * g.interval * h.geometry.flattenedTotalLength) / t.graduatedRange) * a < 2 &&
            g.graduatedSkip === null
          )
            continue;
          const x = g.measuredBounds,
            b = g.strokeWidth * g.scale;
          let S = g.alignmentFocus;
          S.isNoSpot() && (S = Spot.TopCenter);
          for (let k = 0; k < y; k++) {
            const P = p[k].pt,
              A = p[k].angle;
            (this.WE(g, P, f, A, x, b, S), g.vi(i, e), l && (t.svg.appendChild(g.svg), (g.svg = null)), g.ll.Ki());
          }
        } else if (g instanceof TextBlock) {
          t.Ee === null && (t.Ee = new TextBlock());
          const x = t.Ee;
          (this.wD(g, x), (x.QN = true));
          for (let b = 0; b < y; b++) {
            const S = p[b];
            if (S.actualBounds && S.measuredBounds && S.naturalBounds) {
              x.jE(S);
              const k = S.actualBounds;
              (x.Ut(k.x, k.y, k.width, k.height),
                this.JE(x, f, k, S.measuredBounds, S.naturalBounds),
                (x.al = g.part),
                (x.en = g.panel),
                x.vi(i, e),
                (x.en = null),
                (x.al = null),
                l && (t.svg.appendChild(x.svg), (x.svg = null)));
            }
          }
        }
      }
    }
    ((e.Sa = s), i.restore(), i.clearContextCache(true));
  }
  WE(t, i, e, s, n, o, r) {
    const l = t.ll;
    (l.Ki(),
      l.vs(i.x + e.x, i.y + e.y),
      l.Ns(s + t.angle, 0, 0),
      l.vs(-n.width * r.x + r.offsetX + o / 2, -n.height * r.y + r.offsetY + o / 2),
      l.rt(t.scale, t.scale),
      t.Ld(false),
      t.Mh.set(t.ll),
      (t.Oa = t.scale),
      t.Fh(false));
  }
  JE(t, i, e, s, n) {
    const o = t.ll;
    (o.Ki(),
      o.vs(e.x + i.x, e.y + i.y),
      o.vs(-s.x, -s.y),
      t.H0(o, n.x, n.y, n.width, n.height),
      t.Ld(false),
      t.Mh.set(t.ll),
      (t.Oa = t.scale),
      t.Fh(false));
  }
  wD(t, i) {
    i.$E(t);
  }
}
PanelLayout.En("Graduated", new PanelLayoutGraduated());
var ViewboxStretch = ((w) => ((w[(w.Uniform = 6)] = "Uniform"), (w[(w.UniformToFill = 7)] = "UniformToFill"), w))(
  ViewboxStretch || {},
);
