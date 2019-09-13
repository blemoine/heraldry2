import { round } from '../../utils/round';
import { Matrix2 } from './matrix';

export type PathAbsolutePoint = readonly [number, number];


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

export function distanceBetween(pointA: PathAbsolutePoint, pointB: PathAbsolutePoint): number {
  return Math.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2);
}

export function rotate(
  [x, y]: PathAbsolutePoint,
  [centerX, centerY]: PathAbsolutePoint,
  angleInDegree: number
): PathAbsolutePoint {
  const angleInRad = toRadians(angleInDegree);
  const r00 = Math.cos(angleInRad);
  const r01 = -Math.sin(angleInRad);
  const r10 = -r01;
  const r11 = r00;

  const rotatedX = r00 * x + r01 * y + centerX - r00 * centerX - r01 * centerY;
  const rotatedY = r10 * x + r11 * y + centerY - r10 * centerX - r11 * centerY;

  return [rotatedX, rotatedY];
}

export function translate([x, y]: PathAbsolutePoint, translation: PathAbsolutePoint): PathAbsolutePoint {
  return [x + translation[0], y + translation[1]];
}

export function arePointEquivalent([x1, y1]: PathAbsolutePoint, [x2, y2]: PathAbsolutePoint): boolean {
  return round(x1, 5) === round(x2, 5) && round(y1, 5) === round(y2, 5);
}

export function matrixTransform([x, y]: PathAbsolutePoint, [[a11, a12], [a21, a22]]: Matrix2): PathAbsolutePoint {
  return [x * a11 + y * a12, x * a21 + y * a22];
}
