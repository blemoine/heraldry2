import * as React from 'react';

type Props = { fill: string; width: number; height: number };
export const Plain: React.FunctionComponent<Props> = ({ width, height, fill }) => {
  return <rect x={0} y={0} width={width} height={height} fill={fill} stroke="#333" />;
};
