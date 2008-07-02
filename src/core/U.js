class U {
  static yr =
    root.navigator !== void 0 &&
    root.navigator.platform !== void 0 &&
    root.navigator.platform.match(/(iPhone|iPod|iPad|Mac)/i) !== null;
  static Dk(t, i, e) {
    let s = -1;
    return function () {
      const n = this,
        o = arguments;
      (s !== -1 && U.Mf(s),
        (s = U.yn(() => {
          ((s = -1), e || t.apply(n, o));
        }, i)),
        e && !s && t.apply(n, o));
    };
  }
  static yn(t, i) {
    return root.setTimeout(t, i);
  }
  static Mf(t) {
    root.clearTimeout(t);
  }
  static Le(t) {
    return root.document.createElement(t);
  }
  static n(t) {
    throw new Error(t);
  }
  static D(t, i) {
    let e = "The object is frozen, so its properties cannot be set: " + t.toString();
    (i !== void 0 && (e += "  to value: " + i), U.n(e));
  }
  static s(t, i, e, s) {
    if (!(t instanceof i)) {
      let n = U.Nf(e);
      (s !== void 0 && (n += "." + s), U.Li(t, i, n));
    }
  }
  static i(t, i, e, s) {
    if (typeof t !== i) {
      let n = U.Nf(e);
      (s !== void 0 && (n += "." + s), U.Li(t, i, n));
    }
  }
  static r(t, i, e) {
    if (typeof t != "number" || !isFinite(t)) {
      let s = U.Nf(i);
      (e !== void 0 && (s += "." + e), U.n(s + " must be a real number type, and not NaN or Infinity: " + t));
    }
  }
  static Ro(t, i, e) {
    if (t === null || typeof t != "object") {
      let s = U.Nf(i);
      (e !== void 0 && (s += "." + e), U.Li(t, "object", s));
    }
  }
  static C(t, i, e) {
    U.i(t, "function", i, e);
  }
  static W(t, i, e) {
    t in i || U.n(`${t} is not a valid value in enumeration: ${e}`);
  }
  static Li(t, i, e, s) {
    const n = " value is not an instance of " + U.Nf(i) + ": ";
    let o = U.Nf(e);
    (s !== void 0 && (o += "." + s), typeof t == "string" && (t = '"' + t + '"'), U.n(o + n + t));
  }
  static G(t, i, e, s) {
    let n = U.Nf(e);
    (s !== void 0 && (n += "." + s), U.n(n + " is not in the range " + i + ": " + t));
  }
  static We(t) {
    U.n(
      "Collection was modified during iteration: " +
        t.toString() +
        `
  Perhaps you should iterate over a copy of the collection,
  or you could collect items to be removed from the collection after the iteration.`,
    );
  }
  static wr(t, i) {
    U.n("No property to set for this enum value: " + i + " on " + t.toString());
  }
  static ot(t) {
    root.console && root.console.log(t);
  }
  static it(t) {
    return t !== null && typeof t == "object";
  }
  static lt(t) {
    return typeof t == "function";
  }
  static Fk = [];
  static ht() {
    const t = U.Fk.pop();
    return t === void 0 ? [] : t;
  }
  static et(t) {
    ((t.length = 0), U.Fk.push(t));
  }
  static IV = Object.freeze([]);
  static Nf(t) {
    return t === null ? "*" : typeof t == "string" ? t : U.lt(t) ? t.name : "";
  }
  static Jn(t) {
    return U.lt(t) ? (t.className ? t.className : t.name) : U.it(t) && t.constructor ? U.Jn(t.constructor) : typeof t;
  }
  static ea(t, i) {
    return i == null || i === "" ? null : (U.it(t) && i in t) || t[i] ? t[i] : null;
  }
  static toString(t) {
    let i = t;
    return (
      U.it(t) &&
        (t.text
          ? (i = t.text)
          : t.name
            ? (i = t.name)
            : t.key !== void 0
              ? (i = t.key)
              : t.id !== void 0
                ? (i = t.id)
                : t.constructor === Object &&
                  (t.Text
                    ? (i = t.Text)
                    : t.Name
                      ? (i = t.Name)
                      : t.Key !== void 0
                        ? (i = t.Key)
                        : t.Id !== void 0
                          ? (i = t.Id)
                          : t.ID !== void 0 && (i = t.ID))),
      i === void 0 ? "undefined" : i === null ? "null" : i.toString()
    );
  }
  static Ww(t, i) {
    if (t.hasOwnProperty(i)) return !0;
    let e = Object.getPrototypeOf(t);
    for (; e && e !== Function; ) {
      if (e.hasOwnProperty(i)) return !0;
      const s = e.RV;
      if (s && s[i]) return !0;
      e = Object.getPrototypeOf(e);
    }
    return !1;
  }
  static dh(t) {
    const e = [],
      s = [];
    for (let r = 0; r < 256; r++) {
      e[r] = r;
      s["0123456789abcdef".charAt(r >> 4) + "0123456789abcdef".charAt(r & 15)] = String.fromCharCode(r);
    }
    let o = "";
    for (let r = 0; r < t.length; r += 2) o += s[t.substring(r, r + 2)];
    let n = 0,
      h = 0;
    for (let r = 0; r < 256; r++) (n = (n + e[r] + 119) % 256), ([e[r], e[n]] = [e[n], e[r]]);
    let a = "";
    (n = 0), (h = 0);
    for (let r = 0; r < o.length; r++)
      (n = (n + 1) % 256),
        (h = (h + e[n]) % 256),
        ([e[n], e[h]] = [e[h], e[n]]),
        (a += String.fromCharCode(o.charCodeAt(r) ^ e[(e[n] + e[h]) % 256]));
    return a;
  }
  static color1 = "@COLOR1";
  static color2 = "@COLOR2";
}
