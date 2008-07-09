/** @fileoverview Clase Brush (Pincel) de la biblioteca IDL (Interactive Diagrams Library).
 * Define colores y degradados de relleno/trazo: sólido, lineal, radial y patrón.
 * Originalmente parte de GoJS, renombrada a IDL. Objeto inmutable que representa
 * un pincel de dibujo con soporte para colores sólidos, degradados lineales,
 * radiales y patrones de imagen.
 */

/**
 * Representa un pincel para relleno o trazo de figuras en IDL.
 * Soporta cuatro tipos: sólido (1), lineal (2), radial (3) y patrón (4).
 * También incluye utilidades para manipulación de color (aclarar, oscurecer, mezclar)
 * y conversión entre espacios de color (RGB, HSL, Lab, Oklch).
 */
class Brush {
  /** @type {boolean} Bandera de inmutabilidad (parte del sistema GSet). */
  p;
  /** @type {number} Tipo de pincel: 1=Sólido, 2=Lineal, 3=Radial, 4=Patrón. */
  tt;
  /** @type {string} Color del pincel en formato CSS (ej. "#FF0000", "rgba(...)", "black"). */
  Ha;
  /** @type {Spot} Punto de inicio del degradado. */
  ci;
  /** @type {Spot} Punto final del degradado. */
  Ds;
  /** @type {number} Radio inicial para degradado radial. */
  kp;
  /** @type {number} Radio final para degradado radial. */
  Pp;
  /** @type {GMap} Mapa de paradas de color (offset -> color) para degradados. */
  _o;
  /** @type {*} Patrón de imagen para pinceles de tipo Pattern. */
  Mp;
  /** @type {?CanvasGradient} Caché del objeto CanvasGradient nativo para renderizado rápido. */
  In;
  /** @type {number} Ancho del patrón (caché de relación de aspecto para radial). */
  Nc;
  /** @type {number} Alto del patrón (caché de relación de aspecto para radial). */
  Ub;

  /**
   * Crea un nuevo pincel (Brush). El primer argumento puede ser un color string,
   * un tipo de BrushType, o un objeto con paradas de color.
   * @param {string|number|Object} [t] - Color CSS, tipo de BrushType, o objeto de inicialización.
   *   Si es string, se interpreta como color. Si es número, como tipo. Si es objeto, se usa para inicializar propiedades.
   * @param {Object|string} [i] - Color CSS (si t es tipo) u objeto de inicialización adicional.
   */
  constructor(t, i) {
    // Registrar este objeto en GSet para seguimiento de inmutabilidad
    if ((GSet._i(this), (this.p = false), t === void 0)) ((this.tt = 1), (this.Ha = "black"));
    else if (typeof t == "string") {
      // Intentar interpretar el string como nombre de BrushType; si falla, tratarlo como color CSS
      const s = U.ea(BrushType, t);
      s !== null
        ? ((this.tt = s), (this.Ha = "black"))
        : ((this.tt = 1),
          Debug && !Brush.isValidColor(t) && U.n('Color "' + t + '" is not a valid color string for Brush constructor'),
          (this.Ha = t));
    } else
      Object.keys(BrushType).hasOwnProperty(t)
        ? (Debug && U.W(t, BrushType, "BrushType"), (this.tt = t), (this.Ha = "black"))
        : typeof t == "object" && ((this.tt = 1), (i = t)); // Si t es objeto, se usa como config; color por defecto negro
    const e = this.tt;
    // Configurar puntos de inicio/fin según el tipo de degradado
    if (
      (e === 2
        ? ((this.ci = Spot.TopCenter), (this.Ds = Spot.BottomCenter)) // Degradado lineal: arriba a abajo por defecto
        : e === 3
          ? ((this.ci = Spot.Center), (this.Ds = Spot.Center)) // Degradado radial: centro a centro por defecto
          : ((this.ci = Spot.None), (this.Ds = Spot.None)), // Sólido/Patrón: sin spots
      (this.kp = 0),
      (this.Pp = NaN),
      (this._o = null), // Mapa de paradas de color (aún sin crear)
      (this.Mp = null), // Patrón de imagen
      (this.In = null), // Caché de CanvasGradient
      (this.Nc = 0), // Ancho del patrón para escalado radial
      (this.Ub = 0), // Alto del patrón para escalado radial
      i) // Si hay objeto de inicialización, procesar sus propiedades
    ) {
      const s = {};
      // Separar paradas de color (claves numéricas) de otras propiedades
      for (const n in i) isFinite(parseFloat(n)) ? this.addColorStop(parseFloat(n), i[n]) : (s[n] = i[n]);
      Object.assign(this, s);
    }
  }

  /**
   * Crea una copia profunda de este pincel.
   * @returns {Brush} Una nueva instancia de Brush con los mismos valores.
   */
  copy() {
    const t = new Brush();
    return (
      (t.tt = this.tt),
      (t.Ha = this.Ha),
      (t.ci = this.ci.T()), // Copiar spot de inicio (T() crea copia)
      (t.Ds = this.Ds.T()), // Copiar spot de fin
      (t.kp = this.kp),
      (t.Pp = this.Pp),
      this._o !== null && (t._o = this._o.copy()), // Copiar paradas de color si existen
      (t.Mp = this.Mp), // El patrón se comparte (no se copia profundamente)
      t
    );
  }

