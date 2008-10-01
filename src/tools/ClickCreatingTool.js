class ClickCreatingTool extends Tool {
  ql;
  aM;
  Yf;
  fM;
  constructor(t) {
    (super(),
      (this.name = "ClickCreating"),
      (this.ql = null),
      (this.aM = !0),
      (this.Yf = !1),
      (this.fM = new Point(0, 0)),
      t && Object.assign(this, t));
  }
  canStart() {
    if (!this.isEnabled || this.archetypeNodeData === null) return !1;
    const t = this.diagram;
    if (t.isReadOnly || t.isModelReadOnly || !t.allowInsert || !t.lastInput.left || this.isBeyondDragSize()) return !1;
    if (this.isDoubleClick) {
      if (
        (t.lastInput.clickCount === 1 && (this.fM = t.lastInput.viewPoint.copy()),
        t.lastInput.clickCount !== 2 || this.isBeyondDragSize(this.fM))
      )
        return !1;
    } else if (t.lastInput.clickCount !== 1) return !1;
    return !(t.currentTool !== this && t.findPartAt(t.lastInput.documentPoint, !0) !== null);
  }
  doMouseUp() {
    const t = this.diagram;
    (this.isActive && this.insertPart(t.lastInput.documentPoint), this.stopTool());
  }
  insertPart(t) {
    const i = this.diagram,
      e = this.archetypeNodeData;
    if (e === null) return null;
    let s = null;
    try {
      if ((i.F("ChangingSelection", i.selection), this.startTransaction(this.name), e instanceof Part))
        e.Oe() && (e.Yt(), (s = e.copy()), s !== null && i.add(s));
      else if (e !== null) {
        const n = i.model.copyNodeData(e);
        (i.model.addNodeData(n), (s = i.findPartForData(n)));
      }
      if (s !== null) {
        const n = Point.U(t.x, t.y);
        (this.isGridSnapEnabled && this.diagram.cM(s, t, n),
          (s.location = n),
          i.allowSelect && (i.clearSelection(!0), (s.isSelected = !0)),
          Point.o(n));
      }
      (i.invalidateDocumentBounds(), (this.transactionResult = this.name), i.F("PartCreated", s));
    } finally {
      (this.stopTransaction(), i.F("ChangedSelection", i.selection));
    }
    return s;
  }
  get archetypeNodeData() {
    return this.ql;
  }
  set archetypeNodeData(t) {
    (t !== null && U.Ro(t, ClickCreatingTool, "archetypeNodeData"), (this.ql = t));
  }
  get isDoubleClick() {
    return this.aM;
  }
  set isDoubleClick(t) {
    (U.i(t, "boolean", ClickCreatingTool, "isDoubleClick"), (this.aM = t));
  }
  get isGridSnapEnabled() {
    return this.Yf;
  }
  set isGridSnapEnabled(t) {
    (U.i(t, "boolean", ClickCreatingTool, "isGridSnapEnabled"), (this.Yf = t));
  }
}
