class ThemeManager {
  ds = new Set();
  Nu = new GMap();
  Ak = "light";
  Tk = "light";
  Lk = false;
  DA = true;
  sm = "light";
  WI = (t) => {
    const i = t.matches ? "dark" : "light";
    i !== this.sm && ((this.sm = i), this.Tk === "system" && this.updateDiagrams());
  };
  constructor(t) {
    (t && Object.assign(this, t),
      t?.themeMap ||
        (this.Nu.set("light", {
          colors: { ...Themes.Light.colors },
          fonts: { ...Themes.Light.fonts },
          numbers: { ...Themes.Light.numbers },
          margins: { ...Themes.Light.margins },
          arrowheads: { ...Themes.Light.arrowheads },
        }),
        this.Nu.set("dark", {
          colors: { ...Themes.Dark.colors },
          fonts: { ...Themes.Dark.fonts },
          numbers: { ...Themes.Dark.numbers },
          margins: { ...Themes.Dark.margins },
          arrowheads: { ...Themes.Dark.arrowheads },
        })),
      root.matchMedia && (this.sm = root.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  }
  get themeMap() {
    return this.Nu;
  }
  set themeMap(t) {
    this.Nu !== t && ((this.Nu = t), this.updateDiagrams());
  }
  get defaultTheme() {
    return this.Ak;
  }
  set defaultTheme(t) {
    this.Ak !== t && (U.i(t, "string", ThemeManager, "defaultTheme"), (this.Ak = t), this.updateDiagrams());
  }
  get currentTheme() {
    return this.Tk;
  }
  set currentTheme(t) {
    this.Tk !== t && (U.i(t, "string", ThemeManager, "currentTheme"), (this.Tk = t), this.updateDiagrams());
  }
  get changesDivBackground() {
    return this.Lk;
  }
  set changesDivBackground(t) {
    if (this.Lk !== t && ((this.Lk = t), t))
      for (const e of this.ds) (e.setDivBackground(this.findValue("div", "", "fill")), e.F("ThemeChanged", this));
  }
  get readsCssVariables() {
    return this.DA;
  }
  set readsCssVariables(t) {
    this.DA !== t && ((this.DA = t), this.updateDiagrams());
  }
  get preferredColorScheme() {
    return this.sm;
  }
  addDiagram(t) {
    return (this.ds.add(t), this.FA(t), this);
  }
  removeDiagram(t) {
    return (this.ds.delete(t), this.FA(t), this);
  }
  aO() {
    this.ds.size === 0 &&
      root.matchMedia &&
      root.matchMedia("(prefers-color-scheme: dark)")?.addEventListener("change", this.WI);
  }
  fO() {
    this.ds.size === 0 &&
      root.matchMedia &&
      root.matchMedia("(prefers-color-scheme: dark)")?.removeEventListener("change", this.WI);
  }
  set(t, i) {
    (t === "" && (t = this.Ak), t === "system" && (t = this.sm));
    let e = this.Nu.get(t);
    return (e ? (e = this.jI(e, i)) : (e = i), this.Nu.set(t, e), this.updateDiagrams(), this);
  }
  findValue(t, i, e) {
    return (
      this.getValue(this.findTheme(this.currentTheme), t, i, e) ||
      this.getValue(this.findTheme(this.defaultTheme), t, i, e)
    );
  }
  getValue(t, i, e, s) {
    if (!t) return;
    e == null && (e = "");
    let n = t;
    const o = (l) => {
        if (n === void 0 || l === "") return;
        if (typeof l == "number" || !(Array.isArray(l) || l.includes("."))) return n[l];
        const h = Array.isArray(l) ? l : l.split(".");
        for (let a = 0; a < h.length; a++) {
          const f = h[a];
          if (f !== "" && ((n = n[f]), n === void 0)) return;
        }
        return n;
      },
      r = () => {
        if (!(e !== "" && ((n = o(e)), n === void 0)))
          return (Array.isArray(n) && typeof i == "number" ? (n = n[i % n.length]) : (n = o(i)), n);
      };
    if (((n = r()), n === void 0 && typeof s == "string" && s.length > 0)) {
      let l = t.targetPropertyMap?.get(s);
      if ((l ? (n = t[l]) : ((l = ThemeManager.LV.get(s)), (n = l ? t[l] : t.colors)), (n = r()), n !== void 0))
        return n;
    }
    return n;
  }
  findTheme(t) {
    return this.themeMap.get(t === "system" ? this.sm : t);
  }
  updateDiagrams() {
    for (const t of this.ds) this.FA(t);
  }
  FA(t) {
    const i = t.skipsUndoManager;
    ((t.skipsUndoManager = true),
      t.updateAllThemeBindings(),
      this.Lk && t.setDivBackground(this.findValue("div", "", "fill")),
      (t.skipsUndoManager = i),
      t.F("ThemeChanged", this));
  }
  jI(t, i) {
    for (const e in i)
      if (U.Ww(i, e))
        try {
          i[e]?.constructor === Object ? (t[e] = this.jI(t[e] ?? {}, i[e])) : (t[e] = i[e]);
        } catch {
          delete t[e];
        }
    return t;
  }
  static LV = new Map([
    ["background", "colors"],
    ["defaultColumnSeparatorStroke", "colors"],
    ["defaultRowSeparatorStroke", "colors"],
    ["shadowColor", "colors"],
    ["fill", "colors"],
    ["stroke", "colors"],
    ["font", "fonts"],
    ["angle", "numbers"],
    ["fromEndSegmentLength", "numbers"],
    ["fromShortLength", "numbers"],
    ["height", "numbers"],
    ["opacity", "numbers"],
    ["scale", "numbers"],
    ["toEndSegmentLength", "numbers"],
    ["toShortLength", "numbers"],
    ["width", "numbers"],
    ["defaultColumnSeparatorStrokeWidth", "numbers"],
    ["defaultRowSeparatorStrokeWidth", "numbers"],
    ["shadowBlur", "numbers"],
    ["corner", "numbers"],
    ["curviness", "numbers"],
    ["smoothness", "numbers"],
    ["parameter1", "numbers"],
    ["parameter2", "numbers"],
    ["strokeWidth", "numbers"],
    ["strokeDashOffset", "numbers"],
    ["maxLines", "numbers"],
    ["spacingAbove", "numbers"],
    ["spacingBelow", "numbers"],
    ["position", "points"],
    ["shadowOffset", "points"],
    ["desiredSize", "sizes"],
    ["maxSize", "sizes"],
    ["minSize", "sizes"],
    ["margin", "margins"],
    ["defaultSeparatorPadding", "margins"],
    ["padding", "margins"],
    ["alignment", "spots"],
    ["alignmentFocus", "spots"],
    ["fromSpot", "spots"],
    ["toSpot", "spots"],
    ["defaultAlignment", "spots"],
    ["spot1", "spots"],
    ["spot2", "spots"],
    ["verticalAlignment", "spots"],
    ["imageAlignment", "spots"],
    ["fromArrow", "arrowheads"],
    ["toArrow", "arrowheads"],
  ]);
}
