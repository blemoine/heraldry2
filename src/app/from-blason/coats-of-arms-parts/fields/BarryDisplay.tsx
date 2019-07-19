import * as React from 'react';
import { range } from '../../../../utils/range';

type Props = { fill: [string, string]; width: number; height: number; number: number };
export const BarryDisplay: React.FunctionComponent<Props> = ({ height, fill, width, number }) => {
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
