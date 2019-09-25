export const lines = ['straight', 'engrailed', 'invected', 'indented', 'wavy', 'bretessed'] as const;

export type Line = typeof lines[number];
