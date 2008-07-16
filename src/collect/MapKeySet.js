class MapKeySet extends GSet {
  Z;
  constructor(t) {
    super();
    GSet._i(this);
    this.p = true;
    this.Z = t;
  }
  [Symbol.iterator]() {
    return this.w.keys();
  }
  values() {
    return this.w.keys();
  }
  k() {
    return this;
  }
  di() {
    return this;
  }
  toString() {
    return "MapKeySet(" + this.Z.toString() + ")";
  }
  add(t) {
    U.n("This Set is read-only: " + this.toString());
  }
  has(t) {
    return this.Z.has(t);
  }
  contains(t) {
    return this.has(t);
  }
  delete(t) {
    U.n("This Set is read-only: " + this.toString());
  }
  remove(t) {
    return this.delete(t);
  }
  clear() {
    U.n("This Set is read-only: " + this.toString());
  }
  first() {
    return this.Z.w.size === 0 ? null : this.Z.w.keys().next().value;
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
    const i = new GSet();
    for (const e of this.Z.w) i.add(t(e[0]));
    return i;
  }
  filter(t) {
    const i = new GSet();
    for (const e of this.Z.w) {
      const s = e[0];
      if (t(s)) i.add(s);
    }
    return i;
  }
  copy() {
    return new MapKeySet(this.Z);
  }
  toSet() {
    const t = new GSet();
    for (const i of this.Z.w) t.add(i[0]);
    return t;
  }
  toArray() {
    const t = this.Z.w,
      i = new Array(t.size);
    let e = 0;
    for (const s of t) ((i[e] = s[0]), e++);
    return i;
  }
  toList() {
    const t = new List();
    for (const i of this.Z.w) t.add(i[0]);
    return t;
  }
  get count() {
    return this.Z.size;
  }
  get size() {
    return this.Z.size;
  }
  get iterator() {
    return this.Z.size <= 0 ? EmptyIterator.instance : new MapKeySetIterator(this.Z);
  }
}
