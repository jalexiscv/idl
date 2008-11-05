# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | **中文** | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

原生 JavaScript 交互式图表库，支持 **SVG + Canvas** 双渲染引擎。零外部依赖。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## 功能特性

- **SVG** 和 **Canvas** 双渲染引擎，根据视口自动切换
- **148 个类**，模块化组织在 11 个包中
- 图形对象层次结构：面板、形状、文本、图像、装饰
- 双向**数据绑定**系统 模型 ↔ 视图
- **事务**支持内置 undo/redo（通过 `UndoManager`）
- 5 种布局算法：树形、力导向、圆形、网格、分层有向图
- 14 种交互工具：拖拽、缩放、旋转、连线、平移、文本编辑等
- 支持可折叠**组**和嵌套子图
- 自动连线路由（多种策略）
- 通过 `TextFormat` 实现富文本格式
- 可自定义的**主题**系统
- UI 组件：`Diagram`、`Palette`、`Overview`

## 安装

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / 打包工具
const idl = require("idl");

// 浏览器 — 将 dist/idl.js 复制到您的项目中
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## 快速开始

```javascript
const idl = require("idl");

// 1. 创建图表
const diagram = new idl.Diagram("myDiagramDiv");

// 2. 使用节点和连线定义模型
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "开始" },
    { key: 2, text: "处理" },
    { key: 3, text: "结束" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### 自定义节点模板

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

### 应用布局

```javascript
// 树形布局（自上而下）
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// 力导向布局
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// 圆形布局
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### 事件处理

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("图表已修改", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### 事务与 Undo/Redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "新节点" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "添加节点");

diagram.undo(); // 撤销
diagram.redo(); // 重做
```

## API — 主要类

### UI 组件 (`src/ui/`)
| 类 | 描述 |
|---|---|
| `Diagram` | 渲染图形的主画布 |
| `Palette` | 带有可拖拽节点的工具面板 |
| `Overview` | 完整图表的缩略图 |

### 模型 (`src/model/`)
| 类 | 描述 |
|---|---|
| `GraphLinksModel` | 节点 + 连线模型（有向图） |
| `TreeModel` | 层次父子模型 |

### 图形对象 (`src/obj/`)
| 类 | 描述 |
|---|---|
| `GraphObject` | 所有图形对象的基类 |
| `Panel` | 组织子元素的容器 |
| `Shape` | 矢量几何形状 |
| `TextBlock` | 格式化文本块 |
| `Picture` | 图像（SVG/Canvas） |

### 布局 (`src/layout/`)
| 类 | 描述 |
|---|---|
| `TreeLayout` | 层次树（垂直/水平） |
| `ForceDirectedLayout` | 基于物理的力模拟 |
| `CircularLayout` | 径向排列 |
| `GridLayout` | 规则网格 |
| `LayeredDigraphLayout` | 分层有向图（Sugiyama） |

### 工具 (`src/tools/`)
| 类 | 描述 |
|---|---|
| `ToolManager` | 按模式编排工具 |
| `DraggingTool` | 节点/选择拖拽 |
| `ResizingTool` | 节点大小调整 |
| `RotatingTool` | 节点旋转 |
| `LinkingTool` | 连线创建 |
| `PanningTool` | 视口平移 |
| `ClickSelectingTool` | 点击选择 |
| `DragSelectingTool` | 框选 |
| `TextEditingTool` | 就地文本编辑 |
| `ContextMenuTool` | 上下文菜单 |

## 项目结构

```
src/
├── core/       # 实用工具、事务、绑定、撤销管理器
├── geom/       # 几何基元（Point, Size, Rect, Margin, Spot）
├── collect/    # 集合（List, Set, Map, Iterator）
├── render/     # 渲染引擎（Brush, Geometry, SVG, Canvas）
├── obj/        # 图形对象层次结构（GraphObject, Panel, Shape）
├── nodes/      # 节点和连线（Node, Link, Group, Adornment）
├── tools/      # 交互工具（ToolManager 和 14 个工具）
├── layout/     # 布局算法（5 种布局 + 网络）
├── model/      # 数据模型（GraphLinksModel, TreeModel）
├── ui/         # 界面组件（Diagram, Palette, Overview）
├── theme/      # 主题系统
└── router/     # 连线路由
```

## 构建

```bash
node build.js        # 从 src/ 重新构建 dist/idl.js (~1 MB)
node extract.js      # 从原始包中提取类
```

构建过程将 `_prelude.js` + 148 个类（按依赖顺序）+ `_postlude.js` 连接成一个自执行文件（IIFE）。

---

## 贡献

1. Fork 本仓库
2. 创建分支：`git checkout -b feature/new-feature`
3. 提交：`git commit -m 'Add: new feature'`
4. 推送并创建 PR

---

<div align="center">

用心制作 — **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — 哥伦比亚

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — MIT 许可证

</div>
