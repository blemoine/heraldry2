import * as React from 'react';
import { range } from '../../../../utils/range';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension; rows: number; columns: number };
export const AlternatingSquareDisplay: React.FunctionComponent<Props> = ({
  dimension: { width, height },
  fill,
  rows,
  columns,
}) => {
  return (
    <>
      {range(0, columns).map((i) => {
        return range(0, rows).map((j) => (
          <rect
            key={i + '#' + j}
            x={(width * i) / columns}
            y={(height * j) / rows}
            height={height / rows}
            width={width / columns}
            fill={fill[(i + j) % 2]}
            stroke="#333"
          />
        ));
      })}
    </>
  );
};
