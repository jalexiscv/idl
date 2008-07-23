class Transform {
  m11;
  m12;
  m21;
  m22;
  dx;
  dy;
  constructor() {
    ((this.m11 = 1), (this.m12 = 0), (this.m21 = 0), (this.m22 = 1), (this.dx = 0), (this.dy = 0));
  }
  set(t) {
    return (
      (this.m11 = t.m11),
      (this.m12 = t.m12),
      (this.m21 = t.m21),
      (this.m22 = t.m22),
      (this.dx = t.dx),
      (this.dy = t.dy),
      this
    );
  }
  setTo(t, i, e, s, n, o) {
    return ((this.m11 = t), (this.m12 = i), (this.m21 = e), (this.m22 = s), (this.dx = n), (this.dy = o), this);
  }
  copy() {
    const t = new Transform();
    return (
      (t.m11 = this.m11),
      (t.m12 = this.m12),
      (t.m21 = this.m21),
      (t.m22 = this.m22),
      (t.dx = this.dx),
      (t.dy = this.dy),
      t
    );
  }
  toString() {
    return (
      "Transform(" + this.m11 + "," + this.m12 + "," + this.m21 + "," + this.m22 + "," + this.dx + "," + this.dy + ")"
    );
  }
  equals(t) {
    return (
      this.m11 === t.m11 &&
      this.m12 === t.m12 &&
      this.m21 === t.m21 &&
      this.m22 === t.m22 &&
      this.dx === t.dx &&
      this.dy === t.dy
    );
  }
  Vk() {
    return this.dx === 0 && this.dy === 0 && this.m11 === 1 && this.m12 === 0 && this.m21 === 0 && this.m22 === 1;
  }
  Ki() {
    return ((this.m11 = 1), (this.m12 = 0), (this.m21 = 0), (this.m22 = 1), (this.dx = 0), (this.dy = 0), this);
  }
  Cf(t) {
    const i = this.m11 * t.m11 + this.m21 * t.m12,
      e = this.m12 * t.m11 + this.m22 * t.m12,
      s = this.m11 * t.m21 + this.m21 * t.m22,
      n = this.m12 * t.m21 + this.m22 * t.m22;
    return (
      (this.dx = this.m11 * t.dx + this.m21 * t.dy + this.dx),
      (this.dy = this.m12 * t.dx + this.m22 * t.dy + this.dy),
      (this.m11 = i),
      (this.m12 = e),
      (this.m21 = s),
      (this.m22 = n),
      this
    );
  }
  HA(t) {
    const i = 1 / (t.m11 * t.m22 - t.m12 * t.m21),
      e = t.m22 * i,
      s = -t.m12 * i,
      n = -t.m21 * i,
      o = t.m11 * i,
      r = i * (t.m21 * t.dy - t.m22 * t.dx),
      l = i * (t.m12 * t.dx - t.m11 * t.dy),
      h = this.m11 * e + this.m21 * s,
      a = this.m12 * e + this.m22 * s,
      f = this.m11 * n + this.m21 * o,
      c = this.m12 * n + this.m22 * o;
    return (
      (this.dx = this.m11 * r + this.m21 * l + this.dx),
      (this.dy = this.m12 * r + this.m22 * l + this.dy),
      (this.m11 = h),
      (this.m12 = a),
      (this.m21 = f),
      (this.m22 = c),
      this
    );
  }
  lx() {
    const t = 1 / (this.m11 * this.m22 - this.m12 * this.m21),
      i = this.m22 * t,
      e = -this.m12 * t,
      s = -this.m21 * t,
      n = this.m11 * t,
      o = t * (this.m21 * this.dy - this.m22 * this.dx),
      r = t * (this.m12 * this.dx - this.m11 * this.dy);
    return ((this.m11 = i), (this.m12 = e), (this.m21 = s), (this.m22 = n), (this.dx = o), (this.dy = r), this);
  }
  Ns(t, i, e) {
    if (((t = G.Yi(t)), t === 0)) return this;
    this.vs(i, e);
    let s = 0,
      n = 0;
    if (t === 90) ((s = 0), (n = 1));
    else if (t === 180) ((s = -1), (n = 0));
    else if (t === 270) ((s = 0), (n = -1));
    else {
      const a = (t * Math.PI) / 180;
      ((s = Math.cos(a)), (n = Math.sin(a)));
    }
    const o = this.m11 * s + this.m21 * n,
      r = this.m12 * s + this.m22 * n,
      l = this.m11 * -n + this.m21 * s,
      h = this.m12 * -n + this.m22 * s;
    return ((this.m11 = o), (this.m12 = r), (this.m21 = l), (this.m22 = h), this.vs(-i, -e), this);
  }
  vs(t, i) {
    return ((this.dx += this.m11 * t + this.m21 * i), (this.dy += this.m12 * t + this.m22 * i), this);
  }
  rt(t, i) {
    return (i === void 0 && (i = t), (this.m11 *= t), (this.m12 *= t), (this.m21 *= i), (this.m22 *= i), this);
  }
  QI() {
    if (this.m11 === 1 && this.m12 === 0) return 0;
    let t = (Math.atan2(this.m12, this.m11) * 180) / Math.PI;
    return (t < 0 && (t += 360), t);
  }
  St(t) {
    const i = t.x,
      e = t.y;
    return t.e(i * this.m11 + e * this.m21 + this.dx, i * this.m12 + e * this.m22 + this.dy);
  }
  De(t) {
    const i = 1 / (this.m11 * this.m22 - this.m12 * this.m21),
      e = this.m22 * i,
      s = -this.m12 * i,
      n = -this.m21 * i,
      o = this.m11 * i,
      r = t.x - this.dx,
      l = t.y - this.dy;
    return t.e(r * e + l * n, r * s + l * o);
  }
  Lu(t) {
    const i = 1 / (this.m11 * this.m22 - this.m12 * this.m21),
      e = this.m22 * i,
      s = -this.m12 * i,
      n = -this.m21 * i,
      o = this.m11 * i,
      r = i * (this.m21 * this.dy - this.m22 * this.dx),
      l = i * (this.m12 * this.dx - this.m11 * this.dy),
      h = t.x * 1.25,
      a = t.y * 1.2;
    return t.e(h * e + a * n + r, h * s + a * o + l);
  }
  lm(t) {
    const i = t.x,
      e = t.y,
      s = i + t.width,
      n = e + t.height,
      o = this.m11,
      r = this.m12,
      l = this.m21,
      h = this.m22,
      a = this.dx,
      f = this.dy,
      c = i * o + e * l + a,
      u = i * r + e * h + f,
      d = s * o + e * l + a,
      m = s * r + e * h + f,
      g = i * o + n * l + a,
      p = i * r + n * h + f,
      y = s * o + n * l + a,
      x = s * r + n * h + f;
    let b = c,
      S = c,
      k = u,
      P = u;
    return (
      (b = Math.min(b, d)),
      (S = Math.max(S, d)),
      (k = Math.min(k, m)),
      (P = Math.max(P, m)),
      (b = Math.min(b, g)),
      (S = Math.max(S, g)),
      (k = Math.min(k, p)),
      (P = Math.max(P, p)),
      (b = Math.min(b, y)),
      (S = Math.max(S, y)),
      (k = Math.min(k, x)),
      (P = Math.max(P, x)),
      t.e(b, k, S - b, P - k),
      t
    );
  }
  static vA = [];
  static a() {
    const t = Transform.vA.pop();
    return t === void 0 ? new Transform() : t;
  }
  static o(t) {
    Transform.vA.push(t);
  }
}
const G = {
  Zn: 4 * ((Math.sqrt(2) - 1) / 3),
  WA: [],
  hx: (w) => {
    if (w <= 0) return 0;
    let t = G.WA;
    if (t === null) {
      t = [];
      for (let i = 0; i <= 2e3; i++) t[i] = Math.sqrt(i);
      G.WA = t;
    }
    if (w < 1) {
      const i = 1 / w;
      return i <= 2e3 ? 1 / t[i | 0] : Math.sqrt(w);
    } else return w <= 2e3 ? t[w | 0] : Math.sqrt(w);
  },
  u: (w, t) => {
    const i = w - t;
    return i < 0.5 && i > -0.5;
  },
  q: (w, t) => {
    const i = w - t;
    return i < 5e-8 && i > -5e-8;
  },
  Ui: (w, t, i, e, s, n, o) => {
    s <= 0 && (s = 1e-6);
    let r = 0,
      l = 0,
      h = 0,
      a = 0;
    if ((w < i ? ((l = w), (r = i)) : ((l = i), (r = w)), t < e ? ((a = t), (h = e)) : ((a = e), (h = t)), w === i))
      return a <= o && o <= h && w - s <= n && n <= w + s;
    if (t === e) return l <= n && n <= r && t - s <= o && o <= t + s;
    const f = r + s,
      c = l - s;
    if (c <= n && n <= f) {
      const u = h + s,
        d = a - s;
      if (d <= o && o <= u)
        if (f - c > u - d)
          if (w - i > s || i - w > s) {
            const g = ((e - t) / (i - w)) * (n - w) + t;
            if (g - s <= o && o <= g + s) return true;
          } else return true;
        else if (t - e > s || e - t > s) {
          const g = ((i - w) / (e - t)) * (o - t) + w;
          if (g - s <= n && n <= g + s) return true;
        } else return true;
    }
    return false;
  },
  fx: (w, t, i, e, s, n, o, r, l, h, a, f) => {
    if (!G.Ui(w, t, o, r, f, i, e) || !G.Ui(w, t, o, r, f, s, n)) {
      const c = (w + i) / 2,
        u = (t + e) / 2,
        d = (i + s) / 2,
        m = (e + n) / 2,
        g = (s + o) / 2,
        p = (n + r) / 2,
        y = (c + d) / 2,
        x = (u + m) / 2,
        b = (d + g) / 2,
        S = (m + p) / 2,
        k = (y + b) / 2,
        P = (x + S) / 2;
      return G.fx(w, t, c, u, y, x, k, P, l, h, a, f) || G.fx(k, P, b, S, g, p, o, r, l, h, a, f);
    } else return G.Ui(w, t, o, r, f, h, a);
  },
  jA: (w, t, i, e, s, n, o, r, l) => {
    const h = (w + i) / 2,
      a = (t + e) / 2,
      f = (i + s) / 2,
      c = (e + n) / 2,
      u = (s + o) / 2,
      d = (n + r) / 2,
      m = (h + f) / 2,
      g = (a + c) / 2,
      p = (f + u) / 2,
      y = (c + d) / 2;
    return (l.e((m + p) / 2, (g + y) / 2), l);
  },
  tR: (w, t, i, e, s, n, o, r) => {
    const l = (w + i) / 2,
      h = (t + e) / 2,
      a = (i + s) / 2,
      f = (e + n) / 2,
      c = (s + o) / 2,
      u = (n + r) / 2,
      d = (l + a) / 2,
      m = (h + f) / 2,
      g = (a + c) / 2,
      p = (f + u) / 2;
    return Point.direction(d, m, g, p);
  },
  Du: (w, t, i, e, s, n, o, r, l, h) => {
    if (!G.Ui(w, t, o, r, l, i, e) || !G.Ui(w, t, o, r, l, s, n)) {
      const a = (w + i) / 2,
        f = (t + e) / 2,
        c = (i + s) / 2,
        u = (e + n) / 2,
        d = (s + o) / 2,
        m = (n + r) / 2,
        g = (a + c) / 2,
        p = (f + u) / 2,
        y = (c + d) / 2,
        x = (u + m) / 2,
        b = (g + y) / 2,
        S = (p + x) / 2;
      (G.Du(w, t, a, f, g, p, b, S, l, h), G.Du(b, S, y, x, d, m, o, r, l, h));
    } else (h.ai(w, t, 0, 0), h.ai(o, r, 0, 0));
    return h;
  },
  Qn: (w, t, i, e, s, n, o, r, l, h) => {
    if (!G.Ui(w, t, o, r, l, i, e) || !G.Ui(w, t, o, r, l, s, n)) {
      const a = (w + i) / 2,
        f = (t + e) / 2,
        c = (i + s) / 2,
        u = (e + n) / 2,
        d = (s + o) / 2,
        m = (n + r) / 2,
        g = (a + c) / 2,
        p = (f + u) / 2,
        y = (c + d) / 2,
        x = (u + m) / 2,
        b = (g + y) / 2,
        S = (p + x) / 2;
      (G.Qn(w, t, a, f, g, p, b, S, l, h), G.Qn(b, S, y, x, d, m, o, r, l, h));
    } else (h.length === 0 && (h.push(w), h.push(t)), h.push(o), h.push(r));
    return h;
  },
  zk: (w, t, i, e, s, n, o, r, l, h) => {
    if (G.Ui(w, t, s, n, h, i, e)) return G.Ui(w, t, s, n, h, r, l);
    {
      const a = (w + i) / 2,
        f = (t + e) / 2,
        c = (i + s) / 2,
        u = (e + n) / 2,
        d = (a + c) / 2,
        m = (f + u) / 2;
      return G.zk(w, t, a, f, d, m, o, r, l, h) || G.zk(d, m, c, u, s, n, o, r, l, h);
    }
  },
  Xk: (w, t, i, e, s, n, o, r) => {
    if (G.Ui(w, t, s, n, o, i, e)) (r.ai(w, t, 0, 0), r.ai(s, n, 0, 0));
    else {
      const l = (w + i) / 2,
        h = (t + e) / 2,
        a = (i + s) / 2,
        f = (e + n) / 2,
        c = (l + a) / 2,
        u = (h + f) / 2;
      (G.Xk(w, t, l, h, c, u, o, r), G.Xk(c, u, a, f, s, n, o, r));
    }
    return r;
  },
  hm: (w, t, i, e, s, n, o, r) => {
    if (G.Ui(w, t, s, n, o, i, e)) (r.length === 0 && (r.push(w), r.push(t)), r.push(s), r.push(n));
    else {
      const l = (w + i) / 2,
        h = (t + e) / 2,
        a = (i + s) / 2,
        f = (e + n) / 2,
        c = (l + a) / 2,
        u = (h + f) / 2;
      (G.hm(w, t, l, h, c, u, o, r), G.hm(c, u, a, f, s, n, o, r));
    }
    return r;
  },
  am: (w, t, i, e, s, n, o, r, l, h, a, f, c, u) => {
    if (!G.Ui(w, t, o, r, c, i, e) || !G.Ui(w, t, o, r, c, s, n)) {
      const d = (w + i) / 2,
        m = (t + e) / 2,
        g = (i + s) / 2,
        p = (e + n) / 2,
        y = (s + o) / 2,
        x = (n + r) / 2,
        b = (d + g) / 2,
        S = (m + p) / 2,
        k = (g + y) / 2,
        P = (p + x) / 2,
        A = (b + k) / 2,
        C = (S + P) / 2;
      let M = 1 / 0,
        N = false,
        T = 0,
        L = 0;
      if (G.am(w, t, d, m, b, S, A, C, l, h, a, f, c, u)) {
        const D = (u.x - l) ** 2 + (u.y - h) ** 2;
        D < M && ((M = D), (N = true), (T = u.x), (L = u.y));
      }
      if (G.am(A, C, k, P, y, x, o, r, l, h, a, f, c, u)) {
        const D = (u.x - l) ** 2 + (u.y - h) ** 2;
        D < M && ((M = D), (N = true), (T = u.x), (L = u.y));
      }
      return (N && ((u.x = T), (u.y = L)), N);
    } else {
      if (!G.Au(w, t, o, r, l, h, a, f)) return false;
      const d = (w - o) * (h - f) - (t - r) * (l - a);
      if (d === 0) return false;
      const m = ((w * r - t * o) * (l - a) - (w - o) * (l * f - h * a)) / d,
        g = ((w * r - t * o) * (h - f) - (t - r) * (l * f - h * a)) / d;
      return (u.e(m, g), true);
    }
  },
  fm: (w, t, i, e, s, n, o, r, l, h, a, f, c) => {
    let u = 0;
    if (!G.Ui(w, t, o, r, c, i, e) || !G.Ui(w, t, o, r, c, s, n)) {
      const d = (w + i) / 2,
        m = (t + e) / 2,
        g = (i + s) / 2,
        p = (e + n) / 2,
        y = (s + o) / 2,
        x = (n + r) / 2,
        b = (d + g) / 2,
        S = (m + p) / 2,
        k = (g + y) / 2,
        P = (p + x) / 2,
        A = (b + k) / 2,
        C = (S + P) / 2;
      ((u += G.fm(w, t, d, m, b, S, A, C, l, h, a, f, c)), (u += G.fm(A, C, k, P, y, x, o, r, l, h, a, f, c)));
    } else {
      const d = (w - o) * (h - f) - (t - r) * (l - a);
      if (d === 0) return u;
      const m = ((w * r - t * o) * (l - a) - (w - o) * (l * f - h * a)) / d,
        g = ((w * r - t * o) * (h - f) - (t - r) * (l * f - h * a)) / d;
      if (m >= a) return u;
      let p = 0,
        y = 0;
      if ((l > a ? l - a : a - l) < (h > f ? h - f : f - h)) {
        if ((t < r ? ((p = t), (y = r)) : ((p = r), (y = t)), g < p || g > y)) return u;
      } else if ((w < o ? ((p = w), (y = o)) : ((p = o), (y = w)), m < p || m > y)) return u;
      d > 0 ? u++ : d < 0 && u--;
    }
    return u;
  },
  Fl: (w, t, i, e, s, n, o) => {
    if (G.q(w, i)) {
      let r = 0,
        l = 0;
      t < e ? ((r = t), (l = e)) : ((r = e), (l = t));
      const h = n;
      return h < r ? (o.e(w, r), false) : h > l ? (o.e(w, l), false) : (o.e(w, h), true);
    } else if (G.q(t, e)) {
      let r = 0,
        l = 0;
      w < i ? ((r = w), (l = i)) : ((r = i), (l = w));
      const h = s;
      return h < r ? (o.e(r, t), false) : h > l ? (o.e(l, t), false) : (o.e(h, t), true);
    } else {
      const r = (i - w) ** 2 + (e - t) ** 2,
        l = ((w - s) * (w - i) + (t - n) * (t - e)) / r;
      if (l < -5e-6) return (o.e(w, t), false);
      if (l > 1.000005) return (o.e(i, e), false);
      {
        const h = w + l * (i - w),
          a = t + l * (e - t);
        return (o.e(h, a), true);
      }
    }
  },
  Eo: (w, t, i, e, s, n, o, r, l) => {
    if (G.u(w, i) && G.u(t, e)) return (l.e(w, t), false);
    if (G.q(s, o)) {
      if (G.q(w, i)) return (G.Fl(w, t, i, e, s, n, l), false);
      {
        const a = ((e - t) / (i - w)) * (s - w) + t;
        return G.Fl(w, t, i, e, s, a, l);
      }
    } else {
      const h = (r - n) / (o - s);
      if (G.q(w, i)) {
        const a = h * (w - s) + n;
        let f = 0,
          c = 0;
        return (
          t < e ? ((f = t), (c = e)) : ((f = e), (c = t)),
          a < f ? (l.e(w, f), false) : a > c ? (l.e(w, c), false) : (l.e(w, a), true)
        );
      } else {
        const a = (e - t) / (i - w);
        if (G.q(h, a)) return (G.Fl(w, t, i, e, s, n, l), false);
        {
          const f = (a * w - h * s + n - t) / (a - h);
          if (G.q(a, 0)) {
            let c = 0,
              u = 0;
            return (
              w < i ? ((c = w), (u = i)) : ((c = i), (u = w)),
              f < c ? (l.e(c, t), false) : f > u ? (l.e(u, t), false) : (l.e(f, t), true)
            );
          } else {
            const c = a * (f - w) + t;
            return G.Fl(w, t, i, e, f, c, l);
          }
        }
      }
    }
  },
  Il: (w, t, i, e, s, n, o, r, l) => {
    let h = 1e21,
      a = w,
      f = t;
    if (G.Eo(w, t, w, e, s, n, o, r, l)) {
      const c = (l.x - s) ** 2 + (l.y - n) ** 2;
      c < h && ((h = c), (a = l.x), (f = l.y));
    }
    if (G.Eo(i, t, i, e, s, n, o, r, l)) {
      const c = (l.x - s) ** 2 + (l.y - n) ** 2;
      c < h && ((h = c), (a = l.x), (f = l.y));
    }
    if (G.Eo(w, t, i, t, s, n, o, r, l)) {
      const c = (l.x - s) ** 2 + (l.y - n) ** 2;
      c < h && ((h = c), (a = l.x), (f = l.y));
    }
    if (G.Eo(w, e, i, e, s, n, o, r, l)) {
      const c = (l.x - s) ** 2 + (l.y - n) ** 2;
      c < h && ((h = c), (a = l.x), (f = l.y));
    }
    return (l.e(a, f), h < 1e21);
  },
  cx: (w, t, i) => G.GA(w.x, w.y, w.width, w.height, t.x, t.y, i.x, i.y),
  GA: (w, t, i, e, s, n, o, r) => {
    const l = w,
      h = w + i,
      a = t,
      f = t + e;
    if (s === o) {
      let c = 0,
        u = 0;
      return (n < r ? ((c = n), (u = r)) : ((c = r), (u = n)), l <= s && s <= h && c <= f && u >= a);
    }
    if (n === r) {
      let c = 0,
        u = 0;
      return (s < o ? ((c = s), (u = o)) : ((c = o), (u = s)), a <= n && n <= f && c <= h && u >= l);
    }
    return !!(
      Rect.contains(w, t, i, e, s, n) ||
      Rect.contains(w, t, i, e, o, r) ||
      G.Au(l, a, h, a, s, n, o, r) ||
      G.Au(h, a, h, f, s, n, o, r) ||
      G.Au(h, f, l, f, s, n, o, r) ||
      G.Au(l, f, l, a, s, n, o, r)
    );
  },
  Au: (w, t, i, e, s, n, o, r) =>
    w === i && t === e && s === o && n === r
      ? w === s && t === n
      : G.Cu(w, t, i, e, s, n) * G.Cu(w, t, i, e, o, r) <= 0 && G.Cu(s, n, o, r, w, t) * G.Cu(s, n, o, r, i, e) <= 0,
  Cu: (w, t, i, e, s, n) => {
    const o = i - w,
      r = e - t;
    let l = s - w,
      h = n - t,
      a = l * r - h * o;
    return (a === 0 && ((a = l * o + h * r), a > 0 && ((l -= o), (h -= r), (a = l * o + h * r), a < 0 && (a = 0))), a);
  },
  tx(w, t, i, e) {
    e === void 0 && (e = false);
    let s = 0;
    const n = w === null ? t : (t - w.x) / (w.width > 0 ? w.width : 1),
      o = w === null ? i : (i - w.y) / (w.height > 0 ? w.height : 1);
    return (
      n > o
        ? n > 1 - o || (e || n < 1 - o ? (s = 270) : (s = 315))
        : e || n < o
          ? n > 1 - o
            ? (s = 90)
            : e || n < 1 - o
              ? (s = 180)
              : (s = 135)
          : n < 0.5
            ? (s = 225)
            : n > 0.5 && (s = 45),
      s
    );
  },
  Yi: (w) => (w >= 360 ? (w -= 360) : w < 0 && (w += 360), w),
  iR: (w, t) => (w > t ? Math.min(w - t, Math.abs(w - 360 - t)) : t > w ? Math.min(t - w, Math.abs(w - (t - 360))) : 0),
  JA: (w, t, i, e, s, n) => {
    const o = Math.PI;
    n || ((e = e * (o / 180)), (s = s * (o / 180)));
    const r = e > s ? -1 : 1,
      l = 1e-5,
      h = o * 2,
      a = [],
      f = o / 2;
    let c = e,
      u = Math.min(h, Math.abs(s - e));
    if (u < l) {
      const d = c + r * Math.min(u, f),
        m = w + i * Math.cos(c),
        g = t + i * Math.sin(c),
        p = w + i * Math.cos(d),
        y = t + i * Math.sin(d),
        x = (m + p) / 2,
        b = (g + y) / 2;
      return (a.push([m, g, x, b, x, b, p, y]), a);
    }
    for (; u > l; ) {
      const d = c + r * Math.min(u, f);
      (a.push(G.eR(i, c, d, w, t)), (u -= Math.abs(d - c)), (c = d));
    }
    return a;
  },
  eR: (w, t, i, e, s) => {
    const n = (i - t) / 2,
      o = w * Math.cos(n),
      r = w * Math.sin(n),
      l = o,
      h = -r,
      a = l * l + h * h,
      f = a + l * o + h * r,
      c = ((4 / 3) * (Math.sqrt(2 * a * f) - f)) / (l * r - h * o),
      u = l - c * h,
      d = h + c * l,
      m = u,
      g = -d,
      p = n + t,
      y = Math.cos(p),
      x = Math.sin(p);
    return [
      e + w * Math.cos(t),
      s + w * Math.sin(t),
      e + u * y - d * x,
      s + u * x + d * y,
      e + m * y - g * x,
      s + m * x + g * y,
      e + w * Math.cos(i),
      s + w * Math.sin(i),
    ];
  },
  nm: (w, t, i, e, s, n, o) => {
    const r = s,
      l = n,
      h = Math.floor((w - i) / r) * r + i,
      a = Math.floor((t - e) / l) * l + e;
    let f = h;
    h + r - w < r / 2 && (f = h + r);
    let c = a;
    return (a + l - t < l / 2 && (c = a + l), o.e(f, c), o);
  },
  $A: (w, t) => {
    let i = Math.max(w, t),
      e = Math.min(w, t),
      s = 1,
      n = 1;
    do ((s = i % e), (n = e), (i = e), (e = s));
    while (s > 0);
    return n;
  },
  sR: (w, t, i, e) => {
    const s = i < 0,
      n = e < 0;
    let o = 0,
      r = 0,
      l = 0;
    w < t ? ((r = 1), (l = 0)) : ((r = 0), (l = 1));
    let h = 0,
      a = 0,
      f = 0,
      c = 0;
    return (
      (o = r),
      (h = o === 0 ? w : t),
      (f = o === 0 ? i : e),
      (o === 0 ? s : n) && (f = -f),
      (o = l),
      (a = o === 0 ? w : t),
      (c = o === 0 ? i : e),
      (o === 0 ? s : n) && (c = -c),
      G.nR(h, a, f, c, 0, 0)
    );
  },
  nR: (w, t, i, e, s, n) => {
    let o = 0;
    if (e > 0)
      if (i > 0) {
        const r = w * w,
          l = t * t,
          h = w * i,
          a = t * e;
        let f = -l + a,
          c = -l + Math.sqrt(h * h + a * a),
          u = f;
        const d = 9999999999;
        for (let p = 0; p < d && ((u = 0.5 * (f + c)), !(u === f || u === c)); ++p) {
          const y = h / (u + r),
            x = a / (u + l),
            b = y * y + x * x - 1;
          if (b > 0) f = u;
          else if (b < 0) c = u;
          else break;
        }
        ((s = (r * i) / (u + r)), (n = (l * e) / (u + l)));
        const m = s - i,
          g = n - e;
        o = Math.sqrt(m * m + g * g);
      } else ((s = 0), (n = t), (o = Math.abs(e - t)));
    else {
      const r = w * w - t * t,
        l = w * i;
      if (l < r) {
        const h = l / r,
          a = h * h;
        ((s = w * h), (n = t * Math.sqrt(Math.abs(1 - a))));
        const f = s - i;
        o = Math.sqrt(f * f + n * n);
      } else ((s = w), (n = 0), (o = Math.abs(i - w)));
    }
    return o;
  },
  bn: {},
  cm: new PropertyCollection(),
  Sr: new PropertyCollection(),
  kr: 0,
  um: 100,
};
var GeometryType = ((w) => (
    (w[(w.Line = 1)] = "Line"),
    (w[(w.Rectangle = 2)] = "Rectangle"),
    (w[(w.Ellipse = 3)] = "Ellipse"),
    (w[(w.Path = 4)] = "Path"),
    w
  ))(GeometryType || {}),
  GeometryStretch = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Default = 1)] = "Default"),
    (w[(w.Fill = 2)] = "Fill"),
    (w[(w.Uniform = 6)] = "Uniform"),
    w
  ))(GeometryStretch || {});
