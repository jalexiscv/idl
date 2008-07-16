class ListIterator {
  Zt;
  Hs;
  Wt;
  Et;
  constructor(t) {
    this.Zt = t;
    this.Hs = null;
    t.xr = null;
    this.Wt = t.ct;
    this.Et = -1;
  }
  [Symbol.iterator]() {
    return this.Hs === null ? this.Zt.h.values() : this.Zt.h.filter(this.Hs).values();
  }
  key;
  value;
  get iterator() {
    return this;
  }
  get predicate() {
    return this.Hs;
  }
  set predicate(t) {
    this.Hs = t;
  }
  reset() {
    const t = this.Zt;
    t.xr = null;
    this.Wt = t.ct;
    this.Et = -1;
  }
  next() {
    const t = this.Zt;
    if (t.ct !== this.Wt) {
      if (this.key < 0) return false;
      U.We(t);
    }
    const i = t.h,
      e = i.length;
    let s = ++this.Et;
    const n = this.Hs;
    if (n !== null) {
      for (; s < e; ) {
        const o = i[s];
        if (n(o)) {
          this.Et = s;
          this.key = s;
          this.value = o;
          return true;
        }
        s++;
      }
    } else {
      if (s < e) {
        this.key = s;
        this.value = i[s];
        return true;
      }
      this.Dl();
    }
    return false;
  }
  hasNext() {
    return this.next();
  }
  first() {
    const t = this.Zt;
    this.Wt = t.ct;
    this.Et = 0;
    const i = t.h,
      e = i.length,
      s = this.Hs;
    if (s !== null) {
      let n = 0;
      for (; n < e; ) {
        const o = i[n];
        if (s(o)) {
          this.Et = n;
          this.key = n;
          this.value = o;
          return o;
        }
        n++;
      }
      return null;
    } else if (e > 0) {
      const n = i[0];
      this.key = 0;
      this.value = n;
      return n;
    } else return null;
  }
  any(t) {
    const i = this.Zt;
    i.xr = null;
    const e = i.ct;
    this.Et = -1;
    const s = i.h,
      n = s.length,
      o = this.Hs;
    for (let r = 0; r < n; r++) {
      const l = s[r];
      if (!(o !== null && !o(l))) {
        if (t(l)) return true;
        if (i.ct !== e) U.We(i);
      }
    }
    return false;
  }
  all(t) {
    const i = this.Zt;
    i.xr = null;
    const e = i.ct;
    this.Et = -1;
    const s = i.h,
      n = s.length,
      o = this.Hs;
    for (let r = 0; r < n; r++) {
      const l = s[r];
      if (!(o !== null && !o(l))) {
        if (!t(l)) return false;
        if (i.ct !== e) U.We(i);
      }
    }
    return true;
  }
  each(t) {
    const i = this.Zt;
    i.xr = null;
    const e = i.ct;
    this.Et = -1;
    const s = i.h,
      n = s.length,
      o = this.Hs;
    for (let r = 0; r < n; r++) {
      const l = s[r];
      if (!(o !== null && !o(l))) {
        t(l);
        if (i.ct !== e) U.We(i);
      }
    }
    return this;
  }
  map(t) {
    const i = this.Zt;
    i.xr = null;
    const e = i.ct;
    this.Et = -1;
    const s = [],
      n = i.h,
      o = n.length,
      r = this.Hs;
    for (let h = 0; h < o; h++) {
      const a = n[h];
      if (!(r !== null && !r(a))) {
        s.push(t(a));
        if (i.ct !== e) U.We(i);
      }
    }
    const l = new List();
    l.h = s;
    l._bumpVersion();
    return l.iterator;
  }
  filter(t) {
    const i = this.Zt;
    i.xr = null;
    const e = i.ct;
    this.Et = -1;
    const s = [],
      n = i.h,
      o = n.length,
      r = this.Hs;
    for (let h = 0; h < o; h++) {
      const a = n[h];
      if (!(r !== null && !r(a))) {
        if (t(a)) s.push(a);
        if (i.ct !== e) U.We(i);
      }
    }
    const l = new List();
    l.h = s;
    l._bumpVersion();
    return l.iterator;
  }
  get count() {
    const t = this.Hs;
    if (t !== null) {
      let i = 0;
      const e = this.Zt.h,
        s = e.length;
      for (let n = 0; n < s; n++) if (t(e[n])) i++;
      return i;
    } else return this.Zt.h.length;
  }
  Dl() {
    this.key = -1;
    this.value = null;
    this.Wt = -1;
    this.Hs = null;
    this.Zt.xr = this;
  }
  toString() {
    return "ListIterator@" + this.Et + "/" + this.Zt.count;
  }
}
