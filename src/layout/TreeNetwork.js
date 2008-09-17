class TreeNetwork extends LayoutNetwork {
  constructor(t) {
    super(t);
  }
  createVertex() {
    return new TreeVertex(this);
  }
  createEdge() {
    return new TreeEdge(this);
  }
}
