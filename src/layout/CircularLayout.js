class CircularLayout extends Layout {
  ye;
  ou;
  KS;
  Bg;
  US;
  Jh;
  dA;
  gA;
  mA;
  Ys;
  pw;
  yw;
  wf;
  ww;
  aI;
  zg;
  Xg;
  Yg;
  ru;
  Ji;
  N;
  Ce;
  Ae;
  Un;
  Kg;
  constructor(t) {
    (super(),
      (this.ye = 0),
      (this.ou = 0),
      (this.KS = 0),
      (this.Bg = 360),
      (this.US = 0),
      (this.Jh = 0),
      (this.dA = new Point()),
      (this.gA = 30),
      (this.mA = 0),
      (this.Ys = 0),
      (this.pw = 0),
      (this.yw = new VertexArrangement()),
      (this.wf = 0),
      (this.ww = 0),
      (this.aI = 600),
      (this.zg = NaN),
      (this.Xg = 1),
      (this.Yg = 0),
      (this.ru = 360),
      (this.Ji = 0),
      (this.N = 10),
      (this.Ce = 24),
      (this.Ae = LayoutVertex.standardComparer),
      (this.Un = 6),
      (this.Kg = 30),
      t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.zg = this.zg),
      (t.Xg = this.Xg),
      (t.Yg = this.Yg),
      (t.ru = this.ru),
      (t.Ji = this.Ji),
      (t.N = this.N),
      (t.Ce = this.Ce),
      (t.Ae = this.Ae),
      (t.Un = this.Un),
      (t.Kg = this.Kg));
  }
  gi(t) {
    t in CircularSorting
      ? (this.sorting = t)
      : t in CircularDirection
        ? (this.direction = t)
        : t in CircularArrangement
          ? (this.arrangement = t)
          : t in CircularNodeDiameterFormula
            ? (this.nodeDiameterFormula = t)
            : super.gi(t);
  }
  createNetwork() {
    return new CircularNetwork(this);
  }
  x4(t, i, e) {
    t = this.b4(t);
    let s = this.US,
      n = this.gA,
      o = this.ye,
      r = this.ou,
      l = this.KS,
      h = this.Bg,
      a = this.Jh,
      f = this.mA,
      c = this.Ys,
      u = this.pw;
    if (
      ((s = this.arrangement),
      (n = this.nodeDiameterFormula),
      (o = this.radius),
      (!isFinite(o) || o <= 0) && (o = NaN),
      (r = this.aspectRatio),
      (!isFinite(r) || r <= 0) && (r = 1),
      (l = this.startAngle),
      isFinite(l) || (l = 0),
      (h = this.sweepAngle),
      (!isFinite(h) || h > 360 || h < 1) && (h = 360),
      (a = this.spacing),
      isFinite(a) || (a = NaN),
      s === 3 && n === 31 ? (s = 0) : s === 3 && n !== 31 && ((n = 31), (s = this.arrangement)),
      (this.direction === 12 || this.direction === 13) && this.sorting !== 24)
    ) {
      for (let g = 0; !(g >= t.length || (i.add(t.elt(g)), g + 1 >= t.length)); g += 2) e.add(t.elt(g + 1));
      this.direction === 12
        ? (this.arrangement === 3 && i.reverse(), (t = new List()), t.addAll(i), t.addAll(e))
        : (this.arrangement === 3 && e.reverse(), (t = new List()), t.addAll(e), t.addAll(i));
    }
    const d = t.length;
    f = 0;
    let m = 0;
    for (let g = 0; g < t.length; g++) {
      const p = l + (h * m * (this.direction === 10 ? 1 : -1)) / d;
      let y = t.elt(g).diameter;
      (isNaN(y) && (y = t.elt(g).$h(p)), h < 360 && (g === 0 || g === t.length - 1) && (y /= 2), (f += y), m++);
    }
    if (isNaN(o) || s === 3) {
      if ((isNaN(a) && (a = 6), s !== 0 && s !== 3)) {
        let g = -1 / 0;
        for (let p = 0; p < d; p++) {
          const y = t.elt(p),
            x = t.elt(p === d - 1 ? 0 : p + 1);
          (isNaN(y.diameter) && y.$h(0),
            isNaN(x.diameter) && x.$h(0),
            (g = Math.max(g, (y.diameter + x.diameter) / 2)));
        }
        if (((u = g + a), s === 2)) {
          const p = (2 * Math.PI) / d,
            y = (g + a) / p;
          r > 1 ? ((o = y), (c = o * r)) : ((c = y), (o = c));
        } else o = this.GS(u * (h >= 360 ? d : d - 1), r, (l * Math.PI) / 180, (h * Math.PI) / 180);
      } else
        o = this.GS(f + (h >= 360 ? d : d - 1) * (s !== 3 ? a : a * 1.6), r, (l * Math.PI) / 180, (h * Math.PI) / 180);
      c = o * r;
    } else {
      c = o * r;
      const g = this.pA(o, c, (l * Math.PI) / 180, (h * Math.PI) / 180);
      if (isNaN(a)) s === 0 && (a = (g - f) / (h >= 360 ? d : d - 1));
      else if (s === 0) {
        const p = (g - f) / (h >= 360 ? d : d - 1);
        p < a
          ? ((o = this.GS(f + a * (h >= 360 ? d : d - 1), r, (l * Math.PI) / 180, (h * Math.PI) / 180)), (c = o * r))
          : (a = p);
      } else {
        let p = -1 / 0;
        for (let b = 0; b < d; b++) {
          const S = t.elt(b),
            k = t.elt(b === d - 1 ? 0 : b + 1);
          (isNaN(S.diameter) && S.$h(0),
            isNaN(k.diameter) && k.$h(0),
            (p = Math.max(p, (S.diameter + k.diameter) / 2)));
        }
        const y = p + a,
          x = this.GS(y * (h >= 360 ? d : d - 1), r, (l * Math.PI) / 180, (h * Math.PI) / 180);
        x > o ? ((o = x), (c = o * r), (u = y)) : (u = g / (h >= 360 ? d : d - 1));
      }
    }
    return (
      (this.US = s),
      (this.gA = n),
      (this.ye = o),
      (this.ou = r),
      (this.KS = l),
      (this.Bg = h),
      (this.Jh = a),
      (this.mA = f),
      (this.Ys = c),
      (this.pw = u),
      t
    );
  }
  doLayout(t) {
    (Debug &&
      t === null &&
      U.n("Layout.doLayout(collection) argument must not be null but a Diagram, a Group, or an Iterable of Parts"),
      this.network === null && (this.network = this.makeNetwork(t)),
      (this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin)));
    const i = this.network.vertexes;
    if (i.count <= 1) {
      if (i.count === 1) {
        const u = i.first();
        ((u.centerX = 0), (u.centerY = 0));
      }
      (this.updateParts(), (this.network = null), (this.isValidLayout = true));
      return;
    }
    let e = new List();
    e.addAll(i.iterator);
    const s = new List(),
      n = new List();
    e = this.x4(e, s, n);
    const o = this.US,
      r = this.ye,
      l = this.KS,
      h = this.Bg,
      a = this.Jh,
      f = this.Ys,
      c = this.pw;
    if ((this.direction === 12 || this.direction === 13) && o === 3) this.fI(e, h, l - h / 2, 10);
    else if (this.direction === 12 || this.direction === 13) {
      let u = 0;
      switch (o) {
        case 1:
          u = (this.qS(r, f, l, c) * 180) / Math.PI;
          break;
        case 0: {
          let d = 0,
            m = 0;
          const g = s.first();
          g !== null && (d = g.$h(Math.PI / 2));
          const p = n.first();
          (p !== null && (m = p.$h(Math.PI / 2)), (u = (this.qS(r, f, l, a + (d + m) / 2) * 180) / Math.PI));
          break;
        }
        case 2:
          u = h / e.length;
          break;
      }
      if (this.direction === 12) {
        switch (o) {
          case 1:
            this.xw(s, h / 2, l, 11);
            break;
          case 0:
            this.bw(s, h / 2, l, 11);
            break;
          case 2:
            this.Sw(s, h / 2, l, 11);
            break;
        }
        switch (o) {
          case 1:
            this.xw(n, h / 2, l + u, 10);
            break;
          case 0:
            this.bw(n, h / 2, l + u, 10);
            break;
          case 2:
            this.Sw(n, h / 2, l + u, 10);
            break;
        }
      } else {
        switch (o) {
          case 1:
            this.xw(n, h / 2, l, 11);
            break;
          case 0:
            this.bw(n, h / 2, l, 11);
            break;
          case 2:
            this.Sw(n, h / 2, l, 11);
            break;
        }
        switch (o) {
          case 1:
            this.xw(s, h / 2, l + u, 10);
            break;
          case 0:
            this.bw(s, h / 2, l + u, 10);
            break;
          case 2:
            this.Sw(s, h / 2, l + u, 10);
            break;
        }
      }
    } else
      switch (o) {
        case 1:
          this.xw(e, h, l, this.direction);
          break;
        case 0:
          this.bw(e, h, l, this.direction);
          break;
        case 2:
          this.Sw(e, h, l, this.direction);
          break;
        case 3:
          this.fI(e, h, l, this.direction);
          break;
      }
    (this.updateParts(), (this.network = null), (this.isValidLayout = true));
  }
  Sw(t, i, e, s) {
    const n = this.Bg,
      o = this.ye,
      r = this.Ys,
      l = (e * Math.PI) / 180,
      h = (i * Math.PI) / 180,
      a = t.length;
    for (let f = 0; f < a; f++) {
      const c = l + (s === 10 ? (f * h) / (n >= 360 ? a : a - 1) : -(f * h) / a),
        u = t.elt(f),
        d = (o * Math.tan(c)) / r,
        m = Math.sqrt((o * o + r * r * d * d) / (1 + d * d));
      ((u.centerX = m * Math.cos(c)), (u.centerY = m * Math.sin(c)), (u.actualAngle = (c * 180) / Math.PI));
    }
  }
  bw(t, i, e, s) {
    const n = this.ye,
      o = this.Ys,
      r = this.Jh;
    let l = (e * Math.PI) / 180;
    const h = t.length;
    for (let a = 0; a < h; a++) {
      const f = t.elt(a),
        c = t.elt(a === h - 1 ? 0 : a + 1),
        u = n * Math.cos(l),
        d = o * Math.sin(l);
      ((f.centerX = u),
        (f.centerY = d),
        (f.actualAngle = (l * 180) / Math.PI),
        isNaN(f.diameter) && f.$h(0),
        isNaN(c.diameter) && c.$h(0));
      const m = (f.diameter + c.diameter) / 2,
        g = this.qS(n, o, s === 10 ? l : -l, m + r);
      l += s === 10 ? g : -g;
    }
  }
  xw(t, i, e, s) {
    const n = this.ye,
      o = this.Ys,
      r = this.pw;
    let l = (e * Math.PI) / 180;
    const h = t.length;
    for (let a = 0; a < h; a++) {
      const f = t.elt(a);
      ((f.centerX = n * Math.cos(l)), (f.centerY = o * Math.sin(l)), (f.actualAngle = (l * 180) / Math.PI));
      const c = this.qS(n, o, s === 10 ? l : -l, r);
      l += s === 10 ? c : -c;
    }
  }
  fI(t, i, e, s) {
    let n = this.ww;
    const o = this.Bg;
    if (((this.wf = 0), (this.yw = new VertexArrangement()), i < 360)) {
      for (n = e + (s === 10 ? o : -o); n < 0; ) n += 360;
      ((n %= 360), n > 180 && (n -= 360), (n *= Math.PI / 180), (this.ww = n), this.cI(t, i, e, s));
    } else this.uI(t, i, e, s);
    this.yw.commit(t);
  }
  uI(t, i, e, s) {
    const n = this.ye,
      o = this.Ys,
      r = this.Jh,
      l = this.ou;
    let h = n * Math.cos((e * Math.PI) / 180),
      a = o * Math.sin((e * Math.PI) / 180);
    const f = t.toArray();
    if (f.length === 3) {
      ((f[0].centerX = n),
        (f[0].centerY = 0),
        (f[1].centerX = f[0].centerX - f[0].width / 2 - f[1].width / 2 - r),
        (f[1].y = f[0].y),
        (f[2].centerX = (f[0].centerX + f[1].centerX) / 2),
        (f[2].y = f[0].y - f[2].height - r));
      return;
    } else if (f.length === 4) {
      ((f[0].centerX = n),
        (f[0].centerY = 0),
        (f[2].centerX = -f[0].centerX),
        (f[2].centerY = f[0].centerY),
        (f[1].centerX = 0),
        (f[1].y = Math.min(f[0].y, f[2].y) - f[1].height - r),
        (f[3].centerX = 0),
        (f[3].y = Math.max(f[0].y + f[0].height + r, f[2].y + f[2].height + r)));
      return;
    }
    const c = Point.a();
    for (let S = 0; S < f.length && ((f[S].centerX = h), (f[S].centerY = a), !(S >= f.length - 1)); S++)
      (this.dI(h, a, f, S, s, c) || this.gI(h, a, f, S, s, c), (h = c.x), (a = c.y));
    if ((Point.o(c), this.wf++, this.wf > 23)) return;
    const u = f[0].centerX,
      d = f[0].centerY,
      m = f[f.length - 1].centerX,
      g = f[f.length - 1].centerY;
    let p = Math.abs(u - m) - ((f[0].width + f[f.length - 1].width) / 2 + r);
    const y = Math.abs(d - g) - ((f[0].height + f[f.length - 1].height) / 2 + r);
    let x = 0;
    if (Math.abs(y) < 1) {
      const S = Math.abs(u - m),
        k = (f[0].width + f[f.length - 1].width) / 2;
      (S < k && (x = 0), (p = S - k));
    } else y > 0 ? (x = y) : Math.abs(p) < 1 ? (x = 0) : (x = p);
    let b = false;
    (Math.abs(m) > Math.abs(g) ? (b = m > 0 != d > g) : (b = g > 0 != u < m),
      (b = s === 10 ? b : !b),
      b && ((x = -Math.abs(x)), (x = Math.min(x, -f[f.length - 1].width)), (x = Math.min(x, -f[f.length - 1].height))),
      this.yw.S4(x, f),
      Math.abs(x) > 1 &&
        (this.wf < 8
          ? (this.ye -= x / (2 * Math.PI))
          : f.length < 5 && x > 10
            ? (this.ye /= 2)
            : (this.ye -= x > 0 ? 1.7 : -2.3),
        (this.Ys = this.ye * l),
        this.uI(t, i, e, s)));
  }
  cI(t, i, e, s) {
    const n = this.ye,
      o = this.Ys,
      r = this.ou;
    let l = n * Math.cos((e * Math.PI) / 180),
      h = o * Math.sin((e * Math.PI) / 180);
    const a = Point.a(),
      f = t.toArray();
    for (let m = 0; m < f.length && ((f[m].centerX = l), (f[m].centerY = h), !(m >= f.length - 1)); m++)
      (this.dI(l, h, f, m, s, a) || this.gI(l, h, f, m, s, a), (l = a.x), (h = a.y));
    if ((Point.o(a), this.wf++, this.wf > 23)) return;
    const c = Math.atan2(h, l);
    let u = s === 10 ? this.ww - c : c - this.ww;
    u = Math.abs(u) < Math.abs(u - 2 * Math.PI) ? u : u - 2 * Math.PI;
    const d = (u * (n + o)) / 2;
    (this.yw.k4(d, f),
      Math.abs(d) > 1 &&
        (this.wf < 8 ? (this.ye -= d / (2 * Math.PI)) : (this.ye -= d > 0 ? 1.7 : -2.3),
        (this.Ys = this.ye * r),
        this.cI(t, i, e, s)));
  }
  dI(t, i, e, s, n, o) {
    const r = this.Jh,
      l = this.ye,
      h = this.Ys;
    let a = 0,
      f = 0;
    const c = (e[s].width + e[s + 1].width) / 2 + r;
    let u = false;
    if (i >= 0 != (n === 10)) {
      if (((a = t + c), a > l)) {
        if (((a = t - c), a < -l)) return ((o.x = a), (o.y = f), false);
        u = true;
      }
    } else if (((a = t - c), a < -l)) {
      if (((a = t + c), a > l)) return ((o.x = a), (o.y = f), false);
      u = true;
    }
    return (
      (f = Math.sqrt(1 - Math.min(1, (a * a) / (l * l))) * h),
      i < 0 !== u && (f = -f),
      Math.abs(i - f) > (e[s].height + e[s + 1].height) / 2 ? ((o.x = a), (o.y = f), false) : ((o.x = a), (o.y = f), true)
    );
  }
  gI(t, i, e, s, n, o) {
    const r = this.Jh,
      l = this.ye,
      h = this.Ys;
    let a = 0,
      f = 0;
    const c = (e[s].height + e[s + 1].height) / 2 + r;
    let u = false;
    if (t >= 0 != (n === 10)) {
      if (((f = i - c), f < -h)) {
        if (((f = i + c), f > h)) return ((o.x = a), (o.y = f), false);
        u = true;
      }
    } else if (((f = i + c), f > h)) {
      if (((f = i - c), f < -h)) return ((o.x = a), (o.y = f), false);
      u = true;
    }
    return (
      (a = Math.sqrt(1 - Math.min(1, (f * f) / (h * h))) * l),
      t < 0 !== u && (a = -a),
      Math.abs(t - a) > (e[s].width + e[s + 1].width) / 2 ? ((o.x = a), (o.y = f), false) : ((o.x = a), (o.y = f), true)
    );
  }
  commitLayout() {
    (this.commitNodes(), this.isRouting && this.commitLinks());
  }
  commitNodes() {
    const t = this.group !== null && this.group.hasPlaceholder(),
      i = t ? this.group.location.copy() : null;
    let e = this.actualCenter;
    if (
      (t
        ? (e = new Point(0, 0))
        : ((e.x = this.arrangementOrigin.x + this.ye), (e.y = this.arrangementOrigin.y + this.Ys)),
      this.network !== null)
    ) {
      const s = this.network.vertexes.iterator;
      for (; s.next(); ) {
        const n = s.value;
        ((n.x += e.x), (n.y += e.y), n.commit());
      }
    }
    if (t && this.group && i) {
      this.group.ensureBounds();
      const s = this.group.position.copy(),
        n = this.group.location.copy(),
        o = i.subtract(n.subtract(s));
      (this.group.move(o), (this.dA = o.subtract(s)));
    }
  }
  commitLinks() {
    if (this.network !== null) {
      const t = this.network.edges.iterator;
      for (; t.next(); ) t.value.commit();
    }
  }
  pA(t, i, e, s) {
    const n = this.aI;
    if (Math.abs(this.ou - 1) < 0.001) return e !== void 0 && s !== void 0 ? s * t : 2 * Math.PI * t;
    const o = t > i ? Math.sqrt(t * t - i * i) / t : Math.sqrt(i * i - t * t) / i;
    let r = 0,
      l = 0;
    e !== void 0 && s !== void 0 ? (l = s / (n + 1)) : (l = Math.PI / (2 * (n + 1)));
    let h = 0;
    for (let a = 0; a <= n; a++) {
      e !== void 0 && s !== void 0 ? (h = e + (a * s) / n) : (h = (a * Math.PI) / (2 * n));
      const f = Math.sin(h);
      r += Math.sqrt(1 - o * o * f * f) * l;
    }
    return e !== void 0 && s !== void 0 ? (t > i ? t : i) * r : 4 * (t > i ? t : i) * r;
  }
  GS(t, i, e, s) {
    let n = 0;
    return (e !== void 0 && s !== void 0 ? (n = this.pA(1, i, e, s)) : (n = this.pA(1, i)), t / n);
  }
  qS(t, i, e, s) {
    if (Math.abs(this.ou - 1) < 0.001) return s / t;
    const n = t > i ? Math.sqrt(t * t - i * i) / t : Math.sqrt(i * i - t * t) / i;
    let o = 0;
    const r = (2 * Math.PI) / (this.network.vertexes.count * 700);
    t > i && (e += Math.PI / 2);
    for (let l = 0; ; l++) {
      const h = e + l * r,
        a = Math.sin(h);
      if (((o += (t > i ? t : i) * Math.sqrt(1 - n * n * a * a) * r), o >= s)) return l * r;
    }
  }
  b4(t) {
    switch (this.sorting) {
      case 20:
        break;
      case 21:
        t.reverse();
        break;
      case 22:
        t.sort(this.comparer);
        break;
      case 23:
        (t.sort(this.comparer), t.reverse());
        break;
      case 24:
        return this.P4(this.M4(t));
      default:
        U.n("Invalid sorting type.");
    }
    return t;
  }
  M4(t) {
    const i = [];
    for (let s = 0; s < t.length; s++) i.push(0);
    const e = new List();
    for (let s = 0; s < t.length; s++) {
      let n = -1,
        o = -1;
      if (s === 0)
        for (let f = 0; f < t.length; f++) {
          const u = t.elt(f).edgesCount;
          u > n && ((n = u), (o = f));
        }
      else
        for (let f = 0; f < t.length; f++) {
          const c = i[f];
          c > n && ((n = c), (o = f));
        }
      (e.add(t.elt(o)), (i[o] = -1));
      const r = t.elt(o);
      let l = 0;
      const h = r.sourceEdges;
      for (; h.next(); ) {
        const c = h.value.fromVertex;
        ((l = t.indexOf(c)), !(l < 0) && i[l] >= 0 && i[l]++);
      }
      const a = r.destinationEdges;
      for (; a.next(); ) {
        const c = a.value.toVertex;
        ((l = t.indexOf(c)), !(l < 0) && i[l] >= 0 && i[l]++);
      }
    }
    return e;
  }
  P4(t) {
    const i = [];
    for (let c = 0; c < t.length; c++) {
      const u = t.elt(c);
      i[c] = [];
      let d = 0;
      const m = u.destinationEdges;
      for (; m.next(); ) {
        const p = m.value.toVertex;
        ((d = t.indexOf(p)), d !== c && i[c].indexOf(d) < 0 && i[c].push(d));
      }
      const g = u.sourceEdges;
      for (; g.next(); ) {
        const p = g.value.fromVertex;
        ((d = t.indexOf(p)), d !== c && i[c].indexOf(d) < 0 && i[c].push(d));
      }
    }
    const e = [];
    for (let c = 0; c < i.length; c++) e[c] = 0;
    const s = [],
      n = [],
      o = [],
      r = [],
      l = new List();
    let h = 0;
    for (let c = 0; c < i.length; c++) {
      const u = i[c].length;
      if (u === 1) {
        r.push(c);
        continue;
      }
      if (u === 0) {
        l.add(t.elt(c));
        continue;
      }
      if (h === 0) {
        (s.push(c), h++);
        continue;
      }
      let d = 1 / 0,
        m = 1 / 0,
        g = -1;
      const p = [];
      for (let y = 0; y < s.length; y++)
        i[s[y]].indexOf(s[y === s.length - 1 ? 0 : y + 1]) < 0 && p.push(y === s.length - 1 ? 0 : y + 1);
      if (p.length === 0) for (let y = 0; y < s.length; y++) p.push(y);
      for (let y = 0; y < p.length; y++) {
        const x = p[y],
          b = this.N4(i[c], n, o, e, x, s);
        let S = 0;
        for (let k = 0; k < i[c].length; k++) {
          const P = i[c][k],
            A = s.indexOf(P);
          if (A >= 0) {
            const C = Math.abs(x - (A >= x ? A + 1 : A));
            S += C < s.length + 1 - C ? C : s.length + 1 - C;
          }
        }
        for (let k = 0; k < n.length; k++) {
          let P = e[n[k]],
            A = e[o[k]];
          if ((P >= x && P++, A >= x && A++, P > A)) {
            const C = A;
            ((A = P), (P = C));
          }
          A - P < (s.length + 2) / 2 == (P < x && x <= A) && S++;
        }
        (b < d || (b === d && S < m)) && ((d = b), (m = S), (g = x));
      }
      s.splice(g, 0, c);
      for (let y = 0; y < s.length; y++) e[s[y]] = y;
      for (let y = 0; y < i[c].length; y++) {
        const x = i[c][y];
        s.indexOf(x) >= 0 && (n.push(c), o.push(x));
      }
      h++;
    }
    let a = false;
    const f = s.length;
    for (;;) {
      a = true;
      for (let c = 0; c < r.length; c++) {
        const u = r[c],
          d = i[u][0],
          m = s.indexOf(d);
        if (m >= 0) {
          let g = 0;
          for (let p = 0; p < i[d].length; p++) {
            const y = i[d][p],
              x = s.indexOf(y);
            if (x < 0 || x === m) continue;
            const b = x > m ? x - m : m - x,
              S = f - b;
            g += x < m != b > S ? 1 : -1;
          }
          (s.splice(g < 0 ? m : m + 1, 0, u), r.splice(c, 1), c--);
        } else a = false;
      }
      if (a) break;
      (s.push(r[0]), r.splice(0, 1));
    }
    for (let c = 0; c < s.length; c++) {
      const u = s[c];
      l.add(t.elt(u));
    }
    return l;
  }
  N4(t, i, e, s, n, o) {
    let r = 0;
    for (let l = 0; l < i.length; l++) {
      const h = i[l],
        a = e[l],
        f = s[h],
        c = s[a];
      let u = 0,
        d = 0;
      if ((f < c ? ((u = f), (d = c)) : ((u = c), (d = f)), u < n && n <= d))
        for (let m = 0; m < t.length; m++) {
          const g = t[m];
          o.indexOf(g) < 0 || (u < s[g] && s[g] < d) || u === s[g] || d === s[g] || r++;
        }
      else
        for (let m = 0; m < t.length; m++) {
          const g = t[m];
          o.indexOf(g) < 0 || !(u < s[g] && s[g] < d) || u === s[g] || d === s[g] || r++;
        }
    }
    return r;
  }
  get radius() {
    return this.zg;
  }
  set radius(t) {
    this.zg !== t && (U.i(t, "number", CircularLayout, "radius"), (t > 0 || isNaN(t)) && ((this.zg = t), this.b()));
  }
  get aspectRatio() {
    return this.Xg;
  }
  set aspectRatio(t) {
    this.Xg !== t && (U.i(t, "number", CircularLayout, "aspectRatio"), t > 0 && ((this.Xg = t), this.b()));
  }
  get startAngle() {
    return this.Yg;
  }
  set startAngle(t) {
    this.Yg !== t && (U.i(t, "number", CircularLayout, "startAngle"), (this.Yg = t), this.b());
  }
  get sweepAngle() {
    return this.ru;
  }
  set sweepAngle(t) {
    this.ru !== t &&
      (U.i(t, "number", CircularLayout, "sweepAngle"), t > 0 && t <= 360 ? (this.ru = t) : (this.ru = 360), this.b());
  }
  get arrangement() {
    return this.Ji;
  }
  set arrangement(t) {
    this.Ji !== t &&
      (U.W(t, CircularArrangement, "CircularArrangement"),
      (t === 3 || t === 0 || t === 1 || t === 2) && ((this.Ji = t), this.b()));
  }
  get direction() {
    return this.N;
  }
  set direction(t) {
    this.N !== t &&
      (U.W(t, CircularDirection, "CircularDirection"),
      (t === 10 || t === 11 || t === 12 || t === 13) && ((this.N = t), this.b()));
  }
  get sorting() {
    return this.Ce;
  }
  set sorting(t) {
    this.Ce !== t && (U.W(t, CircularSorting, "CircularSorting"), (this.Ce = t), this.b());
  }
  get comparer() {
    return this.Ae;
  }
  set comparer(t) {
    this.Ae !== t && (U.C(t, CircularLayout, "comparer"), (this.Ae = t), this.b());
  }
  get spacing() {
    return this.Un;
  }
  set spacing(t) {
    this.Un !== t && (U.i(t, "number", CircularLayout, "spacing"), (this.Un = t), this.b());
  }
  get nodeDiameterFormula() {
    return this.Kg;
  }
  set nodeDiameterFormula(t) {
    this.Kg !== t &&
      (U.W(t, CircularNodeDiameterFormula, "CircularNodeDiameterFormula"),
      (t === 30 || t === 31) && ((this.Kg = t), this.b()));
  }
  get actualXRadius() {
    return this.ye;
  }
  get actualYRadius() {
    return this.Ys;
  }
  get actualSpacing() {
    return this.Jh;
  }
  get actualCenter() {
    return this.dA;
  }
  static ConstantSpacing = 0;
  static ConstantDistance = 1;
  static ConstantAngle = 2;
  static Packed = 3;
  static Clockwise = 10;
  static Counterclockwise = 11;
  static BidirectionalLeft = 12;
  static BidirectionalRight = 13;
  static Forwards = 20;
  static Reverse = 21;
  static Ascending = 22;
  static Descending = 23;
  static Optimized = 24;
  static Pythagorean = 30;
  static Circular = 31;
}
