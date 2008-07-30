class CanvasSurfaceContext {
  V;
  Wb;
  jb;
  Jb;
  clipInsteadOfFill;
  Lc;
  Dc;
  On;
  qa;
  cl;
  Vr;
  constructor(t, i, e) {
    (t.getContext || U.n("Browser does not support HTML Canvas Element"),
      (this.V = t.getContext("2d", i)),
      (this.Wb = ""),
      (this.jb = ""),
      (this.Jb = ""),
      (this.clipInsteadOfFill = false),
      (this.Lc = 0),
      (this.Dc = 0),
      (this.On = 0),
      (this.cl = false),
      (this.qa = new Transform()),
      (this.Vr = !!e));
  }
  createOrUpdateClipGroup(t, i) {}
  setImageSmoothingEnabled(t) {
    this.V.imageSmoothingEnabled = t;
  }
  get fillStyle() {
    return this.V.fillStyle;
  }
  set fillStyle(t) {
    this.Jb !== t && ((this.V.fillStyle = t), (this.Jb = t));
  }
  get font() {
    return this.V.font;
  }
  set font(t) {
    this.Wb !== t && ((this.V.font = t), (this.Wb = t));
  }
  get globalAlpha() {
    return this.V.globalAlpha;
  }
  set globalAlpha(t) {
    this.V.globalAlpha = t;
  }
  get lineCap() {
    return this.V.lineCap;
  }
  set lineCap(t) {
    this.V.lineCap = t;
  }
  get lineDashOffset() {
    return this.V.lineDashOffset;
  }
  set lineDashOffset(t) {
    this.V.lineDashOffset = t;
  }
  get lineJoin() {
    return this.V.lineJoin;
  }
  set lineJoin(t) {
    this.V.lineJoin = t;
  }
  get lineWidth() {
    return this.V.lineWidth;
  }
  set lineWidth(t) {
    this.V.lineWidth = t;
  }
  get miterLimit() {
    return this.V.miterLimit;
  }
  set miterLimit(t) {
    this.V.miterLimit = t;
  }
  get shadowBlur() {
    return this.V.shadowBlur;
  }
  set shadowBlur(t) {
    this.V.shadowBlur = t;
  }
  get shadowColor() {
    return this.V.shadowColor;
  }
  set shadowColor(t) {
    this.V.shadowColor = t;
  }
  get shadowOffsetX() {
    return this.V.shadowOffsetX;
  }
  set shadowOffsetX(t) {
    this.V.shadowOffsetX = t;
  }
  get shadowOffsetY() {
    return this.V.shadowOffsetY;
  }
  set shadowOffsetY(t) {
    this.V.shadowOffsetY = t;
  }
  get strokeStyle() {
    return this.V.strokeStyle;
  }
  set strokeStyle(t) {
    this.jb !== t && ((this.V.strokeStyle = t), (this.jb = t));
  }
  get textAlign() {
    return this.V.textAlign;
  }
  set textAlign(t) {
    this.V.textAlign = t;
  }
  get imageSmoothingEnabled() {
    return this.V.imageSmoothingEnabled;
  }
  set imageSmoothingEnabled(t) {
    this.V.imageSmoothingEnabled = t;
  }
  get filter() {
    return this.V.filter;
  }
  set filter(t) {
    t === "" ? (this.V.filter = "none") : (this.V.filter = t);
  }
  get letterSpacing() {
    return this.V.letterSpacing;
  }
  set letterSpacing(t) {
    this.V.letterSpacing = t;
  }
  get wordSpacing() {
    return this.V.wordSpacing;
  }
  set wordSpacing(t) {
    this.V.wordSpacing = t;
  }
  arc(t, i, e, s, n, o, r, l) {
    this.V.arc(t, i, e, s, n, o);
  }
  beginPath() {
    this.V.beginPath();
  }
  endPath() {}
  bezierCurveTo(t, i, e, s, n, o) {
    this.V.bezierCurveTo(t, i, e, s, n, o);
  }
  clearRect(t, i, e, s) {
    (this.commitTransform(), this.V.clearRect(t, i, e, s));
  }
  clip(t) {
    t ? this.V.clip(t) : this.V.clip();
  }
  closePath() {
    this.V.closePath();
  }
  createLinearGradient(t, i, e, s) {
    return this.V.createLinearGradient(t, i, e, s);
  }
  createPattern(t, i) {
    return this.V.createPattern(t, i);
  }
  createRadialGradient(t, i, e, s, n, o) {
    return this.V.createRadialGradient(t, i, e, s, n, o);
  }
  drawImage(t, i, e, s, n, o, r, l, h) {
    s === void 0 ? this.V.drawImage(t, i, e) : this.V.drawImage(t, i, e, s, n, o, r, l, h);
  }
  fill(t, i) {
    i ? this.V.fill(i, t ? "evenodd" : "nonzero") : this.V.fill(t ? "evenodd" : "nonzero");
  }
  fillRect(t, i, e, s) {
    this.V.fillRect(t, i, e, s);
  }
  fillBackground(t, i, e, s) {
    this.V.fillRect(t, i, e, s);
  }
  fillText(t, i, e) {
    this.V.fillText(t, i, e);
  }
  getImageData(t, i, e, s) {
    return this.V.getImageData(t, i, e, s);
  }
  lineTo(t, i) {
    this.V.lineTo(t, i);
  }
  measureText(t) {
    return this.V.measureText(t);
  }
  moveTo(t, i) {
    this.V.moveTo(t, i);
  }
  quadraticCurveTo(t, i, e, s) {
    this.V.quadraticCurveTo(t, i, e, s);
  }
  rect(t, i, e, s) {
    this.V.rect(t, i, e, s);
  }
  restore() {
    this.V.restore();
  }
  save() {
    (this.commitTransform(), this.V.save());
  }
  rotate(t) {
    this.qa.Ns(t * 57.2958, 0, 0);
  }
  setTransform(t, i, e, s, n, o) {
    this.qa.setTo(t, i, e, s, n, o);
  }
  scale(t, i) {
    this.qa.rt(t, i);
  }
  translate(t, i) {
    this.qa.vs(t, i);
  }
  stroke(t) {
    t ? this.V.stroke(t) : this.V.stroke();
  }
  transform(t, i, e, s, n, o) {
    if (t === 1 && i === 0 && e === 0 && s === 1 && n === 0 && o === 0) return;
    const r = this.qa,
      l = r.m11 * t + r.m21 * i,
      h = r.m12 * t + r.m22 * i,
      a = r.m11 * e + r.m21 * s,
      f = r.m12 * e + r.m22 * s;
    ((r.dx = r.m11 * n + r.m21 * o + r.dx),
      (r.dy = r.m12 * n + r.m22 * o + r.dy),
      (r.m11 = l),
      (r.m12 = h),
      (r.m21 = a),
      (r.m22 = f));
  }
  commitTransform() {
    const t = this.qa;
    this.V.setTransform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy);
  }
  fillContext(t, i, e) {
    this.radialFill(t, i, e) || this.fillOrClip(i, e);
  }
  radialFill(t, i, e) {
    if (!(t instanceof Brush) || t.type !== 3) return false;
    const s = t.Nc,
      n = t.Ub;
    return (
      n > s
        ? (this.scale(s / n, 1), this.translate((n - s) / 2, 0))
        : s > n && (this.scale(1, n / s), this.translate(0, (s - n) / 2)),
      this.fillOrClip(i, e),
      n > s
        ? (this.translate(-(n - s) / 2, 0), this.scale(1 / (s / n), 1))
        : s > n && (this.translate(0, -(s - n) / 2), this.scale(1, 1 / (n / s))),
      true
    );
  }
  strokeContext() {
    this.clipInsteadOfFill || this.stroke();
  }
  fillOrClip(t, i) {
    this.clipInsteadOfFill ? this.clip(i) : this.fill(t, i);
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
    const e = this.V;
    e.setLineDash !== void 0 && (e.setLineDash(t), (e.lineDashOffset = i));
  }
  disableDash() {
    const t = this.V;
    t.setLineDash !== void 0 && (t.setLineDash(CanvasSurfaceContext.EmptyArray), (t.lineDashOffset = 0));
  }
  clearContextCache(t) {
    (t && (this.Wb = ""), (this.jb = ""), (this.Jb = ""));
  }
  removePartFromView(t) {}
  static EmptyArray = Object.freeze([]);
}
var BrushType = ((w) => (
    (w[(w.Solid = 1)] = "Solid"),
    (w[(w.Linear = 2)] = "Linear"),
    (w[(w.Radial = 3)] = "Radial"),
    (w[(w.Pattern = 4)] = "Pattern"),
    w
  ))(BrushType || {}),
  ColorSpace = ((w) => ((w[(w.Lab = 1)] = "Lab"), (w[(w.HSL = 2)] = "HSL"), (w[(w.Oklch = 3)] = "Oklch"), w))(
    ColorSpace || {},
  );
