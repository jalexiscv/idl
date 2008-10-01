class ForceDirectedLayout extends Layout {
  kw;
  Zh;
  Ks;
  Ug;
  qn;
  ve;
  Gg;
  qg;
  Hg;
  au;
  vg;
  Wg;
  fu;
  cu;
  uu;
  du;
  jg;
  Jg;
  gu;
  bf;
  constructor(t) {
    (super(),
      (this.kw = 0),
      (this.Zh = 0),
      (this.Ks = new Size(100, 100).k()),
      (this.Ug = false),
      (this.qn = true),
      (this.ve = false),
      (this.Gg = 100),
      (this.qg = 300),
      (this.Hg = 1),
      (this.au = 1e3),
      (this.vg = 10),
      (this.Wg = Math),
      (this.fu = 0.05),
      (this.cu = 50),
      (this.uu = 150),
      (this.du = 0),
      (this.jg = 10),
      (this.Jg = 5),
      (this.gu = NaN),
      (this.bf = 10),
      t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      t.Ks.c(this.Ks),
      (t.Ug = this.Ug),
      (t.qn = this.qn),
      (t.ve = this.ve),
      (t.Gg = this.Gg),
      (t.qg = this.qg),
      (t.Hg = this.Hg),
      (t.au = this.au),
      (t.vg = this.vg),
      (t.Wg = this.Wg),
      (t.fu = this.fu),
      (t.cu = this.cu),
      (t.uu = this.uu),
      (t.du = this.du),
      (t.jg = this.jg),
      (t.Jg = this.Jg),
      (t.gu = this.gu),
      (t.bf = this.bf));
  }
  createNetwork() {
    return new ForceDirectedNetwork(this);
  }
  doLayout(t) {
    (Debug &&
      t === null &&
      U.n("Layout.doLayout(collection) argument must not be null but a Diagram, a Group, or an Iterable of Parts"),
      (this.network = this.makeNetwork(t)));
    let i = this.network.vertexes.iterator;
    const e = this.maxIterations;
    if (this.network.vertexes.count > 0) {
      for (this.network.deleteSelfEdges(), i = this.network.vertexes.iterator; i.next(); ) {
        const o = i.value;
        ((o.charge = this.electricalCharge(o)), (o.mass = this.gravitationalMass(o)));
      }
      const s = this.network.edges.iterator;
      for (; s.next(); ) {
        const o = s.value;
        ((o.stiffness = this.springStiffness(o)), (o.length = this.springLength(o)));
      }
      if ((this.yA(), (this.Zh = 0), this.needsPrelayout())) {
        const o = this.network,
          r = o.splitIntoSubNetworks(false);
        let l = r.iterator;
        for (; l.next(); ) {
          const h = l.value;
          this.doConnectedSubnetLayout(h);
        }
        for (l = r.iterator, this.C4(l, o), l = r.iterator; l.next(); ) {
          const h = l.value,
            a = h.vertexes.iterator;
          for (; a.next(); ) {
            const c = a.value;
            o.addVertex(c);
          }
          const f = h.edges.iterator;
          for (; f.next(); ) {
            const c = f.value;
            o.addEdge(c);
          }
        }
      } else this.mI(this.network, this.maxIterations);
      this.updateParts();
    }
    ((this.maxIterations = e), (this.isValidLayout = true));
  }
  needsPrelayout() {
    if (this.network === null || this.network.vertexes.count < 3) return false;
    let t = 0,
      i = 0;
    const e = this.network.vertexes.first().bounds,
      s = this.network.vertexes.iterator;
    for (; s.next(); ) {
      const n = s.value,
        o = n.bounds;
      if (isNaN(n.x) || isNaN(n.y) || (o.intersectsRect(e) && (t++, t > 2))) return true;
      if (i > 10) return false;
      i++;
    }
    return false;
  }
  doConnectedSubnetLayout(t) {
    let i = t.vertexes.iterator;
    for (; i.next(); ) {
      const l = i.value;
      l.hierarchicalVertexes.add(l);
    }
    let e = t,
      s = this.gu;
    if ((isNaN(s) && (s = t.edges.count / t.vertexes.count), s < t.vertexes.count))
      for (; e.vertexes.count > Math.max(100, Math.sqrt(s * t.vertexes.count)); ) e = this.coarsenNetwork(e);
    let n = 0;
    i = e.vertexes.iterator;
    let o = this.randomNumberGenerator;
    for (o === null && (this.randomNumberGenerator = o = new RandomNumberGenerator(0)); i.next(); ) {
      i.value.idInCluster = n++;
      const l = 10 * (o.random() - 0.5),
        h = 10 * (o.random() - 0.5);
      this.isFixed(i.value) || ((i.value.x = l), (i.value.y = h));
      const a = i.value.hierarchicalVertexes.iterator;
      for (; a.next(); ) this.isFixed(a.value) || ((a.value.x = l), (a.value.y = h));
    }
    const r = this.computePairwiseDistances(e);
    (this.A4(e, r, this.maxPrelayoutIterations, t.vertexes.count), this.mI(t, this.maxIterations));
  }
  computePairwiseDistances(t) {
    const i = t.vertexes.count,
      e = new Array(i);
    for (let r = 0; r < i; r++) ((e[r] = new Array(i).fill(-1)), (e[r][r] = 0));
    const s = t.vertexes.iterator;
    let n = new Map(),
      o = [];
    for (; s.next(); ) {
      const r = s.value;
      for (o = [r], n = new Map(), n.set(r.idInCluster, 0); o.length > 0; ) {
        const l = o.shift(),
          h = l.vertexes.iterator;
        for (; h.next(); ) {
          const a = h.value;
          n.has(a.idInCluster) || (n.set(a.idInCluster, n.get(l.idInCluster) + 1), o.push(a));
        }
      }
      for (let l = 0; l < i; l++) {
        const h = Math.min(e[r.idInCluster][l], e[l][r.idInCluster]),
          a = n.get(l);
        (h < 0 || a < h) && ((e[r.idInCluster][l] = a), (e[l][r.idInCluster] = a));
      }
    }
    return e;
  }
  coarsenNetwork(t) {
    const i = this.createNetwork(),
      e = new Map();
    let s = 0,
      n = t.vertexes.iterator;
    for (; n.next(); ) n.value.idInCluster = s++;
    for (n = t.vertexes.iterator; n.next(); ) {
      const r = n.value;
      if (e.has(r.idInCluster)) continue;
      let l = Number.MAX_SAFE_INTEGER,
        h = null;
      const a = r.vertexes.iterator;
      for (; a.next(); ) {
        const c = a.value;
        e.has(c.idInCluster) || (c.hierarchicalVertexes.length < l && ((l = c.hierarchicalVertexes.length), (h = c)));
      }
      const f = i.createVertex();
      (f.hierarchicalVertexes.addAll(r.hierarchicalVertexes),
        h != null && f.hierarchicalVertexes.addAll(h.hierarchicalVertexes),
        e.set(r.idInCluster, f),
        h != null && e.set(h.idInCluster, f),
        i.addVertex(f));
    }
    const o = t.edges.iterator;
    for (; o.next(); ) {
      const r = o.value,
        l = e.get(r.fromVertex.idInCluster),
        h = e.get(r.toVertex.idInCluster);
      if (l === h) continue;
      const a = i.createEdge();
      ((a.fromVertex = l || null), (a.toVertex = h || null), i.addEdge(a));
    }
    return i;
  }
  gx(t, i) {
    let e = true;
    const s = t.vertexes.iterator;
    for (; s.next(); ) {
      const n = s.value;
      e ? ((e = false), i.set(n.bounds)) : i.unionRect(n.bounds);
    }
    return i;
  }
  C4(t, i) {
    Debug && U.s(i, ForceDirectedNetwork, ForceDirectedLayout, "arrangeConnectedGraphs:singletons");
    const e = this.arrangementSpacing,
      s = t.count;
    let n = true,
      o = 0,
      r = 0;
    const l = U.ht();
    for (let c = 0; c < s + i.vertexes.count + 2; c++) l[c] = null;
    let h = 0;
    t.reset();
    const a = Rect.a();
    let f;
    for (; t.next(); ) {
      const c = t.value;
      if ((this.gx(c, a), n))
        ((n = false),
          (o = a.x + a.width / 2),
          (r = a.y + a.height / 2),
          (l[0] = new Point(a.x + a.width + e.width, a.y)),
          (l[1] = new Point(a.x, a.y + a.height + e.height)),
          (h = 2));
      else {
        const u = this.pI(l, h, o, r, a.width, a.height, e),
          d = l[u],
          m = new Point(d.x + a.width + e.width, d.y),
          g = new Point(d.x, d.y + a.height + e.height);
        (u + 1 < h && l.splice(u + 1, 0, null), (l[u] = m), (l[u + 1] = g), h++);
        const p = d.x - a.x,
          y = d.y - a.y;
        for (f = c.vertexes.iterator; f.next(); ) {
          const x = f.value;
          this.isFixed(x) || ((x.centerX += p), (x.centerY += y));
        }
      }
    }
    for (Rect.o(a), f = i.vertexes.iterator; f.next(); ) {
      const c = f.value,
        u = c.bounds;
      if (h < 2) {
        ((o = u.x + u.width / 2),
          (r = u.y + u.height / 2),
          (l[0] = new Point(u.x + u.width + e.width, u.y)),
          (l[1] = new Point(u.x, u.y + u.height + e.height)),
          (h = 2));
        continue;
      }
      const d = this.pI(l, h, o, r, u.width, u.height, e),
        m = l[d],
        g = new Point(m.x + u.width + e.width, m.y),
        p = new Point(m.x, m.y + u.height + e.height);
      (d + 1 < h && l.splice(d + 1, 0, null),
        (l[d] = g),
        (l[d + 1] = p),
        h++,
        this.isFixed(c) || ((c.centerX = m.x + c.width / 2), (c.centerY = m.y + c.height / 2)));
    }
    U.et(l);
  }
  pI(t, i, e, s, n, o, r) {
    let l = 9e19,
      h = -1;
    t: for (let a = 0; a < i; a++) {
      const f = t[a],
        c = f.x - e,
        u = f.y - s,
        d = c * c + u * u;
      if (d < l) {
        for (let m = a - 1; m >= 0; m--) if (t[m].y > f.y && t[m].x - f.x < n + r.width) continue t;
        for (let m = a + 1; m < i; m++) if (t[m].x > f.x && t[m].y - f.y < o + r.height) continue t;
        ((h = a), (l = d));
      }
    }
    return h;
  }
  yA() {
    if (this.network === null || !this.comments) return;
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const i = t.value;
      this.addComments(i);
    }
  }
  addComments(t) {
    if (this.network === null) return;
    const i = t.node;
    if (i !== null) {
      const e = i.findNodesConnected();
      for (; e.next(); ) {
        const s = e.value;
        if (s.category !== "Comment" || !s.isVisible()) continue;
        let n = this.network.findVertex(s);
        (n === null && (n = this.network.addNode(s)), (n.charge = this.defaultCommentElectricalCharge));
        let o = null;
        const r = n.destinationEdges;
        for (; r.next(); ) {
          const l = r.value;
          if (l.toVertex === t) {
            o = l;
            break;
          }
        }
        if (o === null) {
          const l = n.sourceEdges;
          for (; l.next(); ) {
            const h = l.value;
            if (h.fromVertex === t) {
              o = h;
              break;
            }
          }
        }
        (o === null && (o = this.network.linkVertexes(t, n, null)), (o.length = this.defaultCommentSpringLength));
      }
    }
  }
  yI(t, i) {
    const e = t.bounds,
      s = e.x,
      n = e.y,
      o = e.width,
      r = e.height,
      l = i.bounds,
      h = l.x,
      a = l.y,
      f = l.width,
      c = l.height;
    if (s + o < h)
      if (n > a + c) {
        const u = s + o - h,
          d = n - a - c;
        return G.hx(u * u + d * d);
      } else if (n + r < a) {
        const u = s + o - h,
          d = n + r - a;
        return G.hx(u * u + d * d);
      } else return h - (s + o);
    else if (s > h + f)
      if (n > a + c) {
        const u = s - h - f,
          d = n - a - c;
        return G.hx(u * u + d * d);
      } else if (n + r < a) {
        const u = s - h - f,
          d = n + r - a;
        return G.hx(u * u + d * d);
      } else return s - (h + f);
    else return n > a + c ? n - (a + c) : n + r < a ? a - (n + r) : 0.1;
  }
  mI(t, i) {
    Debug && U.r(i, ForceDirectedLayout, "performIterations:num");
    const e = this.Zh + i;
    for (; this.Zh < e && (this.Zh++, !!this.T4(t)); );
  }
  T4(t) {
    const i = t.vertexes.toArray();
    if (i.length <= 0) return false;
    const e = i[0];
    ((e.forceX = 0), (e.forceY = 0));
    let s = e.centerX,
      n = s,
      o = e.centerY,
      r = o;
    for (let m = 1; m < i.length; m++) {
      const g = i[m];
      ((g.forceX = 0), (g.forceY = 0));
      const p = g.centerX,
        y = g.centerY;
      ((s = Math.min(s, p)), (n = Math.max(n, p)), (o = Math.min(o, y)), (r = Math.max(r, y)));
    }
    const l = n - s > r - o;
    l
      ? i.sort((m, g) => (m === null || g === null || m === g ? 0 : m.centerX - g.centerX))
      : i.sort((m, g) => (m === null || g === null || m === g ? 0 : m.centerY - g.centerY));
    const h = this.au;
    let a = 0,
      f = 0,
      c = 0;
    for (let m = 0; m < i.length; m++) {
      const g = i[m],
        p = g.bounds,
        y = g.focus,
        x = p.x + y.x,
        b = p.y + y.y;
      ((f = g.charge * this.electricalFieldX(x, b)),
        (c = g.charge * this.electricalFieldY(x, b)),
        (f += g.mass * this.gravitationalFieldX(x, b)),
        (c += g.mass * this.gravitationalFieldY(x, b)),
        (g.forceX += f),
        (g.forceY += c));
      for (let S = m + 1; S < i.length; S++) {
        const k = i[S];
        if (!this.shouldInteract(g, k) || S === m) continue;
        const P = k.bounds,
          A = k.focus,
          C = P.x + A.x,
          M = P.y + A.y;
        if (x - C > h || C - x > h) {
          if (l) break;
          continue;
        }
        if (b - M > h || M - b > h) {
          if (!l) break;
          continue;
        }
        const N = this.yI(g, k),
          T = 2 * g.charge,
          L = 2 * k.charge;
        if (N > 1) ((a = (T * L) / (N * N)), (f = (a * (x - C)) / N), (c = (a * (b - M)) / N));
        else {
          let D = this.randomNumberGenerator;
          D === null && (this.randomNumberGenerator = D = new RandomNumberGenerator(0));
          const F = D.random(),
            R = D.random();
          if (x > C) ((f = Math.abs(k.bounds.right - g.bounds.x)), (f = T * L * (1 + f) * F));
          else if (x < C) ((f = Math.abs(k.bounds.x - g.bounds.right)), (f = -(T * L) * (1 + f) * F));
          else {
            const I = Math.max(k.width, g.width);
            f = T * L * ((1 + I) * F - I / 2);
          }
          if (b > M) ((c = Math.abs(k.bounds.bottom - g.bounds.y)), (c = T * L * (1 + c) * R));
          else if (x < C) ((c = Math.abs(k.bounds.y - g.bounds.bottom)), (c = -(T * L) * (1 + c) * R));
          else {
            const I = Math.max(k.height, g.height);
            c = T * L * ((1 + I) * R - I / 2);
          }
        }
        ((g.forceX += f), (g.forceY += c), (k.forceX -= f), (k.forceY -= c));
      }
    }
    const u = t.edges.iterator;
    for (; u.next(); ) {
      const m = u.value,
        g = m.fromVertex,
        p = m.toVertex,
        y = g.bounds,
        x = g.focus,
        b = y.x + x.x,
        S = y.y + x.y,
        k = p.bounds,
        P = p.focus,
        A = k.x + P.x,
        C = k.y + P.y,
        M = this.yI(g, p);
      (M > 1 &&
        ((a = 0.1 * m.stiffness * (M - m.length)),
        (f = (a * 0.5 * (g.width + p.height) * (b - A)) / M),
        (c = (a * 0.5 * (g.width + p.height) * (S - C)) / M)),
        (g.forceX -= f),
        (g.forceY -= c),
        (p.forceX += f),
        (p.forceY += c));
    }
    let d = 0;
    for (let m = 0; m < i.length; m++) {
      const g = i[m];
      this.isFixed(g) ? this.moveFixedVertex(g) : (d = Math.max(d, this.moveVertex(g) || 0));
    }
    return d > this.epsilonDistance * this.epsilonDistance;
  }
  A4(t, i, e, s) {
    Debug && U.r(e, ForceDirectedLayout, "performIterations:num");
    const n = this.Zh + e,
      o = Math.sqrt(s);
    this.kw = this.bf * t.vertexes.count;
    const r = t.vertexes.toArray();
    let l = 0,
      h = 0,
      a = 0;
    for (; this.Zh < n; ) {
      (this.Zh++, (h = l), (l = 0));
      for (let f = 0; f < r.length; f++) {
        ((r[f].forceX = 0), (r[f].forceY = 0));
        for (let u = 0; u < r.length; u++) {
          if (f === u) continue;
          const d = Math.sqrt((r[f].centerX - r[u].centerX) ** 2 + (r[f].centerY - r[u].centerY) ** 2),
            m = i[r[f].idInCluster][r[u].idInCluster],
            g = (d - this.bf * o * m) / d;
          ((r[f].forceX += g * (r[u].x - r[f].x)), (r[f].forceY += g * (r[u].y - r[f].y)));
        }
        const c = Math.sqrt(r[f].forceX * r[f].forceX + r[f].forceY * r[f].forceY);
        if (c > 0) {
          ((r[f].forceX = (this.kw * r[f].forceX) / c),
            (r[f].forceY = (this.kw * r[f].forceY) / c),
            this.isFixed(r[f]) || ((r[f].x += r[f].forceX), (r[f].y += r[f].forceY)));
          const u = r[f].hierarchicalVertexes.iterator;
          for (; u.next(); ) {
            const d = u.value;
            this.isFixed(d) || ((d.centerX += r[f].forceX), (d.centerY += r[f].forceY));
          }
        }
        l += c * c;
      }
      if (l >= h) {
        if ((a++, a >= 5)) break;
      } else a = 0;
      this.kw *= 0.95;
    }
  }
  moveVertex(t) {
    let i = t.forceX,
      e = t.forceY;
    const s = this.moveLimit;
    return (
      i < -s ? (i = -s) : i > s && (i = s),
      e < -s ? (e = -s) : e > s && (e = s),
      (t.centerX += i),
      (t.centerY += e),
      i * i + e * e
    );
  }
  shouldInteract(t, i) {
    return true;
  }
  moveFixedVertex(t) {}
  commitLayout() {
    (this.Pw(), this.commitNodes(), this.isRouting && this.commitLinks());
  }
  Pw() {
    if (this.network === null || !this.setsPortSpots) return;
    const t = this.network.edges.iterator;
    for (; t.next(); ) {
      const e = t.value.link;
      e !== null && ((e.fromSpot = Spot.Default), (e.toSpot = Spot.Default));
    }
  }
  commitNodes() {
    if (!this.network) return;
    let t = 0,
      i = 0;
    if (this.arrangesToOrigin) {
      const n = Rect.a();
      this.gx(this.network, n);
      const o = this.arrangementOrigin;
      ((t = o.x - n.x), (i = o.y - n.y), Rect.o(n));
    }
    const e = Rect.a(),
      s = this.network.vertexes.iterator;
    for (; s.next(); ) {
      const n = s.value;
      ((t !== 0 || i !== 0) && (e.c(n.bounds), (e.x += t), (e.y += i), (n.bounds = e)), n.commit());
    }
    Rect.o(e);
  }
  commitLinks() {
    if (!this.network) return;
    const t = this.network.edges.iterator;
    for (; t.next(); ) t.value.commit();
  }
  springStiffness(t) {
    const i = t.stiffness;
    return isNaN(i) ? this.fu : i;
  }
  springLength(t) {
    const i = t.length;
    return isNaN(i) ? this.cu : i;
  }
  electricalCharge(t) {
    const i = t.charge;
    return isNaN(i) ? this.uu : i;
  }
  electricalFieldX(t, i) {
    return 0;
  }
  electricalFieldY(t, i) {
    return 0;
  }
  gravitationalMass(t) {
    const i = t.mass;
    return isNaN(i) ? this.du : i;
  }
  gravitationalFieldX(t, i) {
    return 0;
  }
  gravitationalFieldY(t, i) {
    return 0;
  }
  isFixed(t) {
    return t.isFixed;
  }
  get currentIteration() {
    return this.Zh;
  }
  get arrangementSpacing() {
    return this.Ks;
  }
  set arrangementSpacing(t) {
    (U.s(t, Size, ForceDirectedLayout, "arrangementSpacing"), this.Ks.equals(t) || (this.Ks.c(t), this.b()));
  }
  get arrangesToOrigin() {
    return this.Ug;
  }
  set arrangesToOrigin(t) {
    this.Ug !== t && (U.i(t, "boolean", ForceDirectedLayout, "arrangesToOrigin"), (this.Ug = t), this.b());
  }
  get setsPortSpots() {
    return this.qn;
  }
  set setsPortSpots(t) {
    this.qn !== t && (U.i(t, "boolean", ForceDirectedLayout, "setsPortSpots"), (this.qn = t), this.b());
  }
  get comments() {
    return this.ve;
  }
  set comments(t) {
    this.ve !== t && (U.i(t, "boolean", ForceDirectedLayout, "comments"), (this.ve = t), this.b());
  }
  get maxPrelayoutIterations() {
    return this.Gg;
  }
  set maxPrelayoutIterations(t) {
    this.Gg !== t &&
      (U.i(t, "number", ForceDirectedLayout, "maxPrelayoutIterations"), t >= 0 && ((this.Gg = t), this.b()));
  }
  get maxIterations() {
    return this.qg;
  }
  set maxIterations(t) {
    this.qg !== t && (U.i(t, "number", ForceDirectedLayout, "maxIterations"), t >= 0 && ((this.qg = t), this.b()));
  }
  get epsilonDistance() {
    return this.Hg;
  }
  set epsilonDistance(t) {
    this.Hg !== t && (U.i(t, "number", ForceDirectedLayout, "epsilonDistance"), t > 0 && ((this.Hg = t), this.b()));
  }
  get infinityDistance() {
    return this.au;
  }
  set infinityDistance(t) {
    this.au !== t && (U.i(t, "number", ForceDirectedLayout, "infinityDistance"), t > 1 && ((this.au = t), this.b()));
  }
  get moveLimit() {
    return this.vg;
  }
  set moveLimit(t) {
    this.vg !== t && (U.i(t, "number", ForceDirectedLayout, "moveLimit"), (this.vg = t), this.b());
  }
  get randomNumberGenerator() {
    return this.Wg;
  }
  set randomNumberGenerator(t) {
    this.Wg !== t &&
      (t !== null &&
        !U.lt(t.random) &&
        U.n('ForceDirectedLayout.randomNumberGenerator must have a "random()" function on it: ' + t),
      (this.Wg = t));
  }
  get defaultSpringStiffness() {
    return this.fu;
  }
  set defaultSpringStiffness(t) {
    this.fu !== t && (U.i(t, "number", ForceDirectedLayout, "defaultSpringStiffness"), (this.fu = t), this.b());
  }
  get defaultSpringLength() {
    return this.cu;
  }
  set defaultSpringLength(t) {
    this.cu !== t && (U.i(t, "number", ForceDirectedLayout, "defaultSpringLength"), (this.cu = t), this.b());
  }
  get defaultElectricalCharge() {
    return this.uu;
  }
  set defaultElectricalCharge(t) {
    this.uu !== t && (U.i(t, "number", ForceDirectedLayout, "defaultElectricalCharge"), (this.uu = t), this.b());
  }
  get defaultGravitationalMass() {
    return this.du;
  }
  set defaultGravitationalMass(t) {
    this.du !== t && (U.i(t, "number", ForceDirectedLayout, "defaultGravitationalMass"), (this.du = t), this.b());
  }
  get defaultCommentSpringLength() {
    return this.jg;
  }
  set defaultCommentSpringLength(t) {
    this.jg !== t && (U.i(t, "number", ForceDirectedLayout, "defaultCommentSpringLength"), (this.jg = t), this.b());
  }
  get defaultCommentElectricalCharge() {
    return this.Jg;
  }
  set defaultCommentElectricalCharge(t) {
    this.Jg !== t && (U.i(t, "number", ForceDirectedLayout, "defaultCommentElectricalCharge"), (this.Jg = t), this.b());
  }
  get prelayoutQuality() {
    return this.gu;
  }
  set prelayoutQuality(t) {
    this.gu !== t && (U.i(t, "number", ForceDirectedLayout, "prelayoutQuality"), (this.gu = t), this.b());
  }
  get prelayoutSpread() {
    return this.bf;
  }
  set prelayoutSpread(t) {
    this.bf !== t && (U.i(t, "number", ForceDirectedLayout, "prelayoutSpread"), (this.bf = t), this.b());
  }
}
