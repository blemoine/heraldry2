import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { BendyField, BendySinisterField } from '../../../model/field';
import { range } from '../../../../utils/range';
import { FurPatternDefinition } from '../FurPatternDefinition';
import { buildFurTransformProperty, getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';

const postfixId = 'bendy-field';
const ermineScale = 0.66;
const vairScale = 0.56;
const potentScale = 0.35;

type Props = {
  field: BendyField | BendySinisterField;
  dimension: Dimension;
  number: BendyField['number'];
  fillFromTincture: FillFromTincture;
};
export const BendyDisplay: React.FunctionComponent<Props> = (props) => {
  const dimension = props.dimension;
  const height = dimension.height;
  const width = dimension.width;

  const a = (1.09 - 1.182) / (1.33 - 1.066);
  const b = 1.09 - a * 1.33;

  const maxCoordinate = Math.max(height * ((a * height) / width + b), width);
  const bendWidth = maxCoordinate / props.number;

  const bendPath = SvgPathBuilder.start([-maxCoordinate, 0])
    .goTo([maxCoordinate * 2, 0])
    .goTo([maxCoordinate * 2, bendWidth])
    .goTo([-maxCoordinate, bendWidth])
    .close()
    .rotate([(Math.sqrt(2) * bendWidth) / 2, bendWidth / 2], 45)
    .translate([width, 0]);

  const fills = props.field.tinctures.map((tincture) => getFill(props.fillFromTincture, tincture, postfixId));

  const scaleRatio = height / 480;
  const transformProperties = buildFurTransformProperty(props.fillFromTincture, {
    ermine: [{ kind: 'scale', value: [ermineScale * scaleRatio, ermineScale * 0.55 * scaleRatio] }],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  return (
    <>
      <FurPatternDefinition
        tinctures={props.field.tinctures}
        postfixId={postfixId}
        transformProperties={transformProperties}
      />
      {range(0, props.number).map((i) => {
        const path = bendPath.translate([-Math.sqrt(2) * bendWidth * (i + 1 / 2), 0]);

        return <PathFromBuilder key={i} pathBuilder={path} fill={fills[i % 2]} stroke="#333" />;
      })}
    </>
  );
};
