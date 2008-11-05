# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [日本語](README.ja.md) | **Français** | [Deutsch](README.de.md)

Bibliothèque JavaScript native pour diagrammes interactifs avec rendu double **SVG + Canvas**. Sans dépendances externes.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## Fonctionnalités

- Rendu double **SVG** et **Canvas** avec basculement automatique selon le viewport
- **148 classes** organisées modulairement en 11 paquets
- Hiérarchie d'objets graphiques : panneaux, formes, texte, images, ornements
- Système de **liaison de données** bidirectionnelle modèle ↔ vue
- **Transactions** avec undo/redo intégré via `UndoManager`
- 5 algorithmes de positionnement : arbre, forces, circulaire, grille, layered digraph
- 14 outils d'interaction : glisser, redimensionner, pivoter, lier, panoramique, édition texte, etc.
- Support des **groupes** réductibles et sous-graphes imbriqués
- Routage automatique des liens avec plusieurs stratégies
- Formatage de texte enrichi avec `TextFormat`
- Système de **thèmes** personnalisables
- Composants UI : `Diagram`, `Palette`, `Overview`

## Installation

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / bundlers
const idl = require("idl");

// Browser — copier dist/idl.js dans votre projet
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## Démarrage Rapide

```javascript
const idl = require("idl");

// 1. Créer le diagramme
const diagram = new idl.Diagram("myDiagramDiv");

// 2. Définir le modèle avec nœuds et liens
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "Début" },
    { key: 2, text: "Processus" },
    { key: 3, text: "Fin" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### Modèles de Nœuds Personnalisés

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

### Appliquer un Layout

```javascript
// Layout en arbre (haut-bas)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// Layout dirigé par les forces
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// Layout circulaire
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### Gestion d'Événements

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("Diagramme modifié", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Transactions avec Undo/Redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "Nouveau nœud" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "Ajouter nœud");

diagram.undo(); // annuler
diagram.redo(); // rétablir
```

## API — Classes Principales

### Composants UI (`src/ui/`)
| Classe | Description |
|---|---|
| `Diagram` | Toile principale où le graphe est rendu |
| `Palette` | Panneau d'outils avec nœuds déplaçables |
| `Overview` | Mini-carte du diagramme complet |

### Modèles (`src/model/`)
| Classe | Description |
|---|---|
| `GraphLinksModel` | Modèle avec nœuds + liens (graphe dirigé) |
| `TreeModel` | Modèle hiérarchique parent-enfant |

### Objets Graphiques (`src/obj/`)
| Classe | Description |
|---|---|
| `GraphObject` | Classe de base de tous les objets graphiques |
| `Panel` | Conteneur qui organise ses enfants |
| `Shape` | Formes géométriques vectorielles |
| `TextBlock` | Bloc de texte formaté |
| `Picture` | Image (SVG/Canvas) |

### Layouts (`src/layout/`)
| Classe | Description |
|---|---|
| `TreeLayout` | Arbre hiérarchique (vertical/horizontal) |
| `ForceDirectedLayout` | Simulation physique par forces |
| `CircularLayout` | Disposition radiale |
| `GridLayout` | Grille régulière |
| `LayeredDigraphLayout` | Graphes dirigés par couches (Sugiyama) |

### Outils (`src/tools/`)
| Classe | Description |
|---|---|
| `ToolManager` | Orchestrateur d'outils par mode |
| `DraggingTool` | Glisser-déposer de nœuds/sélection |
| `ResizingTool` | Redimensionnement de nœuds |
| `RotatingTool` | Rotation de nœuds |
| `LinkingTool` | Création de liens |
| `PanningTool` | Panoramique du viewport |
| `ClickSelectingTool` | Sélection par clic |
| `DragSelectingTool` | Sélection par cadre |
| `TextEditingTool` | Édition de texte in situ |
| `ContextMenuTool` | Menu contextuel |

## Structure du Projet

```
src/
├── core/       # Utilitaires, transactions, liaisons, undo manager
├── geom/       # Primitives géométriques (Point, Size, Rect, Margin, Spot)
├── collect/    # Collections (List, Set, Map, Iterator)
├── render/     # Moteur de rendu (Brush, Geometry, SVG, Canvas)
├── obj/        # Hiérarchie d'objets graphiques (GraphObject, Panel, Shape)
├── nodes/      # Nœuds et liens (Node, Link, Group, Adornment)
├── tools/      # Outils d'interaction (ToolManager et 14 outils)
├── layout/     # Algorithmes de positionnement (5 layouts + réseaux)
├── model/      # Modèles de données (GraphLinksModel, TreeModel)
├── ui/         # Composants d'interface (Diagram, Palette, Overview)
├── theme/      # Système de thèmes
└── router/     # Routage de liens
```

## Build

```bash
node build.js        # Reconstruit dist/idl.js (~1 Mo) depuis src/
node extract.js      # Extrait les classes du bundle original
```

Le build concatène `_prelude.js` + 148 classes dans l'ordre de dépendance + `_postlude.js` en un seul fichier auto-exécutable (IIFE).

---

## Contribuer

1. Forkez le dépôt
2. Créez une branche : `git checkout -b feature/nouvelle-fonctionnalite`
3. Commitez : `git commit -m 'Add: nouvelle fonctionnalité'`
4. Poussez et créez une PR

---

<div align="center">

Conçu avec soin par **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — Colombie

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — Licence MIT

</div>
