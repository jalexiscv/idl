class AvoidsNodesRouter extends Router {
  constructor(t) {
    (super(), (this.name = "AvoidsNodes"), t && Object.assign(this, t));
  }
  canRoute(t) {
    return (t instanceof Diagram ? t.a0 : t.diagram?.a0) ? super.canRoute(t) : !1;
  }
  isRoutable(t, i) {
    return !(
      !t.isAvoiding ||
      t.containingGroup !== (i instanceof Group ? i : null) ||
      t.toNode === null ||
      t.fromNode === null ||
      t.pointsCount < 4
    );
  }
  routeLinks(t, i) {
    const e = i instanceof Diagram ? null : i,
      s = t.iterator,
      n = this.diagram.getPositions(!0, e, null);
    for (; s.next(); ) {
      const o = s.value;
      if (!this.isRoutable(o, i)) continue;
      o.startRoute();
      const r = o.pointsCount,
        l = o.getPoint(1),
        h = o.getPoint(r - 2),
        a = o.fromNode.actualBounds.copy();
      (a.inflate(Link.zh, Link.zh), a.unionPoint(o.getPoint(0)));
      const f = o.toNode.actualBounds.copy();
      (f.inflate(Link.zh, Link.zh),
        f.unionPoint(o.getPoint(r - 1)),
        this.DV(o, a, f, n) && this.FV(o, l, o.TC, h, o.LC, a, f, n),
        o.commitRoute());
    }
  }
  DV(t, i, e, s) {
    const n = t.diagram,
      o = t.pointsCount;
    if (
      n === null ||
      !t.fromNode ||
      !t.toNode ||
      t.fromNode === t.toNode ||
      !t.layer ||
      t.layer.isTemporary ||
      (i.containsPoint(t.getPoint(o - 1)) && !t.toNode.isMemberOf(t.fromNode)) ||
      (e.containsPoint(t.getPoint(0)) && !t.fromNode.isMemberOf(t.toNode)) ||
      !t.isOrthogonal
    )
      return !1;
    if (t.segmentIndex === 17) return !0;
    const r = t.getPoint(1),
      l = t.getPoint(o - 2),
      h = t.getPoint(2);
    if (!s.isUnoccupied(Math.min(r.x, h.x), Math.min(r.y, h.y), Math.abs(r.x - h.x), Math.abs(r.y - h.y))) return !0;
    for (let f = 2; f < o - 3; f++) {
      const c = t.getPoint(f),
        u = t.getPoint(f + 1);
      if (!s.isUnoccupied(Math.min(c.x, u.x), Math.min(c.y, u.y), Math.abs(c.x - u.x), Math.abs(c.y - u.y))) return !0;
    }
    const a = t.getPoint(o - 3);
    return !s.isUnoccupied(Math.min(a.x, l.x), Math.min(a.y, l.y), Math.abs(a.x - l.x), Math.abs(a.y - l.y));
  }
  FV(t, i, e, s, n, o, r, l) {
    const h = t.diagram;
    if (h === null) return;
    const a = i,
      f = s;
    let c = Point.xn,
      u = Point.xn;
    if (h.isVirtualized) {
      const g = l.bounds.copy(),
        p = t.getPoint(2),
        y = t.getPoint(t.pointsCount - 3);
      g.inflate(-l.cellWidth, -l.cellHeight);
      const x = Point.a();
      (l.fg(i.x, i.y) ||
        (G.Il(g.x, g.y, g.x + g.width, g.y + g.height, i.x, i.y, p.x, p.y, x)
          ? ((c = i = x.copy()), (e = x.directionPoint(p)))
          : G.Il(g.x, g.y, g.x + g.width, g.y + g.height, p.x, p.y, y.x, y.y, x)
            ? ((c = i = x.copy()), (e = x.directionPoint(y)))
            : G.Il(g.x, g.y, g.x + g.width, g.y + g.height, y.x, y.y, s.x, s.y, x) &&
              ((c = i = x.copy()), (e = x.directionPoint(s)))),
        l.fg(s.x, s.y) ||
          (G.Il(g.x, g.y, g.x + g.width, g.y + g.height, s.x, s.y, y.x, y.y, x)
            ? ((u = s = x.copy()), (n = y.directionPoint(x)))
            : G.Il(g.x, g.y, g.x + g.width, g.y + g.height, y.x, y.y, p.x, p.y, x)
              ? ((u = s = x.copy()), (n = p.directionPoint(x)))
              : G.Il(g.x, g.y, g.x + g.width, g.y + g.height, p.x, p.y, i.x, i.y, x) &&
                ((u = s = x.copy()), (n = i.directionPoint(x)))),
        Point.o(x));
    }
    const d = o.copy().unionRect(r);
    (d.inflate(l.cellWidth * l.mc, l.cellHeight * l.mc), l.MF(i, e, s, n, d, !0));
    let m = l.Po(s.x, s.y);
    if (
      (!l.tw &&
        m >= PositionArray.ag &&
        (l.OL(), d.inflate(l.cellWidth * l.U2, l.cellHeight * l.G2), l.MF(i, e, s, n, d, !1), (m = l.Po(s.x, s.y))),
      !l.tw && m < PositionArray.ag && !l.J3(s.x, s.y))
    ) {
      (t.points.removeRange(2, t.pointsCount - 3), this.IA(t, l, s.x, s.y, n, !0));
      const g = 0,
        p = 90,
        y = 180,
        x = 270,
        b = t.getPoint(2);
      if (t.pointsCount < 4)
        (e === g || e === y ? ((b.x = i.x), (b.y = s.y)) : ((b.x = s.x), (b.y = i.y)),
          t.setPointAt(2, b.x, b.y),
          t.insertPointAt(3, b.x, b.y));
      else {
        const S = t.getPoint(3);
        if (e === g || e === y)
          if (G.u(b.x, S.x)) {
            const k = e === g ? Math.max(b.x, i.x) : Math.min(b.x, i.x);
            (t.setPointAt(2, k, i.y), t.setPointAt(3, k, S.y));
          } else
            G.u(b.y, S.y)
              ? (Math.abs(i.y - b.y) <= l.cellHeight / 2 && (t.setPointAt(2, b.x, i.y), t.setPointAt(3, S.x, i.y)),
                t.insertPointAt(2, b.x, i.y))
              : t.setPointAt(2, i.x, b.y);
        else if (e === p || e === x)
          if (G.u(b.y, S.y)) {
            const k = e === p ? Math.max(b.y, i.y) : Math.min(b.y, i.y);
            (t.setPointAt(2, i.x, k), t.setPointAt(3, S.x, k));
          } else
            G.u(b.x, S.x)
              ? (Math.abs(i.x - b.x) <= l.cellWidth / 2 && (t.setPointAt(2, i.x, b.y), t.setPointAt(3, i.x, S.y)),
                t.insertPointAt(2, i.x, b.y))
              : t.setPointAt(2, b.x, i.y);
      }
      if (c.isReal()) {
        const S = t.getPoint(1),
          k = t.getPoint(2);
        S.x !== k.x && S.y !== k.y
          ? e === g || e === y
            ? t.insertPointAt(2, S.x, k.y)
            : t.insertPointAt(2, k.x, S.y)
          : e === g || e === y
            ? t.insertPointAt(2, a.x, c.y)
            : t.insertPointAt(2, c.x, a.y);
      }
      u.isReal() &&
        (n === g || n === y
          ? t.insertPointAt(t.pointsCount - 2, f.x, u.y)
          : t.insertPointAt(t.pointsCount - 2, u.x, f.y));
    }
  }
  IA(t, i, e, s, n, o) {
    const f = i.cellWidth,
      c = i.cellHeight;
    let u = i.Po(e, s),
      d = e,
      m = s,
      g = d,
      p = m;
    for (
      n === 0 ? (g += f) : n === 90 ? (p += c) : n === 180 ? (g -= f) : (p -= c),
        t.VC &&
          u > PositionArray.ff &&
          i.Po(g, p) !== u - 1 &&
          (i.Po(d - f, m) === u - 1
            ? ((n = 180), (g = d - f), (p = m))
            : i.Po(d + f, m) === u - 1
              ? ((n = 0), (g = d + f), (p = m))
              : i.Po(d, m - c) === u - 1
                ? ((n = 270), (g = d), (p = m - c))
                : i.Po(d, m + c) === u - 1 && ((n = 90), (g = d), (p = m + c)));
      u > PositionArray.ff && i.Po(g, p) === u - 1;
    )
      ((d = g), (m = p), n === 0 ? (g += f) : n === 90 ? (p += c) : n === 180 ? (g -= f) : (p -= c), (u -= 1));
    if (
      (o
        ? u > PositionArray.ff &&
          (n === 180 || n === 0
            ? (d = Math.floor(d / f) * f + f / 2)
            : (n === 90 || n === 270) && (m = Math.floor(m / c) * c + c / 2))
        : ((d = Math.floor(d / f) * f + f / 2), (m = Math.floor(m / c) * c + c / 2)),
      u > PositionArray.ff)
    ) {
      let y = n,
        x = d,
        b = m;
      if (
        (n === 0
          ? ((y = 90), (b += c))
          : n === 90
            ? ((y = 180), (x -= f))
            : n === 180
              ? ((y = 270), (b -= c))
              : n === 270 && ((y = 0), (x += f)),
        i.Po(x, b) === u - 1)
      )
        this.IA(t, i, x, b, y, !1);
      else {
        let k = d,
          P = m;
        (n === 0
          ? ((y = 270), (P -= c))
          : n === 90
            ? ((y = 0), (k += f))
            : n === 180
              ? ((y = 90), (P += c))
              : n === 270 && ((y = 180), (k -= f)),
          i.Po(k, P) === u - 1 && this.IA(t, i, k, P, y, !1));
      }
    }
    t.insertPointAt(t.pointsCount - 2, d, m);
  }
}
((ToolManager.prototype.initializeStandardTools = function () {
  return (
    this.ti("Action", new ActionTool(), this.mouseDownTools),
    this.ti("Relinking", new RelinkingTool(), this.mouseDownTools),
    this.ti("LinkReshaping", new LinkReshapingTool(), this.mouseDownTools),
    this.ti("Rotating", new RotatingTool(), this.mouseDownTools),
    this.ti("Resizing", new ResizingTool(), this.mouseDownTools),
    this.ti("Linking", new LinkingTool(), this.mouseMoveTools),
    this.ti("Dragging", new DraggingTool(), this.mouseMoveTools),
    this.ti("DragSelecting", new DragSelectingTool(), this.mouseMoveTools),
    this.ti("Panning", new PanningTool(), this.mouseMoveTools),
    this.ti("ContextMenu", new ContextMenuTool(), this.mouseUpTools),
    this.ti("TextEditing", new TextEditingTool(), this.mouseUpTools),
    this.ti("ClickCreating", new ClickCreatingTool(), this.mouseUpTools),
    this.ti("ClickSelecting", new ClickSelectingTool(), this.mouseUpTools),
    this
  );
}),
  Diagram.b2("GraphLinksModel", GraphLinksPartManager),
  Diagram.b2("TreeModel", TreePartManager));
