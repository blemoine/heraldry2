import * as React from 'react';
import { Dimension } from '../../../model/dimension';

type Props = { fill: string; dimension: Dimension };
export const PlainDisplay = ({ dimension, fill }: Props) => {
  const { width, height } = dimension;
  return <rect x={0} y={0} width={width} height={height} fill={fill} stroke="#333" />;
};
