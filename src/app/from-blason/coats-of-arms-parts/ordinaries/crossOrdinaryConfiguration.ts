import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { OrdinaryCross } from '../../../model/ordinary';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { FurConfiguration } from '../FurPatternDef';

export const crossOrdinaryConfiguration = (dimension: Dimension, ordinary: OrdinaryCross) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const pathBuilder = SvgPathBuilder.start([(2 * width) / 5, 0])
    .goToWithPartFlat([(2 * width) / 5, (2 * height) / 5], oneSideOnly, 5, 'end')
    .goToWithPartFlat([0, (2 * height) / 5], lineOptions, 5, 'start')
    .goTo([0, (3 * height) / 5])
    .goToWithPartFlat([(2 * width) / 5, (3 * height) / 5], oneSideOnly, 5, 'end')
    .goToWithPartFlat([(2 * width) / 5, height], oneSideOnly, 5, 'start')
    .goTo([(3 * width) / 5, height])
    .goToWithPartFlat([(3 * width) / 5, (3 * height) / 5], oneSideOnly, 5, 'end')
    .goToWithPartFlat([width, (3 * height) / 5], oneSideOnly, 5, 'start')
    .goTo([width, (2 * height) / 5])
    .goToWithPartFlat([(3 * width) / 5, (2 * height) / 5], lineOptions, 5, 'end')
    .goToWithPartFlat([(3 * width) / 5, 0], oneSideOnly, 5, 'start')
    .goTo([(2 * width) / 5, 0]);

  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

  return { pathBuilderAndTincture, furConfiguration };
};
