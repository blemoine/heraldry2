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
export const BendyAndPerPaleDisplay: React.FunctionComponent<Props> = ({ dimension, fill, rows }) => {
  const { width, height } = dimension;
  const bendHeight = height / (rows - 1);

  return (
    <>
      {range(0, rows).map((i) => {
        const bendWidth = width / 2;
        const bendDimension = { width: bendWidth, height: bendHeight };
        const path = SvgPathBuilder.rectangle([0, (i - 1) * bendHeight], bendDimension).skew(0, bendHeight / bendWidth);

        const rightPath = path.translate([bendWidth, 0]);
        return (
          <g key={i}>
            <PathFromBuilder pathBuilder={path} fill={fill[i % 2]} stroke="#333" />
            <PathFromBuilder pathBuilder={rightPath} fill={fill[i % 2]} stroke="#333" />
          </g>
        );
      })}
    </>
  );
};
