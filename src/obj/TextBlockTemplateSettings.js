class TextBlockTemplateSettings {
  wi;
  ws;
  wo;
  gy;
  my;
  ty;
  hy;
  fy;
  Qp;
  ly;
  ey;
  vl;
  gl;
  _p;
  cy;
  uy;
  constructor() {
    ((this.wi = false),
      (this.ws = null),
      (this.wo = 0),
      (this.gy = 0),
      (this.my = 1 / 0),
      (this.ty = 0),
      (this.hy = 0),
      (this.fy = 0),
      (this.Qp = "start"),
      (this.ly = null),
      (this.ey = null),
      (this.vl = null),
      (this.gl = Spot.Top),
      (this._p = 2),
      (this.cy = "0px"),
      (this.uy = "0px"));
  }
  copy() {
    const t = new TextBlockTemplateSettings();
    return (
      (t.ws = this.ws),
      (t.wo = this.wo),
      (t.gy = this.gy),
      (t.my = this.my),
      (t.ty = this.ty),
      (t.hy = this.hy),
      (t.fy = this.fy),
      (t.Qp = this.Qp),
      (t.ly = this.ly),
      (t.ey = this.ey),
      (t.vl = this.vl),
      (t.gl = this.gl),
      (t._p = this._p),
      (t.cy = this.cy),
      (t.uy = this.uy),
      t
    );
  }
}
