import * as React from 'react';

type Props = { fill: [string, string]; width: number; height: number };
export const BendDisplay: React.FunctionComponent<Props> = ({ width, height, fill }) => {
  return (
    <g>
      <path d={`M 0 0 H ${width} V ${height} Z`} fill={fill[0]} stroke="#333" />
      <path d={`M 0 0 V ${height} H ${width}  Z`} fill={fill[1]} stroke="#333" />
    </g>
  );
};
