class LayeredDigraphNetwork extends LayoutNetwork {
  constructor(t) {
    super(t);
  }
  createVertex() {
    const t = new LayeredDigraphVertex(this);
    return ((t.centered = this.layout.centered), t);
  }
  createEdge() {
    return new LayeredDigraphEdge(this);
  }
}
