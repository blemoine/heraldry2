import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension };
export const PalyPilyDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const scaledHeight = height * 0.8;
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([(1 / 8) * width, scaledHeight])
    .goTo([(2 / 8) * width, 0])
    .goTo([(3 / 8) * width, scaledHeight])
    .goTo([(4 / 8) * width, 0])
    .goTo([(5 / 8) * width, scaledHeight])
    .goTo([(6 / 8) * width, 0])
    .goTo([(7 / 8) * width, scaledHeight])
    .goTo([(8 / 8) * width, 0])
    .close();
  return (
    <g>
      <rect x={0} y={0} width={width} height={0} fill={fill[1]} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[0]} stroke="#333" />
    </g>
  );
};
