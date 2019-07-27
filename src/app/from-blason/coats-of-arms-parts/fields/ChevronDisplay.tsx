import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const ChevronDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const pathBuilder = SvgPathBuilder.start([-width / 3, height])
    .goTo([width / 2, height / 3])
    .goTo([(width * 4) / 3, height])
    .close();

  return (
    <g>
      <rect x={0} y={0} height={height} width={width} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />
    </g>
  );
};
