import { angleBetween, distanceBetween, PathAbsolutePoint, toDegree } from './geometrical.helper';
import { range } from '../../utils/range';
import { EngrailedLineOptions, IndentedLineOptions, SvgPathBuilder } from './svg-path-builder';

export function indentedBetweenPoints(
  basePathBuilder: SvgPathBuilder,
  pointTo: PathAbsolutePoint,
  lineOption: IndentedLineOptions,
  nextPointFn: (step: number) => PathAbsolutePoint
): SvgPathBuilder {
  const previousPoint = basePathBuilder.currentPoint();
  if (previousPoint === null) {
    return basePathBuilder;
  }
  const distance = distanceBetween(previousPoint, pointTo);
  const triangleCount = Math.floor(distance / lineOption.width);
  const height = lineOption.height;

  return range(0, triangleCount).reduce<SvgPathBuilder>((pathBuilder, i) => {
    const currentPoint = nextPointFn(i / triangleCount);
    const nextPoint = nextPointFn((i + 1) / triangleCount);
    const xh = (nextPoint[0] + currentPoint[0]) / 2;
    const yh = (nextPoint[1] + currentPoint[1]) / 2;

    if (nextPoint[0] === currentPoint[0]) {
      return pathBuilder.goTo([xh + height, yh], null).goTo(nextPoint);
    } else {
      return pathBuilder.goTo(perpendicularTo2Points(currentPoint, nextPoint, height), null).goTo(nextPoint);
    }
  }, basePathBuilder);
}

export function engrailedBetweenPoints(
  basePathBuilder: SvgPathBuilder,
  pointTo: PathAbsolutePoint,
  lineOptions: EngrailedLineOptions,
  nextPointFn: (step: number) => PathAbsolutePoint
): SvgPathBuilder {
  const previousPoint = basePathBuilder.currentPoint();
  if (previousPoint === null) {
    return basePathBuilder;
  }
  const distance = distanceBetween(previousPoint, pointTo);

  const circleCount = Math.floor(distance / lineOptions.radius);
  const circleRadius = distance / circleCount;

  return range(0, circleCount).reduce((pathBuilder: SvgPathBuilder, i): SvgPathBuilder => {
    const nextPoint = nextPointFn((i + 1) / circleCount);

    return pathBuilder.arcTo(nextPoint, {
      radius: [circleRadius, 3 * circleRadius],
      sweep: lineOptions.sweep ? 1 : 0,
      xAxisRotation: engrailedXAxisRotation(previousPoint, nextPoint),
    });
  }, basePathBuilder);
}

function engrailedXAxisRotation(start: PathAbsolutePoint, end: PathAbsolutePoint): number {
  const distance = distanceBetween(start, end);
  const c: PathAbsolutePoint = [(end[0] + start[0]) / 2, (end[1] + start[1]) / 2];

  const cb: PathAbsolutePoint = [c[0] - end[0], c[1] - end[1]];
  const cb1: PathAbsolutePoint = [c[0] + distance, 0];
  const theta = angleBetween(cb, cb1);
  return toDegree(-theta);
}

function perpendicularTo2Points(p1: PathAbsolutePoint, p2: PathAbsolutePoint, height: number): PathAbsolutePoint {
  // H is the center of p1/p2
  // C is the perpendicular to vector p1p2 at point H, with length height
  const xh = (p2[0] + p1[0]) / 2;
  const yh = (p2[1] + p1[1]) / 2;
  const alpha = (p2[1] - p1[1]) / (p2[0] - p1[0]);
  const yc = height * Math.sqrt(1 / (1 + alpha ** 2)) + yh;
  const xc = xh - (yc - yh) * alpha;

  return [xc, yc];
}
