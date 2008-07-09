/**
 * @fileoverview Define la clase Transaction que agrupa una secuencia de cambios
 * del modelo (ChangedEvent) en una unidad atómica para soporte de deshacer/rehacer.
 * Las transacciones permiten revertir o reaplicar un conjunto de cambios como
 * una sola operación.
 */

/**
 * Clase que representa una transacción: un conjunto de cambios del modelo
 * que se ejecutan como una unidad atómica para el sistema de deshacer/rehacer.
 * Agrupa múltiples ChangedEvents bajo un nombre descriptivo.
 */
class Transaction {
  rT;
  At;
  qk;
  constructor() {
    // Lista de eventos de cambio que componen esta transacción (Lista congelada)
    (this.rT = new List().k()),
      // Nombre descriptivo de la transacción (ej: "Delete", "Paste")
      (this.At = ""),
      // Indica si la transacción está completa (cerrada)
      (this.qk = false);
  }
  /**
   * Convierte la transacción a cadena para depuración.
   * @param {boolean} [t] - Si es true, incluye detalles de cada cambio
   * @returns {string} Representación de la transacción
   */
  toString(t) {
    let i = "Transaction: " + this.name + " " + this.changes.count.toString() + (this.isComplete ? "" : ", incomplete");
    if (t !== void 0 && t > 0) {
      const e = this.changes.count;
      for (let s = 0; s < e; s++) {
        const n = this.changes.elt(s);
        n !== null &&
          (i +=
            `
	  ` + n.toString());
      }
    }
    return i;
  }
  /** Limpia todos los cambios de la transacción, liberando referencias. */
  clear() {
    const t = this.changes;
    t.di();
    for (let i = t.count - 1; i >= 0; i--) {
      const e = t.elt(i);
      e !== null && e.clear();
    }
    (t.clear(), t.k());
  }
  /** @returns {boolean} true si la transacción está completa y se puede deshacer */
  canUndo() {
    return this.isComplete;
  }
  /** Deshace todos los cambios de la transacción en orden inverso. */
  undo() {
    if (this.canUndo())
      for (let t = this.changes.count - 1; t >= 0; t--) {
        const i = this.changes.elt(t);
        i !== null && i.undo();
      }
  }
  /** @returns {boolean} true si la transacción está completa y se puede rehacer */
  canRedo() {
    return this.isComplete;
  }
  /** Rehace todos los cambios de la transacción en orden original. */
  redo() {
    if (!this.canRedo()) return;
    const t = this.changes.count;
    for (let i = 0; i < t; i++) {
      const e = this.changes.elt(i);
      e !== null && e.redo();
    }
  }
  /**
   * Revierte (deshace y elimina) los cambios desde un índice dado hasta el final.
   * Usado internamente para manejar transacciones anidadas que deben revertirse parcialmente.
   * @param {number} t - Índice desde el cual revertir cambios
   */
  gR(t) {
    const i = this.changes;
    for (let e = i.count - 1; e >= t; e--) {
      const s = i.elt(e);
      (s !== null && s.undo(), i.di(), i.removeAt(e));
    }
    i.k();
  }
  /** Descongela la lista de cambios permitiendo modificaciones temporales. */
  thaw() {
    this.changes.di();
  }
  /**
   * Optimiza la lista de cambios eliminando cambios de propiedad redundantes.
   * Si múltiples cambios afectan la misma propiedad del mismo objeto, solo
   * conserva el último cambio (el más reciente).
   */
  optimize() {
    if (!this.isComplete) return;
    const t = this.changes;
    t.di();
    const i = new Map();
    // Primera pasada: marcar cambios redundantes como null
    for (let s = 0; s < t.count; s++) {
      const n = t.elt(s);
      if (n === null || n.change !== 2 || !n.object) continue;
      let o = i.get(n.object);
      o || ((o = new Map()), i.set(n.object, o));
      const r = o.get(n.propertyName);
      r === void 0 ? o.set(n.propertyName, -1) : (r > 0 && t.setElt(r, null), o.set(n.propertyName, s));
    }
    // Segunda pasada: compactar la lista eliminando los null
    let e = 0;
    for (let s = 0; s < t.count; s++) {
      const n = t.elt(s);
      n !== null && (s > e && t.setElt(e, n), e++);
    }
    for (; t.length > e; ) t.pop();
    t.k();
  }
  /** @returns {List} La lista de eventos de cambio (ChangedEvent) */
  get changes() {
    return this.rT;
  }
  /** @returns {string} Nombre descriptivo de la transacción */
  get name() {
    return this.At;
  }
  set name(t) {
    this.At = t;
  }
  /** @returns {boolean} true si la transacción está completa y cerrada */
  get isComplete() {
    return this.qk;
  }
  set isComplete(t) {
    this.qk = t;
  }
}
