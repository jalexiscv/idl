# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | [Português](README.pt.md) | [Русский](README.ru.md) | **日本語** | [Français](README.fr.md) | [Deutsch](README.de.md)

インタラクティブ図のためのネイティブJavaScriptライブラリ。**SVG + Canvas** デュアルレンダリング対応。外部依存なし。

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## 特徴

- **SVG** と **Canvas** のデュアルレンダリング、ビューポートに応じた自動切替
- **148クラス**、11パッケージでモジュール構成
- グラフィックオブジェクト階層: パネル、図形、テキスト、画像、装飾
- 双方向 **データバインディング** システム モデル ↔ ビュー
- **トランザクション** と `UndoManager` による undo/redo
- 5種類のレイアウトアルゴリズム: ツリー、力指向、円形、グリッド、階層有向グラフ
- 14種類のインタラクションツール: ドラッグ、リサイズ、回転、リンク、パン、テキスト編集など
- 折りたたみ可能な **グループ** とネストされたサブグラフ
- 複数戦略による自動リンクルーティング
- `TextFormat` によるリッチテキスト
- カスタマイズ可能な **テーマ** システム
- UIコンポーネント: `Diagram`, `Palette`, `Overview`

## インストール

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / バンドラー
const idl = require("idl");

// ブラウザ — dist/idl.js をプロジェクトにコピー
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## クイックスタート

```javascript
const idl = require("idl");

// 1. 図を作成
const diagram = new idl.Diagram("myDiagramDiv");

// 2. ノードとリンクでモデルを定義
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "開始" },
    { key: 2, text: "処理" },
    { key: 3, text: "終了" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### カスタムノードテンプレート

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

### レイアウトの適用

```javascript
// ツリーレイアウト（上から下）
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// 力指向レイアウト
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// 円形レイアウト
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### イベント処理

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("図が変更されました", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Undo/Redo トランザクション

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "新しいノード" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "ノード追加");

diagram.undo(); // 元に戻す
diagram.redo(); // やり直し
```

## API — 主要クラス

### UIコンポーネント (`src/ui/`)
| クラス | 説明 |
|---|---|
| `Diagram` | グラフがレンダリングされるメインキャンバス |
| `Palette` | ドラッグ可能なノードのツールパネル |
| `Overview` | 図全体のミニマップ |

### モデル (`src/model/`)
| クラス | 説明 |
|---|---|
| `GraphLinksModel` | ノード + リンクのモデル（有向グラフ） |
| `TreeModel` | 階層的な親子モデル |

### グラフィックオブジェクト (`src/obj/`)
| クラス | 説明 |
|---|---|
| `GraphObject` | すべてのグラフィックオブジェクトの基底クラス |
| `Panel` | 子要素を整理するコンテナ |
| `Shape` | ベクター幾何学図形 |
| `TextBlock` | 書式付きテキストブロック |
| `Picture` | 画像（SVG/Canvas） |

### レイアウト (`src/layout/`)
| クラス | 説明 |
|---|---|
| `TreeLayout` | 階層ツリー（垂直/水平） |
| `ForceDirectedLayout` | 物理ベースの力シミュレーション |
| `CircularLayout` | 放射状配置 |
| `GridLayout` | 規則的グリッド |
| `LayeredDigraphLayout` | 階層有向グラフ（杉山） |

### ツール (`src/tools/`)
| クラス | 説明 |
|---|---|
| `ToolManager` | モード別ツールオーケストレーター |
| `DraggingTool` | ノード/選択のドラッグ |
| `ResizingTool` | ノードのリサイズ |
| `RotatingTool` | ノードの回転 |
| `LinkingTool` | リンクの作成 |
| `PanningTool` | ビューポートのパン |
| `ClickSelectingTool` | クリック選択 |
| `DragSelectingTool` | ボックス選択 |
| `TextEditingTool` | インプレーステキスト編集 |
| `ContextMenuTool` | コンテキストメニュー |

## プロジェクト構造

```
src/
├── core/       # ユーティリティ、トランザクション、バインディング、Undoマネージャー
├── geom/       # 幾何プリミティブ（Point, Size, Rect, Margin, Spot）
├── collect/    # コレクション（List, Set, Map, Iterator）
├── render/     # レンダリングエンジン（Brush, Geometry, SVG, Canvas）
├── obj/        # グラフィックオブジェクト階層（GraphObject, Panel, Shape）
├── nodes/      # ノードとリンク（Node, Link, Group, Adornment）
├── tools/      # インタラクションツール（ToolManager と14ツール）
├── layout/     # レイアウトアルゴリズム（5レイアウト + ネットワーク）
├── model/      # データモデル（GraphLinksModel, TreeModel）
├── ui/         # インターフェースコンポーネント（Diagram, Palette, Overview）
├── theme/      # テーマシステム
└── router/     # リンクルーティング
```

## ビルド

```bash
node build.js        # src/ から dist/idl.js (~1 MB) を再構築
node extract.js      # 元のバンドルからクラスを抽出
```

ビルドは `_prelude.js` + 依存順148クラス + `_postlude.js` を連結し、単一の自己実行ファイル（IIFE）を生成します。

---

## 貢献

1. リポジトリをフォーク
2. ブランチを作成: `git checkout -b feature/new-feature`
3. コミット: `git commit -m 'Add: new feature'`
4. プッシュしてPRを作成

---

<div align="center">

心を込めて制作 — **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — コロンビア

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — MITライセンス

</div>
