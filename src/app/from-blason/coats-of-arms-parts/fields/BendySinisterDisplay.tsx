import * as React from 'react';
import { BendyDisplay } from './BendyDisplay';

type Props = { fill: [string, string]; width: number; height: number };
export const BendySinisterDisplay: React.FunctionComponent<Props> = ({ fill, width, height }) => {
  return (
    <g transform={`scale(-1,1) translate(-${width} 0)`}>
      <BendyDisplay fill={fill} width={width} height={height} />
    </g>
  );
};
