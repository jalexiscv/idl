class List {
  p;
  h;
  ct;
  xr;
  br;
  constructor(t) {
    GSet._i(this);
    this.p = false;
    this.h = [];
    this.ct = 0;
    this.xr = null;
    this.br = null;
    if (t !== void 0) this.addAll(t);
  }
  [Symbol.iterator]() {
    return this.h.values();
  }
  _bumpVersion() {
    let t = this.ct;
    t++;
    if (t > 999999999) t = 0;
    this.ct = t;
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
    return "List()#" + GSet.Ps(this);
  }
  add(t) {
    if (this.p) U.D(this, t);
    this.h.push(t);
    this._bumpVersion();
    return this;
  }
  push(t) {
    this.add(t);
  }
  addAll(t) {
    if (t === null) return this;
    if (this.p) U.D(this);
    const i = this.h;
    if (t.first) {
      const e = t.iterator;
      while (e.next()) i.push(e.value);
    } else {
      for (const e of t) i.push(e);
    }
    this._bumpVersion();
    return this;
  }
  clear() {
    if (this.p) U.D(this);
    this.h.length = 0;
    this._bumpVersion();
  }
  contains(t) {
    return this.has(t);
  }
  has(t) {
    return t === null ? false : this.h.indexOf(t) !== -1;
  }
  indexOf(t) {
    return t === null ? -1 : this.h.indexOf(t);
  }
  elt(t) {
    Debug && U.r(t, List, "elt:i");
    const i = this.h;
    if (t < 0 || t >= i.length) U.G(t, "0 <= i < length", List, "elt:i");
    return i[t];
  }
  get(t) {
    return this.elt(t);
  }
  setElt(t, i) {
    Debug && U.r(t, List, "setElt:i");
    const e = this.h;
    if (t < 0 || t >= e.length) U.G(t, "0 <= i < length", List, "setElt:i");
    if (this.p) U.D(this, t);
    e[t] = i;
  }
  set(t, i) {
    this.setElt(t, i);
  }
  first() {
    const t = this.h;
    return t.length === 0 ? null : t[0];
  }
  last() {
    const t = this.h;
    const i = t.length;
    return i > 0 ? t[i - 1] : null;
  }
  pop() {
    if (this.p) U.D(this);
    const t = this.h;
    if (t.length > 0) {
      const i = t.pop();
      return i === void 0 ? null : i;
    }
    return null;
  }
  any(t) {
    const i = this.h;
    const e = this.ct;
    const s = i.length;
    for (let n = 0; n < s; n++) {
      if (t(i[n])) return true;
      if (this.ct !== e) U.We(this);
    }
    return false;
  }
  all(t) {
    const i = this.h;
    const e = this.ct;
    const s = i.length;
    for (let n = 0; n < s; n++) {
      if (!t(i[n])) return false;
      if (this.ct !== e) U.We(this);
    }
    return true;
  }
  each(t) {
    const i = this.h;
    const e = this.ct;
    const s = i.length;
    for (let n = 0; n < s; n++) {
      t(i[n]);
      if (this.ct !== e) U.We(this);
    }
    return this;
  }
  map(t) {
    const i = new List();
    const e = [];
    const s = this.h;
    const n = this.ct;
    const o = s.length;
    for (let r = 0; r < o; r++) {
      e.push(t(s[r]));
      if (this.ct !== n) U.We(this);
    }
    i.h = e;
    i._bumpVersion();
    return i;
  }
  filter(t) {
    const i = new List();
    const e = [];
    const s = this.h;
    const n = this.ct;
    const o = s.length;
    for (let r = 0; r < o; r++) {
      const l = s[r];
      if (t(l)) e.push(l);
      if (this.ct !== n) U.We(this);
    }
    i.h = e;
    i._bumpVersion();
    return i;
  }
  insertAt(t, i) {
    Debug && U.r(t, List, "insertAt:i");
    if (t < 0) U.G(t, ">= 0", List, "insertAt:i");
    if (this.p) U.D(this, t);
    const e = this.h;
    if (t >= e.length) e.push(i);
    else e.splice(t, 0, i);
    this._bumpVersion();
  }
  remove(t) {
    return this.delete(t);
  }
  delete(t) {
    if (t === null) return false;
    if (this.p) U.D(this, t);
    const i = this.h;
    const e = i.indexOf(t);
    if (e === -1) return false;
    if (e === i.length - 1) i.pop();
    else i.splice(e, 1);
    this._bumpVersion();
    return true;
  }
  removeAt(t) {
    Debug && U.r(t, List, "removeAt:i");
    const i = this.h;
    if (t < 0 || t >= i.length) U.G(t, "0 <= i < length", List, "removeAt:i");
    if (this.p) U.D(this, t);
    if (t === i.length - 1) i.pop();
    else i.splice(t, 1);
    this._bumpVersion();
  }
  removeRange(t, i) {
    Debug && (U.r(t, List, "removeRange:from"), U.r(i, List, "removeRange:to"));
    const e = this.h;
    const s = e.length;
    if (t < 0) t = 0;
    else if (t >= s) return this;
    if (i < 0) return this;
    if (i >= s) i = s - 1;
    if (t > i) return this;
    if (this.p) U.D(this);
    let n = t;
    let o = i + 1;
    while (o < s) e[n++] = e[o++];
    e.length = s - (i - t + 1);
    this._bumpVersion();
    return this;
  }
  copy() {
    const t = new List();
    const i = this.h;
    if (i.length > 0) t.h = Array.prototype.slice.call(i);
    return t;
  }
  toArray() {
    const t = this.h;
    const i = this.count;
    const e = new Array(i);
    for (let s = 0; s < i; s++) e[s] = t[s];
    return e;
  }
  get RA() {
    return this.h;
  }
  toSet() {
    const t = new GSet();
    const i = this.h;
    const e = this.count;
    for (let s = 0; s < e; s++) t.add(i[s]);
    return t;
  }
  sort(t) {
    Debug && U.C(t, List, "sort:sortfunc");
    if (this.p) U.D(this);
    this.h.sort(t);
    this._bumpVersion();
    return this;
  }
  sortRange(t, i, e) {
    const s = this.h;
    const n = s.length;
    if (i === void 0) i = 0;
    if (e === void 0) e = n;
    Debug && (U.C(t, List, "sortRange:sortfunc"), U.r(i, List, "sortRange:from"), U.r(e, List, "sortRange:to"));
    if (this.p) U.D(this);
    const o = e - i;
    if (o <= 1) return this;
    if (i < 0 || i >= n - 1) U.G(i, "0 <= from < length", List, "sortRange:from");
    if (o === 2) {
      const r = s[i];
      const l = s[i + 1];
      if (t(r, l) > 0) {
        s[i] = l;
        s[i + 1] = r;
        this._bumpVersion();
      }
      return this;
    }
    if (i === 0) {
      if (e >= n) {
        s.sort(t);
      } else {
        const r = s.slice(0, e);
        r.sort(t);
        for (let l = 0; l < e; l++) s[l] = r[l];
      }
    } else if (e >= n) {
      const r = s.slice(i);
      r.sort(t);
      for (let l = i; l < n; l++) s[l] = r[l - i];
    } else {
      const r = s.slice(i, e);
      r.sort(t);
      for (let l = i; l < e; l++) s[l] = r[l - i];
    }
    this._bumpVersion();
    return this;
  }
  reverse() {
    if (this.p) U.D(this);
    this.h.reverse();
    this._bumpVersion();
    return this;
  }
  get count() {
    return this.h.length;
  }
  get size() {
    return this.h.length;
  }
  get length() {
    return this.h.length;
  }
  get iterator() {
    if (this.h.length <= 0) return EmptyIterator.instance;
    const t = this.xr;
    return t !== null ? (t.reset(), t) : new ListIterator(this);
  }
  get iteratorBackwards() {
    if (this.h.length <= 0) return EmptyIterator.instance;
    const t = this.br;
    return t !== null ? (t.reset(), t) : new ListIteratorBackwards(this);
  }
}
