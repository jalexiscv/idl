class STransform {
  m;
  constructor() {
    this.m = [1, 0, 0, 1, 0, 0];
  }
  copy() {
    const t = new STransform();
    return (
      (t.m[0] = this.m[0]),
      (t.m[1] = this.m[1]),
      (t.m[2] = this.m[2]),
      (t.m[3] = this.m[3]),
      (t.m[4] = this.m[4]),
      (t.m[5] = this.m[5]),
      t
    );
  }
  translate(t, i) {
    ((this.m[4] += this.m[0] * t + this.m[2] * i), (this.m[5] += this.m[1] * t + this.m[3] * i));
  }
  scale(t, i) {
    ((this.m[0] *= t), (this.m[1] *= t), (this.m[2] *= i), (this.m[3] *= i));
  }
  rotate(t, i, e) {
    if (((t = G.Yi(t)), t === 0)) return;
    this.translate(i, e);
    let s = 0,
      n = 0;
    if (t === 90) ((s = 0), (n = 1));
    else if (t === 180) ((s = -1), (n = 0));
    else if (t === 270) ((s = 0), (n = -1));
    else {
      const a = (t * Math.PI) / 180;
      ((s = Math.cos(a)), (n = Math.sin(a)));
    }
    const o = this.m[0] * s + this.m[2] * n,
      r = this.m[1] * s + this.m[3] * n,
      l = this.m[0] * -n + this.m[2] * s,
      h = this.m[1] * -n + this.m[3] * s;
    ((this.m[0] = o), (this.m[1] = r), (this.m[2] = l), (this.m[3] = h), this.translate(-i, -e));
  }
}
