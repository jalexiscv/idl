# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | [हिन्दी](README.hi.md) | [العربية](README.ar.md) | [Português](README.pt.md) | **Русский** | [日本語](README.ja.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

Нативная JavaScript-библиотека для интерактивных диаграмм с двойным рендерингом **SVG + Canvas**. Без внешних зависимостей.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## Возможности

- Двойной рендеринг **SVG** и **Canvas** с автоматическим переключением по viewport
- **148 классов**, модульно организованных в 11 пакетах
- Иерархия графических объектов: панели, формы, текст, изображения, украшения
- Двунаправленная система **привязки данных** модель ↔ представление
- **Транзакции** со встроенным undo/redo через `UndoManager`
- 5 алгоритмов компоновки: дерево, силовой, круговой, сетка, слоистый орграф
- 14 инструментов взаимодействия: перетаскивание, масштабирование, поворот, связывание, панорамирование, редактирование текста и др.
- Поддержка сворачиваемых **групп** и вложенных подграфов
- Автоматическая маршрутизация связей с несколькими стратегиями
- Форматирование rich text через `TextFormat`
- Настраиваемая система **тем**
- Компоненты UI: `Diagram`, `Palette`, `Overview`

## Установка

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / сборщики
const idl = require("idl");

// Браузер — скопируйте dist/idl.js в свой проект
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## Быстрый старт

```javascript
const idl = require("idl");

// 1. Создать диаграмму
const diagram = new idl.Diagram("myDiagramDiv");

// 2. Определить модель с узлами и связями
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "Начало" },
    { key: 2, text: "Процесс" },
    { key: 3, text: "Конец" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### Пользовательские шаблоны узлов

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

### Применение компоновки

```javascript
// Древовидная компоновка (сверху вниз)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// Силовая компоновка
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// Круговая компоновка
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### Обработка событий

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("Диаграмма изменена", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Транзакции с Undo/Redo

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "Новый узел" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "Добавить узел");

diagram.undo(); // отменить
diagram.redo(); // повторить
```

## API — Основные классы

### Компоненты UI (`src/ui/`)
| Класс | Описание |
|---|---|
| `Diagram` | Основной холст для рендеринга графа |
| `Palette` | Панель инструментов с перетаскиваемыми узлами |
| `Overview` | Мини-карта всей диаграммы |

### Модели (`src/model/`)
| Класс | Описание |
|---|---|
| `GraphLinksModel` | Модель с узлами + связями (ориентированный граф) |
| `TreeModel` | Иерархическая модель родитель-потомок |

### Графические объекты (`src/obj/`)
| Класс | Описание |
|---|---|
| `GraphObject` | Базовый класс всех графических объектов |
| `Panel` | Контейнер, организующий дочерние элементы |
| `Shape` | Векторные геометрические формы |
| `TextBlock` | Форматированный текстовый блок |
| `Picture` | Изображение (SVG/Canvas) |

### Компоновки (`src/layout/`)
| Класс | Описание |
|---|---|
| `TreeLayout` | Иерархическое дерево (вертикальное/горизонтальное) |
| `ForceDirectedLayout` | Физическая симуляция на основе сил |
| `CircularLayout` | Радиальное расположение |
| `GridLayout` | Регулярная сетка |
| `LayeredDigraphLayout` | Слоистые ориентированные графы (Сугияма) |

### Инструменты (`src/tools/`)
| Класс | Описание |
|---|---|
| `ToolManager` | Оркестратор инструментов по режимам |
| `DraggingTool` | Перетаскивание узлов/выделения |
| `ResizingTool` | Изменение размера узлов |
| `RotatingTool` | Поворот узлов |
| `LinkingTool` | Создание связей |
| `PanningTool` | Панорамирование viewport |
| `ClickSelectingTool` | Выделение кликом |
| `DragSelectingTool` | Выделение рамкой |
| `TextEditingTool` | Редактирование текста на месте |
| `ContextMenuTool` | Контекстное меню |

## Структура проекта

```
src/
├── core/       # Утилиты, транзакции, привязки, undo-менеджер
├── geom/       # Геометрические примитивы (Point, Size, Rect, Margin, Spot)
├── collect/    # Коллекции (List, Set, Map, Iterator)
├── render/     # Движок рендеринга (Brush, Geometry, SVG, Canvas)
├── obj/        # Иерархия графических объектов (GraphObject, Panel, Shape)
├── nodes/      # Узлы и связи (Node, Link, Group, Adornment)
├── tools/      # Инструменты взаимодействия (ToolManager и 14 инструментов)
├── layout/     # Алгоритмы компоновки (5 компоновок + сети)
├── model/      # Модели данных (GraphLinksModel, TreeModel)
├── ui/         # Компоненты интерфейса (Diagram, Palette, Overview)
├── theme/      # Система тем
└── router/     # Маршрутизация связей
```

## Сборка

```bash
node build.js        # Пересобирает dist/idl.js (~1 МБ) из src/
node extract.js      # Извлекает классы из исходного бандла
```

Сборка объединяет `_prelude.js` + 148 классов в порядке зависимостей + `_postlude.js` в один самоисполняемый файл (IIFE).

---

## Участие в разработке

1. Сделайте fork репозитория
2. Создайте ветку: `git checkout -b feature/novaya-funktsiya`
3. Сделайте commit: `git commit -m 'Add: novaya funktsiya'`
4. Отправьте и создайте PR

---

<div align="center">

Создано с заботой — **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — Колумбия

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — Лицензия MIT

</div>
