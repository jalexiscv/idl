/** @fileoverview Clase Themes - Definiciones de temas visuales predefinidos
 * para el diagrama IDL. Contiene los temas claro (Light) y oscuro (Dark)
 * con sus respectivos colores, fuentes, numeros, margenes y puntas de flecha. */

/**
 * Themes es un contenedor estatico que define los temas visuales
 * predefinidos del diagrama. Cada tema es un objeto con categorias
 * de propiedades: colores (colors), fuentes (fonts), valores numericos
 * (numbers), margenes (margins), y estilos de punta de flecha (arrowheads).
 * Los temas son utilizados por ThemeManager para aplicar estilos
 * consistentes a todos los elementos del diagrama.
 */
class Themes {
  constructor() {}
  /**
   * Tema claro (Light) - Esquema de colores claros para el diagrama.
   * Define colores para texto, enlaces, grupos, seleccion, cuadricula,
   * adornos y otros elementos visuales sobre fondo claro.
   * @type {Object}
   */
  static Light = {
    colors: {
      text: "#0a0a0a",           // Color de texto principal (casi negro)
      comment: "#ca8a04",         // Color para comentarios (ambar oscuro)
      link: "#0a0a0a",            // Color de enlaces
      group: "#a3a3a344",         // Color de grupo (gris con transparencia)
      outline: "#a3a3a3",         // Color de contorno (gris medio)
      selection: "#0ea5e9",       // Color de seleccion (azul cielo)
      div: "#fff",                // Color de fondo del div contenedor (blanco)
      gridMinor: "#e5e5e5",       // Color de cuadricula menor (gris muy claro)
      gridMajor: "#a3a3a3",       // Color de cuadricula mayor (gris medio)
      overviewBox: "#c026d3",     // Color del recuadro en el Overview (magenta)
      tempLink: "#2563eb",        // Color de enlace temporal durante creacion (azul)
      tempPort: "#c026d3",        // Color de puerto temporal (magenta)
      adornmentFill: "#0ea5e9",   // Color de relleno de adornos (azul cielo)
      adornmentStroke: "#1e40af", // Color de borde de adornos (azul oscuro)
      dragSelect: "#c026d3",      // Color de seleccion por arrastre (magenta)
    },
    fonts: { normal: "10pt sans-serif", bold: "bold 12pt sans-serif" },
    numbers: { group: 1, selection: 3 },       // Valores numericos: opacidad de grupo, grosor de seleccion
    margins: { group: new Margin(5) },          // Margen para grupos (5 pixeles en todos los lados)
    arrowheads: { toArrow: "Standard" },        // Estilo de punta de flecha por defecto
  };
  /**
   * Tema oscuro (Dark) - Esquema de colores oscuros para el diagrama.
   * Define colores claros para contraste sobre fondo oscuro (#171717).
   * Mantiene la misma estructura que el tema Light pero con colores
   * adaptados para modo oscuro.
   * @type {Object}
   */
  static Dark = {
    colors: {
      text: "#f5f5f5",           // Color de texto principal (casi blanco)
      comment: "#facc15",         // Color para comentarios (amarillo brillante)
      link: "#f5f5f5",            // Color de enlaces (casi blanco)
      group: "#a3a3a388",         // Color de grupo (gris con transparencia)
      outline: "#a3a3a3",         // Color de contorno
      selection: "#38bdf8",       // Color de seleccion (azul claro)
      div: "#171717",             // Color de fondo del div contenedor (gris muy oscuro)
      gridMinor: "#262626",       // Color de cuadricula menor
      gridMajor: "#404040",       // Color de cuadricula mayor
      overviewBox: "#e879f9",     // Color del recuadro en el Overview (violeta claro)
      tempLink: "#60a5fa",        // Color de enlace temporal (azul claro)
      tempPort: "#e879f9",        // Color de puerto temporal (violeta claro)
      adornmentFill: "#38bdf8",   // Color de relleno de adornos
      adornmentStroke: "#2563eb", // Color de borde de adornos
      dragSelect: "#e879f9",      // Color de seleccion por arrastre
    },
    fonts: { normal: "10pt sans-serif", bold: "bold 12pt sans-serif" },
    numbers: { group: 1, selection: 3 },
    margins: { group: new Margin(5) },
    arrowheads: { toArrow: "Standard" },
  };
}