  /**
   * Marca este pincel como inmutable (parte del sistema GSet).
   * @returns {Brush} Este mismo pincel para encadenamiento.
   */
  k() {
    return ((this.p = true), this._o !== null && this._o.k(), this);
  }

  /**
   * Valida y aplica un tipo de pincel desde un string.
   * @param {string} t - Nombre del tipo de pincel (ej. "Solid", "Linear").
   */
  gi(t) {
    t in BrushType ? (this.type = t) : U.wr(this, t);
  }

  /**
   * Convierte el pincel a representación de cadena legible para depuración.
   * @returns {string} Representación en formato "Brush(Tipo start end colorStops)".
   */
  toString() {
    let t = "Brush(";
    if (this.type === 1) t += this.color; // Sólido: solo el color
    else if (
      (this.type === 2
        ? (t += "Linear ")
        : this.type === 3
          ? (t += "Radial ")
          : this.type === 4
            ? (t += "Pattern ")
            : (t += "(unknown) "), // Tipo desconocido como fallback
      (t += this.start + " " + this.end),
      this.colorStops !== null)
    ) {
      // Iterar sobre las paradas de color para concatenarlas
      const i = this.colorStops.iterator;
      for (; i.next(); ) {
        const e = i.key,
          s = i.value;
        t += " " + e + ":" + s;
      }
    }
    return ((t += ")"), t);
  }

  /**
   * Agrega una parada de color al degradado.
   * Si el pincel es de tipo sólido, lo convierte automáticamente a lineal.
   * @param {number} t - Posición de la parada (0.0 a 1.0).
   * @param {string} i - Color CSS en la posición dada.
   * @returns {Brush} Este mismo pincel para encadenamiento.
   */
  addColorStop(t, i) {
    return (
      this.p && U.D(this), // Verificar inmutabilidad
      (typeof t != "number" || !isFinite(t) || t > 1 || t < 0) && U.G(t, "0 <= loc <= 1", Brush, "addColorStop:loc"),
      U.i(i, "string", Brush, "addColorStop:color"),
      Debug && !Brush.isValidColor(i) && U.n('Color "' + i + '" is not a valid color string for Brush.addColorStop'),
      this._o === null && (this._o = new GMap()), // Crear mapa de paradas si no existe
      this._o.set(t, i),
      this.tt === 1 && (this.type = 2), // Convertir sólido a lineal automáticamente al agregar parada
      (this.In = null), // Invalidar caché de CanvasGradient
      this
    );
  }

  /** @returns {number} El tipo de pincel (1=Sólido, 2=Lineal, 3=Radial, 4=Patrón). */
  get type() {
    return this.tt;
  }

  /**
   * Establece el tipo de pincel. Ajusta spots por defecto si es necesario.
   * @param {number} t - Nuevo tipo de BrushType.
   */
  set type(t) {
    (this.p && U.D(this, t), // Verificar inmutabilidad
      Debug && U.W(t, BrushType, "BrushType"),
      (this.tt = t),
      // Si el spot de inicio no está definido, asignar valor por defecto según tipo
      this.start.isNoSpot() && (t === 2 ? (this.start = Spot.TopCenter) : t === 3 && (this.start = Spot.Center)),
      // Si el spot de fin no está definido, asignar valor por defecto según tipo
      this.end.isNoSpot() && (t === 2 ? (this.end = Spot.BottomCenter) : t === 3 && (this.end = Spot.Center)),
      (this.In = null)); // Invalidar caché
  }

  /** @returns {string} El color CSS actual del pincel. */
  get color() {
    return this.Ha;
  }

  /**
   * Establece el color CSS del pincel.
   * @param {string} t - Color en formato CSS (ej. "#FF0000", "rgba(255,0,0,1)").
   */
  set color(t) {
    (this.p && U.D(this, t),
      Debug && !Brush.isValidColor(t) && U.n('Color "' + t + '" is not a valid color string for Brush.color'),
      (this.Ha = t),
      (this.In = null));
  }

  /** @returns {Spot} El punto de inicio del degradado. */
  get start() {
    return this.ci;
  }

  /**
   * Establece el punto de inicio del degradado.
   * @param {Spot} t - Nuevo spot de inicio.
   */
  set start(t) {
    (this.p && U.D(this, t), Debug && U.s(t, Spot, Brush, "start"), (this.ci = t.T()), (this.In = null));
  }

  /** @returns {Spot} El punto final del degradado. */
  get end() {
    return this.Ds;
  }

  /**
   * Establece el punto final del degradado.
   * @param {Spot} t - Nuevo spot de fin.
   */
  set end(t) {
    (this.p && U.D(this, t), Debug && U.s(t, Spot, Brush, "end"), (this.Ds = t.T()), (this.In = null));
  }

  /** @returns {number} El radio inicial del degradado radial. */
  get startRadius() {
    return this.kp;
  }

  /**
   * Establece el radio inicial del degradado radial.
   * @param {number} t - Radio inicial (debe ser >= 0).
   */
  set startRadius(t) {
    (this.p && U.D(this, t),
      Debug && U.r(t, Brush, "startRadius"),
      t < 0 && U.G(t, ">= zero", Brush, "startRadius"),
      (this.kp = t),
      (this.In = null));
  }

  /** @returns {number} El radio final del degradado radial (NaN si no está definido). */
  get endRadius() {
    return this.Pp;
  }

