import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { Base } from '../../../model/ordinary';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

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

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  return { pathBuilderAndTincture, furConfiguration };
};
