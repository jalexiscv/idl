class LinkReshapingTool extends Tool {
  Tr;
  jP;
  JP;
  As;
  Ox;
  $P;
  Ym;
  constructor(t) {
    (super(),
      (this.name = "LinkReshaping"),
      (this.Tr = new Shape("Rectangle", { desiredSize: Size.zA, fill: "lightblue", stroke: "dodgerblue" })
        .theme("fill", "adornmentFill")
        .theme("stroke", "adornmentStroke")),
      (this.jP = new Shape("Diamond", { desiredSize: Size.Tu, fill: "lightblue", stroke: "dodgerblue", cursor: "move" })
        .theme("fill", "adornmentFill")
        .theme("stroke", "adornmentStroke")),
      (this.JP = 3),
      (this.As = null),
      (this.Ox = null),
      (this.$P = new Point()),
      (this.Ym = new List()),
      t && Object.assign(this, t));
  }
  static None = 0;
  static Horizontal = 1;
  static Vertical = 2;
  static All = 3;
  getReshapingBehavior(t) {
    return t ? t.Lr : 0;
  }
  setReshapingBehavior(t, i) {
    t.Lr = i;
  }
  updateAdornments(t) {
    if (t === null || !(t instanceof Link)) return;
    let i = null;
    if (t.isSelected && !this.diagram.isReadOnly) {
      const e = t.path;
      e !== null &&
        t.canReshape() &&
        t.actualBounds.isReal() &&
        t.isVisible() &&
        e.actualBounds.isReal() &&
        e.isVisibleObject() &&
        ((i = t.findAdornment(this.name)),
        (i === null || i.ZP !== t.pointsCount || i.QP !== t.resegmentable) &&
          ((i = this.makeAdornment(e)),
          i !== null && ((i.ZP = t.pointsCount), (i.QP = t.resegmentable), t.addAdornment(this.name, i))));
    }
    i === null && t.removeAdornment(this.name);
  }
  makeAdornment(t) {
    const i = t.part,
      e = i.points,
      s = i.pointsCount,
      n = i.isOrthogonal;
    let o = null;
    if (e !== null && s > 1) {
      ((o = new Adornment()), (o.type = Panel.Link));
      const r = i.firstPickIndex,
        l = i.lastPickIndex,
        h = n ? 1 : 0;
      if (i.resegmentable && (i.computeCurve() !== 9 || i.isOrthogonal))
        for (let c = r + h; c < l - h; c++) {
          const u = this.makeResegmentHandle(t, c);
          u !== null && ((u.segmentIndex = c), (u.segmentFraction = 0.5), (u.fromMaxLinks = 999), o.add(u));
        }
      let a = r + 1,
        f = l - 1;
      for (; a <= f; )
        if (a < f) (this._P(t, o, r, l, a), this._P(t, o, r, l, f), a++, f--);
        else if (a === f) {
          this._P(t, o, r, l, a);
          break;
        }
      o.adornedObject = t;
    }
    return o;
  }
  _P(t, i, e, s, n) {
    const o = t.part,
      r = o.isOrthogonal,
      l = this.makeHandle(t, n);
    if (l !== null) {
      if (((l.segmentIndex = n), n !== e))
        if (n === e + 1 && r) {
          const h = o.getPoint(e);
          let a = o.getPoint(e + 1);
          G.u(h.x, a.x) && G.u(h.y, a.y)
            ? ((a = o.getPoint(e - 1)),
              G.u(h.x, a.x)
                ? (this.setReshapingBehavior(l, 2), (l.cursor = "n-resize"))
                : G.u(h.y, a.y) && (this.setReshapingBehavior(l, 1), (l.cursor = "w-resize")))
            : G.u(h.x, a.x)
              ? (this.setReshapingBehavior(l, 2), (l.cursor = "n-resize"))
              : G.u(h.y, a.y) && (this.setReshapingBehavior(l, 1), (l.cursor = "w-resize"));
        } else if (n === s - 1 && r) {
          let h = o.getPoint(s - 1);
          const a = o.getPoint(s);
          G.u(h.x, a.x) && G.u(h.y, a.y)
            ? ((h = o.getPoint(s + 1)),
              G.u(h.x, a.x)
                ? (this.setReshapingBehavior(l, 2), (l.cursor = "n-resize"))
                : G.u(h.y, a.y) && (this.setReshapingBehavior(l, 1), (l.cursor = "w-resize")))
            : G.u(h.x, a.x)
              ? (this.setReshapingBehavior(l, 2), (l.cursor = "n-resize"))
              : G.u(h.y, a.y) && (this.setReshapingBehavior(l, 1), (l.cursor = "w-resize"));
        } else n === s || (this.setReshapingBehavior(l, 3), (l.cursor = "move"));
      i.add(l);
    }
  }
  makeHandle(t, i) {
    const e = this.handleArchetype;
    return e === null ? null : e.copy().tM();
  }
  get handleArchetype() {
    return this.Tr;
  }
  set handleArchetype(t) {
    (t !== null && U.s(t, GraphObject, LinkReshapingTool, "handleArchetype"), (this.Tr = t));
  }
  makeResegmentHandle(t, i) {
    const e = this.midHandleArchetype;
    return e === null ? null : e.copy().tM();
  }
  get midHandleArchetype() {
    return this.jP;
  }
  set midHandleArchetype(t) {
    (t !== null && U.s(t, GraphObject, LinkReshapingTool, "midHandleArchetype"), (this.jP = t));
  }
  get handle() {
    return this.As;
  }
  set handle(t) {
    (t !== null &&
      (U.s(t, GraphObject, LinkReshapingTool, "handle"),
      t.part instanceof Adornment || U.n("new handle is not in an Adornment: " + t)),
      (this.As = t));
  }
  get adornedLink() {
    return this.Ox;
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    return t.isReadOnly || !t.allowReshape || !t.lastInput.left
      ? !1
      : this.findToolHandleAt(t.firstInput.documentPoint, this.name) !== null;
  }
  doActivate() {
    const t = this.diagram;
    if (
      (this.handle === null && (this.handle = this.findToolHandleAt(t.firstInput.documentPoint, this.name)),
      this.handle === null)
    )
      return;
    const i = this.handle.part.adornedPart;
    if (i instanceof Link) {
      if (
        ((this.Ox = i),
        (t.isMouseCaptured = !0),
        this.startTransaction(this.name),
        i.resegmentable && this.handle.fromMaxLinks === 999)
      ) {
        const e = i.points.copy(),
          s = this.getResegmentingPoint();
        if (
          (e.insertAt(this.handle.segmentIndex + 1, s),
          i.isOrthogonal && e.insertAt(this.handle.segmentIndex + 1, s),
          (i.points = e),
          i.invalidateAdornments(),
          i.updateAdornments(),
          (this.handle = this.findToolHandleAt(t.firstInput.documentPoint, this.name)),
          this.handle === null)
        ) {
          this.doDeactivate();
          return;
        }
      }
      ((this.$P = i.getPoint(this.handle.segmentIndex)), (this.Ym = i.points.copy()), (this.isActive = !0));
    }
  }
  doDeactivate() {
    (this.stopTransaction(), (this.handle = null), (this.Ox = null));
    const t = this.diagram;
    ((t.isMouseCaptured = !1), (this.isActive = !1));
  }
  stopTransaction() {
    const t = this.diagram,
      i = super.stopTransaction();
    return (i && t.undoManager.transactionToUndo !== null && t.undoManager.transactionToUndo.optimize(), i);
  }
  doCancel() {
    const t = this.adornedLink;
    (t !== null && (t.points = this.Ym), this.stopTool());
  }
  getResegmentingPoint() {
    return this.handle === null ? this.diagram.lastInput.documentPoint : this.handle.getDocumentPoint(Spot.Center);
  }
  doMouseMove() {
    const t = this.diagram;
    if (this.isActive) {
      const i = this.computeReshape(t.lastInput.documentPoint);
      this.reshape(i);
    }
  }
  doMouseUp() {
    const t = this.diagram;
    if (this.isActive) {
      const i = this.computeReshape(t.lastInput.documentPoint);
      this.reshape(i);
      const e = this.adornedLink;
      if (e !== null && e.resegmentable && this.handle !== null && (e.computeCurve() !== 9 || e.isOrthogonal)) {
        const s = this.handle.segmentIndex,
          n = e.getPoint(s - 1),
          o = e.getPoint(s),
          r = e.getPoint(s + 1);
        if (e.isOrthogonal) {
          if (s > e.firstPickIndex + 1 && s < e.lastPickIndex - 1) {
            let l = e.getPoint(s - 2);
            if (
              this.isWithinResegmentingDistance(n, o) &&
              (this.isInLineOrtho(l, n, o, r, !0) || this.isInLineOrtho(l, n, o, r, !1))
            ) {
              const h = e.points.copy();
              (this.isInLineOrtho(l, n, o, r, !0)
                ? (h.setElt(s - 2, new Point(l.x, (r.y + l.y) / 2)), h.setElt(s + 1, new Point(r.x, (r.y + l.y) / 2)))
                : (h.setElt(s - 2, new Point((r.x + l.x) / 2, l.y)), h.setElt(s + 1, new Point((r.x + l.x) / 2, r.y))),
                h.removeAt(s),
                h.removeAt(s - 1),
                (e.points = h),
                e.invalidateAdornments());
            } else if (
              ((l = e.getPoint(s + 2)),
              this.isWithinResegmentingDistance(o, r) &&
                (this.isInLineOrtho(n, o, r, l, !0) || this.isInLineOrtho(n, o, r, l, !1)))
            ) {
              const h = e.points.copy();
              (this.isInLineOrtho(n, o, r, l, !0)
                ? (h.setElt(s - 1, new Point(n.x, (n.y + l.y) / 2)), h.setElt(s + 2, new Point(l.x, (n.y + l.y) / 2)))
                : (h.setElt(s - 1, new Point((n.x + l.x) / 2, n.y)), h.setElt(s + 2, new Point((n.x + l.x) / 2, l.y))),
                h.removeAt(s + 1),
                h.removeAt(s),
                (e.points = h),
                e.invalidateAdornments());
            }
          }
        } else {
          const l = Point.a();
          if (
            G.Fl(n.x, n.y, r.x, r.y, o.x, o.y, l) &&
            l.distanceSquaredPoint(o) < this.resegmentingDistance * this.resegmentingDistance
          ) {
            const h = e.points.copy();
            (h.removeAt(s), (e.points = h), e.invalidateAdornments());
          }
          Point.o(l);
        }
      }
      (t.invalidateDocumentBounds(),
        (this.transactionResult = this.name),
        t.F("LinkReshaped", this.adornedLink, this.Ym));
    }
    this.stopTool();
  }
  isWithinResegmentingDistance(t, i) {
    return Math.abs(t.x - i.x) < this.resegmentingDistance && Math.abs(t.y - i.y) < this.resegmentingDistance;
  }
  isInLineOrtho(t, i, e, s, n) {
    return n
      ? Math.abs(t.y - i.y) < this.resegmentingDistance &&
          Math.abs(i.y - e.y) < this.resegmentingDistance &&
          Math.abs(e.y - s.y) < this.resegmentingDistance
      : Math.abs(t.x - i.x) < this.resegmentingDistance &&
          Math.abs(i.x - e.x) < this.resegmentingDistance &&
          Math.abs(e.x - s.x) < this.resegmentingDistance;
  }
  get resegmentingDistance() {
    return this.JP;
  }
  set resegmentingDistance(t) {
    (U.i(t, "number", LinkReshapingTool, "resegmentingDistance"), (this.JP = t));
  }
  reshape(t) {
    const i = this.adornedLink;
    if (i === null) return;
    const e = this.handle;
    if (e === null) return;
    i.startRoute();
    let s = e.segmentIndex;
    const n = this.getReshapingBehavior(e);
    if (i.isOrthogonal)
      if (s === i.firstPickIndex + 1) {
        const o = i.firstPickIndex + 1;
        n === 2
          ? (i.setPointAt(o, i.getPoint(o - 1).x, t.y), i.setPointAt(o + 1, i.getPoint(o + 2).x, t.y))
          : n === 1 && (i.setPointAt(o, t.x, i.getPoint(o - 1).y), i.setPointAt(o + 1, t.x, i.getPoint(o + 2).y));
      } else if (s === i.lastPickIndex - 1) {
        const o = i.lastPickIndex - 1;
        n === 2
          ? (i.setPointAt(o - 1, i.getPoint(o - 2).x, t.y), i.setPointAt(o, i.getPoint(o + 1).x, t.y))
          : n === 1 && (i.setPointAt(o - 1, t.x, i.getPoint(o - 2).y), i.setPointAt(o, t.x, i.getPoint(o + 1).y));
      } else {
        let o = s;
        const r = i.getPoint(o);
        if (!t.equalsApprox(r)) {
          const l = i.getPoint(o - 2),
            h = i.getPoint(o - 1),
            a = i.getPoint(o + 1),
            f = i.getPoint(o + 2);
          (G.u(h.x, r.x) && G.u(r.y, a.y)
            ? (G.u(h.x, l.x) && !G.u(h.y, l.y) && !G.u(t.x, r.x)
                ? (i.insertPointAt(o, t.x, h.y), s++, o++)
                : i.setPointAt(o - 1, t.x, h.y),
              G.u(a.y, f.y) && !G.u(a.x, f.x) && !G.u(t.y, r.y)
                ? i.insertPointAt(o + 1, a.x, t.y)
                : i.setPointAt(o + 1, a.x, t.y))
            : G.u(h.y, r.y) && G.u(r.x, a.x)
              ? (G.u(h.y, l.y) && !G.u(h.x, l.x) && !G.u(t.y, r.y)
                  ? (i.insertPointAt(o, h.x, t.y), s++, o++)
                  : i.setPointAt(o - 1, h.x, t.y),
                G.u(a.x, f.x) && !G.u(a.y, f.y) && !G.u(t.x, r.x)
                  ? i.insertPointAt(o + 1, t.x, a.y)
                  : i.setPointAt(o + 1, t.x, a.y))
              : G.u(h.x, r.x) && G.u(r.x, a.x)
                ? (G.u(h.x, l.x) && !G.u(h.y, l.y) && !G.u(t.x, r.x)
                    ? (i.insertPointAt(o, t.x, h.y), s++, o++)
                    : i.setPointAt(o - 1, t.x, h.y),
                  G.u(a.x, f.x) && !G.u(a.y, f.y) && !G.u(t.x, r.x)
                    ? i.insertPointAt(o + 1, t.x, a.y)
                    : i.setPointAt(o + 1, t.x, a.y))
                : G.u(h.y, r.y) &&
                  G.u(r.y, a.y) &&
                  (G.u(h.y, l.y) && !G.u(h.x, l.x) && !G.u(t.y, r.y)
                    ? (i.insertPointAt(o, h.x, t.y), s++, o++)
                    : i.setPointAt(o - 1, h.x, t.y),
                  G.u(a.y, f.y) && !G.u(a.x, f.x) && !G.u(t.y, r.y)
                    ? i.insertPointAt(o + 1, a.x, t.y)
                    : i.setPointAt(o + 1, a.x, t.y)),
            i.setPointAt(s, t.x, t.y));
        }
      }
    else {
      i.setPointAt(s, t.x, t.y);
      let o = i.fromNode,
        r = i.fromPort;
      if (o !== null) {
        const a = o.findVisibleNode();
        a !== null && a !== o && ((o = a), (r = o.port));
      }
      if (s === 1 && r !== null && i.computeSpot(!0, r).isNoSpot()) {
        const a = r.getDocumentPoint(Spot.Center, Point.a()),
          f = i.getLinkPointFromPoint(o, r, a, t, !0, Point.a());
        (i.setPointAt(0, f.x, f.y), Point.o(a), Point.o(f));
      }
      let l = i.toNode,
        h = i.toPort;
      if (l !== null) {
        const a = l.findVisibleNode();
        a !== null && a !== l && ((l = a), (h = l.port));
      }
      if (s === i.pointsCount - 2 && h !== null && i.computeSpot(!1, h).isNoSpot()) {
        const a = h.getDocumentPoint(Spot.Center, Point.a()),
          f = i.getLinkPointFromPoint(l, h, a, t, !1, Point.a());
        (i.setPointAt(i.pointsCount - 1, f.x, f.y), Point.o(a), Point.o(f));
      }
    }
    i.commitRoute();
  }
  computeReshape(t) {
    const i = this.adornedLink;
    if (i === null) return t;
    const e = this.handle;
    if (e === null) return t;
    const s = e.segmentIndex;
    switch (this.getReshapingBehavior(e)) {
      case 3:
        return t;
      case 2: {
        const n = i.getPoint(s);
        return new Point(n.x, t.y);
      }
      case 1: {
        const n = i.getPoint(s);
        return new Point(t.x, n.y);
      }
      default:
      case 0:
        return i.getPoint(s);
    }
  }
  get originalPoint() {
    return this.$P;
  }
  get originalPoints() {
    return this.Ym;
  }
}