  /**
   * Establece el radio final del degradado radial.
   * @param {number} t - Radio final (debe ser >= 0).
   */
  set endRadius(t) {
    (this.p && U.D(this, t),
      Debug && U.r(t, Brush, "endRadius"),
      t < 0 && U.G(t, ">= zero", Brush, "endRadius"),
      (this.Pp = t),
      (this.In = null));
  }

  /** @returns {GMap} El mapa de paradas de color (GMap offset->color). */
  get colorStops() {
    return this._o;
  }

  /**
   * Establece las paradas de color del degradado.
   * @param {GMap} t - Mapa de paradas de color.
   */
  set colorStops(t) {
    (this.p && U.D(this, t), Debug && U.s(t, GMap, Brush, "colorStops"), (this._o = t), (this.In = null));
  }

  /** @returns {*} El patrón de imagen para pinceles tipo Pattern. */
  get pattern() {
    return this.Mp;
  }

  /**
   * Establece el patrón de imagen.
   * @param {*} t - El patrón (generalmente un HTMLCanvasElement o HTMLImageElement).
   */
  set pattern(t) {
    (this.p && U.D(this, t), (this.Mp = t), (this.In = null));
  }

  /**
   * Genera un color aleatorio en formato hexadecimal.
   * @param {number} [t=128] - Valor mínimo para cada componente RGB (0-255).
   * @param {number} [i] - Valor máximo para cada componente RGB (por defecto Math.max(t, 255)).
   * @returns {string} Color en formato "#RRGGBB".
   */
  static randomColor(t, i) {
    (t === void 0 && (t = 128),
      Debug &&
        (U.r(t, Brush, "randomColor:min"), (t < 0 || t > 255) && U.G(t, "0 <= min <= 255", Brush, "randomColor:min")),
      i === void 0 && (i = Math.max(t, 255)),
      Debug &&
        (U.r(i, Brush, "randomColor:max"),
        (i < t || i > 255) && U.G(i, "min <= max <= 255", Brush, "randomColor:max")));
    const e = Math.abs(i - t); // Rango de valores posibles
    // Generar cada componente RGB como valor hex de 2 dígitos
    let s = Math.floor(t + Math.random() * e).toString(16),
      n = Math.floor(t + Math.random() * e).toString(16),
      o = Math.floor(t + Math.random() * e).toString(16);
    return (
      s.length < 2 && (s = "0" + s), // Rellenar con cero si es necesario
      n.length < 2 && (n = "0" + n),
      o.length < 2 && (o = "0" + o),
      "#" + s + n + o
    );
  }

  /**
   * Verifica si una cadena es un color CSS válido usando CSS.supports.
   * @param {string} t - Color a validar.
   * @returns {boolean} true si el color es válido.
   */
  static isValidColor(t) {
    return root.CSS ? root.CSS.supports("color", t) : true;
  }

  /**
   * Aclara un color dado (método estático de conveniencia).
   * @param {string} t - Color a aclarar.
   * @returns {string} Color aclarado.
   */
  static lighten(t) {
    return Brush.lightenBy(t);
  }

  /**
   * Aclara este pincel (método de instancia).
   * Para tipo sólido modifica el color; para lineal/radial modifica cada parada.
   * @param {number} [t] - Cantidad a aclarar (por defecto 0.2).
   * @param {number} [i] - Espacio de color: 1=Lab, 2=HSL, 3=Oklch (por defecto 3).
   * @returns {Brush} Este mismo pincel para encadenamiento.
   */
  lightenBy(t, i) {
    this.p && U.D(this); // Verificar inmutabilidad
    const e = t === void 0 || typeof t != "number" ? 0.2 : t, // Cantidad por defecto: 0.2
      s = i === void 0 ? 3 : i; // Espacio de color por defecto: Oklch
    if (this.type === 1) (Brush.Ko(this.color), (this.color = Brush.Rd(e, s)));
    else if ((this.type === 2 || this.type === 3) && this.colorStops !== null) {
      // Aclarar cada parada de color del degradado
      const n = this.colorStops.iterator;
      for (; n.next(); ) (Brush.Ko(n.value), this.addColorStop(n.key, Brush.Rd(e, s)));
    }
    return this;
  }

  /**
   * Aclara un color dado por una cantidad específica (método estático).
   * @param {string} t - Color CSS a aclarar.
   * @param {number} [i] - Cantidad a aclarar (por defecto 0.2).
   * @param {number} [e] - Espacio de color: 1=Lab, 2=HSL, 3=Oklch (por defecto 3).
   * @returns {string} Color aclarado en formato CSS.
   */
  static lightenBy(t, i, e) {
    const s = i === void 0 || typeof i != "number" ? 0.2 : i,
      n = e === void 0 ? 3 : e;
    return (Brush.Ko(t), Brush.Rd(s, n));
  }

  /**
   * Oscurece un color dado (método estático de conveniencia).
   * @param {string} t - Color a oscurecer.
   * @returns {string} Color oscurecido.
   */
  static darken(t) {
    return Brush.darkenBy(t);
  }

