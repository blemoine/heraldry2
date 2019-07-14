export function range(inclusiveStart: number, exclusiveEnd: number): Array<number> {
  const result: Array<number> = [];
  for (let i = inclusiveStart; i < exclusiveEnd; ++i) {
    result.push(i);
  }
  return result;
}
