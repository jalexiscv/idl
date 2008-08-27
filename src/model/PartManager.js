class PartManager {
  kg;
  fn;
  Dt;
  To;
  Pg;
  Mg;
  f;
  vC;
  constructor() {
    ((this.kg = new GSet()),
      (this.fn = new GSet()),
      (this.Dt = new GSet()),
      (this.To = new GMap()),
      (this.Pg = new GMap()),
      (this.Mg = new GMap()),
      (this.f = null),
      (this.vC = !1));
  }
  clear() {
    (this.kg.clear(), this.fn.clear(), this.Dt.clear(), this.To.clear(), this.Pg.clear(), this.Mg.clear());
  }
  Yo(t) {
    this.f = t;
  }
  ma(t) {
    if (t instanceof Node) {
      if ((this.kg.add(t), t instanceof Group)) {
        const e = t.containingGroup;
        e === null ? this.diagram.il.add(t) : e.Fa.add(t);
        const s = t.layout;
        s !== null && (s.diagram = this.diagram);
      }
    } else
      t instanceof Link
        ? (this.fn.add(t), t.isAvoiding && (this.diagram.a0 = !0))
        : t instanceof Adornment || this.Dt.add(t);
    const i = t.data;
    i !== null && (t instanceof Adornment || (t instanceof Link ? this.LF(i, t) : this.To.set(i, t)));
  }
  ae(t) {
    if ((t.clearAdornments(), t instanceof Node)) {
      if ((this.kg.delete(t), t instanceof Group)) {
        const e = t.containingGroup;
        e === null ? this.diagram.il.delete(t) : e.Fa.delete(t);
        const s = t.layout;
        s !== null && (s.diagram = null);
      }
    } else t instanceof Link ? this.fn.delete(t) : t instanceof Adornment || this.Dt.delete(t);
    const i = t.data;
    i !== null && (t instanceof Adornment || (t instanceof Link ? this.DF(i, t) : this.To.delete(i)));
  }
  LF(t, i) {
    this.Pg.set(t, i);
  }
  DF(t, i) {
    this.Pg.delete(t);
  }
  rebuildParts() {
    const t = this.diagram;
    if (t === null) return;
    const i = t.nodeTemplateMap.iterator;
    for (; i.next(); ) {
      const u = i.value,
        d = i.key;
      (!u.Oe() || u instanceof Group) &&
        U.n(
          `Invalid node template in Diagram.nodeTemplateMap: template for "${d}" must be a Node or a simple Part, not a Group or Link: ${u}`,
        );
    }
    const e = t.groupTemplateMap.iterator;
    for (; e.next(); ) {
      const u = e.value,
        d = e.key;
      u instanceof Group ||
        U.n(
          `Invalid group template in Diagram.groupTemplateMap: template for "${d}" must be a Group, not a normal Node or Link: ${u}`,
        );
    }
    const s = t.linkTemplateMap.iterator;
    for (; s.next(); ) {
      const u = s.value,
        d = s.key;
      u instanceof Link ||
        U.n(
          `Invalid link template in Diagram.linkTemplateMap: template for "${d}" must be a Link, not a normal Node or simple Part: ${u}`,
        );
    }
    const n = U.ht(),
      o = t.selection.iterator;
    for (; o.next(); ) {
      const d = o.value.data;
      d && n.push(d);
    }
    const r = U.ht(),
      l = t.highlighteds.iterator;
    for (; l.next(); ) {
      const d = l.value.data;
      d && r.push(d);
    }
    const h = U.ht(),
      a = this.nodes.iterator;
    for (; a.next(); ) {
      const u = a.value;
      u.data !== null && (h.push(u.data), h.push(u.location));
    }
    const f = this.links.iterator;
    for (; f.next(); ) {
      const u = f.value;
      u.data !== null && (h.push(u.data), h.push(u.location));
    }
    const c = this.parts.iterator;
    for (; c.next(); ) {
      const u = c.value;
      u.data !== null && (h.push(u.data), h.push(u.location));
    }
    (this.FF(), this.V2());
    for (let u = 0; u < n.length; u++) {
      const d = this.findPartForData(n[u]);
      d !== null && (d.isSelected = !0);
    }
    for (let u = 0; u < r.length; u++) {
      const d = this.findPartForData(r[u]);
      d !== null && (d.isHighlighted = !0);
    }
    for (let u = 0; u < h.length; u += 2) {
      const d = this.findPartForData(h[u]);
      d !== null && (d.location = h[u + 1]);
    }
    (U.et(n), U.et(r), U.et(h));
  }
  V2() {
    const t = this.diagram.model;
    this.nw(t.nodeDataArray);
  }
  nw(t, i) {
    const e = this.diagram.model;
    (t.forEach((s) => {
      e.containsNodeData(s) && this.IF(s, !1);
    }),
      t.forEach((s) => {
        e.containsNodeData(s) && this.LS(s);
      }),
      i !== !1 && this.diagram.pb(!1));
  }
  IF(t, i) {
    if (t == null || this.diagram.undoManager.isUndoingRedoing || this.To.has(t)) return null;
    i === void 0 && (i = !0);
    const e = this.h4(t);
    return (e !== null && i && this.LS(t), e);
  }
  h4(t) {
    if (t == null || this.diagram.undoManager.isUndoingRedoing || this.To.has(t)) return null;
    const i = this.a4(t),
      e = this.findTemplateForNodeData(t, i);
    if (e !== null) {
      e.Yt();
      const s = e.copy();
      if (s !== null) {
        const n = this.diagram.Se;
        return (
          (this.diagram.Se = !0),
          (s.sr = i),
          (s.oi = t),
          this.addsToTemporaryLayer && (s.xl = "Tool"),
          this.diagram.add(s),
          (s.oi = null),
          (s.data = t),
          (this.diagram.Se = n),
          s
        );
      }
    }
    return null;
  }
  insertLink(t, i, e, s) {
    return null;
  }
  LS(t) {}
  a4(t) {
    return this.diagram.model.getCategoryForNodeData(t);
  }
  static RF = !1;
  static OF = !1;
  findTemplateForNodeData(t, i) {
    const e = this.diagram,
      s = e.model,
      n = s.Sh() && s.isGroupForData(t);
    let o = null;
    return (
      n
        ? ((o = e.groupTemplateMap.get(i)),
          o === null &&
            ((o = e.groupTemplateMap.get("")),
            o === null &&
              (PartManager.OF ||
                ((PartManager.OF = !0),
                U.ot('No Group template found for category "' + i + '"'),
                U.ot("  Using default group template")),
              (o = e.a2))))
        : ((o = e.nodeTemplateMap.get(i)),
          o === null &&
            ((o = e.nodeTemplateMap.get("")),
            o === null &&
              (PartManager.RF ||
                ((PartManager.RF = !0),
                U.ot('No Node template found for category "' + i + '"'),
                U.ot("  Using default node template")),
              (o = e.o2)))),
      o
    );
  }
  getLinkCategoryForData(t) {
    return "";
  }
  setLinkCategoryForData(t, i) {}
  setFromNodeForLink(t, i, e) {}
  setToNodeForLink(t, i, e) {}
  static EF = !1;
  findLinkTemplateForCategory(t) {
    const i = this.diagram;
    let e = i.linkTemplateMap.get(t);
    return (
      e === null &&
        ((e = i.linkTemplateMap.get("")),
        e === null &&
          (PartManager.EF ||
            ((PartManager.EF = !0),
            U.ot('No Link template found for category "' + t + '"'),
            U.ot("  Using default link template")),
          (e = i.l2))),
      e
    );
  }
  t3(t, i, e) {
    t instanceof Link
      ? (i !== null && this.DF(i, t), e !== null && this.LF(e, t))
      : t instanceof Part && (i !== null && this.To.delete(i), e !== null && this.To.set(e, t));
  }
  FF() {
    const t = this.diagram.model;
    this.WC(t.nodeDataArray);
  }
  WC(t) {
    t.forEach((i) => {
      this.DS(i);
    });
  }
  DS(t) {
    const i = this.findPartForData(t);
    i !== null && (this.diagram.R2(i, !1), this.jC(i));
  }
  jC(t) {}
  OC(t) {}
  findPartForKey(t) {
    if (t == null) return null;
    const e = this.diagram.model.findNodeDataForKey(t);
    return e !== null ? this.To.get(e) : null;
  }
  findNodeForKey(t) {
    if (t == null) return null;
    const e = this.diagram.model.findNodeDataForKey(t);
    if (e === null) return null;
    const s = this.To.get(e);
    return s instanceof Node ? s : null;
  }
  findLinkForKey(t) {
    return null;
  }
  findPartForData(t) {
    if (t === null) return null;
    let i = this.To.get(t);
    return (i !== null || (i = this.Pg.get(t)), i);
  }
  findNodeForData(t) {
    if (t === null) return null;
    const i = this.To.get(t);
    return i instanceof Node ? i : null;
  }
  findLinkForData(t, i) {
    return t === null ? null : this.Pg.get(t);
  }
  findNodesByExample(...t) {
    const i = new GSet(),
      e = this.kg.iterator;
    for (; e.next(); ) {
      const s = e.value,
        n = s.data;
      if (n !== null)
        for (let o = 0; o < arguments.length; o++) {
          const r = arguments[o];
          if (U.it(r) && this.JC(n, r)) {
            i.add(s);
            break;
          }
        }
    }
    return i.iterator;
  }
  findLinksByExample(...t) {
    const i = new GSet(),
      e = this.fn.iterator;
    for (; e.next(); ) {
      const s = e.value,
        n = s.data;
      if (n !== null)
        for (let o = 0; o < arguments.length; o++) {
          const r = arguments[o];
          if (U.it(r) && this.JC(n, r)) {
            i.add(s);
            break;
          }
        }
    }
    return i.iterator;
  }
  JC(t, i) {
    for (const e in i) {
      const s = t[e],
        n = i[e];
      if (Array.isArray(n)) {
        if (!Array.isArray(s)) return !1;
        const o = s,
          r = n;
        if (o.length < r.length) return !1;
        for (let l = 0; l < o.length; l++) {
          const h = o[l],
            a = r[l];
          if (a !== void 0 && !this.VF(h, a)) return !1;
        }
      } else if (!this.VF(s, n)) return !1;
    }
    return !0;
  }
  VF(t, i) {
    if (U.lt(i)) {
      if (!i(t)) return !1;
    } else if (i instanceof RegExp) {
      if (!t || !i.test(t.toString())) return !1;
    } else if (U.it(t) && U.it(i)) {
      if (!this.JC(t, i)) return !1;
    } else if (t !== i) return !1;
    return !0;
  }
  doModelDataChanged(t) {
    if (t.model === this.diagram.model && this.diagram.H) {
      this.diagram.H = !1;
      try {
        const i = t.change;
        t.modelChange === "" && t.object !== null && i === 2 && this.ow(t.object, t.propertyName);
      } finally {
        this.diagram.H = !0;
      }
    }
  }
  doModelChanged(t) {
    const i = this.diagram;
    if (!i || t.model !== i.model) return;
    const e = t.change;
    if ((i.EO(t), !!i.H)) {
      i.H = !1;
      try {
        const s = t.modelChange;
        if (s !== "")
          if (e === 2) {
            if (s === "nodeCategory") {
              const n = t.object;
              if (n !== null) {
                const o = this.findPartForData(n),
                  r = t.newValue;
                o !== null && typeof r == "string" && (o.category = r);
              }
            } else if (s === "nodeDataArray") {
              const n = t.oldValue;
              this.WC(n);
              const o = t.newValue;
              this.nw(o);
            }
            i.isModified = !0;
          } else if (e === 3) {
            const n = t.newValue;
            (s === "nodeDataArray" && U.it(n) && this.IF(n), (i.isModified = !0));
          } else if (e === 4) {
            const n = t.oldValue;
            (s === "nodeDataArray" && U.it(n) && this.DS(n), (i.isModified = !0));
          } else
            e === 1 &&
              (s === "SourceChanged"
                ? t.object !== null
                  ? this.ow(t.object, t.propertyName)
                  : (this.updateAllRelationshipsFromData(), this.updateAllTargetBindings())
                : s === "ModelDisplaced" && this.rebuildParts());
        else if (e === 2) {
          const n = t.propertyName,
            o = t.object,
            r = i.model;
          (o === r
            ? (n === "nodeKeyProperty" || n === "nodeCategoryProperty") &&
              (i.undoManager.isUndoingRedoing || this.rebuildParts())
            : o !== null && this.ow(o, n),
            (i.isModified = !0));
        } else (e === 3 || e === 4) && (this.f4(t, i.model), (i.isModified = !0));
      } finally {
        i.H = !0;
      }
    }
  }
  updateAllTargetBindings(t) {
    t === void 0 && (t = "");
    let i = this.parts.iterator;
    for (; i.next(); ) i.value.updateTargetBindings(t);
    for (i = this.nodes.iterator; i.next(); ) i.value.updateTargetBindings(t);
    for (i = this.links.iterator; i.next(); ) i.value.updateTargetBindings(t);
  }
  updateAllThemeBindings() {
    let t = this.parts.iterator;
    for (; t.next(); ) t.value.Wo();
    for (t = this.nodes.iterator; t.next(); ) t.value.Wo();
    for (t = this.links.iterator; t.next(); ) t.value.Wo();
  }
  updateAllRelationshipsFromData() {
    const t = this.diagram.model,
      i = new GSet(),
      e = t.nodeDataArray;
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      i.add(r);
    }
    const s = [];
    (this.nodes.each((o) => {
      o.data !== null && !i.has(o.data) && s.push(o.data);
    }),
      this.parts.each((o) => {
        o.data !== null && !i.has(o.data) && s.push(o.data);
      }),
      s.forEach((o) => t.BF(o, !1)));
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      this.findPartForData(r) === null && t.zF(r, !1);
    }
    this.XF();
    let n = this.parts.iterator;
    for (; n.next(); ) n.value.updateRelationshipsFromData();
    for (n = this.nodes.iterator; n.next(); ) n.value.updateRelationshipsFromData();
    for (n = this.links.iterator; n.next(); ) n.value.updateRelationshipsFromData();
  }
  XF() {}
  updateRelationshipsFromData(t) {}
  ow(t, i) {
    if (typeof i == "string") {
      const e = this.findPartForData(t);
      if (e !== null) e.updateTargetBindings(i);
      else {
        const s = this.c4(t);
        if (s !== null && s.length > 0) {
          for (let o = 0; o < s.length; o++) s[o].updateTargetBindings(i);
          const n = s[0].part;
          if (n !== null) {
            const o = n.adornments;
            for (; o.next(); ) o.value.updateTargetBindings(i);
          }
          U.et(s);
        }
      }
      t === this.diagram.model.modelData && this.updateAllTargetBindings(i);
    }
  }
  c4(t) {
    let i = null;
    const e = this.Mg.iterator;
    for (; e.next(); ) {
      const s = e.value;
      for (let n = 0; n < s.length; n++) {
        const r = s[n].findItemPanelForData(t);
        r !== null && (i === null && (i = U.ht()), i.push(r));
      }
      if (i !== null) break;
    }
    return i;
  }
  $C(t) {
    return this.Mg.get(t);
  }
  f4(t, i) {
    const e = t.object;
    if (!Array.isArray(e)) return;
    const s = t.change === 3,
      n = s ? t.newParam : t.oldParam,
      o = s ? t.newValue : t.oldValue,
      r = this.$C(e);
    if (Array.isArray(r))
      for (let l = 0; l < r.length; l++) {
        const h = r[l];
        s ? h.eS(o, n, !0) : h.s3(n);
      }
  }
  F2(t, i) {
    i !== null && t.Ln((s) => i.yL(s));
    const e = t.Eh;
    if (Array.isArray(e)) {
      const s = this.$C(e);
      if (s === null) this.Mg.set(e, [t]);
      else {
        for (let n = 0; n < s.length; n++) if (s[n] === t) return;
        s.push(t);
      }
    }
  }
  I2(t, i) {
    t.Ln((s) => i.BO(s));
    const e = t.Eh;
    if (Array.isArray(e)) {
      const s = this.$C(e);
      if (s !== null) {
        for (let n = 0; n < s.length; n++)
          if (s[n] === t) {
            (s.splice(n, 1), s.length === 0 && this.Mg.delete(e));
            return;
          }
      }
    }
  }
  copyParts(t, i, e) {
    e === void 0 && (e = !1);
    const s = new GMap();
    if (Array.isArray(t)) for (let o = 0; o < t.length; o++) this.FS(t[o], i, s, e);
    else {
      const o = t.iterator;
      for (; o.next(); ) this.FS(o.value, i, s, e);
    }
    if (i !== null) {
      const o = i.model,
        r = i.D0().dragsLink,
        l = new GSet(),
        h = new GMap(),
        a = s.iterator;
      for (; a.next(); ) {
        const f = a.value;
        if (f instanceof Link) !r && (f.fromNode === null || f.toNode === null) && l.add(f);
        else if (f instanceof Node && f.data !== null) {
          if (o.Ix()) {
            const c = f,
              u = a.key,
              d = u.findTreeParentNode();
            if (d !== null) {
              const m = s.get(d);
              if (m !== null) {
                o.setParentKeyForNodeData(c.data, o.getKeyForNodeData(m.data));
                const g = i.findLinkForData(c.data),
                  p = u.findTreeParentLink();
                p !== null && g !== null && h.set(p, g);
              }
            }
          } else if (o.YF()) {
            const c = f,
              u = a.key,
              d = o.isRelatedKeysPathTo ? u.findNodesOutOf() : u.findNodesInto();
            for (; d.next(); ) {
              const m = d.value,
                g = s.get(m);
              if (g !== null) {
                o.addRelatedKeyForNodeData(c.data, g.key);
                const p = i.partManager.findLinkForData(c.data, g.key),
                  y = this.findLinkForData(u.data, m.key);
                y !== null && p !== null && h.set(y, p);
              } else o.removeRelatedKeyForNodeData(c.data, m.key);
            }
          }
        }
      }
      if ((l.count > 0 && i.removeParts(l, !1), h.count > 0)) {
        const f = h.iterator;
        for (; f.next(); ) {
          const c = f.key,
            u = f.value;
          s.set(c, u);
        }
      }
    }
    if (i !== null && this.diagram !== null) {
      const o = i.model,
        r = o.afterCopyFunction;
      if (r !== null) {
        const l = new GMap();
        s.each((a) => {
          a.key.data !== null && l.set(a.key.data, a.value.data);
        });
        const h = this.diagram.model;
        r(l, o, h);
      }
    }
    const n = s.iterator;
    for (; n.next(); ) n.value.updateTargetBindings();
    return s;
  }
  FS(t, i, e, s) {
    if (t === null || (s && !t.canCopy())) return null;
    if (e.has(t)) return e.get(t);
    const n = this.ZC(t, i);
    if (!(n instanceof Part)) return null;
    if (((n.isSelected = !1), (n.isHighlighted = !1), e.set(t, n), t instanceof Node)) {
      const o = t.linksConnected;
      for (; o.next(); ) {
        const r = o.value;
        if (r.fromNode === t) {
          const l = e.get(r);
          l !== null && (l.fromNode = n);
        }
        if (r.toNode === t) {
          const l = e.get(r);
          l !== null && (l.toNode = n);
        }
      }
      if (t instanceof Group && n instanceof Group) {
        const r = t.memberParts;
        for (; r.next(); ) {
          const l = r.value,
            h = this.FS(l, i, e, s);
          h instanceof Link || (h !== null && (h.containingGroup = n));
        }
      }
    } else if (t instanceof Link && n instanceof Link) {
      const o = t.fromNode;
      if (o !== null) {
        const h = e.get(o);
        h !== null && (n.fromNode = h);
      }
      const r = t.toNode;
      if (r !== null) {
        const h = e.get(r);
        h !== null && (n.toNode = h);
      }
      const l = t.labelNodes;
      for (; l.next(); ) {
        const h = l.value,
          a = this.FS(h, i, e, s);
        a !== null && a instanceof Node && (a.labeledLink = n);
      }
    }
    return n;
  }
  ZC(t, i) {
    let e = null;
    const s = t.data;
    if (s !== null && i !== null) {
      const n = i.model;
      if (!(t instanceof Link)) {
        const o = n.copyNodeData(s);
        (n.addNodeData(o), (e = i.findPartForData(o)));
      }
    } else if ((t.Yt(), (e = t.copy()), e !== null)) {
      const n = this.diagram;
      if (i !== null) i.add(e);
      else if (s !== null && n !== null && n.commandHandler !== null && n.commandHandler.copiesClipboardData) {
        const o = n.model;
        let r = null;
        (e instanceof Link || (r = o.copyNodeData(s)), (e.data = r));
      }
    }
    return e;
  }
  get nodes() {
    return this.kg;
  }
  get links() {
    return this.fn;
  }
  get parts() {
    return this.Dt;
  }
  get diagram() {
    return this.f;
  }
  get addsToTemporaryLayer() {
    return this.vC;
  }
  set addsToTemporaryLayer(t) {
    this.vC = t;
  }
}
