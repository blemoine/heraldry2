import { cannotHappen } from '../../utils/cannot-happen';
import { range } from '../../utils/range';
import { angleBetween, distanceBetween, PathAbsolutePoint, toDegree } from './geometrical.helper';
import { pointOnEllipticalArc } from './point-on-elliptical-arc';
import { round } from '../../utils/round';

type MoveTo = { command: 'M'; point: PathAbsolutePoint };
type GoToPoint = { command: 'L'; point: PathAbsolutePoint };
type Vertical = { command: 'V'; coordinate: number };
type Horizontal = { command: 'H'; coordinate: number };
type QuadraticBezier = { command: 'Q'; point: PathAbsolutePoint; controlPoint: PathAbsolutePoint };
type Arc = {
  command: 'A';
  point: PathAbsolutePoint;
  radius: [number, number];
  xAxisRotation: number;
  largeArcFlag: 0 | 1;
  sweepFlag: 0 | 1;
};
type Close = { command: 'Z' };

type PathCommand = MoveTo | GoToPoint | Arc | Vertical | Horizontal | Close | QuadraticBezier;

export type EngrailedLineOptions = { line: 'with-arc'; radius: number; sweep: boolean };
export type LineOptions = EngrailedLineOptions;

export class SvgPathBuilder {
  static start(startingPoint: PathAbsolutePoint): SvgPathBuilder {
    return new SvgPathBuilder([{ command: 'M', point: startingPoint }]);
  }

  private constructor(private commands: Array<PathCommand>) {}

  toPathAttribute(): string {
    const precision = 5;
    return this.commands
      .map((command) => {
        if (command.command === 'H' || command.command === 'V') {
          return command.command + round(command.coordinate, precision);
        } else if (command.command === 'M' || command.command === 'L') {
          return command.command + ' ' + round(command.point[0], precision) + ' ' + round(command.point[1], precision);
        } else if (command.command === 'Z') {
          return command.command;
        } else if (command.command === 'Q') {
          return (
            command.command +
            ' ' +
            round(command.controlPoint[0], precision) +
            ' ' +
            round(command.controlPoint[1], precision) +
            ' ' +
            round(command.point[0], precision) +
            ' ' +
            round(command.point[1], precision)
          );
        } else if (command.command === 'A') {
          return (
            command.command +
            command.radius[0] +
            ' ' +
            command.radius[1] +
            ' ' +
            command.xAxisRotation +
            ' ' +
            command.largeArcFlag +
            ' ' +
            command.sweepFlag +
            ' ' +
            round(command.point[0], precision) +
            ' ' +
            round(command.point[1], precision)
          );
        } else {
          return cannotHappen(command);
        }
      })
      .join(' ');
  }

  moveTo(point: PathAbsolutePoint): SvgPathBuilder {
    return this.addCommand({ command: 'M', point });
  }

  horizontalMove(size: number): SvgPathBuilder {
    const currentPoint = this.currentPoint();
    if (currentPoint) {
      const coordinate = currentPoint[0] + size;
      return this.addCommand({ command: 'H', coordinate });
    } else {
      return this;
    }
  }
  verticalMove(size: number): SvgPathBuilder {
    const currentPoint = this.currentPoint();
    if (currentPoint) {
      const coordinate = currentPoint[1] + size;
      return this.addCommand({ command: 'V', coordinate });
    } else {
      return this;
    }
  }

  quadraticeBezier(point: PathAbsolutePoint, controlPoint: PathAbsolutePoint): SvgPathBuilder {
    return this.addCommand({ command: 'Q', controlPoint, point });
  }

  goTo(point: PathAbsolutePoint, lineOptions: LineOptions | null = null): SvgPathBuilder {
    if (lineOptions) {
      if (lineOptions.line === 'with-arc') {
        const previous = this.currentPoint();

        if (previous === null) {
          return this.addCommand({ command: 'L', point });
        } else {
          const nextPointFn = (step: number): PathAbsolutePoint => [
            previous[0] + step * (point[0] - previous[0]),
            previous[1] + step * (point[1] - previous[1]),
          ];

          return engrailedBetweenPoints(this, point, lineOptions, nextPointFn);
        }
      } else {
        return cannotHappen(lineOptions.line);
      }
    } else {
      const previousX = getX(this.commands);
      if (previousX !== null && round(previousX, 5) === round(point[0], 5)) {
        return this.addCommand({ command: 'V', coordinate: point[1] });
      } else {
        const previousY = getY(this.commands);
        if (previousY !== null && round(previousY, 5) === round(point[1], 5)) {
          return this.addCommand({ command: 'H', coordinate: point[0] });
        } else {
          return this.addCommand({ command: 'L', point });
        }
      }
    }
  }

