class GridPanelSettings {
  Xd;
  Yd;
  gc;
  Cp;
  constructor() {
    ((this.Xd = Size.XA), (this.Yd = Point.wn), (this.gc = Size.Qw), (this.Cp = []));
  }
  copy() {
    const t = new GridPanelSettings();
    return ((t.Xd = this.Xd.copy()), (t.Yd = this.Yd.copy()), (t.gc = this.gc.copy()), (t.Cp = this.Cp), t);
  }
}
