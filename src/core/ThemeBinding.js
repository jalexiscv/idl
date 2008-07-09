class ThemeBinding extends Binding {
  hw;
  Hh;
  uf;
  constructor(t, i, e, s, n) {
    (super(t, i, s),
      e == null && (e = ""),
      n === void 0 && (n = null),
      (this.hw = e),
      (this.Hh = n),
      (this.uf = null),
      (this.l = 16));
  }
  cloneProtected(t) {
    (super.cloneProtected(t), (t.hw = this.hw), (t.Hh = this.Hh), (t.uf = this.uf));
  }
  Nd() {
    return true;
  }
  get themeSource() {
    return this.hw;
  }
  set themeSource(t) {
    (this.p && U.D(this),
      t !== null && U.i(t, "string", ThemeBinding, "themeSource"),
      (this.hw = t),
      (this.uf = null),
      t !== null ? (this.l = this.l | 16) : (this.l = this.l & -17));
  }
  get themeConverter() {
    return this.Hh;
  }
  set themeConverter(t) {
    (this.p && U.D(this), t !== null && U.C(t, ThemeBinding, "themeConverter"), (this.Hh = t));
  }
  ofData() {
    return (this.p && U.D(this), (this.l = this.l | 2), (this.$c = null), this);
  }
  vF(t, i, e, s) {
    if (!t || (this._C && (i = this.qh), !i && i !== 0)) return;
    let n = this.themeSource;
    this.uf !== null
      ? (n = this.uf)
      : typeof n == "string" && n.includes(".") && ((this.uf = n.split(".")), (n = this.uf));
    let o = t.findValue(i, n, s);
    if (
      (o === void 0 && U.ot(`Theme warning: ${i} could not be found when setting target property ${s}.`),
      t.readsCssVariables && typeof o == "string" && o.startsWith("var("))
    ) {
      const r = o.match(this.u4);
      r && (o = getComputedStyle(root.document.documentElement).getPropertyValue(r[1]));
    }
    return (U.lt(this.Hh) && (o = this.Hh(o, e)), o);
  }
  u4 = /var\((.*)\)/;
}
