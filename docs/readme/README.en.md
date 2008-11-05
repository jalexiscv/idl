# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | **English** | [中文](README.zh.md) | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Native JavaScript library for interactive diagrams with dual **SVG + Canvas** rendering. Zero external dependencies.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## Features

- Dual **SVG** and **Canvas** rendering with automatic viewport-based switching
- **148 classes** organized modularly across 11 packages
- Graphics object hierarchy: panels, shapes, text, images, adornments
- Bidirectional **data binding** system model ↔ view
- **Transactions** with built-in undo/redo via `UndoManager`
- 5 layout algorithms: tree, force-directed, circular, grid, layered digraph
- 14 interaction tools: drag, resize, rotate, link, pan, text editing, etc.
- Support for collapsible **groups** and nested subgraphs
- Automatic link routing with multiple strategies
- Rich text formatting with `TextFormat`
- Customizable **theme** system
- UI components: `Diagram`, `Palette`, `Overview`

## Installation

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / bundlers
const idl = require("idl");

// Browser — copy dist/idl.js into your project
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## Quick Start

```javascript
const idl = require("idl");

// 1. Create the diagram
const diagram = new idl.Diagram("myDiagramDiv");

// 2. Define the model with nodes and links
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "Start" },
    { key: 2, text: "Process" },
    { key: 3, text: "End" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### Custom Node Templates

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

### Apply a Layout

```javascript
// Tree layout (top-down)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// Force-directed layout
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// Circular layout
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### Event Handling

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("Diagram modified", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Transactions with Undo/Redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "New node" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "Add node");

diagram.undo(); // undo
diagram.redo(); // redo
```

## API — Main Classes

### UI Components (`src/ui/`)
| Class | Description |
|---|---|
| `Diagram` | Main canvas where the graph is rendered |
| `Palette` | Tool panel with draggable nodes |
| `Overview` | Minimap of the complete diagram |

### Models (`src/model/`)
| Class | Description |
|---|---|
| `GraphLinksModel` | Model with nodes + links (directed graph) |
| `TreeModel` | Hierarchical parent-child model |

### Graph Objects (`src/obj/`)
| Class | Description |
|---|---|
| `GraphObject` | Base class for all graphic objects |
| `Panel` | Container that organizes its children |
| `Shape` | Vector geometric shapes |
| `TextBlock` | Formatted text block |
| `Picture` | Image (SVG/Canvas) |

### Layouts (`src/layout/`)
| Class | Description |
|---|---|
| `TreeLayout` | Hierarchical tree (vertical/horizontal) |
| `ForceDirectedLayout` | Physics-based force simulation |
| `CircularLayout` | Radial arrangement |
| `GridLayout` | Regular grid |
| `LayeredDigraphLayout` | Layered directed graphs (Sugiyama) |

### Tools (`src/tools/`)
| Class | Description |
|---|---|
| `ToolManager` | Tool orchestrator by mode |
| `DraggingTool` | Node/selection dragging |
| `ResizingTool` | Node resizing |
| `RotatingTool` | Node rotation |
| `LinkingTool` | Link creation |
| `PanningTool` | Viewport panning |
| `ClickSelectingTool` | Click selection |
| `DragSelectingTool` | Drag-box selection |
| `TextEditingTool` | In-place text editing |
| `ContextMenuTool` | Context menu |

## Project Structure

```
src/
├── core/       # Utilities, transactions, bindings, undo manager
├── geom/       # Geometric primitives (Point, Size, Rect, Margin, Spot)
├── collect/    # Collections (List, Set, Map, Iterator)
├── render/     # Rendering engine (Brush, Geometry, SVG, Canvas)
├── obj/        # Graphics object hierarchy (GraphObject, Panel, Shape)
├── nodes/      # Nodes and links (Node, Link, Group, Adornment)
├── tools/      # Interaction tools (ToolManager and 14 tools)
├── layout/     # Layout algorithms (5 layouts + networks)
├── model/      # Data models (GraphLinksModel, TreeModel)
├── ui/         # Interface components (Diagram, Palette, Overview)
├── theme/      # Theme system
└── router/     # Link routing
```

## Build

```bash
node build.js        # Rebuilds dist/idl.js (~1 MB) from src/
node extract.js      # Extracts classes from original bundle
```

The build concatenates `_prelude.js` + 148 classes in dependency order + `_postlude.js` to produce a single self-executing file (IIFE).

---

## Contributing

1. Fork the repository
2. Create a branch: `git checkout -b feature/new-feature`
3. Commit: `git commit -m 'Add: new feature'`
4. Push and create a PR

---

<div align="center">

Made with care by **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — Colombia

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — MIT License

</div>
