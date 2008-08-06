/** @fileoverview Clase base para todos los objetos visuales en el grafico de escena de IDL.
 * GraphObject es la raiz de la jerarquia de objetos visuales. Define propiedades comunes
 * como posicion, tamano, visibilidad, opacidad, transformaciones, zOrder, y metodos
 * para medicion (measure), disposicion (arrange) y pintado (paint).
 * Implementa el sistema de bindings de datos, temas, eventos de raton, cursores,
 * y animaciones con triggers. Es la clase mas importante de la biblioteca (~2700 lineas). */

/** GraphObject: clase base de todos los elementos visuales del diagrama.
 * Proporciona el sistema de coordenadas con doble transformacion:
 * - `E` / `ll`: transformacion local (para renderizado, incluye posicion, escala, rotacion)
 * - `_s` / `Mh`: transformacion total al documento (acumulada desde el panel raiz)
 *
 * Estados de banderas (bitflags en `this.l`):
 * - Bit 0 (1): visible
 * - Bit 1 (2): pickable (se puede hacer click)
 * - Bit 8 (256): isClipping (recortado por el panel padre)
 * - Bit 11 (2048): Gb() - tiene transformacion local valida
 * - Bit 12 (4096): v0() - tiene transformacion de documento valida
 * - Bit 13 (8192): vo() - medicion es valida (no necesita recalcular)
 * - Bit 14 (16384): us() - disposicion es valida (no necesita recalcular)
 * - Bit 15 (32768): SE() - necesita recrear SVG
 *
 * Jerarquia: GraphObject -> Panel -> Part -> Node/Link/Adornment
 *            GraphObject -> Shape, TextBlock, Picture, Placeholder
 */
