class UndoManager {
  xx;
  Gi;
  lT;
  $s;
  Hk;
  Om;
  El;
  Sx;
  vk;
  Pn;
  Ef;
  kx;
  Zs;
  Px;
  Mx;
  Em;
  Nx;
  constructor(t) {
    ((this.xx = new GSet()),
      (this.Gi = false),
      (this.lT = new List().k()),
      (this.$s = -1),
      (this.Hk = 999),
      (this.Zs = false),
      (this.Om = null),
      (this.El = 0),
      (this.Sx = false),
      Debug && (this.Sx = true),
      (this.vk = 23),
      (this.Pn = new List().k()),
      (this.Ef = new List()),
      (this.kx = true),
      (this.Px = false),
      (this.Mx = false),
      (this.Em = false),
      (this.Nx = false),
      t && Object.assign(this, t));
  }
  toString(t) {
    let i = "UndoManager " + this.historyIndex + "<" + this.history.count + "<=" + this.maxHistoryLength;
    i += "[";
    let e = this.nestedTransactionNames.count;
    for (let s = 0; s < e; s++) (s > 0 && (i += " "), (i += this.nestedTransactionNames.elt(s)));
    if (((i += "]"), t !== void 0 && t > 0)) {
      e = this.history.count;
      for (let s = 0; s < e; s++)
        i +=
          `
 ` + this.history.elt(s).toString(t - 1);
    }
    return i;
  }
  clear() {
    const t = this.history;
    t.di();
    for (let i = t.count - 1; i >= 0; i--) {
      const e = t.elt(i);
      e !== null && e.clear();
    }
    (t.clear(),
      (this.$s = -1),
      t.k(),
      (this.Zs = false),
      (this.Om = null),
      (this.El = 0),
      this.Pn.di(),
      this.Pn.clear(),
      this.Pn.k(),
      this.Ef.clear(),
      (this.Px = false),
      (this.Mx = false),
      (this.Em = false),
      (this.Nx = false));
  }
  copyProperties(t) {
    ((this.isEnabled = t.isEnabled),
      (this.maxHistoryLength = t.maxHistoryLength),
      (this.checksTransactionLevel = t.checksTransactionLevel));
  }
  addModel(t) {
    this.xx.add(t);
  }
  removeModel(t) {
    this.xx.delete(t);
  }
  startTransaction(t) {
    if ((t === void 0 && (t = ""), t === null && (t = ""), this.isUndoingRedoing)) return false;
    (this.kx === true &&
      ((this.kx = false),
      this.El++,
      this.Vl || this.Bl("StartingFirstTransaction", t, this.currentTransaction),
      this.El > 0 && this.El--),
      this.isEnabled &&
        (this.Pn.di(),
        this.Pn.add(t),
        this.Pn.k(),
        this.currentTransaction === null ? this.Ef.add(0) : this.Ef.add(this.currentTransaction.changes.count)),
      this.El++);
    const i = this.transactionLevel === 1;
    return (i && (this.Vl || this.Bl("StartedTransaction", t, this.currentTransaction)), i);
  }
  commitTransaction(t) {
    return (t === void 0 && (t = ""), this.hT(true, t));
  }
  rollbackTransaction() {
    return this.hT(false, "");
  }
  hT(t, i) {
    if (this.isUndoingRedoing) return false;
    this.checksTransactionLevel &&
      this.transactionLevel < 1 &&
      U.ot("Ending transaction without having started a transaction: " + i);
    const e = this.transactionLevel === 1;
    let s = this.currentTransaction;
    e && t && (this.Vl || this.Bl("CommittingTransaction", i, s));
    let n = 0;
    if (this.transactionLevel > 0 && (this.El--, this.isEnabled)) {
      const o = this.Pn.count;
      o > 0 && (i === "" && (i = this.Pn.elt(0)), this.Pn.di(), this.Pn.removeAt(o - 1), this.Pn.k());
      const r = this.Ef.count;
      r > 0 && ((n = this.Ef.elt(r - 1)), this.Ef.removeAt(r - 1));
    }
    if (e) {
      if (t) {
        if (((this.Em = false), s === null && i !== "" && (s = this.currentTransaction), this.isEnabled && s !== null)) {
          const o = s;
          (o.isComplete || ((o.isComplete = true), (o.name = i)), this.discardHistoryAfterIndex());
          const r = this.history;
          r.di();
          const l = this.maxHistoryLength;
          if (l >= 0) {
            if (l === 0) r.clear();
            else if (r.count >= l) {
              const h = r.elt(0);
              (h !== null && h.clear(), r.removeAt(0), this.$s--);
            }
          }
          (l !== 0 && (r.count === 0 || r.get(r.count - 1) !== o) && (r.add(o), this.$s++), r.k(), (s = o));
        }
        this.Vl || this.Bl("CommittedTransaction", i, s);
      } else {
        this.Zs = true;
        try {
          this.isEnabled && s !== null && ((s.isComplete = true), s.undo());
        } finally {
          (this.Vl || this.Bl("RolledBackTransaction", i, s), (this.Zs = false));
        }
        s !== null && s.clear();
      }
      return ((this.Om = null), this.Cx && this.clear(), (this.Cx = false), (this.Ax = false), true);
    } else return (this.isEnabled && !t && s !== null && s.gR(n), false);
  }
  discardHistoryAfterIndex() {
    if (this.isUndoingRedoing || !this.canRedo()) return;
    const t = this.history;
    t.di();
    for (let i = t.count - 1; i > this.historyIndex; i--) {
      const e = t.elt(i);
      (e !== null && e.clear(), t.removeAt(i), (this.Em = true));
    }
    t.k();
  }
  thaw() {
    this.history.di();
  }
  canUndo() {
    if (!this.isEnabled || this.transactionLevel > 0) return false;
    const t = this.transactionToUndo;
    return !!(t !== null && t.canUndo());
  }
  undo() {
    if (!this.canUndo()) return;
    const t = this.transactionToUndo;
    if (t !== null)
      try {
        ((this.Zs = true), this.Bl("StartingUndo", "Undo", t), this.$s--, t.undo());
      } catch (i) {
        U.ot("undo error: " + i.toString());
      } finally {
        (this.Bl("FinishedUndo", "Undo", t), (this.Zs = false));
      }
  }
  canRedo() {
    if (!this.isEnabled || this.transactionLevel > 0) return false;
    const t = this.transactionToRedo;
    return !!(t !== null && t.canRedo());
  }
  redo() {
    if (!this.canRedo()) return;
    const t = this.transactionToRedo;
    if (t !== null)
      try {
        ((this.Zs = true), this.Bl("StartingRedo", "Redo", t), this.$s++, t.redo());
      } catch (i) {
        U.ot("redo error: " + i.toString());
      } finally {
        (this.Bl("FinishedRedo", "Redo", t), (this.Zs = false));
      }
  }
  Bl(t, i, e) {
    const s = new ChangedEvent();
    ((s.change = 1), (s.propertyName = t), (s.object = e), (s.oldValue = i));
    const n = this.models;
    for (; n.next(); ) {
      const o = n.value;
      ((s.model = o), o.mR(s));
    }
  }
  handleChanged(t) {
    if (this.isEnabled && !this.isUndoingRedoing && !this.skipsEvent(t)) {
      let i = this.currentTransaction;
      i === null && ((i = new Transaction()), (this.Om = i));
      const e = t.copy(),
        s = i.changes;
      if (
        (s.di(), s.add(e), s.k(), this.checksTransactionLevel && this.vk > 0 && this.transactionLevel <= 0 && !this.kx)
      ) {
        const n = t.diagram;
        if (n !== null && n.oa === false) return;
        (U.ot("Change not within a transaction: " + e.toString()), this.vk--);
      }
    }
  }
  skipsEvent(t) {
    if (t === null || t.change === 1) return true;
    const i = t.object;
    if (i === null) return false;
    if (i.layer !== void 0) {
      const e = i.layer;
      if (e !== null && e.isTemporary) return true;
    } else if (i.isTemporary) return true;
    return false;
  }
  get models() {
    return this.xx.iterator;
  }
  get isEnabled() {
    return this.Gi;
  }
  set isEnabled(t) {
    this.Gi = t;
  }
  get transactionToUndo() {
    return this.historyIndex >= 0 && this.historyIndex <= this.history.count - 1
      ? this.history.elt(this.historyIndex)
      : null;
  }
  get transactionToRedo() {
    return this.historyIndex < this.history.count - 1 ? this.history.elt(this.historyIndex + 1) : null;
  }
  get isUndoingRedoing() {
    return this.Zs;
  }
  get history() {
    return this.lT;
  }
  get maxHistoryLength() {
    return this.Hk;
  }
  set maxHistoryLength(t) {
    this.Hk = t;
  }
  get historyIndex() {
    return this.$s;
  }
  get currentTransaction() {
    return this.Om;
  }
  get transactionLevel() {
    return this.El;
  }
  get isInTransaction() {
    return this.El > 0;
  }
  get checksTransactionLevel() {
    return this.Sx;
  }
  set checksTransactionLevel(t) {
    this.Sx = t;
  }
  get nestedTransactionNames() {
    return this.Pn;
  }
  get Cx() {
    return this.Px;
  }
  set Cx(t) {
    this.Px = t;
  }
  get Ax() {
    return this.Mx;
  }
  set Ax(t) {
    this.Mx = t;
  }
  get Vl() {
    return this.Nx;
  }
  set Vl(t) {
    this.Nx = t;
  }
  get isJustDiscarded() {
    return this.Em;
  }
}
