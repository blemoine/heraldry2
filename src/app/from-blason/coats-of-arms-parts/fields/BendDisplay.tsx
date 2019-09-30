import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions } from '../blasonDisplay.helper';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const BendDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);

  const pathBuilderTopRight = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, height])
    .goTo([0, 0], lineOptions);
  const pathBuilderBottomLeft = SvgPathBuilder.start([0, 0])
    .goTo([0, height])
    .goTo([width, height])
    .goTo([0, 0], lineOptions);

  return (
    <>
      <PathFromBuilder pathBuilder={pathBuilderTopRight} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilderBottomLeft} fill={fill[1]} stroke="#333" />
    </>
  );
};
