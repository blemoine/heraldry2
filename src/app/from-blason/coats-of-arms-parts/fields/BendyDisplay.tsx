import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { BendyField, BendySinisterField } from '../../../model/field';
import { range } from '../../../../utils/range';
import { FurPatternDefinition } from '../FurPatternDefinition';
import { buildFurTransformProperty, getFill } from '../FurPattern.model';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { allDeclaredTincturesOfField } from '../../blason.helpers';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';

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

  const bendHeight = height / (props.number - 1);

  const field = props.field;
  const lineOptions = computeLineOptions(field.line, dimension);
  const invertLineOptions = field.line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const oneSideOnly = oneSideLineOption(lineOptions);
  const invertedOneSideOnly = field.line === 'dancetty' ? lineOptions : oneSideLineOption(invertLineOptions);

  const fills = field.tinctures.map((tincture) => getFill(props.fillFromTincture, tincture, postfixId));

  const scaleRatio = height / 480;
  const transformProperties = buildFurTransformProperty(props.fillFromTincture, allDeclaredTincturesOfField(field), {
    ermine: [
      { kind: 'scale', value: [ermineScale * scaleRatio * 1.5, ermineScale * (3 / props.number - 0.05) * scaleRatio] },
    ],
    vair: [{ kind: 'scale', value: [vairScale * scaleRatio, vairScale * 0.6785 * scaleRatio] }],
    potent: [{ kind: 'scale', value: [potentScale * scaleRatio, potentScale * 1.35 * scaleRatio] }],
  });

  const lineOffset = field.line === 'urdy' ? bendHeight : 0;
  return (
    <>
      <FurPatternDefinition
        tinctures={field.tinctures}
        postfixId={postfixId}
        transformProperties={transformProperties}
      />
      {range(0, props.number).map((i) => {
        const startOffset = i === 0 ? bendHeight : 0;
        const endOffset = i === props.number - 1 ? bendHeight * 2 : 0;

        const bendDimension = { width, height: bendHeight + endOffset + lineOffset + startOffset };
        const path = SvgPathBuilder.rectangle([0, (i - 1) * bendHeight - startOffset - bendHeight], bendDimension, {
          bottom: i % 2 === 1 ? oneSideOnly : lineOptions,
          top: i % 2 === 0 ? invertedOneSideOnly : invertLineOptions,
        }).skew(0, (2 * bendHeight) / width);

        return <PathFromBuilder key={i} pathBuilder={path} fill={fills[i % 2]} stroke="#333" />;
      })}
    </>
  );
};
