/** @fileoverview Define el par clave-valor usado como elemento en colecciones de mapeo (GMap).
 * Forma parte de la libreria IDL de diagramas interactivos. */

/** Clase que representa un par clave-valor simple.
 * Se usa como elemento retornado por los iteradores de GMap y como envoltura
 * para pasar pares clave-valor a funciones de filtro, mapeo y recorrido. */
class KeyValuePair {
  /** Crea un nuevo par clave-valor.
   * @param {*} key - la clave del par
   * @param {*} value - el valor asociado a la clave */
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  /** Representacion en cadena para depuracion.
   * @returns {string} representacion en formato {clave:valor} */
  toString() {
    return "{" + this.key + ":" + this.value + "}";
  }
  /** Clave del par. */
  key;
  /** Valor asociado a la clave. */
  value;
}
