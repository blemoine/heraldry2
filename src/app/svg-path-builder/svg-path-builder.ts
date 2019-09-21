import { cannotHappen } from '../../utils/cannot-happen';
import { arePointEquivalent, PathAbsolutePoint } from './geometrical.helper';
import { pointOnEllipticalArc, pointOnQuadraticBezier } from './point-on-elliptical-arc';
import { round } from '../../utils/round';
import { raise, Result } from '../../utils/result';
import { engrailBetweenPoint, indentBetweenPoint } from './line-style.helper';
import { Matrix3, mul, mulVec, rotate3, scale3, translation3 } from './matrix';

type MoveTo = { command: 'M'; point: PathAbsolutePoint };
type GoToPoint = { command: 'L'; point: PathAbsolutePoint };
type Vertical = { command: 'V'; coordinate: number };
type Horizontal = { command: 'H'; coordinate: number };
type QuadraticBezier = { command: 'Q'; point: PathAbsolutePoint; controlPoint: PathAbsolutePoint };
type CubicBezier = { command: 'C'; point: PathAbsolutePoint; controlPoints: [PathAbsolutePoint, PathAbsolutePoint] };
type Arc = {
  command: 'A';
  point: PathAbsolutePoint;
  radius: [number, number];
  xAxisRotation: number;
  largeArcFlag: 0 | 1;
  sweepFlag: 0 | 1;
};
type Close = { command: 'Z' };

type PathCommand = MoveTo | GoToPoint | Arc | Vertical | Horizontal | Close | QuadraticBezier | CubicBezier;

export type EngrailedLineOptions = { line: 'with-arc'; radius: number; sweep: boolean };
export type IndentedLineOptions = { line: 'indented'; height: number; width: number };
export type LineOptions = EngrailedLineOptions | IndentedLineOptions;

