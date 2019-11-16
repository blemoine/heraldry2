import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { Pale } from '../../../model/ordinary';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { range } from '../../../../utils/range';
import { FurConfiguration } from '../FurPatternDef';

export const paleOrdinaryConfiguration = (dimension: Dimension, ordinary: Pale) => {
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

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };
  return { pathBuilderAndTincture, furConfiguration };
};