idl = {
    get version() {
      return Diagram.version;
    },
    Group,
    List,
    Set: GSet,
    Map: GMap,
    Point,
    Size,
    Rect,
    Margin,
    Spot,
    Geometry,
    PathFigure,
    PathSegment,
    InputEvent,
    DiagramEvent,
    ChangedEvent,
    Model,
    GraphLinksModel,
    TreeModel,
    Binding,
    ThemeBinding,
    Transaction,
    UndoManager,
    CommandHandler,
    Tool,
    DraggingTool,
    DraggingInfo,
    DraggingOptions,
    LinkingBaseTool,
    LinkingTool,
    RelinkingTool,
    LinkReshapingTool,
    ResizingTool,
    RotatingTool,
    ClickSelectingTool,
    ActionTool,
    ClickCreatingTool,
    HTMLInfo,
    ContextMenuTool,
    DragSelectingTool,
    PanningTool,
    TextEditingTool,
    ToolManager,
    Animation,
    AnimationManager,
    AnimationTrigger,
    Layer,
    Diagram,
    Palette,
    Overview,
    Brush,
    GraphObject,
    Panel,
    RowColumnDefinition,
    Shape,
    TextBlock,
    Picture,
    Part,
    Adornment,
    Node,
    Link,
    Placeholder,
    Layout,
    LayoutNetwork,
    LayoutVertex,
    LayoutEdge,
    GridLayout,
    PanelLayout,
    CircularLayout,
    CircularNetwork,
    CircularVertex,
    CircularEdge,
    ForceDirectedLayout,
    ForceDirectedNetwork,
    ForceDirectedVertex,
    ForceDirectedEdge,
    LayeredDigraphLayout,
    LayeredDigraphNetwork,
    LayeredDigraphVertex,
    LayeredDigraphEdge,
    TreeLayout,
    TreeNetwork,
    TreeVertex,
    TreeEdge,
    Themes,
    ThemeManager,
    Router,
    AnimationStyle,
    AutoScale,
    CycleMode,
    Flip,
    TextFormat,
    ImageStretch,
    LayoutConditions,
    LinkAdjusting,
    Curve,
    Routing,
    Orientation,
    TextOverflow,
    PortSpreading,
    ScrollMode,
    CollapsePolicy,
    Sizing,
    TriggerStart,
    Stretch,
    ViewboxStretch,
    Wrap,
    BrushType,
    ColorSpace,
    GeometryStretch,
    GeometryType,
    SegmentType,
    BindingMode,
    ChangeType,
    CircularArrangement,
    CircularDirection,
    CircularNodeDiameterFormula,
    CircularSorting,
    GridAlignment,
    GridArrangement,
    GridSorting,
    LayeredDigraphAggressive,
    LayeredDigraphAlign,
    LayeredDigraphCycleRemove,
    LayeredDigraphInit,
    LayeredDigraphLayering,
    LayeredDigraphPack,
    TreeAlignment,
    TreeArrangement,
    TreeCompaction,
    TreeLayerStyle,
    TreePath,
    TreeSorting,
    TreeStyle,
    GestureMode,
    LinkingDirection,
    ReshapingBehavior,
    TextEditingAccept,
    TextEditingStarting,
    TextEditingState,
    WheelMode,
  };
