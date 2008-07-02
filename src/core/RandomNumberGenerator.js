class RandomNumberGenerator {
  _invM;
  _remainder;
  _quotient;
  _modulus;
  _multiplier;
  seed;
  constructor(t) {
    if (t === void 0) t = 42;
    this.seed = t;
    this._multiplier = 48271;
    this._modulus = 2147483647;
    this._quotient = this._modulus / this._multiplier;
    this._remainder = this._modulus % this._multiplier;
    this._invM = 1 / this._modulus;
    this.random();
  }
  random() {
    const t = this.seed / this._quotient;
    const i = this.seed % this._quotient;
    const e = this._multiplier * i - this._remainder * t;
    if (e > 0) this.seed = e;
    else this.seed = e + this._modulus;
    return this.seed * this._invM;
  }
}
var LayeredDigraphCycleRemove = ((w) => (
    (w[(w.DepthFirst = 0)] = "DepthFirst"),
    (w[(w.Greedy = 1)] = "Greedy"),
    (w[(w.FromLayers = 2)] = "FromLayers"),
    w
  ))(LayeredDigraphCycleRemove || {}),
  LayeredDigraphLayering = ((w) => (
    (w[(w.OptimalLinkLength = 10)] = "OptimalLinkLength"),
    (w[(w.LongestPathSink = 11)] = "LongestPathSink"),
    (w[(w.LongestPathSource = 12)] = "LongestPathSource"),
    w
  ))(LayeredDigraphLayering || {}),
  LayeredDigraphInit = ((w) => (
    (w[(w.DepthFirstOut = 20)] = "DepthFirstOut"),
    (w[(w.DepthFirstIn = 21)] = "DepthFirstIn"),
    (w[(w.Naive = 22)] = "Naive"),
    w
  ))(LayeredDigraphInit || {}),
  LayeredDigraphAggressive = ((w) => (
    (w[(w.None = 30)] = "None"),
    (w[(w.Less = 31)] = "Less"),
    (w[(w.More = 32)] = "More"),
    w
  ))(LayeredDigraphAggressive || {}),
  LayeredDigraphPack = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.Expand = 1)] = "Expand"),
    (w[(w.Straighten = 2)] = "Straighten"),
    (w[(w.Median = 4)] = "Median"),
    (w[(w.MaybeExpand = 8)] = "MaybeExpand"),
    (w[(w.All = 15)] = "All"),
    w
  ))(LayeredDigraphPack || {}),
  LayeredDigraphAlign = ((w) => (
    (w[(w.None = 0)] = "None"),
    (w[(w.UpperLeft = 1)] = "UpperLeft"),
    (w[(w.UpperRight = 2)] = "UpperRight"),
    (w[(w.LowerLeft = 4)] = "LowerLeft"),
    (w[(w.LowerRight = 8)] = "LowerRight"),
    (w[(w.All = 15)] = "All"),
    w
  ))(LayeredDigraphAlign || {});
