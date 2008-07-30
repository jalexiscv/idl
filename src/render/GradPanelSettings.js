class GradPanelSettings {
  Op;
  Ep;
  Vp;
  Bp;
  Es;
  ss;
  ys;
  Ee;
  constructor() {
    ((this.Op = 0),
      (this.Ep = 100),
      (this.Vp = 10),
      (this.Bp = 0),
      (this.Es = null),
      (this.ss = null),
      (this.ys = null),
      (this.Ee = null));
  }
  copy() {
    const t = new GradPanelSettings();
    return (
      (t.Op = this.Op),
      (t.Ep = this.Ep),
      (t.Vp = this.Vp),
      (t.Bp = this.Bp),
      (t.Es = this.Es),
      (t.ss = this.ss),
      (t.ys = this.ys),
      (t.Ee = this.Ee),
      t
    );
  }
}
