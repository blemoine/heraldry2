import { chiefHeightRatio, computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Chief } from '../../../model/ordinary';
import { Dimension } from '../../../model/dimension';
import { FurConfiguration } from '../FurPatternDef';

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

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];
  return { pathBuilderAndTincture, furConfiguration };
};
