import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptions } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const SaltireDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions: LineOptions | null = lineOptions ? invertLineOptions(lineOptions) : null;

  const top = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goToWithPartFlat([width / 2, height / 2], lineOptions, 5, 'end')
    .goToWithPartFlat([0, 0], lineOptions, 5, 'start');
  const bottom = SvgPathBuilder.start([0, height])
    .goTo([width, height])
    .goTo([width / 2, height / 2], lineOptions)
    .goTo([0, height], lineOptions);
  const left = SvgPathBuilder.start([0, 0])
    .goToWithPartFlat([width / 2, height / 2], invertedLineOptions, 5, 'end')
    .goTo([0, height], lineOptions)
    .close();
  const right = SvgPathBuilder.start([width, 0])
    .goTo([width, height])
    .goTo([width / 2, height / 2], lineOptions)
    .goToWithPartFlat([width, 0], invertedLineOptions, 5, 'start');

  return (
    <>
      <PathFromBuilder pathBuilder={top} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={bottom} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={left} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={right} fill={fill[1]} stroke="#333" />
    </>
  );
};
