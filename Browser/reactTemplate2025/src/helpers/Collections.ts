declare global {
  interface Array<T> {
    first(): T;
    firstOr(defaultReturn: T): T;
    firstOrNull(): T | null;
    last(): T;
    lastOrNull(): T;
    mapNotNull<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
  }
}

// Array functions

Array.prototype.first = function () {
  return this?.[0];
};

Array.prototype.firstOr = function (defaultReturn) {
  return this.first ?? defaultReturn;
};

Array.prototype.first = function () {
  return this.first ?? null;
};

Array.prototype.last = function () {
  const size = this.length;
  return this?.[size - 1];
};

Array.prototype.last = function () {
  return this.last ?? null;
};

Array.prototype.mapNotNull = function (callbackfn, thisArg) {
  return this.map(callbackfn, thisArg).filter((it) => it !== null);
};

export default {};
