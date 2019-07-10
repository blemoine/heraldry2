import * as React from 'react';
import { azure } from '../../model/tincture';

type Props = { width: number; height: number };
export const Vair = ({ width, height }: Props) => {
  return (
    <>
      <rect width="100%" height="100%" fill="white" />

      <path
        d={`M0 ${width} L${width} ${height} L${(width * 3) / 4} ${(height * 3) / 4} L${(width * 3) / 4} ${height /
          4} L${width / 2} 0 L${width / 4} ${height / 4} L${width / 4} ${(height * 3) / 4} Z`}
        fill={azure.color}
      />
    </>
  );
};
