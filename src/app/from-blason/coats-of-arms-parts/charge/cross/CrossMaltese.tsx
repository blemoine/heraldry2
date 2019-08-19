import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import { PathFromBuilder } from '../../../../common/PathFromBuilder';
import * as React from 'react';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
};
export const CrossMaltese = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const [centerX, centerY] = center;
  const wideFactor = 6;
  const depthFactor = 4;

  const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX, centerY - crossRadius + depthFactor * crossWidth])
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX + crossWidth, centerY - crossWidth])

    .goTo([centerX + crossRadius, centerY - wideFactor * crossWidth])
    .goTo([centerX + crossRadius - depthFactor * crossWidth, centerY])
    .goTo([centerX + crossRadius, centerY + wideFactor * crossWidth])
    .goTo([centerX + crossWidth, centerY + crossWidth])

    .goTo([centerX + wideFactor * crossWidth, centerY + crossRadius])
    .goTo([centerX, centerY + crossRadius - depthFactor * crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY + crossRadius])
    .goTo([centerX - crossWidth, centerY + crossWidth])

    .goTo([centerX - crossRadius, centerY + wideFactor * crossWidth])
    .goTo([centerX - crossRadius + depthFactor * crossWidth, centerY])
    .goTo([centerX - crossRadius, centerY - wideFactor * crossWidth])
    .goTo([centerX - crossWidth, centerY - crossWidth]);

  return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
};
