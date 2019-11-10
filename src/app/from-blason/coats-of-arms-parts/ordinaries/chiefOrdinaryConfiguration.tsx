import { chiefHeightRatio, computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Chief } from '../../../model/ordinary';
import { Dimension } from '../../../model/dimension';

export const chiefOrdinaryConfiguration = (dimension: Dimension, ordinary: Chief) => {
  const { width, height } = dimension;
  const chiefHeight = height * chiefHeightRatio;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const computedHeight =
    chiefHeight +
    (lineOptions?.line === 'with-arc' ? lineOptions.radius : lineOptions?.line === 'indented' ? lineOptions.height : 0);

  const pathBuilder = SvgPathBuilder.rectangle(
    [0, 0],
    { width, height: computedHeight },
    { bottom: invertedLineOptions }
  );

  const scaleRatio = height / 480;
  const transformPropertiesConfiguration = {
    ermine: { kind: 'scale', value: 0.55 * scaleRatio },
    vair: { kind: 'scale', value: 0.66 * scaleRatio },
    potent: { kind: 'scale', value: 0.8 * scaleRatio },
  } as const;
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];
  return { pathBuilderAndTincture, transformPropertiesConfiguration };
};
