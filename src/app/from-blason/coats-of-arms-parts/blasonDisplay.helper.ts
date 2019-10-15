import { Line } from '../../model/line';
import { Dimension } from '../../model/dimension';
import { LineOptions } from '../../svg-path-builder/svg-path-builder';
import { cannotHappen } from '../../../utils/cannot-happen';

export function computeLineOptions(line: Line, { width, height }: Dimension): LineOptions | null {
  if (line === 'engrailed') {
    const radius = width / 10;
    return { line: 'with-arc', radius, sweep: true };
  } else if (line === 'invected') {
    const radius = width / 10;
    return { line: 'with-arc', radius, sweep: false };
  } else if (line === 'indented') {
    return { line: 'indented', height: height / 30, width: width / 10 };
  } else if (line === 'wavy') {
    return { line: 'wavy', height: height / 50, width: width / 9 };
  } else if (line === 'bretessed') {
    return { line: 'embattled', height: height / 30, width: width / 9, oneSideOnly: false, halfOffset: null };
  } else if (line === 'embattled-counter-embattled') {
    return { line: 'embattled', height: height / 30, width: width / 9, oneSideOnly: false, halfOffset: false };
  } else if (line === 'embattled') {
    return { line: 'embattled', height: height / 30, width: width / 9, oneSideOnly: true, halfOffset: null };
  } else if (line === 'urdy') {
    return { line: 'urdy', height: height / 35, width: width / 9 };
  } else if (line === 'straight') {
    return null;
  } else {
    return cannotHappen(line);
  }
}

export function invertLineOptions(lineOptions: LineOptions): LineOptions {
  if (lineOptions.line === 'indented' || lineOptions.line === 'embattled') {
    return { ...lineOptions, height: -lineOptions.height };
  } else if (lineOptions.line === 'with-arc') {
    return { ...lineOptions, sweep: !lineOptions.sweep };
  } else if (lineOptions.line === 'wavy' || lineOptions.line === 'urdy') {
    return lineOptions;
  } else {
    return cannotHappen(lineOptions);
  }
}

export const chiefHeightRatio = 1 / 5;

export type SimpleBlasonShape = 'default' | 'square' | 'leftCut' | 'rightCut';
