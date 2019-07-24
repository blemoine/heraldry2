import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension; number: number };
export const BarryDisplay: React.FunctionComponent<Props> = ({ fill, dimension: { width, height }, number }) => {
  return (
    <g>
      {range(0, number).map((i) => {
        return (
          <rect
            key={i}
            x={0}
            y={(height * i) / number}
            height={height / number}
            width={width}
            fill={fill[i % 2]}
            stroke="#333"
          />
        );
      })}
    </g>
  );
};
