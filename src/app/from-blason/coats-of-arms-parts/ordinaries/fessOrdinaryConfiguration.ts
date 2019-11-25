import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { Fess } from '../../../model/ordinary';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';
import { range } from '../../../../utils/range';

export const fessOrdinaryConfiguration = (dimension: Dimension, ordinary: Fess) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const oneSideOnly = oneSideLineOption(invertedLineOptions);

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };
  const pathBuilderAndTincture = range(0, ordinary.count).map((i) => {
    const startY = ((i * 2 + 1) * height) / (2 * ordinary.count + 1);
    const paleHeight = height / (2 * ordinary.count + 1);

    const pathBuilder = SvgPathBuilder.rectangle(
      [0, startY],
      { width, height: paleHeight },
      { top: invertedLineOptions, bottom: oneSideOnly }
    );

    return { pathBuilder, tincture: ordinary.tincture };
  });
  return { pathBuilderAndTincture, furConfiguration };
};
