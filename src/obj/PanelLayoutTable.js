class PanelLayoutTable extends PanelLayout {
  constructor() {
    (super(), (this.name = "Table"));
  }
  measure(t, i, e, s, n, o, r) {
    let l = s.length;
    const h = U.ht(),
      a = U.ht();
    for (let q = 0; q < l; q++) {
      const E = s[q],
        v = E instanceof Panel ? E : null;
      if (v !== null && v.fl() && E.visible) {
        (Debug &&
          (v.desiredSize.isReal() &&
            U.n(v.toString() + " TableRow/TableColumn Panels cannot set a desiredSize: " + v.desiredSize.toString()),
          v.minSize.equals(Size.sa) ||
            U.n(v.toString() + " TableRow/TableColumn Panels cannot set a minSize: " + v.minSize.toString()),
          v.maxSize.equals(Size.Zw) ||
            U.n(v.toString() + " TableRow/TableColumn Panels cannot set a maxSize: " + v.maxSize.toString())),
          a.push(v));
        const Q = v.O.h,
          ot = Q.length;
        for (let it = 0; it < ot; it++) {
          const et = Q[it];
          (v.type === Panel.TableRow ? (et.row = E.row) : v.type === Panel.TableColumn && (et.column = E.column),
            h.push(et));
        }
      } else h.push(E);
    }
    ((l = h.length), l === 0 && (t.getRowDefinition(0), t.getColumnDefinition(0)));
    const f = [];
    for (let q = 0; q < l; q++) {
      const E = h[q];
      E.visible &&
        (E.ke(true),
        E.co(true),
        f[E.row] || (f[E.row] = []),
        f[E.row][E.column] || (f[E.row][E.column] = []),
        f[E.row][E.column].push(E));
    }
    U.et(h);
    const c = U.ht(),
      u = U.ht(),
      d = U.ht(),
      m = { count: 0 },
      g = { count: 0 };
    let p = i,
      y = e;
    const x = t.Xe,
      b = t.Ye;
    let S;
    l = x.length;
    for (let q = 0; q < l; q++) ((S = x[q]), S !== void 0 && ((S.actual = 0), (S.bi = 0)));
    l = b.length;
    for (let q = 0; q < l; q++) ((S = b[q]), S !== void 0 && ((S.actual = 0), (S.bi = 0)));
    let k = f.length,
      P = 0;
    for (let q = 0; q < k; q++) f[q] && (P = Math.max(P, f[q].length));
    const A = Math.min(t.topIndex, k - 1),
      C = Math.min(t.leftIndex, P - 1);
    let M = 0,
      N;
    k = f.length;
    const T = t.tr();
    for (let q = 0; q < k; q++) {
      if (!f[q]) continue;
      P = f[q].length;
      const E = t.getRowDefinition(q);
      ((E.actual = 0), (E.bi = 0));
      for (let v = 0; v < P; v++) {
        if (!f[q][v]) continue;
        const Q = t.getColumnDefinition(v);
        c[v] === void 0 && ((Q.actual = 0), (Q.bi = 0), (c[v] = true));
        const ot = f[q][v],
          it = ot.length;
        for (let et = 0; et < it; et++) {
          const nt = ot[et];
          if (!nt.visible && nt !== T) continue;
          const dt = nt.rowSpan > 1,
            at = nt.columnSpan > 1;
          (dt || at) && !(q < A) && !(v < C) && u.push(nt);
          const ft = nt.margin,
            rt = ft.right + ft.left,
            ht = ft.top + ft.bottom;
          N = nt._0(E, Q, false);
          const ct = nt.desiredSize,
            _ = !isNaN(ct.width),
            st = !isNaN(ct.height);
          if (
            (N !== 0 &&
              !(_ && st) &&
              !(q < A) &&
              !(v < C) &&
              (!at && m[v] === void 0 && (N === 2 || N === 5) && ((m[v] = -1), m.count++),
              !dt && g[q] === void 0 && (N === 2 || N === 4) && ((g[q] = -1), g.count++),
              !dt && !at && d.push(nt)),
            nt.gt(1 / 0, 1 / 0, 0, 0),
            q < A || v < C)
          )
            continue;
          const ut = nt.measuredBounds,
            gt = Math.max(ut.width + rt, 0),
            mt = Math.max(ut.height + ht, 0);
          if (nt.rowSpan === 1 && (N === 0 || N === 5)) {
            S = t.getRowDefinition(q);
            const pt = S.computeEffectiveSpacing(),
              yt = S.$ === 0;
            ((M = Math.max(mt - S.actual, 0)),
              M + (yt ? pt : 0) > y && (M = Math.max(y - pt, 0)),
              (S.bi = S.bi + M),
              (S.actual = S.$ + M),
              (y = Math.max(y - (M + (yt ? pt : 0)), 0)));
          }
          if (nt.columnSpan === 1 && (N === 0 || N === 4)) {
            S = t.getColumnDefinition(v);
            const pt = S.computeEffectiveSpacing(),
              yt = S.$ === 0;
            ((M = Math.max(gt - S.actual, 0)),
              M + (yt ? pt : 0) > p && (M = Math.max(p - pt, 0)),
              (S.bi = S.bi + M),
              (S.actual = S.$ + M),
              (p = Math.max(p - (M + (yt ? pt : 0)), 0)));
          }
          (dt || at) && nt.Cc();
        }
      }
    }
    U.et(c);
    let L = 0,
      D = 0;
    l = t.columnCount;
    for (let q = 0; q < l; q++) {
      const E = b[q];
      E !== void 0 && ((L += isNaN(E.Me) ? E.bi : E.Me), E.bi !== 0 && (L += E.computeEffectiveSpacing()));
    }
    l = t.rowCount;
    for (let q = 0; q < l; q++) {
      const E = x[q];
      E !== void 0 && ((D += isNaN(E.Me) ? E.bi : E.Me), E.bi !== 0 && (D += E.computeEffectiveSpacing()));
    }
    ((p = Math.max(i - L, 0)), (y = Math.max(e - D, 0)));
    let F = y,
      R = p;
    l = d.length;
    for (let q = 0; q < l; q++) {
      const E = d[q],
        v = t.getRowDefinition(E.row),
        Q = t.getColumnDefinition(E.column),
        ot = E.measuredBounds,
        it = E.margin,
        et = it.right + it.left,
        nt = it.top + it.bottom;
      (Q.bi === 0 && m[E.column] !== void 0
        ? (m[E.column] = Math.max(ot.width + et, m[E.column]))
        : (m[E.column] = null),
        v.bi === 0 && g[E.row] !== void 0 ? (g[E.row] = Math.max(ot.height + nt, g[E.row])) : (g[E.row] = null));
    }
    let I = 0,
      O = 0,
      X;
    for (X in g) X !== "count" && (I += g[X]);
    for (X in m) X !== "count" && (O += m[X]);
    const K = Size.a();
    for (let q = 0; q < l; q++) {
      const E = d[q];
      if (!E.visible && E !== T) continue;
      const v = t.getRowDefinition(E.row),
        Q = t.getColumnDefinition(E.column);
      let ot = 0;
      isFinite(Q.width)
        ? (ot = Q.width)
        : (isFinite(p) && m[E.column] !== null
            ? O === 0
              ? (ot = Q.actual + p)
              : (ot = (m[E.column] / O) * R)
            : m[E.column] !== null
              ? (ot = p)
              : (ot = Q.actual || p),
          (ot = Math.max(0, ot - Q.computeEffectiveSpacing())));
      let it = 0;
      switch (
        (isFinite(v.height)
          ? (it = v.height)
          : (isFinite(y) && g[E.row] !== null
              ? I === 0
                ? (it = v.actual + y)
                : (it = (g[E.row] / I) * F)
              : g[E.row] !== null
                ? (it = y)
                : (it = v.actual || y),
            (it = Math.max(0, it - v.computeEffectiveSpacing()))),
        K.e(Math.max(Q.minimum, Math.min(ot, Q.maximum)), Math.max(v.minimum, Math.min(it, v.maximum))),
        (N = E._0(v, Q, false)),
        N)
      ) {
        case 5:
          K.height = Math.max(K.height, v.actual + y);
          break;
        case 4:
          K.width = Math.max(K.width, Q.actual + p);
          break;
      }
      const et = E.margin,
        nt = et.right + et.left,
        dt = et.top + et.bottom;
      E.Cc();
      let at = Q.minimum,
        ft = v.minimum;
      const rt = E.measuredBounds;
      (rt.width === 0 && m[E.column] !== null && (at = Math.max(at, m[E.column])),
        rt.height === 0 && g[E.row] !== null && (ft = Math.max(at, g[E.row])),
        E.gt(K.width, K.height, at, ft));
      const ht = E.measuredBounds;
      let ct = Math.max(ht.width + nt, 0),
        _ = Math.max(ht.height + dt, 0);
      (isFinite(p) && (ct = Math.min(ct, K.width)), isFinite(y) && (_ = Math.min(_, K.height)));
      let st = 0;
      ((st = v.actual),
        (v.actual = Math.max(v.actual, _)),
        (v.bi = Math.max(v.bi, _)),
        (M = v.actual - st),
        (y = Math.max(y - M, 0)),
        g[E.row] === null && (F = Math.max(F - M, 0)),
        (st = Q.actual),
        (Q.actual = Math.max(Q.actual, ct)),
        (Q.bi = Math.max(Q.bi, ct)),
        (M = Q.actual - st),
        (p = Math.max(p - M, 0)),
        m[E.column] === null && (R = Math.max(R - M, 0)));
    }
    U.et(d);
    const V = Size.a(),
      Y = U.ht(),
      z = U.ht();
    if (((l = u.length), l !== 0))
      for (let q = 0; q < k; q++) {
        if (!f[q]) continue;
        P = f[q].length;
        const E = t.getRowDefinition(q);
        Y[q] = E.actual;
        for (let v = 0; v < P; v++) {
          if (!f[q][v]) continue;
          const Q = t.getColumnDefinition(v);
          z[v] = Q.actual;
        }
      }
    for (let q = 0; q < l; q++) {
      const E = u[q];
      if (!E.visible && E !== T) continue;
      const v = t.getRowDefinition(E.row),
        Q = t.getColumnDefinition(E.column);
      switch (
        (K.e(Math.max(Q.minimum, Math.min(i, Q.maximum)), Math.max(v.minimum, Math.min(e, v.maximum))),
        (N = E._0(v, Q, false)),
        N)
      ) {
        case 2:
          (z[Q.index] !== 0 && (K.width = Math.min(K.width, z[Q.index])),
            Y[v.index] !== 0 && (K.height = Math.min(K.height, Y[v.index])));
          break;
        case 5:
          z[Q.index] !== 0 && (K.width = Math.min(K.width, z[Q.index]));
          break;
        case 4:
          Y[v.index] !== 0 && (K.height = Math.min(K.height, Y[v.index]));
          break;
      }
      if (N === 2 || N === 4) {
        let _ = 0;
        for (let st = 0; st < t.rowCount; st++) {
          if (st >= E.row && st < E.row + E.rowSpan) continue;
          const lt = t.Xe[st];
          lt !== void 0 && ((_ += Y[st] || 0), lt.bi !== 0 && (_ += lt.computeEffectiveSpacing()));
        }
        K.height = Math.max(K.height - _, 0);
      }
      if (N === 2 || N === 5) {
        let _ = 0;
        for (let st = 0; st < t.columnCount; st++) {
          if (st >= E.column && st < E.column + E.columnSpan) continue;
          const lt = t.Ye[st];
          lt !== void 0 && ((_ += z[st] || 0), lt.bi !== 0 && (_ += lt.computeEffectiveSpacing()));
        }
        K.width = Math.max(K.width - _, 0);
      }
      (isFinite(Q.width) && (K.width = Q.width), isFinite(v.height) && (K.height = v.height), V.e(0, 0));
      let ot = Q.minimum,
        it = v.minimum;
      for (let _ = 1; _ < E.rowSpan && !(E.row + _ >= t.rowCount); _++) {
        if (((S = t.getRowDefinition(E.row + _)), (M = 0), N === 2 || N === 4)) {
          if (S.$ === 0) continue;
          M = Math.max(S.minimum, S.$ === 0 ? S.maximum : Math.min(S.$, S.maximum));
        } else M = Math.max(S.minimum, isNaN(S.Me) ? S.maximum : Math.min(S.Me, S.maximum));
        ((V.height += M), (it += S.minimum));
      }
      for (let _ = 1; _ < E.columnSpan && !(E.column + _ >= t.columnCount); _++) {
        if (((S = t.getColumnDefinition(E.column + _)), (M = 0), N === 2 || N === 5)) {
          if (S.$ === 0) continue;
          M = Math.max(S.minimum, S.$ === 0 ? S.maximum : Math.min(S.$, S.maximum));
        } else M = Math.max(S.minimum, isNaN(S.Me) ? S.maximum : Math.min(S.Me, S.maximum));
        ((V.width += M), (ot += S.minimum));
      }
      ((K.width += V.width), (K.height += V.height));
      const et = E.margin,
        nt = et.right + et.left,
        dt = et.top + et.bottom;
      E.gt(K.width, K.height, ot, it);
      const at = E.measuredBounds,
        ft = Math.max(at.width + nt, 0),
        rt = Math.max(at.height + dt, 0);
      let ht = 0;
      for (let _ = 0; _ < E.rowSpan && !(E.row + _ >= t.rowCount); _++)
        ((S = t.getRowDefinition(E.row + _)), (ht += S.total || 0));
      if (ht < rt) {
        let _ = rt - ht;
        const st = rt - ht;
        if (E.spanAllocation !== null) {
          const lt = E.spanAllocation;
          for (let ut = 0; ut < E.rowSpan && !(_ <= 0 || E.row + ut >= t.rowCount); ut++) {
            S = t.getRowDefinition(E.row + ut);
            const gt = S.$ || 0,
              mt = lt(E, S, st);
            (Debug && typeof mt != "number" && U.n(E + " spanAllocation does not return a number: " + mt),
              (S.actual = Math.min(S.maximum, gt + mt)),
              S.$ !== gt && (_ -= S.$ - gt));
          }
        }
        for (; _ > 0 && S !== void 0; ) {
          const lt = S.$ || 0;
          if (
            (isNaN(S.height) &&
              S.maximum > lt &&
              ((S.actual = Math.min(S.maximum, lt + _)), S.$ !== lt && (_ -= S.$ - lt)),
            S.index === 0)
          )
            break;
          S = t.getRowDefinition(S.index - 1);
        }
      }
      let ct = 0;
      for (let _ = 0; _ < E.columnSpan && !(E.column + _ >= t.columnCount); _++)
        ((S = t.getColumnDefinition(E.column + _)), (ct += S.total || 0));
      if (ct < ft) {
        let _ = ft - ct;
        const st = ft - ct;
        if (E.spanAllocation !== null) {
          const lt = E.spanAllocation;
          for (let ut = 0; ut < E.columnSpan && !(_ <= 0 || E.column + ut >= t.columnCount); ut++) {
            S = t.getColumnDefinition(E.column + ut);
            const gt = S.$ || 0,
              mt = lt(E, S, st);
            (Debug && typeof mt != "number" && U.n(E + " spanAllocation does not return a number: " + mt),
              (S.actual = Math.min(S.maximum, gt + mt)),
              S.$ !== gt && (_ -= S.$ - gt));
          }
        }
        for (; _ > 0 && S !== void 0; ) {
          const lt = S.$ || 0;
          if (
            (isNaN(S.width) &&
              S.maximum > lt &&
              ((S.actual = Math.min(S.maximum, lt + _)), S.$ !== lt && (_ -= S.$ - lt)),
            S.index === 0)
          )
            break;
          S = t.getColumnDefinition(S.index - 1);
        }
      }
    }
    (U.et(u), Size.o(V), Size.o(K), Y !== void 0 && U.et(Y), z !== void 0 && U.et(z));
    let H = 0,
      W = 0;
    const j = t.desiredSize,
      Z = t.maxSize;
    ((N = t.sn(true)), (L = 0), (D = 0));
    let B = 0,
      $ = 0;
    l = t.columnCount;
    for (let q = 0; q < l; q++)
      if (b[q] !== void 0) {
        if (((S = t.getColumnDefinition(q)), isFinite(S.width))) {
          ((B += S.width), (B += S.computeEffectiveSpacing()));
          continue;
        } else if (S.Zb() === 2) {
          ((B += S.$), (B += S.computeEffectiveSpacing()));
          continue;
        }
        S.$ !== 0 && ((L += S.$), (L += S.computeEffectiveSpacing()));
      }
    (isFinite(j.width) ? (H = Math.min(j.width, Z.width)) : N !== 0 && isFinite(i) ? (H = i) : (H = L),
      (H = Math.max(H, isFinite(i) ? Math.min(o, i) : o)),
      (H = Math.max(H - B, 0)));
    const J = L === 0 ? 1 : Math.max(H / L, 1);
    for (let q = 0; q < l; q++)
      b[q] !== void 0 &&
        ((S = t.getColumnDefinition(q)),
        !isFinite(S.width) && S.Zb() !== 2 && (S.actual = S.$ * J),
        (S.position = n.width),
        S.$ !== 0 && ((n.width += S.$), (n.width += S.computeEffectiveSpacing())));
    l = t.rowCount;
    for (let q = 0; q < l; q++)
      if (x[q] !== void 0) {
        if (((S = t.getRowDefinition(q)), isFinite(S.height))) {
          (($ += S.height), ($ += S.computeEffectiveSpacing()));
          continue;
        } else if (S.Zb() === 2) {
          (($ += S.$), ($ += S.computeEffectiveSpacing()));
          continue;
        }
        S.$ !== 0 && ((D += S.$), (D += S.computeEffectiveSpacing()));
      }
    (isFinite(j.height) ? (W = Math.min(j.height, Z.height)) : N !== 0 && isFinite(e) ? (W = e) : (W = D),
      (W = Math.max(W, isFinite(e) ? Math.min(r, e) : r)),
      (W = Math.max(W - $, 0)));
    const tt = D === 0 ? 1 : Math.max(W / D, 1);
    for (let q = 0; q < l; q++)
      x[q] !== void 0 &&
        ((S = t.getRowDefinition(q)),
        !isFinite(S.height) && S.Zb() !== 2 && (S.actual = S.$ * tt),
        (S.position = n.height),
        S.$ !== 0 && ((n.height += S.$), (n.height += S.computeEffectiveSpacing())));
    l = a.length;
    for (let q = 0; q < l; q++) {
      const E = a[q];
      let v = 0,
        Q = 0;
      (E.type === Panel.TableRow
        ? ((v = n.width), (S = t.getRowDefinition(E.row)), (Q = S.actual))
        : ((S = t.getColumnDefinition(E.column)), (v = S.actual), (Q = n.height)),
        E.measuredBounds.e(0, 0, v, Q),
        E.ke(false));
    }
    (U.et(a), (t.Oh = f));
  }
  arrange(t, i, e) {
    const s = i.length,
      n = t.padding,
      o = n.left,
      r = n.top,
      l = t.Oh;
    if (l === null) return;
    let h = 0,
      a = 0;
    const f = l.length;
    let c = 0;
    for (let C = 0; C < f; C++) l[C] && (c = Math.max(c, l[C].length));
    const u = t.Xe,
      d = t.Ye;
    let m = 0,
      g = 0,
      p = Math.min(t.topIndex, f - 1);
    if (u.length > 0) {
      for (; p !== f && (u[p] === void 0 || u[p].$ === 0); ) p++;
      ((p = Math.max(Math.min(p, f - 1), 0)), (m = -u[p].position));
    }
    let y = Math.min(t.leftIndex, c - 1);
    if (d.length > 0) {
      for (; y !== c && (d[y] === void 0 || d[y].$ === 0); ) y++;
      ((y = Math.max(Math.min(y, c - 1), 0)), (g = -d[y].position));
    }
    let x = 0,
      b = 0;
    for (; x !== f && u[x] === void 0; ) x++;
    for (; b !== f && d[b] === void 0; ) b++;
    const S = t.part;
    let k = t.getRowDefinition(x),
      P = t.getColumnDefinition(b);
    for (let C = 0; C < i.length; C++) {
      const M = i[C];
      if (!(M instanceof Panel && M.visible && M.fl())) continue;
      (M.type === Panel.TableRow
        ? ((k = t.getRowDefinition(M.row)), (P = t.getColumnDefinition(b)))
        : ((k = t.getRowDefinition(x)), (P = t.getColumnDefinition(M.column))),
        (a = k.position + m + r),
        k.$ !== 0 && (a += k.computeEffectiveSpacingTop(Math.max(x, p))),
        (h = P.position + g + o),
        P.$ !== 0 && (h += P.computeEffectiveSpacingTop(Math.max(b, y))));
      const N = M.measuredBounds;
      (M.kc(), M.actualBounds.di());
      const T = M.actualBounds,
        L = Rect.U(T.x, T.y, T.width, T.height);
      if (
        ((T.x = M.type === Panel.TableRow ? o : h),
        (T.y = M.type === Panel.TableColumn ? r : a),
        (T.width = N.width),
        (T.height = N.height),
        M.actualBounds.k(),
        M.co(false),
        L.equalsApproxClose(T))
      ) {
        Rect.o(L);
        continue;
      }
      (S !== null && (S.Lh(), M.J0(S)), Rect.o(L));
    }
    const A = Size.a();
    for (let C = 0; C < f; C++) {
      if (!l[C]) continue;
      c = l[C].length;
      const M = t.getRowDefinition(C);
      ((a = M.position + m + r), M.$ !== 0 && (a += M.computeEffectiveSpacingTop(Math.max(x, p))));
      for (let N = 0; N < c; N++) {
        if (!l[C][N]) continue;
        const T = t.getColumnDefinition(N);
        ((h = T.position + g + o), T.$ !== 0 && (h += T.computeEffectiveSpacingTop(Math.max(b, y))));
        const L = l[C][N],
          D = L.length;
        for (let F = 0; F < D; F++) {
          const R = L[F],
            I = R.measuredBounds;
          A.e(0, 0);
          for (let rt = 1; rt < R.rowSpan && !(C + rt >= t.rowCount); rt++) {
            const ht = t.getRowDefinition(C + rt);
            ht.$ !== 0 && (A.height += ht.total);
          }
          for (let rt = 1; rt < R.columnSpan && !(N + rt >= t.columnCount); rt++) {
            const ht = t.getColumnDefinition(N + rt);
            ht.$ !== 0 && (A.width += ht.total);
          }
          const O = T.$ + A.width,
            X = M.$ + A.height;
          let K = h,
            V = a;
          const Y = O,
            z = X,
            H = h,
            W = a;
          let j = O,
            Z = X;
          (h + O > e.width && (j = Math.max(e.width - h, 0)), a + X > e.height && (Z = Math.max(e.height - a, 0)));
          let B = R.alignment,
            $ = 0,
            J = 0,
            tt = 0,
            q = 0;
          if (B.isDefault()) {
            ((B = t.defaultAlignment),
              B.isSpot() || (B = Spot.Center),
              ($ = B.x),
              (J = B.y),
              (tt = B.offsetX),
              (q = B.offsetY));
            const rt = T.alignment,
              ht = M.alignment;
            (rt.isSpot() && (($ = rt.x), (tt = rt.offsetX)), ht.isSpot() && ((J = ht.y), (q = ht.offsetY)));
          } else (($ = B.x), (J = B.y), (tt = B.offsetX), (q = B.offsetY));
          (isNaN($) || isNaN(J)) && (($ = 0.5), (J = 0.5), (tt = 0), (q = 0));
          let E = I.width,
            v = I.height;
          const Q = R.margin,
            ot = Q.left + Q.right,
            it = Q.top + Q.bottom,
            et = R._0(M, T, false);
          (isNaN(R.desiredSize.width) && (et === 2 || et === 5) && (E = Math.max(O - ot, 0)),
            isNaN(R.desiredSize.height) && (et === 2 || et === 4) && (v = Math.max(X - it, 0)));
          const nt = R.maxSize,
            dt = R.minSize;
          ((E = Math.min(nt.width, E)),
            (v = Math.min(nt.height, v)),
            (E = Math.max(dt.width, E)),
            (v = Math.max(dt.height, v)));
          const at = E + ot,
            ft = v + it;
          ((K += Y * $ - at * $ + tt + Q.left),
            (V += z * J - ft * J + q + Q.top),
            R.visible &&
              (Rect.contains(H, W, j, Z, K, V, I.width, I.height)
                ? R.Ut(K, V, E, v)
                : R.Ut(K, V, E, v, new Rect(H, W, j, Z))));
        }
      }
    }
    Size.o(A);
    for (let C = 0; C < s; C++) {
      const M = i[C],
        N = M instanceof Panel ? M : null;
      if (N !== null && N.fl()) {
        const T = M.actualBounds;
        (M.naturalBounds.di(), M.naturalBounds.e(0, 0, T.width, T.height), M.naturalBounds.k());
      }
    }
  }
}
PanelLayout.En("Table", new PanelLayoutTable());
