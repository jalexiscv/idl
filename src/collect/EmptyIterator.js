/** @fileoverview Implementa el iterador vacio (patron Null Object para iteradores).
 * Forma parte de la libreria IDL de diagramas interactivos.
 * El iterador vacio se usa como valor de retorno cuando una coleccion no tiene elementos,
 * evitando asi tener que manejar casos especiales de iterador nulo en el codigo cliente. */

/** Clase que implementa un iterador vacio siguiendo el patron Null Object.
 * Representa un iterador sobre una coleccion sin elementos.
 * Todas las operaciones retornan valores neutros (false, null, 0).
 * Utiliza una instancia unica compartida (singleton) para eficiencia. */
class EmptyIterator {
  /** Arreglo vacio interno usado para compatibilidad con Symbol.iterator. */
  _emptyArray;
  constructor() {
    this._emptyArray = [];
  }
  /** Permite iteracion con for...of devolviendo un iterador de arreglo vacio. */
  [Symbol.iterator]() {
    return this._emptyArray.values();
  }
  /** Clave actual del iterador (siempre es la misma referencia sin valor). */
  key;
  /** Valor actual del iterador (siempre es la misma referencia sin valor). */
  value;
  /** Retorna este mismo objeto como iterador (el iterador vacio es su propio iterador).
   * @returns {EmptyIterator} este mismo iterador */
  get iterator() {
    return this;
  }
  /** Reinicia el iterador. No hace nada porque no hay elementos que recorrer. */
  reset() {}
  /** Avanza al siguiente elemento. Siempre retorna false porque no hay elementos.
   * @returns {boolean} siempre false */
  next() {
    return false;
  }
  /** Verifica si hay un siguiente elemento disponible.
   * @returns {boolean} siempre false */
  hasNext() {
    return false;
  }
  /** Obtiene el primer elemento de la coleccion.
   * @returns {null} siempre null porque la coleccion esta vacia */
  first() {
    return null;
  }
  /** Evalua si algun elemento cumple una condicion.
   * @param {Function} _predicate - predicado a evaluar (no se usa)
   * @returns {boolean} siempre false */
  any(_predicate) {
    return false;
  }
  /** Evalua si todos los elementos cumplen una condicion.
   * @param {Function} _predicate - predicado a evaluar (no se usa)
   * @returns {boolean} siempre true (vacio por verdad en logica de predicados) */
  all(_predicate) {
    return true;
  }
  /** Ejecuta una funcion para cada elemento (no hace nada porque no hay elementos).
   * @param {Function} _callback - funcion a ejecutar (no se usa)
   * @returns {EmptyIterator} este mismo iterador para encadenamiento */
  each(_callback) {
    return this;
  }
  /** Transforma cada elemento con una funcion (no hace nada porque no hay elementos).
   * @param {Function} _callback - funcion de transformacion (no se usa)
   * @returns {EmptyIterator} este mismo iterador */
  map(_callback) {
    return this;
  }
  /** Filtra elementos con un predicado (no hace nada porque no hay elementos).
   * @param {Function} _predicate - predicado de filtro (no se usa)
   * @returns {EmptyIterator} este mismo iterador */
  filter(_predicate) {
    return this;
  }
  /** Cantidad de elementos en la coleccion.
   * @returns {number} siempre 0 */
  get count() {
    return 0;
  }
  /** Libera referencias internas del iterador. En el iterador vacio no hay nada que liberar. */
  dispose() {}
  /** Representacion en cadena del iterador para depuracion.
   * @returns {string} "EmptyIterator" */
  toString() {
    return "EmptyIterator";
  }
  /** Instancia unica compartida del iterador vacio (patron Singleton). */
  static instance = new EmptyIterator();
}
