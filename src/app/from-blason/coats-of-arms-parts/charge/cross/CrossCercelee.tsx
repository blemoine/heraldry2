import { SvgPathBuilder } from '../../../../svg-path-builder/svg-path-builder';
import * as React from 'react';
import { CrossFromLimb } from './CrossFromLimb';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
};
export const CrossCercelee = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const [centerX, centerY] = center;
  const wideFactor = 5;

  const bottomRadius = 3 * crossWidth;
  const topRadius = 1.4 * crossWidth;
  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .goTo([centerX - crossWidth, centerY - crossRadius + 2 * crossWidth])
    .arcTo([centerX - wideFactor * crossWidth, centerY - crossRadius + 2 * crossWidth], { radius: bottomRadius })
    .arcTo([centerX, centerY - crossRadius + 2 * crossWidth], { radius: topRadius, sweep: 1 })
    .arcTo([centerX + wideFactor * crossWidth, centerY - crossRadius + 2 * crossWidth], { radius: topRadius, sweep: 1 })
    .arcTo([centerX + crossWidth, centerY - crossRadius + 2 * crossWidth], { radius: bottomRadius })
    .goTo([centerX + crossWidth, centerY - crossWidth]);

  return <CrossFromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} />;
};
