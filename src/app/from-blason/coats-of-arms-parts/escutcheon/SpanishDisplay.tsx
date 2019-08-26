import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../common/PathFromBuilder';

type Props = { dimension: Dimension };
export const SpanishDisplay = ({ dimension }: Props) => {
  const { width, height } = dimension;

  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, (3 * height) / 5])
    .arcTo([0, (3 * height) / 5], { radius: (1 * height) / 5, sweep: 1 })
    .close();

  return <PathFromBuilder pathBuilder={pathBuilder} fill="transparent" stroke="#333" />;
};
