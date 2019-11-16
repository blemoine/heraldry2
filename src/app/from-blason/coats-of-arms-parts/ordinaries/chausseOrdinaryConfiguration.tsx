import { Dimension } from '../../../model/dimension';
import { Chausse } from '../../../model/ordinary';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

export const chausseOrdinaryConfiguration = (dimension: Dimension, ordinary: Chausse) => {
  const { width, height } = dimension;

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const pathBuilderLeft = SvgPathBuilder.start([0, 0])
    .goTo([width / 2, height], invertedLineOptions)
    .goTo([0, height])
    .close();
  const pathBuilderRight = SvgPathBuilder.start([width, 0])
    .goTo([width / 2, height], lineOptions)
    .goTo([width, height])
    .close();
  const pathBuilderAndTincture = [
    { pathBuilder: pathBuilderLeft, tincture: ordinary.tincture },
    { pathBuilder: pathBuilderRight, tincture: ordinary.tincture },
  ];
  return { pathBuilderAndTincture, furConfiguration };
};
