import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptions } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string, string]; dimension: Dimension; line: Line };
export const PaleTiercedDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions: LineOptions | null = lineOptions ? invertLineOptions(lineOptions) : null;

  const left = SvgPathBuilder.start([0, 0])
    .goTo([width / 3, 0])
    .goTo([width / 3, height], lineOptions)
    .goTo([0, height])
    .close();

  const middle = SvgPathBuilder.start([width / 3, 0])
    .goTo([(2 * width) / 3, 0])
    .goTo([(2 * width) / 3, height], lineOptions)
    .goTo([width / 3, height])
    .goTo([width / 3, 0], invertedLineOptions);

  const right = SvgPathBuilder.start([(2 * width) / 3, 0])
    .goTo([width, 0])
    .goTo([width, height])
    .goTo([(2 * width) / 3, height])
    .goTo([(2 * width) / 3, 0], invertedLineOptions);

  return (
    <>
      <PathFromBuilder pathBuilder={left} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={middle} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={right} fill={fill[2]} stroke="#333" />
    </>
  );
};
