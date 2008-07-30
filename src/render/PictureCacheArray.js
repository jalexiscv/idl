class PictureCacheArray {
  qt;
  constructor() {
    this.qt = null;
  }
  XD(t, i, e, s) {
    this.qt === null && (this.qt = []);
    const n = new CanvasSurface(null),
      o = n.ni,
      r = 1 / t;
    if (((n.width = i / t), (n.height = e / t), n.width === 0 || n.height === 0)) return;
    const l = new PictureCacheInstance(n.Nt, t);
    let h = s,
      a = 1;
    if (this.qt.length > 0) {
      const f = this.qt[this.qt.length - 1];
      ((h = f.ln), (a = f.Qd));
    }
    (o.setTransform(r * a, 0, 0, r * a, 0, 0), o.commitTransform(), o.drawImage(h, 0, 0), this.qt.push(l));
  }
}
