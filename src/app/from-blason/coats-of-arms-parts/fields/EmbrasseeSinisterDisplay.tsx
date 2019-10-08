import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const EmbrasseeSinisterDisplay = (props: Props) => {
  const { dimension, fill } = props;
  const height = dimension.height;
  const width = dimension.width;

  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([width, height / 2])
    .goTo([0, height]);

  return (
    <>
      <rect x={0} y={0} width={width} height={height} fill={fill[0]} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />
    </>
  );
};
