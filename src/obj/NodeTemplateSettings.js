class NodeTemplateSettings {
  wi;
  Hy;
  vy;
  Ul;
  Wy;
  qy;
  Gy;
  jy;
  Jy;
  xh;
  $y;
  constructor() {
    ((this.wi = false),
      (this.Hy = null),
      (this.vy = null),
      (this.Ul = null),
      (this.Wy = null),
      (this.qy = Margin.qA),
      (this.Gy = 1),
      (this.jy = null),
      (this.Jy = null),
      (this.xh = null),
      (this.$y = null));
  }
  copy() {
    const t = new NodeTemplateSettings();
    return (
      (t.Hy = this.Hy),
      (t.vy = this.vy),
      (t.Ul = this.Ul),
      (t.Wy = this.Wy),
      (t.qy = this.qy.T()),
      (t.Gy = this.Gy),
      (t.jy = this.jy),
      (t.Jy = this.Jy),
      (t.xh = this.xh),
      (t.$y = this.$y),
      t
    );
  }
}
var LinkAdjusting = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.End = 17)] = "End"),
    (w[(w.Scale = 18)] = "Scale"),
    (w[(w.Stretch = 19)] = "Stretch"),
    w
  ))(LinkAdjusting || {}),
  Routing = ((w) => (
    (w[(w.Normal = 1)] = "Normal"),
    (w[(w.Orthogonal = 2)] = "Orthogonal"),
    (w[(w.AvoidsNodes = 6)] = "AvoidsNodes"),
    (w[(w.AvoidsNodesStraight = 7)] = "AvoidsNodesStraight"),
    w
  ))(Routing || {}),
  Curve = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Bezier = 9)] = "Bezier"),
    (w[(w.JumpGap = 10)] = "JumpGap"),
    (w[(w.JumpOver = 11)] = "JumpOver"),
    w
  ))(Curve || {});
