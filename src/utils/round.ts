export function round(num: number, decimalCount: number) {
  const factor = 10 ** decimalCount;
  return Math.round(num * factor) / factor;
}
