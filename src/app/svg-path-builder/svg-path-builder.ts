import { cannotHappen } from '../../utils/cannot-happen';
import { range } from '../../utils/range';
import { PathAbsolutePoint, toDegree } from './geometrical.helper';
import { pointOnEllipticalArc } from './point-on-elliptical-arc';

type Start = { command: 'M'; point: PathAbsolutePoint };
type GoToPoint = { command: 'L'; point: PathAbsolutePoint };
type Vertical = { command: 'V'; coordinate: number };
type Horizontal = { command: 'H'; coordinate: number };
type Arc = {
  command: 'A';
  point: PathAbsolutePoint;
  radius: [number, number];
  xAxisRotation: number;
  largeArcFlag: 0 | 1;
  sweepFlag: 0 | 1;
};
type Close = { command: 'Z' };

type PathCommand = Start | GoToPoint | Arc | Vertical | Horizontal | Close;

export type LineOptions = { line: 'engrailed'; radius: number };

export class SvgPathBuilder {
  static start(startingPoint: PathAbsolutePoint): SvgPathBuilder {
    return new SvgPathBuilder([{ command: 'M', point: startingPoint }]);
  }

  private constructor(private commands: Array<PathCommand>) {}

  toPathAttribute(): string {
    return this.commands
      .map((command) => {
        if (command.command === 'H' || command.command === 'V') {
          return command.command + command.coordinate;
        } else if (command.command === 'M' || command.command === 'L') {
          return command.command + ' ' + command.point[0] + ' ' + command.point[1];
        } else if (command.command === 'Z') {
          return command.command;
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
            command.point[0] +
            ' ' +
            command.point[1]
          );
        } else {
          return cannotHappen(command);
        }
      })
      .join(' ');
  }

  goTo(point: PathAbsolutePoint, lineOptions: LineOptions | null = null): SvgPathBuilder {
    if (lineOptions) {
      if (lineOptions.line === 'engrailed') {
        const previousX = getX(this.commands);
        const previousY = getY(this.commands);

        if (previousX === null || previousY === null) {
          return this.addCommand({ command: 'L', point });
        } else {
          const distance = distanceBetween([previousX, previousY], point);

          const circleCount = Math.floor(distance / lineOptions.radius);
          const circleRradius = distance / circleCount;

          const distanceX = point[0] - previousX;
          const distanceY = point[1] - previousY;

          const c: PathAbsolutePoint = [(point[0] + previousX) / 2, (point[1] + previousY) / 2];

          const cb: PathAbsolutePoint = [c[0] - point[0], c[1] - point[1]];
          const cb1: PathAbsolutePoint = [c[0] + distance, 0];
          const theta = angleBetween(cb, cb1);
          const xAxisRotation = toDegree(-theta);

          return range(0, circleCount).reduce((pathBuilder: SvgPathBuilder, i): SvgPathBuilder => {
            return pathBuilder.arcTo(
              [previousX + ((i + 1) / circleCount) * distanceX, previousY + ((i + 1) / circleCount) * distanceY],
              { radius: [circleRradius, 3 * circleRradius], sweep: 1, xAxisRotation }
            );
          }, this);
        }
      } else {
        return cannotHappen(lineOptions.line);
      }
    } else {
      if (getX(this.commands) === point[0]) {
        return this.addCommand({ command: 'V', coordinate: point[1] });
      } else if (getY(this.commands) === point[1]) {
        return this.addCommand({ command: 'H', coordinate: point[0] });
      } else {
        return this.addCommand({ command: 'L', point });
      }
    }
  }

  arcTo(
    point: PathAbsolutePoint,
    options: { radius: number | [number, number]; xAxisRotation?: number; largeArc?: 0 | 1; sweep?: 0 | 1 },
    lineOptions: LineOptions | null = null
  ): SvgPathBuilder {
    const radius: [number, number] = Array.isArray(options.radius) ? options.radius : [options.radius, options.radius];

    if (lineOptions) {
      if (lineOptions.line === 'engrailed') {
        const previousX = getX(this.commands);
        const previousY = getY(this.commands);

        if (previousX === null || previousY === null) {
          return this.addCommand({
            command: 'A',
            point,
            sweepFlag: options.sweep || 0,
            largeArcFlag: options.largeArc || 0,
            xAxisRotation: options.xAxisRotation || 0,
            radius,
          });
        } else {
          const previousPoint: PathAbsolutePoint = [previousX, previousY];
          const distance = distanceBetween(previousPoint, point);

          const circleCount = Math.floor(distance / lineOptions.radius);
          const circleRradius = distance / circleCount;

          const nextPointFn = (t: number) =>
            pointOnEllipticalArc(
              previousPoint,
              radius[0],
              radius[1],
              options.xAxisRotation || 0,
              options.largeArc === 1,
              options.sweep === 1,
              point,
              t
            );

          return range(0, circleCount).reduce((pathBuilder: SvgPathBuilder, i): SvgPathBuilder => {
            const nextPoint = nextPointFn((i + 1) / circleCount);

            const c: PathAbsolutePoint = [(nextPoint[0] + previousX) / 2, (nextPoint[1] + previousY) / 2];

            const cb: PathAbsolutePoint = [c[0] - nextPoint[0], c[1] - nextPoint[1]];
            const cb1: PathAbsolutePoint = [c[0] + distance, 0];
            const theta = angleBetween(cb, cb1);
            const xAxisRotation = toDegree(-theta);

            return pathBuilder.arcTo(nextPoint, {
              radius: [circleRradius, 3 * circleRradius],
              sweep: 1,
              xAxisRotation,
            });
          }, this);
        }
      } else {
        return cannotHappen(lineOptions.line);
      }
    } else {
      return this.addCommand({
        command: 'A',
        point,
        sweepFlag: options.sweep || 0,
        largeArcFlag: options.largeArc || 0,
        xAxisRotation: options.xAxisRotation || 0,
        radius,
      });
    }
  }

  close(): SvgPathBuilder {
    return this.addCommand({ command: 'Z' });
  }

  private addCommand(command: PathCommand): SvgPathBuilder {
    return new SvgPathBuilder([...this.commands, command]);
  }
}

function distanceBetween(pointA: PathAbsolutePoint, pointB: PathAbsolutePoint): number {
  return Math.sqrt((pointA[0] - pointB[0]) ** 2 + (pointA[1] - pointB[1]) ** 2);
}

function angleBetween([x1, y1]: PathAbsolutePoint, [x2, y2]: PathAbsolutePoint): number {
  return Math.atan2(x1 * y2 - y1 * x2, x1 * x2 + y1 * y2);
}

function getX(commands: Array<PathCommand>): number | null {
  if (commands.length === 0) {
    return null;
  } else {
    const previousCommand = commands[commands.length - 1];

    if (previousCommand.command === 'M' || previousCommand.command === 'L' || previousCommand.command === 'A') {
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

    if (previousCommand.command === 'M' || previousCommand.command === 'L' || previousCommand.command === 'A') {
      return previousCommand.point[1];
    } else if (previousCommand.command === 'V') {
      return previousCommand.coordinate;
    } else if (previousCommand.command === 'H') {
      return getX(commands.slice(0, commands.length - 1));
    } else if (previousCommand.command === 'Z') {
      return getX([commands[0]]);
    } else {
      return cannotHappen(previousCommand);
    }
  }
}
