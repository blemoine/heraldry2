import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { LineOptions, SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = { dimension: Dimension };
export const HeaterDisplay: React.FunctionComponent<Props> = ({ dimension }) => {
  const pathBuilder = heaterPathBuilder(dimension, null);

  return <PathFromBuilder pathBuilder={pathBuilder} fill="transparent" stroke="#333" />;
};

export function heaterPathBuilder({ width, height }: Dimension, lineOptions: LineOptions | null): SvgPathBuilder {
  return SvgPathBuilder.start([0, 0])
    .goTo([width /20, 0], null)
    .goTo([width - width /20, 0], lineOptions)
    .goTo([width, 0], null)
    .goTo([width, (3 * height) / 5], lineOptions)
    .quadraticBezier([width / 2, height], [width, height * 0.8], lineOptions)
    .quadraticBezier([0, (3 * height) / 5], [0, height * 0.8], lineOptions)
    .goTo([0, 0], lineOptions);
}
