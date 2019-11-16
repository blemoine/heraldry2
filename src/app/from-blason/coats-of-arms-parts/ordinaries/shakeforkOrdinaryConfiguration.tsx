import { Dimension } from '../../../model/dimension';
import { Shakefork } from '../../../model/ordinary';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { FurConfiguration } from '../FurPatternDef';

export const shakeforkOrdinaryConfiguration = (dimension: Dimension, ordinary: Shakefork) => {
  const { width, height } = dimension;
  const furConfiguration: FurConfiguration = {
    ermine: { spotWidth: width / 19, heightMarginScale: 0, widthMarginScale: 0 },
    vair: { bellWidth: width / 12, bellHeightRatio: 2 },
    potent: { bellWidth: width / 9, bellHeightRatio: 1 },
  };

  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const oneSideOnly = oneSideLineOption(lineOptions);

  const pallWidth = width / 5.5;
  const projectedPallWidth = pallWidth / Math.sqrt(2);
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([0, projectedPallWidth])
    .goTo([width / 2 - pallWidth / 2, height / 2], oneSideOnly)
    .goTo([width / 2 - pallWidth / 2, height - pallWidth / 2], oneSideOnly)
    .goTo([width / 2, height], oneSideOnly)
    .goTo([width / 2 + pallWidth / 2, height - pallWidth / 2])
    .goTo([width / 2 + pallWidth / 2, height / 2], oneSideOnly)
    .goTo([width, projectedPallWidth], oneSideOnly)
    .goTo([width, 0])
    .goTo([width - projectedPallWidth, 0])
    .goTo([width / 2, height / 2 - (height / width) * projectedPallWidth], lineOptions)
    .goTo([projectedPallWidth, 0], lineOptions)
    .goTo([0, 0])
    .scale([width / 2, height / 2], 0.85, 0.85);

  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];

  return { pathBuilderAndTincture, furConfiguration };
};
