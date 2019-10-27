import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { Line } from '../../../model/line';
import { computeLineOptions, invertLineOptionNullable } from '../blasonDisplay.helper';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { fill: [string, string]; dimension: Dimension; line: Line };
export const PaleDisplay: React.FunctionComponent<Props> = ({ dimension, fill, line }) => {
  const { width, height } = dimension;
  const lineOptions = computeLineOptions(line, dimension);
  const invertedLineOptions = invertLineOptionNullable(lineOptions);

  const pathBuilderLeft = SvgPathBuilder.rectangle([0, 0], { width: width / 2, height }, { right: lineOptions });
  const pathBuilderRight = SvgPathBuilder.rectangle(
    [width / 2, 0],
    { width: width / 2, height },
    { left: invertedLineOptions }
  );
  return (
    <>
      <PathFromBuilder pathBuilder={pathBuilderLeft} fill={fill[0]} stroke="#333" />
      <PathFromBuilder pathBuilder={pathBuilderRight} fill={fill[1]} stroke="#333" />
    </>
  );
};