  /**
   * Oscurece este pincel (método de instancia).
   * Para tipo sólido modifica el color; para lineal/radial modifica cada parada.
   * @param {number} [t] - Cantidad a oscurecer (por defecto 0.2).
   * @param {number} [i] - Espacio de color: 1=Lab, 2=HSL, 3=Oklch (por defecto 3).
   * @returns {Brush} Este mismo pincel para encadenamiento.
   */
  darkenBy(t, i) {
    this.p && U.D(this);
    const e = t === void 0 || typeof t != "number" ? 0.2 : t,
      s = i === void 0 ? 3 : i;
    if (this.type === 1) (Brush.Ko(this.color), (this.color = Brush.Rd(-e, s))); // Valor negativo para oscurecer
    else if ((this.type === 2 || this.type === 3) && this.colorStops !== null) {
      // Oscurecer cada parada de color del degradado
      const n = this.colorStops.iterator;
      for (; n.next(); ) (Brush.Ko(n.value), this.addColorStop(n.key, Brush.Rd(-e, s)));
    }
    return this;
  }

  /**
   * Oscurece un color dado por una cantidad específica (método estático).
   * @param {string} t - Color CSS a oscurecer.
   * @param {number} [i] - Cantidad a oscurecer (por defecto 0.2).
   * @param {number} [e] - Espacio de color: 1=Lab, 2=HSL, 3=Oklch (por defecto 3).
   * @returns {string} Color oscurecido en formato CSS.
   */
  static darkenBy(t, i, e) {
    const s = i === void 0 || typeof i != "number" ? 0.2 : i,
      n = e === void 0 ? 3 : e;
    return (Brush.Ko(t), Brush.Rd(-s, n));
  }

  /**
   * Mezcla dos colores en espacio RGBA según una proporción.
   * Convierte ambos colores a sus componentes RGBA y los interpola linealmente.
   * @param {string} t - Primer color CSS.
   * @param {string} i - Segundo color CSS.
   * @param {number} [e] - Proporción de mezcla (0=todo primero, 1=todo segundo; por defecto 0.5).
   * @returns {string} Color mezclado en formato "rgba(R, G, B, A)".
   */
  static mix(t, i, e) {
    Brush.Ko(t); // Convertir primer color a componentes RGBA en Brush.v
    const s = Brush.v.n0, // R del primer color
      n = Brush.v.n1, // G del primer color
      o = Brush.v.n2, // B del primer color
      r = Brush.v.n3; // A del primer color
    (Brush.Ko(i), e === void 0 && (e = 0.5)); // Convertir segundo color; proporción por defecto 0.5
    // Interpolar cada componente según la proporción e
    const l = Math.round((Brush.v.n0 - s) * e + s),
      h = Math.round((Brush.v.n1 - n) * e + n),
      a = Math.round((Brush.v.n2 - o) * e + o),
      f = Math.round((Brush.v.n3 - r) * e + r);
    return `rgba(${l}, ${h}, ${a}, ${f})`;
  }

  /**
   * Determina si este pincel es oscuro usando luminancia perceptual.
   * Para degradados lineales busca la parada central; para radiales la primera.
   * @returns {boolean} true si el color es oscuro (luminancia < 128).
   */
  isDark() {
    if (this.type === 1) return Brush.isDark(this.color); // Sólido: evaluar directamente
    if ((this.type === 2 || this.type === 3) && this.colorStops !== null) {
      const t = this.colorStops;
      if (this.type === 3) {
        // Radial: usar la primera parada (la más interna)
        const l = t.first();
        return l ? Brush.isDark(l.value) : false;
      }
      if (t.get(0.5) !== null) return Brush.isDark(t.get(0.5)); // Si hay parada en 0.5, usarla
      if (t.count === 2) {
        // Si solo hay 2 paradas, mezclarlas 50/50
        const l = t.toArray();
        return Brush.isDark(Brush.mix(l[0].value, l[1].value));
      }
      // Buscar las dos paradas más cercanas a 0.5 para interpolar
      const i = t.iterator;
      let e = -1, // Posición de la parada más cercana por debajo de 0.5
        s = -1, // Posición de la parada más cercana por encima de 0.5
        n = 1, // Distancia de la parada por debajo
        o = 1; // Distancia de la parada por encima
      for (; i.next(); ) {
        const l = i.key,
          h = Math.abs(0.5 - i.key); // Distancia a 0.5
        // Actualizar la parada más cercana según corresponda
        n > o && h < n ? ((e = l), (n = h)) : o >= n && h < o && ((s = l), (o = h));
      }
      if (e > s) {
        // Asegurar que e (izquierda) < s (derecha)
        let l = e;
        ((e = s), (s = l), (l = n), (n = o), (o = l));
      }
      const r = s - e; // Distancia entre las dos paradas
      return Brush.isDark(Brush.mix(t.get(e), t.get(s), 1 - o / r));
    }
    return false;
  }

  /**
   * Determina si un color es oscuro usando la fórmula de luminancia perceptual.
   * Fórmula: (299*R + 587*G + 114*B) / 1000 < 128.
   * @param {string|Brush} t - Color CSS o instancia de Brush.
   * @returns {boolean} true si el color es oscuro.
   */
  static isDark(t) {
    return t
      ? t instanceof Brush
        ? t.isDark() // Delegar al método de instancia si es Brush
        : (Brush.Ko(t), (299 * Brush.v.n0 + 587 * Brush.v.n1 + 114 * Brush.v.n2) / 1e3 < 128) // Fórmula de luminancia estándar
      : false;
  }

