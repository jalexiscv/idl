class GraphLinksModel extends Model {
  Xs;
  dr;
  zi;
  jh;
  eu;
  su;
  ql;
  Do;
  Fo;
  gf;
  mf;
  pf;
  gn;
  nu;
  Tl;
  constructor(t, i, e) {
    if (
      (super(),
      (this.Xs = []),
      (this.dr = new GSet()),
      (this.zi = new GMap()),
      (this.jh = ""),
      (this.eu = null),
      (this.su = null),
      (this.ql = null),
      (this.Do = "from"),
      (this.Fo = "to"),
      (this.gf = ""),
      (this.mf = ""),
      (this.pf = "category"),
      (this.gn = ""),
      (this.nu = "isGroup"),
      (this.Tl = "group"),
      i !== void 0 && (this.linkDataArray = i),
      t !== void 0 && (Array.isArray(t) ? (this.nodeDataArray = t) : (e = t)),
      e)
    ) {
      Object.assign(this, e);
      const s = e.Changed;
      s && (delete this.Changed, this.addChangedListener(s));
    }
  }
  cloneProtected(t) {
    (super.cloneProtected(t),
      (t.jh = this.jh),
      (t.eu = this.eu),
      (t.su = this.su),
      (t.Do = this.Do),
      (t.Fo = this.Fo),
      (t.gf = this.gf),
      (t.mf = this.mf),
      (t.pf = this.pf),
      (t.gn = this.gn),
      (t.nu = this.nu),
      (t.Tl = this.Tl));
  }
  clear() {
    ((this.Xs = []), this.zi.clear(), this.dr.clear(), super.clear());
  }
  toString(t) {
    if ((t === void 0 && (t = 0), t >= 2)) return this.toJson();
    {
      let i = (this.name !== "" ? this.name : "") + " GraphLinksModel";
      if (t > 0) {
        i += `
 node data:`;
        let e = this.nodeDataArray,
          s = e.length,
          n = 0;
        for (n = 0; n < s; n++) {
          const o = e[n];
          i += " " + this.getKeyForNodeData(o) + ":" + Binding.toString(o);
        }
        for (
          i += `
 link data:`,
            e = this.linkDataArray,
            s = e.length,
            n = 0;
          n < s;
          n++
        ) {
          const o = e[n];
          i += " " + this.He(o, !0) + "-->" + this.He(o, !1);
        }
      }
      return i;
    }
  }
  iA(t, i, e) {
    if (this.linkKeyProperty === "") {
      const c = this.skipsUndoManager;
      ((this.skipsUndoManager = !0), (this.linkKeyProperty = "key"), (this.skipsUndoManager = c));
    }
    let s = super.iA(t, i, e);
    const n = this,
      o = new GSet(),
      r = new GSet(),
      l = new GSet();
    t.changes.each((c) => {
      if (c.model === n) {
        if (c.modelChange === "linkDataArray") c.change === 3 ? o.add(c.newValue) : c.change === 4 && l.add(c.oldValue);
        else if (n.containsLinkData(c.object)) c.object !== null && r.add(c.object);
        else if (c.object !== null)
          if (c.object !== null && e.has(c.object)) {
            const u = e.get(c.object);
            u &&
              u.each((d) => {
                n.containsLinkData(d) && r.add(d);
              });
          } else {
            if (c.object instanceof Model || n.containsNodeData(c.object)) return;
            n.oI(c.object).each((d) => r.add(d));
          }
      }
    });
    const h = new GSet();
    o.each((c) => {
      const u = n.getKeyForLinkData(c);
      (u !== void 0 && h.add(u), i || r.add(c));
    });
    const a = new GSet();
    l.each((c) => {
      const u = n.getKeyForLinkData(c);
      (u !== void 0 && a.add(u), i && r.add(c));
    });
    const f = n.cloneDeep(r.toArray());
    return (
      h.count > 0 &&
        (s === null && (s = {}), i ? (s.removedLinkKeys = h.toArray()) : (s.insertedLinkKeys = h.toArray())),
      f.length > 0 && (s === null && (s = {}), (s.modifiedLinkData = f)),
      a.count > 0 &&
        (s === null && (s = {}), i ? (s.insertedLinkKeys = a.toArray()) : (s.removedLinkKeys = a.toArray())),
      s
    );
  }
  Rg() {
    const t = super.Rg();
    let i = "";
    return (
      this.linkCategoryProperty !== "category" &&
        typeof this.linkCategoryProperty == "string" &&
        (i +=
          `,
  "linkCategoryProperty": ` + this.quote(this.linkCategoryProperty)),
      this.linkKeyProperty !== "" &&
        typeof this.linkKeyProperty == "string" &&
        (i +=
          `,
  "linkKeyProperty": ` + this.quote(this.linkKeyProperty)),
      this.linkFromKeyProperty !== "from" &&
        typeof this.linkFromKeyProperty == "string" &&
        (i +=
          `,
  "linkFromKeyProperty": ` + this.quote(this.linkFromKeyProperty)),
      this.linkToKeyProperty !== "to" &&
        typeof this.linkToKeyProperty == "string" &&
        (i +=
          `,
  "linkToKeyProperty": ` + this.quote(this.linkToKeyProperty)),
      this.linkFromPortIdProperty !== "" &&
        typeof this.linkFromPortIdProperty == "string" &&
        (i +=
          `,
  "linkFromPortIdProperty": ` + this.quote(this.linkFromPortIdProperty)),
      this.linkToPortIdProperty !== "" &&
        typeof this.linkToPortIdProperty == "string" &&
        (i +=
          `,
  "linkToPortIdProperty": ` + this.quote(this.linkToPortIdProperty)),
      this.linkLabelKeysProperty !== "" &&
        typeof this.linkLabelKeysProperty == "string" &&
        (i +=
          `,
  "linkLabelKeysProperty": ` + this.quote(this.linkLabelKeysProperty)),
      this.nodeIsGroupProperty !== "isGroup" &&
        typeof this.nodeIsGroupProperty == "string" &&
        (i +=
          `,
  "nodeIsGroupProperty": ` + this.quote(this.nodeIsGroupProperty)),
      this.nodeGroupKeyProperty !== "group" &&
        typeof this.nodeGroupKeyProperty == "string" &&
        (i +=
          `,
  "nodeGroupKeyProperty": ` + this.quote(this.nodeGroupKeyProperty)),
      t + i
    );
  }
  cw(t) {
    (super.cw(t),
      t.linkKeyProperty && (this.linkKeyProperty = t.linkKeyProperty),
      t.linkFromKeyProperty && (this.linkFromKeyProperty = t.linkFromKeyProperty),
      t.linkToKeyProperty && (this.linkToKeyProperty = t.linkToKeyProperty),
      t.linkFromPortIdProperty && (this.linkFromPortIdProperty = t.linkFromPortIdProperty),
      t.linkToPortIdProperty && (this.linkToPortIdProperty = t.linkToPortIdProperty),
      t.linkCategoryProperty && (this.linkCategoryProperty = t.linkCategoryProperty),
      t.linkLabelKeysProperty && (this.linkLabelKeysProperty = t.linkLabelKeysProperty),
      t.nodeIsGroupProperty && (this.nodeIsGroupProperty = t.nodeIsGroupProperty),
      t.nodeGroupKeyProperty && (this.nodeGroupKeyProperty = t.nodeGroupKeyProperty));
  }
  sA() {
    const t = super.sA(),
      i =
        `,
  "linkDataArray": ` + this.Wh(this.linkDataArray, !0);
    return t + i;
  }
  nA(t) {
    super.nA(t);
    const i = t.linkDataArray;
    Array.isArray(i) && (this.replaceJsonObjects(i), (this.linkDataArray = i));
  }
  rI = `,
  "insertedLinkKeys": `;
  p4 = `,
  "modifiedLinkData": `;
  lI = `,
  "removedLinkKeys": `;
  oI(t) {
    const i = new GSet();
    for (let e = 0; e < this.linkDataArray.length; e++) {
      const s = this.linkDataArray[e];
      this.BS(t, s, s, i);
    }
    return i;
  }
  rA(t, i, e) {
    if (this.linkKeyProperty === "") {
      const c = this.skipsUndoManager;
      ((this.skipsUndoManager = !0), (this.linkKeyProperty = "key"), (this.skipsUndoManager = c));
    }
    const s = super.rA(t, i, e),
      n = this,
      o = new GSet(),
      r = new GSet(),
      l = new GSet();
    t.changes.each((c) => {
      if (c.model === n) {
        if (c.modelChange === "linkDataArray") c.change === 3 ? o.add(c.newValue) : c.change === 4 && l.add(c.oldValue);
        else if (n.containsLinkData(c.object)) c.object !== null && r.add(c.object);
        else if (c.object !== null)
          if (c.object !== null && e.has(c.object)) {
            const u = e.get(c.object);
            u &&
              u.each((d) => {
                n.containsLinkData(d) && r.add(d);
              });
          } else {
            if (c.object instanceof Model || n.containsNodeData(c.object)) return;
            n.oI(c.object).each((d) => r.add(d));
          }
      }
    });
    const h = new GSet();
    o.each((c) => {
      const u = n.getKeyForLinkData(c);
      (u !== void 0 && h.add(u), i || r.add(c));
    });
    const a = new GSet();
    l.each((c) => {
      const u = n.getKeyForLinkData(c);
      (u !== void 0 && a.add(u), i && r.add(c));
    });
    let f = s;
    return (
      h.count > 0 && (f += (i ? this.lI : this.rI) + this.Wh(h.toArray(), !0)),
      r.count > 0 && (f += this.p4 + this.Wh(r.toArray(), !0)),
      a.count > 0 && (f += (i ? this.rI : this.lI) + this.Wh(a.toArray(), !0)),
      f
    );
  }
  uw(t) {
    (((t.linkCategoryProperty !== void 0 && t.linkCategoryProperty !== this.linkCategoryProperty) ||
      (t.linkKeyProperty !== void 0 && t.linkKeyProperty !== this.linkKeyProperty) ||
      (t.linkFromKeyProperty !== void 0 && t.linkFromKeyProperty !== this.linkFromKeyProperty) ||
      (t.linkToKeyProperty !== void 0 && t.linkToKeyProperty !== this.linkToKeyProperty) ||
      (t.linkFromPortIdProperty !== void 0 && t.linkFromPortIdProperty !== this.linkFromPortIdProperty) ||
      (t.linkToPortIdProperty !== void 0 && t.linkToPortIdProperty !== this.linkToPortIdProperty) ||
      (t.linkLabelKeysProperty !== void 0 && t.linkLabelKeysProperty !== this.linkLabelKeysProperty) ||
      (t.nodeIsGroupProperty !== void 0 && t.nodeIsGroupProperty !== this.nodeIsGroupProperty) ||
      (t.nodeGroupKeyProperty !== void 0 && t.nodeGroupKeyProperty !== this.nodeGroupKeyProperty)) &&
      U.n("applyIncrementalJson cannot change Model properties"),
      super.uw(t));
    const i = t.insertedLinkKeys;
    if (Array.isArray(i)) {
      const n = i.length;
      for (let o = 0; o < n; o++) {
        const r = i[o];
        let l = this.findLinkDataForKey(r);
        l === null && ((l = this.copyLinkData({})), this.setKeyForLinkData(l, r), this.addLinkData(l));
      }
    }
    const e = t.modifiedLinkData;
    if (Array.isArray(e)) {
      const n = e.length;
      for (let o = 0; o < n; o++) {
        const r = e[o],
          l = this.getKeyForLinkData(r),
          h = this.findLinkDataForKey(l);
        if (h !== null) {
          for (const a in r) a === "__idlhashid" || a === this.linkKeyProperty || this.setDataProperty(h, a, r[a]);
          this.hI(r, h);
        }
      }
    }
    const s = t.removedLinkKeys;
    if (Array.isArray(s)) {
      const n = s.length;
      for (let o = 0; o < n; o++) {
        const r = s[o],
          l = this.findLinkDataForKey(r);
        l !== null && this.removeLinkData(l);
      }
    }
  }
  changeState(t, i) {
    if (!(t === null || t.model !== this)) {
      if (t.change === 2) {
        const e = t.object,
          s = t.propertyName;
        if (e !== null && s === this.linkKeyProperty && this.containsLinkData(e)) {
          const n = t.getValue(i),
            o = t.getValue(!i);
          (o !== void 0 && this.zi.delete(o), n !== void 0 && this.zi.set(n, e), this.at(e, s, n));
          return;
        }
      } else if (t.change === 3) {
        let e = t.newParam;
        if (t.modelChange === "linkDataArray") {
          const s = t.newValue;
          if (U.it(s) && typeof e == "number") {
            const n = this.getKeyForLinkData(s);
            i
              ? (this.dr.delete(s),
                this.Xs[e] === s && this.Lo(this.linkDataArray, e),
                n !== void 0 && this.zi.delete(n))
              : (this.dr.add(s), this.Xs[e] !== s && this.ur(this.Xs, e, s), n !== void 0 && this.zi.set(n, s));
          }
          return;
        } else if (t.modelChange === "linkLabelKeys") {
          const s = t.object,
            n = s !== null ? this.getLabelKeysForLinkData(s) : null;
          Array.isArray(n) &&
            typeof e == "number" &&
            (i
              ? ((e = n.indexOf(t.newValue)), e >= 0 && this.Lo(n, e))
              : n.indexOf(t.newValue) < 0 && this.ur(n, e, t.newValue));
          return;
        }
      } else if (t.change === 4) {
        let e = t.oldParam;
        if (t.modelChange === "linkDataArray") {
          const s = t.oldValue;
          if (U.it(s) && typeof e == "number") {
            const n = this.getKeyForLinkData(s);
            i
              ? (this.dr.add(s), this.Xs[e] !== s && this.ur(this.Xs, e, s), n !== void 0 && this.zi.set(n, s))
              : (this.dr.delete(s),
                this.Xs[e] === s && this.Lo(this.linkDataArray, e),
                n !== void 0 && this.zi.delete(n));
          }
          return;
        } else if (t.modelChange === "linkLabelKeys") {
          const s = t.object,
            n = s !== null ? this.getLabelKeysForLinkData(s) : null;
          Array.isArray(n) &&
            typeof e == "number" &&
            (i
              ? n.indexOf(t.oldValue) < 0 && this.ur(n, e, t.oldValue)
              : ((e = n.indexOf(t.oldValue)), e >= 0 && this.Lo(n, e)));
          return;
        }
      }
      super.changeState(t, i);
    }
  }
  get archetypeNodeData() {
    return this.ql;
  }
  set archetypeNodeData(t) {
    const i = this.ql;
    i !== t &&
      (t !== null && U.Ro(t, GraphLinksModel, "archetypeNodeData"), (this.ql = t), this.t("archetypeNodeData", i, t));
  }
  fA(t) {
    if (t === void 0) return;
    const i = this.ql;
    if (i !== null) {
      let e = this.findNodeDataForKey(t);
      e === null && ((e = this.copyNodeData(i)), this.at(e, this.nodeKeyProperty, t), this.addNodeData(e));
    }
    return t;
  }
  get linkFromKeyProperty() {
    return this.Do;
  }
  set linkFromKeyProperty(t) {
    const i = this.Do;
    i !== t && (this.Gn(t, GraphLinksModel, "linkFromKeyProperty"), (this.Do = t), this.t("linkFromKeyProperty", i, t));
  }
  getFromKeyForLinkData(t) {
    return this.He(t, !0);
  }
  setFromKeyForLinkData(t, i) {
    this.Ng(t, i, !0);
  }
  get linkToKeyProperty() {
    return this.Fo;
  }
  set linkToKeyProperty(t) {
    const i = this.Fo;
    i !== t && (this.Gn(t, GraphLinksModel, "linkToKeyProperty"), (this.Fo = t), this.t("linkToKeyProperty", i, t));
  }
  getToKeyForLinkData(t) {
    return this.He(t, !1);
  }
  setToKeyForLinkData(t, i) {
    this.Ng(t, i, !1);
  }
  He(t, i) {
    if (t === null) return;
    const e = i ? this.Do : this.Fo;
    if (e === "") return;
    const s = this.It(t, e);
    if (s !== void 0) {
      if (this.isKeyType(s)) return s;
      U.n((i ? "FromKey" : "ToKey") + " value for link data " + t + " is not a number or a string: " + s);
    }
  }
  Ng(t, i, e) {
    if (
      (i === null && (i = void 0),
      i !== void 0 &&
        !this.isKeyType(i) &&
        U.Li(i, "number or string", GraphLinksModel, e ? "setFromKeyForLinkData:key" : "setToKeyForLinkData:key"),
      t === null)
    )
      return;
    const s = e ? this.Do : this.Fo;
    if (s === "") return;
    if (((i = this.fA(i)), !this.containsLinkData(t))) {
      this.at(t, s, i);
      return;
    }
    const n = this.It(t, s);
    n !== i &&
      (this.un(n, t),
      this.at(t, s, i),
      this.findNodeDataForKey(i) === null && this.dn(i, t),
      this.Bt(e ? "linkFromKey" : "linkToKey", 2, s, t, n, i),
      typeof s == "string" && this.updateTargetBindings(t, s));
  }
  get linkFromPortIdProperty() {
    return this.gf;
  }
  set linkFromPortIdProperty(t) {
    const i = this.gf;
    i !== t &&
      (this.Gn(t, GraphLinksModel, "linkFromPortIdProperty"),
      Debug &&
        (t === this.linkFromKeyProperty || t === this.linkToKeyProperty) &&
        U.n(
          "linkFromPortIdProperty name must not be the same as the GraphLinksModel.linkFromKeyProperty or linkToKeyProperty: " +
            t,
        ),
      (this.gf = t),
      this.t("linkFromPortIdProperty", i, t));
  }
  getFromPortIdForLinkData(t) {
    return this.IS(t, !0);
  }
  setFromPortIdForLinkData(t, i) {
    this.Cg(t, i, !0);
  }
  get linkToPortIdProperty() {
    return this.mf;
  }
  set linkToPortIdProperty(t) {
    const i = this.mf;
    i !== t &&
      (this.Gn(t, GraphLinksModel, "linkToPortIdProperty"),
      Debug &&
        (t === this.linkFromKeyProperty || t === this.linkToKeyProperty) &&
        U.n(
          "linkFromPortIdProperty name must not be the same as the GraphLinksModel.linkFromKeyProperty or linkToKeyProperty: " +
            t,
        ),
      (this.mf = t),
      this.t("linkToPortIdProperty", i, t));
  }
  getToPortIdForLinkData(t) {
    return this.IS(t, !1);
  }
  setToPortIdForLinkData(t, i) {
    this.Cg(t, i, !1);
  }
  IS(t, i) {
    if (t === null) return "";
    const e = i ? this.gf : this.mf;
    if (e === "") return "";
    const s = this.It(t, e);
    return s === void 0 ? "" : s;
  }
  Cg(t, i, e) {
    if (
      (U.i(i, "string", GraphLinksModel, e ? "setFromPortIdForLinkData:portname" : "setToPortIdForLinkData:portname"),
      t === null)
    )
      return;
    const s = e ? this.gf : this.mf;
    if (s === "") return;
    if (!this.containsLinkData(t)) {
      this.at(t, s, i);
      return;
    }
    let n = this.It(t, s);
    (n === void 0 && (n = ""),
      n !== i &&
        (this.at(t, s, i),
        this.Bt(e ? "linkFromPortId" : "linkToPortId", 2, s, t, n, i),
        typeof s == "string" && this.updateTargetBindings(t, s)));
  }
  get linkLabelKeysProperty() {
    return this.gn;
  }
  set linkLabelKeysProperty(t) {
    const i = this.gn;
    i !== t &&
      (this.Gn(t, GraphLinksModel, "linkLabelKeysProperty"), (this.gn = t), this.t("linkLabelKeysProperty", i, t));
  }
  getLabelKeysForLinkData(t) {
    if (t === null) return GraphLinksModel.EmptyArray;
    const i = this.gn;
    if (i === "") return GraphLinksModel.EmptyArray;
    const e = this.It(t, i);
    return e === void 0 ? GraphLinksModel.EmptyArray : e;
  }
  setLabelKeysForLinkData(t, i) {
    if ((this.gw(i, GraphLinksModel, "setLabelKeysForLinkData:arr"), t === null)) return;
    const e = this.gn;
    if (e === "") return;
    if (!this.containsLinkData(t)) {
      this.at(t, e, i);
      return;
    }
    let s = this.It(t, e);
    if ((s === void 0 && (s = GraphLinksModel.EmptyArray), s !== i)) {
      if (Array.isArray(s)) {
        const o = s.length;
        for (let r = 0; r < o; r++) {
          const l = s[r];
          this.un(l, t);
        }
      }
      this.at(t, e, i);
      const n = i.length;
      for (let o = 0; o < n; o++) {
        const r = i[o];
        this.findNodeDataForKey(r) === null && this.dn(r, t);
      }
      (this.Bt("linkLabelKeys", 2, e, t, s, i), typeof e == "string" && this.updateTargetBindings(t, e));
    }
  }
  addLabelKeyForLinkData(t, i) {
    if (
      i == null ||
      (this.isKeyType(i) || U.Li(i, "number or string", GraphLinksModel, "addLabelKeyForLinkData:key"), t === null)
    )
      return;
    const e = this.gn;
    if (e === "") return;
    const s = this.It(t, e);
    if (s === void 0) {
      const n = [];
      (n.push(i), this.setLabelKeysForLinkData(t, n));
    } else if (Array.isArray(s)) {
      let n = s.indexOf(i);
      if (n >= 0) return;
      ((n = s.length),
        s.push(i),
        this.containsLinkData(t) &&
          (this.findNodeDataForKey(i) === null && this.dn(i, t), this.Bt("linkLabelKeys", 3, e, t, null, i, null, n)));
    } else U.n(e + " property is not an Array; cannot addLabelKeyForLinkData: " + t);
  }
  removeLabelKeyForLinkData(t, i) {
    if (
      i == null ||
      (this.isKeyType(i) || U.Li(i, "number or string", GraphLinksModel, "removeLabelKeyForLinkData:key"), t === null)
    )
      return;
    const e = this.gn;
    if (e === "") return;
    const s = this.It(t, e);
    if (Array.isArray(s)) {
      const n = s.indexOf(i);
      if (n < 0) return;
      (this.Lo(s, n), this.containsLinkData(t) && (this.un(i, t), this.Bt("linkLabelKeys", 4, e, t, i, null, n, null)));
    } else s !== void 0 && U.n(e + " property is not an Array; cannot removeLabelKeyforLinkData: " + t);
  }
  get linkDataArray() {
    return this.Xs;
  }
  set linkDataArray(t) {
    const i = this.Xs;
    if (i !== t) {
      (this.gw(t, GraphLinksModel, "linkDataArray"), this.zi.clear());
      const e = t.length;
      for (let n = 0; n < e; n++) {
        const o = t[n];
        U.it(o) || U.n("GraphLinksModel.linkDataArray must only contain Objects, not: " + o);
      }
      if (((this.Xs = t), this.linkKeyProperty !== "")) {
        const n = new List();
        for (let r = 0; r < e; r++) {
          const l = t[r],
            h = this.getKeyForLinkData(l);
          h === void 0 || this.zi.get(h) !== null ? n.add(l) : this.zi.set(h, l);
        }
        const o = n.iterator;
        for (; o.next(); ) {
          const r = o.value;
          this.makeLinkDataKeyUnique(r);
          const l = this.getKeyForLinkData(r);
          l !== void 0 && this.zi.set(l, r);
        }
      }
      const s = new GSet();
      for (let n = 0; n < e; n++) {
        const o = t[n];
        s.add(o);
      }
      ((this.dr = s), this.Bt("linkDataArray", 2, "linkDataArray", this, i, t));
      for (let n = 0; n < e; n++) {
        const o = t[n];
        this.cA(o);
      }
    }
  }
  get linkKeyProperty() {
    return this.jh;
  }
  set linkKeyProperty(t) {
    const i = this.jh;
    if (i !== t) {
      (this.Gn(t, GraphLinksModel, "linkKeyProperty"), (this.jh = t), this.zi.clear());
      const e = this.linkDataArray.length;
      for (let s = 0; s < e; s++) {
        const n = this.linkDataArray[s];
        let o = this.getKeyForLinkData(n);
        (o === void 0 && (this.makeLinkDataKeyUnique(n), (o = this.getKeyForLinkData(n))),
          o !== void 0 && this.zi.set(o, n));
      }
      this.t("linkKeyProperty", i, t);
    }
  }
  getKeyForLinkData(t) {
    if (t === null) return;
    const i = this.jh;
    if (i === "") return;
    const e = this.It(t, i);
    if (e !== void 0) {
      if (this.isKeyType(e)) return e;
      U.n("Key value for link data " + t + " is not a number or a string: " + e);
    }
  }
  setKeyForLinkData(t, i) {
    if (
      ((i == null || !this.isKeyType(i)) && U.Li(i, "number or string", GraphLinksModel, "setKeyForLinkData:key"),
      t === null)
    )
      return;
    const e = this.jh;
    if (e === "") return;
    if (!this.containsLinkData(t)) {
      this.at(t, e, i);
      return;
    }
    const s = this.It(t, e);
    if (s !== i) {
      if (this.findLinkDataForKey(i) !== null) return;
      (this.at(t, e, i),
        s !== void 0 && this.zi.delete(s),
        this.zi.set(i, t),
        this.Bt("linkKey", 2, e, t, s, i),
        typeof e == "string" && this.updateTargetBindings(t, e));
    }
  }
  get makeUniqueLinkKeyFunction() {
    return this.eu;
  }
  set makeUniqueLinkKeyFunction(t) {
    const i = this.eu;
    i !== t &&
      (t !== null && U.C(t, GraphLinksModel, "makeUniqueLinkKeyFunction"),
      (this.eu = t),
      this.t("makeUniqueLinkKeyFunction", i, t));
  }
  findLinkDataForKey(t) {
    return (
      t === null && U.n("GraphLinksModel.findLinkDataForKey:key must not be null"),
      t === void 0 || !this.isKeyType(t) ? null : this.zi.get(t)
    );
  }
  YS(t) {
    return t === void 0 ? !1 : this.zi.has(t);
  }
  makeLinkDataKeyUnique(t) {
    if (t === null) return;
    const i = this.jh;
    if (i === "") return;
    let e = this.getKeyForLinkData(t);
    if (e !== void 0 && !this.YS(e)) return;
    const s = this.eu;
    if (s !== null && ((e = s(this, t)), e != null && !this.YS(e))) {
      this.at(t, i, e);
      return;
    }
    if (typeof e == "string") {
      let n = 2;
      for (; this.YS(e + n); ) n++;
      this.at(t, i, e + n);
    } else if (e === void 0 || typeof e == "number") {
      let n = -this.zi.count - 1;
      for (; this.YS(n); ) n--;
      this.at(t, i, n);
    } else Debug && U.n("GraphLinksModel.getKeyForLinkData returned something other than a string or a number: " + e);
  }
  containsLinkData(t) {
    return t === null ? !1 : this.dr.has(t);
  }
  addLinkData(t) {
    t !== null && (this.containsLinkData(t) || this.HF(t, !0));
  }
  HF(t, i) {
    if (this.linkKeyProperty !== "") {
      let s = this.getKeyForLinkData(t);
      if (s === void 0) (this.makeLinkDataKeyUnique(t), (s = this.getKeyForLinkData(t)));
      else {
        if (this.zi.get(s) === t) return;
        (this.makeLinkDataKeyUnique(t), (s = this.getKeyForLinkData(t)));
      }
      (s === void 0 && U.n("GraphLinksModel.makeLinkDataKeyUnique failed on " + t + ". Data not added to model."),
        this.zi.set(s, t));
    }
    this.dr.add(t);
    let e = null;
    (i && ((e = this.Xs.length), this.ur(this.Xs, e, t)),
      this.Bt("linkDataArray", 3, "linkDataArray", this, null, t, null, e),
      this.cA(t));
  }
  addLinkDataCollection(t) {
    if (Array.isArray(t)) {
      const i = t.length;
      for (let e = 0; e < i; e++) this.addLinkData(t[e]);
    } else {
      const i = t.iterator;
      for (; i.next(); ) {
        const e = i.value;
        this.addLinkData(e);
      }
    }
  }
  removeLinkData(t) {
    t !== null && this.qF(t, !0);
  }
  qF(t, i) {
    this.dr.delete(t);
    const e = this.getKeyForLinkData(t);
    e !== void 0 && this.zi.delete(e);
    let s = null;
    if (i) {
      if (((s = this.Xs.indexOf(t)), s < 0)) return;
      this.Lo(this.Xs, s);
    }
    (this.Bt("linkDataArray", 4, "linkDataArray", this, t, null, s, null), this.y4(t));
  }
  removeLinkDataCollection(t) {
    if (Array.isArray(t)) {
      const i = t.length;
      for (let e = 0; e < i; e++) this.removeLinkData(t[e]);
    } else {
      const i = t.iterator;
      for (; i.next(); ) {
        const e = i.value;
        this.removeLinkData(e);
      }
    }
  }
  mergeLinkDataArray(t) {
    if (
      (this.linkKeyProperty === "" &&
        U.n("GraphLinksModel.linkKeyProperty must not be an empty string for .mergeLinkDataArray() to succeed."),
      t === this.linkDataArray || !Array.isArray(t))
    )
      return;
    const i = new GSet();
    i.addAll(this.zi.iteratorKeys);
    const e = new GSet(),
      s = t.length;
    for (let o = 0; o < s; o++) {
      const r = t[o],
        l = this.getKeyForLinkData(r);
      if (l !== void 0) {
        e.add(l);
        const h = this.findLinkDataForKey(l);
        if (h === r) continue;
        if (h !== null) (this.assignAllDataProperties(h, r), this.hI(r, h));
        else {
          const a = this.cloneDeep(r);
          (this.setKeyForLinkData(a, l), this.addLinkData(a));
        }
      } else {
        const h = this.cloneDeep(r);
        this.addLinkData(h);
        const a = this.getKeyForLinkData(h);
        a !== void 0 && e.add(a);
      }
    }
    const n = i.iterator;
    for (; n.next(); ) {
      const o = n.value;
      if (!e.has(o)) {
        const r = this.findLinkDataForKey(o);
        r && this.removeLinkData(r);
      }
    }
  }
  cA(t) {
    let i = this.He(t, !0);
    ((i = this.fA(i)),
      this.findNodeDataForKey(i) === null && this.dn(i, t),
      (i = this.He(t, !1)),
      (i = this.fA(i)),
      this.findNodeDataForKey(i) === null && this.dn(i, t));
    const e = this.getLabelKeysForLinkData(t);
    if (Array.isArray(e)) {
      const s = e.length;
      for (let n = 0; n < s; n++) ((i = e[n]), this.findNodeDataForKey(i) === null && this.dn(i, t));
    }
  }
  y4(t) {
    let i = this.He(t, !0);
    (this.un(i, t), (i = this.He(t, !1)), this.un(i, t));
    const e = this.getLabelKeysForLinkData(t);
    if (Array.isArray(e)) {
      const s = e.length;
      for (let n = 0; n < s; n++) ((i = e[n]), this.un(i, t));
    }
  }
  get copyLinkDataFunction() {
    return this.su;
  }
  set copyLinkDataFunction(t) {
    const i = this.su;
    i !== t &&
      (t !== null && U.C(t, GraphLinksModel, "copyLinkDataFunction"),
      (this.su = t),
      this.t("copyLinkDataFunction", i, t));
  }
  copyLinkData(t) {
    let i = null;
    const e = this.su;
    return (
      e !== null ? (i = e(t, this)) : (i = this.XS(t, !0)),
      U.it(i) &&
        (this.Do !== "" && this.at(i, this.Do, void 0),
        this.Fo !== "" && this.at(i, this.Fo, void 0),
        this.gn !== "" && this.at(i, this.gn, [])),
      i
    );
  }
  get nodeIsGroupProperty() {
    return this.nu;
  }
  set nodeIsGroupProperty(t) {
    const i = this.nu;
    i !== t && (this.Gn(t, GraphLinksModel, "nodeIsGroupProperty"), (this.nu = t), this.t("nodeIsGroupProperty", i, t));
  }
  isGroupForNodeData(t) {
    if (t === null) return !1;
    const i = this.nu;
    return i === "" ? !1 : !!this.It(t, i);
  }
  isGroupForData(t) {
    return this.isGroupForNodeData(t);
  }
  get nodeGroupKeyProperty() {
    return this.Tl;
  }
  set nodeGroupKeyProperty(t) {
    const i = this.Tl;
    i !== t &&
      (this.Gn(t, GraphLinksModel, "nodeGroupKeyProperty"), (this.Tl = t), this.t("nodeGroupKeyProperty", i, t));
  }
  getGroupKeyForNodeData(t) {
    if (t === null) return;
    const i = this.Tl;
    if (i === "") return;
    const e = this.It(t, i);
    if (e !== void 0) {
      if (this.isKeyType(e)) return e;
      U.n("GroupKey value for node data " + t + " is not a number or a string: " + e);
    }
  }
  getGroupForData(t) {
    return this.getGroupKeyForNodeData(t);
  }
  setGroupKeyForNodeData(t, i) {
    if (
      (i === null && (i = void 0),
      i !== void 0 && !this.isKeyType(i) && U.Li(i, "number or string", GraphLinksModel, "setGroupKeyForNodeData:key"),
      t === null)
    )
      return;
    const e = this.Tl;
    if (e === "") return;
    if (!this.containsNodeData(t)) {
      this.at(t, e, i);
      return;
    }
    const s = this.It(t, e);
    s !== i &&
      (this.un(s, t),
      this.at(t, e, i),
      this.findNodeDataForKey(i) === null && this.dn(i, t),
      this.Bt("nodeGroupKey", 2, e, t, s, i),
      typeof e == "string" && this.updateTargetBindings(t, e));
  }
  setGroupForData(t, i) {
    this.setGroupKeyForNodeData(t, i);
  }
  copyNodeData(t) {
    const i = super.copyNodeData(t);
    return (this.setGroupKeyForNodeData(i, void 0), i);
  }
  setDataProperty(t, i, e) {
    if (
      (Debug &&
        (U.Ro(t, GraphLinksModel, "setDataProperty:data"),
        U.i(i, "string", GraphLinksModel, "setDataProperty:propname"),
        i === "" &&
          U.n(
            "GraphLinksModel.setDataProperty: property name must not be an empty string when setting " + t + " to " + e,
          )),
      this.containsNodeData(t))
    )
      if (i === this.nodeKeyProperty) {
        this.setKeyForNodeData(t, e);
        return;
      } else if (i === this.nodeCategoryProperty) {
        this.setCategoryForNodeData(t, e);
        return;
      } else if (i === this.nodeGroupKeyProperty) {
        this.setGroupKeyForNodeData(t, e);
        return;
      } else
        Debug &&
          i === this.nodeIsGroupProperty &&
          U.n("GraphLinksModel.setDataProperty: property name must not be the nodeIsGroupProperty: " + i);
    else if (this.containsLinkData(t)) {
      if (i === this.linkFromKeyProperty) {
        this.Ng(t, e, !0);
        return;
      } else if (i === this.linkToKeyProperty) {
        this.Ng(t, e, !1);
        return;
      } else if (i === this.linkFromPortIdProperty) {
        this.Cg(t, e, !0);
        return;
      } else if (i === this.linkToPortIdProperty) {
        this.Cg(t, e, !1);
        return;
      } else if (i === this.linkKeyProperty) {
        this.setKeyForLinkData(t, e);
        return;
      } else if (i === this.linkCategoryProperty) {
        this.setCategoryForLinkData(t, e);
        return;
      } else if (i === this.linkLabelKeysProperty) {
        this.setLabelKeysForLinkData(t, e);
        return;
      }
    }
    const s = this.It(t, i);
    s !== e && (this.at(t, i, e), this.raiseDataChanged(t, i, s, e));
  }
  assignAllDataProperties(t, i) {
    if (!i) return;
    const e = this.containsNodeData(t),
      s = this.containsLinkData(t);
    for (const n in i)
      if (n !== "__idlhashid" && !(e && n === this.nodeKeyProperty)) {
        {
          if (e && n === this.nodeIsGroupProperty && this.It(t, n) === i[n]) continue;
          if (s && n === this.linkKeyProperty) continue;
        }
        this.setDataProperty(t, n, i[n]);
      }
  }
  dw(t, i) {
    super.dw(t, i);
    const e = this.Mi.iterator;
    for (; e.next(); ) {
      const n = e.value;
      this.uA(n, t, i);
    }
    const s = this.dr.iterator;
    for (; s.next(); ) {
      const n = s.value;
      this.w4(n, t, i);
    }
  }
  uA(t, i, e) {
    if (this.getGroupKeyForNodeData(t) === i) {
      const n = this.Tl;
      (this.at(t, n, e),
        this.Bt("nodeGroupKey", 2, n, t, i, e),
        typeof n == "string" && this.updateTargetBindings(t, n));
    }
  }
  w4(t, i, e) {
    if (this.He(t, !0) === i) {
      const r = this.Do;
      (this.at(t, r, e),
        this.Bt("linkFromKey", 2, r, t, i, e),
        typeof r == "string" && this.updateTargetBindings(t, r));
    }
    if (this.He(t, !1) === i) {
      const r = this.Fo;
      (this.at(t, r, e), this.Bt("linkToKey", 2, r, t, i, e), typeof r == "string" && this.updateTargetBindings(t, r));
    }
    const o = this.getLabelKeysForLinkData(t);
    if (Array.isArray(o)) {
      const r = o.length,
        l = this.gn;
      for (let h = 0; h < r; h++) o[h] === i && (this.iI(o, h, e), this.Bt("linkLabelKeys", 3, l, t, i, e, h, h));
    }
  }
  hA() {
    super.hA();
    const t = this.linkDataArray,
      i = t.length;
    for (let e = 0; e < i; e++) {
      const s = t[e];
      this.cA(s);
    }
  }
  Eg(t) {
    super.Eg(t);
    const i = this.getKeyForNodeData(t),
      e = this.lw(i);
    if (e !== null) {
      const s = U.ht(),
        n = e.iterator;
      for (; n.next(); ) {
        const o = n.value;
        if (this.containsNodeData(o)) {
          if (this.getGroupKeyForNodeData(o) === i) {
            const l = this.Tl;
            (this.Bt("nodeGroupKey", 2, l, o, i, i),
              typeof l == "string" && this.updateTargetBindings(o, l),
              s.push(o));
          }
        } else {
          if (this.He(o, !0) === i) {
            const a = this.Do;
            (this.Bt("linkFromKey", 2, a, o, i, i), typeof a == "string" && this.updateTargetBindings(o, a), s.push(o));
          }
          if (this.He(o, !1) === i) {
            const a = this.Fo;
            (this.Bt("linkToKey", 2, a, o, i, i), typeof a == "string" && this.updateTargetBindings(o, a), s.push(o));
          }
          const h = this.getLabelKeysForLinkData(o);
          if (Array.isArray(h)) {
            const a = h.length,
              f = this.gn;
            for (let c = 0; c < a; c++) h[c] === i && (this.Bt("linkLabelKeys", 3, f, o, i, i, c, c), s.push(o));
          }
        }
      }
      for (let o = 0; o < s.length; o++) this.un(i, s[o]);
      U.et(s);
    }
  }
  Vg(t) {
    super.Vg(t);
    const i = this.getGroupKeyForNodeData(t);
    this.findNodeDataForKey(i) === null && this.dn(i, t);
  }
  mw(t) {
    super.mw(t);
    const i = this.getGroupKeyForNodeData(t);
    this.un(i, t);
  }
  get linkCategoryProperty() {
    return this.pf;
  }
  set linkCategoryProperty(t) {
    const i = this.pf;
    i !== t &&
      (this.Gn(t, GraphLinksModel, "linkCategoryProperty"), (this.pf = t), this.t("linkCategoryProperty", i, t));
  }
  getCategoryForLinkData(t) {
    if (t === null) return "";
    const i = this.pf;
    if (i === "") return "";
    const e = this.It(t, i);
    if (e === void 0) return "";
    if (typeof e == "string") return e;
    U.n("getCategoryForLinkData found a non-string category for " + t + ": " + e);
  }
  getLinkCategoryForData(t) {
    return this.getCategoryForLinkData(t);
  }
  setCategoryForLinkData(t, i) {
    if ((U.i(i, "string", GraphLinksModel, "setCategoryForLinkData:cat"), t === null)) return;
    const e = this.pf;
    if (e === "") return;
    if (!this.containsLinkData(t)) {
      this.at(t, e, i);
      return;
    }
    let s = this.It(t, e);
    (s === void 0 && (s = ""),
      s !== i &&
        (this.at(t, e, i),
        this.Bt("linkCategory", 2, e, t, s, i),
        typeof e == "string" && this.updateTargetBindings(t, e)));
  }
  setLinkCategoryForData(t, i) {
    this.setCategoryForLinkData(t, i);
  }
  Og(t, i) {
    (super.Og(t, i), this.setGroupKeyForNodeData(i, this.getGroupKeyForNodeData(t)));
  }
  hI(t, i) {
    (this.setCategoryForLinkData(i, this.getCategoryForLinkData(t)),
      this.setFromKeyForLinkData(i, this.getFromKeyForLinkData(t)),
      this.setToKeyForLinkData(i, this.getToKeyForLinkData(t)),
      this.setLabelKeysForLinkData(i, this.getLabelKeysForLinkData(t)),
      this.setFromPortIdForLinkData(i, this.getFromPortIdForLinkData(t)),
      this.setToPortIdForLinkData(i, this.getToPortIdForLinkData(t)));
  }
  get type() {
    return "GraphLinksModel";
  }
  yP() {
    return !0;
  }
  _a() {
    return !0;
  }
  Rx() {
    return !0;
  }
  Sh() {
    return !0;
  }
  static EmptyArray = Object.freeze([]);
}
(Model.Al(GraphLinksModel, "GraphLinksModel"),
  (Model.tI = () => new GraphLinksModel()),
  (Model.S2 = () => new GraphLinksModel()));
