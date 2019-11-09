import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { Base } from '../../../model/ordinary';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurTransformPropertyConfiguration } from '../FurPattern.model';

export const baseOrdinaryConfiguration = (dimension: Dimension, ordinary: Base) => {
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
  const transformPropertiesConfiguration: FurTransformPropertyConfiguration = {
    ermine: [{ kind: 'scale', value: 0.65 * scaleRatio }, { kind: 'translate', value: [0, 30] }],
    vair: [{ kind: 'scale', value: 0.55 * scaleRatio }, { kind: 'translate', value: [0, 5] }],
    potent: [{ kind: 'scale', value: 0.92 * scaleRatio }],
  };

  return { pathBuilderAndTincture, transformPropertiesConfiguration };
};
