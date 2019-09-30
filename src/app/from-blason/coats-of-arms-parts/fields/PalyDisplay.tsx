import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension };
export const PalyDisplay: React.FunctionComponent<Props> = ({ fill, dimension: { width, height } }) => {
  const number = 6;
  return (
    <>
      {range(0, number).map((i) => (
        <rect
          key={i}
          x={(width * i) / number}
          y={0}
          height={height}
          width={width / number}
          fill={fill[i % 2]}
          stroke="#333"
        />
      ))}
    </>
  );
};
