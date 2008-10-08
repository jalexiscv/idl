class OverviewDraggingTool extends DraggingTool {
  wh;
  constructor() {
    (super(), (this.wh = Point.xn));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    if (t === null || !t.allowMove || !t.allowSelect) return !1;
    const i = t.observed;
    if (i === null) return !1;
    const e = t.lastInput;
    if (
      !e.left ||
      (t.currentTool !== this &&
        (!this.isBeyondDragSize() || (e.isTouchEvent && e.timestamp - t.firstInput.timestamp < this.delay)))
    )
      return !1;
    if (this.findDraggablePart() === null) {
      const n = i.viewportBounds;
      this.wh = new Point(n.width / 2, n.height / 2);
      const o = t.firstInput.documentPoint;
      i.position = new Point(o.x - this.wh.x, o.y - this.wh.y);
    }
    return !0;
  }
  doActivate() {
    ((this.wh = Point.xn), super.doActivate());
  }
  doUpdateCursor(t) {
    const i = this.diagram,
      e = i.box;
    e !== null && e.cursor && (i.currentCursor = e.cursor);
  }
  moveParts(t, i, e) {
    e === void 0 && (e = !1);
    const s = this.diagram,
      n = s.observed;
    if (n === null) return;
    const o = s.box;
    if (o === null) return;
    if (!this.wh.isReal()) {
      const l = s.firstInput.documentPoint,
        h = o.location;
      this.wh = new Point(l.x - h.x, l.y - h.y);
    }
    const r = s.lastInput.documentPoint;
    n.position = new Point(r.x - this.wh.x, r.y - this.wh.y);
  }
}
