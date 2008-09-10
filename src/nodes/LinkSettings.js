class LinkSettings {
  Ea;
  Va;
  Ba;
  za;
  Xa;
  Ya;
  fp;
  hp;
  cp;
  ap;
  constructor() {
    this.Ea = Spot.Default;
    this.Va = Spot.Default;
    this.Ba = NaN;
    this.za = NaN;
    this.Xa = NaN;
    this.Ya = NaN;
    this.fp = null;
    this.hp = null;
    this.cp = 1 / 0;
    this.ap = 1 / 0;
  }
  copy() {
    const t = new LinkSettings();
    t.Ea = this.Ea.T();
    t.Va = this.Va.T();
    t.Ba = this.Ba;
    t.za = this.za;
    t.Xa = this.Xa;
    t.Ya = this.Ya;
    t.fp = this.fp;
    t.hp = this.hp;
    t.cp = this.cp;
    t.ap = this.ap;
    return t;
  }
}
