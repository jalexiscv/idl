class SGradient {
  type;
  x1;
  y1;
  r1;
  x2;
  y2;
  r2;
  colors;
  pattern;
  constructor(t) {
    ((this.type = t),
      (this.x1 = 0),
      (this.y1 = 0),
      (this.r1 = 0),
      (this.x2 = 0),
      (this.y2 = 0),
      (this.r2 = 0),
      (this.colors = []),
      (this.pattern = null));
  }
  addColorStop(t, i) {
    this.colors.push({ offset: t, color: i });
  }
}