function getX(commands: Array<PathCommand>): number | null {
  if (commands.length === 0) {
    return null;
  } else {
    const previousCommand = commands[commands.length - 1];

    if (
      previousCommand.command === 'M' ||
      previousCommand.command === 'L' ||
      previousCommand.command === 'A' ||
      previousCommand.command === 'Q' ||
      previousCommand.command === 'C'
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
      previousCommand.command === 'Q' ||
      previousCommand.command === 'C'
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
        } else if (command.command === 'C') {
          return (
            command.command +
            ' ' +
            round(command.controlPoints[0][0], precision) +
            ' ' +
            round(command.controlPoints[0][1], precision) +
            ' ' +
            round(command.controlPoints[1][0], precision) +
            ' ' +
            round(command.controlPoints[1][1], precision) +
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

  quadraticBezier(
    point: PathAbsolutePoint,
    controlPoint: PathAbsolutePoint,
    lineOptions: LineOptions | null = null
  ): SvgPathBuilder {
    if (lineOptions) {
      const previousPoint = this.currentPoint();
      if (previousPoint === null) {
        return this.addCommand({ command: 'Q', controlPoint, point });
      } else {
        const nextPointFn = (t: number) => pointOnQuadraticBezier(previousPoint, controlPoint, point, t);
        if (lineOptions.line === 'with-arc') {
          return engrailBetweenPoint(this, lineOptions, nextPointFn);
        } else if (lineOptions.line === 'indented') {
          return indentBetweenPoint(this, lineOptions, nextPointFn);
        } else {
          return cannotHappen(lineOptions);
        }
      }
    } else {
      return this.addCommand({ command: 'Q', controlPoint, point });
    }
  }

  cubicBezier(point: PathAbsolutePoint, controlPoints: [PathAbsolutePoint, PathAbsolutePoint]): SvgPathBuilder {
    return this.addCommand({ command: 'C', controlPoints, point });
  }

  relativeGoTo([xOffset, yOffset]: PathAbsolutePoint, lineOptions: LineOptions | null = null): SvgPathBuilder {
    const currentPoint = this.currentPoint();
    if (!currentPoint) {
      return this;
    }
    return this.goTo([currentPoint[0] + xOffset, currentPoint[1] + yOffset], lineOptions);
  }

  goTo(point: PathAbsolutePoint, lineOptions: LineOptions | null = null): SvgPathBuilder {
    if (lineOptions) {
      const previous = this.currentPoint();
      if (previous === null) {
        return this.addCommand({ command: 'L', point });
      } else {
        const nextPointFn = (step: number): PathAbsolutePoint => [
          previous[0] + step * (point[0] - previous[0]),
          previous[1] + step * (point[1] - previous[1]),
        ];
        if (lineOptions.line === 'with-arc') {
          return engrailBetweenPoint(this, lineOptions, nextPointFn);
        } else if (lineOptions.line === 'indented') {
          return indentBetweenPoint(this, lineOptions, nextPointFn);
        } else {
          return cannotHappen(lineOptions);
        }
      }
    } else {
      const previousX = getX(this.commands);

      const firstCommand = this.commands[0];
      const firstPointX = firstCommand ? getX([firstCommand]) : null;
      const firstPointY = firstCommand ? getY([firstCommand]) : null;

      if (firstPointX !== null && firstPointY !== null && arePointEquivalent(point, [firstPointX, firstPointY])) {
        return this.addCommand({ command: 'Z' });
      } else if (previousX !== null && round(previousX, 5) === round(point[0], 5)) {
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
        if (lineOptions.line === 'with-arc') {
          return engrailBetweenPoint(this, lineOptions, nextPointFn);
        } else if (lineOptions.line === 'indented') {
          return indentBetweenPoint(this, lineOptions, nextPointFn);
        } else {
          return cannotHappen(lineOptions);
        }
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

  verticalMirror(verticalLinePosition: number): SvgPathBuilder {
    return this.scale([verticalLinePosition, 0], -1, 1);
  }

  scale(center: PathAbsolutePoint, scaleX: number, scaleY: number): SvgPathBuilder {
    return this.transform(
      mul(translation3(center[0], center[1]), scale3(scaleX, scaleY), translation3(-center[0], -center[1])),
      true
    );
  }

  private transform(transformMatrix: Matrix3, sweepInversion: boolean): SvgPathBuilder {
    function transformPoint(p: PathAbsolutePoint): PathAbsolutePoint {
      const result = mulVec(transformMatrix, [p[0], p[1], 1]);

      return [result[0], result[1]];
    }

    return new SvgPathBuilder(
      this.commands.map(
        (command, i): PathCommand => {
          if (command.command === 'L' || command.command === 'M') {
            return { ...command, point: transformPoint(command.point) };
          } else if (command.command === 'A') {
            return {
              ...command,
              point: transformPoint(command.point),
              sweepFlag: sweepInversion ? (command.sweepFlag === 0 ? 1 : 0) : command.sweepFlag,
            };
          } else if (command.command === 'H') {
            const previousY = getY(this.commands.slice(0, i)) || 0;
            return { command: 'L', point: transformPoint([command.coordinate, previousY]) };
          } else if (command.command === 'V') {
            const previousX = getX(this.commands.slice(0, i)) || 0;
            return { command: 'L', point: transformPoint([previousX, command.coordinate]) };
          } else if (command.command === 'C') {
            return {
              ...command,
              point: transformPoint(command.point),
              controlPoints: [transformPoint(command.controlPoints[0]), transformPoint(command.controlPoints[1])],
            };
          } else if (command.command === 'Q') {
            return {
              ...command,
              point: transformPoint(command.point),
              controlPoint: transformPoint(command.controlPoint),
            };
          } else if (command.command === 'Z') {
            const x = getX([this.commands[0]]) || 0;
            const y = getY([this.commands[0]]) || 0;
            return { command: 'L', point: transformPoint([x, y]) };
          } else {
            return cannotHappen(command);
          }
        }
      )
    );
  }

  translate(translation: PathAbsolutePoint): SvgPathBuilder {
    return this.transform(translation3(translation[0], translation[1]), false);
  }

  rotate(center: PathAbsolutePoint, angleInDegree: number): SvgPathBuilder {
    return this.transform(
      mul(translation3(center[0], center[1]), rotate3(angleInDegree), translation3(-center[0], -center[1])),
      false
    );
  }

  concat(path: SvgPathBuilder): Result<SvgPathBuilder> {
    const lastPoint = this.currentPoint();
    const pathStartPoint = path.getStartPoint();
    if (lastPoint && pathStartPoint && arePointEquivalent(lastPoint, pathStartPoint)) {
      return new SvgPathBuilder(this.commands.concat(path.commands.slice(1)));
    } else {
      return raise(`The current endpoint ${lastPoint} and param startPoint ${pathStartPoint} are not the same`);
    }
  }

  protected getStartPoint(): PathAbsolutePoint | null {
    const commands = [this.commands[0]];
    const x = getX(commands);
    const y = getY(commands);
    if (x === null || y === null) {
      return null;
    }
    return [x, y];
  }
  private addCommand(command: PathCommand): SvgPathBuilder {
    return new SvgPathBuilder([...this.commands, command]);
  }
}
