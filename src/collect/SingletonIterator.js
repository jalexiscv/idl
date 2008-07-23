class SingletonIterator {
  constructor(t) {
    this.key = -1;
    this.value = t;
  }
  [Symbol.iterator]() {
    return [this.value].values();
  }
  key;
  value;
  get iterator() {
    return this;
  }
  reset() {
    this.key = -1;
  }
  next() {
    if (this.key === -1) {
      this.key = 0;
      return true;
    }
    return false;
  }
  hasNext() {
    return this.next();
  }
  first() {
    this.key = 0;
    return this.value;
  }
  any(t) {
    this.key = -1;
    return t(this.value);
  }
  all(t) {
    this.key = -1;
    return t(this.value);
  }
  each(t) {
    this.key = -1;
    t(this.value);
    return this;
  }
  map(t) {
    return new SingletonIterator(t(this.value));
  }
  filter(t) {
    return t(this.value) ? new SingletonIterator(this.value) : EmptyIterator.instance;
  }
  get count() {
    return 1;
  }
  Dl() {
    this.value = null;
  }
  toString() {
    return "SingletonIterator(" + this.value + ")";
  }
}
