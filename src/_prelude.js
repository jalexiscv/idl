/**
 * Interactive Diagrams Library
 * @fileoverview Preludio de la biblioteca IDL (Interactive Diagrams Library).
 * Este archivo configura el entorno de ejecución detectando el objeto raíz global
 * (window en navegadores, global en Node.js), configura el polyfill para
 * requestAnimationFrame, e inicializa el objeto Debug con utilidades de
 * diagnóstico visual y registro de trazas.
 */
(function () {
  // Detección del objeto raíz global (window, global, self) para soportar múltiples entornos
  const root =
    (typeof globalThis == "object" && globalThis) ||
    (typeof global == "object" && global.global === global && global) ||
    (typeof self == "object" && self.self === self && self) ||
    {};
  // Polyfill para requestAnimationFrame en entornos que no lo soportan (Node.js)
  root.requestAnimationFrame === void 0 &&
    (root.setImmediate === void 0
      ? (root.requestAnimationFrame = (w) => root.setTimeout(w, 0))
      : (root.requestAnimationFrame = root.setImmediate));
  /** Objeto Debug con utilidades de diagnóstico visual para desarrollo */
  const Debug = {
    boundsInfoEnabled: false,
    drawLocationsEnabled: false,
    drawClipEnabled: false,
    drawLinkpointsEnabled: false,
    nodeInspector: false,
    handleMessages: false,
    drawFrames: false,
    defaultDiagram: null,
    /** Imprime un mensaje de traza en la consola del navegador */
    trace: function (w) {
      root.console && root.console.log(w);
    },
    /**
     * Dibuja los límites del diagrama en un contexto canvas para depuración visual.
     * @param {CanvasRenderingContext2D} w - Contexto de renderizado 2D
     * @param {Matrix} t - Matriz de transformación del diagrama
     * @param {number} i - Escala actual del diagrama
     * @param {Rect} e - Rectángulo de límites del documento
     */
    drawDiagramBounds(w, t, i, e) {
      ((w.strokeStyle = "red"),
        (w.fillStyle = "red"),
        (w.font = "8px sans-serif"),
        w.beginPath(),
        w.moveTo(-10, 0),
        w.lineTo(10, 0),
        w.moveTo(0, -10),
        w.lineTo(0, 10),
        w.stroke(),
        w.setTransform(1, 0, 0, 1, 0, 0),
        w.scale(i, i),
        w.transform(t.m11, t.m12, t.m21, t.m22, t.dx, t.dy),
        (w.lineWidth = 2),
        w.beginPath(),
        w.moveTo(e.left, e.top + 20),
        w.lineTo(e.left, e.top),
        w.lineTo(e.left + 20, e.top),
        w.moveTo(e.right, e.bottom - 20),
        w.lineTo(e.right, e.bottom),
        w.lineTo(e.right - 20, e.bottom),
        w.stroke(),
        w.fillText(
          "DB: " + Math.round(e.x) + ", " + Math.round(e.y) + ", " + Math.round(e.width) + ", " + Math.round(e.height),
          e.left,
          e.top - 5,
        ));
    },
    /**
     * Adjunta setters de solo lectura a todas las propiedades getter-only
     * de los prototipos de clase para advertir cuando se intenta modificarlas.
     * @param {object} w - Objeto namespace (idl) con todas las clases
     */
    attachReadonlyWarnings: function (w) {
      for (const t in w) {
        if (t === "licenseKey") continue;
        const i = w[t];
        if (i.prototype === void 0) continue;
        const e = Object.getOwnPropertyNames(i.prototype);
        for (let s = 0; s < e.length; s++) {
          const n = Object.getOwnPropertyDescriptor(i.prototype, e[s]);
          n && n.get !== void 0 && n.set === void 0 &&
            Object.defineProperty(i.prototype, e[s], {
              set: function () {
                U.n("Property " + e[s] + " of " + t + " is read-only.");
              },
            });
        }
      }
    },
  };
  // Capturar referencia previa a idl para detección de conflictos de versión
  var oldIdl = root.idl;
