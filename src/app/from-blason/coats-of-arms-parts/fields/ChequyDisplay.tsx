import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension };
export const ChequyDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const number = 6;
  return (
    <g>
      {range(0, number).map((i) => {
        return range(0, number).map((j) => {
          return (
            <rect
              key={i + '#' + j}
              x={(width * i) / number}
              y={(height * j) / number}
              height={height / number}
              width={width / number}
              fill={fill[(i + j) % 2]}
              stroke="#333"
            />
          );
        });
      })}
    </g>
  );
};
