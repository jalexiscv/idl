class SVGSurface {
  Nt;
  ni;
  rl;
  wd;
  KN;
  constructor(t, i, e) {
    const s = i === void 0 ? root.document : i;
    ((this.rl = s), (this.KN = "http://www.w3.org/2000/svg"));
    const n = "http://www.w3.org/2000/xmlns/";
    (s !== void 0 &&
      ((this.Nt = this.makeElement("svg", { width: "1px", height: "1px", viewBox: "0 0 1 1" })),
      (this.style.display = "block"),
      (this.style.letterSpacing = "normal"),
      (this.style.wordSpacing = "normal"),
      e || (this.style.position = "absolute"),
      this.Nt.setAttributeNS(n, "xmlns", this.KN),
      this.Nt.setAttributeNS(n, "xmlns:xlink", "http://www.w3.org/1999/xlink")),
      (this.wd = null),
      (this.ni = new SVGContext(this, e)));
  }
  resize(t, i, e, s) {
    return this.width !== t || this.height !== i
      ? ((this.width = t),
        (this.height = i),
        (this.style.width = e + "px"),
        (this.style.height = s + "px"),
        this.Nt.setAttributeNS(null, "width", e + "px"),
        this.Nt.setAttributeNS(null, "height", s + "px"),
        this.Nt.setAttributeNS(null, "viewBox", "0 0 " + e + " " + s),
        this.ni.UN.firstElementChild.setAttributeNS(null, "width", e + "px"),
        this.ni.UN.firstElementChild.setAttributeNS(null, "height", s + "px"),
        true)
      : false;
  }
  makeElement(t, i, e) {
    const s = this.rl.createElementNS(this.KN, t);
    if (U.it(i)) for (const n in i) s.setAttributeNS(n === "href" ? "http://www.w3.org/1999/xlink" : "", n, i[n]);
    return (e !== void 0 && (s.textContent = e), s);
  }
  getBoundingClientRect() {
    return this.Nt.getBoundingClientRect();
  }
  focus() {
    this.Nt.focus();
  }
  get width() {
    return parseInt(this.Nt.getAttribute("width") || "1");
  }
  set width(t) {
    this.Nt.setAttribute("width", t + "px");
  }
  get height() {
    return parseInt(this.Nt.getAttribute("height") || "1");
  }
  set height(t) {
    this.Nt.setAttribute("height", t + "px");
  }
  dispose() {
    this.rl = null;
  }
  get style() {
    return this.Nt.style;
  }
}
