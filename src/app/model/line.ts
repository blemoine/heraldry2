export const lines = ['straight', 'engrailed', 'invected', 'indented', 'wavy'] as const;

export type Line = typeof lines[number];
