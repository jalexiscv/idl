class GraphLinksPartManager extends PartManager {
  V2() {
    const t = this.diagram.model;
    (this.nw(t.nodeDataArray), this.KF(t.linkDataArray));
  }
  nw(t) {
    super.nw(t, !1);
    const i = this.links.iterator;
    for (; i.next(); ) i.value.tg();
    this.diagram.pb(!1);
  }
  KF(t) {
    (t.forEach((i) => {
      this.UF(i);
    }),
      this.diagram.pb(!1));
  }
  UF(t) {
    if (t == null || this.diagram.undoManager.isUndoingRedoing || this.findLinkForData(t)) return null;
    const i = this.getLinkCategoryForData(t),
      e = this.findLinkTemplateForCategory(i);
    if (e !== null) {
      e.Yt();
      const s = e.copy();
      if (s !== null) {
        const n = this.diagram.Se;
        ((this.diagram.Se = !0), (s.sr = i), (s.oi = t));
        const o = this.diagram.model,
          r = o.IS(t, !0);
        r !== "" && (s.fromPortId = r);
        const l = o.He(t, !0);
        if (l !== void 0) {
          const c = this.findNodeForKey(l);
          c instanceof Node && (s.fromNode = c);
        }
        const h = o.IS(t, !1);
        h !== "" && (s.toPortId = h);
        const a = o.He(t, !1);
        if (a !== void 0) {
          const c = this.findNodeForKey(a);
          c instanceof Node && (s.toNode = c);
        }
        const f = o.getLabelKeysForLinkData(t);
        return (
          Array.isArray(f) &&
            f.forEach((c) => {
              const u = this.findNodeForKey(c);
              u !== null && (u.labeledLink = s);
            }),
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
  FF() {
    const t = this.diagram.model;
    (this.GF(t.linkDataArray), this.WC(t.nodeDataArray));
  }
  GF(t) {
    t.forEach((i) => {
      this.DS(i);
    });
  }
  getLinkCategoryForData(t) {
    return this.diagram.model.getCategoryForLinkData(t);
  }
  setLinkCategoryForData(t, i) {
    return this.diagram.model.setCategoryForLinkData(t, i);
  }
  setFromNodeForLink(t, i, e) {
    const s = this.diagram.model,
      n = i !== null ? i.data : null;
    s.setFromKeyForLinkData(t.data, s.getKeyForNodeData(n));
  }
  setToNodeForLink(t, i, e) {
    const s = this.diagram.model,
      n = i !== null ? i.data : null;
    s.setToKeyForLinkData(t.data, s.getKeyForNodeData(n));
  }
  OC(t) {
    this.diagram.model.removeLinkData(t.data);
  }
  findPartForKey(t) {
    const i = super.findPartForKey(t);
    if (i === null) {
      const s = this.diagram.model.findLinkDataForKey(t);
      if (s !== null) return this.findLinkForData(s);
    }
    return i;
  }
  findLinkForKey(t) {
    if (t == null) return null;
    const e = this.diagram.model.findLinkDataForKey(t);
    return e !== null ? this.findLinkForData(e) : null;
  }
  doModelChanged(t) {
    if ((super.doModelChanged(t), !this.diagram)) return;
    const i = this.diagram;
    if (t.model !== i.model) return;
    const e = t.change;
    if (i.H) {
      i.H = !1;
      try {
        const s = t.modelChange;
        if (s !== "") {
          if (e === 2) {
            if (s === "linkFromKey") {
              const n = t.object,
                o = this.findLinkForData(n);
              if (o !== null) {
                const r = t.newValue,
                  l = this.findNodeForKey(r);
                o.fromNode = l;
              }
            } else if (s === "linkToKey") {
              const n = t.object,
                o = this.findLinkForData(n);
              if (o !== null) {
                const r = t.newValue,
                  l = this.findNodeForKey(r);
                o.toNode = l;
              }
            } else if (s === "linkFromPortId") {
              const n = t.object,
                o = this.findLinkForData(n);
              if (o !== null) {
                const r = t.newValue;
                typeof r == "string" && (o.fromPortId = r);
              }
            } else if (s === "linkToPortId") {
              const n = t.object,
                o = this.findLinkForData(n);
              if (o !== null) {
                const r = t.newValue;
                typeof r == "string" && (o.toPortId = r);
              }
            } else if (s === "nodeGroupKey") {
              const n = t.object,
                o = this.findPartForData(n);
              if (o !== null) {
                const r = t.newValue;
                if (r !== void 0) {
                  const l = this.findNodeForKey(r);
                  l instanceof Group ? (o.containingGroup = l) : (o.containingGroup = null);
                } else o.containingGroup = null;
              }
            } else if (s === "linkLabelKeys") {
              const n = t.object,
                o = this.findLinkForData(n);
              if (o !== null) {
                const r = t.oldValue,
                  l = t.newValue;
                (Array.isArray(r) &&
                  r.forEach((h) => {
                    if (l.indexOf(h) >= 0) return;
                    const a = this.findNodeForKey(h);
                    a !== null && (a.labeledLink = null);
                  }),
                  Array.isArray(l) &&
                    l.forEach((h) => {
                      const a = this.findNodeForKey(h);
                      a !== null && (a.labeledLink = o);
                    }));
              }
            } else if (s === "linkCategory") {
              const n = t.object,
                o = this.findLinkForData(n),
                r = t.newValue;
              o !== null && typeof r == "string" && (o.category = r);
            } else if (s === "linkDataArray") {
              const n = t.oldValue;
              this.GF(n);
              const o = t.newValue;
              this.KF(o);
            }
            i.isModified = !0;
          } else if (e === 3) {
            const n = t.newValue;
            if (s === "linkDataArray" && U.it(n)) this.UF(n);
            else if (s === "linkLabelKeys" && t.model.isKeyType(n)) {
              const o = t.object,
                r = this.findLinkForData(o),
                l = this.findNodeForKey(n);
              r !== null && l !== null && (l.labeledLink = r);
            }
            i.isModified = !0;
          } else if (e === 4) {
            const n = t.oldValue;
            if (s === "linkDataArray" && U.it(n)) this.DS(n);
            else if (s === "linkLabelKeys" && t.model.isKeyType(n)) {
              const o = this.findNodeForKey(n);
              o !== null && (o.labeledLink = null);
            }
            i.isModified = !0;
          }
        } else if (e === 2) {
          const n = t.propertyName,
            o = t.object,
            r = i.model;
          (o === r &&
            (n === "linkFromKeyProperty" ||
              n === "linkToKeyProperty" ||
              n === "linkFromPortIdProperty" ||
              n === "linkToPortIdProperty" ||
              n === "linkLabelKeysProperty" ||
              n === "nodeIsGroupProperty" ||
              n === "nodeGroupKeyProperty" ||
              n === "linkCategoryProperty") &&
            (i.undoManager.isUndoingRedoing || this.rebuildParts()),
            (i.isModified = !0));
        }
      } finally {
        i.H = !0;
      }
    }
  }
  XF() {
    const t = this.diagram.model,
      i = new Set(),
      e = t.linkDataArray;
    e.forEach((n) => {
      i.add(n);
    });
    const s = [];
    (this.links.each((n) => {
      n.data !== null && !i.has(n.data) && s.push(n.data);
    }),
      s.forEach((n) => {
        t.qF(n, !1);
      }),
      e.forEach((n) => {
        this.findLinkForData(n) === null && t.HF(n, !1);
      }));
  }
  updateRelationshipsFromData(t) {
    const i = t.data;
    if (i === null) return;
    const e = t.diagram;
    if (e === null) return;
    const s = e.model;
    if (t instanceof Link) {
      let n = s.He(i, !0),
        o = e.findNodeForKey(n);
      ((t.fromNode = o), (n = s.He(i, !1)), (o = e.findNodeForKey(n)), (t.toNode = o));
      const r = s.getLabelKeysForLinkData(i);
      if (r.length > 0 || t.labelNodes.count > 0) {
        if (r.length === 1 && t.labelNodes.count === 1) {
          const c = r[0],
            u = t.labelNodes.first();
          if (u !== null && s.getKeyForNodeData(u.data) === c) return;
        }
        const l = new GSet().addAll(r),
          h = new GSet();
        t.labelNodes.each((c) => {
          if (c.data !== null) {
            const u = s.getKeyForNodeData(c.data);
            u !== void 0 && h.add(u);
          }
        });
        const a = h.copy();
        a.removeAll(l);
        const f = l.copy();
        if ((f.removeAll(h), a.count > 0 || f.count > 0)) {
          const c = t;
          (a.each((u) => {
            const d = e.findNodeForKey(u);
            d !== null && d.labeledLink === c && (d.labeledLink = null);
          }),
            f.each((u) => {
              const d = e.findNodeForKey(u);
              d !== null && d.labeledLink !== c && (d.labeledLink = c);
            }));
        }
      }
    } else if (!(t instanceof Adornment)) {
      const n = s.getGroupKeyForNodeData(i),
        o = e.findPartForKey(n);
      (o === null || o instanceof Group) && (t.containingGroup = o);
    }
  }
  LS(t) {
    const i = this.diagram.model,
      e = i.getKeyForNodeData(t);
    if (e !== void 0) {
      const s = i.lw(e),
        n = this.findPartForData(t);
      if (s !== null && n !== null) {
        const r = s.iterator;
        for (; r.next(); ) {
          const l = r.value;
          if (i.containsNodeData(l)) {
            if (n instanceof Group && i.getGroupKeyForNodeData(l) === e) {
              const h = this.findPartForData(l);
              h !== null && (h.containingGroup = n);
            }
          } else {
            const h = this.findLinkForData(l);
            if (h !== null && n instanceof Node) {
              (i.He(l, !0) === e && (h.fromNode = n), i.He(l, !1) === e && (h.toNode = n));
              const a = i.getLabelKeysForLinkData(l);
              Array.isArray(a) && a.some((f) => (f === e ? ((n.labeledLink = h), !0) : !1));
            }
          }
        }
        i.un(e);
      }
      const o = i.getGroupKeyForNodeData(t);
      if (o !== void 0) {
        const r = this.findNodeForKey(o);
        n !== null && r instanceof Group && (n.containingGroup = r);
      }
    }
  }
  jC(t) {
    const i = this.diagram.model;
    if (t instanceof Node) {
      const e = i.getKeyForNodeData(t.data);
      if (e !== void 0) {
        const s = t.linksConnected;
        for (; s.next(); ) {
          const n = s.value;
          i.dn(e, n.data);
        }
        if (t.isLinkLabel) {
          const n = t.labeledLink;
          n !== null && i.dn(e, n.data);
        }
        if (t instanceof Group) {
          const n = t.memberParts;
          for (; n.next(); ) {
            const r = n.value.data;
            i.containsNodeData(r) && i.dn(e, r);
          }
        }
      }
    }
  }
  ZC(t, i) {
    let e = super.ZC(t, i);
    if (t instanceof Link) {
      const s = t.data;
      if (s !== null && i !== null) {
        const n = i.model,
          o = n.copyLinkData(s);
        (n.addLinkData(o), (e = i.findLinkForData(o)));
      } else if (e !== null) {
        const n = this.diagram;
        if (s !== null && n !== null && n.commandHandler !== null && n.commandHandler.copiesClipboardData) {
          const r = n.model.copyLinkData(s);
          e.data = r;
        }
      }
    }
    return e;
  }
  insertLink(t, i, e, s) {
    const n = this.diagram,
      o = n.model,
      r = n.toolManager.findTool("Linking");
    let l = "";
    t !== null && (i === null && (i = t), (l = i.portId), l === null && (l = ""));
    let h = "";
    e !== null && (s === null && (s = e), (h = s.portId), h === null && (h = ""));
    const a = r.archetypeLinkData;
    if (a instanceof Link) {
      a.Yt();
      const f = a.copy();
      if (f !== null) {
        ((f.fromNode = t), (f.fromPortId = l), (f.toNode = e), (f.toPortId = h), n.add(f));
        const c = r.archetypeLabelNodeData;
        if (c instanceof Node) {
          c.Yt();
          const u = c.copy();
          u !== null && ((u.labeledLink = f), n.add(u));
        }
        return f;
      }
    } else if (a !== null) {
      const f = o.copyLinkData(a);
      if (U.it(f)) {
        (t !== null && o.Ng(f, o.getKeyForNodeData(t.data), !0),
          o.Cg(f, l, !0),
          e !== null && o.Ng(f, o.getKeyForNodeData(e.data), !1),
          o.Cg(f, h, !1),
          o.addLinkData(f));
        const c = r.archetypeLabelNodeData;
        if (c !== null && !(c instanceof Node)) {
          const d = o.copyNodeData(c);
          o.addNodeData(d);
          const m = o.getKeyForNodeData(d);
          m !== void 0 && o.addLabelKeyForLinkData(f, m);
        }
        return n.findLinkForData(f);
      }
    }
    return null;
  }
}
