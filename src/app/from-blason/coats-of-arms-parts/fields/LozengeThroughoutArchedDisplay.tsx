import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const LozengeThroughoutArchedDisplay: React.FunctionComponent<Props> = ({ dimension, fill }) => {
  const { width, height } = dimension;
  const radius = width;

  const pathBuilder = SvgPathBuilder.start([width / 2, 0])
    .arcTo([width, height / 2], { radius })
    .arcTo([width / 2, height], { radius })
    .arcTo([0, height / 2], { radius })
    .arcTo([width / 2, 0], { radius });

  return (
    <>
      <rect x={0} y={0} width={width} height={height} fill={fill[0]} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />
    </>
  );
};
