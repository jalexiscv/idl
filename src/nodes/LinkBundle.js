class LinkBundle {
  jo;
  Zs;
  Uy;
  kC;
  mS;
  PC;
  fn;
  constructor(t, i, e, s) {
    GSet._i(this);
    this.jo = false;
    this.Zs = false;
    this.Uy = t;
    this.kC = i;
    this.mS = e;
    this.PC = s;
    this.fn = [];
  }
  ig() {
    if (!this.jo) {
      const t = this.fn;
      if (t.length > 0) {
        const i = t[0].diagram;
        if (i !== null) {
          i.f2.add(this);
          this.Zs = i.undoManager.isUndoingRedoing;
        }
      }
    }
    this.jo = true;
  }
  A2() {
    if (!this.jo) return;
    this.jo = false;
    const t = this.fn;
    if (t.length > 0) {
      const i = t[0];
      const e = i.diagram;
      const s = e === null || (e.oa && !this.Zs);
      this.Zs = false;
      i.arrangeBundledLinks(t, s);
      if (t.length === 1) {
        i.lr = null;
        t.length = 0;
      }
    }
    if (t.length === 0) {
      this.Uy.ZD(this);
      this.mS.ZD(this);
    }
  }
}
