class ForceDirectedVertex extends LayoutVertex {
  vS;
  WS;
  jS;
  JS;
  $S;
  hierarchicalVertexes;
  idInCluster;
  constructor(t) {
    (super(t),
      (this.vS = false),
      (this.WS = NaN),
      (this.jS = NaN),
      (this.JS = 0),
      (this.$S = 0),
      (this.hierarchicalVertexes = new List()),
      (this.idInCluster = -1));
  }
  get isFixed() {
    return this.vS;
  }
  set isFixed(t) {
    this.vS !== t && (U.i(t, "boolean", ForceDirectedVertex, "isFixed"), (this.vS = t));
  }
  get charge() {
    return this.WS;
  }
  set charge(t) {
    this.WS !== t && (U.i(t, "number", ForceDirectedVertex, "charge"), (this.WS = t));
  }
  get mass() {
    return this.jS;
  }
  set mass(t) {
    this.jS !== t && (U.i(t, "number", ForceDirectedVertex, "mass"), (this.jS = t));
  }
  get forceX() {
    return this.JS;
  }
  set forceX(t) {
    this.JS !== t && (U.i(t, "number", ForceDirectedVertex, "forceX"), (this.JS = t));
  }
  get forceY() {
    return this.$S;
  }
  set forceY(t) {
    this.$S !== t && (U.i(t, "number", ForceDirectedVertex, "forceY"), (this.$S = t));
  }
}
