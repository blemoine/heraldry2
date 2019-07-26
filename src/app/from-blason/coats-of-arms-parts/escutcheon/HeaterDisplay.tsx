import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = { dimension: Dimension };
export const HeaterDisplay: React.FunctionComponent<Props> = ({ dimension }) => {
  const { width, height } = dimension;

  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, height / 3])
    .arcTo([width / 2, height], { radius: width, xAxisRotation: 90, sweep: 1 })
    .arcTo([0, height / 3], { radius: width, xAxisRotation: -90, sweep: 1 })
    .close();

  return <PathFromBuilder pathBuilder={pathBuilder} fill="transparent" stroke="#333" />;
};
