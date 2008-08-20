class Shape extends GraphObject {
  xt;
  rn;
  vd;
  Ja;
  ee;
  er;
  Qo;
  Jt;
  Wd;
  jd;
  j;
  constructor(t, i) {
    (super(),
      (this.xt = null),
      (this.rn = null),
      (this.vd = "None"),
      (this.Ja = "black"),
      (this.ee = "black"),
      (this.er = 1),
      (this.Qo = null),
      (this.Jt = null),
      (this.Wd = NaN),
      (this.jd = NaN),
      (this.j = null),
      typeof t == "string" ? (this.figure = t) : t && Object.assign(this, t),
      i && Object.assign(this, i));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.xt = this.xt),
      (t.rn = this.rn),
      (t.vd = this.vd),
      (t.Ja = this.Ja),
      (t.ee = this.ee),
      (t.er = this.er),
      this.Qo !== null && (t.Qo = this.Qo.slice()),
      this.Jt !== null && (this.Jt.wi ? (t.Jt = this.Jt) : (t.Jt = this.Jt.copy())),
      (t.Wd = this.Wd),
      (t.jd = this.jd),
      this.j !== null && (t.j = this.j.copy()));
  }
  $a() {
    return (
      this.Jt === null ? (this.Jt = new ShapeTemplateSettings()) : this.Jt.wi && (this.Jt = this.Jt.copy()),
      this.Jt
    );
  }
  Ch() {
    (super.Ch(), this.Jt !== null && (this.Jt.wi = true));
  }
  gi(t) {
    t in GeometryStretch ? (this.geometryStretch = t) : super.gi(t);
  }
  toString() {
    return (
      "Shape(" +
      (this.figure !== "None" ? this.figure : this.toArrow !== "None" ? this.toArrow : this.fromArrow) +
      ")#" +
      GSet.Ps(this)
    );
  }
  r3(t, i) {
    const e = this.pathPattern;
    if (e === null) return;
    e.gt(1 / 0, 1 / 0);
    const s = e.measuredBounds;
    e.Ut(0, 0, s.width, s.height);
    const n = this.geometry;
    if (n === null) return;
    (t.save(), t.beginPath());
    const o = U.ht();
    if (n.type === 1) (o.push(n.startX), o.push(n.startY), o.push(n.endX), o.push(n.endY), this.Jd(t, i, o, e));
    else if (n.type === 4) {
      const r = n.figures.iterator;
      for (; r.next(); ) {
        const l = r.value;
        ((o.length = 0), o.push(l.startX), o.push(l.startY));
        let h = l.startX,
          a = l.startY,
          f = h,
          c = a;
        const u = l.segments.h,
          d = u.length;
        for (let m = 0; m < d; m++) {
          const g = u[m];
          switch (g.type) {
            case 1:
              (this.Jd(t, i, o, e),
                (o.length = 0),
                o.push(g.endX),
                o.push(g.endY),
                (h = g.endX),
                (a = g.endY),
                (f = h),
                (c = a));
              break;
            case 2:
              (o.push(g.endX), o.push(g.endY), (h = g.endX), (a = g.endY));
              break;
            case 3:
              (G.Qn(h, a, g.point1X, g.point1Y, g.point2X, g.point2Y, g.endX, g.endY, 0.5, o),
                (h = g.endX),
                (a = g.endY));
              break;
            case 4:
              (G.hm(h, a, g.point1X, g.point1Y, g.endX, g.endY, 0.5, o), (h = g.endX), (a = g.endY));
              break;
            case 5: {
              const p = g.Vo(l),
                y = p.length;
              if (y === 0) {
                (o.push(g.centerX), o.push(g.centerY), (h = g.centerX), (a = g.centerY));
                break;
              }
              for (let x = 0; x < y; x++) {
                const b = p[x];
                (G.Qn(h, a, b[2], b[3], b[4], b[5], b[6], b[7], 0.5, o), (h = b[6]), (a = b[7]));
              }
              break;
            }
            case 6: {
              const p = g.na(l, h, a),
                y = p.length;
              if (y === 0) {
                (o.push(g.endX), o.push(g.endY), (h = g.endX), (a = g.endY));
                break;
              }
              for (let x = 0; x < y; x++) {
                const b = p[x];
                (G.Qn(h, a, b[2], b[3], b[4], b[5], b[6], b[7], 0.5, o), (h = b[6]), (a = b[7]));
              }
              break;
            }
            default:
              U.n("Segment not of valid type: " + g.type);
          }
          g.isClosed && (o.push(f), o.push(c), this.Jd(t, i, o, e));
        }
        this.Jd(t, i, o, e);
      }
    } else if (n.type === 2)
      (o.push(n.startX),
        o.push(n.startY),
        o.push(n.endX),
        o.push(n.startY),
        o.push(n.endX),
        o.push(n.endY),
        o.push(n.startX),
        o.push(n.endY),
        o.push(n.startX),
        o.push(n.startY),
        this.Jd(t, i, o, e));
    else if (n.type === 3) {
      const r = new PathFigure();
      ((r.startX = n.endX), (r.startY = (n.startY + n.endY) / 2));
      const l = new PathSegment(5);
      ((l.startAngle = 0),
        (l.sweepAngle = 360),
        (l.centerX = (n.startX + n.endX) / 2),
        (l.centerY = (n.startY + n.endY) / 2),
        (l.radiusX = Math.abs(n.startX - n.endX) / 2),
        (l.radiusY = Math.abs(n.startY - n.endY) / 2),
        r.add(l));
      const h = l.Vo(r),
        a = h.length;
      if (a === 0) (o.push(l.centerX), o.push(l.centerY));
      else {
        let f = r.startX,
          c = r.startY;
        for (let u = 0; u < a; u++) {
          const d = h[u];
          (G.Qn(f, c, d[2], d[3], d[4], d[5], d[6], d[7], 0.5, o), (f = d[6]), (c = d[7]));
        }
      }
      this.Jd(t, i, o, e);
    }
    (U.et(o), t.restore(), t.clearContextCache(false));
  }
  l3(t) {
    let i = t.measuredBounds.width;
    return (t instanceof Shape && (i -= t.strokeWidth), i < 1 && (i = 1), i);
  }
  Jd(t, i, e, s) {
    const n = e.length;
    if (n < 4) return;
    const o = s.measuredBounds,
      r = Math.max(1, o.width),
      l = o.height;
    let h = e[0],
      a = e[1],
      f = 0,
      c = 0,
      u = 0,
      d = 0,
      m = 0,
      g = 0,
      p = 0,
      y = 0;
    const x = U.ht();
    for (let N = 2; N < n; N += 2)
      ((f = e[N]),
        (c = e[N + 1]),
        (u = f - h),
        (d = c - a),
        u === 0 && (u = 0.001),
        (m = d / u),
        (g = Math.atan2(d, u)),
        (p = Math.sqrt(u * u + d * d)),
        x.push([u, g, m, p]),
        (y += p),
        (h = f),
        (a = c));
    ((h = e[0]), (a = e[1]));
    const b = this.l3(s);
    let S = b;
    const k = r / 2;
    let P = k !== 0,
      A = 0,
      C = x[A];
    ((u = C[0]), (g = C[1]), (m = C[2]), (p = C[3]));
    let M = 0;
    for (; y >= 0.1; ) {
      if ((M === 0 && (P ? ((S = b), (S -= k), (y -= k), (P = false)) : (S = b), S === 0 && (S = 1)), S > y)) {
        ((S = y), U.et(x));
        return;
      }
      S > p ? ((M = S - p), (S = p)) : (M = 0);
      let N = Math.sqrt((S * S) / (1 + m * m));
      if (
        (u < 0 && (N = -N),
        (h += N),
        (a += m * N),
        t.translate(h, a),
        t.rotate(g),
        t.translate(-(r / 2), -(l / 2)),
        M === 0 && s.Dh(t, i),
        t.translate(r / 2, l / 2),
        t.rotate(-g),
        t.translate(-h, -a),
        (y -= S),
        (p -= S),
        M !== 0)
      ) {
        if ((A++, A === x.length)) {
          U.et(x);
          return;
        }
        ((C = x[A]), (u = C[0]), (g = C[1]), (m = C[2]), (p = C[3]), (S = M));
      }
    }
    U.et(x);
  }
  Dh(t, i) {
    const e = t instanceof SVGContext;
    let s = this.ee;
    const n = this.Ja;
    if (s === null && n === null) return;
    const o = this.xt;
    if (o === null) return;
    t.commitTransform();
    const r = this.actualBounds,
      l = this.naturalBounds;
    n !== null && this.Cn(t, n, true, false, l, r);
    const h = this.part;
    let a = this.er;
    (s !== null && a === 0 && h !== null && (this.isPanelMain || h.findMainElement() === this) && (a = h.h3()),
      a === 0 && (s = null),
      s !== null &&
        a !== 0 &&
        (this.Cn(t, s, false, false, l, r),
        (t.lineWidth = a),
        (t.lineJoin = this.strokeJoin),
        (t.lineCap = this.strokeCap),
        (t.miterLimit = this.strokeMiterLimit)));
    let f = false;
    (h && i.getRenderingHint("drawShadows") && (f = h.isShadowed), t.cl === false && (f = false));
    let c = true;
    s !== null && (n === null || n === "transparent") && (c = false);
    let u = false;
    const d = this.strokeDashArray;
    if ((d !== null && ((u = true), t.enableDash(d, this.strokeDashOffset)), o.type === 1))
      (t.beginPath(),
        t.moveTo(o.startX, o.startY),
        t.lineTo(o.endX, o.endY),
        s !== null && t.strokeContext(),
        t.endPath());
    else if (o.type === 2) {
      const m = o.startX,
        g = o.startY,
        p = o.endX,
        y = o.endY,
        x = Math.min(m, p),
        b = Math.min(g, y),
        S = Math.abs(p - m),
        k = Math.abs(y - g);
      (t.beginPath(),
        t.rect(x, b, S, k),
        n !== null && t.fillContext(n, false, null),
        s !== null && (c && f && t.shadowsOff(), t.strokeContext(), c && f && t.shadowsOn()),
        t.endPath());
    } else if (o.type === 3) {
      const m = o.startX,
        g = o.startY,
        p = o.endX,
        y = o.endY,
        x = Math.abs(p - m) / 2,
        b = Math.abs(y - g) / 2,
        S = Math.min(m, p) + x,
        k = Math.min(g, y) + b;
      (t.beginPath(),
        t.moveTo(S, k - b),
        t.bezierCurveTo(S + G.Zn * x, k - b, S + x, k - G.Zn * b, S + x, k),
        t.bezierCurveTo(S + x, k + G.Zn * b, S + G.Zn * x, k + b, S, k + b),
        t.bezierCurveTo(S - G.Zn * x, k + b, S - x, k + G.Zn * b, S - x, k),
        t.bezierCurveTo(S - x, k - G.Zn * b, S - G.Zn * x, k - b, S, k - b),
        t.closePath(),
        n !== null && t.fillContext(n, false, null),
        s !== null && (c && f && t.shadowsOff(), t.strokeContext(), c && f && t.shadowsOn()),
        t.endPath());
    } else if (o.type === 4) {
      const m = o.figures,
        g = m.length;
      for (let p = 0; p < g; p++) {
        const y = m.h[p];
        e ? (t.beginPath(), this.LD(t, y)) : y.Ze === null && ((y.Ze = new Path2D()), this.LD(y.Ze, y));
        const x = y.isFilled;
        (f
          ? y.isShadowed
            ? (x === true && n !== "transparent" && n !== null && t.fillContext(n, y.isEvenOdd, y.Ze),
              s !== null && (x && c && t.shadowsOff(), t.stroke(y.Ze), x && c && t.shadowsOn()))
            : (t.shadowsOff(),
              x && n !== "transparent" && n !== null && t.fillContext(n, y.isEvenOdd, y.Ze),
              s !== null && t.stroke(y.Ze),
              t.shadowsOn())
          : (x && n !== null && t.fillContext(n, y.isEvenOdd, y.Ze), s !== null && t.stroke(y.Ze)),
          t.endPath(p));
      }
    }
    (u && t.disableDash(), this.r3(t, i));
  }
  LD(t, i) {
    t.moveTo(i.startX, i.startY);
    const e = i.segments.h,
      s = e.length;
    let n = null;
    for (let o = 0; o < s; o++) {
      const r = e[o];
      switch (r.type) {
        case 1:
          t.moveTo(r.endX, r.endY);
          break;
        case 2:
          t.lineTo(r.endX, r.endY);
          break;
        case 3:
          t.bezierCurveTo(r.point1X, r.point1Y, r.point2X, r.point2Y, r.endX, r.endY);
          break;
        case 4:
          t.quadraticCurveTo(r.point1X, r.point1Y, r.endX, r.endY);
          break;
        case 5:
          if (r.radiusX === r.radiusY) {
            const l = n !== null ? n.endX : i.startX,
              h = n !== null ? n.endY : i.startY,
              a = Math.PI / 180;
            t.arc(
              r.point1X,
              r.point1Y,
              r.radiusX,
              r.startAngle * a,
              (r.startAngle + r.sweepAngle) * a,
              r.sweepAngle < 0,
              l,
              h,
            );
          } else {
            const l = r.Vo(i),
              h = l.length;
            if (h === 0) {
              t.lineTo(r.centerX, r.centerY);
              break;
            }
            for (let a = 0; a < h; a++) {
              const f = l[a];
              (a === 0 && t.lineTo(f[0], f[1]), t.bezierCurveTo(f[2], f[3], f[4], f[5], f[6], f[7]));
            }
          }
          break;
        case 6: {
          let l = 0,
            h = 0,
            a;
          if (n !== null && n.type === 5) {
            a = n.Vo(i);
            const c = a.length;
            if (c === 0) {
              t.lineTo(r.endX, r.endY);
              break;
            }
            const u = a[c - 1] || null;
            u !== null && ((l = u[6]), (h = u[7]));
          } else ((l = n !== null ? n.endX : i.startX), (h = n !== null ? n.endY : i.startY));
          a = r.na(i, l, h);
          const f = a.length;
          if (f === 0) {
            t.lineTo(r.endX, r.endY);
            break;
          }
          for (let c = 0; c < f; c++) {
            const u = a[c];
            t.bezierCurveTo(u[2], u[3], u[4], u[5], u[6], u[7]);
          }
          break;
        }
      }
      (r.isClosed && t.closePath(), (n = r));
    }
  }
  Pc(t, i, e) {
    if (!super.Pc(t, i, e) || (this.ee === null && this.Ja === null) || this.xt === null || this.pathPattern !== null)
      return false;
    const s = this.svg.getElementsByTagName("path");
    return this.geometry.figures.length !== s.length
      ? false
      : ((t.currentPath = this.svg), this.Dh(t, i), (t.currentPath = null), true);
  }
  Td(t) {
    return (this.geometry !== null && this.geometry.figures.length > 1) || this.pathPattern !== null ? true : super.Td(t);
  }
  RN(t, i) {
    if (t.nodeName !== "g") t.setAttributeNS(null, "filter", i);
    else {
      const e = t.getElementsByTagName("path");
      for (let s = 0; s < e.length; s++) e[s].setAttributeNS(null, "filter", i);
    }
  }
  getDocumentPoint(t, i) {
    if ((i === void 0 && (i = new Point()), t instanceof Spot)) {
      const e = t;
      e.isNoSpot() && U.n("getDocumentPoint Spot must be a real, specific Spot, not: " + e.toString());
      const s = this.naturalBounds,
        n = this.strokeWidth;
      return (
        i.e(e.x * (s.width + n) - n / 2 + s.x + e.offsetX, e.y * (s.height + n) - n / 2 + s.y + e.offsetY),
        this._s.St(i),
        i
      );
    } else return (i.set(t), this._s.St(i), i);
  }
  getDocumentBounds(t) {
    t === void 0 && (t = new Rect());
    const i = this.naturalBounds,
      e = this._s,
      s = Rect.U(i.x, i.y, i.width, i.height),
      n = this.strokeWidth;
    s.inflate(n / 2, n / 2);
    const o = Point.U(s.x, s.y).E(e);
    return (
      t.e(o.x, o.y, 0, 0),
      o.e(s.right, s.y).E(e),
      t.ai(o.x, o.y, 0, 0),
      o.e(s.right, s.bottom).E(e),
      t.ai(o.x, o.y, 0, 0),
      o.e(s.x, s.bottom).E(e),
      t.ai(o.x, o.y, 0, 0),
      Rect.o(s),
      Point.o(o),
      t
    );
  }
  Ah(t, i) {
    const e = this.geometry;
    if (e === null || (this.fill === null && this.stroke === null)) return false;
    const s = e.bounds;
    let n = this.strokeWidth / 2;
    e.type === 1 && !i && (n += 2);
    const o = Rect.a();
    if ((o.c(s), o.inflate(n + 2, n + 2), !o.containsPoint(t))) return (Rect.o(o), false);
    const r = n + 1e-4;
    if (e.type === 1) {
      if (this.stroke === null) return false;
      const l = (e.startX - e.endX) * (t.x - e.endX) + (e.startY - e.endY) * (t.y - e.endY),
        h = (e.endX - e.startX) * (t.x - e.startX) + (e.endY - e.startY) * (t.y - e.startY);
      return l < 0 || h < 0 ? false : (Rect.o(o), G.Ui(e.startX, e.startY, e.endX, e.endY, n, t.x, t.y));
    } else if (e.type === 2) {
      const l = e.startX,
        h = e.startY,
        a = e.endX,
        f = e.endY;
      if (
        ((o.x = Math.min(l, a)),
        (o.y = Math.min(h, f)),
        (o.width = Math.abs(a - l)),
        (o.height = Math.abs(f - h)),
        this.fill === null)
      ) {
        if ((o.inflate(-r, -r), o.containsPoint(t))) return (Rect.o(o), false);
        o.inflate(r, r);
      }
      this.stroke !== null && o.inflate(n, n);
      const c = o.containsPoint(t);
      return (Rect.o(o), c);
    } else if (e.type === 3) {
      const l = e.startX,
        h = e.startY,
        a = e.endX,
        f = e.endY;
      let c = Math.min(l, a),
        u = Math.min(h, f);
      const d = Math.abs(a - l),
        m = Math.abs(f - h);
      let g = d / 2,
        p = m / 2;
      if (((c = t.x - (c + g)), (u = t.y - (u + p)), this.fill === null)) {
        if (((g -= r), (p -= r), g <= 0 || p <= 0)) return (Rect.o(o), false);
        if ((c * c) / (g * g) + (u * u) / (p * p) <= 1) return (Rect.o(o), false);
        ((g += r), (p += r));
      }
      return (
        this.stroke !== null && ((g += r), (p += r)),
        Rect.o(o),
        g <= 0 || p <= 0 ? false : (c * c) / (g * g) + (u * u) / (p * p) <= 1
      );
    } else {
      if (e.type === 4)
        return (Rect.o(o), this.fill === null ? e.eT(t.x, t.y, n) : e.Kk(t, n, this.strokeWidth > 1, i));
      U.n("Unknown Geometry type: " + e.type);
    }
  }
  Cd(t, i, e, s) {
    const n = this.desiredSize,
      o = this.er;
    ((t = Math.max(t, 0)), (i = Math.max(i, 0)));
    let r;
    if (this.rn !== null) r = this.geometry.bounds;
    else {
      const g = this.figure;
      let p = Shape.hC[g];
      if (p === void 0) {
        let y = G.bn[g];
        (typeof y == "string" && (y = G.bn[y]),
          U.lt(y) ? ((p = y(null, 100, 100)), (Shape.hC[g] = p)) : U.n("Unsupported Figure: " + g));
      }
      r = p.bounds;
    }
    let l = r.width,
      h = r.height,
      a = r.width,
      f = r.height;
    switch (this.sn(true)) {
      case 0:
        ((e = 0), (s = 0));
        break;
      case 2:
        ((a = Math.max(t - o, 0)), (f = Math.max(i - o, 0)));
        break;
      case 5:
        ((a = Math.max(t - o, 0)), (s = 0));
        break;
      case 4:
        ((e = 0), (f = Math.max(i - o, 0)));
        break;
    }
    (isFinite(n.width) && (a = n.width), isFinite(n.height) && (f = n.height));
    const u = this.maxSize,
      d = this.minSize;
    ((e = Math.max(e - o, d.width)),
      (s = Math.max(s - o, d.height)),
      (a = Math.min(u.width, a)),
      (f = Math.min(u.height, f)),
      (a = isFinite(a) ? Math.max(e, a) : Math.max(l, e)),
      (f = isFinite(f) ? Math.max(s, f) : Math.max(h, s)));
    const m = this.sM();
    switch (m) {
      case 0:
        break;
      case 2:
        ((l = a), (h = f));
        break;
      case 6: {
        let g = Math.min(a / l, f / h);
        (isFinite(g) || (g = 1), (l = l * g), (h = h * g));
        break;
      }
      default:
        U.n(m + " is not a valid geometryStretch.");
    }
    if (this.rn !== null) {
      (l === 0 && (l = 0.001), h === 0 && (h = 0.001));
      const g = this.rn.uR(l, h);
      (Debug && g.k(), (this.xt = g));
    } else (this.xt === null || !G.q(this.xt.Tf, t - o) || !G.q(this.xt.Lf, i - o)) && (this.xt = Shape.a3(this, l, h));
    ((r = this.xt.bounds),
      t === 1 / 0 || i === 1 / 0
        ? this.fo(r.x - o / 2, r.y - o / 2, t === 0 && l === 0 ? 0 : r.width + o, i === 0 && h === 0 ? 0 : r.height + o)
        : this.fo(-(o / 2), -(o / 2), a + o, f + o),
      n.isReal()
        ? ((a = n.width),
          (f = n.height),
          (a = Math.min(u.width, a)),
          (f = Math.min(u.height, f)),
          (a = Math.max(d.width, a)),
          (f = Math.max(d.height, f)),
          this.ji.e(0, 0, a, f))
        : this.ji.c(r));
  }
  sM() {
    const t = this.geometryStretch;
    return this.rn !== null ? (t === 1 ? 2 : t) : t === 1 ? Shape.hC[this.figure].defaultStretch : t;
  }
  Th(t, i, e, s) {
    this.commonArrange(t, i, e, s);
  }
  getNearestIntersectionPoint(t, i, e) {
    return this.Sc(t.x, t.y, i.x, i.y, e);
  }
  Sc(t, i, e, s, n) {
    const o = this.E,
      r = 1 / (o.m11 * o.m22 - o.m12 * o.m21),
      l = o.m22 * r,
      h = -o.m12 * r,
      a = -o.m21 * r,
      f = o.m11 * r,
      c = r * (o.m21 * o.dy - o.m22 * o.dx),
      u = r * (o.m12 * o.dx - o.m11 * o.dy),
      d = t * l + i * a + c,
      m = t * h + i * f + u,
      g = e * l + s * a + c,
      p = e * h + s * f + u,
      y = this.er / 2;
    let x = this.xt;
    x === null && (this.gt(1 / 0, 1 / 0), (x = this.xt));
    const b = x.bounds;
    let S = false;
    if (x.type === 1)
      if (this.strokeWidth <= 1.5) S = G.Eo(x.startX, x.startY, x.endX, x.endY, d, m, g, p, n);
      else {
        let k = 0,
          P = 0;
        if (x.startX === x.endX) ((k = y), (P = 0));
        else {
          const T = (x.endY - x.startY) / (x.endX - x.startX);
          ((P = y / Math.sqrt(1 + T * T)), (k = P * T));
        }
        const A = U.ht();
        let C = new Point();
        (G.Eo(x.startX + k, x.startY + P, x.endX + k, x.endY + P, d, m, g, p, C) && A.push(C),
          (C = new Point()),
          G.Eo(x.startX - k, x.startY - P, x.endX - k, x.endY - P, d, m, g, p, C) && A.push(C),
          (C = new Point()),
          G.Eo(x.startX + k, x.startY + P, x.startX - k, x.startY - P, d, m, g, p, C) && A.push(C),
          (C = new Point()),
          G.Eo(x.endX + k, x.endY + P, x.endX - k, x.endY - P, d, m, g, p, C) && A.push(C));
        const M = A.length;
        if (M === 0) return (U.et(A), false);
        S = true;
        let N = 1 / 0;
        for (let T = 0; T < M; T++) {
          const L = A[T],
            D = (L.x - d) ** 2 + (L.y - m) ** 2;
          D < N && ((N = D), (n.x = L.x), (n.y = L.y));
        }
        U.et(A);
      }
    else if (x.type === 2) S = G.Il(b.x - y, b.y - y, b.x + b.width + y, b.y + b.height + y, d, m, g, p, n);
    else if (x.type === 3) {
      const k = Rect.U(b.x, b.y, b.width, b.height).inflate(y, y);
      ((S = this.f3(k, d, m, g, p, n)), Rect.o(k));
    } else if (x.type === 4) {
      let k = 0,
        P = 0,
        A = 0,
        C = 0;
      const M = Point.a();
      let N = g - d,
        T = p - m,
        L = N * N + T * T,
        D = d,
        F = m;
      if (L > 0 && b.contains(D, F) && ((M.x = D), (M.y = F), this.containsPoint(M)))
        for (
          N !== 0 && Math.abs(N) < 0.5
            ? ((T *= 0.5 / N), (N = 0.5))
            : T !== 0 && Math.abs(T) < 0.5 && ((N *= 0.5 / T), (T = 0.5)),
            D -= N,
            F -= T;
          b.contains(D, F);
        )
          ((D -= N), (F -= T));
      const R = 0.6;
      ((n.x = g), (n.y = p));
      for (let K = 0; K < x.figures.count; K++) {
        const V = x.figures.h[K],
          Y = V.isFilled ? D : d,
          z = V.isFilled ? F : m,
          H = V.segments;
        ((k = V.startX), (P = V.startY));
        let W = k,
          j = P;
        for (let Z = 0; Z < H.count; Z++) {
          const B = H.h[Z],
            $ = B.type;
          ((A = B.endX), (C = B.endY));
          let J = false;
          switch ($) {
            case 1:
              ((W = A), (j = C));
              break;
            case 2:
              J = this.sS(k, P, A, C, Y, z, g, p, M);
              break;
            case 3: {
              J = G.am(k, P, B.point1X, B.point1Y, B.point2X, B.point2Y, A, C, Y, z, g, p, R, M);
              break;
            }
            case 4: {
              J = G.am(
                k,
                P,
                k + (2 / 3) * (B.point1X - k),
                P + (2 / 3) * (B.point1Y - P),
                A + (2 / 3) * (B.point1X - A),
                C + (2 / 3) * (B.point1Y - C),
                A,
                C,
                Y,
                z,
                g,
                p,
                R,
                M,
              );
              break;
            }
            case 5:
            case 6: {
              const tt = B.type === 5 ? B.Vo(V) : B.na(V, k, P),
                q = tt.length;
              if (q === 0) {
                J = this.sS(k, P, B.type === 5 ? B.centerX : B.endX, B.type === 5 ? B.centerY : B.endY, Y, z, g, p, M);
                break;
              }
              let E = null;
              for (let v = 0; v < q; v++) {
                if (((E = tt[v]), v === 0 && this.sS(k, P, E[0], E[1], Y, z, g, p, M))) {
                  const Q = this.nS(Y, z, M, L, n);
                  Q < L && ((L = Q), (S = true));
                }
                if (G.am(E[0], E[1], E[2], E[3], E[4], E[5], E[6], E[7], Y, z, g, p, R, M)) {
                  const Q = this.nS(Y, z, M, L, n);
                  Q < L && ((L = Q), (S = true));
                }
              }
              ((A = E[6]), (C = E[7]));
              break;
            }
            default:
              U.n("Unknown Segment type: " + $);
          }
          if (((k = A), (P = C), J)) {
            const tt = this.nS(Y, z, M, L, n);
            tt < L && ((L = tt), (S = true));
          }
          if (B.isClosed && ((A = W), (C = j), this.sS(k, P, A, C, Y, z, g, p, M))) {
            const tt = this.nS(Y, z, M, L, n);
            tt < L && ((L = tt), (S = true));
          }
        }
      }
      let I = e - t,
        O = s - i;
      const X = Math.sqrt(I * I + O * O);
      (X !== 0 && ((I /= X), (O /= X)), (n.x -= I * y), (n.y -= O * y), Point.o(M));
    } else U.n("Unknown Geometry type: " + x.type);
    return S ? (this.E.St(n), true) : false;
  }
  nS(t, i, e, s, n) {
    const o = e.x - t,
      r = e.y - i,
      l = o * o + r * r;
    return l < s ? ((n.x = e.x), (n.y = e.y), l) : s;
  }
  sS(t, i, e, s, n, o, r, l, h) {
    if ((G.q(t, e) && G.q(i, s)) || (G.q(n, r) && G.q(o, l))) return false;
    let a = false;
    const f = (n - r) * (i - s) - (o - l) * (t - e);
    if (f === 0) return false;
    if (
      ((h.x = ((n * l - o * r) * (t - e) - (n - r) * (t * s - i * e)) / f),
      (h.y = ((n * l - o * r) * (i - s) - (o - l) * (t * s - i * e)) / f),
      (t > e ? t - e : e - t) < (i > s ? i - s : s - i))
    ) {
      const c = i < s ? i : s,
        u = i < s ? s : i;
      (h.y > c || G.q(h.y, c)) && (h.y < u || G.q(h.y, u)) && (a = true);
    } else {
      const c = t < e ? t : e,
        u = t < e ? e : t;
      (h.x > c || G.q(h.x, c)) && (h.x < u || G.q(h.x, u)) && (a = true);
    }
    return a;
  }
  c3(t, i, e) {
    return this.pickable === false ? false : (e.Cf(this.E), i ? this.u3(t, e) : this.containedInRect(t, e));
  }
  containedInRect(t, i) {
    if (i === void 0) return t.containsRect(this.actualBounds);
    let e = this.xt;
    e === null && (this.gt(1 / 0, 1 / 0), (e = this.xt));
    const s = e.bounds,
      n = this.strokeWidth / 2;
    let o = false;
    const r = Point.a();
    return (
      r.e(s.x - n, s.y - n),
      t.containsPoint(i.St(r)) &&
        (r.e(s.x - n, s.bottom + n),
        t.containsPoint(i.St(r)) &&
          (r.e(s.right + n, s.bottom + n),
          t.containsPoint(i.St(r)) && (r.e(s.right + n, s.y - n), t.containsPoint(i.St(r)) && (o = true)))),
      Point.o(r),
      o
    );
  }
  intersectsRect(t, i) {
    if (this.containedInRect(t, i) || (i === void 0 && ((i = this.E), t.containsRect(this.actualBounds)))) return true;
    const e = Transform.a();
    (e.set(i), e.lx());
    const s = t.left,
      n = t.right,
      o = t.top,
      r = t.bottom,
      l = Point.a();
    if ((l.e(s, o), e.St(l), this.Ah(l, true))) return (Point.o(l), true);
    if ((l.e(n, o), e.St(l), this.Ah(l, true))) return (Point.o(l), true);
    if ((l.e(s, r), e.St(l), this.Ah(l, true))) return (Point.o(l), true);
    if ((l.e(n, r), e.St(l), this.Ah(l, true))) return (Point.o(l), true);
    const h = Point.a(),
      a = Point.a();
    (e.set(i), e.HA(this.E), e.lx(), (h.x = n), (h.y = o), h.E(e), (l.x = s), (l.y = o), l.E(e));
    let f = false;
    return (
      this.Za(l, h, a)
        ? (f = true)
        : ((l.x = n),
          (l.y = r),
          l.E(e),
          this.Za(l, h, a)
            ? (f = true)
            : ((h.x = s),
              (h.y = r),
              h.E(e),
              this.Za(l, h, a) ? (f = true) : ((l.x = s), (l.y = o), l.E(e), this.Za(l, h, a) && (f = true)))),
      Point.o(l),
      Transform.o(e),
      Point.o(h),
      Point.o(a),
      f
    );
  }
  Za(t, i, e) {
    if (!this.getNearestIntersectionPoint(t, i, e)) return false;
    const s = t.x,
      n = t.y,
      o = i.x,
      r = i.y,
      l = e.x,
      h = e.y;
    if (s === o) {
      let a = 0,
        f = 0;
      return (n < r ? ((a = n), (f = r)) : ((a = r), (f = n)), h >= a && h <= f);
    } else {
      let a = 0,
        f = 0;
      return (s < o ? ((a = s), (f = o)) : ((a = o), (f = s)), l >= a && l <= f);
    }
  }
  u3(t, i) {
    if (this.containedInRect(t, i) || (i === void 0 && ((i = this.E), t.containsRect(this.actualBounds)))) return true;
    const e = t.left,
      s = t.right,
      n = t.top,
      o = t.bottom,
      r = Point.a(),
      l = Point.a(),
      h = Point.a(),
      a = Transform.a();
    (a.set(i), a.HA(this.E), a.lx(), (l.x = s), (l.y = n), l.E(a), (r.x = e), (r.y = n), r.E(a));
    let f = false;
    return (
      this.Za(r, l, h)
        ? (f = true)
        : ((r.x = s),
          (r.y = o),
          r.E(a),
          this.Za(r, l, h)
            ? (f = true)
            : ((l.x = e),
              (l.y = o),
              l.E(a),
              this.Za(r, l, h) ? (f = true) : ((r.x = e), (r.y = n), r.E(a), this.Za(r, l, h) && (f = true)))),
      Transform.o(a),
      Point.o(r),
      Point.o(l),
      Point.o(h),
      f
    );
  }
  sD(t, i, e) {
    if (e && this.fill !== null && this.Ah(t, true)) return true;
    let s = t.distanceSquaredPoint(i);
    const n = s;
    this.strokeWidth > 1.5 && ((s = this.strokeWidth / 2 + Math.sqrt(s)), (s *= s));
    let o = this.xt;
    if (o === null && (this.gt(1 / 0, 1 / 0), (o = this.xt), o === null)) return false;
    if (!e) {
      const c = o.bounds,
        u = c.x,
        d = c.y,
        m = c.x + c.width,
        g = c.y + c.height;
      if (
        Point.distanceSquared(t.x, t.y, u, d) <= s &&
        Point.distanceSquared(t.x, t.y, m, d) <= s &&
        Point.distanceSquared(t.x, t.y, u, g) <= s &&
        Point.distanceSquared(t.x, t.y, m, g) <= s
      )
        return true;
    }
    function r(c, u) {
      const d = c.length;
      for (let m = 0; m < d; m += 2) if (u.distanceSquared(c[m], c[m + 1]) > s) return true;
      return false;
    }
    const l = o.startX,
      h = o.startY,
      a = o.endX,
      f = o.endY;
    if (o.type === 1) {
      const c = Point.distanceLineSegmentSquared(t.x, t.y, l, h, a, f),
        u = (a - l) * (t.x - l) + (f - h) * (t.y - h),
        d = (l - a) * (t.x - a) + (h - f) * (t.y - f),
        m = u >= 0 && d >= 0 ? s : n;
      return c <= m;
    } else if (o.type === 2) {
      let c = false;
      return (
        e &&
          (c =
            Point.distanceLineSegmentSquared(t.x, t.y, l, h, l, f) <= s ||
            Point.distanceLineSegmentSquared(t.x, t.y, l, h, a, h) <= s ||
            Point.distanceLineSegmentSquared(t.x, t.y, a, h, a, f) <= s ||
            Point.distanceLineSegmentSquared(t.x, t.y, l, f, a, f) <= s),
        c
      );
    } else if (o.type === 3) {
      const c = (l + a) / 2,
        u = (h + f) / 2,
        d = t.x - c,
        m = t.y - u,
        g = Math.abs(a - l) / 2,
        p = Math.abs(f - h) / 2;
      if (g === 0 || p === 0) return Point.distanceLineSegmentSquared(t.x, t.y, l, h, a, f) <= s;
      if (e) {
        const y = G.sR(g, p, d, m);
        return y * y <= s;
      } else
        return !(
          Point.distanceSquared(d, m, -g, 0) >= s ||
          Point.distanceSquared(d, m, 0, -p) >= s ||
          Point.distanceSquared(d, m, 0, p) >= s ||
          Point.distanceSquared(d, m, g, 0) >= s
        );
    } else if (o.type === 4) {
      const c = o.bounds,
        u = c.x,
        d = c.y,
        m = c.x + c.width,
        g = c.y + c.height;
      if (
        t.x > m &&
        t.x < u &&
        t.y > g &&
        t.y < d &&
        Point.distanceLineSegmentSquared(t.x, t.y, u, d, u, g) > s &&
        Point.distanceLineSegmentSquared(t.x, t.y, u, d, m, d) > s &&
        Point.distanceLineSegmentSquared(t.x, t.y, m, g, u, g) > s &&
        Point.distanceLineSegmentSquared(t.x, t.y, m, g, m, d) > s
      )
        return false;
      const p = Math.sqrt(s);
      if (e) {
        if (this.fill === null ? o.eT(t.x, t.y, p) : o.Kk(t, p, true, false)) return true;
      } else {
        const y = o.figures;
        for (let x = 0; x < y.count; x++) {
          const b = y.h[x];
          let S = b.startX,
            k = b.startY;
          if (t.distanceSquared(S, k) > s) return false;
          const P = b.segments.h,
            A = P.length;
          for (let C = 0; C < A; C++) {
            const M = P[C];
            switch (M.type) {
              case 1:
              case 2:
                if (((S = M.endX), (k = M.endY), t.distanceSquared(S, k) > s)) return false;
                break;
              case 3: {
                const N = U.ht();
                G.Qn(S, k, M.point1X, M.point1Y, M.point2X, M.point2Y, M.endX, M.endY, 0.8, N);
                const T = r(N, t);
                if ((U.et(N), T || ((S = M.endX), (k = M.endY), t.distanceSquared(S, k) > s))) return false;
                break;
              }
              case 4: {
                const N = U.ht();
                G.hm(S, k, M.point1X, M.point1Y, M.endX, M.endY, 0.8, N);
                const T = r(N, t);
                if ((U.et(N), T || ((S = M.endX), (k = M.endY), t.distanceSquared(S, k) > s))) return false;
                break;
              }
              case 5:
              case 6: {
                const N = M.type === 5 ? M.Vo(b) : M.na(b, S, k),
                  T = N.length;
                if (T === 0) {
                  if (
                    ((S = M.type === 5 ? M.centerX : M.endX),
                    (k = M.type === 5 ? M.centerY : M.endY),
                    t.distanceSquared(S, k) > s)
                  )
                    return false;
                  break;
                }
                let L = null;
                const D = U.ht();
                for (let F = 0; F < T; F++)
                  if (
                    ((L = N[F]), (D.length = 0), G.Qn(L[0], L[1], L[2], L[3], L[4], L[5], L[6], L[7], 0.8, D), r(D, t))
                  )
                    return (U.et(D), false);
                (U.et(D), L !== null && ((S = L[6]), (k = L[7])));
                break;
              }
              default:
                U.n("Unknown Segment type: " + M.type);
            }
          }
        }
        return true;
      }
    }
    return false;
  }
  f3(t, i, e, s, n, o) {
    if (t.width === 0) return G.Eo(t.x, t.y, t.x, t.y + t.height, i, e, s, n, o);
    if (t.height === 0) return G.Eo(t.x, t.y, t.x + t.width, t.y, i, e, s, n, o);
    {
      const r = t.width / 2,
        l = t.height / 2,
        h = t.x + r,
        a = t.y + l;
      let f = 9999;
      if ((i !== s && (f = (e - n) / (i - s)), Math.abs(f) < 9999)) {
        const c = e - a - f * (i - h);
        if (r * r * (f * f) + l * l - c * c < 0) return ((o.x = NaN), (o.y = NaN), false);
        const u = Math.sqrt(r * r * (f * f) + l * l - c * c),
          d = (-(r * r * f * c) + r * l * u) / (l * l + r * r * (f * f)) + h,
          m = (-(r * r * f * c) - r * l * u) / (l * l + r * r * (f * f)) + h,
          g = f * (d - h) + c + a,
          p = f * (m - h) + c + a,
          y = Math.abs((i - d) ** 2) + Math.abs((e - g) ** 2),
          x = Math.abs((i - m) ** 2) + Math.abs((e - p) ** 2);
        y < x ? ((o.x = d), (o.y = g)) : ((o.x = m), (o.y = p));
      } else {
        const c = l * l,
          u = r * r,
          d = i - h,
          m = c - (c / u) * (d * d);
        if (m < 0) return ((o.x = NaN), (o.y = NaN), false);
        const g = Math.sqrt(m),
          p = a + g,
          y = a - g,
          x = Math.abs(p - e),
          b = Math.abs(y - e);
        x < b ? ((o.x = i), (o.y = p)) : ((o.x = i), (o.y = y));
      }
      return true;
    }
  }
  _E() {
    return (this.er / 2) * this.strokeMiterLimit * this.getDocumentScale();
  }
  get geometry() {
    return this.xt !== null ? this.xt : this.rn;
  }
  set geometry(t) {
    const i = this.xt,
      e = this.rn;
    if (i === t) return;
    t !== null
      ? (Debug && U.s(t, Geometry, Shape, "geometry"), (this.xt = t.k()), (this.rn = this.xt))
      : ((this.xt = null), (this.rn = null));
    const s = this.part;
    if ((s !== null && s.Ec(), this.g(), this.t("geometry", i || e, t), this.bc())) {
      const n = this.part;
      n !== null && this.Ka(n, "geometryString");
    }
  }
  get geometryString() {
    return this.geometry === null ? "" : this.geometry.toString();
  }
  set geometryString(t) {
    const i = Geometry.parse(t),
      e = i.normalize();
    this.geometry = i;
    const s = Point.U(-e.x, -e.y);
    ((this.position = s), Point.o(s));
  }
  get isGeometryPositioned() {
    return (this.l & 1048576) !== 0;
  }
  set isGeometryPositioned(t) {
    const i = (this.l & 1048576) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Shape, "isGeometryPositioned"),
      (this.l = this.l ^ 1048576),
      this.g(),
      this.t("isGeometryPositioned", i, t));
  }
  ce() {
    this.xt = null;
  }
  get fill() {
    return this.Ja;
  }
  set fill(t) {
    const i = this.Ja;
    i !== t &&
      (t !== null && Brush.Dd(t, "Shape.fill"),
      t instanceof Brush && t.k(),
      (this.Ja = t),
      this.L(),
      this.t("fill", i, t));
  }
  get stroke() {
    return this.ee;
  }
  set stroke(t) {
    const i = this.ee;
    i !== t &&
      (t !== null && Brush.Dd(t, "Shape.stroke"),
      t instanceof Brush && t.k(),
      (this.ee = t),
      this.L(),
      this.t("stroke", i, t));
  }
  get strokeWidth() {
    return this.er;
  }
  set strokeWidth(t) {
    const i = this.er;
    if (i !== t)
      if ((Debug && U.r(t, Shape, "strokeWidth"), t >= 0)) {
        ((this.er = t), this.g());
        const e = this.part;
        (e !== null && e.Ec(), this.t("strokeWidth", i, t));
      } else U.G(t, "value >= 0", Shape, "strokeWidth:value");
  }
  W0() {
    return this.er;
  }
  get strokeCap() {
    return this.Jt !== null ? this.Jt.qp : "butt";
  }
  set strokeCap(t) {
    const i = this.strokeCap;
    i !== t &&
      (typeof t == "string" && (t === "butt" || t === "round" || t === "square")
        ? ((this.$a().qp = t), this.L(), this.t("strokeCap", i, t))
        : U.G(t, '"butt", "round", or "square"', Shape, "strokeCap"));
  }
  get strokeJoin() {
    return this.Jt !== null ? this.Jt.Hp : "miter";
  }
  set strokeJoin(t) {
    const i = this.strokeJoin;
    i !== t &&
      (typeof t == "string" && (t === "miter" || t === "bevel" || t === "round")
        ? ((this.$a().Hp = t), this.L(), this.t("strokeJoin", i, t))
        : U.G(t, '"miter", "bevel", or "round"', Shape, "strokeJoin"));
  }
  get strokeMiterLimit() {
    return this.Jt !== null ? this.Jt.vp : 10;
  }
  set strokeMiterLimit(t) {
    const i = this.strokeMiterLimit;
    if (i !== t)
      if ((Debug && U.r(t, Shape, "strokeMiterLimit"), t >= 1)) {
        ((this.$a().vp = t), this.L());
        const e = this.part;
        (e !== null && e.Ec(), this.t("strokeMiterLimit", i, t));
      } else Debug && U.G(t, "value >= 1", Shape, "strokeWidth:value");
  }
  get strokeDashArray() {
    return this.Qo;
  }
  set strokeDashArray(t) {
    const i = this.Qo;
    if (i !== t) {
      if ((t !== null && !Array.isArray(t) && U.Li(t, "Array", Shape, "strokeDashArray:value"), t !== null)) {
        const e = t.length;
        let s = 0;
        for (let n = 0; n < e; n++) {
          const o = t[n];
          (((Debug && typeof o != "number") || !(o >= 0) || !isFinite(o)) &&
            U.n("strokeDashArray:value " + o + " at index " + n + " must be a positive number or zero."),
            (s += o));
        }
        if (s === 0) {
          if (i === null) return;
          t = null;
        }
      }
      ((this.Qo = t), this.L(), this.t("strokeDashArray", i, t));
    }
  }
  get strokeDashOffset() {
    return this.Jt !== null ? this.Jt.Rh : 0;
  }
  set strokeDashOffset(t) {
    const i = this.strokeDashOffset;
    i !== t &&
      (Debug && U.r(t, Shape, "strokeDashOffset"),
      t >= 0 && ((this.$a().Rh = t), this.L(), this.t("strokeDashOffset", i, t)));
  }
  get figure() {
    return this.vd;
  }
  set figure(t) {
    const i = this.vd;
    if (i !== t) {
      Debug && U.i(t, "string", Shape, "figure");
      let e = G.bn[t];
      if (
        (U.lt(e)
          ? (e = t)
          : ((e = G.bn[t.toLowerCase()]), (!e || typeof e == "function") && U.n("Unknown Shape.figure: " + t)),
        i !== e)
      ) {
        const s = this.part;
        (s !== null && s.Ec(), (this.vd = e), (this.rn = null), this.ce(), this.g(), this.t("figure", i, e));
      }
    }
  }
  get toArrow() {
    return this.Xt !== null ? this.Xt.Wp : "None";
  }
  set toArrow(t) {
    const i = this.toArrow;
    if ((t === true ? (t = "Standard") : t === false && (t = ""), i !== t)) {
      Debug && U.i(t, "string", Shape, "toArrow");
      const e = Shape.DD(t);
      e === null
        ? U.n("Unknown Shape.toArrow: " + t)
        : i !== e &&
          (this.Xt === null && (this.Xt = new LinkElementSettings()),
          (this.Xt.Wp = e),
          (this.rn = null),
          this.ce(),
          this.g(),
          this.FD(e),
          this.t("toArrow", i, e));
    }
  }
  get fromArrow() {
    return this.Xt !== null ? this.Xt.jp : "None";
  }
  set fromArrow(t) {
    const i = this.fromArrow;
    if ((t === true ? (t = "Standard") : t === false && (t = ""), i !== t)) {
      Debug && U.i(t, "string", Shape, "fromArrow");
      const e = Shape.DD(t);
      e === null
        ? U.n("Unknown Shape.fromArrow: " + t)
        : i !== e &&
          (this.Xt === null && (this.Xt = new LinkElementSettings()),
          (this.Xt.jp = e),
          (this.rn = null),
          this.ce(),
          this.g(),
          this.FD(e),
          this.t("fromArrow", i, e));
    }
  }
  FD(t) {
    const i = this.diagram;
    (i !== null && i.undoManager.isUndoingRedoing) ||
      (this.PE(),
      this.toArrow !== "None"
        ? ((this.segmentIndex = -1), (this.alignmentFocus = Spot.Right))
        : this.fromArrow !== "None" && ((this.segmentIndex = 0), (this.alignmentFocus = Spot.Left)));
  }
  get spot1() {
    return this.Jt !== null ? this.Jt._n : Spot.Default;
  }
  set spot1(t) {
    const i = this.spot1;
    i.equals(t) ||
      (Debug && U.s(t, Spot, Shape, "spot1"), (t = t.T()), (this.$a()._n = t), this.g(), this.t("spot1", i, t));
  }
  get spot2() {
    return this.Jt !== null ? this.Jt.to : Spot.Default;
  }
  set spot2(t) {
    const i = this.spot2;
    i.equals(t) ||
      (Debug && U.s(t, Spot, Shape, "spot2"), (t = t.T()), (this.$a().to = t), this.g(), this.t("spot2", i, t));
  }
  get parameter1() {
    return this.Wd;
  }
  set parameter1(t) {
    const i = this.Wd;
    i !== t && ((this.Wd = t), this.ce(), this.g(), this.t("parameter1", i, t));
  }
  get parameter2() {
    return this.jd;
  }
  set parameter2(t) {
    const i = this.jd;
    i !== t && ((this.jd = t), this.ce(), this.g(), this.t("parameter2", i, t));
  }
  get naturalBounds() {
    return this.ji;
  }
  GE() {
    const t = this.desiredSize;
    if (!t.isReal() && this.xt !== null) {
      const i = this.xt.bounds;
      this.ji.c(i);
    } else this.ji.e(0, 0, t.width, t.height);
  }
  get pathPattern() {
    return this.Jt !== null ? this.Jt.Jp : null;
  }
  set pathPattern(t) {
    const i = this.pathPattern;
    i !== t &&
      (Debug && t !== null && U.s(t, GraphObject, Shape, "pathPattern"),
      (this.$a().Jp = t),
      this.L(),
      this.t("pathPattern", i, t));
  }
  get geometryStretch() {
    return this.Jt !== null ? this.Jt.$p : 1;
  }
  set geometryStretch(t) {
    const i = this.geometryStretch;
    i !== t &&
      (U.W(t, GeometryStretch, "GeometryStretch"), (this.$a().$p = t), this.g(), this.t("geometryStretch", i, t));
  }
  get interval() {
    return this.j !== null ? this.j.Bc : 1;
  }
  set interval(t) {
    const i = this.interval;
    if ((Debug && U.r(t, Shape, "interval"), (t = Math.round(t)), i !== t && t !== 0 && isFinite(t))) {
      (this.j === null && (this.j = new GradElementSettings()), (this.j.Bc = t));
      const e = this.panel;
      if (e !== null) {
        ((e.ys = null), e.g());
        const s = this.diagram;
        s !== null && e === s.grid && s.md();
      }
      this.t("interval", i, t);
    }
  }
  get graduatedStart() {
    return this.j !== null ? this.j.zc : 0;
  }
  set graduatedStart(t) {
    const i = this.graduatedStart;
    (Debug && U.r(t, Shape, "graduatedStart"),
      i !== t &&
        (t < 0 ? (t = 0) : t > 1 && (t = 1),
        this.j === null && (this.j = new GradElementSettings()),
        (this.j.zc = t),
        this.g(),
        this.t("graduatedStart", i, t)));
  }
  get graduatedEnd() {
    return this.j !== null ? this.j.Xc : 1;
  }
  set graduatedEnd(t) {
    const i = this.graduatedEnd;
    (Debug && U.r(t, Shape, "graduatedEnd"),
      i !== t &&
        (t < 0 ? (t = 0) : t > 1 && (t = 1),
        this.j === null && (this.j = new GradElementSettings()),
        (this.j.Xc = t),
        this.g(),
        this.t("graduatedEnd", i, t)));
  }
  get graduatedSkip() {
    return this.j !== null ? this.j.Yc : null;
  }
  set graduatedSkip(t) {
    const i = this.graduatedSkip;
    i !== t &&
      (t !== null && U.C(t, Shape, "graduatedSkip"),
      this.j === null && (this.j = new GradElementSettings()),
      (this.j.Yc = t),
      this.g(),
      this.t("graduatedSkip", i, t));
  }
  polygonContainsRect(t) {
    const i = this;
    if (!i.part || !i.part.actualBounds.containsRect(t)) return false;
    const e = i.geometry;
    if (!e) return false;
    const s = t.x,
      n = t.y,
      o = t.width,
      r = t.height,
      l = Point.a();
    if (
      ((l.x = s),
      (l.y = n),
      i.getLocalPoint(l, l),
      !e.containsPoint(l) ||
        (o > 0 && r > 0 && ((l.x = s + o), (l.y = n + r), i.getLocalPoint(l, l), !e.containsPoint(l))) ||
        (o > 0 && ((l.x = s + o), (l.y = n), i.getLocalPoint(l, l), !e.containsPoint(l))) ||
        (r > 0 && ((l.x = s), (l.y = n + r), i.getLocalPoint(l, l), !e.containsPoint(l))) ||
        e.type === 1)
    )
      return false;
    if (e.type === 4) {
      const h = e.figures.iterator;
      for (; h.next(); ) {
        const a = h.value;
        if (!a.isFilled) continue;
        ((l.x = a.startX), (l.y = a.startY), i.getDocumentPoint(l, l));
        let f = l.x,
          c = l.y,
          u = f,
          d = c,
          m = f,
          g = c;
        const p = a.segments.iterator;
        for (; p.next(); ) {
          const y = p.value;
          if (((l.x = y.endX), (l.y = y.endY), i.getDocumentPoint(l, l), (m = l.x), (g = l.y), y.type === 1))
            ((f = m), (c = g));
          else if (
            y.type !== 5 &&
            (Rect.intersectsLineSegment(s, n, o, r, u, d, m, g) ||
              (y.isClosed && Rect.intersectsLineSegment(s, n, o, r, m, g, f, c)))
          )
            return false;
          ((u = m), (d = g));
        }
      }
    }
    return (Point.o(l), true);
  }
  static a3(t, i, e) {
    let n = null;
    if (t.toArrow !== "None") n = Shape.Vn[t.toArrow];
    else if (t.fromArrow !== "None") n = Shape.Vn[t.fromArrow];
    else {
      let o = G.bn[t.figure];
      (typeof o == "string" && (o = G.bn[o]),
        o === void 0 && U.n("Unknown Shape.figure: " + t.figure),
        (n = o(t, i, e)),
        (n.Tf = i),
        (n.Lf = e));
    }
    if (n === null) {
      const o = G.bn.Rectangle;
      U.lt(o) && (n = o(t, i, e));
    }
    return (
      Debug &&
        (n.bounds.width > i + 1e-5 || n.bounds.height > e + 1e-5) &&
        U.n(
          'Geometry made with figure "' +
            t.figure +
            '" has bounds ' +
            n.bounds.toString() +
            " that are too large for the given size (" +
            i +
            "," +
            e +
            "). See documentation for Shape.defineFigureGenerator.",
        ),
      n
    );
  }
  static getFigureGenerators() {
    const t = new GMap();
    for (const i in G.bn) {
      if (i === i.toLowerCase()) continue;
      const e = G.bn[i];
      t.set(i, e);
    }
    return (t.k(), t);
  }
  static defineFigureGenerator(t, i) {
    (U.i(t, "string", Shape, "defineFigureGenerator:name"),
      typeof i == "string"
        ? Debug &&
          (i === "" || !G.bn[i]) &&
          U.n("Shape.defineFigureGenerator synonym must not be empty or None or not a defined figure name: " + i)
        : U.C(i, Shape, "defineFigureGenerator:func"));
    const e = t.toLowerCase();
    Debug && (t === "" || t === e) && U.n("Shape.defineFigureGenerator name must not be empty or all-lower-case: " + t);
    const s = G.bn;
    ((s[t] = i), (s[e] = t));
  }
  static isFigureDefined(t) {
    return t in G.bn;
  }
  static getArrowheadGeometries() {
    const t = new GMap();
    for (const i in G.cm)
      if (Shape.Vn[i] === void 0) {
        const e = Geometry.parse(G.cm[i], false);
        Shape.Vn[i] = e;
        const s = i.toLowerCase();
        s !== i && (Shape.Vn[s] = i);
      }
    for (const i in Shape.Vn) {
      if (i === i.toLowerCase()) continue;
      const e = Shape.Vn[i];
      e instanceof Geometry && t.set(i, e);
    }
    return (t.k(), t);
  }
  static defineArrowheadGeometry(t, i) {
    U.i(t, "string", Shape, "defineArrowheadGeometry:name");
    let e = null;
    typeof i == "string"
      ? (U.i(i, "string", Shape, "defineArrowheadGeometry:pathstr"), (e = Geometry.parse(i, false)))
      : (U.s(i, Geometry, Shape, "defineArrowheadGeometry:pathstr"), (e = i));
    const s = t.toLowerCase();
    ((Debug && t === "") || s === "none" || t === s) &&
      U.n("Shape.defineArrowheadGeometry name must not be empty or None or all-lower-case: " + t);
    const n = Shape.Vn;
    ((n[t] = e), (n[s] = t));
  }
  static isArrowheadDefined(t) {
    return Shape.Vn.has(t);
  }
  static Vn = new PropertyCollection();
  static hC = new PropertyCollection();
  static DD(t) {
    let i = Shape.Vn[t];
    if (i === void 0) {
      const e = t.toLowerCase();
      if (e === "none") return "None";
      if (((i = Shape.Vn[e]), i === void 0)) {
        let s = null;
        for (const n in G.cm)
          if (n.toLowerCase() === e) {
            s = n;
            break;
          }
        if (s !== null) {
          const n = Geometry.parse(G.cm[s], false);
          return ((Shape.Vn[s] = n), e !== s && (Shape.Vn[e] = s), s);
        }
      }
    }
    return typeof i == "string" ? i : i instanceof Geometry ? t : null;
  }
}
