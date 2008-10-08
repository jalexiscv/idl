class DragSelectingTool extends Tool {
  la;
  uM;
  Hl;
  constructor(t) {
    (super(),
      (this.name = "DragSelecting"),
      (this.la = 175),
      (this.uM = !1),
      (this.Hl = new Part({ layerName: "Tool", selectable: !1 })
        .add(new Shape("Rectangle", { name: "SHAPE", fill: null, stroke: "magenta" }).theme("stroke", "dragSelect"))
        .Yt()),
      t && Object.assign(this, t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    if (!t.allowSelect) return !1;
    const i = t.lastInput;
    return !(
      !i.left ||
      (t.currentTool !== this &&
        (!this.isBeyondDragSize() ||
          i.timestamp - t.firstInput.timestamp < this.delay ||
          t.findPartAt(i.documentPoint, !0) !== null))
    );
  }
  doActivate() {
    const t = this.diagram;
    ((this.isActive = !0),
      (t.isMouseCaptured = !0),
      (t.skipsUndoManager = !0),
      this.box && t.add(this.box),
      this.doMouseMove());
  }
  doDeactivate() {
    const t = this.diagram;
    (t.stopAutoScroll(),
      this.box && t.remove(this.box),
      (t.skipsUndoManager = !1),
      (t.isMouseCaptured = !1),
      (this.isActive = !1));
  }
  doMouseMove() {
    const t = this.diagram;
    if (this.isActive && this.box !== null) {
      const i = this.computeBoxBounds();
      let e = this.box.findObject("SHAPE");
      e === null && (e = this.box.findMainElement());
      const s = Size.a().e(i.width, i.height);
      (e !== null && (e.desiredSize = s),
        this.box.Gf(i.x, i.y, !1),
        Size.o(s),
        (t.allowHorizontalScroll || t.allowVerticalScroll) && t.doAutoScroll(t.lastInput.viewPoint));
    }
  }
  doMouseUp() {
    if (this.isActive) {
      const t = this.diagram;
      this.box && t.remove(this.box);
      try {
        ((t.currentCursor = "wait"),
          t.F("ChangingSelection", t.selection),
          this.selectInRect(this.computeBoxBounds()),
          t.F("ChangedSelection", t.selection));
      } finally {
        t.currentCursor = "";
      }
    }
    this.stopTool();
  }
  computeBoxBounds() {
    const t = this.diagram;
    return new Rect(t.firstInput.documentPoint, t.lastInput.documentPoint);
  }
  selectInRect(t) {
    const i = this.diagram,
      e = i.lastInput,
      s = i.findPartsIn(t, this.isPartialInclusion);
    if (U.yr ? e.meta : e.control)
      if (e.shift) {
        const n = s.iterator;
        for (; n.next(); ) {
          const o = n.value;
          o.isSelected && (o.isSelected = !1);
        }
      } else {
        const n = s.iterator;
        for (; n.next(); ) {
          const o = n.value;
          o.isSelected = !o.isSelected;
        }
      }
    else if (e.shift) {
      const n = s.iterator;
      for (; n.next(); ) {
        const o = n.value;
        o.isSelected || (o.isSelected = !0);
      }
    } else {
      const n = new List(),
        o = i.selection.iterator;
      for (; o.next(); ) {
        const h = o.value;
        s.has(h) || n.add(h);
      }
      const r = n.iterator;
      for (; r.next(); ) {
        const h = r.value;
        h.isSelected = !1;
      }
      const l = s.iterator;
      for (; l.next(); ) {
        const h = l.value;
        h.isSelected || (h.isSelected = !0);
      }
    }
  }
  get delay() {
    return this.la;
  }
  set delay(t) {
    (U.i(t, "number", DragSelectingTool, "delay"), (this.la = t));
  }
  get isPartialInclusion() {
    return this.uM;
  }
  set isPartialInclusion(t) {
    (U.i(t, "boolean", DragSelectingTool, "isPartialInclusion"), (this.uM = t));
  }
  get box() {
    return this.Hl;
  }
  set box(t) {
    (t !== null && (U.s(t, Part, DragSelectingTool, "box"), t.Yt()), (this.Hl = t));
  }
}
