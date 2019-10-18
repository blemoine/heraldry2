export const lines = [
  'straight',
  'engrailed',
  'invected',
  'indented',
  'wavy',
  'bretessed',
  'embattled',
  'embattled-counter-embattled',
  'urdy',
  'dovetailed',
  'potenty',
  'raguly',
] as const;

export type Line = typeof lines[number];
