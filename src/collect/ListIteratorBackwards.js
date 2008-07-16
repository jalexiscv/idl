class ListIteratorBackwards {
  Zt;
  Wt;
  Et;
  constructor(t) {
    this.Zt = t;
    t.br = null;
    this.Wt = t.ct;
    this.Et = t.h.length;
  }
  [Symbol.iterator]() {
    return this.Zt.h.reverse().values();
  }
  key;
  value;
  get iterator() {
    return this;
  }
  reset() {
    const t = this.Zt;
    t.br = null;
    this.Wt = t.ct;
    this.Et = t.h.length;
  }
  next() {
    const t = this.Zt;
    if (t.ct !== this.Wt) {
      if (this.key < 0) return false;
      U.We(t);
    }
    const i = --this.Et;
    if (i >= 0) {
      this.key = i;
      this.value = t.h[i];
      return true;
    }
    this.Dl();
    return false;
  }
  hasNext() {
    return this.next();
  }
  first() {
    const t = this.Zt;
    this.Wt = t.ct;
    const i = t.h,
      e = i.length - 1;
    this.Et = e;
    if (e >= 0) {
      const s = i[e];
      this.key = e;
      this.value = s;
      return s;
    }
    return null;
  }
  any(t) {
    const i = this.Zt;
    i.br = null;
    const e = i.ct,
      s = i.h,
      n = s.length;
    this.Et = n;
    for (let o = n - 1; o >= 0; o--) {
      const r = s[o];
      if (t(r)) return true;
      if (i.ct !== e) U.We(i);
    }
    return false;
  }
  all(t) {
    const i = this.Zt;
    i.br = null;
    const e = i.ct,
      s = i.h,
      n = s.length;
    this.Et = n;
    for (let o = n - 1; o >= 0; o--) {
      const r = s[o];
      if (!t(r)) return false;
      if (i.ct !== e) U.We(i);
    }
    return true;
  }
  each(t) {
    const i = this.Zt;
    i.br = null;
    const e = i.ct,
      s = i.h,
      n = s.length;
    this.Et = n;
    for (let o = n - 1; o >= 0; o--) {
      const r = s[o];
      t(r);
      if (i.ct !== e) U.We(i);
    }
    return this;
  }
  map(t) {
    const i = this.Zt;
    i.br = null;
    const e = i.ct,
      s = [],
      n = i.h,
      o = n.length;
    this.Et = o;
    for (let l = o - 1; l >= 0; l--) {
      const h = n[l];
      s.push(t(h));
      if (i.ct !== e) U.We(i);
    }
    const r = new List();
    r.h = s;
    r._bumpVersion();
    return r.iterator;
  }
  filter(t) {
    const i = this.Zt;
    i.br = null;
    const e = i.ct,
      s = [],
      n = i.h,
      o = n.length;
    this.Et = o;
    for (let l = o - 1; l >= 0; l--) {
      const h = n[l];
      if (t(h)) s.push(h);
      if (i.ct !== e) U.We(i);
    }
    const r = new List();
    r.h = s;
    r._bumpVersion();
    return r.iterator;
  }
  get count() {
    return this.Zt.h.length;
  }
  Dl() {
    this.key = -1;
    this.value = null;
    this.Wt = -1;
    this.Zt.br = this;
  }
  toString() {
    return "ListIteratorBackwards(" + this.Et + "/" + this.Zt.count + ")";
  }
}
