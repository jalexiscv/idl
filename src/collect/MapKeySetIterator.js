class MapKeySetIterator {
  Z;
  hi;
  constructor(t) {
    this.Z = t;
    this.hi = t.w.keys();
  }
  [Symbol.iterator]() {
    return this.Z.w.keys();
  }
  key;
  value;
  get iterator() {
    return this;
  }
  reset() {
    this.hi = this.Z.w.keys();
  }
  next() {
    const t = this.hi.next();
    this.value = t.value;
    this.key = t.value;
    return !t.done;
  }
  hasNext() {
    return this.next();
  }
  first() {
    if (this.Z.w.size === 0) return null;
    this.hi = this.Z.w.keys();
    return this.hi.next().value;
  }
  any(t) {
    for (const i of this.Z.w) if (t(i[0])) return true;
    return false;
  }
  all(t) {
    for (const i of this.Z.w) if (!t(i[0])) return false;
    return true;
  }
  each(t) {
    for (const i of this.Z.w) t(i[0]);
    return this;
  }
  map(t) {
    const i = new List();
    for (const e of this.Z.w) i.add(t(e[0]));
    return i.iterator;
  }
  filter(t) {
    const i = new List();
    for (const e of this.Z.w) {
      const s = e[0];
      if (t(s)) i.add(s);
    }
    return i.iterator;
  }
  get count() {
    return this.Z.size;
  }
  Dl() {
    this.key = null;
    this.value = null;
    this.hi = null;
  }
  toString() {
    return "MapKeySetIterator";
  }
}
