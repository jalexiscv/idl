class LinkingBaseTool extends Tool {
  TP;
  LP;
  Kl;
  DP;
  FP;
  aa;
  IP;
  fa;
  RP;
  OP;
  EP;
  VP;
  BP;
  zP;
  AT;
  XP;
  Ul;
  YP;
  constructor() {
    (super(),
      (this.TP = 100),
      (this.LP = !1),
      (this.Kl = "pointer"),
      (this.DP = new Link({ layerName: "Tool" })
        .add(
          new Shape({ isPanelMain: !0, stroke: "blue" }).theme("stroke", "tempLink"),
          new Shape({ toArrow: "Standard", fill: "blue", stroke: "blue" })
            .theme("fill", "tempLink")
            .theme("stroke", "tempLink"),
        )
        .Yt()),
      (this.aa = new Shape("Rectangle", {
        portId: "",
        fill: null,
        stroke: "magenta",
        strokeWidth: 2,
        desiredSize: Size.Rk,
      }).theme("stroke", "tempPort")),
      (this.FP = new Node({ selectable: !1, layerName: "Tool" }).add(this.aa).Yt()),
      (this.fa = new Shape("Rectangle", {
        portId: "",
        fill: null,
        stroke: "magenta",
        strokeWidth: 2,
        desiredSize: Size.Rk,
      }).theme("stroke", "tempPort")),
      (this.IP = new Node({ selectable: !1, layerName: "Tool" }).add(this.fa).Yt()),
      (this.RP = null),
      (this.OP = null),
      (this.EP = null),
      (this.VP = null),
      (this.BP = null),
      (this.zP = !0),
      (this.AT = new GMap()),
      (this.XP = null),
      (this.Ul = null),
      (this.YP = null));
  }
  doStop() {
    (this.diagram.stopAutoScroll(),
      (this.originalLink = null),
      (this.originalFromNode = null),
      (this.originalFromPort = null),
      (this.originalToNode = null),
      (this.originalToPort = null),
      this.validPortsCache.clear(),
      (this.targetPort = null));
  }
  get portGravity() {
    return this.TP;
  }
  set portGravity(t) {
    (U.i(t, "number", LinkingBaseTool, "portGravity"), t >= 0 && (this.TP = t));
  }
  get isUnconnectedLinkValid() {
    return this.LP;
  }
  set isUnconnectedLinkValid(t) {
    (U.i(t, "boolean", LinkingBaseTool, "isUnconnectedLinkValid"), (this.LP = t));
  }
  get linkingCursor() {
    return this.Kl;
  }
  set linkingCursor(t) {
    this.Kl = t;
  }
  get temporaryLink() {
    return this.DP;
  }
  set temporaryLink(t) {
    (U.s(t, Link, LinkingBaseTool, "temporaryLink"), t.Yt(), (this.DP = t));
  }
  get temporaryFromNode() {
    return this.FP;
  }
  set temporaryFromNode(t) {
    (U.s(t, Node, LinkingBaseTool, "temporaryFromNode"), t.Yt(), (this.FP = t), t && (this.aa = t.port));
  }
  get temporaryFromPort() {
    return this.aa;
  }
  set temporaryFromPort(t) {
    if ((U.s(t, GraphObject, LinkingBaseTool, "temporaryFromPort"), this.aa !== null)) {
      const i = this.aa.panel;
      if (i !== null) {
        const e = i.O.indexOf(this.aa);
        (i.removeAt(e), i.insertAt(e, t));
      }
    }
    this.aa = t;
  }
  get temporaryToNode() {
    return this.IP;
  }
  set temporaryToNode(t) {
    (U.s(t, Node, LinkingBaseTool, "temporaryToNode"), t.Yt(), (this.IP = t), t && (this.fa = t.port));
  }
  get temporaryToPort() {
    return this.fa;
  }
  set temporaryToPort(t) {
    if ((U.s(t, GraphObject, LinkingBaseTool, "temporaryToPort"), this.fa !== null)) {
      const i = this.fa.panel;
      if (i !== null) {
        const e = i.O.indexOf(this.fa);
        (i.removeAt(e), i.insertAt(e, t));
      }
    }
    this.fa = t;
  }
  get originalLink() {
    return this.RP;
  }
  set originalLink(t) {
    (t !== null && U.s(t, Link, LinkingBaseTool, "originalLink"), (this.RP = t));
  }
  get originalFromNode() {
    return this.OP;
  }
  set originalFromNode(t) {
    (t !== null && U.s(t, Node, LinkingBaseTool, "originalFromNode"), (this.OP = t));
  }
  get originalFromPort() {
    return this.EP;
  }
  set originalFromPort(t) {
    (t !== null && U.s(t, GraphObject, LinkingBaseTool, "originalFromPort"), (this.EP = t));
  }
  get originalToNode() {
    return this.VP;
  }
  set originalToNode(t) {
    (t !== null && U.s(t, Node, LinkingBaseTool, "originalToNode"), (this.VP = t));
  }
  get originalToPort() {
    return this.BP;
  }
  set originalToPort(t) {
    (t !== null && U.s(t, GraphObject, LinkingBaseTool, "originalToPort"), (this.BP = t));
  }
  get isForwards() {
    return this.zP;
  }
  set isForwards(t) {
    this.zP = t;
  }
  get validPortsCache() {
    return this.AT;
  }
  get targetPort() {
    return this.XP;
  }
  set targetPort(t) {
    (t !== null && U.s(t, GraphObject, LinkingBaseTool, "targetPort"), (this.XP = t));
  }
  copyPortProperties(t, i, e, s, n) {
    if (t === null || i === null || e === null || s === null) return;
    const o = i.getDocumentScale(),
      r = Size.a();
    ((r.width = i.naturalBounds.width * o),
      (r.height = i.naturalBounds.height * o),
      (s.desiredSize = r),
      Size.o(r),
      n
        ? ((s.toSpot = i.toSpot), (s.toEndSegmentLength = i.toEndSegmentLength))
        : ((s.fromSpot = i.fromSpot), (s.fromEndSegmentLength = i.fromEndSegmentLength)),
      (e.locationSpot = Spot.Center));
    const l = Point.a();
    ((e.location = i.getDocumentPoint(Spot.Center, l)),
      Point.o(l),
      (s.angle = i.getDocumentAngle()),
      this.portTargeted !== null && this.portTargeted(t, i, e, s, n));
  }
  setNoTargetPortProperties(t, i, e) {
    (i !== null && ((i.desiredSize = Size.Rk), (i.fromSpot = Spot.None), (i.toSpot = Spot.None)),
      t !== null && (t.location = this.diagram.lastInput.documentPoint),
      this.portTargeted !== null && this.portTargeted(null, null, t, i, e));
  }
  doMouseDown() {
    this.isActive && this.doMouseMove();
  }
  doMouseMove() {
    if (this.isActive) {
      const t = this.diagram;
      if (
        ((this.targetPort = this.findTargetPort(this.isForwards)),
        this.targetPort !== null && this.targetPort.part instanceof Node)
      ) {
        const i = this.targetPort.part;
        this.isForwards
          ? this.copyPortProperties(i, this.targetPort, this.temporaryToNode, this.temporaryToPort, !0)
          : this.copyPortProperties(i, this.targetPort, this.temporaryFromNode, this.temporaryFromPort, !1);
      } else
        this.isForwards
          ? this.setNoTargetPortProperties(this.temporaryToNode, this.temporaryToPort, !0)
          : this.setNoTargetPortProperties(this.temporaryFromNode, this.temporaryFromPort, !1);
      (t.allowHorizontalScroll || t.allowVerticalScroll) && t.doAutoScroll(t.lastInput.viewPoint);
    }
  }
  findValidLinkablePort(t, i) {
    if (t === null) return null;
    const e = t.part;
    if (!(e instanceof Node)) return null;
    for (; t !== null; ) {
      const s = i ? t.toLinkable : t.fromLinkable;
      if (s === !0 && (t.portId !== null || t instanceof Node) && (i ? this.isValidTo(e, t) : this.isValidFrom(e, t)))
        return t;
      if (s === !1) return null;
      t = t.panel;
    }
    return null;
  }
  findTargetPort(t) {
    const i = this.diagram,
      e = i.lastInput.documentPoint;
    let s = this.portGravity;
    const n = i.findObjectsNear(e, s, (h) => this.findValidLinkablePort(h, t), null, !0);
    let o = 1 / 0,
      r = null;
    const l = n.iterator;
    for (; l.next(); ) {
      const h = l.value,
        a = h.part;
      if (!(a instanceof Node)) continue;
      const f = h.getDocumentPoint(Spot.Center, Point.a()),
        c = e.x - f.x,
        u = e.y - f.y;
      Point.o(f);
      const d = c * c + u * u;
      if (d < o) {
        const m = this.validPortsCache.get(h);
        m !== null
          ? m && ((r = h), (o = d))
          : (t && this.isValidLink(this.originalFromNode, this.originalFromPort, a, h)) ||
              (!t && this.isValidLink(a, h, this.originalToNode, this.originalToPort))
            ? (this.validPortsCache.set(h, !0), (r = h), (o = d))
            : this.validPortsCache.set(h, !1);
      }
    }
    if (r !== null) {
      const h = r.part;
      if (h instanceof Node && (h.layer === null || h.layer.allowLink)) return r;
    }
    return null;
  }
  isValidFrom(t, i) {
    if (t === null || i === null) return this.isUnconnectedLinkValid;
    if (this.diagram.currentTool === this && ((t.layer !== null && !t.layer.allowLink) || i.fromLinkable !== !0))
      return !1;
    const e = i.fromMaxLinks;
    if (e < 1 / 0) {
      if (this.originalLink !== null && t === this.originalFromNode && i === this.originalFromPort) return !0;
      let s = i.portId;
      if ((s === null && (s = ""), t.findLinksOutOf(s).count >= e)) return !1;
    }
    return !0;
  }
  isValidTo(t, i) {
    if (t === null || i === null) return this.isUnconnectedLinkValid;
    if (this.diagram.currentTool === this && ((t.layer !== null && !t.layer.allowLink) || i.toLinkable !== !0))
      return !1;
    const e = i.toMaxLinks;
    if (e < 1 / 0) {
      if (this.originalLink !== null && t === this.originalToNode && i === this.originalToPort) return !0;
      let s = i.portId;
      if ((s === null && (s = ""), t.findLinksInto(s).count >= e)) return !1;
    }
    return !0;
  }
  isInSameNode(t, i) {
    if (t === null || i === null) return !1;
    if (t === i) return !0;
    const e = t.part,
      s = i.part;
    return e !== null && e === s;
  }
  isLinked(t, i) {
    if (t === null || i === null) return !1;
    const e = t.part;
    if (!(e instanceof Node)) return !1;
    let s = t.portId;
    s === null && (s = "");
    const n = i.part;
    if (!(n instanceof Node)) return !1;
    let o = i.portId;
    o === null && (o = "");
    const r = n.findLinksInto(o);
    for (; r.next(); ) {
      const l = r.value;
      if (l.fromNode === e && l.fromPortId === s) return !0;
    }
    return !1;
  }
  isValidLink(t, i, e, s) {
    if (
      !this.isValidFrom(t, i) ||
      !this.isValidTo(e, s) ||
      (i !== null &&
        s !== null &&
        ((!(i.fromLinkableSelfNode && s.toLinkableSelfNode) && this.isInSameNode(i, s)) ||
          (!(i.fromLinkableDuplicates && s.toLinkableDuplicates) && this.isLinked(i, s)))) ||
      (this.originalLink !== null &&
        ((t !== null && this.isLabelDependentOnLink(t, this.originalLink)) ||
          (e !== null && this.isLabelDependentOnLink(e, this.originalLink)))) ||
      (t !== null && e !== null && ((t.data === null && e.data !== null) || (t.data !== null && e.data === null))) ||
      !this.isValidCycle(t, e, this.originalLink)
    )
      return !1;
    let n;
    return (t !== null && i !== null && ((n = t.linkValidation), n !== null && !n(t, i, e, s, this.originalLink))) ||
      (e !== null && s !== null && ((n = e.linkValidation), n !== null && !n(t, i, e, s, this.originalLink)))
      ? !1
      : ((n = this.linkValidation), n !== null ? n(t, i, e, s, this.originalLink) : !0);
  }
  isLabelDependentOnLink(t, i) {
    if (t === null) return !1;
    const e = t.labeledLink;
    if (e === null) return !1;
    if (e === i) return !0;
    const s = new GSet();
    return (s.add(t), this.KP(e, i, s));
  }
  KP(t, i, e) {
    if (t === i) return !0;
    const s = t.fromNode;
    if (s !== null && s.labeledLink && (e.add(s), this.KP(s.labeledLink, i, e))) return !0;
    const n = t.toNode;
    return !!(n !== null && n.labeledLink && (e.add(n), this.KP(n.labeledLink, i, e)));
  }
  isValidCycle(t, i, e) {
    if ((e === void 0 && (e = null), t === null || i === null)) return this.isUnconnectedLinkValid;
    const s = this.diagram;
    let n = 1;
    if ((s && (s.model.Ix() ? (n = s.isTreePathToChildren ? 5 : 6) : (n = s.validCycle)), n === 1)) return !0;
    if (n === 5) {
      const o = e || this.temporaryLink;
      if (o !== null && !o.isTreeLink) return !0;
      const r = i.linksConnected;
      for (; r.next(); ) {
        const l = r.value;
        if (l !== e && l.isTreeLink && l.toNode === i) return !1;
      }
      return !this.Gu(t, i, e, !0);
    } else if (n === 6) {
      const o = e || this.temporaryLink;
      if (o !== null && !o.isTreeLink) return !0;
      const r = t.linksConnected;
      for (; r.next(); ) {
        const l = r.value;
        if (l !== e && l.isTreeLink && l.fromNode === t) return !1;
      }
      return !this.Gu(t, i, e, !0);
    } else {
      if (n === 2) return !this.NR(t, i, e);
      if (n === 3) return !this.Gu(t, i, e, !1);
      if (n === 4) return !this.CR(t, i, e);
    }
    return !0;
  }
  Gu(t, i, e, s) {
    if (t === i) return !0;
    if (t === null || i === null) return !1;
    const n = t.linksConnected;
    for (; n.next(); ) {
      const o = n.value;
      if (o === e || (s && !o.isTreeLink) || o.toNode !== t) continue;
      const r = o.fromNode;
      if (!(r === t || r === null) && this.Gu(r, i, e, s)) return !0;
    }
    return !1;
  }
  NR(t, i, e) {
    if (t === i) return !0;
    const s = new Set();
    return (s.add(i), this.TT(s, t, i, e));
  }
  TT(t, i, e, s) {
    if (i === e) return !0;
    if (i === null || e === null || t.has(i)) return !1;
    t.add(i);
    const n = i.linksConnected;
    for (; n.next(); ) {
      const o = n.value;
      if (o === s || o.toNode !== i) continue;
      const r = o.fromNode;
      if (!(r === i || r === null) && this.TT(t, r, e, s)) return !0;
    }
    return !1;
  }
  CR(t, i, e) {
    if (t === i) return !0;
    const s = new Set();
    return (s.add(i), this.LT(s, t, i, e));
  }
  LT(t, i, e, s) {
    if (i === e) return !0;
    if (i === null || e === null || t.has(i)) return !1;
    t.add(i);
    const n = i.linksConnected;
    for (; n.next(); ) {
      const o = n.value;
      if (o === s) continue;
      const r = o.fromNode,
        l = o.toNode,
        h = r === i ? l : r;
      if (!(h === i || h === null) && this.LT(t, h, e, s)) return !0;
    }
    return !1;
  }
  get linkValidation() {
    return this.Ul;
  }
  set linkValidation(t) {
    (t !== null && U.C(t, LinkingBaseTool, "linkValidation"), (this.Ul = t));
  }
  get portTargeted() {
    return this.YP;
  }
  set portTargeted(t) {
    (t !== null && U.C(t, LinkingBaseTool, "portTargeted"), (this.YP = t));
  }
}
var LinkingDirection = ((w) => (
  (w[(w.Either = 1)] = "Either"),
  (w[(w.ForwardsOnly = 2)] = "ForwardsOnly"),
  (w[(w.BackwardsOnly = 3)] = "BackwardsOnly"),
  w
))(LinkingDirection || {});
