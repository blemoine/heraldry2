import * as React from 'react';

type Props = { fill: [string, string]; width: number; height: number };
export const PaleDisplay: React.FunctionComponent<Props> = ({ width, height, fill }) => {
  return (
    <g>
      <path
        d={`M0 0 H${width/2} V${height} A${(width * 197) / 200} ${(height * 199.2) / 240} -90 0 1 0 ${height / 3} Z`}
        fill={fill[0]}
        stroke="#333"
      />
      <path
        d={`M${width/2} 0 H${width} V${height / 3} A${(width * 197) / 200} ${(height * 199.2) / 240} 90 0 1 ${width /
          2} ${height} Z`}
        fill={fill[1]}
        stroke="#333"
      />
    </g>
  );
};
