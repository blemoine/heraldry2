import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { Fess } from '../../../model/ordinary';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';

export const fessOrdinaryConfiguration = (dimension: Dimension, ordinary: Fess) => {
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
  const transformPropertiesConfiguration = {
    ermine: [{ kind: 'scale', value: 0.66 * scaleRatio }, { kind: 'translate', value: [0, 10] }],
    vair: [{ kind: 'scale', value: 0.56 * scaleRatio }, { kind: 'translate', value: [0, 70] }],
    potent: [{ kind: 'scale', value: 0.815 * scaleRatio }],
  } as const;
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];
  return { pathBuilderAndTincture, transformPropertiesConfiguration };
};
