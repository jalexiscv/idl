class CircularNetwork extends LayoutNetwork {
  constructor(t) {
    super(t);
  }
  createVertex() {
    return new CircularVertex(this);
  }
  createEdge() {
    return new CircularEdge(this);
  }
}
