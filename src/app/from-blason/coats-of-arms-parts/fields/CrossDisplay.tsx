import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptions } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const CrossDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions: LineOptions | null = lineOptions ? invertLineOptions(lineOptions) : null;

  const svgBuilderTopLeft = SvgPathBuilder.start([0, 0])
    .goTo([width / 2, 0])
    .goToWithPartFlat([width / 2, height / 2], lineOptions, 5, 'end')
    .goTo([0, height / 2], lineOptions)
    .goTo([0, 0]);
  const svgBuilderTopRight = SvgPathBuilder.start([width / 2, 0])
    .goTo([width, 0])
    .goTo([width, height / 2])
    .goTo([width / 2, height / 2], lineOptions)
    .goToWithPartFlat([width / 2, 0], invertedLineOptions, 5, 'start');
  const svgBuilderBottomLeft = SvgPathBuilder.start([0, height / 2])
    .goTo([width / 2, height / 2], invertedLineOptions)
    .goTo([width / 2, height], lineOptions)
    .goTo([0, height])
    .close();
  const svgBuilderBottomRight = SvgPathBuilder.start([width / 2, height / 2])
    .goTo([width / 2, height], lineOptions)
    .goTo([width, height])
    .goTo([width, height / 2])
    .goTo([width / 2, height / 2], lineOptions);

  return (
    <>
      <PathFromBuilder pathBuilder={svgBuilderTopLeft} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderTopRight} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderBottomLeft} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderBottomRight} fill={fill[0]} stroke="#333" />
    </>
  );
};
