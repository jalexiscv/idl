class AnimationTrigger {
  Re;
  kn;
  Zu;
  _f;
  constructor(t, i, e) {
    (e && Debug && U.W(e, TriggerStart, "TriggerStart"),
      (this.Re = null),
      (this.kn = t),
      (this.Zu = e || 1),
      (this._f = null),
      i !== void 0 && ((this._f = i), e === void 0 && (this.Zu = 2)));
  }
  copy() {
    const t = new AnimationTrigger(this.kn);
    t.Zu = this.Zu;
    const i = this._f;
    if (i !== null) {
      const e = {};
      (i.duration !== void 0 && (e.duration = i.duration),
        i.finished !== void 0 && (e.finished = i.finished),
        i.easing !== void 0 && (e.easing = i.easing),
        (t._f = e));
    }
    return t;
  }
  get propertyName() {
    return this.kn;
  }
  set propertyName(t) {
    this.kn = t;
  }
  get animationSettings() {
    return this._f;
  }
  set animationSettings(t) {
    this._f = t;
  }
  UR(t) {
    const i = this._f;
    i !== null &&
      (i.duration && (t.duration = i.duration),
      i.finished && (t.finished = i.finished),
      i.easing && (t.easing = i.easing));
  }
  get startCondition() {
    return this.Zu;
  }
  set startCondition(t) {
    (Debug && U.W(t, TriggerStart, "TriggerStart"), (this.Zu = t));
  }
  static Default = 1;
  static Immediate = 2;
  static Bundled = 3;
}
