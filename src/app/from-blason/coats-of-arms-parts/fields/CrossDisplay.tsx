import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const CrossDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const quarterDimension = { width: width / 2, height: height / 2 };
  const svgBuilderTopLeft = SvgPathBuilder.rectangle([0, 0], quarterDimension, {
    right: lineOptions,
    bottom: lineOptions,
  });

  const svgBuilderTopRight = SvgPathBuilder.rectangle([width / 2, 0], quarterDimension, {
    left: invertedLineOptions,
    bottom: lineOptions,
  });

  const svgBuilderBottomLeft = SvgPathBuilder.rectangle([0, height / 2], quarterDimension, {
    right: lineOptions,
    top: invertedLineOptions,
  });

  const svgBuilderBottomRight = SvgPathBuilder.rectangle([width / 2, height / 2], quarterDimension, {
    left: invertedLineOptions,
    top: invertedLineOptions,
  });

  return (
    <>
      <PathFromBuilder pathBuilder={svgBuilderTopLeft} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderTopRight} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderBottomLeft} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={svgBuilderBottomRight} fill={fill[0]} stroke="#333" />
    </>
  );
};
