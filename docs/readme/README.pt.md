# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | **Português** | [Русский](README.ru.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Biblioteca JavaScript nativa para diagramas interativos com renderização dupla **SVG + Canvas**. Sem dependências externas.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## Funcionalidades

- Renderização dupla **SVG** e **Canvas** com alternância automática baseada no viewport
- **148 classes** organizadas modularmente em 11 pacotes
- Hierarquia de objetos gráficos: painéis, formas, texto, imagens, adornos
- Sistema de **data binding** bidirecional modelo ↔ visão
- **Transações** com undo/redo integrado via `UndoManager`
- 5 algoritmos de layout: árvore, força direcionada, circular, grade, layered digraph
- 14 ferramentas de interação: arrastar, redimensionar, rotacionar, ligar, panorâmica, edição de texto, etc.
- Suporte a **grupos** colapsáveis e subgrafos aninhados
- Roteamento automático de links com múltiplas estratégias
- Formatação de texto rico com `TextFormat`
- Sistema de **temas** personalizáveis
- Componentes de UI: `Diagram`, `Palette`, `Overview`

## Instalação

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / bundlers
const idl = require("idl");

// Browser — copie dist/idl.js no seu projeto
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## Início Rápido

```javascript
const idl = require("idl");

// 1. Criar o diagrama
const diagram = new idl.Diagram("myDiagramDiv");

// 2. Definir o modelo com nós e links
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "Início" },
    { key: 2, text: "Processo" },
    { key: 3, text: "Fim" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### Modelos de Nós Personalizados

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

### Aplicar um Layout

```javascript
// Layout de árvore (topo-baixo)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// Layout dirigido por forças
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

### Manipulação de Eventos

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("Diagrama modificado", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Transações com Undo/Redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "Novo nó" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "Adicionar nó");

diagram.undo(); // desfazer
diagram.redo(); // refazer
```

## API — Classes Principais

### Componentes de UI (`src/ui/`)
| Classe | Descrição |
|---|---|
| `Diagram` | Tela principal onde o grafo é renderizado |
| `Palette` | Painel de ferramentas com nós arrastáveis |
| `Overview` | Miniatura do diagrama completo |

### Modelos (`src/model/`)
| Classe | Descrição |
|---|---|
| `GraphLinksModel` | Modelo com nós + links (grafo direcionado) |
| `TreeModel` | Modelo hierárquico pai-filho |

### Objetos Gráficos (`src/obj/`)
| Classe | Descrição |
|---|---|
| `GraphObject` | Classe base de todos os objetos gráficos |
| `Panel` | Contêiner que organiza seus filhos |
| `Shape` | Formas geométricas vetoriais |
| `TextBlock` | Bloco de texto formatado |
| `Picture` | Imagem (SVG/Canvas) |

### Layouts (`src/layout/`)
| Classe | Descrição |
|---|---|
| `TreeLayout` | Árvore hierárquica (vertical/horizontal) |
| `ForceDirectedLayout` | Simulação física baseada em forças |
| `CircularLayout` | Disposição radial |
| `GridLayout` | Grade regular |
| `LayeredDigraphLayout` | Grafos direcionados por camadas (Sugiyama) |

### Ferramentas (`src/tools/`)
| Classe | Descrição |
|---|---|
| `ToolManager` | Orquestrador de ferramentas por modo |
| `DraggingTool` | Arrasto de nós/seleção |
| `ResizingTool` | Redimensionamento de nós |
| `RotatingTool` | Rotação de nós |
| `LinkingTool` | Criação de links |
| `PanningTool` | Panorâmica do viewport |
| `ClickSelectingTool` | Seleção por clique |
| `DragSelectingTool` | Seleção por quadro |
| `TextEditingTool` | Edição de texto in-place |
| `ContextMenuTool` | Menu de contexto |

## Estrutura do Projeto

```
src/
├── core/       # Utilitários, transações, bindings, undo manager
├── geom/       # Primitivas geométricas (Point, Size, Rect, Margin, Spot)
├── collect/    # Coleções (List, Set, Map, Iterator)
├── render/     # Motor de renderização (Brush, Geometry, SVG, Canvas)
├── obj/        # Hierarquia de objetos gráficos (GraphObject, Panel, Shape)
├── nodes/      # Nós e links (Node, Link, Group, Adornment)
├── tools/      # Ferramentas de interação (ToolManager e 14 ferramentas)
├── layout/     # Algoritmos de layout (5 layouts + redes)
├── model/      # Modelos de dados (GraphLinksModel, TreeModel)
├── ui/         # Componentes de interface (Diagram, Palette, Overview)
├── theme/      # Sistema de temas
└── router/     # Roteamento de links
```

## Build

```bash
node build.js        # Reconstrói dist/idl.js (~1 MB) de src/
node extract.js      # Extrai classes do bundle original
```

O build concatena `_prelude.js` + 148 classes em ordem de dependência + `_postlude.js` em um único arquivo autoexecutável (IIFE).

---

## Contribuir

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feature/nova-funcionalidade`
3. Faça commit: `git commit -m 'Add: nova funcionalidade'`
4. Push e crie um PR

---

<div align="center">

Feito com cuidado por **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — Colômbia

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — Licença MIT

</div>
