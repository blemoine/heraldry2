import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptions } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string, string]; dimension: Dimension; line: Line };
export const FessTiercedDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions: LineOptions | null = lineOptions ? invertLineOptions(lineOptions) : null;

  const top = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, height / 3])
    .goTo([0, height / 3], lineOptions)
    .close();

  const middle = SvgPathBuilder.start([0, height / 3])
    .goTo([width, height / 3], invertedLineOptions)
    .goTo([width, (2 * height) / 3])
    .goTo([0, (2 * height) / 3], lineOptions)
    .close();

  const bottom = SvgPathBuilder.start([0, (2 * height) / 3])
    .goTo([width, (2 * height) / 3], invertedLineOptions)
    .goTo([width, height])
    .goTo([0, height])
    .close();

  return (
    <>
      <PathFromBuilder pathBuilder={top} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={middle} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={bottom} fill={fill[2]} stroke="#333" />
    </>
  );
};
