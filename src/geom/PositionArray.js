class PositionArray {
  me;
  pe;
  hf;
  af;
  ki;
  Pi;
  qt;
  Yh;
  Kh;
  Ra;
  K2;
  jo;
  tw;
  mc;
  U2;
  G2;
  constructor(t) {
    (GSet._i(this),
      (this.Ra = null),
      (this.K2 = null),
      (this.jo = true),
      (this.tw = false),
      (this.me = 1),
      (this.pe = 1),
      (this.hf = -1),
      (this.af = -1),
      (this.ki = t.width),
      (this.Pi = t.height),
      (this.qt = []),
      (this.Yh = 0),
      (this.Kh = 0),
      (this.mc = Link.xF),
      (this.U2 = this.mc * 2),
      (this.G2 = this.mc * 2));
  }
  static cn = 0;
  static ff = 1;
  static ag = 999999;
  static UC = PositionArray.ag + 1;
  static GC = PositionArray.ag + 2;
  yb(t) {
    if (t.width <= 0 || t.height <= 0) return;
    const i = t.x,
      e = t.y,
      s = t.x + t.width,
      n = t.y + t.height;
    ((this.me = Math.floor((i - this.ki) / this.ki) * this.ki),
      (this.pe = Math.floor((e - this.Pi) / this.Pi) * this.Pi),
      (this.hf = Math.ceil((s + 2 * this.ki) / this.ki) * this.ki),
      (this.af = Math.ceil((n + 2 * this.Pi) / this.Pi) * this.Pi));
    const o = 1 + (Math.ceil((this.hf - this.me) / this.ki) | 0),
      r = 1 + (Math.ceil((this.af - this.pe) / this.Pi) | 0);
    if (this.qt.length === 0 || this.Yh < o - 1 || this.Kh < r - 1) {
      const l = [];
      for (let h = 0; h <= o; h++) l[h] = new Uint32Array(r);
      ((this.qt = l), (this.Yh = o - 1), (this.Kh = r - 1));
    }
    this.j3(PositionArray.UC);
  }
  get bounds() {
    return new Rect(this.me, this.pe, this.hf - this.me, this.af - this.pe);
  }
  get cellWidth() {
    return this.ki;
  }
  set cellWidth(t) {
    t > 0 && t !== this.ki && ((this.ki = t), this.yb(this.bounds));
  }
  get cellHeight() {
    return this.Pi;
  }
  set cellHeight(t) {
    t > 0 && t !== this.Pi && ((this.Pi = t), this.yb(this.bounds));
  }
  fg(t, i) {
    return this.me <= t && t <= this.hf && this.pe <= i && i <= this.af;
  }
  Po(t, i) {
    if (!this.fg(t, i)) return PositionArray.UC;
    ((t -= this.me), (t /= this.ki), (i -= this.pe), (i /= this.Pi));
    const e = t | 0,
      s = i | 0;
    return this.qt[e][s];
  }
  XO(t, i, e, s) {
    if (!this.fg(t, i)) return;
    const n = ((t - this.me) / this.ki) | 0,
      o = ((i - this.pe) / this.Pi) | 0,
      r = ((t + e - this.me) / this.ki) | 0,
      l = ((i + s - this.pe) / this.Pi) | 0,
      h = Math.min(r, this.Yh),
      a = Math.min(l, this.Kh);
    for (let f = n; f <= h; f++) {
      const c = this.qt[f];
      if (c.fill) c.fill(PositionArray.cn, o, a + 1);
      else for (let u = o; u <= a; u++) c[u] = PositionArray.cn;
    }
  }
  j3(t) {
    for (let i = 0; i <= this.Yh; i++) {
      const e = this.qt[i];
      if (e.fill) e.fill(t);
      else for (let s = 0; s <= this.Kh; s++) e[s] = t;
    }
  }
  OL() {
    for (let t = 0; t <= this.Yh; t++) {
      const i = this.qt[t];
      for (let e = 0; e <= this.Kh; e++) i[e] >= PositionArray.ff && (i[e] = PositionArray.UC);
    }
  }
  J3(t, i) {
    return this.Po(t, i) === PositionArray.cn;
  }
  isUnoccupied(t, i, e, s) {
    if (t > this.hf || t + e < this.me || i > this.af || i + s < this.pe) return true;
    let n = ((t - this.me) / this.ki) | 0,
      o = ((i - this.pe) / this.Pi) | 0,
      r = (Math.max(0, e) / this.ki + 1) | 0,
      l = (Math.max(0, s) / this.Pi + 1) | 0;
    if ((n < 0 && ((r += n), (n = 0)), o < 0 && ((l += o), (o = 0)), r < 0 || l < 0)) return true;
    const h = Math.min(n + r - 1, this.Yh) | 0,
      a = Math.min(o + l - 1, this.Kh) | 0;
    for (let f = n; f <= h; f++) {
      const c = this.qt[f];
      for (let u = o; u <= a; u++) if (c[u] === PositionArray.cn) return false;
    }
    return true;
  }
  maxAvoidsLinksSpaceH(t, i, e, s) {
    if (t > this.hf || i < this.me || e > this.af || e < this.pe) return 0;
    const n = ((t - this.me) / this.ki) | 0,
      o = ((i - this.me) / this.ki) | 0,
      r = ((e - this.pe) / this.Pi) | 0,
      l = (s / this.Pi + 1) | 0;
    let h;
    for (h = 0; h < l / 2; h++) {
      let a = false;
      for (let f = n; f <= o; f++)
        if (this.qt[f][r + h] === PositionArray.cn || this.qt[f][r - h] === PositionArray.cn) {
          a = true;
          break;
        }
      if (a) return Math.max(0, (2 * h - 1) * this.Pi);
    }
    return s;
  }
  maxAvoidsLinksSpaceV(t, i, e, s) {
    if (t > this.af || i < this.pe || e > this.hf || e < this.me) return 0;
    const n = ((t - this.pe) / this.Pi) | 0,
      o = ((i - this.pe) / this.Pi) | 0,
      r = ((e - this.me) / this.ki) | 0,
      l = (s / this.ki + 1) | 0;
    let h;
    for (h = 0; h < l / 2; h++) {
      let a = false;
      for (let f = n; f <= o; f++)
        if (this.qt[r + h][f] === PositionArray.cn || this.qt[r - h][f] === PositionArray.cn) {
          a = true;
          break;
        }
      if (a) return Math.max(0, (2 * h - 1) * this.ki);
    }
    return s;
  }
  $3(t, i, e, s, n, o, r, l) {
    ((t = t | 0), (i = i | 0));
    let h = this.qt[t][i];
    if (h >= PositionArray.ff && h < PositionArray.ag)
      for (s ? (i += e) : (t += e), h += 1; n <= t && t <= o && r <= i && i <= l; ) {
        const a = this.qt[t][i];
        if (h >= a) break;
        ((this.qt[t][i] = h), (h += 1), s ? (i += e) : (t += e));
      }
    return s ? i : t;
  }
  Mo(t, i, e, s, n, o, r, l) {
    if (t < n || t > o || i < r || i > l) return;
    const h = this.$3(t, i, e, s, n, o, r, l);
    if (s)
      if (e > 0)
        for (let a = i + e; a < h; a += e) (this.Mo(t, a, 1, !s, n, o, r, l), this.Mo(t, a, -1, !s, n, o, r, l));
      else for (let a = i + e; a > h; a += e) (this.Mo(t, a, 1, !s, n, o, r, l), this.Mo(t, a, -1, !s, n, o, r, l));
    else if (e > 0)
      for (let a = t + e; a < h; a += e) (this.Mo(a, i, 1, !s, n, o, r, l), this.Mo(a, i, -1, !s, n, o, r, l));
    else for (let a = t + e; a > h; a += e) (this.Mo(a, i, 1, !s, n, o, r, l), this.Mo(a, i, -1, !s, n, o, r, l));
  }
  CS(t, i, e, s, n, o, r, l, h, a) {
    let f = t | 0,
      c = i | 0,
      u = PositionArray.cn,
      d = PositionArray.ff;
    for (this.qt[f][c] = d; u === PositionArray.cn && f > r && f < l && c > h && c < a; )
      ((d += 1), (this.qt[f][c] = d), o ? (c += n) : (f += n), (u = this.qt[f][c]));
    return o ? c : f;
  }
  AS(t, i, e, s, n, o, r, l, h, a) {
    let f = e | 0,
      c = s | 0,
      u = PositionArray.cn;
    const d = PositionArray.ag;
    for (this.qt[f][c] = d; u === PositionArray.cn && f > r && f < l && c > h && c < a; )
      ((this.qt[f][c] = d), o ? (c += n) : (f += n), (u = this.qt[f][c]));
  }
  MF(t, i, e, s, n, o) {
    this.tw = false;
    let r = t.x,
      l = t.y;
    if (!this.fg(r, l)) return;
    ((r -= this.me), (r /= this.ki), (l -= this.pe), (l /= this.Pi));
    let h = e.x,
      a = e.y;
    if (!this.fg(h, a)) return;
    if (
      ((h -= this.me), (h /= this.ki), (a -= this.pe), (a /= this.Pi), Math.abs(r - h) <= 1 && Math.abs(l - a) <= 1)
    ) {
      this.tw = true;
      return;
    }
    let f = n.x,
      c = n.y,
      u = n.x + n.width,
      d = n.y + n.height;
    ((f -= this.me),
      (f /= this.ki),
      (c -= this.pe),
      (c /= this.Pi),
      (u -= this.me),
      (u /= this.ki),
      (d -= this.pe),
      (d /= this.Pi));
    const m = Math.max(0, Math.min(this.Yh, f | 0)),
      g = Math.min(this.Yh, Math.max(0, u | 0)),
      p = Math.max(0, Math.min(this.Kh, c | 0)),
      y = Math.min(this.Kh, Math.max(0, d | 0)),
      x = 0,
      b = 90,
      S = 270,
      k = this.qt,
      P = r | 0,
      A = l | 0,
      C = h | 0,
      M = a | 0,
      N = i === x || i === b ? 1 : -1,
      T = i === b || i === S;
    (k[P][A] === PositionArray.cn
      ? (this.CS(P, A, C, M, N, T, m, g, p, y),
        this.CS(P, A, C, M, 1, !T, m, g, p, y),
        this.CS(P, A, C, M, -1, !T, m, g, p, y))
      : this.CS(P, A, C, M, N, T, P, A, P, A),
      k[C][M] === PositionArray.cn
        ? (this.AS(P, A, C, M, s === x || s === b ? 1 : -1, s === b || s === S, m, g, p, y),
          this.AS(P, A, C, M, 1, !(s === b || s === S), m, g, p, y),
          this.AS(P, A, C, M, -1, !(s === b || s === S), m, g, p, y))
        : this.AS(P, A, C, M, N, T, C, M, C, M));
    const L = U.ht();
    if (o && this.NF(C, M, s, P, A, L)) {
      ((L[0] !== C || L[1] !== M) && (L.unshift(M), L.unshift(C)),
        (L[L.length - 2] !== P || L[L.length - 1] !== A) && (L.push(P), L.push(A)));
      let D = PositionArray.ff,
        F = L[L.length - 2],
        R = L[L.length - 1];
      k[F][R] = D++;
      for (let I = L.length - 4; I >= 0; I -= 2) {
        ((F = L[I + 2]), (R = L[I + 3]));
        const O = L[I],
          X = L[I + 1];
        for (; O > F ? F++ : O < F ? F-- : X > R ? R++ : X < R && R--, (k[F][R] = D++), !(F === O && R === X); );
      }
    } else
      (this.Mo(P, A, 1, false, m, g, p, y),
        this.Mo(P, A, -1, false, m, g, p, y),
        this.Mo(P, A, 1, true, m, g, p, y),
        this.Mo(P, A, -1, true, m, g, p, y));
    U.et(L);
  }
  NF(t, i, e, s, n, o) {
    const f = this.qt;
    let c = t,
      u = i;
    for (;;) {
      if (c === s && u === n) return true;
      let d = c,
        m = u;
      if (e === 0)
        if (d < s) d++;
        else break;
      else if (e === 90)
        if (m < n) m++;
        else break;
      else if (e === 180)
        if (d > s) d--;
        else break;
      else if (m > n) m--;
      else break;
      const g = f[d][m];
      if (g === 0 || g === PositionArray.GC) break;
      ((c = d), (u = m));
    }
    for (;;) {
      let d = e,
        m = c,
        g = u;
      e === 0
        ? g < n
          ? ((d = 90), g++)
          : g > n && ((d = 270), g--)
        : e === 90
          ? m < s
            ? ((d = 0), m++)
            : m > s && ((d = 180), m--)
          : e === 180
            ? g < n
              ? ((d = 90), g++)
              : g > n && ((d = 270), g--)
            : m < s
              ? ((d = 0), m++)
              : m > s && ((d = 180), m--);
      const p = f[m][g];
      if (d !== e && p !== 0 && p !== PositionArray.GC) {
        if ((o.push(c), o.push(u), this.NF(c, u, d, s, n, o))) return true;
        (o.pop(), o.pop());
      }
      if (((f[c][u] = PositionArray.GC), e === 0)) {
        if (c === t) return false;
        c--;
      } else if (e === 90) {
        if (u === i) return false;
        u--;
      } else if (e === 180) {
        if (c === t) return false;
        c++;
      } else {
        if (u === i) return false;
        u++;
      }
    }
  }
}