class GraphObject {
  l;
  K0;
  U0;
  Ph;
  S;
  lo;
  wt;
  yt;
  ue;
  ei;
  G0;
  en;
  Ft;
  gs;
  ll;
  Mh;
  Ai;
  Oa;
  rt;
  vt;
  hl;
  Ei;
  ji;
  Pd;
  pi;
  Md;
  Xt;
  ui;
  al;
  Vb;
  Nh;
  wc;
  /** Constructor: inicializa todas las propiedades del GraphObject con valores por defecto.
   * Asigna un ID unico via GSet._i y establece los valores iniciales de:
   * - Banderas de estado (l = 30723 = bits 0,1,8,11,12,13,14,15 activos)
   * - Opacidad (ei = 1), filtro CSS (G0 = ""), panel padre (en = null)
   * - Fondo (Ft = null), posicion (yt = NaN,NaN), tamano deseado (gs = 0,0)
   * - Transformaciones locales y de documento (ll, Mh)
   * - Escala y angulo, margen, bounds medidos/reales/naturales
   * - Configuracion de enlace (wt = null), configuracion de plantilla (S = null)
   * - Alineacion y foco de alineacion (pi, Md), fila/columna para tablas
   */
  constructor() {
    (GSet._i(this),
      (this.l = 30723),
      (this.ei = 1),
      (this.G0 = ""),
      (this.en = null),
      (this.Ft = null),
      (this.yt = new Point(NaN, NaN).k()),
      (this.gs = Size.Qw),
      (this.ll = new Transform()),
      (this.Mh = new Transform()),
      (this.Ai = null),
      (this.Oa = 1),
      (this.rt = 1),
      (this.vt = 0),
      (this.hl = Margin.rm),
      (this.ue = new Rect(NaN, NaN, NaN, NaN).k()),
      (this.Ei = new Rect(NaN, NaN, NaN, NaN).k()),
      (this.ji = new Rect(0, 0, NaN, NaN).k()),
      (this.Pd = null),
      (this.K0 = null),
      (this.wt = null),
      (this.pi = Spot.Default),
      (this.Md = Spot.Default),
      (this.U0 = 0),
      (this.Ph = 0),
      (this.Xt = null),
      (this.S = null),
      (this.lo = null),
      (this.ui = null),
      (this.Vb = null),
      (this.Nh = null),
      (this.al = null),
      (this.wc = null));
  }
  /** Metodo protegido para clonar propiedades entre GraphObjects.
   * Copia todas las propiedades relevantes al nuevo objeto `t`, incluyendo
   * banderas de estado, opacidad, posicion, tamano, transformaciones, bounds,
   * configuracion de enlaces, alineacion, y opcionalmente la plantilla.
   * Las propiedades de tipo objeto se copian profundamente (Point, Size, Transform, etc.).
   * @param {GraphObject} t - Objeto destino de la clonacion
   */
  cloneProtected(t) {
    ((t.l = (this.l | 2048 | 4096) & -32769),
      (t.ei = this.ei),
      (t.G0 = this.G0),
      (t.Ft = this.Ft),
      t.yt.c(this.yt),
      (t.gs = this.gs.T()),
      this.Ai !== null ? (t.Ai = this.Ai.copy()) : (t.Ai = null),
      (t.rt = this.rt),
      (t.vt = this.vt),
      (t.hl = this.hl.T()),
      t.ue.c(this.ue),
      t.Ei.c(this.Ei),
      t.ji.c(this.ji),
      (t.K0 = this.K0),
      this.wt !== null && (t.wt = this.wt.copy()),
      (t.pi = this.pi.T()),
      (t.Md = this.Md.T()),
      (t.U0 = this.U0),
      (t.Ph = this.Ph),
      this.Xt !== null && (t.Xt = this.Xt.copy()),
      this.S !== null && (this.S.wi ? (t.S = this.S) : (t.S = this.S.copy())),
      this.lo !== null && (t.lo = this.lo.slice()),
      this.ui !== null && (t.ui = this.ui.copy()));
  }
  /** Agrega un nombre de propiedad a la lista de propiedades a copiar durante clone().
   * Permite que propiedades personalizadas sean incluidas en la clonacion.
   * @param {string} t - Nombre de la propiedad a copiar
   */
  addCopyProperty(t) {
    let i = this.lo;
    if (!Array.isArray(i)) ((i = []), (this.lo = i));
    else for (let e = 0; e < i.length; e++) if (i[e] === t) return;
    i.push(t);
  }
  $o(t) {
    ((t.Pd = null), (t.al = null), t.g());
  }
  clone() {
    const t = new this.constructor();
    return (this.cloneProtected(t), this._L(t), t);
  }
  _L(t) {
    if (this.lo !== null)
      for (let i = 0; i < this.lo.length; i++) {
        const e = this.lo[i];
        t[e] = this[e];
      }
  }
  uE() {
    if (this.lo !== null)
      for (let t = 0; t < this.lo.length; t++) {
        const i = this.lo[t];
        delete this[i];
      }
  }
  copy() {
    return this.clone();
  }
  tM() {
    const t = this.Vi;
    if (t !== null) {
      this.Vi = null;
      for (const i of t)
        i.Nd() &&
          (i.isToData
            ? this.themeData(i.targetProperty, i.sourceProperty, i.themeSource, i.converter, i.themeConverter)
            : i.isToObject
              ? this.themeObject(
                  i.targetProperty,
                  i.sourceProperty,
                  i.themeSource,
                  i.converter,
                  i.themeConverter,
                  i.sourceName,
                )
              : i.isToModel
                ? this.themeModel(i.targetProperty, i.sourceProperty, i.themeSource, i.converter, i.themeConverter)
                : this.theme(i.targetProperty, i.sourceProperty, i.themeSource, i.converter, i.themeConverter));
    }
    return this;
  }
  gi(t) {
    t in Orientation ? (this.segmentOrientation = t) : t in Stretch ? (this.stretch = t) : U.wr(this, t);
  }
  toString() {
    return U.Jn(this.constructor) + "#" + GSet.Ps(this);
  }
  static None = 0;
  static Default = 1;
  static Fill = 2;
  static Vertical;
  static Horizontal;
  static Uniform = 6;
  static UniformToFill = 7;
  static FlipVertical = 1;
  static FlipHorizontal = 2;
  static FlipBoth = 3;
  Ch() {
    this.S !== null && (this.S.wi = true);
  }
  jt() {
    return (
      this.S === null ? (this.S = new GraphObjectTemplateSettings()) : this.S.wi && (this.S = this.S.copy()),
      this.S
    );
  }
  ts() {
    if (this.wt === null) {
      const t = new LinkSettings();
      ((t.Ea = Spot.None), (t.Va = Spot.None), (t.Ba = 10), (t.za = 10), (t.Xa = 0), (t.Ya = 0), (this.wt = t));
    }
    return this.wt;
  }
  raiseChangedEvent(t, i, e, s, n, o, r) {
    const l = this.part;
    if (l !== null) {
      (l.xc(t, i, e, s, n, o, r), e === this && t === 2 && this.bc() && this.Ka(l, i));
      const h = this.diagram;
      if (this.Rs !== null && h !== null && h.oa && !h.undoManager.isUndoingRedoing && !h.animationManager.Uu) {
        const a = this.Rs.get(i);
        if (a !== null && h.animationManager.isEnabled && !h.animationManager.isTicking) {
          this.wc === null && (this.wc = new GMap());
          let f = h.undoManager.transactionLevel === 0;
          if ((a.startCondition === 2 ? (f = true) : a.startCondition === 3 && (f = false), f)) {
            const c = new Animation();
            a.UR(c);
            const u = this.wc.get(a);
            (u !== null && u.stop(), this.wc.set(a, c), (c.l1 = this), (c.OM = a), c.add(this, i, s, n), c.start());
          } else h.animationManager.getBundleAnimation().add(this, i, s, n);
        }
      }
      if (this instanceof Panel && e === l && l.DN() && l.data !== null) {
        const a = this.O.h,
          f = a.length;
        for (let c = 0; c < f; c++) {
          const u = a[c];
          u instanceof Panel &&
            u.Ln((d) => {
              d.data !== null && d.DN() && d.updateTargetBindings(i);
            });
        }
      }
    }
  }
  zR(t) {
    this.wc && this.wc.delete(t);
  }
  Wo() {
    if (this.diagram === null) return;
    if (this.findBindingPanel() === null && this.Vi !== null) {
      const i = this.diagram.model,
        e = this.Vi.iterator;
      for (; e.next(); ) {
        const s = e.value;
        if (!s.isToTheme) continue;
        let n = null;
        const o = s.sourceName;
        s.isToObject && (n = this.tD(o));
        let r = this;
        const l = s.targetId;
        (l !== -1 && ((r = this.q0(l)), r === null)) ||
          (o === "/" ? (n = r.part) : o === "." ? (n = r) : o === ".." && (n = r.panel),
          s.updateTarget(r, n, void 0, i));
      }
    }
  }
  Ka(t, i) {
    const e = this.findBindingPanel();
    if (e !== null) {
      const s = t.diagram,
        n = this.Vi.iterator;
      for (; n.next(); ) {
        const o = n.value;
        let r = null;
        if (o.isToObject) {
          if (((r = o.iD(e, this)), r === null)) continue;
          o.updateSource(this, r, i, null);
        } else if (o.isToModel) s !== null && !s.Se && o.updateSource(this, s.model.modelData, i, e);
        else if (!o.isToTheme) {
          const l = e.data;
          if (l === null) continue;
          s !== null && !s.Se && o.updateSource(this, l, i, e);
        }
        if (r === this) {
          const l = o.targetId,
            h = e.q0(l);
          h !== null && o.updateTarget(h, r, i, s?.model);
        }
      }
    }
  }
  q0(t) {
    return this.ho === t ? this : null;
  }
  tD(t) {
    let i;
    return (
      t === ""
        ? (i = this)
        : t === "/"
          ? (i = this)
          : t === "."
            ? (i = this)
            : t === ".."
              ? (i = this)
              : ((i = this.part.findObject(t)),
                i === null &&
                  Debug &&
                  U.ot("Binding error: missing GraphObject named " + t + " in " + this.part.toString())),
      i
    );
  }
  get ho() {
    return this.S !== null ? this.S.ho : -1;
  }
  set ho(t) {
    this.ho !== t && (this.S === null && (this.S = new GraphObjectTemplateSettings()), (this.S.ho = t));
  }
  get Vi() {
    return this.S !== null ? this.S.Vi : null;
  }
  set Vi(t) {
    this.Vi !== t && (this.S === null && (this.S = new GraphObjectTemplateSettings()), (this.S.Vi = t));
  }
  get ao() {
    return this.S !== null ? this.S.ao : null;
  }
  set ao(t) {
    this.ao !== t && (this.S === null && (this.S = new GraphObjectTemplateSettings()), (this.S.ao = t));
  }
  raiseChanged(t, i, e) {
    this.raiseChangedEvent(2, t, this, i, e);
  }
  t(t, i, e) {
    this.raiseChangedEvent(2, t, this, i, e);
  }
  fo(t, i, e, s) {
    const n = this.ue;
    if ((n.e(t, i, e, s), this.rt !== 1 || this.vt !== 0)) {
      this.Ai === null && (this.Ai = new Transform());
      const o = this.Ai;
      (o.Ki(), this.H0(o, t, i, e, s), o.lm(n));
    }
  }
  eD(t, i, e) {
    return this.pickable === false ? false : (e.Cf(this.E), i ? this.intersectsRect(t, e) : this.containedInRect(t, e));
  }
  sD(t, i, e) {
    if (this.pickable === false) return false;
    const s = this.naturalBounds,
      n = t.distanceSquaredPoint(i);
    return e
      ? Point.distanceLineSegmentSquared(t.x, t.y, 0, 0, 0, s.height) <= n ||
          Point.distanceLineSegmentSquared(t.x, t.y, 0, s.height, s.width, s.height) <= n ||
          Point.distanceLineSegmentSquared(t.x, t.y, s.width, s.height, s.width, 0) <= n ||
          Point.distanceLineSegmentSquared(t.x, t.y, s.width, 0, 0, 0) <= n
      : t.distanceSquared(0, 0) <= n &&
          t.distanceSquared(0, s.height) <= n &&
          t.distanceSquared(s.width, 0) <= n &&
          t.distanceSquared(s.width, s.height) <= n;
  }
  Fn() {
    return true;
  }
  containsPoint(t) {
    Debug && U.s(t, Point, GraphObject, "containsPoint:p");
    const i = Point.a();
    (i.c(t), this.E.St(i));
    const e = this.actualBounds;
    if (!e.isReal()) return (Point.o(i), false);
    const s = this.diagram;
    if (s !== null && s.y0) {
      const o = s.getInputOption("extraTouchThreshold"),
        r = s.getInputOption("extraTouchArea"),
        l = r / 2,
        h = this.naturalBounds,
        a = this.getDocumentScale() * s.scale,
        f = 1 / a;
      if (h.width * a < o && h.height * a < o) {
        const c = Rect.contains(e.x - l * f, e.y - l * f, e.width + r * f, e.height + r * f, i.x, i.y);
        return (Point.o(i), c);
      }
    }
    let n = false;
    return (
      (this instanceof Adornment || this instanceof Shape
        ? Rect.contains(e.x - 5, e.y - 5, e.width + 10, e.height + 10, i.x, i.y)
        : e.containsPoint(i)) &&
        (this.ui && !this.ui.containsPoint(i)
          ? (n = false)
          : this.Ft !== null && this.ji.containsPoint(t)
            ? (n = true)
            : (n = this.Ah(t))),
      Point.o(i),
      n
    );
  }
  Ah(t) {
    const i = this.naturalBounds;
    return Rect.contains(0, 0, i.width, i.height, t.x, t.y);
  }
  containsRect(t) {
    if (this.angle === 0) return this.actualBounds.containsRect(t);
    const i = this.naturalBounds,
      e = Rect.U(0, 0, i.width, i.height),
      s = this.E;
    let n = false;
    const o = Point.U(t.x, t.y);
    return (
      e.containsPoint(s.De(o)) &&
        (o.e(t.x, t.bottom),
        e.containsPoint(s.De(o)) &&
          (o.e(t.right, t.bottom),
          e.containsPoint(s.De(o)) && (o.e(t.right, t.y), e.containsPoint(s.De(o)) && (n = true)))),
      Point.o(o),
      Rect.o(e),
      n
    );
  }
  containedInRect(t, i) {
    if ((Debug && U.s(t, Rect, GraphObject, "containedInRect:r"), i === void 0))
      return t.containsRect(this.actualBounds);
    const e = this.naturalBounds,
      s = i;
    let n = false;
    const o = Point.U(0, 0);
    return (
      t.containsPoint(s.St(o)) &&
        (o.e(0, e.height),
        t.containsPoint(s.St(o)) &&
          (o.e(e.width, e.height),
          t.containsPoint(s.St(o)) && (o.e(e.width, 0), t.containsPoint(s.St(o)) && (n = true)))),
      Point.o(o),
      n
    );
  }
  intersectsRect(t, i) {
    if ((Debug && U.s(t, Rect, GraphObject, "intersectsRect:r"), i === void 0 && ((i = this.E), this.angle === 0)))
      return t.intersectsRect(this.actualBounds);
    const e = this.naturalBounds,
      s = i,
      n = Point.U(0, 0),
      o = Point.U(0, e.height),
      r = Point.U(e.width, e.height),
      l = Point.U(e.width, 0);
    let h = false;
    if (t.containsPoint(s.St(n)) || t.containsPoint(s.St(o)) || t.containsPoint(s.St(r)) || t.containsPoint(s.St(l)))
      h = true;
    else {
      const a = Rect.U(0, 0, e.width, e.height),
        f = Point.U(t.x, t.y);
      (a.containsPoint(s.De(f))
        ? (h = true)
        : (f.e(t.x, t.bottom),
          a.containsPoint(s.De(f))
            ? (h = true)
            : (f.e(t.right, t.bottom),
              a.containsPoint(s.De(f)) ? (h = true) : (f.e(t.right, t.y), a.containsPoint(s.De(f)) && (h = true)))),
        Point.o(f),
        Rect.o(a),
        h || ((G.cx(t, n, o) || G.cx(t, o, r) || G.cx(t, r, l) || G.cx(t, l, n)) && (h = true)));
    }
    return (Point.o(n), Point.o(o), Point.o(r), Point.o(l), h);
  }
  getDocumentPoint(t, i) {
    if ((i === void 0 && (i = new Point()), t instanceof Spot)) {
      const e = t;
      Debug && e.isNoSpot() && U.n("getDocumentPoint:s Spot must be specific: " + e.toString());
      const s = this.naturalBounds;
      return (i.e(e.x * s.width + e.offsetX, e.y * s.height + e.offsetY), this._s.St(i), i);
    } else return (i.set(t), this._s.St(i), i);
  }
  getDocumentBounds(t) {
    t === void 0 && (t = new Rect());
    const i = this.naturalBounds,
      e = this._s,
      s = Point.U(0, 0).E(e);
    return (
      t.e(s.x, s.y, 0, 0),
      s.e(i.width, 0).E(e),
      t.ai(s.x, s.y, 0, 0),
      s.e(i.width, i.height).E(e),
      t.ai(s.x, s.y, 0, 0),
      s.e(0, i.height).E(e),
      t.ai(s.x, s.y, 0, 0),
      Point.o(s),
      t
    );
  }
  getDocumentAngle() {
    return this._s.QI();
  }
  getDocumentScale() {
    if (this.v0() === false) return this.Oa;
    const t = this.rt;
    return this.panel !== null ? t * this.panel.getDocumentScale() : t;
  }
  getLocalPoint(t, i) {
    return (i === void 0 && (i = new Point()), i.c(t), this._s.De(i), i);
  }
  getNearestIntersectionPoint(t, i, e) {
    return this.Sc(t.x, t.y, i.x, i.y, e);
  }
  Sc(t, i, e, s, n) {
    const o = this.E,
      r = 1 / (o.m11 * o.m22 - o.m12 * o.m21),
      l = o.m22 * r,
      h = -o.m12 * r,
      a = -o.m21 * r,
      f = o.m11 * r,
      c = r * (o.m21 * o.dy - o.m22 * o.dx),
      u = r * (o.m12 * o.dx - o.m11 * o.dy),
      d = t * l + i * a + c,
      m = t * h + i * f + u,
      g = e * l + s * a + c,
      p = e * h + s * f + u;
    n.e(0, 0);
    const y = this.naturalBounds,
      x = G.Il(0, 0, y.width, y.height, d, m, g, p, n);
    return (n.E(o), x);
  }
  gt(t, i, e, s) {
    if (this.vo() === false) return;
    const n = this.hl,
      o = n.right + n.left,
      r = n.top + n.bottom;
    ((t = Math.max(t - o, 0)),
      (i = Math.max(i - r, 0)),
      (e = e || 0),
      (s = s || 0),
      (e = Math.max(e - o, 0)),
      (s = Math.max(s - r, 0)));
    const l = this.angle;
    let h = 0;
    const a = this.desiredSize,
      f = this.W0();
    l === 90 || l === 270
      ? ((t = isFinite(a.height) ? a.height + f : t), (i = isFinite(a.width) ? a.width + f : i))
      : ((t = isFinite(a.width) ? a.width + f : t), (i = isFinite(a.height) ? a.height + f : i));
    let c = e || 0,
      u = s || 0;
    const d = this instanceof Panel;
    switch (this.sn(true)) {
      case 0:
        ((c = 0), (u = 0), d && ((t = 1 / 0), (i = 1 / 0)));
        break;
      case 2:
        (isFinite(t) && t > e && (c = t), isFinite(i) && i > s && (u = i));
        break;
      case 5:
        (isFinite(t) && t > e && (c = t), (u = 0), d && (i = 1 / 0));
        break;
      case 4:
        (isFinite(i) && i > s && (u = i), (c = 0), d && (t = 1 / 0));
        break;
    }
    const g = this.maxSize,
      p = this.minSize;
    (c > g.width && p.width < g.width && (c = g.width),
      u > g.height && p.height < g.height && (u = g.height),
      (e = Math.max(c, p.width)),
      (s = Math.max(u, p.height)),
      g.width < e && (e = Math.min(p.width, e)),
      g.height < s && (s = Math.min(p.height, s)),
      (t = Math.min(g.width, t)),
      (i = Math.min(g.height, i)),
      (t = Math.max(e, t)),
      (i = Math.max(s, i)),
      (l === 90 || l === 270) && ((h = t), (t = i), (i = h), (h = e), (e = s), (s = h)),
      this.ue.di(),
      this.Cd(t, i, e, s),
      this.ue.k(),
      this.ue.isReal() ||
        U.n("Non-real measuredBounds has been set. Object " + this + ", measuredBounds: " + this.ue.toString()),
      this.ke(false));
  }
  Cd(t, i, e, s) {}
  nn() {
    return false;
  }
  Ut(t, i, e, s, n) {
    this.kc();
    const o = Rect.a();
    (o.c(this.Ei),
      this.Ei.di(),
      this.us() === false ? this.Ei.e(t, i, e, s) : this.Th(t, i, e, s),
      this.Ei.k(),
      n === void 0 ? (this.ui = null) : (this.ui = n));
    let r = false;
    if (n !== void 0) r = true;
    else {
      let l = this.panel;
      if ((l !== null && l.fl() && (l = l.panel), l !== null)) {
        const h = l.ji,
          a = this.measuredBounds,
          f = i + a.height,
          c = t + a.width;
        if (
          ((r = !(0 <= t + 0.05 && c <= h.width + 0.05 && 0 <= i + 0.05 && f <= h.height + 0.05)),
          this instanceof TextBlock)
        ) {
          const u = this.naturalBounds;
          (this.j0 > u.height || this.xi > u.width) && (r = true);
        }
      }
    }
    (r ? (this.l |= 256) : (this.l &= -257),
      this.Ei.isReal() ||
        U.n("Non-real actualBounds has been set. Object " + this + ", actualBounds: " + this.Ei.toString()),
      this.Ad(o, this.Ei),
      this.co(false),
      Rect.o(o));
  }
  Th(t, i, e, s) {}
  commonArrange(t, i, e, s) {
    if ((this.Ei.e(t, i, e, s), this.desiredSize.isReal())) return;
    const n = this.ue,
      o = this.hl,
      r = o.right + o.left,
      l = o.top + o.bottom,
      h = n.width + r,
      a = n.height + l;
    ((e += r), (s += l));
    let f = this.sn(true);
    switch ((h === e && a === s && (f = 0), f)) {
      case 0:
        (h > e || a > s) && (this.ke(true), this.gt(h > e ? e : h, a > s ? s : a, 0, 0));
        break;
      case 2:
        (this.ke(true), this.gt(e, s, 0, 0));
        break;
      case 5:
        (this.ke(true), this.gt(e, a, 0, 0));
        break;
      case 4:
        (this.ke(true), this.gt(h, s, 0, 0));
        break;
    }
  }
  Ad(t, i) {
    const e = this.part;
    e !== null &&
      e.diagram !== null &&
      ((e.selectionObject === this || e.resizeObject === this || e.rotateObject === this) && e.FN(true),
      this.L(),
      !t.equalsApproxClose(i) && (e.Lh(), this.J0(e)));
  }
  J0(t) {
    this.portId !== null && (t.FN(true), t instanceof Node && t.invalidateConnectedLinks(void 0, this));
  }
  get shadowVisible() {
    return this.S !== null ? this.S.$0 : null;
  }
  set shadowVisible(t) {
    const i = this.shadowVisible;
    i !== t &&
      (Debug && t !== null && U.i(t, "boolean", GraphObject, "shadowVisible"),
      (this.jt().$0 = t),
      this.is(true),
      this.L(),
      this.t("shadowVisible", i, t));
  }
  dE(t, i) {
    const e = this.naturalBounds,
      s = this.Mh,
      n = s.m11,
      o = s.m21,
      r = s.dx,
      l = s.m12,
      h = s.m22,
      a = s.dy;
    let f = 0,
      c = 0,
      u = f,
      d = c;
    ((f = u * n + d * o + r), (c = u * l + d * h + a));
    let m = f,
      g = c,
      p = 0,
      y = 0;
    ((u = e.width + i), (d = 0), (f = u * n + d * o + r), (c = u * l + d * h + a));
    let x = Math.min(m, f),
      b = Math.min(g, c);
    ((p = Math.max(m + p, f) - x),
      (y = Math.max(g + y, c) - b),
      (m = x),
      (g = b),
      (u = e.width + i),
      (d = e.height + i),
      (f = u * n + d * o + r),
      (c = u * l + d * h + a),
      (x = Math.min(m, f)),
      (b = Math.min(g, c)),
      (p = Math.max(m + p, f) - x),
      (y = Math.max(g + y, c) - b),
      (m = x),
      (g = b),
      (u = 0),
      (d = e.height + i),
      (f = u * n + d * o + r),
      (c = u * l + d * h + a),
      (x = Math.min(m, f)),
      (b = Math.min(g, c)),
      (p = Math.max(m + p, f) - x),
      (y = Math.max(g + y, c) - b),
      (m = x),
      (g = b));
    const S = t.viewportBounds,
      k = S.x,
      P = S.y,
      A = S.width,
      C = S.height;
    return m > A + k || k > p + m || g > C + P || P > y + g;
  }
  vi(t, i) {
    if (this.gE(t, i) || !this.visible) return;
    const e = this.opacity;
    if (e === 0) return;
    let s = 1;
    e !== 1 && ((s = t.globalAlpha), (t.globalAlpha = s * e));
    let n = "";
    this.filter !== "" && ((n = t.filter), (t.filter = this.filter));
    const o = this.E,
      r = this.panel;
    this.v0() === true && this.Bb();
    const l = this.part;
    let h = false,
      a = 0;
    if (l && i.getRenderingHint("drawShadows") && ((h = l.isShadowed), h)) {
      const g = l.shadowOffset;
      a = Math.max(g.y, g.x) * i.scale * i.te;
    }
    const f = this instanceof Panel && this.fl(),
      c = this.Ei;
    if (
      (f && (this.nD(h, t, false, r), this.mE(t, i), this.oD(h, t, false, r), this.rD(h, t, false)),
      f || (!f && (c.width === 0 || c.height === 0 || isNaN(c.x) || isNaN(c.y))))
    ) {
      (e !== 1 && (t.globalAlpha = s), this.filter !== "" && (t.filter = n));
      return;
    }
    const u = this.nn();
    if (!i.Sa && u && this.dE(i, a)) {
      (e !== 1 && (t.globalAlpha = s), this.filter !== "" && (t.filter = n));
      return;
    }
    let d = (this.l & 256) !== 0;
    if ((t.clipInsteadOfFill && (d = false), this instanceof TextBlock && (t.font = this.font), d)) {
      const g = r.Fn() ? r.naturalBounds : r.actualBounds;
      let p = Math.max(c.x, g.x),
        y = Math.max(c.y, g.y),
        x = Math.min(c.right, g.right) - p,
        b = Math.min(c.bottom, g.bottom) - y;
      const S = this.ui;
      if (
        (S !== null && ((p = S.x), (y = S.y), (x = S.width), (b = S.height)), p > c.width + c.x || c.x > g.width + g.x)
      ) {
        (e !== 1 && (t.globalAlpha = s), this.filter !== "" && (t.filter = n));
        return;
      }
      (t.save(), t.beginPath(), t.rect(p, y, x, b), t.clip());
    }
    if (u) {
      if (!l.isVisible()) {
        (e !== 1 && (t.globalAlpha = s), this.filter !== "" && (t.filter = n));
        return;
      }
      if (h) {
        const g = l.shadowOffset;
        (t.shadowsSet(g.x * i.scale * this.scale * i.te, g.y * i.scale * this.scale * i.te, l.shadowBlur),
          t.shadowsOn(),
          (t.shadowColor = l.shadowColor));
      }
    }
    const m = this.naturalBounds;
    if (
      (t.transform(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy),
      this.nD(h, t, u, r),
      this.Ft !== null && (t.commitTransform(), this.zb(t, m, c)),
      this.oD(h, t, u, r),
      this.Dh(t, i),
      this.rD(h, t, u),
      d && (t.restore(), t.clearContextCache(this instanceof Panel)),
      !o.Vk())
    ) {
      const g = 1 / (o.m11 * o.m22 - o.m12 * o.m21);
      t.transform(
        o.m22 * g,
        -o.m12 * g,
        -o.m21 * g,
        o.m11 * g,
        g * (o.m21 * o.dy - o.m22 * o.dx),
        g * (o.m12 * o.dx - o.m11 * o.dy),
      );
    }
    (e !== 1 && (t.globalAlpha = s), this.filter !== "" && (t.filter = n));
  }
  nD(t, i, e, s) {
    (t && this.shadowVisible === true ? i.shadowsOn() : t && this.shadowVisible === false && i.shadowsOff(),
      t && this.Xb(s) && this.shadowVisible === null && i.shadowsOff());
  }
  oD(t, i, e, s) {
    t && (this.Ft !== null || this.Xb(s)) ? (this.Yb(true), this.shadowVisible === null && i.shadowsOff()) : this.Yb(false);
  }
  rD(t, i, e) {
    (t && this.IN() === true && i.shadowsOn(), e && t && i.shadowsOff());
  }
  pE(t, i, e) {
    const s = this.part;
    let n = false;
    (s && t.getRenderingHint("drawShadows") && (n = s.isShadowed),
      i.clipInsteadOfFill && (n = false),
      this.nn() && n && i.shadowsOn(),
      n && this.shadowVisible === true ? i.shadowsOn() : n && this.shadowVisible === false && i.shadowsOff());
    const o = this.panel;
    if ((n && this.Xb(o) && this.shadowVisible === null && i.shadowsOff(), i.cl)) {
      const r = t.computePixelRatio(),
        l = `drop-shadow(${i.shadowOffsetX / r}px ${i.shadowOffsetY / r}px ${i.shadowBlur / r / 2}px ${i.shadowColor})`;
      this.background !== null && e.Ft.setAttributeNS(null, "filter", l);
    }
    return (
      n && (this.Ft !== null || this.Xb(o))
        ? (this.Yb(true), this.shadowVisible === null && i.shadowsOff())
        : this.Yb(false),
      n
    );
  }
  yE(t, i, e, s) {
    if (e.cl) {
      const n = i.computePixelRatio(),
        o = `drop-shadow(${e.shadowOffsetX / n}px ${e.shadowOffsetY / n}px ${e.shadowBlur / n / 2}px ${e.shadowColor})`;
      this.RN(t, o);
    }
    (s && this.IN() === true && e.shadowsOn(), this.nn() && e.shadowsOff());
  }
  Xb(t) {
    return t === null
      ? false
      : (t.fl() && (t = t.panel),
        t.IN() || ((t.type === Panel.Auto || t.type === Panel.Spot) && t.findMainElement() !== this));
  }
  RN(t, i) {}
  zb(t, i, e) {
    const s = this.W0(),
      n = i.x,
      o = i.y,
      r = i.width + s,
      l = i.height + s;
    (this.Cn(t, this.Ft, true, false, i, e),
      this.Ft instanceof Brush && this.Ft.type === 3
        ? (t.beginPath(), t.rect(n - s / 2, o - s / 2, r, l), t.fillContext(this.Ft, false, null))
        : t.fillRect(n - s / 2, o - s / 2, r, l));
  }
  lD(t, i) {
    let e = t.wE(this);
    const s = t.Nh !== null ? t.Nh : t.svg;
    if (s !== null && e !== -1) {
      for (; e !== 0 && !t.elt(e - 1).isVisibleObject(); ) e--;
      if (e === 0) this.xE(t, i, s);
      else {
        const n = t.elt(e - 1).svg;
        n !== null ? n.after(i) : s.appendChild(i);
      }
    }
  }
  xE(t, i, e) {
    if (t.type === Panel.Table) {
      const s = e.getElementsByClassName("idl-ts"),
        n = s.length !== 0 ? s[0] : null;
      n !== null && n.after(i);
    } else e.Ft ? e.Ft.after(i) : e.prepend(i);
  }
  gE(t, i) {
    if (!(t instanceof SVGContext)) return false;
    if (!this.visible || this.opacity === 0)
      return (this.svg !== null && this.svg.parentNode !== null && this.svg.remove(), true);
    const e = this.Ei;
    if (this.nn() && (!this.isVisible() || e.width === 0 || e.height === 0 || isNaN(e.x) || isNaN(e.y)))
      return (this.svg !== null && this.svg.parentNode !== null && this.svg.remove(), true);
    t.setCurrentTransform(1, 0, 0, 1, 0, 0);
    const s = this.panel,
      n = this.Td(t);
    if (this.Pc(t, i, n))
      return (
        this.hD(this.svg),
        this.svg.parentElement !== null
          ? (this.nn() && (t.lastDrawnPart = this.svg), true)
          : (this.nn()
              ? (t.lastDrawnPart !== null ? t.lastDrawnPart.after(this.svg) : t.diagramGroup.prepend(this.svg),
                (t.lastDrawnPart = this.svg))
              : s && this.lD(s, this.svg),
            true)
      );
    if ((this.is(false), this.nn() && this.isShadowed)) {
      const m = this.shadowOffset;
      (t.shadowsSet(m.x * i.scale * this.scale * i.te, m.y * i.scale * this.scale * i.te, this.shadowBlur),
        t.shadowsOn(),
        (t.shadowColor = this.shadowColor));
    }
    (this instanceof TextBlock && (t.font = this.font), (t.currentElement = null));
    const o = this.E,
      r = this instanceof Panel,
      l = this instanceof Panel ? this.fl() : false,
      h = this.svg;
    if ((this.v0() === true && this.Bb(), (t.outerGroup = false), n))
      if (((t.outerGroup = true), r && l)) (t.newGroup(1, 0, 0, 1, 0, 0), (this.svg = t.lastCreatedElement));
      else if (r && this.isClipping) {
        const m = this.findMainElement();
        let g = 0,
          p = 0;
        (m !== null && ((g = m.actualBounds.x), (p = m.actualBounds.y)),
          t.newGroup(o.m11, o.m12, o.m21, o.m22, o.dx + g, o.dy + p),
          (this.svg = t.lastCreatedElement),
          m !== null && t.createOrUpdateClipGroup(this, m.actualBounds),
          (t.currentElement = t.lastCreatedElement));
      } else
        r
          ? (t.newGroup(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy), (this.svg = t.lastCreatedElement))
          : t.newGroup(1, 0, 0, 1, 0, 0);
    const a = this.naturalBounds;
    (r || t.setCurrentTransform(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy),
      this.background !== null &&
        (r
          ? (l && t.setCurrentTransform(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy),
            this.zb(t, a, e),
            l && t.setCurrentTransform(1, 0, 0, 1, 0, 0))
          : (t.setCurrentTransform(o.m11, o.m12, o.m21, o.m22, o.dx, o.dy), this.zb(t, a, e)),
        (t.currentElement.Ft = t.lastCreatedElement),
        t.currentElement.prepend(t.lastCreatedElement)));
    const f = this.pE(i, t, t.currentElement);
    (this.Dh(t, i), r && t.endGroup(), t.outerGroup && t.endGroup());
    const c = t.surface.wd,
      u = r ? this.svg : t.currentElement;
    if (h !== null && h.parentNode !== null && u !== h && (this.panel === null || h.parentNode === this.panel.svg)) {
      const m = this.svg.getAttribute("filter");
      return (
        m !== null && u.setAttribute("filter", m),
        this.filter !== "" && u.setAttributeNS(null, "filter", this.filter),
        h.replaceWith(u),
        (this.svg = u),
        u !== null && this.Z0(t, s, e, u),
        true
      );
    }
    if (((this.svg = u), c !== null && u === null && t.dummyGroup(), u === null)) return true;
    (this.Z0(t, s, e, u), this.yE(u, i, t, f));
    const d = this.nn() ? this.opacity * t.globalAlpha : this.opacity;
    if (
      (d !== 1 && u.setAttributeNS(null, "opacity", d.toString()),
      this.filter !== "" && u.setAttributeNS(null, "filter", this.filter),
      this.nn())
    ) {
      if (h !== null && u !== h && h.parentNode === t.diagramGroup) {
        const m = h.getAttribute("filter");
        (m !== null && u.setAttribute("filter", m), h.replaceWith(u));
      } else t.lastDrawnPart ? t.lastDrawnPart.after(u) : t.diagramGroup.prepend(u);
      t.lastDrawnPart = u;
    } else s !== null && this.lD(s, u);
    return (c !== null && c(this, u), this.hD(u), true);
  }
  hD(t) {
    const i = this,
      e = t.dataset;
    i instanceof GraphObject &&
      (i.portId !== null && (e.portId = i.portId),
      i instanceof Panel &&
        (isNaN(i.itemIndex) || (e.itemIndex = i.itemIndex.toString()),
        i instanceof Part &&
          ((e.className = U.Jn(i)),
          i.key !== void 0 && (e.key = i.key.toString()),
          i.containingGroup !== null && (e.group = i.containingGroup.key.toString()),
          i instanceof Link &&
            (i.fromNode !== null && i.fromNode.key !== void 0 && (e.fromKey = i.fromNode.key.toString()),
            i.fromPortId !== "" && (e.fromPortId = i.fromPortId),
            i.toNode !== null && i.toNode.key !== void 0 && (e.toKey = i.toNode.key.toString()),
            i.toPortId !== "" && (e.toPortId = i.toPortId)))));
  }
  Z0(t, i, e, s) {
    let n = (this.l & 256) !== 0;
    if ((t.clipInsteadOfFill && (n = false), !n)) {
      s.removeAttributeNS(null, "clip-path");
      return;
    }
    const o = i.Fn() ? i.naturalBounds : i.actualBounds;
    let r = Math.max(e.x, o.x),
      l = Math.max(e.y, o.y),
      h = Math.min(e.right, o.right) - r,
      a = Math.min(e.bottom, o.bottom) - l;
    const f = this.ui;
    f !== null && ((r = f.x), (l = f.y), (h = f.width), (a = f.height));
    const c = Rect.U(r, l, Math.max(h, 0), Math.max(a, 0));
    if (this instanceof Panel) {
      const u = Transform.a();
      (u.set(this.E), u.lx(), u.lm(c), Transform.o(u));
    }
    (s.setAttributeNS(
      null,
      "clip-path",
      `path('      M ${c.x},${c.y}       L ${c.width + c.x} ${c.y}       L ${c.width + c.x} ${c.height + c.y}       L ${c.x} ${c.height + c.y} z') view-box`,
    ),
      Rect.o(c));
  }
  bE() {
    if (this.svg === null) return;
    const t = this.svg.innerHTML.match(/url\(#((CLIP|GRAD).+?)\)/g),
      i = this.svg.ownerDocument;
    if (t !== null)
      for (const e of t) {
        const s = i.getElementById(e.split("#")[1].slice(0, -1));
        s !== null && s.remove();
      }
    this.svg.remove();
  }
  mE(t, i) {
    const e = this.Ei,
      s = this.ji,
      n = this.Ft;
    (n !== null && t.commitTransform(),
      n !== null &&
        (this.Cn(t, n, true, false, s, e),
        n instanceof Brush && n.type === 3
          ? (t.beginPath(), t.rect(e.x, e.y, e.width, e.height), t.fillContext(n, false, null))
          : t.fillRect(e.x, e.y, e.width, e.height)),
      this.Dh(t, i));
  }
  Dh(t, i) {}
  Mc() {
    this.is(true);
  }
  Pc(t, i, e) {
    const s = this.svg;
    if (this.SE()) {
      if ((this.Mc(), this.is(false), s === null)) return false;
      const f = s.getAttribute("clip-path");
      if (f !== null && f.includes("url")) {
        const u = t.svg.getElementById(f.split("#")[1].slice(0, -1));
        u !== null && u.remove();
      }
      return (s.getAttribute("filter") && s.removeAttribute("filter"), false);
    }
    if (s === null) return false;
    if (!this.visible) return (s.remove(), false);
    if ((s.nodeName !== "g" && e) || (s.nodeName === "g" && !e)) return false;
    const n = this.E,
      o = "matrix(" + n.m11 + ", " + n.m12 + ", " + n.m21 + ", " + n.m22 + ", " + n.dx + ", " + n.dy + ")",
      r = this instanceof Panel,
      l = r ? this.fl() : false;
    if (!(r && l))
      if (this instanceof Picture) {
        const f = this.Kb;
        (t.setCurrentTransform(n.m11, n.m12, n.m21, n.m22, n.dx, n.dy),
          f !== null && t.amendImageTransform(f[0], f[1], f[2], f[3], f[4], f[5], f[6], f[7]),
          e
            ? s.lastElementChild.setAttributeNS(null, "transform", t.getCurrentTransform())
            : s.setAttributeNS(null, "transform", t.getCurrentTransform()));
      } else if (e && !r)
        if (this instanceof Shape) {
          const f = s.getElementsByTagName("path");
          for (let c = 0; c < f.length; c++) f[c].setAttributeNS(null, "transform", o);
        } else if (this instanceof TextBlock) {
          const f = s.getElementsByTagName("text"),
            c = typeof this.stroke == "string" ? this.stroke : null;
          for (let u = 0; u < f.length; u++)
            (f[u].setAttributeNS(null, "transform", o), c && f[u].setAttributeNS(null, "fill", c));
        } else (s.lastElementChild || s).setAttributeNS(null, "transform", o);
      else if (r && this.isClipping && this.Nh) {
        const f = this.findMainElement(),
          c = f !== null ? f.actualBounds.x : 0,
          u = f !== null ? f.actualBounds.y : 0;
        (this.Nh.setAttributeNS(null, "transform", "matrix(1,0,0,1," + -c + ", " + -u + ")"),
          s.setAttributeNS(
            null,
            "transform",
            "matrix(" +
              n.m11 +
              ", " +
              n.m12 +
              ", " +
              n.m21 +
              ", " +
              n.m22 +
              ", " +
              (n.dx + c) +
              ", " +
              (n.dy + u) +
              ")",
          ));
      } else s.setAttributeNS(null, "transform", o);
    const h = this.nn() ? this.opacity * t.globalAlpha : this.opacity;
    (h === 1 ? s.removeAttribute("opacity") : s.setAttributeNS(null, "opacity", h.toString()),
      t.setCurrentTransform(1, 0, 0, 1, 0, 0));
    const a = this.Nh ? this.Nh : this.Vb;
    if (this.background !== null || a.Ft !== void 0) {
      const f = a.Ft;
      if (this.background === null) (t.removeOldGradient(this, a.Ft, "fill"), a.Ft.remove(), (a.Ft = void 0));
      else {
        if (
          ((l || (e && !(this instanceof Panel))) && t.setCurrentTransform(n.m11, n.m12, n.m21, n.m22, n.dx, n.dy),
          this.zb(t, this.naturalBounds, this.actualBounds),
          a.Ft)
        ) {
          t.removeOldGradient(this, a.Ft, "fill");
          const c = a.Ft.getAttribute("filter");
          (c !== null && t.lastCreatedElement.setAttribute("filter", c), a.Ft.replaceWith(t.lastCreatedElement));
        } else a.prepend(t.lastCreatedElement);
        a.Ft = t.lastCreatedElement;
      }
      f && t.removeOldGradient(this, f, "fill");
    }
    return (this.Z0(t, this.panel, this.actualBounds, s), true);
  }
  Td(t) {
    if (this.background !== null) return true;
    let i = (this.l & 256) !== 0;
    return (t.clipInsteadOfFill && (i = false), !!i);
  }
  static XV(t, i, e, s, n, o, r) {
    let l = 0.001;
    const h = o.length;
    t.moveTo(i, e);
    let a = s - i;
    const f = n - e;
    a === 0 && (a = 0.001);
    const c = f / a;
    let u = Math.sqrt(a * a + f * f),
      d = 0,
      m = true;
    l = o[d % h];
    let g = r !== 0;
    for (; u >= 0.1; ) {
      if (g) {
        for (l = o[d++ % h], l -= r; l < 0; ) ((l += o[d++ % h]), (m = !m));
        g = false;
      } else l = o[d++ % h];
      l > u && (l = u);
      let p = Math.sqrt((l * l) / (1 + c * c));
      (a < 0 && (p = -p), (i += p), (e += c * p), m ? t.lineTo(i, e) : t.moveTo(i, e), (u -= l), (m = !m));
    }
  }
  Cn(t, i, e, s, n, o) {
    let r = 1,
      l = 1;
    if (typeof i == "string") {
      e ? (t.fillStyle = i) : (t.strokeStyle = i);
      return;
    } else if (i.type === 1) {
      e ? (t.fillStyle = i.color) : (t.strokeStyle = i.color);
      return;
    }
    let h;
    const a = this.W0();
    ((r = n.width), (l = n.height), s ? ((r = o.width), (l = o.height)) : e || ((r += a), (l += a)));
    const f = t instanceof CanvasSurfaceContext;
    if (f && i.In && (i.type === 4 || (i.Nc === r && i.Ub === l))) h = i.In;
    else {
      let c = 0,
        u = 0,
        d = 0,
        m = 0,
        g = 0,
        p = 0,
        y = 0,
        x = 0;
      if (
        (s ? ((y = o.x), (x = o.y)) : e || ((y -= a / 2), (x -= a / 2)),
        (c = i.start.x * r + i.start.offsetX + y),
        (u = i.start.y * l + i.start.offsetY + x),
        (d = i.end.x * r + i.end.offsetX + y),
        (m = i.end.y * l + i.end.offsetY + x),
        i.type === 2)
      )
        h = t.createLinearGradient(c, u, d, m);
      else if (i.type === 3)
        ((p = isNaN(i.endRadius) ? Math.max(r, l) / 2 : i.endRadius),
          isNaN(i.startRadius) ? ((g = 0), (p = Math.max(r, l) / 2)) : (g = i.startRadius),
          (h = t.createRadialGradient(c, u, g, d, m, p)));
      else if (i.type === 4)
        try {
          h = t.createPattern(i.pattern, "repeat");
        } catch {
          h = null;
        }
      else U.Li(i.type, "Brush type");
      if (i.type !== 4) {
        const b = i.colorStops;
        if (b !== null) {
          const S = b.iterator;
          for (; S.next(); ) h.addColorStop(S.key, S.value);
        }
      }
      if (f && ((i.In = h), h !== null && ((i.Nc = r), (i.Ub = l)), h === null && i.type === 4 && i.Nc !== -1)) {
        i.Nc = -1;
        const b = this.diagram;
        b !== null &&
          i.Nc === -1 &&
          U.yn(() => {
            b.redraw();
          }, 600);
      }
    }
    e ? (t.fillStyle = h) : (t.strokeStyle = h);
  }
  isContainedBy(t) {
    return t instanceof Panel ? this.kE(this, t) : false;
  }
  kE(t, i) {
    if (t === i || i === null) return false;
    let e = t.panel;
    for (; e !== null; ) {
      if (e === i) return true;
      e = e.panel;
    }
    return false;
  }
  isVisibleObject() {
    if (!this.visible) return false;
    const t = this.panel;
    return t !== null ? t.isVisibleObject() : true;
  }
  isEnabledObject() {
    let t = this instanceof Panel ? this : this.panel;
    for (; t !== null && t.isEnabled; ) t = t.panel;
    return t === null;
  }
  get enabledChanged() {
    return this.S !== null ? this.S.Q0 : null;
  }
  set enabledChanged(t) {
    const i = this.enabledChanged;
    i !== t &&
      (t !== null && U.C(t, GraphObject, "enabledChanged"), (this.jt().Q0 = t), this.t("enabledChanged", i, t));
  }
  Bb() {
    if (this.Gb() === true) {
      const t = this.ll;
      if ((t.Ki(), !this.Ei.isReal() || !this.ue.isReal())) {
        (this.Ld(false), this.Fh(false));
        return;
      }
      if ((t.vs(this.Ei.x - this.ue.x, this.Ei.y - this.ue.y), this.scale !== 1 || this.angle !== 0)) {
        const i = this.naturalBounds;
        this.H0(t, i.x, i.y, i.width, i.height);
      }
      (this.Ld(false), this.Fh(true));
    }
    if (this.v0() === true) {
      const t = this.panel;
      if (t === null) (this.Mh.set(this.ll), (this.Oa = this.scale));
      else if (t._s !== null) {
        const i = this.Mh;
        (i.Ki(),
          t.Fn() ? i.Cf(t.Mh) : t.panel !== null && i.Cf(t.panel.Mh),
          i.Cf(this.ll),
          (this.Oa = this.scale * t.Oa));
      }
      this.Fh(false);
    }
  }
  H0(t, i, e, s, n) {
    if ((this.rt !== 1 && t.rt(this.rt), this.vt === 0)) return;
    const o = Point.a();
    (o.setSpot(i, e, s, n, Spot.Center), t.Ns(this.vt, o.x, o.y), Point.o(o));
  }
  g(t) {
    if (this.vo()) return;
    (t === void 0 && (t = false), this.ke(true), this.co(true));
    const i = this.panel;
    i !== null && !t && i.g();
  }
  Cc() {
    this.vo() || (this.ke(true), this.co(true));
  }
  Ac(t) {
    if (this.us()) return;
    const i = this.panel;
    (!t && i !== null && i.g(), this.co(true));
  }
  kc() {
    this.Gb() === false && (this.Ld(true), this.Fh(true));
  }
  ON() {
    this.Fh(true);
  }
  L() {
    const t = this.part;
    t !== null && t.L();
  }
  sn(t) {
    const i = this.stretch,
      e = this.panel;
    if (e === null) return this.Zo(i === 1 ? 0 : i, t);
    if (e.type === Panel.Table) return this._0(e.getRowDefinition(this.row), e.getColumnDefinition(this.column), t);
    if (e.type === Panel.Auto && e.findMainElement() === this) return this.Zo(2, t);
    if (i === 1) {
      if (e.type === Panel.Spot && e.findMainElement() === this) return this.Zo(2, t);
      const s = e.defaultStretch;
      return s === 1 ? this.Zo(0, t) : this.Zo(s, t);
    }
    return this.Zo(i, t);
  }
  _0(t, i, e) {
    const s = this.stretch;
    if (s !== 1) return this.Zo(s, e);
    let n = null,
      o = null;
    switch (t.stretch) {
      case 1:
      case 5:
        break;
      case 4:
        o = true;
        break;
      case 2:
        o = true;
        break;
    }
    switch (i.stretch) {
      case 1:
      case 4:
        break;
      case 5:
        n = true;
        break;
      case 2:
        n = true;
        break;
    }
    const r = this.panel.defaultStretch;
    return (
      n === null && (n = r === 5 || r === 2),
      o === null && (o = r === 4 || r === 2),
      n === true && o === true ? this.Zo(2, e) : n === true ? this.Zo(5, e) : o === true ? this.Zo(4, e) : this.Zo(0, e)
    );
  }
  Zo(t, i) {
    if (i) return t;
    if (t === 0) return 0;
    const e = this.desiredSize;
    if (e.isReal()) return 0;
    const s = !isNaN(e.width),
      n = !isNaN(e.height),
      o = this.angle;
    if (s)
      if (o !== 90 && o !== 270) {
        if (t === 5) return 0;
        if (t === 2) return 4;
      } else {
        if (t === 4) return 0;
        if (t === 2) return 5;
      }
    if (n)
      if (o !== 90 && o !== 270) {
        if (t === 4) return 0;
        if (t === 2) return 5;
      } else {
        if (t === 5) return 0;
        if (t === 2) return 4;
      }
    return t;
  }
  get segmentOrientation() {
    return this.Xt !== null ? this.Xt.tp : 0;
  }
  set segmentOrientation(t) {
    const i = this.segmentOrientation;
    i !== t &&
      (Debug && U.W(t, Orientation, "Orientation"),
      this.Xt === null && (this.Xt = new LinkElementSettings()),
      (this.Xt.tp = t),
      this.g(),
      this.t("segmentOrientation", i, t),
      t === 0 && (this.angle = 0));
  }
  PE() {
    this.segmentOrientation = 21;
  }
  get segmentIndex() {
    return this.Xt !== null ? this.Xt.ip : -1 / 0;
  }
  set segmentIndex(t) {
    (Debug && U.i(t, "number", GraphObject, "segmentIndex"), (t = Math.round(t)));
    const i = this.segmentIndex;
    i !== t &&
      (this.Xt === null && (this.Xt = new LinkElementSettings()),
      (this.Xt.ip = t),
      this.g(),
      this.t("segmentIndex", i, t));
  }
  get segmentFraction() {
    return this.Xt !== null ? this.Xt.ep : 0;
  }
  set segmentFraction(t) {
    (Debug && U.r(t, GraphObject, "segmentFraction"), t < 0 ? (t = 0) : t > 1 && (t = 1));
    const i = this.segmentFraction;
    i !== t &&
      (this.Xt === null && (this.Xt = new LinkElementSettings()),
      (this.Xt.ep = t),
      this.g(),
      this.t("segmentFraction", i, t));
  }
  get segmentOffset() {
    return this.Xt !== null ? this.Xt.sp : Point.wn;
  }
  set segmentOffset(t) {
    const i = this.segmentOffset;
    i.equals(t) ||
      (Debug && U.s(t, Point, GraphObject, "segmentOffset"),
      (t = t.T()),
      this.Xt === null && (this.Xt = new LinkElementSettings()),
      (this.Xt.sp = t),
      this.g(),
      this.t("segmentOffset", i, t));
  }
  get stretch() {
    return this.S !== null ? this.S.uo : 1;
  }
  set stretch(t) {
    const i = this.stretch;
    i !== t && (Debug && U.W(t, Stretch, "Stretch"), (this.jt().uo = t), this.g(), this.t("stretch", i, t));
  }
  get name() {
    return this.S !== null ? this.S.At : "";
  }
  set name(t) {
    const i = this.name;
    i !== t &&
      (Debug && U.i(t, "string", GraphObject, "name"),
      (this.jt().At = t),
      this.part !== null && this.part.np(),
      this.t("name", i, t));
  }
  get opacity() {
    return this.ei;
  }
  set opacity(t) {
    (Debug && U.r(t, GraphObject, "opacity"), t < 0 ? (t = 0) : t > 1 && (t = 1));
    const i = this.opacity;
    if (i !== t) {
      ((this.ei = t), this.t("opacity", i, t));
      const e = this.diagram,
        s = this.part;
      e !== null && s !== null && e.L(s.ga(s.actualBounds));
    }
  }
  get filter() {
    return this.G0;
  }
  set filter(t) {
    const i = this.filter;
    if (i !== t) {
      (Debug && U.i(t, "string", GraphObject, "filter"), (this.G0 = t), this.is(true), this.t("filter", i, t));
      const e = this.diagram,
        s = this.part;
      e !== null && s !== null && e.L(s.ga(s.actualBounds));
    }
  }
  get visible() {
    return (this.l & 1) !== 0;
  }
  set visible(t) {
    const i = (this.l & 1) !== 0;
    if (i !== t) {
      (Debug && U.i(t, "boolean", GraphObject, "visible"), (this.l = this.l ^ 1), this.Mc(), this.t("visible", i, t));
      const e = this.panel;
      (e !== null ? e.g() : this.nn() && this.Hi(t), this.L(), this.aD());
    }
  }
  get pickable() {
    return (this.l & 2) !== 0;
  }
  set pickable(t) {
    const i = (this.l & 2) !== 0;
    i !== t && (Debug && U.i(t, "boolean", GraphObject, "pickable"), (this.l = this.l ^ 2), this.t("pickable", i, t));
  }
  get fromLinkableDuplicates() {
    return (this.l & 4) !== 0;
  }
  set fromLinkableDuplicates(t) {
    const i = (this.l & 4) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", GraphObject, "fromLinkableDuplicates"),
      (this.l = this.l ^ 4),
      this.t("fromLinkableDuplicates", i, t));
  }
  get fromLinkableSelfNode() {
    return (this.l & 8) !== 0;
  }
  set fromLinkableSelfNode(t) {
    const i = (this.l & 8) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", GraphObject, "fromLinkableSelfNode"),
      (this.l = this.l ^ 8),
      this.t("fromLinkableSelfNode", i, t));
  }
  get toLinkableDuplicates() {
    return (this.l & 16) !== 0;
  }
  set toLinkableDuplicates(t) {
    const i = (this.l & 16) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", GraphObject, "toLinkableDuplicates"),
      (this.l = this.l ^ 16),
      this.t("toLinkableDuplicates", i, t));
  }
  get toLinkableSelfNode() {
    return (this.l & 32) !== 0;
  }
  set toLinkableSelfNode(t) {
    const i = (this.l & 32) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", GraphObject, "toLinkableSelfNode"),
      (this.l = this.l ^ 32),
      this.t("toLinkableSelfNode", i, t));
  }
  get isPanelMain() {
    return (this.l & 64) !== 0;
  }
  set isPanelMain(t) {
    const i = (this.l & 64) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", GraphObject, "isPanelMain"),
      (this.l = this.l ^ 64),
      this.g(),
      this.t("isPanelMain", i, t));
  }
  get isActionable() {
    return (this.l & 128) !== 0;
  }
  set isActionable(t) {
    const i = (this.l & 128) !== 0;
    i !== t &&
      (Debug && U.i(t, "boolean", GraphObject, "isActionable"), (this.l = this.l ^ 128), this.t("isActionable", i, t));
  }
  get background() {
    return this.Ft;
  }
  set background(t) {
    const i = this.background;
    i !== t &&
      (t !== null && Brush.Dd(t, "GraphObject.background"),
      t instanceof Brush && t.k(),
      (this.Ft = t),
      this.L(),
      this.t("background", i, t));
  }
  IN() {
    return (this.l & 512) !== 0;
  }
  Yb(t) {
    t ? (this.l |= 512) : (this.l &= -513);
  }
  bc() {
    return (this.l & 1024) !== 0;
  }
  EN(t) {
    t ? (this.l |= 1024) : (this.l &= -1025);
  }
  Gb() {
    return (this.l & 2048) !== 0;
  }
  Ld(t) {
    t ? (this.l |= 2048) : (this.l &= -2049);
  }
  v0() {
    return (this.l & 4096) !== 0;
  }
  Fh(t) {
    t ? (this.l |= 4096) : (this.l &= -4097);
  }
  vo() {
    return (this.l & 8192) !== 0;
  }
  ke(t) {
    t ? (this.l |= 8192) : (this.l &= -8193);
  }
  us() {
    return (this.l & 16384) !== 0;
  }
  co(t) {
    t ? (this.l |= 16384) : (this.l &= -16385);
  }
  SE() {
    return (this.l & 32768) !== 0;
  }
  is(t) {
    t ? (this.l |= 32768) : (this.l &= -32769);
  }
  get part() {
    if (this.nn()) return this;
    if (this.al !== null) return this.al;
    let t = this;
    for (t = t.panel; t; ) {
      if (t instanceof Part) return ((this.al = t), t);
      t = t.panel;
    }
    return null;
  }
  get svg() {
    return this.Vb;
  }
  set svg(t) {
    this.Vb = t;
  }
  tc() {
    this.svg = null;
  }
  get panel() {
    return this.en;
  }
  Ua(t) {
    ((this.en = t), this.svg !== null && this.svg.remove());
  }
  get layer() {
    const t = this.part;
    return t !== null ? t.layer : null;
  }
  get diagram() {
    const t = this.part;
    return t !== null ? t.diagram : null;
  }
  get position() {
    return this.yt;
  }
  set position(t) {
    Debug && U.s(t, Point, GraphObject, "position");
    const i = t.x,
      e = t.y,
      s = this.position,
      n = s.x,
      o = s.y;
    (n !== i && (!isNaN(n) || !isNaN(i))) || (o !== e && (!isNaN(o) || !isNaN(e)))
      ? ((t = t.copy()), this.VN(t, n, o) && this.t("position", new Point(n, o), t.copy()))
      : this.BN();
  }
  BN() {}
  VN(t, i, e) {
    return ((this.yt = t), this.Ac(), true);
  }
  Gf(t, i, e) {
    (this.yt.x === t && this.yt.y === i) || (this.yt.e(t, i), this.kc());
  }
  get actualBounds() {
    return this.Ei;
  }
  get scale() {
    return this.rt;
  }
  set scale(t) {
    const i = this.scale;
    i !== t &&
      (Debug && U.r(t, GraphObject, "scale"),
      t <= 0 && U.n("GraphObject.scale for " + this + " must be greater than zero, not: " + t),
      (this.rt = t),
      this.g(),
      this.t("scale", i, t));
  }
  get angle() {
    return this.vt;
  }
  set angle(t) {
    const i = this.angle;
    if (i !== t) {
      if ((Debug && U.r(t, GraphObject, "angle"), (t = t % 360), t < 0 && (t += 360), i === t)) return;
      ((this.vt = t), this.aD(), this.g(), this.t("angle", i, t));
    }
  }
  get desiredSize() {
    return this.gs;
  }
  set desiredSize(t) {
    Debug && U.s(t, Size, GraphObject, "desiredSize");
    const i = t.width,
      e = t.height,
      s = this.desiredSize,
      n = s.width,
      o = s.height;
    if (
      ((n !== i && (!isNaN(n) || !isNaN(i))) || (o !== e && (!isNaN(o) || !isNaN(e)))) &&
      ((t = t.T()), (this.gs = t), this.g(), this instanceof Shape && this.ce(), this.t("desiredSize", s, t), this.bc())
    ) {
      const r = this.part;
      r !== null && (this.Ka(r, "width"), this.Ka(r, "height"));
    }
  }
  get width() {
    return this.gs.width;
  }
  set width(t) {
    const i = this.gs.width;
    if (i !== t && (!isNaN(i) || !isNaN(t))) {
      Debug && U.i(t, "number", GraphObject, "width");
      const e = this.gs,
        s = new Size(t, this.gs.height).k();
      if (((this.gs = s), this.g(), this instanceof Shape && this.ce(), this.t("desiredSize", e, s), this.bc())) {
        const n = this.part;
        n !== null && this.Ka(n, "width");
      }
    }
  }
  get height() {
    return this.gs.height;
  }
  set height(t) {
    const i = this.gs.height;
    if (i !== t && (!isNaN(i) || !isNaN(t))) {
      Debug && U.i(t, "number", GraphObject, "height");
      const e = this.gs,
        s = new Size(this.gs.width, t).k();
      if (((this.gs = s), this.g(), this instanceof Shape && this.ce(), this.t("desiredSize", e, s), this.bc())) {
        const n = this.part;
        n !== null && this.Ka(n, "height");
      }
    }
  }
  get minSize() {
    return this.S !== null ? this.S.Dr : Size.sa;
  }
  set minSize(t) {
    const i = this.minSize;
    i.equals(t) ||
      (Debug && U.s(t, Size, GraphObject, "minSize"),
      (t = t.copy()),
      isNaN(t.width) && (t.width = 0),
      isNaN(t.height) && (t.height = 0),
      t.k(),
      (this.jt().Dr = t),
      this.g(),
      this.t("minSize", i, t));
  }
  get maxSize() {
    return this.S !== null ? this.S.Fr : Size.Zw;
  }
  set maxSize(t) {
    const i = this.maxSize;
    i.equals(t) ||
      (Debug && U.s(t, Size, GraphObject, "maxSize"),
      (t = t.copy()),
      isNaN(t.width) && (t.width = 1 / 0),
      isNaN(t.height) && (t.height = 1 / 0),
      t.k(),
      (this.jt().Fr = t),
      this.g(),
      this.t("maxSize", i, t));
  }
  get measuredBounds() {
    return this.ue;
  }
  get naturalBounds() {
    return this.ji;
  }
  W0() {
    return 0;
  }
  get margin() {
    return this.hl;
  }
  set margin(t) {
    typeof t == "number" ? (t = new Margin(t)) : Debug && U.s(t, Margin, GraphObject, "margin");
    const i = this.hl;
    i.equals(t) || ((t = t.T()), (this.hl = t), this.g(), this.t("margin", i, t));
  }
  get E() {
    return (this.Gb() === true && this.Bb(), this.ll);
  }
  get _s() {
    return (this.v0() === true && this.Bb(), this.Mh);
  }
  trigger(t, i, e) {
    let s = null;
    return (
      typeof t == "string" ? (s = new AnimationTrigger(t, i, e)) : (s = t),
      (s.Re = this),
      this.Rs === null && (this.Rs = new GMap()),
      this.Rs.set(s.propertyName, s),
      this
    );
  }
  get Rs() {
    return this.S !== null ? this.S.Rs : null;
  }
  set Rs(t) {
    this.Rs !== t && (this.jt().Rs = t);
  }
  get Lr() {
    return this.S !== null ? this.S.Lr : 0;
  }
  set Lr(t) {
    this.Lr !== t && (this.jt().Lr = t);
  }
  get alignment() {
    return this.pi;
  }
  set alignment(t) {
    const i = this.alignment;
    i.equals(t) ||
      (Debug && U.s(t, Spot, GraphObject, "alignment"),
      t.isNoSpot() &&
        !t.isDefault() &&
        U.n("GraphObject.alignment for " + this + " must be a real Spot or Spot.Default, not: " + t),
      (t = t.T()),
      (this.pi = t),
      this.Ac(),
      this.t("alignment", i, t));
  }
  get column() {
    return this.Ph;
  }
  set column(t) {
    (Debug && U.r(t, GraphObject, "column"), (t = Math.round(t)));
    const i = this.column;
    i !== t &&
      (t < 0 && U.G(t, ">= 0", GraphObject, "column"),
      (this.Ph = t),
      this.g(),
      this.t("column", i, t),
      this.svg !== null && this.svg.remove());
  }
  get columnSpan() {
    return this.S !== null ? this.S.op : 1;
  }
  set columnSpan(t) {
    (Debug && U.i(t, "number", GraphObject, "columnSpan"), (t = Math.round(t)));
    const i = this.columnSpan;
    i !== t &&
      (t < 1 && U.G(t, ">= 1", GraphObject, "columnSpan"), (this.jt().op = t), this.g(), this.t("columnSpan", i, t));
  }
  get row() {
    return this.U0;
  }
  set row(t) {
    (Debug && U.r(t, GraphObject, "row"), (t = Math.round(t)));
    const i = this.row;
    i !== t &&
      (t < 0 && U.G(t, ">= 0", GraphObject, "row"),
      (this.U0 = t),
      this.g(),
      this.t("row", i, t),
      this.svg !== null && this.svg.remove());
  }
  get rowSpan() {
    return this.S !== null ? this.S.rp : 1;
  }
  set rowSpan(t) {
    (Debug && U.i(t, "number", GraphObject, "rowSpan"), (t = Math.round(t)));
    const i = this.rowSpan;
    i !== t && (t < 1 && U.G(t, ">= 1", GraphObject, "rowSpan"), (this.jt().rp = t), this.g(), this.t("rowSpan", i, t));
  }
  get spanAllocation() {
    return this.S !== null ? this.S.lp : null;
  }
  set spanAllocation(t) {
    const i = this.spanAllocation;
    i !== t &&
      (t !== null && U.C(t, GraphObject, "spanAllocation"),
      (this.jt().lp = t),
      this.g(),
      this.t("spanAllocation", i, t));
  }
  get alignmentFocus() {
    return this.Md;
  }
  set alignmentFocus(t) {
    const i = this.alignmentFocus;
    i.equals(t) ||
      (Debug && U.s(t, Spot, GraphObject, "alignmentFocus"),
      Debug &&
        t.isNoSpot() &&
        !t.isDefault() &&
        !(t.isNone() && this instanceof Node) &&
        U.n("GraphObject.alignmentFocus must be a real Spot or Spot.Default, not: " + t),
      (t = t.T()),
      (this.Md = t),
      this.g(),
      this.t("alignmentFocus", i, t));
  }
  get portId() {
    return this.K0;
  }
  set portId(t) {
    const i = this.portId;
    if (i !== t) {
      Debug && t !== null && U.i(t, "string", GraphObject, "portId");
      const e = this.part;
      e !== null && !(e instanceof Node) && U.n("Cannot set portID on a Link: " + t);
      const s = e;
      (i !== null && s !== null && s.zN(this),
        (this.K0 = t),
        t !== null && s !== null && ((s.Rn = true), s.fD(this)),
        this.t("portId", i, t));
    }
  }
  Ga() {
    const t = this.part;
    if (t instanceof Node && (this.portId !== null || this === t.port)) {
      const i = t.diagram;
      i !== null && !i.undoManager.isUndoingRedoing && t.invalidateConnectedLinks(void 0, this);
    }
  }
  aD() {
    const t = this.diagram;
    t === null ||
      t.undoManager.isUndoingRedoing ||
      (this instanceof Panel
        ? this instanceof Node
          ? this.invalidateConnectedLinks()
          : this.walkVisualTreeFrom(this, (i) => {
              i.Ga();
            })
        : this.Ga());
  }
  get toSpot() {
    return this.wt !== null ? this.wt.Va : Spot.None;
  }
  set toSpot(t) {
    const i = this.toSpot;
    i.equals(t) ||
      (Debug && U.s(t, Spot, GraphObject, "toSpot"),
      (t = t.T()),
      (this.ts().Va = t),
      this.t("toSpot", i, t),
      this.Ga());
  }
  get toEndSegmentLength() {
    return this.wt !== null ? this.wt.za : 10;
  }
  set toEndSegmentLength(t) {
    const i = this.toEndSegmentLength;
    i !== t &&
      (Debug && U.i(t, "number", GraphObject, "toEndSegmentLength"),
      t < 0 && U.G(t, ">= 0", GraphObject, "toEndSegmentLength"),
      (this.ts().za = t),
      this.t("toEndSegmentLength", i, t),
      this.Ga());
  }
  get toShortLength() {
    return this.wt !== null ? this.wt.Ya : 0;
  }
  set toShortLength(t) {
    const i = this.toShortLength;
    i !== t &&
      (Debug && U.i(t, "number", GraphObject, "toShortLength"),
      (this.ts().Ya = t),
      this.t("toShortLength", i, t),
      this.Ga());
  }
  get toLinkable() {
    return this.wt !== null ? this.wt.hp : null;
  }
  set toLinkable(t) {
    const i = this.toLinkable;
    i !== t &&
      (Debug && t !== null && U.i(t, "boolean", GraphObject, "toLinkable"),
      (this.ts().hp = t),
      this.t("toLinkable", i, t));
  }
  get toMaxLinks() {
    return this.wt !== null ? this.wt.ap : 1 / 0;
  }
  set toMaxLinks(t) {
    const i = this.toMaxLinks;
    i !== t &&
      (Debug && U.i(t, "number", GraphObject, "toMaxLinks"),
      t < 0 && U.G(t, ">= 0", GraphObject, "toMaxLinks"),
      (this.ts().ap = t),
      this.t("toMaxLinks", i, t));
  }
  get fromSpot() {
    return this.wt !== null ? this.wt.Ea : Spot.None;
  }
  set fromSpot(t) {
    const i = this.fromSpot;
    i.equals(t) ||
      (Debug && U.s(t, Spot, GraphObject, "fromSpot"),
      (t = t.T()),
      (this.ts().Ea = t),
      this.t("fromSpot", i, t),
      this.Ga());
  }
  get fromEndSegmentLength() {
    return this.wt !== null ? this.wt.Ba : 10;
  }
  set fromEndSegmentLength(t) {
    const i = this.fromEndSegmentLength;
    i !== t &&
      (Debug && U.i(t, "number", GraphObject, "fromEndSegmentLength"),
      t < 0 && U.G(t, ">= 0", GraphObject, "fromEndSegmentLength"),
      (this.ts().Ba = t),
      this.t("fromEndSegmentLength", i, t),
      this.Ga());
  }
  get fromShortLength() {
    return this.wt !== null ? this.wt.Xa : 0;
  }
  set fromShortLength(t) {
    const i = this.fromShortLength;
    i !== t &&
      (Debug && U.i(t, "number", GraphObject, "fromShortLength"),
      (this.ts().Xa = t),
      this.t("fromShortLength", i, t),
      this.Ga());
  }
  get fromLinkable() {
    return this.wt !== null ? this.wt.fp : null;
  }
  set fromLinkable(t) {
    const i = this.fromLinkable;
    i !== t &&
      (Debug && t !== null && U.i(t, "boolean", GraphObject, "fromLinkable"),
      (this.ts().fp = t),
      this.t("fromLinkable", i, t));
  }
  get fromMaxLinks() {
    return this.wt !== null ? this.wt.cp : 1 / 0;
  }
  set fromMaxLinks(t) {
    const i = this.fromMaxLinks;
    i !== t &&
      (Debug && U.i(t, "number", GraphObject, "fromMaxLinks"),
      t < 0 && U.G(t, ">= 0", GraphObject, "fromMaxLinks"),
      (this.ts().cp = t),
      this.t("fromMaxLinks", i, t));
  }
  get cursor() {
    return this.S !== null ? this.S.Kl : "";
  }
  set cursor(t) {
    const i = this.cursor;
    i !== t && (U.i(t, "string", GraphObject, "cursor"), (this.jt().Kl = t), this.t("cursor", i, t));
  }
  get click() {
    return this.S !== null ? this.S.Kr : null;
  }
  set click(t) {
    const i = this.click;
    i !== t && (t !== null && U.C(t, GraphObject, "click"), (this.jt().Kr = t), this.t("click", i, t));
  }
  get doubleClick() {
    return this.S !== null ? this.S.Ur : null;
  }
  set doubleClick(t) {
    const i = this.doubleClick;
    i !== t && (t !== null && U.C(t, GraphObject, "doubleClick"), (this.jt().Ur = t), this.t("doubleClick", i, t));
  }
  get contextClick() {
    return this.S !== null ? this.S.Gr : null;
  }
  set contextClick(t) {
    const i = this.contextClick;
    i !== t && (t !== null && U.C(t, GraphObject, "contextClick"), (this.jt().Gr = t), this.t("contextClick", i, t));
  }
  get mouseEnter() {
    return this.S !== null ? this.S.jr : null;
  }
  set mouseEnter(t) {
    const i = this.mouseEnter;
    i !== t && (t !== null && U.C(t, GraphObject, "mouseEnter"), (this.jt().jr = t), this.t("mouseEnter", i, t));
  }
  get mouseLeave() {
    return this.S !== null ? this.S.Jr : null;
  }
  set mouseLeave(t) {
    const i = this.mouseLeave;
    i !== t && (t !== null && U.C(t, GraphObject, "mouseLeave"), (this.jt().Jr = t), this.t("mouseLeave", i, t));
  }
  get mouseOver() {
    return this.S !== null ? this.S.qr : null;
  }
  set mouseOver(t) {
    const i = this.mouseOver;
    i !== t && (t !== null && U.C(t, GraphObject, "mouseOver"), (this.jt().qr = t), this.t("mouseOver", i, t));
  }
  get mouseHover() {
    return this.S !== null ? this.S.Hr : null;
  }
  set mouseHover(t) {
    const i = this.mouseHover;
    i !== t && (t !== null && U.C(t, GraphObject, "mouseHover"), (this.jt().Hr = t), this.t("mouseHover", i, t));
  }
  get mouseHold() {
    return this.S !== null ? this.S.vr : null;
  }
  set mouseHold(t) {
    const i = this.mouseHold;
    i !== t && (t !== null && U.C(t, GraphObject, "mouseHold"), (this.jt().vr = t), this.t("mouseHold", i, t));
  }
  get mouseDragEnter() {
    return this.S !== null ? this.S.dp : null;
  }
  set mouseDragEnter(t) {
    const i = this.mouseDragEnter;
    i !== t &&
      (t !== null && U.C(t, GraphObject, "mouseDragEnter"), (this.jt().dp = t), this.t("mouseDragEnter", i, t));
  }
  get mouseDragLeave() {
    return this.S !== null ? this.S.gp : null;
  }
  set mouseDragLeave(t) {
    const i = this.mouseDragLeave;
    i !== t &&
      (t !== null && U.C(t, GraphObject, "mouseDragLeave"), (this.jt().gp = t), this.t("mouseDragLeave", i, t));
  }
  get mouseDrop() {
    return this.S !== null ? this.S.Wr : null;
  }
  set mouseDrop(t) {
    const i = this.mouseDrop;
    i !== t && (t !== null && U.C(t, GraphObject, "mouseDrop"), (this.jt().Wr = t), this.t("mouseDrop", i, t));
  }
  get actionDown() {
    return this.S !== null ? this.S.mp : null;
  }
  set actionDown(t) {
    const i = this.actionDown;
    i !== t && (t !== null && U.C(t, GraphObject, "actionDown"), (this.jt().mp = t), this.t("actionDown", i, t));
  }
  get actionMove() {
    return this.S !== null ? this.S.pp : null;
  }
  set actionMove(t) {
    const i = this.actionMove;
    i !== t && (t !== null && U.C(t, GraphObject, "actionMove"), (this.jt().pp = t), this.t("actionMove", i, t));
  }
  get actionUp() {
    return this.S !== null ? this.S.yp : null;
  }
  set actionUp(t) {
    const i = this.actionUp;
    i !== t && (t !== null && U.C(t, GraphObject, "actionUp"), (this.jt().yp = t), this.t("actionUp", i, t));
  }
  get actionCancel() {
    return this.S !== null ? this.S.wp : null;
  }
  set actionCancel(t) {
    const i = this.actionCancel;
    i !== t && (t !== null && U.C(t, GraphObject, "actionCancel"), (this.jt().wp = t), this.t("actionCancel", i, t));
  }
  get toolTip() {
    return this.S !== null ? this.S.$r : null;
  }
  set toolTip(t) {
    const i = this.toolTip;
    i !== t &&
      (Debug &&
        t !== null &&
        !(t instanceof Adornment || t instanceof HTMLInfo) &&
        U.n("GraphObject.toolTip must be an Adornment or HTMLInfo."),
      (this.jt().$r = t),
      this.t("toolTip", i, t));
  }
  get contextMenu() {
    return this.S !== null ? this.S.Zr : null;
  }
  set contextMenu(t) {
    const i = this.contextMenu;
    i !== t &&
      (Debug &&
        !(t instanceof Adornment || t instanceof HTMLInfo) &&
        U.n("GraphObject.contextMenu must be an Adornment or HTMLInfo."),
      (this.jt().Zr = t),
      this.t("contextMenu", i, t));
  }
  findBindingPanel() {
    let t = this instanceof Panel ? this : this.panel;
    for (; t !== null; ) {
      if (t.XN()) return t;
      t = t.panel;
    }
    return null;
  }
  bind(t, i, e, s) {
    return (this.Tc(t, i, e, s), this);
  }
  bindTwoWay(t, i, e, s) {
    return (this.Tc(t, i, e, s).makeTwoWay(), this);
  }
  bindModel(t, i, e, s) {
    return (this.Tc(t, i, e, s).ofModel(), this);
  }
  bindObject(t, i, e, s, n) {
    return (this.Tc(t, i, e, s).ofObject(n), this);
  }
  theme(t, i, e, s, n) {
    return (this.Ih(t, i, e, s, n), this);
  }
  themeData(t, i, e, s, n) {
    return (this.Ih(t, i, e, s, n).ofData(), this);
  }
  themeObject(t, i, e, s, n, o) {
    return (this.Ih(t, i, e, s, n).ofObject(o), this);
  }
  themeModel(t, i, e, s, n) {
    return (this.Ih(t, i, e, s, n).ofModel(), this);
  }
  Tc(t, i, e, s) {
    let n = null;
    return (typeof t == "string" ? (n = new Binding(t, i, e, s)) : (n = t), this.xp(n), n);
  }
  Ih(t, i, e, s, n) {
    let o = null;
    return (typeof t == "string" ? (o = new ThemeBinding(t, i, e, s, n)) : (o = t), this.xp(o), o);
  }
  xp(t) {
    t.Re = this;
    const i = this.findBindingPanel();
    (i !== null && i.cD() && U.n("Cannot add a Binding to a template that has already been copied: " + t),
      this.Vi === null && (this.Vi = new List()),
      this.Vi.add(t));
  }
  set(t) {
    if (!t) return this;
    if (Debug)
      for (const i in t)
        (i.startsWith("_") || i.indexOf(".") !== -1) &&
          U.n("Property with underscore or period passed to GraphObject.set. Did you mean to use GraphObject.attach?");
    return (Object.assign(this, t), this);
  }
  attach(t) {
    return (GraphObject.YN(this, t), this);
  }
  apply(t, ...i) {
    return (t.apply(this, [this, ...i]), this);
  }
  setProperties(t) {
    return (Diagram.L0(this, t), this);
  }
  static make(t, ...i) {
    let e = arguments,
      s = null,
      n = null;
    if (U.lt(t)) n = t;
    else if (typeof t == "string") {
      const r = GraphObject.qb.get(t);
      U.lt(r)
        ? ((e = Array.prototype.slice.call(e)),
          (s = r(e)),
          U.it(s) || U.n('GraphObject.make invoked object builder "' + t + '", but it did not return an Object'))
        : (n = root.idl[t]);
    }
    s === null &&
      ((n == null || !n.constructor) &&
        U.n("GraphObject.make requires a class function or class name or name of an object builder, not: " + t),
      (s = new n()));
    let o = 1;
    if (s instanceof Diagram && e.length > 1) {
      const r = s,
        l = e[1];
      (typeof l == "string" || l instanceof HTMLDivElement) && (r.k2(l), o++);
    }
    for (let r = o; r < e.length; r++) {
      const l = e[r];
      l === void 0
        ? U.n("Undefined value at argument " + r + " for object being constructed by GraphObject.make: " + s)
        : s && GraphObject.YN(s, l);
    }
    return s;
  }
  static YN(t, i) {
    if (typeof i == "number") GraphObject.ME(t, i);
    else if (typeof i == "string") GraphObject.NE(t, i);
    else if (i instanceof GraphObject)
      (t instanceof Panel || U.n("A GraphObject can only be added to a Panel, not to: " + t), t.add(i));
    else if (i instanceof RowColumnDefinition) {
      let e = null;
      (i.isRow && U.lt(t.getRowDefinition)
        ? (e = t.getRowDefinition(i.index))
        : !i.isRow && U.lt(t.getColumnDefinition) && (e = t.getColumnDefinition(i.index)),
        e instanceof RowColumnDefinition
          ? e.Hb(i)
          : U.n(
              "A RowColumnDefinition can only be added to an object that implements getRowDefinition/getColumnDefinition, not to: " +
                t,
            ));
    } else if (i instanceof PanelLayout) {
      const e = t;
      e.type = i;
    } else if (i instanceof Binding)
      t instanceof GraphObject || t instanceof RowColumnDefinition
        ? t.bind(i)
        : U.n("A Binding can only be applied to a GraphObject or RowColumnDefinition, not to: " + t);
    else if (i instanceof AnimationTrigger)
      t instanceof GraphObject
        ? t.trigger(i)
        : U.n("An AnimationTrigger can only be applied to a GraphObject, not to: " + t);
    else if (i instanceof PathFigure)
      t instanceof Geometry && t.type === 4
        ? t.figures.add(i)
        : U.n("A PathFigure can only be added to a Path Geometry, not to: " + t);
    else if (i instanceof PathSegment)
      t instanceof PathFigure
        ? t.segments.add(i)
        : U.n("A PathSegment can only be added to a PathFigure, not to: " + t);
    else if (i instanceof Layout)
      t instanceof Diagram || t instanceof Group
        ? (t.layout = i)
        : U.n("A Layout can only be assigned to a Diagram or a Group, not to: " + t);
    else if (Array.isArray(i))
      for (let e = 0; e < i.length; e++) {
        const s = i[e];
        GraphObject.YN(t, s);
      }
    else
      U.it(i)
        ? GraphObject.CE(t, i)
        : U.n('Unknown initializer "' + i + '" for object being constructed by GraphObject.make: ' + t);
  }
  static NE(t, i) {
    if (t instanceof TextBlock) t.text = i;
    else if (t instanceof Shape) t.figure = i;
    else if (t instanceof Picture) t.source = i;
    else if (t instanceof Panel) {
      const e = PanelLayout.ms.get(i);
      e !== null
        ? (t.type = e)
        : Debug &&
          U.n(
            "Unknown Panel type as an argument to GraphObject.make: " +
              i +
              ". If building from source, you may need to call Panel.definePanelLayout.",
          );
    } else if (t instanceof Brush) {
      const e = U.ea(BrushType, i);
      e !== null ? (t.type = e) : U.n("Unknown Brush type as an argument to GraphObject.make: " + i);
    } else if (t instanceof Geometry) {
      const e = U.ea(GeometryType, i);
      e !== null ? (t.type = e) : Debug && U.n("Unknown Geometry type as an argument to GraphObject.make: " + i);
    } else if (t instanceof PathSegment) {
      const e = U.ea(SegmentType, i);
      e !== null ? (t.type = e) : Debug && U.n("Unknown PathSegment type as an argument to GraphObject.make: " + i);
    } else Debug && U.n("Unable to use a string as an argument to GraphObject.make: " + i);
  }
  static ME(t, i) {
    U.lt(t.gi) ? t.gi(i) : U.wr(t, i);
  }
  static CE(t, i) {
    if (t instanceof Brush) {
      const e = new PropertyCollection();
      for (const s in i) {
        const n = parseFloat(s);
        isNaN(n) ? (e[s] = i[s]) : t.addColorStop(n, i[s]);
      }
      Diagram.L0(t, e);
    } else if (t instanceof RowColumnDefinition) {
      if (i.row !== void 0) {
        const s = i.row;
        ((s == null || s === 1 / 0 || isNaN(s) || s < 0) &&
          U.n("Must specify non-negative integer row for RowColumnDefinition " + i + ", not: " + s),
          (t.isRow = true),
          (t.index = s));
      } else if (i.column !== void 0) {
        const s = i.column;
        ((s == null || s === 1 / 0 || isNaN(s) || s < 0) &&
          U.n("Must specify non-negative integer column for RowColumnDefinition " + i + ", not: " + s),
          (t.isRow = false),
          (t.index = s));
      }
      const e = new PropertyCollection();
      for (const s in i) s === "row" || s === "column" || (e[s] = i[s]);
      Diagram.L0(t, e);
    } else Diagram.L0(t, i);
  }
  static build(t, i, ...e) {
    const s = GraphObject.qb.get(t);
    if (U.lt(s)) {
      const n = s([t].concat(e));
      if (n instanceof GraphObject) return (i && n.setProperties(i), n);
    }
    U.n('GraphObject.build invoked object builder "' + t + '", but it did not return an Object');
  }
  static defineBuilder(t, i) {
    (U.i(t, "string", GraphObject, "defineBuilder:name"), U.C(i, GraphObject, "defineBuilder:func"));
    const e = t.toLowerCase();
    (Debug &&
      (t === "" || e === "none" || t === e) &&
      U.n("Shape.defineFigureGenerator name must not be empty or None or all-lower-case: " + t),
      GraphObject.qb.set(t, i));
  }
  static isBuilderDefined(t) {
    return GraphObject.qb.has(t);
  }
  static takeBuilderArgument(t, i, e) {
    e === void 0 && (e = null);
    const s = t[1];
    return (U.lt(e) ? e(s) : typeof s == "string")
      ? (t.splice(1, 1), s)
      : (i === void 0 &&
          U.n("no " + (U.lt(e) ? "satisfactory" : "string") + " argument for GraphObject builder " + t[0]),
        i);
  }
  static qb = new GMap();
}
((GraphObject.Vertical = 4),
  (GraphObject.Horizontal = 5),
  GraphObject.defineBuilder("Button", (w) => {
    const t = "#f5f5f5",
      i = "#737373",
      e = "#d4d4d4",
      s = "#737373",
      n = "#a3a3a3",
      o = 2.76142374915397,
      r = 2.761423749153969,
      l = new Panel(Panel.Auto, {
        isActionable: true,
        enabledChanged: (h, a) => {
          if (h instanceof Panel) {
            const f = h.findObject("ButtonBorder");
            if (f !== null)
              if ((h._buttonFillNormal === void 0 && (h._buttonFillNormal = f.fill), a)) {
                let c = null;
                (h.layer !== null &&
                  h.diagram !== null &&
                  h.isVisibleObject() &&
                  (c = h.layer.findObjectAt(h.diagram.lastInput.documentPoint)),
                  c === h || (c !== null && c.isContainedBy(h))
                    ? (f.fill = h._buttonFillOver)
                    : (f.fill = h._buttonFillNormal));
              } else f.fill = h._buttonFillDisabled;
          }
        },
        cursor: "pointer",
      })
        .attach({
          _buttonFillNormal: void 0,
          _buttonStrokeNormal: void 0,
          _buttonFillOver: e,
          _buttonStrokeOver: s,
          _buttonFillDisabled: n,
        })
        .add(
          new Shape("RoundedRectangle", {
            name: "ButtonBorder",
            spot1: new Spot(0, 0, o, r),
            spot2: new Spot(1, 1, -o, -r),
            parameter1: 2,
            fill: t,
            stroke: i,
          }),
        );
    return (
      (l.mouseEnter = (h, a, f) => {
        if (!a.isEnabledObject() || !(a instanceof Panel)) return;
        const c = a.findObject("ButtonBorder");
        c instanceof Shape &&
          (a._buttonFillNormal === void 0 && (a._buttonFillNormal = c.fill),
          (c.fill = a._buttonFillOver),
          a._buttonStrokeNormal === void 0 && (a._buttonStrokeNormal = c.stroke),
          (c.stroke = a._buttonStrokeOver));
      }),
      (l.mouseLeave = (h, a, f) => {
        if (!a.isEnabledObject() || !(a instanceof Panel)) return;
        const c = a.findObject("ButtonBorder");
        c instanceof Shape &&
          (a._buttonFillNormal !== void 0 && (c.fill = a._buttonFillNormal),
          a._buttonStrokeNormal !== void 0 && (c.stroke = a._buttonStrokeNormal));
      }),
      l
    );
  }),
  GraphObject.defineBuilder("TreeExpanderButton", (w) => {
    const t = GraphObject.build("Button");
    return (
      t.attach({ _treeExpandedFigure: "MinusLine", _treeCollapsedFigure: "PlusLine", visible: false }),
      t.add(
        new Shape("MinusLine", {
          name: "ButtonIcon",
          stroke: "#0a0a0a",
          strokeWidth: 2,
          desiredSize: Size.Tu,
        }).bindObject("figure", "isTreeExpanded", (i, e) => {
          const s = e.panel;
          return i ? s._treeExpandedFigure : s._treeCollapsedFigure;
        }),
      ),
      t.bindObject("visible", "isTreeLeaf", (i) => !i),
      (t.click = (i, e) => {
        let s = e.part;
        if ((s instanceof Adornment && (s = s.adornedPart), !(s instanceof Node))) return;
        const n = s.diagram;
        if (n === null) return;
        const o = n.commandHandler;
        if (s.isTreeExpanded) {
          if (!o.canCollapseTree(s)) return;
        } else if (!o.canExpandTree(s)) return;
        ((i.handled = true), s.isTreeExpanded ? o.collapseTree(s) : o.expandTree(s));
      }),
      t
    );
  }),
  GraphObject.defineBuilder("SubGraphExpanderButton", (w) => {
    const t = GraphObject.build("Button");
    return (
      t.attach({ _subGraphExpandedFigure: "MinusLine", _subGraphCollapsedFigure: "PlusLine" }),
      t.add(
        new Shape("MinusLine", {
          name: "ButtonIcon",
          stroke: "#0a0a0a",
          strokeWidth: 2,
          desiredSize: Size.Tu,
        }).bindObject("figure", "isSubGraphExpanded", (i, e) => {
          const s = e.panel;
          return i ? s._subGraphExpandedFigure : s._subGraphCollapsedFigure;
        }),
      ),
      (t.click = (i, e) => {
        let s = e.part;
        if ((s instanceof Adornment && (s = s.adornedPart), !(s instanceof Group))) return;
        const n = s.diagram;
        if (n === null) return;
        const o = n.commandHandler;
        if (s.isSubGraphExpanded) {
          if (!o.canCollapseSubGraph(s)) return;
        } else if (!o.canExpandSubGraph(s)) return;
        ((i.handled = true), s.isSubGraphExpanded ? o.collapseSubGraph(s) : o.expandSubGraph(s));
      }),
      t
    );
  }),
  GraphObject.defineBuilder("ToolTip", (w) =>
    new Adornment(Panel.Auto, {
      isShadowed: true,
      shadowColor: "rgba(0, 0, 0, .4)",
      shadowOffset: new Point(0, 2),
      mouseOver: (t, i) => {
        const e = t.diagram.toolManager;
        e.extendToolTip(e.toolTipDuration);
      },
    }).add(
      new Shape("RoundedRectangle", {
        name: "Border",
        parameter1: 1,
        fill: "#f5f5f5",
        strokeWidth: 0,
        spot1: new Spot(0, 0, 4, 6),
        spot2: new Spot(1, 1, -4, -4),
      }),
    ),
  ),
  GraphObject.defineBuilder("ContextMenu", (w) =>
    new Adornment(Panel.Vertical, {
      background: "#f5f5f5",
      isShadowed: true,
      shadowColor: "rgba(0, 0, 0, .4)",
      shadowOffset: new Point(0, 2),
    }).bindObject("background", "", (t) => (t.adornedPart !== null && t.hasPlaceholder() ? null : "#f5f5f5")),
  ),
  GraphObject.defineBuilder("ContextMenuButton", (w) => {
    const t = GraphObject.build("Button");
    t.stretch = 5;
    const i = t.findObject("ButtonBorder");
    return (
      i instanceof Shape &&
        ((i.figure = "Rectangle"),
        (i.strokeWidth = 0),
        (i.spot1 = new Spot(0, 0, 4, 6)),
        (i.spot2 = new Spot(1, 1, -4, -4))),
      t
    );
  }),
  GraphObject.defineBuilder("PanelExpanderButton", (w) => {
    const t = GraphObject.takeBuilderArgument(w, "COLLAPSIBLE"),
      i = GraphObject.build("Button");
    (i.attach({
      _buttonExpandedFigure: "M0 0 M0 6 L4 2 8 6 M8 8",
      _buttonCollapsedFigure: "M0 0 M0 2 L4 6 8 2 M8 8",
      "ButtonBorder.fill": "rgba(0, 0, 0, 0)",
      _buttonFillNormal: "rgba(0, 0, 0, 0)",
      "ButtonBorder.stroke": null,
      _buttonStrokeNormal: null,
      _buttonFillOver: "rgba(0, 0, 0, .2)",
      _buttonStrokeOver: null,
    }),
      i.add(
        new Shape({ name: "ButtonIcon", strokeWidth: 2 }).bindObject(
          "geometryString",
          "visible",
          (s) => (s ? i._buttonExpandedFigure : i._buttonCollapsedFigure),
          void 0,
          t,
        ),
      ));
    const e = i.findObject("ButtonBorder");
    return (
      e instanceof Shape && ((e.stroke = null), (e.fill = "rgba(0, 0, 0, 0)")),
      (i.click = (s, n) => {
        if (!(n instanceof Panel)) return;
        const o = n.diagram;
        if (o === null || o.isReadOnly) return;
        let r = n.findBindingPanel();
        if ((r === null && (r = n.part), r !== null)) {
          const l = r.findObject(t);
          l !== null &&
            ((s.handled = true),
            o.startTransaction("Collapse/Expand Panel"),
            (l.visible = !l.visible),
            o.commitTransaction("Collapse/Expand Panel"));
        }
      }),
      i
    );
  }),
  GraphObject.defineBuilder("CheckBoxButton", (w) => {
    const t = GraphObject.takeBuilderArgument(w),
      i = GraphObject.build("Button", { desiredSize: new Size(14, 14) });
    i.attach({ "ButtonBorder.spot1": new Spot(0, 0, 1, 1), "ButtonBorder.spot2": new Spot(1, 1, -1, -1) });
    const e = new Shape({
      name: "ButtonIcon",
      geometryString: "M0 0 M0 8.85 L4.9 13.75 16.2 2.45 M16.2 16.2",
      strokeWidth: 2,
      stretch: 2,
      geometryStretch: 6,
      visible: false,
    });
    return (
      t !== "" && e.bindTwoWay("visible", t),
      i.add(e),
      (i.click = (s, n) => {
        if (!(n instanceof Panel)) return;
        const o = s.diagram;
        if (o === null || o.isReadOnly || (t !== "" && o.model.isReadOnly)) return;
        s.handled = true;
        const r = n.findObject("ButtonIcon");
        (o.startTransaction("checkbox"),
          r !== null && (r.visible = !r.visible),
          U.lt(n._doClick) && n._doClick(s, n),
          o.commitTransaction("checkbox"));
      }),
      i
    );
  }),
  GraphObject.defineBuilder("CheckBox", (w) => {
    const t = GraphObject.takeBuilderArgument(w),
      i = GraphObject.build("CheckBoxButton", { name: "Button", isActionable: false, margin: new Margin(0, 1, 0, 0) }, t),
      e = new Panel("Horizontal", {
        isActionable: true,
        cursor: i.cursor,
        margin: new Margin(1),
        mouseEnter: i.mouseEnter,
        mouseLeave: i.mouseLeave,
        click: i.click,
      }).attach({
        _buttonFillNormal: i._buttonFillNormal,
        _buttonStrokeNormal: i._buttonStrokeNormal,
        _buttonFillOver: i._buttonFillOver,
        _buttonStrokeOver: i._buttonStrokeOver,
        _buttonFillDisabled: i._buttonFillDisabled,
        _buttonClick: i.click,
      });
    return (e.add(i), (i.mouseEnter = null), (i.mouseLeave = null), (i.click = null), e);
  }),
  GraphObject.defineBuilder("AutoRepeatButton", (w) => {
    const t = GraphObject.takeBuilderArgument(w, 50, (r) => typeof r == "number"),
      i = GraphObject.takeBuilderArgument(w, 500, (r) => typeof r == "number");
    function e(r, l) {
      (n(r, l), l.click && (l.Fd = U.yn(() => s(r, l), i)));
    }
    function s(r, l) {
      (l.Fd && U.Mf(l.Fd),
        l.click &&
          (l.Fd = U.yn(() => {
            l.click && (l.click(r, l), s(r, l));
          }, t)));
    }
    function n(r, l) {
      l.Fd && (U.Mf(l.Fd), (l.Fd = void 0));
    }
    const o = GraphObject.build("Button");
    return (
      (o.actionDown = (r, l) => e(r, l)),
      (o.actionUp = (r, l) => n(r, l)),
      (o.actionCancel = (r, l) => n(r, l)),
      o
    );
  }),
  GraphObject.defineBuilder("ToggleSwitch", function (w) {
    const t = GraphObject.takeBuilderArgument(w);
    t || U.n("ToggleSwitch must be data-bound to a property name, not: " + t);
    const i = GraphObject.takeBuilderArgument(w, false, (a) => typeof a == "boolean"),
      e = "gray",
      s = "transparent",
      n = "white",
      h = new Panel("Auto", { width: i ? 15 : 28, height: i ? 28 : 15 })
        .attach({
          _buttonFillOff: e,
          _buttonBorderOff: s,
          _buttonIconFillOff: n,
          _buttonFillOn: "green",
          _buttonBorderOn: "transparent",
          _buttonIconFillOn: "white",
        })
        .add(
          new Shape("Capsule", { name: "ButtonBorder", fill: e, stroke: s, strokeWidth: 1 })
            .bind("fill", t, (a, f) => (a ? f.panel._buttonFillOn : f.panel._buttonFillOff))
            .bind("stroke", t, (a, f) => (a ? f.panel._buttonBorderOn : f.panel._buttonBorderOff)),
        )
        .add(
          new Shape("Circle", {
            name: "ButtonIcon",
            width: 11,
            height: 11,
            fill: n,
            stroke: null,
            alignment: i ? Spot.Bottom : Spot.Left,
          })
            .bind("fill", t, (a, f) => (a ? f.panel._buttonIconFillOn : f.panel._buttonIconFillOff))
            .bind("alignment", t, (a) => (a ? (i ? Spot.Top : Spot.Right) : i ? Spot.Bottom : Spot.Left)),
        );
    return (
      (h.click = function (a, f) {
        if (!f.isEnabledObject()) return;
        const c = a.diagram;
        if (c === null || c.isReadOnly || (t !== "" && c.model.isReadOnly)) return;
        a.handled = true;
        const u = f.findBindingPanel();
        u !== null &&
          (c.startTransaction("toggle switch"),
          c.model.set(u.data, t, !u.data[t]),
          typeof f._doClick == "function" && f._doClick(a, f),
          c.commitTransaction("toggle switch"));
      }),
      h
    );
  }),
  GraphObject.defineBuilder("Toggle", function (w) {
    const t = GraphObject.takeBuilderArgument(w),
      i = GraphObject.build("ToggleSwitch", { name: "Button" }, t),
      e = new Panel("Horizontal", {
        cursor: i.cursor,
        margin: 1,
        mouseEnter: i.mouseEnter,
        mouseLeave: i.mouseLeave,
        click: i.click,
      })
        .attach({ _buttonClick: i.click })
        .add(i);
    return ((i.mouseEnter = null), (i.mouseLeave = null), (i.click = null), e);
  }));
