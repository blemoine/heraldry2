// thanks https://ericeastwood.com/blog/25/curves-and-arcs-quadratic-cubic-elliptical-svg-implementations

import { angleBetween, PathAbsolutePoint, toRadians } from './geometrical.helper';

function pointOnLine(p0: PathAbsolutePoint, p1: PathAbsolutePoint, t: number): PathAbsolutePoint {
  function calculateLineParameter(x0: number, x1: number, t: number) {
    return x0 + (x1 - x0) * t;
  }

  return [calculateLineParameter(p0[0], p1[0], t), calculateLineParameter(p0[1], p1[1], t)];
}

function mod(x: number, m: number): number {
  return ((x % m) + m) % m;
}

// t: [0,1]
export function pointOnEllipticalArc(
  p0: PathAbsolutePoint,
  rx0: number,
  ry0: number,
  xAxisRotationRaw: number,
  largeArcFlag: boolean,
  sweepFlag: boolean,
  p1: PathAbsolutePoint,
  t: number
): PathAbsolutePoint {
  // In accordance to: http://www.w3.org/TR/SVG/implnote.html#ArcOutOfRangeParameters
  let rx = Math.abs(rx0);
  let ry = Math.abs(ry0);
  const xAxisRotation = mod(xAxisRotationRaw, 360);
  const xAxisRotationRadians = toRadians(xAxisRotation);
  // If the endpoints are identical, then this is equivalent to omitting the elliptical arc segment entirely.
  if (p0[0] === p1[0] && p0[1] === p1[1]) {
    return p0;
  }

  // If rx = 0 or ry = 0 then this arc is treated as a straight line segment joining the endpoints.
  if (rx === 0 || ry === 0) {
    return pointOnLine(p0, p1, t);
  }

  // Following "Conversion from endpoint to center parameterization"
  // http://www.w3.org/TR/SVG/implnote.html#ArcConversionEndpointToCenter

  // Step #1: Compute transformedPoint
  const dx = (p0[0] - p1[0]) / 2;
  const dy = (p0[1] - p1[1]) / 2;
  const transformedPoint = {
    x: Math.cos(xAxisRotationRadians) * dx + Math.sin(xAxisRotationRadians) * dy,
    y: -Math.sin(xAxisRotationRadians) * dx + Math.cos(xAxisRotationRadians) * dy,
  };
  // Ensure radii are large enough
  const radiiCheck =
    Math.pow(transformedPoint.x, 2) / Math.pow(rx, 2) + Math.pow(transformedPoint.y, 2) / Math.pow(ry, 2);
  if (radiiCheck > 1) {
    rx = Math.sqrt(radiiCheck) * rx;
    ry = Math.sqrt(radiiCheck) * ry;
  }

  // Step #2: Compute transformedCenter
  const cSquareNumerator =
    Math.pow(rx, 2) * Math.pow(ry, 2) -
    Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) -
    Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  const cSquareRootDenom =
    Math.pow(rx, 2) * Math.pow(transformedPoint.y, 2) + Math.pow(ry, 2) * Math.pow(transformedPoint.x, 2);
  const baseCRadicand = cSquareNumerator / cSquareRootDenom;
  // Make sure this never drops below zero because of precision
  const cRadicand = baseCRadicand < 0 ? 0 : baseCRadicand;
  const cCoef = (largeArcFlag !== sweepFlag ? 1 : -1) * Math.sqrt(cRadicand);
  const transformedCenter = {
    x: cCoef * ((rx * transformedPoint.y) / ry),
    y: cCoef * (-(ry * transformedPoint.x) / rx),
  };

  // Step #3: Compute center
  const center = {
    x:
      Math.cos(xAxisRotationRadians) * transformedCenter.x -
      Math.sin(xAxisRotationRadians) * transformedCenter.y +
      (p0[0] + p1[0]) / 2,
    y:
      Math.sin(xAxisRotationRadians) * transformedCenter.x +
      Math.cos(xAxisRotationRadians) * transformedCenter.y +
      (p0[1] + p1[1]) / 2,
  };

  // Step #4: Compute start/sweep angles
  // Start angle of the elliptical arc prior to the stretch and rotate operations.
  // Difference between the start and end angles
  const startVector: PathAbsolutePoint = [
    (transformedPoint.x - transformedCenter.x) / rx,
    (transformedPoint.y - transformedCenter.y) / ry,
  ];
  const startAngle = angleBetween([1, 0], startVector);

  const endVector: PathAbsolutePoint = [
    (-transformedPoint.x - transformedCenter.x) / rx,
    (-transformedPoint.y - transformedCenter.y) / ry,
  ];
  let sweepAngle = angleBetween(startVector, endVector);

  if (!sweepFlag && sweepAngle > 0) {
    sweepAngle -= 2 * Math.PI;
  } else if (sweepFlag && sweepAngle < 0) {
    sweepAngle += 2 * Math.PI;
  }
  // We use % instead of `mod(..)` because we want it to be -360deg to 360deg(but actually in radians)
  sweepAngle %= 2 * Math.PI;

  // From http://www.w3.org/TR/SVG/implnote.html#ArcParameterizationAlternatives
  const angle = startAngle + sweepAngle * t;
  const ellipseComponentX = rx * Math.cos(angle);
  const ellipseComponentY = ry * Math.sin(angle);

  return [
    Math.cos(xAxisRotationRadians) * ellipseComponentX - Math.sin(xAxisRotationRadians) * ellipseComponentY + center.x,
    Math.sin(xAxisRotationRadians) * ellipseComponentX + Math.cos(xAxisRotationRadians) * ellipseComponentY + center.y,
  ];
}

export function pointOnQuadraticBezier(
  p0: PathAbsolutePoint,
  p1: PathAbsolutePoint,
  p2: PathAbsolutePoint,
  t: number
): PathAbsolutePoint {
  function calculateQuadraticBezierParameter(x0: number, x1: number, x2: number, t: number) {
    return Math.pow(1 - t, 2) * x0 + 2 * t * (1 - t) * x1 + Math.pow(t, 2) * x2;
  }

  return [
    calculateQuadraticBezierParameter(p0[0], p1[0], p2[0], t),
    calculateQuadraticBezierParameter(p0[1], p1[1], p2[1], t),
  ];
}
