class CircularVertex extends LayoutVertex {
  Io;
  HS;
  constructor(t) {
    (super(t), (this.Io = NaN), (this.HS = NaN));
  }
  $h(t) {
    const i = this.network;
    if (i === null) return NaN;
    const e = i.layout;
    if (e === null) return NaN;
    if (e.arrangement === 3) {
      if (e.nodeDiameterFormula === 31) return ((this.Io = Math.max(this.width, this.height)), this.Io);
      {
        const s = Math.abs(Math.sin(t)),
          n = Math.abs(Math.cos(t));
        return s === 0
          ? this.width
          : n === 0
            ? this.height
            : ((this.Io = Math.min(this.height / s, this.width / n)), this.Io);
      }
    } else
      return e.nodeDiameterFormula === 31
        ? ((this.Io = Math.max(this.width, this.height)), this.Io)
        : ((this.Io = Math.sqrt(this.width * this.width + this.height * this.height)), this.Io);
  }
  get diameter() {
    return this.Io;
  }
  set diameter(t) {
    this.Io !== t && (U.i(t, "number", CircularVertex, "diameter"), (this.Io = t));
  }
  get actualAngle() {
    return this.HS;
  }
  set actualAngle(t) {
    this.HS !== t && (U.i(t, "number", CircularVertex, "actualAngle"), (this.HS = t));
  }
}
