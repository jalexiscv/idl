class PanelLayout {
  At = "Base";
  static ms = new GMap();
  static En(t, i) {
    ((i.name = t), PanelLayout.ms.set(t, i));
  }
  get name() {
    return this.At;
  }
  set name(t) {
    this.At = t;
  }
  constructor() {}
  get classType() {
    return Panel;
  }
  measure(t, i, e, s, n, o, r) {}
  measureElement(t, i, e, s, n) {
    t.gt(i, e, s, n);
  }
  arrange(t, i, e) {}
  arrangeElement(t, i, e, s, n, o) {
    t.Ut(i, e, s, n, o);
  }
  remeasureObject(t) {
    t.Cc();
  }
  vi(t, i, e) {}
}
