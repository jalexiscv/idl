# Interactive Diagrams Library (IDL)

> [Español](../../README.md) | [English](README.en.md) | [中文](README.zh.md) | **हिन्दी** | [العربية](README.ar.md) | [Português](README.pt.md) | [Русский](README.ru.md) | [日本語](README.ja.md) | [Français](README.fr.md) | [Deutsch](README.de.md)

इंटरैक्टिव आरेखों के लिए नेटिव JavaScript लाइब्रेरी, **SVG + Canvas** दोहरी रेंडरिंग के साथ। कोई बाहरी निर्भरता नहीं।

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](package.json)
[![Size](https://img.shields.io/badge/size-~1MB%20min-grey.svg)](dist/idl.js)

## विशेषताएँ

- **SVG** और **Canvas** दोहरी रेंडरिंग, व्यूपोर्ट के अनुसार स्वचालित स्विचिंग
- **148 क्लासेस**, 11 पैकेजों में मॉड्यूलर रूप से व्यवस्थित
- ग्राफिक्स ऑब्जेक्ट पदानुक्रम: पैनल, आकार, टेक्स्ट, इमेज, अलंकरण
- द्विदिशात्मक **डेटा बाइंडिंग** सिस्टम मॉडल ↔ व्यू
- **ट्रांजेक्शन्स** अंतर्निहित undo/redo के साथ (`UndoManager` के माध्यम से)
- 5 लेआउट एल्गोरिदम: ट्री, फोर्स-डायरेक्टेड, सर्कुलर, ग्रिड, लेयर्ड डिग्राफ
- 14 इंटरैक्शन टूल्स: ड्रैग, रिसाइज, रोटेट, लिंक, पैन, टेक्स्ट एडिटिंग आदि
- कोलैप्सेबल **ग्रुप्स** और नेस्टेड सबग्राफ का समर्थन
- स्वचालित लिंक रूटिंग (कई रणनीतियाँ)
- `TextFormat` के साथ रिच टेक्स्ट फॉर्मेटिंग
- अनुकूलन योग्य **थीम** सिस्टम
- UI कंपोनेंट्स: `Diagram`, `Palette`, `Overview`

## इंस्टॉलेशन

```bash
npm install ./vendor/gojs
```

```javascript
// Node.js / बंडलर्स
const idl = require("idl");

// ब्राउज़र — dist/idl.js को अपने प्रोजेक्ट में कॉपी करें
<script src="idl.js"></script>
<script>
  const diagram = new idl.Diagram("myDiagramDiv");
</script>
```

## त्वरित शुरुआत

```javascript
const idl = require("idl");

// 1. आरेख बनाएं
const diagram = new idl.Diagram("myDiagramDiv");

// 2. नोड्स और लिंक्स के साथ मॉडल परिभाषित करें
diagram.model = new idl.GraphLinksModel({
  nodeDataArray: [
    { key: 1, text: "शुरुआत" },
    { key: 2, text: "प्रक्रिया" },
    { key: 3, text: "अंत" },
  ],
  linkDataArray: [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
  ],
});
```

### कस्टम नोड टेम्पलेट्स

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

### लेआउट लागू करें

```javascript
// ट्री लेआउट (ऊपर से नीचे)
diagram.layout = new idl.TreeLayout({
  angle: 90,
  layerSpacing: 40,
  nodeSpacing: 20,
});

// फोर्स-डायरेक्टेड लेआउट
diagram.layout = new idl.ForceDirectedLayout({
  maxIterations: 200,
  defaultSpringStiffness: 0.02,
});

// सर्कुलर लेआउट
diagram.layout = new idl.CircularLayout({
  radius: 150,
  nodeDiameterFormula: idl.CircularLayout.Circular,
});
```

### इवेंट हैंडलिंग

```javascript
diagram.addDiagramListener("changed", (e) => {
  console.log("आरेख संशोधित", e);
});

diagram.addDiagramListener("backgroundSingleClicked", (e) => {
  diagram.clearSelection();
});
```

### Undo/Redo के साथ ट्रांजेक्शन्स

```javascript
diagram.commit((d) => {
  d.model.addNodeData({ key: 4, text: "नया नोड" });
  d.model.addLinkData({ from: 1, to: 4 });
}, "नोड जोड़ें");

diagram.undo(); // पूर्ववत करें
diagram.redo(); // पुनः करें
```

## API — मुख्य क्लासेस

### UI कंपोनेंट्स (`src/ui/`)
| क्लास | विवरण |
|---|---|
| `Diagram` | मुख्य कैनवास जहाँ ग्राफ रेंडर होता है |
| `Palette` | ड्रैगेबल नोड्स वाला टूल पैनल |
| `Overview` | पूरे आरेख का मिनीमैप |

### मॉडल्स (`src/model/`)
| क्लास | विवरण |
|---|---|
| `GraphLinksModel` | नोड्स + लिंक्स वाला मॉडल (डायरेक्टेड ग्राफ) |
| `TreeModel` | पैरेंट-चाइल्ड पदानुक्रमित मॉडल |

### ग्राफिक्स ऑब्जेक्ट्स (`src/obj/`)
| क्लास | विवरण |
|---|---|
| `GraphObject` | सभी ग्राफिक्स ऑब्जेक्ट्स की बेस क्लास |
| `Panel` | कंटेनर जो अपने चिल्ड्रन को व्यवस्थित करता है |
| `Shape` | वेक्टर ज्यामितीय आकार |
| `TextBlock` | फॉर्मेटेड टेक्स्ट ब्लॉक |
| `Picture` | इमेज (SVG/Canvas) |

### लेआउट्स (`src/layout/`)
| क्लास | विवरण |
|---|---|
| `TreeLayout` | पदानुक्रमित ट्री (वर्टिकल/हॉरिजॉन्टल) |
| `ForceDirectedLayout` | भौतिकी-आधारित बल सिमुलेशन |
| `CircularLayout` | रेडियल व्यवस्था |
| `GridLayout` | नियमित ग्रिड |
| `LayeredDigraphLayout` | स्तरित डायरेक्टेड ग्राफ (सुगियामा) |

### टूल्स (`src/tools/`)
| क्लास | विवरण |
|---|---|
| `ToolManager` | मोड के अनुसार टूल ऑर्केस्ट्रेटर |
| `DraggingTool` | नोड/चयन ड्रैग करना |
| `ResizingTool` | नोड का आकार बदलना |
| `RotatingTool` | नोड घुमाना |
| `LinkingTool` | लिंक बनाना |
| `PanningTool` | व्यूपोर्ट पैन करना |
| `ClickSelectingTool` | क्लिक चयन |
| `DragSelectingTool` | बॉक्स चयन |
| `TextEditingTool` | इन-प्लेस टेक्स्ट एडिटिंग |
| `ContextMenuTool` | कॉन्टेक्स्ट मेनू |

## प्रोजेक्ट संरचना

```
src/
├── core/       # यूटिलिटीज, ट्रांजेक्शन्स, बाइंडिंग्स, अंडू मैनेजर
├── geom/       # ज्यामितीय प्रिमिटिव्स (Point, Size, Rect, Margin, Spot)
├── collect/    # कलेक्शन्स (List, Set, Map, Iterator)
├── render/     # रेंडरिंग इंजन (Brush, Geometry, SVG, Canvas)
├── obj/        # ग्राफिक्स ऑब्जेक्ट पदानुक्रम (GraphObject, Panel, Shape)
├── nodes/      # नोड्स और लिंक्स (Node, Link, Group, Adornment)
├── tools/      # इंटरैक्शन टूल्स (ToolManager और 14 टूल्स)
├── layout/     # लेआउट एल्गोरिदम (5 लेआउट + नेटवर्क)
├── model/      # डेटा मॉडल्स (GraphLinksModel, TreeModel)
├── ui/         # इंटरफेस कंपोनेंट्स (Diagram, Palette, Overview)
├── theme/      # थीम सिस्टम
└── router/     # लिंक रूटिंग
```

## बिल्ड

```bash
node build.js        # src/ से dist/idl.js (~1 MB) पुनर्निर्माण
node extract.js      # मूल बंडल से क्लासेस निकालें
```

बिल्ड `_prelude.js` + 148 क्लासेस (निर्भरता क्रम में) + `_postlude.js` को एक स्व-निष्पादित फ़ाइल (IIFE) में जोड़ता है।

---

## योगदान करें

1. रिपॉजिटरी फोर्क करें
2. ब्रांच बनाएं: `git checkout -b feature/nayi-suvidha`
3. कमिट करें: `git commit -m 'Add: nayi suvidha'`
4. पुश करें और PR बनाएं

---

<div align="center">

देखभाल से बनाया गया — **[Jose Alexis Correa Valencia](https://github.com/jalexiscv)** — कोलंबिया

[![GitHub](https://img.shields.io/badge/GitHub-jalexiscv-181717?style=flat-square&logo=github)](https://github.com/jalexiscv)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-jalexiscv-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/jalexiscv/)
[![Email](https://img.shields.io/badge/Email-jalexiscv%40gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:jalexiscv@gmail.com)

Interactive Diagrams Library (IDL) Free Edition — Copyright &copy; 2023 Jose Alexis Correa Valencia — MIT लाइसेंस

</div>
