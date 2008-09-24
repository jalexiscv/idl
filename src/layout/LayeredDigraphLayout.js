class LayeredDigraphLayout extends Layout {
  Us;
  ne;
  N;
  mu;
  pu;
  yu;
  Sf;
  wu;
  gr;
  xu;
  qn;
  st;
  Mw;
  Ht;
  $g;
  Gs;
  li;
  qs;
  xs;
  bs;
  zt;
  Zg;
  Qg;
  _S;
  mn;
  bu;
  pr;
  Hn;
  vn;
  wA;
  Qh;
  constructor(t) {
    (super(),
      (this.Us = 25),
      (this.ne = 25),
      (this.N = 0),
      (this.mu = 0),
      (this.pu = 10),
      (this.yu = 20),
      (this.Sf = 4),
      (this.wu = 31),
      (this.gr = 15),
      (this.xu = 10),
      (this.qn = true),
      (this.st = -1),
      (this.Mw = -1),
      (this.Ht = -1),
      (this.$g = 0),
      (this.Gs = 0),
      (this.li = new Int16Array(0)),
      (this.qs = new Float32Array(0)),
      (this.xs = new Float32Array(0)),
      (this.bs = new Float32Array(0)),
      (this.zt = new Float32Array(0)),
      (this.Zg = 0),
      (this.Qg = new Int16Array(0)),
      (this._S = new Int16Array(0)),
      (this.mn = 0),
      (this.bu = null),
      (this.pr = new Point()),
      (this.Hn = []),
      (this.Hn.length = 100),
      (this.vn = 15),
      (this.wA = 0),
      (this.Qh = true),
      t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.Us = this.Us),
      (t.ne = this.ne),
      (t.N = this.N),
      (t.mu = this.mu),
      (t.pu = this.pu),
      (t.yu = this.yu),
      (t.Sf = this.Sf),
      (t.wu = this.wu),
      (t.gr = this.gr),
      (t.xu = this.xu),
      (t.qn = this.qn),
      (t.vn = this.vn),
      (t.Qh = this.Qh));
  }
  gi(t) {
    t in LayeredDigraphAggressive
      ? (this.aggressiveOption = t)
      : t in LayeredDigraphCycleRemove
        ? (this.cycleRemoveOption = t)
        : t in LayeredDigraphInit
          ? (this.initializeOption = t)
          : t in LayeredDigraphLayering
            ? (this.layeringOption = t)
            : super.gi(t);
  }
  createNetwork() {
    return new LayeredDigraphNetwork(this);
  }
  doLayout(t) {
    (Debug &&
      t === null &&
      U.n("Layout.doLayout(collection) argument must not be null but a Diagram, a Group, or an Iterable of Parts"),
      this.network === null && (this.network = this.makeNetwork(t)),
      (this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin)),
      this.L4(),
      this.network.vertexes.count > 0 &&
        (this.network.deleteSelfEdges(),
        this.cycleRemoveOption !== 2 && this.removeCycles(),
        this.D4(),
        this.cycleRemoveOption === 2 && this.removeCycles(),
        this.F4(),
        this.I4(),
        this.R4(),
        this.reduceCrossings(),
        this.straightenAndPack(),
        this.updateParts()),
      (this.network = null),
      (this.isValidLayout = true));
  }
  linkMinLength(t) {
    return 1;
  }
  linkLengthWeight(t) {
    return 1;
  }
  linkStraightenWeight(t) {
    const i = t.fromVertex.node || t.fromVertex.data,
      e = t.toVertex.node || t.toVertex.data;
    return i === null && e === null ? 8 : i === null || e === null ? 4 : 1;
  }
  nodeMinLayerSpace(t, i) {
    return t.node === null && t.data === null
      ? 0
      : this.N === 90 || this.N === 270
        ? i
          ? t.focus.y + 10
          : t.bounds.height - t.focus.y + 10
        : i
          ? t.focus.x + 10
          : t.bounds.width - t.focus.x + 10;
  }
  nodeMinColumnSpace(t, i) {
    if (t.node === null && t.data === null) return 0;
    const e = i ? t.tk : t.ik;
    if (e !== null) return e;
    const s = this.N;
    return s === 90 || s === 270
      ? i
        ? (t.tk = (t.focus.x / this.ne + 1) | 0)
        : (t.ik = ((t.bounds.width - t.focus.x) / this.ne + 1) | 0)
      : i
        ? (t.tk = (t.focus.y / this.ne + 1) | 0)
        : (t.ik = ((t.bounds.height - t.focus.y) / this.ne + 1) | 0);
  }
  oe() {
    const t = this.network.vertexes.count;
    this.Qg.length < t * 2 && (this.Qg = new Int16Array(t * 2));
    let i = 0;
    const e = this.network.vertexes.iterator;
    for (; e.next(); ) {
      const s = e.value;
      ((this.Qg[i] = s.column), i++, (this.Qg[i] = s.index), i++);
    }
    return this.Qg;
  }
  hs(t) {
    let i = 0;
    const e = this.network.vertexes.iterator;
    for (; e.next(); ) {
      const s = e.value;
      ((s.column = t[i]), i++, (s.index = t[i]), i++);
    }
  }
  wI(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "crossingMatrix:unfixedLayer"),
      U.r(i, LayeredDigraphLayout, "crossingMatrix:direction"));
    const e = this._h(t),
      s = this.li[t];
    this._S.length < s * s && (this._S = new Int16Array(s * s));
    const n = this._S;
    for (let o = 0; o < s; o++) {
      let r = 0;
      const l = e[o],
        h = l.near;
      let a = 0;
      h !== null && h !== l && h.layer === l.layer && (r += Math.max(0, Math.abs(h.index - l.index) - 1));
      let f,
        c = 0,
        u,
        d = 0,
        m = 0,
        g = 0,
        p,
        y = 0,
        x,
        b = 0,
        S = 0,
        k = 0,
        P;
      if (i >= 0) {
        for (f = e[o].Ao, c = 0; c < f.length; c++)
          if (((u = f[c]), u.valid && u.fromVertex.layer !== t))
            for (d = u.fromVertex.index, m = u.portToPos, g = u.portFromPos, y = c + 1; y < f.length; y++)
              ((x = f[y]),
                x.valid &&
                  x.fromVertex.layer !== t &&
                  ((b = x.fromVertex.index),
                  (S = x.portToPos),
                  (k = x.portFromPos),
                  m < S && (d > b || (d === b && g > k)) && r++,
                  S < m && (b > d || (b === d && k > g)) && r++));
      }
      if (i <= 0) {
        for (f = e[o].fr, c = 0; c < f.length; c++)
          if (((u = f[c]), u.valid && u.toVertex.layer !== t))
            for (d = u.toVertex.index, m = u.portToPos, g = u.portFromPos, y = c + 1; y < f.length; y++)
              ((x = f[y]),
                x.valid &&
                  x.toVertex.layer !== t &&
                  ((b = x.toVertex.index),
                  (S = x.portToPos),
                  (k = x.portFromPos),
                  g < k && (d > b || (d === b && m > S)) && r++,
                  k < g && (b > d || (b === d && S > m)) && r++));
      }
      for (n[o * s + o] = r, a = o + 1; a < s; a++) {
        let A = 0,
          C = 0;
        if (i >= 0) {
          for (p = e[o].Ao, P = e[a].Ao, c = 0; c < p.length; c++)
            if (((u = p[c]), u.valid && u.fromVertex.layer !== t))
              for (d = u.fromVertex.index, m = u.portToPos, g = u.portFromPos, y = 0; y < P.length; y++)
                ((x = P[y]),
                  x.valid &&
                    x.fromVertex.layer !== t &&
                    ((b = x.fromVertex.index),
                    (S = x.portToPos),
                    (k = x.portFromPos),
                    (d < b || (d === b && g < k)) && C++,
                    (b < d || (b === d && k < g)) && A++));
        }
        if (i <= 0) {
          for (p = e[o].fr, P = e[a].fr, c = 0; c < p.length; c++)
            if (((u = p[c]), u.valid && u.toVertex.layer !== t))
              for (d = u.toVertex.index, m = u.portToPos, g = u.portFromPos, y = 0; y < P.length; y++)
                ((x = P[y]),
                  x.valid &&
                    x.toVertex.layer !== t &&
                    ((b = x.toVertex.index),
                    (S = x.portToPos),
                    (k = x.portFromPos),
                    (d < b || (d === b && m < S)) && C++,
                    (b < d || (b === d && S < m)) && A++));
        }
        ((n[o * s + a] = A), (n[a * s + o] = C));
      }
    }
    return (this.ta(t, e), n);
  }
  countCrossings() {
    let t = 0;
    for (let i = 0; i <= this.st; i++) {
      const e = this.wI(i, 1),
        s = this.li[i];
      for (let n = 0; n < s; n++) for (let o = n; o < s; o++) t += e[n * s + o];
    }
    return t;
  }
  O4(t, i, e) {
    const s = this._h(t),
      n = this.li[t];
    let o = 0;
    for (let r = 0; r < n; r++) {
      let l = null;
      i <= 0 && (l = s[r].Ao);
      let h = null;
      i >= 0 && (h = s[r].fr);
      let a,
        f = 0,
        c = 0;
      if (l !== null)
        for (let u = 0; u < l.length; u++)
          ((a = l[u]),
            a.valid &&
              a.fromVertex.layer !== t &&
              ((f = a.fromVertex.column + a.portFromColOffset),
              (c = a.toVertex.column + a.portToColOffset),
              e ? (o += Math.abs(f - c) * this.linkStraightenWeight(a)) : (o += Math.abs(f - c))));
      if (h !== null)
        for (let u = 0; u < h.length; u++)
          ((a = h[u]),
            a.valid &&
              a.toVertex.layer !== t &&
              ((f = a.fromVertex.column + a.portFromColOffset),
              (c = a.toVertex.column + a.portToColOffset),
              e ? (o += (Math.abs(f - c) + 1) * this.linkStraightenWeight(a)) : (o += Math.abs(f - c))));
    }
    return (this.ta(t, s), o);
  }
  ek(t) {
    let i = 0;
    for (let e = 0; e <= this.st; e++) i += this.O4(e, 1, t);
    return i;
  }
  Nw() {
    let t = 1 / 0;
    this.Ht = -1;
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      ((t = Math.min(t, e.column - this.nodeMinColumnSpace(e, true))),
        (this.Ht = Math.max(this.Ht, e.column + this.nodeMinColumnSpace(e, false))));
    }
    for (i.reset(); i.next(); ) {
      const e = i.value;
      e.column -= t;
    }
    this.Ht -= t;
  }
  Cw(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "barycenters:unfixedLayer"), U.r(i, LayeredDigraphLayout, "barycenters:direction"));
    const e = this._h(t),
      s = this.li[t],
      n = new Float32Array(s);
    for (let o = 0; o < s; o++) {
      const r = e[o];
      let l = null;
      i <= 0 && (l = r.Ao);
      let h = null;
      i >= 0 && (h = r.fr);
      let a = 0,
        f = 0;
      const c = r.near;
      c !== null && c.layer === r.layer && ((a += c.column - 1), f++);
      let u;
      if (l !== null)
        for (let d = 0; d < l.length; d++) {
          u = l[d];
          const m = u.fromVertex;
          u.valid && !u.rev && m.layer !== t && ((a += m.column), f++);
        }
      if (h !== null)
        for (let d = 0; d < h.length; d++) {
          u = h[d];
          const m = u.toVertex;
          u.valid && !u.rev && m.layer !== t && ((a += m.column), f++);
        }
      f === 0 ? (n[o] = -1) : (n[o] = a / f);
    }
    return (this.ta(t, e), n);
  }
  xI(t, i) {
    Debug && (U.r(t, LayeredDigraphLayout, "medians:unfixedLayer"), U.r(i, LayeredDigraphLayout, "medians:direction"));
    const e = this._h(t),
      s = this.li[t],
      n = new Int16Array(s);
    for (let o = 0; o < s; o++) {
      const r = e[o];
      let l = null;
      i <= 0 && (l = r.Ao);
      let h = null;
      i >= 0 && (h = r.fr);
      let a = 0;
      const f = [],
        c = r.near;
      c !== null && c.layer === r.layer && ((f[a] = c.column - 1), a++);
      let u;
      if (l !== null)
        for (let d = 0; d < l.length; d++) {
          u = l[d];
          const m = u.fromVertex;
          u.valid && !u.rev && m.layer !== t && ((f[a] = m.column + u.portFromColOffset), a++);
        }
      if (h !== null)
        for (let d = 0; d < h.length; d++) {
          u = h[d];
          const m = u.toVertex;
          u.valid && !u.rev && m.layer !== t && ((f[a] = m.column + u.portToColOffset), a++);
        }
      if (a === 0) n[o] = -1;
      else {
        f.sort((m, g) => m - g);
        const d = a >> 1;
        (a & 1) !== 0 ? (n[o] = f[d]) : (n[o] = (f[d - 1] + f[d]) >> 1);
      }
    }
    return (this.ta(t, e), n);
  }
  Aw(t, i, e, s, n) {
    if (t.component === e) {
      t.component = i;
      let o = 0,
        r = 0;
      if (s) {
        const l = t.destinationEdges;
        for (; l.next(); ) {
          const h = l.value,
            a = h.toVertex;
          ((o = t.layer - a.layer), (r = this.linkMinLength(h)), o === r && this.Aw(a, i, e, s, n));
        }
      }
      if (n) {
        const l = t.sourceEdges;
        for (; l.next(); ) {
          const h = l.value,
            a = h.fromVertex;
          ((o = a.layer - t.layer), (r = this.linkMinLength(h)), o === r && this.Aw(a, i, e, s, n));
        }
      }
    }
  }
  xA(t, i, e, s, n) {
    if (t.component === e) {
      if (((t.component = i), s)) {
        const o = t.destinationEdges;
        for (; o.next(); ) {
          const l = o.value.toVertex;
          this.xA(l, i, e, s, n);
        }
      }
      if (n) {
        const o = t.sourceEdges;
        for (; o.next(); ) {
          const l = o.value.fromVertex;
          this.xA(l, i, e, s, n);
        }
      }
    }
  }
  removeCycles() {
    const t = this.network.edges.iterator;
    for (; t.next(); ) {
      const i = t.value;
      i.rev = false;
    }
    switch (this.mu) {
      default:
      case 1:
        this.E4();
        break;
      case 0:
        this.V4();
        break;
      case 2:
        this.B4();
        break;
    }
  }
  B4() {
    const t = this.network,
      i = t.vertexes.iterator;
    let e = 1 / 0;
    for (; i.next(); ) {
      const s = i.value;
      e = Math.min(e, s.layer);
    }
    if (e < 1 / 0) {
      if (e < 0)
        for (i.reset(); i.next(); ) {
          const r = i.value;
          r.layer -= e;
        }
      const s = [];
      for (i.reset(); i.next(); ) {
        const r = i.value,
          l = s[r.layer];
        l === void 0 ? (s[r.layer] = [r]) : l.push(r);
      }
      let n = 0;
      for (let r = 0; r < s.length; r++) {
        const l = s[r];
        if (!l || l.length === 0) n++;
        else if (r > 0)
          for (let h = 0; h < l.length; h++) {
            const a = l[h];
            a.layer -= n;
          }
      }
      const o = t.edges.iterator;
      for (; o.next(); ) {
        const r = o.value,
          l = r.fromVertex,
          h = r.toVertex;
        l.layer < h.layer && (t.reverseEdge(r), (r.rev = true));
      }
    }
  }
  E4() {
    const t = this.network;
    let i = 0,
      e = t.vertexes.count - 1;
    const s = [];
    s.length = e + 1;
    const n = t.vertexes.iterator;
    for (; n.next(); ) {
      const r = n.value;
      r.re = true;
    }
    for (; this.z4(t) !== null; ) {
      let r;
      for (r = this.bI(t); r !== null; ) ((s[e] = r), e--, (r.re = false), (r = this.bI(t)));
      for (r = this.SI(t); r !== null; ) ((s[i] = r), i++, (r.re = false), (r = this.SI(t)));
      ((r = this.X4(t)), r !== null && ((s[i] = r), i++, (r.re = false)));
    }
    for (let r = 0; r < t.vertexes.count; r++) s[r].index = r;
    const o = t.edges.iterator;
    for (; o.next(); ) {
      const r = o.value,
        l = r.fromVertex,
        h = r.toVertex;
      l.index > h.index && (t.reverseEdge(r), (r.rev = true));
    }
  }
  z4(t) {
    const i = t.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      if (e.re) return e;
    }
    return null;
  }
  bI(t) {
    const i = t.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      if (e.re) {
        let s = true;
        const n = e.destinationEdges;
        for (; n.next(); )
          if (n.value.toVertex.re) {
            s = false;
            break;
          }
        if (s) return e;
      }
    }
    return null;
  }
  SI(t) {
    const i = t.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      if (e.re) {
        let s = true;
        const n = e.sourceEdges;
        for (; n.next(); )
          if (n.value.fromVertex.re) {
            s = false;
            break;
          }
        if (s) return e;
      }
    }
    return null;
  }
  X4(t) {
    let i = null,
      e = 0;
    const s = this.network.vertexes.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (n.re) {
        let o = 0;
        const r = n.destinationEdges;
        for (; r.next(); ) r.value.toVertex.re && o++;
        let l = 0;
        const h = n.sourceEdges;
        for (; h.next(); ) h.value.fromVertex.re && l++;
        (i === null || e < o - l) && ((i = n), (e = o - l));
      }
    }
    return i;
  }
  V4() {
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const e = t.value;
      ((e.Su = -1), (e.so = -1));
    }
    const i = this.network.edges.iterator;
    for (; i.next(); ) {
      const e = i.value;
      e.forest = false;
    }
    for (this.Zg = 0, t.reset(); t.next(); ) {
      const e = t.value;
      e.sourceEdges.count === 0 && this.bA(e);
    }
    for (t.reset(); t.next(); ) {
      const e = t.value;
      e.Su === -1 && this.bA(e);
    }
    for (i.reset(); i.next(); ) {
      const e = i.value;
      if (!e.forest) {
        const s = e.fromVertex,
          n = s.Su,
          o = s.so,
          r = e.toVertex,
          l = r.Su,
          h = r.so;
        l < n && o < h && (this.network.reverseEdge(e), (e.rev = true));
      }
    }
  }
  bA(t) {
    ((t.Su = this.Zg), this.Zg++);
    const i = t.destinationEdges;
    for (; i.next(); ) {
      const e = i.value,
        s = e.toVertex;
      s.Su === -1 && ((e.forest = true), this.bA(s));
    }
    ((t.so = this.Zg), this.Zg++);
  }
  D4() {
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const s = t.value;
      s.layer = -1;
    }
    for (this.st = -1, this.assignLayers(), t.reset(); t.next(); ) {
      const s = t.value;
      this.st = Math.max(this.st, s.layer);
    }
    this.st >= 9999 && U.n("LayeredDigraphLayout, too many layers: " + this.st);
    const i = this.direction == 0 || this.direction == 180,
      e = [];
    for (const s = this.network.vertexes.iterator; s.next(); ) {
      const n = s.value;
      if (n.node === null || n.centered) continue;
      const o = n.layer;
      let r = e[o];
      r === void 0 && (r = 0);
      const l = i ? n.width : n.height;
      l > r && (e[o] = l);
    }
    for (const s = this.network.vertexes.iterator; s.next(); ) {
      const n = s.value;
      if (n.node === null || n.centered) continue;
      const o = e[n.layer];
      i
        ? ((n.focusX = o / 2), (n.focusY = n.focus.y), (n.width = o))
        : ((n.focusX = n.focus.x), (n.focusY = o / 2), (n.height = o));
    }
  }
  assignLayers() {
    switch (this.pu) {
      case 11:
        this.kI();
        break;
      case 12:
        this.Y4();
        break;
      default:
      case 10:
        this.K4();
        break;
    }
  }
  kI() {
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const i = t.value,
        e = this.MI(i);
      this.st = Math.max(e, this.st);
    }
  }
  MI(t) {
    let i = 0;
    if (t.layer === -1) {
      const e = t.destinationEdges;
      for (; e.next(); ) {
        const s = e.value,
          n = s.toVertex,
          o = this.linkMinLength(s);
        i = Math.max(i, this.MI(n) + o);
      }
      t.layer = i;
    } else i = t.layer;
    return i;
  }
  Y4() {
    let t = 0;
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      ((t = this.NI(e)), (this.st = Math.max(t, this.st)));
    }
    for (i.reset(); i.next(); ) {
      const e = i.value;
      e.layer = this.st - e.layer;
    }
  }
  NI(t) {
    let i = 0;
    if (t.layer === -1) {
      const e = t.sourceEdges;
      for (; e.next(); ) {
        const s = e.value,
          n = s.fromVertex,
          o = this.linkMinLength(s);
        i = Math.max(i, this.NI(n) + o);
      }
      t.layer = i;
    } else i = t.layer;
    return i;
  }
  K4() {
    this.kI();
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const e = t.value;
      e.re = false;
    }
    for (t.reset(); t.next(); ) {
      const e = t.value;
      e.sourceEdges.count === 0 && this.CI(e);
    }
    let i = 1 / 0;
    for (t.reset(); t.next(); ) {
      const e = t.value;
      i = Math.min(i, e.layer);
    }
    for (this.st = -1, t.reset(); t.next(); ) {
      const e = t.value;
      ((e.layer -= i), (this.st = Math.max(this.st, e.layer)));
    }
  }
  CI(t) {
    if (!t.re) {
      t.re = true;
      const i = t.destinationEdges;
      for (; i.next(); ) {
        const s = i.value.toVertex;
        this.CI(s);
      }
      (this.U4(t), this.G4(t));
    }
  }
  U4(t) {
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const r = i.value;
      r.component = -1;
    }
    const e = 0,
      s = 1,
      n = t.Ao;
    let o = n.length;
    for (let r = 0; r < o; r++) {
      const l = n[r],
        h = l.fromVertex,
        a = l.toVertex,
        f = this.linkMinLength(l);
      h.layer - a.layer > f && this.Aw(h, e, -1, true, false);
    }
    for (this.Aw(t, s, -1, true, true); t.component !== e; ) {
      let r = 0,
        l = 1 / 0,
        h = 0,
        a = null;
      const f = this.network.vertexes.iterator;
      for (; f.next(); ) {
        const c = f.value;
        if (c.component === s) {
          let u = 0,
            d = false;
          const m = c.Ao;
          o = m.length;
          for (let p = 0; p < o; p++) {
            const y = m[p],
              x = y.fromVertex;
            if (((u += this.linkLengthWeight(y)), x.component !== s)) {
              r += this.linkLengthWeight(y);
              const b = x.layer - c.layer,
                S = this.linkMinLength(y);
              l = Math.min(l, b - S);
            }
          }
          const g = c.fr;
          o = g.length;
          for (let p = 0; p < o; p++) {
            const y = g[p],
              x = y.toVertex;
            ((u -= this.linkLengthWeight(y)), x.component !== s ? (r -= this.linkLengthWeight(y)) : (d = true));
          }
          (a === null || u < h) && !d && ((a = c), (h = u));
        }
      }
      if (r > 0) {
        for (i.reset(); i.next(); ) {
          const c = i.value;
          c.component === s && (c.layer += l);
        }
        t.component = e;
      } else a.component = e;
    }
  }
  G4(t) {
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const n = i.value;
      n.component = -1;
    }
    const e = 0,
      s = 1;
    for (this.Aw(t, s, -1, true, false); t.component !== e; ) {
      let n = 0,
        o = 1 / 0,
        r = 0,
        l = null;
      const h = this.network.vertexes.iterator;
      for (; h.next(); ) {
        const a = h.value;
        if (a.component === s) {
          let f = 0,
            c = false;
          const u = a.Ao;
          let d = u.length;
          for (let g = 0; g < d; g++) {
            const p = u[g],
              y = p.fromVertex;
            ((f += this.linkLengthWeight(p)), y.component !== s ? (n += this.linkLengthWeight(p)) : (c = true));
          }
          const m = a.fr;
          d = m.length;
          for (let g = 0; g < d; g++) {
            const p = m[g],
              y = p.toVertex;
            if (((f -= this.linkLengthWeight(p)), y.component !== s)) {
              n -= this.linkLengthWeight(p);
              const x = a.layer - y.layer,
                b = this.linkMinLength(p);
              o = Math.min(o, x - b);
            }
          }
          (l === null || f > r) && !c && ((l = a), (r = f));
        }
      }
      if (n < 0) {
        for (i.reset(); i.next(); ) {
          const a = i.value;
          a.component === s && (a.layer -= o);
        }
        t.component = e;
      } else l.component = e;
    }
  }
  F4() {
    const t = this.network,
      i = [],
      e = t.edges.iterator;
    for (; e.next(); ) {
      const s = e.value;
      ((s.valid = false), i.push(s));
    }
    for (let s = 0; s < i.length; s++) {
      const n = i[s];
      let o = n.fromVertex;
      const r = n.toVertex;
      if (
        n.valid ||
        (((o.node === null && o.data === null) || (r.node === null && r.data === null)) && o.layer === r.layer)
      )
        continue;
      let l = 0,
        h = 0,
        a = 0,
        f = 0;
      if (n.link !== null) {
        const k = n.link;
        if (k === null) continue;
        const P = o.node,
          A = r.node;
        if (P === null || A === null) continue;
        let C = k.fromNode,
          M = k.toNode,
          N = k.fromPort;
        for (; N !== null && !N.isVisibleObject(); ) N = N.panel;
        let T = k.toPort;
        for (; T !== null && !T.isVisibleObject(); ) T = T.panel;
        if (n.rev) {
          const X = C,
            K = N;
          ((C = M), (N = T), (M = X), (T = K));
        }
        const L = o.focus,
          D = r.focus,
          F = n.rev ? r.bounds : o.bounds,
          R = Point.a();
        P !== C
          ? F.isReal() && C.isVisible()
            ? C.actualBounds.isReal()
              ? (C.getRelativePoint(N, Spot.Center, R),
                (R.x += C.actualBounds.x - F.x),
                (R.y += C.actualBounds.y - F.y))
              : (C.getRelativePoint(N, Spot.Center, R), R.isReal() || R.c(L))
            : R.c(L)
          : F.isReal()
            ? (C.getRelativePoint(N, Spot.Center, R), R.isReal() || R.c(L))
            : R.c(L);
        const I = n.rev ? o.bounds : r.bounds,
          O = Point.a();
        (A !== M
          ? I.isReal() && M.isVisible()
            ? M.actualBounds.isReal()
              ? (M.getRelativePoint(T, Spot.Center, O),
                (O.x += M.actualBounds.x - I.x),
                (O.y += M.actualBounds.y - I.y))
              : (M.getRelativePoint(T, Spot.Center, O), O.isReal() || O.c(D))
            : O.c(D)
          : I.isReal()
            ? (M.getRelativePoint(T, Spot.Center, O), O.isReal() || O.c(D))
            : O.c(D),
          this.N === 90 || this.N === 270
            ? ((l = Math.round((R.x - L.x) / this.ne)), (a = R.x), (h = Math.round((O.x - D.x) / this.ne)), (f = O.x))
            : ((l = Math.round((R.y - L.y) / this.ne)), (a = R.y), (h = Math.round((O.y - D.y) / this.ne)), (f = O.y)),
          Point.o(R),
          Point.o(O),
          (n.portFromColOffset = l),
          (n.portFromPos = a),
          (n.portToColOffset = h),
          (n.portToPos = f));
      } else ((n.portFromColOffset = 0), (n.portFromPos = 0), (n.portToColOffset = 0), (n.portToPos = 0));
      let c = o.layer;
      const u = r.layer,
        d = this.q4(n),
        m = d === 1 || d === 3,
        g = d === 2 || d === 3;
      let p,
        y,
        x = null,
        b;
      g &&
        ((x = this.H4(o, r)),
        (b = 1),
        (y = t.createVertex()),
        (y.node = null),
        (y.sk = 1),
        (y.layer = c),
        (y.near = o),
        t.addVertex(y),
        (p = t.linkVertexes(o, y, n.link)),
        (p.valid = false),
        (p.rev = n.rev),
        (p.portFromColOffset = l),
        (p.portToColOffset = 0),
        (p.portFromPos = a),
        (p.portToPos = 0),
        (o = y));
      let S = 1;
      if ((m && S--, c - u > S && c > 0)) {
        for (
          n.valid = false,
            y = t.createVertex(),
            y.node = null,
            y.sk = 2,
            y.layer = c - 1,
            x && b < x.length && y.layer === x[b].layer && (y.near = x[b++]),
            t.addVertex(y),
            p = t.linkVertexes(o, y, n.link),
            p.valid = true,
            p.rev = n.rev,
            p.portFromColOffset = g ? 0 : l,
            p.portToColOffset = 0,
            p.portFromPos = g ? 0 : a,
            p.portToPos = 0,
            o = y,
            c--;
          c - u > S && c > 0;
        )
          ((y = t.createVertex()),
            (y.node = null),
            (y.sk = 3),
            (y.layer = c - 1),
            x && b < x.length && y.layer === x[b].layer && (y.near = x[b++]),
            t.addVertex(y),
            (p = t.linkVertexes(o, y, n.link)),
            (p.valid = true),
            (p.rev = n.rev),
            (p.portFromColOffset = 0),
            (p.portToColOffset = 0),
            (p.portFromPos = 0),
            (p.portToPos = 0),
            (o = y),
            c--);
        ((p = t.linkVertexes(y, r, n.link)),
          (p.valid = !m),
          m && (y.near = r),
          (p.rev = n.rev),
          (p.portFromColOffset = 0),
          (p.portToColOffset = h),
          (p.portFromPos = 0),
          (p.portToPos = f));
      } else n.valid = true;
    }
  }
  q4(t) {
    let i = 0;
    const e = t.link;
    if (e !== null) {
      const s = e.fromPort,
        n = e.toPort;
      if (s !== null && n !== null) {
        const o = e.fromNode,
          r = e.toNode;
        if (o !== null && r !== null) {
          const l = this.nk(true),
            h = this.nk(false),
            a = this.setsPortSpots ? l : e.computeSpot(true, s),
            f = this.setsPortSpots ? h : e.computeSpot(false, n),
            c = e.isOrthogonal;
          if (a.isSide() && a.includesSide(h) && f.isSide() && f.includesSide(l)) return 0;
          const u = e.getLinkPoint(o, s, a, true, c, r, n, Point.a()),
            d = e.getLinkDirection(o, s, u, a, true, c, r, n);
          (Point.o(u),
            ((!a.isNone() && d === this.AI(t, true)) ||
              (this.setsPortSpots && o !== null && o.ports.count === 1 && t.rev)) &&
              (i += 1));
          const m = e.getLinkPoint(r, n, f, false, c, o, s, Point.a()),
            g = e.getLinkDirection(r, n, m, f, false, c, o, s);
          (Point.o(m),
            ((!f.isNone() && g === this.AI(t, false)) ||
              (this.setsPortSpots && r !== null && r.ports.count === 1 && t.rev)) &&
              (i += 2));
        }
      }
    }
    return i;
  }
  AI(t, i) {
    return this.N === 90
      ? (i && !t.rev) || (!i && t.rev)
        ? 270
        : 90
      : this.N === 180
        ? (i && !t.rev) || (!i && t.rev)
          ? 0
          : 180
        : this.N === 270
          ? (i && !t.rev) || (!i && t.rev)
            ? 90
            : 270
          : (i && !t.rev) || (!i && t.rev)
            ? 180
            : 0;
  }
  H4(t, i) {
    const e = [];
    return (e.push(i), this.TI(t, e) ? e.reverse() : []);
  }
  TI(t, i) {
    const e = i[i.length - 1].sourceEdges.iterator;
    for (; e.next(); ) {
      const s = e.value;
      if (s.rev || !s.valid) continue;
      const n = s.fromVertex;
      if ((i.push(n), n === t || this.TI(t, i))) return true;
      i.pop();
    }
    return false;
  }
  I4() {
    this.li.length !== this.st + 1 && (this.li = new Int16Array(this.st + 1));
    const t = this.li;
    for (let e = 0; e <= this.st; e++) t[e] = 0;
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      e.index = -1;
    }
    (this.initializeIndices(), (this.Mw = -1), (this.$g = 0), (this.Gs = 0));
    for (let e = 0; e <= this.st; e++)
      (t[e] > t[this.Gs] && ((this.Mw = t[e] - 1), (this.Gs = e)), t[e] < t[this.$g] && (this.$g = e));
    this.bu = [];
    for (let e = 0; e < t.length; e++) this.bu[e] = [];
    for (i.reset(); i.next(); ) {
      const e = i.value,
        s = e.layer,
        n = this.bu[s];
      n[e.index] = e;
    }
  }
  initializeIndices() {
    switch (this.yu) {
      default:
      case 22:
        this.v4();
        break;
      case 20:
        this.W4();
        break;
      case 21:
        this.j4();
        break;
    }
  }
  v4() {
    let t = null;
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      if (e.near && (t === null && (t = new Map()), e.layer === e.near.layer)) {
        const s = t.get(e.near) || [];
        (s.push(e), t.set(e.near, s));
      }
    }
    for (i.reset(); i.next(); ) {
      const e = i.value;
      if (e.near) continue;
      const s = e.layer;
      if (((e.index = this.li[s]), this.li[s]++, !t)) continue;
      const n = t.get(e);
      Array.isArray(n) &&
        n.forEach((o) => {
          ((o.index = this.li[s]), this.li[s]++);
        });
    }
  }
  W4() {
    let t = null;
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      if (e.near && (t === null && (t = new Map()), e.layer === e.near.layer)) {
        const s = t.get(e.near) || [];
        (s.push(e), t.set(e.near, s));
      }
    }
    for (let e = this.st; e >= 0; e--)
      for (i.reset(); i.next(); ) {
        const s = i.value;
        s.layer === e && s.index === -1 && this.LI(s, t);
      }
  }
  LI(t, i) {
    if (t.near) return;
    const e = t.layer;
    if (((t.index = this.li[e]), this.li[e]++, i)) {
      const o = i.get(t);
      Array.isArray(o) &&
        o.forEach((r) => {
          ((r.index = this.li[e]), this.li[e]++);
        });
    }
    const s = t.fr;
    let n = true;
    for (; n; ) {
      n = false;
      for (let o = 0; o < s.length - 1; o++) {
        const r = s[o],
          l = s[o + 1];
        r.portFromColOffset > l.portFromColOffset && ((n = true), (s[o] = l), (s[o + 1] = r));
      }
    }
    for (let o = 0; o < s.length; o++) {
      const r = s[o];
      if (r.valid) {
        const l = r.toVertex;
        l.index === -1 && this.LI(l, i);
      }
    }
  }
  j4() {
    let t = null;
    const i = this.network.vertexes.iterator;
    for (; i.next(); ) {
      const e = i.value;
      if (e.near && (t === null && (t = new Map()), e.layer === e.near.layer)) {
        const s = t.get(e.near) || [];
        (s.push(e), t.set(e.near, s));
      }
    }
    for (let e = 0; e <= this.st; e++)
      for (i.reset(); i.next(); ) {
        const s = i.value;
        s.layer === e && s.index === -1 && this.DI(s, t);
      }
  }
  DI(t, i) {
    if (t.near) return;
    const e = t.layer;
    if (((t.index = this.li[e]), this.li[e]++, i)) {
      const h = i.get(t);
      Array.isArray(h) &&
        h.forEach((a) => {
          ((a.index = this.li[e]), this.li[e]++);
        });
    }
    const s = t.Ao;
    let n = true,
      o = 0;
    for (; n; )
      for (n = false, o = 0; o < s.length - 1; o++) {
        const h = s[o],
          a = s[o + 1];
        h.portToColOffset > a.portToColOffset && ((n = true), (s[o] = a), (s[o + 1] = h));
      }
    let r, l;
    for (o = 0; o < s.length; o++) ((l = s[o]), l.valid && ((r = l.fromVertex), r.index === -1 && this.DI(r, i)));
  }
  R4() {
    this.Ht = -1;
    for (let t = 0; t <= this.st; t++) {
      const i = this._h(t);
      let e = 0;
      const s = this.li[t];
      for (let n = 0; n < s; n++) {
        const o = i[n];
        ((e += this.nodeMinColumnSpace(o, true)), (o.column = e), (e += 1), (e += this.nodeMinColumnSpace(o, false)));
      }
      ((this.Ht = Math.max(this.Ht, e - 1)), this.ta(t, i));
    }
  }
  reduceCrossings() {
    let t = this.countCrossings(),
      i = this.oe(),
      e = 0,
      s = 0,
      n = 0;
    for (e = 0; e < this.Sf; e++) {
      for (s = 0; s <= this.st; s++) (this.ok(s, 1), this.Ss(s, 1, false, 1));
      for (n = this.countCrossings(), n < t && ((t = n), (i = this.oe())), s = this.st; s >= 0; s--)
        (this.ok(s, -1), this.Ss(s, -1, false, -1));
      ((n = this.countCrossings()), n < t && ((t = n), (i = this.oe())));
    }
    for (this.hs(i), e = 0; e < this.Sf; e++) {
      for (s = 0; s <= this.st; s++) (this.ok(s, 0), this.Ss(s, 0, false, 0));
      for (n = this.countCrossings(), n < t && ((t = n), (i = this.oe())), s = this.st; s >= 0; s--)
        (this.ok(s, 0), this.Ss(s, 0, false, 0));
      ((n = this.countCrossings()), n < t && ((t = n), (i = this.oe())));
    }
    this.hs(i);
    let o = false,
      r = 0,
      l = 0,
      h = 0,
      a = 0;
    switch (this.wu) {
      case 30:
        break;
      case 32:
        for (h = t + 1; (a = this.countCrossings()) < h; )
          for (h = a, r = this.st; r >= 0; r--)
            for (l = 0; l <= r; l++) {
              for (o = true; o; ) for (o = false, s = r; s >= l; s--) o = this.Ss(s, -1, false, -1) || o;
              for (n = this.countCrossings(), n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
                for (o = false, s = r; s >= l; s--) o = this.Ss(s, 1, false, 1) || o;
              for (n = this.countCrossings(), n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
                for (o = false, s = l; s <= r; s++) o = this.Ss(s, 1, false, 1) || o;
              for (n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
                for (o = false, s = l; s <= r; s++) o = this.Ss(s, -1, false, -1) || o;
              for (n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
                for (o = false, s = r; s >= l; s--) o = this.Ss(s, 0, false, 0) || o;
              for (n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
                for (o = false, s = l; s <= r; s++) o = this.Ss(s, 0, false, 0) || o;
              n >= t ? this.hs(i) : ((t = n), (i = this.oe()));
            }
        break;
      default:
      case 31:
        for (r = this.st, l = 0, h = t + 1; (a = this.countCrossings()) < h; ) {
          for (h = a, o = true; o; ) for (o = false, s = r; s >= l; s--) o = this.Ss(s, -1, false, -1) || o;
          for (n = this.countCrossings(), n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
            for (o = false, s = r; s >= l; s--) o = this.Ss(s, 1, false, 1) || o;
          for (n = this.countCrossings(), n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
            for (o = false, s = l; s <= r; s++) o = this.Ss(s, 1, false, 1) || o;
          for (n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
            for (o = false, s = l; s <= r; s++) o = this.Ss(s, -1, false, -1) || o;
          for (n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
            for (o = false, s = r; s >= l; s--) o = this.Ss(s, 0, false, 0) || o;
          for (n >= t ? this.hs(i) : ((t = n), (i = this.oe())), o = true; o; )
            for (o = false, s = l; s <= r; s++) o = this.Ss(s, 0, false, 0) || o;
          n >= t ? this.hs(i) : ((t = n), (i = this.oe()));
        }
        break;
    }
    this.hs(i);
  }
  ok(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "medianBarycenterCrossingReduction:unfixedLayer"),
      U.r(i, LayeredDigraphLayout, "medianBarycenterCrossingReduction:direction"));
    let e = 0,
      s = false;
    const n = this._h(t),
      o = this.li[t],
      r = this.xI(t, i),
      l = this.Cw(t, i);
    for (e = 0; e < o; e++) (l[e] === -1 && (l[e] = n[e].column), r[e] === -1 && (r[e] = n[e].column));
    let h = true,
      a;
    for (; h; )
      for (h = false, e = 0; e < o - 1; e++)
        if (r[e + 1] < r[e] || (r[e + 1] === r[e] && l[e + 1] < l[e])) {
          ((s = true), (h = true));
          const c = r[e];
          ((r[e] = r[e + 1]), (r[e + 1] = c));
          const u = l[e];
          ((l[e] = l[e + 1]), (l[e + 1] = u), (a = n[e]), (n[e] = n[e + 1]), (n[e + 1] = a));
        }
    let f = 0;
    for (e = 0; e < o; e++)
      ((a = n[e]),
        (a.index = e),
        (f += this.nodeMinColumnSpace(a, true)),
        (a.column = f),
        (f += 1),
        (f += this.nodeMinColumnSpace(a, false)));
    return (this.ta(t, n), s);
  }
  Ss(t, i, e, s) {
    const n = this._h(t),
      o = this.li[t],
      r = this.wI(t, i);
    let l = 0,
      h;
    if (!e || s > 0) for (h = new Float32Array(o), l = 0; l < o; l++) h[l] = -1;
    else h = this.Cw(t, -1);
    let a;
    if (!e || s < 0) for (a = new Float32Array(o), l = 0; l < o; l++) a[l] = -1;
    else a = this.Cw(t, 1);
    let f = false,
      c = true;
    for (; c; )
      for (c = false, l = 0; l < o - 1; l++) {
        const u = r[n[l].index * o + n[l + 1].index],
          d = r[n[l + 1].index * o + n[l].index];
        let m = 0,
          g = 0;
        const p = n[l].column,
          y = n[l + 1].column,
          x = this.nodeMinColumnSpace(n[l], true),
          b = this.nodeMinColumnSpace(n[l], false),
          S = this.nodeMinColumnSpace(n[l + 1], true),
          k = this.nodeMinColumnSpace(n[l + 1], false),
          P = p - x + S,
          A = y - b + k;
        let C = 0,
          M = 0,
          N = 0,
          T = 0,
          L = 0,
          D = 0,
          F = 0,
          R,
          I = 0,
          O,
          X = 0;
        const K = n[l].sourceEdges.iterator;
        if (e && s <= 0)
          for (; K.next(); ) {
            const J = K.value;
            ((R = J.fromVertex),
              J.valid &&
                R.layer !== t &&
                ((N = this.linkStraightenWeight(J)),
                (T = J.portFromColOffset),
                (L = J.portToColOffset),
                (D = R.column),
                (C += (Math.abs(p + L - (D + T)) + 1) * N),
                (M += (Math.abs(A + L - (D + T)) + 1) * N)));
          }
        for (K.reset(); K.next(); ) {
          const J = K.value;
          if (((R = J.fromVertex), J.valid && R.layer === t)) {
            for (I = 0; I < n.length && n[I] !== R; ) I++;
            (I < l && ((m += 2 * (l - I)), (g += 2 * (l + 1 - I))),
              I === l + 1 && (m += 1),
              I > l + 1 && ((m += 4 * (I - l)), (g += 4 * (I - (l + 1)))));
          }
        }
        const V = n[l].destinationEdges.iterator;
        if (e && s >= 0)
          for (; V.next(); ) {
            const J = V.value;
            ((O = J.toVertex),
              J.valid &&
                O.layer !== t &&
                ((N = this.linkStraightenWeight(J)),
                (T = J.portFromColOffset),
                (L = J.portToColOffset),
                (F = O.column),
                (C += (Math.abs(p + T - (F + L)) + 1) * N),
                (M += (Math.abs(A + T - (F + L)) + 1) * N)));
          }
        for (V.reset(); V.next(); ) {
          const J = V.value;
          if (((O = J.toVertex), J.valid && O.layer === t)) {
            for (X = 0; X < n.length && n[X] !== O; ) X++;
            X === l + 1 && (g += 1);
          }
        }
        const Y = n[l + 1].sourceEdges.iterator;
        if (e && s <= 0)
          for (; Y.next(); ) {
            const J = Y.value;
            ((R = J.fromVertex),
              J.valid &&
                R.layer !== t &&
                ((N = this.linkStraightenWeight(J)),
                (T = J.portFromColOffset),
                (L = J.portToColOffset),
                (D = R.column),
                (C += (Math.abs(y + L - (D + T)) + 1) * N),
                (M += (Math.abs(P + L - (D + T)) + 1) * N)));
          }
        for (Y.reset(); Y.next(); ) {
          const J = Y.value;
          if (((R = J.fromVertex), J.valid && R.layer === t)) {
            for (I = 0; I < n.length && n[I] !== R; ) I++;
            (I < l && ((m += 2 * (l + 1 - I)), (g += 2 * (l - I))),
              I === l && (g += 1),
              I > l + 1 && ((m += 4 * (I - (l + 1))), (g += 4 * (I - l))));
          }
        }
        const z = n[l + 1].destinationEdges.iterator;
        if (e && s >= 0)
          for (; z.next(); ) {
            const J = z.value;
            ((O = J.toVertex),
              J.valid &&
                O.layer !== t &&
                ((N = this.linkStraightenWeight(J)),
                (T = J.portFromColOffset),
                (L = J.portToColOffset),
                (F = O.column),
                (C += (Math.abs(y + T - (F + L)) + 1) * N),
                (M += (Math.abs(P + T - (F + L)) + 1) * N)));
          }
        for (z.reset(); z.next(); ) {
          const J = z.value;
          if (((O = J.toVertex), J.valid && O.layer === t)) {
            for (X = 0; X < n.length && n[X] !== O; ) X++;
            X === l && (m += 1);
          }
        }
        let H = 0,
          W = 0;
        const j = h[n[l].index],
          Z = a[n[l].index],
          B = h[n[l + 1].index],
          $ = a[n[l + 1].index];
        if (
          (j !== -1 && ((H += Math.abs(j - p)), (W += Math.abs(j - A))),
          Z !== -1 && ((H += Math.abs(Z - p)), (W += Math.abs(Z - A))),
          B !== -1 && ((H += Math.abs(B - y)), (W += Math.abs(B - P))),
          $ !== -1 && ((H += Math.abs($ - y)), (W += Math.abs($ - P))),
          g < m - 0.5 ||
            (g === m && d < u - 0.5) ||
            (g === m && d === u && M < C - 0.5) ||
            (g === m && d === u && M === C && W < H - 0.5))
        ) {
          ((f = true), (c = true), (n[l].column = A), (n[l + 1].column = P));
          const J = n[l];
          ((n[l] = n[l + 1]), (n[l + 1] = J));
        }
      }
    for (l = 0; l < o; l++) n[l].index = l;
    return (this.ta(t, n), f);
  }
  straightenAndPack() {
    if (this.vn !== 0) {
      this.J4();
      return;
    }
    let t = 0,
      i = false,
      e = (this.gr & 1) !== 0;
    const s = (this.gr & 8) !== 0;
    if ((this.network.edges.count > 1e3 && s && (e = false), e)) {
      const n = [];
      let o = 0;
      for (o = 0; o <= this.st; o++) n[o] = 0;
      let r = 0;
      const l = this.network.vertexes.iterator;
      for (; l.next(); ) {
        const a = l.value;
        ((t = a.layer), (r = a.column));
        const f = this.nodeMinColumnSpace(a, false);
        n[t] = Math.max(n[t], r + f);
      }
      const h = 8;
      for (l.reset(); l.next(); ) {
        const a = l.value;
        ((t = a.layer), (r = a.column), (a.column = (((this.Ht - n[t]) * h) >> 1) + r * h));
      }
      this.Ht *= h;
    }
    if ((this.gr & 2) !== 0) {
      i = true;
      let n = 0;
      for (; i && n < this.xu; ) {
        for (i = false, t = this.Gs + 1; t <= this.st; t++) i = this._g(t, 1) || i;
        for (t = this.Gs - 1; t >= 0; t--) i = this._g(t, -1) || i;
        ((i = this._g(this.Gs, 0) || i), n++);
      }
    }
    if ((this.gr & 4) !== 0) {
      for (t = this.Gs + 1; t <= this.st; t++) this.SA(t, 1);
      for (t = this.Gs - 1; t >= 0; t--) this.SA(t, -1);
      this.SA(this.Gs, 0);
    }
    if ((e && (this.FI(-1), this.FI(1)), (this.gr & 2) !== 0)) {
      i = true;
      let n = 0;
      for (; i && n < this.xu; ) {
        for (i = false, i = this._g(this.Gs, 0) || i, t = this.Gs + 1; t <= this.st; t++) i = this._g(t, 0) || i;
        for (t = this.Gs - 1; t >= 0; t--) i = this._g(t, 0) || i;
        n++;
      }
    }
  }
  _g(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "bendStraighten:unfixedLayer"),
      U.r(i, LayeredDigraphLayout, "bendStraighten:direction"));
    let e = false;
    for (; this.$4(t, i); ) e = true;
    return e;
  }
  $4(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "shiftbendStraighten:unfixedLayer"),
      U.r(i, LayeredDigraphLayout, "shiftbendStraighten:direction"));
    let e = 0;
    const s = this._h(t),
      n = this.li[t],
      o = this.Cw(t, -1);
    if (i > 0) for (e = 0; e < n; e++) o[e] = -1;
    const r = this.Cw(t, 1);
    if (i < 0) for (e = 0; e < n; e++) r[e] = -1;
    let l = false,
      h = true;
    for (; h; )
      for (h = false, e = 0; e < n; e++) {
        const a = s[e].column,
          f = this.nodeMinColumnSpace(s[e], true),
          c = this.nodeMinColumnSpace(s[e], false);
        let u = 0;
        e - 1 < 0 || a - s[e - 1].column - 1 > f + this.nodeMinColumnSpace(s[e - 1], false) ? (u = a - 1) : (u = a);
        let d = 0;
        e + 1 >= n || s[e + 1].column - a - 1 > c + this.nodeMinColumnSpace(s[e + 1], true) ? (d = a + 1) : (d = a);
        let m = 0,
          g = 0,
          p = 0,
          y = 0,
          x = 0,
          b = 0;
        if (i <= 0) {
          const M = s[e].sourceEdges.iterator;
          for (; M.next(); ) {
            const N = M.value,
              T = N.fromVertex;
            if (N.valid && T.layer !== t) {
              ((y = this.linkStraightenWeight(N)), (x = N.portFromColOffset), (b = N.portToColOffset));
              const L = T.column;
              ((m += (Math.abs(a + b - (L + x)) + 1) * y),
                (g += (Math.abs(u + b - (L + x)) + 1) * y),
                (p += (Math.abs(d + b - (L + x)) + 1) * y));
            }
          }
        }
        if (i >= 0) {
          const M = s[e].destinationEdges.iterator;
          for (; M.next(); ) {
            const N = M.value,
              T = N.toVertex;
            if (N.valid && T.layer !== t) {
              ((y = this.linkStraightenWeight(N)), (x = N.portFromColOffset), (b = N.portToColOffset));
              const L = T.column;
              ((m += (Math.abs(a + x - (L + b)) + 1) * y),
                (g += (Math.abs(u + x - (L + b)) + 1) * y),
                (p += (Math.abs(d + x - (L + b)) + 1) * y));
            }
          }
        }
        let S = 0,
          k = 0,
          P = 0;
        const A = o[s[e].index],
          C = r[s[e].index];
        (A !== -1 && ((S += Math.abs(A - a)), (k += Math.abs(A - u)), (P += Math.abs(A - d))),
          C !== -1 && ((S += Math.abs(C - a)), (k += Math.abs(C - u)), (P += Math.abs(C - d))),
          g < m || (g === m && k < S)
            ? ((l = true), (h = true), (s[e].column = u))
            : (p < m || (p === m && P < S)) && ((l = true), (h = true), (s[e].column = d)));
      }
    return (this.ta(t, s), this.Nw(), l);
  }
  SA(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "medianStraighten:unfixedLayer"),
      U.r(i, LayeredDigraphLayout, "medianStraighten:direction"));
    let e = 0;
    const s = this._h(t),
      n = this.li[t],
      o = this.xI(t, i),
      r = new Int16Array(o);
    let l = false,
      h = true;
    for (; h; )
      for (h = false, e = 0; e < n; e++) {
        const a = s[e].column,
          f = this.nodeMinColumnSpace(s[e], true),
          c = this.nodeMinColumnSpace(s[e], false);
        let u = 0,
          d = 0,
          m = 0,
          g = 0,
          p = 0;
        (r[e] === -1
          ? e === 0 && e === n - 1
            ? (u = a)
            : e === 0
              ? ((d = s[e + 1].column), d - a === c + this.nodeMinColumnSpace(s[e + 1], true) ? (u = a - 1) : (u = a))
              : e === n - 1
                ? ((m = s[e - 1].column), a - m === f + this.nodeMinColumnSpace(s[e - 1], false) ? (u = a + 1) : (u = a))
                : ((m = s[e - 1].column),
                  (p = m + this.nodeMinColumnSpace(s[e - 1], false) + f + 1),
                  (d = s[e + 1].column),
                  (g = d - this.nodeMinColumnSpace(s[e + 1], true) - c - 1),
                  (u = ((p + g) / 2) | 0))
          : e === 0 && e === n - 1
            ? (u = r[e])
            : e === 0
              ? ((d = s[e + 1].column),
                (g = d - this.nodeMinColumnSpace(s[e + 1], true) - c - 1),
                (u = Math.min(r[e], g)))
              : e === n - 1
                ? ((m = s[e - 1].column),
                  (p = m + this.nodeMinColumnSpace(s[e - 1], false) + f + 1),
                  (u = Math.max(r[e], p)))
                : ((m = s[e - 1].column),
                  (p = m + this.nodeMinColumnSpace(s[e - 1], false) + f + 1),
                  (d = s[e + 1].column),
                  (g = d - this.nodeMinColumnSpace(s[e + 1], true) - c - 1),
                  p < r[e] && r[e] < g ? (u = r[e]) : p >= r[e] ? (u = p) : g <= r[e] && (u = g)),
          u !== a && ((l = true), (h = true), (s[e].column = u)));
      }
    return (this.ta(t, s), this.Nw(), l);
  }
  Z4() {
    for (let t = 0; t <= this.Ht; t++) for (; this.Q4(t, 1); );
    this.Nw();
  }
  Q4(t, i) {
    Debug && (U.r(t, LayeredDigraphLayout, "packAux:column"), U.r(i, LayeredDigraphLayout, "packAux:direction"));
    let e = true;
    const s = this.network.vertexes.iterator;
    for (; s.next(); ) {
      const o = s.value,
        r = this.nodeMinColumnSpace(o, true),
        l = this.nodeMinColumnSpace(o, false);
      if (o.column - r <= t && o.column + l >= t) {
        e = false;
        break;
      }
    }
    let n = false;
    if (e) {
      if (i > 0)
        for (s.reset(); s.next(); ) {
          const o = s.value;
          o.column > t && ((o.column -= 1), (n = true));
        }
      if (i < 0)
        for (s.reset(); s.next(); ) {
          const o = s.value;
          o.column < t && ((o.column += 1), (n = true));
        }
    }
    return n;
  }
  _4() {
    this.Z4();
    for (let t = 0; t < this.Ht; t++) for (; this.tV(t, 1); );
    this.Nw();
  }
  tV(t, i) {
    Debug &&
      (U.r(t, LayeredDigraphLayout, "tightPackAux:column"), U.r(i, LayeredDigraphLayout, "tightPackAux:direction"));
    let e = t;
    (i > 0 && (e = t + 1), i < 0 && (e = t - 1));
    let s = 0;
    const n = [],
      o = [];
    for (s = 0; s <= this.st; s++) ((n[s] = false), (o[s] = false));
    const r = this.network.vertexes.iterator;
    for (; r.next(); ) {
      const a = r.value,
        f = a.column - this.nodeMinColumnSpace(a, true),
        c = a.column + this.nodeMinColumnSpace(a, false);
      (f <= t && c >= t && (n[a.layer] = true), f <= e && c >= e && (o[a.layer] = true));
    }
    let l = true,
      h = false;
    for (s = 0; s <= this.st; s++) l = l && !(n[s] && o[s]);
    if (l) {
      if (i > 0)
        for (r.reset(); r.next(); ) {
          const a = r.value;
          a.column > t && ((a.column -= 1), (h = true));
        }
      if (i < 0)
        for (r.reset(); r.next(); ) {
          const a = r.value;
          a.column < t && ((a.column += 1), (h = true));
        }
    }
    return h;
  }
  FI(t) {
    (Debug && U.r(t, LayeredDigraphLayout, "componentPack:direction"), this._4());
    let i = 0,
      e,
      s = 0,
      n = 0,
      o = 0;
    if (t > 0)
      for (i = 0; i <= this.Ht; i++)
        for (e = this.oe(), s = this.ek(true), n = s + 1; s < n; )
          ((n = s), this.II(i, 1), (o = this.ek(true)), o > s ? this.hs(e) : o < s && ((s = o), (e = this.oe())));
    if (t < 0)
      for (i = this.Ht; i >= 0; i--)
        for (e = this.oe(), s = this.ek(true), n = s + 1; s < n; )
          ((n = s), this.II(i, -1), (o = this.ek(true)), o > s ? this.hs(e) : o < s && ((s = o), (e = this.oe())));
    this.Nw();
  }
  II(t, i) {
    this.mn = 0;
    const e = this.network.vertexes.iterator;
    for (; e.next(); ) {
      const f = e.value;
      f.component = -1;
    }
    if (i > 0)
      for (e.reset(); e.next(); ) {
        const f = e.value;
        f.column - this.nodeMinColumnSpace(f, true) <= t && (f.component = this.mn);
      }
    if (i < 0)
      for (e.reset(); e.next(); ) {
        const f = e.value;
        f.column + this.nodeMinColumnSpace(f, false) >= t && (f.component = this.mn);
      }
    for (this.mn++, e.reset(); e.next(); ) {
      const f = e.value;
      f.component === -1 && (this.xA(f, this.mn, -1, true, true), this.mn++);
    }
    let s = 0;
    const n = [];
    for (s = 0; s < this.mn * this.mn; s++) n[s] = false;
    const o = [];
    for (s = 0; s < (this.st + 1) * (this.Ht + 1); s++) o[s] = -1;
    for (e.reset(); e.next(); ) {
      const f = e.value,
        c = f.layer,
        u = Math.max(0, f.column - this.nodeMinColumnSpace(f, true)),
        d = Math.min(this.Ht, f.column + this.nodeMinColumnSpace(f, false));
      for (let m = u; m <= d; m++) o[c * (this.Ht + 1) + m] = f.component;
    }
    for (let f = 0; f <= this.st; f++) {
      if (i > 0)
        for (let c = 0; c < this.Ht; c++)
          o[f * (this.Ht + 1) + c] !== -1 &&
            o[f * (this.Ht + 1) + c + 1] !== -1 &&
            o[f * (this.Ht + 1) + c] !== o[f * (this.Ht + 1) + c + 1] &&
            (n[o[f * (this.Ht + 1) + c] * this.mn + o[f * (this.Ht + 1) + c + 1]] = true);
      if (i < 0)
        for (let c = this.Ht; c > 0; c--)
          o[f * (this.Ht + 1) + c] !== -1 &&
            o[f * (this.Ht + 1) + c - 1] !== -1 &&
            o[f * (this.Ht + 1) + c] !== o[f * (this.Ht + 1) + c - 1] &&
            (n[o[f * (this.Ht + 1) + c] * this.mn + o[f * (this.Ht + 1) + c - 1]] = true);
    }
    const r = [];
    for (s = 0; s < this.mn; s++) r[s] = true;
    const l = [];
    l.push(0);
    let h = 0;
    for (; l.length !== 0; )
      if (((h = l[l.length - 1]), l.pop(), r[h]))
        for (r[h] = false, s = 0; s < this.mn; s++) n[h * this.mn + s] && l.splice(0, 0, s);
    let a = false;
    if (i > 0)
      for (e.reset(); e.next(); ) {
        const f = e.value;
        r[f.component] && ((f.column -= 1), (a = true));
      }
    if (i < 0)
      for (e.reset(); e.next(); ) {
        const f = e.value;
        r[f.component] && ((f.column += 1), (a = true));
      }
    return a;
  }
  J4() {
    const t = U.ht(),
      i = this.bu.length;
    for (let u = 0; u <= i; u++) t[u] = [];
    const e = this.network.vertexes.iterator;
    for (; e.next(); ) {
      const u = e.value,
        d = i - u.layer,
        m = t[d];
      m[u.index] = u;
    }
    const s = new GSet();
    this.iV(t, s);
    let n = null,
      o = null,
      r = null,
      l = null;
    const h = (this.vn & 1) !== 0,
      a = (this.vn & 2) !== 0,
      f = (this.vn & 4) !== 0,
      c = (this.vn & 8) !== 0;
    (h && (this.gl(t, s, true), (n = this.rk(t, true, false))),
      t.reverse(),
      f && (this.gl(t, s, false), (r = this.rk(t, false, false))));
    for (const u of t) u.reverse();
    (c && (this.gl(t, s, false), (l = this.rk(t, false, true))),
      t.reverse(),
      a && (this.gl(t, s, true), (o = this.rk(t, true, true))),
      U.et(t),
      this.eV(n, o, r, l),
      this.network.vertexes.each((u) => {
        const d = u,
          m = U.ht();
        (h && m.push(n.get(d)),
          a && m.push(o.get(d)),
          f && m.push(r.get(d)),
          c && m.push(l.get(d)),
          m.sort((b, S) => b - S));
        const g = m.length,
          p = Math.floor((g - 1) / 2),
          y = Math.ceil((g - 1) / 2),
          x = (m[p] + m[y]) / 2;
        (U.et(m), (d.we = x));
      }));
  }
  iV(t, i) {
    const e = t.length;
    for (let s = 1; s < e - 1; s++) {
      let n = 0,
        o = 0;
      const r = t[s],
        l = t[s + 1];
      for (let h = 0; o < l.length; h++) {
        const a = l[h],
          f = this.sV(a);
        if (h === l.length - 1 || f) {
          let c = r.length - 1;
          for (f && (c = a.getProperSourceVertexes()[0].index); o <= h; ) {
            const d = l[o].getProperSourceEdges();
            for (const m of d) {
              const p = m.fromVertex.index;
              (p < n || p > c) && i.add(m);
            }
            o++;
          }
          n = c;
        }
      }
    }
  }
  sV(t) {
    if (t.node === null) {
      const i = t.getProperSourceVertexes();
      if (i.length > 0) return i[0].node === null;
    }
    return false;
  }
  gl(t, i, e) {
    this.nV(t);
    for (const s of t) {
      let n = -1;
      for (const o of s) {
        const r = e ? o.getProperSourceVertexes() : o.getProperDestinationVertexes(),
          l = r.length;
        if (l > 0) {
          r.sort((a, f) => a.ia - f.ia);
          const h = (l - 1) / 2;
          for (let a = Math.floor(h), f = Math.ceil(h); a <= f; a++)
            if (o.Wn === o) {
              const c = r[a];
              let u;
              (e ? (u = c.getDestinationEdge(o)) : (u = o.getDestinationEdge(c)),
                !i.has(u) && n < c.ia && ((c.Wn = o), (o.kf = c.kf), (o.Wn = c.kf), (n = c.ia)));
            }
        }
      }
    }
  }
  nV(t) {
    for (let i = 0; i < t.length; i++) {
      const e = t[i];
      for (let s = 0; s < e.length; s++) {
        const n = e[s];
        ((n.kf = n), (n.Wn = n), (n.RI = i), (n.ia = s));
      }
    }
  }
  rk(t, i, e) {
    const s = this.N === 90 || this.N === 270;
    for (const o of t) for (const r of o) ((r.as = r), (r.ku = 1 / 0), (r.we = NaN), (r.jn = 0));
    this.oV(t, i, e);
    for (const o of t) for (const r of o) r.kf === r && this.OI(r, t);
    for (let o = 0; o < t.length; o++) {
      if (t[o].length <= 0) continue;
      const r = t[o][0];
      if (r.as === r) {
        r.as.ku === 1 / 0 && (r.as.ku = 0);
        let l = o,
          h = 0,
          a;
        do {
          for (a = t[l][h]; a.Wn !== a.kf; )
            if (((a = a.Wn), l++, a.ia > 0)) {
              const f = this.EI(a, t),
                c = s ? f.width : f.height,
                u = a.as.ku + a.we + a.jn - (f.we + f.jn + c + this.columnSpacing);
              f.as.ku = Math.min(f.as.ku, u);
            }
          h = a.ia + 1;
        } while (l < t.length && h < t[l].length && a.as === t[l][h].as);
      }
    }
    const n = new GMap();
    for (const o of t)
      for (const r of o) {
        r.we = r.we + r.as.ku + r.jn;
        const l = s ? r.width : r.height;
        n.set(r, e ? -r.we - l : r.we);
      }
    return n;
  }
  oV(t, i, e) {
    const s = this.N === 90 || this.N === 270;
    for (const n of t)
      for (const o of n)
        if (o.kf === o) {
          let r = 0,
            l = o;
          for (; l.Wn !== o; ) {
            const h = l.Wn,
              a = s ? l.width : l.height,
              f = s ? h.width : h.height;
            let c, u, d, m;
            (i
              ? ((d = l.getDestinationEdge(h)),
                (c = d.portFromPos),
                (u = d.portToPos),
                d.link !== null &&
                  (l.node && l.node !== d.link.fromNode && (c = s ? l.focusX : l.focusY),
                  h.node && h.node !== d.link.toNode && (u = s ? h.focusX : h.focusY)),
                e ? (m = l.jn + (a - c) - (f - u)) : (m = l.jn + c - u))
              : ((d = h.getDestinationEdge(l)),
                (c = d.portToPos),
                (u = d.portFromPos),
                d.link !== null &&
                  (l.node && l.node !== d.link.toNode && (c = s ? l.focusX : l.focusY),
                  h.node && h.node !== d.link.fromNode && (u = s ? h.focusX : h.focusY)),
                e ? (m = l.jn + (a - c) - (f - u)) : (m = l.jn + c - u)),
              (h.jn = m),
              (r = Math.min(r, m)),
              (l = l.Wn));
          }
          l = o;
          do ((l.jn = l.jn - r), (l = l.Wn));
          while (l !== o);
        }
  }
  OI(t, i) {
    if (!isNaN(t.we)) return;
    t.we = 0;
    let e = t;
    do {
      if (e.ia > 0) {
        const s = this.EI(e, i),
          n = s.kf;
        (this.OI(n, i), t.as === t && (t.as = n.as));
        const o = this.N === 90 || this.N === 270 ? s.width : s.height;
        if (t.as === n.as) {
          const r = n.we + s.jn + o - e.jn + this.columnSpacing;
          t.we = Math.max(t.we, r);
        }
      }
      e = e.Wn;
    } while (e !== t);
    for (; e.Wn !== t; ) ((e = e.Wn), (e.we = t.we), (e.as = t.as));
  }
  EI(t, i) {
    const e = t.RI,
      s = t.ia;
    return (s < 1 && U.n("Could not determine previous vertex in layer"), i[e][s - 1]);
  }
  eV(...t) {
    let i = -1;
    const e = U.ht(),
      s = U.ht();
    let n = 1 / 0;
    for (let o = 0; o < 4; o++) {
      if (!t[o]) continue;
      const r = this.rV(t[o], e, s, o);
      r < n && ((i = o), (n = r));
    }
    for (let o = 0; o < 4; o++) {
      const r = t[o];
      if (!r) continue;
      const l = o === 0 || o === 2 ? e[i] - e[o] : s[i] - s[o];
      l !== 0 &&
        r.each((h) => {
          r.set(h.key, h.value + l);
        });
    }
    (U.et(e), U.et(s));
  }
  rV(t, i, e, s) {
    if (!t || t.count === 0) return ((i[s] = 0), (e[s] = 0), 1 / 0);
    let n = 1 / 0,
      o = -1 / 0;
    return (
      t.each((r) => {
        const l = r.key,
          h = r.value,
          a = this.N === 90 || this.N === 270 ? l.width : l.height;
        (h < n && (n = h), h + a > o && (o = h + a));
      }),
      (i[s] = n),
      (e[s] = o),
      o - n
    );
  }
  commitLayout() {
    (this.Pw(), this.commitNodes(), this.kA(), this.isRouting && this.commitLinks());
  }
  Pw() {
    if (!this.setsPortSpots) return;
    const t = this.nk(true),
      i = this.nk(false),
      e = this.network.edges.iterator;
    for (; e.next(); ) {
      const n = e.value.link;
      n !== null && ((n.fromSpot = t), (n.toSpot = i));
    }
  }
  nk(t) {
    return this.N === 270
      ? t
        ? Spot.MiddleTop
        : Spot.MiddleBottom
      : this.N === 90
        ? t
          ? Spot.MiddleBottom
          : Spot.MiddleTop
        : this.N === 180
          ? t
            ? Spot.MiddleLeft
            : Spot.MiddleRight
          : t
            ? Spot.MiddleRight
            : Spot.MiddleLeft;
  }
  commitNodes() {
    (this.qs.length !== this.st + 1 && (this.qs = new Float32Array(this.st + 1)),
      this.xs.length !== this.st + 1 && (this.xs = new Float32Array(this.st + 1)),
      this.bs.length !== this.st + 1 && (this.bs = new Float32Array(this.st + 1)),
      this.zt.length !== this.st + 1 && (this.zt = new Float32Array(this.st + 1)));
    for (let d = 0; d <= this.st; d++) ((this.qs[d] = 0), (this.xs[d] = 0), (this.bs[d] = 0), (this.zt[d] = 0));
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const d = t.value,
        m = d.layer;
      ((this.qs[m] = Math.max(this.qs[m], this.nodeMinLayerSpace(d, true))),
        (this.xs[m] = Math.max(this.xs[m], this.nodeMinLayerSpace(d, false))));
    }
    let i = 0;
    const e = this.Us;
    for (let d = 0; d <= this.st; d++) {
      let m = e;
      (this.qs[d] + this.xs[d] <= 0 && (m = 0),
        d > 0 && (i += m / 2),
        this.N === 90 || this.N === 0
          ? ((i += this.xs[d]), (this.bs[d] = i), (i += this.qs[d]))
          : ((i += this.qs[d]), (this.bs[d] = i), (i += this.xs[d])),
        d < this.st && (i += m / 2),
        (this.zt[d] = i));
    }
    const s = i,
      n = this.arrangementOrigin;
    for (let d = 0; d <= this.st; d++)
      this.N === 270
        ? (this.bs[d] = n.y + this.bs[d])
        : this.N === 90
          ? ((this.bs[d] = n.y + s - this.bs[d]), (this.zt[d] = s - this.zt[d]))
          : this.N === 180
            ? (this.bs[d] = n.x + this.bs[d])
            : ((this.bs[d] = n.x + s - this.bs[d]), (this.zt[d] = s - this.zt[d]));
    const o = this.vn !== 0;
    t.reset();
    const r = this.N === 270 || this.N === 90;
    let l = 1 / 0,
      h = 1 / 0,
      a = 1 / 0,
      f = -1 / 0;
    for (; t.next(); ) {
      const d = t.value,
        m = d.layer,
        g = d.column | 0;
      let p = 0,
        y = 0;
      (r ? ((p = n.x + this.ne * g), (y = this.bs[m])) : ((p = this.bs[m]), (y = n.y + this.ne * g)),
        (d.centerX = p),
        (d.centerY = y),
        o &&
          isFinite(d.we) &&
          (r
            ? d.node
              ? (d.x = n.x + d.we)
              : (d.centerX = n.x + d.we)
            : d.node
              ? (d.y = n.y + d.we)
              : (d.centerY = n.y + d.we)),
        (l = Math.min(d.x, l)),
        (h = Math.min(d.y, h)),
        r ? ((a = l), (f = Math.max(f, d.bounds.right))) : ((a = h), (f = Math.max(f, d.bounds.bottom))));
    }
    this.wA = f - a;
    const c = n.x - l,
      u = n.y - h;
    for (this.pr = new Point(o && r ? 0 : c, o && !r ? 0 : u), t.reset(); t.next(); ) {
      const d = t.value;
      ((d.x += c), (d.y += u), d.commit());
    }
  }
  kA() {
    let t = 0;
    const i = this.Us;
    for (let n = 0; n <= this.st; n++) ((t += this.qs[n]), (t += this.xs[n]));
    t += this.st * i;
    const e = [],
      s = this.vn !== 0 ? this.wA : this.ne * this.Ht;
    for (let n = this.maxLayer; n >= 0; n--)
      this.N === 270
        ? n === 0
          ? e.push(new Rect(0, 0, s, Math.abs(this.zt[0])))
          : e.push(new Rect(0, this.zt[n - 1], s, Math.abs(this.zt[n - 1] - this.zt[n])))
        : this.N === 90
          ? n === 0
            ? e.push(new Rect(0, this.zt[0], s, Math.abs(this.zt[0] - t)))
            : e.push(new Rect(0, this.zt[n], s, Math.abs(this.zt[n - 1] - this.zt[n])))
          : this.N === 180
            ? n === 0
              ? e.push(new Rect(0, 0, Math.abs(this.zt[0]), s))
              : e.push(new Rect(this.zt[n - 1], 0, Math.abs(this.zt[n - 1] - this.zt[n]), s))
            : n === 0
              ? e.push(new Rect(this.zt[0], 0, Math.abs(this.zt[0] - t), s))
              : e.push(new Rect(this.zt[n], 0, Math.abs(this.zt[n - 1] - this.zt[n]), s));
    this.commitLayers(e, this.pr);
  }
  commitLayers(t, i) {}
  commitLinks() {
    const t = this.network.edges.iterator;
    let i = null;
    for (; t.next(); )
      ((i = t.value.link), i !== null && i.pointsCount > 0 && (i.startRoute(), i.clearPoints(), i.commitRoute()));
    for (t.reset(); t.next(); ) ((i = t.value.link), i !== null && i.updateRoute());
    for (t.reset(); t.next(); ) {
      const e = t.value;
      if (((i = e.link), i === null || i.pointsCount === 0)) continue;
      i.startRoute();
      const s = i;
      let n = s.fromNode,
        o = s.toNode,
        r = s.fromPort,
        l = s.toPort;
      if (n !== null) {
        const N = n.findVisibleNode();
        N !== null && N !== n && ((n = N), (r = N.port));
      }
      if (o !== null) {
        const N = o.findVisibleNode();
        N !== null && N !== o && ((o = N), (l = N.port));
      }
      const h = i.computeSpot(true, r),
        a = i.computeSpot(false, l);
      let f = e.fromVertex,
        c = e.toVertex;
      if (e.valid) {
        if (i.curve === 9 && i.pointsCount === 4)
          if (f.column === c.column && this.alignOption === 0) {
            const N = i.getLinkPoint(n, r, h, true, false, o, l),
              T = i.getLinkPoint(o, l, a, false, false, n, r);
            (N.isReal() || N.set(n.actualBounds.center),
              T.isReal() || T.set(o.actualBounds.center),
              i.clearPoints(),
              i.addPointAt(N.x, N.y),
              i.addPointAt((2 * N.x + T.x) / 3, (2 * N.y + T.y) / 3),
              i.addPointAt((N.x + 2 * T.x) / 3, (N.y + 2 * T.y) / 3),
              i.addPointAt(T.x, T.y));
          } else {
            let N = false,
              T = false;
            if ((r !== null && i.Nl(h) && (N = true), l !== null && i.Nl(a) && (T = true), N || T)) {
              let L = null;
              N &&
                ((L = i.getLinkPointFromPoint(n, r, r.getDocumentPoint(Spot.Center), i.getPoint(3), true)),
                L.isReal() || L.set(n.actualBounds.center),
                i.setPointAt(0, L.x, L.y));
              let D = null;
              if (
                (T &&
                  ((D = i.getLinkPointFromPoint(o, l, l.getDocumentPoint(Spot.Center), i.getPoint(0), false)),
                  D.isReal() || D.set(o.actualBounds.center),
                  i.setPointAt(3, D.x, D.y)),
                L)
              ) {
                const F = i.getPoint(2);
                i.setPointAt(1, (L.x * 2 + F.x) / 3, (L.y * 2 + F.y) / 3);
              }
              if (D) {
                const F = i.getPoint(1);
                i.setPointAt(2, (D.x * 2 + F.x) / 3, (D.y * 2 + F.y) / 3);
              }
            }
          }
        i.commitRoute();
        continue;
      }
      if (f.layer === c.layer) {
        i.commitRoute();
        continue;
      }
      let u = false,
        d = false;
      const m = this.Us;
      let g = 0,
        p = i.firstPickIndex + 1;
      if (i.isOrthogonal) ((d = true), (g = i.pointsCount), g > 4 && i.points.removeRange(2, g - 3));
      else if (i.curve === 9)
        ((u = true), (g = i.pointsCount), g > 4 && i.points.removeRange(2, g - 3), g === 4 && (p = 2));
      else {
        g = i.pointsCount;
        const N = h === Spot.None,
          T = a === Spot.None;
        g > 2 && N && T
          ? i.points.removeRange(1, g - 2)
          : g > 3 && N && !T
            ? i.points.removeRange(1, g - 3)
            : g > 3 && !N && T
              ? i.points.removeRange(2, g - 2)
              : g > 4 && !N && !T && i.points.removeRange(2, g - 3);
      }
      let y,
        x,
        b = 0,
        S = 0,
        k = 0,
        P = 0,
        A = 0,
        C = 0,
        M = 0;
      if (e.rev) {
        let N = 0;
        for (; c !== null && f !== c; ) {
          ((y = null), (x = null));
          const T = c.sourceEdges.iterator;
          for (; T.next(); ) {
            const L = T.value;
            if (L.link === e.link && ((y = L.fromVertex), (x = L.toVertex), y.node === null)) break;
          }
          if (y === null) break;
          if (y !== f)
            if (((b = i.getPoint(p - 1).x), (S = i.getPoint(p - 1).y), (k = y.centerX), (P = y.centerY), d))
              this.N === 180 || this.N === 0
                ? p === i.firstPickIndex + 1
                  ? (i.insertPointAt(p++, b, S), i.insertPointAt(p++, b, P))
                  : (x !== null ? x.centerY : S) !== P &&
                    ((A = this.zt[y.layer - 1] + this.pr.x), i.insertPointAt(p++, A, S), i.insertPointAt(p++, A, P))
                : p === i.firstPickIndex + 1
                  ? (i.insertPointAt(p++, b, S), i.insertPointAt(p++, k, S))
                  : (x !== null ? x.centerX : b) !== k &&
                    ((A = this.zt[y.layer - 1] + this.pr.y), i.insertPointAt(p++, b, A), i.insertPointAt(p++, k, A));
            else if (p === i.firstPickIndex + 1)
              if (((C = Math.max(10, this.qs[c.layer])), (M = Math.max(10, this.xs[c.layer])), u))
                this.N === 180
                  ? k <= c.bounds.x
                    ? ((N = c.bounds.x),
                      i.insertPointAt(p++, N - C, P),
                      i.insertPointAt(p++, N, P),
                      i.insertPointAt(p++, N + M, P))
                    : (i.insertPointAt(p++, k - C, P), i.insertPointAt(p++, k, P), i.insertPointAt(p++, k + M, P))
                  : this.N === 90
                    ? P >= c.bounds.bottom
                      ? ((N = c.bounds.y + c.bounds.height),
                        i.insertPointAt(p++, k, N + M),
                        i.insertPointAt(p++, k, N),
                        i.insertPointAt(p++, k, N - C))
                      : (i.insertPointAt(p++, k, P + M), i.insertPointAt(p++, k, P), i.insertPointAt(p++, k, P - C))
                    : this.N === 270
                      ? P <= c.bounds.y
                        ? ((N = c.bounds.y),
                          i.insertPointAt(p++, k, N - C),
                          i.insertPointAt(p++, k, N),
                          i.insertPointAt(p++, k, N + M))
                        : (i.insertPointAt(p++, k, P - C), i.insertPointAt(p++, k, P), i.insertPointAt(p++, k, P + M))
                      : this.N === 0 &&
                        (k >= c.bounds.right
                          ? ((N = c.bounds.x + c.bounds.width),
                            i.insertPointAt(p++, N + M, P),
                            i.insertPointAt(p++, N, P),
                            i.insertPointAt(p++, N - C, P))
                          : (i.insertPointAt(p++, k + M, P),
                            i.insertPointAt(p++, k, P),
                            i.insertPointAt(p++, k - C, P)));
              else {
                i.insertPointAt(p++, b, S);
                let L = 0;
                (this.N === 180 || this.N === 0
                  ? ((this.N === 180 ? k >= c.bounds.right : k <= c.bounds.x) && (L = (this.N === 0 ? -C : M) / 2),
                    i.insertPointAt(p++, b + L, P))
                  : ((this.N === 270 ? P >= c.bounds.bottom : P <= c.bounds.y) && (L = (this.N === 90 ? -C : M) / 2),
                    i.insertPointAt(p++, k, S + L)),
                  i.insertPointAt(p++, k, P));
              }
            else
              ((C = Math.max(10, this.qs[y.layer])),
                (M = Math.max(10, this.xs[y.layer])),
                u
                  ? this.N === 180
                    ? (i.insertPointAt(p++, k - C - Math.max(10, m), P),
                      i.insertPointAt(p++, Math.min(k - C + m / 2, k), P),
                      i.insertPointAt(p++, k, P),
                      i.insertPointAt(p++, k, P),
                      i.insertPointAt(p++, Math.max(k + M - m / 2, k), P),
                      i.insertPointAt(p++, k + M + m, P))
                    : this.N === 90
                      ? (i.insertPointAt(p++, k, P + M + Math.max(10, m)),
                        i.insertPointAt(p++, k, Math.max(P + M - m / 2, P)),
                        i.insertPointAt(p++, k, P),
                        i.insertPointAt(p++, k, P),
                        i.insertPointAt(p++, k, Math.min(P - C + m / 2, P)),
                        i.insertPointAt(p++, k, P - C - m))
                      : this.N === 270
                        ? (i.insertPointAt(p++, k, P - C - Math.max(10, m)),
                          i.insertPointAt(p++, k, Math.min(P - C + m / 2, P)),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, k, Math.max(P + M - m / 2, P)),
                          i.insertPointAt(p++, k, P + M + m))
                        : (i.insertPointAt(p++, k + M + Math.max(10, m), P),
                          i.insertPointAt(p++, Math.max(k + M - m / 2, k), P),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, Math.min(k - C + m / 2, k), P),
                          i.insertPointAt(p++, k - C - m, P))
                  : (this.N === 180 || this.N === 90 || this.N, i.insertPointAt(p++, k, P)));
          c = y;
        }
        if (l === null || h !== Spot.None || d)
          if (((b = i.getPoint(p - 1).x), (S = i.getPoint(p - 1).y), (k = i.getPoint(p).x), (P = i.getPoint(p).y), d)) {
            const T = this.xs[f.layer];
            let L = 0;
            this.N === 180 || this.N === 0
              ? ((L = S),
                L >= f.bounds.y &&
                  L <= f.bounds.bottom &&
                  (this.N === 180 ? k >= f.bounds.x : k <= f.bounds.right) &&
                  ((N = f.centerX + (this.N === 180 ? -T : T)),
                  L < f.bounds.y + f.bounds.height / 2
                    ? (L = f.bounds.y - this.ne / 2)
                    : (L = f.bounds.bottom + this.ne / 2),
                  i.insertPointAt(p++, N, S),
                  i.insertPointAt(p++, N, L)),
                i.insertPointAt(p++, k, L),
                i.insertPointAt(p++, k, P))
              : ((L = b),
                L >= f.bounds.x &&
                  L <= f.bounds.right &&
                  (this.N === 270 ? P >= f.bounds.y : P <= f.bounds.bottom) &&
                  ((N = f.centerY + (this.N === 270 ? -T : T)),
                  L < f.bounds.x + f.bounds.width / 2
                    ? (L = f.bounds.x - this.ne / 2)
                    : (L = f.bounds.right + this.ne / 2),
                  i.insertPointAt(p++, b, N),
                  i.insertPointAt(p++, L, N)),
                i.insertPointAt(p++, L, P),
                i.insertPointAt(p++, k, P));
          } else if (u)
            ((C = Math.max(10, this.qs[f.layer])),
              (M = Math.max(10, this.xs[f.layer])),
              this.N === 180 && k >= f.bounds.x
                ? ((N = f.bounds.x + f.bounds.width), i.setPointAt(p - 2, N, S), i.setPointAt(p - 1, N + M, S))
                : this.N === 90 && P <= f.bounds.bottom
                  ? ((N = f.bounds.y), i.setPointAt(p - 2, b, N), i.setPointAt(p - 1, b, N - C))
                  : this.N === 270 && P >= f.bounds.y
                    ? ((N = f.bounds.y + f.bounds.height), i.setPointAt(p - 2, b, N), i.setPointAt(p - 1, b, N + M))
                    : this.N === 0 &&
                      k <= f.bounds.right &&
                      ((N = f.bounds.x), i.setPointAt(p - 2, N, S), i.setPointAt(p - 1, N - C, S)));
          else {
            ((C = Math.max(10, this.qs[f.layer])), (M = Math.max(10, this.xs[f.layer])));
            let T = 0;
            (this.N === 180 || this.N === 0
              ? ((this.N === 180 ? k <= f.bounds.x : k >= f.bounds.right) && (T = (this.N === 0 ? M : -C) / 2),
                i.insertPointAt(p++, k + T, S))
              : ((this.N === 270 ? P <= f.bounds.y : P >= f.bounds.bottom) && (T = (this.N === 90 ? M : -C) / 2),
                i.insertPointAt(p++, b, P + T)),
              i.insertPointAt(p++, k, P));
          }
      } else {
        for (; f !== null && f !== c; ) {
          ((y = null), (x = null));
          const N = f.destinationEdges.iterator;
          for (; N.next(); ) {
            const T = N.value;
            if (
              T.link === e.link &&
              ((y = T.toVertex), (x = T.fromVertex), x.node !== null && (x = null), y.node === null)
            )
              break;
          }
          if (y === null) break;
          (y !== c &&
            ((b = i.getPoint(p - 1).x),
            (S = i.getPoint(p - 1).y),
            (k = y.centerX),
            (P = y.centerY),
            d
              ? this.N === 180 || this.N === 0
                ? (x !== null ? x.centerY : S) !== P &&
                  ((A = this.zt[y.layer] + this.pr.x),
                  p === i.firstPickIndex + 1 && (this.N === 0 ? (A = Math.max(A, b)) : (A = Math.min(A, b))),
                  i.insertPointAt(p++, A, S),
                  i.insertPointAt(p++, A, P))
                : (x !== null ? x.centerX : b) !== k &&
                  ((A = this.zt[y.layer] + this.pr.y),
                  p === i.firstPickIndex + 1 && (this.N === 90 ? (A = Math.max(A, S)) : (A = Math.min(A, S))),
                  i.insertPointAt(p++, b, A),
                  i.insertPointAt(p++, k, A))
              : ((C = Math.max(10, this.qs[y.layer])),
                (M = Math.max(10, this.xs[y.layer])),
                u
                  ? this.N === 180
                    ? (i.insertPointAt(p++, k + M + Math.max(10, m), P),
                      i.insertPointAt(p++, Math.max(k + M - m / 2, k), P),
                      i.insertPointAt(p++, k, P),
                      i.insertPointAt(p++, k, P),
                      i.insertPointAt(p++, Math.min(k - C + m / 2, k), P),
                      i.insertPointAt(p++, k - C - m, P))
                    : this.N === 90
                      ? (i.insertPointAt(p++, k, P - C - Math.max(10, m)),
                        i.insertPointAt(p++, k, Math.min(P - C + m / 2, P)),
                        i.insertPointAt(p++, k, P),
                        i.insertPointAt(p++, k, P),
                        i.insertPointAt(p++, k, Math.max(P + M - m / 2, P)),
                        i.insertPointAt(p++, k, P + M + m))
                      : this.N === 270
                        ? (i.insertPointAt(p++, k, P + M + Math.max(10, m)),
                          i.insertPointAt(p++, k, Math.max(P + M - m / 2, P)),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, k, Math.min(P - C + m / 2, P)),
                          i.insertPointAt(p++, k, P - C - m))
                        : (i.insertPointAt(p++, k - C - Math.max(10, m), P),
                          i.insertPointAt(p++, Math.min(k - C + m / 2, k), P),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, k, P),
                          i.insertPointAt(p++, Math.max(k + M - m / 2, k), P),
                          i.insertPointAt(p++, k + M + m, P))
                  : this.N === 180
                    ? (i.insertPointAt(p++, k + M, P), i.insertPointAt(p++, k - C, P))
                    : this.N === 90
                      ? (i.insertPointAt(p++, k, P - C), i.insertPointAt(p++, k, P + M))
                      : this.N === 270
                        ? (i.insertPointAt(p++, k, P + M), i.insertPointAt(p++, k, P - C))
                        : (i.insertPointAt(p++, k - C, P), i.insertPointAt(p++, k + M, P)))),
            (f = y));
        }
        d &&
          ((b = i.getPoint(p - 1).x),
          (S = i.getPoint(p - 1).y),
          (k = i.getPoint(p).x),
          (P = i.getPoint(p).y),
          this.N === 180 || this.N === 0
            ? S !== P &&
              (this.N === 0
                ? (A = Math.min(Math.max((k + b) / 2, this.zt[c.layer] + this.pr.x), k))
                : (A = Math.max(Math.min((k + b) / 2, this.zt[c.layer] + this.pr.x), k)),
              i.insertPointAt(p++, A, S),
              i.insertPointAt(p++, A, P))
            : b !== k &&
              (this.N === 90
                ? (A = Math.min(Math.max((P + S) / 2, this.zt[c.layer] + this.pr.y), P))
                : (A = Math.max(Math.min((P + S) / 2, this.zt[c.layer] + this.pr.y), P)),
              i.insertPointAt(p++, b, A),
              i.insertPointAt(p++, k, A)));
      }
      if (s !== null && u && i.pointsCount >= 4) {
        if (n !== null && r !== null && s.Nl(h)) {
          const N = r.getDocumentPoint(Spot.Center);
          N.isReal() || N.setTo(n.actualBounds.centerX, n.actualBounds.centerY);
          const T = i.getPoint(3),
            L = i.getPoint(2);
          this.direction === 90 || this.direction === 270
            ? (i.setPointAt(1, T.x, (L.y + T.y) / 2), i.setPointAt(2, T.x, (L.y + T.y) / 2))
            : (i.setPointAt(1, (L.x + T.x) / 2, T.y), i.setPointAt(2, (L.x + T.x) / 2, T.y));
          const D = i.getLinkPointFromPoint(n, r, N, i.getPoint(1), true);
          i.setPointAt(0, D.x, D.y);
        }
        if (o !== null && l !== null && s.Nl(a)) {
          const N = l.getDocumentPoint(Spot.Center);
          N.isReal() || N.setTo(o.actualBounds.centerX, o.actualBounds.centerY);
          const T = i.getPoint(i.pointsCount - 4),
            L = i.getLinkPointFromPoint(o, l, N, T, false),
            D = i.getPoint(i.pointsCount - 3);
          this.direction === 90 || this.direction === 270
            ? (i.setPointAt(i.pointsCount - 2, T.x, (D.y + L.y) / 2),
              i.setPointAt(i.pointsCount - 3, T.x, (D.y + L.y) / 2))
            : (i.setPointAt(i.pointsCount - 2, (D.x + L.x) / 2, T.y),
              i.setPointAt(i.pointsCount - 3, (D.x + L.x) / 2, T.y));
          const F = i.getLinkPointFromPoint(o, l, N, i.getPoint(i.pointsCount - 2), false);
          i.setPointAt(i.pointsCount - 1, F.x, F.y);
        }
      }
      (i.commitRoute(), e.commit());
    }
  }
  L4() {
    ((this.Mw = -1), (this.$g = 0), (this.Gs = 0), (this.bu = null));
    for (let t = 0; t < this.Hn.length; t++) this.Hn[t] = null;
  }
  _h(t) {
    let i;
    const e = this.li[t];
    if (e >= this.Hn.length) {
      const n = [];
      for (let o = 0; o < this.Hn.length; o++) n[o] = this.Hn[o];
      this.Hn = n;
    }
    this.Hn[e] === void 0 || this.Hn[e] === null ? (i = []) : ((i = this.Hn[e]), (this.Hn[e] = null));
    const s = this.bu[t];
    for (let n = 0; n < s.length; n++) {
      const o = s[n];
      i[o.index] = o;
    }
    return i;
  }
  ta(t, i) {
    this.Hn[this.li[t]] = i;
  }
  get layerSpacing() {
    return this.Us;
  }
  set layerSpacing(t) {
    this.Us !== t && (U.i(t, "number", LayeredDigraphLayout, "layerSpacing"), t >= 0 && ((this.Us = t), this.b()));
  }
  get columnSpacing() {
    return this.ne;
  }
  set columnSpacing(t) {
    this.ne !== t && (U.i(t, "number", LayeredDigraphLayout, "columnSpacing"), t > 0 && ((this.ne = t), this.b()));
  }
  get direction() {
    return this.N;
  }
  set direction(t) {
    this.N !== t &&
      (U.i(t, "number", LayeredDigraphLayout, "direction"),
      t === 0 || t === 90 || t === 180 || t === 270
        ? ((this.N = t), this.b())
        : U.n("LayeredDigraphLayout.direction must be 0, 90, 180, or 270"));
  }
  get cycleRemoveOption() {
    return this.mu;
  }
  set cycleRemoveOption(t) {
    this.mu !== t &&
      (U.W(t, LayeredDigraphCycleRemove, "LayeredDigraphCycleRemove"),
      (t === 1 || t === 0 || t === 2) && ((this.mu = t), this.b()));
  }
  get layeringOption() {
    return this.pu;
  }
  set layeringOption(t) {
    this.pu !== t &&
      (U.W(t, LayeredDigraphLayering, "LayeredDigraphLayering"),
      (t === 10 || t === 11 || t === 12) && ((this.pu = t), this.b()));
  }
  get initializeOption() {
    return this.yu;
  }
  set initializeOption(t) {
    this.yu !== t &&
      (U.W(t, LayeredDigraphInit, "LayeredDigraphInit"),
      (t === 20 || t === 21 || t === 22) && ((this.yu = t), this.b()));
  }
  get iterations() {
    return this.Sf;
  }
  set iterations(t) {
    this.Sf !== t && (U.r(t, LayeredDigraphNetwork, "iterations"), t >= 0 && ((this.Sf = t), this.b()));
  }
  get aggressiveOption() {
    return this.wu;
  }
  set aggressiveOption(t) {
    this.wu !== t &&
      (U.W(t, LayeredDigraphAggressive, "LayeredDigraphAggressive"),
      (t === 30 || t === 31 || t === 32) && ((this.wu = t), this.b()));
  }
  get packOption() {
    return this.gr;
  }
  set packOption(t) {
    this.gr !== t &&
      (U.i(t, "number", LayeredDigraphLayout, "packOption"), t >= 0 && t < 8 && ((this.gr = t), this.b()));
  }
  get packIterations() {
    return this.xu;
  }
  set packIterations(t) {
    this.xu = t;
  }
  get alignOption() {
    return this.vn;
  }
  set alignOption(t) {
    this.vn !== t && (U.i(t, "number", LayeredDigraphLayout, "align"), t >= 0 && t < 16 && ((this.vn = t), this.b()));
  }
  get centered() {
    return this.Qh;
  }
  set centered(t) {
    this.centered !== t && (U.i(t, "boolean", LayeredDigraphLayout, "centered"), (this.Qh = t), this.b());
  }
  get setsPortSpots() {
    return this.qn;
  }
  set setsPortSpots(t) {
    this.qn !== t && (U.i(t, "boolean", LayeredDigraphLayout, "setsPortSpots"), (this.qn = t), this.b());
  }
  get maxLayer() {
    return this.st;
  }
  get maxIndex() {
    return this.Mw;
  }
  get maxColumn() {
    return this.Ht;
  }
  get minIndexLayer() {
    return this.$g;
  }
  get maxIndexLayer() {
    return this.Gs;
  }
  static CycleDepthFirst = 0;
  static CycleGreedy = 1;
  static CycleFromLayers = 2;
  static LayerOptimalLinkLength = 10;
  static LayerLongestPathSink = 11;
  static LayerLongestPathSource = 12;
  static InitDepthFirstOut = 20;
  static InitDepthFirstIn = 21;
  static InitNaive = 22;
  static AggressiveNone = 30;
  static AggressiveLess = 31;
  static AggressiveMore = 32;
  static PackNone = 0;
  static PackExpand = 1;
  static PackStraighten = 2;
  static PackMedian = 4;
  static PackAll = 15;
  static AlignNone = 0;
  static AlignUpperLeft = 1;
  static AlignUpperRight = 2;
  static AlignLowerLeft = 4;
  static AlignLowerRight = 8;
  static AlignAll = 15;
}
