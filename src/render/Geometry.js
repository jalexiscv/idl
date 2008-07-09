class Geometry {
  l;
  dm;
  gm;
  Af;
  Fu;
  Iu;
  _n;
  to;
  io;
  tt;
  Fe;
  Ie;
  le;
  he;
  Ws;
  Tf;
  Lf;
  constructor(t, i) {
    (Debug &&
      arguments.length > 2 &&
      U.n(
        "Geometry constructor can take at most two optional arguments, the Geometry type and an initialization Object",
      ),
      GSet._i(this),
      (this.l = 2),
      t === void 0 ? (t = 4) : Debug && U.W(t, GeometryType, "GeometryType"),
      (this.tt = t),
      (this.Fe = 0),
      (this.Ie = 0),
      (this.le = 0),
      (this.he = 0),
      t === 4 ? (this.Ws = new List()) : (this.Ws = Geometry.ux),
      (this.dm = this.Ws.ct),
      (this.gm = new Rect()),
      (this.Af = null),
      (this.Fu = null),
      (this.Iu = NaN),
      (this._n = Spot.TopLeft),
      (this.to = Spot.BottomRight),
      (this.Tf = NaN),
      (this.Lf = NaN),
      (this.io = 2),
      i && Object.assign(this, i));
  }
  copy() {
    const t = new Geometry();
    if (
      ((t.l = this.l & -2),
      (t.tt = this.tt),
      (t.Fe = this.Fe),
      (t.Ie = this.Ie),
      (t.le = this.le),
      (t.he = this.he),
      this.tt === 4)
    ) {
      const i = this.Ws.h,
        e = t.Ws;
      for (let s = 0; s < i.length; s++) {
        const n = i[s];
        e.add(n.copy());
      }
      t.Ws = e;
    } else t.Ws = this.Ws;
    return (
      (t.dm = this.dm),
      t.gm.c(this.gm),
      (t.Af = this.Af),
      (t.Fu = this.Fu),
      (t.Iu = this.Iu),
      (t._n = this._n.T()),
      (t.to = this.to.T()),
      (t.Tf = this.Tf),
      (t.Lf = this.Lf),
      (t.io = this.io),
      t
    );
  }
  static Line = 1;
  static Rectangle = 2;
  static Ellipse = 3;
  static Path = 4;
  static ux = new List().k();
  get p() {
    return (this.l & 1) !== 0;
  }
  set p(t) {
    t ? (this.l |= 1) : (this.l &= -2);
  }
  get kt() {
    return (this.l & 2) !== 0;
  }
  set kt(t) {
    t ? (this.l |= 2) : (this.l &= -3);
  }
  k() {
    if (((this.p = true), this.type !== 4)) return this;
    const t = this.figures;
    t.k();
    for (const i of t) i.k();
    return this;
  }
  equalsApprox(t) {
    if (!(t instanceof Geometry)) return false;
    if (this.type !== t.type)
      return this.type === 1 && t.type === 4 ? this.ZA(t) : t.type === 1 && this.type === 4 ? t.ZA(this) : false;
    if (this.type === 4) {
      const i = this.figures.h,
        e = t.figures.h,
        s = i.length;
      if (s !== e.length) return false;
      for (let n = 0; n < s; n++) {
        const o = i[n],
          r = e[n];
        if (!o.equalsApprox(r)) return false;
      }
      return true;
    } else
      return (
        G.u(this.startX, t.startX) && G.u(this.startY, t.startY) && G.u(this.endX, t.endX) && G.u(this.endY, t.endY)
      );
  }
  ZA(t) {
    if (this.type !== 1 || t.type !== 4) return false;
    if (t.figures.count === 1) {
      const i = t.figures.elt(0);
      if (i.segments.count === 1 && G.u(this.startX, i.startX) && G.u(this.startY, i.startY)) {
        const e = i.segments.elt(0);
        if (e.type === 2 && G.u(this.endX, e.endX) && G.u(this.endY, e.endY)) return true;
      }
    }
    return false;
  }
  static stringify(t) {
    return t.toString();
  }
  static stringifyFixed(t) {
    return (U.i(t, "number", Geometry, "stringifyFixed:digits"), (i) => i.toString(t));
  }
  gi(t) {
    t in GeometryType ? (this.type = t) : U.wr(this, t);
  }
  toString(t) {
    t === void 0 && (t = -1);
    const i = (s) => (s === 0 ? "0" : s.toFixed(t));
    let e;
    switch (this.type) {
      case 1:
        return t < 0
          ? "M" +
              this.startX.toString() +
              " " +
              this.startY.toString() +
              "L" +
              this.endX.toString() +
              " " +
              this.endY.toString()
          : "M" + i(this.startX) + " " + i(this.startY) + "L" + i(this.endX) + " " + i(this.endY);
      case 2:
        return (
          (e = new Rect(this.startX, this.startY, 0, 0)),
          e.union(this.endX, this.endY, 0, 0),
          t < 0
            ? "M" +
              e.x.toString() +
              " " +
              e.y.toString() +
              "H" +
              e.right.toString() +
              "V" +
              e.bottom.toString() +
              "H" +
              e.left.toString() +
              "z"
            : "M" + i(e.x) + " " + i(e.y) + "H" + i(e.right) + "V" + i(e.bottom) + "H" + i(e.left) + "z"
        );
      case 3:
        if (((e = new Rect(this.startX, this.startY, 0, 0)), e.union(this.endX, this.endY, 0, 0), t < 0)) {
          const r = e.left.toString() + " " + (e.y + e.height / 2).toString(),
            l = e.right.toString() + " " + (e.y + e.height / 2).toString();
          return (
            "M" +
            r +
            "A" +
            (e.width / 2).toString() +
            " " +
            (e.height / 2).toString() +
            " 0 0 1 " +
            l +
            "A" +
            (e.width / 2).toString() +
            " " +
            (e.height / 2).toString() +
            " 0 0 1 " +
            r
          );
        } else {
          const r = i(e.left) + " " + i(e.y + e.height / 2),
            l = i(e.right) + " " + i(e.y + e.height / 2);
          return (
            "M" +
            r +
            "A" +
            i(e.width / 2) +
            " " +
            i(e.height / 2) +
            " 0 0 1 " +
            l +
            "A" +
            i(e.width / 2) +
            " " +
            i(e.height / 2) +
            " 0 0 1 " +
            r
          );
        }
      case 4:
        let s = "";
        const n = this.figures.h,
          o = n.length;
        for (let r = 0; r < o; r++) {
          const l = n[r];
          (r > 0 && (s += " x "), l.isFilled && (s += "F "), (s += l.toString(t)));
        }
        return s;
      default:
        return GeometryType[this.type];
    }
  }
  static fillPath(t) {
    typeof t != "string" && U.Li(t, "string", Geometry, "fillPath:str");
    const i = t.split(/[Xx]/),
      e = i.length;
    let s = "";
    for (let n = 0; n < e; n++) {
      const o = i[n];
      if (o.match(/[Ff]/) !== null) {
        n === 0 ? (s += o) : (s += "X" + (o[0] === " " ? "" : " ") + o);
        continue;
      }
      s += (n === 0 ? "" : "X ") + "F" + (o[0] === " " ? "" : " ") + o;
    }
    return s;
  }
  static mm = "UuBbMmZzLlHhVvCcSsQqTtAaFfXx";
  static parse(t, i) {
    (i === void 0 && (i = false), typeof t != "string" && U.Li(t, "string", Geometry, "parse:str"));
    const e = new RegExp("([" + Geometry.mm + "])([" + Geometry.mm + "])", "gm"),
      s = new RegExp("([" + Geometry.mm + "])([^s])", "gm"),
      n = new RegExp("([^s])([" + Geometry.mm + "])", "gm");
    ((t = t.replace(/,/gm, " ")),
      (t = t.replace(e, "$1 $2")),
      (t = t.replace(e, "$1 $2")),
      (t = t.replace(s, "$1 $2")),
      (t = t.replace(n, "$1 $2")),
      (t = t.replace(/([0-9])([+\-])/gm, "$1 $2")),
      (t = t.replace(/[\s\r\t\n]+/gm, " ")),
      (t = t.replace(/^\s+|\s+$/g, "")));
    const o = t.split(" ");
    for (let T = 0; T < o.length; T++) {
      const L = o[T];
      if (L.match(/(\.[0-9]*)(\.)/gm) !== null) {
        const D = U.ht();
        let F = "",
          R = false;
        for (let I = 0; I < L.length; I++) {
          const O = L[I];
          O === "." && !R ? ((R = true), (F += O)) : O === "." ? (D.push(F), (F = ".")) : (F += O);
        }
        (D.push(F), o.splice(T, 1));
        for (let I = 0; I < D.length; I++) o.splice(T + I, 0, D[I]);
        ((T += D.length - 1), U.et(D));
      }
    }
    let r = -1,
      l = "",
      h = "";
    const a = new Point(0, 0),
      f = new Point(0, 0),
      c = new Point(0, 0);
    let u = true;
    function d() {
      return r >= b - 1 || o[r + 1].match(M) !== null ? true : ((u = false), false);
    }
    function m() {
      return (r++, o[r]);
    }
    function g(T) {
      let L = parseFloat(m()),
        D = parseFloat(m());
      (l === l.toLowerCase() && ((L = c.x + L), (D = c.y + D)), T.e(L, D));
    }
    function p() {
      return (g(c), c);
    }
    function y() {
      return (g(f), f);
    }
    function x() {
      const T = h.toLowerCase();
      return T === "c" || T === "s" || T === "q" || T === "t"
        ? new Point(2 * c.x - f.x, 2 * c.y - f.y)
        : new Point(c.x, c.y);
    }
    const b = o.length,
      S = GeoStream.QA(null);
    let k = false,
      P = false,
      A = false,
      C = true;
    const M = new RegExp("[" + Geometry.mm + "]");
    for (; !(r >= b - 1); ) {
      if (((h = l), (l = m()), l === "")) continue;
      u = true;
      let T = false;
      switch (l.toUpperCase()) {
        case "X":
          ((C = true), (k = false), (P = false));
          break;
        case "M":
          const L = p();
          for (S.Di === null || C === true ? (S.Ru(L.x, L.y, k, false, !P, A), (C = false)) : S.oR(L.x, L.y), a.c(c); !d(); ) {
            const D = p();
            S.js(D.x, D.y);
          }
          break;
        case "L":
          for (; !d(); ) {
            const D = p();
            S.js(D.x, D.y);
          }
          u && (T = true);
          break;
        case "H":
          for (; !d(); ) (c.e((l === l.toLowerCase() ? c.x : 0) + parseFloat(m()), c.y), S.js(c.x, c.y));
          break;
        case "V":
          for (; !d(); ) (c.e(c.x, (l === l.toLowerCase() ? c.y : 0) + parseFloat(m())), S.js(c.x, c.y));
          u && (T = true);
          break;
        case "C":
          for (; !d(); ) {
            const D = new Point();
            g(D);
            const F = y(),
              R = p();
            S.Pr(D.x, D.y, F.x, F.y, R.x, R.y);
          }
          u && (T = true);
          break;
        case "S":
          for (; !d(); ) {
            const D = x(),
              F = y(),
              R = p();
            S.Pr(D.x, D.y, F.x, F.y, R.x, R.y);
          }
          u && (T = true);
          break;
        case "Q":
          for (; !d(); ) {
            const D = y(),
              F = p();
            S.Ou(D.x, D.y, F.x, F.y);
          }
          u && (T = true);
          break;
        case "T":
          for (; !d(); ) {
            const D = x();
            f.c(D);
            const F = p();
            (S.Ou(D.x, D.y, F.x, F.y), f.c(F));
          }
          u && (T = true);
          break;
        case "B":
          for (; !d(); ) {
            const D = parseFloat(m()),
              F = parseFloat(m());
            let R = parseFloat(m()),
              I = parseFloat(m());
            const O = parseFloat(m());
            let X = O,
              K = false;
            (d() || ((X = parseFloat(m())), d() || (K = parseFloat(m()) !== 0)),
              l === l.toLowerCase() && ((R += c.x), (I += c.y)),
              S.rR(D, F, R, I, O, X, K));
          }
          u && (T = true);
          break;
        case "A":
          for (; !d(); ) {
            const D = Math.abs(parseFloat(m())),
              F = Math.abs(parseFloat(m())),
              R = parseFloat(m());
            let I = false,
              O = false,
              X = 0,
              K = 0;
            const V = m();
            (V.length === 1
              ? ((I = !!parseFloat(V)), (O = !!parseFloat(m())), (X = parseFloat(m())), (K = parseFloat(m())))
              : V.length === 2
                ? ((I = !!parseFloat(V[0])), (O = !!parseFloat(V[1])), (X = parseFloat(m())), (K = parseFloat(m())))
                : ((I = !!parseFloat(V[0])),
                  (O = !!parseFloat(V[1])),
                  (X = parseFloat(V.slice(2))),
                  (K = parseFloat(m()))),
              l === l.toLowerCase() && ((X = c.x + X), (K = c.y + K)),
              c.e(X, K),
              S.lR(D, F, R, I, O, X, K));
          }
          u && (T = true);
          break;
        case "Z":
          (S.hR(), c.c(a));
          break;
        case "F": {
          let D = "",
            F = 1;
          for (; o[r + F]; ) {
            if (o[r + F] === "0") {
              ((A = true), F++);
              continue;
            }
            if (o[r + F].match(/[Uu]/) !== null) {
              F++;
              continue;
            }
            if (o[r + F].match(M) === null) {
              F++;
              continue;
            }
            D = o[r + F];
            break;
          }
          D.match(/[Mm]/) ? (k = true) : S.aR();
          break;
        }
        case "U": {
          let D = "",
            F = 1;
          for (; o[r + F]; ) {
            if (o[r + F].match(/[Ff]/) !== null) {
              F++;
              continue;
            }
            if (o[r + F].match(M) === null) {
              F++;
              continue;
            }
            D = o[r + F];
            break;
          }
          D.match(/[Mm]/) ? (P = true) : S.fR(false);
          break;
        }
        default:
          if (l === "0" || l === "1") break;
          U.ot("Unknown geometry command: " + l);
          break;
      }
      if (T) {
        U.ot(`Bad geometry command: ${l}, next token: ${m()},
string: ${t}`);
        break;
      }
    }
    const N = S.pm;
    if ((GeoStream._A(S), i)) {
      const T = N.figures.iterator;
      for (; T.next(); ) {
        const L = T.value;
        L.isFilled = true;
      }
    }
    return N;
  }
  static tT(t, i) {
    const e = t.length,
      s = Point.a();
    for (let n = 0; n < e; n++) {
      const o = t[n];
      ((s.x = o[0]),
        (s.y = o[1]),
        i.St(s),
        (o[0] = s.x),
        (o[1] = s.y),
        (s.x = o[2]),
        (s.y = o[3]),
        i.St(s),
        (o[2] = s.x),
        (o[3] = s.y),
        (s.x = o[4]),
        (s.y = o[5]),
        i.St(s),
        (o[4] = s.x),
        (o[5] = s.y),
        (s.x = o[6]),
        (s.y = o[7]),
        i.St(s),
        (o[6] = s.x),
        (o[7] = s.y));
    }
    Point.o(s);
  }
  Yk() {
    if (this.kt) return true;
    if (this.type === 4) {
      const t = this.figures;
      if (this.dm !== t.ct) return true;
      const i = this.figures.h,
        e = i.length;
      for (let s = 0; s < e; s++) if (i[s].Yk()) return true;
    }
    return false;
  }
  gx() {
    if (((this.kt = false), (this.Af = null), (this.Fu = null), (this.Iu = NaN), this.type === 4)) {
      const i = this.figures;
      this.dm = i.ct;
      const e = this.figures.h,
        s = e.length;
      for (let n = 0; n < s; n++) e[n].cR();
    }
    const t = this.gm;
    (isNaN(this.Tf) || isNaN(this.Lf) ? t.e(0, 0, 0, 0) : t.e(0, 0, this.Tf, this.Lf),
      this.iT(t, false),
      t.ai(0, 0, 0, 0));
  }
  computeBoundsWithoutOrigin() {
    const t = new Rect();
    return (this.iT(t, true), t);
  }
  iT(t, i) {
    switch (this.type) {
      case 1:
      case 2:
      case 3:
        (i ? t.e(this.Fe, this.Ie, 0, 0) : t.ai(this.Fe, this.Ie, 0, 0), t.ai(this.le, this.he, 0, 0));
        break;
      case 4:
        const e = this.figures,
          s = e.h,
          n = e.length;
        for (let o = 0; o < n; o++) {
          const r = s[o];
          i && o === 0 ? t.e(r.startX, r.startY, 0, 0) : t.ai(r.startX, r.startY, 0, 0);
          const h = r.segments.h,
            a = h.length;
          let f = r.startX,
            c = r.startY;
          for (let u = 0; u < a; u++) {
            const d = h[u];
            switch (d.type) {
              case 2:
              case 1:
                ((f = d.endX), (c = d.endY), t.ai(f, c, 0, 0));
                break;
              case 3:
                (G.Du(f, c, d.point1X, d.point1Y, d.point2X, d.point2Y, d.endX, d.endY, 0.5, t),
                  (f = d.endX),
                  (c = d.endY));
                break;
              case 4:
                (G.Xk(f, c, d.point1X, d.point1Y, d.endX, d.endY, 0.5, t), (f = d.endX), (c = d.endY));
                break;
              case 5:
              case 6:
                const m = d.type === 5 ? d.Vo(r) : d.na(r, f, c),
                  g = m.length;
                if (g === 0) {
                  ((f = d.type === 5 ? d.centerX : d.endX), (c = d.type === 5 ? d.centerY : d.endY), t.ai(f, c, 0, 0));
                  break;
                }
                let p = null;
                for (let y = 0; y < g; y++) ((p = m[y]), G.Du(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], 0.5, t));
                p !== null && ((f = p[6]), (c = p[7]));
                break;
              default:
                U.n("Unknown Segment type: " + d.type);
            }
          }
        }
        break;
      default:
        U.n("Unknown Geometry type: " + this.type);
    }
  }
  uR(t, i) {
    const e = this.bounds;
    let s = t / e.width,
      n = i / e.height;
    return (isFinite(s) || (s = 1), isFinite(n) || (n = 1), s === 1 && n === 1 ? this : this.copy().scale(s, n));
  }
  normalize() {
    this.p && U.D(this);
    const t = this.computeBoundsWithoutOrigin();
    return (this.offset(-t.x, -t.y), new Point(-t.x, -t.y));
  }
  offset(t, i) {
    return (
      this.p && U.D(this),
      Debug && (U.r(t, Geometry, "offset"), U.r(i, Geometry, "offset")),
      this.E(1, 0, 0, 1, t, i),
      this
    );
  }
  scale(t, i) {
    return (
      this.p && U.D(this),
      Debug &&
        (U.r(t, Geometry, "scale:x"),
        U.r(i, Geometry, "scale:y"),
        t === 0 && U.G(t, "scale must be non-zero", Geometry, "scale:x"),
        i === 0 && U.G(i, "scale must be non-zero", Geometry, "scale:y")),
      this.E(t, 0, 0, i, 0, 0),
      this
    );
  }
  rotate(t, i, e) {
    (this.p && U.D(this),
      i === void 0 && (i = 0),
      e === void 0 && (e = 0),
      Debug && (U.r(t, Geometry, "rotate:angle"), U.r(i, Geometry, "rotate:x"), U.r(e, Geometry, "rotate:y")));
    const s = Transform.a();
    return (s.Ki(), s.Ns(t, i, e), this.E(s.m11, s.m12, s.m21, s.m22, s.dx, s.dy), Transform.o(s), this);
  }
  E(t, i, e, s, n, o) {
    let r = 0,
      l = 0;
    switch (this.type) {
      case 1:
      case 2:
      case 3:
        ((r = this.Fe),
          (l = this.Ie),
          (this.Fe = r * t + l * e + n),
          (this.Ie = r * i + l * s + o),
          (r = this.le),
          (l = this.he),
          (this.le = r * t + l * e + n),
          (this.he = r * i + l * s + o));
        break;
      case 4:
        const a = this.figures.h,
          f = a.length;
        for (let c = 0; c < f; c++) {
          const u = a[c];
          ((r = u.startX), (l = u.startY), (u.startX = r * t + l * e + n), (u.startY = r * i + l * s + o));
          const m = u.segments.h,
            g = m.length;
          for (let p = 0; p < g; p++) {
            const y = m[p];
            switch (y.type) {
              case 2:
              case 1:
                ((r = y.endX), (l = y.endY), (y.endX = r * t + l * e + n), (y.endY = r * i + l * s + o));
                break;
              case 3:
                ((r = y.point1X),
                  (l = y.point1Y),
                  (y.point1X = r * t + l * e + n),
                  (y.point1Y = r * i + l * s + o),
                  (r = y.point2X),
                  (l = y.point2Y),
                  (y.point2X = r * t + l * e + n),
                  (y.point2Y = r * i + l * s + o),
                  (r = y.endX),
                  (l = y.endY),
                  (y.endX = r * t + l * e + n),
                  (y.endY = r * i + l * s + o));
                break;
              case 4:
                ((r = y.point1X),
                  (l = y.point1Y),
                  (y.point1X = r * t + l * e + n),
                  (y.point1Y = r * i + l * s + o),
                  (r = y.endX),
                  (l = y.endY),
                  (y.endX = r * t + l * e + n),
                  (y.endY = r * i + l * s + o));
                break;
              case 5:
                if (
                  ((r = y.centerX),
                  (l = y.centerY),
                  (y.centerX = r * t + l * e + n),
                  (y.centerY = r * i + l * s + o),
                  i !== 0)
                ) {
                  let x = (Math.atan2(i, t) * 180) / Math.PI;
                  (x < 0 && (x += 360), (y.startAngle += x));
                }
                (t < 0 && ((y.startAngle = 180 - y.startAngle), (y.sweepAngle = -y.sweepAngle)),
                  s < 0 && ((y.startAngle = -y.startAngle), (y.sweepAngle = -y.sweepAngle)),
                  (y.radiusX *= Math.sqrt(t * t + e * e)),
                  y.radiusY !== void 0 && (y.radiusY *= Math.sqrt(i * i + s * s)));
                break;
              case 6:
                if (
                  ((r = y.endX),
                  (l = y.endY),
                  (y.endX = r * t + l * e + n),
                  (y.endY = r * i + l * s + o),
                  y.radiusX === 0 || y.radiusY === 0)
                )
                  break;
                if (i !== 0) {
                  let x = (Math.atan2(i, t) * 180) / Math.PI;
                  (x < 0 && (x += 360), (y.xAxisRotation += x));
                }
                (t < 0 && ((y.xAxisRotation = 180 - y.xAxisRotation), (y.isClockwiseArc = !y.isClockwiseArc)),
                  s < 0 && ((y.xAxisRotation = -y.xAxisRotation), (y.isClockwiseArc = !y.isClockwiseArc)),
                  (y.radiusX *= Math.sqrt(t * t + e * e)),
                  (y.radiusY *= Math.sqrt(i * i + s * s)));
                break;
              default:
                U.n("Unknown Segment type: " + y.type);
            }
          }
        }
        break;
    }
    return ((this.kt = true), this);
  }
  containsPoint(t, i) {
    i === void 0 && (i = 0);
    const e = this.Fe,
      s = this.Ie,
      n = this.le,
      o = this.he;
    switch (this.type) {
      case 1:
        return G.Ui(e, s, n, o, i, t.x, t.y);
      case 2: {
        const r = Math.min(e, n) - i,
          l = Math.min(s, o) - i,
          h = Math.abs(n - e) + i * 2,
          a = Math.abs(o - s) + i * 2,
          f = Rect.U(r, l, h, a),
          c = f.containsPoint(t);
        return (Rect.o(f), c);
      }
      case 3: {
        let r = Math.min(e, n) - i,
          l = Math.min(s, o) - i;
        const h = Math.abs(n - e) + i * 2,
          a = Math.abs(o - s) + i * 2,
          f = h / 2,
          c = a / 2;
        return f <= 0 || c <= 0
          ? false
          : ((r = t.x - (r + f)), (l = t.y - (l + c)), (r * r) / (f * f) + (l * l) / (c * c) <= 1);
      }
      case 4:
        return this.Kk(t, i, true, false);
      default:
        return false;
    }
  }
  Kk(t, i, e, s) {
    const n = t.x,
      o = t.y,
      r = this.bounds.x - 20,
      l = o;
    let h = 0,
      a = 0,
      f = 0,
      c = 0,
      u = 0,
      d = 0;
    const m = this.figures.h,
      g = m.length;
    for (let p = 0; p < g; p++) {
      const y = m[p],
        x = !y.isEvenOdd;
      if (y.isFilled) {
        if (e && y.Uk(n, o, i)) return true;
      } else {
        if (y.Uk(n, o, s ? i : i + 2)) return true;
        continue;
      }
      const b = y.segments;
      ((a = y.startX), (f = y.startY));
      let S = a,
        k = f;
      const P = b.h;
      let A = P[0];
      for (let C = 0; C <= b.length; C++) {
        let M;
        switch (
          (C !== b.length ? ((A = P[C]), (M = A.type), (u = A.endX), (d = A.endY)) : ((M = 2), (u = S), (d = k)), M)
        ) {
          case 1: {
            const N = this.mx(n, o, r, l, a, f, S, k);
            if (isNaN(N)) return true;
            ((h += N), (S = u), (k = d));
            break;
          }
          case 2: {
            const N = this.mx(n, o, r, l, a, f, u, d);
            if (isNaN(N)) return true;
            h += N;
            break;
          }
          case 3:
            ((c = G.fm(a, f, A.point1X, A.point1Y, A.point2X, A.point2Y, u, d, r, l, n, o, 0.5)), (h += c));
            break;
          case 4: {
            const N = (a + 2 * A.point1X) / 3,
              T = (f + 2 * A.point1Y) / 3,
              L = (A.point1X * 2 + u) / 3,
              D = (A.point1Y * 2 + d) / 3;
            ((c = G.fm(a, f, N, T, L, D, u, d, r, l, n, o, 0.5)), (h += c));
            break;
          }
          case 5:
          case 6: {
            const N = A.type === 5 ? A.Vo(y) : A.na(y, a, f),
              T = N.length;
            if (T === 0) {
              const D = this.mx(n, o, r, l, a, f, A.type === 5 ? A.centerX : A.endX, A.type === 5 ? A.centerY : A.endY);
              if (isNaN(D)) return true;
              h += D;
              break;
            }
            let L = null;
            for (let D = 0; D < T; D++) {
              if (((L = N[D]), D === 0)) {
                const F = this.mx(n, o, r, l, a, f, L[0], L[1]);
                if (isNaN(F)) return true;
                h += F;
              }
              ((c = G.fm(L[0], L[1], L[2], L[3], L[4], L[5], L[6], L[7], r, l, n, o, 0.5)), (h += c));
            }
            L !== null && ((u = L[6]), (d = L[7]));
            break;
          }
          default:
            U.n("Unknown Segment type: " + A.type);
        }
        ((a = u), (f = d));
      }
      if (x) {
        if (h !== 0) return true;
      } else if (h % 2 !== 0) return true;
      h = 0;
    }
    return false;
  }
  mx(t, i, e, s, n, o, r, l) {
    if (G.Ui(n, o, r, l, 0.05, t, i)) return NaN;
    const h = (t - e) * (o - l);
    if (h === 0) return 0;
    const a = ((t * s - i * e) * (n - r) - (t - e) * (n * l - o * r)) / h,
      f = ((t * s - i * e) * (o - l)) / h;
    if (a >= t) return 0;
    if ((n > r ? n - r : r - n) < (o > l ? o - l : l - o)) {
      if (o < l) {
        if (f < o || f > l) return 0;
      } else if (f < l || f > o) return 0;
    } else if (n < r) {
      if (a < n || a > r) return 0;
    } else if (a < r || a > n) return 0;
    return h > 0 ? 1 : -1;
  }
  eT(t, i, e) {
    const s = this.figures.h,
      n = s.length;
    for (let o = 0; o < n; o++) if (s[o].Uk(t, i, e)) return true;
    return false;
  }
  getPointAlongPath(t, i) {
    if ((t < 0 ? (t = 0) : t > 1 && (t = 1), i === void 0 && (i = new Point()), this.type === 1))
      return (i.e(this.startX + t * (this.endX - this.startX), this.startY + t * (this.endY - this.startY)), i);
    const e = this.flattenedSegments,
      s = this.flattenedLengths,
      n = this.flattenedTotalLength,
      o = e.length,
      r = n * t;
    let l = 0;
    for (let h = 0; h < o; h++) {
      const a = s[h],
        f = a.length;
      for (let c = 0; c < f; c++) {
        const u = a[c];
        if (l + u >= r) {
          const d = r - l,
            m = u === 0 ? 0 : d / u,
            g = e[h],
            p = g[c * 2],
            y = g[c * 2 + 1],
            x = g[c * 2 + 2],
            b = g[c * 2 + 3];
          return (i.e(p + (x - p) * m, y + (b - y) * m), i);
        }
        l += u;
      }
    }
    return i;
  }
  getAngleAlongPath(t) {
    if ((t < 0 ? (t = 0) : t > 1 && (t = 1), this.type === 1))
      return (Math.atan2(this.endY - this.startY, this.endX - this.startX) * 180) / Math.PI;
    const i = this.flattenedSegments,
      e = this.flattenedLengths,
      s = this.flattenedTotalLength,
      n = i.length,
      o = s * t;
    let r = 0;
    for (let l = 0; l < n; l++) {
      const h = e[l],
        a = h.length;
      for (let f = 0; f < a; f++) {
        const c = h[f];
        if (r + c >= o) {
          const u = i[l],
            d = u[f * 2],
            m = u[f * 2 + 1],
            g = u[f * 2 + 2],
            p = u[f * 2 + 3];
          return Math.abs(g - d) < 1 && Math.abs(p - m) < 1
            ? 0
            : Math.abs(g - d) < 1
              ? p - m >= 0
                ? 90
                : 270
              : Math.abs(p - m) < 1
                ? g - d >= 0
                  ? 0
                  : 180
                : (Math.atan2(p - m, g - d) * 180) / Math.PI;
        }
        r += c;
      }
    }
    return NaN;
  }
  getPointAndAngleAlongPath(t, i) {
    if ((t < 0 ? (t = 0) : t > 1 && (t = 1), i === void 0 && (i = []), (i.length = 3), this.type === 1))
      return (
        (i[0] = this.startX + t * (this.endX - this.startX)),
        (i[1] = this.startY + t * (this.endY - this.startY)),
        (i[2] = (Math.atan2(this.endY - this.startY, this.endX - this.startX) * 180) / Math.PI),
        i
      );
    const e = this.flattenedSegments,
      s = this.flattenedLengths,
      n = this.flattenedTotalLength,
      o = e.length,
      r = n * t;
    let l = 0;
    for (let h = 0; h < o; h++) {
      const a = s[h],
        f = a.length;
      for (let c = 0; c < f; c++) {
        const u = a[c];
        if (l + u >= r) {
          const d = r - l,
            m = u === 0 ? 0 : d / u,
            g = e[h],
            p = g[c * 2],
            y = g[c * 2 + 1],
            x = g[c * 2 + 2],
            b = g[c * 2 + 3];
          ((i[0] = p + (x - p) * m), (i[1] = y + (b - y) * m));
          let S;
          return (
            Math.abs(x - p) < 1 && Math.abs(b - y) < 1
              ? (S = 0)
              : Math.abs(x - p) < 1
                ? (S = b - y >= 0 ? 90 : 270)
                : Math.abs(b - y) < 1
                  ? (S = x - p >= 0 ? 0 : 180)
                  : (S = (Math.atan2(b - y, x - p) * 180) / Math.PI),
            (i[2] = S),
            i
          );
        }
        l += u;
      }
    }
    return i;
  }
  getFractionForPoint(t) {
    if (this.type === 1) {
      const i = this.startX,
        e = this.startY,
        s = this.endX,
        n = this.endY;
      if (i === s && e === n) return 0;
      {
        const o = t.x,
          r = t.y;
        let l = 0,
          h = 0;
        if (i === s)
          return (
            e < n ? ((l = e), (h = n)) : ((l = n), (h = e)),
            r <= l ? (l === e ? 0 : 1) : r >= h ? (h === e ? 0 : 1) : Math.abs(r - e) / (h - l)
          );
        if (e === n)
          return (
            i < s ? ((l = i), (h = s)) : ((l = s), (h = i)),
            o <= l ? (l === i ? 0 : 1) : o >= h ? (h === i ? 0 : 1) : Math.abs(o - i) / (h - l)
          );
        {
          const a = (s - i) ** 2 + (n - e) ** 2,
            f = Point.a();
          G.Fl(i, e, s, n, o, r, f);
          const c = f.x,
            u = f.y;
          return (Point.o(f), Math.sqrt(((c - i) ** 2 + (u - e) ** 2) / a));
        }
      }
    } else if (this.type === 2) {
      const i = this.startX,
        e = this.startY,
        s = this.endX,
        n = this.endY;
      if (i === s && e === n) return 0;
      {
        const o = s - i,
          r = n - e,
          l = o * 2 + r * 2;
        let h = t.x,
          a = t.y;
        ((h = Math.min(Math.max(h, i), s)), (a = Math.min(Math.max(a, e), n)));
        const f = Math.abs(h - i),
          c = Math.abs(h - s),
          u = Math.abs(a - e),
          d = Math.abs(a - n),
          m = Math.min(f, c, u, d);
        if (m === u) return h / l;
        if (m === c) return (o + a) / l;
        if (m === d) return (o * 2 + r - h) / l;
        if (m === f) return (o * 2 + r * 2 - a) / l;
      }
    } else {
      const i = this.flattenedSegments,
        e = this.flattenedLengths,
        s = this.flattenedTotalLength,
        n = Point.a();
      let o = 1 / 0,
        r = 0,
        l = 0;
      const h = i.length;
      let a = 0,
        f = 0;
      for (let u = 0; u < h; u++) {
        const d = i[u],
          m = e[u],
          g = d.length;
        for (let p = 0; p < g; p += 2) {
          const y = d[p],
            x = d[p + 1];
          if (p === 0) {
            ((a = y), (f = x));
            continue;
          }
          G.Fl(a, f, y, x, t.x, t.y, n);
          const b = (n.x - t.x) ** 2 + (n.y - t.y) ** 2;
          (b < o && ((o = b), (r = l), (r += Math.sqrt((n.x - a) ** 2 + (n.y - f) ** 2))),
            (l += m[(p - 2) / 2]),
            (a = y),
            (f = x));
        }
      }
      Point.o(n);
      const c = r / s;
      return c < 0 ? 0 : c > 1 ? 1 : c;
    }
    return 0;
  }
  get flattenedSegments() {
    return (this.sT(), this.Af);
  }
  sT() {
    if (this.Af === null) {
      const t = (this.Af = []),
        i = (this.Fu = []);
      this.dR(t, i);
    }
  }
  get flattenedLengths() {
    return (this.sT(), this.Fu);
  }
  get flattenedTotalLength() {
    let t = this.Iu;
    if (isNaN(t)) {
      if (this.type === 1) {
        const i = Math.abs(this.endX - this.startX),
          e = Math.abs(this.endY - this.startY);
        t = Math.sqrt(i * i + e * e);
      } else if (this.type === 2) {
        const i = Math.abs(this.endX - this.startX),
          e = Math.abs(this.endY - this.startY);
        t = i * 2 + e * 2;
      } else {
        const i = this.flattenedLengths,
          e = i.length;
        t = 0;
        for (let s = 0; s < e; s++) {
          const n = i[s],
            o = n.length;
          for (let r = 0; r < o; r++) t += n[r];
        }
      }
      this.Iu = t;
    }
    return t;
  }
  Gk(t) {
    const i = [];
    let e = 0,
      s = 0;
    const n = t.length;
    for (let o = 0; o < n; o += 2) {
      const r = t[o],
        l = t[o + 1];
      if (o === 0) {
        ((e = r), (s = l));
        continue;
      }
      const h = Math.sqrt(Point.distanceSquared(e, s, r, l));
      (i.push(h), (e = r), (s = l));
    }
    return i;
  }
  dR(t, i) {
    let e = [];
    const s = [];
    if (this.type === 1)
      (e.push(this.startX),
        e.push(this.startY),
        e.push(this.endX),
        e.push(this.endY),
        t.push(e),
        s.push(Math.sqrt((this.startX - this.endX) ** 2 + (this.startY - this.endY) ** 2)),
        i.push(s));
    else if (this.type === 2)
      (e.push(this.startX),
        e.push(this.startY),
        e.push(this.endX),
        e.push(this.startY),
        e.push(this.endX),
        e.push(this.endY),
        e.push(this.startX),
        e.push(this.endY),
        e.push(this.startX),
        e.push(this.startY),
        t.push(e),
        s.push(Math.abs(this.startX - this.endX)),
        s.push(Math.abs(this.startY - this.endY)),
        s.push(Math.abs(this.startX - this.endX)),
        s.push(Math.abs(this.startY - this.endY)),
        i.push(s));
    else if (this.type === 3) {
      const n = new PathFigure();
      ((n.startX = this.endX), (n.startY = (this.startY + this.endY) / 2));
      const o = new PathSegment(5);
      ((o.startAngle = 0),
        (o.sweepAngle = 360),
        (o.centerX = (this.startX + this.endX) / 2),
        (o.centerY = (this.startY + this.endY) / 2),
        (o.radiusX = Math.abs(this.startX - this.endX) / 2),
        (o.radiusY = Math.abs(this.startY - this.endY) / 2),
        n.add(o));
      const r = o.Vo(n),
        l = r.length;
      if (l === 0) (e.push(o.centerX), e.push(o.centerY));
      else {
        let h = n.startX,
          a = n.startY;
        for (let f = 0; f < l; f++) {
          const c = r[f];
          (G.Qn(h, a, c[2], c[3], c[4], c[5], c[6], c[7], 0.5, e), (h = c[6]), (a = c[7]));
        }
      }
      (t.push(e), i.push(this.Gk(e)));
    } else {
      const n = this.figures.iterator;
      for (; n.next(); ) {
        const o = n.value;
        ((e = []), e.push(o.startX), e.push(o.startY));
        let r = o.startX,
          l = o.startY,
          h = r,
          a = l;
        const f = o.segments.h,
          c = f.length;
        for (let u = 0; u < c; u++) {
          const d = f[u];
          switch (d.type) {
            case 1:
              (e.length >= 4 && (t.push(e), i.push(this.Gk(e))),
                (e = []),
                e.push(d.endX),
                e.push(d.endY),
                (r = d.endX),
                (l = d.endY),
                (h = r),
                (a = l));
              break;
            case 2:
              (e.push(d.endX), e.push(d.endY), (r = d.endX), (l = d.endY));
              break;
            case 3:
              (G.Qn(r, l, d.point1X, d.point1Y, d.point2X, d.point2Y, d.endX, d.endY, 0.5, e),
                (r = d.endX),
                (l = d.endY));
              break;
            case 4:
              (G.hm(r, l, d.point1X, d.point1Y, d.endX, d.endY, 0.5, e), (r = d.endX), (l = d.endY));
              break;
            case 5: {
              const m = d.Vo(o),
                g = m.length;
              if (g === 0) {
                (e.push(d.centerX), e.push(d.centerY), (r = d.centerX), (l = d.centerY));
                break;
              }
              for (let p = 0; p < g; p++) {
                const y = m[p];
                (G.Qn(r, l, y[2], y[3], y[4], y[5], y[6], y[7], 0.5, e), (r = y[6]), (l = y[7]));
              }
              break;
            }
            case 6: {
              const m = d.na(o, r, l),
                g = m.length,
                p = d.endX,
                y = d.endY;
              if (g === 0) {
                (e.push(p), e.push(y), (r = p), (l = y));
                break;
              }
              for (let x = 0; x < g; x++) {
                const b = m[x];
                (G.Qn(r, l, b[2], b[3], b[4], b[5], b[6], b[7], 0.5, e), (r = b[6]), (l = b[7]));
              }
              break;
            }
            default:
              U.n("Segment not of valid type: " + d.type);
          }
          d.isClosed && (e.push(h), e.push(a));
        }
        e.length >= 4 && (t.push(e), i.push(this.Gk(e)));
      }
    }
  }
  get type() {
    return this.tt;
  }
  set type(t) {
    this.tt !== t &&
      (Debug && U.W(t, GeometryType, "GeometryType"),
      this.p && U.D(this, t),
      (this.tt = t),
      t === 4
        ? (this.Ws = new List())
        : (Geometry.ux === null && (Geometry.ux = new List().k()), (this.Ws = Geometry.ux)),
      (this.kt = true));
  }
  get startX() {
    return this.Fe;
  }
  set startX(t) {
    this.Fe !== t && (Debug && U.r(t, Geometry, "startX"), this.p && U.D(this, t), (this.Fe = t), (this.kt = true));
  }
  get startY() {
    return this.Ie;
  }
  set startY(t) {
    this.Ie !== t && (Debug && U.r(t, Geometry, "startY"), this.p && U.D(this, t), (this.Ie = t), (this.kt = true));
  }
  get endX() {
    return this.le;
  }
  set endX(t) {
    this.le !== t && (Debug && U.r(t, Geometry, "endX"), this.p && U.D(this, t), (this.le = t), (this.kt = true));
  }
  get endY() {
    return this.he;
  }
  set endY(t) {
    this.he !== t && (Debug && U.r(t, Geometry, "endY"), this.p && U.D(this, t), (this.he = t), (this.kt = true));
  }
  get figures() {
    return this.Ws;
  }
  set figures(t) {
    this.Ws !== t &&
      (Debug && U.s(t, List, Geometry, "figures"), this.p && U.D(this, t), (this.Ws = t), (this.kt = true));
  }
  add(t) {
    return (Debug && U.s(t, PathFigure, Geometry, "add"), this.Ws.add(t), this);
  }
  setSpots(t, i, e, s, n, o, r, l) {
    return (this.p && U.D(this), (this._n = new Spot(t, i, n, o)), (this.to = new Spot(e, s, r, l)), this);
  }
  get spot1() {
    return this._n;
  }
  set spot1(t) {
    (Debug && U.s(t, Spot, Geometry, "spot1"), this.p && U.D(this, t), (this._n = t.T()));
  }
  get spot2() {
    return this.to;
  }
  set spot2(t) {
    (Debug && U.s(t, Spot, Geometry, "spot2"), this.p && U.D(this, t), (this.to = t.T()));
  }
  get defaultStretch() {
    return this.io;
  }
  set defaultStretch(t) {
    this.io = t;
  }
  get bounds() {
    return (this.Yk() && this.gx(), this.gm);
  }
  polygonClosestSegment(t, i) {
    if ((i === void 0 && (i = 10), this.type !== 4)) return null;
    const e = t.x,
      s = t.y;
    let n = 1 / 0,
      o = 0,
      r = 0,
      l = 0,
      h = 0,
      a = 0,
      f = 0,
      c = 0,
      u = 0;
    return (
      this.figures.each((d) => {
        let m = d.startX,
          g = d.startY;
        (d.segments.each((p) => {
          let y = p.endX,
            x = p.endY,
            b = 0;
          if (p.type === 2) b = Point.distanceLineSegmentSquared(e, s, m, g, y, x);
          else {
            ((m = p.endX), (g = p.endY));
            return;
          }
          (b < n && ((n = b), (o = l), (r = h), (a = m), (f = g), (c = y), (u = x)),
            (m = y),
            (g = x),
            h++,
            p.isClosed &&
              ((y = d.startX),
              (x = d.startY),
              (b = Point.distanceLineSegmentSquared(e, s, m, g, y, x)),
              b < n && ((n = b), (o = l), (r = h), (a = m), (f = g), (c = y), (u = x)),
              h++));
        }),
          l++,
          (h = 0));
      }),
      n < i * i ? { figi: o, segi: r, ax: a, ay: f, bx: c, by: u } : null
    );
  }
  get polygonArea() {
    if (this.type === 4) {
      const t = this.figures.iterator;
      let i = 0,
        e = 0,
        s = 0,
        n = 0,
        o = 0;
      for (; t.next(); ) {
        const r = t.value;
        if (!r.isFilled) continue;
        ((i = r.startX), (e = r.startY));
        const l = r.segments.iterator;
        for (; l.next(); ) {
          const h = l.value;
          ((s = h.endX), (n = h.endY), h.type === 1 || (h.type !== 5 && (o += i * n - e * s)), (i = s), (e = n));
        }
        o += i * r.startY - e * r.startX;
      }
      return Math.abs(o) / 2;
    } else if (this.type === 2) {
      const t = Math.abs(this.startX - this.endX),
        i = Math.abs(this.startY - this.endY);
      return t * i;
    } else if (this.type === 3) {
      const t = Math.abs(this.startX - this.endX),
        i = Math.abs(this.startY - this.endY);
      return (((Math.PI * t) / 2) * i) / 2;
    } else return 0;
  }
  get polygonLength() {
    if (this.type === 4) {
      const t = this.figures.iterator;
      let i = 0,
        e = 0,
        s = 0,
        n = 0,
        o = 0;
      for (; t.next(); ) {
        const r = t.value;
        ((i = r.startX), (e = r.startY));
        const l = r.segments.iterator;
        for (; l.next(); ) {
          const a = l.value;
          ((s = a.endX),
            (n = a.endY),
            a.type === 1 || (a.type !== 5 && (o += Math.sqrt((s - i) * (s - i) + (n - e) * (n - e)))),
            (i = s),
            (e = n));
        }
        const h = r.segments.last();
        h && h.isClosed && ((s = r.startX), (n = r.startY), (o += Math.sqrt((s - i) * (s - i) + (n - e) * (n - e))));
      }
      return o;
    } else if (this.type === 2) {
      const t = Math.abs(this.startX - this.endX),
        i = Math.abs(this.startY - this.endY);
      return t * 2 + i * 2;
    } else if (this.type === 3) {
      const t = Math.abs(this.startX - this.endX) / 2,
        i = Math.abs(this.startY - this.endY) / 2;
      if (t + i === 0) return 0;
      const e = ((t - i) * (t - i)) / ((t + i) * (t + i));
      let s = e,
        n = 1 + s / 4;
      return (
        (s *= e),
        (n += s / 64),
        (s *= e),
        (n += s / 256),
        (s *= e),
        (n += (s * 25) / 16384),
        (s *= e),
        (n += (s * 49) / 65536),
        (s *= e),
        (n += (s * 441) / 1048576),
        Math.PI * (t + i) * n
      );
    } else {
      const t = this.startX,
        i = this.startY,
        e = this.endX,
        s = this.endY;
      return Math.sqrt((e - t) * (e - t) + (s - i) * (s - i));
    }
  }
  static computeConvexHull(t) {
    t.sort((s, n) => (s.x === n.x ? n.y - s.y : n.x - s.x));
    const i = [];
    for (let s = 0; s < t.length; s++) {
      for (; i.length >= 2 && t[s].compareWithLineSegmentPoint(i[i.length - 2], i[i.length - 1]) >= 0; ) i.pop();
      i.push(t[s]);
    }
    i.pop();
    const e = [];
    for (let s = t.length - 1; s >= 0; s--) {
      for (; e.length >= 2 && t[s].compareWithLineSegmentPoint(e[e.length - 2], e[e.length - 1]) >= 0; ) e.pop();
      e.push(t[s]);
    }
    return (e.pop(), i.concat(e));
  }
  static generatePolygon(t, i, e) {
    (i === void 0 && (i = 0), e === void 0 && (e = true));
    const s = new Geometry();
    if (t.length > 1)
      if (i > 0)
        if (e) {
          (t.push(t[0]), t.push(t[1]));
          let n = true;
          const o = new PathFigure(0, 0, e, false);
          for (let l = 1; l < t.length; l++) {
            const h = (t[l - 1].x + t[l].x) / 2,
              a = (t[l - 1].y + t[l].y) / 2,
              f = t[l - 1].distanceSquaredPoint(t[l]),
              c = (0.5 * i) / Math.sqrt(f);
            if (c < 0.5) {
              const u = t[l - 1].x + (t[l].x - t[l - 1].x) * c,
                d = t[l - 1].y + (t[l].y - t[l - 1].y) * c;
              if (
                (n
                  ? ((n = false), (o.startX = u), (o.startY = d))
                  : o.add(new PathSegment(3, u, d, t[l - 1].x, t[l - 1].y, t[l - 1].x, t[l - 1].y)),
                l < t.length - 1)
              ) {
                const m = t[l].x + (t[l - 1].x - t[l].x) * c,
                  g = t[l].y + (t[l - 1].y - t[l].y) * c;
                o.add(new PathSegment(2, m, g));
              }
            } else
              n
                ? ((n = false), (o.startX = h), (o.startY = a))
                : o.add(new PathSegment(3, h, a, t[l - 1].x, t[l - 1].y, t[l - 1].x, t[l - 1].y));
          }
          const r = o.segments.last();
          (r && r.close(), s.add(o));
        } else {
          const n = new PathFigure(t[0].x, t[0].y, false, false);
          for (let o = 1; o < t.length; o++) {
            const r = (t[o - 1].x + t[o].x) / 2,
              l = (t[o - 1].y + t[o].y) / 2,
              h = t[o - 1].distanceSquaredPoint(t[o]),
              a = (0.5 * i) / Math.sqrt(h);
            if (a < 0.5) {
              if (o > 1) {
                const u = t[o - 1].x + (t[o].x - t[o - 1].x) * a,
                  d = t[o - 1].y + (t[o].y - t[o - 1].y) * a;
                n.add(new PathSegment(3, u, d, t[o - 1].x, t[o - 1].y, t[o - 1].x, t[o - 1].y));
              }
              const f = t[o].x + (t[o - 1].x - t[o].x) * a,
                c = t[o].y + (t[o - 1].y - t[o].y) * a;
              n.add(new PathSegment(2, f, c));
            } else o > 1 && n.add(new PathSegment(3, r, l, t[o - 1].x, t[o - 1].y, t[o - 1].x, t[o - 1].y));
            o === t.length - 1 && n.add(new PathSegment(2, t[o].x, t[o].y));
          }
          s.add(n);
        }
      else {
        const n = new PathFigure(t[0].x, t[0].y, e, false);
        for (let o = 1; o < t.length; o++) n.add(new PathSegment(2, t[o].x, t[o].y));
        if (e) {
          const o = n.segments.last();
          o && o.close();
        }
        s.add(n);
      }
    return s;
  }
}
((Geometry.stringify = Geometry.stringify),
  (Geometry.stringifyFixed = Geometry.stringifyFixed),
  (Geometry.fillPath = Geometry.fillPath),
  (Geometry.parse = Geometry.parse));
