class CommandHandler {
  f;
  Pb = "idl._clipboard";
  Mb = "idl._clipboardFormat";
  Q2;
  _2;
  tN;
  iN;
  eN;
  sN;
  nN;
  oN;
  rN;
  xh;
  lN;
  Nb;
  Cb;
  Ab;
  Tb;
  hN;
  Jo;
  aN;
  fN;
  V0;
  cN;
  Lb;
  uN;
  Db;
  dN;
  gN;
  xd;
  B0;
  z0;
  mN;
  nc;
  pN;
  yN;
  wN;
  xN;
  bN;
  bd;
  SN;
  ze;
  Cs;
  Fb;
  X0;
  static Sd = ["Ctrl", "Shft", "Alt", "Meta"];
  static qL = CommandHandler.kN(230, 40, 15);
  static WO = CommandHandler.kN(270, 40, 15);
  static jO = CommandHandler.kN(310, 40, 15);
  constructor(t) {
    (GSet._i(this),
      (this.f = Diagram.Bm()),
      (this.Q2 = true),
      (this._2 = true),
      (this.tN = true),
      (this.iN = false),
      (this.eN = false),
      (this.sN = false),
      (this.nN = false),
      (this.oN = "memory"),
      (this.rN = null),
      (this.xh = null),
      (this.lN = 1.05),
      (this.Nb = NaN),
      (this.Cb = Point.xn),
      (this.Ab = NaN),
      (this.Tb = Rect.om),
      (this.hN = false),
      (this.Jo = null),
      (this.aN = 200),
      (this.fN = false),
      (this.V0 = new Adornment("Auto", { layerName: "Tool", pickable: false, selectable: false }).add(
        new Panel("Spot").add(
          new Shape({ name: "SHAPE", fill: null, stroke: "lime", strokeWidth: 4 }).bindObject(
            "stroke",
            "adornedPart",
            (i) => (i.isSelected ? "darkcyan" : "lime"),
          ),
          new Shape({
            name: "SHAPE2",
            stretch: 2,
            fill: null,
            stroke: "magenta",
            strokeWidth: 4,
            strokeDashArray: [4, 4],
          }),
        ),
        new Placeholder({ padding: 4 }),
      )),
      (this.cN = null),
      (this.Lb = ""),
      (this.uN = ""),
      (this.Db = U.yr),
      (this.dN = false),
      (this.gN = false),
      (this.xd = new Part({
        layerName: "Tool",
        isInDocumentBounds: false,
        locationObjectName: "CIRCLE",
        locationSpot: Spot.Center,
        pickable: false,
        selectable: false,
      })
        .add(
          new Shape("Circle", {
            isGeometryPositioned: true,
            width: 30,
            height: 30,
            fill: null,
            stroke: "darkcyan",
            strokeWidth: 6,
            visible: false,
          }).bind("visible", "down"),
          new Shape({ isGeometryPositioned: true, geometryString: "M15 0L15 30", stroke: "magenta" }),
          new Shape({ isGeometryPositioned: true, geometryString: "M0 15L30 15", stroke: "magenta" }),
          new Shape("Circle", {
            name: "CIRCLE",
            isGeometryPositioned: true,
            width: 20,
            height: 20,
            fill: null,
            stroke: "magenta",
            position: new Point(5, 5),
          }),
          new Shape({
            isGeometryPositioned: true,
            geometry: CommandHandler.qL,
            fill: null,
            stroke: "cyan",
            strokeWidth: 4,
          }).bind("geometry", "button", CommandHandler.JO),
          new TextBlock({ position: new Point(12, 0), font: "bold 10pt sans-serif" }).bind("text", "clickCount", (i) =>
            i > 1 ? i.toString() : "",
          ),
          new TextBlock({ position: new Point(0, 16) }).bind("text", "modifiers", CommandHandler.$O),
        )
        .freezeBindings()),
      (this.B0 = 10),
      (this.z0 = 1),
      (this.mN = null),
      (this.nc = (i) => this.ZO(i)),
      (this.pN = (i) => this.QO(i)),
      (this.yN = (i) => this._O(i)),
      (this.wN = (i) => this.tE(i)),
      (this.xN = null),
      (this.bN = "distance"),
      (this.bd = null),
      (this.SN = 0),
      (this.ze = {}),
      (this.Cs = null),
      (this.Fb = false),
      (this.X0 = null),
      this.PN(),
      (this.xd.data = this.ze),
      t && Object.assign(this, t));
  }
  toString() {
    return "CommandHandler";
  }
  get diagram() {
    return this.f;
  }
  Yo(t) {
    this.f = t;
  }
  doStart() {
    const t = this.f;
    t &&
      (t.addModelChangedListener(this.nc),
      t.addDiagramListener("ViewportBoundsChanged", this.pN),
      t.addDiagramListener("GainedFocus", this.yN),
      t.addDiagramListener("LostFocus", this.wN));
  }
  doStop() {
    const t = this.f;
    t &&
      (t.removeDiagramListener("ViewportBoundsChanged", this.pN),
      t.removeDiagramListener("GainedFocus", this.yN),
      t.removeDiagramListener("LostFocus", this.wN),
      t.removeModelChangedListener(this.nc));
  }
  doKeyDown() {
    const t = this.f,
      i = t.lastInput,
      e = i.control || i.meta,
      s = i.shift,
      n = i.alt,
      o = i.commandKey;
    e && (o === "Insert" || o === "c")
      ? this.canCopySelection() && this.copySelection()
      : (e && o === "x") || (s && o === "Delete")
        ? this.canCutSelection() && this.cutSelection()
        : (e && o === "v") || (s && o === "Insert")
          ? this.canPasteSelection() && this.pasteSelection()
          : (e && o === "y") || (e && s && o === "z") || (n && s && o === "Backspace")
            ? this.canRedo() && this.redo()
            : (e && o === "z") || (n && o === "Backspace")
              ? this.canUndo() && this.undo()
              : o === "Delete" || o === "Backspace"
                ? this.canDeleteSelection() && this.deleteSelection()
                : e && o === "a"
                  ? this.canSelectAll() && this.selectAll()
                  : o === "Escape"
                    ? this.canStopCommand() && this.stopCommand()
                    : this.HL.indexOf(o) >= 0
                      ? this.iE(o, e, s)
                      : o === "PageUp"
                        ? s && t.allowHorizontalScroll
                          ? t.scroll("page", "left")
                          : t.allowVerticalScroll && t.scroll("page", "up")
                        : o === "PageDown"
                          ? s && t.allowHorizontalScroll
                            ? t.scroll("page", "right")
                            : t.allowVerticalScroll && t.scroll("page", "down")
                          : o === "Home"
                            ? e && t.allowVerticalScroll
                              ? t.scroll("document", "up")
                              : !e && t.allowHorizontalScroll && t.scroll("document", "left")
                            : o === "End"
                              ? e && t.allowVerticalScroll
                                ? t.scroll("document", "down")
                                : !e && t.allowHorizontalScroll && t.scroll("document", "right")
                              : o === "Space"
                                ? this.canScrollToPart() && this.scrollToPart()
                                : o === "Minus" || o === "NumpadSubtract"
                                  ? this.canDecreaseZoom() && this.decreaseZoom()
                                  : o === "Equal" || o === "NumpadAdd"
                                    ? this.canIncreaseZoom() && this.increaseZoom()
                                    : e && o === "Digit0"
                                      ? this.canResetZoom() && this.resetZoom()
                                      : s && o === "z"
                                        ? this.canZoomToFit() && this.zoomToFit()
                                        : e && !s && o === "g"
                                          ? this.canGroupSelection() && this.groupSelection()
                                          : e && s && o === "g"
                                            ? this.canUngroupSelection() && this.ungroupSelection()
                                            : o === "F2"
                                              ? this.canEditTextBlock() && this.editTextBlock()
                                              : o === "ContextMenu" ||
                                                  (s && o === "F10") ||
                                                  (e && s && o === "Backslash")
                                                ? this.canShowContextMenu() && this.showContextMenu()
                                                : (i.bubbles = true);
  }
  doKeyUp() {
    const i = this.f.lastInput;
    i.bubbles = true;
  }
  stopCommand() {
    const t = this.f,
      i = t.currentTool;
    if (i instanceof ToolManager) {
      if (i.currentToolTip !== null) {
        i.hideToolTip();
        return;
      }
      t.allowSelect && t.clearSelection();
    }
    i !== null && i.doCancel();
  }
  canStopCommand() {
    return true;
  }
  selectAll() {
    const t = this.f;
    t.L();
    try {
      ((t.currentCursor = "wait"), t.F("ChangingSelection", t.selection));
      const i = t.parts;
      for (; i.next(); ) {
        const n = i.value;
        n.canSelect() && !n.layer.isTemporary && (n.isSelected = true);
      }
      const e = t.nodes;
      for (; e.next(); ) {
        const n = e.value;
        n.canSelect() && !n.layer.isTemporary && (n.isSelected = true);
      }
      const s = t.links;
      for (; s.next(); ) {
        const n = s.value;
        n.canSelect() && !n.layer.isTemporary && (n.isSelected = true);
      }
    } finally {
      (t.F("ChangedSelection", t.selection), (t.currentCursor = ""));
    }
  }
  canSelectAll() {
    return this.f.allowSelect;
  }
  deleteSelection() {
    const t = this.f;
    try {
      ((t.currentCursor = "wait"),
        t.F("ChangingSelection", t.selection),
        t.startTransaction("Delete"),
        t.F("SelectionDeleting", t.selection));
      const i = new GSet(),
        e = t.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        Part.bh(i, s, true, this.deletesTree ? 1 / 0 : 0, this.deletesConnectedLinks ? null : false, (n) => n.canDelete());
      }
      (t.removeParts(i, true), t.F("SelectionDeleted", i));
    } finally {
      (t.commitTransaction("Delete"), t.F("ChangedSelection", t.selection), (t.currentCursor = ""));
    }
  }
  canDeleteSelection() {
    const t = this.f;
    return !(t.isReadOnly || t.isModelReadOnly || !t.allowDelete || t.selection.count === 0);
  }
  copySelection() {
    const t = this.f;
    try {
      const i = new GSet(),
        e = t.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        Part.bh(i, s, true, this.copiesTree ? 1 / 0 : 0, this.copiesConnectedLinks, (n) => n.canCopy());
      }
      this.copyToClipboard(i);
    } finally {
    }
  }
  canCopySelection() {
    const t = this.f;
    return !(!t.allowCopy || !t.allowClipboard || t.selection.count === 0);
  }
  cutSelection() {
    (this.copySelection(), this.deleteSelection());
  }
  canCutSelection() {
    const t = this.f;
    return !(
      t.isReadOnly ||
      t.isModelReadOnly ||
      !t.allowCopy ||
      !t.allowDelete ||
      !t.allowClipboard ||
      t.selection.count === 0
    );
  }
  copyToClipboard(t) {
    const i = this.f,
      e = this.storageLocation === "systemClipboard";
    if (e || this.storageLocation !== "memory")
      try {
        if (t === null)
          if (e && root.navigator.clipboard) root.navigator.clipboard.writeText("");
          else {
            const n = root[this.storageLocation];
            if (!n) return;
            (n.setItem(this.Pb, ""), n.setItem(this.Mb, ""));
          }
        else {
          const n = new Diagram();
          ((n.isTreePathToChildren = i.isTreePathToChildren),
            (n.toolManager.draggingTool.dragsLink = i.toolManager.draggingTool.dragsLink),
            (n.model = i.model.copy()));
          const o = i.copyParts(t, n, false);
          if ((this.zf(o), e && root.navigator.clipboard)) root.navigator.clipboard.writeText(n.model.toJson());
          else {
            const r = root[this.storageLocation];
            if (!r) return;
            (r.setItem(this.Pb, n.model.toJson()), r.setItem(this.Mb, n.model.dataFormat));
          }
        }
        i.F("ClipboardChanged", t);
        return;
      } catch {
        return;
      }
    let s = null;
    if (t === null) Diagram.lL();
    else {
      let n = null;
      try {
        ((n = i.copyParts(t, null, true)), this.zf(n));
      } finally {
        ((s = new List()),
          n !== null && s.addAll(n.iteratorValues),
          (Diagram.M0 = s),
          (Diagram.fb = i.model.dataFormat));
      }
    }
    i.F("ClipboardChanged", s);
  }
  zf(t) {
    const i = this.diagram.model;
    this.copiesParentKey && i.Ix()
      ? t.each((e) => {
          const s = e.key,
            n = e.value;
          if (s instanceof Node && n instanceof Node && s.data && n.data) {
            const o = i.getParentKeyForNodeData(s.data),
              r = this.diagram.findNodeForKey(o);
            r !== null && !t.has(r) && i.setParentKeyForNodeData(n.data, o);
          }
        })
      : this.copiesGroupKey &&
        i.Sh() &&
        t.each((e) => {
          const s = e.key,
            n = e.value;
          if (!(s instanceof Link) && !(n instanceof Link) && s.data && n.data) {
            const o = i.getGroupForData(s.data),
              r = this.diagram.findNodeForKey(o);
            r !== null && !t.has(r) && i.setGroupForData(n.data, o);
          }
        });
  }
  pasteFromClipboard() {
    const t = this.f;
    if (this.storageLocation !== "memory") {
      const n = new GSet();
      try {
        const o = root[this.storageLocation];
        if (!o) return n;
        const r = o.getItem(this.Pb),
          l = o.getItem(this.Mb);
        if (r === null || r === "" || l !== t.model.dataFormat) return n;
        {
          const h = new Diagram();
          h.model = Model.fromJson(r);
          const a = new GSet();
          a.addAll(h.parts).addAll(h.nodes).addAll(h.links);
          const f = t.copyParts(a, t, false);
          return (this.zf(f), new GSet().addAll(f.iteratorValues));
        }
      } catch {
        return n;
      }
    }
    const i = new GSet(),
      e = Diagram.M0;
    if (e === null || Diagram.fb !== t.model.dataFormat) return i;
    let s = null;
    try {
      ((s = t.copyParts(e, t, false)), this.zf(s));
    } finally {
      if (s !== null) {
        const n = s.iterator;
        for (; n.next(); ) {
          const o = n.value,
            r = n.key;
          (o.location.isReal() ||
            (r.location.isReal()
              ? (o.location = r.location)
              : !o.position.isReal() && r.position.isReal() && (o.position = r.position)),
            i.add(o));
        }
      }
    }
    return i;
  }
  async pasteSelectionAsync(t) {
    const i = this.f;
    if (root.navigator.clipboard === void 0) {
      U.ot('Cannot paste with storageLocation "clipboard", window.isSecureContext may be false.');
      return;
    }
    try {
      ((i.currentCursor = "wait"), i.F("ChangingSelection", i.selection), i.startTransaction("Paste"));
      let e = null;
      const s = await root.navigator.clipboard.readText();
      try {
        const o = s;
        if (!(o === null || o === "")) {
          const r = new Diagram();
          r.model = Model.fromJson(o);
          const l = new GSet();
          l.addAll(r.parts).addAll(r.nodes).addAll(r.links);
          const h = i.copyParts(l, i, false);
          (this.zf(h), (e = new GSet().addAll(h.iteratorValues)));
        }
      } catch {}
      if (e === null) return;
      e.count > 0 && i.clearSelection(true);
      const n = e.iterator;
      for (; n.next(); ) {
        const o = n.value;
        o.isSelected = true;
      }
      if (t) {
        const o = i.computePartsBounds(i.selection);
        if (o.isReal()) {
          const r = this.computeEffectiveCollection(i.selection, i.ud);
          i.Fx(r, new Point(t.x - o.centerX, t.y - o.centerY), i.ud, false);
        }
      }
      i.F("ClipboardPasted", e);
    } finally {
      (i.commitTransaction("Paste"), i.F("ChangedSelection", i.selection), (i.currentCursor = ""));
    }
  }
  pasteSelection(t) {
    if (this.storageLocation === "systemClipboard") {
      this.pasteSelectionAsync(t);
      return;
    }
    const i = this.f;
    try {
      ((i.currentCursor = "wait"), i.F("ChangingSelection", i.selection), i.startTransaction("Paste"));
      const e = this.pasteFromClipboard();
      e.count > 0 && i.clearSelection(true);
      const s = e.iterator;
      for (; s.next(); ) {
        const n = s.value;
        n.isSelected = true;
      }
      if (t) {
        const n = i.computePartsBounds(i.selection);
        if (n.isReal()) {
          const o = this.computeEffectiveCollection(i.selection, i.ud);
          i.Fx(o, new Point(t.x - n.centerX, t.y - n.centerY), i.ud, false);
        }
      }
      i.F("ClipboardPasted", e);
    } finally {
      (i.commitTransaction("Paste"), i.F("ChangedSelection", i.selection), (i.currentCursor = ""));
    }
  }
  canPasteSelection(t) {
    const i = this.f;
    if (i.isReadOnly || i.isModelReadOnly || !i.allowInsert || !i.allowClipboard) return false;
    if (this.storageLocation === "systemClipboard") return true;
    if (this.storageLocation !== "memory")
      try {
        const e = root[this.storageLocation];
        if (!e) return false;
        const s = e.getItem(this.Pb),
          n = e.getItem(this.Mb);
        return !(s === null || s === "" || n !== i.model.dataFormat);
      } catch {
        return false;
      }
    return !(Diagram.M0 === null || Diagram.M0.count === 0 || Diagram.fb !== i.model.dataFormat);
  }
  undo() {
    this.f.undoManager.undo();
  }
  canUndo() {
    const t = this.f;
    return t.isReadOnly || t.isModelReadOnly ? false : t.allowUndo && t.undoManager.canUndo();
  }
  redo() {
    this.f.undoManager.redo();
  }
  canRedo() {
    const t = this.f;
    return t.isReadOnly || t.isModelReadOnly ? false : t.allowUndo && t.undoManager.canRedo();
  }
  decreaseZoom(t) {
    (t === void 0 && (t = 1 / this.zoomFactor), U.r(t, CommandHandler, "decreaseZoom:factor"));
    const i = this.f;
    if (i.autoScale !== 1) return;
    const e = i.scale * t;
    e < i.minScale || e > i.maxScale || (i.scale = e);
  }
  canDecreaseZoom(t) {
    (t === void 0 && (t = 1 / this.zoomFactor), U.r(t, CommandHandler, "canDecreaseZoom:factor"));
    const i = this.f;
    if (i.autoScale !== 1) return false;
    const e = i.scale * t;
    return e < i.minScale || e > i.maxScale ? false : i.allowZoom;
  }
  increaseZoom(t) {
    (t === void 0 && (t = this.zoomFactor), U.r(t, CommandHandler, "increaseZoom:factor"));
    const i = this.f;
    if (i.autoScale !== 1) return;
    const e = i.scale * t;
    e < i.minScale || e > i.maxScale || (i.scale = e);
  }
  canIncreaseZoom(t) {
    (t === void 0 && (t = this.zoomFactor), U.r(t, CommandHandler, "canIncreaseZoom:factor"));
    const i = this.f;
    if (i.autoScale !== 1) return false;
    const e = i.scale * t;
    return e < i.minScale || e > i.maxScale ? false : i.allowZoom;
  }
  resetZoom(t) {
    (t === void 0 && (t = this.defaultScale), U.r(t, CommandHandler, "resetZoom:newscale"));
    const i = this.f;
    t < i.minScale || t > i.maxScale || (i.scale = t);
  }
  canResetZoom(t) {
    (t === void 0 && (t = this.defaultScale), U.r(t, CommandHandler, "canResetZoom:newscale"));
    const i = this.f;
    return t < i.minScale || t > i.maxScale ? false : i.allowZoom;
  }
  zoomToFit(t) {
    const i = this.f,
      e = i.animationManager;
    (e.stopAnimation(), i.redraw());
    const s = i.position.copy(),
      n = i.scale;
    if (
      (e.jl("Zoom To Fit"),
      !t &&
        this.isZoomToFitRestoreEnabled &&
        n === this.Ab &&
        !isNaN(this.Nb) &&
        this.Cb.isReal() &&
        i.documentBounds.equals(this.Tb))
    )
      ((i.scale = this.Nb), (i.position = this.Cb), (this.Ab = NaN), (this.Tb = Rect.om));
    else {
      if (((this.Nb = n), (this.Cb = s), t)) {
        const o = t.copy();
        if (o.width > 0 && o.height > 0) {
          const r = i.viewportBounds,
            l = r.width * n,
            h = r.height * n,
            a = Math.min(l / o.width, h / o.height),
            f = l / a,
            c = h / a;
          (o.width < f && (o.x -= (f - o.width) / 2), o.height < c && (o.y -= (c - o.height) / 2));
        }
        i.zoomToRect(o, 2);
      } else i.zoomToFit();
      ((this.Ab = i.scale), (this.Tb = i.documentBounds.copy()));
    }
    e.AM();
  }
  canZoomToFit(t) {
    return this.f.allowZoom;
  }
  iE(t, i, e) {
    const s = this.f;
    t === "ArrowUp"
      ? s.allowVerticalScroll && (i ? s.scroll("pixel", "up") : s.scroll("line", "up"))
      : t === "ArrowDown"
        ? s.allowVerticalScroll && (i ? s.scroll("pixel", "down") : s.scroll("line", "down"))
        : t === "ArrowLeft"
          ? s.allowHorizontalScroll && (i ? s.scroll("pixel", "left") : s.scroll("line", "left"))
          : t === "ArrowRight" &&
            s.allowHorizontalScroll &&
            (i ? s.scroll("pixel", "right") : s.scroll("line", "right"));
  }
  scrollToPart(t) {
    (t === void 0 && (t = null), t !== null && U.s(t, Part, CommandHandler, "part"));
    const i = this.f;
    if ((i.ensureBounds(), t === null)) {
      try {
        this.Jo !== null && (this.Jo.next() ? (t = this.Jo.value) : (this.Jo = null));
      } catch {
        this.Jo = null;
      }
      t === null &&
        (i.highlighteds.count > 0
          ? (this.Jo = i.highlighteds.iterator)
          : i.selection.count > 0 && (this.Jo = i.selection.iterator),
        this.Jo !== null && this.Jo.next() && (t = this.Jo.value));
    }
    if (t !== null) {
      const e = i.animationManager;
      e.jl("Scroll To Part");
      const s = this.scrollToPartPause;
      if (s > 0) {
        const n = this.yc(t, [t]);
        if (n.length === 1) (i.startTransaction(), i.centerRect(t.actualBounds), i.commitTransaction("Scroll To Part"));
        else {
          const o = () => {
              i.startTransaction();
              let l = n.pop();
              for (
                ;
                n.length > 0 &&
                l instanceof Node &&
                l.isTreeExpanded &&
                (!(l instanceof Group) || l.isSubGraphExpanded);
              )
                l = n.pop();
              (n.length > 0
                ? (l instanceof Part && i.scrollToRect(l.actualBounds),
                  l instanceof Node && !l.isTreeExpanded && (l.isTreeExpanded = true),
                  l instanceof Group && !l.isSubGraphExpanded && (l.isSubGraphExpanded = true))
                : (l instanceof Part && i.centerRect(l.actualBounds), i.removeDiagramListener("LayoutCompleted", r)),
                i.commitTransaction("Scroll To Part"));
            },
            r = () => {
              U.yn(o, (e.isEnabled ? e.duration : 0) + s);
            };
          (i.addDiagramListener("LayoutCompleted", r), o());
        }
      } else {
        const n = i.position.copy();
        (i.centerRect(t.actualBounds), n.equalsApprox(i.position) && e.stopAnimation());
      }
    }
  }
  yc(t, i) {
    if (t.isVisible()) return i;
    if (t instanceof Adornment) {
      const e = t.adornedPart;
      e !== null && this.yc(e, i);
    } else if (t instanceof Link) {
      const e = t.fromNode;
      e !== null && this.yc(e, i);
      const s = t.toNode;
      s !== null && this.yc(s, i);
    } else {
      if (t instanceof Node) {
        const s = t.labeledLink;
        s !== null && this.yc(s, i);
        const n = t.findTreeParentNode();
        n !== null && (!n.isTreeExpanded && !n.wasTreeExpanded && i.push(n), this.yc(n, i));
      }
      const e = t.containingGroup;
      e !== null && (!e.isSubGraphExpanded && !e.wasSubGraphExpanded && i.push(e), this.yc(e, i));
    }
    return i;
  }
  canScrollToPart(t) {
    if ((t === void 0 && (t = null), t !== null && !(t instanceof Part))) return false;
    const i = this.f;
    return i.selection.count === 0 && i.highlighteds.count === 0
      ? false
      : i.allowHorizontalScroll && i.allowVerticalScroll;
  }
  collapseTree(t) {
    t === void 0 && (t = null);
    const i = this.f,
      e = "Collapse Tree";
    try {
      (i.startTransaction(e), i.animationManager.jl(e));
      const n = new List();
      if (t !== null && t.isTreeExpanded) (t.collapseTree(), n.add(t));
      else if (t === null) {
        const o = i.selection.iterator;
        for (; o.next(); ) {
          const r = o.value;
          r instanceof Node && r.isTreeExpanded && (r.collapseTree(), n.add(r));
        }
      }
      i.F("TreeCollapsed", n);
    } finally {
      i.commitTransaction(e);
    }
  }
  canCollapseTree(t) {
    t === void 0 && (t = null);
    const i = this.f;
    if (i.isReadOnly) return false;
    if (t !== null) {
      if (!(t instanceof Node) || !t.isTreeExpanded) return false;
      if (t.findTreeChildrenLinks().count > 0) return true;
    } else {
      const e = i.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        if (s instanceof Node) {
          if (!s.isTreeExpanded) continue;
          if (s.findTreeChildrenLinks().count > 0) return true;
        }
      }
    }
    return false;
  }
  expandTree(t) {
    t === void 0 && (t = null);
    const i = this.f,
      e = "Expand Tree";
    try {
      (i.startTransaction(e), i.animationManager.jl(e));
      const n = new List();
      if (t !== null && !t.isTreeExpanded) (t.expandTree(), n.add(t));
      else if (t === null) {
        const o = i.selection.iterator;
        for (; o.next(); ) {
          const r = o.value;
          r instanceof Node && (r.isTreeExpanded || (r.expandTree(), n.add(r)));
        }
      }
      i.F("TreeExpanded", n);
    } finally {
      i.commitTransaction(e);
    }
  }
  canExpandTree(t) {
    t === void 0 && (t = null);
    const i = this.f;
    if (i.isReadOnly) return false;
    if (t !== null) {
      if (!(t instanceof Node) || t.isTreeExpanded) return false;
      if (t.findTreeChildrenLinks().count > 0) return true;
    } else {
      const e = i.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        if (s instanceof Node) {
          if (s.isTreeExpanded) continue;
          if (s.findTreeChildrenLinks().count > 0) return true;
        }
      }
    }
    return false;
  }
  groupSelection() {
    const t = this.f,
      i = t.model;
    if (!i.Sh()) return;
    const e = this.archetypeGroupData;
    if (e === null) return;
    let s = null;
    try {
      ((t.currentCursor = "wait"), t.F("ChangingSelection", t.selection), t.startTransaction("Group"));
      const n = new List(),
        o = t.selection.iterator;
      for (; o.next(); ) {
        const a = o.value;
        a.Oe() && a.canGroup() && n.add(a);
      }
      const r = new List(),
        l = n.iterator;
      for (; l.next(); ) {
        const a = l.value;
        let f = false;
        const c = n.iterator;
        for (; c.next(); ) {
          const u = c.value;
          if (a.isMemberOf(u)) {
            f = true;
            break;
          }
        }
        f || r.add(a);
      }
      const h = r.first();
      if (h !== null) {
        let a = h.containingGroup;
        if (a !== null)
          for (; a !== null; ) {
            let f = false;
            const c = r.iterator;
            for (; c.next(); )
              if (!c.value.isMemberOf(a)) {
                f = true;
                break;
              }
            if (f) a = a.containingGroup;
            else break;
          }
        if (e instanceof Group) (e.Yt(), (s = e.copy()), s !== null && t.add(s));
        else if (i.isGroupForData(e)) {
          const f = i.copyNodeData(e);
          (i.addNodeData(f), (s = t.findNodeForData(f)));
        }
        if (s !== null) {
          a !== null && this.isValidMember(a, s) && (s.containingGroup = a);
          const f = r.iterator;
          for (; f.next(); ) {
            const c = f.value;
            this.isValidMember(s, c) && (c.containingGroup = s);
          }
          (t.clearSelection(true), (s.isSelected = true));
        }
      }
      t.F("SelectionGrouped", s);
    } finally {
      (t.commitTransaction("Group"), t.F("ChangedSelection", t.selection), (t.currentCursor = ""));
    }
  }
  canGroupSelection() {
    const t = this.f;
    if (
      t.isReadOnly ||
      t.isModelReadOnly ||
      !t.allowInsert ||
      !t.allowGroup ||
      !t.model.Sh() ||
      this.archetypeGroupData === null
    )
      return false;
    const e = t.selection.iterator;
    for (; e.next(); ) {
      const s = e.value;
      if (s.Oe() && s.canGroup()) return true;
    }
    return false;
  }
  MN(t) {
    const i = U.ht();
    if (Array.isArray(t))
      t.forEach((n) => {
        n instanceof Link || (n instanceof Part && i.push(n));
      });
    else {
      const n = t.iterator;
      for (; n.next(); ) {
        const o = n.value;
        o instanceof Link || (o instanceof Part && i.push(o));
      }
    }
    const e = new GSet(),
      s = i.length;
    for (let n = 0; n < s; n++) {
      const o = i[n];
      let r = true;
      for (let l = 0; l < s; l++)
        if (o.isMemberOf(i[l])) {
          r = false;
          break;
        }
      r && e.add(o);
    }
    return (U.et(i), e);
  }
  isValidMember(t, i) {
    if (i === null || t === i || i instanceof Link) return false;
    let e;
    return t !== null &&
      (t === i ||
        t.isMemberOf(i) ||
        ((e = t.memberValidation), e !== null && !e(t, i)) ||
        (t.data === null && i.data !== null) ||
        (t.data !== null && i.data === null))
      ? false
      : ((e = this.memberValidation), e !== null ? e(t, i) : true);
  }
  ungroupSelection(t) {
    t === void 0 && (t = null);
    const i = this.f,
      e = i.model;
    if (e.Sh())
      try {
        ((i.currentCursor = "wait"), i.F("ChangingSelection", i.selection), i.startTransaction("Ungroup"));
        const s = new List();
        if (t !== null) s.add(t);
        else {
          const o = i.selection.iterator;
          for (; o.next(); ) {
            const r = o.value;
            r instanceof Group && r.canUngroup() && s.add(r);
          }
        }
        const n = new List();
        if (s.count > 0) {
          i.clearSelection(true);
          const o = s.iterator;
          for (; o.next(); ) {
            const r = o.value;
            r.expandSubGraph();
            const l = r.containingGroup,
              h = l !== null && l.data !== null ? e.getKeyForNodeData(l.data) : void 0;
            n.addAll(r.memberParts);
            const a = n.iterator;
            for (; a.next(); ) {
              const f = a.value;
              if (((f.isSelected = true), f instanceof Link)) continue;
              const c = f.data;
              c !== null ? e.setGroupForData(c, h) : (f.containingGroup = l);
            }
            i.remove(r);
          }
        }
        i.F("SelectionUngrouped", s, n);
      } finally {
        (i.commitTransaction("Ungroup"), i.F("ChangedSelection", i.selection), (i.currentCursor = ""));
      }
  }
  canUngroupSelection(t) {
    t === void 0 && (t = null);
    const i = this.f;
    if (i.isReadOnly || i.isModelReadOnly || !i.allowDelete || !i.allowUngroup || !i.model.Sh()) return false;
    if (t !== null) {
      if (!(t instanceof Group)) return false;
      if (t.canUngroup()) return true;
    } else {
      const s = i.selection.iterator;
      for (; s.next(); ) {
        const n = s.value;
        if (n instanceof Group && n.canUngroup()) return true;
      }
    }
    return false;
  }
  addTopLevelParts(t, i) {
    const e = this.MN(t);
    let s = true;
    const n = e.iterator;
    for (; n.next(); ) {
      const o = n.value;
      o.containingGroup !== null && (!i || this.isValidMember(null, o) ? (o.containingGroup = null) : (s = false));
    }
    return s;
  }
  collapseSubGraph(t) {
    t === void 0 && (t = null);
    const i = this.f,
      e = "Collapse SubGraph";
    try {
      (i.startTransaction(e), i.animationManager.jl(e));
      const n = new List();
      if (t !== null && t.isSubGraphExpanded) (t.collapseSubGraph(), n.add(t));
      else if (t === null) {
        const o = i.selection.iterator;
        for (; o.next(); ) {
          const r = o.value;
          r instanceof Group && r.isSubGraphExpanded && (r.collapseSubGraph(), n.add(r));
        }
      }
      i.F("SubGraphCollapsed", n);
    } finally {
      i.commitTransaction(e);
    }
  }
  canCollapseSubGraph(t) {
    t === void 0 && (t = null);
    const i = this.f;
    if (i.isReadOnly) return false;
    if (t !== null) return !(!(t instanceof Group) || !t.isSubGraphExpanded);
    {
      const e = i.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        if (s instanceof Group && s.isSubGraphExpanded) return true;
      }
    }
    return false;
  }
  expandSubGraph(t) {
    t === void 0 && (t = null);
    const i = this.f,
      e = "Expand SubGraph",
      s = new List();
    try {
      if ((i.startTransaction(e), i.animationManager.jl(e), t !== null && !t.isSubGraphExpanded))
        (t.expandSubGraph(), s.add(t));
      else if (t === null) {
        const o = i.selection.iterator;
        for (; o.next(); ) {
          const r = o.value;
          r instanceof Group && (r.isSubGraphExpanded || (r.expandSubGraph(), s.add(r)));
        }
      }
      i.F("SubGraphExpanded", s);
    } finally {
      for (const n of s) this.vL(i, n);
      (t && this.vL(i, t), i.commitTransaction(e));
    }
  }
  vL(t, i) {
    for (const e of i.memberParts) e instanceof Node && t.Jf(e, i);
  }
  canExpandSubGraph(t) {
    t === void 0 && (t = null);
    const i = this.f;
    if (i.isReadOnly) return false;
    if (t !== null) return !(!(t instanceof Group) || t.isSubGraphExpanded);
    {
      const e = i.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        if (s instanceof Group && !s.isSubGraphExpanded) return true;
      }
    }
    return false;
  }
  editTextBlock(t) {
    (t === void 0 && (t = null), t !== null && U.s(t, TextBlock, CommandHandler, "editTextBlock"));
    const i = this.f,
      e = i.toolManager.findTool("TextEditing");
    if (e !== null) {
      if (t === null) {
        let s = null;
        const n = i.selection.iterator;
        for (; n.next(); ) {
          const o = n.value;
          if (o.canEdit()) {
            s = o;
            break;
          }
        }
        if (s === null) return;
        t = s.findInVisualTree((o) => o instanceof TextBlock && o.editable);
      }
      t !== null && ((i.currentTool = null), (e.textBlock = t), (i.currentTool = e));
    }
  }
  canEditTextBlock(t) {
    t === void 0 && (t = null);
    const i = this.f;
    if (i.isReadOnly || i.isModelReadOnly || !i.allowTextEdit || i.toolManager.findTool("TextEditing") === null)
      return false;
    if (t !== null) {
      if (!(t instanceof TextBlock)) return false;
      const e = t.part;
      if (e !== null && e.canEdit()) return true;
    } else {
      const e = i.selection.iterator;
      for (; e.next(); ) {
        const s = e.value;
        if (s.canEdit() && ((t = s.findInVisualTree((n) => n instanceof TextBlock && n.editable)), t !== null))
          return true;
      }
    }
    return false;
  }
  showContextMenu(t) {
    const i = this.f,
      e = i.toolManager.findTool("ContextMenu");
    if (e === null) return;
    (t === void 0 && (t = null), t === null && (i.selection.count > 0 ? (t = i.selection.first()) : (t = i)));
    const s = e.findObjectWithContextMenu(t);
    if (s !== null) {
      const n = i.lastInput;
      let o;
      if (
        (s instanceof GraphObject
          ? (o = s.getDocumentPoint(Spot.Center))
          : i.viewportBounds.containsPoint(n.documentPoint)
            ? (o = Point.xn)
            : (o = i.viewportBounds.center),
        o.isReal())
      ) {
        const r = new InputEvent();
        ((r.diagram = i),
          (r.viewPoint = i.transformDocToView(o)),
          (r.documentPoint = o),
          (r.button = 2),
          (r.up = true),
          (i.lastInput = r));
      }
      ((i.currentTool = e), e.openMenu(false, s));
    }
  }
  canShowContextMenu(t) {
    const i = this.f,
      e = i.toolManager.findTool("ContextMenu");
    return !(
      e === null ||
      (t === void 0 && (t = null),
      t === null && (i.selection.count > 0 ? (t = i.selection.first()) : (t = i)),
      e.findObjectWithContextMenu(t) === null)
    );
  }
  downloadSvg(t) {
    const i = this.f,
      e = { scale: 1, background: i.div ? i.div.style.backgroundColor : "white", name: this.eE("svg") };
    t && Object.assign(e, t);
    const s = i.makeSvg(e);
    if (s !== null) {
      const n = new XMLSerializer().serializeToString(s);
      this.sE(e.name, "image/svg+xml", n);
    }
  }
  downloadSVG(t) {
    this.downloadSvg(t);
  }
  canDownloadSvg(t) {
    return this.f !== null;
  }
  sE(t, i, e) {
    let s = null,
      n = null;
    try {
      const o = new Blob([e], { type: i });
      ((s = root.URL.createObjectURL(o)),
        (n = U.Le("a")),
        (n.style.display = "none"),
        (n.href = s),
        (n.download = t),
        root.document.body.appendChild(n),
        requestAnimationFrame(() => {
          try {
            n !== null && n.click();
          } finally {
            (s !== null && root.URL.revokeObjectURL(s), n !== null && root.document.body.removeChild(n));
          }
        }));
    } catch {
      (s !== null && root.URL.revokeObjectURL(s), n !== null && root.document.body.removeChild(n));
    }
  }
  eE(t) {
    const i = "." + t;
    let e = this.diagram.model.name;
    return (e ? e.endsWith(i) && (e = e.substring(0, e.length - i.length)) : (e = "diagram"), (e += i), e);
  }
  get copiesClipboardData() {
    return this.Q2;
  }
  set copiesClipboardData(t) {
    this.Q2 = !!t;
  }
  get copiesConnectedLinks() {
    return this._2;
  }
  set copiesConnectedLinks(t) {
    this._2 = !!t;
  }
  get deletesConnectedLinks() {
    return this.tN;
  }
  set deletesConnectedLinks(t) {
    this.tN = !!t;
  }
  get copiesTree() {
    return this.iN;
  }
  set copiesTree(t) {
    this.iN = !!t;
  }
  get deletesTree() {
    return this.eN;
  }
  set deletesTree(t) {
    this.eN = !!t;
  }
  get copiesParentKey() {
    return this.sN;
  }
  set copiesParentKey(t) {
    this.sN = !!t;
  }
  get copiesGroupKey() {
    return this.nN;
  }
  set copiesGroupKey(t) {
    this.nN = !!t;
  }
  get storageLocation() {
    return this.oN;
  }
  set storageLocation(t) {
    (t || (t = "memory"),
      t !== "memory" &&
        t !== "sessionStorage" &&
        t !== "localStorage" &&
        t !== "systemClipboard" &&
        U.n("Invalid new value for CommandHandler.storageLocation: " + t),
      (this.oN = t));
  }
  get archetypeGroupData() {
    return this.rN;
  }
  set archetypeGroupData(t) {
    t !== null && U.Ro(t, CommandHandler, "archetypeGroupData");
    const i = this.f;
    if (Debug && t !== null && i) {
      const e = i.model;
      e.Sh() &&
        !(t instanceof Group) &&
        !e.isGroupForData(t) &&
        U.n(
          "CommandHandler.archetypeGroupData must be either a Group or a data object for which GraphLinksModel.isGroupForNodeData is true: " +
            t,
        );
    }
    this.rN = t;
  }
  get memberValidation() {
    return this.xh;
  }
  set memberValidation(t) {
    (t !== null && U.C(t, CommandHandler, "memberValidation"), (this.xh = t));
  }
  get defaultScale() {
    return this.diagram.defaultScale;
  }
  set defaultScale(t) {
    this.diagram.defaultScale = t;
  }
  get zoomFactor() {
    return this.lN;
  }
  set zoomFactor(t) {
    (U.r(t, CommandHandler, "zoomFactor"),
      t > 1 || U.n("zoomFactor must be larger than 1.0, not: " + t),
      (this.lN = t));
  }
  get isZoomToFitRestoreEnabled() {
    return this.hN;
  }
  set isZoomToFitRestoreEnabled(t) {
    this.hN = !!t;
  }
  get scrollToPartPause() {
    return this.aN;
  }
  set scrollToPartPause(t) {
    this.aN = t;
  }
  computeEffectiveCollection(t, i) {
    const e = this.f,
      s = e.toolManager.findTool("Dragging"),
      n = e.currentTool === s;
    i === void 0 && (i = e.D0());
    const o = new GMap();
    if (t === null) return o;
    let r = t.iterator;
    for (; r.next(); ) {
      const l = r.value;
      e.ol(o, l, n, i);
    }
    if (e.draggedLink !== null && i.dragsLink) return o;
    for (r = t.iterator; r.next(); ) {
      const l = r.value;
      if (l instanceof Link) {
        const h = l.fromNode;
        if (h !== null && !o.has(h)) o.delete(l);
        else {
          const a = l.toNode;
          a !== null && !o.has(a) && o.delete(l);
        }
      }
    }
    return o;
  }
  static getModifierNames() {
    return CommandHandler.Sd;
  }
  static setModifierNames(t) {
    CommandHandler.Sd = t;
  }
  static $O(t) {
    let i = "";
    return (
      t & 1 && (i += CommandHandler.Sd[0] || ""),
      t & 4 && (i += CommandHandler.Sd[1] || ""),
      t & 2 && (i += CommandHandler.Sd[2] || ""),
      t & 8 && (i += CommandHandler.Sd[3] || ""),
      i
    );
  }
  static JO(t) {
    return t === 1 ? CommandHandler.WO : t === 2 ? CommandHandler.jO : CommandHandler.qL;
  }
  static kN(t, i, e) {
    var s = new Point(e, 0).rotate(t - i / 2),
      n = new Geometry()
        .add(new PathFigure(-e, -e))
        .add(new PathFigure(e, e))
        .add(new PathFigure(s.x, s.y).add(new PathSegment(5, t - i / 2, i, 0, 0, e, e)));
    return (n.offset(e, e), n);
  }
  ZO(t) {
    t.isTransactionFinished && this.updateFocusBox();
  }
  QO(t) {
    if (t.subject.scale === this.diagram.scale) return;
    const i = 4 / this.diagram.scale,
      e = this.focusBox.findObject("SHAPE");
    e !== null && (e.strokeWidth = i);
    const s = this.focusBox.findObject("SHAPE2");
    s !== null && ((s.strokeWidth = i), (s.strokeDashArray = [i, i]));
    const n = this.focusBox.placeholder;
    n !== null && (n.padding = i);
  }
  _O(t) {
    this.focus === null
      ? U.yn(() => {
          this.focus = this.findFirstFocus();
        }, 500)
      : this.onFocusChanged(this.focus, this.focus);
  }
  tE(t) {
    this.isVirtualPointerShown = false;
  }
  get isFocusEnabled() {
    return this.fN;
  }
  set isFocusEnabled(t) {
    t = !!t;
    const i = this.isFocusEnabled;
    t !== i &&
      (t || ((this.isVirtualPointerShown = false), (this.xN = this.focus), (this.focus = null)),
      (this.fN = t),
      t && ((this.focus = this.xN), this.updateFocusBox()));
  }
  get focusBox() {
    return this.V0;
  }
  set focusBox(t) {
    if (!(t instanceof Adornment)) return;
    const i = this.V0;
    if (t !== i && ((this.V0 = t), i.adornedObject !== null)) {
      const e = i.adornedPart;
      (e !== null && e.removeAdornment("Focus"),
        (t.adornedObject = i.adornedObject),
        e !== null && e.addAdornment("Focus", t));
    }
  }
  get focus() {
    return this.V0.adornedObject;
  }
  set focus(t) {
    const i = this.focus;
    if (t !== i) {
      const e = this.f;
      if (!e || !this.isFocusEnabled || (t !== null && t.diagram !== e)) return;
      e.currentTool instanceof ContextMenuTool || this.cancelVirtualPointer();
      const s = this.focusBox.adornedPart;
      (s && s.removeAdornment("Focus"),
        t === null
          ? ((this.bd = null),
            (this.virtualPointerLocation = e.viewportBounds.center),
            (this.focusBox.adornedObject = null))
          : ((this.virtualPointerLocation = t.getDocumentPoint(Spot.Center)),
            (this.focusBox.adornedObject = t),
            this.updateFocusBox()),
        this.onFocusChanged(i, t));
    }
  }
  onFocusChanged(t, i) {
    const e = this.f;
    if (
      e &&
      (this.focusChanged !== null ? this.focusChanged(t, i, this) : this.nE(this.describe(t, i)),
      i !== null && i.part !== null)
    ) {
      const s = i.getDocumentBounds();
      e.viewportBounds.containsRect(s) || (i instanceof Part ? e.commandHandler.scrollToPart(i) : e.scrollToRect(s));
    }
  }
  get focusChanged() {
    return this.cN;
  }
  set focusChanged(t) {
    (t !== null && U.C(t, CommandHandler, "focusChanged"), (this.cN = t));
  }
  get liveElementId() {
    return this.Lb || this.uN;
  }
  set liveElementId(t) {
    const i = this.Lb;
    t !== i && ((this.Lb = t), this.NN());
  }
  NN() {
    const t = this.diagram;
    if (!t || !Diagram.isUsingDOM()) return;
    const i = t.ut?.Nt;
    if (!i) return;
    const e = this.liveElementId,
      s = root.document.getElementById(e);
    this.isUsingAriaLive
      ? (i.removeAttribute("aria-labelledby"), s && s.setAttribute("aria-live", "polite"))
      : (e && i.setAttribute("aria-labelledby", e), s && s.removeAttribute("aria-live"));
  }
  get isUsingAriaLive() {
    return this.Db;
  }
  set isUsingAriaLive(t) {
    const i = this.Db;
    t !== i && ((this.Db = t), this.NN());
  }
  nE(t) {
    const i = this.diagram;
    if (!i || !Diagram.isUsingDOM() || !i.div) return;
    let e = this.liveElementId;
    if (!e) {
      const n = U.Le("span"),
        o = n.style;
      for (
        o.opacity = "0",
          o.position = "absolute",
          o.right = "-9999px",
          o.bottom = "-9999px",
          o.width = "0px",
          o.height = "0px",
          o.overflow = "hidden",
          o.border = "0",
          e = (i.div.id || "diagram") + "_aria";
        root.document.getElementById(e);
      )
        e += Math.floor(Math.random() * 10);
      ((n.id = e), (this.uN = e), i.div.appendChild(n), this.NN());
    }
    const s = root.document.getElementById(e);
    s && (s.textContent = t);
  }
  describe(t, i) {
    let e = "";
    i instanceof Node
      ? i instanceof Group
        ? (e = "Group")
        : (e = "Node")
      : i instanceof Link
        ? (e = "Link")
        : i instanceof Part
          ? (e = "Part")
          : i &&
            (i.click ? (e = "button") : i instanceof TextBlock && i.editable && (e = "editable"),
            i.portId !== null && (e && (e += " "), (e += "port"), i.portId && (e += " " + i.portId)));
    const s = this.CN(i);
    s && (e += " " + s);
    const n = i;
    if (t && n instanceof Link && n.fromNode && n.toNode) {
      if ((t instanceof Node && t.part === n.fromNode) || (t instanceof Link && t.fromNode === n.fromNode)) {
        e += " to " + this.CN(n.toNode, true);
        const o = n.toPort?.portId;
        o && (e += " port " + o);
      } else if ((t instanceof Node && t.part === n.toNode) || (t instanceof Link && t.toNode === n.toNode)) {
        e += " from " + this.CN(n.fromNode, true);
        const o = n.fromPort?.portId;
        o && (e += " port " + o);
      }
    }
    return e;
  }
  CN(t, i) {
    if ((i === void 0 && (i = false), !t)) return "";
    if (t instanceof TextBlock && t.text) return t.text;
    if (t instanceof Panel) {
      let e = "";
      return (
        t instanceof Part && t.text && (e = t.text),
        (i && e) ||
          t.walkVisualTreeFrom(t, (s, n) => {
            n.isVisibleObject() &&
              n instanceof TextBlock &&
              n.text &&
              (!i || !e) &&
              e !== n.text &&
              (e += " " + n.text);
          }),
        e
      );
    }
    return "";
  }
  updateFocusBox() {
    const t = this.focus;
    if (t === null) return;
    if (t.diagram !== null && (t instanceof Part ? t.isVisible() : t.isVisibleObject() && t.part?.isVisible()))
      ((this.focusBox.adornedObject = t), t.part?.addAdornment("Focus", this.focusBox));
    else {
      let e = null;
      if ((t instanceof Part || (e = t.part), e instanceof Part && e.isVisible())) this.focus = e;
      else {
        if (e instanceof Node && !e.isVisible()) {
          const s = e.findTreeParentNode();
          if (s !== null) e = s;
          else {
            const n = e.labeledLink;
            n !== null && (e = n);
          }
        }
        for (; e instanceof Part && !e.isVisible(); ) e = e.containingGroup;
        e instanceof Part && e.isVisible() ? (this.focus = e) : (this.focus = null);
      }
    }
  }
  findFirstFocus() {
    const t = this.f;
    if (t === null || !t.isEnabled) return null;
    if (this.focus !== null) return this.focus;
    if (this.isFocusEnabled)
      if (t.selection.count > 0) this.focus = t.selection.first();
      else {
        const i = this.WL(t.isTreePathToChildren).first();
        if (i !== null) return i;
      }
    return null;
  }
  get isVirtualPointerEnabled() {
    return this.dN;
  }
  set isVirtualPointerEnabled(t) {
    t = !!t;
    const i = this.isVirtualPointerEnabled;
    if (t !== i && ((this.dN = t), t)) {
      const e = this.X0;
      e && ((this.X0 = null), (e.commandHandler.Cs = null), e.commandHandler.cancelVirtualPointer());
    }
  }
  get isVirtualPointerShown() {
    return this.gN;
  }
  set isVirtualPointerShown(t) {
    t = !!t;
    const i = this.isVirtualPointerShown;
    if (t !== i) {
      const e = this.f;
      if (!e || !this.isVirtualPointerEnabled) return;
      this.gN = t;
      const s = this.focus;
      t
        ? this.virtualPointerBox.diagram === null &&
          (this.virtualPointerLocation.isReal() ||
            (s !== null
              ? (this.virtualPointerLocation = s.getDocumentPoint(Spot.Center))
              : (this.virtualPointerLocation = e.viewportBounds.center)),
          e.add(this.virtualPointerBox),
          this.kh())
        : this.virtualPointerBox.diagram !== null && (e.remove(this.virtualPointerBox), this.kh());
    }
  }
  cancelVirtualPointer() {
    const t = this.f;
    t &&
      (this.PN(),
      (this.isVirtualPointerShown = false),
      t.currentTool.doCancel(),
      (this.isVirtualPointerDown = false),
      this.AN());
  }
  AN() {
    const t = this.Cs;
    if (t !== null) {
      this.Cs = null;
      const i = t.commandHandler;
      ((i.Cs = null),
        (i.X0 = null),
        (i.isVirtualPointerShown = false),
        (i.isVirtualPointerDown = false),
        i.PN(),
        this.Fb && (i.isVirtualPointerEnabled = false),
        (this.Fb = false));
    }
  }
  PN() {
    ((this.ze.button = 0), (this.ze.modifiers = 0), (this.ze.clickCount = 1), (this.ze.down = false), this.kh());
  }
  kh() {
    (this.virtualPointerChanged !== null && this.virtualPointerChanged(this.virtualPointerBox, this),
      this.updateVirtualPointer());
  }
  updateVirtualPointer() {
    const t = this.virtualPointerBox.diagram;
    (t && (this.virtualPointerBox.scale = 1 / t.scale), this.virtualPointerBox.updateTargetBindings());
  }
  get virtualPointerBox() {
    return this.xd;
  }
  set virtualPointerBox(t) {
    if (!(t instanceof Part)) return;
    const i = this.xd;
    t !== i &&
      (i !== null && ((t.location = i.location), i.diagram !== null && i.diagram.remove(i)),
      (this.xd = t),
      this.isVirtualPointerShown && this.diagram && (this.diagram.add(t), (t.data = i.data)),
      this.kh());
  }
  get virtualPointerChanged() {
    return this.mN;
  }
  set virtualPointerChanged(t) {
    (t !== null && U.C(t, CommandHandler, "virtualPointerChanged"), (this.mN = t));
  }
  get virtualPointerLocation() {
    return this.virtualPointerBox.location;
  }
  set virtualPointerLocation(t) {
    this.virtualPointerLocation.equals(t) || this.jL(t.x, t.y);
  }
  get isVirtualPointerDown() {
    return this.virtualPointerBox.data ? this.virtualPointerBox.data.down : false;
  }
  set isVirtualPointerDown(t) {
    t = !!t;
    const i = this.isVirtualPointerDown;
    if (t !== i) {
      const e = this.f;
      if (
        !e ||
        !this.isVirtualPointerEnabled ||
        (this.virtualPointerBox.data === null && (this.xd.data = this.ze),
        (this.virtualPointerBox.data.down = t),
        this.kh(),
        !this.isVirtualPointerShown)
      )
        return;
      const s = e.lastInput,
        n = new InputEvent();
      ((n.diagram = e),
        this.JL(n, t),
        t ? (n.down = true) : (n.up = true),
        (n.clickCount = 1),
        (n.button = this.ze.button),
        (n.modifiers = this.ze.modifiers),
        t && (e.firstInput = n.copy()),
        this.kd(n, true),
        t ||
          (this.ze.clickCount === 2 &&
            ((n.clickCount = 2),
            (n.down = true),
            (n.up = false),
            this.kd(n, true),
            (n.down = false),
            (n.up = true),
            this.kd(n, true),
            this.$L(1))),
        (e.lastInput = s));
    }
  }
  get virtualPointerShiftMove() {
    return this.B0;
  }
  set virtualPointerShiftMove(t) {
    this.B0 = t;
  }
  get virtualPointerControlMove() {
    return this.z0;
  }
  set virtualPointerControlMove(t) {
    this.z0 = t;
  }
  Y0(t, i) {
    this.jL(this.virtualPointerLocation.x + t, this.virtualPointerLocation.y + i);
  }
  jL(t, i) {
    this.virtualPointerBox.moveTo(t, i, true);
    const e = this.f;
    if (!e || !this.isVirtualPointerEnabled || !this.isVirtualPointerShown) return;
    e.ensureBounds();
    const s = e.lastInput,
      n = new InputEvent();
    ((n.diagram = e),
      this.JL(n, this.isVirtualPointerDown),
      (n.button = this.ze.button),
      (n.modifiers = this.ze.modifiers),
      this.kd(n, true),
      (e.lastInput = s),
      this.isVirtualPointerDown && (e.remove(this.virtualPointerBox), e.add(this.virtualPointerBox)),
      this.kh());
  }
  JL(t, i) {
    const e = this.f;
    if (e) {
      if (((t.targetDiagram = e), (t.documentPoint = this.virtualPointerLocation), e.allowDragOut)) {
        const s = e.div.getBoundingClientRect(),
          n = e.transformDocToView(this.virtualPointerLocation),
          o = s.x + n.x,
          r = s.y + n.y;
        let l = root.document.elementFromPoint(o, r) || null;
        (l instanceof HTMLCanvasElement && (l = l.parentElement),
          l !== null &&
            l.shadowRoot &&
            ((l = l.shadowRoot.elementFromPoint(o, r) || null),
            l instanceof HTMLCanvasElement && (l = l.parentElement)));
        let h = null;
        if (l instanceof HTMLElement && (h = Diagram._e.get(l)) && h !== e && h.div) {
          const a = h.div.getBoundingClientRect(),
            f = new Point(n.x - (a.x - s.x), n.y - (a.y - s.y));
          (this.Cs !== null && this.Cs !== h && this.AN(),
            (t.targetDiagram = h),
            (t.viewPoint = f),
            (t.documentPoint = h.transformViewToDoc(f)),
            (t.viewPoint = h.transformDocToView(t.documentPoint)),
            (this.Cs = h));
          const c = h.commandHandler;
          ((this.Fb = !c.isVirtualPointerEnabled),
            (c.isVirtualPointerEnabled = true),
            (c.isVirtualPointerDown = i),
            (c.virtualPointerLocation = t.documentPoint),
            (c.isVirtualPointerShown = true),
            (c.X0 = e));
          return;
        }
      }
      (this.Cs !== null && this.AN(), (t.viewPoint = e.transformDocToView(t.documentPoint)));
    }
  }
  kd(t, i) {
    this.doVirtualPointerEvent(t, i);
  }
  doVirtualPointerEvent(t, i) {
    const e = this.f;
    e &&
      ((t.timestamp = Date.now()),
      (e.lastInput = t),
      i && (t.up ? e.doMouseUp() : t.down ? e.doMouseDown() : e.doMouseMove()),
      this.onVirtualPointerEvent(t, i));
  }
  onVirtualPointerEvent(t, i) {
    const e = this.f;
    e &&
      (t.up
        ? this.isVirtualPointerDown &&
          !e.viewportBounds.containsPoint(this.virtualPointerLocation) &&
          (this.virtualPointerLocation =
            this.focus instanceof GraphObject ? this.focus.getDocumentPoint(Spot.Center) : e.viewportBounds.center)
        : t.down);
  }
  doVirtualFocusKeyDown() {
    const t = this.f;
    if (!t) return false;
    const i = t.lastInput,
      e = i.commandKey;
    if (this.isVirtualPointerEnabled && (e === "ShiftLeft" || e === "ShiftRight"))
      return ((this.isVirtualPointerShown = true), true);
    if (this.HL.indexOf(e) >= 0)
      if (i.shift && this.isVirtualPointerShown) {
        const s = this.Ib(e),
          n = i.control || i.meta ? this.z0 : this.B0;
        s === 270 ? this.Y0(0, -n) : s === 90 ? this.Y0(0, n) : s === 180 ? this.Y0(-n, 0) : this.Y0(n, 0);
      } else this.oE();
    else if (
      i.shift &&
      this.isVirtualPointerShown &&
      (e === "Numpad1" ||
        e === "Numpad2" ||
        e === "Numpad3" ||
        e === "Numpad4" ||
        e === "Numpad6" ||
        e === "Numpad7" ||
        e === "Numpad8" ||
        e === "Numpad9")
    ) {
      const s = i.control || i.meta ? this.z0 : this.B0;
      let n = 0;
      e === "Numpad1" || e === "Numpad4" || e === "Numpad7"
        ? (n = -s)
        : (e === "Numpad3" || e === "Numpad6" || e === "Numpad9") && (n = s);
      let o = 0;
      (e === "Numpad7" || e === "Numpad8" || e === "Numpad9"
        ? (o = -s)
        : (e === "Numpad1" || e === "Numpad2" || e === "Numpad3") && (o = s),
        this.Y0(n, o));
    } else if (e === "Enter" || e === "NumpadEnter" || e === "Numpad5")
      i.shift && this.isVirtualPointerShown ? (this.isVirtualPointerDown = !this.isVirtualPointerDown) : this.rE();
    else if (e === "Escape") this.lE();
    else if (e === "Space") this.hE();
    else if (e === "ContextMenu" || (i.shift && e === "F10") || ((i.control || i.meta) && i.shift && e === "Backslash"))
      this.aE();
    else if (i.shift && e === "c") this.Rb(1);
    else if (i.shift && e === "a") this.Rb(2);
    else if (i.shift && e === "KeyS") this.Rb(4);
    else if (i.shift && e === "KeyM") this.Rb(8);
    else if (i.shift && e === "Digit1") this.Ob(0);
    else if (i.shift && e === "Digit2") this.Ob(1);
    else if (i.shift && e === "Digit3") this.Ob(2);
    else if (i.shift && e === "Numpad0") {
      const s = this.ze.button;
      this.Ob(s === 2 ? 0 : 2);
    } else if (i.shift && (e === "KeyD" || e === "NumpadDecimal")) {
      const s = this.ze.clickCount;
      this.$L(s === 2 ? 1 : 2);
    } else if (i.shift && e === "KeyF") {
      const s = this.nextFocusFormula;
      this.nextFocusFormula = s === "distance" ? "linear" : "distance";
    } else if (i.shift && e === "y") this.isUsingAriaLive = !this.isUsingAriaLive;
    else return false;
    return true;
  }
  doVirtualFocusKeyUp() {
    const t = this.f;
    if (!t) return false;
    const e = t.lastInput.commandKey;
    return (
      this.isVirtualPointerEnabled && (e === "ShiftLeft" || e === "ShiftRight") && (this.isVirtualPointerShown = false),
      true
    );
  }
  Ib(t) {
    switch (t) {
      case "ArrowDown":
        return 90;
      case "ArrowLeft":
        return 180;
      case "ArrowUp":
        return 270;
      default:
        return 0;
    }
  }
  HL = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
  Rb(t) {
    const i = this.ze.modifiers;
    ((this.ze.modifiers = i & t ? i & ~t : i | t), this.kh());
  }
  $L(t) {
    ((this.ze.clickCount = t), this.kh());
  }
  Ob(t) {
    ((this.ze.button = t), this.kh());
  }
  oE() {
    const t = this.f;
    if (!t) return;
    const i = t.lastInput,
      e = this.focus;
    if (e === null) {
      const s = this.WL(t.isTreePathToChildren).first();
      s !== null && (this.focus = s);
    } else if (e instanceof Link) this.fE(e);
    else if (e instanceof Node) this.cE(e);
    else {
      e instanceof Part && (this.bd = null);
      const s = this.Ib(i.commandKey);
      s === 270
        ? (this.focus = this.findNextFocus(270))
        : s === 90
          ? (this.focus = this.findNextFocus(90))
          : s === 180
            ? (this.focus = this.findNextFocus(180))
            : (this.focus = this.findNextFocus(0));
    }
  }
  fE(t) {
    const i = this.f;
    if (!i) return;
    const e = i.lastInput,
      s = this.Ib(e.commandKey);
    let n = null;
    const o = this.bd;
    if (o !== null) {
      const r = this.SN;
      if (s === r) n = t.getOtherNode(o);
      else if (s === G.Yi(r + 180)) n = o;
      else {
        let l = r === 0 || r === 180 ? 90 : 0,
          h = r === 0 || r === 180 ? 270 : 180;
        if (s === l) {
          const a = this.TN(o, r, true),
            f = a.indexOf(t);
          f >= 0 && f < a.count - 1 && (this.focus = a.elt(f + 1));
        } else if (s === h) {
          const a = this.TN(o, r, true),
            f = a.indexOf(t);
          f > 0 && (this.focus = a.elt(f - 1));
        }
      }
    } else {
      const r = t.fromNode,
        l = t.toNode;
      if (!r || !l) return;
      s === 270
        ? (n = r.location.y < l.location.y ? r : l)
        : s == 90
          ? (n = r.location.y > l.location.y ? r : l)
          : s === 180
            ? (n = r.location.x < l.location.x ? r : l)
            : (n = r.location.x > l.location.x ? r : l);
    }
    for (; n !== null && !n.isVisible(); ) n = n.containingGroup;
    n !== null && (this.focus = n);
  }
  cE(t) {
    const i = this.f;
    if (!i) return;
    const e = i.lastInput,
      s = this.Ib(e.commandKey);
    if (e.control || e.meta) {
      const n = this.TN(t, s, true).first();
      n && ((this.bd = t), (this.SN = s), (this.focus = n));
    } else ((this.bd = null), (this.focus = this.findNextFocus(s)));
  }
  TN(t, i, e) {
    if (t === null) return new List();
    const s = t.actualBounds;
    if (!s.isReal()) return new List();
    const n = new Set();
    (t instanceof Group ? t.findExternalLinksConnected() : t.findLinksConnected()).each((l) => {
      if (!l.isVisible()) return;
      let h = null;
      if (
        (l.fromNode === t
          ? (h = l.toNode)
          : l.toNode === t
            ? (h = l.fromNode)
            : t instanceof Group &&
              (l.fromNode?.isMemberOf(t) ? (h = l.toNode) : l.toNode?.isMemberOf(t) && (h = l.fromNode)),
        h === null || h.isMemberOf(t))
      )
        return;
      for (; h !== null && !h.isVisible(); ) h = h.containingGroup;
      if (h === null) return;
      const a = h.location;
      if (a.isReal() && !(i === 270 && (h !== t ? a.y >= s.top : l.midPoint.y >= s.top))) {
        {
          if (i === 90 && (h !== t ? a.y <= s.bottom : l.midPoint.y <= s.bottom)) return;
          if (i === 180 && (h !== t ? a.x >= s.left : l.midPoint.x >= s.left)) return;
          if (i === 0 && (h !== t ? a.x <= s.right : l.midPoint.x <= s.right)) return;
        }
        e && l.actualBounds.isReal() ? n.add(l) : n.add(h);
      }
    });
    const r = new List(n);
    return (
      i === 90 || i === 270
        ? r.sort((l, h) => l.actualBounds.centerX - h.actualBounds.centerX)
        : r.sort((l, h) => l.actualBounds.centerY - h.actualBounds.centerY),
      r
    );
  }
  findNextFocus(t) {
    t = G.Yi(t);
    const i = this.focus,
      e = i instanceof Node ? i.location : i.getDocumentPoint(Spot.Center);
    let s = 1 / 0,
      n = i;
    const o = (r, l, h, a) => {
      if (this.nextFocusFormula === "linear") {
        let f = 1 / 0;
        ((t === 0 && h > e.x) || (t === 180 && h < e.x)
          ? (f = Math.abs(h - e.x))
          : ((t === 90 && a > e.y) || (t === 270 && a < e.y)) && (f = Math.abs(a - e.y)),
          f < s && ((s = f), (n = r)));
      } else {
        if (t === 0 && (l.right < e.x || (l.centerX - e.x) ** 2 > s)) return;
        if (t === 90 && (l.bottom < e.y || (l.centerY - e.y) ** 2 > s)) return;
        if (t === 180 && (l.x > e.x || (e.x - l.centerX) ** 2 > s)) return;
        if (t === 270 && (l.y > e.y || (e.y - l.centerY) ** 2 > s)) return;
        const f = e.direction(h, a),
          c = G.iR(t, f);
        if (t === 90 || t === 270 ? c <= 45 : c < 45) {
          const u = e.distanceSquared(h, a);
          u < s && ((s = u), (n = r));
        }
      }
    };
    if (i instanceof Part && i.diagram !== null) {
      const r = i.containingGroup;
      r !== null
        ? r.memberParts.each((l) => {
            l === i || l instanceof Link || !l.isVisible() || o(l, l.actualBounds, l.location.x, l.location.y);
          })
        : (i.diagram.nodes.each((l) => {
            l === i || !l.isTopLevel || !l.isVisible() || o(l, l.actualBounds, l.location.x, l.location.y);
          }),
          i.diagram.parts.each((l) => {
            l === i || !l.isTopLevel || !l.isVisible() || o(l, l.actualBounds, l.location.x, l.location.y);
          }));
    } else if (i.part !== null) {
      const r = new Rect();
      this.LN(i.part).each((l) => {
        l !== i && (l.getDocumentBounds(r), o(l, r, r.centerX, r.centerY));
      });
    }
    return n;
  }
  get nextFocusFormula() {
    return this.bN;
  }
  set nextFocusFormula(t) {
    this.bN = t;
  }
  rE() {
    const t = this.f;
    if (!t) return;
    const i = t.currentTool;
    if (i instanceof ContextMenuTool) {
      const n = i.currentObject;
      (this.Eb(this.focus), i.maybeStopTool(this.focus), t.currentTool instanceof ContextMenuTool || (this.focus = n));
      return;
    }
    const e = this.focus,
      s = t.lastInput;
    if (e === null) s.control || s.meta ? this.Eb(null) : (this.focus = this.findFirstFocus());
    else if (e instanceof Part)
      if (s.control || s.meta) this.Eb(e);
      else {
        const n = this.LN(e);
        if (n.count > 0) this.focus = n.first();
        else if (e instanceof Link && e.isLabeledLink) {
          const o = e.labelNodes.first();
          o !== null && o.isVisible() && (this.focus = o);
        } else if (e instanceof Group && e.isSubGraphExpanded) {
          const o = e.memberParts.first();
          o !== null && o.isVisible() && (this.focus = o);
        }
      }
    else this.Eb(e);
  }
  WL(t) {
    const i = new List(),
      e = this.f;
    if (!e) return i;
    let s = 0;
    for (; i.count === 0 && s < e.nodes.count; ) {
      const n = e.nodes;
      for (; n.next(); ) {
        const o = n.value;
        o.isTopLevel && o.isVisible() && (t ? o.findNodesInto() : o.findNodesOutOf()).count === s && i.add(o);
      }
      s++;
    }
    return i;
  }
  LN(t) {
    return t instanceof Part ? this.Ln(t, new List()) : new List();
  }
  Ln(t, i) {
    return (
      !(t instanceof Part) &&
        t.isVisibleObject() &&
        t.isEnabledObject() &&
        (t.contextMenu ||
          t.click ||
          (t instanceof TextBlock && t.editable) ||
          (t.part instanceof Node && t.portId !== null && (t.portId !== "" || t.part.ports.count > 1)) ||
          t.toolTip) &&
        i.add(t),
      t instanceof Panel && t.elements.each((e) => this.Ln(e, i)),
      i
    );
  }
  Eb(t) {
    const i = this.f;
    if (!i) return;
    const e = i.lastInput,
      s = t instanceof GraphObject ? t : i;
    if (s.click) {
      const n = new InputEvent();
      ((n.diagram = i),
        (n.documentPoint = t instanceof GraphObject ? t.getDocumentPoint(Spot.Center) : i.viewportBounds.center),
        (n.viewPoint = i.transformDocToView(n.documentPoint)),
        (n.button = 0),
        (n.clickCount = 1),
        (n.targetObject = t),
        this.kd(n, false),
        s instanceof GraphObject ? s.click(n, s) : s.click(n),
        (i.lastInput = e));
    } else s instanceof TextBlock && s.editable ? this.editTextBlock(s) : this.ZL(t);
  }
  lE() {
    const t = this.f;
    if (!t) return;
    const i = t.currentTool;
    if (i instanceof ToolManager && i.currentToolTip !== null) {
      i.hideToolTip();
      return;
    } else if (i instanceof ContextMenuTool) {
      const e = i.currentObject;
      (i.doKeyDown(), (this.focus = e));
      return;
    }
    if (this.focus instanceof Part) {
      const e = this.focus;
      e instanceof Node && e.labeledLink !== null
        ? (this.focus = e.labeledLink)
        : e.containingGroup !== null
          ? (this.focus = e.containingGroup)
          : (this.focus = null);
    } else if (this.focus instanceof GraphObject) {
      const e = this.focus.part;
      if (e instanceof Link && e.isLabeledLink) {
        const s = e.labelNodes.first();
        if (s !== null && s.isVisible()) {
          this.focus = s;
          return;
        }
      } else if (e instanceof Group && e.isSubGraphExpanded) {
        const s = e.memberParts.first();
        if (s !== null && s.isVisible()) {
          this.focus = s;
          return;
        }
      }
      this.focus = e;
    } else (this.cancelVirtualPointer(), this.stopCommand());
  }
  hE() {
    const t = this.f;
    if (!t) return;
    if (t.lastInput.shift && this.isVirtualPointerShown) {
      const e = t.findPartAt(this.virtualPointerLocation);
      e !== null && (e === this.focus ? this.QL() : (this.focus = e));
    } else this.QL();
  }
  QL() {
    const t = this.f;
    if (!t) return;
    const i = t.lastInput,
      e = this.focus;
    if (e instanceof Part) {
      let s = e.part;
      if (i.control || i.meta) {
        for (t.raiseDiagramEvent("ChangingSelection", t.selection); s !== null && !s.canSelect(); )
          s = s.containingGroup;
        (s !== null && (s.isSelected = !s.isSelected), t.raiseDiagramEvent("ChangedSelection", t.selection));
      } else if (i.shift) {
        if (s !== null && !s.isSelected) {
          for (t.raiseDiagramEvent("ChangingSelection", t.selection); s !== null && !s.canSelect(); )
            s = s.containingGroup;
          (s !== null && (s.isSelected = true), t.raiseDiagramEvent("ChangedSelection", t.selection));
        }
      } else if (s !== null && !s.isSelected) {
        for (; s !== null && !s.canSelect(); ) s = s.containingGroup;
        s !== null && t.select(s);
      }
    }
    (this.ZL(e), this.onFocusChanged(e, e));
  }
  ZL(t) {
    const i = this.f;
    if (!i) return;
    i.toolManager.hideToolTip();
    const e = i.lastInput;
    let s = t instanceof GraphObject ? t : i;
    for (; s instanceof GraphObject && !s.toolTip; ) s = s.panel;
    if (s && s.toolTip) {
      const n = new InputEvent();
      ((n.diagram = i),
        (n.documentPoint = t !== null ? t.getDocumentPoint(Spot.Center) : i.viewportBounds.center),
        (n.viewPoint = i.transformDocToView(n.documentPoint)),
        (n.targetObject = t),
        this.kd(n, false),
        i.toolManager.showToolTip(s.toolTip, t),
        (i.lastInput = e));
    }
  }
  aE() {
    const t = this.f;
    if (!t) return;
    const i = this.focus;
    if (this.canShowContextMenu(i)) {
      this.showContextMenu(i);
      const e = t.toolManager.contextMenuTool.currentContextMenu;
      if (e instanceof Adornment) {
        const s = this.LN(e);
        s.count > 0 && (this.focus = s.first());
      }
    }
  }
}
var Stretch = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Default = 1)] = "Default"),
    (w[(w.Vertical = 4)] = "Vertical"),
    (w[(w.Horizontal = 5)] = "Horizontal"),
    (w[(w.Fill = 2)] = "Fill"),
    w
  ))(Stretch || {}),
  Orientation = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Along = 21)] = "Along"),
    (w[(w.Plus90 = 22)] = "Plus90"),
    (w[(w.Minus90 = 23)] = "Minus90"),
    (w[(w.Opposite = 24)] = "Opposite"),
    (w[(w.Upright = 25)] = "Upright"),
    (w[(w.Plus90Upright = 26)] = "Plus90Upright"),
    (w[(w.Minus90Upright = 27)] = "Minus90Upright"),
    (w[(w.Upright45 = 28)] = "Upright45"),
    w
  ))(Orientation || {}),
  Flip = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Vertical = 1)] = "Vertical"),
    (w[(w.Horizontal = 2)] = "Horizontal"),
    (w[(w.Both = 3)] = "Both"),
    w
  ))(Flip || {});
