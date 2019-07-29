import { Line } from '../../model/line';
import { Dimension } from '../../model/dimension';
import { LineOptions } from '../../svg-path-builder/svg-path-builder';
import { cannotHappen } from '../../../utils/cannot-happen';

export function computeLineOptions(line: Line, { width }: Dimension): LineOptions | null {
  if (line === 'engrailed') {
    const radius = width / 10;
    return { line: 'with-arc', radius, sweep: true };
  } else if (line === 'invected') {
    const radius = width / 10;
    return { line: 'with-arc', radius, sweep: false };
  } else if (line === 'straight') {
    return null;
  } else {
    return cannotHappen(line);
  }
}
