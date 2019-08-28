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
export const CrossMoline = ({ fill, stroke, center, crossWidth, crossRadius }: Props) => {
  const [centerX, centerY] = center;
  const wideFactor = 3;
  const topRadius = 2 * crossWidth;
  const bottomRadius = 3 * crossWidth;
  const limbLength = crossRadius - 3 * crossWidth;

  const topLimb = SvgPathBuilder.start([centerX - crossWidth, centerY - crossWidth])
    .verticalMove(-limbLength)
    .arcTo([centerX - wideFactor * crossWidth, centerY - crossRadius + crossWidth], { radius: bottomRadius })
    .arcTo([centerX, centerY - crossRadius + crossWidth], { radius: topRadius, sweep: 1 })
    .arcTo([centerX + wideFactor * crossWidth, centerY - crossRadius + crossWidth], { radius: topRadius, sweep: 1 })
    .arcTo([centerX + crossWidth, centerY - crossRadius + 2 * crossWidth], { radius: bottomRadius })
    .verticalMove(limbLength);

  return <CrossFromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} />;
};
