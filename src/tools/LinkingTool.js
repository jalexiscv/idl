class LinkingTool extends LinkingBaseTool {
  UP;
  GP;
  N;
  qP;
  constructor(t) {
    (super(),
      (this.name = "Linking"),
      (this.UP = {}),
      (this.GP = null),
      (this.N = 1),
      (this.qP = null),
      t && Object.assign(this, t));
  }
  static Either = 1;
  static ForwardsOnly = 2;
  static BackwardsOnly = 3;
  get archetypeLinkData() {
    return this.UP;
  }
  set archetypeLinkData(t) {
    (t !== null && U.Ro(t, LinkingTool, "archetypeLinkData"),
      t instanceof GraphObject && U.s(t, Link, LinkingTool, "archetypeLinkData"),
      (this.UP = t));
  }
  get archetypeLabelNodeData() {
    return this.GP;
  }
  set archetypeLabelNodeData(t) {
    (t !== null && U.Ro(t, LinkingTool, "archetypeLabelNodeData"),
      t instanceof GraphObject && U.s(t, Node, LinkingTool, "archetypeLabelNodeData"),
      (this.GP = t));
  }
  get direction() {
    return this.N;
  }
  set direction(t) {
    (U.W(t, LinkingDirection, "LinkingDirection"), (this.N = t));
  }
  get startObject() {
    return this.qP;
  }
  set startObject(t) {
    (t !== null && U.s(t, GraphObject, LinkingTool, "startObject"), (this.qP = t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    return t.isReadOnly ||
      t.isModelReadOnly ||
      !t.allowLink ||
      !t.model.Rx() ||
      !t.lastInput.left ||
      (t.currentTool !== this && !this.isBeyondDragSize())
      ? !1
      : this.findLinkablePort() !== null;
  }
  findLinkablePort() {
    const t = this.diagram;
    let i = this.startObject;
    if ((i === null && (i = t.findObjectAt(t.firstInput.documentPoint, null, null)), i === null)) return null;
    const e = i.part;
    if (!(e instanceof Node)) return null;
    const s = this.direction;
    if (s === 1 || s === 2) {
      const n = this.findValidLinkablePort(i, !1);
      if (n !== null) return ((this.isForwards = !0), n);
      if (this.startObject === e) {
        const o = e.port;
        if (this.findValidLinkablePort(o, !1)) return ((this.isForwards = !0), o);
      }
    }
    if (s === 1 || s === 3) {
      const n = this.findValidLinkablePort(i, !0);
      if (n !== null) return ((this.isForwards = !1), n);
      if (this.startObject === e) {
        const o = e.port;
        if (this.findValidLinkablePort(o, !0)) return ((this.isForwards = !1), o);
      }
    }
    return null;
  }
  doActivate() {
    const t = this.diagram,
      i = this.findLinkablePort();
    if (i === null) {
      this.stopTool();
      return;
    }
    if (
      (this.startTransaction(this.name),
      (t.isMouseCaptured = !0),
      (t.currentCursor = this.linkingCursor),
      this.isForwards)
    ) {
      (this.temporaryToNode !== null && (this.temporaryToNode.location = t.lastInput.documentPoint),
        (this.originalFromPort = i));
      const e = this.originalFromPort.part;
      (e instanceof Node && (this.originalFromNode = e),
        this.copyPortProperties(
          this.originalFromNode,
          this.originalFromPort,
          this.temporaryFromNode,
          this.temporaryFromPort,
          !1,
        ));
    } else {
      (this.temporaryFromNode !== null && (this.temporaryFromNode.location = t.lastInput.documentPoint),
        (this.originalToPort = i));
      const e = this.originalToPort.part;
      (e instanceof Node && (this.originalToNode = e),
        this.copyPortProperties(
          this.originalToNode,
          this.originalToPort,
          this.temporaryToNode,
          this.temporaryToPort,
          !0,
        ));
    }
    (t.add(this.temporaryFromNode),
      this.temporaryFromNode && this.temporaryFromNode.ensureBounds(),
      t.add(this.temporaryToNode),
      this.temporaryToNode && this.temporaryToNode.ensureBounds(),
      this.temporaryLink !== null &&
        (this.temporaryFromNode !== null && (this.temporaryLink.fromNode = this.temporaryFromNode),
        this.temporaryToNode !== null && (this.temporaryLink.toNode = this.temporaryToNode),
        (this.temporaryLink.isTreeLink = this.isNewTreeLink()),
        this.temporaryLink.ii(),
        t.add(this.temporaryLink)),
      (this.isActive = !0));
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
    (super.doStop(), (this.startObject = null));
  }
  doMouseUp() {
    if (this.isActive) {
      const t = this.diagram;
      this.transactionResult = null;
      let i = null,
        e = null,
        s = null,
        n = null,
        o = null;
      try {
        this.targetPort = this.findTargetPort(this.isForwards);
        const r = this.targetPort;
        if (r !== null) {
          const l = r.part;
          l instanceof Node &&
            (this.isForwards
              ? (this.originalFromNode !== null && ((i = this.originalFromNode), (e = this.originalFromPort)),
                (s = l),
                (n = r))
              : ((i = l),
                (e = r),
                this.originalToNode !== null && ((s = this.originalToNode), (n = this.originalToPort))));
        } else
          this.isForwards
            ? this.originalFromNode !== null &&
              this.isUnconnectedLinkValid &&
              ((i = this.originalFromNode), (e = this.originalFromPort))
            : this.originalToNode !== null &&
              this.isUnconnectedLinkValid &&
              ((s = this.originalToNode), (n = this.originalToPort));
        i !== null || s !== null
          ? ((o = this.insertLink(i, e, s, n)),
            o !== null
              ? (r === null &&
                  (this.isForwards
                    ? (o.defaultToPoint = t.lastInput.documentPoint)
                    : (o.defaultFromPoint = t.lastInput.documentPoint)),
                t.allowSelect && (t.F("ChangingSelection", t.selection), t.clearSelection(!0), (o.isSelected = !0)),
                (this.transactionResult = this.name),
                t.F("LinkDrawn", o))
              : this.doNoLink(i, e, s, n))
          : this.isForwards
            ? this.doNoLink(this.originalFromNode, this.originalFromPort, null, null)
            : this.doNoLink(null, null, this.originalToNode, this.originalToPort);
      } finally {
        (this.stopTool(), o && t.allowSelect && t.F("ChangedSelection", t.selection));
      }
    }
  }
  isNewTreeLink() {
    const t = this.archetypeLinkData;
    if (t === null) return !0;
    if (t instanceof Link) return t.isTreeLink;
    const i = this.diagram;
    if (i === null) return !0;
    const e = i.partManager.getLinkCategoryForData(t),
      s = i.partManager.findLinkTemplateForCategory(e);
    return s !== null ? s.isTreeLink : !0;
  }
  insertLink(t, i, e, s) {
    return this.diagram.partManager.insertLink(t, i, e, s);
  }
  doNoLink(t, i, e, s) {}
}
