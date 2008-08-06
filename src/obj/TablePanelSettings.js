class TablePanelSettings {
  Xe;
  Ye;
  Xp;
  Yp;
  Kp;
  Up;
  Ap;
  Lp;
  Tp;
  Dp;
  Ip;
  Fp;
  Rp;
  Oh;
  constructor() {
    ((this.Xe = []),
      (this.Ye = []),
      (this.Xp = 3),
      (this.Yp = 3),
      (this.Kp = 0),
      (this.Up = 0),
      (this.Ap = Margin.rm),
      (this.Lp = 1),
      (this.Tp = null),
      (this.Dp = null),
      (this.Ip = 1),
      (this.Fp = null),
      (this.Rp = null),
      (this.Oh = null));
  }
  copy(t) {
    const i = new TablePanelSettings(),
      e = this.Xe,
      s = e.length,
      n = i.Xe;
    for (let h = 0; h < s; h++) {
      const a = e[h];
      if (a === void 0) continue;
      const f = a.copy();
      (f.Ua(t), (n[h] = f));
    }
    const o = this.Ye,
      r = o.length,
      l = i.Ye;
    for (let h = 0; h < r; h++) {
      const a = o[h];
      if (a === void 0) continue;
      const f = a.copy();
      (f.Ua(t), (l[h] = f));
    }
    return (
      (i.Xp = this.Xp),
      (i.Yp = this.Yp),
      (i.Kp = this.Kp),
      (i.Up = this.Up),
      (i.Ap = this.Ap.T()),
      (i.Lp = this.Lp),
      (i.Tp = this.Tp),
      (i.Dp = this.Dp),
      (i.Ip = this.Ip),
      (i.Fp = this.Fp),
      (i.Rp = this.Rp),
      (i.Oh = this.Oh),
      i
    );
  }
}
var Sizing = ((w) => (
  (w[(w.Default = 1)] = "Default"),
  (w[(w.None = 2)] = "None"),
  (w[(w.ProportionalExtra = 3)] = "ProportionalExtra"),
  w
))(Sizing || {});