  /**
   * Ajusta el brillo de un color en un espacio de color específico.
   * Es el núcleo de lightenBy/darkenBy. Convierte el color actual (en Brush.v)
   * al espacio destino, modifica la luminosidad, y convierte de vuelta a RGB.
   * @param {number} t - Cantidad de ajuste (positivo=aclarar, negativo=oscurecer) en porcentaje.
   * @param {number} i - Espacio de color: 1=Lab (modifica L*), 2=HSL (modifica L), 3=Oklch (modifica L).
   * @returns {string} Color resultante en formato CSS.
   */
  static Rd(t, i) {
    switch (i) {
      case 1: // Espacio Lab: modificar luminosidad L* (0-100)
        return (
          Brush.LE(), // RGB -> XYZ -> Lab (llenar Brush.go)
          (Brush.go.n0 = Math.min(100, Math.max(0, Brush.go.n0 + 100 * t))), // Ajustar L* y recortar a [0, 100]
          Brush.DE(), // Lab -> XYZ -> RGB (llenar Brush.v)
          "rgba(" + Brush.v.n0 + ", " + Brush.v.n1 + ", " + Brush.v.n2 + ", " + Brush.v.n3 + ")"
        );
      case 2: // Espacio HSL: modificar luminosidad L (0-100)
        return (
          Brush.zM(), // RGB -> HSL (llenar Brush.qi)
          (Brush.qi.n2 = Math.min(100, Math.max(0, Brush.qi.n2 + 100 * t))), // Ajustar L y recortar
          "hsla(" + Brush.qi.n0 + ", " + Brush.qi.n1 + "%, " + Brush.qi.n2 + "%, " + Brush.qi.n3 + ")"
        );
      case 3: // Espacio Oklch: modificar luminosidad L (0-100)
        return (
          Brush.FE(), // RGB -> XYZ -> Oklab -> Oklch (llenar Brush.mo)
          (Brush.mo.n0 = Math.min(100, Math.max(0, Brush.mo.n0 + 100 * t))), // Ajustar L y recortar
          Brush.IE(), // Oklch -> Oklab -> XYZ -> RGB (llenar Brush.v)
          "rgba(" + Brush.v.n0 + ", " + Brush.v.n1 + ", " + Brush.v.n2 + ", " + Brush.v.n3 + ")"
        );
      default:
        U.n("Unknown color space: " + i);
    }
  }

  /**
   * Convierte un color CSS a componentes RGBA numéricos, almacenados en Brush.v.
   * Usa un elemento canvas de 1x1 píxeles para delegar el parseo al navegador.
   * Inicializa el canvas de manera perezosa (solo la primera vez que se necesita).
   * @param {string} t - Color CSS a parsear.
   */
  static Ko(t) {
    // Inicializar el canvas de parseo de color de manera perezosa (solo una vez)
    Brush.Np === false &&
      ((Brush.Np = true),
      (Brush.ps = Diagram.isUsingDOM() ? new CanvasSurface(null, void 0, { willReadFrequently: true }).ni : null));
    const i = Brush.ps;
    if (i === null) return; // No se puede parsear sin DOM
    (i.clearRect(0, 0, 1, 1), (i.fillStyle = "#000000")); // Resetear a negro
    const e = i.fillStyle; // Guardar el fillStyle por defecto para comparar
    if (((i.fillStyle = t), i.fillStyle !== e)) {
      // Si el color se aplicó correctamente (es diferente del negro por defecto)
      i.fillRect(0, 0, 1, 1); // Pintar 1px con el color
      const s = i.getImageData(0, 0, 1, 1).data; // Leer los componentes RGBA
      ((Brush.v.n0 = s[0]), (Brush.v.n1 = s[1]), (Brush.v.n2 = s[2]), (Brush.v.n3 = s[3] / 255)); // Alpha normalizado a 0-1
    } else {
      // El color no se pudo aplicar (posiblemente inválido)
      i.fillStyle = "#FFFFFF";
      const s = i.fillStyle;
      ((i.fillStyle = t),
        i.fillStyle === s && Debug && U.n('Color "' + t + '" is not a valid color string for RGBA color conversion'),
        (Brush.v.n0 = 0),
        (Brush.v.n1 = 0),
        (Brush.v.n2 = 0),
        (Brush.v.n3 = 1)); // Fallback: negro transparente con alpha 1
    }
  }

  /**
   * Convierte de RGB (Brush.v) a HSL (Brush.qi).
   * Algoritmo estándar de conversión RGB -> HSL.
   */
  static zM() {
    const t = Brush.v.n0 / 255, // R normalizado [0,1]
      i = Brush.v.n1 / 255, // G normalizado [0,1]
      e = Brush.v.n2 / 255, // B normalizado [0,1]
      s = Math.max(t, i, e), // Valor máximo (V en HSV)
      n = Math.min(t, i, e), // Valor mínimo
      o = s - n; // Delta (croma)
    let r, l;
    const h = (s + n) / 2; // Luminosidad L
    if (o === 0) r = l = 0; // Acromático (gris): sin saturación, matiz indefinido
    else {
      // Calcular matiz H según cuál componente es el máximo
      switch (s) {
        case t:
          r = ((i - e) / o) % 6; // Rojo es máximo
          break;
        case i:
          r = (e - t) / o + 2; // Verde es máximo
          break;
        case e:
          r = (t - i) / o + 4; // Azul es máximo
          break;
        default:
          r = 0;
          break;
      }
      ((r *= 60), r < 0 && (r += 360), (l = o / (1 - Math.abs(2 * h - 1)))); // Saturación S
    }
    ((Brush.qi.n0 = Math.round(r)), // H: [0, 360]
      (Brush.qi.n1 = Math.round(l * 100)), // S: [0, 100]%
      (Brush.qi.n2 = Math.round(h * 100)), // L: [0, 100]%
      (Brush.qi.n3 = Brush.v.n3)); // Mantener alpha
  }

