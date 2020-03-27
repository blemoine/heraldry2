import * as React from 'react';
import { Dimension } from '../../model/dimension';

type Props = { dimension: Dimension; fill: string; bell: string };
export const VairDisplay = ({ fill, bell, dimension: { width, height } }: Props) => {
  return (
    <>
      <rect width="100%" height="100%" fill={fill} />

      <path
        d={`M0 ${width} L${width} ${height} L${(width * 3) / 4} ${(height * 3) / 4} L${(width * 3) / 4} ${
          height / 4
        } L${width / 2} 0 L${width / 4} ${height / 4} L${width / 4} ${(height * 3) / 4} Z`}
        fill={bell}
      />
    </>
  );
};
