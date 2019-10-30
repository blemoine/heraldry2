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
    return { line: 'indented', height: height / 30, width: width / 10, verticalOffset: 100 };
  } else if (line === 'dancetty') {
    return { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 25 };
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
  } else if (line === 'dovetailed') {
    return { line: 'dovetailed', height: height / 50, width: width / 9 };
  } else if (line === 'potenty') {
    return { line: 'potenty', height: height / 50, width: width / 9 };
  } else if (line === 'raguly') {
    return { line: 'raguly', height: height / 50, width: width / 9, direction: 'right' };
  } else if (line === 'straight') {
    return null;
  } else {
    return cannotHappen(line);
  }
}

export function invertLineOptions(lineOptions: LineOptions): LineOptions {
  if (
    lineOptions.line === 'indented' ||
    lineOptions.line === 'embattled' ||
    lineOptions.line === 'dovetailed' ||
    lineOptions.line === 'potenty'
  ) {
    return { ...lineOptions, height: -lineOptions.height };
  } else if (lineOptions.line === 'with-arc') {
    return { ...lineOptions, sweep: !lineOptions.sweep };
  } else if (lineOptions.line === 'wavy' || lineOptions.line === 'urdy') {
    return lineOptions;
  } else if (lineOptions.line === 'raguly') {
    return {
      ...lineOptions,
      height: -lineOptions.height,
      direction: lineOptions.direction === 'left' ? 'right' : 'left',
    };
  } else {
    return cannotHappen(lineOptions);
  }
}

export function invertLineOptionNullable(lineOptions: LineOptions | null): LineOptions | null {
  if (!lineOptions) {
    return null;
  } else {
    return invertLineOptions(lineOptions);
  }
}

export function oneSideLineOption(lineOptions: LineOptions | null): LineOptions | null {
  if (!lineOptions) {
    return null;
  }
  if ('oneSideOnly' in lineOptions && lineOptions.oneSideOnly) {
    return null;
  } else if ('halfOffset' in lineOptions && lineOptions.halfOffset !== null) {
    return { ...lineOptions, halfOffset: true };
  } else if (lineOptions.line === 'urdy') {
    return { ...lineOptions, height: -lineOptions.height };
  } else if (lineOptions.line === 'raguly') {
    return { ...lineOptions, direction: lineOptions.direction === 'left' ? 'right' : 'left' };
  } else if (lineOptions.line === 'indented' && lineOptions.verticalOffset !== 100) {
    return { ...lineOptions, verticalOffset: 75 };
  } else {
    return lineOptions;
  }
}

export const chiefHeightRatio = 1 / 5;

export type SimpleBlasonShape = 'default' | 'square' | 'leftCut' | 'rightCut';
