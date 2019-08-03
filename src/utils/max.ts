export function max(arr: ReadonlyArray<number>): number | null {
  if (arr.length === 0) {
    return null;
  }
  return arr.reduce((a, b) => Math.max(a, b));
}
