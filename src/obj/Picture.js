class Picture extends GraphObject {
  pl;
  ln;
  yl;
  Kc;
  ws;
  wl;
  Uc;
  wo;
  Gc;
  qc;
  Kb;
  constructor(t, i) {
    (super(),
      (this.l |= 2097152),
      (this.pl = null),
      (this.ln = ""),
      (this.yl = Rect.ZI),
      (this.Kc = 2),
      (this.ws = null),
      (this.wl = null),
      (this.Uc = Spot.Center),
      (this.wo = 0),
      (this.Gc = null),
      (this.qc = null),
      (this.Kb = null),
      typeof t == "string" ? (this.source = t) : t && Object.assign(this, t),
      i && Object.assign(this, i));
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.ln = this.ln),
      (t.element = this.pl),
      (t.yl = this.yl.T()),
      (t.Kc = this.Kc),
      (t.wo = this.wo),
      (t.ws = this.ws),
      (t.wl = this.wl),
      (t.Uc = this.Uc.T()),
      (t.qc = this.qc));
  }
  gi(t) {
    t in ImageStretch ? (this.imageStretch = t) : super.gi(t);
  }
  toString() {
    return "Picture(" + this.source + ")#" + GSet.Ps(this);
  }
  get Hc() {
    return (this.l & 1048576) !== 0;
  }
  set Hc(t) {
    this.Hc !== t && (this.l = this.l ^ 1048576);
  }
  get Qa() {
    return (this.l & 2097152) !== 0;
  }
  set Qa(t) {
    this.Qa !== t && (this.l = this.l ^ 2097152);
  }
  get Dn() {
    return (this.l & 4194304) !== 0;
  }
  set Dn(t) {
    this.Dn !== t && (this.l = this.l ^ 4194304);
  }
  static clearCache(t) {
    (t === void 0 && (t = ""),
      U.i(t, "string", Picture, "clearCache:url"),
      t !== ""
        ? Picture.yy[t] && (delete Picture.yy[t], Picture.fS--)
        : ((Picture.yy = new PropertyCollection()), (Picture.fS = 0)));
  }
  static TL(t, i) {
    i.zD ||
      ((i.cS = (e) => {
        (Picture.x3(i, e), t.desiredSize.isReal() || (t.ke(false), t.g()));
      }),
      (i.uS = (e) => Picture.b3(i, e)),
      i.addEventListener("load", i.cS),
      i.addEventListener("error", i.uS),
      (i.zD = true));
  }
  static zO(t) {
    (t.cS && t.removeEventListener("load", t.cS),
      t.uS && t.removeEventListener("error", t.uS),
      delete t.cS,
      delete t.uS,
      (t.zD = false));
  }
  get element() {
    return this.pl;
  }
  set element(t) {
    const i = this.pl;
    if ((this.is(true), i !== t)) {
      const e = Diagram.isUsingDOM();
      let s = false;
      e &&
        ((this.Hc = t instanceof HTMLCanvasElement),
        (s = t instanceof HTMLImageElement),
        t !== null &&
          !(s || t instanceof HTMLVideoElement || this.Hc) &&
          U.n("Picture.element must be an instance of Image, Canvas, or Video, not: " + t));
      const n = this.diagram;
      (n !== null && n.X2(this),
        (this.pl = t),
        t !== null && s && t.ds === void 0 && (t.ds = new GSet()),
        n !== null && s && n.z2(this),
        this.t("element", i, t),
        this.L());
    }
  }
  VO() {
    const t = this.pl;
    if (t === null) return;
    const i = this.desiredSize.isReal();
    ((this.Hc || t.complete === true) &&
      (t.F0 &&
        (t.wy instanceof Event && this.ws !== null
          ? this.ws(this, t.wy)
          : t.Dn === true && !t.wy && this.wl !== null && t.dC && this.wl(this, t.dC)),
      (t.Dn = true)),
      t.Dn && i && this.diagram !== null && this.diagram.fd.add(this));
  }
  S3() {
    if (this.pl === null) {
      this.Gc = false;
      return;
    }
    const t = new CanvasSurface(null).ni;
    try {
      t.drawImage(this.pl, 0, 0);
    } catch (i) {
      (Debug && this.Qa && U.ot(i.toString()), (this.Qa = false));
    }
    try {
      (t.getImageData(0, 0, 1, 1).data[3] && (this.Gc = false), (this.Gc = false));
    } catch {
      this.Gc = true;
    }
  }
  get source() {
    return this.ln;
  }
  set source(t) {
    const i = this.ln;
    if (i !== t) {
      (this.is(true), U.i(t, "string", Picture, "source"), (this.ln = t));
      let e = Picture.yy,
        s = null;
      if (e[t] !== void 0) s = e[t];
      else if (t !== "") {
        (Picture.fS > 30 && (Picture.clearCache(), (e = Picture.yy)),
          (s = U.Le("img")),
          (s.F0 = true),
          Picture.TL(this, s));
        const n = this.qc;
        (n !== null && (s.crossOrigin = n(this)), (s.src = t), (e[t] = s), Picture.fS++);
      }
      ((this.element = s),
        s !== null && s.__goCache === void 0 && (s.__goCache = new PictureCacheArray()),
        this.g(),
        this.L(),
        this.t("source", i, t));
    }
  }
  static x3(t, i) {
    ((t.Dn = true), (t.wy = false));
    let e;
    const s = t.ds.copy();
    if (s == null) return;
    const n = s.iterator;
    for (; n.next(); ) {
      const o = n.value;
      o.L();
      const r = t.getAttribute("src") || "",
        l = o.dh.get(r);
      if (l === null) continue;
      const h = l.length;
      for (let a = 0; a < h; a++)
        ((e = l[a]),
          e.desiredSize.isReal() || o.fd.add(e),
          e.is(true),
          o.requestUpdate(),
          t.F0 && (t.dC === void 0 && (t.dC = i), e.wl !== null && e.wl(e, i)));
    }
    t.ds.clear();
  }
  static b3(t, i) {
    t.wy = i;
    let e;
    const s = t.ds.copy();
    if (s == null) return;
    const n = s.iterator;
    for (; n.next(); ) {
      const o = n.value,
        r = t.getAttribute("src") || "",
        l = o.dh.get(r);
      if (l === null) continue;
      const h = l.length,
        a = U.ht();
      for (let f = 0; f < h; f++) a.push(l[f]);
      if (t.F0) for (let f = 0; f < h; f++) ((e = a[f]), e.ws !== null && e.ws(e, i));
      U.et(a);
    }
    t.ds.clear();
  }
  reloadSource() {
    if (this.source === "") return;
    Picture.clearCache(this.source);
    const t = this.source;
    ((this.source = ""), (this.source = t));
  }
  redraw() {
    (this.L(), this.is(true));
  }
  get sourceCrossOrigin() {
    return this.qc;
  }
  set sourceCrossOrigin(t) {
    if (this.qc !== t) {
      (t !== null && U.C(t, Picture, "sourceCrossOrigin"), (this.qc = t));
      const e = this.element;
      if (e !== null) {
        const s = e.getAttribute("src");
        e.crossOrigin !== void 0 &&
          (t === null && typeof s == "string" ? (e.crossOrigin = null) : t !== null && (e.crossOrigin = t(this)),
          s && (e.src = s));
      }
    }
  }
  get sourceRect() {
    return this.yl;
  }
  set sourceRect(t) {
    const i = this.yl;
    i.equals(t) ||
      (U.s(t, Rect, Picture, "sourceRect"), (t = t.T()), (this.yl = t), this.g(), this.t("sourceRect", i, t));
  }
  get imageStretch() {
    return this.Kc;
  }
  set imageStretch(t) {
    const i = this.Kc;
    i !== t && (U.W(t, ImageStretch, "ImageStretch"), (this.Kc = t), this.L(), this.t("imageStretch", i, t));
  }
  get flip() {
    return this.wo;
  }
  set flip(t) {
    const i = this.wo;
    i !== t && (U.W(t, Flip, "Flip"), (this.wo = t), this.L(), this.t("flip", i, t));
  }
  get imageAlignment() {
    return this.Uc;
  }
  set imageAlignment(t) {
    U.s(t, Spot, Picture, "imageAlignment");
    const i = this.Uc;
    i.equals(t) || ((t = t.T()), (this.Uc = t), this.L(), this.t("imageAlignment", i, t));
  }
  get errorFunction() {
    return this.ws;
  }
  set errorFunction(t) {
    const i = this.ws;
    i !== t && (t !== null && U.C(t, Picture, "errorFunction"), (this.ws = t), this.t("errorFunction", i, t));
  }
  get successFunction() {
    return this.wl;
  }
  set successFunction(t) {
    const i = this.wl;
    i !== t && (t !== null && U.C(t, Picture, "successFunction"), (this.wl = t), this.t("successFunction", i, t));
  }
  Dh(t, i) {
    const e = this.pl;
    if (e === null) return;
    const s = e.getAttribute("src"),
      n = Diagram.isUsingDOM();
    if (
      (n && e instanceof HTMLImageElement && (s === null || s === "")) ||
      (e.wy instanceof Event && t instanceof CanvasSurfaceContext)
    )
      return;
    const o = t instanceof SVGContext,
      r = this.naturalBounds;
    let l = 0,
      h = 0;
    const a = this.Hc;
    let f = a ? +e.width : e.naturalWidth,
      c = a ? +e.height : e.naturalHeight;
    if ((f === void 0 && e.videoWidth && (f = e.videoWidth), c === void 0 && e.videoHeight && (c = e.videoHeight), n)) {
      if (f === 0 || c === 0) return;
    } else ((f = this.width), (c = this.height));
    const u = f,
      d = c;
    this.sourceRect.isReal() && ((l = this.yl.x), (h = this.yl.y), (f = this.yl.width), (c = this.yl.height));
    let m = f,
      g = c;
    const p = this.Kc,
      y = this.Uc;
    switch (p) {
      case 0:
        if (this.sourceRect.isReal()) break;
        (m >= r.width && (l = l + y.offsetX + (m * y.x - r.width * y.x)),
          g >= r.height && (h = h + y.offsetY + (g * y.y - r.height * y.y)),
          (f = Math.min(r.width, m)),
          (c = Math.min(r.height, g)));
        break;
      case 2:
        ((m = r.width), (g = r.height));
        break;
      case 6:
      case 7:
        let D = 0;
        p === 6
          ? ((D = Math.min(r.height / g, r.width / m)), (m *= D), (g *= D))
          : p === 7 &&
            ((D = Math.max(r.height / g, r.width / m)),
            (m *= D),
            (g *= D),
            m >= r.width && (l = (l + y.offsetX + (m * y.x - r.width * y.x) / m) * f),
            g >= r.height && (h = (h + y.offsetY + (g * y.y - r.height * y.y) / g) * c),
            (f *= 1 / (m / r.width)),
            (c *= 1 / (g / r.height)),
            (m = r.width),
            (g = r.height));
        break;
    }
    const x = f * c,
      b = this.getDocumentScale() * i.scale,
      S = m * b,
      k = g * b,
      P = S * k,
      A = x / P,
      C = e.__goCache;
    let M = null;
    const N = Picture.k3;
    if (!o) {
      if (e.Dn && C !== void 0 && u < 8e3 && d < 8e3 && P > 4 && A > N * N) {
        C.qt === null && (C.XD(4, u, d, e), C.XD(16, u, d, e));
        const D = C.qt,
          F = D.length;
        for (let R = 0; R < F && D[R].Qd * D[R].Qd < A; R++) M = D[R];
      }
      if (!i.ad && (this.Gc === null && this.S3(), this.Gc)) return;
    }
    const T = m < r.width ? y.offsetX + (r.width * y.x - m * y.x) : 0,
      L = g < r.height ? y.offsetY + (r.height * y.y - g * y.y) : 0;
    switch (this.flip) {
      case 0:
        break;
      case 2:
        (t.translate(Math.min(r.width, m), 0), t.scale(-1, 1));
        break;
      case 1:
        (t.translate(0, Math.min(r.height, g)), t.scale(1, -1));
        break;
      case 3:
        (t.translate(Math.min(r.width, m), Math.min(r.height, g)), t.scale(-1, -1));
        break;
    }
    if (
      (t.commitTransform(),
      i.getRenderingHint("pictureRatioOptimization") && !i.Sa && C !== void 0 && M !== null && M.Qd !== 1)
    ) {
      t.save();
      const D = M.Qd;
      try {
        (t.drawImage(
          M.ln,
          l / D,
          h / D,
          Math.min(M.ln.width, f / D),
          Math.min(M.ln.height, c / D),
          T,
          L,
          Math.min(r.width, m),
          Math.min(r.height, g),
        ),
          t instanceof SVGContext &&
            (this.Kb = [
              l / D,
              h / D,
              Math.min(M.ln.width, f / D),
              Math.min(M.ln.height, c / D),
              T,
              L,
              Math.min(r.width, m),
              Math.min(r.height, g),
            ]));
      } catch (F) {
        (Debug && this.Qa && U.ot(F.toString()), (this.Qa = false));
      }
      t.restore();
    } else
      try {
        (t.drawImage(e, l, h, f, c, T, L, Math.min(r.width, m), Math.min(r.height, g)),
          t instanceof SVGContext && (this.Kb = [l, h, f, c, T, L, Math.min(r.width, m), Math.min(r.height, g)]));
      } catch (D) {
        (Debug && this.Qa && U.ot(D.toString()), (this.Qa = false));
      }
    switch (this.flip) {
      case 0:
        break;
      case 2:
        (t.scale(-1, 1), t.translate(-Math.min(r.width, m), 0));
        break;
      case 1:
        (t.scale(1, -1), t.translate(0, -Math.min(r.height, g)));
        break;
      case 3:
        (t.scale(-1, -1), t.translate(-Math.min(r.width, m), -Math.min(r.height, g)));
        break;
    }
  }
  get naturalBounds() {
    return this.ji;
  }
  Cd(t, i, e, s) {
    const n = this.desiredSize,
      o = this.sn(true),
      r = this.pl,
      l = this.Hc;
    let h = 0,
      a = 0;
    ((l || (!this.Dn && r && r.complete)) && (this.Dn = true),
      r === null
        ? (isFinite(n.width) || (t = e), isFinite(n.height) || (i = s))
        : ((h = l ? +r.width : r.naturalWidth), (a = l ? +r.height : r.naturalHeight)),
      !isFinite(n.width) && o !== 2 && o !== 5
        ? r !== null && this.Dn !== false && (this.sourceRect.isReal() ? (t = this.sourceRect.width) : (t = h))
        : (isFinite(t) || (this.sourceRect.isReal() ? (t = this.sourceRect.width) : r !== null && (t = h)), (e = 0)),
      !isFinite(n.height) && o !== 2 && o !== 4
        ? r !== null && this.Dn !== false && (this.sourceRect.isReal() ? (i = this.sourceRect.height) : (i = a))
        : (isFinite(i) || (this.sourceRect.isReal() ? (i = this.sourceRect.height) : r !== null && (i = a)), (s = 0)),
      isFinite(n.width) && (t = n.width),
      isFinite(n.height) && (i = n.height));
    const f = this.maxSize,
      c = this.minSize;
    ((e = Math.max(e || 0, c.width)),
      (s = Math.max(s || 0, c.height)),
      (t = Math.min(f.width, t)),
      (i = Math.min(f.height, i)),
      (t = Math.max(e, t)),
      (i = Math.max(s, i)),
      r !== null && !r.complete && (isFinite(t) || (t = 0), isFinite(i) || (i = 0)),
      this.ji.$n(t, i),
      this.fo(0, 0, t, i));
  }
  Th(t, i, e, s) {
    this.commonArrange(t, i, e, s);
  }
  static yy = new PropertyCollection();
  static fS = 0;
  static k3 = 4;
}
