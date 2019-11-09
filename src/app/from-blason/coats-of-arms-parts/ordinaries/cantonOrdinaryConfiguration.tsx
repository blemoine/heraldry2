import { Dimension } from '../../../model/dimension';
import { Canton } from '../../../model/ordinary';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';

const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

export const cantonOrdinaryConfiguration = (dimension: Dimension, ordinary: Canton) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformPropertiesConfiguration = {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  } as const;

  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const pathBuilder = SvgPathBuilder.rectangle(
    [0, 0],
    { width: width / 3, height: height / 3 },
    { right: invertedLineOptions, bottom: invertedLineOptions }
  );
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

  return { transformPropertiesConfiguration, pathBuilderAndTincture };
};