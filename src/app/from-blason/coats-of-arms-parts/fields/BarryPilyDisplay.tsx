import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { range } from '../../../../utils/range';

type Props = { fill: [string, string]; dimension: Dimension };
export const BarryPilyDisplay: React.FunctionComponent<Props> = ({ dimension: { width, height }, fill }) => {
  const scaledWidth = width * 0.8;
  const numberOfPale = 4;

  const pathBuilder = range(0, numberOfPale)
    .reduce((pathBuilder, i) => {
      return pathBuilder
        .goTo([scaledWidth, ((2 * i + 1) * height) / (2 * numberOfPale)])
        .goTo([0, ((2 * i + 2) * height) / (2 * numberOfPale)]);
    }, SvgPathBuilder.start([0, 0]))
    .close();

  return (
    <>
      <rect x={0} y={0} width={width} height={height} fill={fill[1]} />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[0]} stroke="#333" />
    </>
  );
};
