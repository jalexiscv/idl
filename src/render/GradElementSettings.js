class GradElementSettings {
  Bc;
  zc;
  Xc;
  ny;
  Yc;
  constructor() {
    ((this.Bc = 1), (this.zc = 0), (this.Xc = 1), (this.ny = null), (this.Yc = null));
  }
  copy() {
    const t = new GradElementSettings();
    return ((t.Bc = this.Bc), (t.zc = this.zc), (t.Xc = this.Xc), (t.ny = this.ny), (t.Yc = this.Yc), t);
  }
}
var ImageStretch = ((w) => (
  (w[(w.None = 0)] = "None"),
  (w[(w.Fill = 2)] = "Fill"),
  (w[(w.Uniform = 6)] = "Uniform"),
  (w[(w.UniformToFill = 7)] = "UniformToFill"),
  w
))(ImageStretch || {});
