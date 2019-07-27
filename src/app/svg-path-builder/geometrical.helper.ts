export type PathAbsolutePoint = [number, number];

export function toRadians(angle: number): number {
  return angle * (Math.PI / 180);
}

export function toDegree(angle: number): number {
  return angle * (180 / Math.PI);
}

export function angleBetween(v0: PathAbsolutePoint, v1: PathAbsolutePoint): number {
  const p = v0[0] * v1[0] + v0[1] * v1[1];
  const n = Math.sqrt((Math.pow(v0[0], 2) + Math.pow(v0[1], 2)) * (Math.pow(v1[0], 2) + Math.pow(v1[1], 2)));
  const sign = v0[0] * v1[1] - v0[1] * v1[0] < 0 ? -1 : 1;
  return sign * Math.acos(p / n);
}
