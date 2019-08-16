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
export const CrossPotent = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const [centerX, centerY] = center;

  const wideFactor = 6;
  const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX - wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius])
    .goTo([centerX + wideFactor * crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX + crossWidth, centerY - crossRadius + 2 * crossWidth])
    .goTo([centerX + crossWidth, centerY - crossWidth])
    .goTo([centerX + crossRadius - 2 * crossWidth, centerY - crossWidth])
    .goTo([centerX + crossRadius - 2 * crossWidth, centerY - wideFactor * crossWidth])
    .goTo([centerX + crossRadius, centerY - wideFactor * crossWidth])
    .goTo([centerX + crossRadius, centerY + wideFactor * crossWidth])
    .goTo([centerX + crossRadius - 2 * crossWidth, centerY + wideFactor * crossWidth])
    .goTo([centerX + crossRadius - 2 * crossWidth, centerY + crossWidth])
    .goTo([centerX + crossWidth, centerY + crossWidth])
    .goTo([centerX + crossWidth, centerY + crossRadius - 2 * crossWidth])
    .goTo([centerX + wideFactor * crossWidth, centerY + crossRadius - 2 * crossWidth])
    .goTo([centerX + wideFactor * crossWidth, centerY + crossRadius])
    .goTo([centerX - wideFactor * crossWidth, centerY + crossRadius])
    .goTo([centerX - wideFactor * crossWidth, centerY + crossRadius - 2 * crossWidth])
    .goTo([centerX - crossWidth, centerY + crossRadius - 2 * crossWidth])
    .goTo([centerX - crossWidth, centerY + crossWidth])
    .goTo([centerX - crossRadius + 2 * crossWidth, centerY + crossWidth])
    .goTo([centerX - crossRadius + 2 * crossWidth, centerY + wideFactor * crossWidth])
    .goTo([centerX - crossRadius, centerY + wideFactor * crossWidth])
    .goTo([centerX - crossRadius, centerY - wideFactor * crossWidth])
    .goTo([centerX - crossRadius + 2 * crossWidth, centerY - wideFactor * crossWidth])
    .goTo([centerX - crossRadius + 2 * crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - crossWidth]);

  return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
};
