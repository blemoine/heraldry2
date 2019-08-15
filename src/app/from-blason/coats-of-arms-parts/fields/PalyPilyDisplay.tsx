import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { range } from '../../../../utils/range';

type Props = { fill: [string, string]; dimension: Dimension };
export const PalyPilyDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const scaledHeight = height * 0.8;
  const numberOfPale = 4;

  const pathBuilder = range(0, numberOfPale)
    .reduce((pathBuilder, i) => {
      return pathBuilder
        .goTo([((2 * i + 1) * width) / (2 * numberOfPale), scaledHeight])
        .goTo([((2 * i + 2) * width) / (2 * numberOfPale), 0]);
    }, SvgPathBuilder.start([0, 0]))
    .close();

  return (
    <g>
      <rect x={0} y={0} width={width} height={height} fill={fill[1]} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[0]} stroke="#333" />
    </g>
  );
};
