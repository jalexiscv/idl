class LinkInfo {
  ns;
  vt;
  ge;
  TS;
  ug;
  Jc;
  rf;
  MS;
  constructor(t, i, e) {
    this.ns = t;
    this.vt = i;
    this.ge = e;
    this.TS = new Point();
    this.ug = 0;
    this.Jc = 0;
    this.rf = new Point();
    this.MS = 0;
  }
  toString() {
    return (
      this.ns.toString() +
      " " +
      this.vt.toString() +
      " " +
      this.ge.toString() +
      ":" +
      this.ug.toString() +
      "/" +
      this.Jc.toString() +
      " " +
      this.rf.toString() +
      " " +
      this.MS.toString() +
      " " +
      this.TS.toString()
    );
  }
}
