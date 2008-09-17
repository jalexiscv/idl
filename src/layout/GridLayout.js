class GridLayout extends Layout {
  bg;
  Sg;
  zo;
  Un;
  pi;
  Ji;
  Ce;
  Ae;
  constructor(t) {
    (super(),
      (this.isViewportSized = true),
      (this.bg = NaN),
      (this.Sg = NaN),
      (this.zo = new Size(NaN, NaN).k()),
      (this.Un = new Size(10, 10).k()),
      (this.pi = 1),
      (this.Ji = 10),
      (this.Ce = 22),
      (this.Ae = GridLayout.standardComparer),
      t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.bg = this.bg),
      (t.Sg = this.Sg),
      t.zo.c(this.zo),
      t.Un.c(this.Un),
      (t.pi = this.pi),
      (t.Ji = this.Ji),
      (t.Ce = this.Ce),
      (t.Ae = this.Ae));
  }
  gi(t) {
    t in GridSorting
      ? (this.sorting = t)
      : t in GridArrangement
        ? (this.arrangement = t)
        : t in GridAlignment
          ? (this.alignment = t)
          : super.gi(t);
  }
  doLayout(t) {
    (Debug &&
      t === null &&
      U.n("Layout.doLayout(collection) argument must not be null but a Diagram, a Group, or an Iterable of Parts"),
      (this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin)));
    const i = this.collectParts(t),
      e = this.diagram,
      n = i.copy().iterator;
    for (; n.next(); ) {
      const m = n.value;
      if (m.Ir() && (m.fromNode !== null || m.toNode !== null)) {
        i.delete(m);
        continue;
      }
      if ((m.ensureBounds(), m instanceof Group)) {
        const g = m.memberParts;
        for (; g.next(); ) {
          const p = g.value;
          i.delete(p);
        }
      }
    }
    const o = i.toArray();
    if (o.length === 0) return;
    switch (this.sorting) {
      case 20:
        break;
      case 21:
        o.reverse();
        break;
      case 22:
        o.sort(this.comparer);
        break;
      case 23:
        (o.sort(this.comparer), o.reverse());
        break;
    }
    let r = this.wrappingColumn;
    isNaN(r) && (r = 0);
    let l = this.wrappingWidth;
    if (isNaN(l) && e !== null) {
      const m = e.viewportBounds,
        g = e.padding;
      l = Math.max(m.width - g.left - g.right, 0);
    } else l = Math.max(this.wrappingWidth, 0);
    r <= 0 && l <= 0 && (r = 1);
    let h = this.spacing.width;
    isFinite(h) || (h = 0);
    let a = this.spacing.height;
    (isFinite(a) || (a = 0), e !== null && e.startTransaction("Layout"));
    const f = [];
    switch (this.alignment) {
      case 0:
        this.r4(o, l, r, h, a, f);
        break;
      case 1:
        this.l4(o, l, r, h, a, f);
        break;
    }
    let c = 0,
      u = 0,
      d = 0;
    for (let m = 0; m < f.length; m++) {
      const g = f[m];
      ((c = Math.min(c, g.x)), (u = Math.min(u, g.y)), (d = Math.max(d, g.x + g.width)));
    }
    (this.arrangement === 11
      ? this.commitLayers(f, new Point(c + h / 2 - (d + c), u - a / 2))
      : this.commitLayers(f, new Point(c - h / 2, u - a / 2)),
      e !== null && e.commitTransaction("Layout"),
      (this.isValidLayout = true));
  }
  r4(t, i, e, s, n, o) {
    const r = Rect.a();
    let l = Math.max(this.cellSize.width, 1);
    if (!isFinite(l)) {
      l = 0;
      for (let p = 0; p < t.length; p++) {
        const y = t[p],
          x = this.getLayoutBounds(y, r);
        l = Math.max(l, x.width);
      }
    }
    ((l += s), (l = Math.max(l, 1)));
    let h = Math.max(this.cellSize.height, 1);
    if (!isFinite(h)) {
      h = 0;
      for (let p = 0; p < t.length; p++) {
        const y = t[p],
          x = this.getLayoutBounds(y, r);
        h = Math.max(h, x.height);
      }
    }
    ((h += n), (h = Math.max(h, 1)));
    const a = this.arrangement,
      f = this.arrangementOrigin.x,
      c = this.arrangementOrigin.y;
    let u = f,
      d = c,
      m = 0,
      g = 0;
    for (let p = 0; p < t.length; p++) {
      const y = t[p],
        x = this.getLayoutBounds(y, r),
        b = Math.ceil((x.width + s) / l),
        S = Math.ceil((x.height + n) / h),
        k = b * l,
        P = S * h;
      let A = 0;
      switch (a) {
        case 11:
          A = Math.abs(u - x.width);
          break;
        default:
          A = u + x.width;
          break;
      }
      (((e > 0 && m > e - 1) || (i > 0 && m > 0 && A - f > i)) &&
        (o.push(new Rect(0, d, i + s, g)), (m = 0), (u = f), (d += g), (g = 0)),
        (g = Math.max(g, P)));
      let C = 0;
      switch (a) {
        case 11:
          C = -x.width;
          break;
        default:
          C = 0;
          break;
      }
      switch ((y.moveTo(u + C + y.margin.left, d + y.margin.top), a)) {
        case 11:
          u -= k;
          break;
        default:
          u += k;
          break;
      }
      m++;
    }
    (o.push(new Rect(0, d, i + s, g)), Rect.o(r));
  }
  l4(t, i, e, s, n, o) {
    const r = Rect.a();
    let l = Math.max(this.cellSize.width, 1),
      h = 0,
      a = 0,
      f = 0;
    const c = Point.a();
    for (let C = 0; C < t.length; C++) {
      const M = t[C],
        N = this.getLayoutBounds(M, r),
        T = M.getRelativePoint(M.locationObject, M.locationSpot, c);
      ((h = Math.max(h, T.x)), (a = Math.max(a, N.width - T.x)), (f = Math.max(f, T.y)));
    }
    const u = this.arrangement;
    switch (u) {
      case 11:
        h += s;
        break;
      default:
        a += s;
        break;
    }
    isFinite(l) ? (l = Math.max(l + s, 1)) : (l = Math.max(h + a, 1));
    const d = this.arrangementOrigin.x,
      m = this.arrangementOrigin.y;
    let g = d,
      p = m,
      y = 0;
    i >= h && (i -= h);
    let x = 0,
      b = 0;
    const S = Math.max(this.cellSize.height, 1);
    f = 0;
    let k = 0,
      P = true;
    const A = Point.a();
    for (let C = 0; C < t.length; C++) {
      const M = t[C],
        N = this.getLayoutBounds(M, r),
        T = M.getRelativePoint(M.locationObject, M.locationSpot, c);
      if (y > 0)
        switch (u) {
          case 11: {
            let D = (g - d - (N.width - T.x)) / l;
            (G.q(Math.round(D), D) ? (D = Math.round(D)) : (D = Math.floor(D)), (g = D * l + d));
            break;
          }
          default: {
            let D = (g - d + T.x) / l;
            (G.q(Math.round(D), D) ? (D = Math.round(D)) : (D = Math.ceil(D)), (g = D * l + d));
            break;
          }
        }
      else
        switch (u) {
          case 11:
            x = g + T.x + N.width;
            break;
          default:
            x = g - T.x;
            break;
        }
      let L = 0;
      switch (u) {
        case 11:
          L = -(g + T.x) + x;
          break;
        default:
          L = g + N.width - T.x - x;
          break;
      }
      if ((e > 0 && y > e - 1) || (i > 0 && y > 0 && L > i)) {
        o.push(new Rect(0, P ? p - f : p, i + s, k + f + n));
        for (let D = 0; D < y && C !== y; D++) {
          const F = t[C - y + D],
            R = F.getRelativePoint(F.locationObject, F.locationSpot, A);
          F.moveTo(F.position.x, F.position.y + f - R.y);
        }
        ((k += n), P ? (p += k) : (p += k + f), (f = 0), (k = 0), (y = 0), (g = d), (P = false));
      }
      switch (
        (g === d && (u === 11 ? (b = Math.max(b, N.width - T.x)) : (b = Math.min(b, -T.x))),
        (f = Math.max(f, T.y)),
        (k = Math.max(k, N.height - T.y)),
        isFinite(S) && (k = Math.max(k, Math.max(N.height, S) - T.y)),
        P ? M.moveTo(g - T.x, p - T.y) : M.moveTo(g - T.x, p),
        u)
      ) {
        case 11:
          g -= T.x + s;
          break;
        default:
          g += N.width - T.x + s;
          break;
      }
      y++;
    }
    if ((o.push(new Rect(0, p, i + s, (P ? k : k + f) + n)), t.length !== y))
      for (let C = 0; C < y; C++) {
        const M = t[t.length - y + C],
          N = M.getRelativePoint(M.locationObject, M.locationSpot, c);
        M.moveTo(M.position.x, M.position.y + f - N.y);
      }
    if ((Point.o(c), Point.o(A), u === 11))
      for (let C = 0; C < o.length; C++) {
        const M = o[C];
        ((M.width += b), (M.x -= b));
      }
    else
      for (let C = 0; C < o.length; C++) {
        const M = o[C];
        M.x > b && ((M.width += M.x - b), (M.x = b));
      }
    Rect.o(r);
  }
  commitLayers(t, i) {}
  get wrappingWidth() {
    return this.bg;
  }
  set wrappingWidth(t) {
    this.bg !== t &&
      (U.i(t, "number", GridLayout, "wrappingWidth"),
      (t > 0 || isNaN(t)) && ((this.bg = t), (this.isViewportSized = isNaN(t)), this.b()));
  }
  get wrappingColumn() {
    return this.Sg;
  }
  set wrappingColumn(t) {
    this.Sg !== t && (U.i(t, "number", GridLayout, "wrappingColumn"), (t > 0 || isNaN(t)) && ((this.Sg = t), this.b()));
  }
  get cellSize() {
    return this.zo;
  }
  set cellSize(t) {
    (U.s(t, Size, GridLayout, "cellSize"), this.zo.equals(t) || (this.zo.c(t), this.b()));
  }
  get spacing() {
    return this.Un;
  }
  set spacing(t) {
    (U.s(t, Size, GridLayout, "spacing"), this.Un.equals(t) || (this.Un.c(t), this.b()));
  }
  get alignment() {
    return this.pi;
  }
  set alignment(t) {
    this.pi !== t && (U.W(t, GridAlignment, "GridAlignment"), (t === 1 || t === 0) && ((this.pi = t), this.b()));
  }
  get arrangement() {
    return this.Ji;
  }
  set arrangement(t) {
    this.Ji !== t && (U.W(t, GridArrangement, "GridArrangement"), (t === 10 || t === 11) && ((this.Ji = t), this.b()));
  }
  get sorting() {
    return this.Ce;
  }
  set sorting(t) {
    this.Ce !== t &&
      (U.W(t, GridSorting, "GridSorting"), (t === 20 || t === 21 || t === 22 || t === 23) && ((this.Ce = t), this.b()));
  }
  get comparer() {
    return this.Ae;
  }
  set comparer(t) {
    this.Ae !== t && (U.C(t, GridLayout, "comparer"), (this.Ae = t), this.b());
  }
  static standardComparer(t, i) {
    (Debug && U.s(t, Part, GridLayout, "standardComparer:a"), Debug && U.s(i, Part, GridLayout, "standardComparer:b"));
    const e = t.text,
      s = i.text;
    return e < s ? -1 : e > s ? 1 : 0;
  }
  static smartComparer(t, i) {
    if (
      (Debug && U.s(t, Part, GridLayout, "standardComparer:a"),
      Debug && U.s(i, Part, GridLayout, "standardComparer:b"),
      t !== null)
    )
      if (i !== null) {
        const e = t.text.toLocaleLowerCase(),
          s = i.text.toLocaleLowerCase(),
          n = e.split(/([+-]?[.]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)/),
          o = s.split(/([+-]?[.]?\d+(?:\.\d*)?(?:e[+-]?\d+)?)/);
        let r = 0;
        for (; r < n.length; r++)
          if (o[r] !== "" && o[r] !== void 0) {
            const l = parseFloat(n[r]),
              h = parseFloat(o[r]);
            if (isNaN(l))
              if (isNaN(h)) {
                if (n[r].localeCompare(o[r]) !== 0) return n[r].localeCompare(o[r]);
                continue;
              } else return 1;
            else {
              if (isNaN(h)) return -1;
              if (l - h !== 0) return l - h;
              continue;
            }
          } else {
            if (n[r] === "") continue;
            return 1;
          }
        return o[r] !== "" && o[r] !== void 0 ? -1 : 0;
      } else return 1;
    else return i !== null ? -1 : 0;
  }
  static Position = 0;
  static Location = 1;
  static LeftToRight = 10;
  static RightToLeft = 11;
  static Forward = 20;
  static Reverse = 21;
  static Ascending = 22;
  static Descending = 23;
}
