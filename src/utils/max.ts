import { cannotHappen } from './cannot-happen';

export type ComparatorResult = 'greater' | 'lesser' | 'equals';

export function max(arr: ReadonlyArray<number>): number | null {
  return maxWith(
    arr,
    (a: number, b: number): ComparatorResult => {
      if (a === b) {
        return 'equals';
      } else if (a > b) {
        return 'greater';
      } else {
        return 'lesser';
      }
    }
  );
}

export function maxWith<A>(arr: ReadonlyArray<A>, comparator: (a1: A, a2: A) => ComparatorResult): A | null {
  if (arr.length === 0) {
    return null;
  } else {
    return arr.reduce((acc, a) => {
      const result = comparator(a, acc);
      if (result === 'greater') {
        return a;
      } else if (result === 'lesser' || result === 'equals') {
        return acc;
      } else {
        return cannotHappen(result);
      }
    });
  }
}
