import * as React from 'react';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension };
export const PaleDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  return (
    <g>
      <rect x={0} y={0} width={width / 2} height={height} fill={fill[0]} stroke="#333" />
      <rect x={width / 2} y={0} width={width / 2} height={height} fill={fill[1]} stroke="#333" />
    </g>
  );
};
