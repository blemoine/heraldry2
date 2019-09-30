import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { Line } from '../../../model/line';
import { computeLineOptions } from '../blasonDisplay.helper';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const ChevronDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const pathBuilder = SvgPathBuilder.start([-width / 3, height])
    .goTo([(width * 4) / 3, height])
    .goTo([width / 2, height / 3], lineOptions)
    .goTo([-width / 3, height], lineOptions);

  return (
    <>
      <rect x={0} y={0} height={height} width={width} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilder} fill={fill[1]} stroke="#333" />
    </>
  );
};
