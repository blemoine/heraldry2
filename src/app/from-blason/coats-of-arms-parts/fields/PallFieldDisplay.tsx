import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { computeLineOptions } from '../blasonDisplay.helper';

type Props = { fill: [string, string, string]; dimension: Dimension; line: Line };
export const PallFieldDisplay = ({ fill, line, dimension: { width, height } }: Props) => {
  const middle = [width / 2, height / 2] as const;

  const lineOptions = computeLineOptions(line, { width, height });

  const topPart = SvgPathBuilder.start([0, 0])
    .goTo(middle, lineOptions)
    .goTo([width, 0], lineOptions)
    .close();

  const leftPart = SvgPathBuilder.start([0, 0])
    .goTo(middle)
    .goTo([width / 2, height], lineOptions)
    .goTo([0, height])
    .close();

  const rightPart = SvgPathBuilder.start([width, 0])
    .goTo([width, height])
    .goTo([width / 2, height], lineOptions)
    .goTo(middle)
    .close();

  return (
    <g className="pall">
      <PathFromBuilder pathBuilder={topPart} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={leftPart} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={rightPart} fill={fill[2]} stroke="#333" />
    </g>
  );
};
