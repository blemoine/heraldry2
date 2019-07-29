import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const FessDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);

  const pathBuilderTop = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, height / 2])
    .goTo([0, height / 2], lineOptions)
    .close();
  const pathBuilderBottom = SvgPathBuilder.start([0, height / 2])
    .goTo([0, height])
    .goTo([width, height])
    .goTo([width, height / 2])
    .goTo([0, height / 2], lineOptions);

  return (
    <g>
      <PathFromBuilder pathBuilder={pathBuilderTop} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilderBottom} fill={fill[1]} stroke="#333" />
    </g>
  );
};