  /**
   * Convierte de HSL (Brush.qi) a RGB (Brush.v).
   * Algoritmo estándar de conversión HSL -> RGB.
   */
  static YV() {
    const t = Brush.qi.n0, // H [0, 360]
      i = Brush.qi.n1 / 100, // S [0, 1]
      e = Brush.qi.n2 / 100; // L [0, 1]
    let s, n, o;
    const r = (1 - Math.abs(2 * e - 1)) * i, // Croma
      l = t / 60, // Sector del matiz (0-6)
      h = r * (1 - Math.abs((l % 2) - 1)); // Componente intermedio
    // Asignar RGB según el sector del matiz
    l >= 0 && l < 1
      ? ((s = r), (n = h), (o = 0)) // Sector 0: rojo a amarillo
      : l >= 1 && l < 2
        ? ((s = h), (n = r), (o = 0)) // Sector 1: amarillo a verde
        : l >= 2 && l < 3
          ? ((s = 0), (n = r), (o = h)) // Sector 2: verde a cian
          : l >= 3 && l < 4
            ? ((s = 0), (n = h), (o = r)) // Sector 3: cian a azul
            : l >= 4 && l < 5
              ? ((s = h), (n = 0), (o = r)) // Sector 4: azul a magenta
              : ((s = r), (n = 0), (o = h)); // Sector 5: magenta a rojo
    const a = e - 0.5 * r; // Ajuste de luminosidad
    ((s += a),
      (n += a),
      (o += a),
      (Brush.v.n0 = Math.round(s * 255)), // R [0, 255]
      (Brush.v.n1 = Math.round(n * 255)), // G [0, 255]
      (Brush.v.n2 = Math.round(o * 255)), // B [0, 255]
      (Brush.v.n3 = Brush.qi.n3)); // Mantener alpha
  }

  /**
   * RGB -> Lab: Convierte RGB (Brush.v) a Lab (Brush.go).
   * Ruta: RGB -> linealizar -> XYZ -> Lab.
   */
  static LE() {
    (Brush.dD(), Brush.RE()); // Linealizar RGB -> XYZ, luego XYZ -> Lab
  }

  /**
   * Lab -> RGB: Convierte Lab (Brush.go) a RGB (Brush.v).
   * Ruta: Lab -> XYZ -> lineal -> sRGB.
   */
  static DE() {
    (Brush.OE(), Brush.gD()); // Lab -> XYZ, luego XYZ -> RGB
  }

  /**
   * Linealiza un componente sRGB (elimina corrección gamma).
   * Fórmula de la especificación sRGB.
   * @param {number} t - Componente sRGB [0, 255].
   * @returns {number} Componente lineal [0, 1].
   */
  static GN(t) {
    return ((t /= 255), t <= 0.04045 ? t / 12.92 : Math.pow((t + 0.055) / 1.055, 2.4));
  }

  /**
   * Aplica corrección gamma sRGB a un componente lineal.
   * @param {number} t - Componente lineal [0, 1].
   * @returns {number} Componente sRGB [0, 1].
   */
  static qN(t) {
    return t <= 0.0031308 ? t * 12.92 : 1.055 * Math.pow(t, 1 / 2.4) - 0.055;
  }

  /**
   * RGB -> XYZ: Convierte RGB lineal a espacio XYZ (D65).
   * Usa la matriz de transformación estándar sRGB.
   * Almacena resultado en Brush.Ot (n0=X, n1=Y, n2=Z, n3=alpha).
   */
  static dD() {
    // Linealizar cada componente RGB
    const t = Brush.GN(Brush.v.n0),
      i = Brush.GN(Brush.v.n1),
      e = Brush.GN(Brush.v.n2);
    // Multiplicar por matriz de transformación RGB lineal -> XYZ (D65)
    ((Brush.Ot.n0 = 0.4124564 * t + 0.3575761 * i + 0.1804375 * e),
      (Brush.Ot.n1 = 0.2126729 * t + 0.7151522 * i + 0.072175 * e),
      (Brush.Ot.n2 = 0.0193339 * t + 0.119192 * i + 0.9503041 * e),
      (Brush.Ot.n3 = Brush.v.n3));
  }

  /**
   * XYZ -> RGB: Convierte espacio XYZ a sRGB (con corrección gamma).
   * Usa la matriz inversa de transformación. Recorta valores a [0, 255].
   * Almacena resultado en Brush.v.
   */
  static gD() {
    // Multiplicar por matriz inversa de XYZ -> RGB lineal
    const t = 3.2404542 * Brush.Ot.n0 + -1.5371385 * Brush.Ot.n1 + -0.4985314 * Brush.Ot.n2,
      i = -0.969266 * Brush.Ot.n0 + 1.8760108 * Brush.Ot.n1 + 0.041556 * Brush.Ot.n2,
      e = 0.0556434 * Brush.Ot.n0 + -0.2040259 * Brush.Ot.n1 + 1.0572252 * Brush.Ot.n2;
    // Aplicar corrección gamma y escalar a [0, 255]
    ((Brush.v.n0 = Brush.qN(t) * 255),
      (Brush.v.n1 = Brush.qN(i) * 255),
      (Brush.v.n2 = Brush.qN(e) * 255),
      (Brush.v.n3 = Brush.Ot.n3),
      (Brush.v.n0 = Math.round(Brush.v.n0)),
      Brush.v.n0 > 255 ? (Brush.v.n0 = 255) : Brush.v.n0 < 0 && (Brush.v.n0 = 0), // Recortar R a [0, 255]
      (Brush.v.n1 = Math.round(Brush.v.n1)),
      Brush.v.n1 > 255 ? (Brush.v.n1 = 255) : Brush.v.n1 < 0 && (Brush.v.n1 = 0), // Recortar G a [0, 255]
      (Brush.v.n2 = Math.round(Brush.v.n2)),
      Brush.v.n2 > 255 ? (Brush.v.n2 = 255) : Brush.v.n2 < 0 && (Brush.v.n2 = 0)); // Recortar B a [0, 255]
  }

