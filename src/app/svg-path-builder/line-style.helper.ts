import { arePointEquivalent, distanceBetween, PathAbsolutePoint } from './geometrical.helper';
import { range } from '../../utils/range';
import { EngrailedLineOptions, IndentedLineOptions, SvgPathBuilder } from './svg-path-builder';

export function indentBetweenPoint(
  path: SvgPathBuilder,
  lineOption: IndentedLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.width, parametricPath, (result, to) =>
    indentLineTo(result, to, lineOption.height)
  );
}

export function engrailBetweenPoint(
  path: SvgPathBuilder,
  lineOption: EngrailedLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.radius, parametricPath, (result, to) =>
    engrailedLineTo(result, to, lineOption.radius, lineOption.sweep)
  );
}

function drawBetweenPoint(
  path: SvgPathBuilder,
  width: number,
  parametricPath: (t: number) => PathAbsolutePoint,
  drawFn: (path: SvgPathBuilder, to: PathAbsolutePoint) => SvgPathBuilder
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
  const pointCount = Math.ceil(distanceToCover / width);

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

    return drawFn(result, to);
  }, path);
}

export function indentLineTo(path: SvgPathBuilder, to: PathAbsolutePoint, height: number): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }

  return path.goTo(getPerpendicularPointToCenter(from, to, height)).goTo(to);
}

export function engrailedLineTo(
  path: SvgPathBuilder,
  to: PathAbsolutePoint,
  height: number,
  sweep: boolean
): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }
  return path.quadraticBezier(
    to,
    sweep ? getPerpendicularPointToCenter(to, from, height) : getPerpendicularPointToCenter(from, to, height),
    null
  );
}

function getPerpendicularPointToCenter(
  [fromX, fromY]: PathAbsolutePoint,
  [toX, toY]: PathAbsolutePoint,
  height: number
): PathAbsolutePoint {
  // H is the middle of [start, end]
  // C is the perpendicular to [start, end], at point H with length height

  const xh = (fromX + toX) / 2;
  const yh = (fromY + toY) / 2;

  const a = fromY - toY;
  const b = toX - fromX;

  const norm = Math.sqrt(a * a + b * b);
  const xc = xh + (a / norm) * height;
  const yc = yh + (b / norm) * height;

  return [xc, yc];
}