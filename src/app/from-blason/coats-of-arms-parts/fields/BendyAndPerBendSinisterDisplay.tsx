import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { buildFurTransformProperty, getFill } from '../FurPattern.model';
import { allDeclaredTincturesOfField } from '../../blason.helpers';
import { FurPatternDefinition } from '../FurPatternDefinition';
import { BendyAndPerBendSinisterField } from '../../../model/field';
import { FillFromTincture } from '../../fillFromTincture.helper';

const postfixId = 'bendy-and-per-bend-sinister';
const ermineScale = 0.66;
const vairScale = 0.56;
const potentScale = 0.35;
type Props = {
  field: BendyAndPerBendSinisterField;
  dimension: Dimension;
  rows: number;
  fillFromTincture: FillFromTincture;
};
export const BendyAndPerBendSinisterDisplay: React.FunctionComponent<Props> = ({
  dimension,
  field,
  rows,
  fillFromTincture,
}) => {
  const { width, height } = dimension;
  const a = (1.09 - 1.182) / (1.33 - 1.066);
  const b = 1.09 - a * 1.33;

  const maxCoordinate = Math.max(height * ((a * height) / width + b), width);
  const bendHeight = maxCoordinate / rows;

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
        const startOffset = i === 0 ? bendHeight : 0;
        const endOffset = i === rows - 1 ? bendHeight * 2 : 0;
        const bendPath = SvgPathBuilder.rectangle([-maxCoordinate, -startOffset], {
          width: 1.265 * maxCoordinate,
          height: bendHeight + endOffset + startOffset,
        });
        const path = bendPath.translate([0, (i - 1) * bendHeight]).rotate([width / 2, height / 2], 45);
        const bottomPath = bendPath
          .translate([1.265 * maxCoordinate, (i - 1) * bendHeight])
          .rotate([width / 2, height / 2], 45);
        return (
          <g key={i}>
            <PathFromBuilder pathBuilder={path} fill={fills[i % 2]} stroke="#333" />
            <PathFromBuilder pathBuilder={bottomPath} fill={fills[(i + 1) % 2]} stroke="#333" />
          </g>
        );
      })}
    </>
  );
};
