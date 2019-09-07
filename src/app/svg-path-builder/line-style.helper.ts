import { angleBetween, arePointEquivalent, distanceBetween, PathAbsolutePoint, toDegree } from './geometrical.helper';
import { range } from '../../utils/range';
import { EngrailedLineOptions, IndentedLineOptions, SvgPathBuilder } from './svg-path-builder';

export function indentBetweenPoint(
  path: SvgPathBuilder,
  lineOption: IndentedLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  const currentPoint = path.currentPoint();
  if (!currentPoint) {
    return path;
  }
  const distanceToCover = range(0, 15)
    .map((i) => {
      return parametricPath((i + 1) / 15);
    })
    .reduce(
      ({ dist, lastPoint }, point) => {
        return { dist: dist + distanceBetween(lastPoint, point), lastPoint: point };
      },
      { dist: 0, lastPoint: currentPoint }
    ).dist;
  const pointCount = Math.ceil(distanceToCover / lineOption.width);

  function dichotomizePoint(from: PathAbsolutePoint, bounds: [number, number]): PathAbsolutePoint {
    const expectedDistance = distanceToCover / pointCount;
    const i = (bounds[0] + bounds[1]) / 2;

    const to = parametricPath(i / pointCount);
    if (Math.abs(bounds[0] - bounds[1]) < 0.01) {
      return to;
    }
    const segmentLength = distanceBetween(from, to);
    if (segmentLength > expectedDistance + 1) {
      const j = (bounds[1] + i) / 2;

      return dichotomizePoint(from, [bounds[0], j]);
    } else if (segmentLength < expectedDistance - 1) {
      const j = (bounds[0] + i) / 2;

      return dichotomizePoint(from, [j, bounds[1]]);
    } else {
      return to;
    }
  }

  return range(0, pointCount).reduce((result, i) => {
    let to = dichotomizePoint(result.currentPoint()!, [i, i + 2]);

    return indentLineTo(result, to, lineOption.height);
  }, path);
}

export function indentLineTo(path: SvgPathBuilder, to: PathAbsolutePoint, height: number): SvgPathBuilder {
  // H is the middle of [start, end]
  // C is the perpendicular to [start, end], at point H with length height

  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }
  const [fromX, fromY] = from;
  const [toX, toY] = to;

  const xh = (fromX + toX) / 2;
  const yh = (fromY + toY) / 2;

  const a = fromY - toY;
  const b = toX - fromX;

  const norm = Math.sqrt(a * a + b * b);
  const xc = xh + (a / norm) * height;
  const yc = yh + (b / norm) * height;

  return path.goTo([xc, yc]).goTo(to);
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
