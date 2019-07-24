import * as React from 'react';
import { Dimension } from '../../../model/dimension';

type Props = { dimension: Dimension };
export const HeaterDisplay: React.FunctionComponent<Props> = ({ dimension }) => {
  const { width, height } = dimension;
  return (
    <path
      d={`M 0 0 H${width} V${height / 3} A${width} ${width} 90 0 1 ${width /
        2} ${height} A${width} ${width} -90 0 1 0 ${height / 3} Z`}
      fill="transparent"
      stroke="#333"
    />
  );
};
