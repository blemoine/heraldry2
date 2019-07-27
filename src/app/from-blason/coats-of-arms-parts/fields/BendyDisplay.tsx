import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const BendyDisplay: React.FunctionComponent<Props> = (props) => {
  const { dimension, fill } = props;
  const height = dimension.height;
  const width = props.dimension.width * 1.5;

  const firstPoint = 1 / 4;
  const secondPoint = 1 / 2;

  const path1 = SvgPathBuilder.start([0, 0])
    .goTo([width * firstPoint, 0])
    .goTo([width, height * (1 - firstPoint)])
    .goTo([width, height])
    .close();

  const path2 = SvgPathBuilder.start([width * firstPoint, 0])
    .goTo([width * secondPoint, 0])
    .goTo([width, height * (1 - secondPoint)])
    .goTo([width, height * (1 - firstPoint)])
    .close();

  const path3 = SvgPathBuilder.start([width * secondPoint, 0])
    .goTo([width, 0])
    .goTo([width, height * (1 - secondPoint)])
    .close();

  const path4 = SvgPathBuilder.start([0, 0])
    .goTo([0, height * firstPoint])
    .goTo([width * (1 - firstPoint), height])
    .goTo([width, height])
    .close();
  const path5 = SvgPathBuilder.start([0, height * firstPoint])
    .goTo([0, height * secondPoint])
    .goTo([width * firstPoint, height])
    .goTo([width * (1 - firstPoint), height])
    .close();
  const path6 = SvgPathBuilder.start([0, height * secondPoint])
    .goTo([0, height])
    .goTo([width * (1 - secondPoint), height])
    .close();

  return (
    <g>
      <PathFromBuilder pathBuilder={path1} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={path2} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={path3} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={path4} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={path5} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={path6} fill={fill[1]} stroke="#333" />
    </g>
  );
};
