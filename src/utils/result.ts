export type Error = { error: Array<string> };
export type Result<A> = A | Error;

export function raise(msg: string): Error {
  return { error: [msg] };
}

export function isError<A>(r: Result<A>): r is Error {
  return r != null && typeof r === 'object' && 'error' in r;
}

export function zip<A, B>(r: Result<A>, r2: Result<B>): Result<[A, B]> {
  if (isError(r)) {
    if (isError(r2)) {
      return { error: [...r.error, ...r2.error] };
    } else {
      return r;
    }
  } else if (isError(r2)) {
    return r2;
  } else {
    return [r, r2];
  }
}

export function zip3<A, B, C>(r: Result<A>, r2: Result<B>, r3: Result<C>): Result<[A, B, C]> {
  return map(zip(zip(r, r2), r3), ([[a, b], c]) => [a, b, c]);
}

export function zip4<A, B, C, D>(r: Result<A>, r2: Result<B>, r3: Result<C>, r4: Result<D>): Result<[A, B, C, D]> {
  return map(zip(zip3(r, r2, r3), r4), ([[a, b, c], d]) => [a, b, c, d]);
}

export function map<A, B>(r: Result<A>, fn: (a: A) => B): Result<B> {
  if (isError(r)) {
    return r;
  } else {
    return fn(r);
  }
}

export function flatMap<A, B>(r: Result<A>, fn: (a: A) => Result<B>): Result<B> {
  if (isError(r)) {
    return r;
  } else {
    return fn(r);
  }
}

export function combine<A>(arr: Array<Result<A>>, concat: (a: A, a2: A) => Result<A>): Result<A> {
  if (arr.length === 0) {
    return raise('There must be at least one element in the array');
  } else {
    const [head, ...tail] = arr;
    return tail.reduce((maybeAcc, a) => {
      return map(zip(maybeAcc, a), ([a1, a2]) => concat(a1, a2));
    }, head);
  }
}
