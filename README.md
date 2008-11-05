# Interactive Diagrams Library (IDL)

> **Español** | [English](docs/readme/README.en.md) | [中文](docs/readme/README.zh.md) | [हिन्दी](docs/readme/README.hi.md) | [العربية](docs/readme/README.ar.md) | [Português](docs/readme/README.pt.md) | [Русский](docs/readme/README.ru.md) | [日本語](docs/readme/README.ja.md) | [Français](docs/readme/README.fr.md) | [Deutsch](docs/readme/README.de.md)

Librería JavaScript nativa para diagramas interactivos con renderizado dual **SVG + Canvas**. Sin dependencias externas.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## Características

- Renderizado dual **SVG** y **Canvas** con switch automático según viewport
- **148 clases** organizadas modularmente en 11 paquetes
- Jerarquía de objetos gráficos: paneles, formas, texto, imágenes, adornos
- Sistema de **binding** de datos bidireccional modelo ↔ vista
- **Transacciones** con undo/redo integrado vía `UndoManager`
- 5 algoritmos de posicionamiento: árbol, fuerza, circular, grid, layered digraph
- 14 herramientas de interacción: drag, resize, rotate, link, pan, text edit, etc.
- Soporte para **grupos** colapsables y subgrafos anidados
- Enrutamiento automático de enlaces con múltiples estrategias
- Formato de texto enriquecido con `TextFormat`
- Sistema de **temas** personalizables
- Componentes UI: `Diagram`, `Palette`, `Overview`

## Instalación

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / bundlers
const idl = require("idl");

// Browser — copia dist/idl.js en tu proyecto
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## Uso rápido

```javascript
const idl = require("idl");

// 1. Crear el diagrama
const diagram = new idl.Diagram("myDiagramDiv");

// 2. Definir el modelo con nodos y enlaces
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "Inicio" },
    { key: 2, text: "Proceso" },
    { key: 3, text: "Fin" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### Personalizar nodos con templates

```javascript
diagram.nodeTemplate = new idl.Node("Spot", {
  selectionAdorned: false,
})
  .add(
    new idl.Shape("RoundedRectangle", {
      fill: "#4A90D9",
      stroke: "#2C5F8A",
      strokeWidth: 2,
      width: 120,
      height: 50,
    }),
    new idl.TextBlock("", {
      stroke: "white",
      font: "bold 13px sans-serif",
    }).bind("text", "text")
  );

diagram.linkTemplate = new idl.Link()
  .add(new idl.Shape("", { stroke: "#999", strokeWidth: 2 }));
```

### Aplicar un layout

```javascript
// Layout de árbol (top-down)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// Layout de fuerza
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// Layout circular
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### Manejar eventos

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("Diagrama modificado", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Transacciones con undo/redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "Nuevo nodo" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "Añadir nodo");

diagram.undo(); // deshacer
diagram.redo(); // rehacer
```

## API — Clases principales

### Componentes UI (`src/ui/`)
| Clase | Descripción |
|---|---|
| `Diagram` | Lienzo principal donde se renderiza el grafo |
| `Palette` | Panel de herramientas con nodos arrastrables |
| `Overview` | Mini-mapa del diagrama completo |

### Modelos (`src/model/`)
| Clase | Descripción |
|---|---|
| `GraphLinksModel` | Modelo con nodos + enlaces (grafo dirigido) |
| `TreeModel` | Modelo jerárquico padre-hijo |

### Objetos gráficos (`src/obj/`)
| Clase | Descripción |
|---|---|
| `GraphObject` | Clase base de todos los objetos gráficos |
| `Panel` | Contenedor que organiza sus hijos |
| `Shape` | Formas geométricas vectoriales |
| `TextBlock` | Bloque de texto con formato |
| `Picture` | Imagen (SVG/Canvas) |

### Layouts (`src/layout/`)
| Clase | Descripción |
|---|---|
| `TreeLayout` | Árbol jerárquico (vertical/horizontal) |
| `ForceDirectedLayout` | Físico basado en fuerzas |
| `CircularLayout` | Disposición radial |
| `GridLayout` | Cuadrícula regular |
| `LayeredDigraphLayout` | Grafos dirigidos por capas (Sugiyama) |

### Herramientas (`src/tools/`)
| Clase | Descripción |
|---|---|
| `ToolManager` | Orquestador de herramientas por modo |
| `DraggingTool` | Arrastre de nodos/selección |
| `ResizingTool` | Redimensión de nodos |
| `RotatingTool` | Rotación de nodos |
| `LinkingTool` | Creación de enlaces |
| `PanningTool` | Desplazamiento del viewport |
| `ClickSelectingTool` | Selección con clic |
| `DragSelectingTool` | Selección con arrastre (marco) |
| `TextEditingTool` | Edición de texto in-place |
| `ContextMenuTool` | Menú contextual |

## Estructura del proyecto

```
src/
├── core/       # Utilidades, transacciones, bindings, undo manager
├── geom/       # Primitivas geométricas (Point, Size, Rect, Margin, Spot)
├── collect/    # Colecciones (List, Set, Map, Iterator)
├── render/     # Motor de renderizado (Brush, Geometry, SVG, Canvas)
├── obj/        # Jerarquía de objetos gráficos (GraphObject, Panel, Shape)
├── nodes/      # Nodos y enlaces (Node, Link, Group, Adornment)
├── tools/      # Herramientas de interacción (ToolManager y 14 herramientas)
├── layout/     # Algoritmos de posicionamiento (5 layouts + redes)
├── model/      # Modelos de datos (GraphLinksModel, TreeModel)
├── ui/         # Componentes de interfaz (Diagram, Palette, Overview)
├── theme/      # Sistema de temas
└── router/     # Enrutamiento de enlaces
```

## Build

```bash
node build.js        # Reconstruye dist/idl.js (~1 MB) desde src/
node extract.js      # Extrae clases del bundle original
```

El build concatena `_prelude.js` + 148 clases en orden de dependencia + `_postlude.js` para producir un único archivo autoejecutable (IIFE).

---

## Contribuir

1. Haz fork del repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit: `git commit -m 'Add: nueva funcionalidad'`
4. Push y PR

---

<div align="center">

Made with care by **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — Colombia

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — MIT License

</div>
