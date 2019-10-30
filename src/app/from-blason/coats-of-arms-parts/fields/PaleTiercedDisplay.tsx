import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string, string]; dimension: Dimension; line: Line };
export const PaleTiercedDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions = line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const tierDimension = { width: width / 3, height };
  const left = SvgPathBuilder.rectangle([0, 0], tierDimension, { right: lineOptions });
  const middle = SvgPathBuilder.rectangle([width / 3, 0], tierDimension, {
    right: lineOptions,
    left: invertedLineOptions,
  });
  const right = SvgPathBuilder.rectangle([(2 * width) / 3, 0], tierDimension, { left: invertedLineOptions });

  return (
    <>
      <PathFromBuilder pathBuilder={left} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={middle} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={right} fill={fill[2]} stroke="#333" />
    </>
  );
};
