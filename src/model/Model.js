class Model {
  At;
  Ag;
  qo;
  tA;
  Te;
  Mi;
  vh;
  tu;
  iu;
  Tg;
  Lg;
  Dg;
  Fg;
  aw;
  df;
  cr;
  fw;
  Go;
  ES;
  constructor(t, i) {
    if (
      (GSet._i(this),
      (this.At = ""),
      (this.Ag = ""),
      (this.qo = !1),
      (this.tA = {}),
      (this.Te = []),
      (this.Mi = new GMap()),
      (this.vh = "key"),
      (this.tu = null),
      (this.iu = null),
      (this.Tg = !1),
      (this.Lg = !1),
      (this.Dg = !1),
      (this.Fg = null),
      (this.aw = 100),
      (this.df = "category"),
      (this.cr = new GMap()),
      (this.fw = []),
      (this.Go = !1),
      (this.ES = null),
      (this.undoManager = new UndoManager()),
      t !== void 0 && (Array.isArray(t) ? (this.nodeDataArray = t) : (i = t)),
      i)
    ) {
      Object.assign(this, i);
      const e = i.Changed;
      e && (delete this.Changed, this.addChangedListener(e));
    }
  }
  cloneProtected(t) {
    ((t.At = this.At),
      (t.Ag = this.Ag),
      (t.qo = this.qo),
      (t.vh = this.vh),
      (t.tu = this.tu),
      (t.iu = this.iu),
      (t.Tg = this.Tg),
      (t.Lg = this.Lg),
      (t.Dg = this.Dg),
      (t.Fg = this.Fg),
      (t.aw = this.aw),
      (t.df = this.df));
  }
  copy() {
    const t = new this.constructor();
    return (this.cloneProtected(t), t);
  }
  clear() {
    ((this.Te = []), this.Mi.clear(), this.cr.clear(), this.undoManager.clear());
  }
  toString(t) {
    if ((t === void 0 && (t = 0), t > 1)) return this.toJson();
    {
      let i = (this.name !== "" ? this.name : "") + " Model";
      if (t > 0) {
        i += `
 node data:`;
        const e = this.nodeDataArray,
          s = e.length;
        for (let n = 0; n < s; n++) {
          const o = e[n];
          i += " " + this.getKeyForNodeData(o) + ":" + U.toString(o);
        }
      }
      return i;
    }
  }
  toIncrementalData(t) {
    (U.s(t, ChangedEvent, Model, "toIncrementalData:e"),
      t.change !== 1 && U.n("Model.toIncrementalData argument is not a Transaction ChangedEvent:" + t.toString()));
    const i = t.object;
    if (!t.isTransactionFinished || !(i instanceof Transaction)) return null;
    const e = this.WF(i);
    return this.iA(i, t.propertyName === "FinishedUndo", e);
  }
  iA(t, i, e) {
    const s = this;
    let n = !1;
    const o = new GSet(),
      r = new GSet(),
      l = new GSet();
    t.changes.each((u) => {
      if (u.model === s) {
        if (u.modelChange === "nodeDataArray") u.change === 3 ? o.add(u.newValue) : u.change === 4 && l.add(u.oldValue);
        else if (s.containsNodeData(u.object)) u.object !== null && r.add(u.object);
        else if (u.change === 2 && (s.modelData === u.object || u.propertyName === "modelData")) n = !0;
        else if (u.object !== null)
          if (e.has(u.object)) {
            const d = e.get(u.object);
            d &&
              d.each((m) => {
                s.containsNodeData(m) && r.add(m);
              });
          } else {
            if (u.object instanceof Model || (s._a() && s.containsLinkData(u.object))) return;
            s.jF(u.object).each((m) => {
              r.add(m);
            });
          }
      }
    });
    const h = new GSet();
    o.each((u) => {
      const d = s.getKeyForNodeData(u);
      (d !== void 0 && h.add(d), i || r.add(u));
    });
    const a = new GSet();
    l.each((u) => {
      const d = s.getKeyForNodeData(u);
      (d !== void 0 && a.add(d), i && r.add(u));
    });
    const f = s.cloneDeep(r.toArray());
    let c = null;
    return (
      n && (c === null && (c = {}), (c.modelData = this.cloneDeep(this.modelData))),
      h.count > 0 &&
        (c === null && (c = {}), i ? (c.removedNodeKeys = h.toArray()) : (c.insertedNodeKeys = h.toArray())),
      f.length > 0 && (c === null && (c = {}), (c.modifiedNodeData = f)),
      a.count > 0 &&
        (c === null && (c = {}), i ? (c.insertedNodeKeys = a.toArray()) : (c.removedNodeKeys = a.toArray())),
      c
    );
  }
  cloneDeep(t) {
    return this.Ig(t, !0);
  }
  Ig(t, i, e, s) {
    if (!U.it(t)) return t;
    e || (e = new GMap());
    const n = e.get(t);
    if (n) return n;
    let o;
    if (Array.isArray(t)) {
      ((o = []), e.set(t, o));
      for (let r = 0; r < t.length; r++) {
        const l = t[r];
        o.push(this.Ig(l, !1, e, s));
      }
    } else if (t instanceof Point || t instanceof Size || t instanceof Rect || t instanceof Margin || t instanceof Spot)
      ((o = t.copy()), e.set(t, o));
    else {
      if (t instanceof Brush || t instanceof Geometry) return t;
      if (t instanceof List) ((o = new List().addAll(this.Ig(t.toArray(), !1, e, s))), e.set(t, o));
      else if (t instanceof GSet) ((o = new GSet().addAll(this.Ig(t.toArray(), !1, e, s))), e.set(t, o));
      else if (t instanceof GMap) ((o = new GMap().addAll(this.Ig(t.toArray(), !1, e, s))), e.set(t, o));
      else if (t instanceof Date) ((o = new Date(t)), e.set(t, o));
      else if (t instanceof RegExp) ((o = new RegExp(t)), e.set(t, o), (o.lastIndex = t.lastIndex));
      else if (Model.eA(null, "", t)) o = t;
      else if (U.lt(t.copy)) ((o = t.copy()), e.set(t, o));
      else {
        ((o = {}), e.set(t, o));
        for (const r in t) {
          if (r === "__idlhashid") continue;
          const l = t[r];
          o[r] = this.Ig(l, !1, e, s);
        }
      }
    }
    return o;
  }
  quote(t) {
    return JSON.stringify(t).replace(/[\u007F-\uFFFF]/g, (e) => {
      const s = "0000" + e.charCodeAt(0).toString(16);
      return "\\u" + s.substring(s.length - 4);
    });
  }
  Rg() {
    let t = "";
    return (
      this.name !== "" &&
        (t +=
          `,
  "name": ` + this.quote(this.name)),
      this.dataFormat !== "" &&
        (t +=
          `,
  "dataFormat": ` + this.quote(this.dataFormat)),
      this.isReadOnly &&
        (t +=
          `,
  "isReadOnly": ` + this.isReadOnly),
      this.nodeKeyProperty !== "key" &&
        typeof this.nodeKeyProperty == "string" &&
        (t +=
          `,
  "nodeKeyProperty": ` + this.quote(this.nodeKeyProperty)),
      this.copiesArrays &&
        (t += `,
  "copiesArrays": true`),
      this.copiesArrayObjects &&
        (t += `,
  "copiesArrayObjects": true`),
      this.copiesKey &&
        (t += `,
  "copiesKey": true`),
      this.pointsDigits !== 100 &&
        (t +=
          `,
  "pointsDigits": ` + this.pointsDigits.toString()),
      this.nodeCategoryProperty !== "category" &&
        typeof this.nodeCategoryProperty == "string" &&
        (t +=
          `,
  "nodeCategoryProperty": ` + this.quote(this.nodeCategoryProperty)),
      t
    );
  }
  cw(t) {
    (t.name && (this.name = t.name),
      t.dataFormat && (this.dataFormat = t.dataFormat),
      t.isReadOnly && (this.isReadOnly = !0),
      t.nodeKeyProperty && (this.nodeKeyProperty = t.nodeKeyProperty),
      t.copiesArrays && (this.copiesArrays = !0),
      t.copiesArrayObjects && (this.copiesArrayObjects = !0),
      t.copiesKey !== void 0 && (this.copiesKey = t.copiesKey),
      t.pointsDigits !== void 0 && (this.pointsDigits = parseInt(t.pointsDigits)),
      t.nodeCategoryProperty && (this.nodeCategoryProperty = t.nodeCategoryProperty));
  }
  JF() {
    const t = this.modelData;
    return (
      `,
  "modelData": ` + this.$F(t)
    );
  }
  ZF(t) {
    const i = t.modelData;
    U.it(i) && (this.replaceJsonObjects(i), (this.modelData = i));
  }
  sA() {
    const t = this.modelData;
    let i = !1;
    for (const s in t)
      if (!this.VS(t, s, t[s])) {
        i = !0;
        break;
      }
    let e = "";
    return (
      i && (e = this.JF()),
      e +
        `,
  "nodeDataArray": ` +
        this.Wh(this.nodeDataArray, !0)
    );
  }
  nA(t) {
    this.ZF(t);
    const i = t.nodeDataArray;
    Array.isArray(i) && (this.replaceJsonObjects(i), (this.nodeDataArray = i));
  }
  oA(t, i, e) {
    if (t === i) return !0;
    if (typeof t != typeof i || U.lt(t) || U.lt(i)) return !1;
    if (Array.isArray(t) && Array.isArray(i)) {
      if (e.get(t) === i) return !0;
      if ((e.set(t, i), t.length !== i.length)) return !1;
      for (let s = 0; s < t.length; s++) if (!this.oA(t[s], i[s], e)) return !1;
      return !0;
    } else if (U.it(t) && U.it(i)) {
      if (e.get(t) === i) return !0;
      e.set(t, i);
      for (const s in t) {
        const n = t[s];
        if (this.VS(t, s, n)) continue;
        const o = i[s];
        if (o === void 0 || !this.oA(n, o, e)) return !1;
      }
      for (const s in i) {
        const n = i[s];
        if (this.VS(i, s, n)) continue;
        const o = t[s];
        if (o === void 0 || !this.oA(o, n, e)) return !1;
      }
      return !0;
    }
    return !1;
  }
  static QF = `,
  "insertedNodeKeys": `;
  static d4 = `,
  "modifiedNodeData": `;
  static _F = `,
  "removedNodeKeys": `;
  WF(t) {
    let i = new GMap();
    const e = (s, n) => {
      const o = n.part;
      if (!o) return;
      const r = o.data;
      if (s === r) return;
      let l = i.get(s);
      l === null ? ((l = new GSet()), l.add(r), i.set(s, l)) : l.add(r);
    };
    return (
      t.changes.each((s) => {
        if (s.diagram !== null) {
          const n = s.change;
          if (n === 2) {
            if (s.object !== null) {
              const o = s.object.panel;
              if (o) {
                const r = o.data;
                r && e(r, o);
              }
            }
          } else if (n === 3 || n === 4) {
            const o = s.object,
              r = o.itemArray;
            r && e(r, o);
          }
        }
      }),
      i
    );
  }
  jF(t) {
    const i = new GSet();
    for (let e = 0; e < this.nodeDataArray.length; e++) {
      const s = this.nodeDataArray[e];
      this.BS(t, s, s, i);
    }
    return i;
  }
  BS(t, i, e, s) {
    if (Array.isArray(i))
      for (let n = 0; n < i.length; n++) {
        const o = i[n];
        if (o === t) return (s.add(e), !0);
        if (this.BS(t, o, e, s)) return !0;
      }
    else if (U.it(i) && Object.getPrototypeOf(i) === Object.prototype)
      for (const n in i) {
        const o = i[n];
        if (o === t) return (s.add(e), !0);
        if (this.BS(t, o, e, s)) return !0;
      }
    return !1;
  }
  rA(t, i, e) {
    const s = this;
    let n = !1;
    const o = new GSet(),
      r = new GSet(),
      l = new GSet();
    t.changes.each((c) => {
      if (c.model === s) {
        if (c.modelChange === "nodeDataArray") c.change === 3 ? o.add(c.newValue) : c.change === 4 && l.add(c.oldValue);
        else if (s.containsNodeData(c.object)) c.object !== null && r.add(c.object);
        else if (c.change === 2 && (s.modelData === c.object || c.propertyName === "modelData")) n = !0;
        else if (c.object !== null)
          if (e.has(c.object)) {
            const u = e.get(c.object);
            u &&
              u.each((d) => {
                s.containsNodeData(d) && r.add(d);
              });
          } else {
            if (c.object instanceof Model || (s._a() && s.containsLinkData(c.object))) return;
            s.jF(c.object).each((d) => {
              r.add(d);
            });
          }
      }
    });
    const h = new GSet();
    o.each((c) => {
      const u = s.getKeyForNodeData(c);
      (u !== void 0 && h.add(u), i || r.add(c));
    });
    const a = new GSet();
    l.each((c) => {
      const u = s.getKeyForNodeData(c);
      (u !== void 0 && a.add(u), i && r.add(c));
    });
    let f = "";
    return (
      n && (f += this.JF()),
      h.count > 0 && (f += (i ? Model._F : Model.QF) + this.Wh(h.toArray(), !0)),
      r.count > 0 && (f += Model.d4 + this.Wh(r.toArray(), !0)),
      a.count > 0 && (f += (i ? Model.QF : Model._F) + this.Wh(a.toArray(), !0)),
      f
    );
  }
  uw(t) {
    (((t.name !== void 0 && t.name !== this.name) ||
      (t.dataFormat !== void 0 && t.dataFormat !== this.dataFormat) ||
      (t.isReadOnly !== void 0 && t.isReadOnly !== this.isReadOnly) ||
      (t.nodeKeyProperty !== void 0 && t.nodeKeyProperty !== this.nodeKeyProperty) ||
      (t.copiesArrays !== void 0 && t.copiesArrays !== this.copiesArrays) ||
      (t.copiesArrayObjects !== void 0 && t.copiesArrayObjects !== this.copiesArrayObjects) ||
      (t.copiesKey !== void 0 && t.copiesKey !== this.copiesKey) ||
      (t.nodeCategoryProperty !== void 0 && t.nodeCategoryProperty !== this.nodeCategoryProperty)) &&
      U.n("applyIncrementalJson cannot change Model properties"),
      this.ZF(t));
    const i = t.insertedNodeKeys,
      e = t.modifiedNodeData,
      s = new GMap();
    if (Array.isArray(e))
      for (let o = 0; o < e.length; o++) {
        const r = e[o],
          l = this.getKeyForNodeData(r);
        l != null && s.set(l, r);
      }
    if (Array.isArray(i)) {
      const o = i.length;
      for (let r = 0; r < o; r++) {
        const l = i[r];
        let h = this.findNodeDataForKey(l);
        if (h === null) {
          const a = s.get(l);
          ((h = a || this.copyNodeData({})), h !== null && (this.setKeyForNodeData(h, l), this.addNodeData(h)));
        }
      }
    }
    if (Array.isArray(e)) {
      const o = e.length;
      for (let r = 0; r < o; r++) {
        const l = e[r],
          h = this.getKeyForNodeData(l),
          a = this.findNodeDataForKey(h);
        if (a !== null) {
          for (const f in l)
            f === "__idlhashid" ||
              f === this.nodeKeyProperty ||
              ((this.yP() || this.YF()) && f === this.nodeIsGroupProperty) ||
              this.setDataProperty(a, f, l[f]);
          this.Og(l, a);
        }
      }
    }
    const n = t.removedNodeKeys;
    if (Array.isArray(n)) {
      const o = n.length;
      for (let r = 0; r < o; r++) {
        const l = n[r],
          h = this.findNodeDataForKey(l);
        h !== null && this.removeNodeData(h);
      }
    }
  }
  toIncrementalJson(t, i) {
    (U.s(t, ChangedEvent, Model, "toIncrementalJson:e"),
      t.change !== 1 && U.n("Model.toIncrementalJson argument is not a Transaction ChangedEvent:" + t.toString()));
    const e = t.object;
    if (!t.isTransactionFinished || !(e instanceof Transaction)) return '{ "incremental": 0 }';
    i === void 0 && (i = U.Jn(this));
    const s = this.WF(e),
      n = this.rA(e, t.propertyName === "FinishedUndo", s);
    return '{ "class": ' + this.quote(i) + ', "incremental": 1' + this.Rg() + n + "}";
  }
  toIncrementalJSON(t, i) {
    return this.toIncrementalJson(t, i);
  }
  toJson(t) {
    return (t === void 0 && (t = U.Jn(this)), '{ "class": ' + this.quote(t) + this.Rg() + this.sA() + "}");
  }
  toJSON(t) {
    return this.toJson(t);
  }
  applyIncrementalJson(t) {
    let i = null;
    if (typeof t == "string")
      try {
        i = root.JSON.parse(t);
      } catch (s) {
        Debug && U.ot("JSON.parse error: " + s.toString());
      }
    else U.it(t) ? (i = t) : U.n("Unable to modify a Model from: " + t);
    const e = i.incremental;
    (typeof e != "number" && U.n("Unable to apply non-incremental changes to Model: " + t),
      e !== 0 &&
        (this.startTransaction("applyIncrementalJson"), this.uw(i), this.commitTransaction("applyIncrementalJson")));
  }
  applyIncrementalJSON(t) {
    return this.applyIncrementalJson(t);
  }
  static fromJson(t, i) {
    (i === void 0 && (i = null), i !== null && U.s(i, Model, Model, "fromJson:model"));
    let e = null;
    if (typeof t == "string")
      try {
        e = root.JSON.parse(t);
      } catch (s) {
        Debug && U.ot("JSON.parse error: " + s.toString());
      }
    else U.it(t) ? (e = t) : U.n("Unable to construct a Model from: " + t);
    if (i === null) {
      const s = Model.g4(e);
      s === null || s instanceof Model ? (i = s) : U.n("Unable to construct a Model of declared class: " + e.class);
    }
    return (i === null && (i = Model.tI()), i.cw(e), i.nA(e), i);
  }
  static fromJSON(t, i) {
    return this.fromJson(t, i);
  }
  static tI() {
    return (
      Debug && U.n("Unable to construct a Model. Provided JSON requires GraphLinksModel, which is not loaded."),
      new Model()
    );
  }
  static g4(t) {
    let i = null,
      e = t.class;
    if (typeof e == "string")
      try {
        let s = null;
        (e.indexOf("idl.") === 0 ? (s = Model.lA(e.substring(3))) : ((s = Model.lA(e)), s === null && (s = root[e])),
          U.lt(s) && (i = new s()));
      } catch {}
    return i;
  }
  replaceJsonObjects(t) {
    if (Array.isArray(t)) {
      const i = t.length;
      for (let e = 0; e < i; e++) {
        const s = t[e];
        U.it(s) && this.iI(t, e, this.replaceJsonObjects(s));
      }
    } else if (U.it(t)) {
      for (const i in t) {
        const e = t[i];
        if (U.it(e)) {
          const s = this.replaceJsonObjects(e);
          ((t[i] = s), this.replaceJsonPropertyValue(t, i, s));
        }
      }
      return this.m4(t);
    }
    return t;
  }
  replaceJsonPropertyValue(t, i, e) {
    if (i === "points" && Array.isArray(e)) {
      let s = e.length % 2 === 0;
      for (let n = 0; n < e.length; n++)
        if (typeof e[n] != "number") {
          s = !1;
          break;
        }
      if (s) {
        const n = new List();
        for (let o = 0; o < e.length / 2; o++) n.add(new Point(e[o * 2], e[o * 2 + 1]));
        t[i] = n;
      }
    }
  }
  writeJsonValue(t) {
    return t === void 0
      ? "undefined"
      : t === null
        ? "null"
        : t === !0
          ? "true"
          : t === !1
            ? "false"
            : typeof t == "string"
              ? this.quote(t)
              : typeof t == "number"
                ? t === 1 / 0
                  ? "9e9999"
                  : t === -1 / 0
                    ? "-9e9999"
                    : isNaN(t)
                      ? '{"class":"NaN"}'
                      : t.toString()
                : t instanceof Boolean
                  ? this.writeJsonValue(t.valueOf())
                  : t instanceof String
                    ? this.writeJsonValue(t.valueOf())
                    : t instanceof Number
                      ? this.writeJsonValue(t.valueOf())
                      : t instanceof Date
                        ? '{"class":"Date", "value":"' + t.toJSON() + '"}'
                        : Array.isArray(t)
                          ? this.Wh(t)
                          : U.it(t)
                            ? this.$F(t)
                            : U.lt(t)
                              ? "null"
                              : '"' + t.toString() + '"';
  }
  Wh(t, i) {
    i === void 0 && (i = !1);
    const e = t.length;
    if (e <= 0) return "[]";
    const s = new StringBuilder();
    (s.add("["),
      i &&
        e > 1 &&
        s.add(`
`));
    for (let n = 0; n < e; n++) {
      const o = t[n];
      o !== void 0 &&
        (n > 0 &&
          (s.add(","),
          i &&
            s.add(`
`)),
        s.add(this.writeJsonValue(o)));
    }
    return (
      i &&
        e > 1 &&
        s.add(`
`),
      s.add("]"),
      s.toString()
    );
  }
  VS(t, i, e) {
    return !!(e === void 0 || i === "__idlhashid" || i[0] === "_" || U.lt(e));
  }
  $i(t) {
    return isNaN(t) ? "NaN" : t === 1 / 0 ? "9e9999" : t === -1 / 0 ? "-9e9999" : t;
  }
  $F(t) {
    const i = t;
    if (i instanceof Point) t = { class: "idl.Point", x: this.$i(i.x), y: this.$i(i.y) };
    else if (i instanceof Size) t = { class: "idl.Size", width: this.$i(i.width), height: this.$i(i.height) };
    else if (i instanceof Rect)
      t = { class: "idl.Rect", x: this.$i(i.x), y: this.$i(i.y), width: this.$i(i.width), height: this.$i(i.height) };
    else if (i instanceof Margin)
      t = {
        class: "idl.Margin",
        top: this.$i(i.top),
        right: this.$i(i.right),
        bottom: this.$i(i.bottom),
        left: this.$i(i.left),
      };
    else if (i instanceof Spot)
      i.isSpot()
        ? (t = {
            class: "idl.Spot",
            x: this.$i(i.x),
            y: this.$i(i.y),
            offsetX: this.$i(i.offsetX),
            offsetY: this.$i(i.offsetY),
          })
        : (t = { class: "idl.Spot", enum: i.toString() });
    else if (i instanceof Brush) {
      if (
        ((t = { class: "idl.Brush", type: BrushType[i.type] }),
        i.type === 1
          ? (t.color = i.color)
          : (i.type === 2 || i.type === 3) &&
            ((t.start = i.start),
            (t.end = i.end),
            i.type === 3 &&
              (i.startRadius !== 0 && (t.startRadius = this.$i(i.startRadius)),
              isNaN(i.endRadius) || (t.endRadius = this.$i(i.endRadius)))),
        i.colorStops !== null)
      ) {
        const n = {},
          o = i.colorStops.iterator;
        for (; o.next(); ) {
          const r = o.key,
            l = o.value;
          n[r] = l;
        }
        t.colorStops = n;
      }
    } else if (i instanceof Geometry)
      ((t = { class: "idl.Geometry", type: GeometryType[i.type] }),
        i.startX !== 0 && (t.startX = this.$i(i.startX)),
        i.startY !== 0 && (t.startY = this.$i(i.startY)),
        i.endX !== 0 && (t.endX = this.$i(i.endX)),
        i.endY !== 0 && (t.endY = this.$i(i.endY)),
        i.spot1.equals(Spot.TopLeft) || (t.spot1 = i.spot1),
        i.spot2.equals(Spot.BottomRight) || (t.spot2 = i.spot2),
        i.type === 4 && (t.path = Geometry.stringify(i)));
    else if (Model.eA(null, "", i)) return "{}";
    let e = "{",
      s = !0;
    for (const n in t) {
      const o = this.It(t, n);
      this.VS(t, n, o) || (s ? (s = !1) : (e += ","), (e += this.quote(n) + ":" + this.writeJsonPropertyValue(n, o)));
    }
    return ((e += "}"), e);
  }
  writeJsonPropertyValue(t, i) {
    if (t === "points" && i instanceof List) {
      const e = i;
      let s = "[";
      const n = e.iterator;
      for (; n.next(); ) {
        const o = n.value;
        (s.length > 1 && (s += ","), (s += this.eI(o.x)), (s += ","), (s += this.eI(o.y)));
      }
      return ((s += "]"), s);
    } else return this.writeJsonValue(i);
  }
  eI(t) {
    if (t === 1 / 0) return "9e9999";
    if (t === -1 / 0) return "-9e9999";
    if (isNaN(t)) return "0";
    const i = this.pointsDigits;
    return i > 16 ? t.toString() : t.toFixed(i);
  }
  get pointsDigits() {
    return this.aw;
  }
  set pointsDigits(t) {
    (t < 0 ? (t = 0) : t > 100 && (t = 100), (this.aw = t));
  }
  Zi(t) {
    return typeof t == "number"
      ? t
      : t === "NaN"
        ? NaN
        : t === "9e9999"
          ? 1 / 0
          : t === "-9e9999"
            ? -1 / 0
            : parseFloat(t);
  }
  m4(t) {
    if (!U.it(t)) return t;
    let i = t.class || "";
    if (typeof i != "string" || i === "") return t;
    if (i === "NaN") return NaN;
    if (i === "Date") return new Date(t.value);
    if (i.indexOf("idl.") !== 0) return t;
    i = i.substring(3);
    let e = t;
    if (i === "Point") e = new Point(this.Zi(t.x), this.Zi(t.y));
    else if (i === "Size") e = new Size(this.Zi(t.width), this.Zi(t.height));
    else if (i === "Rect") e = new Rect(this.Zi(t.x), this.Zi(t.y), this.Zi(t.width), this.Zi(t.height));
    else if (i === "Margin") e = new Margin(this.Zi(t.top), this.Zi(t.right), this.Zi(t.bottom), this.Zi(t.left));
    else if (i === "Spot")
      typeof t.enum == "string"
        ? (e = Spot.parse(t.enum))
        : (e = new Spot(this.Zi(t.x), this.Zi(t.y), this.Zi(t.offsetX), this.Zi(t.offsetY)));
    else if (i === "Brush") {
      const s = new Brush();
      ((s.type = U.ea(BrushType, t.type) ?? 1),
        typeof t.color == "string" && (s.color = t.color),
        t.start instanceof Spot && (s.start = t.start),
        t.end instanceof Spot && (s.end = t.end),
        typeof t.startRadius == "number" && (s.startRadius = this.Zi(t.startRadius)),
        typeof t.endRadius == "number" && (s.endRadius = this.Zi(t.endRadius)));
      const n = t.colorStops;
      if (U.it(n))
        for (const o in n) {
          const r = parseFloat(o);
          s.addColorStop(r, n[o]);
        }
      e = s;
    } else if (i === "Geometry") {
      let s = null;
      (typeof t.path == "string" ? (s = Geometry.parse(t.path)) : (s = new Geometry()),
        (s.type = U.ea(GeometryType, t.type) ?? 1),
        typeof t.startX == "number" && (s.startX = this.Zi(t.startX)),
        typeof t.startY == "number" && (s.startY = this.Zi(t.startY)),
        typeof t.endX == "number" && (s.endX = this.Zi(t.endX)),
        typeof t.endY == "number" && (s.endY = this.Zi(t.endY)),
        t.spot1 instanceof Spot && (s.spot1 = t.spot1),
        t.spot2 instanceof Spot && (s.spot2 = t.spot2),
        (e = s));
    } else if (i === "EnumValue") {
      let s = t.classType;
      s.indexOf("idl.") === 0 && (s = s.substring(3));
      const n = Model.lA(s);
      U.lt(n) && (e = U.ea(n, t.name));
    }
    return e;
  }
  get name() {
    return this.At;
  }
  set name(t) {
    const i = this.At;
    i !== t && (U.i(t, "string", Model, "name"), (this.At = t), this.t("name", i, t));
  }
  get dataFormat() {
    return this.Ag;
  }
  set dataFormat(t) {
    const i = this.Ag;
    i !== t && (U.i(t, "string", Model, "dataFormat"), (this.Ag = t), this.t("dataFormat", i, t));
  }
  get isReadOnly() {
    return this.qo;
  }
  set isReadOnly(t) {
    const i = this.qo;
    i !== t && (U.i(t, "boolean", Model, "isReadOnly"), (this.qo = t), this.t("isReadOnly", i, t));
  }
  get modelData() {
    return this.tA;
  }
  set modelData(t) {
    const i = this.modelData;
    i !== t &&
      (U.Ro(t, Model, "modelData"),
      this.containsNodeData(t) && U.n("Model.modelData Object must not be used by the rest of the model: " + t),
      (this.tA = t),
      this.t("modelData", i, t),
      this.updateTargetBindings(t));
  }
  addChangedListener(t) {
    return (U.C(t, Model, "addChangedListener:listener"), this.fw.push(t), this);
  }
  removeChangedListener(t) {
    U.C(t, Model, "removeChangedListener:listener");
    const i = this.fw.indexOf(t);
    i >= 0 && this.fw.splice(i, 1);
  }
  E2(t) {
    (this.skipsUndoManager || this.undoManager.handleChanged(t), this.sI(t));
  }
  sI(t) {
    this.fw.forEach((i) => i(t));
  }
  mR(t) {
    this.sI(t);
  }
  raiseChangedEvent(t, i, e, s, n, o, r) {
    this.Bt("", t, i, e, s, n, o, r);
  }
  raiseChanged(t, i, e, s, n) {
    this.Bt("", 2, t, this, i, e, s, n);
  }
  t(t, i, e, s, n) {
    this.Bt("", 2, t, this, i, e, s, n);
  }
  raiseDataChanged(t, i, e, s, n, o) {
    this.Bt("", 2, i, t, e, s, n, o);
  }
  Bt(t, i, e, s, n, o, r, l) {
    (r === void 0 && (r = null), l === void 0 && (l = null));
    const h = new ChangedEvent();
    ((h.model = this),
      (h.change = i),
      (h.modelChange = t),
      (h.propertyName = e),
      (h.object = s),
      (h.oldValue = n),
      (h.oldParam = r),
      (h.newValue = o),
      (h.newParam = l),
      this.E2(h));
  }
  get undoManager() {
    return this.ES;
  }
  set undoManager(t) {
    const i = this.ES;
    i !== t && (U.s(t, UndoManager, Model, "undoManager"), i && i.removeModel(this), (this.ES = t), t.addModel(this));
  }
  get skipsUndoManager() {
    return this.Go;
  }
  set skipsUndoManager(t) {
    (U.i(t, "boolean", Model, "skipsUndoManager"), (this.Go = t));
  }
  changeState(t, i) {
    if (t !== null && t.model === this)
      if (t.change === 2) {
        const e = t.object,
          s = t.propertyName,
          n = t.getValue(i);
        if (e !== null && s === this.nodeKeyProperty && this.containsNodeData(e)) {
          const o = t.getValue(!i);
          (o !== void 0 && this.Mi.delete(o), n !== void 0 && this.Mi.set(n, e));
        }
        this.at(e, s, n);
      } else if (t.change === 3) {
        const e = t.newParam;
        if (t.modelChange === "nodeDataArray") {
          const s = t.newValue;
          if (U.it(s) && typeof e == "number") {
            const n = this.getKeyForNodeData(s);
            i
              ? (this.Te[e] === s && this.Lo(this.Te, e), n !== void 0 && this.Mi.delete(n))
              : (this.Te[e] !== s && this.ur(this.Te, e, s), n !== void 0 && this.Mi.set(n, s));
          }
        } else if (t.modelChange === "") {
          let s = t.object;
          if (
            (s && !Array.isArray(s) && t.propertyName && (s = this.It(s, t.propertyName)),
            Array.isArray(s) && typeof e == "number")
          ) {
            const n = t.newValue;
            i ? this.Lo(s, e) : this.ur(s, e, n);
          }
        } else U.n("unknown ChangeType.Insert modelChange: " + t.toString());
      } else if (t.change === 4) {
        const e = t.oldParam;
        if (t.modelChange === "nodeDataArray") {
          const s = t.oldValue;
          if (U.it(s) && typeof e == "number") {
            const n = this.getKeyForNodeData(s);
            i
              ? (this.Te[e] !== s && this.ur(this.Te, e, s), n !== void 0 && this.Mi.set(n, s))
              : (this.Te[e] === s && this.Lo(this.Te, e), n !== void 0 && this.Mi.delete(n));
          }
        } else if (t.modelChange === "") {
          let s = t.object;
          if (
            (s && !Array.isArray(s) && t.propertyName && (s = this.It(s, t.propertyName)),
            Array.isArray(s) && typeof e == "number")
          ) {
            const n = t.oldValue;
            i ? this.ur(s, e, n) : this.Lo(s, e);
          }
        } else U.n("unknown ChangeType.Remove modelChange: " + t.toString());
      } else t.change === 1 || U.n("unknown ChangedEvent: " + t.toString());
  }
  startTransaction(t) {
    return this.undoManager.startTransaction(t);
  }
  commitTransaction(t) {
    return this.undoManager.commitTransaction(t);
  }
  rollbackTransaction() {
    return this.undoManager.rollbackTransaction();
  }
  commit(t, i) {
    let e = i;
    e === void 0 && (e = "");
    const s = this.skipsUndoManager;
    (e === null && ((this.skipsUndoManager = !0), (e = "")), this.undoManager.startTransaction(e));
    let n = !1;
    try {
      (t(this), (n = !0));
    } finally {
      (n ? this.undoManager.commitTransaction(e) : this.undoManager.rollbackTransaction(), (this.skipsUndoManager = s));
    }
  }
  updateTargetBindings(t, i) {
    (i === void 0 && (i = ""), this.Bt("SourceChanged", 1, i, t, null, null));
  }
  get nodeKeyProperty() {
    return this.vh;
  }
  set nodeKeyProperty(t) {
    const i = this.vh;
    i !== t &&
      (this.Gn(t, Model, "nodeKeyProperty"),
      t === "" && U.n("Model.nodeKeyProperty may not be the empty string"),
      this.Mi.count > 0 && U.n("Cannot set Model.nodeKeyProperty when there is existing node data"),
      (this.vh = t),
      this.t("nodeKeyProperty", i, t));
  }
  Gn(t, i, e) {
    typeof t != "string" && !U.lt(t) && U.Li(t, "string or function", i, e);
  }
  getKeyForNodeData(t) {
    if (t === null) return;
    const i = this.vh;
    if (i === "") return;
    const e = this.It(t, i);
    if (e !== void 0) {
      if (this.isKeyType(e)) return e;
      U.n("Key value for node data " + t + " is not a number or a string: " + e);
    }
  }
  setKeyForNodeData(t, i) {
    if (((i == null || !this.isKeyType(i)) && U.Li(i, "number or string", Model, "setKeyForNodeData:key"), t === null))
      return;
    const e = this.vh;
    if (e === "") return;
    if (!this.containsNodeData(t)) {
      this.at(t, e, i);
      return;
    }
    const s = this.It(t, e);
    if (s !== i) {
      if (this.findNodeDataForKey(i) !== null) return;
      (this.at(t, e, i),
        s !== void 0 && this.Mi.delete(s),
        this.Mi.set(i, t),
        this.Bt("nodeKey", 2, e, t, s, i),
        typeof e == "string" && this.updateTargetBindings(t, e),
        this.dw(s, i));
    }
  }
  get makeUniqueKeyFunction() {
    return this.tu;
  }
  set makeUniqueKeyFunction(t) {
    const i = this.tu;
    i !== t &&
      (t !== null && U.C(t, Model, "makeUniqueKeyFunction"), (this.tu = t), this.t("makeUniqueKeyFunction", i, t));
  }
  isKeyType(t) {
    return typeof t == "number" || typeof t == "string";
  }
  containsNodeData(t) {
    if (t === null) return !1;
    const i = this.getKeyForNodeData(t);
    return i === void 0 ? !1 : this.Mi.get(i) === t;
  }
  findNodeDataForKey(t) {
    return (
      t === null && U.n("Model.findNodeDataForKey:key must not be null"),
      t === void 0 || !this.isKeyType(t) ? null : this.Mi.get(t)
    );
  }
  get nodeDataArray() {
    return this.Te;
  }
  set nodeDataArray(t) {
    const i = this.Te;
    if (i !== t) {
      (this.gw(t, Model, "nodeDataArray"), this.Mi.clear(), this.hA());
      const e = t.length;
      for (let o = 0; o < e; o++) {
        const r = t[o];
        (U.it(r) || U.n("Model.nodeDataArray must only contain Objects, not: " + r),
          r === this.modelData && U.n("nodeDataArray Objects must not be the shared Model.modelData"));
      }
      this.Te = t;
      const s = new List();
      for (let o = 0; o < e; o++) {
        const r = t[o],
          l = this.getKeyForNodeData(r);
        l === void 0 || this.Mi.get(l) !== null ? s.add(r) : this.Mi.set(l, r);
      }
      const n = s.iterator;
      for (; n.next(); ) {
        const o = n.value;
        this.makeNodeDataKeyUnique(o);
        const r = this.getKeyForNodeData(o);
        r !== void 0 && this.Mi.set(r, o);
      }
      this.Bt("nodeDataArray", 2, "nodeDataArray", this, i, t);
      for (let o = 0; o < e; o++) {
        const r = t[o];
        (this.Eg(r), this.Vg(r));
      }
    }
  }
  zS(t) {
    return t === void 0 ? !1 : this.Mi.has(t);
  }
  makeNodeDataKeyUnique(t) {
    if (t === null) return;
    const i = this.vh;
    if (i === "") return;
    let e = this.getKeyForNodeData(t);
    if (e !== void 0 && !this.zS(e)) return;
    const s = this.tu;
    if (s !== null && ((e = s(this, t)), e != null && !this.zS(e))) {
      this.at(t, i, e);
      return;
    }
    if (typeof e == "string") {
      let n = 2;
      for (; this.zS(e + n); ) n++;
      this.at(t, i, e + n);
    } else if (e === void 0 || typeof e == "number") {
      let n = -this.Mi.count - 1;
      for (; this.zS(n); ) n--;
      this.at(t, i, n);
    } else Debug && U.n("Model.getKeyForNodeData returned something other than a string or a number: " + e);
  }
  addNodeData(t) {
    t !== null &&
      (t === this.modelData && U.n("Model.addNodeData cannot add the shared Model.modelData Object"),
      this.containsNodeData(t) || this.zF(t, !0));
  }
  zF(t, i) {
    let e = this.getKeyForNodeData(t);
    if (e === void 0) (this.makeNodeDataKeyUnique(t), (e = this.getKeyForNodeData(t)));
    else {
      if (this.Mi.get(e) === t) return;
      (this.makeNodeDataKeyUnique(t), (e = this.getKeyForNodeData(t)));
    }
    (e === void 0 && U.n("Model.makeNodeDataKeyUnique failed on " + t + ".  Data not added to Model."),
      this.Mi.set(e, t));
    let s = null;
    (i && ((s = this.Te.length), this.ur(this.Te, s, t)),
      this.Bt("nodeDataArray", 3, "nodeDataArray", this, null, t, null, s),
      this.Eg(t),
      this.Vg(t));
  }
  addNodeDataCollection(t) {
    if (Array.isArray(t)) {
      const i = t.length;
      for (let e = 0; e < i; e++) this.addNodeData(t[e]);
    } else {
      const i = t.iterator;
      for (; i.next(); ) {
        const e = i.value;
        this.addNodeData(e);
      }
    }
  }
  removeNodeData(t) {
    t !== null && this.BF(t, !0);
  }
  BF(t, i) {
    const e = this.getKeyForNodeData(t);
    e !== void 0 && this.Mi.delete(e);
    let s = null;
    if (i) {
      if (((s = this.Te.indexOf(t)), s < 0)) return;
      this.Lo(this.Te, s);
    }
    (this.Bt("nodeDataArray", 4, "nodeDataArray", this, t, null, s, null), this.mw(t));
  }
  removeNodeDataCollection(t) {
    if (Array.isArray(t)) {
      const i = t.length;
      for (let e = 0; e < i; e++) this.removeNodeData(t[e]);
    } else {
      const i = t.iterator;
      for (; i.next(); ) {
        const e = i.value;
        this.removeNodeData(e);
      }
    }
  }
  mergeNodeDataArray(t) {
    if (t === this.nodeDataArray || !Array.isArray(t)) return;
    const i = new GSet();
    i.addAll(this.Mi.iteratorKeys);
    const e = new GSet(),
      s = t.length;
    for (let o = 0; o < s; o++) {
      const r = t[o],
        l = this.getKeyForNodeData(r);
      if (l !== void 0) {
        e.add(l);
        const h = this.findNodeDataForKey(l);
        if (h === r) continue;
        if (h !== null) (this.assignAllDataProperties(h, r), this.Og(r, h));
        else {
          const a = this.cloneDeep(r);
          (this.setKeyForNodeData(a, l), this.addNodeData(a));
        }
      } else {
        const h = this.cloneDeep(r);
        this.addNodeData(h);
        const a = this.getKeyForNodeData(h);
        a !== void 0 && e.add(a);
      }
    }
    const n = i.iterator;
    for (; n.next(); ) {
      const o = n.value;
      if (!e.has(o)) {
        const r = this.findNodeDataForKey(o);
        r && this.removeNodeData(r);
      }
    }
  }
  dw(t, i) {
    if (i === void 0) return;
    const e = this.lw(t);
    e instanceof GSet && this.cr.set(i, e);
  }
  hA() {}
  Eg(t) {}
  Vg(t) {}
  mw(t) {}
  dn(t, i) {
    if (t === void 0) return;
    let e = this.cr.get(t);
    (e === null && ((e = new GSet()), this.cr.set(t, e)), e.add(i));
  }
  un(t, i) {
    if (t === void 0) return;
    const e = this.cr.get(t);
    e instanceof GSet && (i == null ? this.cr.delete(t) : (e.delete(i), e.count === 0 && this.cr.delete(t)));
  }
  lw(t) {
    if (t === void 0) return null;
    const i = this.cr.get(t);
    return i instanceof GSet ? i : null;
  }
  GV(t) {
    t === void 0 ? this.cr.clear() : this.cr.delete(t);
  }
  get copyNodeDataFunction() {
    return this.iu;
  }
  set copyNodeDataFunction(t) {
    const i = this.iu;
    i !== t &&
      (t !== null && U.C(t, Model, "copyNodeDataFunction"), (this.iu = t), this.t("copyNodeDataFunction", i, t));
  }
  get copiesArrays() {
    return this.Tg;
  }
  set copiesArrays(t) {
    const i = this.Tg;
    i !== t && (t !== null && U.i(t, "boolean", Model, "copiesArrays"), (this.Tg = t), this.t("copiesArrays", i, t));
  }
  get copiesArrayObjects() {
    return this.Lg;
  }
  set copiesArrayObjects(t) {
    const i = this.Lg;
    i !== t &&
      (t !== null && U.i(t, "boolean", Model, "copiesArrayObjects"), (this.Lg = t), this.t("copiesArrayObjects", i, t));
  }
  get copiesKey() {
    return this.Dg;
  }
  set copiesKey(t) {
    const i = this.Dg;
    i !== t && (t !== null && U.i(t, "boolean", Model, "copiesKey"), (this.Dg = t), this.t("copiesKey", i, t));
  }
  copyNodeData(t) {
    let i = null;
    const e = this.iu;
    return (e !== null ? (i = e(t, this)) : (i = this.XS(t, !0)), i);
  }
  XS(t, i) {
    if (U.it(t))
      if (Array.isArray(t))
        if (this.copiesArrays) {
          const e = t,
            s = [];
          for (let n = 0; n < e.length; n++) {
            const o = e[n],
              r = this.XS(o, this.copiesArrayObjects);
            s.push(r);
          }
          return s;
        } else return t;
      else {
        if (t instanceof Point || t instanceof Size || t instanceof Rect || t instanceof Margin || t instanceof Spot)
          return t.copy();
        if (i) {
          const e = t,
            s = e.constructor,
            n = s ? new s() : {},
            o = !this.copiesKey && typeof this.nodeKeyProperty == "string" ? this.nodeKeyProperty : null;
          for (const r in e) {
            if (r === "__idlhashid") {
              n.__idlhashid = void 0;
              continue;
            }
            if (r === o) {
              n[o] = void 0;
              continue;
            }
            const l = this.It(e, r);
            if (!U.it(l)) n[r] = l;
            else if (Model.eA(e, r, l)) this.at(n, r, l);
            else {
              const h = this.XS(l, !1);
              this.at(n, r, h);
            }
          }
          return n;
        } else return t;
      }
    else return t;
  }
  get afterCopyFunction() {
    return this.Fg;
  }
  set afterCopyFunction(t) {
    const i = this.Fg;
    i !== t && (t !== null && U.C(t, Model, "afterCopyFunction"), (this.Fg = t), this.t("afterCopyFunction", i, t));
  }
  static eA(t, i, e) {
    const s = U.Jn(e);
    return e instanceof Model ||
      e instanceof UndoManager ||
      e instanceof Transaction ||
      e instanceof ChangedEvent ||
      e instanceof GraphObject ||
      e instanceof RowColumnDefinition ||
      e instanceof Diagram ||
      e instanceof EventTarget ||
      s === "Layer" ||
      s === "RowColumnDefinition" ||
      s.indexOf("Animation") >= 0 ||
      s.indexOf("Tool") >= 0 ||
      s.indexOf("CommandHandler") >= 0 ||
      s.indexOf("Layout") >= 0
      ? (Debug &&
          i[0] !== "_" &&
          (t &&
            i &&
            U.ot(
              'Warning: found GraphObject or Diagram or HTML DOM reference when copying model data on property "' +
                i +
                '" of data object: ' +
                t.toString(),
            ),
          U.ot(
            `  
Model data should not have any references to a Diagram or any part of a diagram, such as: ` + e.toString(),
          )),
        !0)
      : !1;
  }
  static nI = !1;
  setDataProperty(t, i, e) {
    if (
      (Debug &&
        (U.Ro(t, Model, "setDataProperty:data"),
        U.i(i, "string", Model, "setDataProperty:propname"),
        i === "" &&
          U.n("Model.setDataProperty: property name must not be an empty string when setting " + t + " to " + e)),
      this.containsNodeData(t))
    ) {
      if (i === this.nodeKeyProperty) {
        this.setKeyForNodeData(t, e);
        return;
      } else if (i === this.nodeCategoryProperty) {
        this.setCategoryForNodeData(t, e);
        return;
      }
    } else
      !Model.nI &&
        t instanceof GraphObject &&
        ((Model.nI = !0),
        U.ot('Model.setDataProperty is modifying a GraphObject, "' + t.toString() + '"'),
        U.ot("  Is that really your intent?"));
    const s = this.It(t, i);
    s !== e && (this.at(t, i, e), this.raiseDataChanged(t, i, s, e));
  }
  set(t, i, e) {
    this.setDataProperty(t, i, e);
  }
  assignAllDataProperties(t, i) {
    if (!i) return;
    const e = this.containsNodeData(t);
    for (const s in i) s !== "__idlhashid" && ((e && s === this.nodeKeyProperty) || this.setDataProperty(t, s, i[s]));
  }
  addArrayItem(t, i) {
    this.insertArrayItem(t, -1, i);
  }
  insertArrayItem(t, i, e) {
    (Debug &&
      (this.gw(t, Model, "insertArrayItem:arr"),
      U.r(i, Model, "insertArrayItem:idx"),
      t === this.Te &&
        U.n("Model.insertArrayItem or Model.addArrayItem should not be called on the Model.nodeDataArray")),
      i < 0 && (i = t.length),
      (t = this.ur(t, i, e)),
      this.Bt("", 3, "", t, null, e, null, i));
  }
  removeArrayItem(t, i) {
    (i === void 0 && (i = -1),
      Debug && (this.gw(t, Model, "removeArrayItem:arr"), U.r(i, Model, "removeArrayItem:idx")),
      t === this.Te && U.n("Model.removeArrayItem should not be called on the Model.nodeDataArray"),
      i === -1 && (i = t.length - 1));
    const e = t[i];
    ((t = this.Lo(t, i)), this.Bt("", 4, "", t, e, null, i, null));
  }
  get nodeCategoryProperty() {
    return this.df;
  }
  set nodeCategoryProperty(t) {
    const i = this.df;
    i !== t && (this.Gn(t, Model, "nodeCategoryProperty"), (this.df = t), this.t("nodeCategoryProperty", i, t));
  }
  getCategoryForNodeData(t) {
    if (t === null) return "";
    const i = this.df;
    if (i === "") return "";
    const e = this.It(t, i);
    if (e === void 0) return "";
    if (typeof e == "string") return e;
    U.n("getCategoryForNodeData found a non-string category for " + t + ": " + e);
  }
  setCategoryForNodeData(t, i) {
    if ((U.i(i, "string", Model, "setCategoryForNodeData:cat"), t === null)) return;
    const e = this.df;
    if (e === "") return;
    if (!this.containsNodeData(t)) {
      this.at(t, e, i);
      return;
    }
    let s = this.It(t, e);
    (s === void 0 && (s = ""), s !== i && (this.at(t, e, i), this.Bt("nodeCategory", 2, e, t, s, i)));
  }
  Og(t, i) {
    this.setCategoryForNodeData(i, this.getCategoryForNodeData(t));
  }
  get type() {
    return "Model";
  }
  Ix() {
    return !1;
  }
  yP() {
    return !1;
  }
  YF() {
    return !1;
  }
  _a() {
    return !1;
  }
  Rx() {
    return !1;
  }
  Sh() {
    return !1;
  }
  static S2() {
    return new Model();
  }
  It(t, i) {
    return Model.It(t, i);
  }
  static It(t, i) {
    if (!t || !i) return null;
    let e;
    try {
      U.lt(i) ? (e = i(t)) : U.lt(t.getAttribute) ? ((e = t.getAttribute(i)), e === null && (e = void 0)) : (e = t[i]);
    } catch (s) {
      Debug && U.ot("property get error: " + s.toString());
    }
    return e;
  }
  at(t, i, e) {
    Model.at(t, i, e);
  }
  static at(t, i, e) {
    if (!(!t || !i)) {
      try {
        U.lt(i) ? i(t, e) : U.lt(t.setAttribute) ? t.setAttribute(i, e) : (t[i] = e);
      } catch (s) {
        Debug && U.ot("property set error: " + s.toString());
      }
      return t;
    }
  }
  gw(t, i, e) {
    Array.isArray(t) || U.Li(t, "Array", i, e);
  }
  iI(t, i, e) {
    return ((t[i] = e), t);
  }
  ur(t, i, e) {
    return (i >= t.length ? t.push(e) : t.splice(i, 0, e), t);
  }
  Lo(t, i) {
    return (i >= t.length ? t.pop() : t.splice(i, 1), t);
  }
  static lA(t) {
    return Model.aA[t] ? Model.aA[t] : root.idl !== void 0 && root.idl[t] ? root.idl[t] : null;
  }
  static Al(t, i) {
    Model.aA[i] = t;
  }
  static aA = {};
}
((Model.fromJSON = Model.fromJson = Model.fromJson),
  Model.Al(Brush, "Brush"),
  Model.Al(Geometry, "Geometry"),
  Model.Al(Margin, "Margin"),
  Model.Al(Point, "Point"),
  Model.Al(Rect, "Rect"),
  Model.Al(Size, "Size"),
  Model.Al(Spot, "Spot"),
  Model.Al(Model, "Model"));
