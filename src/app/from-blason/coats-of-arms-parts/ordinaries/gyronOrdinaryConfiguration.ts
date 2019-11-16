import { Dimension } from '../../../model/dimension';
import { Gyron } from '../../../model/ordinary';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

export const gyronOrdinaryConfiguration = (dimension: Dimension, ordinary: Gyron) => {
  const { width, height } = dimension;

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  const lineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 75 }
      : computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goToWithPartFlat([width / 2, height / 2], invertedLineOptions, 10, 'end')
    .goToWithPartFlat([0, height / 2], invertedLineOptions, 10, 'start')
    .close();
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];
  return { pathBuilderAndTincture, furConfiguration };
};
