class RowColumnDefinition {
  en;
  Gp;
  Et;
  va;
  Wa;
  pi;
  yt;
  Ud;
  uo;
  dl;
  Gd;
  qd;
  ja;
  Ft;
  Hd;
  Vs;
  $;
  bi;
  Me;
  constructor(t) {
    (GSet._i(this),
      (this.en = null),
      (this.Gp = true),
      (this.Et = 0),
      (this.Me = NaN),
      (this.va = 0),
      (this.Wa = 1 / 0),
      (this.pi = Spot.Default),
      (this.$ = 0),
      (this.bi = 0),
      (this.yt = 0),
      (this.Vs = null),
      (this.Ud = 1),
      (this.uo = 1),
      (this.dl = null),
      (this.Gd = null),
      (this.qd = NaN),
      (this.ja = null),
      (this.Ft = null),
      (this.Hd = false),
      t &&
        (Object.assign(this, t),
        t.column !== void 0
          ? ((this.isRow = false), (this.index = t.column))
          : t.row !== void 0 && ((this.isRow = true), (this.index = t.row))));
  }
  copy() {
    const t = new RowColumnDefinition();
    return (
      (t.Gp = this.Gp),
      (t.Et = this.Et),
      (t.Me = this.Me),
      (t.va = this.va),
      (t.Wa = this.Wa),
      (t.pi = this.pi),
      (t.$ = this.$),
      (t.bi = this.bi),
      (t.yt = this.yt),
      (t.uo = this.uo),
      (t.Ud = this.Ud),
      this.dl === null ? (t.dl = null) : (t.dl = this.dl.T()),
      (t.Gd = this.Gd),
      (t.qd = this.qd),
      (t.ja = null),
      this.ja !== null && (t.separatorDashArray = this.ja.slice()),
      (t.Ft = this.Ft),
      (t.Hd = this.Hd),
      (t.Vs = this.Vs),
      t
    );
  }
  Hb(t) {
    (t.isRow ? t.height !== void 0 && (this.height = t.height) : t.width !== void 0 && (this.width = t.width),
      t.minimum !== void 0 && (this.minimum = t.minimum),
      t.maximum !== void 0 && (this.maximum = t.maximum),
      t.alignment !== void 0 && (this.alignment = t.alignment),
      t.stretch !== void 0 && (this.stretch = t.stretch),
      t.sizing !== void 0 && (this.sizing = t.sizing),
      t.separatorPadding !== void 0 && (this.separatorPadding = t.separatorPadding),
      t.separatorStroke !== void 0 && (this.separatorStroke = t.separatorStroke),
      t.separatorStrokeWidth !== void 0 && (this.separatorStrokeWidth = t.separatorStrokeWidth),
      t.separatorDashArray !== void 0 && (this.ja = t.separatorDashArray),
      t.background !== void 0 && (this.background = t.background),
      t.coversSeparators !== void 0 && (this.coversSeparators = t.coversSeparators),
      t.Vs !== void 0 && (this.Vs = t.Vs));
  }
  gi(t) {
    t in Sizing ? (this.sizing = t) : U.wr(this, t);
  }
  toString() {
    return "RowColumnDefinition " + (this.isRow ? "(Row " : "(Column ") + this.index + ") #" + GSet.Ps(this);
  }
  static Default = 1;
  static None = 2;
  static ProportionalExtra = 3;
  Ua(t) {
    this.en = t;
  }
  computeEffectiveSpacingTop(t) {
    let i = 0;
    const e = this.en;
    if (this.index !== t) {
      let n = this.separatorStroke;
      (n === null && e !== null && (n = this.isRow ? e.defaultRowSeparatorStroke : e.defaultColumnSeparatorStroke),
        n !== null &&
          ((i = this.separatorStrokeWidth),
          isNaN(i) &&
            (e !== null
              ? (i = this.isRow ? e.defaultRowSeparatorStrokeWidth : e.defaultColumnSeparatorStrokeWidth)
              : (i = 0))));
    }
    let s = this.dl;
    if (s === null)
      if (e !== null) s = e.defaultSeparatorPadding;
      else return i;
    return i + (this.isRow ? s.top : s.left);
  }
  computeEffectiveSpacing() {
    let t = 0;
    const i = this.en;
    let e = 0;
    const s = this.isRow;
    if (i !== null && i.type === Panel.Table) {
      const o = s ? i.Xe.length : i.Ye.length;
      for (let r = 0; r < o; r++) {
        const l = s ? i.Xe[r] : i.Ye[r];
        if (l !== void 0 && l.$ !== 0) {
          e = l.index;
          break;
        }
      }
    }
    if (this.index !== e) {
      let o = this.separatorStroke;
      (o === null && i !== null && (o = s ? i.defaultRowSeparatorStroke : i.defaultColumnSeparatorStroke),
        o !== null &&
          ((t = this.separatorStrokeWidth),
          isNaN(t) &&
            (i !== null ? (t = s ? i.defaultRowSeparatorStrokeWidth : i.defaultColumnSeparatorStrokeWidth) : (t = 0))));
    }
    let n = this.dl;
    if (n === null)
      if (i !== null) n = i.defaultSeparatorPadding;
      else return t;
    return t + (this.isRow ? n.top + n.bottom : n.left + n.right);
  }
  t(t, i, e, s, n) {
    const o = this.en;
    if (o !== null && (o.raiseChangedEvent(2, t, this, i, e, s, n), this.Vs !== null)) {
      const r = o.diagram;
      if (r !== null && !r.Se) {
        const l = o.findBindingPanel();
        if (l !== null) {
          const h = l.data;
          if (h !== null) {
            const a = this.Vs.iterator;
            for (; a.next(); ) a.value.updateSource(this, h, t, l);
          }
        }
      }
    }
  }
  get panel() {
    return this.en;
  }
  get isRow() {
    return this.Gp;
  }
  set isRow(t) {
    this.Gp = t;
  }
  get index() {
    return this.Et;
  }
  set index(t) {
    this.Et = t;
  }
  get height() {
    return this.Me;
  }
  set height(t) {
    const i = this.Me;
    i !== t &&
      (Debug && U.i(t, "number", RowColumnDefinition, "height"),
      t < 0 && U.G(t, ">= 0", RowColumnDefinition, "height"),
      (this.Me = t),
      (this.actual = this.$),
      this.panel !== null && this.panel.g(),
      this.t("height", i, t));
  }
  get width() {
    return this.Me;
  }
  set width(t) {
    const i = this.Me;
    i !== t &&
      (Debug && U.i(t, "number", RowColumnDefinition, "width"),
      t < 0 && U.G(t, ">= 0", RowColumnDefinition, "width"),
      (this.Me = t),
      (this.actual = this.$),
      this.panel !== null && this.panel.g(),
      this.t("width", i, t));
  }
  get minimum() {
    return this.va;
  }
  set minimum(t) {
    const i = this.va;
    i !== t &&
      (Debug && U.i(t, "number", RowColumnDefinition, "minimum"),
      (t < 0 || !isFinite(t)) && U.G(t, ">= 0", RowColumnDefinition, "minimum"),
      (this.va = t),
      (this.actual = this.$),
      this.panel !== null && this.panel.g(),
      this.t("minimum", i, t));
  }
  get maximum() {
    return this.Wa;
  }
  set maximum(t) {
    const i = this.Wa;
    i !== t &&
      (Debug && U.i(t, "number", RowColumnDefinition, "maximum"),
      t < 0 && U.G(t, ">= 0", RowColumnDefinition, "maximum"),
      (this.Wa = t),
      (this.actual = this.$),
      this.panel !== null && this.panel.g(),
      this.t("maximum", i, t));
  }
  get alignment() {
    return this.pi;
  }
  set alignment(t) {
    const i = this.pi;
    i.equals(t) ||
      (Debug && U.s(t, Spot, RowColumnDefinition, "alignment"),
      (this.pi = t.T()),
      this.panel !== null && this.panel.g(),
      this.t("alignment", i, t));
  }
  get stretch() {
    return this.uo;
  }
  set stretch(t) {
    const i = this.uo;
    i !== t && ((this.uo = t), this.panel !== null && this.panel.g(), this.t("stretch", i, t));
  }
  get separatorPadding() {
    return this.dl;
  }
  set separatorPadding(t) {
    typeof t == "number"
      ? (t = new Margin(t))
      : t !== null && Debug && U.s(t, Margin, RowColumnDefinition, "separatorPadding");
    const i = this.dl;
    (t === null || i === null || !i.equals(t)) &&
      (t !== null && (t = t.T()),
      (this.dl = t),
      this.panel !== null && this.panel.g(),
      this.t("separatorPadding", i, t));
  }
  get separatorStroke() {
    return this.Gd;
  }
  set separatorStroke(t) {
    const i = this.Gd;
    i !== t &&
      (t !== null && Brush.Dd(t, "RowColumnDefinition.separatorStroke"),
      t instanceof Brush && t.k(),
      (this.Gd = t),
      this.panel !== null && this.panel.g(),
      this.t("separatorStroke", i, t));
  }
  get separatorStrokeWidth() {
    return this.qd;
  }
  set separatorStrokeWidth(t) {
    const i = this.qd;
    i !== t && ((this.qd = t), this.panel !== null && this.panel.g(), this.t("separatorStrokeWidth", i, t));
  }
  get separatorDashArray() {
    return this.ja;
  }
  set separatorDashArray(t) {
    const i = this.ja;
    if (i !== t) {
      if (
        (t !== null && !Array.isArray(t) && U.Li(t, "Array", RowColumnDefinition, "separatorDashArray:value"),
        t !== null)
      ) {
        const e = t.length;
        let s = 0;
        for (let n = 0; n < e; n++) {
          const o = t[n];
          ((typeof o != "number" || !(o >= 0) || !isFinite(o)) &&
            U.n("separatorDashArray value " + o + " at index " + n + " must be a positive number or zero."),
            (s += o));
        }
        if (s === 0) {
          if (i === null) return;
          t = null;
        }
      }
      ((this.ja = t), this.panel !== null && this.panel.L(), this.t("separatorDashArray", i, t));
    }
  }
  get background() {
    return this.Ft;
  }
  set background(t) {
    const i = this.Ft;
    i !== t &&
      (t !== null && Brush.Dd(t, "RowColumnDefinition.background"),
      t instanceof Brush && t.k(),
      (this.Ft = t),
      this.panel !== null && this.panel.L(),
      this.t("background", i, t));
  }
  get coversSeparators() {
    return this.Hd;
  }
  set coversSeparators(t) {
    const i = this.Hd;
    i !== t &&
      (U.i(t, "boolean", RowColumnDefinition, "coversSeparators"),
      (this.Hd = t),
      this.panel !== null && this.panel.L(),
      this.t("coversSeparators", i, t));
  }
  get sizing() {
    return this.Ud;
  }
  set sizing(t) {
    const i = this.Ud;
    i !== t &&
      (Debug && U.W(t, Sizing, "Sizing"), (this.Ud = t), this.panel !== null && this.panel.g(), this.t("sizing", i, t));
  }
  Zb() {
    if (this.sizing === 1) {
      const t = this.en;
      return t === null ? 2 : this.isRow ? t.rowSizing : t.columnSizing;
    }
    return this.sizing;
  }
  get actual() {
    return this.$;
  }
  set actual(t) {
    isNaN(this.Me)
      ? (this.$ = Math.max(Math.min(this.Wa, t), this.va))
      : (this.$ = Math.max(Math.min(this.Wa, this.Me), this.va));
  }
  get measured() {
    return this.bi;
  }
  set measured(t) {
    this.bi = t;
  }
  get total() {
    return this.$ + this.computeEffectiveSpacing();
  }
  get position() {
    return this.yt;
  }
  set position(t) {
    this.yt = t;
  }
  bind(t, i, e, s) {
    return (this.Tc(t, i, e, s), this);
  }
  bindTwoWay(t, i, e, s) {
    const n = this.Tc(t, i, e, s);
    return (s === void 0 && n.makeTwoWay(), this);
  }
  theme(t, i, e, s, n) {
    return (this.Ih(t, i, e, s, n), this);
  }
  themeData(t, i, e, s, n) {
    return (this.Ih(t, i, e, s, n).ofData(), this);
  }
  themeObject(t, i, e, s, n, o) {
    return (this.Ih(t, i, e, s, n).ofObject(o), this);
  }
  themeModel(t, i, e, s, n) {
    return (this.Ih(t, i, e, s, n).ofModel(), this);
  }
  Tc(t, i, e, s) {
    let n;
    return (typeof t == "string" ? (n = new Binding(t, i, e, s)) : (n = t), this.xp(n), n);
  }
  Ih(t, i, e, s, n) {
    let o;
    return (typeof t == "string" ? (o = new ThemeBinding(t, i, e, s, n)) : (o = t), this.xp(o), o);
  }
  xp(t) {
    t.Re = this;
    const i = this.panel;
    if (i !== null) {
      const e = i.findBindingPanel();
      e !== null &&
        e.cD() &&
        U.n("Cannot add a Binding to a RowColumnDefinition that is already frozen: " + t + " on " + i);
    }
    (this.Vs === null && (this.Vs = new List()), this.Vs.add(t));
  }
}
