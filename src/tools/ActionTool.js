class ActionTool extends Tool {
  Uf;
  constructor(t) {
    (super(), (this.name = "Action"), (this.Uf = null), t && Object.assign(this, t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram,
      i = t.lastInput,
      e = t.findObjectAt(i.documentPoint, (s) => {
        for (; s.panel !== null; ) {
          if (s.isActionable) return s;
          s = s.panel;
        }
        return s;
      });
    return e !== null && e.isActionable
      ? ((this.Uf = e), (t.Vf = t.findObjectAt(i.documentPoint, null, null)), !0)
      : !1;
  }
  doMouseDown() {
    if (!this.isActive) this.canStart() && this.doActivate();
    else {
      const i = this.diagram.lastInput,
        e = this.Uf;
      if (e === null) return;
      ((i.targetObject = e), e.actionDown !== null && e.actionDown(i, e));
    }
  }
  doMouseMove() {
    if (this.isActive) {
      const i = this.diagram.lastInput,
        e = this.Uf;
      if (e === null) return;
      ((i.targetObject = e), e.actionMove !== null && e.actionMove(i, e));
    }
  }
  doMouseUp() {
    if (this.isActive) {
      const i = this.diagram.lastInput,
        e = this.Uf;
      if (e === null) return;
      ((i.targetObject = e),
        e.actionUp !== null && e.actionUp(i, e),
        this.standardMouseClick(
          (s) => {
            for (; s.panel !== null; ) {
              if (s.isActionable && s === e) return s;
              s = s.panel;
            }
            return s;
          },
          (s) => s === e,
        ));
    }
    this.stopTool();
  }
  doCancel() {
    const i = this.diagram.lastInput,
      e = this.Uf;
    e !== null && ((i.targetObject = e), e.actionCancel !== null && e.actionCancel(i, e), this.stopTool());
  }
  doStop() {
    this.Uf = null;
  }
}
