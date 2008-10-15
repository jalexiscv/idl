class ResizingTool extends Tool {
  Dr;
  Fr;
  zo;
  Yf;
  iM;
  Ts;
  Tr;
  As;
  Km;
  eM;
  Kf;
  Ex;
  Vx;
  Bx;
  constructor(t) {
    (super(),
      (this.name = "Resizing"),
      (this.Dr = new Size(1, 1).k()),
      (this.Fr = new Size(9999, 9999).k()),
      (this.zo = new Size(NaN, NaN).k()),
      (this.Yf = !1),
      (this.iM = !0),
      (this.Ts = null),
      (this.Tr = new Shape("Rectangle", {
        alignmentFocus: Spot.Center,
        desiredSize: Size.zA,
        fill: "lightblue",
        stroke: "dodgerblue",
        strokeWidth: 1,
        cursor: "pointer",
      })
        .theme("fill", "adornmentFill")
        .theme("stroke", "adornmentStroke")),
      (this.As = null),
      (this.Km = new Point()),
      (this.eM = new Size()),
      (this.Kf = new Point()),
      (this.Ex = new Size(0, 0)),
      (this.Vx = new Size(1 / 0, 1 / 0)),
      (this.Bx = new Size(1, 1)),
      t && Object.assign(this, t));
  }
  updateAdornments(t) {
    if (t !== null) {
      if (t.Ir()) {
        const i = t.rotateObject;
        if (i === t || i === t.path || i.isPanelMain) return;
      }
      if (t.isSelected && !this.diagram.isReadOnly) {
        const i = t.resizeObject;
        let e = t.findAdornment(this.name);
        if (
          i !== null &&
          t.canResize() &&
          t.actualBounds.isReal() &&
          t.isVisible() &&
          i.actualBounds.isReal() &&
          i.isVisibleObject() &&
          ((e === null || e.adornedObject !== i) && (e = this.makeAdornment(i)), e !== null)
        ) {
          const s = i.getDocumentAngle();
          (t.Gl() && this.updateResizeHandles(e, s), t.addAdornment(this.name, e));
          return;
        }
      }
      t.removeAdornment(this.name);
    }
  }
  makeAdornment(t) {
    let i = null;
    const e = t.part?.resizeAdornmentTemplate;
    if (e) {
      if (((i = e.copy()), i === null)) return null;
    } else {
      ((i = new Adornment()), (i.type = Panel.Spot), (i.locationSpot = Spot.Center));
      const s = new Placeholder();
      ((s.isPanelMain = !0), i.add(s));
      let n = this.makeHandle(t, Spot.TopLeft);
      (n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.TopRight)),
        n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.BottomRight)),
        n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.BottomLeft)),
        n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.MiddleTop)),
        n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.MiddleRight)),
        n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.MiddleBottom)),
        n !== null && i.add(n),
        (n = this.makeHandle(t, Spot.MiddleLeft)),
        n !== null && i.add(n));
    }
    return ((i.adornedObject = t), i);
  }
  makeHandle(t, i) {
    const e = this.handleArchetype;
    if (e === null) return null;
    const s = e.copy().tM();
    return ((s.alignment = i), s);
  }
  updateResizeHandles(t, i) {
    if (t !== null) {
      if (!t.alignment.isDefault() && (t.cursor === "pointer" || t.cursor.indexOf("resize") > 0)) this.AR(t, i);
      else if (t instanceof Panel) {
        const e = t.elements;
        for (; e.next(); ) {
          const s = e.value;
          this.updateResizeHandles(s, i);
        }
      }
    }
  }
  AR(t, i) {
    let e = t.alignment;
    e.isNoSpot() && (e = Spot.Center);
    let s = i;
    if (e.x <= 0) e.y <= 0 ? (s += 225) : e.y >= 1 ? (s += 135) : (s += 180);
    else if (e.x >= 1) e.y <= 0 ? (s += 315) : e.y >= 1 && (s += 45);
    else if (e.y <= 0) s += 270;
    else if (e.y >= 1) s += 90;
    else return;
    ((s = G.Yi(s)),
      s < 22.5
        ? (t.cursor = "e-resize")
        : s < 67.5
          ? (t.cursor = "se-resize")
          : s < 112.5
            ? (t.cursor = "s-resize")
            : s < 157.5
              ? (t.cursor = "sw-resize")
              : s < 202.5
                ? (t.cursor = "w-resize")
                : s < 247.5
                  ? (t.cursor = "nw-resize")
                  : s < 292.5
                    ? (t.cursor = "n-resize")
                    : s < 337.5
                      ? (t.cursor = "ne-resize")
                      : (t.cursor = "e-resize"));
  }
  get handleArchetype() {
    return this.Tr;
  }
  set handleArchetype(t) {
    (t !== null && U.s(t, GraphObject, ResizingTool, "handleArchetype"), (this.Tr = t));
  }
  get handle() {
    return this.As;
  }
  set handle(t) {
    (t !== null &&
      (U.s(t, GraphObject, ResizingTool, "handle"),
      t.part instanceof Adornment || U.n("new handle is not in an Adornment: " + t)),
      (this.As = t));
  }
  get adornedObject() {
    return this.Ts;
  }
  set adornedObject(t) {
    (t !== null &&
      (U.s(t, GraphObject, ResizingTool, "handle"),
      t.part instanceof Adornment && U.n("new handle must not be in an Adornment: " + t)),
      (this.Ts = t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    return t.isReadOnly || !t.allowResize || !t.lastInput.left
      ? !1
      : this.findToolHandleAt(t.firstInput.documentPoint, this.name) !== null;
  }
  doActivate() {
    const t = this.diagram;
    (this.handle === null && (this.handle = this.findToolHandleAt(t.firstInput.documentPoint, this.name)),
      this.handle !== null &&
        ((this.adornedObject = this.handle.part.adornedObject),
        this.adornedObject !== null &&
          this.adornedObject.part !== null &&
          ((t.isMouseCaptured = !0),
          t.animationManager.stopAnimation(),
          (t.Yu = !0),
          this.startTransaction(this.name),
          this.Km.set(this.adornedObject.getDocumentPoint(this.handle.alignment.opposite())),
          this.Kf.set(this.adornedObject.part.location),
          this.eM.set(this.adornedObject.desiredSize),
          (this.Bx = this.computeCellSize()),
          (this.Ex = this.computeMinSize()),
          (this.Vx = this.computeMaxSize()),
          (this.isActive = !0))));
  }
  doDeactivate() {
    const t = this.diagram;
    ((t.Yu = !1),
      (t.zl = !0),
      this.stopTransaction(),
      (this.handle = null),
      (this.Ts = null),
      (t.isMouseCaptured = !1),
      (this.isActive = !1));
  }
  stopTransaction() {
    const t = this.diagram,
      i = super.stopTransaction();
    return (i && t.undoManager.transactionToUndo !== null && t.undoManager.transactionToUndo.optimize(), i);
  }
  doCancel() {
    (this.adornedObject !== null &&
      this.adornedObject.part !== null &&
      ((this.adornedObject.desiredSize = this.originalDesiredSize),
      (this.adornedObject.part.location = this.originalLocation)),
      this.stopTool());
  }
  doMouseMove() {
    const t = this.diagram;
    if (!this.isActive || this.adornedObject === null || this.handle === null) return;
    const i = this.Ex,
      e = this.Vx,
      s = this.Bx,
      n = t.lastInput.documentPoint,
      o = this.adornedObject.getLocalPoint(n, Point.a()),
      r = this.computeReshape(),
      l = this.computeResize(o, this.handle.alignment, i, e, s, r);
    (this.resize(l), t.maybeUpdate(), Point.o(o));
  }
  doMouseUp() {
    const t = this.diagram;
    if (this.isActive && this.adornedObject !== null && this.handle !== null) {
      const i = this.Ex,
        e = this.Vx,
        s = this.Bx,
        n = this.adornedObject.getLocalPoint(t.lastInput.documentPoint, Point.a()),
        o = this.computeReshape(),
        r = this.computeResize(n, this.handle.alignment, i, e, s, o);
      (this.resize(r),
        Point.o(n),
        t.invalidateDocumentBounds(),
        (this.transactionResult = this.name),
        t.F("PartResized", this.adornedObject, this.originalDesiredSize));
    }
    this.stopTool();
  }
  resize(t) {
    const i = this.diagram,
      e = this.adornedObject;
    if (e === null) return;
    e.desiredSize = t.size;
    const s = e.part;
    if (s === null || this.handle === null) return;
    s.ensureBounds();
    const n = e.getDocumentPoint(this.handle.alignment.opposite());
    if (s instanceof Group) {
      const o = new List();
      o.add(s);
      let r;
      (!this.dragsMembers && !s.hasPlaceholder() && ((r = new DraggingOptions()), (r.dragsMembers = !1)),
        i.moveParts(o, this.oppositePoint.copy().subtract(n), !0, r));
    } else s.location = s.location.copy().subtract(n).add(this.oppositePoint);
    i.maybeUpdate();
  }
  computeResize(t, i, e, s, n, o) {
    if (this.adornedObject === null) return Rect.om;
    i.isNoSpot() && (i = Spot.Center);
    const r = this.adornedObject.naturalBounds,
      l = r.x,
      h = r.y,
      a = r.x + r.width,
      f = r.y + r.height;
    let c = 1;
    if (!o) {
      let m = r.width,
        g = r.height;
      (m <= 0 && (m = 1), g <= 0 && (g = 1), (c = g / m));
    }
    const u = Point.a();
    G.nm(t.x, t.y, l, h, n.width, n.height, u);
    const d = r.copy();
    return (
      i.x <= 0
        ? i.y <= 0
          ? ((d.x = Math.max(u.x, a - s.width)),
            (d.x = Math.min(d.x, a - e.width)),
            (d.width = Math.max(a - d.x, e.width)),
            (d.y = Math.max(u.y, f - s.height)),
            (d.y = Math.min(d.y, f - e.height)),
            (d.height = Math.max(f - d.y, e.height)),
            o ||
              (d.height / d.width >= 1
                ? ((d.height = Math.max(Math.min(c * d.width, s.height), e.height)), (d.width = d.height / c))
                : ((d.width = Math.max(Math.min(d.height / c, s.width), e.width)), (d.height = c * d.width)),
              (d.x = a - d.width),
              (d.y = f - d.height)))
          : i.y >= 1
            ? ((d.x = Math.max(u.x, a - s.width)),
              (d.x = Math.min(d.x, a - e.width)),
              (d.width = Math.max(a - d.x, e.width)),
              (d.height = Math.max(Math.min(u.y - h, s.height), e.height)),
              o ||
                (d.height / d.width >= 1
                  ? ((d.height = Math.max(Math.min(c * d.width, s.height), e.height)), (d.width = d.height / c))
                  : ((d.width = Math.max(Math.min(d.height / c, s.width), e.width)), (d.height = c * d.width)),
                (d.x = a - d.width)))
            : ((d.x = Math.max(u.x, a - s.width)),
              (d.x = Math.min(d.x, a - e.width)),
              (d.width = a - d.x),
              o ||
                ((d.height = Math.max(Math.min(c * d.width, s.height), e.height)),
                (d.width = d.height / c),
                (d.y = h + 0.5 * (f - h - d.height))))
        : i.x >= 1
          ? i.y <= 0
            ? ((d.width = Math.max(Math.min(u.x - l, s.width), e.width)),
              (d.y = Math.max(u.y, f - s.height)),
              (d.y = Math.min(d.y, f - e.height)),
              (d.height = Math.max(f - d.y, e.height)),
              o ||
                (d.height / d.width >= 1
                  ? ((d.height = Math.max(Math.min(c * d.width, s.height), e.height)), (d.width = d.height / c))
                  : ((d.width = Math.max(Math.min(d.height / c, s.width), e.width)), (d.height = c * d.width)),
                (d.y = f - d.height)))
            : i.y >= 1
              ? ((d.width = Math.max(Math.min(u.x - l, s.width), e.width)),
                (d.height = Math.max(Math.min(u.y - h, s.height), e.height)),
                o ||
                  (d.height / d.width >= 1
                    ? ((d.height = Math.max(Math.min(c * d.width, s.height), e.height)), (d.width = d.height / c))
                    : ((d.width = Math.max(Math.min(d.height / c, s.width), e.width)), (d.height = c * d.width))))
              : ((d.width = Math.max(Math.min(u.x - l, s.width), e.width)),
                o ||
                  ((d.height = Math.max(Math.min(c * d.width, s.height), e.height)),
                  (d.width = d.height / c),
                  (d.y = h + 0.5 * (f - h - d.height))))
          : i.y <= 0
            ? ((d.y = Math.max(u.y, f - s.height)),
              (d.y = Math.min(d.y, f - e.height)),
              (d.height = f - d.y),
              o ||
                ((d.width = Math.max(Math.min(d.height / c, s.width), e.width)),
                (d.height = c * d.width),
                (d.x = l + 0.5 * (a - l - d.width))))
            : i.y >= 1 &&
              ((d.height = Math.max(Math.min(u.y - h, s.height), e.height)),
              o ||
                ((d.width = Math.max(Math.min(d.height / c, s.width), e.width)),
                (d.height = c * d.width),
                (d.x = l + 0.5 * (a - l - d.width)))),
      Point.o(u),
      d
    );
  }
  computeReshape() {
    let t = 0;
    return (
      this.adornedObject instanceof Shape && (t = this.adornedObject.sM()),
      !(t === 6 || this.diagram.lastInput.shift)
    );
  }
  computeMinSize() {
    if (this.adornedObject === null) return Size.sa;
    const t = this.adornedObject.minSize.copy(),
      i = this.minSize;
    return (
      !isNaN(i.width) && i.width > t.width && (t.width = i.width),
      !isNaN(i.height) && i.height > t.height && (t.height = i.height),
      t
    );
  }
  computeMaxSize() {
    if (this.adornedObject === null) return Size.Zw;
    const t = this.adornedObject.maxSize.copy(),
      i = this.maxSize;
    return (
      !isNaN(i.width) && i.width < t.width && (t.width = i.width),
      !isNaN(i.height) && i.height < t.height && (t.height = i.height),
      t
    );
  }
  computeCellSize() {
    const t = new Size(NaN, NaN),
      i = this.adornedObject?.part;
    if (i) {
      const n = i.resizeCellSize;
      (!isNaN(n.width) && n.width > 0 && (t.width = n.width),
        !isNaN(n.height) && n.height > 0 && (t.height = n.height));
    }
    let e = this.cellSize;
    (isNaN(t.width) && !isNaN(e.width) && e.width > 0 && (t.width = e.width),
      isNaN(t.height) && !isNaN(e.height) && e.height > 0 && (t.height = e.height));
    const s = this.diagram;
    if ((isNaN(t.width) || isNaN(t.height)) && s) {
      const n = s.grid;
      n !== null &&
        n.visible &&
        this.isGridSnapEnabled &&
        ((e = n.gridCellSize),
        isNaN(t.width) && !isNaN(e.width) && e.width > 0 && (t.width = e.width),
        isNaN(t.height) && !isNaN(e.height) && e.height > 0 && (t.height = e.height));
    }
    return (
      (isNaN(t.width) || t.width === 0 || t.width === 1 / 0) && (t.width = 1),
      (isNaN(t.height) || t.height === 0 || t.height === 1 / 0) && (t.height = 1),
      t
    );
  }
  get minSize() {
    return this.Dr;
  }
  set minSize(t) {
    if ((U.s(t, Size, ResizingTool, "minSize"), !this.Dr.equals(t))) {
      let e = t.width;
      isNaN(e) && (e = 0);
      let s = t.height;
      (isNaN(s) && (s = 0), this.Dr.e(e, s));
    }
  }
  get maxSize() {
    return this.Fr;
  }
  set maxSize(t) {
    if ((U.s(t, Size, ResizingTool, "maxSize"), !this.Fr.equals(t))) {
      let e = t.width;
      isNaN(e) && (e = 1 / 0);
      let s = t.height;
      (isNaN(s) && (s = 1 / 0), this.Fr.e(e, s));
    }
  }
  get cellSize() {
    return this.zo;
  }
  set cellSize(t) {
    (U.s(t, Size, ResizingTool, "cellSize"), this.zo.equals(t) || this.zo.c(t));
  }
  get isGridSnapEnabled() {
    return this.Yf;
  }
  set isGridSnapEnabled(t) {
    (U.i(t, "boolean", ResizingTool, "isGridSnapEnabled"), (this.Yf = t));
  }
  get dragsMembers() {
    return this.iM;
  }
  set dragsMembers(t) {
    (U.i(t, "boolean", ResizingTool, "dragsMembers"), (this.iM = t));
  }
  get oppositePoint() {
    return this.Km;
  }
  set oppositePoint(t) {
    (U.s(t, Point, ResizingTool, "oppositePoint"), this.Km.equals(t) || this.Km.c(t));
  }
  get originalDesiredSize() {
    return this.eM;
  }
  get originalLocation() {
    return this.Kf;
  }
}
