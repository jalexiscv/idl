class DiagramEvent {
  _diagram;
  _name;
  _subject;
  _parameter;
  constructor() {
    this._diagram = null;
    this._name = "";
    this._subject = null;
    this._parameter = null;
  }
  copy() {
    const t = new DiagramEvent();
    t._diagram = this._diagram;
    t._name = this._name;
    t._subject = this._subject;
    t._parameter = this._parameter;
    return t;
  }
  toString() {
    let t = "*" + this.name;
    if (this.subject !== null) t += ":" + this.subject.toString();
    if (this.parameter !== null) t += "(" + this.parameter.toString() + ")";
    return t;
  }
  get diagram() {
    return this._diagram;
  }
  set diagram(t) {
    this._diagram = t;
  }
  get name() {
    return this._name;
  }
  set name(t) {
    this._name = t;
  }
  get subject() {
    return this._subject;
  }
  set subject(t) {
    this._subject = t;
  }
  get parameter() {
    return this._parameter;
  }
  set parameter(t) {
    this._parameter = t;
  }
}
var ChangeType = ((w) => (
  (w[(w.Transaction = 1)] = "Transaction"),
  (w[(w.Property = 2)] = "Property"),
  (w[(w.Insert = 3)] = "Insert"),
  (w[(w.Remove = 4)] = "Remove"),
  w
))(ChangeType || {});
