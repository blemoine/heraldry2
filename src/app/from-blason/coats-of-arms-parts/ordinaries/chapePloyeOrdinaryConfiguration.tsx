import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { ChapePloye } from '../../../model/ordinary';
import { Dimension } from '../../../model/dimension';
import { FurConfiguration } from '../FurPatternDef';

export const chapePloyeOrdinaryConfiguration = (dimension: Dimension, ordinary: ChapePloye) => {
  const { width, height } = dimension;
  const lineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 50 }
      : computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions: LineOptions | null =
    ordinary.line === 'dancetty'
      ? { line: 'indented', height: height / 10, width: width / 5, verticalOffset: 100 }
      : invertLineOptionNullable(lineOptions);

  const pathBuilderAndTincture =
    ordinary.tinctures.kind === 'party'
      ? [
          {
            pathBuilder: SvgPathBuilder.start([width / 2, 0])
              .arcTo([0, (5 * height) / 6], { radius: height * 1.6, sweep: 1 }, lineOptions)
              .goTo([0, height])
              .goTo([width / 2, height])
              .close(),
            tincture: ordinary.tinctures.tinctures[0],
          },
          {
            pathBuilder: SvgPathBuilder.start([width / 2, 0])
              .arcTo([width, (5 * height) / 6], { radius: height * 1.6, sweep: 0 }, invertedLineOptions)
              .goTo([width, height])
              .goTo([width / 2, height])
              .close(),
            tincture: ordinary.tinctures.tinctures[1],
          },
        ]
      : [
          {
            pathBuilder: SvgPathBuilder.start([width / 2, 0])
              .arcTo([0, (5 * height) / 6], { radius: height * 1.6, sweep: 1 }, lineOptions)
              .goTo([0, height])
              .goTo([width, height])
              .goTo([width, (5 * height) / 6])
              .arcTo([width / 2, 0], { radius: height * 1.6, sweep: 1 }, invertedLineOptions),
            tincture: ordinary.tinctures.tincture,
          },
        ];

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };
  return { pathBuilderAndTincture, furConfiguration };
};
