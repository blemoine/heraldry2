import * as React from 'react';

type Props = { fill: [string, string]; width: number; height: number };
export const ChevronDisplay: React.FunctionComponent<Props> = ({ width, height, fill }) => {
  return (
    <g>
      <rect x={0} y={0} height={height} width={width} fill={fill[0]} stroke="#333" />
      <path
        d={`M ${-width / 3} ${height} L ${width / 2} ${height / 3} L ${(width * 4) / 3} ${height}  Z`}
        fill={fill[1]}
        stroke="#333"
      />
    </g>
  );
};
