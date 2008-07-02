class StringBuilder {
  _parts;
  constructor() {
    this._parts = [];
  }
  toString() {
    return this._parts.join("");
  }
  add(t) {
    if (t !== "") this._parts.push(t);
  }
}
