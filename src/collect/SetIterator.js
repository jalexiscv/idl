class SetIterator {
  Oo;
  hi;
  constructor(t) {
    this.Oo = t;
    this.hi = t.w.values();
  }
  [Symbol.iterator]() {
    return this.Oo.w.values();
  }
  key;
  value;
  get iterator() {
    return this;
  }
  reset() {
    this.hi = this.Oo.w.values();
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
    if (this.Oo.w.size === 0) return null;
    this.hi = this.Oo.w.values();
    return this.hi.next().value;
  }
  any(t) {
    return this.Oo.any(t);
  }
  all(t) {
    return this.Oo.all(t);
  }
  each(t) {
    this.Oo.each(t);
    return this;
  }
  map(t) {
    const i = new List();
    this.Oo.w.forEach((e) => i.add(t(e)));
    return i.iterator;
  }
  filter(t) {
    const i = new List();
    this.Oo.w.forEach((e) => {
      if (t(e)) i.add(e);
    });
    return i.iterator;
  }
  get count() {
    return this.Oo.count;
  }
  Dl() {
    this.key = null;
    this.value = null;
    this.hi = null;
  }
  toString() {
    return "SetIterator";
  }
}
