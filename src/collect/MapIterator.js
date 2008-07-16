class MapIterator {
  Z;
  hi;
  constructor(t) {
    this.Z = t;
    this.hi = t.w.entries();
  }
  [Symbol.iterator]() {
    return this.Z.w.entries();
  }
  key;
  value;
  get iterator() {
    return this;
  }
  reset() {
    this.hi = this.Z.w.entries();
  }
  next() {
    const t = this.hi.next();
    if (t.done) {
      this.key = null;
      this.value = null;
      return false;
    }
    this.key = t.value[0];
    this.value = t.value[1];
    return true;
  }
  hasNext() {
    return this.next();
  }
  first() {
    if (this.Z.w.size === 0) return null;
    this.hi = this.Z.w.entries();
    const t = this.hi.next().value;
    this.key = t[0];
    this.value = t[1];
    return new KeyValuePair(t[0], t[1]);
  }
  any(t) {
    return this.Z.any(t);
  }
  all(t) {
    return this.Z.all(t);
  }
  each(t) {
    this.Z.each(t);
    return this;
  }
  map(t) {
    const i = new List();
    let e = null;
    this.Z.w.forEach((s, n) => {
      if (e === null) e = new KeyValuePair(n, s);
      else ((e.key = n), (e.value = s));
      i.add(t(e));
    });
    return i.iterator;
  }
  filter(t) {
    const i = new List();
    let e = null;
    this.Z.w.forEach((s, n) => {
      if (e === null) e = new KeyValuePair(n, s);
      else ((e.key = n), (e.value = s));
      if (t(e)) {
        i.add(e);
        e = null;
      }
    });
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
    return "MapIterator";
  }
}
