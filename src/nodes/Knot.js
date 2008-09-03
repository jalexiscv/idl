class Knot {
  Be;
  zs;
  Ge;
  cg;
  constructor(t, i) {
    (GSet._i(this), (this.Be = t), (this.zs = i), (this.Ge = []), (this.cg = false));
  }
  toString() {
    const t = this.Ge;
    let i = this.Be.toString() + " " + t.length.toString() + ":";
    for (let e = 0; e < t.length; e++) {
      const s = t[e];
      s !== null &&
        (i +=
          `
  ` + s.toString());
    }
    return i;
  }
  Z3(t, i, e, s) {
    const n = i.offsetY;
    switch (n) {
      case 8:
        return 90;
      case 2:
        return 180;
      case 1:
        return 270;
      case 4:
        return 0;
    }
    let o = e;
    switch (n) {
      case 9:
        return o > 180 ? 270 : 90;
      case 6:
        return o > 90 && o <= 270 ? 180 : 0;
    }
    const r = (Math.atan2(t.height, t.width) * 180) / Math.PI;
    switch (n) {
      case 3:
        return o > r && o <= 180 + r ? 180 : 270;
      case 5:
        return o > 180 - r && o <= 360 - r ? 270 : 0;
      case 12:
        return o > r && o <= 180 + r ? 90 : 0;
      case 10:
        return o > 180 - r && o <= 360 - r ? 180 : 90;
      case 7:
        return o > 90 && o <= 180 + r ? 180 : o > 180 + r && o <= 360 - r ? 270 : 0;
      case 13:
        return o > 180 && o <= 360 - r ? 270 : o > r && o <= 180 ? 90 : 0;
      case 14:
        return o > r && o <= 180 - r ? 90 : o > 180 - r && o <= 270 ? 180 : 0;
      case 11:
        return o > 180 - r && o <= 180 + r ? 180 : o > 180 + r ? 270 : 90;
    }
    return (
      s && n !== 15 && ((o -= 15), o < 0 && (o += 360)),
      o > r && o < 180 - r ? 90 : o >= 180 - r && o <= 180 + r ? 180 : o > 180 + r && o < 360 - r ? 270 : 0
    );
  }
  ig() {
    this.Ge.length = 0;
  }
  bF(t) {
    let i = this.Ge;
    i.length === 0 && (this.Q3(), (i = this.Ge));
    for (let e = 0; e < i.length; e++) {
      const s = i[e];
      if (s !== null && s.ns === t) return s;
    }
    return null;
  }
  Q3() {
    if (!this.cg) {
      const t = this.cg;
      this.cg = true;
      let i,
        e = null;
      const s = this.Be,
        n = s instanceof Group ? s : null;
      if (n !== null && !n.isSubGraphExpanded) {
        if (!n.actualBounds.isReal()) return ((this.cg = t), this.Ge);
        ((e = n), (i = e.findExternalLinksConnected()));
      } else s.isTreeExpanded ? (i = s.findLinksConnected(this.zs.portId)) : (i = s.findExternalTreeLinksConnected());
      this.Ge.length = 0;
      let o = 0;
      const r = this.zs.getDocumentPoint(Spot.TopLeft, Point.a()),
        l = this.zs.getDocumentPoint(Spot.BottomRight, Point.a()),
        h = Rect.U(r.x, r.y, 0, 0);
      (h.unionPoint(l), Point.o(r), Point.o(l));
      const a = Point.U(h.x + h.width / 2, h.y + h.height / 2),
        f = this.zs.getDocumentAngle(),
        c = i.iterator;
      for (; c.next(); ) {
        const g = c.value;
        if (!g.isVisible()) continue;
        const p = g.fromPort,
          y = g.toPort;
        if (p === y) continue;
        if (e !== null && this.zs === e.port) {
          if ((p?.part === e && p !== this.zs) || (y?.part === e && y !== this.zs)) continue;
        } else if (p !== this.zs && y !== this.zs) continue;
        const x = p === this.zs || (e !== null && g.fromNode !== null && g.fromNode.isMemberOf(e)),
          b = g.computeSpot(x, this.zs);
        if (!b.isSide()) continue;
        let S;
        if ((x ? (S = y) : (S = p), S === null)) continue;
        let k = S.part;
        if (k === null) continue;
        const P = k.findVisibleNode();
        P !== null && P !== k && ((k = P), (S = k.port));
        const A = g.computeOtherPoint(k, S);
        let C = a.directionPoint(A);
        f !== 0 && (C = G.Yi(C - f));
        const M = this.Z3(h, b, C, g.isOrthogonal);
        let N = 0;
        M === 0
          ? ((N = 4), C > 180 && (C -= 360))
          : M === 90
            ? ((N = 8), C > 270 && (C -= 360))
            : M === 180
              ? (N = 2)
              : ((N = 1), C < 90 && (C += 360));
        let T = this.Ge[o];
        (T === void 0 ? ((T = new LinkInfo(g, C, N)), (this.Ge[o] = T)) : ((T.ns = g), (T.vt = C), (T.ge = N)),
          T.TS.c(A),
          o++);
      }
      (Point.o(a), this._3());
      const u = this.Ge.length;
      let d = -1,
        m = 0;
      for (o = 0; o < u; o++) {
        const g = this.Ge[o];
        g !== void 0 && (g.ge !== d && ((d = g.ge), (m = 0)), (g.ug = m), m++);
      }
      for (d = -1, m = 0, o = u - 1; o >= 0; o--) {
        const g = this.Ge[o];
        g !== void 0 && (g.ge !== d && ((d = g.ge), (m = g.ug + 1)), (g.Jc = m));
      }
      (this.t4(this.Ge), this.i4(this.Ge), (this.cg = t), Rect.o(h));
    }
    return this.Ge;
  }
  e4(t, i) {
    return t === i
      ? 0
      : t === null
        ? -1
        : i === null
          ? 1
          : t.ge < i.ge
            ? -1
            : t.ge > i.ge
              ? 1
              : t.vt < i.vt
                ? -1
                : t.vt > i.vt
                  ? 1
                  : 0;
  }
  _3() {
    this.Ge.sort(Knot.prototype.e4);
  }
  t4(t) {
    const i = this.zs,
      e = this.Be.portSpreading,
      s = Point.a(),
      n = Point.a(),
      o = Point.a(),
      r = Point.a();
    (i.getDocumentPoint(Spot.TopLeft, s),
      i.getDocumentPoint(Spot.TopRight, n),
      i.getDocumentPoint(Spot.BottomRight, o),
      i.getDocumentPoint(Spot.BottomLeft, r));
    let l = 0,
      h = 0,
      a = 0,
      f = 0;
    if (e === 2)
      for (let x = 0; x < t.length; x++) {
        const b = t[x];
        if (b === null) continue;
        const S = b.ns.computeThickness();
        switch (b.ge) {
          case 8:
            a += S;
            break;
          case 2:
            f += S;
            break;
          case 1:
            l += S;
            break;
          default:
          case 4:
            h += S;
            break;
        }
      }
    let c = 0,
      u = 0,
      d = 1,
      m = n,
      g = o,
      p = 0,
      y = 0;
    for (let x = 0; x < t.length; x++) {
      const b = t[x];
      if (b === null) continue;
      if (c !== b.ge) {
        switch (((c = b.ge), c)) {
          case 8:
            ((m = o), (g = r));
            break;
          case 2:
            ((m = r), (g = s));
            break;
          case 1:
            ((m = s), (g = n));
            break;
          default:
          case 4:
            ((m = n), (g = o));
            break;
        }
        switch (((p = g.x - m.x), (y = g.y - m.y), c)) {
          case 8:
            a > Math.abs(p) ? ((d = Math.abs(p) / a), (a = Math.abs(p))) : (d = 1);
            break;
          case 2:
            f > Math.abs(y) ? ((d = Math.abs(y) / f), (f = Math.abs(y))) : (d = 1);
            break;
          case 1:
            l > Math.abs(p) ? ((d = Math.abs(p) / l), (l = Math.abs(p))) : (d = 1);
            break;
          default:
          case 4:
            h > Math.abs(y) ? ((d = Math.abs(y) / h), (h = Math.abs(y))) : (d = 1);
            break;
        }
        u = 0;
      }
      const S = b.rf;
      if (e === 2) {
        let k = b.ns.computeThickness();
        switch (((k *= d), S.c(m), c)) {
          case 8:
            S.x = m.x + p / 2 + a / 2 - u - k / 2;
            break;
          case 2:
            S.y = m.y + y / 2 + f / 2 - u - k / 2;
            break;
          case 1:
            S.x = m.x + p / 2 - l / 2 + u + k / 2;
            break;
          default:
          case 4:
            S.y = m.y + y / 2 - h / 2 + u + k / 2;
            break;
        }
        u += k;
      } else {
        let k = 0.5;
        (e === 1 && (k = (b.ug + 1) / (b.Jc + 1)), (S.x = m.x + p * k), (S.y = m.y + y * k));
      }
    }
    (Point.o(s), Point.o(n), Point.o(o), Point.o(r));
  }
  i4(t) {
    for (let i = 0; i < t.length; i++) {
      const e = t[i];
      e !== null && (e.MS = this.s4(e, i));
    }
  }
  s4(t, i) {
    const e = t.ns,
      s = e.fromPort === this.zs;
    let n = 0;
    switch (t.ge) {
      case 1:
        n = 270;
        break;
      case 2:
        n = 180;
        break;
      case 4:
        n = 0;
        break;
      case 8:
        n = 90;
        break;
    }
    const o = e.kS(this.Be, this.zs, Spot.None, s, n);
    let r = t.ug;
    if (r < 0) return o;
    const l = t.Jc;
    if (l <= 1 || !e.isOrthogonal) return o;
    const a = t.TS,
      f = t.rf,
      c = t.ge === 2 || t.ge === 8;
    c && (r = l - 1 - r);
    const u = Link.hF,
      d = t.ge === 2 || t.ge === 4,
      m = r <= 0 ? f : this.Ge[c ? i + 1 : i - 1].rf,
      g = r >= l - 1 ? f : this.Ge[c ? i - 1 : i + 1].rf;
    return (d ? a.y >= m.y && a.y <= g.y : a.x >= m.x && a.x <= g.x)
      ? o
      : (d ? a.y < f.y : a.x < f.x)
        ? o + r * u
        : o + (l - 1 - r) * u;
  }
}
