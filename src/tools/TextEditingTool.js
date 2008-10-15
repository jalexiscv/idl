class TextEditingTool extends Tool {
  Ee;
  bM;
  SM;
  vl;
  Wt;
  kM;
  PM;
  MM;
  vx;
  Wx;
  constructor(t) {
    (super(),
      (this.name = "TextEditing"),
      (this.Ee = new TextBlock()),
      (this.bM = null),
      (this.SM = 2),
      (this.vl = null),
      (this.Wt = 1),
      (this.kM = 1),
      (this.PM = !0),
      (this.MM = null),
      (this.vx = new HTMLInfo()),
      (this.Wx = null),
      this.DR(this.vx),
      t && Object.assign(this, t));
  }
  static LostFocus = 1;
  static MouseDown = 2;
  static Tab = 3;
  static Enter = 4;
  static SingleClick = 1;
  static SingleClickSelected = 2;
  static DoubleClick = 3;
  static StateNone = 1;
  static StateActive = 2;
  static StateEditing = 3;
  static StateValidating = 4;
  static StateInvalid = 5;
  static StateValidated = 6;
  DR(t) {
    if (!Diagram.isUsingDOM()) return;
    const i = U.Le("textarea");
    this.Wx = i;
    const e = this;
    (i.addEventListener(
      "input",
      function (s) {
        if (e.textBlock === null) return;
        const n = e.measureTemporaryTextBlock(this.value),
          o = this.textScale;
        ((this.style.width = 20 + Math.max(e.textBlock.measuredBounds.width, n.measuredBounds.width) * o + "px"),
          (this.rows = Math.max(e.textBlock.lineCount, n.lineCount)));
      },
      !1,
    ),
      i.addEventListener(
        "keydown",
        function (s) {
          if (s.isComposing || e.textBlock === null) return;
          const n = s.key;
          if (n === "Enter") {
            (e.textBlock.isMultiline === !1 && s.preventDefault(), e.acceptText(4));
            return;
          } else if (n === "Tab") {
            (e.acceptText(3), s.preventDefault());
            return;
          } else n === "Escape" && (e.doCancel(), e.diagram !== null && e.diagram.doFocus());
        },
        !1,
      ),
      i.addEventListener(
        "focus",
        function (s) {
          e.FR(s);
        },
        !1,
      ),
      i.addEventListener(
        "blur",
        function (s) {
          e.IR(s);
        },
        !1,
      ),
      (t.valueFunction = () => i.value),
      (t.mainElement = i),
      (t.show = (s, n, o) => {
        if (!(s instanceof TextBlock) || !n || !n.div || !(o instanceof TextEditingTool)) return;
        if (o.state === 5) {
          ((i.style.border = "3px solid red"), i.focus());
          return;
        }
        const r = s.getDocumentPoint(Spot.Center),
          l = n.position,
          h = n.scale;
        let a = s.getDocumentScale() * h;
        a < o.minimumEditorScale && (a = o.minimumEditorScale);
        const f = s.naturalBounds.width * a + 6,
          c = s.naturalBounds.height * a + 2,
          u = (r.x - l.x) * h,
          d = (r.y - l.y) * h,
          m = s.verticalAlignment,
          p = (s.lineHeight + s.spacingAbove + s.spacingBelow) * s.lineCount * a,
          y = 0.5 * c - 0.5 * p,
          x = m.y * c - m.y * p + m.offsetY - y - p / 2;
        ((i.value = s.text), (n.div.style.font = s.font));
        const b = 1;
        ((i.style.position = "absolute"),
          (i.style.zIndex = "100"),
          (i.style.font = "inherit"),
          (i.style.fontSize = a * 100 + "%"),
          (i.style.lineHeight = "normal"),
          (i.style.width = f + "px"),
          (i.style.left = ((u - f / 2) | 0) - b + "px"),
          (i.style.top = ((d + x) | 0) - b + "px"),
          (i.style.textAlign = s.textAlign),
          (i.style.margin = "0"),
          (i.style.padding = b + "px"),
          (i.style.border = "0"),
          (i.style.outline = "none"),
          (i.style.whiteSpace = "pre-wrap"),
          (i.style.overflow = "hidden"),
          (i.rows = s.lineCount),
          (i.textScale = a),
          (i.className = "idlTXarea"),
          n.div.appendChild(i),
          i.focus(),
          o.selectsTextOnActivate && (i.select(), i.setSelectionRange(0, 9999)));
      }),
      (t.hide = (s, n) => {
        s.div && s.div.removeChild(i);
      }));
  }
  get textBlock() {
    return this.bM;
  }
  set textBlock(t) {
    (t !== null && U.s(t, TextBlock, TextEditingTool, "textBlock"), (this.bM = t));
  }
  get currentTextEditor() {
    return this.MM;
  }
  set currentTextEditor(t) {
    this.MM = t;
  }
  get defaultTextEditor() {
    return this.vx;
  }
  set defaultTextEditor(t) {
    (Debug && !(t instanceof HTMLInfo) && U.n("TextEditingTool.defaultTextEditor must be an HTMLInfo."), (this.vx = t));
  }
  get starting() {
    return this.SM;
  }
  set starting(t) {
    (U.W(t, TextEditingStarting, "TextEditingStarting"), (this.SM = t));
  }
  canStart() {
    if (!this.isEnabled) return !1;
    const t = this.diagram;
    if (
      t === null ||
      t.isReadOnly ||
      (TextEditingTool.Hf &&
        TextEditingTool.Hf !== this &&
        (TextEditingTool.Hf.acceptText(2), TextEditingTool.Hf && TextEditingTool.Hf !== this)) ||
      !t.lastInput.left ||
      this.isBeyondDragSize()
    )
      return !1;
    const i = t.lastInput.documentPoint,
      e = t.findObjectAt(i);
    if (e === null || !(e instanceof TextBlock) || !e.editable || e.part === null || !e.part.canEdit()) return !1;
    const s = e.part;
    return !(
      s === null ||
      (this.starting === 2 && !s.isSelected) ||
      (this.starting === 3 && t.lastInput.clickCount < 2)
    );
  }
  doStart() {
    ((TextEditingTool.Hf = this), this.textBlock !== null && this.doActivate());
  }
  doActivate() {
    if (this.isActive) return;
    const t = this.diagram;
    if (t === null) return;
    let i = this.textBlock;
    if (
      (i === null && (i = t.findObjectAt(t.lastInput.documentPoint)),
      i === null || !(i instanceof TextBlock) || ((this.textBlock = i), i.part === null))
    )
      return;
    (t.animationManager.stopAnimation(), (this.isActive = !0), (this.Wt = 2));
    let s = this.defaultTextEditor;
    (i.textEditor !== null && (s = i.textEditor), (this.Ee = this.textBlock.copy()));
    const n = new Rect(
      this.textBlock.getDocumentPoint(Spot.TopLeft),
      this.textBlock.getDocumentPoint(Spot.BottomRight),
    );
    (t.scrollToRect(n), s !== null && s.show !== null && s.show(i, t, this), (this.currentTextEditor = s));
  }
  doCancel() {
    this.stopTool();
  }
  doMouseUp() {
    this.canStart() && this.doActivate();
  }
  doMouseDown() {
    this.isActive && this.acceptText(2);
  }
  acceptText(t) {
    switch (t) {
      case 2:
        this.Wt === 6
          ? this.currentTextEditor instanceof HTMLElement && this.currentTextEditor.focus()
          : (this.Wt === 2 || this.Wt === 5 || this.Wt === 3) && ((this.Wt = 4), this.OT());
        break;
      case 1:
      case 4:
      case 3:
        if (t === 4 && this.textBlock !== null && this.textBlock.isMultiline === !0) return;
        (this.Wt === 2 || this.Wt === 5 || this.Wt === 3) && ((this.Wt = 4), this.OT());
        break;
    }
  }
  OT() {
    const t = this.textBlock,
      i = this.diagram,
      e = this.currentTextEditor;
    if (t !== null && e !== null) {
      const s = t.text;
      let n = "";
      if ((e.valueFunction !== null && (n = e.valueFunction()), !this.isValidText(t, s, n))) {
        ((this.Wt = 5), this.doError(s, n));
        return;
      }
      (this.startTransaction(this.name),
        (this.Wt = 6),
        (this.transactionResult = this.name),
        (t.text = n),
        this.doSuccess(s, n),
        i !== null && i.F("TextEdited", t, s),
        this.stopTransaction(),
        this.stopTool(),
        i !== null && i.doFocus());
    }
  }
  doError(t, i) {
    const e = this.textBlock;
    if (e === null) return;
    e.errorFunction !== null && e.errorFunction(this, t, i);
    const s = this.currentTextEditor;
    s !== null && s.show !== null && s.show(e, this.diagram, this);
  }
  doSuccess(t, i) {
    const e = this.textBlock;
    e !== null && e.textEdited !== null && e.textEdited(e, t, i);
  }
  doDeactivate() {
    const t = this.diagram;
    if (t !== null) {
      if (((this.Wt = 1), this.currentTextEditor !== null)) {
        const i = this.currentTextEditor;
        i !== null && i.hide !== null && i.hide(t, this);
      }
      ((this.textBlock = null), (this.isActive = !1));
    }
  }
  doStop() {
    TextEditingTool.Hf = null;
  }
  FR(t) {
    if (this.currentTextEditor === null || this.state === 1) return;
    const i = this.Wx;
    (this.Wt === 2 && (this.Wt = 3),
      U.lt(i.select) && this.selectsTextOnActivate && (i.select(), i.setSelectionRange(0, 9999)));
  }
  IR(t) {
    if (this.currentTextEditor === null || this.state === 1) return;
    const i = this.Wx;
    (U.lt(i.focus) && i.focus(),
      U.lt(i.select) && this.selectsTextOnActivate && (i.select(), i.setSelectionRange(0, 9999)));
  }
  isValidText(t, i, e) {
    U.s(t, TextBlock, TextEditingTool, "isValidText:textblock");
    const s = this.textValidation;
    if (s !== null && !s(t, i, e)) return !1;
    const n = t.textValidation;
    return !(n !== null && !n(t, i, e));
  }
  get textValidation() {
    return this.vl;
  }
  set textValidation(t) {
    (t !== null && U.C(t, TextEditingTool, "textValidation"), (this.vl = t));
  }
  get minimumEditorScale() {
    return this.kM;
  }
  set minimumEditorScale(t) {
    (t !== null && U.i(t, "number", TextEditingTool, "minimumEditorScale"), (this.kM = t));
  }
  get selectsTextOnActivate() {
    return this.PM;
  }
  set selectsTextOnActivate(t) {
    (t !== null && U.i(t, "boolean", TextEditingTool, "selectsTextOnActivate"), (this.PM = t));
  }
  get state() {
    return this.Wt;
  }
  set state(t) {
    this.Wt !== t && (U.W(t, TextEditingState, "TextEditingState"), (this.Wt = t));
  }
  measureTemporaryTextBlock(t) {
    const i = this.Ee;
    return ((i.text = t), this.textBlock !== null && i.gt(this.textBlock.Wl, 1 / 0), i);
  }
  static Hf = null;
}
var AnimationStyle = ((w) => (
  (w[(w.Default = 1)] = "Default"),
  (w[(w.AnimateLocations = 2)] = "AnimateLocations"),
  (w[(w.None = 3)] = "None"),
  w
))(AnimationStyle || {});
