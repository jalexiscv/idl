# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | [हिन्दी](README.hi.md) | **العربية** | [Português](README.pt.md) | [Русский](README.ru.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

مكتبة JavaScript أصلية للرسوم البيانية التفاعلية مع عرض مزدوج **SVG + Canvas**. بدون تبعيات خارجية.

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## المميزات

- عرض مزدوج **SVG** و **Canvas** مع تبديل تلقائي حسب إطار العرض
- **148 فئة** منظمة بشكل معياري في 11 حزمة
- تسلسل هرمي للكائنات الرسومية: لوحات، أشكال، نصوص، صور، زخارف
- نظام **ربط بيانات** ثنائي الاتجاه نموذج ↔ عرض
- **معاملات** مع تراجع/إعادة مدمجين عبر `UndoManager`
- 5 خوارزميات تخطيط: شجري، موجه بالقوى، دائري، شبكي، طبقات بيانية موجهة
- 14 أداة تفاعل: سحب، تغيير حجم، تدوير، ربط، تحريك، تحرير نصوص، إلخ
- دعم **المجموعات** القابلة للطي والرسوم البيانية الفرعية المتداخلة
- توجيه تلقائي للروابط مع استراتيجيات متعددة
- تنسيق نص منسق مع `TextFormat`
- نظام **سمات** قابل للتخصيص
- مكونات واجهة المستخدم: `Diagram`، `Palette`، `Overview`

## التثبيت

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / المجمعات
const idl = require("idl");

// المتصفح — انسخ dist/idl.js إلى مشروعك
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## بداية سريعة

```javascript
const idl = require("idl");

// 1. إنشاء الرسم البياني
const diagram = new idl.Diagram("myDiagramDiv");

// 2. تعريف النموذج بالعقد والروابط
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "بداية" },
    { key: 2, text: "معالجة" },
    { key: 3, text: "نهاية" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### قوالب العقد المخصصة

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

### تطبيق تخطيط

```javascript
// تخطيط شجري (من الأعلى للأسفل)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// تخطيط موجه بالقوى
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// تخطيط دائري
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### معالجة الأحداث

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("تم تعديل الرسم البياني", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### المعاملات مع التراجع/الإعادة

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "عقدة جديدة" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "إضافة عقدة");

diagram.undo(); // تراجع
diagram.redo(); // إعادة
```

## API — الفئات الرئيسية

### مكونات واجهة المستخدم (`src/ui/`)
| الفئة | الوصف |
|---|---|
| `Diagram` | اللوحة الرئيسية حيث يتم عرض الرسم البياني |
| `Palette` | لوحة أدوات مع عقد قابلة للسحب |
| `Overview` | خريطة مصغرة للرسم البياني الكامل |

### النماذج (`src/model/`)
| الفئة | الوصف |
|---|---|
| `GraphLinksModel` | نموذج بالعقد + الروابط (رسم بياني موجه) |
| `TreeModel` | نموذج هرمي أب-ابن |

### الكائنات الرسومية (`src/obj/`)
| الفئة | الوصف |
|---|---|
| `GraphObject` | الفئة الأساسية لجميع الكائنات الرسومية |
| `Panel` | حاوية تنظم عناصرها الفرعية |
| `Shape` | أشكال هندسية متجهة |
| `TextBlock` | كتلة نص منسق |
| `Picture` | صورة (SVG/Canvas) |

### التخطيطات (`src/layout/`)
| الفئة | الوصف |
|---|---|
| `TreeLayout` | شجرة هرمية (عمودي/أفقي) |
| `ForceDirectedLayout` | محاكاة فيزيائية بالقوى |
| `CircularLayout` | ترتيب شعاعي |
| `GridLayout` | شبكة منتظمة |
| `LayeredDigraphLayout` | رسوم بيانية موجهة طبقية (سوجياما) |

### الأدوات (`src/tools/`)
| الفئة | الوصف |
|---|---|
| `ToolManager` | منسق الأدوات حسب النمط |
| `DraggingTool` | سحب العقد/التحديد |
| `ResizingTool` | تغيير حجم العقد |
| `RotatingTool` | تدوير العقد |
| `LinkingTool` | إنشاء الروابط |
| `PanningTool` | تحريك إطار العرض |
| `ClickSelectingTool` | تحديد بالنقر |
| `DragSelectingTool` | تحديد بالإطار |
| `TextEditingTool` | تحرير النص في مكانه |
| `ContextMenuTool` | قائمة السياق |

## هيكل المشروع

```
src/
├── core/       # الأدوات المساعدة، المعاملات، الروابط، مدير التراجع
├── geom/       # الأوليات الهندسية (Point, Size, Rect, Margin, Spot)
├── collect/    # المجموعات (List, Set, Map, Iterator)
├── render/     # محرك العرض (Brush, Geometry, SVG, Canvas)
├── obj/        # تسلسل الكائنات الرسومية (GraphObject, Panel, Shape)
├── nodes/      # العقد والروابط (Node, Link, Group, Adornment)
├── tools/      # أدوات التفاعل (ToolManager و 14 أداة)
├── layout/     # خوارزميات التخطيط (5 تخطيطات + شبكات)
├── model/      # نماذج البيانات (GraphLinksModel, TreeModel)
├── ui/         # مكونات الواجهة (Diagram, Palette, Overview)
├── theme/      # نظام السمات
└── router/     # توجيه الروابط
```

## البناء

```bash
node build.js        # يعيد بناء dist/idl.js (~1 MB) من src/
node extract.js      # يستخرج الفئات من الحزمة الأصلية
```

يقوم البناء بدمج `_prelude.js` + 148 فئة بترتيب التبعية + `_postlude.js` في ملف واحد ذاتي التنفيذ (IIFE).

---

## المساهمة

1. قم بعمل fork للمستودع
2. أنشئ فرعاً: `git checkout -b feature/miza-jadida`
3. قم بعمل commit: `git commit -m 'Add: miza jadida'`
4. ادفع وأنشئ PR

---

<div align="center">

صُنع بعناية بواسطة **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — كولومبيا

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — رخصة MIT

</div>
