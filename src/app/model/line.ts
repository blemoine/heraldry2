
export const lines = ['straight', 'engrailed', 'invected', 'indented'] as const;

export type Line = typeof lines[number];
