import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptions } from '../blasonDisplay.helper';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const ChevronReversedDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions: LineOptions | null = lineOptions ? invertLineOptions(lineOptions) : null;

  const pathBuilder = SvgPathBuilder.start([0, height / 4])
    .goToWithPartFlat([width / 2, (5 * height) / 9], invertedLineOptions, 3, 'end')
    .goToWithPartFlat([width, height / 4], invertedLineOptions, 3, 'start')
    .goTo([width, height])
    .goTo([0, height])
    .close();

  return (
    <>
      <rect x={0} y={0} height={height} width={width} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />
    </>
  );
};
