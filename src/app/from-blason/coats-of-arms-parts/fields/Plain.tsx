import * as React from 'react';
import { Dimension } from '../../../model/dimension';

type Props = { fill: string; dimension: Dimension };
export const Plain: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  return <rect x={0} y={0} width={width} height={height} fill={fill} stroke="#333" />;
};
