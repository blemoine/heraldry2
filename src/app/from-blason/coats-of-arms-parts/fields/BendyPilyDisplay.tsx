import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { range } from '../../../../utils/range';

type Props = { fill: [string, string]; dimension: Dimension };
export const BendyPilyDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const scaledHeight = height * 0.6;
  const numberOfPale = 7;
  const baseHeight = 0.35 * height;
  const pathBuilder = range(0, numberOfPale)
    .reduce((pathBuilder, i) => {
      return pathBuilder
        .goTo([((2 * i + 1) * width) / (2 * (numberOfPale - 2)), scaledHeight + baseHeight])
        .goTo([((2 * i + 2) * width) / (2 * (numberOfPale - 2)), baseHeight]);
    }, SvgPathBuilder.start([0, baseHeight]))
    .goTo([width, 0])
    .goTo([0, 0])
    .close()
    .translate([0, -baseHeight * 0.6])
    .rotate([width / 2, height / 2], -45);

  return (
    <g>
      <rect x={0} y={0} width={width} height={height} fill={fill[1]} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[0]} stroke="#333" />
    </g>
  );
};
