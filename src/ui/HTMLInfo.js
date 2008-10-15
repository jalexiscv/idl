class HTMLInfo {
  Yx;
  Kx;
  gM;
  mM;
  constructor(t) {
    ((this.Yx = null), (this.Kx = null), (this.gM = null), (this.mM = null), t && Object.assign(this, t));
  }
  get mainElement() {
    return this.gM;
  }
  set mainElement(t) {
    (t !== null && U.s(t, HTMLElement, HTMLInfo, "mainElement"), (this.gM = t));
  }
  get show() {
    return this.Yx;
  }
  set show(t) {
    this.Yx !== t && (t !== null && U.C(t, HTMLInfo, "show"), (this.Yx = t));
  }
  get hide() {
    return this.Kx;
  }
  set hide(t) {
    this.Kx !== t && (t !== null && U.C(t, HTMLInfo, "hide"), (this.Kx = t));
  }
  get valueFunction() {
    return this.mM;
  }
  set valueFunction(t) {
    this.mM = t;
  }
}
