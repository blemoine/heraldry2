import {
  arePointEquivalent,
  distanceBetween,
  PathAbsolutePoint,
  pointBetween,
  pointOnLine,
} from './geometrical.helper';
import { range } from '../../utils/range';
import {
  DovetailedLineOptions,
  EmbattledLineOptions,
  EngrailedLineOptions,
  IndentedLineOptions,
  PotentyLineOptions,
  SvgPathBuilder,
  UrdyLineOptions,
  WavyLineOptions,
} from './svg-path-builder';

function getPerpendicularPoint(
  [[fromX, fromY], [toX, toY]]: readonly [PathAbsolutePoint, PathAbsolutePoint],
  [xh, yh]: PathAbsolutePoint,
  height: number
): PathAbsolutePoint {
  // C is the perpendicular to [start, end], at point H with length height

  const a = fromY - toY;
  const b = toX - fromX;

  const norm = Math.sqrt(a * a + b * b);
  const xc = xh + (a / norm) * height;
  const yc = yh + (b / norm) * height;

  return [xc, yc];
}

function getPerpendicularPointToCenter(
  from: PathAbsolutePoint,
  to: PathAbsolutePoint,
  height: number
): PathAbsolutePoint {
  // H is the middle of [start, end]
  // C is the perpendicular to [start, end], at point H with length height
  const [fromX, fromY] = from;
  const [toX, toY] = to;
  const xh = (fromX + toX) / 2;
  const yh = (fromY + toY) / 2;

  return getPerpendicularPoint([from, to], [xh, yh], height);
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

function waveLineTo(path: SvgPathBuilder, to: PathAbsolutePoint, height: number): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }

  const middle = pointBetween(from, to);

  return path
    .quadraticBezier(middle, getPerpendicularPointToCenter(from, middle, height))
    .quadraticBezier(to, getPerpendicularPointToCenter(middle, to, -height));
}

function urdyLineTo(path: SvgPathBuilder, to: PathAbsolutePoint, height: number): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }
  const middle = pointBetween(from, to);
  const firstHalf = pointBetween(from, middle);
  const lastHalf = pointBetween(middle, to);
  const line = [from, to] as const;
  return path
    .goTo(getPerpendicularPoint(line, from, height / 2 - height / 2))
    .goTo(getPerpendicularPoint(line, firstHalf, height - height / 2))
    .goTo(getPerpendicularPoint(line, middle, height / 2 - height / 2))
    .goTo(getPerpendicularPoint(line, middle, -height / 2 - height / 2))
    .goTo(getPerpendicularPoint(line, lastHalf, -height - height / 2))
    .goTo(getPerpendicularPoint(line, to, -height / 2 - height / 2))
    .goTo(to);
}

function dovetailedLineTo(path: SvgPathBuilder, to: PathAbsolutePoint, height: number): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }
  const line = [from, to] as const;
  return path
    .goTo(pointOnLine(from, to, 100 / 3))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, 100 / 6), height))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, (100 * 5) / 6), height))
    .goTo(pointOnLine(from, to, (100 * 2) / 3))
    .goTo(to);
}

function potentyLineTo(path: SvgPathBuilder, to: PathAbsolutePoint, height: number): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }
  const line = [from, to] as const;
  return path
    .goTo(pointOnLine(from, to, 100 / 3))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, 100 / 3), height / 2))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, 100 / 6), height / 2))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, 100 / 6), height))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, (100 * 5) / 6), height))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, (100 * 5) / 6), height / 2))
    .goTo(getPerpendicularPoint(line, pointOnLine(from, to, (100 * 2) / 3), height / 2))
    .goTo(pointOnLine(from, to, (100 * 2) / 3))
    .goTo(to);
}

function embattleLineTo(
  path: SvgPathBuilder,
  to: PathAbsolutePoint,
  height: number,
  halfOffset: boolean
): SvgPathBuilder {
  const from = path.currentPoint();
  if (!from || arePointEquivalent(from, to)) {
    return path;
  }

  const midTier1 = pointOnLine(from, to, 25);
  const midTier2 = pointOnLine(from, to, 75);
  const middle = pointBetween(from, to);

  if (halfOffset) {
    const perpendicularToTier1 = getPerpendicularPointToCenter(from, middle, -height);
    const perpendicularToTier2 = getPerpendicularPointToCenter(middle, to, -height);
    return path
      .goTo(midTier1)
      .goTo(perpendicularToTier1)
      .goTo(perpendicularToTier2)
      .goTo(midTier2)
      .goTo(to);
  } else {
    const perpendicularToTier1 = getPerpendicularPointToCenter(from, middle, height);
    const perpendicularToTier2 = getPerpendicularPointToCenter(middle, to, height);
    return path
      .goTo(midTier1)
      .goTo(perpendicularToTier1)
      .goTo(perpendicularToTier2)
      .goTo(midTier2)
      .goTo(to);
  }
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
    const to = dichotomizePoint(result.currentPoint()!, [i, i + 2]);

    return drawFn(result, to);
  }, path);
}

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

export function waveBetweenPoint(
  path: SvgPathBuilder,
  lineOption: WavyLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.width, parametricPath, (result, to) =>
    waveLineTo(result, to, lineOption.height)
  );
}

export function embattleBetweenPoint(
  path: SvgPathBuilder,
  lineOption: EmbattledLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.width, parametricPath, (result, to) =>
    embattleLineTo(result, to, lineOption.height, !!lineOption.halfOffset)
  );
}

export function urdyBetweenPoint(
  path: SvgPathBuilder,
  lineOption: UrdyLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.width, parametricPath, (result, to) =>
    urdyLineTo(result, to, lineOption.height)
  );
}

export function dovetailedBetweenPoint(
  path: SvgPathBuilder,
  lineOption: DovetailedLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.width, parametricPath, (result, to) =>
    dovetailedLineTo(result, to, lineOption.height)
  );
}

export function potentyBetweenPoint(
  path: SvgPathBuilder,
  lineOption: PotentyLineOptions,
  parametricPath: (t: number) => PathAbsolutePoint
): SvgPathBuilder {
  return drawBetweenPoint(path, lineOption.width, parametricPath, (result, to) =>
    potentyLineTo(result, to, lineOption.height)
  );
}
