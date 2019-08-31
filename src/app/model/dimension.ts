export type Dimension = { width: number; height: number };

export function scale({ width, height }: Dimension, scaleFactor: number): Dimension {
  return {
    width: width * scaleFactor,
    height: height * scaleFactor,
  };
}
