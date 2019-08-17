import * as React from 'react';
import { Dimension } from '../../../model/dimension';
import { PathFromBuilder } from '../../../common/PathFromBuilder';
import { SvgPathBuilder } from '../../../svg-path-builder/svg-path-builder';

type Props = { dimension: Dimension };
export const HeaterDisplay: React.FunctionComponent<Props> = ({ dimension }) => {
  const { width, height } = dimension;

  const pathBuilder = SvgPathBuilder.start([0, 0])
    .goTo([width, 0])
    .goTo([width, 3 * height / 5])
    .quadraticeBezier([width / 2, height], [width, height * 0.95])
    .quadraticeBezier([0, 3 * height / 5], [0, height * 0.95])
    .close();

  return <PathFromBuilder pathBuilder={pathBuilder} fill="transparent" stroke="#333" />;
};
