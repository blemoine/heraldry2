import * as React from 'react';
import { computeLineOptions, invertLineOptionNullable, SimpleBlasonShape } from '../blasonDisplay.helper';
import { Dimension } from '../../../model/dimension';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { swissPathBuilder } from '../escutcheon/SwissDisplay';
import { spanishPathBuilder } from '../escutcheon/SpanishDisplay';
import { heaterPathBuilder } from '../escutcheon/HeaterDisplay';
import { cannotHappen } from '../../../../utils/cannot-happen';
import { isError } from '../../../../utils/result';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import { Line } from '../../../model/line';
import { ShieldShape } from '../../../model/configuration';
import { getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { MetalsAndColours, Tincture } from '../../../model/tincture';

const postfixId = 'bordure';

type Props = {
  dimension: Dimension;
  line: Line;
  shape: SimpleBlasonShape;
  shieldShape: ShieldShape;
  fillFromTincture: FillFromTincture;
  tincture: Tincture;
  stroke: MetalsAndColours | null;
  onClick: () => void;
  lineDimension: Dimension;
  styleOnlyInner: boolean;
};
export const BordureDisplay = ({
  dimension,
  line,
  shape,
  shieldShape,
  fillFromTincture,
  onClick,
  tincture,
  stroke,
  lineDimension,
  styleOnlyInner,
}: Props) => {
  const { width, height } = dimension;

  const lineOptionScale = styleOnlyInner ? 1 : 0.5;
  const lineOptions: LineOptions | null =
    line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 75 }
      : computeLineOptions(line, {
          width: dimension.width * lineOptionScale,
          height: dimension.height * lineOptionScale,
        });
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const bordureWidth = lineDimension.width;
  const bordureHeight = lineDimension.height;
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
          .goTo([width / 10, 0], null)
          .arcTo([width - width / 10, 0], { radius: width * 0.9 }, lineOptions)
          .goTo([width, 0], null)
          .goTo([width, height], lineOptions)
          .goTo([0, height], lineOptions)
          .goTo([0, 0], lineOptions);
    } else if (shieldShape === 'spanish' || shieldShape === 'heater') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width / 20, 0], null)
          .goTo([width - width / 20, 0], lineOptions)
          .goTo([width, 0], null)
          .goTo([width, height], lineOptions)
          .goTo([width - width / 20, height], null)
          .goTo([width / 20, height], lineOptions)
          .goTo([0, height], null)
          .goTo([0, 0], lineOptions);
    } else {
      return cannotHappen(shieldShape);
    }
  } else if (shape === 'leftCut') {
    if (shieldShape === 'spanish') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width / 20, 0], null)
          .goTo([width - width / 20, 0], lineOptions)
          .goTo([width, 0], null)
          .goTo([width, height], lineOptions)
          .arcTo([0, height / 5], { radius: width, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else if (shieldShape === 'swiss' || shieldShape === 'heater') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width / 20, 0], null)
          .goTo([width - width / 20, 0], lineOptions)
          .goTo([width, 0], null)
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
          .goTo([width / 20, 0], null)
          .goTo([width - width / 20, 0], lineOptions)
          .goTo([width, 0], null)
          .goTo([width, height / 5], lineOptions)
          .arcTo([0, height], { radius: width, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else if (shieldShape === 'swiss' || shieldShape === 'heater') {
      basePathBuilderFn = ({ width, height }: Dimension, lineOptions: LineOptions | null) =>
        SvgPathBuilder.start([0, 0])
          .goTo([width / 20, 0], null)
          .goTo([width - width / 20, 0], lineOptions)
          .goTo([width, 0], null)
          .goTo([width, (1.5 * height) / 5], lineOptions)
          .arcTo([0, height], { radius: width * 1.7, sweep: 1 }, lineOptions)
          .goTo([0, 0], lineOptions);
    } else {
      return cannotHappen(shieldShape);
    }
  } else {
    return cannotHappen(shape);
  }

  const pathBuilder = basePathBuilderFn(
    { height, width },
    styleOnlyInner || line === 'embattled' ? null : invertedLineOptions
  )
    .moveTo(translateVector)
    .concat(
      basePathBuilderFn({ width: width - 2 * bordureWidth, height: height - 2 * bordureHeight }, lineOptions).translate(
        translateVector
      )
    );
  if (isError(pathBuilder)) {
    throw new Error(`Got ${JSON.stringify(pathBuilder)} error`);
  }

  const strokeColor = stroke
    ? getFill(fillFromTincture, stroke, postfixId)
    : tincture.name === 'sable'
    ? '#777'
    : '#333';
  const strokeWidth = stroke ? 3 : 1;
  const fill = getFill(fillFromTincture, tincture, postfixId);
  return (
    <FocusablePathFromBuilder
      pathBuilder={pathBuilder}
      fill={fill}
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      fillRule={'evenodd'}
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    />
  );
};
