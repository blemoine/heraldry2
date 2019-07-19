import * as React from 'react';

type Props = { fill: [string, string]; width: number; height: number };
export const PalyDisplay: React.FunctionComponent<Props> = ({ height, fill, width }) => {
  return (
    <g>
      <rect x={0} y={0} height={height} width={(1 / 6) * width} fill={fill[0]} stroke="#333" />
      <rect x={(1 / 6) * width} y={0} height={height} width={(1 / 6) * width} fill={fill[1]} stroke="#333" />
      <rect x={(2 / 6) * width} y={0} height={height} width={(1 / 6) * width} fill={fill[0]} stroke="#333" />
      <rect x={(3 / 6) * width} y={0} height={height} width={(1 / 6) * width} fill={fill[1]} stroke="#333" />
      <rect x={(4 / 6) * width} y={0} height={height} width={(1 / 6) * width} fill={fill[0]} stroke="#333" />
      <rect x={(5 / 6) * width} y={0} height={height} width={(1 / 6) * width} fill={fill[1]} stroke="#333" />
    </g>
  );
};
