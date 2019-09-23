import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions } from '../blasonDisplay.helper';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { cannotHappen } from '../../../../utils/cannot-happen';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const CrossDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);

  let invertedLineOptions: LineOptions | null;
  if (lineOptions) {
    if (lineOptions.line === 'indented') {
      invertedLineOptions = { ...lineOptions, height: -lineOptions.height };
    } else if (lineOptions.line === 'with-arc') {
      invertedLineOptions = { ...lineOptions, sweep: !lineOptions.sweep };
    } else if (lineOptions.line === 'wavy') {
      invertedLineOptions = { ...lineOptions, height: lineOptions.height };
    } else {
      return cannotHappen(lineOptions);
    }
  } else {
    invertedLineOptions = null;
  }

  const svgBuilderTopLeft = SvgPathBuilder.start([0, 0])
    .goTo([width / 2, 0])
    .goTo([width / 2, height / 2], lineOptions)
    .goTo([0, height / 2], lineOptions)
    .goTo([0, 0]);
  const svgBuilderTopRight = SvgPathBuilder.start([width / 2, 0])
    .goTo([width, 0])
    .goTo([width, height / 2])
    .goTo([width / 2, height / 2], lineOptions)
    .goTo([width / 2, 0], invertedLineOptions);
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
    <g>
      <PathFromBuilder pathBuilder={svgBuilderTopLeft} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderTopRight} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderBottomLeft} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderBottomRight} fill={fill[0]} stroke="#333" />
    </g>
  );
};
