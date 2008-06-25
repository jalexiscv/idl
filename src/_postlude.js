/**
 * @fileoverview Epílogo de la biblioteca IDL.
 * Este archivo cierra la IIFE (expresión de función invocada inmediatamente),
 * registra los nombres de clase en los constructores, exporta el espacio de
 * nombres global `idl`, adjunta advertencias de solo lectura, y configura
 * la exportación para AMD (RequireJS) y CommonJS (Node.js module.exports).
 */

// Asignar className a cada constructor para identificación en tiempo de ejecución
for (const w in idl) {
  const t = idl[w];
  U.lt(t) && t !== TextFormat && (t.className = w);
}
// Advertir si ya existe un objeto 'idl' en el ámbito global (conflicto de versiones)
U.it(oldIdl) &&
  oldIdl.version &&
  U.ot(
    "WARNING: a `idl` object on the root object is already defined.  " +
      ("Debug" in oldIdl ? "debug " : "") +
      "version: " +
      oldIdl.version +
      ", replaced with version: " +
      idl.version
  ),
  // Publicar el espacio de nombres IDL en el prototipo de Diagram y en el objeto raíz global
  (Diagram.prototype.idl = idl),
  (root.idl = idl),
  (idl.Debug = Debug),
  // Adjuntar advertencias de solo lectura a todas las propiedades congeladas
  Debug.attachReadonlyWarnings(idl);

})();

// Exportación para AMD (RequireJS) - define el módulo bajo el nombre global.idl
"function" === typeof define && define.amd && define("undefined" !== typeof global ? global.idl : self.idl);

// Exportación para CommonJS (Node.js) - asigna el módulo a module.exports
'undefined' !== typeof module && 'object' === typeof module.exports && (module.exports = 'undefined' !== typeof global ? global.idl : self.idl);
