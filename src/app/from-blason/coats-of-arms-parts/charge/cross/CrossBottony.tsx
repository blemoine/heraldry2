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
export const CrossBottony = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const computeCrossRadius = 0.77 * crossRadius;
  const [centerX, centerY] = center;

  const radius = 1.4 * crossWidth;
  const pathBuilder = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - computeCrossRadius + crossWidth])
    .arcTo([centerX - crossWidth, centerY - computeCrossRadius], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX + crossWidth, centerY - computeCrossRadius], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX + crossWidth, centerY - computeCrossRadius + crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .goTo([centerX + crossWidth, centerY - crossWidth])
    .goTo([centerX + computeCrossRadius - crossWidth, centerY - crossWidth])
    .arcTo([centerX + computeCrossRadius, centerY - crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX + computeCrossRadius, centerY + crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX + computeCrossRadius - crossWidth, centerY + crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .goTo([centerX + crossWidth, centerY + crossWidth])
    .goTo([centerX + crossWidth, centerY + computeCrossRadius - crossWidth])
    .arcTo([centerX + crossWidth, centerY + computeCrossRadius], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX - crossWidth, centerY + computeCrossRadius], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX - crossWidth, centerY + computeCrossRadius - crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .goTo([centerX - crossWidth, centerY + crossWidth])
    .goTo([centerX - computeCrossRadius + crossWidth, centerY + crossWidth])
    .arcTo([centerX - computeCrossRadius, centerY + crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX - computeCrossRadius, centerY - crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .arcTo([centerX - computeCrossRadius + crossWidth, centerY - crossWidth], { radius: radius, largeArc: 1, sweep: 1 })
    .close();

  return <PathFromBuilder pathBuilder={pathBuilder} fill={fill} stroke={stroke} />;
};
