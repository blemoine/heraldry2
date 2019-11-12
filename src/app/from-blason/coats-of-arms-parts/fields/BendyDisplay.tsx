import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { BendyField } from '../../../model/field';
import { range } from '../../../../utils/range';
import { FillFromTincture } from '../../fillFromTincture.helper';
import { computeLineOptions, invertLineOptionNullable, oneSideLineOption } from '../blasonDisplay.helper';
import { Line } from '../../../model/line';

type Props = {
  fills: [string, string];
  line: Line;
  dimension: Dimension;
  number: BendyField['number'];
  fillFromTincture: FillFromTincture;
};
export const BendyDisplay: React.FunctionComponent<Props> = (props) => {
  const dimension = props.dimension;
  const height = dimension.height;
  const width = dimension.width;

  const bendHeight = height / (props.number - 1);

  const lineOptions = computeLineOptions(props.line, dimension);
  const invertLineOptions = props.line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const oneSideOnly = oneSideLineOption(lineOptions);
  const invertedOneSideOnly = props.line === 'dancetty' ? lineOptions : oneSideLineOption(invertLineOptions);

  const fills = props.fills;

  const lineOffset = props.line === 'urdy' ? bendHeight : 0;
  return (
    <>
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
