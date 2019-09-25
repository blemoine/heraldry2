export const lines = ['straight', 'engrailed', 'invected', 'indented', 'wavy', 'bretessed', 'embattled'] as const;

export type Line = typeof lines[number];
