import * as P from 'parsimmon';
import { capitalizeFirstLetter } from '../../utils/strings';

export function buildAltParser<A>(arr: ReadonlyArray<A>, stringifyFn: (a: A) => string): P.Parser<A> {
  return P.alt(
    ...arr
      .map((a) => [a, stringifyFn(a)] as const)
      .sort(([, a1], [, a2]) => a2.length - a1.length)
      .map(([a, aStr]) =>
        P.regex(new RegExp(aStr, 'i'))
          .result(a)
          .desc(aStr)
      )
  );
}

export function constStr<S extends string>(str: S, asStr?: string): P.Parser<S> {
  return P.regex(new RegExp(asStr || str, 'i'))
    .result(str)
    .desc(asStr || capitalizeFirstLetter(str));
}

export const twoParser = P.regex(/two/i).result(2 as const);
export const threeParser = P.regex(/three/i).result(3 as const);