  /** @const {number} Umbral para la función de compresión Lab (6/29)^3. */
  static HN = 216 / 24389;
  /** @const {number} Constante de escala para Lab (29/3)^3. */
  static $b = 24389 / 27;
  /** @const {number[]} Punto blanco de referencia D65 en XYZ. */
  static Od = [95.047, 100, 108.883];

  /**
   * Función de compresión no lineal para XYZ -> Lab (CIE f(t)).
   * @param {number} t - Componente normalizado.
   * @returns {number} Componente comprimido.
   */
  static vN(t) {
    return t > Brush.HN ? Math.pow(t, 1 / 3) : (Brush.$b * t + 16) / 116;
  }

  /**
   * XYZ -> Lab: Convierte de XYZ (Brush.Ot) a CIE Lab (Brush.go).
   * L* en [0, 100], a* y b* típicamente en [-128, 128].
   */
  static RE() {
    // Normalizar XYZ por el punto blanco D65 y comprimir
    const t = Brush.vN((Brush.Ot.n0 * 100) / Brush.Od[0]), // X normalizado y comprimido
      i = Brush.vN((Brush.Ot.n1 * 100) / Brush.Od[1]), // Y normalizado y comprimido
      e = Brush.vN((Brush.Ot.n2 * 100) / Brush.Od[2]); // Z normalizado y comprimido
    ((Brush.go.n0 = 116 * i - 16), // L*
      (Brush.go.n1 = 500 * (t - i)), // a*
      (Brush.go.n2 = 200 * (i - e)), // b*
      (Brush.go.n3 = Brush.Ot.n3)); // Alpha
  }

  /**
   * Función de expansión no lineal para Lab -> XYZ (inversa de CIE f(t)).
   * @param {number} t - Componente comprimido.
   * @returns {number} Componente expandido.
   */
  static mD(t) {
    const i = t * t * t;
    return i > Brush.HN ? i : (116 * t - 16) / Brush.$b;
  }

  /**
   * Lab -> XYZ: Convierte de CIE Lab (Brush.go) a XYZ (Brush.Ot).
   */
  static OE() {
    const t = (Brush.go.n0 + 16) / 116, // fy
      i = Brush.go.n1 / 500 + t, // fx
      e = t - Brush.go.n2 / 200; // fz
    // Expandir y desnormalizar por el punto blanco D65
    ((Brush.Ot.n0 = (Brush.Od[0] / 100) * Brush.mD(i)),
      (Brush.Ot.n1 =
        (Brush.Od[1] / 100) * (Brush.go.n0 > Brush.$b * Brush.HN ? Math.pow(t, 3) : Brush.go.n0 / Brush.$b)),
      (Brush.Ot.n2 = (Brush.Od[2] / 100) * Brush.mD(e)),
      (Brush.Ot.n3 = Brush.go.n3));
  }

  /**
   * XYZ -> Oklab: Convierte de XYZ (Brush.Ot) a Oklab (Brush.yi).
   * Ruta: XYZ -> LMS lineal -> Oklab.
   */
  static EE() {
    // XYZ -> LMS (matriz de transformación)
    let t = 0.8190224 * Brush.Ot.n0 + 0.3619062 * Brush.Ot.n1 + -0.1288737 * Brush.Ot.n2,
      i = 0.03298366 * Brush.Ot.n0 + 0.9292868 * Brush.Ot.n1 + 0.03614466 * Brush.Ot.n2,
      e = 0.04817719 * Brush.Ot.n0 + 0.2642395 * Brush.Ot.n1 + 0.6335478 * Brush.Ot.n2;
    // Aplicar raíz cúbica (compresión no lineal) a LMS
    ((t = Math.cbrt(t)),
      (i = Math.cbrt(i)),
      (e = Math.cbrt(e)),
      // LMS comprimido -> Oklab (L, a, b)
      (Brush.yi.n0 = 0.2104542 * t + 0.7936177 * i + -0.004072046 * e), // L (luminosidad)
      (Brush.yi.n1 = 1.977998 * t + -2.428592 * i + 0.4505937 * e), // a (verde-rojo)
      (Brush.yi.n2 = 0.02590403 * t + 0.7827717 * i + -0.8086757 * e), // b (azul-amarillo)
      (Brush.yi.n3 = Brush.Ot.n3),
      (Brush.yi.n0 *= 100)); // Escalar L a [0, 100]
  }

