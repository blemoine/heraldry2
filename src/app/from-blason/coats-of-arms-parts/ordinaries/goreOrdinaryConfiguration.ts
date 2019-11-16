import { Dimension } from '../../../model/dimension';
import { Gore } from '../../../model/ordinary';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

export const goreOrdinaryConfiguration = (dimension: Dimension, ordinary: Gore) => {
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
    .arcTo([width / 3, height / 2], { radius: height * 0.7 }, invertedLineOptions)
    .arcTo([width / 2, height], { radius: height * 0.4 }, invertedLineOptions)
    .goTo([0, height])
    .close();
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

  return { pathBuilderAndTincture, furConfiguration };
};
