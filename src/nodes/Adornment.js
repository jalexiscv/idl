class Adornment extends Part {
  Ts;
  Rt;
  ZP;
  QP;
  Rc;
  constructor(t, i) {
    let e;
    if (t === void 0 || t instanceof PanelLayout || typeof t == "string") e = t;
    else if (t) i = t;
    super(e);
    this.P &= -257;
    this.xl = "Adornment";
    this.Ts = null;
    this.ZP = 0;
    this.QP = false;
    this.Rt = null;
    this.Rc = null;
    if (i) Object.assign(this, i);
  }
  toString() {
    const t = this.adornedPart;
    return "Adornment(" + this.category + ")" + (t !== null ? t.toString() : "");
  }
  updateRelationshipsFromData() {}
  Ed(t) {
    const i = this.adornedObject;
    if (!(i instanceof Shape)) return;
    const e = i.part;
    if (!(e instanceof Link)) return;
    const s = e.path;
    let n = s.geometry;
    e.Ed(t);
    n = s.geometry;
    const o = this.O.h;
    const r = o.length;
    for (let l = 0; l < r; l++) {
      const h = o[l];
      if (h.isPanelMain && h instanceof Shape) h.xt = n;
    }
  }
  hasPlaceholder() {
    return this.Rt !== null && this.Rt.isVisibleObject();
  }
  get placeholder() {
    return this.Rt;
  }
  get adornedObject() {
    return this.Ts;
  }
  set adornedObject(t) {
    Debug && t !== null && U.s(t, GraphObject, Part, "adornedObject:value");
    const i = this.adornedPart;
    let e = null;
    if (t !== null) e = t.part;
    if (i !== null && (t === null || i !== e)) i.removeAdornment(this.category);
    this.Ts = t;
    if (e !== null) e.addAdornment(this.category, this);
  }
  get adornedPart() {
    const t = this.Ts;
    return t !== null ? t.part : null;
  }
  nl() {
    const t = this.Ts;
    if (t === null) return true;
    const i = t.part;
    return i === null || !i.us();
  }
  Oe() {
    return false;
  }
  get containingGroup() {
    return null;
  }
  xc(t, i, e, s, n, o, r) {
    if (t === 3 && i === "elements") {
      if (n instanceof Placeholder) {
        if (this.Rt === null) this.Rt = n;
        else Debug && this.Rt !== n && U.n("Cannot insert a second Placeholder into the visual tree of an Adornment.");
      } else if (n instanceof Panel) {
        const l = n.findInVisualTree((h) => h instanceof Placeholder);
        if (l instanceof Placeholder) {
          if (this.Rt === null) this.Rt = l;
          else Debug && this.Rt !== l && U.n("Cannot insert a second Placeholder into the visual tree of an Adornment.");
        }
      }
    } else if (t === 4 && i === "elements" && this.Rt !== null) {
      if (s === this.Rt) this.Rt = null;
      else if (s instanceof Panel && this.Rt.isContainedBy(s)) this.Rt = null;
    }
    super.xc(t, i, e, s, n, o, r);
  }
  updateAdornments() {}
  dc() {}
}
var PortSpreading = ((w) => (
  (w[(w.None = 0)] = "None"),
  (w[(w.Evenly = 1)] = "Evenly"),
  (w[(w.Packed = 2)] = "Packed"),
  w
))(PortSpreading || {});
