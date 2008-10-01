class ForceDirectedEdge extends LayoutEdge {
  ZS;
  QS;
  constructor(t) {
    (super(t), (this.ZS = NaN), (this.QS = NaN));
  }
  get stiffness() {
    return this.ZS;
  }
  set stiffness(t) {
    this.ZS !== t && (U.i(t, "number", ForceDirectedEdge, "stiffness"), (this.ZS = t));
  }
  get length() {
    return this.QS;
  }
  set length(t) {
    this.QS !== t && (U.i(t, "number", ForceDirectedEdge, "length"), (this.QS = t));
  }
}
