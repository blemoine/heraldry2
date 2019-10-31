import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Pale } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';
import { range } from '../../../../utils/range';

const postfixId = 'pale';

type Props = {
  dimension: Dimension;
  ordinary: Pale;
  fillFromTincture: FillFromTincture;
  onClick: () => void;
};
export const PaleOrdinaryDisplay = ({ dimension, ordinary, fillFromTincture, onClick }: Props) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const oneSideOnly = oneSideLineOption(invertedLineOptions);

  const pathBuilderAndTincture = range(0, ordinary.count).map((i) => {
    const startX = ((i * 2 + 1) * width) / (2 * ordinary.count + 1);
    const paleWidth = width / (2 * ordinary.count + 1);
    return {
      pathBuilder: SvgPathBuilder.rectangle(
        [startX, 0],
        { width: paleWidth, height },
        { left: oneSideOnly, right: invertedLineOptions }
      ),

      tincture: ordinary.tincture,
    };
  });

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: 0.4 * scaleRatio }, { kind: 'translate', value: [0, 0] }],
    vair: [{ kind: 'scale', value: 0.33 * scaleRatio }, { kind: 'translate', value: [0, 0] }],
    potent: [{ kind: 'scale', value: 0.25 * scaleRatio }, { kind: 'translate', value: [25, 0] }],
  });

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
