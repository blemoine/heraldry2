import { Dimension } from '../../../model/dimension';
import { Quarter } from '../../../model/ordinary';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

export const quarterOrdinaryConfiguration = (dimension: Dimension, ordinary: Quarter) => {
  const { width, height } = dimension;

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const pathBuilder = SvgPathBuilder.rectangle(
    [0, 0],
    { width: width / 2, height: height / 2 },
    { right: invertedLineOptions, bottom: invertedLineOptions }
  );
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];
  return { pathBuilderAndTincture, furConfiguration };
};
