import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { buildFurTransformProperty, getFill } from '../FurPattern.model';
import { allDeclaredTincturesOfField } from '../../blason.helpers';
import { FurPatternDefinition } from '../FurPatternDefinition';
import { BendyAndPerPaleField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';

const postfixId = 'bendy-and-per-pale';
const ermineScale = 0.66;
const vairScale = 0.56;
const potentScale = 0.35;
type Props = {
  field: BendyAndPerPaleField;
  dimension: Dimension;
  rows: number;
  fillFromTincture: FillFromTincture;
};
export const BendyAndPerPaleDisplay: React.FunctionComponent<Props> = ({
  dimension,
  field,
  rows,
  fillFromTincture,
}) => {
  const { width, height } = dimension;
  const bendHeight = height / (rows - 1);

  const fills = field.tinctures.map((tincture) => getFill(fillFromTincture, tincture, postfixId));

  const scaleRatio = height / 480;
  const transformProperties = buildFurTransformProperty(fillFromTincture, allDeclaredTincturesOfField(field), {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.55 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  return (
    <>
      <FurPatternDefinition
        tinctures={field.tinctures}
        postfixId={postfixId}
        transformProperties={transformProperties}
      />
      {range(0, rows).map((i) => {
        const bendWidth = width / 2;
        const bendDimension = { width: bendWidth, height: bendHeight };
        const path = SvgPathBuilder.rectangle([0, (i - 1) * bendHeight], bendDimension).skew(0, bendHeight / bendWidth);

        const rightPath = path.translate([bendWidth, 0]);
        return (
          <g key={i}>
            <PathFromBuilder pathBuilder={path} fill={fills[i % 2]} stroke="#333" />
            <PathFromBuilder pathBuilder={rightPath} fill={fills[i % 2]} stroke="#333" />
          </g>
        );
      })}
    </>
  );
};
