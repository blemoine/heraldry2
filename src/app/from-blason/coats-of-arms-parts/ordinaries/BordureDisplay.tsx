import * as React from 'react';
import { computeLineOptions, SimpleBlasonShape } from '../blasonDisplay.helper';
import { Dimension } from '../../../model/dimension';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { swissPathBuilder } from '../escutcheon/SwissDisplay';
import { spanishPathBuilder } from '../escutcheon/SpanishDisplay';
import { heaterPathBuilder } from '../escutcheon/HeaterDisplay';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { isError } from '../../../../utils/result';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { Line } from '../../../model/line';
import { ShieldShape } from '../../../model/configuration';

type Props = { dimension: Dimension; line: Line; shape: SimpleBlasonShape; shieldShape: ShieldShape; fill: string };
export const BordureDisplay = ({ dimension, line, shape, shieldShape, fill }: Props) => {
  const { width, height } = dimension;

  const lineOptions = computeLineOptions(line, dimension);

  const bordureWidth = width / 10;
  const bordureHeight = height / 10;
  const translateVector = [bordureWidth, bordureHeight] as const;

  let basePathBuilderFn: (dimension: Dimension, lineOptions: LineOptions | null) => SvgPathBuilder;
  if (shape === 'default') {
    if (shieldShape === 'swiss') {
      basePathBuilderFn = swissPathBuilder;
    } else if (shieldShape === 'spanish') {
      basePathBuilderFn = spanishPathBuilder;
    } else if (shieldShape === 'heater') {
      basePathBuilderFn = heaterPathBuilder;
    } else {
      return cannotHappen(shieldShape);
    }
  } else if (shape === 'square') {
    if (shieldShape === 'swiss') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .arcTo([width, 0], { radius: width * 0.9 }, lineOptions)
          .goTo([width, height], lineOptions)
          .goTo([0, height], lineOptions)
          .goTo([0, 0], lineOptions);
    } else if (shieldShape === 'spanish' || shieldShape === 'heater') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width, 0], lineOptions)
          .goTo([width, height], lineOptions)
          .goTo([0, height], lineOptions)
          .goTo([0, 0], lineOptions);
    } else {
      return cannotHappen(shieldShape);
    }
  } else if (shape === 'leftCut') {
    if (shieldShape === 'spanish') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width, 0], lineOptions)
          .goTo([width, height], lineOptions)
          .arcTo([0, height / 5], { radius: width, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else if (shieldShape === 'swiss' || shieldShape === 'heater') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width, 0], lineOptions)
          .goTo([width, height], lineOptions)
          .arcTo([0, (1.5 * height) / 5], { radius: width * 1.7, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else {
      return cannotHappen(shieldShape);
    }
  } else if (shape === 'rightCut') {
    if (shieldShape === 'spanish') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width, 0], lineOptions)
          .goTo([width, height / 5], lineOptions)
          .arcTo([0, height], { radius: width, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else if (shieldShape === 'swiss' || shieldShape === 'heater') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width, 0], lineOptions)
          .goTo([width, (1.5 * height) / 5], lineOptions)
          .arcTo([0, height], { radius: width * 1.7, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else {
      return cannotHappen(shieldShape);
    }
  } else {
    return cannotHappen(shape);
  }

  const pathBuilder = basePathBuilderFn({ height, width }, null)
    .moveTo(translateVector)
    .concat(
      basePathBuilderFn({ width: width - 2 * bordureWidth, height: height - 2 * bordureHeight }, lineOptions).translate(
        translateVector
      )
    );
  if (isError(pathBuilder)) {
    throw new Error(`Got ${JSON.stringify(pathBuilder)} error`);
  }

  return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke="#333" fillRule={'evenodd'} />;
};
