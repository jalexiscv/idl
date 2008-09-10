/** @fileoverview Clase base Router - Define la interfaz para algoritmos de
 * enrutamiento de enlaces en el diagrama IDL. Los enrutadores determinan
 * la trayectoria que siguen los enlaces entre nodos. */

/**
 * Router es la clase base abstracta para todos los algoritmos de enrutamiento
 * de enlaces. Los enrutadores calculan las trayectorias que los enlaces
 * deben seguir para conectar los nodos en el diagrama.
 * Cada enrutador puede decidir si un enlace es enrutable y como
 * modificar sus puntos para optimizar la ruta.
 */
class Router {
  /** @type {string} Nombre del enrutador */
  At;
  /** @type {Diagram} Referencia al diagrama propietario */
  f;
  /** @type {boolean} Si el enrutador esta habilitado */
  Gi;
  /** @type {boolean} Si el enrutador opera en tiempo real durante arrastres */
  Cl;
  constructor() {
    // Inicializa con valores por defecto
    ((this.f = Diagram.Bm()), (this.At = ""), (this.Gi = !0), (this.Cl = !0));
  }
  /**
   * Obtiene el nombre del enrutador.
   * @returns {string} El nombre del enrutador
   */
  get name() {
    return this.At;
  }
  /**
   * Establece el nombre del enrutador.
   * @param {string} t - El nuevo nombre
   */
  set name(t) {
    this.At = t;
  }
  /**
   * Verifica si el enrutador esta habilitado.
   * @returns {boolean} true si esta habilitado
   */
  get isEnabled() {
    return this.Gi;
  }
  /**
   * Habilita o deshabilita el enrutador.
   * @param {boolean} t - true para habilitar, false para deshabilitar
   */
  set isEnabled(t) {
    this.Gi = t;
  }
  /**
   * Verifica si el enrutador opera en tiempo real.
   * Cuando es true, el enrutador recalcula rutas durante el arrastre.
   * @returns {boolean} true si opera en tiempo real
   */
  get isRealtime() {
    return this.Cl;
  }
  /**
   * Establece si el enrutador opera en tiempo real.
   * @param {boolean} t - true para tiempo real, false para solo al soltar
   */
  set isRealtime(t) {
    this.Cl = t;
  }
  /**
   * Obtiene el diagrama asociado a este enrutador.
   * @returns {Diagram} El diagrama propietario
   */
  get diagram() {
    return this.f;
  }
  /**
   * Establece el diagrama asociado a este enrutador.
   * Al cambiar de diagrama, invalida las rutas del nuevo diagrama.
   * @param {Diagram} t - El nuevo diagrama
   */
  set diagram(t) {
    this.f !== t && ((this.f = t), (t.zl = !0), t.requestUpdate());
  }
  /**
   * Invalida el enrutador, forzando el recalculo de rutas en el siguiente ciclo.
   */
  invalidateRouter() {
    this.f !== null && ((this.f.zl = !0), this.f.requestUpdate());
  }
  /**
   * Verifica si el enrutador puede rutear en las condiciones actuales.
   * Retorna false si esta deshabilitado, si el diagrama no esta listo,
   * o si hay animaciones en curso.
   * @param {Diagram|*} t - El diagrama o contexto a verificar
   * @returns {boolean} true si puede rutear
   */
  canRoute(t) {
    if (!this.isEnabled) return !1;
    const i = this.diagram;
    // No permite rutear si el diagrama esta en modo lectura o hay animaciones
    return !(i && ((!this.isRealtime && i.Yu) || i.animationManager.isTicking));
  }
  /**
   * Determina si un enlace especifico puede ser enrutado por este enrutador.
   * Las subclases deben sobrescribir este metodo para filtrar enlaces.
   * @param {Link} t - El enlace a evaluar
   * @param {*} i - Contexto adicional (grupo, diagrama, etc.)
   * @returns {boolean} true si el enlace es enrutable
   */
  isRoutable(t, i) {
    return !0;
  }
  /**
   * Ejecuta el algoritmo de enrutamiento sobre una coleccion de enlaces.
   * Las subclases deben sobrescribir este metodo con el algoritmo especifico.
   * @param {Iterator} t - Iterador de enlaces a rutear
   * @param {*} i - Contexto adicional (diagrama, grupo, etc.)
   */
  routeLinks(t, i) {}
  /**
   * Retorna una representacion en cadena del enrutador.
   * @returns {string} Nombre del enrutador + " Router"
   */
  toString() {
    return this.name !== "" ? this.name + " Router" : U.Jn(this.constructor);
  }
}
