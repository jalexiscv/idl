class GSet {
  p;
  w;
  constructor(t) {
    this.p = false;
    this.w = new Set();
    if (t !== void 0) this.addAll(t);
  }
  [Symbol.iterator]() {
    return this.w.values();
  }
  values() {
    return this.w.values();
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
    return "Set()#" + GSet.Ps(this);
  }
  add(t) {
    if (t === null) return this;
    this.w.add(t);
    return this;
  }
  addAll(t) {
    if (t === null) return this;
    if (this.p) U.D(this);
    if (t.first) {
      const i = t.iterator;
      for (; i.next(); ) this.w.add(i.value);
    } else {
      for (const i of t) this.w.add(i);
    }
    return this;
  }
  has(t) {
    return this.w.has(t);
  }
  contains(t) {
    return this.has(t);
  }
  containsAll(t) {
    if (t === null) return true;
    if (t.first) {
      const i = t.iterator;
      for (; i.next(); ) if (!this.has(i.value)) return false;
    } else {
      for (const i of t) if (!this.has(i)) return false;
    }
    return true;
  }
  containsAny(t) {
    if (t === null) return true;
    if (t.first) {
      const i = t.iterator;
      for (; i.next(); ) if (this.has(i.value)) return true;
    } else {
      for (const i of t) if (this.has(i)) return true;
    }
    return false;
  }
  first() {
    return this.w.size === 0 ? null : this.w.values().next().value;
  }
  any(t) {
    for (const i of this.w) if (t(i)) return true;
    return false;
  }
  all(t) {
    for (const i of this.w) if (!t(i)) return false;
    return true;
  }
  each(t) {
    for (const i of this.w) t(i);
    return this;
  }
  map(t) {
    const i = new GSet();
    for (const e of this.w) i.add(t(e));
    return i;
  }
  filter(t) {
    const i = new GSet();
    for (const e of this.w) if (t(e)) i.add(e);
    return i;
  }
  delete(t) {
    if (this.p) U.D(this);
    return this.w.delete(t);
  }
  remove(t) {
    return this.delete(t);
  }
  removeAll(t) {
    if (t === null) return this;
    if (this.p) U.D(this);
    if (t.first) {
      const i = t.iterator;
      for (; i.next(); ) this.delete(i.value);
    } else {
      for (const i of t) this.delete(i);
    }
    return this;
  }
  retainAll(t) {
    if (t === null) return this;
    if (this.count === 0) return this;
    if (this.p) U.D(this);
    const i = new GSet();
    i.addAll(t);
    const e = [];
    if (t.first) {
      const s = t.iterator;
      for (; s.next(); ) {
        const n = s.value;
        if (!i.has(n)) e.push(n);
      }
    } else {
      for (const s of t) if (!i.has(s)) e.push(s);
    }
    this.removeAll(e);
    return this;
  }
  clear() {
    if (this.p) U.D(this);
    this.w.clear();
  }
  copy() {
    const t = new GSet();
    this.w.forEach((i) => t.add(i));
    return t;
  }
  toArray() {
    return Array.from(this.w);
  }
  toList() {
    const t = new List();
    this.w.forEach((i) => t.add(i));
    return t;
  }
  get count() {
    return this.w.size;
  }
  get size() {
    return this.w.size;
  }
  get iterator() {
    return this.w.size <= 0 ? EmptyIterator.instance : new SetIterator(this);
  }
  entries() {
    return this.w.entries();
  }
  keys() {
    return this.w.keys();
  }
  forEach(t, i) {
    return this.w.forEach(t, i);
  }
  static Jw = 1;
  static _i(t) {
    t.__idlhashid = GSet.Jw++;
  }
  static Ps(t) {
    return t.__idlhashid;
  }
}
