import * as React from 'react';
import { BendyDisplay } from './BendyDisplay';
import { Dimension } from '../../../model/dimension';

type Props = { fill: [string, string]; dimension: Dimension };
export const BendySinisterDisplay: React.FunctionComponent<Props> = ({ fill, dimension }) => {
  return (
    <g transform={`scale(-1,1) translate(-${dimension.width} 0)`}>
      <BendyDisplay fill={fill} dimension={dimension} number={6}/>
    </g>
  );
};
