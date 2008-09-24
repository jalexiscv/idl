class VertexArrangement {
  lu;
  xf;
  hu;
  constructor() {
    ((this.lu = -1 / 0), (this.xf = null), (this.hu = null));
  }
  S4(t, i) {
    if ((t > 0 && this.lu < 0) || (Math.abs(t) < Math.abs(this.lu) && !(t < 0 && this.lu > 0))) {
      ((this.lu = t), (this.xf = []), (this.hu = []));
      for (let e = 0; e < i.length; e++) ((this.xf[e] = i[e].bounds.x), (this.hu[e] = i[e].bounds.y));
    }
  }
  k4(t, i) {
    if (Math.abs(t) < Math.abs(this.lu)) {
      ((this.lu = t), (this.xf = []), (this.hu = []));
      for (let e = 0; e < i.length; e++) ((this.xf[e] = i[e].bounds.x), (this.hu[e] = i[e].bounds.y));
    }
  }
  commit(t) {
    if (!(this.xf === null || this.hu === null))
      for (let i = 0; i < this.xf.length; i++) {
        const e = t.elt(i);
        ((e.x = this.xf[i]), (e.y = this.hu[i]));
      }
  }
}
