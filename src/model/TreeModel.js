class TreeModel extends Model {
  Ll;
  yf;
  constructor(t, i) {
    if (
      (super(),
      (this.Ll = "parent"),
      (this.yf = "parentLinkCategory"),
      t !== void 0 && (Array.isArray(t) ? (this.nodeDataArray = t) : (i = t)),
      i)
    ) {
      Object.assign(this, i);
      const e = i.Changed;
      e && (delete this.Changed, this.addChangedListener(e));
    }
  }
  cloneProtected(t) {
    (super.cloneProtected(t), (t.Ll = this.Ll), (t.yf = this.yf));
  }
  toString(t) {
    if ((t === void 0 && (t = 0), t >= 2)) return this.toJson();
    {
      let i = (this.name !== "" ? this.name : "") + " TreeModel";
      if (t > 0) {
        i += `
 node data:`;
        const e = this.nodeDataArray,
          s = e.length;
        for (let n = 0; n < s; n++) {
          const o = e[n];
          i += " " + this.getKeyForNodeData(o) + ":" + Binding.toString(o);
        }
      }
      return i;
    }
  }
  Rg() {
    const t = super.Rg();
    let i = "";
    return (
      this.nodeParentKeyProperty !== "parent" &&
        typeof this.nodeParentKeyProperty == "string" &&
        (i +=
          `,
  "nodeParentKeyProperty": ` + this.quote(this.nodeParentKeyProperty)),
      t + i
    );
  }
  cw(t) {
    (super.cw(t), t.nodeParentKeyProperty && (this.nodeParentKeyProperty = t.nodeParentKeyProperty));
  }
  uw(t) {
    (t.nodeParentKeyProperty !== void 0 &&
      t.nodeParentKeyProperty !== this.nodeParentKeyProperty &&
      U.n("applyIncrementalJson cannot change Model properties"),
      super.uw(t));
  }
  maybeEnsureLinkReference(t) {
    return t;
  }
  get nodeParentKeyProperty() {
    return this.Ll;
  }
  set nodeParentKeyProperty(t) {
    const i = this.Ll;
    i !== t && (this.Gn(t, TreeModel, "nodeParentKeyProperty"), (this.Ll = t), this.t("nodeParentKeyProperty", i, t));
  }
  getParentKeyForNodeData(t) {
    if (t === null) return;
    const i = this.Ll;
    if (i === "") return;
    const e = this.It(t, i);
    if (e !== void 0) {
      if (this.isKeyType(e)) return e;
      U.n("ParentKey value for node data " + t + " is not a number or a string: " + e);
    }
  }
  setParentKeyForNodeData(t, i) {
    if (
      (i === null && (i = void 0),
      i !== void 0 && !this.isKeyType(i) && U.Li(i, "number or string", TreeModel, "setParentKeyForNodeData:key"),
      t === null)
    )
      return;
    const e = this.Ll;
    if (e === "") return;
    if (((i = this.maybeEnsureLinkReference(i)), !this.containsNodeData(t))) {
      this.at(t, e, i);
      return;
    }
    const s = this.It(t, e);
    s !== i &&
      (this.un(s, t),
      this.at(t, e, i),
      this.findNodeDataForKey(i) === null && this.dn(i, t),
      this.Bt("nodeParentKey", 2, e, t, s, i),
      typeof e == "string" && this.updateTargetBindings(t, e));
  }
  get parentLinkCategoryProperty() {
    return this.yf;
  }
  set parentLinkCategoryProperty(t) {
    const i = this.yf;
    i !== t &&
      (this.Gn(t, TreeModel, "parentLinkCategoryProperty"), (this.yf = t), this.t("parentLinkCategoryProperty", i, t));
  }
  get linkCategoryProperty() {
    return this.parentLinkCategoryProperty;
  }
  set linkCategoryProperty(t) {
    this.parentLinkCategoryProperty = t;
  }
  getParentLinkCategoryForNodeData(t) {
    if (t === null) return "";
    const i = this.yf;
    if (i === "") return "";
    const e = this.It(t, i);
    if (e === void 0) return "";
    if (typeof e == "string") return e;
    U.n("getParentLinkCategoryForNodeData found a non-string category for " + t + ": " + e);
  }
  getLinkCategoryForData(t) {
    return this.getParentLinkCategoryForNodeData(t);
  }
  setParentLinkCategoryForNodeData(t, i) {
    if ((U.i(i, "string", TreeModel, "setParentLinkCategoryForNodeData:cat"), t === null)) return;
    const e = this.yf;
    if (e === "") return;
    if (!this.containsNodeData(t)) {
      this.at(t, e, i);
      return;
    }
    let s = this.It(t, e);
    (s === void 0 && (s = ""),
      s !== i &&
        (this.at(t, e, i),
        this.Bt("parentLinkCategory", 2, e, t, s, i),
        typeof e == "string" && this.updateTargetBindings(t, e)));
  }
  setLinkCategoryForData(t, i) {
    this.setParentLinkCategoryForNodeData(t, i);
  }
  copyNodeData(t) {
    const i = super.copyNodeData(t);
    return (this.setParentKeyForNodeData(i, void 0), i);
  }
  setDataProperty(t, i, e) {
    if (
      (Debug &&
        (U.Ro(t, TreeModel, "setDataProperty:data"),
        U.i(i, "string", TreeModel, "setDataProperty:propname"),
        i === "" &&
          U.n("TreeModel.setDataProperty: property name must not be an empty string when setting " + t + " to " + e)),
      this.containsNodeData(t))
    ) {
      if (i === this.nodeKeyProperty) {
        this.setKeyForNodeData(t, e);
        return;
      } else if (i === this.nodeCategoryProperty) {
        this.setCategoryForNodeData(t, e);
        return;
      } else if (i === this.nodeParentKeyProperty) {
        this.setParentKeyForNodeData(t, e);
        return;
      } else if (i === this.parentLinkCategoryProperty) {
        this.setParentLinkCategoryForNodeData(t, e);
        return;
      }
    }
    const s = this.It(t, i);
    s !== e && (this.at(t, i, e), this.raiseDataChanged(t, i, s, e));
  }
  dw(t, i) {
    super.dw(t, i);
    const e = this.Mi.iterator;
    for (; e.next(); ) {
      const s = e.value;
      this.uA(s, t, i);
    }
  }
  uA(t, i, e) {
    if (this.getParentKeyForNodeData(t) === i) {
      const n = this.Ll;
      (this.at(t, n, e),
        this.Bt("nodeParentKey", 2, n, t, i, e),
        typeof n == "string" && this.updateTargetBindings(t, n));
    }
  }
  Eg(t) {
    super.Eg(t);
    const i = this.getKeyForNodeData(t),
      e = this.lw(i);
    if (e !== null) {
      const s = U.ht(),
        n = e.iterator;
      for (; n.next(); ) {
        const o = n.value;
        if (this.containsNodeData(o) && this.getParentKeyForNodeData(o) === i) {
          const l = this.Ll;
          (this.Bt("nodeParentKey", 2, l, o, i, i), typeof l == "string" && this.updateTargetBindings(o, l), s.push(o));
        }
      }
      for (let o = 0; o < s.length; o++) this.un(i, s[o]);
      U.et(s);
    }
  }
  Vg(t) {
    super.Vg(t);
    let i = this.getParentKeyForNodeData(t);
    ((i = this.maybeEnsureLinkReference(i)), this.findNodeDataForKey(i) === null && this.dn(i, t));
  }
  mw(t) {
    super.mw(t);
    const i = this.getParentKeyForNodeData(t);
    this.un(i, t);
  }
  Og(t, i) {
    (super.Og(t, i),
      this.setParentLinkCategoryForNodeData(i, this.getParentLinkCategoryForNodeData(t)),
      this.setParentKeyForNodeData(i, this.getParentKeyForNodeData(t)));
  }
  get type() {
    return "TreeModel";
  }
  Ix() {
    return !0;
  }
  Rx() {
    return !0;
  }
}
Model.Al(TreeModel, "TreeModel");
var CircularArrangement = ((w) => (
    (w[(w.ConstantSpacing = 0)] = "ConstantSpacing"),
    (w[(w.ConstantDistance = 1)] = "ConstantDistance"),
    (w[(w.ConstantAngle = 2)] = "ConstantAngle"),
    (w[(w.Packed = 3)] = "Packed"),
    w
  ))(CircularArrangement || {}),
  CircularDirection = ((w) => (
    (w[(w.Clockwise = 10)] = "Clockwise"),
    (w[(w.Counterclockwise = 11)] = "Counterclockwise"),
    (w[(w.BidirectionalLeft = 12)] = "BidirectionalLeft"),
    (w[(w.BidirectionalRight = 13)] = "BidirectionalRight"),
    w
  ))(CircularDirection || {}),
  CircularSorting = ((w) => (
    (w[(w.Forwards = 20)] = "Forwards"),
    (w[(w.Reverse = 21)] = "Reverse"),
    (w[(w.Ascending = 22)] = "Ascending"),
    (w[(w.Descending = 23)] = "Descending"),
    (w[(w.Optimized = 24)] = "Optimized"),
    w
  ))(CircularSorting || {}),
  CircularNodeDiameterFormula = ((w) => (
    (w[(w.Pythagorean = 30)] = "Pythagorean"),
    (w[(w.Circular = 31)] = "Circular"),
    w
  ))(CircularNodeDiameterFormula || {});
