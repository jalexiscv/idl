class AnimationState {
  ci;
  Ds;
  h1;
  f1;
  a1;
  constructor(t, i, e) {
    ((this.ci = t), (this.Ds = i), (this.h1 = {}), (this.f1 = e), (this.a1 = false));
  }
}
var TriggerStart = ((w) => (
  (w[(w.Default = 1)] = "Default"),
  (w[(w.Immediate = 2)] = "Immediate"),
  (w[(w.Bundled = 3)] = "Bundled"),
  w
))(TriggerStart || {});
