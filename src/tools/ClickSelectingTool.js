class ClickSelectingTool extends Tool {
  constructor(t) {
    (super(), (this.name = "ClickSelecting"), t && Object.assign(this, t));
  }
  canStart() {
    return !(!this.isEnabled || this.isBeyondDragSize());
  }
  doMouseUp() {
    (this.isActive &&
      (this.standardMouseSelect(),
      this.standardMouseClick() || (this.diagram.lastInput.isTouchEvent && this.diagram.toolManager.doToolTip())),
      this.stopTool());
  }
}
