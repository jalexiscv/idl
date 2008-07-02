class Binding {
  l;
  QC;
  cf;
  $c;
  qh;
  Zc;
  Qc;
  _c;
  OS;
  Re;
  Kd;
  Vc;
  constructor(t, i, e, s) {
    GSet._i(this);
    if (t === void 0) t = "";
    else U.i(t, "string", Binding, "constructor:targetprop");
    if (i === void 0) i = t;
    else U.i(i, "string", Binding, "constructor:sourceprop");
    if (e === void 0) e = null;
    else if (e !== null) U.C(e, Binding, "constructor:conv");
    this.QC = -1;
    this.Re = null;
    this.cf = t;
    this.Kd = 0;
    this.Vc = 0;
    this.$c = null;
    this.qh = i;
    this.Zc = e;
    if (s === void 0) {
      this.Qc = 1;
      this._c = null;
    } else {
      this.Qc = 2;
      this._c = s;
    }
    this.OS = new GSet();
    this.l = 2;
  }
  copy() {
    const t = new this.constructor();
    this.cloneProtected(t);
    return t;
  }
  cloneProtected(t) {
    t.cf = this.cf;
    t.Kd = this.Kd;
    t.Vc = this.Vc;
    t.$c = this.$c;
    t.qh = this.qh;
    t.Zc = this.Zc;
    t.Qc = this.Qc;
    t._c = this._c;
    t.l = this.l & -2;
  }
  static OneWay = 1;
  static TwoWay = 2;
  static parseEnum(t, i) {
    return (
      U.C(t, Binding, "parseEnum:ctor"),
      (e) => {
        let s = parseInt(e);
        if (isNaN(s)) {
          s = U.ea(t, e);
          if (s === null) return i;
        }
        return s;
      }
    );
  }
  gi(t) {
    if (t in BindingMode) this.mode = t;
    else U.wr(this, t);
  }
  static toString(t) {
    return U.toString(t);
  }
  toString() {
    return (
      "Binding(" +
      this.targetProperty +
      ":" +
      this.sourceProperty +
      (this.targetId !== -1 ? " " + this.targetId : "") +
      " " +
      BindingMode[this.mode] +
      ")"
    );
  }
  k() {
    this.l = this.l | 1;
    return this;
  }
  get targetId() {
    return this.QC;
  }
  set targetId(t) {
    if (this.p) U.D(this);
    this.QC = t;
  }
  get targetProperty() {
    return this.cf;
  }
  set targetProperty(t) {
    if (this.p) U.D(this);
    U.i(t, "string", Binding, "targetProperty");
    this.cf = t;
  }
  get sourceProperty() {
    return this.qh;
  }
  set sourceProperty(t) {
    if (this.p) U.D(this);
    U.i(t, "string", Binding, "sourceProperty");
    this.qh = t;
  }
  get p() {
    return (this.l & 1) !== 0;
  }
  get isToData() {
    return (this.l & 2) !== 0;
  }
  get isToObject() {
    return (this.l & 4) !== 0;
  }
  get isToModel() {
    return (this.l & 8) !== 0;
  }
  get isToTheme() {
    return (this.l & 16) !== 0;
  }
  get _C() {
    return this.isToTheme && !(this.isToData || this.isToObject || this.isToModel);
  }
  Nd() {
    return false;
  }
  get sourceName() {
    return this.$c;
  }
  set sourceName(t) {
    if (this.p) U.D(this);
    if (t !== null) U.i(t, "string", Binding, "sourceName");
    this.$c = t;
    if (t !== null) this.l = (this.l & -3) | 4;
    else this.l = this.l | 2;
  }
  get converter() {
    return this.Zc;
  }
  set converter(t) {
    if (this.p) U.D(this);
    if (t !== null) U.C(t, Binding, "converter");
    this.Zc = t;
  }
  get backConverter() {
    return this._c;
  }
  set backConverter(t) {
    if (this.p) U.D(this);
    if (t !== null) U.C(t, Binding, "backConverter");
    this._c = t;
  }
  get mode() {
    return this.Qc;
  }
  set mode(t) {
    if (this.p) U.D(this);
    if (this.isToTheme && t === 2) U.n("Theme Bindings cannot be TwoWay.");
    U.W(t, BindingMode, "BindingMode");
    this.Qc = t;
  }
  makeTwoWay(t) {
    if (this.isToTheme) U.n("Theme Bindings cannot be TwoWay.");
    this.mode = 2;
    if (t) {
      U.C(t, Binding, "makeTwoWay");
      this.backConverter = t;
    }
    return this;
  }
  ofObject(t) {
    if (this.p) U.D(this);
    if (t === void 0) t = "";
    Debug && U.i(t, "string", Binding, "ofObject:srcname");
    this.sourceName = t;
    return this;
  }
  ofModel() {
    if (this.p) U.D(this);
    this.l = (this.l & -3 & -5) | 8;
    this.$c = null;
    return this;
  }
  iD(t, i) {
    const e = this.sourceName;
    let s = null;
    if (e === null || e === "") s = t;
    else if (e === "/") s = i.part;
    else if (e === ".") s = i;
    else if (e === "..") s = i.panel;
    else s = t.findObject(e);
    return s;
  }
  check(t) {
    const i = this.cf;
    const e = this.qh;
    const s = this.Zc;
    if (
      (this.Nd() && s === null && this.Hh === null && i === "") ||
      (s === null && i === "")
    ) {
      U.ot("Binding error: target property is the empty string: " + this.toString());
    }
    if (
      this.Nd() &&
      this._C &&
      e === "" &&
      s === null &&
      this.Hh === null
    ) {
      U.ot(
        "Binding error: theme bindings require a source property when not using a converter: " +
          this.toString(),
      );
    }
    if (
      t &&
      typeof i == "string" &&
      (!U.lt(["setAttribute"]) && i.length > 0 && i[0] !== "_" && !U.Ww(t, i)
        ? U.ot("Binding error: undefined target property: " + i + " on " + t.toString())
        : i === "name" &&
          t instanceof GraphObject &&
          U.ot("Binding error: cannot modify GraphObject.name on " + t.toString()))
    );
  }
  updateTarget(t, i, e, s) {
    const n = this.qh;
    if ((e !== void 0 && n !== "" && n !== e) || (this.isToTheme && t.diagram === null)) return;
    const o = this.cf;
    const r = this.Zc;
    let l = i;
    if (n !== "" && !this._C) l = Model.It(i, n);
    if (l === void 0) return;
    if (r === null) {
      if (o !== "") {
        if (this.Nd()) {
          const h = t.diagram?.themeManager;
          l = this.vF(h, l, t, o);
          if (l === void 0) return;
        }
        if (s) s.at(t, o, l);
        else (i instanceof GraphObject || i instanceof RowColumnDefinition) && Model.at(t, o, l);
      }
    } else {
      try {
        if (o !== "") {
          let h = r(l, t);
          if (Debug && h === void 0) {
            U.ot(
              'Binding warning: conversion function returned undefined when setting target property "' +
                o +
                '" on ' +
                t.toString() +
                ", function is: " +
                r,
            );
          }
          if (this.Nd()) {
            const a = t.diagram?.themeManager;
            h = this.vF(a, h, t, o);
            if (h === void 0) return;
          }
          if (s) s.at(t, o, h);
          else (i instanceof GraphObject || i instanceof RowColumnDefinition) && Model.at(t, o, h);
        } else {
          r(l, t);
        }
      } catch (h) {
        Debug &&
          U.ot(
            "Binding error: " +
              h.toString() +
              ' setting target property "' +
              o +
              '" on ' +
              t.toString() +
              " with conversion function: " +
              r,
          );
      }
    }
  }
  updateSource(t, i, e, s) {
    if (this.Qc !== 2) return;
    const n = this.cf;
    if (e !== void 0 && n !== e) return;
    const o = this.qh;
    const r = this._c;
    const l = s !== null ? s.diagram : null;
    const h = l !== null ? l.model : null;
    let a = t;
    if (n !== "") a = Model.It(t, n);
    if (a === void 0 || this.OS.has(t)) return;
    try {
      this.OS.add(t);
      if (r === null) {
        if (o !== "") {
          if (h !== null) {
            Debug &&
              h.nodeKeyProperty === o &&
              h.containsNodeData(i) &&
              U.ot("Binding error: cannot have TwoWay Binding on node data key property: " + this.toString());
            h.setDataProperty(i, o, a);
          } else {
            (i instanceof GraphObject || i instanceof RowColumnDefinition) && (i[o] = a);
          }
        } else if (
          h !== null &&
          s !== null &&
          s.itemIndex >= 0 &&
          s.panel !== null &&
          Array.isArray(s.panel.itemArray)
        ) {
          const f = s.itemIndex;
          const c = s.panel.itemArray;
          h.removeArrayItem(c, f);
          h.insertArrayItem(c, f, a);
        }
      } else {
        try {
          if (o !== "") {
            const f = r(a, i, h);
            if (h !== null) {
              Debug &&
                (h.nodeKeyProperty === o &&
                  h.containsNodeData(i) &&
                  U.ot("Binding error: cannot have TwoWay Binding on node data key property: " + this.toString()),
                f === void 0 &&
                  U.ot(
                    `Binding warning: conversion function returned undefined when setting source property "${o}" on ${i.toString()}, function is: ${r}`,
                  ));
              h.setDataProperty(i, o, f);
            } else {
              (i instanceof GraphObject || i instanceof RowColumnDefinition) && (i[o] = f);
            }
          } else {
            const f = r(a, i, h);
            if (
              f !== void 0 &&
              h !== null &&
              s !== null &&
              s.itemIndex >= 0 &&
              s.panel !== null &&
              Array.isArray(s.panel.itemArray)
            ) {
              const c = s.itemIndex;
              const u = s.panel.itemArray;
              h.removeArrayItem(u, c);
              h.insertArrayItem(u, c, f);
            }
          }
        } catch (f) {
          Debug &&
            U.ot(
              "Binding error: " +
                f.toString() +
                ' setting source property "' +
                o +
                '" on ' +
                i.toString() +
                " with conversion function: " +
                r,
            );
        }
      }
    } finally {
      this.OS.delete(t);
    }
  }
}
