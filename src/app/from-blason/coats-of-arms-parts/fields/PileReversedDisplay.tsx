import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const PileReversedDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const pathBuilder = SvgPathBuilder.start([0, height])
    .goToWithPartFlat([width / 2, 0], invertedLineOptions, 7, 'end')
    .goToWithPartFlat([width, height], invertedLineOptions, 7, 'start')
    .close();
  return (
    <>
      <rect x={0} y={0} height={height * 1.5} width={width} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />
    </>
  );
};
