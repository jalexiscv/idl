class Node extends Part {
  z;
  Vt;
  vc;
  kl;
  Bh;
  de;
  ri;
  constructor(t, i) {
    let e;
    (t === void 0 || t instanceof PanelLayout || typeof t == "string" ? (e = t) : t && (i = t),
      super(e),
      (this.z = 13),
      (this.Vt = null),
      (this.ri = new List()),
      (this.vc = null),
      (this.kl = null),
      (this.de = null),
      (this.Bh = false),
      i && Object.assign(this, i));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.z = this.z),
      this.Vt !== null && (this.Vt.wi ? (t.Vt = this.Vt) : (t.Vt = this.Vt.copy())));
  }
  $o(t) {
    (super.$o(t), t.invalidateConnectedLinks(), (t.kl = this.kl), (t.de = null));
  }
  static SpreadingNone = 0;
  static SpreadingEvenly = 1;
  static SpreadingPacked = 2;
  Pl() {
    return (
      this.Vt === null ? (this.Vt = new NodeTemplateSettings()) : this.Vt.wi && (this.Vt = this.Vt.copy()),
      this.Vt
    );
  }
  Ch() {
    (super.Ch(), this.Vt !== null && (this.Vt.wi = true));
  }
  $D(t) {
    t !== null && (this.kl === null && (this.kl = new GSet()), this.kl.add(t));
  }
  ZD(t) {
    t !== null && this.kl !== null && this.kl.delete(t);
  }
  QD(t, i, e) {
    if (t === null || this.kl === null) return null;
    const s = this.kl.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (
        (n.Uy === this && n.mS === t && n.kC === i && n.PC === e) ||
        (n.Uy === t && n.mS === this && n.kC === e && n.PC === i)
      )
        return n;
    }
    return null;
  }
  invalidateLinkBundle(t, i, e) {
    (i == null && (i = ""), e == null && (e = ""));
    const s = this.QD(t, i, e);
    s !== null && s.ig();
  }
  xc(t, i, e, s, n, o, r) {
    (t === 3 && i === "elements" ? (this.de = null) : t === 4 && i === "elements" && (this.de = null),
      super.xc(t, i, e, s, n, o, r));
  }
  invalidateConnectedLinks(t, i) {
    const e = this.linksConnected;
    for (; e.next(); ) {
      const s = e.value;
      (t && t.has(s)) || (i && s.fromPort !== i && s.toPort !== i) || (this.ie(s.fromPort), this.ie(s.toPort), s.ii());
    }
  }
  ie(t) {
    if (t === null) return;
    const i = t.Pd;
    i !== null && i.ig();
    const e = t.part,
      s = e.containingGroup;
    s !== null && !e.isVisible() && s.ie(s.port);
  }
  nl() {
    return true;
  }
  get portSpreading() {
    return this.Vt !== null ? this.Vt.Gy : 1;
  }
  set portSpreading(t) {
    const i = this.portSpreading;
    if (i !== t) {
      (Debug &&
        t !== 0 &&
        t !== 1 &&
        t !== 2 &&
        U.n(
          "Node.portSpreading can only be set to PortSpreading.None, PortSpreading.Evenly, or PortSpreading.Packed, not: " +
            t,
        ),
        (this.Pl().Gy = t),
        this.t("portSpreading", i, t));
      const e = this.diagram;
      if (e !== null && e.undoManager.isUndoingRedoing) return;
      this.invalidateConnectedLinks();
    }
  }
  get avoidable() {
    return (this.z & 8) !== 0;
  }
  set avoidable(t) {
    const i = (this.z & 8) !== 0;
    if (i !== t) {
      (Debug && U.i(t, "boolean", Node, "avoidable"), (this.z = this.z ^ 8));
      const e = this.diagram;
      (e !== null && e.yd(this), this.t("avoidable", i, t));
    }
  }
  get avoidableMargin() {
    return this.Vt !== null ? this.Vt.qy : Margin.qA;
  }
  set avoidableMargin(t) {
    typeof t == "number" ? (t = new Margin(t)) : U.s(t, Margin, Node, "avoidableMargin");
    const i = this.avoidableMargin;
    if (!i.equals(t)) {
      ((t = t.T()), (this.Pl().qy = t));
      const e = this.diagram;
      (e !== null && e.yd(this), this.t("avoidableMargin", i, t));
    }
  }
  canAvoid() {
    return this.avoidable && !this.isLinkLabel;
  }
  getAvoidableRect(t) {
    return (t.set(this.actualBounds), t.addMargin(this.avoidableMargin), t);
  }
  findVisibleNode() {
    let t = this;
    for (; t !== null && !t.isVisible(); ) t = t.containingGroup;
    return t;
  }
  isVisible() {
    if (!super.isVisible()) return false;
    let t = true,
      i = 1;
    const e = this.diagram;
    if (e !== null) {
      if (e.animationManager._x(this)) return true;
      ((t = e.isTreePathToChildren), (i = e.treeCollapsePolicy));
    }
    if (i === 1) {
      const n = this.findTreeParentNode();
      if (n !== null && !n.isTreeExpanded) return false;
    } else if (i === 2) {
      const n = t ? this.findLinksInto() : this.findLinksOutOf();
      let o = false,
        r = false;
      for (; n.next(); ) {
        const l = n.value;
        if (l.isTreeLink) {
          o = true;
          const h = t ? l.fromNode : l.toNode;
          if (h && h.isTreeExpanded) {
            r = true;
            break;
          }
        }
      }
      if (o && !r) return false;
    } else if (i === 3) {
      const n = t ? this.findLinksInto() : this.findLinksOutOf();
      let o = false,
        r = false;
      for (; n.next(); ) {
        const l = n.value;
        if (l.isTreeLink) {
          o = true;
          const h = t ? l.fromNode : l.toNode;
          if (h && !h.isTreeExpanded) {
            r = true;
            break;
          }
        }
      }
      if (o && r) return false;
    }
    const s = this.labeledLink;
    return s !== null ? s.isVisible() : true;
  }
  Hi(t) {
    super.Hi(t);
    const i = this.linksConnected;
    for (; i.next(); ) {
      const e = i.value;
      if (t && this.containingGroup !== null) {
        const s = e.getOtherNode(this);
        s !== null && !s.isMemberOf(this.containingGroup) && e.ii();
      }
      e.Hi(t);
    }
  }
  get linksConnected() {
    return this.ri.iterator;
  }
  findExternalTreeLinksConnected() {
    const t = new GSet(),
      i = new GSet();
    return (this._D(this, t, i), i.iterator);
  }
  _D(t, i, e) {
    if (t === null || i.has(t)) return;
    i.add(t);
    let s = true;
    const n = this.diagram;
    (n !== null && (s = n.isTreePathToChildren),
      t.linksConnected.each((o) => {
        o.isTreeLink ? (s ? o.fromNode === t : o.toNode === t) && this._D(s ? o.toNode : o.fromNode, i, e) : e.add(o);
      }));
  }
  findLinksConnected(t) {
    if ((t === void 0 && (t = null), t === null)) return this.ri.iterator;
    Debug && U.i(t, "string", Node, "findLinksConnected:pid");
    const i = new ListIterator(this.ri),
      e = this;
    return ((i.predicate = (s) => (s.fromNode === e && s.fromPortId === t) || (s.toNode === e && s.toPortId === t)), i);
  }
  findLinksOutOf(t) {
    (t === void 0 && (t = null), Debug && t !== null && U.i(t, "string", Node, "findLinksOutOf:pid"));
    const i = new ListIterator(this.ri),
      e = this;
    return ((i.predicate = (s) => (s.fromNode !== e ? false : t === null ? true : s.fromPortId === t)), i);
  }
  findLinksInto(t) {
    (t === void 0 && (t = null), Debug && t !== null && U.i(t, "string", Node, "findLinksInto:pid"));
    const i = new ListIterator(this.ri),
      e = this;
    return ((i.predicate = (s) => (s.toNode !== e ? false : t === null ? true : s.toPortId === t)), i);
  }
  findNodesConnected(t) {
    (t === void 0 && (t = null), Debug && t !== null && U.i(t, "string", Node, "findNodesConnected:pid"));
    let i = null,
      e = null;
    const s = this.ri.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (n.fromNode === this) {
        if (t === null || n.fromPortId === t) {
          const o = n.toNode;
          i !== null ? i.add(o) : e !== null && e !== o ? ((i = new GSet()), i.add(e), i.add(o)) : (e = o);
        }
      } else if (n.toNode === this && (t === null || n.toPortId === t)) {
        const o = n.fromNode;
        i !== null ? i.add(o) : e !== null && e !== o ? ((i = new GSet()), i.add(e), i.add(o)) : (e = o);
      }
    }
    return i !== null ? i.iterator : e !== null ? new SingletonIterator(e) : EmptyIterator.instance;
  }
  findNodesOutOf(t) {
    (t === void 0 && (t = null), Debug && t !== null && U.i(t, "string", Node, "findNodesOutOf:pid"));
    let i = null,
      e = null;
    const s = this.ri.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (n.fromNode === this && (t === null || n.fromPortId === t)) {
        const o = n.toNode;
        i !== null ? i.add(o) : e !== null && e !== o ? ((i = new GSet()), i.add(e), i.add(o)) : (e = o);
      }
    }
    return i !== null ? i.iterator : e !== null ? new SingletonIterator(e) : EmptyIterator.instance;
  }
  findNodesInto(t) {
    (t === void 0 && (t = null), Debug && t !== null && U.i(t, "string", Node, "findNodesInto:pid"));
    let i = null,
      e = null;
    const s = this.ri.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (n.toNode === this && (t === null || n.toPortId === t)) {
        const o = n.fromNode;
        i !== null ? i.add(o) : e !== null && e !== o ? ((i = new GSet()), i.add(e), i.add(o)) : (e = o);
      }
    }
    return i !== null ? i.iterator : e !== null ? new SingletonIterator(e) : EmptyIterator.instance;
  }
  findLinksBetween(t, i, e) {
    (i === void 0 && (i = null),
      e === void 0 && (e = null),
      Debug &&
        (U.s(t, Node, Node, "findLinksBetween:othernode"),
        i !== null && U.i(i, "string", Node, "findLinksBetween:pid"),
        e !== null && U.i(e, "string", Node, "findLinksBetween:otherpid")));
    const s = new ListIterator(this.ri),
      n = this;
    return (
      (s.predicate = (o) =>
        (o.fromNode === n &&
          o.toNode === t &&
          (i === null || o.fromPortId === i) &&
          (e === null || o.toPortId === e)) ||
        (o.fromNode === t && o.toNode === n && (e === null || o.fromPortId === e) && (i === null || o.toPortId === i))),
      s
    );
  }
  findLinksTo(t, i, e) {
    (i === void 0 && (i = null),
      e === void 0 && (e = null),
      Debug &&
        (U.s(t, Node, Node, "findLinksTo:othernode"),
        i !== null && U.i(i, "string", Node, "findLinksTo:pid"),
        e !== null && U.i(e, "string", Node, "findLinksTo:otherpid")));
    const s = new ListIterator(this.ri),
      n = this;
    return (
      (s.predicate = (o) =>
        !(
          o.fromNode !== n ||
          o.toNode !== t ||
          (i !== null && o.fromPortId !== i) ||
          (e !== null && o.toPortId !== e)
        )),
      s
    );
  }
  findSuccessorParts(t) {
    return (t === void 0 && (t = new GSet()), this.tF(this, t), t.remove(this), t);
  }
  tF(t, i) {
    t !== null &&
      (i.has(t) ||
        (i.add(t),
        t.findLinksOutOf().each((e) => {
          if (i.has(e)) return;
          i.add(e);
          const s = e.toNode;
          s !== null && this.tF(s, i);
        })));
  }
  findPredecessorParts(t) {
    return (t === void 0 && (t = new GSet()), this.iF(this, t), t.remove(this), t);
  }
  iF(t, i) {
    t !== null &&
      (i.has(t) ||
        (i.add(t),
        t.findLinksInto().each((e) => {
          if (i.has(e)) return;
          i.add(e);
          const s = e.fromNode;
          s !== null && this.iF(s, i);
        })));
  }
  get linkConnected() {
    return this.Vt !== null ? this.Vt.Hy : null;
  }
  set linkConnected(t) {
    const i = this.linkConnected;
    i !== t && (t !== null && U.C(t, Node, "linkConnected"), (this.Pl().Hy = t), this.t("linkConnected", i, t));
  }
  get linkDisconnected() {
    return this.Vt !== null ? this.Vt.vy : null;
  }
  set linkDisconnected(t) {
    const i = this.linkDisconnected;
    i !== t && (t !== null && U.C(t, Node, "linkDisconnected"), (this.Pl().vy = t), this.t("linkDisconnected", i, t));
  }
  get linkValidation() {
    return this.Vt !== null ? this.Vt.Ul : null;
  }
  set linkValidation(t) {
    const i = this.linkValidation;
    i !== t && (t !== null && U.C(t, Node, "linkValidation"), (this.Pl().Ul = t), this.t("linkValidation", i, t));
  }
  pS(t, i) {
    this.ie(i);
    const e = this.ri.has(t);
    if ((e || this.ri.add(t), !e || t.fromNode === t.toNode)) {
      const s = this.linkConnected;
      if (s !== null) {
        let n = true;
        const o = this.diagram;
        (o !== null && ((n = o.H), (o.H = true)), s(this, t, i), o !== null && (o.H = n));
      }
    }
    if (!e) {
      if (!t.isTreeLink) return;
      const s = t.fromNode,
        n = t.toNode;
      if (s !== null && n !== null && s !== n) {
        let o = true;
        const r = this.diagram;
        r !== null && (o = r.isTreePathToChildren);
        const l = o ? n : s,
          h = o ? s : n;
        if ((l.Bh || (l.Bh = h), h.isTreeLeaf)) {
          if (r !== null && r.undoManager.isUndoingRedoing) return;
          o ? s === h && (h.isTreeLeaf = false) : n === h && (h.isTreeLeaf = false);
        }
      }
    }
  }
  yS(t, i) {
    this.ie(i);
    const e = this.ri.delete(t);
    let s = null;
    if (e || t.toNode === t.fromNode) {
      const n = this.linkDisconnected;
      if (((s = this.diagram), n !== null)) {
        let o = true;
        (s !== null && ((o = s.H), (s.H = true)), n(this, t, i), s !== null && (s.H = o));
      }
    }
    if (e) {
      if (!t.isTreeLink) return;
      let n = true;
      s !== null && (n = s.isTreePathToChildren);
      const o = n ? t.toNode : t.fromNode,
        r = n ? t.fromNode : t.toNode;
      if ((o !== null && (o.Bh = false), r !== null && !r.isTreeLeaf))
        if (r.ri.count === 0) {
          if (((r.Bh = null), s !== null && s.undoManager.isUndoingRedoing)) return;
          r.isTreeLeaf = true;
        } else r.I0();
    }
  }
  I0() {
    if (((this.Bh = false), this.ri.count === 0)) return;
    let t = true;
    const i = this.diagram;
    if (i !== null && i.undoManager.isUndoingRedoing) return;
    i !== null && (t = i.isTreePathToChildren);
    const e = this.ri.iterator;
    for (; e.next(); ) {
      const s = e.value;
      if (s.isTreeLink) {
        if (t) {
          if (s.fromNode === this) {
            this.isTreeLeaf = false;
            return;
          }
        } else if (s.toNode === this) {
          this.isTreeLeaf = false;
          return;
        }
      }
    }
    this.isTreeLeaf = true;
  }
  updateRelationshipsFromData() {
    const t = this.diagram;
    t !== null && t.partManager.updateRelationshipsFromData(this);
  }
  i0(t) {
    if ((super.i0(t), !t)) {
      this.I0();
      const i = this.vc;
      i !== null && i.eF(this);
    }
  }
  e0(t) {
    if ((super.e0(t), !t)) {
      const i = this.vc;
      i !== null && i.sF(this);
    }
  }
  dc() {
    if (this.ri.count > 0) {
      const t = this.diagram;
      if (t !== null) {
        const i = t.commandHandler !== null ? t.commandHandler.deletesConnectedLinks : true,
          s = this.ri.copy().iterator;
        for (; s.next(); ) {
          const n = s.value;
          i ? t.remove(n) : (n.fromNode === this && (n.fromNode = null), n.toNode === this && (n.toNode = null));
        }
      }
    }
    ((this.labeledLink = null), super.dc());
  }
  get isLinkLabel() {
    return this.vc !== null;
  }
  get labeledLink() {
    return this.vc;
  }
  set labeledLink(t) {
    const i = this.vc;
    if (i !== t) {
      Debug && t !== null && U.s(t, Link, Node, "labeledLink");
      const e = this.diagram,
        s = this.data;
      if (i !== null) {
        if ((i.sF(this), e !== null && s !== null && !e.undoManager.isUndoingRedoing)) {
          const n = i.data,
            o = e.model;
          if (n !== null && o._a()) {
            const r = o.getKeyForNodeData(s);
            r !== void 0 && o.removeLabelKeyForLinkData(n, r);
          }
        }
        this.containingGroup = null;
      }
      if (((this.vc = t), t !== null)) {
        if ((t.eF(this), e !== null && s !== null && !e.undoManager.isUndoingRedoing)) {
          const n = t.data,
            o = e.model;
          if (n !== null && o._a()) {
            const r = o.getKeyForNodeData(s);
            r !== void 0 && o.addLabelKeyForLinkData(n, r);
          }
        }
        this.containingGroup = t.containingGroup;
      }
      (this.Ac(), this.t("labeledLink", i, t));
    }
  }
  findVisiblePort(t) {
    let i = t;
    for (; i !== null && (!i.actualBounds.isReal() || !i.isVisibleObject()); ) i = i.panel;
    return i === null ? this.port : i;
  }
  findPort(t) {
    if ((Debug && U.i(t, "string", Node, "findPort:pid"), this.de === null)) {
      if (t === "" && this.Rn === false) return this;
      this.nF();
    }
    let i = this.de.get(t);
    return i !== null || (t !== "" && ((i = this.de.get("")), i !== null)) ? i : this;
  }
  get port() {
    return this.findPort("");
  }
  get ports() {
    return (this.de === null && this.nF(), this.de.iteratorValues);
  }
  nF() {
    (this.de === null ? (this.de = new GMap()) : this.de.clear(),
      this.walkVisualTreeFrom(this, (t, i) => t.fD(i)),
      this.de.count === 0 && this.de.set("", this));
  }
  fD(t) {
    const i = t.portId;
    i !== null && this.de !== null && this.de.set(i, t);
  }
  zN(t, i) {
    const e = t.portId;
    if (e !== null) {
      this.de !== null && this.de.delete(e);
      const s = this.diagram;
      if (s !== null && i) {
        let n = null;
        const o = this.findLinksConnected(e);
        for (; o.next(); ) {
          const r = o.value;
          (n === null && (n = U.ht()), n.push(r));
        }
        if (n !== null) {
          for (let r = 0; r < n.length; r++) {
            const l = n[r];
            s.remove(l);
          }
          U.et(n);
        }
      }
    }
  }
  isInTreeOf(t) {
    if (t === null || t === this) return false;
    let i = true;
    const e = this.diagram;
    e !== null && (i = e.isTreePathToChildren);
    let s = this;
    const n = t;
    let o;
    if (i)
      for (; s !== n; ) {
        o = null;
        const r = s.ri.iterator;
        for (; r.next(); ) {
          const l = r.value;
          if (l.isTreeLink && ((o = l.fromNode), o !== s && o !== this)) break;
        }
        if (o === this || o === null || o === s) return false;
        s = o;
      }
    else
      for (; s !== n; ) {
        o = null;
        const r = s.ri.iterator;
        for (; r.next(); ) {
          const l = r.value;
          if (l.isTreeLink && ((o = l.toNode), o !== s && o !== this)) break;
        }
        if (o === this || o === null || o === s) return false;
        s = o;
      }
    return true;
  }
  findTreeRoot() {
    let t = true;
    const i = this.diagram;
    i !== null && (t = i.isTreePathToChildren);
    let e = this,
      s;
    if (t)
      for (;;) {
        s = null;
        const n = e.ri.iterator;
        for (; n.next(); ) {
          const o = n.value;
          if (o.isTreeLink && ((s = o.fromNode), s !== e && s !== this)) break;
        }
        if (s === this) return this;
        if (s === null || s === e) return e;
        e = s;
      }
    else
      for (;;) {
        s = null;
        const n = e.ri.iterator;
        for (; n.next(); ) {
          const o = n.value;
          if (o.isTreeLink && ((s = o.toNode), s !== e && s !== this)) break;
        }
        if (s === this) return this;
        if (s === null || s === e) return e;
        e = s;
      }
  }
  findCommonTreeParent(t) {
    if (t === null) return null;
    if ((Debug && U.s(t, Node, Node, "findCommonTreeParent:other"), this === t)) return this;
    let i = this;
    for (; i !== null; ) (i.gS(true), (i = i.findTreeParentNode()));
    let e = null;
    for (i = t; i !== null; ) {
      if (i.JD()) {
        e = i;
        break;
      }
      i = i.findTreeParentNode();
    }
    for (i = this; i !== null; ) (i.gS(false), (i = i.findTreeParentNode()));
    return e;
  }
  findTreeParentLink() {
    let t = true;
    const i = this.diagram;
    i !== null && (t = i.isTreePathToChildren);
    const e = this.ri.iterator;
    if (t)
      for (; e.next(); ) {
        const s = e.value;
        if (s.isTreeLink && s.fromNode !== this) return s;
      }
    else
      for (; e.next(); ) {
        const s = e.value;
        if (s.isTreeLink && s.toNode !== this) return s;
      }
    return null;
  }
  findTreeParentNode() {
    const t = this.Bh;
    if (t === null) return null;
    if (t instanceof Node) return t;
    const i = this.diagram,
      e = i !== null ? i.isTreePathToChildren : true,
      s = this.ri.iterator;
    for (; s.next(); ) {
      const n = s.value;
      if (!n.isTreeLink) continue;
      const o = e ? n.fromNode : n.toNode;
      if (o !== this) return ((this.Bh = o), o);
    }
    return ((this.Bh = null), null);
  }
  findTreeParentChain(t) {
    function i(e, s) {
      s.add(e);
      const n = e.findTreeParentLink();
      if (n !== null) {
        s.add(n);
        const o = e.findTreeParentNode();
        if (o === null) return;
        i(o, s);
      }
    }
    return (t === void 0 && (t = new GSet()), i(this, t), t);
  }
  findTreeLevel() {
    return this.D3(this);
  }
  D3(t) {
    let i = 0,
      e = t.findTreeParentNode();
    for (; e !== null && e !== t; ) ((e = e.findTreeParentNode()), i++);
    return i;
  }
  findTreeChildrenLinks() {
    let t = true;
    const i = this.diagram;
    i !== null && (t = i.isTreePathToChildren);
    const e = new ListIterator(this.ri),
      s = this;
    return (
      t
        ? (e.predicate = (n) => !(!n.isTreeLink || n.fromNode !== s))
        : (e.predicate = (n) => !(!n.isTreeLink || n.toNode !== s)),
      e
    );
  }
  findTreeChildrenNodes() {
    let t = true;
    const i = this.diagram;
    i !== null && (t = i.isTreePathToChildren);
    let e = null,
      s = null;
    const n = this.ri.iterator;
    if (t)
      for (; n.next(); ) {
        const o = n.value;
        if (o.isTreeLink && o.fromNode === this) {
          const r = o.toNode;
          e !== null ? e.add(r) : s !== null && s !== r ? ((e = new List()), e.add(s), e.add(r)) : (s = r);
        }
      }
    else
      for (; n.next(); ) {
        const o = n.value;
        if (o.isTreeLink && o.toNode === this) {
          const r = o.fromNode;
          e !== null ? e.add(r) : s !== null && s !== r ? ((e = new List()), e.add(s), e.add(r)) : (s = r);
        }
      }
    return e !== null ? e.iterator : s !== null ? new SingletonIterator(s) : EmptyIterator.instance;
  }
  findTreeParts(t, i) {
    return (
      t === void 0 && (t = 1 / 0),
      U.i(t, "number", Node, "findTreeParts:level"),
      i === void 0 && (i = new GSet()),
      Part.bh(i, this, false, t, true),
      i
    );
  }
  collapseTree(t) {
    (t === void 0 && (t = 1), U.r(t, Node, "collapseTree:level"), t < 1 && (t = 1));
    const i = this.diagram;
    if (i === null || i.isCollapsingExpanding) return;
    i.isCollapsingExpanding = true;
    const e = new GSet();
    (e.add(this),
      this.oF(e, i.isTreePathToChildren, t, i, this, i.treeCollapsePolicy === 1),
      (i.isCollapsingExpanding = false));
  }
  oF(t, i, e, s, n, o) {
    if (e > 1) {
      const r = i ? this.findLinksOutOf() : this.findLinksInto();
      for (; r.next(); ) {
        const l = r.value;
        if (!l.isTreeLink) continue;
        const h = l.getOtherNode(this);
        h !== null && h !== this && !t.has(h) && (t.add(h), h.oF(t, i, e - 1, s, n, o));
      }
    } else this.rF(t, i, s, n, o);
  }
  rF(t, i, e, s, n) {
    const o = s === this ? true : this.isTreeExpanded,
      r = i ? this.findLinksOutOf() : this.findLinksInto();
    for (; r.next(); ) {
      const l = r.value;
      if (!l.isTreeLink) continue;
      const h = l.getOtherNode(this);
      if (h !== null && h !== this) {
        const a = t.has(h);
        if ((a || t.add(h), o)) {
          const f = i ? h.findNodesInto() : h.findNodesOutOf(),
            c = this;
          (f.all((u) => u === c || !u.isTreeExpanded) && e.$f(h, s), h.Lh(), h.Hi(false));
        }
        h.isTreeExpanded && ((h.wasTreeExpanded = h.isTreeExpanded), a || h.rF(t, i, e, s, n));
      }
    }
    this.isTreeExpanded = false;
  }
  expandTree(t) {
    (t === void 0 && (t = 2), U.r(t, Node, "expandTree:level"), t < 2 && (t = 2));
    const i = this.diagram;
    if (i === null || i.isCollapsingExpanding) return;
    i.isCollapsingExpanding = true;
    const e = new GSet();
    (e.add(this),
      this.lF(e, i.isTreePathToChildren, t, i, this, i.treeCollapsePolicy === 1),
      (i.isCollapsingExpanding = false));
  }
  lF(t, i, e, s, n, o) {
    const r = n === this ? false : this.isTreeExpanded,
      l = i ? this.findLinksOutOf() : this.findLinksInto();
    for (; l.next(); ) {
      const h = l.value;
      if (!h.isTreeLink) continue;
      r || h.Ve || h.ii();
      const a = h.getOtherNode(this);
      if (a !== null && a !== this && !t.has(a)) {
        if ((t.add(a), !r)) {
          (a.Hi(true), a.Lh());
          const f = i ? a.findNodesInto() : a.findNodesOutOf(),
            c = this;
          f.all((u) => u === c || !u.isTreeExpanded) && s.Jf(a, n);
        }
        (e > 2 || a.wasTreeExpanded) && ((a.wasTreeExpanded = false), a.lF(t, i, e - 1, s, n, o));
      }
    }
    this.isTreeExpanded = true;
  }
  get isTreeExpanded() {
    return (this.z & 1) !== 0;
  }
  set isTreeExpanded(t) {
    const i = (this.z & 1) !== 0;
    if (i !== t) {
      (Debug && U.i(t, "boolean", Node, "isTreeExpanded"), (this.z = this.z ^ 1));
      const e = this.diagram;
      this.t("isTreeExpanded", i, t);
      const s = this.treeExpandedChanged;
      if (s !== null) {
        let n = true;
        (e !== null && ((n = e.H), (e.H = true)), s(this), e !== null && (e.H = n));
      }
      if (e !== null && e.undoManager.isUndoingRedoing) {
        this.Hi(t);
        return;
      }
      t ? this.expandTree() : this.collapseTree();
    }
  }
  get wasTreeExpanded() {
    return (this.z & 2) !== 0;
  }
  set wasTreeExpanded(t) {
    const i = (this.z & 2) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", Node, "wasTreeExpanded"), (this.z = this.z ^ 2), this.t("wasTreeExpanded", i, t));
  }
  get treeExpandedChanged() {
    return this.Vt !== null ? this.Vt.Wy : null;
  }
  set treeExpandedChanged(t) {
    const i = this.treeExpandedChanged;
    i !== t &&
      (t !== null && U.C(t, Node, "treeExpandedChanged"), (this.Pl().Wy = t), this.t("treeExpandedChanged", i, t));
  }
  get isTreeLeaf() {
    return (this.z & 4) !== 0;
  }
  set isTreeLeaf(t) {
    const i = (this.z & 4) !== 0;
    i !== t && (Debug && U.i(t, "boolean", Node, "isTreeLeaf"), (this.z = this.z ^ 4), this.t("isTreeLeaf", i, t));
  }
  get isTreeRoot() {
    return this.findTreeParentLink() === null;
  }
}
