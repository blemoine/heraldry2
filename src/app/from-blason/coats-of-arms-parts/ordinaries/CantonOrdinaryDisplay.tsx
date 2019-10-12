import * as React from 'react';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';
import { Canton } from '../../../model/ordinary';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { Dimension } from '../../../model/dimension';
import { computeLineOptions, invertLineOptions } from '../blasonDisplay.helper';

type Props = { ordinary: Canton; dimension: Dimension; onClick: () => void; stroke: string; fill: string };
export const CantonOrdinaryDisplay = ({ ordinary, dimension, onClick, fill, stroke }: Props) => {
  const lineOptions = computeLineOptions(ordinary.line, dimension);
  const invertedLineOptions: LineOptions | null = lineOptions ? invertLineOptions(lineOptions) : null;

  const { width, height } = dimension;
  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([width / 3, 0])
    .goToWithPartFlat([width / 3, height / 3], invertedLineOptions, 5, 'end')
    .goToWithPartFlat([0, height / 3], invertedLineOptions, 5, 'start')
    .close();
  return <FocusablePathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={stroke} onClick={onClick} />;
};