  /**
   * Oklab -> XYZ: Convierte de Oklab (Brush.yi) a XYZ (Brush.Ot).
   */
  static VE() {
    Brush.yi.n0 /= 100; // Desescalar L de [0, 100] a [0, 1]
    // Oklab -> LMS comprimido
    let t = 0.9999999 * Brush.yi.n0 + 0.3963377 * Brush.yi.n1 + 0.2158037 * Brush.yi.n2,
      i = 1.000000009 * Brush.yi.n0 + -0.1055613 * Brush.yi.n1 + -0.06385417 * Brush.yi.n2,
      e = 1.00000005 * Brush.yi.n0 + -0.08948418 * Brush.yi.n1 + -1.291485 * Brush.yi.n2;
    // Elevar al cubo (deshacer compresión) y convertir a XYZ
    ((t = t ** 3),
      (i = i ** 3),
      (e = e ** 3),
      (Brush.Ot.n0 = 1.2268798 * t + -0.5578149 * i + 0.281391 * e),
      (Brush.Ot.n1 = -0.04057576 * t + 1.112286 * i + -0.07171106 * e),
      (Brush.Ot.n2 = -0.07637294 * t + -0.4214933 * i + 1.586924 * e),
      (Brush.Ot.n3 = Brush.yi.n3));
  }

  /**
   * Oklab -> Oklch: Convierte de Oklab (Brush.yi) a Oklch (Brush.mo).
   * Oklch = Luminosidad + Croma + Tono (representación polar de a,b).
   */
  static BE() {
    const t = (Math.atan2(Brush.yi.n2, Brush.yi.n1) * 180) / Math.PI; // Tono h en grados [0, 360)
    ((Brush.mo.n0 = Brush.yi.n0), // L (misma luminosidad)
      (Brush.mo.n1 = Math.sqrt(Brush.yi.n1 ** 2 + Brush.yi.n2 ** 2)), // C = sqrt(a^2 + b^2)
      (Brush.mo.n2 = t >= 0 ? t : t + 360), // h normalizado a [0, 360)
      (Brush.mo.n3 = Brush.yi.n3)); // Alpha
  }

  /**
   * Oklch -> Oklab: Convierte de Oklch (Brush.mo) a Oklab (Brush.yi).
   * Convierte de coordenadas polares (C, h) a cartesianas (a, b).
   */
  static zE() {
    ((Brush.yi.n0 = Brush.mo.n0), // L
      (Brush.yi.n1 = Brush.mo.n1 * Math.cos((Brush.mo.n2 * Math.PI) / 180)), // a = C * cos(h)
      (Brush.yi.n2 = Brush.mo.n1 * Math.sin((Brush.mo.n2 * Math.PI) / 180)), // b = C * sin(h)
      (Brush.yi.n3 = Brush.mo.n3)); // Alpha
  }

  /**
   * RGB -> Oklch: Ruta completa RGB -> XYZ -> Oklab -> Oklch.
   */
  static FE() {
    (Brush.dD(), Brush.EE(), Brush.BE()); // RGB->XYZ, XYZ->Oklab, Oklab->Oklch
  }

  /**
   * Oklch -> RGB: Ruta completa Oklch -> Oklab -> XYZ -> RGB.
   */
  static IE() {
    (Brush.zE(), Brush.VE(), Brush.gD()); // Oklch->Oklab, Oklab->XYZ, XYZ->RGB
  }

  /**
   * Valida un valor de pincel (color string o instancia de Brush).
   * Usado para validación de argumentos en modo Debug.
   * @param {string|Brush} t - Valor a validar.
   * @param {string} i - Nombre del parámetro para el mensaje de error.
   */
  static Dd(t, i) {
    typeof t == "string"
      ? Debug && !Brush.isValidColor(t) && U.n('Color "' + t + '" is not a valid color string for ' + i)
      : t instanceof Brush || U.n("Value for " + i + " must be a color string or a Brush, not " + t);
  }

  /** @const {number} Tipo de pincel: color sólido. */
  static Solid = 1;
  /** @const {number} Tipo de pincel: degradado lineal. */
  static Linear = 2;
  /** @const {number} Tipo de pincel: degradado radial. */
  static Radial = 3;
  /** @const {number} Tipo de pincel: patrón de imagen. */
  static Pattern = 4;
  /** @const {number} Espacio de color CIE Lab. */
  static Lab = 1;
  /** @const {number} Espacio de color HSL. */
  static HSL = 2;
  /** @type {?CanvasRenderingContext2D} Contexto de canvas perezoso para parseo de colores. */
  static ps = null;
  /** @type {boolean} Indica si ya se inicializó el canvas de parseo de color. */
  static Np = false;
  /** @type {ColorNumbers} Componentes de color en espacio RGB. Formato: n0=R, n1=G, n2=B, n3=A. */
  static v = new ColorNumbers();
  /** @type {ColorNumbers} Componentes de color en espacio HSL. Formato: n0=H, n1=S, n2=L, n3=A. */
  static qi = new ColorNumbers();
  /** @type {ColorNumbers} Componentes de color en espacio XYZ (D65). Formato: n0=X, n1=Y, n2=Z, n3=A. */
  static Ot = new ColorNumbers();
  /** @type {ColorNumbers} Componentes de color en espacio CIE Lab. Formato: n0=L*, n1=a*, n2=b*, n3=A. */
  static go = new ColorNumbers();
  /** @type {ColorNumbers} Componentes de color en espacio Oklab. Formato: n0=L, n1=a, n2=b, n3=A. */
  static yi = new ColorNumbers();
  /** @type {ColorNumbers} Componentes de color en espacio Oklch. Formato: n0=L, n1=C, n2=h, n3=A. */
  static mo = new ColorNumbers();
}
