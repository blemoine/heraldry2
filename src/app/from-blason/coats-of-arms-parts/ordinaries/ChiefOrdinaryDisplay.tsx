import { chiefHeightRatio, computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { Chief } from '../../../model/ordinary';
import { Dimension } from '../../../model/dimension';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';

const postfixId = 'chief';

type Props = {
  dimension: Dimension;
  ordinary: Chief;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const ChiefOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const chiefHeight = height * chiefHeightRatio;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const computedHeight =
    chiefHeight +
    (lineOptions && lineOptions.line === 'with-arc'
      ? lineOptions.radius
      : lineOptions && lineOptions.line === 'indented'
      ? lineOptions.height
      : 0);

  const pathBuilder = SvgPathBuilder.rectangle(
    [0, 0],
    { width, height: computedHeight },
    { bottom: invertedLineOptions }
  );

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(
    fillFromTincture,
    allDeclaredTincturesOfOrdinary(ordinary),
    {
      ermine: { kind: 'scale', value: 0.55 * scaleRatio },
      vair: { kind: 'scale', value: 0.66 * scaleRatio },
      potent: { kind: 'scale', value: 0.8 * scaleRatio },
    }
  );
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

  return (
    <CommonOrdinaryDisplay
      fillFromTincture={fillFromTincture}
      onClick={onClick}
      transformProperties={transformProperties}
      pathBuilderAndTincture={pathBuilderAndTincture}
      postfixId={postfixId}
      stroke={ordinary.fimbriated}
    />
  );
};
