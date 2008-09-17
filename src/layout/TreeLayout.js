class TreeLayout extends Layout {
  Xi;
  Bi;
  Pu;
  tm;
  PA;
  ve;
  Ji;
  Ks;
  Y;
  K;
  mk;
  ks;
  constructor(t) {
    (super(),
      (this.Xi = new GSet()),
      (this.Bi = 0),
      (this.ks = 1),
      (this.Pu = 40),
      (this.tm = 60),
      (this.PA = []),
      (this.ve = true),
      (this.Ji = 50),
      (this.Ks = new Size(10, 10).k()));
    const i = new TreeNetwork(this);
    ((this.Y = new TreeVertex(i)), (this.K = new TreeVertex(i)), (this.mk = []), t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.Bi = this.Bi),
      (t.Pu = this.Pu),
      (t.tm = this.tm),
      (t.ve = this.ve),
      (t.Ji = this.Ji),
      t.Ks.c(this.Ks),
      t.Y.copyInheritedPropertiesFrom(this.Y),
      t.K.copyInheritedPropertiesFrom(this.K));
  }
  gi(t) {
    t in TreeAlignment
      ? (this.alignment = t)
      : t in TreeArrangement
        ? (this.arrangement = t)
        : t in TreeCompaction
          ? (this.compaction = t)
          : t in TreePath
            ? (this.path = t)
            : t in TreeSorting
              ? (this.sorting = t)
              : t in TreeStyle
                ? (this.treeStyle = t)
                : super.gi(t);
  }
  createNetwork() {
    return new TreeNetwork(this);
  }
  makeNetwork(t) {
    const i = this.createNetwork(),
      e = (s) => {
        if (s instanceof Node) return !s.isLinkLabel && s.category !== "Comment";
        if (s instanceof Link) {
          const n = s.fromNode;
          if (n === null || n.isLinkLabel || n.category === "Comment") return false;
          const o = s.toNode;
          return !(o === null || o.isLinkLabel || o.category === "Comment");
        }
        return false;
      };
    return (
      t instanceof Diagram
        ? (i.addParts(t.nodes, true, e), i.addParts(t.links, true, e))
        : t instanceof Group
          ? i.addParts(t.memberParts, false, e)
          : i.addParts(t.iterator, false, e),
      i
    );
  }
  doLayout(t) {
    (Debug &&
      t === null &&
      U.n("Layout.doLayout(collection) argument must not be null but a Diagram, a Group, or an Iterable of Parts"),
      this.network === null && (this.network = this.makeNetwork(t)),
      this.arrangement !== 52 && (this.arrangementOrigin = this.initialOrigin(this.arrangementOrigin)));
    let i = this.diagram;
    (i === null && t instanceof Diagram && (i = t),
      this.path === 0 && i !== null
        ? (this.ks = i.isTreePathToChildren ? 1 : 2)
        : (this.ks = this.path === 0 ? 1 : this.path),
      this.network.vertexes.count > 0 &&
        (this.cV(), this.uV(), this.dV(), this.gV(), this.yA(), this.mV(), this.arrangeTrees(), this.updateParts()),
      (this.network = null),
      (this.Xi = new GSet()),
      (this.isValidLayout = true));
  }
  cV() {
    if (this.network === null) return;
    this.network.deleteSelfEdges();
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const n = t.value;
      ((n.initialized = false), (n.level = 0), (n.parent = null), (n.children = []));
    }
    if (this.Xi.count > 0) {
      const n = new GSet(),
        o = this.Xi.iterator;
      for (; o.next(); ) {
        const r = o.value;
        if (r instanceof Node) {
          const l = this.network.findVertex(r);
          l !== null && n.add(l);
        } else r instanceof TreeVertex && n.add(r);
      }
      this.Xi = n;
    }
    this.Xi.count === 0 && this.findRoots();
    const i = this.Xi.copy().iterator;
    for (; i.next(); ) {
      const n = i.value;
      n.initialized || ((n.initialized = true), this.MA(n));
    }
    let e = this.network.vertexes,
      s = null;
    for (; (s = this.pV(e)), s.count > 0; ) {
      const n = this.BI(s);
      (n !== null && (this.Xi.add(n), (n.initialized = true), this.MA(n)), (e = s));
    }
  }
  pV(t) {
    const i = new GSet(),
      e = t.iterator;
    for (; e.next(); ) {
      const s = e.value;
      s.initialized || i.add(s);
    }
    return i;
  }
  findRoots() {
    if (this.network === null) return;
    const t = this.network.vertexes,
      i = t.iterator;
    for (; i.next(); ) {
      const e = i.value;
      switch (this.ks) {
        case 1:
          e.sourceEdges.count === 0 && this.Xi.add(e);
          break;
        case 2:
          e.destinationEdges.count === 0 && this.Xi.add(e);
          break;
        default:
          U.n("Unhandled path value " + this.ks.toString());
      }
    }
    if (this.Xi.count === 0) {
      const e = this.BI(t);
      e !== null && this.Xi.add(e);
    }
  }
  BI(t) {
    let i = 999999,
      e = null;
    const s = t.iterator;
    for (; s.next(); ) {
      const n = s.value;
      switch (this.ks) {
        case 1:
          n.sourceEdges.count < i && ((i = n.sourceEdges.count), (e = n));
          break;
        case 2:
          n.destinationEdges.count < i && ((i = n.destinationEdges.count), (e = n));
          break;
        default:
          U.n("Unhandled path value " + this.ks.toString());
      }
    }
    return e;
  }
  MA(t) {
    if (t === null) return;
    switch ((Debug && U.s(t, TreeVertex, TreeLayout, "walkTree:v"), this.ks)) {
      case 1:
        if (t.destinationEdges.count > 0) {
          const s = new List(),
            n = t.destinationVertexes;
          for (; n.next(); ) {
            const o = n.value;
            this.zI(t, o) && s.add(o);
          }
          s.count > 0 && (t.children = s.toArray());
        }
        break;
      case 2:
        if (t.sourceEdges.count > 0) {
          const s = new List(),
            n = t.sourceVertexes;
          for (; n.next(); ) {
            const o = n.value;
            this.zI(t, o) && s.add(o);
          }
          s.count > 0 && (t.children = s.toArray());
        }
        break;
      default:
        U.n("Unhandled path value" + this.ks.toString());
    }
    const i = t.children,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const n = i[s];
      ((n.initialized = true), (n.level = t.level + 1), (n.parent = t), this.Xi.delete(n));
    }
    for (let s = 0; s < e; s++) {
      const n = i[s];
      this.MA(n);
    }
  }
  zI(t, i) {
    return (
      Debug && U.s(t, TreeVertex, TreeLayout, "walkOK:v"),
      Debug && U.s(i, TreeVertex, TreeLayout, "walkOK:c"),
      i.initialized ? (this.yV(i, t) || i.level > t.level ? false : (this.wV(i.parent, i), true)) : true
    );
  }
  yV(t, i) {
    if (i === null) return false;
    (Debug && U.s(t, TreeVertex, TreeLayout, "isAncestor:a"), Debug && U.s(i, TreeVertex, TreeLayout, "isAncestor:b"));
    let e = i.parent;
    for (; e !== null && e !== t; ) e = e.parent;
    return e === t;
  }
  wV(t, i) {
    if (t === null || i === null) return;
    (Debug && U.s(t, TreeVertex, TreeLayout, "removeChild:p"),
      Debug && U.s(i, TreeVertex, TreeLayout, "removeChild:c"));
    const e = t.children;
    let s = 0;
    for (let n = 0; n < e.length; n++) e[n] === i && s++;
    if (s > 0) {
      const n = new Array(e.length - s);
      let o = 0;
      for (let r = 0; r < e.length; r++) e[r] !== i && (n[o++] = e[r]);
      t.children = n;
    }
  }
  uV() {
    const t = this.Xi.iterator;
    for (; t.next(); ) {
      const i = t.value;
      i instanceof TreeVertex && this.XI(i);
    }
  }
  XI(t) {
    if (t === null) return;
    (Debug && U.s(t, TreeVertex, TreeLayout, "initializeTree:v"),
      this.initializeTreeVertexValues(t),
      t.alignment === 25 && this.sortTreeVertexChildren(t));
    let i = 0,
      e = t.childrenCount,
      s = 0;
    const n = t.children,
      o = n.length;
    for (let r = 0; r < o; r++) {
      const l = n[r];
      (this.XI(l),
        (i += l.descendantCount + 1),
        (e = Math.max(e, l.maxChildrenCount)),
        (s = Math.max(s, l.maxGenerationCount)));
    }
    ((t.descendantCount = i), (t.maxChildrenCount = e), (t.maxGenerationCount = e > 0 ? s + 1 : 0));
  }
  xV(t) {
    switch ((Debug && U.s(t, TreeVertex, TreeLayout, "mom:v"), this.Pu)) {
      default:
      case 40:
        return t.parent !== null ? t.parent : this.Y;
      case 43:
        return t.parent === null ? this.Y : t.parent.parent === null ? this.K : t.parent;
      case 42:
        return t.parent !== null ? (t.parent.parent !== null ? t.parent.parent : this.K) : this.Y;
      case 41: {
        let i = true;
        if (t.childrenCount === 0) i = false;
        else {
          const e = t.children,
            s = e.length;
          for (let n = 0; n < s; n++)
            if (e[n].childrenCount > 0) {
              i = false;
              break;
            }
        }
        return i && t.parent !== null ? this.K : t.parent !== null ? t.parent : this.Y;
      }
    }
  }
  initializeTreeVertexValues(t) {
    Debug && U.s(t, TreeVertex, TreeLayout, "initializeTreeVertexValues:v");
    const i = this.xV(t);
    if ((t.copyInheritedPropertiesFrom(i), t.parent !== null && t.parent.alignment === 25)) {
      let e = t.angle;
      const s = t.parent.children;
      let n = 0;
      for (; n < s.length && t !== s[n]; ) n++;
      (n % 2 === 0
        ? n !== s.length - 1 && (e === 90 ? (e = 180) : e === 180 ? (e = 270) : e === 270 ? (e = 180) : (e = 270))
        : e === 90
          ? (e = 0)
          : e === 180
            ? (e = 90)
            : e === 270
              ? (e = 0)
              : (e = 90),
        (t.angle = e));
    }
    t.initialized = true;
  }
  dV() {
    const t = this.Xi.iterator;
    for (; t.next(); ) {
      const i = t.value;
      i instanceof TreeVertex && this.YI(i);
    }
  }
  YI(t) {
    if (t === null) return;
    (Debug && U.s(t, TreeVertex, TreeLayout, "assignTree:v"), this.assignTreeVertexValues(t));
    const i = t.children,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const n = i[s];
      this.YI(n);
    }
  }
  assignTreeVertexValues(t) {}
  gV() {
    const t = this.Xi.iterator;
    for (; t.next(); ) {
      const i = t.value;
      i instanceof TreeVertex && this.KI(i);
    }
  }
  KI(t) {
    if (t === null) return;
    (Debug && U.s(t, TreeVertex, TreeLayout, "sortTree:v"), t.alignment !== 25 && this.sortTreeVertexChildren(t));
    const i = t.children,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const n = i[s];
      this.KI(n);
    }
  }
  sortTreeVertexChildren(t) {
    switch ((Debug && U.s(t, TreeVertex, TreeLayout, "sortTreeVertexChildren:v"), t.sorting)) {
      default:
      case 10:
        break;
      case 11:
        t.children.reverse();
        break;
      case 12:
        t.children.sort(t.comparer);
        break;
      case 13:
        (t.children.sort(t.comparer), t.children.reverse());
        break;
    }
  }
  yA() {
    if (!this.comments || this.network === null) return;
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) {
      const i = t.value;
      this.addComments(i);
    }
  }
  addComments(t) {
    Debug && U.s(t, TreeVertex, TreeLayout, "addComments:v");
    const i = t.angle,
      e = t.parent;
    let s = 0,
      n = 21,
      o = false;
    e !== null && ((s = e.angle), (n = e.alignment), (o = this.isBusAlignment(n)));
    const r = i === 90 || i === 270,
      l = s === 90 || s === 270,
      h = t.childrenCount === 0;
    let a = 0,
      f = 0,
      c = 0;
    const u = t.commentSpacing;
    if (t.node !== null) {
      const d = t.node.findNodesConnected();
      for (; d.next(); ) {
        const m = d.value;
        if (m.category !== "Comment" || !m.canLayout()) continue;
        (t.comments === null && (t.comments = []), t.comments.push(m), m.ensureBounds());
        const g = m.measuredBounds;
        ((r && !h) || (!o && !l && h) || (o && l && h)
          ? ((a = Math.max(a, g.width)), (f += g.height + Math.abs(c)))
          : ((a += g.width + Math.abs(c)), (f = Math.max(f, g.height))),
          (c = u));
      }
    }
    if (t.comments !== null) {
      (r && !h) || (!o && !l && h) || (o && l && h)
        ? ((a += Math.abs(t.commentMargin)), (f = Math.max(0, f - t.height)))
        : ((f += Math.abs(t.commentMargin)), (a = Math.max(0, a - t.width)));
      const d = Rect.U(0, 0, t.bounds.width + a, t.bounds.height + f);
      ((t.bounds = d), Rect.o(d));
    }
  }
  isBusAlignment(t) {
    return t === 24 || t === 25 || t === 26 || t === 27;
  }
  Iw(t) {
    return t === 24 || t === 25;
  }
  NA(t) {
    Debug && U.s(t, TreeVertex, TreeLayout, "isLeftSideBus:v");
    const i = t.parent;
    if (i !== null) {
      const e = i.alignment;
      if (this.isBusAlignment(e))
        if (this.Iw(e)) {
          const s = i.children;
          let n = 0;
          for (; n < s.length && t !== s[n]; ) n++;
          return n % 2 === 0;
        } else return e === 26;
    }
    return false;
  }
  layoutComments(t) {
    if ((Debug && U.s(t, TreeVertex, TreeLayout, "layoutComments:v"), t.comments !== null)) {
      const e = t.node.measuredBounds,
        s = t.parent,
        n = t.angle;
      let o = 0,
        r = 21,
        l = false;
      s !== null && ((o = s.angle), (r = s.alignment), (l = this.isBusAlignment(r)));
      const h = n === 90 || n === 270,
        a = o === 90 || o === 270,
        f = t.childrenCount === 0,
        c = this.NA(t);
      let u = 0;
      const d = t.comments,
        m = d.length,
        g = Point.a();
      for (let y = 0; y < m; y++) {
        const x = d[y],
          b = x.measuredBounds;
        if ((h && !f) || (!l && !a && f) || (l && a && f)) {
          if ((o > 135 && !l) || (a && c))
            if (t.commentMargin >= 0) {
              (g.e(t.bounds.x - t.commentMargin - b.width, t.bounds.y + u), x.move(g));
              const S = x.findLinksInto();
              for (; S.next(); ) {
                const k = S.value;
                ((k.fromSpot = Spot.MiddleLeft), (k.toSpot = Spot.MiddleRight));
              }
            } else {
              (g.e(t.bounds.x + t.focus.x * 2 - t.commentMargin, t.bounds.y + u), x.move(g));
              const S = x.findLinksInto();
              for (; S.next(); ) {
                const k = S.value;
                ((k.fromSpot = Spot.MiddleRight), (k.toSpot = Spot.MiddleLeft));
              }
            }
          else if (t.commentMargin >= 0) {
            (g.e(t.bounds.x + t.focus.x * 2 + t.commentMargin, t.bounds.y + u), x.move(g));
            const S = x.findLinksInto();
            for (; S.next(); ) {
              const k = S.value;
              ((k.fromSpot = Spot.MiddleRight), (k.toSpot = Spot.MiddleLeft));
            }
          } else {
            (g.e(t.bounds.x + t.commentMargin - b.width, t.bounds.y + u), x.move(g));
            const S = x.findLinksInto();
            for (; S.next(); ) {
              const k = S.value;
              ((k.fromSpot = Spot.MiddleLeft), (k.toSpot = Spot.MiddleRight));
            }
          }
          t.commentSpacing >= 0 ? (u += b.height + t.commentSpacing) : (u += t.commentSpacing - b.height);
        } else {
          if ((o > 135 && !l) || (!a && c))
            if (t.commentMargin >= 0) {
              (g.e(t.bounds.x + u, t.bounds.y - t.commentMargin - b.height), x.move(g));
              const S = x.findLinksInto();
              for (; S.next(); ) {
                const k = S.value;
                ((k.fromSpot = Spot.MiddleTop), (k.toSpot = Spot.MiddleBottom));
              }
            } else {
              (g.e(t.bounds.x + u, t.bounds.y + t.focus.y * 2 - t.commentMargin), x.move(g));
              const S = x.findLinksInto();
              for (; S.next(); ) {
                const k = S.value;
                ((k.fromSpot = Spot.MiddleBottom), (k.toSpot = Spot.MiddleTop));
              }
            }
          else if (t.commentMargin >= 0) {
            (g.e(t.bounds.x + u, t.bounds.y + t.focus.y * 2 + t.commentMargin), x.move(g));
            const S = x.findLinksInto();
            for (; S.next(); ) {
              const k = S.value;
              ((k.fromSpot = Spot.MiddleBottom), (k.toSpot = Spot.MiddleTop));
            }
          } else {
            (g.e(t.bounds.x + u, t.bounds.y + t.commentMargin - b.height), x.move(g));
            const S = x.findLinksInto();
            for (; S.next(); ) {
              const k = S.value;
              ((k.fromSpot = Spot.MiddleTop), (k.toSpot = Spot.MiddleBottom));
            }
          }
          t.commentSpacing >= 0 ? (u += b.width + t.commentSpacing) : (u += t.commentSpacing - b.width);
        }
      }
      Point.o(g);
      const p = u - t.commentSpacing - (h ? e.height : e.width);
      if (this.ks === 1) {
        const y = t.destinationEdges;
        for (; y.next(); ) {
          const b = y.value.link;
          b !== null && !b.isAvoiding && (b.fromEndSegmentLength = p > 0 ? p : NaN);
        }
      } else {
        const y = t.sourceEdges;
        for (; y.next(); ) {
          const b = y.value.link;
          b !== null && !b.isAvoiding && (b.toEndSegmentLength = p > 0 ? p : NaN);
        }
      }
    }
  }
  mV() {
    if (this.network === null) return;
    if (this.layerStyle === 62) {
      const i = [];
      let e = this.network.vertexes.iterator;
      for (; e.next(); ) {
        const s = e.value;
        let n = s.parent;
        n === null && (n = s);
        const o = n.angle === 0 || n.angle === 180;
        let r = i[s.level];
        (r === void 0 && (r = 0), (i[s.level] = Math.max(r, o ? s.width : s.height)));
      }
      for (let s = 0; s < i.length; s++) i[s] === void 0 && (i[s] = 0);
      for (this.PA = i, e = this.network.vertexes.iterator; e.next(); ) {
        const s = e.value;
        let n = s.parent;
        (n === null && (n = s),
          n.angle === 0 || n.angle === 180
            ? (n.angle === 180 && (s.focusX += i[s.level] - s.width), (s.width = i[s.level]))
            : (n.angle === 270 && (s.focusY += i[s.level] - s.height), (s.height = i[s.level])));
      }
    } else if (this.layerStyle === 61) {
      const i = this.network.vertexes.iterator;
      for (; i.next(); ) {
        const e = i.value,
          s = e.angle === 0 || e.angle === 180;
        let n = -1;
        for (let o = 0; o < e.children.length; o++) {
          const r = e.children[o];
          n = Math.max(n, s ? r.width : r.height);
        }
        if (n >= 0)
          for (let o = 0; o < e.children.length; o++) {
            const r = e.children[o];
            s
              ? (e.angle === 180 && (r.focusX += n - r.width), (r.width = n))
              : (e.angle === 270 && (r.focusY += n - r.height), (r.height = n));
          }
      }
    }
    const t = this.Xi.iterator;
    for (; t.next(); ) {
      const i = t.value;
      i instanceof TreeVertex && this.layoutTree(i);
    }
  }
  layoutTree(t) {
    if (t === null) return;
    Debug && U.s(t, TreeVertex, TreeLayout, "layoutTree:v");
    const i = t.children,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const n = i[s];
      this.layoutTree(n);
    }
    switch (t.compaction) {
      case 30:
        this.UI(t);
        break;
      default:
      case 31:
        t.alignment === 25 ? this.UI(t) : this.bV(t);
        break;
    }
  }
  UI(t) {
    if ((Debug && U.s(t, TreeVertex, TreeLayout, "layoutTreeNone:v"), t.childrenCount === 0)) {
      let R = false,
        I = 0,
        O = 21;
      t.parent !== null && ((I = t.parent.angle), (O = t.parent.alignment), (R = this.isBusAlignment(O)));
      const X = this.NA(t);
      (t.X.e(0, 0),
        t.bt.e(t.width, t.height),
        t.parent !== null && t.comments !== null && (((I === 180 || I === 270) && !R) || X)
          ? (I === 180 && !R) || ((I === 90 || I === 270) && X)
            ? t.dt.e(t.width - t.focus.x * 2, 0)
            : t.dt.e(0, t.height - t.focus.y * 2)
          : t.dt.e(0, 0));
      return;
    }
    const i = this.orthoAngle(t),
      e = i === 90 || i === 270;
    let s = 0;
    const n = t.children,
      o = n.length;
    for (let R = 0; R < o; R++) {
      const I = n[R];
      s = Math.max(s, e ? I.bt.width : I.bt.height);
    }
    const r = t.alignment,
      l = r === 22,
      h = r === 23,
      a = this.isBusAlignment(r),
      f = Math.max(0, t.breadthLimit),
      c = this.computeLayerSpacing(t),
      u = t.nodeSpacing,
      d = this.computeNodeIndent(t),
      m = l || h ? 0 : d / 2,
      g = t.rowSpacing;
    let p = 0;
    (l || h) && (p = Math.max(0, t.rowIndent));
    const y = t.width,
      x = t.height;
    let b = 0,
      S = 0,
      k = 0,
      P = 0,
      A = 0,
      C = 0,
      M = 0,
      N = 0,
      T = 0,
      L = 0;
    if ((a && !this.Iw(r) && i > 135 && n.reverse(), this.Iw(r)))
      if (o > 1)
        for (let R = 0; R < o; R++) {
          const I = n[R],
            O = I.bt;
          R % 2 === 0 && R !== o - 1
            ? (T = Math.max(T, (e ? O.width : O.height) + this.computeBusNodeSpacing(I) - u))
            : R % 2 !== 0 && (L = Math.max(L, (e ? O.width : O.height) + this.computeBusNodeSpacing(I) - u));
        }
      else o === 1 && (T = e ? n[0].bt.width : n[0].bt.height);
    if (a)
      switch (r) {
        case 24:
        case 25:
          const R = Rect.a();
          (i < 135 ? this.GI(t, n, T, L, b, S, R) : this.qI(t, n, T, L, b, S, R),
            (T = R.x),
            (b = R.width),
            (S = R.height),
            Rect.o(R));
          break;
        case 26:
          for (let I = 0; I < o; I++) {
            const O = n[I],
              X = O.bt,
              K = M === 0 ? 0 : g;
            (e
              ? (O.X.e(s - X.width, A + K),
                (b = Math.max(b, X.width)),
                (S = Math.max(S, A + K + X.height)),
                (A += K + X.height))
              : (O.X.e(P + K, s - X.height),
                (b = Math.max(b, P + K + X.width)),
                (S = Math.max(S, X.height)),
                (P += K + X.width)),
              M++);
          }
          break;
        case 27:
          for (let I = 0; I < o; I++) {
            const O = n[I],
              X = O.bt,
              K = M === 0 ? 0 : g;
            (e
              ? (O.X.e(u / 2 + t.focus.x, A + K),
                (b = Math.max(b, X.width)),
                (S = Math.max(S, A + K + X.height)),
                (A += K + X.height))
              : (O.X.e(P + K, u / 2 + t.focus.y),
                (b = Math.max(b, P + K + X.width)),
                (S = Math.max(S, X.height)),
                (P += K + X.width)),
              M++);
          }
          break;
      }
    else
      for (let R = 0; R < o; R++) {
        const I = n[R],
          O = I.bt;
        if (e) {
          f > 0 &&
            M > 0 &&
            P + u + O.width > f &&
            (P < s && this.Pf(t, r, s - P, 0, N, R - 1),
            C++,
            (M = 0),
            (N = R),
            (k = S),
            (P = 0),
            (A = i > 135 ? -S - g : S + g));
          const X = M === 0 ? m : u;
          (this.pk(I, 0, A),
            I.X.e(P + X, A),
            (b = Math.max(b, P + X + O.width)),
            (S = Math.max(S, k + (C === 0 ? 0 : g) + O.height)),
            (P += X + O.width));
        } else {
          f > 0 &&
            M > 0 &&
            A + u + O.height > f &&
            (A < s && this.Pf(t, r, 0, s - A, N, R - 1),
            C++,
            (M = 0),
            (N = R),
            (k = b),
            (A = 0),
            (P = i > 135 ? -b - g : b + g));
          const X = M === 0 ? m : u;
          (this.pk(I, P, 0),
            I.X.e(P, A + X),
            (S = Math.max(S, A + X + O.height)),
            (b = Math.max(b, k + (C === 0 ? 0 : g) + O.width)),
            (A += X + O.height));
        }
        M++;
      }
    C > 0 &&
      (e
        ? ((S += Math.max(0, c)),
          P < b && this.Pf(t, r, b - P, 0, N, o - 1),
          p > 0 && (h || this.Mu(t, p, 0, 0, o - 1), (b += p)))
        : ((b += Math.max(0, c)),
          A < S && this.Pf(t, r, 0, S - A, N, o - 1),
          p > 0 && (h || this.Mu(t, 0, p, 0, o - 1), (S += p))));
    let D = 0,
      F = 0;
    switch (r) {
      case 20:
        e ? (D += b / 2 - t.focus.x - d / 2) : (F += S / 2 - t.focus.y - d / 2);
        break;
      default:
      case 21:
        if (C > 0) e ? (D += b / 2 - t.focus.x - d / 2) : (F += S / 2 - t.focus.y - d / 2);
        else {
          const I = o;
          if (e) {
            const O = n[0].X.x + n[0].dt.x,
              X = n[I - 1].X.x + n[I - 1].dt.x + n[I - 1].focus.x * 2;
            D += O + (X - O) / 2 - t.focus.x - d / 2;
          } else {
            const O = n[0].X.y + n[0].dt.y,
              X = n[I - 1].X.y + n[I - 1].dt.y + n[I - 1].focus.y * 2;
            F += O + (X - O) / 2 - t.focus.y - d / 2;
          }
        }
        break;
      case 22:
        e ? ((D -= d), (b += d)) : ((F -= d), (S += d));
        break;
      case 23:
        e ? ((D += b - t.width + d), (b += d)) : ((F += S - t.height + d), (S += d));
        break;
      case 24:
      case 25:
        e
          ? o > 1
            ? (D += T + u / 2 - t.focus.x)
            : (D += n[0].focus.x - t.focus.x + n[0].dt.x)
          : o > 1
            ? (F += T + u / 2 - t.focus.y)
            : (F += n[0].focus.y - t.focus.y + n[0].dt.y);
        break;
      case 26:
        e ? (D += b + u / 2 - t.focus.x) : (F += S + u / 2 - t.focus.y);
        break;
      case 27:
        break;
      case 28:
        const R = this.customAlignment(t, D, F, b, S);
        ((D = R[0]), (F = R[1]), (b = R[2]), (S = R[3]));
        break;
    }
    for (let R = 0; R < o; R++) {
      const I = n[R];
      e
        ? I.X.e(I.X.x + I.dt.x - D, I.X.y + (i > 135 ? (a ? -S : -I.bt.height) + I.dt.y - c : x + c + I.dt.y))
        : I.X.e(I.X.x + (i > 135 ? (a ? -b : -I.bt.width) + I.dt.x - c : y + c + I.dt.x), I.X.y + I.dt.y - F);
    }
    (e
      ? ((b = this.CA(t, b, D)), D < 0 && (D = 0), i > 135 && (F += S + c), (S = Math.max(Math.max(S, x), S + x + c)))
      : (i > 135 && (D += b + c), (b = Math.max(Math.max(b, y), b + y + c)), (S = this.AA(t, S, F)), F < 0 && (F = 0)),
      t.dt.e(D, F),
      t.bt.e(b, S));
  }
  customAlignment(t, i, e, s, n) {
    return [i, e, s, n];
  }
  GI(t, i, e, s, n, o, r) {
    Debug && U.s(t, TreeVertex, TreeLayout, "layoutBusChildrenPosDir:v");
    const l = i.length;
    if (l === 0) return (r.e(e, 0, n, o), r);
    if (l === 1) {
      const y = i[0];
      return ((n = y.bt.width), (o = y.bt.height), r.e(e, 0, n, o), r);
    }
    const h = t.nodeSpacing,
      a = t.rowSpacing,
      c = this.orthoAngle(t) === 90;
    let u = 0,
      d = 0,
      m = 0;
    for (let y = 0; y < l; y++) {
      if (y % 2 !== 0 || (l > 1 && y === l - 1)) continue;
      const x = i[y],
        b = x.bt,
        S = u === 0 ? 0 : a;
      if (c) {
        const k = this.computeBusNodeSpacing(x) - h;
        (x.X.e(e - (b.width + k), m + S),
          (n = Math.max(n, b.width + k)),
          (o = Math.max(o, m + S + b.height)),
          (m += S + b.height));
      } else {
        const k = this.computeBusNodeSpacing(x) - h;
        (x.X.e(d + S, e - (b.height + k)),
          (o = Math.max(o, b.height + k)),
          (n = Math.max(n, d + S + b.width)),
          (d += S + b.width));
      }
      u++;
    }
    u = 0;
    const g = d,
      p = m;
    c ? ((d = e + h), (m = 0)) : ((d = 0), (m = e + h));
    for (let y = 0; y < l; y++) {
      if (y % 2 === 0) continue;
      const x = i[y],
        b = x.bt,
        S = u === 0 ? 0 : a;
      if (c) {
        const k = this.computeBusNodeSpacing(x) - h;
        (x.X.e(d + k, m + S),
          (n = Math.max(n, d + b.width + k)),
          (o = Math.max(o, m + S + b.height)),
          (m += S + b.height));
      } else {
        const k = this.computeBusNodeSpacing(x) - h;
        (x.X.e(d + S, m + k),
          (n = Math.max(n, d + S + b.width)),
          (o = Math.max(o, m + b.height + k)),
          (d += S + b.width));
      }
      u++;
    }
    if (l > 1 && l % 2 === 1) {
      const y = i[l - 1],
        x = y.bt,
        b = this.computeBusLastRowSpacing(
          y,
          c ? Math.max(Math.abs(p), Math.abs(m)) : Math.max(Math.abs(g), Math.abs(d)),
        );
      if (c) {
        y.X.e(e + h / 2 - y.focus.x - y.dt.x, o + b);
        const S = e + h / 2 - y.focus.x - y.dt.x;
        ((n = Math.max(n, S + x.width)),
          S < 0 && (n -= S),
          (o = Math.max(o, Math.max(p, m) + b + x.height)),
          y.X.x < 0 && (e = this.yk(t, y.X.x, false, e, h)));
      } else {
        (y.X.e(n + b, e + h / 2 - y.focus.y - y.dt.y), (n = Math.max(n, Math.max(g, d) + b + x.width)));
        const S = e + h / 2 - y.focus.y - y.dt.y;
        ((o = Math.max(o, S + x.height)), S < 0 && (o -= S), y.X.y < 0 && (e = this.yk(t, y.X.y, true, e, h)));
      }
    }
    return (r.e(e, 0, n, o), r);
  }
  qI(t, i, e, s, n, o, r) {
    Debug && U.s(t, TreeVertex, TreeLayout, "layoutBusChildrenNegDir:v");
    const l = i.length;
    if (l === 0) return (r.e(e, 0, n, o), r);
    if (l === 1) {
      const y = i[0];
      return ((n = y.bt.width), (o = y.bt.height), r.e(e, 0, n, o), r);
    }
    const h = t.nodeSpacing,
      a = t.rowSpacing,
      c = this.orthoAngle(t) === 270;
    let u = 0,
      d = 0,
      m = 0;
    for (let y = 0; y < l; y++) {
      if (y % 2 !== 0 || (l > 1 && y === l - 1)) continue;
      const x = i[y],
        b = x.bt,
        S = u === 0 ? 0 : a;
      if (c) {
        const k = this.computeBusNodeSpacing(x) - h;
        ((m -= S + b.height),
          x.X.e(e - (b.width + k), m),
          (n = Math.max(n, b.width + k)),
          (o = Math.max(o, Math.abs(m))));
      } else {
        const k = this.computeBusNodeSpacing(x) - h;
        ((d -= S + b.width),
          x.X.e(d, e - (b.height + k)),
          (o = Math.max(o, b.height + k)),
          (n = Math.max(n, Math.abs(d))));
      }
      u++;
    }
    u = 0;
    const g = d,
      p = m;
    c ? ((d = e + h), (m = 0)) : ((d = 0), (m = e + h));
    for (let y = 0; y < l; y++) {
      if (y % 2 === 0) continue;
      const x = i[y],
        b = x.bt,
        S = u === 0 ? 0 : a;
      if (c) {
        const k = this.computeBusNodeSpacing(x) - h;
        ((m -= S + b.height), x.X.e(d + k, m), (n = Math.max(n, d + b.width + k)), (o = Math.max(o, Math.abs(m))));
      } else {
        const k = this.computeBusNodeSpacing(x) - h;
        ((d -= S + b.width), x.X.e(d, m + k), (o = Math.max(o, m + b.height + k)), (n = Math.max(n, Math.abs(d))));
      }
      u++;
    }
    if (l > 1 && l % 2 === 1) {
      const y = i[l - 1],
        x = y.bt,
        b = this.computeBusLastRowSpacing(
          y,
          c ? Math.max(Math.abs(p), Math.abs(m)) : Math.max(Math.abs(g), Math.abs(d)),
        );
      if (c) {
        y.X.e(e + h / 2 - y.focus.x - y.dt.x, -o - x.height - b);
        const S = e + h / 2 - y.focus.x - y.dt.x;
        ((n = Math.max(n, S + x.width)),
          S < 0 && (n -= S),
          (o = Math.max(o, Math.abs(Math.min(p, m)) + b + x.height)),
          y.X.x < 0 && (e = this.yk(t, y.X.x, false, e, h)));
      } else {
        (y.X.e(-n - x.width - b, e + h / 2 - y.focus.y - y.dt.y),
          (n = Math.max(n, Math.abs(Math.min(g, d)) + b + x.width)));
        const S = e + h / 2 - y.focus.y - y.dt.y;
        ((o = Math.max(o, S + x.height)), S < 0 && (o -= S), y.X.y < 0 && (e = this.yk(t, y.X.y, true, e, h)));
      }
    }
    for (let y = 0; y < l; y++) {
      const x = i[y];
      c ? x.X.e(x.X.x, x.X.y + o) : x.X.e(x.X.x + n, x.X.y);
    }
    return (r.e(e, 0, n, o), r);
  }
  computeBusNodeSpacing(t) {
    return (
      Debug && U.s(t, TreeVertex, TreeLayout, "fixRelativePostions:child"),
      t.parent === null ? 0 : t.parent.nodeSpacing
    );
  }
  computeBusLastRowSpacing(t, i) {
    return (
      Debug && U.s(t, TreeVertex, TreeLayout, "fixRelativePostions:lastchild"),
      t.parent === null ? 0 : t.parent.rowSpacing
    );
  }
  yk(t, i, e, s, n) {
    Debug && U.s(t, TreeVertex, TreeLayout, "fixRelativePostions:v");
    const o = t.children,
      r = o.length;
    for (let h = 0; h < r; h++) e ? o[h].X.e(o[h].X.x, o[h].X.y - i) : o[h].X.e(o[h].X.x - i, o[h].X.y);
    const l = o[r - 1];
    return Math.max(s, e ? l.dt.y + l.focus.y - n / 2 : l.dt.x + l.focus.x - n / 2);
  }
  CA(t, i, e) {
    switch ((Debug && U.s(t, TreeVertex, TreeLayout, "calculateSubwidth:v"), t.alignment)) {
      case 21:
      case 20:
        let s = i;
        return (e + t.width > s && (s = e + t.width), e < 0 && (s -= e), s);
      case 22:
        return t.width > i ? t.width : i;
      case 23:
        return t.focus.x * 2 > i ? t.width : i + t.width - t.focus.x * 2;
      case 24:
      case 25:
        const n = Math.min(0, e),
          o = Math.max(i, e + t.width);
        return Math.max(t.width, o - n);
      case 26:
        return t.width - t.focus.x + t.nodeSpacing / 2 + i;
      case 27:
        return Math.max(t.width, t.focus.x + t.nodeSpacing / 2 + i);
      default:
        return i;
    }
  }
  AA(t, i, e) {
    switch ((Debug && U.s(t, TreeVertex, TreeLayout, "calculateSubheight:v"), t.alignment)) {
      case 21:
      case 20:
        let s = i;
        return (e + t.height > s && (s = e + t.height), e < 0 && (s -= e), s);
      case 22:
        return t.height > i ? t.height : i;
      case 23:
        return t.focus.y * 2 > i ? t.height : i + t.height - t.focus.y * 2;
      case 24:
      case 25:
        const n = Math.min(0, e),
          o = Math.max(i, e + t.height);
        return Math.max(t.height, o - n);
      case 26:
        return t.height - t.focus.y + t.nodeSpacing / 2 + i;
      case 27:
        return Math.max(t.height, t.focus.y + t.nodeSpacing / 2 + i);
      default:
        return i;
    }
  }
  TA(t, i, e) {
    switch ((Debug && U.W(t, TreeAlignment, "TreeAlignment"), t)) {
      case 20:
        ((i /= 2), (e /= 2));
        break;
      case 21:
        ((i /= 2), (e /= 2));
        break;
      case 22:
        ((i = 0), (e = 0));
        break;
      case 23:
        break;
      default:
        U.n("Unhandled alignment value " + t.toString());
    }
    return new Point(i, e);
  }
  Pf(t, i, e, s, n, o) {
    (Debug && U.s(t, TreeVertex, TreeLayout, "shiftRelPosAlign:v"), Debug && U.W(i, TreeAlignment, "TreeAlignment"));
    const r = this.TA(i, e, s);
    this.Mu(t, r.x, r.y, n, o);
  }
  Mu(t, i, e, s, n) {
    if ((Debug && U.s(t, TreeVertex, TreeLayout, "shiftRelPos:v"), i === 0 && e === 0)) return;
    const o = t.children;
    for (let r = s; r <= n; r++) {
      const h = o[r].X;
      ((h.x += i), (h.y += e));
    }
  }
  pk(t, i, e) {
    Debug &&
      (U.s(t, TreeVertex, TreeLayout, "recordMidPoints:v"),
      U.i(i, "number", TreeLayout, "recordMidPoints:x"),
      U.i(e, "number", TreeLayout, "recordMidPoints:y"));
    const s = t.parent;
    switch (this.ks) {
      case 1: {
        const n = t.sourceEdges;
        for (; n.next(); ) {
          const o = n.value;
          o.fromVertex === s && o.relativePoint.e(i, e);
        }
        break;
      }
      case 2: {
        const n = t.destinationEdges;
        for (; n.next(); ) {
          const o = n.value;
          o.toVertex === s && o.relativePoint.e(i, e);
        }
        break;
      }
      default:
        U.n("Unhandled path value " + this.ks.toString());
    }
  }
  bV(t) {
    if ((Debug && U.s(t, TreeVertex, TreeLayout, "layoutTreeBlock:v"), t.childrenCount === 0)) {
      const z = t.parent;
      let H = false,
        W = 0,
        j = 21;
      z !== null && ((W = z.angle), (j = z.alignment), (H = this.isBusAlignment(j)));
      const Z = this.NA(t);
      (t.X.e(0, 0),
        t.bt.e(t.width, t.height),
        t.parent !== null && t.comments !== null && (((W === 180 || W === 270) && !H) || Z)
          ? (W === 180 && !H) || ((W === 90 || W === 270) && Z)
            ? t.dt.e(t.width - t.focus.x * 2, 0)
            : t.dt.e(0, t.height - t.focus.y * 2)
          : t.dt.e(0, 0),
        (t.im = null),
        (t.em = null));
      return;
    }
    const i = this.orthoAngle(t),
      e = i === 90 || i === 270;
    let s = 0;
    const n = t.children,
      o = n.length;
    for (let z = 0; z < o; z++) {
      const H = n[z];
      s = Math.max(s, e ? H.bt.width : H.bt.height);
    }
    const r = t.alignment,
      l = r === 22,
      h = r === 23,
      a = this.isBusAlignment(r),
      f = Math.max(0, t.breadthLimit),
      c = this.computeLayerSpacing(t),
      u = t.nodeSpacing,
      d = this.computeNodeIndent(t),
      m = t.rowSpacing;
    let g = 0;
    (l || h) && (g = Math.max(0, t.rowIndent));
    const p = t.width,
      y = t.height;
    let x = 0,
      b = 0,
      S = 0,
      k = null,
      P = null,
      A = 0,
      C = 0,
      M = 0,
      N = 0,
      T = 0,
      L = 0,
      D = 0,
      F = 0,
      R = 0;
    if ((a && !this.Iw(r) && i > 135 && n.reverse(), this.Iw(r)))
      if (o > 1)
        for (let z = 0; z < o; z++)
          z % 2 === 0 && z !== o - 1
            ? (F = Math.max(F, e ? n[z].bt.width : n[z].bt.height))
            : z % 2 !== 0 && (R = Math.max(R, e ? n[z].bt.width : n[z].bt.height));
      else o === 1 && (F = e ? n[0].bt.width : n[0].bt.height);
    if (a) {
      switch (r) {
        case 24:
          const z = Rect.a();
          (i < 135 ? this.GI(t, n, F, R, x, b, z) : this.qI(t, n, F, R, x, b, z),
            (F = z.x),
            (x = z.width),
            (b = z.height),
            Rect.o(z));
          break;
        case 26:
          for (let H = 0; H < o; H++) {
            const W = n[H],
              j = W.bt,
              Z = L === 0 ? 0 : m;
            (e
              ? (W.X.e(s - j.width, N + Z),
                (x = Math.max(x, j.width)),
                (b = Math.max(b, N + Z + j.height)),
                (N += Z + j.height))
              : (W.X.e(M + Z, s - j.height),
                (x = Math.max(x, M + Z + j.width)),
                (b = Math.max(b, j.height)),
                (M += Z + j.width)),
              L++);
          }
          break;
        case 27:
          for (let H = 0; H < o; H++) {
            const W = n[H],
              j = W.bt,
              Z = L === 0 ? 0 : m;
            (e
              ? (W.X.e(u / 2 + t.focus.x, N + Z),
                (x = Math.max(x, j.width)),
                (b = Math.max(b, N + Z + j.height)),
                (N += Z + j.height))
              : (W.X.e(M + Z, u / 2 + t.focus.y),
                (x = Math.max(x, M + Z + j.width)),
                (b = Math.max(b, j.height)),
                (M += Z + j.width)),
              L++);
          }
          break;
      }
      ((k = this.xe(2)),
        (P = this.xe(2)),
        e
          ? (k[0].e(0, 0), k[1].e(0, b), P[0].e(x, 0), P[1].e(x, b))
          : (k[0].e(0, 0), k[1].e(x, 0), P[0].e(0, b), P[1].e(x, b)));
    } else
      for (let z = 0; z < o; z++) {
        const H = n[z],
          W = H.bt;
        if (e) {
          (f > 0 &&
            L > 0 &&
            M + u + W.width > f &&
            (M < s && this.Pf(t, r, s - M, 0, D, z - 1),
            T++,
            (L = 0),
            (D = z),
            (S = b),
            (M = 0),
            (N = i > 135 ? -b - m : b + m)),
            this.pk(H, 0, N));
          let j = 0;
          if (L === 0)
            ((k = H.im),
              (P = H.em),
              (A = W.width),
              (C = W.height),
              (k === null || P === null || i !== this.orthoAngle(H)) &&
                ((k = this.xe(2)), (P = this.xe(2)), k[0].e(0, 0), k[1].e(0, C), P[0].e(A, 0), P[1].e(A, C)));
          else {
            const Z = U.ht(),
              B = Rect.a();
            (this.HI(t, H, k, P, A, C, Z, B),
              (j = B.x),
              (k = Z[0]),
              (P = Z[1]),
              (A = B.width),
              (C = B.height),
              U.et(Z),
              M < W.width && j < 0 && (this.Mu(t, -j, 0, D, z - 1), this.wk(k, -j, 0), this.wk(P, -j, 0), (j = 0)),
              Rect.o(B));
          }
          (H.X.e(j, N), (x = Math.max(x, A)), (b = Math.max(b, S + (T === 0 ? 0 : m) + W.height)), (M = A));
        } else {
          (f > 0 &&
            L > 0 &&
            N + u + W.height > f &&
            (N < s && this.Pf(t, r, 0, s - N, D, z - 1),
            T++,
            (L = 0),
            (D = z),
            (S = x),
            (N = 0),
            (M = i > 135 ? -x - m : x + m)),
            this.pk(H, M, 0));
          let j = 0;
          if (L === 0)
            ((k = H.im),
              (P = H.em),
              (A = W.width),
              (C = W.height),
              (k === null || P === null || i !== this.orthoAngle(H)) &&
                ((k = this.xe(2)), (P = this.xe(2)), k[0].e(0, 0), k[1].e(A, 0), P[0].e(0, C), P[1].e(A, C)));
          else {
            const Z = U.ht(),
              B = Rect.a();
            (this.HI(t, H, k, P, A, C, Z, B),
              (j = B.x),
              (k = Z[0]),
              (P = Z[1]),
              (A = B.width),
              (C = B.height),
              U.et(Z),
              N < W.height && j < 0 && (this.Mu(t, 0, -j, D, z - 1), this.wk(k, 0, -j), this.wk(P, 0, -j), (j = 0)),
              Rect.o(B));
          }
          (H.X.e(M, j), (b = Math.max(b, C)), (x = Math.max(x, S + (T === 0 ? 0 : m) + W.width)), (N = C));
        }
        L++;
      }
    T > 0 &&
      (e
        ? ((b += Math.max(0, c)),
          M < x && this.Pf(t, r, x - M, 0, D, o - 1),
          g > 0 && (h || this.Mu(t, g, 0, 0, o - 1), (x += g)))
        : ((x += Math.max(0, c)),
          N < b && this.Pf(t, r, 0, b - N, D, o - 1),
          g > 0 && (h || this.Mu(t, 0, g, 0, o - 1), (b += g))));
    let I = 0,
      O = 0;
    switch (r) {
      case 20:
        e ? (I += x / 2 - t.focus.x - d / 2) : (O += b / 2 - t.focus.y - d / 2);
        break;
      default:
      case 21:
        if (T > 0) e ? (I += x / 2 - t.focus.x - d / 2) : (O += b / 2 - t.focus.y - d / 2);
        else {
          const H = o;
          if (e) {
            const W = n[0].X.x + n[0].dt.x,
              j = n[H - 1].X.x + n[H - 1].dt.x + n[H - 1].focus.x * 2;
            I += W + (j - W) / 2 - t.focus.x - d / 2;
          } else {
            const W = n[0].X.y + n[0].dt.y,
              j = n[H - 1].X.y + n[H - 1].dt.y + n[H - 1].focus.y * 2;
            O += W + (j - W) / 2 - t.focus.y - d / 2;
          }
        }
        break;
      case 22:
        e ? ((I -= d), (x += d)) : ((O -= d), (b += d));
        break;
      case 23:
        e ? ((I += x - t.width + d), (x += d)) : ((O += b - t.height + d), (b += d));
        break;
      case 24:
        e
          ? o > 1
            ? (I += F + u / 2 - t.focus.x)
            : (I += n[0].focus.x - t.focus.x + n[0].dt.x)
          : o > 1
            ? (O += F + u / 2 - t.focus.y)
            : (O += n[0].focus.y - t.focus.y + n[0].dt.y);
        break;
      case 26:
        e ? (I += x + u / 2 - t.focus.x) : (O += b + u / 2 - t.focus.y);
        break;
      case 27:
        break;
      case 28:
        const z = this.customAlignment(t, I, O, x, b);
        ((I = z[0]), (O = z[1]), (x = z[2]), (b = z[3]));
        break;
    }
    for (let z = 0; z < o; z++) {
      const H = n[z];
      e
        ? H.X.e(H.X.x + H.dt.x - I, H.X.y + (i > 135 ? (a ? -b : -H.bt.height) + H.dt.y - c : y + c + H.dt.y))
        : H.X.e(H.X.x + (i > 135 ? (a ? -x : -H.bt.width) + H.dt.x - c : p + c + H.dt.x), H.X.y + H.dt.y - O);
    }
    let X = 0,
      K = 0;
    if (a)
      e
        ? ((x = this.CA(t, x, I)),
          I < 0 && (I = 0),
          i > 135 && (O += b + c),
          (b += y + c),
          r === 27 && (X += u / 2 + t.focus.x),
          (K += y + c))
        : (i > 135 && (I += x + c),
          (x += p + c),
          (b = this.AA(t, b, O)),
          O < 0 && (O = 0),
          r === 27 && (K += u / 2 + t.focus.y),
          (X += p + c));
    else if (e) {
      if (t.comments === null) {
        if (p > x) {
          const z = this.TA(r, p - x, 0);
          ((X = z.x), (K = z.y), (x = p), (I = 0));
        }
      } else x = this.CA(t, x, I);
      (I < 0 && ((X -= I), (I = 0)), i > 135 && (O += b + c), (b = Math.max(Math.max(b, y), b + y + c)), (K += y + c));
    } else {
      if ((i > 135 && (I += x + c), (x = Math.max(Math.max(x, p), x + p + c)), t.comments === null)) {
        if (y > b) {
          const z = this.TA(r, 0, y - b);
          ((X = z.x), (K = z.y), (b = y), (O = 0));
        }
      } else b = this.AA(t, b, O);
      (O < 0 && ((K -= O), (O = 0)), (X += p + c));
    }
    let V, Y;
    if (T > 0)
      ((V = this.xe(4)),
        (Y = this.xe(4)),
        e
          ? (V[2].e(0, y + c), V[3].e(V[2].x, b), Y[2].e(x, V[2].y), Y[3].e(Y[2].x, V[3].y))
          : (V[2].e(p + c, 0), V[3].e(x, V[2].y), Y[2].e(V[2].x, b), Y[3].e(V[3].x, Y[2].y)));
    else {
      ((V = this.xe(k.length + 2)), (Y = this.xe(P.length + 2)));
      for (let z = 0; z < k.length; z++) {
        const H = k[z];
        V[z + 2].e(H.x + X, H.y + K);
      }
      for (let z = 0; z < P.length; z++) {
        const H = P[z];
        Y[z + 2].e(H.x + X, H.y + K);
      }
    }
    (e
      ? (V[0].e(I, 0),
        V[1].e(V[0].x, y),
        V[2].y < V[1].y && (V[2].x > V[0].x ? V[2].c(V[1]) : V[1].c(V[2])),
        V[3].y < V[2].y && (V[3].x > V[0].x ? V[3].c(V[2]) : V[2].c(V[3])),
        Y[0].e(I + p, 0),
        Y[1].e(Y[0].x, y),
        Y[2].y < Y[1].y && (Y[2].x < Y[0].x ? Y[2].c(Y[1]) : Y[1].c(Y[2])),
        Y[3].y < Y[2].y && (Y[3].x < Y[0].x ? Y[3].c(Y[2]) : Y[2].c(Y[3])),
        (V[2].y -= c / 2),
        (Y[2].y -= c / 2))
      : (V[0].e(0, O),
        V[1].e(p, V[0].y),
        V[2].x < V[1].x && (V[2].y > V[0].y ? V[2].c(V[1]) : V[1].c(V[2])),
        V[3].x < V[2].x && (V[3].y > V[0].y ? V[3].c(V[2]) : V[2].c(V[3])),
        Y[0].e(0, O + y),
        Y[1].e(p, Y[0].y),
        Y[2].x < Y[1].x && (Y[2].y < Y[0].y ? Y[2].c(Y[1]) : Y[1].c(Y[2])),
        Y[3].x < Y[2].x && (Y[3].y < Y[0].y ? Y[3].c(Y[2]) : Y[2].c(Y[3])),
        (V[2].x -= c / 2),
        (Y[2].x -= c / 2)),
      this.pn(k),
      this.pn(P),
      (t.im = V),
      (t.em = Y),
      t.dt.e(I, O),
      t.bt.e(x, b));
  }
  wk(t, i, e) {
    for (let s = 0; s < t.length; s++) {
      const n = t[s];
      ((n.x += i), (n.y += e));
    }
  }
  HI(t, i, e, s, n, o, r, l) {
    (Debug && U.s(t, TreeVertex, TreeLayout, "mergeFringes:parent"),
      Debug && U.s(i, TreeVertex, TreeLayout, "mergeFringes:child"));
    const h = this.orthoAngle(t),
      a = h === 90 || h === 270,
      f = t.nodeSpacing,
      c = e,
      u = s,
      d = n,
      m = o;
    let g = i.im,
      p = i.em;
    const y = i.bt,
      x = a ? Math.max(m, y.height) : Math.max(d, y.width);
    if (
      ((g === null || h !== this.orthoAngle(i)) &&
        ((g = this.xe(2)),
        (p = this.xe(2)),
        a
          ? (g[0].e(0, 0), g[1].e(0, y.height), p[0].e(y.width, 0), p[1].e(p[0].x, g[1].y))
          : (g[0].e(0, 0), g[1].e(y.width, 0), p[0].e(0, y.height), p[1].e(g[1].x, p[0].y))),
      a)
    ) {
      const b = d;
      let S = b - this.SV(u, g, b);
      return (
        (S += f),
        (e = this.kV(c, g, S)),
        (s = this.PV(u, p, S)),
        (n = Math.max(0, S) + y.width),
        (o = x),
        this.pn(c),
        this.pn(g),
        this.pn(u),
        this.pn(p),
        (r[0] = e),
        (r[1] = s),
        l.e(S, 0, n, o),
        l
      );
    } else {
      const b = m;
      let S = b - this.MV(u, g, b);
      return (
        (S += f),
        (e = this.NV(c, g, S)),
        (s = this.CV(u, p, S)),
        (n = x),
        (o = Math.max(0, S) + y.height),
        this.pn(c),
        this.pn(g),
        this.pn(u),
        this.pn(p),
        (r[0] = e),
        (r[1] = s),
        l.e(S, 0, n, o),
        l
      );
    }
  }
  NV(t, i, e) {
    if (t === null || t.length < 2 || i === null || i.length < 2) return null;
    const s = this.xe(t.length + i.length);
    let n = 0,
      o = 0,
      r = 0;
    for (; o < i.length && i[o].x < t[0].x; ) {
      const a = i[o++];
      s[r++].e(a.x, a.y + e);
    }
    for (; n < t.length; ) {
      const a = t[n++];
      s[r++].e(a.x, a.y);
    }
    const l = t[t.length - 1].x;
    for (; o < i.length && i[o].x <= l; ) o++;
    for (; o < i.length && i[o].x > l; ) {
      const a = i[o++];
      s[r++].e(a.x, a.y + e);
    }
    const h = this.xe(r);
    for (n = 0; n < r; n++) h[n].c(s[n]);
    return (this.pn(s), h);
  }
  kV(t, i, e) {
    if (t === null || t.length < 2 || i === null || i.length < 2) return null;
    const s = this.xe(t.length + i.length);
    let n = 0,
      o = 0,
      r = 0;
    for (; o < i.length && i[o].y < t[0].y; ) {
      const a = i[o++];
      s[r++].e(a.x + e, a.y);
    }
    for (; n < t.length; ) {
      const a = t[n++];
      s[r++].e(a.x, a.y);
    }
    const l = t[t.length - 1].y;
    for (; o < i.length && i[o].y <= l; ) o++;
    for (; o < i.length && i[o].y > l; ) {
      const a = i[o++];
      s[r++].e(a.x + e, a.y);
    }
    const h = this.xe(r);
    for (n = 0; n < r; n++) h[n].c(s[n]);
    return (this.pn(s), h);
  }
  CV(t, i, e) {
    if (t === null || t.length < 2 || i === null || i.length < 2) return null;
    const s = this.xe(t.length + i.length);
    let n = 0,
      o = 0,
      r = 0;
    for (; n < t.length && t[n].x < i[0].x; ) {
      const a = t[n++];
      s[r++].e(a.x, a.y);
    }
    for (; o < i.length; ) {
      const a = i[o++];
      s[r++].e(a.x, a.y + e);
    }
    const l = i[i.length - 1].x;
    for (; n < t.length && t[n].x <= l; ) n++;
    for (; n < t.length && t[n].x > l; ) {
      const a = t[n++];
      s[r++].e(a.x, a.y);
    }
    const h = this.xe(r);
    for (n = 0; n < r; n++) h[n].c(s[n]);
    return (this.pn(s), h);
  }
  PV(t, i, e) {
    if (t === null || t.length < 2 || i === null || i.length < 2) return null;
    const s = this.xe(t.length + i.length);
    let n = 0,
      o = 0,
      r = 0;
    for (; n < t.length && t[n].y < i[0].y; ) {
      const a = t[n++];
      s[r++].e(a.x, a.y);
    }
    for (; o < i.length; ) {
      const a = i[o++];
      s[r++].e(a.x + e, a.y);
    }
    const l = i[i.length - 1].y;
    for (; n < t.length && t[n].y <= l; ) n++;
    for (; n < t.length && t[n].y > l; ) {
      const a = t[n++];
      s[r++].e(a.x, a.y);
    }
    const h = this.xe(r);
    for (n = 0; n < r; n++) h[n].c(s[n]);
    return (this.pn(s), h);
  }
  MV(t, i, e) {
    let s = 9999999;
    if (t === null || t.length < 2 || i === null || i.length < 2) return s;
    let n = 0,
      o = 0;
    for (; n < t.length && o < i.length; ) {
      const r = t[n],
        l = i[o],
        h = l.x;
      let a = l.y;
      a += e;
      let f = r;
      n + 1 < t.length && (f = t[n + 1]);
      let c = l,
        u = c.x,
        d = c.y;
      o + 1 < i.length && ((c = i[o + 1]), (u = c.x), (d = c.y), (d += e));
      let m = s;
      (r.x === h
        ? (m = a - r.y)
        : r.x > h && r.x < u
          ? (m = a + ((r.x - h) / (u - h)) * (d - a) - r.y)
          : h > r.x && h < f.x && (m = a - (r.y + ((h - r.x) / (f.x - r.x)) * (f.y - r.y))),
        m < s && (s = m),
        f.x <= r.x ? n++ : u <= h ? o++ : (f.x <= u && n++, u <= f.x && o++));
    }
    return s;
  }
  SV(t, i, e) {
    let s = 9999999;
    if (t === null || t.length < 2 || i === null || i.length < 2) return s;
    let n = 0,
      o = 0;
    for (; n < t.length && o < i.length; ) {
      const r = t[n],
        l = i[o];
      let h = l.x;
      const a = l.y;
      h += e;
      let f = r;
      n + 1 < t.length && (f = t[n + 1]);
      let c = l,
        u = c.x,
        d = c.y;
      o + 1 < i.length && ((c = i[o + 1]), (u = c.x), (d = c.y), (u += e));
      let m = s;
      (r.y === a
        ? (m = h - r.x)
        : r.y > a && r.y < d
          ? (m = h + ((r.y - a) / (d - a)) * (u - h) - r.x)
          : a > r.y && a < f.y && (m = h - (r.x + ((a - r.y) / (f.y - r.y)) * (f.x - r.x))),
        m < s && (s = m),
        f.y <= r.y ? n++ : d <= a ? o++ : (f.y <= d && n++, d <= f.y && o++));
    }
    return s;
  }
  xe(t) {
    const i = this.mk[t];
    if (i !== void 0) {
      const s = i.pop();
      if (s !== void 0) return s;
    }
    const e = [];
    for (let s = 0; s < t; s++) e[s] = new Point();
    return e;
  }
  pn(t) {
    if (!t) return;
    const i = t.length;
    let e = this.mk[i];
    (e === void 0 && ((e = []), (this.mk[i] = e)), e.push(t));
  }
  arrangeTrees() {
    if (this.Ji === 52) {
      const t = this.Xi.iterator;
      for (; t.next(); ) {
        const i = t.value;
        if (!(i instanceof TreeVertex)) continue;
        const e = i.node;
        if (e === null) continue;
        const s = e.position;
        let n = s.x,
          o = s.y;
        (isFinite(n) || (n = 0), isFinite(o) || (o = 0), this.LA(i, n, o));
      }
    } else {
      const t = [],
        i = this.Xi.iterator;
      for (; i.next(); ) {
        const o = i.value;
        o instanceof TreeVertex && t.push(o);
      }
      switch (this.sorting) {
        default:
        case 10:
          break;
        case 11:
          t.reverse();
          break;
        case 12:
          t.sort(this.comparer);
          break;
        case 13:
          (t.sort(this.comparer), t.reverse());
          break;
      }
      const e = this.arrangementOrigin;
      let s = e.x,
        n = e.y;
      for (let o = 0; o < t.length; o++) {
        const r = t[o];
        switch ((this.LA(r, s + r.dt.x, n + r.dt.y), this.Ji)) {
          case 50:
            n += r.bt.height + this.Ks.height;
            break;
          default:
          case 51:
            s += r.bt.width + this.Ks.width;
            break;
        }
      }
    }
  }
  LA(t, i, e) {
    if (t === null) return;
    (Debug && U.s(t, TreeVertex, TreeLayout, "assignAbsolutePositions:v"), (t.x = i), (t.y = e));
    const s = t.children,
      n = s.length;
    for (let o = 0; o < n; o++) {
      const r = s[o];
      this.LA(r, i + r.X.x, e + r.X.y);
    }
  }
  commitLayout() {
    (this.Pw(), this.commitNodes(), this.kA(), this.isRouting && this.commitLinks());
  }
  commitNodes() {
    if (this.network === null) return;
    const t = this.network.vertexes.iterator;
    for (; t.next(); ) t.value.commit();
    for (t.reset(); t.next(); ) {
      const i = t.value;
      this.layoutComments(i);
    }
  }
  kA() {
    if (this.network === null || this.layerStyle !== 62) return;
    const t = this.PA,
      i = [];
    let e;
    const s = this.network.vertexes.iterator;
    for (; s.next(); ) {
      const h = s.value;
      e === void 0 ? (e = h.bounds.copy()) : e.unionRect(h.bounds);
      let a = i[h.level];
      (a === void 0 ? (a = this.computeLayerSpacing(h)) : (a = Math.max(a, this.computeLayerSpacing(h))),
        (i[h.level] = a));
    }
    if (!e) return;
    for (let h = 0; h < i.length; h++) i[h] === void 0 && (i[h] = 0);
    let n;
    this.angle === 90 || this.angle === 270
      ? (e.inflate(this.nodeSpacing / 2, this.layerSpacing),
        (n = new Point(-this.nodeSpacing / 2, -this.layerSpacing / 2)))
      : (e.inflate(this.layerSpacing, this.nodeSpacing / 2),
        (n = new Point(-this.layerSpacing / 2, -this.nodeSpacing / 2)));
    const o = [],
      r = this.angle === 90 || this.angle === 270 ? e.width : e.height;
    let l = 0;
    if (this.angle === 180 || this.angle === 270) for (let h = 0; h < t.length; h++) l += t[h] + i[h];
    for (let h = 0; h < t.length; h++) {
      const a = t[h] + i[h];
      this.angle === 270
        ? ((l -= a), o.push(new Rect(0, l, r, a)))
        : this.angle === 90
          ? (o.push(new Rect(0, l, r, a)), (l += a))
          : this.angle === 180
            ? ((l -= a), o.push(new Rect(l, 0, a, r)))
            : (o.push(new Rect(l, 0, a, r)), (l += a));
    }
    this.commitLayers(o, n);
  }
  commitLayers(t, i) {}
  commitLinks() {
    if (this.network === null) return;
    const t = this.network.edges.iterator;
    for (; t.next(); ) t.value.commit();
  }
  Pw() {
    const t = this.Xi.iterator;
    for (; t.next(); ) {
      const i = t.value;
      i instanceof TreeVertex && this.vI(i);
    }
  }
  vI(t) {
    if (t === null) return;
    (Debug && U.s(t, TreeVertex, TreeLayout, "setPortSpotsTree:v"), this.setPortSpots(t));
    const i = t.children,
      e = i.length;
    for (let s = 0; s < e; s++) {
      const n = i[s];
      this.vI(n);
    }
  }
  setPortSpots(t) {
    Debug && U.s(t, TreeVertex, TreeLayout, "setPortSpots:v");
    const i = t.alignment;
    if (this.isBusAlignment(i)) this.AV(t, i);
    else {
      const e = this.orthoAngle(t);
      if (this.ks === 1) {
        const s = t.destinationEdges;
        for (; s.next(); ) {
          const o = s.value.link;
          if (o !== null) {
            if (t.setsPortSpot)
              if (t.portSpot.isDefault())
                switch (e) {
                  case 0:
                    o.fromSpot = Spot.MiddleRight;
                    break;
                  case 90:
                    o.fromSpot = Spot.MiddleBottom;
                    break;
                  case 180:
                    o.fromSpot = Spot.MiddleLeft;
                    break;
                  default:
                    o.fromSpot = Spot.MiddleTop;
                    break;
                }
              else o.fromSpot = t.portSpot;
            if (t.setsChildPortSpot)
              if (t.childPortSpot.isDefault())
                switch (e) {
                  case 0:
                    o.toSpot = Spot.MiddleLeft;
                    break;
                  case 90:
                    o.toSpot = Spot.MiddleTop;
                    break;
                  case 180:
                    o.toSpot = Spot.MiddleRight;
                    break;
                  default:
                    o.toSpot = Spot.MiddleBottom;
                    break;
                }
              else o.toSpot = t.childPortSpot;
          }
        }
      } else {
        const s = t.sourceEdges;
        for (; s.next(); ) {
          const o = s.value.link;
          if (o !== null) {
            if (t.setsPortSpot)
              if (t.portSpot.isDefault())
                switch (e) {
                  case 0:
                    o.toSpot = Spot.MiddleRight;
                    break;
                  case 90:
                    o.toSpot = Spot.MiddleBottom;
                    break;
                  case 180:
                    o.toSpot = Spot.MiddleLeft;
                    break;
                  default:
                    o.toSpot = Spot.MiddleTop;
                    break;
                }
              else o.toSpot = t.portSpot;
            if (t.setsChildPortSpot)
              if (t.childPortSpot.isDefault())
                switch (e) {
                  case 0:
                    o.fromSpot = Spot.MiddleLeft;
                    break;
                  case 90:
                    o.fromSpot = Spot.MiddleTop;
                    break;
                  case 180:
                    o.fromSpot = Spot.MiddleRight;
                    break;
                  default:
                    o.fromSpot = Spot.MiddleBottom;
                    break;
                }
              else o.fromSpot = t.childPortSpot;
          }
        }
      }
    }
  }
  AV(t, i) {
    (Debug && U.s(t, TreeVertex, TreeLayout, "setPortSpotsBus:v"), Debug && U.W(i, TreeAlignment, "TreeAlignment"));
    const e = this.ks === 1,
      s = this.orthoAngle(t);
    let n;
    switch (s) {
      case 0:
        n = Spot.MiddleRight;
        break;
      case 90:
        n = Spot.MiddleBottom;
        break;
      case 180:
        n = Spot.MiddleLeft;
        break;
      default:
        n = Spot.MiddleTop;
        break;
    }
    const o = t.children,
      r = o.length;
    switch (i) {
      case 24:
      case 25: {
        for (let l = 0; l < r; l++) {
          const h = o[l],
            a = (e ? h.sourceEdges : h.destinationEdges).first();
          if (a === null) continue;
          const f = a.link;
          if (f !== null) {
            let c = s === 90 || s === 270 ? Spot.MiddleLeft : Spot.MiddleTop;
            if (r === 1 || (l === r - 1 && r % 2 === 1))
              switch (s) {
                case 0:
                  c = Spot.MiddleLeft;
                  break;
                case 90:
                  c = Spot.MiddleTop;
                  break;
                case 180:
                  c = Spot.MiddleRight;
                  break;
                default:
                  c = Spot.MiddleBottom;
                  break;
              }
            else l % 2 === 0 && (c = s === 90 || s === 270 ? Spot.MiddleRight : Spot.MiddleBottom);
            e
              ? (t.setsPortSpot && (f.fromSpot = n), t.setsChildPortSpot && (f.toSpot = c))
              : (t.setsPortSpot && (f.fromSpot = c), t.setsChildPortSpot && (f.toSpot = n));
          }
        }
        break;
      }
      case 26: {
        const l = s === 90 || s === 270 ? Spot.MiddleRight : Spot.MiddleBottom,
          h = e ? t.destinationEdges : t.sourceEdges;
        for (; h.next(); ) {
          const f = h.value.link;
          f !== null &&
            (e
              ? (t.setsPortSpot && (f.fromSpot = n), t.setsChildPortSpot && (f.toSpot = l))
              : (t.setsPortSpot && (f.fromSpot = l), t.setsChildPortSpot && (f.toSpot = n)));
        }
        break;
      }
      case 27: {
        const l = s === 90 || s === 270 ? Spot.MiddleLeft : Spot.MiddleTop,
          h = e ? t.destinationEdges : t.sourceEdges;
        for (; h.next(); ) {
          const f = h.value.link;
          f !== null &&
            (e
              ? (t.setsPortSpot && (f.fromSpot = n), t.setsChildPortSpot && (f.toSpot = l))
              : (t.setsPortSpot && (f.fromSpot = l), t.setsChildPortSpot && (f.toSpot = n)));
        }
        break;
      }
    }
  }
  orthoAngle(t) {
    const i = t.angle;
    return i <= 45 ? 0 : i <= 135 ? 90 : i <= 225 ? 180 : i <= 315 ? 270 : 0;
  }
  computeLayerSpacing(t) {
    Debug && U.s(t, TreeVertex, TreeLayout, "computeLayerSpacing:v");
    const i = this.orthoAngle(t),
      e = i === 90 || i === 270;
    let s = t.layerSpacing;
    if (t.layerSpacingParentOverlap > 0) {
      const n = Math.min(1, t.layerSpacingParentOverlap);
      s -= e ? t.height * n : t.width * n;
    }
    return (s < (e ? -t.height : -t.width) && (s = e ? -t.height : -t.width), s);
  }
  computeNodeIndent(t) {
    Debug && U.s(t, TreeVertex, TreeLayout, "computeNodeIndent:v");
    const i = this.orthoAngle(t),
      e = i === 90 || i === 270;
    let s = t.nodeIndent;
    if (t.nodeIndentPastParent > 0) {
      const n = Math.min(1, t.nodeIndentPastParent);
      s += e ? t.width * n : t.height * n;
    }
    return ((s = Math.max(0, s)), s);
  }
  get roots() {
    return this.Xi;
  }
  set roots(t) {
    this.Xi !== t && (U.s(t, GSet, TreeLayout, "roots"), (this.Xi = t), this.b());
  }
  get path() {
    return this.Bi;
  }
  set path(t) {
    this.Bi !== t && (U.W(t, TreePath, "TreePath"), (this.Bi = t), this.b());
  }
  get treeStyle() {
    return this.Pu;
  }
  set treeStyle(t) {
    this.Pu !== t &&
      (U.W(t, TreeStyle, "TreeStyle"), (t === 40 || t === 42 || t === 41 || t === 43) && ((this.Pu = t), this.b()));
  }
  get layerStyle() {
    return this.tm;
  }
  set layerStyle(t) {
    this.tm !== t &&
      (U.W(t, TreeLayerStyle, "TreeLayerStyle"), (t === 60 || t === 61 || t === 62) && ((this.tm = t), this.b()));
  }
  get comments() {
    return this.ve;
  }
  set comments(t) {
    this.ve !== t && (U.i(t, "boolean", TreeLayout, "comments"), (this.ve = t), this.b());
  }
  get arrangement() {
    return this.Ji;
  }
  set arrangement(t) {
    this.Ji !== t &&
      (U.W(t, TreeArrangement, "TreeArrangement"), (t === 50 || t === 51 || t === 52) && ((this.Ji = t), this.b()));
  }
  get arrangementSpacing() {
    return this.Ks;
  }
  set arrangementSpacing(t) {
    (U.s(t, Size, TreeLayout, "arrangementSpacing"), this.Ks.equals(t) || (this.Ks.c(t), this.b()));
  }
  get rootDefaults() {
    return this.Y;
  }
  set rootDefaults(t) {
    this.Y !== t && (U.s(t, TreeVertex, TreeLayout, "rootDefaults"), (this.Y = t), this.b());
  }
  get alternateDefaults() {
    return this.K;
  }
  set alternateDefaults(t) {
    this.K !== t && (U.s(t, TreeVertex, TreeLayout, "alternateDefaults"), (this.K = t), this.b());
  }
  get sorting() {
    return this.Y.sorting;
  }
  set sorting(t) {
    this.Y.sorting !== t && (U.W(t, TreeSorting, "TreeSorting"), (this.Y.sorting = t), this.b());
  }
  get comparer() {
    return this.Y.comparer;
  }
  set comparer(t) {
    this.Y.comparer !== t && (U.C(t, TreeLayout, "comparer"), (this.Y.comparer = t), this.b());
  }
  get angle() {
    return this.Y.angle;
  }
  set angle(t) {
    this.Y.angle !== t &&
      (U.i(t, "number", TreeLayout, "angle"),
      t === 0 || t === 90 || t === 180 || t === 270
        ? ((this.Y.angle = t), this.b())
        : U.n("TreeLayout.angle must be 0, 90, 180, or 270"));
  }
  get alignment() {
    return this.Y.alignment;
  }
  set alignment(t) {
    this.Y.alignment !== t && (U.W(t, TreeAlignment, "TreeAlignment"), (this.Y.alignment = t), this.b());
  }
  get nodeIndent() {
    return this.Y.nodeIndent;
  }
  set nodeIndent(t) {
    this.Y.nodeIndent !== t &&
      (U.i(t, "number", TreeLayout, "nodeIndent"), t >= 0 && ((this.Y.nodeIndent = t), this.b()));
  }
  get nodeIndentPastParent() {
    return this.Y.nodeIndentPastParent;
  }
  set nodeIndentPastParent(t) {
    this.Y.nodeIndentPastParent !== t &&
      (U.i(t, "number", TreeLayout, "nodeIndentPastParent"),
      t >= 0 && t <= 1 && ((this.Y.nodeIndentPastParent = t), this.b()));
  }
  get nodeSpacing() {
    return this.Y.nodeSpacing;
  }
  set nodeSpacing(t) {
    this.Y.nodeSpacing !== t && (U.i(t, "number", TreeLayout, "nodeSpacing"), (this.Y.nodeSpacing = t), this.b());
  }
  get layerSpacing() {
    return this.Y.layerSpacing;
  }
  set layerSpacing(t) {
    this.Y.layerSpacing !== t && (U.i(t, "number", TreeLayout, "layerSpacing"), (this.Y.layerSpacing = t), this.b());
  }
  get layerSpacingParentOverlap() {
    return this.Y.layerSpacingParentOverlap;
  }
  set layerSpacingParentOverlap(t) {
    this.Y.layerSpacingParentOverlap !== t &&
      (U.i(t, "number", TreeLayout, "layerSpacingParentOverlap"),
      t >= 0 && t <= 1 && ((this.Y.layerSpacingParentOverlap = t), this.b()));
  }
  get compaction() {
    return this.Y.compaction;
  }
  set compaction(t) {
    this.Y.compaction !== t &&
      (U.W(t, TreeCompaction, "TreeCompaction"), (t === 30 || t === 31) && ((this.Y.compaction = t), this.b()));
  }
  get breadthLimit() {
    return this.Y.breadthLimit;
  }
  set breadthLimit(t) {
    this.Y.breadthLimit !== t &&
      (U.i(t, "number", TreeLayout, "breadthLimit"), t >= 0 && ((this.Y.breadthLimit = t), this.b()));
  }
  get rowSpacing() {
    return this.Y.rowSpacing;
  }
  set rowSpacing(t) {
    this.Y.rowSpacing !== t && (U.i(t, "number", TreeLayout, "rowSpacing"), (this.Y.rowSpacing = t), this.b());
  }
  get rowIndent() {
    return this.Y.rowIndent;
  }
  set rowIndent(t) {
    this.Y.rowIndent !== t && (U.i(t, "number", TreeLayout, "rowIndent"), t >= 0 && ((this.Y.rowIndent = t), this.b()));
  }
  get commentSpacing() {
    return this.Y.commentSpacing;
  }
  set commentSpacing(t) {
    this.Y.commentSpacing !== t &&
      (U.i(t, "number", TreeLayout, "commentSpacing"), (this.Y.commentSpacing = t), this.b());
  }
  get commentMargin() {
    return this.Y.commentMargin;
  }
  set commentMargin(t) {
    this.Y.commentMargin !== t && (U.i(t, "number", TreeLayout, "commentMargin"), (this.Y.commentMargin = t), this.b());
  }
  get setsPortSpot() {
    return this.Y.setsPortSpot;
  }
  set setsPortSpot(t) {
    this.Y.setsPortSpot !== t && (U.i(t, "boolean", TreeLayout, "setsPortSpot"), (this.Y.setsPortSpot = t), this.b());
  }
  get portSpot() {
    return this.Y.portSpot;
  }
  set portSpot(t) {
    (U.s(t, Spot, TreeLayout, "portSpot"), this.Y.portSpot.equals(t) || ((this.Y.portSpot = t), this.b()));
  }
  get setsChildPortSpot() {
    return this.Y.setsChildPortSpot;
  }
  set setsChildPortSpot(t) {
    this.Y.setsChildPortSpot !== t &&
      (U.i(t, "boolean", TreeLayout, "setsChildPortSpot"), (this.Y.setsChildPortSpot = t), this.b());
  }
  get childPortSpot() {
    return this.Y.childPortSpot;
  }
  set childPortSpot(t) {
    (U.s(t, Spot, TreeLayout, "childPortSpot"),
      this.Y.childPortSpot.equals(t) || ((this.Y.childPortSpot = t), this.b()));
  }
  get alternateSorting() {
    return this.K.sorting;
  }
  set alternateSorting(t) {
    this.K.sorting !== t && (U.W(t, TreeSorting, "TreeSorting"), (this.K.sorting = t), this.b());
  }
  get alternateComparer() {
    return this.K.comparer;
  }
  set alternateComparer(t) {
    this.K.comparer !== t && (U.C(t, TreeLayout, "alternateComparer"), (this.K.comparer = t), this.b());
  }
  get alternateAngle() {
    return this.K.angle;
  }
  set alternateAngle(t) {
    this.K.angle !== t &&
      (U.i(t, "number", TreeLayout, "alternateAngle"),
      (t === 0 || t === 90 || t === 180 || t === 270) && ((this.K.angle = t), this.b()));
  }
  get alternateAlignment() {
    return this.K.alignment;
  }
  set alternateAlignment(t) {
    this.K.alignment !== t && (U.W(t, TreeAlignment, "TreeAlignment"), (this.K.alignment = t), this.b());
  }
  get alternateNodeIndent() {
    return this.K.nodeIndent;
  }
  set alternateNodeIndent(t) {
    this.K.nodeIndent !== t &&
      (U.i(t, "number", TreeLayout, "alternateNodeIndent"), t >= 0 && ((this.K.nodeIndent = t), this.b()));
  }
  get alternateNodeIndentPastParent() {
    return this.K.nodeIndentPastParent;
  }
  set alternateNodeIndentPastParent(t) {
    this.K.nodeIndentPastParent !== t &&
      (U.i(t, "number", TreeLayout, "alternateNodeIndentPastParent"),
      t >= 0 && t <= 1 && ((this.K.nodeIndentPastParent = t), this.b()));
  }
  get alternateNodeSpacing() {
    return this.K.nodeSpacing;
  }
  set alternateNodeSpacing(t) {
    this.K.nodeSpacing !== t &&
      (U.i(t, "number", TreeLayout, "alternateNodeSpacing"), (this.K.nodeSpacing = t), this.b());
  }
  get alternateLayerSpacing() {
    return this.K.layerSpacing;
  }
  set alternateLayerSpacing(t) {
    this.K.layerSpacing !== t &&
      (U.i(t, "number", TreeLayout, "alternateLayerSpacing"), (this.K.layerSpacing = t), this.b());
  }
  get alternateLayerSpacingParentOverlap() {
    return this.K.layerSpacingParentOverlap;
  }
  set alternateLayerSpacingParentOverlap(t) {
    this.K.layerSpacingParentOverlap !== t &&
      (U.i(t, "number", TreeLayout, "alternateLayerSpacingParentOverlap"),
      t >= 0 && t <= 1 && ((this.K.layerSpacingParentOverlap = t), this.b()));
  }
  get alternateCompaction() {
    return this.K.compaction;
  }
  set alternateCompaction(t) {
    this.K.compaction !== t &&
      (U.W(t, TreeCompaction, "TreeCompaction"), (t === 30 || t === 31) && ((this.K.compaction = t), this.b()));
  }
  get alternateBreadthLimit() {
    return this.K.breadthLimit;
  }
  set alternateBreadthLimit(t) {
    this.K.breadthLimit !== t &&
      (U.i(t, "number", TreeLayout, "alternateBreadthLimit"), t >= 0 && ((this.K.breadthLimit = t), this.b()));
  }
  get alternateRowSpacing() {
    return this.K.rowSpacing;
  }
  set alternateRowSpacing(t) {
    this.K.rowSpacing !== t && (U.i(t, "number", TreeLayout, "alternateRowSpacing"), (this.K.rowSpacing = t), this.b());
  }
  get alternateRowIndent() {
    return this.K.rowIndent;
  }
  set alternateRowIndent(t) {
    this.K.rowIndent !== t &&
      (U.i(t, "number", TreeLayout, "alternateRowIndent"), t >= 0 && ((this.K.rowIndent = t), this.b()));
  }
  get alternateCommentSpacing() {
    return this.K.commentSpacing;
  }
  set alternateCommentSpacing(t) {
    this.K.commentSpacing !== t &&
      (U.i(t, "number", TreeLayout, "alternateCommentSpacing"), (this.K.commentSpacing = t), this.b());
  }
  get alternateCommentMargin() {
    return this.K.commentMargin;
  }
  set alternateCommentMargin(t) {
    this.K.commentMargin !== t &&
      (U.i(t, "number", TreeLayout, "alternateCommentMargin"), (this.K.commentMargin = t), this.b());
  }
  get alternateSetsPortSpot() {
    return this.K.setsPortSpot;
  }
  set alternateSetsPortSpot(t) {
    this.K.setsPortSpot !== t &&
      (U.i(t, "boolean", TreeLayout, "alternateSetsPortSpot"), (this.K.setsPortSpot = t), this.b());
  }
  get alternatePortSpot() {
    return this.K.portSpot;
  }
  set alternatePortSpot(t) {
    (U.s(t, Spot, TreeLayout, "alternatePortSpot"), this.K.portSpot.equals(t) || ((this.K.portSpot = t), this.b()));
  }
  get alternateSetsChildPortSpot() {
    return this.K.setsChildPortSpot;
  }
  set alternateSetsChildPortSpot(t) {
    this.K.setsChildPortSpot !== t &&
      (U.i(t, "boolean", TreeLayout, "alternateSetsChildPortSpot"), (this.K.setsChildPortSpot = t), this.b());
  }
  get alternateChildPortSpot() {
    return this.K.childPortSpot;
  }
  set alternateChildPortSpot(t) {
    (U.s(t, Spot, TreeLayout, "alternateChildPortSpot"),
      this.K.childPortSpot.equals(t) || ((this.K.childPortSpot = t), this.b()));
  }
  static PathDefault = 0;
  static PathDestination = 1;
  static PathSource = 2;
  static SortingForwards = 10;
  static SortingReverse = 11;
  static SortingAscending = 12;
  static SortingDescending = 13;
  static AlignmentCenterSubtrees = 20;
  static AlignmentCenterChildren = 21;
  static AlignmentStart = 22;
  static AlignmentEnd = 23;
  static AlignmentBus = 24;
  static AlignmentBusBranching = 25;
  static AlignmentTopLeftBus = 26;
  static AlignmentBottomRightBus = 27;
  static CompactionNone = 30;
  static CompactionBlock = 31;
  static StyleLayered = 40;
  static StyleLastParents = 41;
  static StyleAlternating = 42;
  static StyleRootOnly = 43;
  static ArrangementVertical = 50;
  static ArrangementHorizontal = 51;
  static ArrangementFixedRoots = 52;
  static LayerIndividual = 60;
  static LayerSiblings = 61;
  static LayerUniform = 62;
}
