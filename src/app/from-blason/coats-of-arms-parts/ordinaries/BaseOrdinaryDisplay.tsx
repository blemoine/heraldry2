import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Base } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';

const postfixId = 'base';

type Props = {
  dimension: Dimension;
  ordinary: Base;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const BaseOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const baseHeight = height / 4;

  const pathBuilder = SvgPathBuilder.rectangle(
    [0, height - baseHeight],
    { width, height: baseHeight },
    { top: invertedLineOptions }
  );
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: 0.65 * scaleRatio }, { kind: 'translate', value: [0, 30] }],
    vair: [{ kind: 'scale', value: 0.55 * scaleRatio }, { kind: 'translate', value: [0, 5] }],
    potent: [{ kind: 'scale', value: 0.92 * scaleRatio }],
  });

  return (
    <CommonOrdinaryDisplay
      fillFromTincture={fillFromTincture}
      onClick={onClick}
      transformProperties={transformProperties}
      pathBuilderAndTincture={pathBuilderAndTincture}
      postfixId={postfixId}
    />
  );
};
