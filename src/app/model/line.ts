export type Line = 'straight' | 'engrailed' | 'invected';

export const lines: ReadonlyArray<Line> = ['straight', 'engrailed', 'invected'] as const;
