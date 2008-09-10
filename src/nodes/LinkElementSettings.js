class LinkElementSettings {
  ip;
  ep;
  sp;
  tp;
  Wp;
  jp;
  constructor() {
    this.ip = -1 / 0;
    this.ep = 0;
    this.sp = Point.wn;
    this.tp = 0;
    this.Wp = "None";
    this.jp = "None";
  }
  copy() {
    const t = new LinkElementSettings();
    t.ip = this.ip;
    t.ep = this.ep;
    t.sp = this.sp.T();
    t.tp = this.tp;
    t.Wp = this.Wp;
    t.jp = this.jp;
    return t;
  }
}
