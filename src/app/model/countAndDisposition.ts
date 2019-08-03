
export const numberToNameMap = {
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
  7: 'seven',
  8: 'eight',
  9: 'nine',
  10: 'ten',
  11: 'eleven',
  12: 'twelve',
  13: 'thirteen',
  14: 'fourteen',
  15: 'fifteen',
  16: 'sixteen',
  17: 'seventeen',
  18: 'eighteen',
  19: 'nineteen',
  20: 'twenty',
} as const;
export type StringifiableNumber = keyof typeof numberToNameMap;
export function stringifyNumber(n: StringifiableNumber): string {
  return numberToNameMap[n];
}


export type CountAndDisposition = { count: 1 } | { count: 2 | 3; disposition: 'pale' };
