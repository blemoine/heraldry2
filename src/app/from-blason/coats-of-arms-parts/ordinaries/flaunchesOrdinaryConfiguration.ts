import { Dimension } from '../../../model/dimension';
import { Flaunches } from '../../../model/ordinary';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

export const flaunchesOrdinaryConfiguration = (dimension: Dimension, ordinary: Flaunches) => {
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

  const pathBuilderLeft = SvgPathBuilder.start([0, 0])
    .arcTo([0, height], { radius: width * 0.9, sweep: 1 }, invertedLineOptions)
    .close();
  const pathBuilderRight = SvgPathBuilder.start([width, 0])
    .arcTo([width, height], { radius: width * 0.9 }, lineOptions)
    .close();
  const pathBuilderAndTincture = [
    { pathBuilder: pathBuilderLeft, tincture: ordinary.tincture },
    { pathBuilder: pathBuilderRight, tincture: ordinary.tincture },
  ];

  return { pathBuilderAndTincture, furConfiguration };
};
