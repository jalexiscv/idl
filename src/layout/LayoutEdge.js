class LayoutEdge {
  No;
  oi;
  ns;
  rs;
  ls;
  constructor(t) {
    (GSet._i(this),
      Debug && !t && U.n("LayoutEdge constructor requires non-null LayoutNetwork argument"),
      (this.No = t),
      (this.oi = null),
      (this.ns = null),
      (this.rs = null),
      (this.ls = null));
  }
  clear() {
    ((this.oi = null), (this.ns = null), (this.rs = null), (this.ls = null));
  }
  toString(t) {
    t === void 0 && (t = 0);
    let i = "LayoutEdge#" + GSet.Ps(this);
    return (
      t > 0 &&
        ((i += this.ns !== null ? "(" + this.ns.toString() + ")" : ""),
        t > 1 &&
          (i += " " + (this.rs ? this.rs.toString() : "null") + " --> " + (this.ls ? this.ls.toString() : "null"))),
      i
    );
  }
  reverseEdge() {
    const t = this.rs;
    ((this.rs = this.ls), (this.ls = t));
  }
  commit() {}
  getOtherVertex(t) {
    return (
      Debug && U.s(t, LayoutVertex, LayoutEdge, "getOtherVertex:v"),
      this.ls === t ? this.rs : this.rs === t ? this.ls : null
    );
  }
  get network() {
    return this.No;
  }
  set network(t) {
    (Debug && U.s(t, LayoutNetwork, LayoutEdge, "network"), (this.No = t));
  }
  get data() {
    return this.oi;
  }
  set data(t) {
    this.oi !== t && (Debug && t !== null && U.Ro(t, LayoutEdge, "data"), (this.oi = t));
  }
  get link() {
    return this.ns;
  }
  set link(t) {
    this.ns !== t && (Debug && t !== null && U.s(t, Link, LayoutEdge, "link"), (this.ns = t));
  }
  get fromVertex() {
    return this.rs;
  }
  set fromVertex(t) {
    this.rs !== t && (Debug && t !== null && U.s(t, LayoutVertex, LayoutEdge, "fromVertex"), (this.rs = t));
  }
  get toVertex() {
    return this.ls;
  }
  set toVertex(t) {
    this.ls !== t && (Debug && t !== null && U.s(t, LayoutVertex, LayoutEdge, "toVertex"), (this.ls = t));
  }
}
var GridAlignment = ((w) => ((w[(w.Position = 0)] = "Position"), (w[(w.Location = 1)] = "Location"), w))(
    GridAlignment || {},
  ),
  GridArrangement = ((w) => ((w[(w.LeftToRight = 10)] = "LeftToRight"), (w[(w.RightToLeft = 11)] = "RightToLeft"), w))(
    GridArrangement || {},
  ),
  GridSorting = ((w) => (
    (w[(w.Forwards = 20)] = "Forwards"),
    (w[(w.Reverse = 21)] = "Reverse"),
    (w[(w.Ascending = 22)] = "Ascending"),
    (w[(w.Descending = 23)] = "Descending"),
    w
  ))(GridSorting || {});
