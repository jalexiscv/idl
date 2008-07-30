class SVGContext {
  Lc;
  Dc;
  On;
  Bi;
  es;
  fillStyle;
  font;
  globalAlpha;
  lineCap;
  lineDashOffset;
  lineJoin;
  lineWidth;
  miterLimit;
  shadowBlur;
  shadowColor;
  shadowOffsetX;
  shadowOffsetY;
  strokeStyle;
  textAlign;
  imageSmoothingEnabled;
  clipInsteadOfFill;
  lastCreatedElement;
  Fc;
  Ic;
  surface;
  svg;
  UN;
  uD;
  vb;
  Qo;
  Rh;
  qa;
  currentElement;
  clipPathGroup;
  diagramGroup;
  lastDrawnPart;
  currentPath;
  outerGroup;
  pathAttributes;
  cl;
  Vr;
  filter;
  letterSpacing;
  wordSpacing;
  partClipRect;
  constructor(t, i) {
    if (
      ((this.surface = t),
      (this.svg = t.Nt),
      (this.Fc = []),
      (this.Ic = []),
      (this.fillStyle = "#000000"),
      (this.font = "10px sans-serif"),
      (this.globalAlpha = 1),
      (this.lineCap = "butt"),
      (this.lineDashOffset = 0),
      (this.lineJoin = "miter"),
      (this.lineWidth = 1),
      (this.miterLimit = 10),
      (this.shadowBlur = 0),
      (this.shadowColor = "rgba(0, 0, 0, 0)"),
      (this.shadowOffsetX = 0),
      (this.shadowOffsetY = 0),
      (this.cl = false),
      (this.strokeStyle = "#000000"),
      (this.textAlign = "start"),
      (this.clipInsteadOfFill = false),
      (this.Lc = 0),
      (this.Dc = 0),
      (this.On = 0),
      (this.lastCreatedElement = null),
      (this.currentElement = null),
      (this.Bi = []),
      (this.pathAttributes = {}),
      (this.vb = false),
      (this.Qo = null),
      (this.Rh = 0),
      (this.uD = {}),
      (this.Vr = !!i),
      (this.filter = ""),
      (this.partClipRect = null),
      (this.es = new STransform()),
      (this.letterSpacing = "0px"),
      (this.wordSpacing = "0px"),
      t.rl === null || t.rl === void 0)
    )
      return;
    ((this.clipPathGroup = this.newGroup2()),
      (this.diagramGroup = this.newGroup2("idl-diagram")),
      (this.lastDrawnPart = null),
      (this.currentPath = null));
    const e = GSet.Jw++,
      s = this.makeElement("clipPath", { id: "mainClip" + e }),
      n = { x: 0, y: 0, width: t.width, height: t.height };
    (s.appendChild(this.makeElement("rect", n)),
      (this.UN = s),
      this.svg.appendChild(this.clipPathGroup),
      this.clipPathGroup.appendChild(this.diagramGroup),
      this.svg.appendChild(s),
      this.clipPathGroup.setAttributeNS(null, "clip-path", "url(#mainClip" + e + ")"));
  }
  setDiagramPosScale(t, i, e, s, n, o) {
    this.diagramGroup === void 0
      ? this.newGroup(t, i, e, s, n, o)
      : this.diagramGroup.setAttribute(
          "transform",
          "matrix(" + t + ", " + i + ", " + e + ", " + s + ", " + n + ", " + o + ")",
        );
  }
  resetInnerSVG() {
    this.diagramGroup !== null && (this.diagramGroup.innerHTML = "");
  }
  arc(t, i, e, s, n, o, r, l) {
    const h = 2 * Math.PI,
      a = 1e-6,
      f = h - a,
      c = e * Math.cos(s),
      u = e * Math.sin(s),
      d = t + c,
      m = i + u,
      g = o ? 0 : 1;
    let p = o ? s - n : n - s;
    ((Math.abs(r - d) > a || Math.abs(l - m) > a) && this.Bi.push(["L", d, +m]),
      p < 0 && (p = (p % h) + h),
      p > f
        ? (this.Bi.push(["A", e, e, 0, 1, g, t - c, i - u]), this.Bi.push(["A", e, e, 0, 1, g, d, m]))
        : p > a && this.Bi.push(["A", e, e, 0, +(p >= Math.PI), g, t + e * Math.cos(n), i + e * Math.sin(n)]));
  }
  beginPath() {
    ((this.Bi = []), (this.pathAttributes = { stroke: "none", fill: "none" }));
  }
  endPath(t) {
    this.AE(this.Bi, this.es, t || 0);
  }
  bezierCurveTo(t, i, e, s, n, o) {
    this.Bi.push(["C", t, i, e, s, n, o]);
  }
  clearRect(t, i, e, s) {}
  clip() {
    this.pathAttributes.clipPath = true;
  }
  closePath() {
    this.Bi.push(["z"]);
  }
  createLinearGradient(t, i, e, s) {
    const n = new SGradient("linear");
    return ((n.x1 = t), (n.y1 = i), (n.x2 = e), (n.y2 = s), n);
  }
  createPattern(t, i) {
    let e = "";
    (t instanceof HTMLCanvasElement && (e = t.toDataURL()),
      t instanceof HTMLImageElement && (e = t.getAttribute("src")));
    const s = this.uD;
    if (s[e]) return "url(#" + s[e] + ")";
    const n = "PATTERN" + GSet.Jw++,
      o = { width: t.width, height: t.height, id: n, patternUnits: "userSpaceOnUse" },
      r = { x: 0, y: 0, width: t.width, height: t.height, href: e },
      l = this.makeElement("pattern", o);
    return (l.appendChild(this.makeElement(Diagram.img, r)), this.svg.appendChild(l), (s[e] = n), "url(#" + n + ")");
  }
  createRadialGradient(t, i, e, s, n, o) {
    const r = new SGradient("radial");
    return ((r.x1 = t), (r.y1 = i), (r.r1 = e), (r.x2 = s), (r.y2 = n), (r.r2 = o), r);
  }
  amendImageTransform(t, i, e, s, n, o, r, l) {
    const h = r / e,
      a = l / s;
    ((n !== 0 || o !== 0) && this.es.translate(n, o),
      (h !== 1 || a !== 1) && this.es.scale(h, a),
      (t !== 0 || i !== 0) && this.es.translate(-t, -i));
  }
  drawImage(t, i, e, s, n, o, r, l, h) {
    let a = "",
      f = t.width,
      c = t.height;
    (typeof t.toDataURL == "function"
      ? t.toDataURL()
      : ((a = t.getAttribute("src")), (f = t.naturalWidth), (c = t.naturalHeight)),
      s === void 0 && ((o = i), (r = e), (l = s = f), (h = n = c)),
      (s = s || 0),
      (n = n || 0),
      (o = o || 0),
      (r = r || 0),
      (l = l || 0),
      (h = h || 0),
      this.amendImageTransform(i, e, s, n, o, r, l, h));
    const u = { x: 0, y: 0, width: f || s, height: c || n, href: a };
    (!G.q(s, l) || !G.q(n, h)
      ? (u.preserveAspectRatio = "none")
      : a.toLowerCase().indexOf(".svg") === -1 &&
        a.toLowerCase().indexOf("data:image/svg") === -1 &&
        (u.preserveAspectRatio = "xMidYMid slice"),
      (i !== 0 || e !== 0 || s !== f || n !== c) &&
        ((s += i), (n += e), (u["clip-path"] = `path('M ${i},${e} L ${s} ${e} L ${s} ${n} L ${i} ${n} z')`)),
      this.processCommon(Diagram.img, u, this.es),
      this.Id(Diagram.img, u));
  }
  fill(t, i) {
    (t && (this.pathAttributes["fill-rule"] = "evenodd"), this.setFill(this.pathAttributes));
  }
  fillContext(t, i, e) {
    this.clipInsteadOfFill ? this.clip() : this.fill(i, e);
  }
  createOrUpdateClipGroup(t, i) {
    const e = this.newGroup(1, 0, 0, 1, -i.x, -i.y);
    (e.setAttributeNS(null, "class", "spotClip"), (t.Nh = e));
  }
  fillRect(t, i, e, s) {
    this.addRect("fill", [t, i, e, s], this.es);
  }
  fillBackground(t, i, e, s) {
    const n = { x: t, y: i, width: e, height: s };
    (this.processCommon("fill", n, this.es), this.setFill(n), this.svg.prepend(this.makeElement("rect", n)));
  }
  fillText(t, i, e) {
    this.addText("fill", [t, i, e], this.es);
  }
  lineTo(t, i) {
    this.Bi.push(["L", t, i]);
  }
  moveTo(t, i) {
    this.Bi.push(["M", t, i]);
  }
  quadraticCurveTo(t, i, e, s) {
    this.Bi.push(["Q", t, i, e, s]);
  }
  rect(t, i, e, s) {
    this.Bi.push(["M", t, i], ["L", t + e, i], ["L", t + e, i + s], ["L", t, i + s], ["z"]);
  }
  restore() {
    ((this.es = this.Fc.pop()), (this.Bi = this.Fc.pop()));
    const t = this.Fc.pop();
    ((this.fillStyle = t.fillStyle),
      (this.font = t.font),
      (this.globalAlpha = t.globalAlpha),
      (this.lineCap = t.lineCap),
      (this.lineDashOffset = t.lineDashOffset),
      (this.lineJoin = t.lineJoin),
      (this.lineWidth = t.lineWidth),
      (this.miterLimit = t.miterLimit),
      (this.shadowBlur = t.shadowBlur),
      (this.shadowColor = t.shadowColor),
      (this.shadowOffsetX = t.shadowOffsetX),
      (this.shadowOffsetY = t.shadowOffsetY),
      (this.strokeStyle = t.strokeStyle),
      (this.textAlign = t.textAlign),
      (this.partClipRect = t.partClipRect),
      (this.letterSpacing = t.letterSpacing),
      (this.wordSpacing = t.wordSpacing));
  }
  save() {
    const t = {
      fillStyle: this.fillStyle,
      font: this.font,
      globalAlpha: this.globalAlpha,
      lineCap: this.lineCap,
      lineDashOffset: this.lineDashOffset,
      lineJoin: this.lineJoin,
      lineWidth: this.lineWidth,
      miterLimit: this.miterLimit,
      shadowBlur: this.shadowBlur,
      shadowColor: this.shadowColor,
      shadowOffsetX: this.shadowOffsetX,
      shadowOffsetY: this.shadowOffsetY,
      strokeStyle: this.strokeStyle,
      textAlign: this.textAlign,
      partClipRect: this.partClipRect,
    };
    this.Fc.push(t);
    const i = [];
    for (let e = 0; e < this.Bi.length; e++) i.push(this.Bi[e]);
    (this.Fc.push(i), this.Fc.push(this.es.copy()));
  }
  setTransform(t, i, e, s, n, o) {
    (t === 1 && i === 0 && e === 0 && s === 1 && n === 0 && o === 0) || this.newGroup(t, i, e, s, n, o);
  }
  setCurrentTransform(t, i, e, s, n, o) {
    this.es.m = [t, i, e, s, n, o];
  }
  getCurrentTransform() {
    const t = this.es.m;
    return "matrix(" + t[0] + ", " + t[1] + ", " + t[2] + ", " + t[3] + ", " + t[4] + ", " + t[5] + ")";
  }
  scale(t, i) {
    this.es.scale(t, i);
  }
  translate(t, i) {
    this.es.translate(t, i);
  }
  transform(t, i, e, s, n, o) {}
  commitTransform() {}
  stroke() {
    this.setStroke(this.pathAttributes);
  }
  strokeContext() {
    this.clipInsteadOfFill || this.stroke();
  }
  strokeRect(t, i, e, s) {
    this.addRect("stroke", [t, i, e, s], this.es);
  }
  makeElement(t, i, e) {
    return this.surface.makeElement(t, i, e);
  }
  Id(t, i, e) {
    const s = this.makeElement(t, i, e);
    return (
      this.currentElement !== null ? this.currentElement.appendChild(s) : (this.currentElement = s),
      (this.lastCreatedElement = s),
      s
    );
  }
  processCommon(t, i, e) {
    if ((t === "fill" ? this.setFill(i) : t === "stroke" && this.setStroke(i), e !== null)) {
      const s = e.m;
      i.transform = "matrix(" + s[0] + ", " + s[1] + ", " + s[2] + ", " + s[3] + ", " + s[4] + ", " + s[5] + ")";
    }
  }
  setFill(t) {
    if (this.fillStyle instanceof SGradient) {
      t.fill = this.addGradient(this.fillStyle, "fill");
      return;
    }
    if (/^rgba\(/.test(this.fillStyle)) {
      const e = /^\s*rgba\s*\(([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\)\s*$/i.exec(this.fillStyle);
      ((t.fill = "rgb(" + e[1] + "," + e[2] + "," + e[3] + ")"), (t["fill-opacity"] = e[4]));
    } else t.fill = this.fillStyle;
  }
  setFillOrStrokeInPlace(t, i) {
    const e = i ? "fill" : "stroke";
    if (this.fillStyle instanceof SGradient) {
      t.setAttributeNS(null, "fill", this.addGradient(this.fillStyle, e));
      return;
    }
    if (/^rgba\(/.test(this.fillStyle)) {
      const n = /^\s*rgba\s*\(([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\)\s*$/i.exec(this.fillStyle);
      (t.setAttributeNS(null, e, "rgb(" + n[1] + "," + n[2] + "," + n[3] + ")"),
        t.setAttributeNS(null, e + "-opacity", n[4]));
    } else t.setAttributeNS(null, e, this.fillStyle);
  }
  setStroke(t) {
    if (this.strokeStyle instanceof SGradient) t.stroke = this.addGradient(this.strokeStyle, "stroke");
    else if (/^rgba\(/.test(this.strokeStyle)) {
      const e = /^\s*rgba\s*\(([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\s*,\s*([^,\s]+)\)\s*$/i.exec(this.strokeStyle);
      ((t.stroke = "rgb(" + e[1] + "," + e[2] + "," + e[3] + ")"), (t["stroke-opacity"] = e[4]));
    } else t.stroke = this.strokeStyle;
    ((t["stroke-width"] = this.lineWidth),
      (t["stroke-linecap"] = this.lineCap),
      (t["stroke-linejoin"] = this.lineJoin),
      (t["stroke-miterlimit"] = this.miterLimit),
      this.vb && ((t["stroke-dasharray"] = this.Qo.toString()), (t["stroke-dashoffset"] = this.Rh)));
  }
  addGradient(t, i) {
    let e = "";
    const s = this.currentPath !== null ? this.currentPath.getAttribute(i) : null;
    if (s !== null && s.indexOf("GRAD") !== -1) {
      e = s.split("#")[1].slice(0, -1);
      const l = this.svg.getElementById(e);
      l !== null && l.remove();
    } else e = "GRAD" + GSet.Jw++;
    let n;
    if (t.type === "linear") {
      const l = { x1: t.x1, x2: t.x2, y1: t.y1, y2: t.y2, id: e, gradientUnits: "userSpaceOnUse" };
      n = this.makeElement("linearGradient", l);
    } else if (t.type === "radial") {
      const l = { x1: t.x1, x2: t.x2, y1: t.y1, y2: t.y2, r1: t.r1, r2: t.r2, id: e };
      n = this.makeElement("radialGradient", l);
    } else U.n("invalid gradient");
    const o = t.colors.sort((l, h) => (l.offset > h.offset ? 1 : -1)),
      r = o.length;
    for (let l = 0; l < r; l++) {
      const h = o[l],
        a = h.color;
      n.appendChild(this.makeElement("stop", { offset: h.offset, "stop-color": a }));
    }
    return (this.svg.appendChild(n), "url(#" + e + ")");
  }
  addRect(t, i, e) {
    const s = { x: i[0], y: i[1], width: i[2], height: i[3] };
    (this.processCommon(t, s, e), this.Id("rect", s));
  }
  addText(t, i, e) {
    let s = this.textAlign;
    s === "left" ? (s = "start") : s === "right" ? (s = "end") : s === "center" && (s = "middle");
    const n = { x: i[1], y: i[2], style: "font: " + this.font, "text-anchor": s };
    ((n["letter-spacing"] = this.letterSpacing),
      (n["word-spacing"] = this.wordSpacing),
      this.processCommon(t, n, e),
      this.Id("text", n, i[0]));
  }
  AE(t, i, e) {
    const s = this.TE(t),
      n = this.pathAttributes;
    if (n.clipPath) {
      this.Ic.length > 1 && this.Ic[this.Ic.length - 2].setAttributeNS(null, "clip-path", 'path("' + s + '") view-box');
      return;
    }
    if (((n.d = s), this.processCommon("", n, i), this.currentPath !== null)) {
      const r = this.currentPath;
      if (r.nodeName !== "g") for (const l in n) l !== "transform" && r.setAttributeNS(null, l, n[l]);
      else {
        const l = r.getElementsByTagName("path");
        for (const h in n) h !== "transform" && l[e].setAttributeNS(null, h, n[h]);
      }
    } else this.Id("path", n);
  }
  TE(t) {
    const i = [];
    for (let e = 0; e < t.length; e++) {
      const s = t[e].slice(),
        n = [s.shift()];
      if (n[0] === "A")
        n.push(s.shift() + "," + s.shift(), s.shift(), s.shift() + "," + s.shift(), s.shift() + "," + s.shift());
      else for (; s.length; ) n.push(s.shift() + "," + s.shift());
      i.push(n.join(" "));
    }
    return i.join(" ");
  }
  newGroup(t, i, e, s, n, o) {
    const r = new STransform();
    r.m = [t, i, e, s, n, o];
    const l = {};
    this.processCommon("g", l, r);
    const h = this.Id("g", l);
    return (this.Ic.push(h), h);
  }
  newGroup2(t) {
    const i = {};
    t && (i.class = t);
    const e = this.Id("g", i);
    return (this.Ic.push(e), e);
  }
  endGroup() {
    return this.Ic.pop();
  }
  dummyGroup() {
    return (this.newGroup2(), this.endGroup());
  }
  shadowsSet(t, i, e) {
    ((this.Lc = t), (this.Dc = i), (this.On = e));
  }
  shadowsOff() {
    ((this.cl = false), (this.shadowOffsetX = 0), (this.shadowOffsetY = 0), (this.shadowBlur = 0));
  }
  shadowsOn() {
    ((this.cl = true), (this.shadowOffsetX = this.Lc), (this.shadowOffsetY = this.Dc), (this.shadowBlur = this.On));
  }
  enableDash(t, i) {
    ((this.vb = true), (this.Qo = t), (this.Rh = i));
  }
  disableDash() {
    this.vb = false;
  }
  clearContextCache(t) {}
  setImageSmoothingEnabled(t) {}
  rotate(t) {
    this.es.rotate(t * 57.2958, 0, 0);
  }
  getImageData(t, i, e, s) {
    return null;
  }
  measureText(t) {
    return null;
  }
  removeOldGradient(t, i, e) {
    const s = i.getAttribute(e);
    if (s === null) return;
    const n = s.split("#");
    if (n.length === 1) return;
    const o = this.svg.getElementById(n[1].slice(0, -1));
    if (o !== null) {
      const r = new RegExp(o.id, "g");
      this.svg.innerHTML.match(r).length === 1 && o.remove();
    }
  }
  removePartFromView(t) {
    t.svg !== null && t.svg.parentNode === this.diagramGroup && t.svg.remove();
  }
}
