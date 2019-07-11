import * as React from 'react';

type Props = { fill: string; width: number; height: number };
export const Plain: React.FunctionComponent<Props> = ({ width, height, fill }) => {
  return (
    <path
      d={`M0 0 H${width} V${height / 3} A${(width * 197) / 200} ${(height * 199.2) / 240} 90 0 1 ${width /
        2} ${height} A${(width * 197) / 200} ${(height * 199.2) / 240} -90 0 1 0 ${height / 3} Z`}
      fill={fill}
      stroke="#333"
    />
  );
};
