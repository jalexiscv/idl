class ContextMenuTool extends Tool {
  pM;
  Gx;
  yM;
  wM;
  qx;
  Hx;
  Gm;
  constructor(t) {
    (super(),
      (this.name = "ContextMenu"),
      (this.pM = null),
      (this.Gx = null),
      (this.yM = null),
      (this.wM = new Point()),
      (this.qx = null),
      (this.Gm = !1));
    const i = this;
    ((this.Hx = () => i.stopTool()), t && Object.assign(this, t));
  }
  TR() {
    const t = new HTMLInfo();
    ((t.show = (r, l, h) => h.showDefaultContextMenu()),
      (t.hide = (r, l) => l.hideDefaultContextMenu()),
      (ContextMenuTool.qu = t));
    const i = this;
    this.Hx = () => i.stopTool();
    const e = U.Le("div"),
      s = U.Le("div");
    ((e.style.cssText =
      "top: 0px;z-index:10002;position: fixed;display: none;text-align: center;left: 25%;width: 50%;background-color: #F5F5F5;padding: 16px;border: 16px solid #444;border-radius: 10px;margin-top: 10px"),
      (s.style.cssText =
        "z-index:10001;position: fixed;display: none;top: 0;left: 0;width: 100%;height: 100%;background-color: black;opacity: 0.8;"));
    const n = U.Le("style");
    (root.document.getElementsByTagName("head")[0].appendChild(n),
      n.sheet.insertRule(".idlCXul { list-style: none; }", 0),
      n.sheet.insertRule(
        ".idlCXli {font:700 1.5em Helvetica, Arial, sans-serif;position: relative;min-width: 60px; }",
        0,
      ),
      n.sheet.insertRule(
        ".idlCXa {color: #444;display: inline-block;padding: 4px;text-decoration: none;margin: 2px;border: 1px solid gray;border-radius: 10px; }",
        0,
      ));
    const o = this.diagram;
    (o !== null &&
      (o.Kt(e, "contextmenu", ContextMenuTool.ca, !1),
      o.Kt(e, "selectstart", ContextMenuTool.ca, !1),
      o.Kt(s, "contextmenu", ContextMenuTool.ca, !1)),
      (e.className = "idlCXforeground"),
      (s.className = "idlCXbackground"),
      root.document.body && (root.document.body.appendChild(e), root.document.body.appendChild(s)),
      (ContextMenuTool.qm = e),
      (ContextMenuTool.Hm = s),
      (ContextMenuTool.xM = !0));
  }
  static qu = null;
  static xM = !1;
  static Hm;
  static qm;
  static ca(t) {
    return (t.preventDefault(), !1);
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    return this.isBeyondDragSize() || !t.lastInput.right || t.lastInput.clickCount > 1
      ? !1
      : !!(
          (t.lastInput.isTouchEvent && this.defaultTouchContextMenu !== null) ||
          this.findObjectWithContextMenu() !== null
        );
  }
  doStart() {
    const t = this.diagram;
    this.wM.set(t.firstInput.documentPoint);
  }
  doStop() {
    (this.hideContextMenu(), (this.currentObject = null), (this.Gm = !1));
  }
  findObjectWithContextMenu(t) {
    t === void 0 && (t = null);
    const i = this.diagram,
      e = i.lastInput;
    let s = null;
    if (
      (t instanceof Diagram ||
        (t instanceof GraphObject
          ? (s = t)
          : (s = i.findObjectAt(e.documentPoint, null, (n) => !n.layer?.isTemporary))),
      s !== null)
    ) {
      let n = s;
      for (; n !== null; ) {
        if (n.contextMenu !== null) return n;
        n = n.panel;
      }
      if (i.lastInput.isTouchEvent && this.defaultTouchContextMenu) return s.part;
    } else if (i.contextMenu !== null) return i;
    return null;
  }
  doActivate() {}
  doMouseDown() {
    if ((super.doMouseDown(), this.isActive && this.currentContextMenu instanceof Adornment)) {
      const t = this.diagram.toolManager.findTool("Action");
      t !== null && t.canStart() && (t.doActivate(), t.doMouseDown(), t.doDeactivate());
    }
    this.diagram.toolManager.mouseDownTools.has(this) && this.doContextClick();
  }
  doMouseUp() {
    if (this.isActive && this.currentContextMenu instanceof Adornment) {
      const t = this.diagram.toolManager.findTool("Action");
      t !== null && t.canStart() && (t.doActivate(), t.doCancel(), t.doDeactivate());
    }
    this.doContextClick();
  }
  doContextClick() {
    const t = this.diagram;
    if (!this.isActive) this.canStart() && (this.openMenu(!0), this.isActive || this.stopTool());
    else {
      const i = this.currentContextMenu;
      if (i === null) return;
      let e = null;
      (i instanceof HTMLInfo ||
        ((e = t.findObjectAt(t.lastInput.documentPoint, null, null)),
        e !== null && e.isContainedBy(i) && this.standardMouseClick(null, null)),
        this.maybeStopTool(e));
    }
  }
  maybeStopTool(t) {
    (this.stopTool(), this.canStart() && ((this.diagram.currentTool = this), this.doMouseUp()));
  }
  openMenu(t, i) {
    if ((i === void 0 && (i = null), this.Gm)) return;
    this.Gm = !0;
    let e = !1;
    if (i instanceof Diagram) {
      const s = this.diagram.lastInput;
      ((s.targetObject = null), (e = this.fT(null, s, this.diagram)));
    } else (t && this.standardMouseSelect(), (e = this.standardMouseClick()));
    if (((this.Gm = !1), !e)) {
      this.isActive = !0;
      const s = ContextMenuTool.qu;
      if ((i === null && (i = this.findObjectWithContextMenu()), i !== null)) {
        const n = i.contextMenu;
        n !== null
          ? ((this.currentObject = i instanceof GraphObject ? i : null), this.showContextMenu(n, this.currentObject))
          : s !== null && this.showContextMenu(s, this.currentObject);
      } else s !== null && this.showContextMenu(s, null);
      this.currentContextMenu instanceof Adornment && !this.currentContextMenu.visible && this.stopTool();
    }
  }
  doMouseMove() {
    const t = this.diagram.toolManager.findTool("Action");
    (t !== null && t.doMouseMove(), this.isActive && this.diagram.toolManager.doMouseMove());
  }
  showContextMenu(t, i) {
    (Debug &&
      !(t instanceof Adornment || t instanceof HTMLInfo) &&
      U.n("showContextMenu:contextMenu must be an Adornment or HTMLInfo."),
      i !== null && U.s(i, GraphObject, ContextMenuTool, "showContextMenu:obj"));
    const e = this.diagram;
    if ((t !== this.currentContextMenu && this.hideContextMenu(), t instanceof Adornment)) {
      const s = t;
      ((s.layerName = "Tool"),
        (s.selectable = !1),
        (s.scale = 1 / e.scale),
        (s.category = this.name),
        s.hasPlaceholder() && (s.placeholder.scale = e.scale));
      const n = s.diagram;
      (n !== null && n !== e && n.remove(s),
        e.add(s),
        i !== null ? (s.adornedObject = i) : (s.data = e.model),
        s.ensureBounds(),
        this.positionContextMenu(s, i));
    } else t instanceof HTMLInfo && t.show !== null && t.show(i, e, this);
    this.currentContextMenu = t;
  }
  positionContextMenu(t, i) {
    if (t.hasPlaceholder()) return;
    const e = t,
      s = this.diagram,
      n = s.lastInput.documentPoint.copy(),
      o = e.measuredBounds,
      r = s.viewportBounds;
    (s.lastInput.isTouchEvent && (n.x -= o.width),
      n.x + o.width > r.right && (n.x -= o.width + 5 / s.scale),
      n.x < r.x && (n.x = r.x),
      n.y + o.height > r.bottom && (n.y -= o.height + 5 / s.scale),
      n.y < r.y && (n.y = r.y),
      (e.position = n));
  }
  hideContextMenu() {
    const t = this.diagram,
      i = this.currentContextMenu;
    i !== null &&
      (i instanceof Adornment
        ? (t.remove(i),
          this.Gx !== null && this.Gx.removeAdornment(i.category),
          (i.data = null),
          (i.adornedObject = null))
        : i instanceof HTMLInfo &&
          (i.hide !== null ? i.hide(t, this) : i.mainElement !== null && (i.mainElement.style.display = "none")),
      (this.currentContextMenu = null),
      this.standardMouseOver());
  }
  LR() {
    const t = this,
      i = new List();
    return (
      i.add(
        new ContextMenuButtonInfo(
          "Copy",
          (e) => e.commandHandler.copySelection(),
          (e) => e.commandHandler.canCopySelection(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Cut",
          (e) => e.commandHandler.cutSelection(),
          (e) => e.commandHandler.canCutSelection(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Delete",
          (e) => e.commandHandler.deleteSelection(),
          (e) => e.commandHandler.canDeleteSelection(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Paste",
          (e) => e.commandHandler.pasteSelection(t.mouseDownPoint),
          (e) => e.commandHandler.canPasteSelection(t.mouseDownPoint),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Select All",
          (e) => e.commandHandler.selectAll(),
          (e) => e.commandHandler.canSelectAll(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Undo",
          (e) => e.commandHandler.undo(),
          (e) => e.commandHandler.canUndo(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Redo",
          (e) => e.commandHandler.redo(),
          (e) => e.commandHandler.canRedo(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Scroll To Part",
          (e) => e.commandHandler.scrollToPart(),
          (e) => e.commandHandler.canScrollToPart(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Zoom To Fit",
          (e) => e.commandHandler.zoomToFit(),
          (e) => e.commandHandler.canZoomToFit(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Reset Zoom",
          (e) => e.commandHandler.resetZoom(),
          (e) => e.commandHandler.canResetZoom(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Group Selection",
          (e) => e.commandHandler.groupSelection(),
          (e) => e.commandHandler.canGroupSelection(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Ungroup Selection",
          (e) => e.commandHandler.ungroupSelection(),
          (e) => e.commandHandler.canUngroupSelection(),
        ),
      ),
      i.add(
        new ContextMenuButtonInfo(
          "Edit Text",
          (e) => e.commandHandler.editTextBlock(),
          (e) => e.commandHandler.canEditTextBlock(),
        ),
      ),
      i
    );
  }
  showDefaultContextMenu() {
    const t = this.diagram;
    (this.qx === null && (this.qx = this.LR()),
      (ContextMenuTool.qm.innerHTML = ""),
      ContextMenuTool.Hm.addEventListener("pointerdown", this.Hx, !1));
    const i = this,
      e = U.Le("ul");
    ((e.className = "idlCXul"), ContextMenuTool.qm.appendChild(e), (e.innerHTML = ""));
    const s = this.qx.iterator;
    for (; s.next(); ) {
      const n = s.value,
        o = n.Ux,
        r = n.qf;
      if (!U.lt(o) || (U.lt(r) && !r(t))) continue;
      const l = U.Le("li");
      l.className = "idlCXli";
      const h = U.Le("a");
      ((h.className = "idlCXa"),
        (h.href = "#"),
        (h.Ux = o),
        h.addEventListener(
          "pointerdown",
          function (a) {
            return (this.Ux(t), i.stopTool(), a.preventDefault(), !1);
          },
          !1,
        ),
        (h.textContent = n.mi),
        l.appendChild(h),
        e.appendChild(l));
    }
    ((ContextMenuTool.qm.style.display = "block"), (ContextMenuTool.Hm.style.display = "block"));
  }
  hideDefaultContextMenu() {
    if (this.currentContextMenu === null || this.currentContextMenu !== ContextMenuTool.qu) return;
    ((ContextMenuTool.qm.style.display = "none"), (ContextMenuTool.Hm.style.display = "none"));
    const t = this.diagram;
    (t !== null && t.Ii(ContextMenuTool.Hm, "pointerdown", this.Hx, !1), (this.currentContextMenu = null));
  }
  doMouseWheel() {
    this.standardMouseWheel();
  }
  get currentContextMenu() {
    return this.pM;
  }
  set currentContextMenu(t) {
    (Debug &&
      t !== null &&
      !(t instanceof Adornment || t instanceof HTMLInfo) &&
      U.n("ContextMenuTool.currentContextMenu must be an Adornment or HTMLInfo."),
      (this.pM = t),
      (this.Gx = t instanceof Adornment ? t.adornedPart : null));
  }
  get defaultTouchContextMenu() {
    return (
      ContextMenuTool.xM === !1 && ContextMenuTool.qu === null && Diagram.isUsingDOM() && this.TR(),
      ContextMenuTool.qu
    );
  }
  set defaultTouchContextMenu(t) {
    (Debug &&
      t !== null &&
      !(t instanceof Adornment || t instanceof HTMLInfo) &&
      U.n("ContextMenuTool.defaultTouchContextMenu must be an Adornment or HTMLInfo."),
      t === null && (ContextMenuTool.xM = !0),
      (ContextMenuTool.qu = t));
  }
  get currentObject() {
    return this.yM;
  }
  set currentObject(t) {
    (t !== null && U.s(t, GraphObject, ContextMenuTool, "currentObject"), (this.yM = t));
  }
  get mouseDownPoint() {
    return this.wM;
  }
}
var TextEditingAccept = ((w) => (
    (w[(w.LostFocus = 1)] = "LostFocus"),
    (w[(w.MouseDown = 2)] = "MouseDown"),
    (w[(w.Tab = 3)] = "Tab"),
    (w[(w.Enter = 4)] = "Enter"),
    w
  ))(TextEditingAccept || {}),
  TextEditingStarting = ((w) => (
    (w[(w.SingleClick = 1)] = "SingleClick"),
    (w[(w.SingleClickSelected = 2)] = "SingleClickSelected"),
    (w[(w.DoubleClick = 3)] = "DoubleClick"),
    w
  ))(TextEditingStarting || {}),
  TextEditingState = ((w) => (
    (w[(w.None = 1)] = "None"),
    (w[(w.Active = 2)] = "Active"),
    (w[(w.Editing = 3)] = "Editing"),
    (w[(w.Validating = 4)] = "Validating"),
    (w[(w.Invalid = 5)] = "Invalid"),
    (w[(w.Validated = 6)] = "Validated"),
    w
  ))(TextEditingState || {});
