import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string, string]; dimension: Dimension; line: Line };
export const FessTiercedDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions = line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const tierDimension = { width, height: height / 3 };
  const top = SvgPathBuilder.rectangle([0, 0], tierDimension, { bottom: lineOptions });

  const middle = SvgPathBuilder.rectangle([0, height / 3], tierDimension, {
    bottom: lineOptions,
    top: invertedLineOptions,
  });

  const bottom = SvgPathBuilder.rectangle([0, (2 * height) / 3], tierDimension, { top: invertedLineOptions });

  return (
    <>
      <PathFromBuilder pathBuilder={top} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={middle} fill={fill[1]} stroke="#333" />
      <PathFromBuilder pathBuilder={bottom} fill={fill[2]} stroke="#333" />
    </>
  );
};
