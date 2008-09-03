class Placeholder extends GraphObject {
  si;
  gg;
  constructor(t) {
    (super(), (this.si = Margin.rm), (this.gg = new Rect(NaN, NaN, NaN, NaN)), t && Object.assign(this, t));
  }
  cloneProtected(t) {
    (super.cloneProtected(t), (t.si = this.si.T()), (t.gg = this.gg.copy()));
  }
  Ah(t) {
    if (this.background === null) return false;
    const i = this.naturalBounds;
    return Rect.contains(0, 0, i.width, i.height, t.x, t.y);
  }
  Cd(t, i, e, s) {
    const n = this.part;
    if (
      ((n === null || (!(n instanceof Group) && !(n instanceof Adornment))) &&
        U.n("Placeholder is not inside a Group or Adornment."),
      n instanceof Group)
    ) {
      const o = this.computeBorder(this.gg),
        r = this.minSize,
        l = isFinite(r.width) ? Math.max(r.width, o.width) : o.width,
        h = isFinite(r.height) ? Math.max(r.height, o.height) : o.height,
        a = this.ji;
      (a.$n(l || 0, h || 0), this.fo(0, 0, a.width, a.height));
      const f = n.memberParts;
      let c = false;
      for (; f.next(); )
        if (f.value.isVisible()) {
          c = true;
          break;
        }
      const u = n.diagram;
      if (c && u !== null && !u.animationManager.DM(n) && !isNaN(o.x) && !isNaN(o.y)) {
        const d = Point.a();
        (d.setRectSpot(o, n.locationSpot), (n.location = d), Point.o(d));
      }
    } else {
      const o = n,
        r = this.ji,
        l = this.si,
        h = l.left + l.right,
        a = l.top + l.bottom,
        f = o.adornedObject,
        c = f.getDocumentAngle();
      o.angle = c;
      let u = 0;
      f instanceof Shape && (u = f.strokeWidth);
      const d = f.getDocumentScale(),
        m = f.naturalBounds,
        g = (m.width + u) * d,
        p = (m.height + u) * d;
      if (o.type !== Panel.Link) {
        const y = o.category === "Selection" ? Spot.TopLeft : o.locationSpot,
          x = f.getDocumentPoint(y, Point.a());
        ((o.location = x), Point.o(x));
      }
      if (!isNaN(g) && !isNaN(p)) (r.$n(g + h || 0, p + a || 0), this.fo(-l.left, -l.top, r.width, r.height));
      else {
        const y = f.getDocumentPoint(Spot.TopLeft, Point.a()),
          x = Rect.U(y.x, y.y, 0, 0);
        (x.unionPoint(f.getDocumentPoint(Spot.BottomRight, y)),
          x.unionPoint(f.getDocumentPoint(Spot.TopRight, y)),
          x.unionPoint(f.getDocumentPoint(Spot.BottomLeft, y)),
          r.$n(x.width + h || 0, x.height + a || 0),
          this.fo(-l.left, -l.top, r.width, r.height),
          Point.o(y),
          Rect.o(x));
      }
    }
  }
  Th(t, i, e, s) {
    this.actualBounds.e(t, i, e, s);
  }
  computeBorder(t) {
    const i = this.part,
      e = i.diagram;
    if (e === null || e.animationManager.isAnimating) return t;
    if (i instanceof Group && !i.layer.isTemporary && i.computesBoundsAfterDrag && this.gg.isReal()) {
      const r = e.toolManager.findTool("Dragging");
      if (r === e.currentTool && r.MR(i, this.gg, t)) return t;
    }
    const s = Rect.a(),
      n = this.computeMemberBounds(s),
      o = this.si;
    return (
      i instanceof Group && !i.isSubGraphExpanded
        ? t.e(n.x - o.left, n.y - o.top, 0, 0)
        : t.e(
            n.x - o.left,
            n.y - o.top,
            Math.max(n.width + o.left + o.right, 0),
            Math.max(n.height + o.top + o.bottom, 0),
          ),
      Rect.o(s),
      i instanceof Group && i.computesBoundsIncludingLocation && i.location.isReal() && t.unionPoint(i.location),
      t
    );
  }
  computeMemberBounds(t) {
    if (!(this.part instanceof Group)) return (t.e(0, 0, 0, 0), t);
    const i = this.part;
    let e = 1 / 0,
      s = 1 / 0,
      n = -1 / 0,
      o = -1 / 0;
    const r = i.memberParts;
    for (; r.next(); ) {
      const l = r.value;
      if (
        !l.isVisible() ||
        (l instanceof Link && (!i.computesBoundsIncludingLinks || l.vo() || l.fromNode === i || l.toNode === i))
      )
        continue;
      const h = l.actualBounds;
      (h.left < e && (e = h.left),
        h.top < s && (s = h.top),
        h.right > n && (n = h.right),
        h.bottom > o && (o = h.bottom));
    }
    if (!isFinite(e) || !isFinite(s)) {
      const l = i.location;
      t.e(l.x, l.y, 0, 0);
    } else t.e(e, s, n - e, o - s);
    return t;
  }
  get padding() {
    return this.si;
  }
  set padding(t) {
    typeof t == "number" ? (t = new Margin(t)) : U.s(t, Margin, Placeholder, "padding");
    const i = this.si;
    i.equals(t) || ((t = t.T()), (this.si = t), this.t("padding", i, t), this.g());
  }
}
