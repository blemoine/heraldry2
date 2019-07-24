import * as React from 'react';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension };
export const BendyDisplay: React.FunctionComponent<Props> = (props) => {
  const { dimension, fill } = props;
  const height = dimension.height;
  const width = props.dimension.width * 1.5;

  const firstPoint = 1 / 4;
  const secondPoint = 1 / 2;
  return (
    <g>
      <path
        d={`M 0 0 H ${width * firstPoint} L ${width} ${height * (1 - firstPoint)} V ${height} Z`}
        fill={fill[0]}
        stroke="#333"
      />
      <path
        d={`M ${width * firstPoint} 0 H ${width * secondPoint} L ${width} ${height * (1 - secondPoint)} V ${height *
          (1 - firstPoint)} Z`}
        fill={fill[1]}
        stroke="#333"
      />
      <path
        d={`M ${width * secondPoint} 0 H ${width} V ${height * (1 - secondPoint)} Z`}
        fill={fill[0]}
        stroke="#333"
      />

      <path
        d={`M 0 0 V ${height * firstPoint} L ${width * (1 - firstPoint)} ${height} H ${width} Z`}
        fill={fill[1]}
        stroke="#333"
      />
      <path
        d={`M 0 ${height * firstPoint} V ${height * secondPoint} L ${width * firstPoint} ${height} H ${width *
          (1 - firstPoint)} Z`}
        fill={fill[0]}
        stroke="#333"
      />
      <path
        d={`M 0 ${height * secondPoint} V ${height} H ${width * (1 - secondPoint)} Z`}
        fill={fill[1]}
        stroke="#333"
      />
    </g>
  );
};
