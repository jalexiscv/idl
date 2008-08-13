class PanelLayoutGrid extends PanelLayout {
  constructor() {
    super();
  }
  measure(t, i, e, s, n, o, r) {
    (t.Ci === null && (t.Ci = new GridPanelSettings()), this.XE(t), this.YE(t));
  }
  arrange(t, i, e) {}
  vi(t, i, e) {
    const s = t.naturalBounds;
    (i.save(),
      i.beginPath(),
      i.rect(0, 0, s.width, s.height),
      i.clip(),
      i.endPath(),
      this.KE(t, i, e),
      i.restore(),
      i.clearContextCache(false));
  }
  KE(t, i, e) {
    let s = t.getDocumentScale() * e.scale;
    s <= 0 && (s = 1);
    const n = t.gridCellSize,
      o = n.width,
      r = n.height,
      l = t.naturalBounds,
      h = t.actualBounds,
      a = l.width,
      f = l.height,
      c = Math.ceil(a / o),
      u = Math.ceil(f / r),
      d = t.gridOrigin,
      m = d.x,
      g = d.y,
      p = t.Ci.Cp,
      y = t.O.h,
      x = y.length;
    for (let b = 0; b < x; b++) {
      const S = y[b];
      if (!S.visible) continue;
      const k = S.interval || 1,
        P = Math.abs(k);
      if (o * P * s < 2) continue;
      let A = S.segmentIndex;
      ((!isFinite(A) || isNaN(A)) && (A = 0), A < 0 && (A = P - Math.min(-A, P)), (A = Math.round(A % P)));
      const C = S.opacity;
      let M = 1;
      if (C !== 1) {
        if (C === 0) continue;
        ((M = i.globalAlpha), (i.globalAlpha = M * C));
      }
      const N = p[b];
      let T = false;
      const L = S.strokeDashArray;
      if (
        (L !== null && ((T = true), i.enableDash(L, S.strokeDashOffset)),
        S.stroke !== null && S.strokeWidth > 0 && (S.figure === "LineV" || S.figure === "LineH"))
      ) {
        if (((i.lineWidth = S.strokeWidth), t.Cn(i, S.stroke, false, false, l, h), i.beginPath(), S.figure === "LineV")) {
          const D = Math.floor((m - o) / o);
          for (let F = D; F <= D + c; F++) {
            const R = F * o + m;
            0 <= R && R <= a && this.Qb(F, k, A, N) && (i.moveTo(R, 0), i.lineTo(R, f));
          }
        } else if (S.figure === "LineH") {
          const D = Math.floor((g - r) / r);
          for (let F = D; F <= D + u; F++) {
            const R = F * r + g;
            0 <= R && R <= f && this.Qb(F, k, A, N) && (i.moveTo(0, R), i.lineTo(a, R));
          }
        }
        (i.stroke(), i.endPath());
      } else if (S.fill !== null) {
        if ((t.Cn(i, S.fill, true, false, l, h), S.figure === "BarV")) {
          let D = S.width;
          isNaN(D) && (D = o);
          const F = Math.floor((m - o) / o);
          for (let R = F; R <= F + c; R++) {
            const I = R * o + m;
            0 <= I + D && I <= a && this.Qb(R, k, A, N) && i.fillRect(I, 0, D, f);
          }
        } else if (S.figure === "BarH") {
          let D = S.height;
          isNaN(D) && (D = r);
          const F = Math.floor((g - r) / r);
          for (let R = F; R <= F + u; R++) {
            const I = R * r + g;
            0 <= I + D && I <= f && this.Qb(R, k, A, N) && i.fillRect(0, I, a, D);
          }
        }
      }
      (T && i.disableDash(), C !== 1 && (i.globalAlpha = M));
    }
  }
  Qb(t, i, e, s) {
    if (i < 0) return t % i === e;
    if (t % i !== e) return false;
    const n = s.length;
    for (let o = 0; o < n; o++) {
      const r = s[o];
      if (t % r === e) return false;
    }
    return true;
  }
  YE(t) {
    const i = [],
      e = t.O.h,
      s = e.length;
    for (let n = 0; n < s; n++) {
      const o = e[n],
        r = [];
      if ((i.push(r), !o.visible)) continue;
      const l = o.interval;
      if (l < 0) continue;
      const h = o.figure,
        a = this.$N(h);
      for (let f = 0; f < s; f++) {
        if (f === n) continue;
        const c = e[f];
        if (!c.visible) continue;
        const u = c.figure;
        if (this.$N(u) !== a) continue;
        const d = c.interval;
        d > l && r.push(d);
      }
    }
    t.Ci.Cp = i;
  }
  $N(t) {
    return t === "LineV" || t === "BarV";
  }
  XE(t) {
    let i = 1,
      e = 1;
    const s = t.O.h,
      n = s.length;
    for (let l = 0; l < n; l++) {
      const h = s[l],
        a = Math.abs(h.interval);
      a < 2 || (this.$N(h.figure) ? (e = (e * a) / G.$A(e, a)) : (i = (i * a) / G.$A(i, a)));
    }
    const o = t.gridCellSize,
      r = t.Ci;
    r.gc.isReal() ? r.gc.e(e * o.width, i * o.height) : (r.gc = new Size(e * o.width, i * o.height));
  }
}
PanelLayout.En("Grid", new PanelLayoutGrid());
