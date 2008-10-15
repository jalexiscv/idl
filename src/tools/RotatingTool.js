class RotatingTool extends Tool {
  nM;
  oM;
  Ts = null;
  Tr = null;
  zx = null;
  As = null;
  rM;
  Um;
  Kf;
  lM;
  hM;
  constructor(t) {
    (super(),
      (this.name = "Rotating"),
      (this.nM = 45),
      (this.oM = 2),
      (this.Kf = new Point()),
      (this.Ts = null),
      (this.handleArchetype = new Shape("Ellipse", {
        desiredSize: Size.Tu,
        fill: "lightblue",
        stroke: "dodgerblue",
        strokeWidth: 1,
        cursor: "pointer",
      })
        .theme("fill", "adornmentFill")
        .theme("stroke", "adornmentStroke")),
      (this.As = null),
      (this.rM = 0),
      (this.Um = new Point(NaN, NaN)),
      (this.lM = 0),
      (this.hM = 50),
      t && Object.assign(this, t));
  }
  updateAdornments(t) {
    if (t !== null) {
      if (t.Ir()) {
        const i = t.rotateObject;
        if (i === t || i === t.path || i.isPanelMain) return;
      }
      if (t.isSelected && !this.diagram.isReadOnly) {
        const i = t.rotateObject;
        if (
          i !== null &&
          t.canRotate() &&
          t.actualBounds.isReal() &&
          t.isVisible() &&
          i.actualBounds.isReal() &&
          i.isVisibleObject()
        ) {
          let e = t.findAdornment(this.name);
          if (((e === null || e.adornedObject !== i) && (e = this.makeAdornment(i)), e !== null)) {
            ((e.angle = i.getDocumentAngle()),
              e.hasPlaceholder() || (e.location = this.computeAdornmentLocation(i)),
              t.addAdornment(this.name, e));
            return;
          }
        }
      }
      t.removeAdornment(this.name);
    }
  }
  makeAdornment(t) {
    let i = null;
    const e = t.part?.rotateAdornmentTemplate;
    return (
      e ? (i = e.copy()) : this.zx !== null && (i = this.zx.copy()),
      i === null ? null : ((i.adornedObject = t), i)
    );
  }
  get handleArchetype() {
    return this.Tr;
  }
  set handleArchetype(t) {
    (t !== null && U.s(t, GraphObject, RotatingTool, "handleArchetype"),
      (this.Tr = t),
      t !== null
        ? (this.zx = new Adornment(Panel.Position, { locationSpot: Spot.Center }).add(t).Yt())
        : (this.zx = null));
  }
  get handle() {
    return this.As;
  }
  set handle(t) {
    (t !== null &&
      (U.s(t, GraphObject, RotatingTool, "handle"),
      t.part instanceof Adornment || U.n("new handle is not in an Adornment: " + t)),
      (this.As = t));
  }
  get adornedObject() {
    return this.Ts;
  }
  set adornedObject(t) {
    (t !== null &&
      (U.s(t, GraphObject, RotatingTool, "handle"),
      t.part instanceof Adornment && U.n("new handle must not be in an Adornment: " + t)),
      (this.Ts = t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    return t.isReadOnly || !t.allowRotate || !t.lastInput.left
      ? !1
      : this.findToolHandleAt(t.firstInput.documentPoint, this.name) !== null;
  }
  doActivate() {
    const t = this.diagram;
    if (this.adornedObject === null) {
      if (
        (this.handle === null && (this.handle = this.findToolHandleAt(t.firstInput.documentPoint, this.name)),
        this.handle === null)
      )
        return;
      this.adornedObject = this.handle.part.adornedObject;
    }
    this.adornedObject === null ||
      this.adornedObject.part === null ||
      ((t.isMouseCaptured = !0),
      (t.delaysLayout = !0),
      this.startTransaction(this.name),
      (this.rM = this.adornedObject.angle),
      (this.Um = this.computeRotationPoint(this.adornedObject)),
      (this.Kf = this.adornedObject.part.location.copy()),
      (this.isActive = !0));
  }
  computeRotationPoint(t) {
    const i = t.part;
    if (i !== null) {
      const e = i.locationObject;
      if (i.rotationSpot.isSpot()) return t.getDocumentPoint(i.rotationSpot);
      if (t === i || t === e) return e.getDocumentPoint(i.locationSpot);
    }
    return t.getDocumentPoint(Spot.Center);
  }
  computeAdornmentLocation(t) {
    let i = this.rotationPoint;
    i.isReal() || (i = this.computeRotationPoint(t));
    const e = t.getLocalPoint(i);
    let s = this.handleAngle;
    ((s = G.Yi(s)), (s = Math.round(Math.round(s / 45) * 45)));
    const n = this.handleDistance;
    return (
      s === 0
        ? (e.x = t.naturalBounds.width + n)
        : s === 45
          ? ((e.x = t.naturalBounds.width + n), (e.y = t.naturalBounds.height + n))
          : s === 90
            ? (e.y = t.naturalBounds.height + n)
            : s === 135
              ? ((e.x = -n), (e.y = t.naturalBounds.height + n))
              : s === 180
                ? (e.x = -n)
                : s === 225
                  ? ((e.x = -n), (e.y = -n))
                  : s === 270
                    ? (e.y = -n)
                    : s === 315 && ((e.x = t.naturalBounds.width + n), (e.y = -n)),
      t.getDocumentPoint(e)
    );
  }
  doDeactivate() {
    const t = this.diagram;
    (this.stopTransaction(),
      (this.handle = null),
      (this.Ts = null),
      (this.Um = new Point(NaN, NaN)),
      (t.isMouseCaptured = !1),
      (this.isActive = !1));
  }
  stopTransaction() {
    const t = this.diagram,
      i = super.stopTransaction();
    return (i && t.undoManager.transactionToUndo !== null && t.undoManager.transactionToUndo.optimize(), i);
  }
  doCancel() {
    const t = this.diagram;
    ((t.delaysLayout = !1), this.rotate(this.originalAngle), this.stopTool());
  }
  doMouseMove() {
    const t = this.diagram;
    if (this.isActive) {
      const i = this.computeRotate(t.lastInput.documentPoint);
      this.rotate(i);
    }
  }
  doMouseUp() {
    const t = this.diagram;
    if (this.isActive) {
      t.delaysLayout = !1;
      const i = this.computeRotate(t.lastInput.documentPoint);
      (this.rotate(i),
        t.invalidateDocumentBounds(),
        (this.transactionResult = this.name),
        t.F("PartRotated", this.adornedObject, this.originalAngle));
    }
    this.stopTool();
  }
  rotate(t) {
    Debug && U.r(t, RotatingTool, "rotate:newangle");
    const i = this.adornedObject;
    if (i === null || i.part === null) return;
    i.angle = t;
    const e = i.part;
    e.ensureBounds();
    const s = e.locationObject,
      n = e.rotateObject;
    if (s === n || s.isContainedBy(n)) {
      const o = this.Kf.copy();
      e.location = o
        .subtract(this.rotationPoint)
        .rotate(t - this.originalAngle)
        .add(this.rotationPoint);
    }
    this.diagram.maybeUpdate();
  }
  computeRotate(t) {
    let i = this.rotationPoint.directionPoint(t) - this.handleAngle;
    const e = this.adornedObject?.panel;
    (e && (i -= e.getDocumentAngle()), (i = G.Yi(i)));
    const s = Math.min(Math.abs(this.snapAngleMultiple), 180),
      n = Math.min(Math.abs(this.snapAngleEpsilon), s / 2);
    return (
      !this.diagram.lastInput.shift &&
        s > 0 &&
        n > 0 &&
        (i % s < n ? (i = Math.floor(i / s) * s) : i % s > s - n && (i = (Math.floor(i / s) + 1) * s)),
      G.Yi(i)
    );
  }
  get snapAngleMultiple() {
    return this.nM;
  }
  set snapAngleMultiple(t) {
    (U.i(t, "number", RotatingTool, "snapAngleMultiple"), (this.nM = t));
  }
  get snapAngleEpsilon() {
    return this.oM;
  }
  set snapAngleEpsilon(t) {
    (U.i(t, "number", RotatingTool, "snapAngleEpsilon"), (this.oM = t));
  }
  get originalAngle() {
    return this.rM;
  }
  get rotationPoint() {
    return this.Um;
  }
  set rotationPoint(t) {
    this.Um = t.copy();
  }
  get handleAngle() {
    return this.lM;
  }
  set handleAngle(t) {
    (U.i(t, "number", RotatingTool, "handleAngle"), (this.lM = t));
  }
  get handleDistance() {
    return this.hM;
  }
  set handleDistance(t) {
    (U.i(t, "number", RotatingTool, "handleDistance"), (this.hM = t));
  }
}
