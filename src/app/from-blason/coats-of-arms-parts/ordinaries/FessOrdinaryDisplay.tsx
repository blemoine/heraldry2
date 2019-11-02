import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Fess } from '../../../model/ordinary';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { CommonOrdinaryDisplay } from './CommonOrdinaryDisplay';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';
import { allDeclaredTincturesOfOrdinary } from '../../blason.helpers';

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
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const oneSideOnly = oneSideLineOption(invertedLineOptions);

  const pathBuilder = SvgPathBuilder.rectangle(
    [0, height / 3],
    { width, height: height / 3 },
    { top: invertedLineOptions, bottom: oneSideOnly }
  );

  const scaleRatio = height / 480;
  const transformProperties: FurTransformProperty = buildFurTransformProperty(
    fillFromTincture,
    allDeclaredTincturesOfOrdinary(ordinary),
    {
      ermine: [{ kind: 'scale', value: 0.66 * scaleRatio }, { kind: 'translate', value: [0, 10] }],
      vair: [{ kind: 'scale', value: 0.56 * scaleRatio }, { kind: 'translate', value: [0, 70] }],
      potent: [{ kind: 'scale', value: 0.815 * scaleRatio }],
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
