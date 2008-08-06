class ShapeTemplateSettings {
  wi;
  qp;
  Hp;
  vp;
  Rh;
  Jp;
  $p;
  _n;
  to;
  constructor() {
    ((this.wi = false),
      (this.qp = "butt"),
      (this.Hp = "miter"),
      (this.vp = 10),
      (this.Rh = 0),
      (this.Jp = null),
      (this.$p = 1),
      (this._n = Spot.Default),
      (this.to = Spot.Default));
  }
  copy() {
    const t = new ShapeTemplateSettings();
    return (
      (t.qp = this.qp),
      (t.Hp = this.Hp),
      (t.vp = this.vp),
      (t.Rh = this.Rh),
      (t.Jp = this.Jp),
      (t.$p = this.$p),
      (t._n = this._n.T()),
      (t.to = this.to.T()),
      t
    );
  }
}
var Wrap = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Fit = 1)] = "Fit"),
    (w[(w.DesiredSize = 2)] = "DesiredSize"),
    (w[(w.BreakAll = 3)] = "BreakAll"),
    w
  ))(Wrap || {}),
  TextOverflow = ((w) => ((w[(w.Clip = 0)] = "Clip"), (w[(w.Ellipsis = 1)] = "Ellipsis"), w))(TextOverflow || {}),
  TextFormat = ((w) => ((w[(w.Trim = 0)] = "Trim"), (w[(w.None = 1)] = "None"), w))(TextFormat || {});
