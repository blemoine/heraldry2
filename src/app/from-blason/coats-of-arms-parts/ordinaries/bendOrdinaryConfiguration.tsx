import { Dimension } from '../../../model/dimension';
import { Bend, BendSinister } from '../../../model/ordinary';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { toDegree } from '../../../svg-path-builder/geometrical.helper';

const ermineScale = 0.66;
const vairScale = 0.56;
const potentScale = 0.35;

export const bendOrdinaryConfiguration = (direction: 'dexter' | 'sinister') => (
  dimension: Dimension,
  ordinary: Bend | BendSinister
) => {
  const { width, height } = dimension;
  const scaleRatio = height / 480;

  const transformPropertiesConfiguration = {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  } as const;

  const bendHeight = height / 4;
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);
  const oneSideOnly = oneSideLineOption(invertedLineOptions);
  const length = Math.sqrt(width ** 2 + height ** 2);

  const rotationDirection = direction === 'dexter' ? 1 : -1;
  const pathBuilder = SvgPathBuilder.rectangle(
    [0, 0],
    { width: length, height: bendHeight },
    { top: invertedLineOptions, bottom: oneSideOnly }
  )
    .translate([(width - length) / 2, height / 2 - bendHeight / 2])
    .rotate([width / 2, height / 2], rotationDirection * toDegree(Math.atan2(height, width)));
  const pathBuilderAndTincture = [{ pathBuilder, tincture: ordinary.tincture }];
  return { pathBuilderAndTincture, transformPropertiesConfiguration };
};