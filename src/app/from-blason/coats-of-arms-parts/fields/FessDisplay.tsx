import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const FessDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions = line === 'dancetty' ? lineOptions : invertLineOptionNullable(lineOptions);

  const pathBuilderTop = SvgPathBuilder.rectangle([0, 0], { width, height: height / 2 }, { bottom: lineOptions });
  const pathBuilderBottom = SvgPathBuilder.rectangle(
    [0, height / 2],
    { width, height: height / 2 },
    { top: invertedLineOptions }
  );

  return (
    <>
      <PathFromBuilder pathBuilder={pathBuilderTop} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilderBottom} fill={fill[1]} stroke="#333" />
    </>
  );
};
