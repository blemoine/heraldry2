import { Dimension } from '../../../model/dimension';
import { buildFurTransformProperty, FurTransformProperty } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';

export function computeBendTransformProperty(
  dimension: Dimension,
  fillFromTincture: FillFromTincture
): FurTransformProperty {
  const scaleRatio = dimension.height / 480;
  return buildFurTransformProperty(fillFromTincture, {
    ermine: [{ kind: 'scale', value: [0.66 * scaleRatio, 0.66 * 0.75 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [0.56 * scaleRatio, 0.56 * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [0.35 * scaleRatio, 0.35 * 1.35 * scaleRatio] }],
  });
}
