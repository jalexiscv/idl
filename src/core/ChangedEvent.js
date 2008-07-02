class ChangedEvent {
  _change;
  _modelChange;
  _propertyName;
  _model;
  _diagram;
  _object;
  _oldValue;
  _oldParam;
  _newValue;
  _newParam;
  constructor() {
    this._change = 2;
    this._modelChange = "";
    this._propertyName = "";
    this._model = null;
    this._diagram = null;
    this._object = null;
    this._oldValue = null;
    this._oldParam = null;
    this._newValue = null;
    this._newParam = null;
  }
  static Transaction = 1;
  static Property = 2;
  static Insert = 3;
  static Remove = 4;

  clear() {
    this._model = null;
    this._diagram = null;
    this._object = null;
    this._oldValue = null;
    this._oldParam = null;
    this._newValue = null;
    this._newParam = null;
  }
  copy() {
    const t = new ChangedEvent();
    t._change = this._change;
    t._modelChange = this._modelChange;
    t._propertyName = this._propertyName;
    t._model = this._model;
    t._diagram = this._diagram;
    t._object = this._object;
    let i = this._oldValue;
    if (U.it(i) && U.lt(i.copyFrozen)) t._oldValue = i.copyFrozen();
    else t._oldValue = i;
    i = this._oldParam;
    if (U.it(i) && U.lt(i.copyFrozen)) t._oldParam = i.copyFrozen();
    else t._oldParam = i;
    i = this._newValue;
    if (U.it(i) && U.lt(i.copyFrozen)) t._newValue = i.copyFrozen();
    else t._newValue = i;
    i = this._newParam;
    if (U.it(i) && U.lt(i.copyFrozen)) t._newParam = i.copyFrozen();
    else t._newParam = i;
    return t;
  }
  gi(t) {
    if (t in ChangeType) this.change = t;
    else U.wr(this, t);
  }
  toString() {
    let t = "";
    if (this.change === 1) t += "* ";
    else if (this.change === 2) t += this.model !== null ? "!m" : "!d";
    else t += (this.model !== null ? "!m" : "!d") + this.change;
    if (this.propertyName && typeof this.propertyName == "string") t += " " + this.propertyName;
    if (this.modelChange && this.modelChange !== this.propertyName) t += " " + this.modelChange;
    t += ": ";
    if (this.change === 1) {
      if (this.oldValue !== null) t += " " + this.oldValue;
    } else {
      if (this.object !== null) t += U.toString(this.object);
      if (this.oldValue !== null) t += "  old: " + U.toString(this.oldValue);
      if (this.oldParam !== null) t += " " + this.oldParam;
      if (this.newValue !== null) t += "  new: " + U.toString(this.newValue);
      if (this.newParam !== null) t += " " + this.newParam;
    }
    return t;
  }
  getValue(t) {
    return t ? this.oldValue : this.newValue;
  }
  getParam(t) {
    return t ? this.oldParam : this.newParam;
  }
  canUndo() {
    return this.model !== null || this.diagram !== null;
  }
  undo() {
    if (!this.canUndo()) return;
    if (this.model !== null) this.model.changeState(this, true);
    else if (this.diagram !== null) this.diagram.oT(this, true);
  }
  canRedo() {
    return this.model !== null || this.diagram !== null;
  }
  redo() {
    if (!this.canRedo()) return;
    if (this.model !== null) this.model.changeState(this, false);
    else if (this.diagram !== null) this.diagram.oT(this, false);
  }
  get model() {
    return this._model;
  }
  set model(t) {
    this._model = t;
  }
  get diagram() {
    return this._diagram;
  }
  set diagram(t) {
    this._diagram = t;
  }
  get change() {
    return this._change;
  }
  set change(t) {
    this._change = t;
  }
  get modelChange() {
    return this._modelChange;
  }
  set modelChange(t) {
    Debug && U.i(t, "string", ChangedEvent, "modelChange");
    this._modelChange = t;
  }
  get propertyName() {
    return this._propertyName;
  }
  set propertyName(t) {
    Debug && typeof t != "string" && U.C(t, ChangedEvent, "propertyName");
    this._propertyName = t;
  }
  get isTransactionFinished() {
    return (
      this._change === 1 &&
      (this._propertyName === "CommittedTransaction" ||
        this._propertyName === "FinishedUndo" ||
        this._propertyName === "FinishedRedo")
    );
  }
  get object() {
    return this._object;
  }
  set object(t) {
    this._object = t;
  }
  get oldValue() {
    return this._oldValue;
  }
  set oldValue(t) {
    this._oldValue = t;
  }
  get oldParam() {
    return this._oldParam;
  }
  set oldParam(t) {
    this._oldParam = t;
  }
  get newValue() {
    return this._newValue;
  }
  set newValue(t) {
    this._newValue = t;
  }
  get newParam() {
    return this._newParam;
  }
  set newParam(t) {
    this._newParam = t;
  }
}
