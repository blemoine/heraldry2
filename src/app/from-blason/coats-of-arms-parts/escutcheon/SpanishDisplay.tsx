import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { FocusablePathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { dimension: Dimension; stroke: string; fill: string; onClick?: () => void };
export function spanishPathBuilder({ width, height }: Dimension, lineOptions: LineOptions | null): SvgPathBuilder {
  return SvgPathBuilder.start([0, 0])
    .goTo([width / 20, 0], null)
    .goTo([width - width / 20, 0], lineOptions)
    .goTo([width, 0], null)
    .goTo([width, (3 * height) / 5], lineOptions)
    .arcTo([width / 2, height], { radius: height / 2.5, sweep: 1 }, lineOptions)
    .arcTo([0, (3 * height) / 5], { radius: height / 2.5, sweep: 1 }, lineOptions)
    .goTo([0, 0], lineOptions);
}

export const SpanishDisplay = ({ dimension, stroke, fill, onClick }: Props) => {
  const pathBuilder = spanishPathBuilder(dimension, null);

  return <FocusablePathFromBuilder pathBuilder={pathBuilder} stroke={stroke} fill={fill} onClick={onClick} />;
};
