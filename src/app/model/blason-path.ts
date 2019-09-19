export type SimpleBlasonPath = 'field' | 'ordinary' | 'charge';
export type CompoundedBlasonPath = [number, SimpleBlasonPath | null];
export type BlasonPath = SimpleBlasonPath | CompoundedBlasonPath;
