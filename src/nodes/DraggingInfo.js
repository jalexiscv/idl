class DraggingInfo {
  W2;
  j2;
  constructor(t) {
    this.W2 = t === void 0 ? new Point() : t;
    this.j2 = new Point();
  }
  get point() {
    return this.W2;
  }
  set point(t) {
    this.W2 = t;
  }
  get shifted() {
    return this.j2;
  }
  set shifted(t) {
    this.j2 = t;
  }
}
