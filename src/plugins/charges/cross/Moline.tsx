import * as React from 'react';
import { SvgPathBuilder } from '~/app/svg-path-builder/svg-path-builder';
import { FromLimb } from './FromLimb';

type Props = {
  fill: string;
  stroke: string;
  center: readonly [number, number];
  crossWidth: number;
  crossRadius: number;
  onClick: () => void;
};
export const Moline = ({ fill, stroke, center, crossWidth, crossRadius, onClick }: Props) => {
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

  return <FromLimb topLimb={topLimb} center={center} fill={fill} stroke={stroke} onClick={onClick} />;
};
