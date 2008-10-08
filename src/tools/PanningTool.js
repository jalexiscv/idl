class PanningTool extends Tool {
  Xx;
  IT;
  Bo;
  dM;
  constructor(t) {
    (super(), (this.name = "Panning"), (this.Xx = new Point()), (this.IT = new Point()), (this.Bo = !1));
    const i = this;
    ((this.dM = () => {
      const e = i.diagram;
      (e !== null && e.Ii(root.document, "scroll", i.dM, !1), i.stopTool());
    }),
      t && Object.assign(this, t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    return !(
      (!t.allowHorizontalScroll && !t.allowVerticalScroll) ||
      !t.lastInput.left ||
      (t.currentTool !== this && !this.isBeyondDragSize())
    );
  }
  doActivate() {
    const t = this.diagram;
    (this.Bo
      ? ((t.lastInput.bubbles = !0), t.Kt(root.document, "scroll", this.dM, !1))
      : ((t.currentCursor = "move"), (t.isMouseCaptured = !0), this.Xx.c(t.position)),
      (this.isActive = !0));
  }
  doDeactivate() {
    const t = this.diagram;
    ((t.currentCursor = ""), (t.isMouseCaptured = !1), (this.isActive = !1));
  }
  doCancel() {
    const t = this.diagram;
    ((t.position = this.Xx), (t.isMouseCaptured = !1), this.stopTool());
  }
  doMouseMove() {
    this.RT();
  }
  doMouseUp() {
    (this.RT(), this.stopTool());
  }
  RT() {
    const t = this.diagram;
    if (this.isActive && t) {
      if (this.Bo) {
        t.lastInput.bubbles = !0;
        return;
      }
      const i = t.position,
        e = t.firstInput.documentPoint,
        s = t.lastInput.documentPoint;
      let n = i.x + e.x - s.x,
        o = i.y + e.y - s.y;
      (t.allowHorizontalScroll || (n = i.x), t.allowVerticalScroll || (o = i.y), (t.position = this.IT.e(n, o)));
    }
  }
  get bubbles() {
    return this.Bo;
  }
  set bubbles(t) {
    (U.i(t, "boolean", PanningTool, "bubbles"), (this.Bo = t));
  }
  get originalPosition() {
    return this.Xx;
  }
}
