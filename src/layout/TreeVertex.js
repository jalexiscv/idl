class TreeVertex extends LayoutVertex {
  X;
  bt;
  dt;
  xk;
  bk;
  Sk;
  kk;
  Pk;
  Mk;
  Nk;
  ve;
  im;
  em;
  Ce;
  Ae;
  vt;
  pi;
  Rw;
  Ow;
  Ew;
  Us;
  Vw;
  Bw;
  zw;
  Xw;
  Yw;
  Kw;
  Uw;
  Gw;
  qw;
  Hw;
  vw;
  constructor(t) {
    (super(t),
      (this.xk = false),
      (this.bk = null),
      (this.Sk = []),
      (this.kk = 0),
      (this.Pk = 0),
      (this.Mk = 0),
      (this.Nk = 0),
      (this.ve = null),
      (this.X = new Point(0, 0)),
      (this.bt = new Size(0, 0)),
      (this.dt = new Point(0, 0)),
      (this.im = null),
      (this.em = null),
      (this.Ce = 10),
      (this.Ae = LayoutVertex.standardComparer),
      (this.vt = 0),
      (this.pi = 21),
      (this.Rw = 0),
      (this.Ow = 0),
      (this.Ew = 20),
      (this.Us = 50),
      (this.Vw = 0),
      (this.Bw = 31),
      (this.zw = 0),
      (this.Xw = 25),
      (this.Yw = 10),
      (this.Kw = 10),
      (this.Uw = 20),
      (this.Gw = true),
      (this.qw = Spot.Default),
      (this.Hw = true),
      (this.vw = Spot.Default));
  }
  copyInheritedPropertiesFrom(t) {
    t !== null &&
      ((this.Ce = t.sorting),
      (this.Ae = t.comparer),
      (this.vt = t.angle),
      (this.pi = t.alignment),
      (this.Rw = t.nodeIndent),
      (this.Ow = t.nodeIndentPastParent),
      (this.Ew = t.nodeSpacing),
      (this.Us = t.layerSpacing),
      (this.Vw = t.layerSpacingParentOverlap),
      (this.Bw = t.compaction),
      (this.zw = t.breadthLimit),
      (this.Xw = t.rowSpacing),
      (this.Yw = t.rowIndent),
      (this.Kw = t.commentSpacing),
      (this.Uw = t.commentMargin),
      (this.Gw = t.setsPortSpot),
      (this.qw = t.portSpot),
      (this.Hw = t.setsChildPortSpot),
      (this.vw = t.childPortSpot));
  }
  get initialized() {
    return this.xk;
  }
  set initialized(t) {
    this.xk !== t && (U.i(t, "boolean", TreeVertex, "initialized"), (this.xk = t));
  }
  get parent() {
    return this.bk;
  }
  set parent(t) {
    this.bk !== t && (Debug && t !== null && U.s(t, TreeVertex, TreeVertex, "parent"), (this.bk = t));
  }
  get children() {
    return this.Sk;
  }
  set children(t) {
    if (this.Sk !== t) {
      if ((t !== null && !Array.isArray(t) && U.Li(t, "Array", TreeVertex, "children:value"), t !== null)) {
        const i = t.length;
        for (let e = 0; e < i; e++) {
          const s = t[e];
          Debug && U.s(s, TreeVertex, TreeVertex, "children");
        }
      }
      this.Sk = t;
    }
  }
  get level() {
    return this.kk;
  }
  set level(t) {
    this.kk !== t && (U.i(t, "number", TreeVertex, "level"), (this.kk = t));
  }
  get descendantCount() {
    return this.Pk;
  }
  set descendantCount(t) {
    this.Pk !== t && (U.i(t, "number", TreeVertex, "descendantCount"), (this.Pk = t));
  }
  get maxChildrenCount() {
    return this.Mk;
  }
  set maxChildrenCount(t) {
    this.Mk !== t && (U.i(t, "number", TreeVertex, "maxChildrenCount"), (this.Mk = t));
  }
  get maxGenerationCount() {
    return this.Nk;
  }
  set maxGenerationCount(t) {
    this.Nk !== t && (U.i(t, "number", TreeVertex, "maxGenerationCount"), (this.Nk = t));
  }
  get comments() {
    return this.ve;
  }
  set comments(t) {
    if (this.ve !== t) {
      if ((t !== null && !Array.isArray(t) && U.Li(t, "Array", TreeVertex, "comments:value"), t !== null)) {
        const i = t.length;
        for (let e = 0; e < i; e++) {
          const s = t[e];
          Debug && U.s(s, Node, TreeVertex, "comments");
        }
      }
      this.ve = t;
    }
  }
  get sorting() {
    return this.Ce;
  }
  set sorting(t) {
    this.Ce !== t && (U.W(t, TreeSorting, "TreeSorting"), (this.Ce = t));
  }
  get comparer() {
    return this.Ae;
  }
  set comparer(t) {
    this.Ae !== t && (U.C(t, TreeVertex, "comparer"), (this.Ae = t));
  }
  get angle() {
    return this.vt;
  }
  set angle(t) {
    this.vt !== t && (U.i(t, "number", TreeVertex, "angle"), (this.vt = t));
  }
  get alignment() {
    return this.pi;
  }
  set alignment(t) {
    this.pi !== t && (U.W(t, TreeAlignment, "TreeAlignment"), (this.pi = t));
  }
  get nodeIndent() {
    return this.Rw;
  }
  set nodeIndent(t) {
    this.Rw !== t && (U.i(t, "number", TreeVertex, "nodeIndent"), (this.Rw = t));
  }
  get nodeIndentPastParent() {
    return this.Ow;
  }
  set nodeIndentPastParent(t) {
    this.Ow !== t && (U.i(t, "number", TreeVertex, "nodeIndentPastParent"), (this.Ow = t));
  }
  get nodeSpacing() {
    return this.Ew;
  }
  set nodeSpacing(t) {
    this.Ew !== t && (U.i(t, "number", TreeVertex, "nodeSpacing"), (this.Ew = t));
  }
  get layerSpacing() {
    return this.Us;
  }
  set layerSpacing(t) {
    this.Us !== t && (U.i(t, "number", TreeVertex, "layerSpacing"), (this.Us = t));
  }
  get layerSpacingParentOverlap() {
    return this.Vw;
  }
  set layerSpacingParentOverlap(t) {
    this.Vw !== t && (U.i(t, "number", TreeVertex, "layerSpacingParentOverlap"), (this.Vw = t));
  }
  get compaction() {
    return this.Bw;
  }
  set compaction(t) {
    this.Bw !== t && (U.W(t, TreeCompaction, "TreeCompaction"), (this.Bw = t));
  }
  get breadthLimit() {
    return this.zw;
  }
  set breadthLimit(t) {
    this.zw !== t && (U.i(t, "number", TreeVertex, "breadthLimit"), (this.zw = t));
  }
  get rowSpacing() {
    return this.Xw;
  }
  set rowSpacing(t) {
    this.Xw !== t && (U.i(t, "number", TreeVertex, "rowSpacing"), (this.Xw = t));
  }
  get rowIndent() {
    return this.Yw;
  }
  set rowIndent(t) {
    this.Yw !== t && (U.i(t, "number", TreeVertex, "rowIndent"), (this.Yw = t));
  }
  get commentSpacing() {
    return this.Kw;
  }
  set commentSpacing(t) {
    this.Kw !== t && (U.i(t, "number", TreeVertex, "commentSpacing"), (this.Kw = t));
  }
  get commentMargin() {
    return this.Uw;
  }
  set commentMargin(t) {
    this.Uw !== t && (U.i(t, "number", TreeVertex, "commentMargin"), (this.Uw = t));
  }
  get setsPortSpot() {
    return this.Gw;
  }
  set setsPortSpot(t) {
    this.Gw !== t && (U.i(t, "boolean", TreeVertex, "setsPortSpot"), (this.Gw = t));
  }
  get portSpot() {
    return this.qw;
  }
  set portSpot(t) {
    (U.s(t, Spot, TreeVertex, "portSpot"), this.qw.equals(t) || (this.qw = t));
  }
  get setsChildPortSpot() {
    return this.Hw;
  }
  set setsChildPortSpot(t) {
    this.Hw !== t && (U.i(t, "boolean", TreeVertex, "setsChildPortSpot"), (this.Hw = t));
  }
  get childPortSpot() {
    return this.vw;
  }
  set childPortSpot(t) {
    (U.s(t, Spot, TreeVertex, "childPortSpot"), this.vw.equals(t) || (this.vw = t));
  }
  get childrenCount() {
    return this.children.length;
  }
  get relativePosition() {
    return this.X;
  }
  set relativePosition(t) {
    this.X.set(t);
  }
  get subtreeSize() {
    return this.bt;
  }
  set subtreeSize(t) {
    this.bt.set(t);
  }
  get subtreeOffset() {
    return this.dt;
  }
  set subtreeOffset(t) {
    this.dt.set(t);
  }
}
