class GMap {
  p;
  w;
  constructor(t) {
    GSet._i(this);
    this.p = false;
    this.w = new Map();
    if (t !== void 0) this.addAll(t);
  }
  [Symbol.iterator]() {
    return this.w.entries();
  }
  entries() {
    return this.w.entries();
  }
  k() {
    this.p = true;
    return this;
  }
  di() {
    this.p = false;
    return this;
  }
  toString() {
    return "Map()#" + GSet.Ps(this);
  }
  set(t, i) {
    if (this.p) U.D(this, t);
    this.w.set(t, i);
    return this;
  }
  add(t, i) {
    return this.set(t, i);
  }
  addAll(t) {
    if (t === null) return this;
    if (this.p) U.D(this);
    if (t instanceof GMap) {
      const i = t.iterator;
      for (; i.next(); ) this.w.set(i.key, i.value);
    } else if (t.first) {
      const i = t.iterator;
      for (; i.next(); ) {
        const e = i.value;
        this.w.set(e.key, e.value);
      }
    } else {
      for (const i of t) {
        Array.isArray(i) ? this.w.set(i[0], i[1]) : this.w.set(i.key, i.value);
      }
    }
    return this;
  }
  first() {
    if (this.w.size === 0) return null;
    const t = this.w.entries().next().value;
    return t ? new KeyValuePair(t[0], t[1]) : null;
  }
  any(t) {
    let i = null;
    for (const [e, s] of this.w) {
      if (i === null) i = new KeyValuePair(e, s);
      else ((i.key = e), (i.value = s));
      if (t(i)) return true;
    }
    return false;
  }
  all(t) {
    let i = null;
    for (const [e, s] of this.w) {
      if (i === null) i = new KeyValuePair(e, s);
      else ((i.key = e), (i.value = s));
      if (!t(i)) return false;
    }
    return true;
  }
  each(t) {
    let i = null;
    for (const [e, s] of this.w) {
      if (i === null) i = new KeyValuePair(e, s);
      else ((i.key = e), (i.value = s));
      t(i);
    }
    return this;
  }
  map(t) {
    const i = new GMap();
    let e = null;
    for (const [s, n] of this.w) {
      if (e === null) e = new KeyValuePair(s, n);
      else ((e.key = s), (e.value = n));
      i.set(s, t(e));
    }
    return i;
  }
  filter(t) {
    const i = new GMap();
    let e = null;
    for (const [s, n] of this.w) {
      if (e === null) e = new KeyValuePair(s, n);
      else ((e.key = s), (e.value = n));
      if (t(e)) i.set(s, n);
    }
    return i;
  }
  has(t) {
    return this.w.has(t);
  }
  contains(t) {
    return this.has(t);
  }
  get(t) {
    const i = this.w.get(t);
    return i === void 0 ? null : i;
  }
  getValue(t) {
    return this.get(t);
  }
  delete(t) {
    if (t === null) return false;
    if (this.p) U.D(this, t);
    return this.w.delete(t);
  }
  remove(t) {
    return this.delete(t);
  }
  clear() {
    if (this.p) U.D(this);
    this.w.clear();
  }
  copy() {
    const t = new GMap();
    t.w = new Map(this.w);
    return t;
  }
  toArray() {
    const t = this.w,
      i = new Array(t.size);
    let e = 0;
    for (const s of t) ((i[e] = new KeyValuePair(s[0], s[1])), e++);
    return i;
  }
  toKeySet() {
    return new MapKeySet(this);
  }
  get count() {
    return this.w.size;
  }
  get size() {
    return this.w.size;
  }
  get iterator() {
    return this.w.size <= 0 ? EmptyIterator.instance : new MapIterator(this);
  }
  get iteratorKeys() {
    return this.count <= 0 ? EmptyIterator.instance : new MapKeySetIterator(this);
  }
  keys() {
    return this.w.keys();
  }
  get iteratorValues() {
    return this.count <= 0 ? EmptyIterator.instance : new MapValueSetIterator(this);
  }
  values() {
    return this.w.values();
  }
  forEach(t, i) {
    return this.w.forEach(t, i);
  }
}
