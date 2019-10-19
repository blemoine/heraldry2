import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Fess } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';

const postfixId = 'fess';

type Props = {
  dimension: Dimension;
  ordinary: Fess;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const FessOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const pathBuilder = SvgPathBuilder.start([0, height / 3])
    .goTo([0, (2 * height) / 3])
    .goTo([width, (2 * height) / 3], oneSideOnly)
    .goTo([width, height / 3])
    .goTo([0, height / 3], lineOptions);

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: 0.66 * scaleRatio }, { kind: 'translate', value: [0, 10] }],
    vair: [{ kind: 'scale', value: 0.56 * scaleRatio }, { kind: 'translate', value: [0, 70] }],
    potent: [{ kind: 'scale', value: 0.815 * scaleRatio }],
  });

  return (
    <CommonOrdinaryDisplay
      tincture={ordinary.tincture}
      fillFromTincture={fillFromTincture}
      onClick={onClick}
      transformProperties={transformProperties}
      pathBuilder={pathBuilder}
      postfixId={postfixId}
    />
  );
};
