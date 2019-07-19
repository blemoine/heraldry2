import * as React from 'react';
import { range } from '../../../../utils/range';

type Props = { fill: [string, string]; width: number; height: number };
export const PalyDisplay: React.FunctionComponent<Props> = ({ height, fill, width }) => {
  const number = 6;
  return (
    <g>
      {range(0, number).map((i) => {
        return (
          <rect
            key={i}
            x={(width * i) / number}
            y={0}
            height={height}
            width={width / number}
            fill={fill[i % 2]}
            stroke="#333"
          />
        );
      })}
    </g>
  );
};
