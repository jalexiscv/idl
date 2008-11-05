# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [日本語](README.ja.md) | [Français](README.fr.md) | **Deutsch**

Native JavaScript-Bibliothek für interaktive Diagramme mit dualem **SVG + Canvas**-Rendering. Keine externen Abhängigkeiten.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## Funktionen

- Duales **SVG**- und **Canvas**-Rendering mit automatischer Viewport-basierter Umschaltung
- **148 Klassen** modular in 11 Paketen organisiert
- Grafikobjekt-Hierarchie: Panels, Formen, Text, Bilder, Verzierungen
- Bidirektionales **Datenbindungssystem** Modell ↔ Ansicht
- **Transaktionen** mit integriertem Undo/Redo via `UndoManager`
- 5 Layout-Algorithmen: Baum, Kräftebasiert, Kreisförmig, Gitter, Layered Digraph
- 14 Interaktionswerkzeuge: Ziehen, Größe ändern, Drehen, Verknüpfen, Schwenken, Text bearbeiten, etc.
- Unterstützung für einklappbare **Gruppen** und verschachtelte Teilgraphen
- Automatisches Link-Routing mit mehreren Strategien
- Rich-Text-Formatierung mit `TextFormat`
- Anpassbares **Theme**-System
- UI-Komponenten: `Diagram`, `Palette`, `Overview`

## Installation

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / Bundler
const idl = require("idl");

// Browser — dist/idl.js ins Projekt kopieren
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## Schnellstart

```javascript
const idl = require("idl");

// 1. Diagramm erstellen
const diagram = new idl.Diagram("myDiagramDiv");

// 2. Modell mit Knoten und Links definieren
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "Start" },
    { key: 2, text: "Prozess" },
    { key: 3, text: "Ende" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### Benutzerdefinierte Knoten-Templates

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

### Layout Anwenden

```javascript
// Baumlayout (von oben nach unten)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// Kräftebasiertes Layout
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// Kreisförmiges Layout
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### Ereignisbehandlung

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("Diagramm geändert", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Transaktionen mit Undo/Redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "Neuer Knoten" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "Knoten hinzufügen");

diagram.undo(); // rückgängig
diagram.redo(); // wiederholen
```

## API — Hauptklassen

### UI-Komponenten (`src/ui/`)
| Klasse | Beschreibung |
|---|---|
| `Diagram` | Hauptleinwand, auf der der Graph gerendert wird |
| `Palette` | Werkzeugpanel mit ziehbaren Knoten |
| `Overview` | Minikarte des gesamten Diagramms |

### Modelle (`src/model/`)
| Klasse | Beschreibung |
|---|---|
| `GraphLinksModel` | Modell mit Knoten + Links (gerichteter Graph) |
| `TreeModel` | Hierarchisches Eltern-Kind-Modell |

### Grafikobjekte (`src/obj/`)
| Klasse | Beschreibung |
|---|---|
| `GraphObject` | Basisklasse aller Grafikobjekte |
| `Panel` | Container, der seine Kinder organisiert |
| `Shape` | Vektorielle geometrische Formen |
| `TextBlock` | Formatierter Textblock |
| `Picture` | Bild (SVG/Canvas) |

### Layouts (`src/layout/`)
| Klasse | Beschreibung |
|---|---|
| `TreeLayout` | Hierarchischer Baum (vertikal/horizontal) |
| `ForceDirectedLayout` | Physikbasierte Kraftsimulation |
| `CircularLayout` | Radiale Anordnung |
| `GridLayout` | Regelmäßiges Gitter |
| `LayeredDigraphLayout` | Geschichtete gerichtete Graphen (Sugiyama) |

### Werkzeuge (`src/tools/`)
| Klasse | Beschreibung |
|---|---|
| `ToolManager` | Werkzeugorchestrator nach Modus |
| `DraggingTool` | Ziehen von Knoten/Auswahl |
| `ResizingTool` | Größenänderung von Knoten |
| `RotatingTool` | Drehung von Knoten |
| `LinkingTool` | Erstellung von Links |
| `PanningTool` | Viewport-Schwenken |
| `ClickSelectingTool` | Klick-Auswahl |
| `DragSelectingTool` | Rahmen-Auswahl |
| `TextEditingTool` | In-Place-Textbearbeitung |
| `ContextMenuTool` | Kontextmenü |

## Projektstruktur

```
src/
├── core/       # Dienstprogramme, Transaktionen, Bindungen, Undo-Manager
├── geom/       # Geometrische Primitive (Point, Size, Rect, Margin, Spot)
├── collect/    # Sammlungen (List, Set, Map, Iterator)
├── render/     # Render-Engine (Brush, Geometry, SVG, Canvas)
├── obj/        # Grafikobjekt-Hierarchie (GraphObject, Panel, Shape)
├── nodes/      # Knoten und Links (Node, Link, Group, Adornment)
├── tools/      # Interaktionswerkzeuge (ToolManager und 14 Werkzeuge)
├── layout/     # Layout-Algorithmen (5 Layouts + Netzwerke)
├── model/      # Datenmodelle (GraphLinksModel, TreeModel)
├── ui/         # Schnittstellenkomponenten (Diagram, Palette, Overview)
├── theme/      # Theme-System
└── router/     # Link-Routing
```

## Build

```bash
node build.js        # Erstellt dist/idl.js (~1 MB) aus src/ neu
node extract.js      # Extrahiert Klassen aus dem ursprünglichen Bundle
```

Der Build konkateniert `_prelude.js` + 148 Klassen in Abhängigkeitsreihenfolge + `_postlude.js` in eine einzige selbstausführende Datei (IIFE).

---

## Mitwirken

1. Forken Sie das Repository
2. Erstellen Sie einen Branch: `git checkout -b feature/neue-funktion`
3. Commiten Sie: `git commit -m 'Add: neue funktion'`
4. Pushen und PR erstellen

---

<div align="center">

Mit Sorgfalt erstellt von **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — Kolumbien

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — MIT-Lizenz

</div>
