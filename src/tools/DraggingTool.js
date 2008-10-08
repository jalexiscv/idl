class DraggingTool extends Tool {
  nP;
  oP;
  Mn;
  rP;
  lP;
  hP;
  aP;
  Bf;
  Xm;
  fP;
  la;
  Nr;
  pT;
  cP;
  Bu;
  zu;
  uP;
  dP;
  gP;
  mP;
  static Lx = new List();
  static fi = null;
  static ha = null;
  constructor(t) {
    (super(),
      (this.name = "Dragging"),
      (this.nP = !0),
      (this.mP = !0),
      (this.oP = !0),
      (this.Mn = null),
      (this.rP = null),
      (this.lP = null),
      (this.hP = null),
      (this.aP = !1),
      (this.Bu = !1),
      (this.Bf = new Point(NaN, NaN)),
      (this.Xm = new Point()),
      (this.fP = !0),
      (this.la = 100),
      (this.Nr = []),
      (this.pT = new GSet().k()),
      (this.cP = new DraggingOptions()),
      (this.zu = null),
      (this.uP = "copy"),
      (this.dP = ""),
      (this.gP = "no-drop"),
      t && Object.assign(this, t));
  }
  get isCopyEnabled() {
    return this.nP;
  }
  set isCopyEnabled(t) {
    (U.i(t, "boolean", DraggingTool, "isCopyEnabled"), (this.nP = t));
  }
  get copiesEffectiveCollection() {
    return this.oP;
  }
  set copiesEffectiveCollection(t) {
    (U.i(t, "boolean", DraggingTool, "copiesEffectiveCollection"), (this.oP = t));
  }
  get dragOptions() {
    return this.cP;
  }
  set dragOptions(t) {
    (U.s(t, DraggingOptions, DraggingTool, "dragOptions"), (this.cP = t));
  }
  get isGridSnapEnabled() {
    return this.dragOptions.isGridSnapEnabled;
  }
  set isGridSnapEnabled(t) {
    (U.i(t, "boolean", DraggingTool, "isGridSnapEnabled"), (this.dragOptions.isGridSnapEnabled = t));
  }
  get isComplexRoutingRealtime() {
    return this.fP;
  }
  set isComplexRoutingRealtime(t) {
    this.fP = t;
    const i = this.diagram.findRouter("AvoidsLinks");
    i !== null && (i.isRealtime = t);
  }
  get isGridSnapRealtime() {
    return this.dragOptions.isGridSnapRealtime;
  }
  set isGridSnapRealtime(t) {
    (U.i(t, "boolean", DraggingTool, "isGridSnapRealtime"), (this.dragOptions.isGridSnapRealtime = t));
  }
  get gridSnapCellSize() {
    return this.dragOptions.gridSnapCellSize;
  }
  set gridSnapCellSize(t) {
    (U.s(t, Size, DraggingTool, "gridSnapCellSize"),
      this.dragOptions.gridSnapCellSize.equals(t) || ((t = t.T()), (this.dragOptions.gridSnapCellSize = t)));
  }
  get gridSnapCellSpot() {
    return this.dragOptions.gridSnapCellSpot;
  }
  set gridSnapCellSpot(t) {
    (U.s(t, Spot, DraggingTool, "gridSnapCellSpot"),
      this.dragOptions.gridSnapCellSpot.equals(t) || ((t = t.T()), (this.dragOptions.gridSnapCellSpot = t)));
  }
  get gridSnapOrigin() {
    return this.dragOptions.gridSnapOrigin;
  }
  set gridSnapOrigin(t) {
    (U.s(t, Point, DraggingTool, "gridSnapOrigin"),
      this.dragOptions.gridSnapOrigin.equals(t) || ((t = t.T()), (this.dragOptions.gridSnapOrigin = t)));
  }
  get dragsLink() {
    return this.dragOptions.dragsLink;
  }
  set dragsLink(t) {
    (U.i(t, "boolean", DraggingTool, "dragsLink"), (this.dragOptions.dragsLink = t));
  }
  get dragsTree() {
    return this.dragOptions.dragsTree;
  }
  set dragsTree(t) {
    (U.i(t, "boolean", DraggingTool, "dragsTree"), (this.dragOptions.dragsTree = t));
  }
  get copyCursor() {
    return this.uP;
  }
  set copyCursor(t) {
    this.uP = t;
  }
  get moveCursor() {
    return this.dP;
  }
  set moveCursor(t) {
    this.dP = t;
  }
  get nodropCursor() {
    return this.gP;
  }
  set nodropCursor(t) {
    this.gP = t;
  }
  get currentPart() {
    return this.rP;
  }
  set currentPart(t) {
    (t !== null && U.s(t, Part, DraggingTool, "currentPart"), (this.rP = t));
  }
  get copiedParts() {
    return this.hP;
  }
  set copiedParts(t) {
    this.hP = t;
  }
  get draggedParts() {
    return this.lP;
  }
  set draggedParts(t) {
    this.lP = t;
  }
  get draggingParts() {
    return this.copiedParts !== null
      ? this.copiedParts.toKeySet()
      : this.draggedParts !== null
        ? this.draggedParts.toKeySet()
        : this.pT;
  }
  get draggedLink() {
    return this.diagram.draggedLink;
  }
  set draggedLink(t) {
    (t !== null && U.s(t, Link, DraggingTool, "draggedLink"), (this.diagram.draggedLink = t));
  }
  get isDragOutStarted() {
    return this.aP;
  }
  set isDragOutStarted(t) {
    this.aP = t;
  }
  get startPoint() {
    return this.Xm;
  }
  set startPoint(t) {
    (U.s(t, Point, DraggingTool, "startPoint"), this.Xm.equals(t) || this.Xm.c(t));
  }
  get delay() {
    return this.la;
  }
  set delay(t) {
    (U.i(t, "number", DraggingTool, "delay"), (this.la = t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    if (
      t === null ||
      (t.isReadOnly && !t.allowDragOut) ||
      (!t.allowMove && !t.allowCopy && !t.allowDragOut) ||
      !t.allowSelect
    )
      return !1;
    const i = t.lastInput;
    return !i.left ||
      (t.currentTool !== this &&
        (!this.isBeyondDragSize() || (i.isTouchEvent && i.timestamp - t.firstInput.timestamp < this.la)))
      ? !1
      : this.findDraggablePart() !== null;
  }
  findDraggablePart() {
    const t = this.diagram;
    let i = t.findPartAt(t.firstInput.documentPoint, !1);
    if (i === null) return null;
    for (; i !== null && !i.canSelect(); ) i = i.containingGroup;
    return i !== null && (i.canMove() || i.canCopy()) ? i : null;
  }
  standardMouseSelect() {
    const t = this.diagram;
    if (!t.allowSelect) return;
    let i = t.findPartAt(t.firstInput.documentPoint, !1);
    if (i !== null) {
      for (; i !== null && !i.canSelect(); ) i = i.containingGroup;
      if (((this.currentPart = i), this.currentPart !== null && !this.currentPart.isSelected)) {
        t.F("ChangingSelection", t.selection);
        const e = t.lastInput;
        (!(U.yr ? e.meta : e.control) && !e.shift && t.clearSelection(!0),
          (this.currentPart.isSelected = !0),
          t.F("ChangedSelection", t.selection));
      }
    }
  }
  doActivate() {
    const t = this.diagram;
    ((this.zu = null), this.currentPart === null && this.standardMouseSelect());
    const i = this.currentPart;
    if (i === null || (!i.canMove() && !i.canCopy())) return;
    (t.cacheGroupExternalLinks(!0),
      (DraggingTool.fi = null),
      (this.isActive = !0),
      this.Bf.set(t.position),
      this.pP(t.selection),
      (this.Nr.length = 0),
      t.animationManager.stopAnimation());
    const e = this.computeEffectiveCollection(t.selection, this.dragOptions);
    ((this.draggedParts = e),
      (this.mP = !!this.diagram.layout.isRealtime),
      (this.diagram.layout.isRealtime = !1),
      (t.Xu = !0),
      t.getRenderingHint("temporaryPixelRatio") === !0 && t.avgSpf > 30 && t.Dx(),
      t.yT(this.draggedParts),
      (t.Yu = !0),
      this.startTransaction("Drag"),
      (this.startPoint = t.firstInput.documentPoint),
      (t.isMouseCaptured = !0),
      t.allowDragOut && this.yR());
  }
  pP(t) {
    if (!this.dragsLink) return;
    const i = this.diagram,
      e = i.model.yP(),
      s = t.first();
    e && t.count === 1 && s instanceof Link && this.mayDragLink(s)
      ? ((this.draggedLink = s),
        this.draggedLink.canRelinkFrom() && this.draggedLink.canRelinkTo() && this.draggedLink.clearAdornments(),
        (this.Mn = i.toolManager.findTool("Relinking")),
        this.Mn === null && ((this.Mn = new RelinkingTool()), (this.Mn.diagram = i)),
        (this.Mn.originalLink = this.draggedLink))
      : ((this.draggedLink = null), (this.Mn = null));
  }
  mayDragLink(t) {
    const i = this.diagram;
    return i !== null && i.allowRelink;
  }
  computeEffectiveCollection(t, i) {
    return this.diagram.commandHandler.computeEffectiveCollection(t, i);
  }
  Qs(t) {
    return t === void 0
      ? new DraggingInfo(Point.wn)
      : this.isGridSnapEnabled
        ? new DraggingInfo(new Point(Math.round(t.x * 1e3) / 1e3, Math.round(t.y * 1e3) / 1e3))
        : new DraggingInfo(t.copy());
  }
  doDeactivate() {
    this.isActive = !1;
    const t = this.diagram;
    ((this.diagram.layout.isRealtime = this.mP),
      (t.Yu = !1),
      (t.zl = !0),
      t.cacheGroupExternalLinks(!1),
      t.stopAutoScroll(),
      this.wP(),
      t.xP(this.draggedParts),
      (this.zu = null),
      (this.currentPart = null),
      (this.draggedParts = null),
      (this.isDragOutStarted = !1),
      (this.Bu = !1),
      DraggingTool.wR(),
      this.wT(),
      this.Bf.e(NaN, NaN),
      DraggingTool.ha !== null && (DraggingTool.ha.currentCursor = ""),
      (DraggingTool.ha = null),
      (DraggingTool.fi = null),
      this.Xl(),
      (t.isMouseCaptured = !1),
      (t.currentCursor = ""),
      (t.Xu = !1),
      this.stopTransaction(),
      t.bP(!0));
  }
  stopTransaction() {
    const t = this.diagram,
      i = super.stopTransaction();
    return (i && t.undoManager.transactionToUndo !== null && t.undoManager.transactionToUndo.optimize(), i);
  }
  wP() {
    const t = this.diagram,
      i = t.skipsUndoManager;
    t.skipsUndoManager = !0;
    const e = t.lastInput;
    (this.xT(e, null), (t.skipsUndoManager = i), (this.Nr.length = 0));
  }
  bT() {
    (this.Xl(), this.SP());
    const t = this.diagram;
    (this.Bf.isReal() && (t.position = this.Bf), t.stopAutoScroll());
  }
  doCancel() {
    (this.Xl(), this.SP());
    const t = this.diagram;
    (this.Bf.isReal() && (t.position = this.Bf), this.stopTool());
  }
  doKeyDown() {
    const t = this.diagram;
    if (!this.isActive) return;
    const i = t.lastInput,
      e = t.previousInput;
    i.code === "Escape" ? this.doCancel() : (i.code !== e.code || i.modifiers !== e.modifiers) && this.doMouseMove();
  }
  doKeyUp() {
    this.isActive && this.doMouseMove();
  }
  xR(t, i) {
    let e = 1 / 0,
      s = 1 / 0,
      n = -1 / 0,
      o = -1 / 0;
    const r = t.iterator;
    for (; r.next(); ) {
      const l = r.value;
      if (!l.isVisible()) continue;
      const h = l.location,
        a = h.x,
        f = h.y;
      isNaN(a) || isNaN(f) || (a < e && (e = a), f < s && (s = f), a > n && (n = a), f > o && (o = f));
    }
    return (e === 1 / 0 ? i.e(0, 0, 0, 0) : i.e(e, s, n - e, o - s), i);
  }
  kP(t) {
    if (this.copiedParts !== null) return;
    const i = this.diagram;
    if ((t && (i.isReadOnly || i.isModelReadOnly)) || this.draggedParts === null) return;
    const e = i.undoManager;
    (e.isEnabled && e.isInTransaction
      ? e.currentTransaction !== null &&
        e.currentTransaction.changes.count > 0 &&
        (i.undoManager.rollbackTransaction(), i.startTransaction("Drag"))
      : this.SP(),
      (i.skipsUndoManager = !t),
      (i.partManager.addsToTemporaryLayer = !t),
      (this.startPoint = i.firstInput.documentPoint));
    const s = this.copiesEffectiveCollection ? this.draggedParts.toKeySet() : i.selection,
      n = i.copyParts(s, i, !0);
    i.commandHandler.zf(n);
    const o = new GMap(),
      r = this.draggedParts.iterator;
    for (; r.next(); ) {
      const h = r.key;
      if (h.Oe() && h.canCopy()) {
        const a = n.get(h);
        if (a === null) continue;
        ((a.location = h.location), a.ensureBounds(), o.set(a, this.Qs(a.location)));
      }
    }
    const l = n.iterator;
    for (; l.next(); ) {
      const h = l.value;
      h instanceof Link && h.canCopy() && o.set(h, this.Qs());
    }
    if (((this.copiedParts = o), this.pP(o.toKeySet()), this.draggedLink !== null)) {
      const h = this.draggedLink,
        a = h.routeBounds;
      h.Cr(this.startPoint.x - (a.x + a.width / 2), this.startPoint.y - (a.y + a.height / 2));
    }
    this.doUpdateCursor(null);
  }
  Xl() {
    const t = this.diagram;
    if (this.copiedParts !== null) {
      if ((t.removeParts(this.copiedParts.toKeySet(), !1), (this.copiedParts = null), this.draggedParts !== null)) {
        const i = this.draggedParts.iterator;
        for (; i.next(); )
          if (i.key instanceof Link) {
            const s = i.value;
            s.point = new Point(0, 0);
          }
      }
      this.doUpdateCursor(null);
    }
    ((t.skipsUndoManager = !1),
      (t.partManager.addsToTemporaryLayer = !1),
      (this.startPoint = t.firstInput.documentPoint));
  }
  wT() {
    this.draggedLink !== null &&
      (this.dragsLink && this.Mn !== null && (this.Mn.stopDraggingMouseMove(), (this.Mn.originalLink = null)),
      (this.draggedLink = null),
      (this.Mn = null));
  }
  Xf(t, i) {
    if (t === null) return;
    const e = this.diagram,
      s = this.startPoint,
      n = Point.a();
    (n.c(e.lastInput.documentPoint),
      this.moveParts(t, n.subtract(s), i),
      Point.o(n),
      e.getRenderingHint("temporaryPixelRatio") === !0 && e.Yl === null && e.avgSpf > 30 && (e.Dx(), e.Ku()));
  }
  moveParts(t, i, e) {
    e === void 0 && (e = !1);
    const s = this.diagram;
    s !== null && s.Fx(t, i, this.dragOptions, e);
  }
  SP() {
    if (this.draggedParts === null) return;
    const t = this.diagram;
    let i = this.draggedParts.iterator;
    for (; i.next(); ) {
      const e = i.key;
      e.Oe() && (e.location = i.value.point);
    }
    for (i = this.draggedParts.iterator; i.next(); ) {
      const e = i.key;
      if (e instanceof Link && e.suspendsRouting) {
        const s = i.value.point;
        (this.draggedParts.set(e, this.Qs()), e.Cr(-s.x, -s.y));
      }
    }
    t.maybeUpdate();
  }
  bR(t) {
    if (t === null) return !0;
    const i = t.part;
    return !!(
      i === null ||
      i instanceof Adornment ||
      i.layer?.isTemporary ||
      (this.draggedParts && this.draggedParts.has(i)) ||
      (this.copiedParts && this.copiedParts.has(i))
    );
  }
  PP(t) {
    const i = this.diagram;
    this.dragsLink &&
      (this.draggedLink !== null && ((this.draggedLink.fromNode = null), (this.draggedLink.toNode = null)),
      this.ST(!1));
    const e = this.findDragOverObject(t),
      s = i.lastInput;
    ((s.targetObject = e), this.doUpdateCursor(e));
    const n = i.skipsUndoManager;
    let o = !1;
    try {
      if (((i.skipsUndoManager = !0), (o = this.xT(s, e)), !this.isActive && DraggingTool.fi === null)) return;
      const r = e !== null ? e.part : null;
      if (r === null || (i.handlesDragDropForTopLevelParts && r.isTopLevel && !(r instanceof Group))) {
        const l = i.mouseDragOver;
        l !== null && (l(s), (o = !0));
      }
      if (
        (!this.isActive && DraggingTool.fi === null) ||
        (this.doDragOver(t, e), !this.isActive && DraggingTool.fi === null)
      )
        return;
    } finally {
      ((i.skipsUndoManager = n), o && i.maybeUpdate());
    }
    ((this.zu = e),
      !i.isReadOnly &&
        (i.allowMove || i.allowCopy) &&
        (i.allowHorizontalScroll || i.allowVerticalScroll) &&
        i.doAutoScroll(s.viewPoint));
  }
  findDragOverObject(t) {
    return this.diagram.MP(t, null, (i) => !this.bR(i));
  }
  doUpdateCursor(t) {
    const i = this.diagram;
    (t === null || this.zu !== t) &&
      (!this.diagram.currentTool.isActive || this.mayCopy()
        ? (i.currentCursor = this.copyCursor)
        : this.mayMove()
          ? (i.currentCursor = this.moveCursor)
          : this.mayDragOut() && (i.currentCursor = this.nodropCursor));
  }
  xT(t, i) {
    let e = !1,
      s = this.Nr.length;
    const n = s > 0 ? this.Nr[0] : null;
    if (i === n) return !1;
    t.handled = !1;
    for (let r = 0; r < s; r++) {
      const l = this.Nr[r],
        h = l.mouseDragLeave;
      if (h !== null && (h(t, l, i), (e = !0), t.handled)) break;
    }
    if (((this.Nr.length = 0), (!this.isActive && DraggingTool.fi === null) || i === null)) return e;
    t.handled = !1;
    let o = i;
    for (; o !== null; ) (this.Nr.push(o), (o = this.kT(o)));
    s = this.Nr.length;
    for (let r = 0; r < s; r++) {
      const l = this.Nr[r],
        h = l.mouseDragEnter;
      if (h !== null && (h(t, l, n), (e = !0), t.handled)) break;
    }
    return e;
  }
  OV(t, i) {
    return t === null
      ? !1
      : !!(
          t === i ||
          t.isContainedBy(i) ||
          (i instanceof Group && !(t instanceof Group) && i.handlesDragDropForMembers && t.part?.isMemberOf(i))
        );
  }
  kT(t) {
    const i = t.panel;
    if (i !== null) return i;
    if (t instanceof Part && !(t instanceof Group)) {
      const e = t.containingGroup;
      if (e !== null && e.handlesDragDropForMembers) return e;
    }
    return null;
  }
  PT(t, i) {
    const e = this.diagram,
      s = this.Mn;
    if (s === null) return null;
    const n = s.portGravity,
      o = e.findObjectsNear(t, n, (a) => s.findValidLinkablePort(a, i)),
      r = Point.a();
    let l = 1 / 0,
      h = null;
    for (const a = o.iterator; a.next(); ) {
      const f = a.value;
      if (f.part === null) continue;
      const u = f.getDocumentPoint(Spot.Center, r),
        d = t.distanceSquaredPoint(u);
      d < l && ((h = f), (l = d));
    }
    return (Point.o(r), h);
  }
  ST(t) {
    const i = this.draggedLink;
    if (i !== null) {
      if (i.pointsCount < 2) return;
      const e = this.diagram;
      if (e.isReadOnly) return;
      const s = this.Mn;
      if (s === null) return;
      let n = null,
        o = null;
      i.fromNode === null && ((n = this.PT(i.getPoint(0), !1)), n !== null && (o = n.part));
      let r = null,
        l = null;
      (i.toNode === null && ((r = this.PT(i.getPoint(i.pointsCount - 1), !0)), r !== null && (l = r.part)),
        s.isValidLink(o, n, l, r)
          ? t
            ? ((i.defaultFromPoint = i.getPoint(0)),
              (i.defaultToPoint = i.getPoint(i.pointsCount - 1)),
              (i.suspendsRouting = !1),
              (i.fromNode = o),
              n !== null && (i.fromPortId = n.portId),
              (i.toNode = l),
              r !== null && (i.toPortId = r.portId),
              i.fromPort !== e.NP && e.F("LinkRelinked", i, e.NP),
              i.toPort !== e.CP && e.F("LinkRelinked", i, e.CP))
            : s.doDraggingMouseMove(o, n, l, r)
          : s.doDraggingMouseMove(null, null, null, null));
    }
  }
  doDragOver(t, i) {}
  MT(t) {
    const i = this.diagram;
    (this.dragsLink && this.ST(!0), this.wP());
    const e = this.findDragOverObject(t),
      s = i.lastInput;
    if (((s.targetObject = e), e !== null)) {
      s.handled = !1;
      let l = e;
      for (; l !== null; ) {
        const h = l.mouseDrop;
        if (h !== null && (h(s, l), s.handled)) break;
        (this.SR(s, l), (l = this.kT(l)));
      }
    } else {
      const l = i.mouseDrop;
      l !== null && l(s);
    }
    if (!this.isActive && DraggingTool.fi === null) return;
    const n = this.copiedParts || this.draggedParts;
    if (n !== null) {
      const l = n.iterator;
      for (; l.next(); ) {
        const h = l.key;
        h instanceof Node && h.linksConnected.each((a) => (a.suspendsRouting = !1));
      }
    }
    if ((this.doDropOnto(t, e), !this.isActive && DraggingTool.fi === null)) return;
    const o = Rect.a(),
      r = i.selection.iterator;
    for (; r.next(); ) {
      const l = r.value;
      l instanceof Node && this.kR(i, l, o);
    }
    Rect.o(o);
  }
  SR(t, i) {
    const e = this.diagram,
      s = i.part;
    if (e.handlesDragDropForTopLevelParts && s !== null && s.isTopLevel && !(s instanceof Group)) {
      const n = e.mouseDrop;
      n !== null && n(t);
    }
  }
  kR(t, i, e) {
    if (!i.canAvoid()) return;
    let s = !1;
    ((e = i.getAvoidableRect(e)), t.viewportBounds.containsRect(e) && (s = !0));
    const n = this.copiedParts || this.draggedParts;
    if (n === null) return;
    const o = t.AP(
      e,
      (l) => l.part,
      (l) => l instanceof Link,
      !0,
      (l) => l instanceof Link,
      s,
    );
    if (o.count === 0) return;
    const r = o.iterator;
    for (; r.next(); ) {
      const l = r.value;
      (n.has(l) && n.has(i)) || (!l.isMemberOf(i) && l.isAvoiding && l.ii());
    }
  }
  doDropOnto(t, i) {}
  doMouseMove() {
    if (!this.isActive) return;
    const t = this.diagram,
      i = t.lastInput;
    if (this.simulatedMouseMove(i.event, i.documentPoint, i.targetDiagram)) return;
    this.currentPart !== null &&
      this.draggedParts !== null &&
      (this.mayCopy()
        ? (this.kP(!1), this.Xf(this.copiedParts, !1))
        : this.mayMove()
          ? (this.Xl(), this.Xf(this.draggedParts, !0))
          : this.mayDragOut()
            ? (this.kP(!1), this.Xf(this.copiedParts, !1))
            : this.Xl(),
      this.PP(t.lastInput.documentPoint));
  }
  doMouseUp() {
    if (!this.isActive) return;
    const t = this.diagram,
      i = t.lastInput;
    if (this.simulatedMouseUp(i.event, i.documentPoint, i.targetDiagram)) return;
    let e = !1;
    const s = this.mayCopy();
    if (
      (s && this.copiedParts !== null
        ? (this.Xl(),
          this.kP(!0),
          this.Xf(this.copiedParts, !1),
          this.copiedParts !== null &&
            (t.F("ChangingSelection", t.selection),
            t.clearSelection(!0),
            this.copiedParts.iteratorKeys.each((n) => {
              n.isSelected = !0;
            })))
        : ((e = !0), this.Xl(), this.mayMove() && (this.Xf(this.draggedParts, !0), this.PP(t.lastInput.documentPoint))),
      (this.Bu = !0),
      this.MT(t.lastInput.documentPoint),
      this.isActive)
    ) {
      const n = s && this.copiedParts,
        o = n ? this.copiedParts?.toKeySet() : this.draggedParts ? this.draggedParts.toKeySet() : null;
      ((this.copiedParts = null),
        e && this.PR(),
        t.invalidateDocumentBounds(),
        t.xP(this.draggedParts),
        (this.transactionResult = n ? "Copy" : "Move"),
        t.F(n ? "SelectionCopied" : "SelectionMoved", o));
    }
    (this.stopTool(), s && t.F("ChangedSelection", t.selection));
  }
  simulatedMouseMove(t, i, e) {
    if (DraggingTool.fi === null) return !1;
    const s = DraggingTool.fi.diagram;
    e instanceof Diagram || (e = null);
    const n = DraggingTool.ha;
    if (e !== n) {
      if (n !== null && n !== s) {
        (n.stopAutoScroll(), (DraggingTool.fi.isDragOutStarted = !1));
        const r = n.toolManager.findTool("Dragging");
        r !== null && r.doSimulatedDragLeave();
      }
      if (((DraggingTool.ha = e), e !== null && e !== s)) {
        DraggingTool.fi.bT();
        const r = e.toolManager.findTool("Dragging");
        r !== null && (r.NT(), r.doSimulatedDragEnter());
      }
      this.doUpdateCursor(null);
    }
    if (e === null || e === s || !e.allowDrop || e.isReadOnly || !e.allowInsert) return !1;
    const o = e.toolManager.findTool("Dragging");
    if (o !== null) {
      let r = i;
      (t !== null &&
        (t.targetTouches !== void 0 &&
          (t.targetTouches.length > 0
            ? (t = t.targetTouches[0])
            : t.changedTouches.length > 0 && (t = t.changedTouches[0])),
        (r = e.getMouse(t))),
        (e.lastInput.documentPoint = r),
        (e.lastInput.viewPoint = e.transformDocToView(r)),
        (e.lastInput.down = !1),
        (e.lastInput.up = !1),
        o.doSimulatedDragOver());
    }
    return !0;
  }
  simulatedMouseUp(t, i, e) {
    if (DraggingTool.fi === null) return !1;
    const s = DraggingTool.ha,
      n = DraggingTool.fi.diagram;
    if (e === null) return (DraggingTool.fi.doCancel(), !0);
    if (e !== s) {
      if (s !== null) {
        const r = s.toolManager.findTool("Dragging");
        if (s !== null && s !== n && r !== null)
          return (s.stopAutoScroll(), (DraggingTool.fi.isDragOutStarted = !1), r.doSimulatedDragLeave(), !1);
      }
      DraggingTool.ha = e;
      const o = e.toolManager.findTool("Dragging");
      o !== null && (DraggingTool.fi.bT(), o.NT(), o.doSimulatedDragEnter());
    }
    if (e !== this.diagram) {
      let o = i;
      (t !== null
        ? (t.targetTouches !== void 0 &&
            (t.targetTouches.length > 0
              ? (t = t.targetTouches[0])
              : t.changedTouches.length > 0 && (t = t.changedTouches[0])),
          (o = e.getMouse(t)))
        : o === null && (o = new Point()),
        (e.lastInput.documentPoint = o),
        (e.lastInput.viewPoint = e.transformDocToView(o)),
        (e.lastInput.down = !1),
        (e.lastInput.up = !0));
      const r = e.toolManager.findTool("Dragging");
      r !== null && r.doSimulatedDrop();
      const l = DraggingTool.fi;
      if (l !== null) {
        const h = l.mayCopy();
        ((l.transactionResult = h ? "Copy" : "Move"), l.stopTool());
      }
      return !0;
    }
    return !1;
  }
  PR() {
    if (this.draggedParts === null) return;
    const t = this.draggedParts.iterator;
    for (; t.next(); ) {
      const i = t.key;
      if (i instanceof Node) {
        const e = i.containingGroup;
        e !== null && e.hasPlaceholder() && !this.draggedParts.has(e) && e.placeholder.g();
      }
    }
  }
  mayCopy() {
    if (!this.isCopyEnabled) return !1;
    const t = this.diagram;
    if (
      t.isReadOnly ||
      t.isModelReadOnly ||
      !t.allowInsert ||
      !t.allowCopy ||
      !(U.yr ? t.lastInput.alt : t.lastInput.control)
    )
      return !1;
    const i = t.selection.iterator;
    for (; i.next(); ) if (i.value.canCopy()) return !0;
    return !!(this.draggedLink !== null && this.dragsLink && this.draggedLink.canCopy());
  }
  mayDragOut() {
    if (!this.isCopyEnabled) return !1;
    const t = this.diagram;
    if (!t.allowDragOut || !t.allowCopy || t.allowMove) return !1;
    const i = t.selection.iterator;
    for (; i.next(); ) if (i.value.canCopy()) return !0;
    return !!(this.draggedLink !== null && this.dragsLink && this.draggedLink.canCopy());
  }
  mayMove() {
    const t = this.diagram;
    if (t.isReadOnly || !t.allowMove) return !1;
    const i = t.selection.iterator;
    for (; i.next(); ) if (i.value.canMove()) return !0;
    return !!(this.draggedLink !== null && this.dragsLink && this.draggedLink.canMove());
  }
  NT() {
    DraggingTool.Lx.has(this) || DraggingTool.Lx.add(this);
  }
  static wR() {
    if (DraggingTool.Lx.count > 0) {
      const t = DraggingTool.Lx,
        i = t.length;
      for (let e = 0; e < i; e++) {
        const s = t.elt(e);
        (s.wT(), s.Xl(), s.wP(), s.diagram.stopAutoScroll());
      }
      t.clear();
    }
  }
  MR(t, i, e) {
    return !this.Bu && this.draggedParts !== null && !this.draggedParts.has(t) ? (e.c(i), !0) : !1;
  }
  get draggingSource() {
    return DraggingTool.fi;
  }
  mayDragIn() {
    const t = this.diagram;
    if (!t.allowDrop || t.isReadOnly || t.isModelReadOnly || !t.allowInsert) return !1;
    const i = DraggingTool.fi;
    return !(i === null || i.diagram.model.dataFormat !== t.model.dataFormat);
  }
  doSimulatedDragEnter() {
    if (!this.mayDragIn()) return;
    const t = this.diagram;
    (t.animationManager.stopAnimation(), t.Ar(), t.animationManager.stopAnimation());
    const i = DraggingTool.fi;
    (i !== null &&
      ((this.diagram.Xu = !0), t.lastInput.event === null && (t.lastInput.event = i.diagram.lastInput.event)),
      this.doUpdateCursor(null));
  }
  doSimulatedDragLeave() {
    const t = DraggingTool.fi;
    (t !== null && t.doSimulatedDragOut(), (this.diagram.Xu = !1), this.doCancel());
  }
  doSimulatedDragOver() {
    const t = this.diagram;
    t.animationManager.Uu = !0;
    const i = DraggingTool.fi;
    if (i !== null && i.draggedParts !== null) {
      if (!this.mayDragIn()) return;
      (this.CT(i.draggedParts.toKeySet(), !1, t.firstInput),
        this.Xf(this.copiedParts, !1),
        this.PP(t.lastInput.documentPoint));
    }
    t.animationManager.Uu = !1;
  }
  doSimulatedDrop() {
    const t = this.diagram,
      i = DraggingTool.fi;
    if (i !== null) {
      const e = i.diagram;
      if (((i.Bu = !0), this.Xl(), i.draggedParts === null || !this.mayDragIn())) return;
      ((t.animationManager.Uu = !0),
        t.F("ChangingSelection", t.selection),
        this.startTransaction("Drop"),
        this.CT(i.draggedParts.toKeySet(), !0, t.lastInput),
        this.Xf(this.copiedParts, !1));
      const s = new GSet();
      (this.copiedParts !== null &&
        (t.clearSelection(!0),
        this.copiedParts.iteratorKeys.each((n) => {
          ((n.isSelected = !0), s.add(n));
        })),
        this.MT(t.lastInput.documentPoint),
        t.invalidateDocumentBounds(),
        this.copiedParts !== null && (this.transactionResult = "ExternalCopy"),
        (this.copiedParts = null),
        t.doFocus(),
        (t.Xu = !1),
        t.F("ExternalObjectsDropped", s, e),
        this.stopTransaction(),
        t.F("ChangedSelection", t.selection));
    }
    t.animationManager.Uu = !1;
  }
  CT(t, i, e) {
    if (this.copiedParts !== null) return;
    const s = this.diagram;
    if (s.isReadOnly || s.isModelReadOnly) return;
    ((s.skipsUndoManager = !i), (s.partManager.addsToTemporaryLayer = !i), (this.startPoint = e.documentPoint));
    const n = s.copyParts(t, s, !0);
    s.commandHandler.zf(n);
    const o = Rect.a();
    this.xR(t, o);
    const r = o.x + o.width / 2,
      l = o.y + o.height / 2;
    Rect.o(o);
    const h = this.Xm,
      a = new GMap(),
      f = Point.a(),
      c = t.iterator;
    for (; c.next(); ) {
      const d = c.value;
      if (d instanceof Link && d.canCopy()) {
        const m = n.get(d);
        if (m === null) continue;
        ((m.points = d.points), m.Cr(h.x - r, h.y - l), (m.suspendsRouting = !0), a.set(m, this.Qs()));
      }
    }
    const u = t.iterator;
    for (; u.next(); ) {
      const d = u.value;
      if (d.Oe() && d.canCopy()) {
        const m = n.get(d);
        if (m === null) continue;
        const g = d.location;
        (f.e(h.x - (r - g.x), h.y - (l - g.y)), (m.location = f), m.ensureBounds(), a.set(m, this.Qs(f)));
      }
    }
    if ((Point.o(f), (this.copiedParts = a), this.pP(a.toKeySet()), this.draggedLink !== null)) {
      const d = this.draggedLink,
        m = d.routeBounds;
      d.Cr(this.startPoint.x - (m.x + m.width / 2), this.startPoint.y - (m.y + m.height / 2));
    }
    this.doUpdateCursor(null);
  }
  yR() {
    ((this.isDragOutStarted = !0),
      (this.Bu = !1),
      (DraggingTool.fi = this),
      (DraggingTool.ha = this.diagram),
      this.doSimulatedDragOut());
  }
  doSimulatedDragOut() {
    const t = this.diagram;
    (!this.mayCopy() && !this.mayMove() ? (t.currentCursor = this.nodropCursor) : (t.currentCursor = ""),
      (this.zu = null));
  }
  computeMove(t, i, e, s) {
    const n = this.diagram;
    return n !== null ? n.computeMove(t, i, this.dragOptions, s) : new Point();
  }
}
ToolManager.prototype.doCancel = function () {
  (DraggingTool.fi !== null && DraggingTool.fi.doCancel(), Tool.prototype.doCancel.call(this));
};
