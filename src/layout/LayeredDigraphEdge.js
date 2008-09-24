class LayeredDigraphEdge extends LayoutEdge {
  re;
  ak;
  fk;
  ck;
  uk;
  dk;
  gk;
  constructor(t) {
    (super(t),
      (this.re = false),
      (this.ak = false),
      (this.fk = false),
      (this.ck = NaN),
      (this.uk = NaN),
      (this.dk = 0),
      (this.gk = 0));
  }
  get fromVertex() {
    return this.rs;
  }
  set fromVertex(t) {
    this.rs !== t &&
      (Debug && t !== null && U.s(t, LayeredDigraphVertex, LayeredDigraphEdge, "fromVertex"), (this.rs = t));
  }
  get toVertex() {
    return this.ls;
  }
  set toVertex(t) {
    this.ls !== t &&
      (Debug && t !== null && U.s(t, LayeredDigraphVertex, LayeredDigraphEdge, "toVertex"), (this.ls = t));
  }
  get valid() {
    return this.re;
  }
  set valid(t) {
    this.re !== t && (U.i(t, "boolean", LayeredDigraphEdge, "valid"), (this.re = t));
  }
  get rev() {
    return this.ak;
  }
  set rev(t) {
    this.ak !== t && (U.i(t, "boolean", LayeredDigraphEdge, "rev"), (this.ak = t));
  }
  get forest() {
    return this.fk;
  }
  set forest(t) {
    this.fk !== t && (U.i(t, "boolean", LayeredDigraphEdge, "forest"), (this.fk = t));
  }
  get portFromPos() {
    return this.ck;
  }
  set portFromPos(t) {
    this.ck !== t && (U.i(t, "number", LayeredDigraphEdge, "portFromPos"), (this.ck = t));
  }
  get portToPos() {
    return this.uk;
  }
  set portToPos(t) {
    this.uk !== t && (U.i(t, "number", LayeredDigraphEdge, "portToPos"), (this.uk = t));
  }
  get portFromColOffset() {
    return this.dk;
  }
  set portFromColOffset(t) {
    this.dk !== t && (U.i(t, "number", LayeredDigraphEdge, "portFromColOffset"), (this.dk = t));
  }
  get portToColOffset() {
    return this.gk;
  }
  set portToColOffset(t) {
    this.gk !== t && (U.i(t, "number", LayeredDigraphEdge, "portToColOffset"), (this.gk = t));
  }
}
var TreePath = ((w) => (
    (w[(w.Default = 0)] = "Default"),
    (w[(w.Destination = 1)] = "Destination"),
    (w[(w.Source = 2)] = "Source"),
    w
  ))(TreePath || {}),
  TreeSorting = ((w) => (
    (w[(w.Forwards = 10)] = "Forwards"),
    (w[(w.Reverse = 11)] = "Reverse"),
    (w[(w.Ascending = 12)] = "Ascending"),
    (w[(w.Descending = 13)] = "Descending"),
    w
  ))(TreeSorting || {}),
  TreeAlignment = ((w) => (
    (w[(w.CenterSubtrees = 20)] = "CenterSubtrees"),
    (w[(w.CenterChildren = 21)] = "CenterChildren"),
    (w[(w.Start = 22)] = "Start"),
    (w[(w.End = 23)] = "End"),
    (w[(w.Bus = 24)] = "Bus"),
    (w[(w.BusBranching = 25)] = "BusBranching"),
    (w[(w.TopLeftBus = 26)] = "TopLeftBus"),
    (w[(w.BottomRightBus = 27)] = "BottomRightBus"),
    (w[(w.Custom = 28)] = "Custom"),
    w
  ))(TreeAlignment || {}),
  TreeCompaction = ((w) => ((w[(w.None = 30)] = "None"), (w[(w.Block = 31)] = "Block"), w))(TreeCompaction || {}),
  TreeStyle = ((w) => (
    (w[(w.Layered = 40)] = "Layered"),
    (w[(w.LastParents = 41)] = "LastParents"),
    (w[(w.Alternating = 42)] = "Alternating"),
    (w[(w.RootOnly = 43)] = "RootOnly"),
    w
  ))(TreeStyle || {}),
  TreeArrangement = ((w) => (
    (w[(w.Vertical = 50)] = "Vertical"),
    (w[(w.Horizontal = 51)] = "Horizontal"),
    (w[(w.FixedRoots = 52)] = "FixedRoots"),
    w
  ))(TreeArrangement || {}),
  TreeLayerStyle = ((w) => (
    (w[(w.Individual = 60)] = "Individual"),
    (w[(w.Siblings = 61)] = "Siblings"),
    (w[(w.Uniform = 62)] = "Uniform"),
    w
  ))(TreeLayerStyle || {});
