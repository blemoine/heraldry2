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

export type SupportedNumber = 1 | StringifiableNumber;
export const supportedNumbers: ReadonlyArray<SupportedNumber> = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
] as const;
export function isNotOne(i: SupportedNumber): i is Exclude<SupportedNumber, 1> {
  return i !== 1;
}
export const availableDispositions = ['default', 'pale', 'fess', 'bend', 'bendSinister'] as const;
export type Disposition = typeof availableDispositions[number];
export type CountAndDisposition = { count: SupportedNumber; disposition: Disposition };
