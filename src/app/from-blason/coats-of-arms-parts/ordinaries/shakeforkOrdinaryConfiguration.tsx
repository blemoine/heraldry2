import { Dimension } from '../../../model/dimension';
import { Shakefork } from '../../../model/ordinary';
import { computeLineOptions, oneSideLineOption } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

const ermineScale = 0.3;
const vairScale = 0.23;
const potentScale = 0.16;

export const shakeforkOrdinaryConfiguration = (dimension: Dimension, ordinary: Shakefork) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformPropertiesConfiguration = {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  } as const;

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

  return { pathBuilderAndTincture, transformPropertiesConfiguration };
};
