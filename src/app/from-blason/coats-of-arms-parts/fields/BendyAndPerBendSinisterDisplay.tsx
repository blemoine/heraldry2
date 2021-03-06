import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = {
  fill: [string, string];
  dimension: Dimension;
  rows: number;
};
export const BendyAndPerBendSinisterDisplay: React.FunctionComponent<Props> = ({ dimension, fill, rows }) => {
  const { width, height } = dimension;
  const a = (1.09 - 1.182) / (1.33 - 1.066);
  const b = 1.09 - a * 1.33;

  const maxCoordinate = Math.max(height * ((a * height) / width + b), width);
  const bendHeight = maxCoordinate / rows;

  return (
    <>
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
            <PathFromBuilder pathBuilder={path} fill={fill[i % 2]} stroke="#333" />
            <PathFromBuilder pathBuilder={bottomPath} fill={fill[(i + 1) % 2]} stroke="#333" />
          </g>
        );
      })}
    </>
  );
};
