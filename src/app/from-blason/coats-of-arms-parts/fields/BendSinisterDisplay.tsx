import * as React from 'react';

type Props = { fill: [string, string]; width: number; height: number };
export const BendSinisterDisplay: React.FunctionComponent<Props> = ({ width, height, fill }) => {
  return (
    <g>
      <path d={`M 0 0 H ${width} L 0 ${height} Z`} fill={fill[0]} stroke="#333" />
      <path d={`M 0 ${height} H ${width} V 0  Z`} fill={fill[1]} stroke="#333" />
    </g>
  );
};
