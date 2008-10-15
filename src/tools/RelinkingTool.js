class RelinkingTool extends LinkingBaseTool {
  DT = null;
  FT = null;
  HP = null;
  vP = null;
  As;
  WP;
  constructor(t) {
    (super(),
      (this.name = "Relinking"),
      (this.fromHandleArchetype = new Shape("Diamond", {
        desiredSize: Size.Tu,
        fill: "lightblue",
        stroke: "dodgerblue",
        cursor: this.linkingCursor,
        segmentIndex: 0,
      })
        .theme("fill", "adornmentFill")
        .theme("stroke", "adornmentStroke")),
      (this.toHandleArchetype = new Shape("Diamond", {
        desiredSize: Size.Tu,
        fill: "lightblue",
        stroke: "dodgerblue",
        cursor: this.linkingCursor,
        segmentIndex: -1,
      })
        .theme("fill", "adornmentFill")
        .theme("stroke", "adornmentStroke")),
      (this.As = null),
      (this.WP = new Rect()),
      t && Object.assign(this, t));
  }
  updateAdornments(t) {
    if (t === null || !(t instanceof Link)) return;
    let i = "RelinkFrom",
      e = null;
    if (t.isSelected && !this.diagram.isReadOnly) {
      const s = t.selectionObject;
      s !== null &&
        t.canRelinkFrom() &&
        t.actualBounds.isReal() &&
        t.isVisible() &&
        s.actualBounds.isReal() &&
        s.isVisibleObject() &&
        ((e = t.findAdornment(i)), e === null && ((e = this.makeAdornment(s, !1)), t.addAdornment(i, e)));
    }
    if ((e === null && t.removeAdornment(i), (i = "RelinkTo"), (e = null), t.isSelected && !this.diagram.isReadOnly)) {
      const s = t.selectionObject;
      s !== null &&
        t.canRelinkTo() &&
        t.actualBounds.isReal() &&
        t.isVisible() &&
        s.actualBounds.isReal() &&
        s.isVisibleObject() &&
        ((e = t.findAdornment(i)), e === null ? ((e = this.makeAdornment(s, !0)), t.addAdornment(i, e)) : e.g());
    }
    e === null && t.removeAdornment(i);
  }
  makeAdornment(t, i) {
    let e = i ? this.vP : this.HP;
    return (e && ((e = e.copy()), (e.adornedObject = t)), e);
  }
  get fromHandleArchetype() {
    return this.DT;
  }
  set fromHandleArchetype(t) {
    (t !== null && U.s(t, GraphObject, RelinkingTool, "fromHandleArchetype"),
      (this.DT = t),
      t !== null ? (this.HP = new Adornment(Panel.Link).add(t).Yt()) : (this.HP = null));
  }
  get toHandleArchetype() {
    return this.FT;
  }
  set toHandleArchetype(t) {
    (t !== null && U.s(t, GraphObject, RelinkingTool, "toHandleArchetype"),
      (this.FT = t),
      t !== null ? (this.vP = new Adornment(Panel.Link).add(t).Yt()) : (this.vP = null));
  }
  get handle() {
    return this.As;
  }
  set handle(t) {
    (t !== null &&
      (U.s(t, GraphObject, RelinkingTool, "handle"),
      t.part instanceof Adornment || U.n("new handle is not in an Adornment: " + t)),
      (this.As = t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    if (t.isReadOnly || t.isModelReadOnly || !t.allowRelink || !t.model.Rx() || !t.lastInput.left) return !1;
    let e = this.findToolHandleAt(t.firstInput.documentPoint, "RelinkFrom");
    return (e === null && (e = this.findToolHandleAt(t.firstInput.documentPoint, "RelinkTo")), e !== null);
  }
  doActivate() {
    const t = this.diagram;
    if (this.originalLink === null) {
      let e = this.handle;
      if (
        (e === null &&
          ((e = this.findToolHandleAt(t.firstInput.documentPoint, "RelinkFrom")),
          e === null && (e = this.findToolHandleAt(t.firstInput.documentPoint, "RelinkTo"))),
        e === null)
      )
        return;
      const s = e.part;
      if (!(s instanceof Adornment) || !(s.adornedPart instanceof Link)) return;
      ((this.handle = e),
        (this.isForwards = s === null || s.category === "RelinkTo"),
        (this.originalLink = s.adornedPart));
    }
    const i = this.originalLink;
    i !== null &&
      (this.startTransaction(this.name),
      (t.isMouseCaptured = !0),
      (t.currentCursor = this.linkingCursor),
      (this.originalFromPort = i.fromPort),
      (this.originalFromNode = i.fromNode),
      (this.originalToPort = i.toPort),
      (this.originalToNode = i.toNode),
      this.WP.set(i.actualBounds),
      i.pointsCount > 0 &&
        (i.fromNode === null &&
          (this.temporaryFromPort !== null && (this.temporaryFromPort.desiredSize = Size.sa),
          this.temporaryFromNode !== null && (this.temporaryFromNode.location = i.getPoint(0))),
        i.toNode === null &&
          (this.temporaryToPort !== null && (this.temporaryToPort.desiredSize = Size.sa),
          this.temporaryToNode !== null && (this.temporaryToNode.location = i.getPoint(i.pointsCount - 1)))),
      this.copyPortProperties(
        this.originalFromNode,
        this.originalFromPort,
        this.temporaryFromNode,
        this.temporaryFromPort,
        !1,
      ),
      this.copyPortProperties(this.originalToNode, this.originalToPort, this.temporaryToNode, this.temporaryToPort, !0),
      t.add(this.temporaryFromNode),
      t.add(this.temporaryToNode),
      this.temporaryLink !== null &&
        (this.temporaryFromNode !== null && (this.temporaryLink.fromNode = this.temporaryFromNode),
        this.temporaryToNode !== null && (this.temporaryLink.toNode = this.temporaryToNode),
        this.copyLinkProperties(i, this.temporaryLink),
        this.temporaryLink.ii(),
        t.add(this.temporaryLink)),
      (this.isActive = !0));
  }
  copyLinkProperties(t, i) {
    if (t === null || i === null) return;
    ((i.adjusting = t.adjusting), (i.corner = t.corner));
    let e = t.curve;
    ((e === 11 || e === 10) && (e = 0),
      (i.curve = e),
      (i.curviness = t.curviness),
      (i.isTreeLink = t.isTreeLink),
      (i.points = t.points),
      (i.routing = t.routing),
      (i.smoothness = t.smoothness),
      (i.fromSpot = t.fromSpot),
      (i.fromEndSegmentLength = t.fromEndSegmentLength),
      (i.fromShortLength = t.fromShortLength),
      (i.toSpot = t.toSpot),
      (i.toEndSegmentLength = t.toEndSegmentLength),
      (i.toShortLength = t.toShortLength));
  }
  doDeactivate() {
    this.isActive = !1;
    const t = this.diagram;
    (t.remove(this.temporaryLink),
      t.remove(this.temporaryFromNode),
      t.remove(this.temporaryToNode),
      (t.isMouseCaptured = !1),
      (t.currentCursor = ""),
      this.stopTransaction());
  }
  doStop() {
    (super.doStop(), (this.handle = null));
  }
  doMouseUp() {
    if (this.isActive) {
      const t = this.diagram;
      this.transactionResult = null;
      let i = this.originalFromNode,
        e = this.originalFromPort,
        s = this.originalToNode,
        n = this.originalToPort,
        o = this.originalLink;
      try {
        if (((this.targetPort = this.findTargetPort(this.isForwards)), this.targetPort !== null)) {
          const r = this.targetPort.part;
          r instanceof Node && (this.isForwards ? ((s = r), (n = this.targetPort)) : ((i = r), (e = this.targetPort)));
        } else
          this.isUnconnectedLinkValid
            ? this.isForwards
              ? ((s = null), (n = null))
              : ((i = null), (e = null))
            : (o = null);
        (o !== null
          ? (this.reconnectLink(o, this.isForwards ? s : i, this.isForwards ? n : e, this.isForwards),
            this.targetPort === null &&
              (this.isForwards
                ? (o.defaultToPoint = t.lastInput.documentPoint)
                : (o.defaultFromPoint = t.lastInput.documentPoint),
              o.ii()),
            (this.transactionResult = this.name),
            t.F("LinkRelinked", o, this.isForwards ? this.originalToPort : this.originalFromPort))
          : this.originalLink !== null && this.doNoRelink(this.originalLink, this.isForwards),
          this.originalLink !== null && this.originalLink.invalidateOtherJumpOvers(this.WP));
      } finally {
        this.stopTool();
      }
    }
  }
  reconnectLink(t, i, e, s) {
    const n = e !== null && e.portId !== null ? e.portId : "";
    return (s ? ((t.toNode = i), (t.toPortId = n)) : ((t.fromNode = i), (t.fromPortId = n)), !0);
  }
  doNoRelink(t, i) {}
  doDraggingMouseMove(t, i, e, s) {
    (t !== null
      ? (this.copyPortProperties(t, i, this.temporaryFromNode, this.temporaryFromPort, !1),
        this.diagram.add(this.temporaryFromNode))
      : this.diagram.remove(this.temporaryFromNode),
      e !== null
        ? (this.copyPortProperties(e, s, this.temporaryToNode, this.temporaryToPort, !0),
          this.diagram.add(this.temporaryToNode))
        : this.diagram.remove(this.temporaryToNode));
  }
  stopDraggingMouseMove() {
    (this.diagram.remove(this.temporaryFromNode), this.diagram.remove(this.temporaryToNode));
  }
}
var ReshapingBehavior = ((w) => (
  (w[(w.None = 0)] = "None"),
  (w[(w.Horizontal = 1)] = "Horizontal"),
  (w[(w.Vertical = 2)] = "Vertical"),
  (w[(w.All = 3)] = "All"),
  w
))(ReshapingBehavior || {});
