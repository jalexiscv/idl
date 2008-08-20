class TextBlock extends GraphObject {
  mi;
  ee;
  Bn;
  Ne;
  xi;
  j0;
  $d;
  j;
  nt;
  Wl;
  yo;
  zn;
  Ke;
  Si;
  Xn;
  constructor(t, i) {
    return (
      super(),
      TextBlock.Np === false &&
        ((TextBlock.Np = true), (TextBlock.ps = Diagram.isUsingDOM() ? new CanvasSurface(null).ni : null)),
      (this.l |= 2097152),
      (this.mi = ""),
      (this.ee = "black"),
      (this.Bn = "13px sans-serif"),
      (this.Ne = 0),
      (this.xi = 0),
      (this.j0 = 0),
      (this.$d = null),
      (this.j = null),
      (this.nt = null),
      (this.Wl = 0),
      (this.yo = null),
      (this.zn = 0),
      (this.Ke = null),
      (this.Si = null),
      (this.Xn = null),
      typeof t == "string" ? (this.text = t) : t && Object.assign(this, t),
      i && Object.assign(this, i),
      this
    );
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.mi = this.mi),
      (t.ee = this.ee),
      (t.Bn = this.Bn),
      (t.Ne = this.Ne),
      (t.xi = this.xi),
      (t.j0 = this.j0),
      (t.$d = this.$d),
      this.j !== null && (t.j = this.j.copy()),
      this.nt !== null && (this.nt.wi ? (t.nt = this.nt) : (t.nt = this.nt.copy())),
      (t.Wl = this.Wl),
      (t.yo = this.yo),
      (t.zn = this.zn),
      (t.Ke = this.Ke),
      (t.Si = this.Si),
      (t.Xn = this.Xn));
  }
  Bs() {
    return (
      this.nt === null ? (this.nt = new TextBlockTemplateSettings()) : this.nt.wi && (this.nt = this.nt.copy()),
      this.nt
    );
  }
  Ch() {
    (super.Ch(), this.nt !== null && (this.nt.wi = true));
  }
  $E(t) {
    ((this.l = t.l | 2048 | 4096),
      (this.ei = t.opacity),
      (this.Ft = t.background),
      (this.gs = t.desiredSize.T()),
      (this.minSize = t.minSize.T()),
      (this.maxSize = t.maxSize.T()),
      t.Ai !== null ? (this.Ai = t.Ai.copy()) : (this.Ai = null),
      (this.rt = t.scale),
      (this.vt = t.angle),
      (this.stretch = t.stretch),
      (this.hl = t.margin.T()),
      (this.pi = t.alignment.T()),
      (this.Md = t.alignmentFocus.T()),
      (this.segmentFraction = t.segmentFraction),
      (this.segmentOffset = t.segmentOffset.T()),
      (this.segmentOrientation = t.segmentOrientation),
      t.ui !== null && (this.ui = t.ui.copy()),
      (this.shadowVisible = t.shadowVisible),
      (this.mi = t.mi),
      (this.ee = t.ee),
      (this.Bn = t.Bn),
      this.j !== null && (this.j = t.j.copy()),
      t.nt !== null && (t.nt.wi ? (this.nt = t.nt) : (this.nt = t.nt.copy())),
      (this.Wl = t.Wl));
  }
  jE(t) {
    if (
      ((this.mi = t.text || ""),
      (this.vt = t.labelAngle || 0),
      (this.Ne = t.lineCount || 0),
      this.d3(t.lines),
      t.naturalBounds && (this.ji = t.naturalBounds),
      t.actualBounds)
    ) {
      const i = t.actualBounds;
      this.Ut(i.x, i.y, i.width, i.height);
    }
  }
  gi(t) {
    t in Wrap ? (this.wrap = t) : super.gi(t);
  }
  toString() {
    return this.mi.length > 22 ? 'TextBlock("' + this.mi.substring(0, 20) + '"...)' : 'TextBlock("' + this.mi + '")';
  }
  static getEllipsis() {
    return TextBlock.Zp;
  }
  static setEllipsis(t) {
    ((TextBlock.Zp = t), (TextBlock.oS = new PropertyCollection()), (TextBlock.aC = 0));
  }
  static getBaseline() {
    return TextBlock.rS;
  }
  static setBaseline(t) {
    TextBlock.rS = t;
  }
  static rS = null;
  static getUnderline() {
    return TextBlock.lS;
  }
  static setUnderline(t) {
    TextBlock.lS = t;
  }
  static lS = null;
  static None = 0;
  static WrapFit = 1;
  static WrapDesiredSize = 2;
  static WrapBreakAll = 3;
  static OverflowClip = 0;
  static OverflowEllipsis = 1;
  static FormatTrim = 0;
  static FormatNone = 1;
  g() {
    (super.g(), this.is(true));
  }
  get font() {
    return this.Bn;
  }
  set font(t) {
    const i = this.Bn;
    i !== t &&
      (Debug && (U.i(t, "string", TextBlock, "font"), TextBlock.isValidFont(t) || U.n('Not a valid font: "' + t + '"')),
      (this.Bn = t),
      (this.yo = null),
      this.g(),
      this.t("font", i, t));
  }
  static isValidFont(t) {
    return root.CSS ? root.CSS.supports("font", t) : true;
  }
  get text() {
    return this.mi;
  }
  set text(t) {
    const i = this.mi;
    (t != null ? (t = t.toString()) : (t = ""), i !== t && ((this.mi = t), this.g(), this.t("text", i, t)));
  }
  get textAlign() {
    return this.nt !== null ? this.nt.Qp : "start";
  }
  set textAlign(t) {
    const i = this.textAlign;
    i !== t &&
      (Debug && U.i(t, "string", TextBlock, "textAlign"),
      t === "start" || t === "end" || t === "left" || t === "right" || t === "center"
        ? ((this.Bs().Qp = t), this.L(), this.t("textAlign", i, t))
        : Debug && U.G(t, '"start", "end", "left", "right", or "center"', TextBlock, "textAlign"));
  }
  get flip() {
    return this.nt !== null ? this.nt.wo : 0;
  }
  set flip(t) {
    const i = this.flip;
    i !== t && (U.W(t, Flip, "Flip"), (this.Bs().wo = t), this.L(), this.t("flip", i, t));
  }
  get verticalAlignment() {
    return this.nt !== null ? this.nt.gl : Spot.Top;
  }
  set verticalAlignment(t) {
    const i = this.verticalAlignment;
    i.equals(t) ||
      (Debug &&
        (U.s(t, Spot, TextBlock, "verticalAlignment"),
        t.isNoSpot() && U.n("TextBlock.verticalAlignment for " + this + " must be a real Spot, not:" + t)),
      (t = t.T()),
      (this.Bs().gl = t),
      this.Ac(),
      this.t("verticalAlignment", i, t));
  }
  get naturalBounds() {
    if (!this.ji.isReal()) {
      const t = Size.a();
      this.fC(this.mi, 999999, t);
      let i = t.width;
      Size.o(t);
      let e = this.ID(i);
      const s = this.desiredSize;
      (isNaN(s.width) || (i = s.width), isNaN(s.height) || (e = s.height), this.ji.$n(i, e));
    }
    return this.ji;
  }
  get isMultiline() {
    return (this.l & 2097152) !== 0;
  }
  set isMultiline(t) {
    const i = (this.l & 2097152) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", TextBlock, "isMultiline"),
      (this.l = this.l ^ 2097152),
      this.g(),
      this.t("isMultiline", i, t));
  }
  get isUnderline() {
    return (this.l & 4194304) !== 0;
  }
  set isUnderline(t) {
    const i = (this.l & 4194304) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", TextBlock, "isUnderline"),
      (this.l = this.l ^ 4194304),
      this.is(true),
      this.L(),
      this.t("isUnderline", i, t));
  }
  get isStrikethrough() {
    return (this.l & 8388608) !== 0;
  }
  set isStrikethrough(t) {
    const i = (this.l & 8388608) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", TextBlock, "isStrikethrough"),
      (this.l = this.l ^ 8388608),
      this.is(true),
      this.L(),
      this.t("isStrikethrough", i, t));
  }
  get wrap() {
    return this.nt !== null ? this.nt._p : 2;
  }
  set wrap(t) {
    const i = this.wrap;
    i !== t && (Debug && U.W(t, Wrap, "Wrap"), (this.Bs()._p = t), this.g(), this.t("wrap", i, t));
  }
  get overflow() {
    return this.nt !== null ? this.nt.ty : 0;
  }
  set overflow(t) {
    const i = this.overflow;
    i !== t && (Debug && U.W(t, TextOverflow, "Overflow"), (this.Bs().ty = t), this.g(), this.t("overflow", i, t));
  }
  get isOverflowed() {
    return (this.l & 16777216) !== 0;
  }
  cC(t) {
    t ? (this.l |= 16777216) : (this.l &= -16777217);
  }
  get stroke() {
    return this.ee;
  }
  set stroke(t) {
    const i = this.ee;
    i !== t &&
      (t !== null && Brush.Dd(t, "TextBlock.stroke"),
      t instanceof Brush && t.k(),
      (this.ee = t),
      typeof t != "string" && this.Mc(),
      this.L(),
      this.t("stroke", i, t));
  }
  get lineCount() {
    return this.Ne;
  }
  get lineHeight() {
    return this.iy();
  }
  get editable() {
    return (this.l & 1048576) !== 0;
  }
  set editable(t) {
    const i = (this.l & 1048576) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", TextBlock, "editable"), (this.l = this.l ^ 1048576), this.t("editable", i, t));
  }
  get QN() {
    return (this.l & 33554432) !== 0;
  }
  set QN(t) {
    this.l = this.l ^ 33554432;
  }
  get textEditor() {
    return this.nt !== null ? this.nt.ey : null;
  }
  set textEditor(t) {
    const i = this.textEditor;
    i !== t &&
      (Debug && !(t instanceof HTMLInfo) && U.n("TextBlock.textEditor must be an HTMLInfo."),
      (this.Bs().ey = t),
      this.t("textEditor", i, t));
  }
  get errorFunction() {
    return this.nt !== null ? this.nt.ws : null;
  }
  set errorFunction(t) {
    const i = this.errorFunction;
    i !== t && (t !== null && U.C(t, TextBlock, "errorFunction"), (this.Bs().ws = t), this.t("errorFunction", i, t));
  }
  get interval() {
    return this.j !== null ? this.j.Bc : 1;
  }
  set interval(t) {
    const i = this.interval;
    if ((Debug && U.r(t, TextBlock, "interval"), (t = Math.round(t)), i !== t && t !== 0 && isFinite(t))) {
      (this.j === null && (this.j = new GradElementSettings()), (this.j.Bc = t), this.g());
      const e = this.panel;
      (e !== null && (e.ys = null), this.t("interval", i, t));
    }
  }
  get graduatedStart() {
    return this.j !== null ? this.j.zc : 0;
  }
  set graduatedStart(t) {
    const i = this.graduatedStart;
    (Debug && U.r(t, TextBlock, "graduatedStart"),
      i !== t &&
        (t < 0 ? (t = 0) : t > 1 && (t = 1),
        this.j === null && (this.j = new GradElementSettings()),
        (this.j.zc = t),
        this.g(),
        this.t("graduatedStart", i, t)));
  }
  get graduatedEnd() {
    return this.j !== null ? this.j.Xc : 1;
  }
  set graduatedEnd(t) {
    const i = this.graduatedEnd;
    (Debug && U.r(t, TextBlock, "graduatedEnd"),
      i !== t &&
        (t < 0 ? (t = 0) : t > 1 && (t = 1),
        this.j === null && (this.j = new GradElementSettings()),
        (this.j.Xc = t),
        this.g(),
        this.t("graduatedEnd", i, t)));
  }
  get graduatedFunction() {
    return this.j !== null ? this.j.ny : null;
  }
  set graduatedFunction(t) {
    const i = this.graduatedFunction;
    i !== t &&
      (t !== null && U.C(t, TextBlock, "graduatedFunction"),
      this.j === null && (this.j = new GradElementSettings()),
      (this.j.ny = t),
      this.g(),
      this.t("graduatedFunction", i, t));
  }
  get graduatedSkip() {
    return this.j !== null ? this.j.Yc : null;
  }
  set graduatedSkip(t) {
    const i = this.graduatedSkip;
    i !== t &&
      (t !== null && U.C(t, TextBlock, "graduatedSkip"),
      this.j === null && (this.j = new GradElementSettings()),
      (this.j.Yc = t),
      this.g(),
      this.t("graduatedSkip", i, t));
  }
  Dh(t, i) {
    if (this.ee === null || this.mi.length === 0 || this.Bn === null) return;
    const e = this.naturalBounds,
      s = this.actualBounds,
      n = e.width,
      o = e.height,
      r = this.iy();
    let l = (t.textAlign = this.textAlign);
    const h = i.cd;
    l === "start" ? (l = h ? "right" : "left") : l === "end" && (l = h ? "left" : "right");
    const a = this.isUnderline,
      f = this.isStrikethrough;
    (this.Cn(t, this.ee, true, false, e, s), (a || f) && this.Cn(t, this.ee, false, false, e, s));
    const c = 0;
    let u = 0;
    const d = n;
    let m = false;
    i._t === t &&
      !(i._t instanceof SVGContext) &&
      !this.QN &&
      i.getRenderingHint("textGreeking") === true &&
      r * this.Oa * i.scale < 3 &&
      (m = true);
    const g = this.spacingAbove,
      p = this.spacingBelow;
    switch (this.flip) {
      case 0:
        break;
      case 2:
        (t.translate(n, 0), t.scale(-1, 1));
        break;
      case 1:
        (t.translate(0, o), t.scale(1, -1));
        break;
      case 3:
        (t.translate(n, o), t.scale(-1, -1));
        break;
    }
    t.commitTransform();
    const y = this.Ne,
      b = (g + r + p) * y;
    if (o > b) {
      const S = this.verticalAlignment;
      u = S.y * o - S.y * b + S.offsetY;
    }
    if (
      (TextBlock.hS && ((t.letterSpacing = this.letterSpacing), (t.wordSpacing = this.wordSpacing)),
      y === 1 && this.Xn !== null)
    ) {
      let S = this.xi;
      (S > d && (S = d), (u += g), this.RD(this.Xn, t, c, u, d, r, S, m, l, a, f));
    } else if (this.Ke !== null && this.Si !== null)
      for (let S = 0; S < y; S++) {
        let k = this.Ke[S];
        (k > d && (k = d), (u += g), this.RD(this.Si[S], t, c, u, d, r, k, m, l, a, f), (u += r + p));
      }
    switch (this.flip) {
      case 0:
        break;
      case 2:
        (t.scale(-1, 1), t.translate(-n, 0));
        break;
      case 1:
        (t.scale(1, -1), t.translate(0, -o));
        break;
      case 3:
        (t.scale(-1, -1), t.translate(-n, -o));
        break;
    }
  }
  RD(t, i, e, s, n, o, r, l, h, a, f) {
    let c = 0;
    if (l) {
      h === "left" ? (c = 0) : h === "right" ? (c = n - r) : h === "center" && (c = (n - r) / 2);
      const m = i.globalAlpha;
      ((i.globalAlpha = m / 2), i.fillRect(e + c, s + o / 4, r, o / 2), (i.globalAlpha = m));
      return;
    }
    h === "left" ? (c = 0) : h === "right" ? (c = n) : h === "center" && (c = n / 2);
    const u = TextBlock.rS !== null ? TextBlock.rS(this, o) : o * 0.75;
    i.fillText(t, e + c, s + u);
    let d = (o / 20) | 0;
    if ((d === 0 && (d = 1), h === "right" ? (c -= r) : h === "center" && (c -= r / 2), a)) {
      const m = TextBlock.lS !== null ? TextBlock.lS(this, o) : o * 0.8;
      (this.OD(e + c, s + m, e + c + r, s + m, d, i),
        i instanceof SVGContext && i.lastCreatedElement.classList.add("idl-td"));
    }
    if (f) {
      let m = (s + o - o / 2.2) | 0;
      (d % 2 !== 0 && (m += 0.5),
        this.OD(e + c, m, e + c + r, m, d, i),
        i instanceof SVGContext && i.lastCreatedElement.classList.add("idl-td"));
    }
  }
  OD(t, i, e, s, n, o) {
    (o.beginPath(), (o.lineWidth = n), o.moveTo(t, i), o.lineTo(e, s), o.stroke(), o.endPath());
  }
  Pc(t, i, e) {
    if (!super.Pc(t, i, e)) return false;
    if ((this.Cn(t, this.ee, true, false, this.naturalBounds, this.actualBounds), e)) {
      if (this.svg.getElementsByTagName("text").length === 0) return true;
      const n = this.svg.getElementsByClassName("idl-td");
      for (let o = 0; o < n.length; o++) t.setFillOrStrokeInPlace(n[o], false);
    } else this.g3(this.svg, this.Si ? this.Si[0] : this.text, t);
    return true;
  }
  g3(t, i, e) {
    ((t.innerHTML = i), e.setFillOrStrokeInPlace(t, true));
  }
  Td(t) {
    return this.lineCount > 1 || this.isUnderline || this.isStrikethrough ? true : super.Td(t);
  }
  RN(t, i) {
    if (t.nodeName !== "g") t.setAttributeNS(null, "filter", i);
    else {
      const e = t.getElementsByTagName("text");
      for (let s = 0; s < e.length; s++) e[s].setAttributeNS(null, "filter", i);
    }
  }
  m3() {
    ((this.zn = 0), (this.xi = 0), (this.yo = null), (this.Ke = null), (this.Si = null), (this.Xn = null));
  }
  Cd(t, i, e, s) {
    const n = this.Ne;
    ((this.Wl = t), this.cC(false));
    const o = this.Bn;
    (TextBlock.ps !== null &&
      (TextBlock.ED !== o && ((TextBlock.ps.font = o), (TextBlock.ED = o)),
      TextBlock.hS &&
        ((TextBlock.ps.letterSpacing = this.letterSpacing), (TextBlock.ps.wordSpacing = this.wordSpacing))),
      this.m3());
    let r = 0,
      l = 0;
    (isNaN(this.desiredSize.width)
      ? ((r = this.p3()), (r = Math.min(r, t / this.scale)))
      : (r = this.desiredSize.width),
      this.panel !== null && (r = Math.min(r, this.panel.maxSize.width)),
      (l = this.ID(r)),
      isNaN(this.desiredSize.height) ? (l = Math.min(l, i / this.scale)) : (l = this.desiredSize.height),
      this.y3(t, l),
      (this.wrap === 1 || isNaN(this.desiredSize.width)) && (r = isNaN(t) ? this.xi : Math.min(t, this.xi)),
      (r = Math.max(e, r)),
      (l = Math.max(s, l)),
      this.ji.$n(r, l),
      this.fo(0, 0, r, l),
      this.svg !== null && n !== this.Ne && this.is(true));
  }
  Th(t, i, e, s) {
    this.commonArrange(t, i, e, s);
  }
  Yn(t, i) {
    this.Xn === null
      ? ((this.Xn = t), (this.xi = i))
      : ((this.Si === null || this.Ke === null) &&
          ((this.Si = []), (this.Ke = []), this.Si.push(this.Xn), this.Ke.push(this.xi)),
        this.Si.push(t),
        this.Ke.push(i),
        this.Si.length > this.maxLines && (this.l |= 16777216));
  }
  fC(t, i, e) {
    const s = this.formatting === 0;
    s && (t = t.trim());
    let n = 0,
      o = 0,
      r = 0;
    const l = this.Bn,
      h = this.spacingAbove + this.spacingBelow,
      a = Math.max(0, this.iy() + h),
      f = this.overflow === 1 ? this.VD(l) : 0;
    if (this.Ne >= this.maxLines) {
      e !== void 0 && e.e(0, a);
      return;
    }
    let c = t;
    if (this.wrap === 0) {
      if (((this.zn = 1), (o = this.getStringWidth(t)), f === 0 || o <= i)) {
        ((this.xi = Math.max(this.xi, o)), this.Yn(t, this.xi), e !== void 0 && e.e(o, a));
        return;
      }
      let d = this.Zd(c);
      c = c.substring(d.length);
      let m = this.Zd(c);
      for (o = this.getStringWidth(d + m), r = 0; m.length > 0 && o <= i; ) {
        ((d += m), (c = c.substring(m.length)), (m = this.Zd(c)), (r = o));
        let g = d + m;
        (s && (g = g.trim()), (o = this.getStringWidth(g)));
      }
      for (s && (m = m.trim()), d += m, i = Math.max(1, i - f); this.getStringWidth(d) > i && d.length > 1; )
        d = d.substring(0, d.length - 1);
      (this.cC(true),
        (d += TextBlock.Zp),
        (r = this.getStringWidth(d)),
        (this.xi = r),
        this.Yn(d, r),
        e !== void 0 && e.e(r, a));
      return;
    }
    let u = 0;
    for (c.length === 0 && ((u = 1), this.Yn(c, 0)); c.length > 0; ) {
      let d = this.Zd(c);
      for (c = c.substring(d.length); this.getStringWidth(d) > i; ) {
        let p = 1;
        for (o = this.getStringWidth(d.substring(0, p)), r = 0; o <= i; )
          (p++, (r = o), (o = this.getStringWidth(d.substring(0, p))));
        let y = 0;
        (p === 1 ? ((y = o), (n = Math.max(n, o))) : ((y = r), (n = Math.max(n, r))), p--, p < 1 && (p = 1));
        const x = d.substring(0, p);
        if ((this.Yn(x, y), u++, (d = d.substring(p)), this.Ne + u > this.maxLines)) break;
      }
      let m = this.Zd(c);
      for (o = this.getStringWidth(d + m), r = 0; m.length > 0 && o <= i; ) {
        ((d += m), (c = c.substring(m.length)), (m = this.Zd(c)), (r = o));
        let p = d + m;
        (s && (p = p.trim()), (o = this.getStringWidth(p)));
      }
      if ((s && (d = d.trim()), d === "")) continue;
      d[d.length - 1] === "\xAD" && (d = d.substring(0, d.length - 1) + "\u2010");
      let g = 0;
      if (
        (m.length === 0
          ? ((g = o), (n = Math.max(n, o)))
          : ((r = this.getStringWidth(d)), (g = r), (n = Math.max(n, r))),
        this.Yn(d, g),
        u++,
        this.Ne + u > this.maxLines)
      )
        break;
    }
    ((this.zn = Math.min(this.maxLines - this.Ne, u)),
      (this.xi = Math.max(this.xi, n)),
      e !== void 0 && e.e(this.xi, a * this.zn));
  }
  y3(t, i) {
    if (this.xi === 0 || this.Ke === null || this.Si === null || this.overflow !== 1) return;
    const e = this.Bn,
      s = this.overflow === 1 ? this.VD(e) : 0,
      n = this.spacingAbove + this.spacingBelow,
      o = Math.max(0, this.iy() + n),
      r = Math.min(this.maxLines - 1, Math.max(Math.floor(i / o + 0.01) - 1, 0));
    if (r + 1 >= this.Si.length) return;
    this.cC(true);
    let l = this.Si[r];
    const h = Math.max(1, t - s);
    for (; this.getStringWidth(l) > h && l.length > 1; ) l = l.substring(0, l.length - 1);
    l += TextBlock.Zp;
    const a = this.getStringWidth(l);
    ((this.Si[r] = l),
      (this.Si = this.Si.slice(0, r + 1)),
      (this.Ke[r] = a),
      (this.Ke = this.Ke.slice(0, r + 1)),
      (this.zn = this.Si.length),
      (this.xi = Math.max(this.xi, a)),
      (this.Ne = this.zn),
      this.Ne === 1 && (this.Xn = this.Si[0]));
  }
  Zd(t) {
    if (this.wrap === 3) return t.substring(0, 1);
    let i = t.length,
      e = 0;
    const s = TextBlock.w3;
    for (; e < i && !s.test(t.charAt(e)); ) e++;
    for (this.formatting === 1 && (i = Math.min(i, e + 1)); e < i && s.test(t.charAt(e)); ) e++;
    return e >= t.length ? t : t.substring(0, e);
  }
  getStringWidth(t) {
    return TextBlock.ps === null ? t.length * 8 : TextBlock.ps.measureText(t).width;
  }
  iy() {
    if (this.yo !== null) return this.yo;
    const t = this.Bn;
    let i = 0;
    if (TextBlock.ps === null) return ((i = 16), (this.yo = i), i);
    if (TextBlock.uC[t] !== void 0 && TextBlock.BD < 5e3) i = TextBlock.uC[t];
    else {
      TextBlock.ps.letterSpacing = "0px";
      const e = TextBlock.ps.measureText("M");
      ((TextBlock.ps.letterSpacing = this.letterSpacing), (i = e.width * 1.3), (TextBlock.uC[t] = i), TextBlock.BD++);
    }
    return ((this.yo = i), i);
  }
  VD(t) {
    if (TextBlock.ps === null) return 6;
    let i = 0;
    return (
      TextBlock.oS[t] !== void 0 && TextBlock.aC < 5e3
        ? (i = TextBlock.oS[t])
        : ((i = TextBlock.ps.measureText(TextBlock.Zp).width), (TextBlock.oS[t] = i), TextBlock.aC++),
      i
    );
  }
  aS(t, i) {
    return t.indexOf(
      `
`,
      i,
    );
  }
  ID(t) {
    let i = this.mi
      .replace(
        /\r\n/g,
        `
`,
      )
      .replace(
        /\r/g,
        `
`,
      );
    const e = this.spacingAbove + this.spacingBelow,
      s = Math.max(0, this.iy() + e);
    if (i.length === 0) return ((this.xi = 0), (this.Ne = 1), s);
    if (!this.isMultiline) {
      const h = this.aS(i, 0);
      h >= 0 && (i = i.substring(0, h));
    }
    let n = 0;
    this.Ne = 0;
    let o = 0,
      r = -1,
      l = false;
    for (; !l; ) {
      if (((r = this.aS(i, o)), r === -1 && ((r = i.length), (l = true)), o <= r)) {
        const h = i.substring(o, r);
        if (this.wrap !== 0) {
          this.zn = 0;
          const a = Size.a();
          (this.fC(h, t, a), (n += a.height), Size.o(a), (this.Ne += this.zn));
        } else (this.fC(h, t), (n += s), this.Ne++);
        this.Ne === this.maxLines && (l = true);
      }
      o = r + 1;
    }
    return ((this.j0 = n), n);
  }
  p3() {
    let t = this.mi
      .replace(
        /\r\n/g,
        `
`,
      )
      .replace(
        /\r/g,
        `
`,
      );
    if (t.length === 0) return 8;
    if (this.isMultiline) {
      let i = 0,
        e = 0,
        s = false;
      for (; !s; ) {
        let n = this.aS(t, e);
        n === -1 && ((n = t.length), (s = true));
        let o = t.substring(e, n);
        (this.formatting === 0 && (o = o.trim()), (i = Math.max(i, this.getStringWidth(o))), (e = n + 1));
      }
      return i;
    } else {
      const i = this.aS(t, 0);
      return (i >= 0 && (t = t.substring(0, i)), this.getStringWidth(t));
    }
  }
  get textValidation() {
    return this.nt !== null ? this.nt.vl : null;
  }
  set textValidation(t) {
    const i = this.textValidation;
    i !== t && (t !== null && U.C(t, TextBlock, "textValidation"), (this.Bs().vl = t), this.t("textValidation", i, t));
  }
  get textEdited() {
    return this.nt !== null ? this.nt.ly : null;
  }
  set textEdited(t) {
    const i = this.textEdited;
    i !== t && (t !== null && U.C(t, TextBlock, "textEdited"), (this.Bs().ly = t), this.t("textEdited", i, t));
  }
  get spacingAbove() {
    return this.nt !== null ? this.nt.hy : 0;
  }
  set spacingAbove(t) {
    const i = this.spacingAbove;
    i !== t &&
      (Debug && U.i(t, "number", TextBlock, "spacingAbove"),
      (this.Bs().hy = t),
      this.g(),
      this.t("spacingAbove", i, t));
  }
  get spacingBelow() {
    return this.nt !== null ? this.nt.fy : 0;
  }
  set spacingBelow(t) {
    const i = this.spacingBelow;
    i !== t &&
      (Debug && U.i(t, "number", TextBlock, "spacingBelow"),
      (this.Bs().fy = t),
      this.g(),
      this.t("spacingBelow", i, t));
  }
  get letterSpacing() {
    return this.nt !== null ? this.nt.cy : "0px";
  }
  set letterSpacing(t) {
    const i = this.letterSpacing;
    i !== t &&
      ((TextBlock.hS = true),
      Debug && U.i(t, "string", TextBlock, "letterSpacing"),
      (this.Bs().cy = t),
      this.g(),
      this.t("letterSpacing", i, t));
  }
  get wordSpacing() {
    return this.nt !== null ? this.nt.uy : "0px";
  }
  set wordSpacing(t) {
    const i = this.wordSpacing;
    i !== t &&
      ((TextBlock.hS = true),
      Debug && U.i(t, "string", TextBlock, "wordSpacing"),
      (this.Bs().uy = t),
      this.g(),
      this.t("wordSpacing", i, t));
  }
  get formatting() {
    return this.nt !== null ? this.nt.gy : 0;
  }
  set formatting(t) {
    const i = this.formatting;
    i !== t && (U.W(t, TextFormat, "formatting"), (this.Bs().gy = t), this.g(), this.t("formatting", i, t));
  }
  get maxLines() {
    return this.nt !== null ? this.nt.my : 1 / 0;
  }
  set maxLines(t) {
    const i = this.maxLines;
    i !== t &&
      (Debug && U.i(t, "number", TextBlock, "maxLines"),
      (t = Math.floor(t)),
      t <= 0 && U.G(t, "> 0", TextBlock, "maxLines"),
      (this.Bs().my = t),
      this.g(),
      this.t("maxLines", i, t));
  }
  getMetrics() {
    return [this.xi, this.Wl, this.yo, this.zn, this.Ke, this.Si, this.Xn || ""];
  }
  d3(t) {
    t !== void 0 &&
      ((this.xi = t[0]),
      (this.Wl = t[1]),
      (this.yo = t[2]),
      (this.zn = t[3]),
      (this.Ke = t[4]),
      (this.Si = t[5]),
      (this.Xn = t[6]));
  }
  get metrics() {
    return {
      arrSize: this.Ke !== null ? this.Ke : [this.xi],
      arrText: this.Si !== null ? this.Si : [this.Xn],
      maxLineWidth: this.xi,
      fontHeight: this.yo,
    };
  }
  get choices() {
    return this.$d;
  }
  set choices(t) {
    const i = this.$d;
    i !== t &&
      (Debug && t !== null && !Array.isArray(t) && U.Li(t, "Array", TextBlock, "choices:value"),
      (this.$d = t),
      this.t("choices", i, t));
  }
  static w3 = new RegExp("[ \u200B\xAD]");
  static uC = new PropertyCollection();
  static BD = 0;
  static oS = new PropertyCollection();
  static aC = 0;
  static Zp = "...";
  static ED = "";
  static ps = null;
  static Np = false;
  static hS = false;
}
