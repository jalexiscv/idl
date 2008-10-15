class Palette extends Diagram {
  constructor(t, i) {
    let e;
    return (
      t === void 0 || typeof t == "string" || (root.Element && t instanceof Element) ? (e = t) : U.it(t) && (i = t),
      super(e),
      this.UL(),
      i && this.setProperties(i),
      this
    );
  }
  UL() {
    ((this.allowDragOut = true),
      (this.allowMove = false),
      (this.isReadOnly = true),
      (this.contentAlignment = Spot.TopCenter),
      (this.layout = new GridLayout()));
  }
  setupRouters() {}
  reset() {
    (super.reset(), this.UL());
  }
}