  relativeArcTo(
    [relativeMoveX, relativeMoveY]: PathAbsolutePoint,
    options: { radius: number | [number, number]; xAxisRotation?: number; largeArc?: 0 | 1; sweep?: 0 | 1 },
    lineOptions: LineOptions | null = null
  ): SvgPathBuilder {
    const point = this.currentPoint();
    if (!point) {
      return this;
    }
    return this.arcTo([point[0] + relativeMoveX, point[1] + relativeMoveY], options, lineOptions);
  }

  arcTo(
    point: PathAbsolutePoint,
    options: { radius: number | [number, number]; xAxisRotation?: number; largeArc?: 0 | 1; sweep?: 0 | 1 },
    lineOptions: LineOptions | null = null
  ): SvgPathBuilder {
    const radius: [number, number] = Array.isArray(options.radius) ? options.radius : [options.radius, options.radius];
    const xAxisRotation = options.xAxisRotation || 0;
    const sweepFlag = options.sweep || 0;
    const largeArcFlag = options.largeArc || 0;

    if (lineOptions) {
      if (lineOptions.line === 'with-arc') {
        const previousPoint = this.currentPoint();

        if (previousPoint === null) {
          return this.addCommand({
            command: 'A',
            point,
            sweepFlag,
            largeArcFlag,
            xAxisRotation,
            radius,
          });
        } else {
          const nextPointFn = (t: number) =>
            pointOnEllipticalArc(
              previousPoint,
              radius[0],
              radius[1],
              xAxisRotation,
              options.largeArc === 1,
              options.sweep === 1,
              point,
              t
            );

          return engrailedBetweenPoints(this, point, lineOptions, nextPointFn);
        }
      } else {
        return cannotHappen(lineOptions.line);
      }
    } else {
      return this.addCommand({
        command: 'A',
        point,
        sweepFlag,
        largeArcFlag,
        xAxisRotation,
        radius,
      });
    }
  }

  close(): SvgPathBuilder {
    return this.addCommand({ command: 'Z' });
  }

  currentPoint(): PathAbsolutePoint | null {
    const x = getX(this.commands);
    const y = getY(this.commands);
    if (x === null || y === null) {
      return null;
    } else {
      return [x, y];
    }
  }

  private addCommand(command: PathCommand): SvgPathBuilder {
    return new SvgPathBuilder([...this.commands, command]);
  }
}

function getX(commands: Array<PathCommand>): number | null {
  if (commands.length === 0) {
    return null;
  } else {
    const previousCommand = commands[commands.length - 1];

    if (
      previousCommand.command === 'M' ||
      previousCommand.command === 'L' ||
      previousCommand.command === 'A' ||
      previousCommand.command === 'Q'
    ) {
      return previousCommand.point[0];
    } else if (previousCommand.command === 'H') {
      return previousCommand.coordinate;
    } else if (previousCommand.command === 'V') {
      return getX(commands.slice(0, commands.length - 1));
    } else if (previousCommand.command === 'Z') {
      return getX([commands[0]]);
    } else {
      return cannotHappen(previousCommand);
    }
  }
}

function getY(commands: Array<PathCommand>): number | null {
  if (commands.length === 0) {
    return null;
  } else {
    const previousCommand = commands[commands.length - 1];

    if (
      previousCommand.command === 'M' ||
      previousCommand.command === 'L' ||
      previousCommand.command === 'A' ||
      previousCommand.command === 'Q'
    ) {
      return previousCommand.point[1];
    } else if (previousCommand.command === 'V') {
      return previousCommand.coordinate;
    } else if (previousCommand.command === 'H') {
      return getY(commands.slice(0, commands.length - 1));
    } else if (previousCommand.command === 'Z') {
      return getY([commands[0]]);
    } else {
      return cannotHappen(previousCommand);
    }
  }
}

function engrailedBetweenPoints(
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
