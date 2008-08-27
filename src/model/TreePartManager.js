class TreePartManager extends PartManager {
  Gh = null;
  RS(t, i) {
    if (t === null || i === null || i.findTreeParentLink() !== null) return;
    const e = this.diagram.toolManager.findTool("Linking");
    let s = t,
      n = i;
    if (this.diagram.isTreePathToChildren) {
      if (e !== null && e.Gu(s, n, null, !0)) return;
    } else if (((s = i), (n = t), e !== null && e.Gu(s, n, null, !0))) return;
    const o = this.getLinkCategoryForData(i.data),
      r = this.findLinkTemplateForCategory(o);
    if (r !== null) {
      r.Yt();
      const l = r.copy();
      if (l !== null) {
        const h = this.diagram.Se;
        ((this.diagram.Se = !0),
          (l.sr = o),
          (l.oi = i.data),
          (l.fromNode = s),
          (l.toNode = n),
          this.diagram.add(l),
          (l.oi = null),
          (l.data = i.data),
          (this.diagram.Se = h));
      }
    }
  }
  getLinkCategoryForData(t) {
    return this.diagram.model.getParentLinkCategoryForNodeData(t);
  }
  setLinkCategoryForData(t, i) {
    this.diagram.model.setParentLinkCategoryForNodeData(t, i);
  }
  setFromNodeForLink(t, i, e) {
    const s = this.diagram.model;
    e === void 0 && (e = null);
    const n = i !== null ? i.data : null;
    if (this.diagram.isTreePathToChildren) s.setParentKeyForNodeData(t.data, s.getKeyForNodeData(n));
    else {
      const o = this.Gh;
      ((this.Gh = t), e !== null && s.setParentKeyForNodeData(e.data, void 0));
      const r = t.toNode !== null ? t.toNode.data : null;
      (s.setParentKeyForNodeData(n, s.getKeyForNodeData(r)), (this.Gh = o));
    }
  }
  setToNodeForLink(t, i, e) {
    const s = this.diagram.model;
    e === void 0 && (e = null);
    const n = i !== null ? i.data : null;
    if (this.diagram.isTreePathToChildren) {
      const o = this.Gh;
      ((this.Gh = t), e !== null && s.setParentKeyForNodeData(e.data, void 0));
      const r = t.fromNode !== null ? t.fromNode.data : null;
      (s.setParentKeyForNodeData(n, s.getKeyForNodeData(r)), (this.Gh = o));
    } else s.setParentKeyForNodeData(t.data, s.getKeyForNodeData(n));
  }
  OC(t) {
    this.diagram.model.setParentKeyForNodeData(t.data, void 0);
  }
  findLinkForKey(t) {
    if (t == null) return null;
    const e = this.diagram.model.findNodeDataForKey(t);
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
            if (s === "nodeParentKey") {
              const n = t.object,
                o = n ? this.findNodeForData(n) : null,
                r = t.newValue,
                l = this.findNodeForKey(r);
              if (n && this.Gh !== null)
                l !== null && ((this.Gh.data = n), (this.Gh.category = this.getLinkCategoryForData(n)));
              else if (o !== null) {
                const h = o.findTreeParentLink();
                h !== null
                  ? l === null
                    ? i.remove(h)
                    : i.isTreePathToChildren
                      ? (h.fromNode = l)
                      : (h.toNode = l)
                  : this.RS(l, o);
              }
            } else if (s === "parentLinkCategory") {
              const n = t.object,
                o = n ? this.findNodeForData(n) : null,
                r = t.newValue;
              if (o !== null && typeof r == "string") {
                const l = o.findTreeParentLink();
                l !== null && (l.category = r);
              }
            }
            i.isModified = !0;
          }
        } else
          e === 2 &&
            (t.object === i.model &&
              t.propertyName === "nodeParentKeyProperty" &&
              (i.undoManager.isUndoingRedoing || this.rebuildParts()),
            (i.isModified = !0));
      } finally {
        i.H = !0;
      }
    }
  }
  updateRelationshipsFromData(t) {
    const i = t.data;
    if (i === null) return;
    const e = t.diagram;
    if (e === null) return;
    const s = e.model;
    if (t instanceof Node) {
      const n = s.getParentKeyForNodeData(i),
        o = e.findNodeForKey(n),
        r = t.findTreeParentNode();
      if (o !== r) {
        const l = t.findTreeParentLink();
        o !== null
          ? l !== null
            ? e.isTreePathToChildren
              ? (l.fromNode = o)
              : (l.toNode = o)
            : this.RS(o, t)
          : l !== null && e.R2(l, !1);
      }
    }
  }
  ow(t, i) {
    if ((super.ow(t, i), typeof i == "string" && this.findPartForData(t) !== null)) {
      const s = this.findLinkForData(t);
      s !== null && s.updateTargetBindings(i);
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
          if (i.containsNodeData(l) && n instanceof Node && i.getParentKeyForNodeData(l) === e) {
            const h = this.findNodeForData(l);
            this.RS(n, h);
          }
        }
        i.un(e);
      }
      const o = i.getParentKeyForNodeData(t);
      if (o !== void 0 && n instanceof Node) {
        const r = this.findNodeForKey(o);
        this.RS(r, n);
      }
    }
  }
  jC(t) {
    const i = this.diagram.model;
    if (t instanceof Node) {
      const e = i.getKeyForNodeData(t.data),
        s = this.findLinkForData(t.data);
      if (s !== null) {
        ((s.isSelected = !1), (s.isHighlighted = !1));
        const r = s.layer;
        if (r !== null) {
          const l = r.ae(-1, s, !1);
          l >= 0 && this.diagram.raiseChangedEvent(4, "parts", r, s, null, l, null);
          const h = s.layerChanged;
          h !== null && h(s, r, null);
        }
      }
      const n = this.diagram.isTreePathToChildren,
        o = t.linksConnected;
      for (; o.next(); ) {
        const r = o.value,
          l = n ? r.toNode : r.fromNode;
        if (l !== null) {
          const h = l.data;
          i.containsNodeData(h) && i.dn(e, h);
        }
      }
    }
  }
  insertLink(t, i, e, s) {
    const n = this.diagram.model;
    let o = t,
      r = e;
    if ((this.diagram.isTreePathToChildren || ((o = e), (r = t)), o !== null && r !== null)) {
      const l = o.data,
        h = r.data;
      return (n.setParentKeyForNodeData(h, n.getKeyForNodeData(l)), r.findTreeParentLink());
    }
    return null;
  }
}
var BindingMode = ((w) => ((w[(w.OneWay = 1)] = "OneWay"), (w[(w.TwoWay = 2)] = "TwoWay"), w))(BindingMode || {});
