class Group extends Node {
  dg;
  Rt;
  Fa;
  R0;
  ui;
  fe;
  constructor(t, i) {
    let e;
    (t === void 0 || t instanceof PanelLayout || typeof t == "string" ? (e = t) : t && (i = t),
      super(e),
      (this.z = this.z | 4608),
      (this.dg = new GSet()),
      (this.Rt = null),
      (this.fe = new Layout()),
      (this.fe.group = this),
      (this.Fa = new GSet()),
      (this.R0 = null),
      (this.ui = null),
      i && Object.assign(this, i));
  }
  cloneProtected(t) {
    (super.cloneProtected(t), (this.z = this.z & -32769));
    const i = t.findInVisualTree((e) => e instanceof Placeholder);
    (i instanceof Placeholder ? (t.Rt = i) : (t.Rt = null),
      this.fe !== null
        ? ((t.fe = this.fe.copy()), (t.fe.group = t))
        : (t.fe !== null && (t.fe.group = null), (t.fe = null)),
      this.ui !== null && (t.ui = this.ui.copy()));
  }
  $o(t) {
    super.$o(t);
    const i = t.findSubGraphParts(),
      e = t.memberParts;
    for (; e.next(); ) {
      const s = e.value;
      if ((s.g(), s.invalidateLayout(8), s.clearAdornments(), s instanceof Node)) s.invalidateConnectedLinks(i);
      else if (s instanceof Link) {
        const n = s.labelNodes;
        for (; n.next(); ) n.value.invalidateConnectedLinks(i);
      }
    }
  }
  xc(t, i, e, s, n, o, r) {
    if (t === 3 && i === "elements") {
      if (n instanceof Placeholder)
        this.Rt === null
          ? (this.Rt = n)
          : this.Rt !== n && U.n("Cannot insert a second Placeholder into the visual tree of a Group.");
      else if (n instanceof Panel) {
        const l = n.findInVisualTree((h) => h instanceof Placeholder);
        l instanceof Placeholder &&
          (this.Rt === null
            ? (this.Rt = l)
            : this.Rt !== l && U.n("Cannot insert a second Placeholder into the visual tree of a Group."));
      }
    } else
      t === 4 &&
        i === "elements" &&
        this.Rt !== null &&
        (s === this.Rt ? (this.Rt = null) : s instanceof Panel && this.Rt.isContainedBy(s) && (this.Rt = null));
    super.xc(t, i, e, s, n, o, r);
  }
  Ad(t, i) {
    if ((super.Ad(t, i), this.isClipping && this.type !== Panel.Spot && this.isSubGraphExpanded)) {
      let e = this.resizeObject;
      (e instanceof Panel && (e = e.findMainElement()),
        this.ui === null && (this.ui = new Rect()),
        e.getDocumentBounds(this.ui),
        e instanceof Shape && this.ui.inflate(-e.strokeWidth, -e.strokeWidth));
    }
  }
  Th(t, i, e, s) {
    (this.hasPlaceholder() && (this.or = this.placeholder), super.Th(t, i, e, s));
  }
  ensureBounds() {
    (this.isSubGraphExpanded &&
      this.memberParts.each((i) => {
        i.ensureBounds();
      }),
      super.ensureBounds());
  }
  nl() {
    if (!super.nl()) return false;
    const t = this.memberParts;
    for (; t.next(); ) {
      const i = t.value;
      if (i instanceof Node) {
        if (!i.isVisible()) continue;
        if (i.us()) return false;
      } else if (i instanceof Link) {
        if (!i.isVisible()) continue;
        if (i.us() && i.fromNode !== this && i.toNode !== this) return false;
      }
    }
    return true;
  }
  hasPlaceholder() {
    return this.Rt !== null && this.Rt.isVisibleObject() && this.isSubGraphExpanded;
  }
  get placeholder() {
    return this.Rt;
  }
  get computesBoundsAfterDrag() {
    return (this.z & 2048) !== 0;
  }
  set computesBoundsAfterDrag(t) {
    const i = (this.z & 2048) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Group, "computesBoundsAfterDrag"),
      (this.z = this.z ^ 2048),
      this.t("computesBoundsAfterDrag", i, t));
  }
  get computesBoundsIncludingLinks() {
    return (this.z & 4096) !== 0;
  }
  set computesBoundsIncludingLinks(t) {
    const i = (this.z & 4096) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Group, "computesBoundsIncludingLinks"),
      (this.z = this.z ^ 4096),
      this.t("computesBoundsIncludingLinks", i, t));
  }
  get computesBoundsIncludingLocation() {
    return (this.z & 8192) !== 0;
  }
  set computesBoundsIncludingLocation(t) {
    const i = (this.z & 8192) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Group, "computesBoundsIncludingLocation"),
      (this.z = this.z ^ 8192),
      this.t("computesBoundsIncludingLocation", i, t));
  }
  get handlesDragDropForMembers() {
    return (this.z & 16384) !== 0;
  }
  set handlesDragDropForMembers(t) {
    const i = (this.z & 16384) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Group, "handlesDragDropForMembers"),
      (this.z = this.z ^ 16384),
      this.t("handlesDragDropForMembers", i, t));
  }
  get avoidableMembers() {
    return (this.z & 131072) !== 0;
  }
  set avoidableMembers(t) {
    const i = (this.z & 131072) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Group, "avoidableMembers"),
      (this.z = this.z ^ 131072),
      this.t("avoidableMembers", i, t));
  }
  get memberParts() {
    return this.dg.iterator;
  }
  wC(t) {
    if (this.dg.add(t)) {
      t instanceof Group && this.Fa.add(t);
      const e = this.memberAdded;
      if (e !== null) {
        let s = true;
        const n = this.diagram;
        (n !== null && ((s = n.H), (n.H = true)), e(this, t), n !== null && (n.H = s));
      }
      (!this.isVisible() || !this.isSubGraphExpanded) && t.Hi(false);
    }
    if (t instanceof Link && !this.computesBoundsIncludingLinks) return;
    let i = this.Rt;
    (i === null && (i = this), i.g());
  }
  yC(t) {
    if (this.dg.delete(t)) {
      t instanceof Group && this.Fa.delete(t);
      const e = this.memberRemoved;
      if (e !== null) {
        let s = true;
        const n = this.diagram;
        (n !== null && ((s = n.H), (n.H = true)), e(this, t), n !== null && (n.H = s));
      }
      (!this.isVisible() || !this.isSubGraphExpanded) && t.Hi(true);
    }
    if (t instanceof Link && !this.computesBoundsIncludingLinks) return;
    let i = this.Rt;
    (i === null && (i = this), i.g());
  }
  dc() {
    if (this.dg.count > 0) {
      const t = this.diagram;
      if (t !== null) {
        const e = this.dg.copy().iterator;
        for (; e.next(); ) {
          const s = e.value;
          t.remove(s);
        }
      }
    }
    super.dc();
  }
  get layout() {
    return this.fe;
  }
  set layout(t) {
    const i = this.fe;
    if (i !== t) {
      (t !== null &&
        (U.s(t, Layout, Group, "layout"),
        t.diagram !== null &&
          t.diagram.layout === t &&
          U.n("A layout cannot be both the Diagram.layout and a Group.layout: " + t)),
        i !== null && ((i.diagram = null), (i.group = null)),
        (this.fe = t));
      const e = this.diagram;
      (t !== null && ((t.diagram = e), (t.group = this)),
        e !== null && (e.tl = true),
        this.t("layout", i, t),
        e !== null && e.requestUpdate());
    }
  }
  get memberAdded() {
    return this.Vt !== null ? this.Vt.jy : null;
  }
  set memberAdded(t) {
    const i = this.memberAdded;
    i !== t && (t !== null && U.C(t, Group, "memberAdded"), (this.Pl().jy = t), this.t("memberAdded", i, t));
  }
  get memberRemoved() {
    return this.Vt !== null ? this.Vt.Jy : null;
  }
  set memberRemoved(t) {
    const i = this.memberRemoved;
    i !== t && (t !== null && U.C(t, Group, "memberRemoved"), (this.Pl().Jy = t), this.t("memberRemoved", i, t));
  }
  get memberValidation() {
    return this.Vt !== null ? this.Vt.xh : null;
  }
  set memberValidation(t) {
    const i = this.memberValidation;
    i !== t && (t !== null && U.C(t, Group, "memberValidation"), (this.Pl().xh = t), this.t("memberValidation", i, t));
  }
  canAddMembers(t) {
    const i = this.diagram;
    if (i === null) return false;
    const e = i.commandHandler,
      n = e.MN(t).iterator;
    for (; n.next(); ) {
      const o = n.value;
      if (!e.isValidMember(this, o)) return false;
    }
    return true;
  }
  addMembers(t, i) {
    const e = this.diagram;
    if (e === null) return false;
    const s = e.commandHandler,
      n = s.MN(t);
    let o = true;
    const r = n.iterator;
    for (; r.next(); ) {
      const l = r.value;
      !i || s.isValidMember(this, l) ? (l.containingGroup = this) : (o = false);
    }
    return o;
  }
  get ungroupable() {
    return (this.z & 256) !== 0;
  }
  set ungroupable(t) {
    const i = (this.z & 256) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Group, "ungroupable"), (this.z = this.z ^ 256), this.t("ungroupable", i, t));
  }
  canUngroup() {
    if (!this.ungroupable) return false;
    const t = this.layer;
    if (t === null || !t.allowUngroup) return false;
    const i = t.diagram;
    return !(i !== null && !i.allowUngroup);
  }
  invalidateConnectedLinks(t) {
    const i = this.n4();
    if ((super.invalidateConnectedLinks(t), i)) return;
    this.mL(true);
    const e = this.findExternalLinksConnected();
    for (; e.next(); ) {
      const s = e.value;
      if (t !== void 0 && t.has(s)) continue;
      const n = s.fromNode;
      if (n !== null && n !== this && n.isMemberOf(this) && !n.isVisible()) (n.ie(s.fromPort), n.ie(s.toPort), s.ii());
      else {
        const o = s.toNode;
        o !== null && o !== this && o.isMemberOf(this) && !o.isVisible() && (o.ie(s.fromPort), o.ie(s.toPort), s.ii());
      }
    }
  }
  findExternalLinksConnected() {
    const t = this.diagram !== null && this.diagram.p2;
    if (t && this.R0 !== null) return this.R0.iterator;
    const i = this.findSubGraphParts();
    i.add(this);
    const e = new GSet(),
      s = i.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (!(n instanceof Node)) continue;
      const o = n.linksConnected;
      for (; o.next(); ) {
        const r = o.value;
        i.has(r) || e.add(r);
      }
    }
    return (t && (this.R0 = e), e.iterator);
  }
  findExternalNodesConnected() {
    const t = this.findSubGraphParts();
    t.add(this);
    const i = new GSet(),
      e = t.iterator;
    for (; e.next(); ) {
      const s = e.value;
      if (!(s instanceof Node)) continue;
      const n = s.linksConnected;
      for (; n.next(); ) {
        const o = n.value,
          r = o.fromNode;
        r !== null && (!t.has(r) || r === this) && i.add(r);
        const l = o.toNode;
        l !== null && (!t.has(l) || l === this) && i.add(l);
      }
    }
    return i.iterator;
  }
  UV() {
    function t(e, s) {
      e !== null && (s.add(e), t(e.containingGroup, s));
    }
    const i = new GSet();
    return (t(this, i), i);
  }
  findSubGraphParts() {
    const t = new GSet();
    return (Part.bh(t, this, true, 0, true), t.delete(this), t);
  }
  Hi(t) {
    super.Hi(t);
    const i = this.memberParts;
    for (; i.next(); ) i.value.Hi(t);
  }
  collapseSubGraph() {
    const t = this.diagram;
    if (t === null || t.isCollapsingExpanding) return;
    t.isCollapsingExpanding = true;
    const i = this.findSubGraphParts();
    (this.CF(i, t, this), (t.isCollapsingExpanding = false));
  }
  CF(t, i, e) {
    const s = this.memberParts;
    for (; s.next(); ) {
      const n = s.value;
      if (
        (n.Hi(false),
        n instanceof Group && n.isSubGraphExpanded && ((n.wasSubGraphExpanded = n.isSubGraphExpanded), n.CF(t, i, e)),
        n instanceof Node)
      )
        (n.invalidateConnectedLinks(t), i.$f(n, e));
      else if (n instanceof Link) {
        const o = n.labelNodes;
        for (; o.next(); ) o.value.invalidateConnectedLinks(t);
      }
    }
    this.isSubGraphExpanded = false;
  }
  expandSubGraph() {
    const t = this.diagram;
    if (t === null || t.isCollapsingExpanding) return;
    t.isCollapsingExpanding = true;
    const i = this.findSubGraphParts();
    (this.AF(i, t, this), (t.isCollapsingExpanding = false));
  }
  AF(t, i, e) {
    const s = this.memberParts;
    for (; s.next(); ) {
      const n = s.value;
      if (
        (n.Hi(true),
        n instanceof Group && n.wasSubGraphExpanded && ((n.wasSubGraphExpanded = false), n.AF(t, i, e)),
        n instanceof Node)
      )
        n.invalidateConnectedLinks(t);
      else if (n instanceof Link) {
        const o = n.labelNodes;
        for (; o.next(); ) o.value.invalidateConnectedLinks(t);
      }
    }
    this.isSubGraphExpanded = true;
  }
  get isSubGraphExpanded() {
    return (this.z & 512) !== 0;
  }
  set isSubGraphExpanded(t) {
    const i = (this.z & 512) !== 0;
    if (i !== t) {
      (Debug && U.i(t, "boolean", Group, "isSubGraphExpanded"), (this.z = this.z ^ 512));
      const e = this.diagram;
      this.t("isSubGraphExpanded", i, t);
      const s = this.subGraphExpandedChanged;
      if (s !== null) {
        let n = true;
        (e !== null && ((n = e.H), (e.H = true)), s(this), e !== null && (e.H = n));
      }
      if (e !== null && e.undoManager.isUndoingRedoing) {
        (this.Rt !== null && this.Rt.g(), this.memberParts.each((n) => n.updateAdornments()));
        return;
      }
      t ? this.expandSubGraph() : this.collapseSubGraph();
    }
  }
  get wasSubGraphExpanded() {
    return (this.z & 1024) !== 0;
  }
  set wasSubGraphExpanded(t) {
    const i = (this.z & 1024) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Group, "wasSubGraphExpanded"),
      (this.z = this.z ^ 1024),
      this.t("wasSubGraphExpanded", i, t));
  }
  get subGraphExpandedChanged() {
    return this.Vt !== null ? this.Vt.$y : null;
  }
  set subGraphExpandedChanged(t) {
    const i = this.subGraphExpandedChanged;
    i !== t &&
      (t !== null && U.C(t, Group, "subGraphExpandedChanged"),
      (this.Pl().$y = t),
      this.t("subGraphExpandedChanged", i, t));
  }
  move(t, i) {
    i === void 0 && (i = false);
    const e = i ? this.location : this.position,
      s = e.x,
      n = e.y,
      o = t.x,
      r = t.y;
    if ((s === o || (isNaN(s) && isNaN(o))) && (n === r || (isNaN(n) && isNaN(r)))) return;
    const l = o - (isNaN(s) ? 0 : s),
      h = r - (isNaN(n) ? 0 : n),
      a = Point.a();
    super.move(t, i);
    const f = new GSet(),
      u = this.findSubGraphParts().iterator;
    for (; u.next(); ) {
      const d = u.value;
      d instanceof Link &&
        (d.suspendsRouting && f.add(d),
        !(!d.Ve && (d.fromNode === this || d.toNode === this)) && (d.suspendsRouting = true));
    }
    for (u.reset(); u.next(); ) {
      const d = u.value;
      if (d.Ir() || (d instanceof Node && d.isLinkLabel)) continue;
      const m = d.position,
        g = d.location;
      m.isReal()
        ? ((a.x = m.x + l), (a.y = m.y + h), (d.position = a))
        : g.isReal() && ((a.x = g.x + l), (a.y = g.y + h), (d.location = a));
    }
    for (u.reset(); u.next(); ) {
      const d = u.value;
      if (!(d instanceof Link) || ((d.suspendsRouting = f.has(d)), !d.Ve && (d.fromNode === this || d.toNode === this)))
        continue;
      const m = d.position;
      ((a.x = m.x + l), (a.y = m.y + h), a.isReal() ? d.move(a) : d.ii());
    }
    Point.o(a);
  }
  n4() {
    return (this.z & 65536) !== 0;
  }
  mL(t) {
    ((this.z & 65536) !== 0) !== t && (this.z = this.z ^ 65536);
  }
  get Ia() {
    return (this.z & 32768) !== 0;
  }
  set Ia(t) {
    ((this.z & 32768) !== 0) !== t && (this.z = this.z ^ 32768);
  }
}
