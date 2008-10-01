class ForceDirectedNetwork extends LayoutNetwork {
  constructor(t) {
    super(t);
  }
  createVertex() {
    return new ForceDirectedVertex(this);
  }
  createEdge() {
    return new ForceDirectedEdge(this);
  }
}
