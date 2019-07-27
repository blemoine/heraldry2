import { cannotHappen } from '../../utils/cannot-happen';

type PathAbsolutePoint = [number, number];

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

  goTo(point: PathAbsolutePoint): SvgPathBuilder {
    if (getX(this.commands) === point[0]) {
      return this.addCommand({ command: 'V', coordinate: point[1] });
    } else if (getY(this.commands) === point[1]) {
      return this.addCommand({ command: 'H', coordinate: point[0] });
    } else {
      return this.addCommand({ command: 'L', point });
    }
  }

  arcTo(
    point: PathAbsolutePoint,
    options: { radius: number | [number, number]; xAxisRotation?: number; largeArc?: 0 | 1; sweep?: 0 | 1 }
  ) {
    const radius: [number, number] = Array.isArray(options.radius) ? options.radius : [options.radius, options.radius];
    return this.addCommand({
      command: 'A',
      point,
      sweepFlag: options.sweep || 0,
      largeArcFlag: options.largeArc || 0,
      xAxisRotation: options.xAxisRotation || 0,
      radius,
    });
  }

  close(): SvgPathBuilder {
    return this.addCommand({ command: 'Z' });
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
